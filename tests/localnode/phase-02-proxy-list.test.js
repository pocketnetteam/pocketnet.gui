// Phase 2: proxy list meta, ping predicate, static api.js wiring
// (docs/local-node-proxy/TESTING.md). No browser/Api boot required.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const stubPath = path.join(root, 'js/lib/client/localnode/index.js')
const apiPath = path.join(root, 'js/lib/client/api.js')
const LocalNodeProxy = require(stubPath)

test('proxyListMeta is direct+localnodes with stable id localnodes:0:0', () => {
	const meta = LocalNodeProxy.proxyListMeta()

	assert.deepEqual(meta, {
		direct: true,
		localnodes: true,
		host: 'localnodes',
		port: 0,
		wss: 0,
	})
	assert.equal(LocalNodeProxy.proxyListId(meta), 'localnodes:0:0')
	assert.equal(LocalNodeProxy.proxyListId(), 'localnodes:0:0')
})

test('facade ping resolves; isPingOk accepts stub shape, rejects null/non-object', async () => {
	const p = new LocalNodeProxy(null)
	const result = await p.ping()

	assert.equal(result.session, 'localnodes')
	assert.equal(result.height, 0)
	assert.equal(result.stub, true)
	assert.equal(LocalNodeProxy.isPingOk(result), true)
	assert.equal(LocalNodeProxy.isPingOk({ session: 'x', height: 1 }), true)
	assert.equal(LocalNodeProxy.isPingOk(null), false)
	assert.equal(LocalNodeProxy.isPingOk(undefined), false)
	assert.equal(LocalNodeProxy.isPingOk('ok'), false)
	assert.equal(LocalNodeProxy.isPingOk(true), false)
})

test('api.js registers addlocalnodeproxy from manage.init; does not persist localnodes via that helper', () => {
	const apiSrc = fs.readFileSync(apiPath, 'utf8')

	assert.match(apiSrc, /addlocalnodeproxy\s*:\s*function/)
	assert.match(apiSrc, /return this\.addlocalnodeproxy\(\)/)
	assert.match(apiSrc, /LocalNodeProxy\.proxyListMeta/)
	assert.match(apiSrc, /self\.localnodes\s*=\s*meta\.localnodes/)

	const addFnMatch = apiSrc.match(
		/addlocalnodeproxy\s*:\s*function\s*\(\)\s*\{[\s\S]*?\n\s*\},/
	)

	assert.ok(addFnMatch, 'addlocalnodeproxy function body extractable')
	assert.doesNotMatch(
		addFnMatch[0],
		/listofproxies/,
		'addlocalnodeproxy must not write listofproxies'
	)
	assert.doesNotMatch(addFnMatch[0], /localStorage/)
})

test('get.working still excludes direct proxies (static)', () => {
	const apiSrc = fs.readFileSync(apiPath, 'utf8')
	const workingMatch = apiSrc.match(
		/working\s*:\s*function\s*\(\)\s*\{[\s\S]*?return !proxy\.direct[\s\S]*?\},\s*\n\s*direct\s*:/
	)

	assert.ok(
		workingMatch,
		'working() must filter with !proxy.direct before direct:'
	)
	assert.match(workingMatch[0], /return !proxy\.direct/)
	assert.match(
		workingMatch[0],
		/_\.filter\(_proxies,\s*function/,
		'working() ping results must map onto remotes-only _proxies'
	)
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
		LocalNodeProxy.pickDirectProxy([localDirect, electronDirect], {
			_Electron: true,
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
	assert.equal(
		LocalNodeProxy.pickDirectProxy([localDirect, remote], { electron: true }),
		localDirect
	)
	assert.equal(
		LocalNodeProxy.pickDirectProxy([electronDirect], { cordova: true }),
		electronDirect
	)
	assert.equal(LocalNodeProxy.pickDirectProxy([remote], {}), undefined)
	assert.equal(LocalNodeProxy.pickDirectProxy([], {}), undefined)
	assert.equal(LocalNodeProxy.pickDirectProxy(null, {}), undefined)
})

test('get.direct uses pickDirectProxy; changeProxyIfNeedWithDirect still falls back (static)', () => {
	const apiSrc = fs.readFileSync(apiPath, 'utf8')

	assert.match(apiSrc, /LocalNodeProxy\.pickDirectProxy\(proxies,\s*env\)/)
	assert.match(
		apiSrc,
		/changeProxyIfNeedWithDirect\s*=\s*function\(\)\s*\{[\s\S]*?self\.get\.direct\(\)/
	)
})

test('Proxy16 localnodes routes name/rpc/fetch/ping; System16 gated off (static)', () => {
	const apiSrc = fs.readFileSync(apiPath, 'utf8')

	assert.match(
		apiSrc,
		/new System16\(app,\s*self,\s*self\.direct\s*&&\s*!self\.localnodes\)/
	)
	// Phase 6 localizes the display name; keep Electron string literal unchanged.
	assert.match(apiSrc, /app\.localization\.e\('localNodeProxy'\)/)
	assert.match(apiSrc, /if \(self\.direct\) return 'Electron Proxy'/)
	assert.match(
		apiSrc,
		/self\.localNodeProxy\.rpc\(method,\s*parameters,\s*options\)/
	)
	assert.match(apiSrc, /self\.localNodeProxy\.ping\(\)/)
	assert.match(
		apiSrc,
		/if \(self\.direct\s*&&\s*!self\.localnodes\) \{\s*self\.system\.listen\(\)/
	)
	assert.match(
		apiSrc,
		/if\(self\.direct\s*&&\s*!self\.localnodes\)\s*self\.system\.stop\(\)/
	)

	const localFetchMatch = apiSrc.match(
		/if \(self\.localnodes\) \{[\s\S]*?return Promise\.reject\('notimplemented'\)\s*\}/
	)

	assert.ok(localFetchMatch, 'localnodes fetch early-return block extractable')
	assert.match(
		localFetchMatch[0],
		/self\.localNodeProxy\.fetch\(path,\s*data\)/,
		'Phase 4+ routes localnodes fetch via LocalNodeProxy.fetch'
	)
	assert.match(localFetchMatch[0], /path === 'ping'/)
	assert.match(localFetchMatch[0], /self\.localNodeProxy\.ping\(\)/)
	assert.doesNotMatch(
		localFetchMatch[0],
		/self\.system\.fetch/,
		'localnodes fetch branch must not call System16'
	)
})
