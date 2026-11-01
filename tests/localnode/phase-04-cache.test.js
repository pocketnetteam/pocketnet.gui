// Phase 4: allowlist; dispatch (T2); cache (T3); nodes/select + canchange (T4); T5 SDK verify.
// docs/local-node-proxy/TESTING.md
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const allowlistPath = path.join(root, 'js/lib/client/localnode/rpc-allowlist.js')
const cachePath = path.join(root, 'js/lib/client/localnode/cache.js')
const apiPath = path.join(root, 'js/lib/client/api.js')
const Allowlist = require(allowlistPath)
const LocalNodeCache = require(cachePath)
const LocalNode = require(path.join(root, 'js/lib/client/localnode/node.js'))
const LocalNodeUtil = require(path.join(root, 'js/lib/client/localnode/util.js'))
const LocalNodeManager = require(path.join(root, 'js/lib/client/localnode/manager.js'))
const LocalNodeProxy = require(path.join(root, 'js/lib/client/localnode/index.js'))
const { createFakeClock, createMockTransport } = require('./helpers')

/**
 * Thin Proxy16.rpc localnodes shim: sticky current.key → options.node, then facade.rpc.
 * Mirrors js/lib/client/api.js Proxy16.rpc without loading the full Api graph.
 */
function makeLocalProxy16Shim(facade) {
	return {
		localnodes: true,
		current: null,
		localNodeProxy: facade,
		rpc: function (method, parameters, options) {
			options = options || {}
			if (this.current && this.current.key) {
				options.node = this.current.key
			}
			return this.localNodeProxy.rpc(method, parameters, options)
		},
		fetch: function (path, data) {
			return this.localNodeProxy.fetch(path, data)
		},
		setCurrentFromSelect: async function (data) {
			const r = await this.localNodeProxy.selectNode(data || {})
			this.current = r.node
			return r
		},
	}
}

function makeReadyManager(transport, clock, host) {
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

	const node = manager.createNode(
		clock.nodeOptions({
			host: host || 'seed.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 100000,
		})
	)

	return { manager: manager, node: node }
}

test('rpc-allowlist.js and cache.js registered in js/_map.js before index.js', () => {
	assert.ok(fs.existsSync(allowlistPath))
	assert.ok(fs.existsSync(cachePath))

	const mapSrc = fs.readFileSync(path.join(root, 'js/_map.js'), 'utf8')
	const allowIdx = mapSrc.indexOf('js/lib/client/localnode/rpc-allowlist.js')
	const cacheIdx = mapSrc.indexOf('js/lib/client/localnode/cache.js')
	const indexIdx = mapSrc.indexOf('js/lib/client/localnode/index.js')

	assert.ok(allowIdx !== -1, 'rpc-allowlist.js must be listed in _map.js')
	assert.ok(cacheIdx !== -1, 'cache.js must be listed in _map.js')
	assert.ok(indexIdx !== -1, 'index.js must be listed in _map.js')
	assert.ok(allowIdx < indexIdx, 'rpc-allowlist.js must load before index.js')
	assert.ok(cacheIdx < indexIdx, 'cache.js must load before index.js')
})

test('classify: public / post / private / unknown', () => {
	assert.equal(Allowlist.classify('getnodeinfo'), 'public')
	assert.equal(Allowlist.classify('getuserprofile'), 'public')
	assert.equal(Allowlist.classify('sendrawtransaction'), 'post')
	assert.equal(Allowlist.classify('getbalance'), 'private')
	assert.equal(Allowlist.classify('notamethod'), null)
	assert.equal(Allowlist.classify(''), null)
	assert.equal(Allowlist.classify(null), null)
})

test('isAllowed: public and post allowed; private and unknown rejected without creds', () => {
	assert.equal(Allowlist.isAllowed('getnodeinfo'), true)
	assert.equal(Allowlist.isAllowed('getuserprofile'), true)
	assert.equal(Allowlist.isAllowed('sendrawtransaction'), true)
	assert.equal(Allowlist.isAllowed('getbalance'), false)
	assert.equal(Allowlist.isAllowed('dumpwallet'), false)
	assert.equal(Allowlist.isAllowed('totallyunknown'), false)
	assert.equal(Allowlist.isAllowed('getbalance', {}), false)
	assert.equal(Allowlist.isAllowed('getbalance', { rpcuser: 'u' }), false)
})

