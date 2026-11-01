// Phase 8 — LocalNodePeertube list markers + videos/best/roys
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const LocalNodeConstants = require(path.join(
	root,
	'js/lib/client/localnode/constants.js'
))
const LocalNodePeertube = require(path.join(
	root,
	'js/lib/client/localnode/peertube.js'
))
const LocalNodeProxy = require(path.join(
	root,
	'js/lib/client/localnode/index.js'
))

const sampleList = {
	archive: {
		ar01: { host: 'archive.example', upload: false },
	},
	swarms: {
		s01: {
			archived: ['ar01'],
			list: [
				{
					host: 'a1.example',
					upload: true,
					special: false,
					online: true,
				},
				{
					host: 'a2.example',
					upload: true,
					special: false,
					online: false,
				},
			],
		},
		s02: {
			archived: false,
			list: [
				{
					host: 'up.example',
					upload: true,
					special: false,
					online: true,
					ip: '1.2.3.4',
				},
			],
		},
		s03: {
			archived: false,
			list: [
				{
					host: 'special.example',
					upload: true,
					special: true,
					online: true,
				},
			],
		},
		s04: {
			testnet: true,
			list: [
				{
					host: 'test.example',
					upload: true,
					special: false,
					online: true,
				},
			],
		},
		s05: {
			archived: false,
			list: [
				{
					host: 'noup.example',
					upload: false,
					special: false,
					online: true,
				},
			],
		},
	},
}

test('constants expose peertube probe/video TTL keys', () => {
	assert.ok(LocalNodeConstants.PEERTUBE_PROBE_TIMEOUT_MS > 0)
	assert.ok(LocalNodeConstants.PEERTUBE_PROBE_TTL_MS > 0)
	assert.ok(LocalNodeConstants.PEERTUBE_VIDEO_CACHE_TTL_MS > 0)
	assert.match(
		LocalNodeConstants.PEERTUBE_LIST_FULL_STORAGE_KEY,
		/peertubeListJson/
	)
})

test('toLegacySwarms maps markers and skips testnet on mainnet', () => {
	const swarms = LocalNodePeertube.toLegacySwarms(sampleList, 'mainnet')
	assert.ok(swarms.length >= 3)

	const flat = swarms.reduce(function (acc, hosts) {
		return acc.concat(hosts.map((h) => h.host))
	}, [])

	assert.ok(flat.indexOf('test.example') === -1)
	assert.ok(flat.indexOf('archive.example') !== -1)

	const a2 = swarms
		.map(function (hosts) {
			return hosts.find((h) => h.host === 'a2.example')
		})
		.filter(Boolean)[0]
	assert.equal(a2.offline, true)
	assert.equal(a2.cantuploading, false)

	const noup = swarms
		.map(function (hosts) {
			return hosts.find((h) => h.host === 'noup.example')
		})
		.filter(Boolean)[0]
	assert.equal(noup.cantuploading, true)
})

test('roys upload hides offline-only/special/!upload swarms', async () => {
	const pt = new LocalNodePeertube({
		listFetch: function () {
			return Promise.resolve(sampleList)
		},
		httpGet: function () {
			return Promise.reject({ message: 'noprobe' })
		},
	})

	const roys = await pt.roys({ type: 'upload', special: false })
	const hosts = Object.values(roys)

	assert.ok(hosts.indexOf('up.example') !== -1)
	assert.ok(hosts.indexOf('special.example') === -1)
	assert.ok(hosts.indexOf('noup.example') === -1)
	// archived swarm has archive host with cantuploading → canupload false
	assert.ok(hosts.indexOf('a1.example') === -1)

	const specialRoys = await pt.roys({ type: 'upload', special: true })
	assert.ok(Object.values(specialRoys).indexOf('special.example') !== -1)
})

test('best fail-open to first eligible when probe fails', async () => {
	const pt = new LocalNodePeertube({
		listFetch: function () {
			return Promise.resolve(sampleList)
		},
		httpGet: function () {
			return Promise.reject({ message: 'down' })
		},
	})

	const best = await pt.best({ roy: 'up.example', type: 'upload' })
	assert.equal(best.host, 'up.example')
})

