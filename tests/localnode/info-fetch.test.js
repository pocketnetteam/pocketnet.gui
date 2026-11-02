// LocalNodeProxy info / nodes/get / peertubeserversList / ping logging
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const LocalNode = require(path.join(root, 'js/lib/client/localnode/node.js'))
const LocalNodeUtil = require(path.join(root, 'js/lib/client/localnode/util.js'))
const LocalNodeConstants = require(path.join(root, 'js/lib/client/localnode/constants.js'))
const LocalNodeManager = require(path.join(root, 'js/lib/client/localnode/manager.js'))
const LocalNodeProxy = require(path.join(root, 'js/lib/client/localnode/index.js'))
const { createFakeClock, createMockTransport } = require('./helpers')

function makeManagerWithCanuse(clock) {
	const transport = createMockTransport(function () {
		return {
			jsonrpc: '2.0',
			id: 1,
			result: { lastblock: { height: 99, hash: 'h' }, chain: 'main' },
		}
	})
	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		transport: transport,
		bestapplyInterval: 0,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		setTimeout: clock.setTimeout,
		clearTimeout: clock.clearTimeout,
		random: function () {
			return 0
		},
	})
	manager.createNode(
		clock.nodeOptions({
			host: 'good.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 99,
		})
	)
	return { manager: manager, transport: transport }
}

test('constants expose peertube list URL and storage key', () => {
	assert.match(LocalNodeConstants.PEERTUBE_LIST_URL, /bastyon-peertubes/)
	assert.equal(
		LocalNodeConstants.PEERTUBE_LIST_STORAGE_KEY,
		'localnode:peertubeserversList'
	)
})

test('extractArchivedPeertubeHosts matches proxy16 (swarm.list only)', () => {
	const hosts = LocalNodeProxy.extractArchivedPeertubeHosts({
		swarms: {
			a: {
				archived: ['arch0'],
				list: [{ host: 'swarm-a.example', online: true }],
			},
			b: {
				list: [{ host: 'live.example', online: true }],
			},
		},
		archive: {
			arch0: { host: 'archive0.example' },
		},
	})

	assert.ok(hosts.indexOf('swarm-a.example') !== -1)
	// archive{} targets stay out of rewrite list (proxy16 getArchivedServers).
	assert.ok(hosts.indexOf('archive0.example') === -1)
	assert.ok(hosts.indexOf('live.example') === -1)
})

test('fetch info: stub nodeManager without manager; captcha/wallet safe', async () => {
	const proxy = new LocalNodeProxy(null, { createStore: false })
	const r = await proxy.fetch('info')

	assert.ok(r.info)
	assert.equal(r.info.localnodes, true)
	assert.equal(r.info.captcha.hexCaptcha, false)
	assert.deepEqual(r.info.wallet.addresses, {})
	assert.equal(r.info.firebase.useNotifications, false)
	assert.equal(r.info.tor.enabled3, 'neveruse')
	assert.equal(r.info.nodeManager.count, 0)
	assert.equal(r.info.nodeManager.countuse, 0)
	assert.deepEqual(r.info.nodeManager.nodes, {})
})

test('fetch info: nodeManager mirrors getnodes for inited canuse', async () => {
	const clock = createFakeClock()
	const { manager } = makeManagerWithCanuse(clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		createStore: false,
	})

	const r = await proxy.info()
	const nm = r.info.nodeManager

	assert.equal(r.info.status, 2)
	assert.equal(nm.count, 1)
	assert.equal(nm.inited, true)
	assert.equal(nm.countuse, 1)
	assert.ok(nm.nodes['good.example:38081'])
	assert.equal(nm.nodes['good.example:38081'].node.key, 'good.example:38081')
	assert.equal(typeof nm.nodes['good.example:38081'].rating, 'number')
})

test('fetch nodes/get returns getnodes map', async () => {
	const clock = createFakeClock()
	const { manager } = makeManagerWithCanuse(clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		createStore: false,
	})

	const r = await proxy.fetch('nodes/get')

	assert.ok(r.nodes['good.example:38081'])
	assert.equal(r.nodes['good.example:38081'].node.host, 'good.example')
	assert.equal(r.nodes['good.example:38081'].users, 0)
})

