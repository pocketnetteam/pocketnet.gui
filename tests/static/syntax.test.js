// Source scripts parse: modules are loaded one by one in the browser, a syntax error breaks only its page
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

const root = path.resolve(__dirname, '../..')

const dirs = ['components', 'js/lib/client', 'localization']
const files = ['js/kit.js', 'js/satolist.js', 'js/app.js', 'js/user.js', 'js/_map.js', 'js/localization.js', 'js/functions.js', 'js/functionsfirst.js']

function walk(dir, out) {
	for (const f of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
		const p = dir + '/' + f.name

		if (f.isDirectory()) walk(p, out)
		else if (f.name.endsWith('.js') && !f.name.endsWith('.min.js')) out.push(p)
	}

	return out
}

test('source scripts have no syntax errors', () => {
	const all = dirs.reduce((out, d) => walk(d, out), files.filter((f) => fs.existsSync(path.join(root, f))))
	const broken = []

	for (const f of all) {
		try {
			new vm.Script(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f })
		} catch (e) {
			broken.push(f + ': ' + e.message)
		}
	}

	assert.ok(all.length > 100, 'too few files found: ' + all.length)
	assert.deepEqual(broken, [])
})
