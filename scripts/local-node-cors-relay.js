/**
 * Dev-only CORS relay for Local Node Proxy browser testing.
 * Binds 127.0.0.1 only; forwards POST /public[/method] and /post[/method] to a node
 * identified by X-Node-Host / X-Node-Port / X-Node-TLS.
 * Optional method suffix is DevTools-only; upstream path is always /public/ or /post/.
 *
 * Contract (matches tests/localnode/phase-01-transport.test.js):
 *   X-Node-Host  required (node hostname or IP)
 *   X-Node-Port  default 38081
 *   X-Node-TLS   "1" / "true" → https; else http
 *
 * Usage: npm run local-node-cors
 * Env:   LOCAL_NODE_CORS_PORT (default 18081)
 */
'use strict'

var http = require('http')
var https = require('https')

var DEFAULT_PORT = 18081
var DEFAULT_NODE_PORT = 38081
var BIND_HOST = '127.0.0.1'

/**
 * Map inbound request path → canonical node RPC path.
 * Accepts /public, /public/, /public/<method>, same for /post.
 */
function canonicalizeRpcPath(requestPath) {
	var pathOnly = String(requestPath || '').split('?')[0]
	var m

	if (pathOnly === '/public' || pathOnly === '/public/') {
		return '/public/'
	}
	if (pathOnly === '/post' || pathOnly === '/post/') {
		return '/post/'
	}

	m = pathOnly.match(/^\/(public|post)\/([a-zA-Z][a-zA-Z0-9_]*)$/)
	if (m) {
		return '/' + m[1] + '/'
	}

	return null
}

function normalizeHeaderMap(headers) {
	var out = {}
	var k

	if (!headers) {
		return out
	}

	for (k in headers) {
		if (Object.prototype.hasOwnProperty.call(headers, k)) {
			out[String(k).toLowerCase()] = headers[k]
		}
	}

	return out
}

function headerValue(headers, name) {
	var map = normalizeHeaderMap(headers)
	var v = map[String(name).toLowerCase()]

	if (Array.isArray(v)) {
		return v[0]
	}

	return v
}

function isTruthyTls(value) {
	if (value == null) {
		return false
	}

	var s = String(value).toLowerCase()

	return s === '1' || s === 'true' || s === 'yes'
}

/**
 * Pure helper: map inbound headers + path → upstream target URL parts.
 * @returns {{ ok: true, scheme, host, port, path, url } | { ok: false, status, message }}
 */
function resolveTarget(headers, requestPath) {
	var rpcPath = canonicalizeRpcPath(requestPath)
	var host
	var portRaw
	var port
	var tls
	var scheme

	if (!rpcPath) {
		return {
			ok: false,
			status: 404,
			message: 'path must be /public/ or /post/'
		}
	}

	host = headerValue(headers, 'x-node-host')
	if (host != null) {
		host = String(host).trim()
	}

	if (!host) {
		return {
			ok: false,
			status: 400,
			message: 'missing X-Node-Host'
		}
	}

	// Open-proxy guard: host only (no scheme, userinfo, path, or port).
	if (
		/[\/\\@:\s]/.test(host) ||
		(host !== 'localhost' &&
			!/^\d{1,3}(\.\d{1,3}){3}$/.test(host) &&
			!/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/i.test(host))
	) {
		return {
			ok: false,
			status: 400,
			message: 'invalid X-Node-Host'
		}
	}

	portRaw = headerValue(headers, 'x-node-port')
	port = portRaw == null || portRaw === '' ? DEFAULT_NODE_PORT : Number(portRaw)

	if (!Number.isFinite(port) || port < 1 || port > 65535 || Math.floor(port) !== port) {
		return {
			ok: false,
			status: 400,
			message: 'invalid X-Node-Port'
		}
	}

	tls = isTruthyTls(headerValue(headers, 'x-node-tls'))
	scheme = tls ? 'https' : 'http'

	return {
		ok: true,
		scheme: scheme,
		host: host,
		port: port,
		path: rpcPath,
		url: scheme + '://' + host + ':' + port + rpcPath
	}
}

function corsHeaders(req) {
	var origin = (req && req.headers && req.headers.origin) || '*'

	return {
		'Access-Control-Allow-Origin': origin === 'null' ? '*' : origin,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers':
			'Content-Type, X-Node-Host, X-Node-Port, X-Node-TLS',
		'Access-Control-Max-Age': '86400',
		Vary: 'Origin'
	}
}

