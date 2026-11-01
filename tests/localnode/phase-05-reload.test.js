// Phase 5 T4: cold-start catalog reload + persist; seeds win conflicts.
// docs/local-node-proxy/TESTING.md / plans/phase-05.md
const { test } = require('node:test')
const assert = require('node:assert/strict')
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
const LocalNodeProxy = require(path.join(root, 'js/lib/client/localnode/index.js'))
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

test('STORE_RELOAD_LIMIT is 5', () => {
	assert.equal(LocalNodeConstants.STORE_RELOAD_LIMIT, 5)
})

test('loadCatalogFromStore: ≤5 shuffled peers; skip localhost + seed keys', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	await store.put({
		host: '127.0.0.1',
		port: 38081,
		key: '127.0.0.1:38081',
		bchain: 'main',
		local: true,
		peer: true,
	})
	await store.put({
		host: 'seed.example',
		port: 38081,
		key: 'seed.example:38081',
		bchain: 'main',
		peer: true,
		stable: false,
	})

	for (let i = 0; i < 7; i++) {
		await store.put({
			host: 'peer' + i + '.example',
			port: 38081,
			key: 'peer' + i + '.example:38081',
			bchain: 'main',
			peer: true,
			version: '0.22.19',
		})
	}

	let rand = 0
	const manager = makeManager(clock, {
		store: store,
		loadSeeds: true,
		loadCatalog: true,
		random: function () {
			rand += 0.01
			return rand % 1
		},
	})

	manager.loadSeeds()
	const loaded = await manager.loadCatalogFromStore()

	assert.ok(manager.find('seed.example:38081'))
	assert.equal(manager.find('seed.example:38081').stable, true)
	assert.equal(manager.find('127.0.0.1:38081'), null)
	assert.equal(loaded.length, 5)
	assert.equal(
		manager.nodes.filter((n) => n.host.indexOf('peer') === 0).length,
		5
	)
})

test('seeds win stable flags when catalog peer shares seed key', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	await store.put({
		host: 'seed.example',
		port: 38081,
		key: 'seed.example:38081',
		bchain: 'main',
		peer: true,
		stable: false,
		name: 'Stored Peer',
	})

	const manager = makeManager(clock, { store: store })
	await manager.loadCatalogFromStore()
	assert.equal(manager.find('seed.example:38081').stable, false)
	assert.equal(manager.find('seed.example:38081').peer, true)

	manager.loadSeeds()
	const seed = manager.find('seed.example:38081')
	assert.equal(seed.stable, true)
	assert.equal(seed.peer, false)
	assert.equal(seed.name, 'Trust Seed')
})

test('init cold start: merge seeds + store; second init restores peer key', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	await store.put({
		host: 'kept.peer',
		port: 38081,
		key: 'kept.peer:38081',
		bchain: 'main',
		peer: true,
		version: '0.22.19',
	})

	const transport = createMockTransport(function () {
		return {
			jsonrpc: '2.0',
			id: 1,
			result: {
				version: '0.22.19',
				chain: 'main',
				lastblock: { height: 10, hash: 'h' },
			},
		}
	})

	const manager1 = makeManager(clock, {
		store: store,
		transport: transport,
		loadSeeds: true,
		loadCatalog: true,
		probeHealth: true,
		discoverOnInit: false,
	})

	await manager1.init()
	assert.ok(manager1.find('seed.example:38081'))
	assert.ok(manager1.find('kept.peer:38081'))
	assert.equal(manager1.find('seed.example:38081').stable, true)

	await manager1.destroy()

	const manager2 = makeManager(clock, {
		store: store,
		transport: transport,
		loadSeeds: true,
		loadCatalog: true,
		probeHealth: false,
		discoverOnInit: false,
	})

	await manager2.init()
	assert.ok(
		manager2.find('kept.peer:38081'),
		'restart-shaped init restores peer from store'
	)
	assert.ok(manager2.find('seed.example:38081'))
})

test('connected discovery persists peer; facade createStore defaults on', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	const transport = createMockTransport(function (opts) {
		const method = opts && opts.body && opts.body.method
		if (method === 'getpeerinfo') {
			return {
				jsonrpc: '2.0',
				id: 1,
				result: [{ addr: 'new.peer:8888' }],
			}
		}
		return {
			jsonrpc: '2.0',
			id: 1,
			result: {
				version: '0.22.19',
				chain: 'main',
				lastblock: { height: 11, hash: 'h2' },
			},
		}
	})

	const manager = makeManager(clock, {
		store: store,
		transport: transport,
	})

	manager.createNode(
		clock.nodeOptions({
			host: 'seed.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			stable: true,
		})
	)

	const connected = await manager.discoverPeers()
	assert.ok(connected.some((n) => n.host === 'new.peer'))

	const docs = await store.loadAll('main')
	assert.ok(docs.some((d) => d.key === 'new.peer:38081'))
	assert.equal(
		docs.every((d) => d.statistic == null && d.penalty == null),
		true
	)

	const facade = new LocalNodeProxy(null, { createStore: undefined })
	assert.ok(facade.store, 'createStore defaults to on')
	assert.equal(facade.store.backendName, 'memory')

	const noStore = new LocalNodeProxy(null, { createStore: false })
	assert.equal(noStore.store, null)
})
