// Phase 5 T5 / ROADMAP 5.5: restart persist, purge, budget bound, no runtime blobs.
// docs/local-node-proxy/TESTING.md / plans/phase-05.md
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const LocalNode = require(path.join(root, 'js/lib/client/localnode/node.js'))
const LocalNodeUtil = require(path.join(root, 'js/lib/client/localnode/util.js'))
const LocalNodeManager = require(path.join(root, 'js/lib/client/localnode/manager.js'))
const LocalNodeStore = require(path.join(root, 'js/lib/client/localnode/store.js'))
const LocalNodeConstants = require(path.join(
	root,
	'js/lib/client/localnode/constants.js'
))
const { createFakeClock, createMockTransport } = require('./helpers')

function makeSeeds(list) {
	return {
		list: function () {
			return list.slice()
		},
		isTestNetwork: function () {
			return false
		},
	}
}

function makeManager(clock, extra) {
	return new LocalNodeManager(
		Object.assign(
			{
				Node: LocalNode,
				util: LocalNodeUtil,
				constants: LocalNodeConstants,
				bestapplyInterval: 0,
				now: clock.now,
				loadSeeds: false,
				loadCatalog: false,
				probeHealth: false,
				discoverOnInit: false,
				closeStoreOnDestroy: false,
				seeds: makeSeeds([
					{
						host: 'seed.example',
						port: 38081,
						ws: 8087,
						name: 'Trust Seed',
					},
				]),
				seedEnv: { test: false },
			},
			extra || {}
		)
	)
}

function healthyResult() {
	return {
		jsonrpc: '2.0',
		id: 1,
		result: {
			version: '0.22.19',
			chain: 'main',
			lastblock: { height: 42, hash: 'h' },
		},
	}
}

test('T5 restart: peers restored; bad versions gone; store has no statistic/penalty', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	// Preload catalog: good peer, blacklisted version, and a blob that must be stripped.
	await store.put({
		host: 'kept.peer',
		port: 38081,
		key: 'kept.peer:38081',
		bchain: 'main',
		peer: true,
		version: '0.22.19',
		statistic: { events: { success: 99 } },
		penalty: { k: 0.5 },
	})
	await store.put({
		host: 'old.peer',
		port: 38081,
		key: 'old.peer:38081',
		bchain: 'main',
		peer: true,
		version: '0.20.22',
	})

	const docsBefore = await store.loadAll('main')
	assert.equal(
		docsBefore.every((d) => d.statistic == null && d.penalty == null),
		true,
		'put strips runtime statistic/penalty'
	)
	assert.ok(docsBefore.some((d) => d.key === 'old.peer:38081'))

	const transport = createMockTransport(function (opts) {
		const method = opts && opts.body && opts.body.method
		if (method === 'getpeerinfo') {
			return {
				jsonrpc: '2.0',
				id: 1,
				result: [
					{ addr: 'discovered.peer:9999' },
					{ addr: 'bad.i2p:1' },
					{ addr: '' },
				],
			}
		}
		return healthyResult()
	})

	const manager1 = makeManager(clock, {
		store: store,
		transport: transport,
		loadSeeds: true,
		loadCatalog: true,
		probeHealth: true,
		discoverOnInit: true,
	})

	await manager1.init()

	assert.ok(manager1.find('seed.example:38081'))
	assert.ok(manager1.find('kept.peer:38081'))
	assert.equal(
		manager1.find('old.peer:38081'),
		null,
		'blacklisted version purged on init'
	)
	assert.ok(
		manager1.find('discovered.peer:38081'),
		'discovery grew catalog'
	)

	let docs = await store.loadAll('main')
	assert.equal(docs.some((d) => d.key === 'old.peer:38081'), false)
	assert.ok(docs.some((d) => d.key === 'kept.peer:38081'))
	assert.ok(docs.some((d) => d.key === 'discovered.peer:38081'))
	assert.equal(
		docs.every((d) => d.statistic == null && d.penalty == null),
		true
	)

	await manager1.destroy()

	// Simulated restart: new manager, same store.
	const manager2 = makeManager(clock, {
		store: store,
		transport: createMockTransport(healthyResult),
		loadSeeds: true,
		loadCatalog: true,
		probeHealth: false,
		discoverOnInit: false,
	})

	await manager2.init()

	assert.ok(manager2.find('seed.example:38081'))
	assert.ok(manager2.find('kept.peer:38081'), 'good peer restored')
	assert.ok(
		manager2.find('discovered.peer:38081'),
		'discovered peer restored after restart'
	)
	assert.equal(manager2.find('old.peer:38081'), null)

	docs = await store.loadAll('main')
	assert.equal(
		docs.every(
			(d) =>
				!d.version ||
				LocalNodeConstants.BAD_NODE_VERSIONS.indexOf(String(d.version)) < 0
		),
		true,
		'catalog has no blacklisted versions after restart'
	)
})

test('T5 budget: after discovery burst, forget keeps inited near MIN_NODES_COUNT', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	const manager = makeManager(clock, {
		store: store,
		minNodesCount: LocalNodeConstants.MIN_NODES_COUNT,
		loadSeeds: true,
	})

	manager.loadSeeds()
	const seed = manager.find('seed.example:38081')
	assert.ok(seed && seed.stable)
	// Seeds start not-inited; mark stable seed inited so forget must protect it.
	seed.init()

	// Simulate unbounded crawl result: many idle inited peers in memory.
	for (let i = 0; i < 8; i++) {
		manager.createNode(
			clock.nodeOptions({
				host: 'burst' + i + '.example',
				port: 38081,
				peer: true,
				inited: true,
				canuse: false,
				allowRpc: false,
				version: '0.22.19',
			})
		)
	}

	assert.ok(manager.initednodes().length > LocalNodeConstants.MIN_NODES_COUNT)

	clock.advance(LocalNodeConstants.FORGET_GRACE_MS + 1)
	manager.manageNodeBudget()

	assert.equal(
		manager.initednodes().length,
		LocalNodeConstants.MIN_NODES_COUNT,
		'inited set bounded after forget'
	)
	assert.equal(seed.inited, true, 'stable seed kept')
	assert.ok(manager.find('seed.example:38081'))
	assert.equal(manager.manageNodeBudget(), 0, 'second budget pass no-ops at min')
})

test('T5 static: localnode modules do not add firebase/notification paths', () => {
	const dir = path.join(root, 'js/lib/client/localnode')
	const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'))
	const banned = [/firebase/i, /pushNotification/i, /FCM/i]

	files.forEach((file) => {
		const src = fs.readFileSync(path.join(dir, file), 'utf8')
		banned.forEach((re) => {
			assert.equal(
				re.test(src),
				false,
				file + ' must not introduce ' + re
			)
		})
	})
})
