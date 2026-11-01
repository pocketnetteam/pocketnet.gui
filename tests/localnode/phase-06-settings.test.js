// Phase 6: settings / failover regressions (TESTING.md + plans/phase-06.md).
// Static api.js + thin pickDirectProxy / empty-local RPC units; no browser boot / live RPC.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const apiPath = path.join(root, 'js/lib/client/api.js')
const LocalNodeProxy = require(path.join(root, 'js/lib/client/localnode/index.js'))
const LocalNode = require(path.join(root, 'js/lib/client/localnode/node.js'))
const LocalNodeManager = require(path.join(root, 'js/lib/client/localnode/manager.js'))
const LocalNodeUtil = require(path.join(root, 'js/lib/client/localnode/util.js'))
const LocalNodeConstants = require(path.join(root, 'js/lib/client/localnode/constants.js'))
const LocalNodeTransport = require(path.join(root, 'js/lib/client/localnode/transport.js'))
const { createFakeClock, createMockTransport } = require('./helpers.js')

function readApi() {
	return fs.readFileSync(apiPath, 'utf8')
}

test('get.working still filters remotes-only with !proxy.direct (static)', () => {
	const apiSrc = readApi()
	const workingMatch = apiSrc.match(
		/working\s*:\s*function\s*\(\)\s*\{[\s\S]*?return !proxy\.direct[\s\S]*?\},\s*\n\s*direct\s*:/
	)

	assert.ok(workingMatch, 'working() must filter with !proxy.direct before direct:')
	assert.match(workingMatch[0], /return !proxy\.direct/)
	assert.match(
		workingMatch[0],
		/Remotes only/,
		'working() documents remotes-only (excludes Electron + Local Node Proxy)'
	)
})

