const http = require('node:http')
const path = require('node:path')
const { execFile } = require('node:child_process')

const root = path.resolve(__dirname, '../..')
const php = process.env.PHP_BIN || 'php'

const entities = { '&amp;': '&', '&quot;': '"', '&#039;': "'", '&lt;': '<', '&gt;': '>' }

function parseTags(html) {
	const tags = {}
	const re = /<meta property="([^"]+)" content="([^"]*)">/g
	let m

	while ((m = re.exec(html))) {
		tags[m[1]] = m[2].replace(/&amp;|&quot;|&#039;|&lt;|&gt;/g, (e) => entities[e])
	}

	return tags
}

// Runs php/og.php like index.php does and returns { html, tags, ms }
function render({ uri, ua, proxypath }) {
	const started = Date.now()
	const input = JSON.stringify({ uri, ua, proxypath })

	return new Promise((resolve, reject) => {
		execFile(php, ['tests/og/render.php', input], { cwd: root, timeout: 60000 }, (err, stdout, stderr) => {
			if (err) return reject(new Error(err.message + '\n' + stderr))

			resolve({ html: stdout, tags: parseTags(stdout), ms: Date.now() - started })
		})
	})
}

// Fake proxy16: answers by request path from `routes`, records requests
// routes: { 'rpc/getuserprofile': (body) => data | undefined }
function mockProxy(routes) {
	const requests = []
	const server = http.createServer((req, res) => {
		let body = ''

		req.on('data', (c) => (body += c))
		req.on('end', () => {
			const route = req.url.replace(/^\//, '')
			const parsed = body ? JSON.parse(body) : {}

			requests.push({ route, body: parsed })

			const handler = routes[route]

			if (handler === 'hang') return

			const data = handler ? handler(parsed) : undefined

			res.setHeader('Content-Type', 'application/json')

			if (data === undefined) {
				res.end(JSON.stringify({ result: null, error: 'not found' }))
				return
			}

			res.end(JSON.stringify({ result: 'success', data }))
		})
	})

	return new Promise((resolve) => {
		server.listen(0, '127.0.0.1', () => {
			resolve({
				url: 'http://127.0.0.1:' + server.address().port + '/',
				requests,
				close: () => {
					server.closeAllConnections()
					return new Promise((r) => server.close(r))
				},
			})
		})
	})
}

module.exports = { render, mockProxy, parseTags, root }
