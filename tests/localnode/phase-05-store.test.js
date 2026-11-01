// Phase 5: store helpers (memory); peer filter; version purge list; _map static.
// docs/local-node-proxy/TESTING.md
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const storePath = path.join(root, 'js/lib/client/localnode/store.js')
const constantsPath = path.join(root, 'js/lib/client/localnode/constants.js')
const nodePath = path.join(root, 'js/lib/client/localnode/node.js')
const LocalNodeStore = require(storePath)
const LocalNodeConstants = require(constantsPath)
const LocalNode = require(nodePath)

test('store.js registered in js/_map.js before manager.js and index.js', () => {
	assert.ok(fs.existsSync(storePath))

	const mapSrc = fs.readFileSync(path.join(root, 'js/_map.js'), 'utf8')
	const storeIdx = mapSrc.indexOf('js/lib/client/localnode/store.js')
	const managerIdx = mapSrc.indexOf('js/lib/client/localnode/manager.js')
	const indexIdx = mapSrc.indexOf('js/lib/client/localnode/index.js')

	assert.ok(storeIdx !== -1, 'store.js must be listed in _map.js')
	assert.ok(managerIdx !== -1, 'manager.js must be listed in _map.js')
	assert.ok(indexIdx !== -1, 'index.js must be listed in _map.js')
	assert.ok(storeIdx < managerIdx, 'store.js must load before manager.js')
	assert.ok(storeIdx < indexIdx, 'store.js must load before index.js')
})

test('docFromExport strips statistic/penalty and requires key+host', () => {
	assert.equal(LocalNodeStore.docFromExport(null), null)
	assert.equal(LocalNodeStore.shouldPersist({ host: 'a.example' }), false)

	const doc = LocalNodeStore.docFromExport({
		host: 'seed.example',
		port: 38081,
		key: 'seed.example:38081',
		bchain: 'main',
		version: '0.22.19',
		statistic: { events: 99 },
		penalty: { k: 0.5 },
		rating: 1.2,
	})

	assert.ok(doc)
	assert.equal(doc.host, 'seed.example')
	assert.equal(doc.key, 'seed.example:38081')
	assert.equal(doc.version, '0.22.19')
	assert.equal(doc.statistic, undefined)
	assert.equal(doc.penalty, undefined)
	assert.equal(doc.rating, undefined)
})

test('memory store: put → loadAll(bchain) → remove; wrong bchain filtered', async () => {
	const store = new LocalNodeStore({ memory: true })
	await store.clear()

	await store.put({
		host: 'a.example',
		port: 38081,
		key: 'a.example:38081',
		bchain: 'main',
		version: '0.22.19',
	})
	await store.put({
		host: 'b.example',
		port: 38081,
		key: 'b.example:38081',
		bchain: 'test',
		version: '0.22.19',
	})
	await store.put({
		host: 'legacy.example',
		port: 38081,
		key: 'legacy.example:38081',
		version: '0.22.19',
	})

	const mainDocs = await store.loadAll('main')
	const keys = mainDocs.map((d) => d.key).sort()
	assert.deepEqual(keys, ['a.example:38081', 'legacy.example:38081'])

	const testDocs = await store.loadAll('test')
	assert.equal(testDocs.length, 2)
	assert.ok(testDocs.some((d) => d.key === 'b.example:38081'))

	await store.remove('a.example:38081')
	const after = await store.loadAll('main')
	assert.equal(
		after.some((d) => d.key === 'a.example:38081'),
		false
	)
	assert.equal(store.size(), 2)
})

test('filterPeerInfos drops missing addr and .i2p', () => {
	const filtered = LocalNode.filterPeerInfos([
		{ addr: 'good.example:8888' },
		{ addr: '' },
		{ addr: null },
		{},
		{ addr: 'hidden.i2p:1' },
		{ addr: 'also.example.i2p' },
		{ addr: 'ok2.example:9999' },
	])

	assert.deepEqual(
		filtered.map((p) => p.addr),
		['good.example:8888', 'ok2.example:9999']
	)
})

test('mapPeerInfosToCandidates maps ports and rejects localhost', () => {
	const candidates = LocalNode.mapPeerInfosToCandidates([
		{ addr: 'peer.example:7777' },
		{ addr: 'bad.i2p:1' },
		{ addr: '127.0.0.1:8888' },
		{ addr: 'localhost:8888' },
		{ addr: 'peer.example:9999' },
		{ addr: '0.0.0.0:1' },
		{ addr: 'other.example' },
	])

	assert.equal(candidates.length, 2)

	const peer = candidates.find((c) => c.host === 'peer.example')
	assert.ok(peer)
	assert.equal(peer.port, 38081)
	assert.equal(peer.sport, 38881)
	assert.equal(peer.ws, 8087)
	assert.equal(peer.sws, 8887)
	assert.equal(peer.peer, true)
	assert.equal(peer.key, 'peer.example:38081')

	assert.ok(candidates.some((c) => c.host === 'other.example'))
	assert.equal(
		candidates.some((c) => c.host === '127.0.0.1' || c.host === 'localhost'),
		false
	)
})

test('BAD_NODE_VERSIONS matches proxy16 cleardatabase $in list', () => {
	const mgrSrc = fs.readFileSync(
		path.join(root, 'proxy16/node/manager.js'),
		'utf8'
	)
	const match = mgrSrc.match(/version:\s*\{\$in\s*:\s*\[([^\]]+)\]/)
	assert.ok(match, 'cleardatabase version $in list must exist in proxy16 manager')

	const proxyList = match[1]
		.split(',')
		.map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
		.filter(Boolean)

	assert.deepEqual(
		LocalNodeConstants.BAD_NODE_VERSIONS.slice().sort(),
		proxyList.slice().sort()
	)
})

test('removeVersions purges blacklisted version docs from memory store', async () => {
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

	const removed = await store.removeVersions(LocalNodeConstants.BAD_NODE_VERSIONS)
	assert.equal(removed, 1)

	const docs = await store.loadAll('main')
	assert.equal(docs.length, 1)
	assert.equal(docs[0].key, 'ok.example:38081')
})