test('changeProxyIfNeedWithDirect falls back via get.direct; get.direct uses pickDirectProxy (static)', () => {
	const apiSrc = readApi()

	assert.match(
		apiSrc,
		/changeProxyIfNeedWithDirect\s*=\s*function\(\)\s*\{[\s\S]*?self\.get\.direct\(\)/
	)
	assert.match(apiSrc, /LocalNodeProxy\.pickDirectProxy\(proxies,\s*env\)/)

	const directMatch = apiSrc.match(
		/direct\s*:\s*function\(\)\s*\{[\s\S]*?\},\s*\n\s*directpr\s*:/
	)

	assert.ok(directMatch, 'get.direct body extractable')
	assert.match(directMatch[0], /LocalNodeProxy\.pickDirectProxy/)
	assert.match(directMatch[0], /electron\s*:/)
	assert.match(directMatch[0], /cordova\s*:/)
})

test('Proxy16.get.name for localnodes uses localization key localNodeProxy (static)', () => {
	const apiSrc = readApi()
	const nameMatch = apiSrc.match(
		/name\s*:\s*function\s*\(\)\s*\{[\s\S]*?if \(self\.direct\) return 'Electron Proxy'[\s\S]*?\},\s*\n\s*info\s*:/
	)

	assert.ok(nameMatch, 'get.name body extractable')
	assert.match(
		nameMatch[0],
		/app\.localization\.e\('localNodeProxy'\)/,
		'localnodes name must call localization.e(localNodeProxy)'
	)
	assert.doesNotMatch(
		nameMatch[0],
		/if \(self\.localnodes\) return 'Local Node Proxy'/,
		'must not use bare English-only early return for localnodes'
	)

	const en = fs.readFileSync(path.join(root, 'localization/en.js'), 'utf8')
	const ru = fs.readFileSync(path.join(root, 'localization/ru.js'), 'utf8')

	assert.match(en, /_l\.localNodeProxy\s*=\s*"Local Node Proxy"/)
	assert.match(ru, /_l\.localNodeProxy\s*=/)
})

test('pickDirectProxy prefers System16 on Electron, localnodes on Cordova/web', () => {
	const electronDirect = { id: 'localhost:0:0', direct: true, localnodes: false }
	const localDirect = { id: 'localnodes:0:0', direct: true, localnodes: true }
	const remote = { id: 'r:1:1', direct: false }

	assert.equal(
		LocalNodeProxy.pickDirectProxy([electronDirect, localDirect, remote], {
			electron: true,
		}),
		electronDirect
	)
	assert.equal(
		LocalNodeProxy.pickDirectProxy([electronDirect, localDirect], {
			cordova: true,
		}),
		localDirect
	)
	assert.equal(
		LocalNodeProxy.pickDirectProxy([electronDirect, localDirect], {}),
		localDirect
	)
	assert.equal(LocalNodeProxy.pickDirectProxy([remote], {}), undefined)
})

// --- T2 / ROADMAP 6.2: failover matrix (static + unit; no live remotes) ---

test('Api.rpc last-resort retry is capped (trying < 2) and only on !code|2000 (static)', () => {
	const apiSrc = readApi()
	const rpcCatch = apiSrc.match(
		/self\.rpc\s*=\s*function\(method,\s*parameters,\s*options,\s*trying\)[\s\S]*?self\.changeProxyIfNeedWithDirect[\s\S]*?trying\+\+[\s\S]*?return Promise\.reject\(e\)/
	)

	assert.ok(rpcCatch, 'Api.rpc catch with changeProxyIfNeedWithDirect extractable')
	assert.match(
		rpcCatch[0],
		/\(!e\.code\s*\|\|\s*e\.code\s*==\s*2000\)\s*&&\s*trying\s*<\s*2/
	)
	assert.match(rpcCatch[0], /trying\+\+/)
	assert.match(rpcCatch[0], /return self\.rpc\(method,\s*parameters,\s*options,\s*trying\)/)
})

test('changeProxyIfNeedWithDirect uses get.direct only when remotes path yields empty (static)', () => {
	const apiSrc = readApi()
	const body = apiSrc.match(
		/self\.changeProxyIfNeedWithDirect\s*=\s*function\(\)\s*\{[\s\S]*?self\.changeProxyIfNeed\(\)\.then\(l\s*=>\s*\{[\s\S]*?\}\)\.catch/
	)

	assert.ok(body, 'changeProxyIfNeedWithDirect body extractable')
	assert.match(body[0], /if\s*\(!l\)\s*\{/)
	assert.match(body[0], /self\.get\.direct\(\)/)
	assert.match(body[0], /self\.set\.current\(proxy\.id\)/)
})

test('empty / non-canuse catalog: ping rejects; rpc rejects without transport; canchange stops', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return Promise.reject(new Error('transport must not run for empty catalog'))
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

	// Already probed / non-canuse (inited): rpc must not re-hit transport.
	// Uninited candidates may still be probed by ensureRpcNode → probeSeedsHealth.
	manager.createNode(
		clock.nodeOptions({
			host: 'dead.example',
			port: 38081,
			inited: true,
			canuse: false,
			allowRpc: false,
		})
	)

	const proxy = new LocalNodeProxy(null, { manager: manager, transport: transport })

	await assert.rejects(() => proxy.ping(), (err) => {
		assert.equal(err.code, -1)
		assert.equal(err.message, 'nolocalnodes')
		return true
	})

	await assert.rejects(() => proxy.rpc('getnodeinfo', []), (err) => {
		assert.equal(err.code, -1)
		assert.equal(err.message, 'node')
		return true
	})

	assert.equal(transport.calls.length, 0, 'non-canuse catalog must not hit transport')

	const canchange = await proxy.canchangeNode({ node: 'dead.example:38081' })
	assert.deepEqual(canchange, {}, 'no usable alternative → empty object (Api stops retry)')
})

test('usable canuse node still selected for rpc after empty-path guard', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return {
			jsonrpc: '2.0',
			id: 1,
			result: { lastblock: { height: 42, hash: 'h' }, chain: 'main' },
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
			host: 'dead.example',
			port: 38081,
			inited: false,
			canuse: false,
			allowRpc: false,
		})
	)
	manager.createNode(
		clock.nodeOptions({
			host: 'good.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 42,
		})
	)

	const proxy = new LocalNodeProxy(null, { manager: manager, transport: transport })
	const info = await proxy.rpc('getnodeinfo', [])

	assert.equal(info.lastblock.height, 42)
	assert.ok(transport.calls.length >= 1)
	assert.match(transport.calls[0].url, /good\.example/)
})

