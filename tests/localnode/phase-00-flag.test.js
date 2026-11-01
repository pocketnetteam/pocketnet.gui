// Phase 0: LocalNodeProxy stub + isEnabled defaults (docs/local-node-proxy/TESTING.md)
const { test, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const stubPath = path.join(root, 'js/lib/client/localnode/index.js')
const LocalNodeProxy = require(stubPath)

const saved = {}

beforeEach(() => {
	saved.window = global.window
	saved._Electron = global._Electron
	saved.deep = global.deep
})

afterEach(() => {
	if (saved.window === undefined) delete global.window
	else global.window = saved.window

	if (saved._Electron === undefined) delete global._Electron
	else global._Electron = saved._Electron

	if (saved.deep === undefined) delete global.deep
	else global.deep = saved.deep
})

test('stub file exists and is registered in js/_map.js', () => {
	assert.ok(fs.existsSync(stubPath))

	const mapSrc = fs.readFileSync(path.join(root, 'js/_map.js'), 'utf8')

	assert.match(mapSrc, /js\/lib\/client\/localnode\/index\.js/)
})

test('rpc without manager: getnodeinfo → nomanager; private → methodnotallowed; ping stub', async () => {
	const p = new LocalNodeProxy(null)

	// Allowed public still needs a manager; privates fail closed before transport.
	await assert.rejects(
		() => p.rpc('getnodeinfo', []),
		(err) => err && err.code === -1 && err.message === 'nomanager'
	)
	await assert.rejects(
		() => p.rpc('getbalance', []),
		(err) => err && err.code === -32601 && err.message === 'methodnotallowed'
	)

	const ping = await p.ping()

	assert.equal(ping.stub, true)
	assert.equal(ping.session, 'localnodes')
	assert.equal(typeof ping.height, 'number')
})

test('window.localNodeProxy true/false overrides everything', () => {
	global.window = { localNodeProxy: true, location: { hostname: 'bastyon.com' } }
	global._Electron = true
	assert.equal(LocalNodeProxy.isEnabled(null), true)

	global.window.localNodeProxy = false
	global.window.cordova = {}
	assert.equal(LocalNodeProxy.isEnabled({ options: { localNodeProxy: true } }), false)
})

test('app.options.localNodeProxy true/false when window override unset', () => {
	global.window = { location: { hostname: 'bastyon.com' } }
	delete global.window.localNodeProxy

	assert.equal(LocalNodeProxy.isEnabled({ options: { localNodeProxy: true } }), true)
	assert.equal(LocalNodeProxy.isEnabled({ options: { localNodeProxy: false } }), false)
})

test('default: Cordova on, Electron off, localhost on, production host off', () => {
	global.window = { cordova: {}, location: { hostname: 'bastyon.com' } }
	assert.equal(LocalNodeProxy.isEnabled(null), true)

	delete global.window.cordova
	global._Electron = true
	assert.equal(LocalNodeProxy.isEnabled(null), false)

	delete global._Electron
	global.window = { location: { hostname: 'localhost' } }
	assert.equal(LocalNodeProxy.isEnabled(null), true)

	global.window = { testpocketnet: true, location: { hostname: 'bastyon.com' } }
	assert.equal(LocalNodeProxy.isEnabled(null), true)

	global.window = { location: { hostname: 'bastyon.com' } }
	assert.equal(LocalNodeProxy.isEnabled(null), false)
})

test('instance isEnabled uses same helper with app', () => {
	global.window = { location: { hostname: 'bastyon.com' } }
	const p = new LocalNodeProxy({ options: { localNodeProxy: true } })

	assert.equal(p.isEnabled(), true)
})