test('isAllowed: private stays fail-closed for MVP unless both rpcuser and rpcpass present', () => {
	// Helper allows privates only with both credentials; client must not supply them in MVP.
	assert.equal(Allowlist.isAllowed('getbalance', { rpcuser: 'u', rpcpass: 'p' }), true)
	assert.equal(Allowlist.isAllowed('getbalance', { rpcuser: '', rpcpass: 'p' }), false)
})

test('pathFor: public → /public/; post → /post/; unknown/private without creds → null', () => {
	assert.equal(Allowlist.pathFor('getnodeinfo'), '/public/')
	assert.equal(Allowlist.pathFor('getuserprofile'), '/public/')
	assert.equal(Allowlist.pathFor('sendrawtransaction'), '/post/')
	assert.equal(Allowlist.pathFor('sendrawtransactionwithmessage'), '/post/')
	assert.equal(Allowlist.pathFor('getbalance'), null)
	assert.equal(Allowlist.pathFor('unknownmethod'), null)
	assert.equal(Allowlist.pathFor('getbalance', { rpcuser: 'u', rpcpass: 'p' }), '/')
})

test('exports include deliberate method tables (sync debt with proxy16/node/rpc.js)', () => {
	assert.ok(Allowlist.publics.getnodeinfo)
	assert.ok(Allowlist.posts.sendrawtransaction)
	assert.ok(Allowlist.privates.getbalance)
	assert.equal(typeof Allowlist.classify, 'function')
	assert.equal(typeof Allowlist.isAllowed, 'function')
	assert.equal(typeof Allowlist.pathFor, 'function')
})

test('dispatch: public success hits /public/ and records statistic success', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return { jsonrpc: '2.0', id: 1, result: { ok: true, height: 42 } }
	})
	const { manager, node } = makeReadyManager(transport, clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
	})

	const result = await proxy.rpc('getnodeinfo', [])
	assert.equal(result.height, 42)
	assert.equal(transport.calls.length, 1)
	assert.match(transport.calls[0].url, /\/public\/$/)
	assert.equal(transport.calls[0].body.method, 'getnodeinfo')
	assert.ok(node.statistic.getst().success >= 1)
})

test('dispatch: post method hits /post/ path', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return { jsonrpc: '2.0', id: 1, result: 'txid' }
	})
	const { manager } = makeReadyManager(transport, clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
	})

	const txid = await proxy.rpc('sendrawtransaction', ['deadbeef'])
	assert.equal(txid, 'txid')
	assert.equal(transport.calls.length, 1)
	assert.match(transport.calls[0].url, /\/post\/$/)
	assert.equal(transport.calls[0].body.method, 'sendrawtransaction')
	assert.deepEqual(transport.calls[0].body.params, ['deadbeef'])
})

test('dispatch: private/unknown never call transport', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		assert.fail('transport must not be called')
	})
	const { manager } = makeReadyManager(transport, clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
	})

	await assert.rejects(
		() => proxy.rpc('getbalance', []),
		(err) => err && err.code === -32601 && err.message === 'methodnotallowed'
	)
	await assert.rejects(
		() => proxy.rpc('notamethod', []),
		(err) => err && err.code === -32601
	)
	assert.equal(transport.calls.length, 0)
})

test('dispatch: HTTP 408/429/521 apply penalty on node', async () => {
	const cases = [
		{ code: 408, expectK: 0.5 },
		{ code: 429, expectK: 0.7 },
		{ code: 521, expectK: 0.2 },
	]

	for (const c of cases) {
		const clock = createFakeClock()
		const transport = createMockTransport(function () {
			return Promise.reject({ code: c.code, message: 'httperror' })
		})
		const { manager, node } = makeReadyManager(
			transport,
			clock,
			'pen.' + c.code + '.example'
		)
		const proxy = new LocalNodeProxy(null, {
			manager: manager,
			transport: transport,
			allowlist: Allowlist,
		})

		assert.equal(node.penaltyApi.getk(), 1)
		await assert.rejects(() => proxy.rpc('getuserprofile', ['addr']), (err) => {
			assert.equal(err.code, c.code)
			return true
		})
		assert.ok(
			Math.abs(node.penaltyApi.getk() - c.expectK) < 1e-9,
			'penalty getk for ' + c.code
		)
	}
})

