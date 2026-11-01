// Phase 1: transport URL builders, modes, browser→relay rewrite, mock fetch
// (docs/local-node-proxy/TESTING.md). No real network / CORS in CI.
const { test, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const transportPath = path.join(root, 'js/lib/client/localnode/transport.js')
const relayPath = path.join(root, 'scripts/local-node-cors-relay.js')
const Transport = require(transportPath)
const Relay = require(relayPath)

const saved = {}

beforeEach(() => {
	saved.window = global.window
	saved.fetch = global.fetch
	Transport.setMode('auto')
	Transport.setRelayBase(null)
	Transport.setRelayAllowed(null)
})

afterEach(() => {
	if (saved.window === undefined) delete global.window
	else global.window = saved.window

	if (saved.fetch === undefined) delete global.fetch
	else global.fetch = saved.fetch

	Transport.setMode('auto')
	Transport.setRelayBase(null)
	Transport.setRelayAllowed(null)
})

test('transport.js exists and is registered in js/_map.js before index.js', () => {
	assert.ok(fs.existsSync(transportPath))

	const mapSrc = fs.readFileSync(path.join(root, 'js/_map.js'), 'utf8')
	const transportIdx = mapSrc.indexOf('js/lib/client/localnode/transport.js')
	const indexIdx = mapSrc.indexOf('js/lib/client/localnode/index.js')

	assert.ok(transportIdx !== -1)
	assert.ok(indexIdx !== -1)
	assert.ok(transportIdx < indexIdx)
})

test('buildPublicUrl and buildPostUrl', () => {
	assert.equal(
		Transport.buildPublicUrl('1.2.3.4', 38081, false),
		'http://1.2.3.4:38081/public/'
	)
	assert.equal(
		Transport.buildPublicUrl('seed.example', 443, true),
		'https://seed.example:443/public/'
	)
	assert.equal(
		Transport.buildPublicUrl('1.2.3.4', null, false),
		'http://1.2.3.4:38081/public/'
	)
	assert.equal(
		Transport.buildPostUrl('1.2.3.4', 38081, false),
		'http://1.2.3.4:38081/post/'
	)
})

test('buildJsonRpcBody matches public POST shape', () => {
	assert.deepEqual(Transport.buildJsonRpcBody('getnodeinfo', [], 1), {
		jsonrpc: '2.0',
		method: 'getnodeinfo',
		params: [],
		id: 1
	})
	assert.deepEqual(Transport.buildJsonRpcBody('getnodeinfo'), {
		jsonrpc: '2.0',
		method: 'getnodeinfo',
		params: [],
		id: 1
	})
})

test('browser relay header contract from public/post URLs', () => {
	const httpPublic = Transport.buildPublicUrl('seed.example', 38081, false)
	const httpRelay = Transport.buildBrowserRelay(httpPublic)

	assert.equal(httpRelay.url, 'http://127.0.0.1:18081/public/')
	assert.deepEqual(httpRelay.headers, {
		'X-Node-Host': 'seed.example',
		'X-Node-Port': '38081',
		'X-Node-TLS': '0'
	})

	const named = Transport.buildBrowserRelay(
		httpPublic,
		null,
		'getrawtransactionwithmessagebyid'
	)
	assert.equal(
		named.url,
		'http://127.0.0.1:18081/public/getrawtransactionwithmessagebyid'
	)

	const httpsPost = Transport.buildPostUrl('node.local', 443, true)
	const httpsRelay = Transport.buildBrowserRelay(httpsPost)

	assert.equal(httpsRelay.url, 'http://127.0.0.1:18081/post/')
	assert.deepEqual(httpsRelay.headers, {
		'X-Node-Host': 'node.local',
		'X-Node-Port': '443',
		'X-Node-TLS': '1'
	})
})

test('setRelayBase and window.localNodeCorsRelay override default', () => {
	assert.equal(Transport.getRelayBase(), Transport.DEFAULT_RELAY_BASE)

	Transport.setRelayBase('http://127.0.0.1:19099/')
	assert.equal(Transport.getRelayBase(), 'http://127.0.0.1:19099')

	const rewritten = Transport.buildBrowserRelay(
		'http://seed.example:38081/public/'
	)
	assert.equal(rewritten.url, 'http://127.0.0.1:19099/public/')

	Transport.setRelayBase(null)
	global.window = { localNodeCorsRelay: 'http://127.0.0.1:19111' }
	assert.equal(Transport.getRelayBase(), 'http://127.0.0.1:19111')
})

test('cors relay script exists; resolveTarget matches header contract', () => {
	assert.ok(fs.existsSync(relayPath))
	assert.equal(Relay.BIND_HOST, '127.0.0.1')
	assert.equal(Relay.DEFAULT_PORT, 18081)

	const ok = Relay.resolveTarget(
		{
			'X-Node-Host': 'seed.example',
			'X-Node-Port': '38081',
			'X-Node-TLS': '0'
		},
		'/public/'
	)
	assert.equal(ok.ok, true)
	assert.equal(ok.url, 'http://seed.example:38081/public/')

	const tlsPost = Relay.resolveTarget(
		{
			'x-node-host': 'node.local',
			'x-node-port': '443',
			'x-node-tls': '1'
		},
		'/post'
	)
	assert.equal(tlsPost.ok, true)
	assert.equal(tlsPost.url, 'https://node.local:443/post/')

	const missing = Relay.resolveTarget({}, '/public/')
	assert.equal(missing.ok, false)
	assert.equal(missing.status, 400)
	assert.match(missing.message, /missing X-Node-Host/i)

	const badPath = Relay.resolveTarget({ 'X-Node-Host': 'seed.example' }, '/admin/')
	assert.equal(badPath.ok, false)
	assert.equal(badPath.status, 404)

	const withMethod = Relay.resolveTarget(
		{
			'X-Node-Host': 'seed.example',
			'X-Node-Port': '38081',
			'X-Node-TLS': '0'
		},
		'/public/getrawtransactionwithmessagebyid'
	)
	assert.equal(withMethod.ok, true)
	assert.equal(withMethod.path, '/public/')
	assert.equal(withMethod.url, 'http://seed.example:38081/public/')
})

test('setMode / getMode / auto resolves cordova when plugin present', () => {
	assert.equal(Transport.getMode(), 'auto')

	Transport.setMode('browser')
	assert.equal(Transport.getMode(), 'browser')
	assert.equal(Transport.resolvedMode(), 'browser')

	Transport.setMode('cordova')
	assert.equal(Transport.resolvedMode(), 'cordova')

	Transport.setMode('auto')
	global.window = {}
	assert.equal(Transport.resolvedMode(), 'browser')

	global.window = {
		cordova: {
			plugin: {
				http: {
					sendRequest: function () {}
				}
			}
		}
	}
	assert.equal(Transport.resolvedMode(), 'cordova')
})

test('request rejects missing url', async () => {
	await assert.rejects(
		() => Transport.request({}),
		(err) => err && err.code === -1 && err.message === 'missingurl'
	)
})

test('browser request rewrites through relay; parses JSON; no real network', async () => {
	Transport.setMode('browser')
	Transport.setRelayAllowed(true)

	let called = null

	global.fetch = async (url, opts) => {
		called = { url, opts }

		return {
			status: 200,
			text: async () => JSON.stringify({ result: { ok: true }, id: 1 })
		}
	}

	const body = Transport.buildJsonRpcBody('getnodeinfo', [], 1)
	const out = await Transport.request({
		url: 'http://1.2.3.4:38081/public/',
		method: 'POST',
		body
	})

	assert.deepEqual(out, { result: { ok: true }, id: 1 })
	assert.equal(called.url, 'http://127.0.0.1:18081/public/getnodeinfo')
	assert.equal(called.opts.method, 'POST')
	assert.equal(called.opts.body, JSON.stringify(body))
	assert.equal(called.opts.headers['Content-Type'], 'application/json')
	assert.equal(called.opts.headers.Accept, 'application/json')
	assert.equal(called.opts.headers['X-Node-Host'], '1.2.3.4')
	assert.equal(called.opts.headers['X-Node-Port'], '38081')
	assert.equal(called.opts.headers['X-Node-TLS'], '0')
})

test('browser request rejects unparseable node url', async () => {
	Transport.setMode('browser')
	Transport.setRelayAllowed(true)

	let fetchCalled = false
	global.fetch = async () => {
		fetchCalled = true
		return { status: 200, text: async () => '{}' }
	}

	await assert.rejects(
		() => Transport.request({ url: 'http://127.0.0.1:18081/admin/' }),
		(err) => err && err.code === -1 && err.message === 'badnodeurl'
	)
	assert.equal(fetchCalled, false)
})

test('browser request rejects non-2xx with code', async () => {
	Transport.setMode('browser')
	Transport.setRelayAllowed(true)

	global.fetch = async () => ({
		status: 502,
		text: async () => JSON.stringify({ message: 'bad gateway' })
	})

	await assert.rejects(
		() =>
			Transport.request({
				url: 'http://1.2.3.4:38081/public/',
				body: { method: 'getnodeinfo' }
			}),
		(err) => err && err.code === 502 && err.message === 'bad gateway'
	)
})

test('browser relay gated off on production web host (no 127.0.0.1 rewrite)', async () => {
	Transport.setMode('browser')
	Transport.setRelayAllowed(null)

	global.window = {
		location: { hostname: 'bastyon.com' }
	}

	let fetchCalled = false
	global.fetch = async () => {
		fetchCalled = true
		return { status: 200, text: async () => '{}' }
	}

	assert.equal(Transport.shouldUseBrowserRelay(), false)

	await assert.rejects(
		() =>
			Transport.request({
				url: 'http://1.2.3.4:38081/public/',
				body: { method: 'getnodeinfo' }
			}),
		(err) => err && err.code === -1 && err.message === 'relaydisabled'
	)
	assert.equal(fetchCalled, false)

	global.window.localNodeProxy = true
	assert.equal(Transport.shouldUseBrowserRelay(), true)
})

test('DEFAULT_TIMEOUT_MS is in ProxyRequest 30–55s family', () => {
	assert.equal(Transport.DEFAULT_TIMEOUT_MS, 30000)
	assert.ok(Transport.DEFAULT_TIMEOUT_MS >= 30000)
	assert.ok(Transport.DEFAULT_TIMEOUT_MS <= 55000)
})

test('cordova request does not rewrite through relay', async () => {
	Transport.setMode('cordova')

	let called = null

	global.window = {
		cordova: {
			plugin: {
				http: {
					sendRequest: function (url, options, success) {
						called = { url, options }
						success({
							status: 200,
							data: { result: { ok: true }, id: 1 }
						})
					}
				}
			}
		}
	}

	await Transport.request({
		url: 'http://1.2.3.4:38081/public/',
		method: 'POST',
		body: Transport.buildJsonRpcBody('getnodeinfo', [], 1)
	})

	assert.equal(called.url, 'http://1.2.3.4:38081/public/')
	assert.equal(called.options.headers['X-Node-Host'], undefined)
})

test('cordova request invokes sendRequest with json options; no real network', async () => {
	Transport.setMode('cordova')

	let called = null
	const body = Transport.buildJsonRpcBody('getnodeinfo', [], 1)

	global.window = {
		cordova: {
			plugin: {
				http: {
					sendRequest: function (url, options, success) {
						called = { url, options }
						success({
							status: 200,
							data: { result: { ok: true }, id: 1 }
						})
					}
				}
			}
		}
	}

	const out = await Transport.request({
		url: 'http://1.2.3.4:38081/public/',
		method: 'POST',
		body,
		timeout: 1500
	})

	assert.deepEqual(out, { result: { ok: true }, id: 1 })
	assert.equal(called.url, 'http://1.2.3.4:38081/public/')
	assert.equal(called.options.method, 'post')
	assert.equal(called.options.serializer, 'json')
	assert.equal(called.options.responseType, 'json')
	assert.deepEqual(called.options.data, body)
	assert.equal(called.options.timeout, 2)
	assert.equal(called.options.headers.Accept, 'application/json')
	assert.equal(
		called.options.headers['Content-Type'],
		'application/json;charset=utf-8'
	)
})

test('cordova request rejects non-2xx and plugin timeout (-8 → 20)', async () => {
	Transport.setMode('cordova')

	global.window = {
		cordova: {
			plugin: {
				http: {
					sendRequest: function (url, options, success) {
						success({
							status: 502,
							data: { message: 'bad gateway' }
						})
					}
				}
			}
		}
	}

	await assert.rejects(
		() =>
			Transport.request({
				url: 'http://1.2.3.4:38081/public/',
				body: { method: 'getnodeinfo' }
			}),
		(err) => err && err.code === 502 && err.message === 'bad gateway'
	)

	global.window = {
		cordova: {
			plugin: {
				http: {
					sendRequest: function (url, options, success, failure) {
						failure({ status: -8, error: 'timeout' })
					}
				}
			}
		}
	}

	await assert.rejects(
		() =>
			Transport.request({
				url: 'http://1.2.3.4:38081/public/',
				body: { method: 'getnodeinfo' }
			}),
		(err) => err && err.code === 20 && err.message === 'timeout'
	)
})

test('cordova mode without plugin rejects nocordovahttp', async () => {
	Transport.setMode('cordova')
	global.window = {}

	await assert.rejects(
		() =>
			Transport.request({
				url: 'http://1.2.3.4:38081/public/',
				body: { method: 'getnodeinfo' }
			}),
		(err) => err && err.code === -1 && err.message === 'nocordovahttp'
	)
})
