// Cordova dependencies are pinned: open ranges and git master refs broke Android/iOS builds without code changes
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../..')

// git refs are allowed only with a commit sha
const isGit = (v) => /^(git\+|git:|github:|https?:\/\/)/.test(v)
const pinnedGit = (v) => /#[0-9a-f]{40}$/.test(v)
const isOpen = (v) => v === '*' || v === 'latest' || v === '' || v.includes('>') || v === 'x'

function badVersion(name, v) {
	if (v.startsWith('file:')) return null
	if (isGit(v)) return pinnedGit(v) ? null : name + ': ' + v + ' (git ref without commit sha)'
	if (isOpen(v)) return name + ': ' + v + ' (open range)'

	return null
}

function major(v) {
	const m = v.match(/(\d+)/)

	return m ? Number(m[1]) : null
}

// tpl has <% %> blocks, so it is checked as text: every "name": "version" pair in dependency sections
function tplDependencies() {
	const src = fs.readFileSync(path.join(root, 'tpls/package.cordova.json.tpl'), 'utf8')
	const deps = {}

	for (const section of ['dependencies', 'devDependencies']) {
		const m = src.match(new RegExp('"' + section + '"\\s*:\\s*{([^}]*)}'))

		if (!m) continue

		for (const [, name, v] of m[1].matchAll(/"([^"]+)"\s*:\s*"([^"]*)"/g)) deps[name] = v
	}

	return deps
}

function localPlugins() {
	const dir = path.join(root, 'cordova')

	return fs
		.readdirSync(dir)
		.filter((d) => d !== 'plugins' && d !== 'node_modules' && fs.existsSync(path.join(dir, d, 'package.json')))
		.filter((d) => fs.existsSync(path.join(dir, d, 'plugin.xml')))
}

test('package.cordova.json.tpl: dependencies are pinned', () => {
	const deps = tplDependencies()
	const bad = Object.entries(deps).map(([n, v]) => badVersion(n, v)).filter(Boolean)

	assert.ok(Object.keys(deps).length > 20, 'dependencies not found in tpl')
	assert.deepEqual(bad, [])
})

test('package.cordova.json.tpl: cordova-plugin-file stays on 8.x (cordova-plugin-media needs ^8)', () => {
	const v = tplDependencies()['cordova-plugin-file']

	assert.ok(v, 'cordova-plugin-file not found')
	assert.match(v, /^\^?8\./)
})

test('local cordova plugins: dependencies are pinned', () => {
	const bad = []

	for (const plugin of localPlugins()) {
		const pkg = require(path.join(root, 'cordova', plugin, 'package.json'))
		const deps = { ...pkg.dependencies, ...pkg.devDependencies }

		for (const [n, v] of Object.entries(deps)) {
			const b = badVersion(n, v)

			if (b) bad.push(plugin + ' ' + b)

			// plist@5 is ESM-only and breaks require('plist') in hooks
			if (n === 'plist' && !(major(v) < 5)) bad.push(plugin + ' plist: ' + v + ' (must be < 5)')
		}
	}

	assert.deepEqual(bad, [])
})