test('dispatch: options.node sticky key selects that node', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function (opts) {
		return {
			jsonrpc: '2.0',
			id: 1,
			result: { url: opts.url },
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

	const a = manager.createNode(
		clock.nodeOptions({
			host: 'a.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 10,
		})
	)
	const b = manager.createNode(
		clock.nodeOptions({
			host: 'b.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 20,
		})
	)

	// Bias probability toward a so sticky b proves options.node wins.
	for (let i = 0; i < 8; i++) {
		a.recordRpcResult({ success: true, code: 200, time: 40, method: 'getnodeinfo' })
	}

	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
	})

	const result = await proxy.rpc('getnodeinfo', [], { node: b.key })
	assert.match(result.url, /b\.example:38081\/public\//)
	assert.equal(transport.calls.length, 1)
})

test('cache: set/get hit within TTL; miss after fake clock past TTL', () => {
	const clock = createFakeClock()
	const cache = new LocalNodeCache({ now: clock.now, maxEntries: 200 })

	assert.equal(cache.isCacheable('getnodeinfo'), true)
	assert.equal(cache.isCacheable('sendrawtransaction'), false)
	assert.equal(cache.get('getnodeinfo', []), undefined)

	assert.equal(cache.set('getnodeinfo', [], { height: 1 }), true)
	assert.deepEqual(cache.get('getnodeinfo', []), { height: 1 })

	// getnodeinfo TTL = 360s (non-Android default)
	clock.advance(359 * 1000)
	assert.deepEqual(cache.get('getnodeinfo', []), { height: 1 })

	clock.advance(2 * 1000)
	assert.equal(cache.get('getnodeinfo', []), undefined)
	assert.equal(cache.size(), 0)
})

test('cache: Android getnodeinfo TTL = 1800s', () => {
	const clock = createFakeClock()
	const cache = new LocalNodeCache({
		now: clock.now,
		android: true,
	})

	assert.equal(cache.ckeys.getnodeinfo.time, 1800)
	assert.equal(cache.set('getnodeinfo', [], { height: 2 }), true)
	assert.deepEqual(cache.get('getnodeinfo', []), { height: 2 })

	clock.advance(1799 * 1000)
	assert.deepEqual(cache.get('getnodeinfo', []), { height: 2 })

	clock.advance(2 * 1000)
	assert.equal(cache.get('getnodeinfo', []), undefined)
})

test('cache: wait dedupe — wrap shares one in-flight promise for identical key', async () => {
	const clock = createFakeClock()
	const cache = new LocalNodeCache({ now: clock.now })
	let fetches = 0
	let release

	const gate = new Promise(function (resolve) {
		release = resolve
	})

	const fetchFn = function () {
		fetches++
		return gate.then(function () {
			return { n: fetches }
		})
	}

	const p1 = cache.wrap('getuserprofile', ['addr'], {}, fetchFn)
	const p2 = cache.wrap('getuserprofile', ['addr'], {}, fetchFn)

	// wrap schedules fetch on a microtask; both callers must share one in-flight.
	await Promise.resolve()
	assert.equal(fetches, 1)
	assert.equal(p1, p2)
	release()

	const [a, b] = await Promise.all([p1, p2])
	assert.deepEqual(a, { n: 1 })
	assert.deepEqual(b, { n: 1 })
	assert.equal(fetches, 1)
	assert.deepEqual(cache.get('getuserprofile', ['addr']), { n: 1 })
})

test('cache: wait callback — second waiter gets waitedmake after set', async () => {
	const cache = new LocalNodeCache()
	const statuses = []

	await new Promise(function (resolve) {
		cache.wait('gettags', ['x'], function (st) {
			statuses.push(st)
			if (st === 'execute') {
				cache.wait('gettags', ['x'], function (st2) {
					statuses.push(st2)
					resolve()
				})
				cache.set('gettags', ['x'], ['tag1'])
			}
		})
	})

	assert.deepEqual(statuses, ['execute', 'waitedmake'])
	assert.deepEqual(cache.get('gettags', ['x']), ['tag1'])
})

test('cache: maxEntries 200 drops oldest insert (FIFO / write-LRU)', () => {
	const cache = new LocalNodeCache({ maxEntries: 200 })

	assert.equal(LocalNodeCache.DEFAULT_MAX_ENTRIES, 200)

	for (let i = 0; i < 200; i++) {
		cache.set('search', ['q' + i], { i: i })
	}
	assert.equal(cache.size(), 200)
	assert.deepEqual(cache.get('search', ['q0']), { i: 0 })

	cache.set('search', ['q200'], { i: 200 })
	assert.equal(cache.size(), 200)
	assert.equal(cache.get('search', ['q0']), undefined)
	assert.deepEqual(cache.get('search', ['q200']), { i: 200 })
	assert.deepEqual(cache.get('search', ['q1']), { i: 1 })
})

