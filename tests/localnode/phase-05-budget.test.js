// Phase 5 T3: version purge on init + initIfNeed / forgetIfNotUsing budgets.
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
const { createFakeClock } = require('./helpers')

function makeManager(clock, extra) {
	return new LocalNodeManager(
		Object.assign(
			{
				Node: LocalNode,
				util: LocalNodeUtil,
				bestapplyInterval: 0,
				now: clock.now,
				loadSeeds: false,
				probeHealth: false,
				forgetGraceMs: LocalNodeConstants.FORGET_GRACE_MS,
			},
			extra || {}
		)
	)
}

test('purgeBadVersions removes blacklisted store docs and in-memory peers', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	await store.put({
		host: 'old.example',
		port: 38081,
		key: 'old.example:38081',
		bchain: 'main',
		version: '0.20.22',
	})
	await store.put({
		host: 'ok.example',
		port: 38081,
		key: 'ok.example:38081',
		bchain: 'main',
		version: '0.22.19',
	})

	const manager = makeManager(clock, { store: store })
	manager.createNode(
		clock.nodeOptions({
			host: 'old.example',
			port: 38081,
			version: '0.20.22',
			inited: true,
			canuse: true,
		})
	)
	manager.createNode(
		clock.nodeOptions({
			host: 'ok.example',
			port: 38081,
			version: '0.22.19',
			inited: true,
			canuse: true,
		})
	)
	manager.createNode(
		clock.nodeOptions({
			host: 'seed.example',
			port: 38081,
			version: '0.20.22',
			stable: true,
			inited: true,
			canuse: true,
		})
	)

	const removed = await manager.purgeBadVersions()
	assert.equal(removed, 1)

	const docs = await store.loadAll('main')
	assert.equal(docs.some((d) => d.key === 'old.example:38081'), false)
	assert.ok(docs.some((d) => d.key === 'ok.example:38081'))

	assert.equal(manager.find('old.example:38081'), null)
	assert.ok(manager.find('ok.example:38081'))
	assert.ok(manager.find('seed.example:38081'), 'stable seed kept despite bad version')
})

test('init calls purgeBadVersions before seed load', async () => {
	const clock = createFakeClock()
	const store = new LocalNodeStore({ memory: true })
	await store.clear()
	await store.put({
		host: 'old.example',
		port: 38081,
		key: 'old.example:38081',
		bchain: 'main',
		version: '0.21.1',
	})

	const manager = makeManager(clock, { store: store })
	await manager.init()

	const docs = await store.loadAll('main')
	assert.equal(docs.length, 0)
})

test('forgetIfNotUsing: 5 idle inited → toward min=3; ≤3 no-ops', () => {
	const clock = createFakeClock()
	const manager = makeManager(clock, { minNodesCount: 3 })

	for (let i = 0; i < 5; i++) {
		manager.createNode(
			clock.nodeOptions({
				host: 'peer' + i + '.example',
				port: 38081,
				inited: true,
				canuse: false,
				allowRpc: false,
			})
		)
	}

	assert.equal(manager.initednodes().length, 5)
	assert.equal(manager.forgetIfNotUsing(), 0, 'grace period blocks forget')

	clock.advance(LocalNodeConstants.FORGET_GRACE_MS + 1)
	const forgotten = manager.forgetIfNotUsing()
	assert.equal(forgotten, 2)
	assert.equal(manager.initednodes().length, 3)

	assert.equal(manager.forgetIfNotUsing(), 0, 'at min budget no-op')
	assert.equal(manager.initednodes().length, 3)
})

