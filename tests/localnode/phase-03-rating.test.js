// Phase 3: statistic / penalty / rating / selectProbability (HTTP-only).
// docs/local-node-proxy/TESTING.md
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const nodePath = path.join(root, 'js/lib/client/localnode/node.js')
const utilPath = path.join(root, 'js/lib/client/localnode/util.js')
const constantsPath = path.join(root, 'js/lib/client/localnode/constants.js')
const seedsPath = path.join(root, 'js/lib/client/localnode/seeds.js')
const managerPath = path.join(root, 'js/lib/client/localnode/manager.js')
const LocalNode = require(nodePath)
const LocalNodeUtil = require(utilPath)
const LocalNodeConstants = require(constantsPath)
const LocalNodeSeeds = require(seedsPath)
const LocalNodeManager = require(managerPath)
const LocalNodeProxy = require(path.join(root, 'js/lib/client/localnode/index.js'))
const { createFakeClock, createMockTransport } = require('./helpers')

function nodeInfoResult(extra) {
	return Object.assign(
		{
			version: '0.22.0',
			chain: 'main',
			lastblock: { height: 100500, hash: 'abc' },
		},
		extra || {}
	)
}

function seedSuccesses(node, n, differenceMs) {
	var i
	differenceMs = typeof differenceMs === 'number' ? differenceMs : 50
	for (i = 0; i < n; i++) {
		node.recordRpcResult({
			success: true,
			code: 200,
			time: differenceMs,
			method: 'getnodeinfo',
		})
	}
}

function readyNode(extra) {
	var clock = createFakeClock()
	var opts = clock.nodeOptions(
		Object.assign(
			{
				host: 'seed.example',
				port: 38081,
				inited: true,
				canuse: true,
				height: 100000,
			},
			extra || {}
		)
	)
	var node = new LocalNode(opts)
	return { clock: clock, node: node }
}

test('localnode modules registered in js/_map.js before index.js', () => {
	assert.ok(fs.existsSync(nodePath))
	assert.ok(fs.existsSync(utilPath))
	assert.ok(fs.existsSync(constantsPath))
	assert.ok(fs.existsSync(seedsPath))
	assert.ok(fs.existsSync(managerPath))

	const mapSrc = fs.readFileSync(path.join(root, 'js/_map.js'), 'utf8')
	const utilIdx = mapSrc.indexOf('js/lib/client/localnode/util.js')
	const constantsIdx = mapSrc.indexOf('js/lib/client/localnode/constants.js')
	const seedsIdx = mapSrc.indexOf('js/lib/client/localnode/seeds.js')
	const nodeIdx = mapSrc.indexOf('js/lib/client/localnode/node.js')
	const managerIdx = mapSrc.indexOf('js/lib/client/localnode/manager.js')
	const indexIdx = mapSrc.indexOf('js/lib/client/localnode/index.js')

	assert.ok(utilIdx !== -1)
	assert.ok(constantsIdx !== -1)
	assert.ok(seedsIdx !== -1)
	assert.ok(nodeIdx !== -1)
	assert.ok(managerIdx !== -1)
	assert.ok(indexIdx !== -1)
	assert.ok(utilIdx < constantsIdx)
	assert.ok(constantsIdx < seedsIdx)
	assert.ok(seedsIdx < nodeIdx)
	assert.ok(nodeIdx < managerIdx)
	assert.ok(managerIdx < indexIdx)
})

test('PENALTY constants match proxy timings for 521/408/429', () => {
	assert.deepEqual(LocalNode.PENALTY[521], { k: 0.8, ms: 220000 })
	assert.deepEqual(LocalNode.PENALTY[408], { k: 0.5, ms: 60000 })
	assert.deepEqual(LocalNode.PENALTY[429], { k: 0.3, ms: 60000 })
})