// --- T4 / ROADMAP 6.4: timeouts, relay lock, empty UX localization ---

test('default RPC timeout is in 30–55s family; health stays shorter', () => {
	assert.equal(LocalNodeConstants.DEFAULT_RPC_TIMEOUT_MS, 30000)
	assert.ok(LocalNodeConstants.DEFAULT_RPC_TIMEOUT_MS >= 30000)
	assert.ok(LocalNodeConstants.DEFAULT_RPC_TIMEOUT_MS <= 55000)
	assert.equal(LocalNodeConstants.HEALTH_TIMEOUT_MS, 12000)
	assert.ok(LocalNodeConstants.HEALTH_TIMEOUT_MS < LocalNodeConstants.DEFAULT_RPC_TIMEOUT_MS)
	assert.equal(LocalNodeTransport.DEFAULT_TIMEOUT_MS, 30000)
})

test('requestRpc omits timeout → transport gets DEFAULT_RPC_TIMEOUT_MS (not health)', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return {
			jsonrpc: '2.0',
			id: 1,
			result: { ok: true },
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
	})

	const node = manager.createNode(
		clock.nodeOptions({
			host: 'rpc.example',
			port: 38081,
			inited: true,
			canuse: true,
			allowRpc: true,
			height: 1,
		})
	)

	await manager.requestRpc(node, 'getnodeinfo', [])

	assert.ok(transport.calls.length >= 1)
	assert.equal(
		transport.calls[0].timeout,
		LocalNodeConstants.DEFAULT_RPC_TIMEOUT_MS
	)
})

test('browser relay rewrite skipped when production host / disabled', async () => {
	const prevWindow = global.window
	const prevFetch = global.fetch
	const prevMode = LocalNodeTransport.getMode()

	try {
		LocalNodeTransport.setMode('browser')
		LocalNodeTransport.setRelayAllowed(null)
		global.window = { location: { hostname: 'bastyon.com' } }

		let fetchCalled = false
		global.fetch = async () => {
			fetchCalled = true
			return { status: 200, text: async () => '{}' }
		}

		assert.equal(LocalNodeTransport.shouldUseBrowserRelay(), false)
		await assert.rejects(
			() =>
				LocalNodeTransport.request({
					url: 'http://1.2.3.4:38081/public/',
					body: { method: 'getnodeinfo' },
				}),
			(err) => err && err.code === -1 && err.message === 'relaydisabled'
		)
		assert.equal(fetchCalled, false)

		global.window = { location: { hostname: 'localhost' } }
		assert.equal(LocalNodeTransport.shouldUseBrowserRelay(), true)

		global.window = { localNodeProxy: false, location: { hostname: 'localhost' } }
		assert.equal(LocalNodeTransport.shouldUseBrowserRelay(), false)
	} finally {
		if (prevWindow === undefined) delete global.window
		else global.window = prevWindow
		if (prevFetch === undefined) delete global.fetch
		else global.fetch = prevFetch
		LocalNodeTransport.setMode(prevMode)
		LocalNodeTransport.setRelayAllowed(null)
	}
})