test('cache: updateRPCCache skips get but still writes', async () => {
	const cache = new LocalNodeCache()
	cache.set('getcomments', ['post1'], { old: true })

	let fetches = 0
	const fresh = await cache.wrap(
		'getcomments',
		['post1'],
		{ updateRPCCache: true },
		function () {
			fetches++
			return { old: false }
		}
	)

	assert.equal(fetches, 1)
	assert.deepEqual(fresh, { old: false })
	assert.deepEqual(cache.get('getcomments', ['post1']), { old: false })

	const hit = await cache.wrap('getcomments', ['post1'], {}, function () {
		fetches++
		return { should: 'not run' }
	})
	assert.equal(fetches, 1)
	assert.deepEqual(hit, { old: false })
	assert.equal(cache.stats().hits, 1)
})

test('rpc: second identical cached call does not hit transport', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return { jsonrpc: '2.0', id: 1, result: { height: 99 } }
	})
	const { manager } = makeReadyManager(transport, clock)
	const cache = new LocalNodeCache({ now: clock.now })
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
		cache: cache,
	})

	const a = await proxy.rpc('getnodeinfo', [])
	const b = await proxy.rpc('getnodeinfo', [])

	assert.deepEqual(a, { height: 99 })
	assert.deepEqual(b, { height: 99 })
	assert.equal(transport.calls.length, 1)
	assert.equal(cache.stats().hits, 1)
	assert.ok(cache.stats().misses >= 1)
})

test('rpc: updateRPCCache forces transport even when cached', async () => {
	const clock = createFakeClock()
	let n = 0
	const transport = createMockTransport(function () {
		n++
		return { jsonrpc: '2.0', id: 1, result: { n: n } }
	})
	const { manager } = makeReadyManager(transport, clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
		cache: new LocalNodeCache({ now: clock.now }),
	})

	const a = await proxy.rpc('getuserprofile', ['addr'])
	const b = await proxy.rpc('getuserprofile', ['addr'], { updateRPCCache: true })
	const c = await proxy.rpc('getuserprofile', ['addr'])

	assert.deepEqual(a, { n: 1 })
	assert.deepEqual(b, { n: 2 })
	assert.deepEqual(c, { n: 2 })
	assert.equal(transport.calls.length, 2)
})

test('nodes/select: returns export-shaped node and sets sticky current', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport()
	const { manager, node } = makeReadyManager(transport, clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
	})

	const r = await proxy.selectNode({})
	assert.ok(r.node)
	assert.equal(r.node.key, node.key)
	assert.equal(r.node.host, 'seed.example')
	assert.equal(proxy.current && proxy.current.key, node.key)

	const fixed = await proxy.selectNode({ fixed: node.key })
	assert.equal(fixed.node.key, node.key)

	const viaFetch = await proxy.fetch('nodes/select', {})
	assert.equal(viaFetch.node.key, node.key)
})

test('nodes/select: rejects when manager has no nodes', async () => {
	const clock = createFakeClock()
	const manager = new LocalNodeManager({
		Node: LocalNode,
		util: LocalNodeUtil,
		transport: createMockTransport(),
		bestapplyInterval: 0,
		now: clock.now,
		loadSeeds: false,
		probeHealth: false,
		setTimeout: clock.setTimeout,
		clearTimeout: clock.clearTimeout,
	})
	const proxy = new LocalNodeProxy(null, { manager: manager })

	await assert.rejects(() => proxy.selectNode({}), (e) => e === 'cantselect')
})

test('nodes/canchange: returns another canuse when ≥2; empty when only one', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport()
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
			height: 100000,
		})
	)

	for (let i = 0; i < 10; i++) {
		b.recordRpcResult({ success: true, code: 200, time: 30, method: 'getnodeinfo' })
	}

	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
	})

	const changed = await proxy.canchangeNode({ node: a.key })
	assert.ok(changed.node)
	assert.equal(changed.node.key, b.key)
	assert.equal(proxy.current && proxy.current.key, b.key)

	const aloneMgr = new LocalNodeManager({
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
	const only = aloneMgr.createNode(
		clock.nodeOptions({
			host: 'only.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 100000,
		})
	)
	const alone = new LocalNodeProxy(null, { manager: aloneMgr })
	const empty = await alone.canchangeNode({ node: only.key })
	assert.deepEqual(empty, {})
})

