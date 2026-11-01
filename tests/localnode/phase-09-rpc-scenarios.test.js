// Phase 9 — LocalNodeRpcScenarios (rpc-ex feed enrichment)
const { test } = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const LocalNodeRpcScenarios = require(path.join(
	root,
	'js/lib/client/localnode/rpc-scenarios.js'
))
const LocalNodeProxy = require(path.join(
	root,
	'js/lib/client/localnode/index.js'
))

const ALIASES = [
	'getrecommendedcontentbyaddress',
	'getprofilefeed',
	'getsubscribesfeed',
	'gethotposts',
	'getmostcommentedfeed',
]

test('scenarios module exports gethierarchicalstrip and five aliases', () => {
	assert.equal(typeof LocalNodeRpcScenarios.gethierarchicalstrip, 'function')
	assert.equal(LocalNodeRpcScenarios.has('gethierarchicalstrip'), true)
	for (const name of ALIASES) {
		assert.equal(LocalNodeRpcScenarios.has(name), true)
		assert.equal(
			LocalNodeRpcScenarios.scenarios[name],
			LocalNodeRpcScenarios.gethierarchicalstrip
		)
	}
	assert.equal(LocalNodeProxy.RpcScenarios, LocalNodeRpcScenarios)
})

test('_map.js registers rpc-scenarios.js before index.js', () => {
	const fs = require('node:fs')
	const map = fs.readFileSync(path.join(root, 'js/_map.js'), 'utf8')
	const scenarios = map.indexOf('js/lib/client/localnode/rpc-scenarios.js')
	const index = map.indexOf('js/lib/client/localnode/index.js')
	assert.ok(scenarios > -1)
	assert.ok(index > scenarios)
})

test('without enrichment helpers still normalizes array to contents', async () => {
	const posts = [
		{ txid: 'a', address: 'addr1', type: 'share' },
		{ txid: 'b', address: 'addr2', type: 'video', u: 'https://pt.example/v' },
	]
	const out = await LocalNodeRpcScenarios.run('gethierarchicalstrip', {
		method: 'gethierarchicalstrip',
		parameters: [],
		options: {},
		rpc: async function () {
			return posts
		},
		peertube: null,
	})
	assert.ok(out.contents)
	assert.equal(out.contents.length, 2)
	assert.equal(out.users, undefined)
	assert.equal(out.videos, undefined)
})

test('ex scenario attaches users from lastComment and peertube videos', async () => {
	const posts = [
		{
			txid: 't1',
			address: 'author1',
			type: 'share',
			lastComment: { address: 'commenter1' },
		},
		{
			txid: 't2',
			address: 'author2',
			type: 'video',
			u: encodeURIComponent('https://trusted.example/videos/watch/abc'),
			lastComment: { address: 'author2' },
		},
		{ address: 'orphan' },
	]

	const rpcCalls = []
	const rpc = async function (method, parameters) {
		rpcCalls.push({ method, parameters })
		if (method === 'gethierarchicalstrip') return posts
		if (method === 'getuserprofile') {
			return [{ address: 'commenter1', name: 'C' }]
		}
		throw new Error('unexpected ' + method)
	}

	const peertube = {
		ensureList: async function () {
			return []
		},
		getSwarms: function () {
			return [[{ host: 'trusted.example' }]]
		},
		getArchivedHosts: function () {
			return []
		},
		videos: async function (data) {
			assert.deepEqual(data.urls, [
				'https://trusted.example/videos/watch/abc',
			])
			assert.equal(data.fast, true)
			return { 'https://trusted.example/videos/watch/abc': { uuid: 'abc' } }
		},
	}

	const out = await LocalNodeRpcScenarios.run('gethierarchicalstrip', {
		method: 'gethierarchicalstrip',
		parameters: [0, '', 10],
		options: { ex: true, node: 'n1' },
		rpc: rpc,
		peertube: peertube,
	})

	assert.equal(out.contents.length, 2)
	assert.deepEqual(out.users, [{ address: 'commenter1', name: 'C' }])
	assert.equal(out.videos['https://trusted.example/videos/watch/abc'].uuid, 'abc')

	assert.equal(rpcCalls[0].method, 'gethierarchicalstrip')
	assert.equal(rpcCalls[1].method, 'getuserprofile')
	assert.deepEqual(rpcCalls[1].parameters, [['commenter1'], '1'])
})