function writeJson(res, status, body, extraHeaders) {
	var payload = JSON.stringify(body)
	var headers = Object.assign(
		{
			'Content-Type': 'application/json; charset=utf-8',
			'Content-Length': Buffer.byteLength(payload)
		},
		extraHeaders || {}
	)

	res.writeHead(status, headers)
	res.end(payload)
}

function readBody(req, limit) {
	return new Promise(function (resolve, reject) {
		var chunks = []
		var size = 0

		req.on('data', function (chunk) {
			size += chunk.length
			if (size > limit) {
				reject(new Error('body too large'))
				req.destroy()
				return
			}
			chunks.push(chunk)
		})

		req.on('end', function () {
			resolve(Buffer.concat(chunks))
		})

		req.on('error', reject)
	})
}

function forwardToNode(target, body, timeoutMs) {
	return new Promise(function (resolve, reject) {
		var lib = target.scheme === 'https' ? https : http
		var req
		var timer

		req = lib.request(
			{
				protocol: target.scheme + ':',
				hostname: target.host,
				port: target.port,
				path: target.path,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Content-Length': body.length
				},
				timeout: timeoutMs || 55000
			},
			function (upstream) {
				var chunks = []

				upstream.on('data', function (chunk) {
					chunks.push(chunk)
				})

				upstream.on('end', function () {
					if (timer) clearTimeout(timer)
					resolve({
						status: upstream.statusCode || 502,
						headers: upstream.headers || {},
						body: Buffer.concat(chunks)
					})
				})
			}
		)

		req.on('error', function (err) {
			if (timer) clearTimeout(timer)
			reject(err)
		})

		req.on('timeout', function () {
			req.destroy()
			reject(new Error('upstream timeout'))
		})

		timer = setTimeout(function () {
			req.destroy()
			reject(new Error('upstream timeout'))
		}, timeoutMs || 55000)

		req.write(body)
		req.end()
	})
}

function createServer() {
	return http.createServer(function (req, res) {
		var pathOnly = '/'
		var method = String(req.method || 'GET').toUpperCase()
		var cors = corsHeaders(req)
		var target

		try {
			pathOnly = new URL(req.url || '/', 'http://127.0.0.1').pathname || '/'
		} catch (e) {
			pathOnly = String(req.url || '/').split('?')[0] || '/'
		}

		if (method === 'OPTIONS') {
			res.writeHead(204, cors)
			res.end()
			return
		}

		if (method !== 'POST') {
			writeJson(res, 405, { message: 'method not allowed' }, cors)
			return
		}

		target = resolveTarget(req.headers, pathOnly)

		if (!target.ok) {
			writeJson(res, target.status, { message: target.message }, cors)
			return
		}

		readBody(req, 2 * 1024 * 1024)
			.then(function (body) {
				return forwardToNode(target, body)
			})
			.then(function (upstream) {
				var headers = Object.assign({}, cors, {
					'Content-Type':
						(upstream.headers && upstream.headers['content-type']) ||
						'application/json'
				})

				res.writeHead(upstream.status, headers)
				res.end(upstream.body)
			})
			.catch(function (err) {
				var msg = (err && err.message) || 'relay error'
				var status = msg === 'body too large' ? 413 : 502

				writeJson(res, status, { message: msg }, cors)
			})
	})
}

function listen(options) {
	var opts = options || {}
	var host = opts.host || BIND_HOST
	var port =
		opts.port != null
			? Number(opts.port)
			: Number(process.env.LOCAL_NODE_CORS_PORT || DEFAULT_PORT)

	if (host !== '127.0.0.1' && host !== 'localhost') {
		throw new Error('local-node-cors-relay refuses non-localhost bind: ' + host)
	}

	if (!Number.isFinite(port) || port < 1 || port > 65535) {
		throw new Error('invalid LOCAL_NODE_CORS_PORT: ' + port)
	}

	var server = createServer()

	return new Promise(function (resolve, reject) {
		server.once('error', reject)
		server.listen(port, host, function () {
			var addr = server.address()
			console.log(
				'[local-node-cors] listening http://' +
					addr.address +
					':' +
					addr.port +
					' (POST /public/|/post/ + X-Node-Host|Port|TLS)'
			)
			resolve(server)
		})
	})
}

var api = {
	DEFAULT_PORT: DEFAULT_PORT,
	DEFAULT_NODE_PORT: DEFAULT_NODE_PORT,
	BIND_HOST: BIND_HOST,
	resolveTarget: resolveTarget,
	createServer: createServer,
	listen: listen
}

module.exports = api

if (require.main === module) {
	listen().catch(function (err) {
		console.error('[local-node-cors] failed:', err && err.message ? err.message : err)
		process.exit(1)
	})
}