test('nodes/canchange: unknown current falls back to selectProbability', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport()
	const { manager, node } = makeReadyManager(transport, clock)
	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
	})

	const r = await proxy.fetch('nodes/canchange', { node: 'missing:1' })
	assert.equal(r.node.key, node.key)
})

test('rpc: honors sticky current from selectNode when options.node omitted', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return { jsonrpc: '2.0', id: 1, result: { ok: 1 } }
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

	const a = manager.createNode(
		clock.nodeOptions({
			host: 'sticky-a.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 100000,
		})
	)
	const b = manager.createNode(
		clock.nodeOptions({
			host: 'sticky-b.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 100000,
		})
	)

	for (let i = 0; i < 8; i++) {
		a.recordRpcResult({ success: true, code: 200, time: 40, method: 'getnodeinfo' })
	}

	const proxy = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
		cache: new LocalNodeCache({ now: clock.now }),
	})

	await proxy.selectNode({ fixed: b.key })
	await proxy.rpc('getnodeinfo', [])
	assert.equal(transport.calls.length, 1)
	assert.match(transport.calls[0].url, /sticky-b\.example:38081\/public\//)
})

test('T5 verify: Proxy16-shaped local rpc getnodeinfo + getuserprofile; second hits cache', async () => {
	const clock = createFakeClock()
	let profiles = 0
	const transport = createMockTransport(function (opts) {
		const method = opts.body && opts.body.method
		if (method === 'getnodeinfo') {
			return { jsonrpc: '2.0', id: 1, result: { height: 12345, version: '0.22' } }
		}
		if (method === 'getuserprofile') {
			profiles++
			return {
				jsonrpc: '2.0',
				id: 1,
				result: [{ address: opts.body.params[0], name: 'alice', n: profiles }],
			}
		}
		return Promise.reject({ code: -32601, message: 'unexpected' })
	})
	const { manager, node } = makeReadyManager(transport, clock)
	const cache = new LocalNodeCache({ now: clock.now })
	const facade = new LocalNodeProxy(null, {
		manager: manager,
		transport: transport,
		allowlist: Allowlist,
		cache: cache,
	})
	const apiProxy = makeLocalProxy16Shim(facade)

	await apiProxy.setCurrentFromSelect({ fixed: node.key })
	assert.equal(apiProxy.current.key, node.key)

	const info1 = await apiProxy.rpc('getnodeinfo', [])
	const info2 = await apiProxy.rpc('getnodeinfo', [])
	assert.equal(info1.height, 12345)
	assert.deepEqual(info2, info1)

	const addr = 'PTestAddress'
	const profile1 = await apiProxy.rpc('getuserprofile', [addr])
	const profile2 = await apiProxy.rpc('getuserprofile', [addr])
	assert.equal(profile1[0].name, 'alice')
	assert.deepEqual(profile2, profile1)

	// getnodeinfo once + getuserprofile once; duplicates served from cache.
	assert.equal(transport.calls.length, 2)
	assert.ok(cache.stats().hits >= 2)
	assert.match(transport.calls[0].url, /\/public\/$/)
	assert.equal(transport.calls[0].body.method, 'getnodeinfo')
	assert.equal(transport.calls[1].body.method, 'getuserprofile')

	await assert.rejects(
		() => apiProxy.rpc('getbalance', []),
		(err) => err && err.code === -32601 && err.message === 'methodnotallowed'
	)
	assert.equal(transport.calls.length, 2)

	const viaFetch = await apiProxy.fetch('nodes/select', { fixed: node.key })
	assert.equal(viaFetch.node.key, node.key)
})

test('T5 verify: get.working excludes direct; System16 stays gated off localnodes (static)', () => {
	const apiSrc = fs.readFileSync(apiPath, 'utf8')

	assert.match(
		apiSrc,
		/working\s*:\s*function\s*\(\)\s*\{[\s\S]*?return !proxy\.direct/
	)
	assert.match(
		apiSrc,
		/new System16\(app,\s*self,\s*self\.direct\s*&&\s*!self\.localnodes\)/
	)
	assert.match(
		apiSrc,
		/self\.localNodeProxy\.rpc\(method,\s*parameters,\s*options\)/
	)
	assert.match(
		apiSrc,
		/self\.localNodeProxy\.fetch\(path,\s*data\)/
	)
})