test('best probe picks reachable candidate', async () => {
	const calls = []
	const pt = new LocalNodePeertube({
		listFetch: function () {
			return Promise.resolve({
				swarms: {
					s: {
						list: [
							{ host: 'bad.example', upload: true, online: true },
							{ host: 'good.example', upload: true, online: true },
						],
					},
				},
				archive: {},
			})
		},
		httpGet: function (host) {
			calls.push(host)
			if (host === 'good.example') return Promise.resolve({ total: 0 })
			return Promise.reject({ message: 'down' })
		},
	})

	const best = await pt.best({ roy: 'bad.example', type: 'upload' })
	assert.equal(best.host, 'good.example')
	assert.ok(calls.indexOf('bad.example') !== -1)
	assert.ok(calls.indexOf('good.example') !== -1)
})

test('videos failover sets from on second host', async () => {
	const pt = new LocalNodePeertube({
		listFetch: function () {
			return Promise.resolve({
				swarms: {
					s: {
						list: [
							{ host: 'dead.example', upload: true, online: true },
							{ host: 'alive.example', upload: true, online: true },
						],
					},
				},
				archive: {},
			})
		},
		httpGet: function (host, path) {
			if (path.indexOf('/api/v1/videos/') === 0) {
				if (host === 'dead.example') {
					return Promise.reject({ status: 500 })
				}
				return Promise.resolve({
					uuid: 'vid-1',
					previewPath: '/lazy.jpg',
					thumbnailPath: '/thumb.jpg',
					views: 3,
					duration: 10,
					aspectRatio: 1.77,
				})
			}
			return Promise.resolve({})
		},
	})

	const url = 'peertube://dead.example/vid-1'
	const result = await pt.videos({ urls: [url] })
	assert.ok(result[url])
	assert.equal(result[url].from, 'alive.example')
	assert.equal(result[url].uuid, 'vid-1')
})

test('getHosts / getHostIp / allservers from markers', async () => {
	const pt = new LocalNodePeertube({
		listFetch: function () {
			return Promise.resolve(sampleList)
		},
	})

	const hosts = await pt.getHosts()
	assert.ok(Array.isArray(hosts))
	assert.ok(hosts.some((roy) => roy['up.example'] && roy['up.example'].ip === '1.2.3.4'))

	const ip = await pt.getHostIp({ host: 'up.example' })
	assert.equal(ip, '1.2.3.4')

	await assert.rejects(() => pt.getHostIp({ host: 'a1.example' }), /Host not found/)

	const all = await pt.allservers()
	const flat = Object.values(all).reduce(function (acc, arr) {
		return acc.concat(arr)
	}, [])
	assert.ok(flat.indexOf('up.example') !== -1)
})

test('LocalNodeProxy.fetch routes peertube/*', async () => {
	const mem = {}
	const proxy = new LocalNodeProxy(null, {
		createStore: false,
		storage: {
			getItem: function (k) {
				return mem[k] || null
			},
			setItem: function (k, v) {
				mem[k] = v
			},
		},
		peertubeFetch: function () {
			return Promise.resolve(sampleList)
		},
		peertubeHttpGet: function (host) {
			if (host === 'up.example') return Promise.resolve({ total: 0 })
			return Promise.reject({ message: 'down' })
		},
	})

	const roys = await proxy.fetch('peertube/roys', { type: 'upload' })
	assert.ok(Object.values(roys).indexOf('up.example') !== -1)

	const best = await proxy.fetch('peertube/best', {
		roy: 'up.example',
		type: 'upload',
	})
	assert.equal(best.host, 'up.example')

	const list = await proxy.fetch('peertubeserversList')
	assert.ok(list.archivedPeertubeServers.indexOf('archive.example') !== -1)
	assert.ok(list.archivedPeertubeServers.indexOf('a1.example') !== -1)

	const ip = await proxy.fetch('peertube/getHostIp?host=up.example')
	assert.equal(ip, '1.2.3.4')
})

test('_map.js registers peertube.js before index.js', () => {
	const mapSrc = fs.readFileSync(path.join(root, 'js/_map.js'), 'utf8')
	const peertubeAt = mapSrc.indexOf('localnode/peertube.js')
	const indexAt = mapSrc.indexOf('localnode/index.js')
	assert.ok(peertubeAt !== -1)
	assert.ok(indexAt !== -1)
	assert.ok(peertubeAt < indexAt)
})

test('api.js mentions peertube/* in localnodes fetch comment', () => {
	const apiSrc = fs.readFileSync(
		path.join(root, 'js/lib/client/api.js'),
		'utf8'
	)
	assert.match(apiSrc, /peertubeserversList\s*\/\s*peertube\/\*/)
})