test('penalty getk reduces for 408/429/521 and recovers after TTL', () => {
	const cases = [
		{ code: 408, expectK: 0.5, ms: 60000 },
		{ code: 429, expectK: 0.7, ms: 60000 },
		{ code: 521, expectK: 0.2, ms: 220000 },
	]

	cases.forEach(function (c) {
		const { clock, node } = readyNode()
		assert.equal(node.penaltyApi.getk(), 1)

		node.applyPenaltyCode(c.code)
		assert.ok(
			Math.abs(node.penaltyApi.getk() - c.expectK) < 1e-9,
			'code ' + c.code + ' getk'
		)
		assert.ok(node.penaltyApi.getk() < 1)

		clock.advance(c.ms - 1)
		assert.ok(node.penaltyApi.getk() < 1, 'still penalized just before TTL')

		clock.advance(2)
		assert.equal(node.penaltyApi.getk(), 1, 'recovered after TTL for ' + c.code)
	})
})

test('recordRpcResult applies penalty codes 408/429/521', () => {
	const { node } = readyNode()
	node.recordRpcResult({ success: false, code: 408, method: 'getnodeinfo' })
	assert.equal(node.penaltyApi.getk(), 0.5)
	assert.equal(node.penalty().reason, '408')
})

test('calcAvailability: empty floor; HTTP success samples raise availability (no WSS)', () => {
	const { node } = readyNode()

	assert.equal(node.statistic.calcAvailability({ count: 0 }), 0.01)
	assert.equal(
		node.statistic.calcAvailability(null),
		0.01
	)

	seedSuccesses(node, 5, 50)
	node.statistic.eventsfix()

	const s = node.statistic.getst()
	assert.ok(s.count >= 5)
	assert.ok(s.success >= 5)

	const avail = node.statistic.calcAvailability(s)
	assert.ok(avail > 0.01, 'HTTP-only samples must beat empty floor')
	// Source must not gate on wssconnected — static check below; runtime: rating > 0 without WSS.
	assert.ok(node.statistic.rating() > 0)
})

test('calcAvailability source has no wssconnected early exit', () => {
	const src = fs.readFileSync(nodePath, 'utf8')
	// Allow docs/comments that mention wssconnected; forbid a runtime gate.
	assert.doesNotMatch(src, /if\s*\([^)]*wssconnected[^)]*\)\s*return/)
	assert.match(src, /HTTP-only availability/)
})

test('rating: inited+height+successes > 0; not inited / no height → 0', () => {
	const ok = readyNode()
	seedSuccesses(ok.node, 8, 40)
	assert.ok(ok.node.statistic.rating() > 0)

	const notInited = readyNode({ inited: false })
	seedSuccesses(notInited.node, 8, 40)
	assert.equal(notInited.node.statistic.rating(), 0)

	const noHeight = new LocalNode(
		createFakeClock().nodeOptions({
			host: 'a.example',
			port: 38081,
			inited: true,
			canuse: true,
		})
	)
	seedSuccesses(noHeight, 8, 40)
	assert.equal(noHeight.statistic.rating(), 0)
	assert.equal(noHeight.height(), 0)
})

test('rating drops after 408/429/521 vs unpenalized twin', () => {
	;[408, 429, 521].forEach(function (code) {
		const base = readyNode()
		const penalized = readyNode()

		seedSuccesses(base.node, 10, 40)
		seedSuccesses(penalized.node, 10, 40)

		const before = base.node.statistic.rating()
		assert.ok(before > 0)

		penalized.node.applyPenaltyCode(code)
		const after = penalized.node.statistic.rating()

		assert.ok(
			after < before,
			'penalty ' + code + ' should lower rating (' + after + ' vs ' + before + ')'
		)
		assert.ok(after >= 0)
	})
})

test('export shape includes host, ports, key, version fields, canuse', () => {
	const { node } = readyNode({
		version: '0.22.0',
		vcode: 2,
		bchain: 'main',
		stable: true,
	})
	seedSuccesses(node, 2, 30)

	const exp = node.export()
	assert.equal(exp.host, 'seed.example')
	assert.equal(exp.port, 38081)
	assert.equal(exp.sport, 38881)
	assert.equal(exp.key, 'seed.example:38081')
	assert.equal(exp.version, '0.22.0')
	assert.equal(exp.vcode, 2)
	assert.equal(exp.bchain, 'main')
	assert.equal(typeof exp.canuse, 'boolean')
	assert.equal(exp.stable, true)
	assert.ok(exp.height >= 100000)
})