test('system16 localnodes: only nodes+peertube UI; skip stats/chain/admin calls (static)', () => {
	const sysSrc = fs.readFileSync(
		path.join(root, 'components/system16/index.js'),
		'utf8'
	)
	const proxyTpl = fs.readFileSync(
		path.join(root, 'components/system16/templates/proxycontent.html'),
		'utf8'
	)
	const nodesTpl = fs.readFileSync(
		path.join(root, 'components/system16/templates/nodescontent.html'),
		'utf8'
	)
	const peertubeTpl = fs.readFileSync(
		path.join(root, 'components/system16/templates/peertubecontent.html'),
		'utf8'
	)

	assert.match(sysSrc, /localnodes\s*:\s*function\(\)\s*\{\s*return !!\(proxy && proxy\.localnodes\)/)
	assert.match(
		sysSrc,
		/if \(proxy && proxy\.localnodes\) return false/,
		'admin() must stay false for localnodes despite direct:true'
	)
	assert.match(
		sysSrc,
		/Local Node Proxy: info only[\s\S]*?if \(actions\.localnodes\(\)\)/,
		'make() must short-circuit after info for localnodes'
	)
	assert.match(sysSrc, /if \(actions\.localnodes\(\)\) return/)
	assert.match(proxyTpl, /if\(localnodes\)/)
	assert.match(proxyTpl, /nodesWrapper/)
	assert.match(proxyTpl, /peertubeWrapper/)
	assert.match(nodesTpl, /if\(!localnodes\)/)
	assert.match(peertubeTpl, /if\(!localnodes\)/)
})

test('empty ping rejects without throw; localization key for unavailable UX exists', async () => {
	const clock = createFakeClock()
	const transport = createMockTransport(function () {
		return Promise.reject(new Error('must not run'))
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
	const proxy = new LocalNodeProxy(null, { manager: manager, transport: transport })

	await assert.rejects(() => proxy.ping(), (err) => {
		assert.equal(err.code, -1)
		assert.equal(err.message, 'nolocalnodes')
		return true
	})
	assert.equal(transport.calls.length, 0)

	const en = fs.readFileSync(path.join(root, 'localization/en.js'), 'utf8')
	const ru = fs.readFileSync(path.join(root, 'localization/ru.js'), 'utf8')
	const proxiesTpl = fs.readFileSync(
		path.join(root, 'components/system16/templates/proxieslist.html'),
		'utf8'
	)

	assert.match(en, /_l\.localNodeProxyUnavailable\s*=/)
	assert.match(ru, /_l\.localNodeProxyUnavailable\s*=/)
	assert.match(proxiesTpl, /localnodes\s*&&\s*_proxy\.pingerror/)
	assert.match(proxiesTpl, /e\('localNodeProxyUnavailable'\)/)
})

test('isSystem16Direct true only for Electron System16 (direct && !localnodes)', () => {
	assert.equal(
		LocalNodeProxy.isSystem16Direct({ direct: true, localnodes: false }),
		true
	)
	assert.equal(
		LocalNodeProxy.isSystem16Direct({ direct: true, localnodes: true }),
		false
	)
	assert.equal(
		LocalNodeProxy.isSystem16Direct({ direct: false }),
		false
	)
	assert.equal(LocalNodeProxy.isSystem16Direct(null), false)
	assert.equal(LocalNodeProxy.isSystem16Direct(undefined), false)
})

test('selectUsing gates tor.stop/start on System16 direct, not localnodes (static)', () => {
	const sysSrc = fs.readFileSync(
		path.join(root, 'components/system16/index.js'),
		'utf8'
	)

	assert.match(
		sysSrc,
		/isSystem16Direct\(use\)\s*&&\s*!selected\.direct/,
		'tor.stop must require System16 current proxy'
	)
	assert.match(
		sysSrc,
		/isSystem16Direct\(selected\)\s*&&\s*settings\.tor/,
		'tor.start must require System16 selected proxy'
	)
	assert.doesNotMatch(
		sysSrc,
		/if\s*\(\s*!selected\.direct\s*\)\s*\{\s*use\.fetchauth\(\s*'manage'/,
		'must not fire tor.stop on any non-direct selected without System16 gate'
	)
})

test('transportsmanagement excludes localnodes from admin/Tor manage (static)', () => {
	const src = fs.readFileSync(
		path.join(root, 'components/transportsmanagement/index.js'),
		'utf8'
	)

	assert.match(
		src,
		/if \(proxy\.localnodes\) return false/,
		'admin() must stay false for localnodes'
	)
	assert.match(
		src,
		/electronDirect\s*:\s*function/,
		'must expose electronDirect helper'
	)
	assert.match(
		src,
		/actions\.electronDirect\(\)\s*\|\|\s*cordovaProxy/,
		'Tor settings panel only for System16 or Cordova torRunner'
	)
	assert.match(
		src,
		/else if \(actions\.electronDirect\(\)\)/,
		'save manage/set.server.settings only on System16'
	)
})
