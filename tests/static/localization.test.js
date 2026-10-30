// Every localization key has an English text: js/localization.js falls back to en, then to an empty string
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

const dir = path.resolve(__dirname, '../../localization')
const langs = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).map((f) => f.replace('.js', ''))

function load(lang) {
	const ctx = { window: {}, loclib: {} }

	vm.createContext(ctx)
	vm.runInContext(fs.readFileSync(path.join(dir, lang + '.js'), 'utf8'), ctx, { filename: lang + '.js' })

	return ctx.loclib[lang]
}

const en = load('en')

test('en localization loads', () => {
	assert.ok(Object.keys(en).length > 1000)
})

for (const lang of langs.filter((l) => l !== 'en')) {
	test('localization ' + lang + ': all keys exist in en', () => {
		const missing = Object.keys(load(lang)).filter((k) => !(k in en))

		assert.deepEqual(missing, [])
	})
}
