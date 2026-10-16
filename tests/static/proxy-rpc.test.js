// RPC methods used by link previews (php/rpc.php) are allowed by proxy16, otherwise previews silently fall back to defaults
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')

const rpcphp = fs.readFileSync(path.join(root, 'php/rpc.php'), 'utf8')
const rpcjs = fs.readFileSync(path.join(root, 'proxy16/node/rpc.js'), 'utf8')

const methods = [...rpcphp.matchAll(/\$action\s*=\s*'([a-z]+)'/g)].map((m) => m[1])

// proxy16/node/rpc.js has two maps for every public method: { method: true } and { method: 'signature' }
const allowed = (m) => new RegExp('\\b' + m + '\\s*:\\s*true\\b').test(rpcjs)
const signed = (m) => new RegExp('\\b' + m + "\\s*:\\s*'[^']*'").test(rpcjs)

test('php/rpc.php methods found', () => {
	assert.ok(methods.includes('getrawtransactionwithmessagebyid'), 'methods: ' + methods.join(', '))
})

test('preview rpc methods are allowed in proxy16', () => {
	assert.deepEqual(methods.filter((m) => !allowed(m)), [])
})

test('preview rpc methods have signatures in proxy16', () => {
	assert.deepEqual(methods.filter((m) => !signed(m)), [])
})
