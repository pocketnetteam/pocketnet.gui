// Phase 5 T2: peer discovery orchestration (getPeerInfo → filter → connected → store).
// docs/local-node-proxy/TESTING.md / plans/phase-05.md
const { test } = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const LocalNode = require(path.join(root, 'js/lib/client/localnode/node.js'))
const LocalNodeUtil = require(path.join(root, 'js/lib/client/localnode/util.js'))
const LocalNodeManager = require(path.join(root, 'js/lib/client/localnode/manager.js'))
const LocalNodeStore = require(path.join(root, 'js/lib/client/localnode/store.js'))
const LocalNodeRpcAllowlist = require(path.join(
	root,
	'js/lib/client/localnode/rpc-allowlist.js'
))
const { createFakeClock, createMockTransport } = require('./helpers')

function nodeInfoResult(overrides) {
	return Object.assign(
		{
			version: '0.22.19',
			chain: 'main',
			lastblock: { height: 100, hash: 'abc' },
		},
		overrides || {}
	)
}

function parseMethod(opts) {
	const body = opts && opts.body
	return body && body.method
}

test('allowlist accepts getPeerInfo camelCase alias', () => {
	assert.equal(LocalNodeRpcAllowlist.isAllowed('getpeerinfo'), true)
	assert.equal(LocalNodeRpcAllowlist.isAllowed('getPeerInfo'), true)
	assert.equal(LocalNodeRpcAllowlist.pathFor('getPeerInfo'), '/public/')
})

test('peers(): getPeerInfo i2p dropped; only good candidate metas', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function (opts) {
		assert.equal(parseMethod(opts), 'getpeerinfo')
		return {
			jsonrpc: '2.0',
			id: 1,
			result: [
				{ addr: 'good.peer:8888' },
				{ addr: 'hidden.i2p:1' },
				{ addr: '127.0.0.1:9' },
				{ addr: '' },
				{ addr: 'other.peer' },
			],
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
	})

	const seed = manager.createNode(
		clock.nodeOptions({
			host: 'seed.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
		})
	)

	const candidates = await seed.peers()
	assert.equal(candidates.length, 2)
	assert.deepEqual(
		candidates.map((n) => n.host).sort(),
		['good.peer', 'other.peer']
	)
	assert.equal(candidates[0].port, 38081)
	assert.equal(candidates[0].peer, true)
	assert.equal(manager.nodes.length, 1)
})

test('peernodes: connected success adds node + store.put; wrong bchain skipped', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	const putKeys = []
	const origPut = store.put.bind(store)
	store.put = function (doc) {
		putKeys.push(doc && doc.key)
		return origPut(doc)
	}

	const transport = createMockTransport(function (opts) {
		const method = parseMethod(opts)
		const url = String(opts.url || '')

		if (method === 'getpeerinfo') {
			return {
				jsonrpc: '2.0',
				id: 1,
				result: [
					{ addr: 'new.peer:1' },
					{ addr: 'wrongchain.peer:1' },
					{ addr: 'bad.i2p:1' },
				],
			}
		}

		if (method === 'getnodeinfo') {
			if (url.indexOf('wrongchain.peer') !== -1) {
				return {
					jsonrpc: '2.0',
					id: 1,
					result: nodeInfoResult({ chain: 'test' }),
				}
			}
			return {
				jsonrpc: '2.0',
				id: 1,
				result: nodeInfoResult(),
			}
		}

		return { jsonrpc: '2.0', id: 1, error: { code: -32601, message: method } }
	})

	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		transport: transport,
		store: store,
		bestapplyInterval: 0,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		seedEnv: { test: false },
	})

	const seed = manager.createNode(
		clock.nodeOptions({
			host: 'seed.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			bchain: 'main',
		})
	)

	const connected = await manager.peernodes(seed)
	assert.equal(connected.length, 1)
	assert.equal(connected[0].host, 'new.peer')
	assert.equal(connected[0].canuse, true)
	assert.ok(manager.find('new.peer:38081'))
	assert.equal(manager.find('wrongchain.peer:38081'), null)
	assert.deepEqual(putKeys, ['new.peer:38081'])

	const docs = await store.loadAll('main')
	assert.equal(docs.length, 1)
	assert.equal(docs[0].key, 'new.peer:38081')
	assert.equal(docs[0].peer, true)
})

test('peernodesTime: throttle skips second ask inside peernodesCheckTime', async () => {
	const clock = createFakeClock()
	let peerInfoCalls = 0

	const transport = createMockTransport(function (opts) {
		const method = parseMethod(opts)
		if (method === 'getpeerinfo') {
			peerInfoCalls++
			return { jsonrpc: '2.0', id: 1, result: [] }
		}
		if (method === 'getnodeinfo') {
			return { jsonrpc: '2.0', id: 1, result: nodeInfoResult() }
		}
		return { jsonrpc: '2.0', id: 1, result: null }
	})

	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		transport: transport,
		bestapplyInterval: 0,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		peernodesCheckTime: 10000000,
	})

	const seed = manager.createNode(
		clock.nodeOptions({
			host: 'seed.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
		})
	)

	await manager.peernodesTime(seed)
	assert.equal(peerInfoCalls, 1)

	const second = await manager.peernodesTime(seed)
	assert.deepEqual(second, [])
	assert.equal(peerInfoCalls, 1)

	clock.advance(10000000)
	await manager.peernodesTime(seed)
	assert.equal(peerInfoCalls, 2)
})

test('discoverPeers / peerAllNodesTime respects askedsuccess cap', async () => {
	const clock = createFakeClock()
	let peerInfoCalls = 0

	const transport = createMockTransport(function (opts) {
		const method = parseMethod(opts)
		if (method === 'getpeerinfo') {
			peerInfoCalls++
			return { jsonrpc: '2.0', id: 1, result: [] }
		}
		return { jsonrpc: '2.0', id: 1, result: nodeInfoResult() }
	})

	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		transport: transport,
		bestapplyInterval: 0,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		peernodesCheckTime: 60000,
		discoveryAskSuccessCap: 2,
		discoveryPeerAskBatch: 5,
	})

	const a = manager.createNode(
		clock.nodeOptions({
			host: 'a.example',
			port: 38081,
			inited: true,
			canuse: true,
		})
	)
	const b = manager.createNode(
		clock.nodeOptions({
			host: 'b.example',
			port: 38081,
			inited: true,
			canuse: true,
		})
	)
	manager.createNode(
		clock.nodeOptions({
			host: 'c.example',
			port: 38081,
			inited: true,
			canuse: true,
		})
	)

	await manager.peernodesTime(a)
	await manager.peernodesTime(b)
	assert.equal(peerInfoCalls, 2)

	const before = peerInfoCalls
	await manager.discoverPeers()
	assert.equal(peerInfoCalls, before)
})