test('gethotposts does not fetch comment-author users but still loads videos', async () => {
	const posts = [
		{
			txid: 't1',
			address: 'author1',
			type: 'video',
			u: 'https://trusted.example/v1',
			lastComment: { address: 'commenter1' },
		},
	]
	const rpcCalls = []
	const out = await LocalNodeRpcScenarios.run('gethotposts', {
		method: 'gethotposts',
		parameters: [],
		rpc: async function (method) {
			rpcCalls.push(method)
			if (method === 'gethotposts') return { contents: posts }
			throw new Error('no users expected')
		},
		peertube: {
			ensureList: async function () {
				return []
			},
			getSwarms: function () {
				return [[{ host: 'trusted.example' }]]
			},
			getArchivedHosts: function () {
				return []
			},
			videos: async function () {
				return { 'https://trusted.example/v1': { uuid: 'v1' } }
			},
		},
	})

	assert.equal(out.users, undefined)
	assert.ok(out.videos)
	assert.deepEqual(rpcCalls, ['gethotposts'])
})

test('videos failure still resolves with contents', async () => {
	const posts = [
		{
			txid: 't1',
			address: 'a',
			type: 'video',
			u: 'https://trusted.example/v',
		},
	]
	const out = await LocalNodeRpcScenarios.run('getprofilefeed', {
		method: 'getprofilefeed',
		parameters: [],
		rpc: async function () {
			return posts
		},
		peertube: {
			ensureList: async function () {
				return []
			},
			getSwarms: function () {
				return [[{ host: 'trusted.example' }]]
			},
			getArchivedHosts: function () {
				return []
			},
			videos: async function () {
				throw new Error('peertube down')
			},
		},
	})
	assert.equal(out.contents.length, 1)
	assert.equal(out.videos, undefined)
})

test('LocalNodeProxy.rpc with ex runs scenario; without ex skips enrichment', async () => {
	const posts = [
		{
			txid: 't1',
			address: 'author1',
			type: 'share',
			lastComment: { address: 'commenter1' },
		},
	]
	let baseCalls = 0
	const proxy = new LocalNodeProxy(null, {
		createStore: false,
		manager: {
			requestRpc: async function () {
				baseCalls++
				return posts
			},
			find: function () {
				return {
					key: 'n1',
					host: 'node.example',
					canuse: true,
					allowRpc: true,
					export: function () {
						return { canuse: true, allowRpc: true, key: 'n1' }
					},
				}
			},
			selectProbability: function () {
				return this.find()
			},
			selectbest: function () {
				return this.find()
			},
			canuseNodes: function () {
				return [this.find()]
			},
		},
		allowlist: {
			isAllowed: function () {
				return true
			},
			pathFor: function () {
				return '/public/'
			},
		},
		peertube: {
			ensureList: async function () {
				return []
			},
			getSwarms: function () {
				return []
			},
			getArchivedHosts: function () {
				return []
			},
			videos: async function () {
				return {}
			},
		},
		cache: null,
	})
	proxy.current = proxy.manager.find()

	const plain = await proxy.rpc('gethierarchicalstrip', [], { node: 'n1' })
	assert.ok(Array.isArray(plain) || plain.contents)
	assert.equal(plain.users, undefined)
	assert.equal(baseCalls, 1)

	const enriched = await proxy.rpc('gethierarchicalstrip', [], {
		node: 'n1',
		ex: true,
	})
	assert.equal(enriched.contents.length, 1)
	assert.ok(enriched.users)
	assert.equal(baseCalls >= 2, true)
})

test('untrusted video hosts are filtered out', async () => {
	const posts = [
		{
			txid: 't1',
			address: 'a',
			type: 'video',
			u: 'https://evil.example/v',
		},
	]
	let videosCalled = false
	const out = await LocalNodeRpcScenarios.run('getsubscribesfeed', {
		method: 'getsubscribesfeed',
		parameters: [],
		rpc: async function () {
			return posts
		},
		peertube: {
			ensureList: async function () {
				return []
			},
			getSwarms: function () {
				return [[{ host: 'trusted.example' }]]
			},
			getArchivedHosts: function () {
				return []
			},
			videos: async function () {
				videosCalled = true
				return {}
			},
		},
	})
	assert.equal(videosCalled, false)
	assert.equal(out.videos, undefined)
})