test('randmap picks by weight; injectable RNG', () => {
	const items = [
		{ id: 'a', probability: 1 },
		{ id: 'b', probability: 9 },
	]
	// Sorted desc by probability: b(9) then a(1). Seed in [0,9) → b; in [9,10) → a.
	const pickedB = LocalNodeUtil.randmap(items, function () {
		return 0.1
	})
	assert.equal(pickedB.id, 'b')

	const pickedA = LocalNodeUtil.randmap(items, function () {
		return 9.5
	})
	assert.equal(pickedA.id, 'a')

	const empty = LocalNodeUtil.randmap([])
	assert.equal(empty, null)
})

test('seeds: main/test ports; budgets; manager loads active list', () => {
	assert.equal(LocalNodeConstants.MIN_NODES_COUNT, 3)
	assert.equal(LocalNodeConstants.INI_NODE_COUNT, 5)
	assert.equal(LocalNodeConstants.EFFECTIVE_USERS, 1)

	assert.equal(LocalNodeSeeds.PORTS.WebPort, 38081)
	assert.equal(LocalNodeSeeds.PORTS.SecureWebPort, 38881)
	assert.equal(LocalNodeSeeds.PORTS.TestWebPort, 39091)
	assert.equal(LocalNodeSeeds.PORTS.TestSecureWebPort, 39991)

	const main = LocalNodeSeeds.list({ test: false })
	const testNet = LocalNodeSeeds.list({ test: true })

	assert.ok(main.length >= 1)
	assert.ok(testNet.length >= 1)
	assert.equal(main[0].port, 38081)
	assert.equal(main[0].sport, 38881)
	assert.equal(testNet[0].port, 39091)
	assert.equal(testNet[0].sport, 39991)
	assert.equal(LocalNodeSeeds.isTestNetwork({ testpocketnet: true }), true)
	assert.equal(LocalNodeSeeds.isTestNetwork({ test: false }), false)

	const clock = createFakeClock()
	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		seeds: LocalNodeSeeds,
		constants: LocalNodeConstants,
		bestapplyInterval: 0,
		now: clock.now,
		seedEnv: { test: false },
	})

	assert.equal(manager.minNodesCount, 3)
	assert.equal(manager.iniNodeCount, 5)
	assert.equal(manager.effectiveUsers, 1)

	return manager.init().then(function () {
		assert.ok(manager.nodes.length >= 1)
		assert.equal(manager.nodes.length, main.length)
		assert.equal(manager.nodes[0].port, 38081)
		assert.equal(manager.nodes[0].stable, true)
		assert.equal(manager.nodes[0].inited, false)
		assert.equal(manager.nodes[0].canuse, false)
		assert.equal(manager.nodes[0].allowRpc, false)
		assert.ok(manager.find(main[0].host + ':' + main[0].port))

		const testManager = new LocalNodeManager({
			Node: LocalNode,
			util: LocalNodeUtil,
			seeds: LocalNodeSeeds,
			constants: LocalNodeConstants,
			bestapplyInterval: 0,
			now: clock.now,
			loadSeeds: false,
		})
		testManager.loadSeeds({ test: true })
		assert.equal(testManager.nodes.length, testNet.length)
		assert.equal(testManager.nodes[0].port, 39091)
	})
})

test('selectProbability returns a canuse node from the set when ratings exist', () => {
	const clock = createFakeClock()
	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		loadSeeds: false,
		random: function () {
			return 0.25
		},
		bestapplyInterval: 0,
		now: clock.now,
	})

	const a = manager.createNode(
		clock.nodeOptions({
			host: 'a.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 100000,
		})
	)
	const b = manager.createNode(
		clock.nodeOptions({
			host: 'b.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 100001,
		})
	)

	seedSuccesses(a, 10, 40)
	seedSuccesses(b, 10, 40)

	assert.ok(a.statistic.rating() > 0)
	assert.ok(b.statistic.rating() > 0)

	const picked = manager.selectProbability()
	assert.ok(picked)
	assert.ok(picked === a || picked === b)
	assert.ok(picked.key === 'a.example:38081' || picked.key === 'b.example:38081')

	const best = manager.selectbest()
	assert.ok(best === a || best === b)

	const list = manager.bestlist()
	assert.ok(list.length >= 1)
	assert.ok(list.length <= 3)

	manager.bestapply()
	assert.ok(manager.bestnode === a.key || manager.bestnode === b.key)
})

