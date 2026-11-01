/**
 * Local Node Proxy HTTP transport (browser fetch + Cordova native HTTP).
 * Browser/dev mode rewrites node /public|/post URLs through the local CORS relay.
 * Production web hosts must not rewrite to 127.0.0.1 (see shouldUseBrowserRelay).
 * Cordova uses cordova.plugin.http directly (existing cleartext / trust nocheck; no new plugin).
 *
 * Relay contract (scripts/local-node-cors-relay.js):
 *   URL:  {relayBase}/public/ or {relayBase}/post/
 *   Headers: X-Node-Host, X-Node-Port, X-Node-TLS ("1"|"0")
 * Default relayBase: http://127.0.0.1:18081 (override setRelayBase / window.localNodeCorsRelay)
 */
var LocalNodeTransport = (function () {
	var mode = 'auto'
	var DEFAULT_RELAY_BASE = 'http://127.0.0.1:18081'
	/** Match ProxyRequest default (`p.timeout || 30000`); 30–55s family. */
	var DEFAULT_TIMEOUT_MS = 30000
	var relayBaseOverride = null
	/** Test / agent override: null = auto, true/false force relay gate. */
	var relayAllowedOverride = null

	var getCordovaHttp = function () {
		if (typeof deep === 'function') {
			return deep(typeof window !== 'undefined' ? window : null, 'cordova.plugin.http')
		}

		try {
			return (
				typeof window !== 'undefined' &&
				window.cordova &&
				window.cordova.plugin &&
				window.cordova.plugin.http
			) || null
		} catch (e) {
			return null
		}
	}

	var hasCordovaHttp = function () {
		var http = getCordovaHttp()

		return !!(http && http.sendRequest)
	}

	var resolveMode = function () {
		if (mode === 'cordova' || mode === 'browser') {
			return mode
		}

		return hasCordovaHttp() ? 'cordova' : 'browser'
	}

	var mergeHeaders = function (base, extra) {
		var out = {}
		var k

		for (k in base) {
			if (Object.prototype.hasOwnProperty.call(base, k)) {
				out[k] = base[k]
			}
		}

		if (extra) {
			for (k in extra) {
				if (Object.prototype.hasOwnProperty.call(extra, k)) {
					out[k] = extra[k]
				}
			}
		}

		return out
	}

	var rejectError = function (code, message) {
		return Promise.reject({
			code: code,
			message: message || ''
		})
	}

	var parseJsonBody = function (text) {
		if (text == null || text === '') {
			return {}
		}

		if (typeof text === 'object') {
			return text
		}

		return JSON.parse(text)
	}

	var normalizeRelayBase = function (base) {
		var s = String(base || '').trim()

		if (!s) {
			return DEFAULT_RELAY_BASE
		}

		return s.replace(/\/+$/, '')
	}

	var resolveRelayBase = function () {
		if (relayBaseOverride) {
			return normalizeRelayBase(relayBaseOverride)
		}

		try {
			if (typeof window !== 'undefined' && window.localNodeCorsRelay) {
				return normalizeRelayBase(window.localNodeCorsRelay)
			}
		} catch (e) {}

		return DEFAULT_RELAY_BASE
	}

	/**
	 * Whether browser requests may rewrite through the localhost CORS relay.
	 * Cordova never uses the relay. Production web packaging stays off unless
	 * window.localNodeProxy === true (explicit agent/dev force).
	 */
	var shouldUseBrowserRelay = function () {
		if (relayAllowedOverride === true) {
			return true
		}

		if (relayAllowedOverride === false) {
			return false
		}

		if (resolveMode() === 'cordova') {
			return false
		}

		try {
			if (typeof window === 'undefined' || !window) {
				// Node unit tests / scripts: allow rewrite contract checks.
				return true
			}

			if (window.localNodeProxy === false) {
				return false
			}

			if (window.localNodeProxy === true) {
				return true
			}

			if (window.cordova) {
				return false
			}

			if (window.testpocketnet) {
				return true
			}

			var host = (window.location && window.location.hostname) || ''

			if (host === 'localhost' || host === '127.0.0.1') {
				return true
			}
		} catch (e) {
			return false
		}

		return false
	}

	var resolveTimeoutMs = function (opts) {
		var t = opts && opts.timeout

		if (typeof t === 'number' && !isNaN(t) && t > 0) {
			return t
		}

		return DEFAULT_TIMEOUT_MS
	}

	/**
	 * Parse absolute node RPC url → { host, port, tls, rpcPath }.
	 * rpcPath is '/public/' or '/post/'.
	 */
	var parseNodeRpcUrl = function (url) {
		var m = String(url || '').match(
			/^(https?):\/\/([^/:]+):(\d+)(\/(?:public|post)\/?)/i
		)
		var rpcPath

		if (!m) {
			return null
		}

		rpcPath = m[4].replace(/\/?$/, '/') === '/post/' ? '/post/' : '/public/'

		return {
			host: m[2],
			port: String(m[3]),
			tls: m[1].toLowerCase() === 'https',
			rpcPath: rpcPath
		}
	}

	/**
	 * Browser → relay rewrite: node url → { url, headers }.
	 */
	var buildBrowserRelay = function (nodeUrl, base) {
		var parsed = parseNodeRpcUrl(nodeUrl)
		var relayBase

		if (!parsed) {
			return null
		}

		relayBase = normalizeRelayBase(base || resolveRelayBase())

		return {
			url: relayBase + parsed.rpcPath,
			headers: {
				'X-Node-Host': parsed.host,
				'X-Node-Port': parsed.port,
				'X-Node-TLS': parsed.tls ? '1' : '0'
			},
			parsed: parsed
		}
	}

	var requestBrowser = function (opts) {
		var url = opts.url
		var method = String(opts.method || 'POST').toUpperCase()
		var headers
		var body = opts.body
		var timeoutMs = resolveTimeoutMs(opts)
		var controller = null
		var timer = null
		var fetchOpts
		var relay

		if (!shouldUseBrowserRelay()) {
			return rejectError(-1, 'relaydisabled')
		}

		relay = buildBrowserRelay(url)

		if (!relay) {
			return rejectError(-1, 'badnodeurl')
		}

		url = relay.url
		headers = mergeHeaders(
			{
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			mergeHeaders(relay.headers, opts.headers || {})
		)

		if (body != null && typeof body === 'object') {
			body = JSON.stringify(body)
		}

		fetchOpts = {
			method: method,
			headers: headers,
			body: body
		}

		if (typeof AbortController !== 'undefined' && timeoutMs) {
			controller = new AbortController()
			fetchOpts.signal = controller.signal
			timer = setTimeout(function () {
				try {
					controller.abort()
				} catch (e) {}
			}, timeoutMs)
		}

		if (typeof fetch !== 'function') {
			return rejectError(-1, 'nofetch')
		}

		return fetch(url, fetchOpts)
			.then(function (response) {
				if (timer) clearTimeout(timer)

				var status = response && response.status

				return response.text().then(function (text) {
					var parsed

					try {
						parsed = parseJsonBody(text)
					} catch (e) {
						return rejectError(-1, 'invalidjson')
					}

					if (!status || status < 200 || status >= 300) {
						return rejectError(status || -1, (parsed && parsed.message) || 'httperror')
					}

					return parsed
				})
			})
			.catch(function (err) {
				if (timer) clearTimeout(timer)

				if (err && err.code != null && err.message != null) {
					return Promise.reject(err)
				}

				if (err && err.name === 'AbortError') {
					return rejectError(20, 'timeout')
				}

				return rejectError(-1, (err && err.message) || 'network')
			})
	}

	var normalizeBodyObject = function (body) {
		if (body == null) {
			return {}
		}

		if (typeof body === 'object') {
			return body
		}

		if (typeof body === 'string') {
			try {
				return JSON.parse(body)
			} catch (e) {
				return {}
			}
		}

		return {}
	}

	var requestCordova = function (opts) {
		var http = getCordovaHttp()
		var method
		var headers
		var data
		var timeoutSec
		var options

		if (!http || !http.sendRequest) {
			return rejectError(-1, 'nocordovahttp')
		}

		method = String(opts.method || 'POST').toLowerCase()
		headers = mergeHeaders(
			{
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=utf-8'
			},
			opts.headers || {}
		)
		data = normalizeBodyObject(opts.body)
		timeoutSec = Math.max(1, Math.ceil(resolveTimeoutMs(opts) / 1000))

		options = {
			method: method,
			headers: headers,
			serializer: 'json',
			responseType: 'json',
			data: data
		}

		if (timeoutSec) {
			options.timeout = timeoutSec
		}

		// Relies on existing app cleartext / trust nocheck init; do not call setServerTrustMode here.
		return new Promise(function (resolve, reject) {
			http.sendRequest(
				opts.url,
				options,
				function (response) {
					var status = response && response.status
					var parsed

					try {
						parsed = parseJsonBody(response && response.data)
					} catch (e) {
						reject({ code: -1, message: 'invalidjson' })
						return
					}

					if (!status || status < 200 || status >= 300) {
						reject({
							code: status || -1,
							message: (parsed && parsed.message) || 'httperror'
						})
						return
					}

					resolve(parsed)
				},
				function (response) {
					var status = response && response.status
					var parsed
					var errMsg

					if (status === -8) {
						reject({ code: 20, message: 'timeout' })
						return
					}

					if (status && status > 0) {
						try {
							parsed = parseJsonBody(response && response.error)
						} catch (e) {
							parsed = null
						}

						reject({
							code: status,
							message:
								(parsed && parsed.message) ||
								(typeof (response && response.error) === 'string'
									? response.error
									: 'httperror')
						})
						return
					}

					errMsg = response && response.error
					if (errMsg && typeof errMsg !== 'string') {
						errMsg = 'nativehttp'
					}

					reject({
						code: status || -1,
						message: errMsg || 'nativehttp'
					})
				}
			)
		})
	}

	var api = {
		DEFAULT_RELAY_BASE: DEFAULT_RELAY_BASE,
		DEFAULT_TIMEOUT_MS: DEFAULT_TIMEOUT_MS,

		buildPublicUrl: function (host, port, tls) {
			var scheme = tls ? 'https' : 'http'
			var p = port == null || port === '' ? 38081 : port

			return scheme + '://' + host + ':' + p + '/public/'
		},

		buildPostUrl: function (host, port, tls) {
			var scheme = tls ? 'https' : 'http'
			var p = port == null || port === '' ? 38081 : port

			return scheme + '://' + host + ':' + p + '/post/'
		},

		buildJsonRpcBody: function (method, params, id) {
			return {
				jsonrpc: '2.0',
				method: method,
				params: params || [],
				id: typeof id !== 'undefined' ? id : 1
			}
		},

		parseNodeRpcUrl: parseNodeRpcUrl,

		buildBrowserRelay: buildBrowserRelay,

		shouldUseBrowserRelay: shouldUseBrowserRelay,

		/**
		 * Force relay gate for tests: true / false / null (auto).
		 */
		setRelayAllowed: function (value) {
			if (value === true || value === false) {
				relayAllowedOverride = value
			} else {
				relayAllowedOverride = null
			}

			return relayAllowedOverride
		},

		setRelayBase: function (url) {
			if (url == null || url === '') {
				relayBaseOverride = null
			} else {
				relayBaseOverride = normalizeRelayBase(url)
			}

			return api.getRelayBase()
		},

		getRelayBase: function () {
			return resolveRelayBase()
		},

		setMode: function (next) {
			if (next === 'cordova' || next === 'browser' || next === 'auto') {
				mode = next
			}

			return mode
		},

		getMode: function () {
			return mode
		},

		resolvedMode: function () {
			return resolveMode()
		},

		request: function (opts) {
			if (!opts || !opts.url) {
				return rejectError(-1, 'missingurl')
			}

			var resolved = resolveMode()

			if (resolved === 'cordova') {
				return requestCordova(opts)
			}

			return requestBrowser(opts)
		}
	}

	return api
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeTransport
}