test('forgetIfNotUsing keeps stable/alwaysrun and prefers dropping low rating', () => {
	const clock = createFakeClock()
	const manager = makeManager(clock, { minNodesCount: 3 })

	const seed = manager.createNode(
		clock.nodeOptions({
			host: 'seed.example',
			port: 38081,
			stable: true,
			inited: true,
			canuse: true,
		})
	)
	const always = manager.createNode(
		clock.nodeOptions({
			host: 'always.example',
			port: 38081,
			alwaysrun: true,
			inited: true,
			canuse: true,
		})
	)
	const keep = manager.createNode(
		clock.nodeOptions({
			host: 'keep.example',
			port: 38081,
			inited: true,
			canuse: true,
		})
	)
	const dropA = manager.createNode(
		clock.nodeOptions({
			host: 'drop-a.example',
			port: 38081,
			inited: true,
			canuse: false,
		})
	)
	const dropB = manager.createNode(
		clock.nodeOptions({
			host: 'drop-b.example',
			port: 38081,
			inited: true,
			canuse: false,
		})
	)

	keep.recordRpcResult({ success: true, code: 200, time: 50, method: 'getnodeinfo' })
	keep.applyNodeInfo({
		version: '0.22.19',
		chain: 'main',
		lastblock: { height: 200, hash: 'h' },
	})

	clock.advance(LocalNodeConstants.FORGET_GRACE_MS + 1)
	assert.equal(manager.forgetIfNotUsing(), 2)
	assert.equal(seed.inited, true)
	assert.equal(always.inited, true)
	assert.equal(keep.inited, true)
	assert.equal(dropA.inited, false)
	assert.equal(dropB.inited, false)
})

test('initIfNeed inits when under working budget; skips when at budget', () => {
	const clock = createFakeClock()
	const manager = makeManager(clock, { minNodesCount: 3 })

	const a = manager.createNode(
		clock.nodeOptions({
			host: 'a.example',
			port: 38081,
			inited: false,
		})
	)
	a.eventsCount = 1

	assert.equal(manager.initIfNeed(a), true)
	assert.equal(a.inited, true)

	// Fill working-like canuse nodes so budget is met via getWorkingNodes failures
	// (no success stats → working empty → still under budget). Add two more with events.
	const b = manager.createNode(
		clock.nodeOptions({ host: 'b.example', port: 38081, inited: false })
	)
	b.eventsCount = 1
	assert.equal(manager.initIfNeed(b), true)

	const c = manager.createNode(
		clock.nodeOptions({ host: 'c.example', port: 38081, inited: false })
	)
	c.eventsCount = 1
	assert.equal(manager.initIfNeed(c), true)

	// Still under working budget (no success RPC → getWorkingNodes empty) → would keep
	// initing. Mark three canuse+success so working >= min.
	;[a, b, c].forEach(function (n, idx) {
		n.canuse = true
		n.allowRpc = true
		n.recordRpcResult({
			success: true,
			code: 200,
			time: 40,
			method: 'getnodeinfo',
		})
		n.applyNodeInfo({
			version: '0.22.19',
			chain: 'main',
			lastblock: { height: 100 + idx, hash: 'h' + idx },
		})
	})

	assert.ok(manager.getWorkingNodes().length >= 3)

	const d = manager.createNode(
		clock.nodeOptions({ host: 'd.example', port: 38081, inited: false })
	)
	d.eventsCount = 1
	assert.equal(manager.initIfNeed(d), false)
	assert.equal(d.inited, false)

	d.alwaysrun = true
	assert.equal(manager.initIfNeed(d), true)
})

test('manageNodeBudget hooked from bestapply tick after grace', () => {
	const clock = createFakeClock()
	const intervals = []
	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		bestapplyInterval: 1000,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		setInterval: function (fn, ms) {
			const id = intervals.length + 1
			intervals.push({ id: id, fn: fn, ms: ms })
			return id
		},
		clearInterval: function () {},
	})

	for (let i = 0; i < 5; i++) {
		manager.createNode(
			clock.nodeOptions({
				host: 'tick' + i + '.example',
				port: 38081,
				inited: true,
			})
		)
	}

	manager.startBestapply()
	assert.equal(intervals.length, 1)

	clock.advance(LocalNodeConstants.FORGET_GRACE_MS + 1)
	intervals[0].fn()
	assert.equal(manager.initednodes().length, 3)

	manager.stopBestapply()
})
