/**
 * Local Node Proxy — simplified PeerTube pool (Phase 8).
 * Trusts GitHub list.json markers; PeerTube HTTP only for videos + soft best probe.
 * No PerformanceMetric / periodic server/stats or disk probes.
 */
var LocalNodePeertube = (function () {
	var PEERTUBE_ID = 'peertube://'
	var SLASH = '/'

	var defaultConstants = function () {
		if (typeof LocalNodeConstants !== 'undefined' && LocalNodeConstants) {
			return LocalNodeConstants
		}
		return {}
	}

	/**
	 * Port of proxy16/proxy.js syncAndReadList → toLegacyList.
	 * @param {Object} list — GitHub list.json shape
	 * @param {string} network — 'mainnet' | 'testnet'
	 * @returns {Array<Array<Object>>} swarms as arrays of server objects
	 */
	function toLegacySwarms(list, network) {
		var testnet = network === 'testnet'
		var swarms = (list && list.swarms) || {}
		var archive = (list && list.archive) || {}
		var out = []
		var keys = Object.keys(swarms)
		var i
		var swarm
		var serversList
		var j
		var s
		var archKey
		var archEntry

		for (i = 0; i < keys.length; i++) {
			swarm = swarms[keys[i]]
			if (!swarm) continue
			if (!!swarm.testnet !== testnet) continue

			serversList = []
			if (swarm.list && swarm.list.length) {
				for (j = 0; j < swarm.list.length; j++) {
					s = swarm.list[j]
					if (!s) continue
					if (typeof s === 'string') {
						serversList.push({
							host: s,
							offline: false,
							cantuploading: false,
						})
					} else {
						serversList.push({
							host: s.host,
							ip: s.ip,
							offline: !s.online,
							cantuploading: !s.upload,
							special: !!s.special,
							old: !!s.old,
						})
					}
				}
			}

			if (swarm.archived) {
				for (j = 0; j < serversList.length; j++) {
					serversList[j].archived = true
				}

				if (
					Object.prototype.toString.call(swarm.archived) === '[object Array]'
				) {
					if (swarm.archived.length === 2) {
						archKey = swarm.archived[0]
						archEntry = archive[archKey]
						if (archEntry && archEntry.host) {
							serversList.push({
								host: archEntry.host,
								ip: archEntry.ip,
								upload: archEntry.upload,
								offline: false,
								cantuploading: false,
								archiveDouble: true,
								archived: true,
							})
						}
						archKey = swarm.archived[1]
						archEntry = archive[archKey]
						if (archEntry && archEntry.host) {
							serversList.push({
								host: archEntry.host,
								ip: archEntry.ip,
								upload: archEntry.upload,
								offline: false,
								cantuploading: !archEntry.upload,
								archived: true,
							})
						}
					} else if (swarm.archived.length >= 1) {
						archKey = swarm.archived[0]
						archEntry = archive[archKey]
						if (archEntry && archEntry.host) {
							serversList.push({
								host: archEntry.host,
								ip: archEntry.ip,
								upload: archEntry.upload,
								offline: false,
								cantuploading: true,
								archived: true,
							})
						}
					}
				}
			}

			if (serversList.length) out.push(serversList)
		}

		return out
	}

	/**
	 * Archived hosts for peertubeserversList (same idea as extractArchivedPeertubeHosts).
	 */
	function extractArchivedHosts(list) {
		var hosts = []
		var seen = {}
		var swarms
		var archive
		var key
		var swarm
		var i
		var server
		var host
		var archKey
		var archEntry

		var add = function (h) {
			if (!h || typeof h !== 'string' || seen[h]) return
			seen[h] = true
			hosts.push(h)
		}

		if (!list || typeof list !== 'object') return hosts

		swarms = list.swarms || {}
		archive = list.archive || {}

		for (key in swarms) {
			if (!Object.prototype.hasOwnProperty.call(swarms, key)) continue
			swarm = swarms[key]
			if (!swarm || !swarm.archived) continue

			if (swarm.list && swarm.list.length) {
				for (i = 0; i < swarm.list.length; i++) {
					server = swarm.list[i]
					host = server && (server.host || server)
					if (typeof host === 'string') add(host)
				}
			}

			if (Object.prototype.toString.call(swarm.archived) === '[object Array]') {
				for (i = 0; i < swarm.archived.length; i++) {
					archKey = swarm.archived[i]
					archEntry = archive[archKey]
					if (archEntry && archEntry.host) add(archEntry.host)
				}
			}
		}

		return hosts
	}

	function parselink(link) {
		var ch
		var isStream

		if (!link || typeof link !== 'string') {
			return { host: '', id: '', isStream: false }
		}

		ch = link.replace(PEERTUBE_ID, '').split(SLASH)
		isStream = ch[ch.length - 1] === 'stream'

		return {
			host: ch[0] || '',
			id: ch[1] || '',
			isStream: isStream,
		}
	}

	function getCordovaHttp() {
		try {
			if (typeof deep === 'function') {
				return deep(
					typeof window !== 'undefined' ? window : null,
					'cordova.plugin.http'
				)
			}
			return (
				(typeof window !== 'undefined' &&
					window.cordova &&
					window.cordova.plugin &&
					window.cordova.plugin.http) ||
				null
			)
		} catch (e) {
			return null
		}
	}

	/** Prefer global LocalNodeTransport (map order); Node tests may require. */
	function resolveTransportApi() {
		if (typeof LocalNodeTransport !== 'undefined' && LocalNodeTransport) {
			return LocalNodeTransport
		}
		try {
			if (typeof require === 'function') {
				return require('./transport.js')
			}
		} catch (e) {}
		return null
	}

	/**
	 * Cordova Tor rewrite via transport (same isUseWithTor → localhost:8181 path).
	 * @returns {Promise<string>}
	 */
	function resolvePeertubeCordovaUrl(url) {
		var t = resolveTransportApi()

		if (t && typeof t.resolveCordovaRequestUrl === 'function') {
			return t.resolveCordovaRequestUrl(url)
		}

		return Promise.resolve(String(url || ''))
	}

	/**
	 * GET https://{host}{path} — Cordova native HTTP or browser fetch.
	 * @returns {Promise<Object>} parsed JSON body
	 */
	function peertubeHttpGet(host, path, timeoutMs, injectFetch) {
		var url
		var http
		var doFetch
		var controller
		var timer

		if (!host) {
			return Promise.reject({ code: -1, message: 'host' })
		}

		path = path || '/'
		if (path.charAt(0) !== '/') path = '/' + path
		url = 'https://' + host + path
		timeoutMs = timeoutMs || 5500

		http = getCordovaHttp()
		if (http && http.sendRequest) {
			return resolvePeertubeCordovaUrl(url).then(function (requestUrl) {
				return new Promise(function (resolve, reject) {
					http.setRequestTimeout(Math.ceil(timeoutMs / 1000))
					http.sendRequest(
						requestUrl,
						{
							method: 'get',
							headers: { Accept: 'application/json' },
						},
						function (response) {
							var status = response && response.status
							var body = response && response.data
							var parsed

							if (status < 200 || status >= 300) {
								reject({
									code: status || -1,
									message: 'httperror',
									status: status,
								})
								return
							}

							try {
								parsed =
									typeof body === 'string'
										? body
											? JSON.parse(body)
											: {}
										: body || {}
							} catch (e) {
								reject({ code: -1, message: 'invalidjson' })
								return
							}

							resolve(parsed)
						},
						function (err) {
							reject({
								code: (err && err.status) || -1,
								message: (err && err.error) || 'network',
								status: err && err.status,
							})
						}
					)
				})
			})
		}

		doFetch =
			injectFetch ||
			(typeof fetch === 'function'
				? function (u, opts) {
						return fetch(u, opts)
				  }
				: null)

		if (!doFetch) {
			return Promise.reject({ code: -1, message: 'nofetch' })
		}

		controller =
			typeof AbortController !== 'undefined' ? new AbortController() : null
		timer = null

		if (controller && timeoutMs) {
			timer = setTimeout(function () {
				try {
					controller.abort()
				} catch (e) {}
			}, timeoutMs)
		}

		return doFetch(url, {
			method: 'GET',
			headers: { Accept: 'application/json' },
			signal: controller ? controller.signal : undefined,
		})
			.then(function (res) {
				if (timer) clearTimeout(timer)
				if (!res || !res.ok) {
					return Promise.reject({
						code: (res && res.status) || -1,
						message: 'httperror',
						status: res && res.status,
					})
				}
				return res.json()
			})
			.catch(function (err) {
				if (timer) clearTimeout(timer)
				if (err && err.code != null) return Promise.reject(err)
				if (err && err.name === 'AbortError') {
					return Promise.reject({ code: 20, message: 'timeout' })
				}
				return Promise.reject({
					code: -1,
					message: (err && err.message) || 'network',
				})
			})
	}

	function LocalNodePeertubeCtor(options) {
		options = options || {}
		var self = this
		var constants = options.constants || defaultConstants()
		var swarms = []
		var rawList = null
		var archivedHosts = []
		var listLoading = null
		var videoCache = {}
		var probeCache = {}
		var nowFn =
			typeof options.now === 'function'
				? options.now
				: function () {
						return Date.now()
				  }
		var httpGet = options.httpGet || peertubeHttpGet
		var storage = options.storage || null
		var listUrl =
			options.listUrl ||
			constants.PEERTUBE_LIST_URL ||
			'https://raw.githubusercontent.com/shpingalet007/bastyon-peertubes/master/list.json'
		var archivedStorageKey =
			options.archivedStorageKey ||
			constants.PEERTUBE_LIST_STORAGE_KEY ||
			'localnode:peertubeserversList'
		var fullStorageKey =
			options.fullStorageKey ||
			constants.PEERTUBE_LIST_FULL_STORAGE_KEY ||
			'localnode:peertubeListJson'
		var probeTimeout =
			options.probeTimeoutMs != null
				? options.probeTimeoutMs
				: constants.PEERTUBE_PROBE_TIMEOUT_MS || 4000
		var probeTtl =
			options.probeTtlMs != null
				? options.probeTtlMs
				: constants.PEERTUBE_PROBE_TTL_MS || 600000
		var videoTtl =
			options.videoCacheTtlMs != null
				? options.videoCacheTtlMs
				: constants.PEERTUBE_VIDEO_CACHE_TTL_MS || 600000
		var videoLiveTtl =
			options.videoCacheLiveTtlMs != null
				? options.videoCacheLiveTtlMs
				: constants.PEERTUBE_VIDEO_CACHE_LIVE_TTL_MS || 20000
		var videoHttpTimeout =
			options.videoHttpTimeoutMs != null
				? options.videoHttpTimeoutMs
				: constants.PEERTUBE_VIDEO_HTTP_TIMEOUT_MS || 5500
		var network =
			typeof options.network === 'function'
				? options.network
				: function () {
						return options.testnet ? 'testnet' : 'mainnet'
				  }
		var listFetch =
			options.listFetch ||
			(typeof fetch === 'function'
				? function (u) {
						return fetch(u).then(function (res) {
							if (!res || !res.ok) {
								return Promise.reject({
									code: res && res.status,
									message: 'peertubefetch',
								})
							}
							return res.json()
						})
				  }
				: null)

		var storageGet = function (key) {
			try {
				if (storage && typeof storage.getItem === 'function') {
					return storage.getItem(key)
				}
				if (typeof localStorage !== 'undefined') {
					return localStorage.getItem(key)
				}
			} catch (e) {}
			return null
		}

		var storageSet = function (key, value) {
			try {
				if (storage && typeof storage.setItem === 'function') {
					storage.setItem(key, value)
					return
				}
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem(key, value)
				}
			} catch (e) {}
		}

		var applyList = function (list) {
			rawList = list || null
			swarms = toLegacySwarms(list, network())
			archivedHosts = extractArchivedHosts(list)
			return swarms
		}

		var writeCaches = function (list) {
			var hosts = extractArchivedHosts(list)
			try {
				storageSet(archivedStorageKey, JSON.stringify(hosts))
				storageSet(fullStorageKey, JSON.stringify(list))
			} catch (e) {}
		}

		var readFullCache = function () {
			var raw = storageGet(fullStorageKey)
			if (!raw) return null
			try {
				return JSON.parse(raw)
			} catch (e) {
				return null
			}
		}

		var readArchivedCache = function () {
			var raw = storageGet(archivedStorageKey)
			var parsed
			if (!raw) return []
			try {
				parsed = JSON.parse(raw)
			} catch (e) {
				return []
			}
			return Array.isArray(parsed) ? parsed : []
		}

		self.ensureList = function () {
			if (swarms.length) return Promise.resolve(swarms)
			if (listLoading) return listLoading

			listLoading = Promise.resolve()
				.then(function () {
					if (!listFetch || !listUrl) {
						return Promise.reject({ message: 'nolistfetch' })
					}
					return listFetch(listUrl)
				})
				.then(function (list) {
					applyList(list)
					writeCaches(list)
					listLoading = null
					return swarms
				})
				.catch(function () {
					var cached = readFullCache()
					listLoading = null
					if (cached) {
						applyList(cached)
						return swarms
					}
					archivedHosts = readArchivedCache()
					swarms = []
					return swarms
				})

			return listLoading
		}

		/** Test / index helper: inject parsed list without network. */
		self.setList = function (list) {
			applyList(list)
			listLoading = null
			return swarms
		}

		self.getArchivedHosts = function () {
			return archivedHosts.slice()
		}

		self.getSwarms = function () {
			return swarms
		}

		var hostOf = function (server) {
			return server && server.host
		}

		var findSwarmIndexByHost = function (host) {
			var i
			var j
			var hosts
			if (!host) return -1
			for (i = 0; i < swarms.length; i++) {
				hosts = swarms[i]
				for (j = 0; j < hosts.length; j++) {
					if (hostOf(hosts[j]) === host) return i
				}
			}
			return -1
		}

		var getSwarm = function (roy) {
			var idx
			var auto

			if (roy == null || roy === '') return null

			if (typeof roy === 'number' || (/^\d+$/).test(String(roy))) {
				idx = Number(roy)
				if (swarms[idx]) return { index: idx, hosts: swarms[idx], auto: false }
			}

			idx = findSwarmIndexByHost(String(roy))
			if (idx >= 0) {
				return { index: idx, hosts: swarms[idx], auto: false }
			}

			auto = [
				{
					host: String(roy),
					offline: false,
					cantuploading: false,
				},
			]
			return { index: -1, hosts: auto, auto: true }
		}

		var hasspecial = function (hosts) {
			var i
			for (i = 0; i < hosts.length; i++) {
				if (hosts[i] && hosts[i].special) return true
			}
			return false
		}

		var canuploadSwarm = function (hosts) {
			var i
			var s
			if (!hosts || !hosts.length) return false
			for (i = 0; i < hosts.length; i++) {
				s = hosts[i]
				if (!s) continue
				if (s.cantuploading) return false
			}
			return true
		}

		var eligibleHost = function (server, type) {
			if (!server || !server.host) return false
			if (server.old) return false
			if (type === 'upload') {
				if (server.offline) return false
				if (server.cantuploading) return false
			}
			return true
		}

		var bestHostInSwarm = function (hosts, type) {
			var i
			var s
			var first = null

			for (i = 0; i < hosts.length; i++) {
				s = hosts[i]
				if (!eligibleHost(s, type || 'view')) continue
				if (!first) first = s
				if (type === 'upload' && !s.offline && !s.cantuploading) {
					return s.host
				}
				if (type !== 'upload' && !s.offline) {
					return s.host
				}
			}

			return first ? first.host : null
		}

		var failoverHosts = function (swarmHosts, preferredHost) {
			var ordered = []
			var seen = {}
			var i
			var s
			var h

			var push = function (server) {
				h = hostOf(server)
				if (!h || seen[h] || (server && server.old)) return
				seen[h] = true
				ordered.push(h)
			}

			if (preferredHost) {
				for (i = 0; i < swarmHosts.length; i++) {
					if (hostOf(swarmHosts[i]) === preferredHost) {
						push(swarmHosts[i])
						break
					}
				}
				if (!seen[preferredHost]) {
					ordered.push(preferredHost)
					seen[preferredHost] = true
				}
			}

			for (i = 0; i < swarmHosts.length; i++) {
				s = swarmHosts[i]
				if (s && !s.offline) push(s)
			}
			for (i = 0; i < swarmHosts.length; i++) {
				push(swarmHosts[i])
			}

			return ordered
		}

		self.roys = function (data) {
			data = data || {}
			var type = data.type || 'upload'
			var special = !!data.special

			return self.ensureList().then(function () {
				var output = {}
				var outIndex = 0
				var i
				var hosts
				var host

				for (i = 0; i < swarms.length; i++) {
					hosts = swarms[i]
					if (!hosts || !hosts.length) continue

					if (!special && hasspecial(hosts)) continue

					if (type === 'upload') {
						if (!canuploadSwarm(hosts)) continue
						if (!special && hasspecial(hosts)) continue
					}

					if (special && !hasspecial(hosts)) continue

					host = bestHostInSwarm(hosts, type)
					if (!host) continue

					output[String(outIndex)] = host
					outIndex++
				}

				return output
			})
		}

		var probeHost = function (host) {
			var entry = probeCache[host]
			var t = nowFn()

			if (entry && entry.expires > t) {
				return Promise.resolve(entry.ok)
			}

			return httpGet(host, '/api/v1/videos?count=0', probeTimeout, options.fetch)
				.then(function () {
					probeCache[host] = { ok: true, expires: t + probeTtl }
					return true
				})
				.catch(function () {
					probeCache[host] = { ok: false, expires: t + Math.min(probeTtl, 60000) }
					return false
				})
		}

		self.best = function (data) {
			data = data || {}
			var type = data.type || 'upload'
			var special = !!data.special
			var roy = data.roy

			return self.ensureList().then(function () {
				var swarmInfo
				var candidates = []
				var i
				var s
				var tryProbe

				if (roy == null || roy === '') {
					return self.roys({ type: type, special: special }).then(function (map) {
						var keys = Object.keys(map)
						var pick
						if (!keys.length) return Promise.reject('roy')
						pick = map[keys[Math.floor(Math.random() * keys.length)]]
						return self.best({ roy: pick, type: type, special: special })
					})
				}

				swarmInfo = getSwarm(roy)
				if (!swarmInfo || !swarmInfo.hosts || !swarmInfo.hosts.length) {
					return Promise.reject('roy')
				}

				if (
					!swarmInfo.auto &&
					!special &&
					hasspecial(swarmInfo.hosts) &&
					type === 'upload'
				) {
					/* still allow if client already picked this roy host */
				}

				for (i = 0; i < swarmInfo.hosts.length; i++) {
					s = swarmInfo.hosts[i]
					if (eligibleHost(s, type)) candidates.push(s.host)
				}

				if (!candidates.length) return Promise.reject('best')

				tryProbe = function (index) {
					if (index >= candidates.length || index >= 2) {
						return Promise.resolve({ host: candidates[0] })
					}

					return probeHost(candidates[index]).then(function (ok) {
						if (ok) return { host: candidates[index] }
						return tryProbe(index + 1)
					})
				}

				return tryProbe(0)
			})
		}

		self.allservers = function () {
			return self.ensureList().then(function () {
				var output = {}
				var i
				var j
				var hosts
				var list

				for (i = 0; i < swarms.length; i++) {
					hosts = swarms[i]
					list = []
					for (j = 0; j < hosts.length; j++) {
						if (hosts[j] && hosts[j].host && !hosts[j].old) {
							list.push(hosts[j].host)
						}
					}
					output[String(i)] = list
				}

				return output
			})
		}

		self.getHosts = function () {
			return self.ensureList().then(function () {
				var result = []
				var i
				var j
				var hosts
				var map
				var s

				for (i = 0; i < swarms.length; i++) {
					hosts = swarms[i]
					map = {}
					for (j = 0; j < hosts.length; j++) {
						s = hosts[j]
						if (!s || !s.host) continue
						map[s.host] = {
							host: s.host,
							ip: s.ip,
						}
					}
					result.push(map)
				}

				return result
			})
		}

		self.getHostIp = function (data) {
			data = data || {}
			var host = data.host

			return self.ensureList().then(function () {
				var i
				var j
				var s

				if (!host) return Promise.reject('Host not found')

				for (i = 0; i < swarms.length; i++) {
					for (j = 0; j < swarms[i].length; j++) {
						s = swarms[i][j]
						if (s && s.host === host) {
							if (s.ip) return s.ip
							return Promise.reject('Host not found')
						}
					}
				}

				return Promise.reject('Host not found')
			})
		}

		var videoCacheGet = function (id) {
			var entry = videoCache[id]
			if (!entry) return null
			if (entry.expires <= nowFn()) {
				delete videoCache[id]
				return null
			}
			return entry
		}

		var videoCacheSet = function (id, payload, ttl) {
			videoCache[id] = {
				data: payload,
				error: !payload,
				expires: nowFn() + (ttl || videoTtl),
			}
		}

		var fetchVideoOnHosts = function (id, hosts) {
			var index = 0

			var next = function () {
				var host
				if (index >= hosts.length) {
					return Promise.reject({ error: true })
				}
				host = hosts[index]
				index++
				return httpGet(
					host,
					'/api/v1/videos/' + encodeURIComponent(id),
					videoHttpTimeout,
					options.fetch
				)
					.then(function (body) {
						if (!body || typeof body !== 'object') {
							return Promise.reject({ error: true })
						}
						body.from = host
						if (body.isLive && (!body.aspectRatio || body.aspectRatio == '0')) {
							body.aspectRatio = 1.78
						}
						if (body.aspectRatio != null) {
							body.aspectRatio = Number(body.aspectRatio)
						}
						return body
					})
					.catch(function () {
						return next()
					})
			}

			return next()
		}

		self.video = function (data) {
			data = data || {}
			var url = data.url
			var fast = !!data.fast
			var update = !!data.update
			var parsed = parselink(url)
			var cached

			if (!parsed.id) {
				return Promise.reject('No id info received')
			}

			if (fast && !update) {
				cached = videoCacheGet(parsed.id)
				if (cached && !cached.error && cached.data) {
					return Promise.resolve(cached.data)
				}
				return Promise.resolve({})
			}

			if (!update) {
				cached = videoCacheGet(parsed.id)
				if (cached) {
					if (cached.error) {
						return Promise.reject({ error: true, cached: true })
					}
					if (cached.data) return Promise.resolve(cached.data)
				}
			}

			return self.ensureList().then(function () {
				var swarmInfo = getSwarm(parsed.host)
				var hosts = failoverHosts(
					(swarmInfo && swarmInfo.hosts) || [{ host: parsed.host }],
					parsed.host
				)

				return fetchVideoOnHosts(parsed.id, hosts).then(
					function (body) {
						var ttl = videoTtl
						if (
							body.isLive ||
							(body.state && (body.state.id == 2 || body.state.id == 3))
						) {
							ttl = videoLiveTtl
						}
						videoCacheSet(parsed.id, body, ttl)
						return body
					},
					function (err) {
						var ontime = videoLiveTtl
						if (err && err.status == 404) ontime = 120000
						videoCacheSet(parsed.id, null, ontime)
						return Promise.reject(err || { error: true })
					}
				)
			})
		}

		self.videos = function (data) {
			data = data || {}
			var urls = data.urls || []
			var fast = !!data.fast
			var update = !!data.update
			var result = {}

			return Promise.all(
				urls.map(function (url) {
					return self
						.video({ url: url, fast: fast, update: update })
						.then(function (r) {
							if (r && r.uuid) result[url] = r
							else if (r && Object.keys(r).length) result[url] = r
							return null
						})
						.catch(function () {
							if (!result.errors) result.errors = []
							result.errors.push(url)
							return null
						})
				})
			).then(function () {
				return result
			})
		}

		/**
		 * system16 peertubeinstancestable shape (proxy16 peertube.info).
		 * No live PerformanceMetric — empty stats so the template can render hosts.
		 */
		self.info = function () {
			var instances = {}
			var i
			var j
			var s
			var cached

			// Hydrate from cache when list was not loaded yet (info() is sync).
			if (!swarms.length) {
				cached = readFullCache()
				if (cached) applyList(cached)
			}

			for (i = 0; i < swarms.length; i++) {
				for (j = 0; j < swarms[i].length; j++) {
					s = swarms[i][j]
					if (!s || !s.host) continue
					instances[s.host] = {
						host: s.host,
						key: s.host,
						ip: s.ip,
						archived: !!s.archived,
						canuse: !s.offline && !s.old,
						auto: false,
						stats: {
							events: {},
							slice: {},
						},
					}
				}
			}

			return {
				events: {},
				slice: {},
				instances: instances,
			}
		}

		self.destroy = function () {
			swarms = []
			rawList = null
			archivedHosts = []
			listLoading = null
			videoCache = {}
			probeCache = {}
		}
	}

	LocalNodePeertubeCtor.toLegacySwarms = toLegacySwarms
	LocalNodePeertubeCtor.extractArchivedHosts = extractArchivedHosts
	LocalNodePeertubeCtor.parselink = parselink
	LocalNodePeertubeCtor.peertubeHttpGet = peertubeHttpGet

	return LocalNodePeertubeCtor
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodePeertube
}
