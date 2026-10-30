// Every file referenced by js/_map.js exists: minimize.js builds the app from this map
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')
const map = require(path.join(root, 'js/_map.js'))

const exists = (p) => fs.existsSync(path.join(root, p))
const itemPath = (item) => (typeof item === 'string' ? item : item.path)

const modules = Object.keys(map).filter((k) => !k.startsWith('__'))

for (const list of ['__vendor', '__sourcesfirst', '__sources', '__css']) {
	test('map ' + list + ': files exist', () => {
		const missing = map[list].map(itemPath).filter((p) => !exists(p))

		assert.deepEqual(missing, [])
	})
}

test('map __exportcss: files exist', () => {
	const missing = Object.keys(map.__exportcss).filter((p) => !exists(p))

	assert.deepEqual(missing, [])
})

test('map __templates: files exist', () => {
	const missing = map.__templates
		.map((t) => 'components/' + t.c + '/templates/' + t.n + '.html')
		.filter((p) => !exists(p))

	assert.deepEqual(missing, [])
})

test('map modules: components/<uri>/index.js exists', () => {
	const missing = modules
		.filter((k) => map[k].uri)
		.map((k) => 'components/' + map[k].uri + '/index.js')
		.filter((p) => !exists(p))

	assert.deepEqual(missing, [])
})

test('map modules: relations exist', () => {
	const missing = []

	for (const k of modules) {
		for (const r of map[k].relations || []) {
			if (r.src && !exists(r.src)) missing.push(k + ': ' + r.src)
		}
	}

	assert.deepEqual(missing, [])
})
