// Live check: the production proxy that index.php uses for previews (minimize.js -> vars.prod.proxypath)
// is reachable and gives a real post preview. Needs network access.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { render, root } = require('./helpers')

// a public video post that must keep its preview
const TXID = 'e296047f6bc692f132a880741b18270014ac2ab600994368491c814a7fefb9e4'

function prodProxypath() {
	const src = fs.readFileSync(path.join(root, 'minimize.js'), 'utf8')
	const m = src.match(/prod\s*:\s*{\s*proxypath\s*:\s*'"([^"]+)"'/)

	assert.ok(m, 'prod proxypath not found in minimize.js')

	return m[1]
}

test('prod proxy answers getrawtransactionwithmessagebyid', async () => {
	const proxypath = prodProxypath()
	const res = await fetch(proxypath + 'rpc/getrawtransactionwithmessagebyid', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ method: 'getrawtransactionwithmessagebyid', parameters: [[TXID]] }),
		signal: AbortSignal.timeout(10000),
	})

	assert.equal(res.status, 200, proxypath + ' returned ' + res.status)

	const json = await res.json()

	assert.ok(Array.isArray(json.data) && json.data.length, 'no post in response: ' + JSON.stringify(json).slice(0, 300))
	assert.ok(json.data[0].address, 'post has no address')
})

test('telegram preview of a real post', async () => {
	const { tags, ms } = await render({
		uri: '/index?v=' + TXID + '&video=1',
		ua: 'TelegramBot (like TwitterBot)',
		proxypath: prodProxypath(),
	})

	assert.notEqual(tags['og:title'], 'Bastyon: First Fully Decentralized Social Network on Blockchain', 'preview has default title')
	assert.match(tags['og:image'] || '', /^https?:\/\//, 'preview has no absolute image')
	assert.ok(ms < 10000, 'took ' + ms + 'ms, bots will give up')
})
