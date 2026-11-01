/**
 * Local Node Proxy — slim in-memory TTL cache + wait dedupe + entry cap.
 * Reduced ckeys from proxy16/server/cache.js (MVP subset only).
 * No smart multi-executor cache, no cache.block (Phase 7), no disk persist.
 *
 * Cap: DEFAULT_MAX_ENTRIES (200). Eviction: oldest insert (FIFO); refresh
 * moves an existing key to the newest end on set (LRU-ish on write).
 */
var LocalNodeCache = (function () {
	var DEFAULT_MAX_ENTRIES = 200

	/**
	 * TTL seconds — deliberate subset of proxy16/server/cache.js ckeys.
	 * Sync debt: keep times aligned when those server keys change.
	 * Android exception: getnodeinfo uses GETNODEINFO_TTL_ANDROID_S (30 min).
	 */
	var GETNODEINFO_TTL_S = 360
	var GETNODEINFO_TTL_ANDROID_S = 1800

	var CKEYS = {
		getlastcomments: { time: 960 },
		getcomments: { time: 360 },
		search: { time: 2000 },
		gettags: { time: 82000 },
		getnodeinfo: { time: GETNODEINFO_TTL_S },
		getrawtransactionwithmessagebyid: { time: 460 },
		gethierarchicalstrip: { time: 460 },
		getprofilefeed: { time: 460 },
		getsubscribesfeed: { time: 460 },
		gethotposts: { time: 460 },
		getuserprofile: { time: 560 },
	}

	/**
	 * Cordova Android only (device.platform / cordova.platformId).
	 * options.android true|false overrides detection for tests.
	 */
	var isAndroidEnv = function (options) {
		var env
		var platform

		options = options || {}
		if (options.android === true) return true
		if (options.android === false) return false

		env = options.env || null
		if (env && env.android === true) return true
		if (env && env.android === false) return false

		platform =
			(env && (env.platform || env.platformId)) ||
			(typeof window !== 'undefined' &&
				window.device &&
				window.device.platform) ||
			(typeof window !== 'undefined' &&
				window.cordova &&
				window.cordova.platformId) ||
			''

		return String(platform).toLowerCase() === 'android'
	}

	var resolveCkeys = function (options) {
		var out
		var k

		options = options || {}
		if (options.ckeys) return options.ckeys
		if (!isAndroidEnv(options)) return CKEYS

		out = {}
		for (k in CKEYS) {
			if (Object.prototype.hasOwnProperty.call(CKEYS, k)) {
				out[k] = CKEYS[k]
			}
		}
		out.getnodeinfo = { time: GETNODEINFO_TTL_ANDROID_S }
		return out
	}

	function LocalNodeCacheCtor(options) {
		options = options || {}

		var self = this
		var storage = {}
		var order = []
		var waiting = {}
		var hits = 0
		var misses = 0
		var maxEntries =
			typeof options.maxEntries === 'number' && options.maxEntries > 0
				? options.maxEntries
				: DEFAULT_MAX_ENTRIES
		var now =
			typeof options.now === 'function'
				? options.now
				: function () {
						return Date.now()
				  }
		var ckeys = resolveCkeys(options)

		self.ckeys = ckeys
		self.maxEntries = maxEntries

		self.stats = function () {
			return {
				hits: hits,
				misses: misses,
				size: order.length,
				waiting: Object.keys(waiting).length,
			}
		}

		self.isCacheable = function (method) {
			return !!(method && ckeys[method])
		}

		self.ttlMs = function (method) {
			var c = ckeys[method]
			if (!c) return 0
			return (Number(c.time) || 0) * 1000
		}

		self.paramKey = function (params, cachehash) {
			if (cachehash != null && cachehash !== '') {
				return String(cachehash)
			}
			try {
				return JSON.stringify(params == null ? [] : params)
			} catch (e) {
				return null
			}
		}

		self.compoundKey = function (method, params, cachehash) {
			var pk = self.paramKey(params, cachehash)
			if (pk == null || !method) return null
			return String(method) + '::' + pk
		}

		var deleteKey = function (k) {
			var idx
			if (!k) return
			delete storage[k]
			idx = order.indexOf(k)
			if (idx !== -1) {
				order.splice(idx, 1)
			}
		}

		self.get = function (method, params, cachehash) {
			var k
			var sd
			var ttl

			if (!self.isCacheable(method)) return undefined

			k = self.compoundKey(method, params, cachehash)
			if (!k) return undefined

			sd = storage[k]
			if (!sd) return undefined

			ttl = self.ttlMs(method)
			if (sd.time + ttl > now()) {
				return sd.data
			}

			deleteKey(k)
			return undefined
		}

		self.set = function (method, params, data, cachehash) {
			var k
			var idx

			if (!self.isCacheable(method)) return false

			k = self.compoundKey(method, params, cachehash)
			if (!k) return false

			idx = order.indexOf(k)
			if (idx !== -1) {
				order.splice(idx, 1)
			}
			order.push(k)

			storage[k] = {
				data: data,
				time: now(),
				method: method,
			}

			while (order.length > maxEntries) {
				deleteKey(order[0])
			}

			return true
		}

		self.remove = function (method, params, cachehash) {
			var k = self.compoundKey(method, params, cachehash)
			if (!k) return
			deleteKey(k)
			delete waiting[k]
		}

		self.clear = function () {
			storage = {}
			order = []
			waiting = {}
			hits = 0
			misses = 0
		}

		self.size = function () {
			return order.length
		}

		/**
		 * Callback-style wait (proxy16-shaped statuses for unit tests).
		 * First caller gets 'execute'; later callers are queued and receive
		 * 'waitedmake' when the first finishes via set() or failWait().
		 */
		self.wait = function (method, params, clbk, cachehash) {
			var k
			var entry

			if (typeof clbk !== 'function') return

			if (!self.isCacheable(method)) {
				clbk('nocache')
				return
			}

			if (typeof self.get(method, params, cachehash) !== 'undefined') {
				clbk('hascache')
				return
			}

			k = self.compoundKey(method, params, cachehash)
			if (!k) {
				clbk('stringify')
				return
			}

			entry = waiting[k]
			if (!entry || !entry.clbks) {
				waiting[k] = {
					clbks: [],
					executor: true,
				}
				clbk('execute')
				return
			}

			waiting[k].clbks.push(clbk)
		}

		self.failWait = function (method, params, cachehash) {
			var k = self.compoundKey(method, params, cachehash)
			var entry
			var i

			if (!k || !waiting[k]) return

			entry = waiting[k]
			delete waiting[k]

			if (entry && entry.clbks) {
				for (i = 0; i < entry.clbks.length; i++) {
					if (typeof entry.clbks[i] === 'function') {
						entry.clbks[i]('waitedfail')
					}
				}
			}
		}

		/**
		 * After set(), notify queued waiters (mirrors proxy16 set → waitedmake).
		 * Called automatically from set when waiters exist; also usable alone.
		 */
		var notifyWaiters = function (k, status) {
			var entry = waiting[k]
			var i

			if (!entry) return

			delete waiting[k]

			if (entry.clbks) {
				for (i = 0; i < entry.clbks.length; i++) {
					if (typeof entry.clbks[i] === 'function') {
						entry.clbks[i](status || 'waitedmake')
					}
				}
			}
		}

		var setWithNotify = self.set
		self.set = function (method, params, data, cachehash) {
			var k = self.compoundKey(method, params, cachehash)
			var ok = setWithNotify(method, params, data, cachehash)
			if (ok && k) {
				notifyWaiters(k, 'waitedmake')
			}
			return ok
		}

		/**
		 * Promise wrap: get → share in-flight → fetch → set.
		 * opts.updateRPCCache skips get and wait join (still set on success).
		 */
		self.wrap = function (method, params, opts, fetchFn) {
			var cachehash
			var skip
			var cached
			var k
			var p
			var tracked

			opts = opts || {}
			cachehash = opts.cachehash
			skip = opts.updateRPCCache === true

			if (typeof fetchFn !== 'function') {
				return Promise.reject({ code: -1, message: 'nofetch' })
			}

			if (!self.isCacheable(method)) {
				return Promise.resolve().then(fetchFn)
			}

			k = self.compoundKey(method, params, cachehash)

			if (!skip) {
				cached = self.get(method, params, cachehash)
				if (typeof cached !== 'undefined') {
					hits++
					return Promise.resolve(cached)
				}

				if (k && waiting[k] && waiting[k].promise) {
					return waiting[k].promise
				}
			}

			misses++

			p = Promise.resolve()
				.then(fetchFn)
				.then(function (data) {
					self.set(method, params, data, cachehash)
					return data
				})

			if (k && !skip) {
				waiting[k] = waiting[k] || { clbks: [], executor: true }
				tracked = p.then(
					function (data) {
						if (waiting[k] && waiting[k].promise === tracked) {
							delete waiting[k]
						}
						return data
					},
					function (err) {
						if (waiting[k] && waiting[k].promise === tracked) {
							self.failWait(method, params, cachehash)
						}
						return Promise.reject(err)
					}
				)
				waiting[k].promise = tracked
				return tracked
			}

			return p
		}

		return self
	}

	LocalNodeCacheCtor.CKEYS = CKEYS
	LocalNodeCacheCtor.DEFAULT_MAX_ENTRIES = DEFAULT_MAX_ENTRIES
	LocalNodeCacheCtor.GETNODEINFO_TTL_S = GETNODEINFO_TTL_S
	LocalNodeCacheCtor.GETNODEINFO_TTL_ANDROID_S = GETNODEINFO_TTL_ANDROID_S
	LocalNodeCacheCtor.isAndroidEnv = isAndroidEnv
	LocalNodeCacheCtor.resolveCkeys = resolveCkeys

	return LocalNodeCacheCtor
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeCache
}
