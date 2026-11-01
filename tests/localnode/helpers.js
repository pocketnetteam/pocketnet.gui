// Shared helpers for tests/localnode (fake clocks, etc.)

/**
 * Injectable clock for LocalNode penalty/statistic tests.
 * Advances only when advance(ms) is called; timers fire by fake time.
 */
function createFakeClock(startMs) {
	var now = typeof startMs === 'number' ? startMs : 1e12
	var timers = []
	var nextId = 1

	function runDue() {
		var due = timers
			.filter(function (t) {
				return !t.cleared && t.fireAt <= now
			})
			.sort(function (a, b) {
				return a.fireAt - b.fireAt
			})

		due.forEach(function (t) {
			if (t.cleared) return
			t.cleared = true
			t.fn()
		})

		timers = timers.filter(function (t) {
			return !t.cleared
		})
	}

	var clock = {
		now: function () {
			return now
		},
		advance: function (ms) {
			now += ms
			runDue()
			return now
		},
		setTimeout: function (fn, ms) {
			var id = nextId++
			timers.push({
				id: id,
				fn: fn,
				fireAt: now + (ms || 0),
				cleared: false,
			})
			return id
		},
		clearTimeout: function (id) {
			timers.forEach(function (t) {
				if (t.id === id) t.cleared = true
			})
		},
		nodeOptions: function (extra) {
			var opts = {
				now: clock.now,
				setTimeout: clock.setTimeout,
				clearTimeout: clock.clearTimeout,
			}
			var k
			extra = extra || {}
			for (k in extra) {
				if (Object.prototype.hasOwnProperty.call(extra, k)) opts[k] = extra[k]
			}
			return opts
		},
	}

	return clock
}

/**
 * Mock LocalNodeTransport-shaped object for health/RPC unit tests.
 * @param {function(opts): Promise|Object} handler — receives request opts; may return body or Promise
 */
function createMockTransport(handler) {
	var calls = []

	return {
		calls: calls,
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
				id: typeof id !== 'undefined' ? id : 1,
			}
		},
		request: function (opts) {
			calls.push(opts)
			return Promise.resolve().then(function () {
				return handler(opts)
			})
		},
	}
}

module.exports = {
	createFakeClock: createFakeClock,
	createMockTransport: createMockTransport,
}