test('ping rejects without canuse (pingerror path); resolves with canuse', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return { jsonrpc: '2.0', id: 1, result: {} }
	})
	const emptyManager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		transport: transport,
		bestapplyInterval: 0,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		setTimeout: clock.setTimeout,
		clearTimeout: clock.clearTimeout,
	})
	emptyManager.createNode(
		clock.nodeOptions({
			host: 'dead.example',
			port: 38081,
			inited: false,
			canuse: false,
			allowRpc: false,
		})
	)

	const emptyProxy = new LocalNodeProxy(null, {
		manager: emptyManager,
		createStore: false,
	})

	await assert.rejects(() => emptyProxy.ping(), (err) => {
		assert.equal(err.message, 'nolocalnodes')
		return true
	})

	const { manager } = makeManagerWithCanuse(clock)
	const okProxy = new LocalNodeProxy(null, {
		manager: manager,
		createStore: false,
	})
	const ping = await okProxy.ping()

	assert.equal(ping.session, 'localnodes')
	assert.equal(ping.height, 99)
	assert.ok(ping.canuse >= 1)
})

test('peertubeserversList: fetch ok writes storage; fail reads cache; empty → []', async () => {
	const mem = {}
	const storage = {
		getItem: function (k) {
			return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null
		},
		setItem: function (k, v) {
			mem[k] = String(v)
		},
	}

	const listJson = {
		swarms: {
			x: {
				archived: ['a0'],
				list: [{ host: 'pt-archived.example' }],
			},
		},
		archive: {
			a0: { host: 'pt-archive-entry.example' },
		},
	}

	const okProxy = new LocalNodeProxy(null, {
		createStore: false,
		storage: storage,
		peertubeFetch: function () {
			return Promise.resolve(listJson)
		},
	})

	const ok = await okProxy.fetch('peertubeserversList')
	assert.ok(ok.archivedPeertubeServers.indexOf('pt-archived.example') !== -1)
	assert.ok(
		ok.archivedPeertubeServers.indexOf('pt-archive-entry.example') === -1
	)
	assert.ok(mem[LocalNodeConstants.PEERTUBE_LIST_STORAGE_KEY])

	const failProxy = new LocalNodeProxy(null, {
		createStore: false,
		storage: storage,
		peertubeFetch: function () {
			return Promise.reject(new Error('network'))
		},
	})
	const cached = await failProxy.peertubeserversList()
	assert.deepEqual(cached.archivedPeertubeServers, ok.archivedPeertubeServers)

	const emptyMem = {}
	const emptyStorage = {
		getItem: function (k) {
			return Object.prototype.hasOwnProperty.call(emptyMem, k)
				? emptyMem[k]
				: null
		},
		setItem: function (k, v) {
			emptyMem[k] = String(v)
		},
	}
	const emptyProxy = new LocalNodeProxy(null, {
		createStore: false,
		storage: emptyStorage,
		peertubeFetch: function () {
			return Promise.reject(new Error('network'))
		},
	})
	const empty = await emptyProxy.peertubeserversList()
	assert.deepEqual(empty.archivedPeertubeServers, [])
})

test('stub fetch: exchanges/history, urlPreview*, stats resolve without error', async () => {
	const clock = createFakeClock()
	const { manager } = makeManagerWithCanuse(clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		createStore: false,
	})

	const history = await proxy.fetch('exchanges/history')
	assert.deepEqual(history, { prices: {} })
	assert.equal(history.prices && typeof history.prices, 'object')

	const preview = await proxy.fetch('urlPreview', { url: 'https://example.com' })
	assert.deepEqual(preview, {})
	assert.equal(preview.og, undefined)

	const formatted = await proxy.fetch('urlPreviewFormatted', {
		url: 'https://example.com',
	})
	assert.equal(formatted.success, 0)

	const stats = await proxy.fetch('stats')
	assert.ok(Array.isArray(stats.stats))
	assert.equal(stats.stats.length, 1)
	assert.ok(stats.stats[0].info)
	assert.equal(stats.stats[0].info.localnodes, true)
	assert.ok(stats.stats[0].time instanceof Date || stats.stats[0].time)
	assert.ok(stats.stats[0].info.nodeManager)
})

test('unknown fetch path still notimplemented', async () => {
	const proxy = new LocalNodeProxy(null, { createStore: false })
	await assert.rejects(() => proxy.fetch('manage'), (err) => err === 'notimplemented')
})

test('api.js localnodes fetch comment mentions info and peertubeserversList', () => {
	const apiSrc = fs.readFileSync(path.join(root, 'js/lib/client/api.js'), 'utf8')
	assert.match(
		apiSrc,
		/info\s*\/\s*ping\s*\/\s*nodes\/\*\s*\/\s*peertubeserversList\s*\/\s*peertube\/\*/
	)
})