test('selectProbability skips !canuse / !allowRpc / backward', () => {
	const clock = createFakeClock()
	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		loadSeeds: false,
		random: function () {
			return 0.1
		},
		bestapplyInterval: 0,
		now: clock.now,
	})

	manager.createNode(
		clock.nodeOptions({
			host: 'bad.example',
			port: 38081,
			inited: true,
			canuse: false,
			allowRpc: true,
			height: 100000,
		})
	)
	const good = manager.createNode(
		clock.nodeOptions({
			host: 'good.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 100000,
		})
	)
	seedSuccesses(good, 8, 40)

	const picked = manager.selectProbability()
	assert.equal(picked, good)
})

test('health: mock getnodeinfo success → canuse + ping height; no stub', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return {
			jsonrpc: '2.0',
			id: 1,
			result: nodeInfoResult(),
		}
	})

	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		seeds: LocalNodeSeeds,
		constants: LocalNodeConstants,
		transport: transport,
		bestapplyInterval: 0,
		now: clock.now,
		seedEnv: { test: false },
		loadSeeds: false,
		probeHealth: false,
		random: function () {
			return 0
		},
	})

	manager.createNode(
		clock.nodeOptions({
			host: 'seed.example',
			port: 38081,
			inited: false,
			canuse: false,
			allowRpc: false,
		})
	)

	const connected = await manager.probeSeedsHealth()
	assert.equal(connected.length, 1)
	assert.equal(manager.nodes[0].inited, true)
	assert.equal(manager.nodes[0].canuse, true)
	assert.equal(manager.nodes[0].allowRpc, true)
	assert.equal(manager.nodes[0].height(), 100500)
	assert.equal(manager.nodes[0].bchain, 'main')
	assert.ok(transport.calls.length >= 1)
	assert.match(transport.calls[0].url, /seed\.example:38081\/public\//)
	assert.equal(transport.calls[0].body.method, 'getnodeinfo')

	const proxy = new LocalNodeProxy(null, { manager: manager, transport: transport })
	const ping = await proxy.ping()
	assert.equal(ping.session, 'localnodes')
	assert.equal(ping.height, 100500)
	assert.equal(ping.stub, undefined)
	assert.equal(LocalNodeProxy.isPingOk(ping), true)

	const info = await proxy.rpc('getnodeinfo')
	assert.equal(info.lastblock.height, 100500)
})

test('health: mock 408 → penalty, not canuse; ping rejects after probe', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return Promise.reject({ code: 408, message: 'timeout' })
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
	})

	const node = manager.createNode(
		clock.nodeOptions({
			host: 'slow.example',
			port: 38081,
			inited: false,
			canuse: false,
			allowRpc: false,
		})
	)

	const connected = await manager.probeSeedsHealth()
	assert.equal(connected.length, 0)
	assert.equal(node.inited, false)
	assert.equal(node.canuse, false)
	assert.equal(node.allowRpc, false)
	assert.equal(node.penaltyApi.getk(), 0.5)
	assert.equal(node.penalty().reason, '408')
	assert.equal(manager.hasUsableNode(), false)
	assert.equal(manager.isHealthConnecting(), false)

	const proxy = new LocalNodeProxy(null, { manager: manager })
	await assert.rejects(() => proxy.ping(), (err) => {
		assert.equal(err.message, 'nolocalnodes')
		return true
	})
})

