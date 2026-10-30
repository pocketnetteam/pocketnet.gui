/**
 * 
 * Run with the same data/cert volumes while the long-running container is stopped.
 *
 * Env:
 *   BOOTSTRAP_ADMIN   — PocketNet address
 *   BOOTSTRAP_DOMAIN  — server domain
 */
global.MIN_NODES_COUNT = 10
global.WRITE_LOGS = true
global.USE_TRUST_NODES_ONLY = false
global.USE_TLS_NODES_ONLY = false
global.usecli = true

// f.path() only uses cwd when --cli is in argv; without it Linux resolves under $HOME (/root/cert/...)
if (process.argv.indexOf('--cli') === -1) {
	process.argv.push('--cli')
}

var fs = require('fs')
var path = require('path')
process.chdir(path.join(__dirname, '..'))

var kit = require('../kit.js')

var ADMIN = process.env.BOOTSTRAP_ADMIN
var DOMAIN = process.env.BOOTSTRAP_DOMAIN

if (!ADMIN || !DOMAIN) {
	console.error('BOOTSTRAP_ADMIN and BOOTSTRAP_DOMAIN are required')
	process.exit(1)
}

function applySslIfPresent() {
	var keyPath = path.join('cert', 'key.pem')
	var certPath = path.join('cert', 'cert.pem')

	if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
		console.log('No cert/key.pem yet — skip ssl (passphrase stays default until certs are mounted)')
		return Promise.resolve()
	}

	var keyB64 = fs.readFileSync(keyPath).toString('base64')
	var certB64 = fs.readFileSync(certPath).toString('base64')

	return kit.manage.set.server.ssl({
		name: 'Timeweb',
		passphrase: '',
		key: 'data:application/x-pem-file;base64,' + keyB64,
		cert: 'data:application/x-pem-file;base64,' + certB64
	})
}

kit.init({})
	.then(function () {
		return kit.manage.set.admins.add({ address: ADMIN })
	})
	.then(function () {
		return kit.manage.set.server.domain(DOMAIN)
	})
	.then(function () {
		return applySslIfPresent()
	})
	.then(function () {
		return kit.manage.set.server.enabled(true)
	})
	.then(function () {
		console.log('Bootstrap OK:', { admin: ADMIN, domain: DOMAIN, enabled: true })
		return kit.destroy()
	})
	.then(function () {
		process.exit(0)
	})
	.catch(function (e) {
		console.error('Bootstrap failed:', e)
		kit.destroy().catch(function () {}).then(function () {
			process.exit(1)
		})
	})