test('ping: connecting window resolves while probing; facade without manager stays stub', async () => {
	const clock = createFakeClock()
	let release
	const gate = new Promise(function (resolve) {
		release = resolve
	})
	const transport = createMockTransport(function () {
		return gate.then(function () {
			return {
				jsonrpc: '2.0',
				id: 1,
				result: nodeInfoResult({ lastblock: { height: 42, hash: 'x' } }),
			}
		})
	})

	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		transport: transport,
		bestapplyInterval: 0,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		pingConnectingMs: 15000,
	})

	manager.createNode(
		clock.nodeOptions({
			host: 'wait.example',
			port: 38081,
		})
	)

	const probePromise = manager.probeSeedsHealth()
	assert.equal(manager.healthState(), 'probing')
	assert.equal(manager.isHealthConnecting(), true)

	const proxy = new LocalNodeProxy(null, { manager: manager })
	const mid = await proxy.ping()
	assert.equal(mid.connecting, true)
	assert.equal(mid.height, 0)
	assert.equal(mid.stub, undefined)

	release()
	await probePromise
	const after = await proxy.ping()
	assert.equal(after.height, 42)
	assert.equal(after.connecting, undefined)

	const bare = new LocalNodeProxy(null)
	const stub = await bare.ping()
	assert.equal(stub.stub, true)
	assert.equal(stub.height, 0)
})

// --- T5 / ROADMAP 3.5: rating rises, penalty cuts weight, selectProbability picks seed ---

test('T5: repeated mock 200 health raises rating and selectProbability returns seed key', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return {
			jsonrpc: '2.0',
			id: 1,
			result: nodeInfoResult(),
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
		random: function () {
			return 0
		},
	})

	const seed = manager.createNode(
		clock.nodeOptions({
			host: 'rise.example',
			port: 38081,
		})
	)

	await manager.probeSeedsHealth()
	assert.equal(seed.canuse, true)
	assert.ok(seed.statistic.rating() > 0)

	const afterOne = seed.statistic.rating()
	await manager.requestNodeInfo(seed)
	await manager.requestNodeInfo(seed)
	await manager.requestNodeInfo(seed)
	const afterMore = seed.statistic.rating()
	assert.ok(
		afterMore >= afterOne,
		'extra 200 samples should not lower rating (' + afterMore + ' vs ' + afterOne + ')'
	)
	assert.ok(afterMore > 0)

	const picked = manager.selectProbability()
	assert.ok(picked)
	assert.equal(picked.key, 'rise.example:38081')

	const proxy = new LocalNodeProxy(null, { manager: manager, transport: transport })
	const info = await proxy.rpc('getnodeinfo')
	assert.equal(info.lastblock.height, 100500)
	assert.ok(transport.calls.length >= 5)
})

test('T5: 408/429/521 penalty lowers probability vs unpenalized twin; selectbest prefers healthy', () => {
	;[408, 429, 521].forEach(function (code) {
		const clock = createFakeClock()
		const manager = new LocalNodeManager({
			Node: LocalNode,
			util: LocalNodeUtil,
			loadSeeds: false,
			bestapplyInterval: 0,
			now: clock.now,
			random: function () {
				return 0
			},
		})

		const healthy = manager.createNode(
			clock.nodeOptions({
				host: 'healthy.example',
				port: 38081,
				inited: true,
				canuse: true,
				allowRpc: true,
				height: 100000,
			})
		)
		const hurt = manager.createNode(
			clock.nodeOptions({
				host: 'hurt.example',
				port: 38081,
				inited: true,
				canuse: true,
				allowRpc: true,
				height: 100000,
			})
		)

		seedSuccesses(healthy, 12, 40)
		seedSuccesses(hurt, 12, 40)

		const baseRating = healthy.statistic.rating()
		assert.ok(baseRating > 0)
		assert.ok(Math.abs(hurt.statistic.rating() - baseRating) < 1e-6)

		hurt.recordRpcResult({ success: false, code: code, method: 'getnodeinfo', time: 10 })
		assert.ok(hurt.penaltyApi.getk() < 1)

		const healthyRating = healthy.statistic.rating()
		const hurtRating = hurt.statistic.rating()
		assert.ok(
			hurtRating < healthyRating,
			'code ' + code + ' rating ' + hurtRating + ' < ' + healthyRating
		)
		assert.ok(
			hurt.statistic.probability() < healthy.statistic.probability(),
			'code ' + code + ' selection weight should drop'
		)

		assert.equal(manager.selectbest(), healthy)
		assert.equal(manager.selectProbability(), healthy)
	})
})
