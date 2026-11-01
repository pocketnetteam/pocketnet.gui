/**
 * Local Node Proxy — node list + selection + seed health + peer discovery (HTTP-only MVP).
 * Selection ported from proxy16/node/manager.js; IndexedDB reload budgets continue in Phase 5.
 */
var LocalNodeManager = function (options) {
	options = options || {}

	var self = this
	var util =
		options.util ||
		(typeof LocalNodeUtil !== 'undefined' ? LocalNodeUtil : null)
	var NodeCtor =
		options.Node || (typeof LocalNode !== 'undefined' ? LocalNode : null)
	var seedsApi =
		options.seeds ||
		(typeof LocalNodeSeeds !== 'undefined' ? LocalNodeSeeds : null)
	var constants =
		options.constants ||
		(typeof LocalNodeConstants !== 'undefined'
			? LocalNodeConstants
			: typeof require === 'function'
				? require('./constants.js')
				: null)
	var transport =
		options.transport ||
		(typeof LocalNodeTransport !== 'undefined' ? LocalNodeTransport : null)
	var random =
		typeof options.random === 'function' ? options.random : Math.random
	var bestapplyMs =
		typeof options.bestapplyInterval === 'number'
			? options.bestapplyInterval
			: 5000
	var clockNow =
		options.now ||
		function () {
			return Date.now()
		}
	var clockInterval =
		options.setInterval ||
		function (fn, ms) {
			return setInterval(fn, ms)
		}
	var clockClearInterval =
		options.clearInterval ||
		function (id) {
			return clearInterval(id)
		}
	var seedEnv = options.seedEnv || options.app || null
	var loadSeedsOnInit = options.loadSeeds !== false
	var loadCatalogOnInit = options.loadCatalog !== false
	var probeHealthOnInit = options.probeHealth !== false
	var discoverOnInit = options.discoverOnInit !== false
	var closeStoreOnDestroy = options.closeStoreOnDestroy !== false
	var healthTimeoutMs =
		typeof options.healthTimeout === 'number'
			? options.healthTimeout
			: (constants && constants.HEALTH_TIMEOUT_MS) || 12000
	var defaultRpcTimeoutMs =
		typeof options.rpcTimeout === 'number'
			? options.rpcTimeout
			: (constants && constants.DEFAULT_RPC_TIMEOUT_MS) || 30000
	var pingConnectingMs =
		typeof options.pingConnectingMs === 'number'
			? options.pingConnectingMs
			: 15000
	var useTls = options.tls === true
	var peernodesCheckTime =
		typeof options.peernodesCheckTime === 'number'
			? options.peernodesCheckTime
			: (constants && constants.PEERNODES_CHECK_MS) || 10000000
	var discoveryAskSuccessCap =
		typeof options.discoveryAskSuccessCap === 'number'
			? options.discoveryAskSuccessCap
			: (constants && constants.DISCOVERY_ASK_SUCCESS_CAP) || 5
	var discoveryPeerAskBatch =
		typeof options.discoveryPeerAskBatch === 'number'
			? options.discoveryPeerAskBatch
			: (constants && constants.DISCOVERY_PEER_ASK_BATCH) || 5
	var discoveryConnectParallel =
		typeof options.discoveryConnectParallel === 'number'
			? options.discoveryConnectParallel
			: (constants && constants.DISCOVERY_CONNECT_PARALLEL) || 3
	var storeReloadLimit =
		typeof options.storeReloadLimit === 'number'
			? options.storeReloadLimit
			: (constants && constants.STORE_RELOAD_LIMIT) || 5
	var forgetGraceMs =
		typeof options.forgetGraceMs === 'number'
			? options.forgetGraceMs
			: (constants && constants.FORGET_GRACE_MS) || 60000
	var badNodeVersions =
		options.badNodeVersions ||
		(constants && constants.BAD_NODE_VERSIONS) ||
		[]

	var bestapplyTimer = null
	/** idle | probing | done */
	var healthState = 'idle'
	var healthStartedAt = 0

	self.nodes = []
	self.nodesmap = {}
	self.bestnode = ''
	self.bestnodes = []
	self.bestnodeheight = 0
	self.transport = transport
	/** Optional catalog store (Phase 5). Reload/persist wired in later tasks. */
	self.store = options.store || null
	/** Pending peer candidates keyed by node.key (not yet connected). */
	self.peers = {}
	self.askedpeers = {}
	self.askedpeerssuccess = {}
	self.askingpeer = {}
	self.peernodesCheckTime = peernodesCheckTime
	self.healthState = function () {
		return healthState
	}

	/**
	 * Attach or replace IndexedDB/memory catalog store (no reload yet).
	 */
	self.setStore = function (store) {
		self.store = store || null
		return self
	}

	/** Fixed client budgets — never scale by proxy.users(). */
	self.minNodesCount =
		typeof options.minNodesCount === 'number'
			? options.minNodesCount
			: (constants && constants.MIN_NODES_COUNT) || 3
	self.iniNodeCount =
		typeof options.iniNodeCount === 'number'
			? options.iniNodeCount
			: (constants && constants.INI_NODE_COUNT) || 5
	self.effectiveUsers =
		typeof options.effectiveUsers === 'number'
			? options.effectiveUsers
			: (constants && constants.EFFECTIVE_USERS) || 1

	var ensureUtil = function () {
		if (!util || typeof util.randmap !== 'function') {
			throw new Error('LocalNodeManager: LocalNodeUtil required')
		}
		return util
	}

	self.remap = function () {
		self.nodesmap = {}
		ensureUtil().each(self.nodes, function (node) {
			if (node && node.key) self.nodesmap[node.key] = node
		})
		return self
	}

	self.add = function (node) {
		if (!node || !node.key) return null
		if (self.nodesmap[node.key]) return self.nodesmap[node.key]

		node.manager = self
		self.nodes.push(node)
		self.remap()
		return node
	}

	/**
	 * Find by key, host:port key, or host string.
	 */
	self.find = function (keyOrHost) {
		var u
		var i
		var node
		var needle

		if (!keyOrHost) return null
		if (self.nodesmap[keyOrHost]) return self.nodesmap[keyOrHost]

		needle = String(keyOrHost)
		u = ensureUtil()
		for (i = 0; i < self.nodes.length; i++) {
			node = self.nodes[i]
			if (!node) continue
			if (node.key === needle || node.host === needle) return node
			if (node.host + ':' + node.port === needle) return node
		}
		return null
	}

	self.remove = function (key) {
		var node = self.nodesmap[key]
		if (!node) return null

		if (typeof node.destroy === 'function') node.destroy()
		node.removed = true
		self.nodes = ensureUtil().filter(self.nodes, function (n) {
			return !n.removed
		})
		self.remap()
		return node
	}

	/**
	 * Create + add a LocalNode from options (sets manager reference).
	 */
	self.createNode = function (nodeOptions) {
		var node
		if (!NodeCtor) throw new Error('LocalNodeManager: LocalNode constructor required')
		node = new NodeCtor(nodeOptions || {}, self)
		return self.add(node) || node
	}

	self.initednodes = function () {
		return ensureUtil().filter(self.nodes, function (n) {
			return n && n.inited
		})
	}

	self.initednodeswithrating = function () {
		return ensureUtil().filter(self.nodes, function (n) {
			return n && n.inited && n.statistic && n.statistic.rating() > 0
		})
	}

	self.bestlist = function () {
		var u = ensureUtil()
		var nodes = u.sortByDesc(self.initednodes(), function (node) {
			return node.statistic.probability()
		})
		return u.filter(nodes, function (n, i) {
			return i < 3
		})
	}

	self.bestnodesapply = function () {
		self.bestnodes = ensureUtil().map(self.bestlist(), function (n) {
			return n.key
		})
		return self.bestnodes
	}

	self.selectProbability = function () {
		var u = ensureUtil()
		var nds = u.filter(self.initednodes(), function (nd) {
			return nd.allowRpc && nd.export().canuse && !nd.backward
		})
		var np = u.map(nds, function (node) {
			return {
				node: node,
				probability:
					(Number(node.statistic.probability()) || 0) + random() / 10000,
			}
		})
		var r = u.randmap(np, function (min, max) {
			return min + random() * (max - min)
		})

		if (r && r.node) return r.node
		return null
	}

	self.selectbest = function () {
		var u = ensureUtil()
		var canuse = u.filter(self.initednodes(), function (node) {
			return node.export().canuse
		})
		var best = u.maxBy(canuse, function (node) {
			return node.statistic.rating()
		})

		if (!best || !best.statistic.rating()) {
			best = self.initednodes()[0] || null
		}

		return best || null
	}

	self.bestapply = function () {
		var node = self.selectProbability()
		if (node) {
			self.bestnode = node.key
			self.bestnodeheight = node.height()
		}
		return node || null
	}

	self.startBestapply = function () {
		if (bestapplyTimer != null) return self
		if (bestapplyMs <= 0) return self

		bestapplyTimer = clockInterval(function () {
			self.bestapply()
			self.bestnodesapply()
			self.manageNodeBudget()
		}, bestapplyMs)

		return self
	}

	self.stopBestapply = function () {
		if (bestapplyTimer != null) {
			clockClearInterval(bestapplyTimer)
			bestapplyTimer = null
		}
		return self
	}

	/**
	 * Add trust seed metas as LocalNode instances (not inited/canuse until health).
	 * Seeds win on key conflict: force stable/trust flags onto any existing catalog peer.
	 * @param {Object|boolean} [env] test/main switch; defaults to constructor seedEnv
	 * @returns {Array} nodes added or already present
	 */
	self.loadSeeds = function (env) {
		var list
		var i
		var meta
		var added = []
		var existing
		var key
		var port

		if (!seedsApi || typeof seedsApi.list !== 'function') {
			throw new Error('LocalNodeManager: LocalNodeSeeds required')
		}
		if (!NodeCtor) {
			throw new Error('LocalNodeManager: LocalNode constructor required')
		}

		list = seedsApi.list(typeof env !== 'undefined' ? env : seedEnv)
		for (i = 0; i < list.length; i++) {
			meta = list[i]
			if (!meta || !meta.host) continue

			port = meta.port != null ? meta.port : 38081
			key = meta.key || meta.host + ':' + port
			existing = self.find(key) || self.find(meta.host)

			if (existing) {
				existing.stable = true
				existing.peer = false
				existing.local = false
				if (meta.name) existing.name = meta.name
				if (meta.ws != null) existing.ws = meta.ws
				if (meta.sport != null) existing.sport = meta.sport
				if (meta.sws != null) existing.sws = meta.sws
				added.push(existing)
				continue
			}

			added.push(
				self.createNode({
					host: meta.host,
					port: meta.port,
					ws: meta.ws,
					sport: meta.sport,
					sws: meta.sws,
					name: meta.name,
					stable: true,
					peer: false,
					inited: false,
					canuse: false,
					allowRpc: false,
				})
			)
		}
		return added
	}

	/**
	 * Cold-start: load up to storeReloadLimit shuffled catalog peers for current bchain.
	 * Skips localhost / local PocketNet node docs and keys already claimed by seeds.
	 * Call after loadSeeds so seeds win conflicts.
	 * @returns {Promise<Array>} nodes created from store
	 */
	self.loadCatalogFromStore = function () {
		var store = self.store
		var bchain
		var limit = storeReloadLimit
		var isBadHost

		if (!store || typeof store.loadAll !== 'function') {
			return Promise.resolve([])
		}

		bchain = self.expectedBchain()
		isBadHost =
			NodeCtor && typeof NodeCtor.isUnusablePeerHost === 'function'
				? NodeCtor.isUnusablePeerHost
				: function (host) {
						var h = host ? String(host).trim().toLowerCase() : ''
						return (
							!h ||
							h === 'localhost' ||
							h === '127.0.0.1' ||
							h === '0.0.0.0'
						)
				  }

		return store.loadAll(bchain).then(function (docs) {
			var u = ensureUtil()
			var shuffled =
				typeof u.shuffle === 'function'
					? u.shuffle(docs || [], random)
					: (docs || []).slice()
			var picked = []
			var i
			var doc
			var node

			for (i = 0; i < shuffled.length && picked.length < limit; i++) {
				doc = shuffled[i]
				if (!doc || !doc.host || !doc.key) continue
				if (doc.local === true) continue
				if (isBadHost(doc.host)) continue
				if (self.nodesmap[doc.key] || self.find(doc.key)) continue

				node = self.createNode({
					host: doc.host,
					port: doc.port,
					ws: doc.ws,
					sport: doc.sport,
					sws: doc.sws || 8887,
					name: doc.name,
					key: doc.key,
					stable: doc.stable === true,
					peer: doc.peer !== false,
					local: false,
					bchain: doc.bchain || bchain,
					version: doc.version || null,
					vcode: typeof doc.vcode !== 'undefined' ? doc.vcode : null,
					addedby: doc.addedby || '',
					inited: false,
					canuse: false,
					allowRpc: false,
				})

				if (node) picked.push(node)
			}

			self.remap()
			return picked
		})
	}

	self.expectedBchain = function (env) {
		var e = typeof env !== 'undefined' ? env : seedEnv
		if (seedsApi && typeof seedsApi.isTestNetwork === 'function') {
			return seedsApi.isTestNetwork(e) ? 'test' : 'main'
		}
		return 'main'
	}

	self.canuseNodes = function () {
		return ensureUtil().filter(self.nodes, function (n) {
			return n && n.export && n.export().canuse
		})
	}

	self.hasUsableNode = function () {
		return self.canuseNodes().length > 0
	}

	/**
	 * HTTP working set (proxy getWorkingNodes without WSS gate).
	 * Treat WSS count as 0 → use the longer success-time budget (7000ms).
	 */
	self.getWorkingNodes = function () {
		return ensureUtil().filter(self.nodes, function (n) {
			var s
			var r
			var time = 7000

			if (!n || !n.inited || !n.allowRpc) return false
			if (!n.statistic || typeof n.statistic.get5min !== 'function') return false

			s = n.statistic.get5min()
			if (!s) return false
			r = n.statistic.rating()

			if (
				s.success > 0 &&
				s.success > s.failed &&
				s.time < time &&
				r &&
				n.penalty &&
				n.penalty().k < 0.8
			) {
				return true
			}
			return false
		})
	}

	/**
	 * Purge blacklisted versions from catalog store (proxy cleardatabase).
	 * Also drops matching in-memory nodes that are not stable/alwaysrun.
	 * @returns {Promise<number>} store keys removed
	 */
	self.purgeBadVersions = function () {
		var list = badNodeVersions || []
		var store = self.store
		var chain
		var badSet = {}
		var i

		for (i = 0; i < list.length; i++) {
			if (list[i] != null && list[i] !== '') {
				badSet[String(list[i])] = true
			}
		}

		chain =
			store && typeof store.removeVersions === 'function'
				? store.removeVersions(list)
				: Promise.resolve(0)

		return chain.then(function (removed) {
			var doomed = []

			ensureUtil().each(self.nodes.slice(), function (n) {
				if (!n || !n.version) return
				if (!badSet[String(n.version)]) return
				if (n.stable || n.alwaysrun) return
				doomed.push(n.key)
			})

			ensureUtil().each(doomed, function (key) {
				self.remove(key)
			})

			return typeof removed === 'number' ? removed : doomed.length
		})
	}

	/**
	 * Init a not-yet-inited node when under MIN_NODES_COUNT working budget.
	 * Client: EFFECTIVE_USERS=1 — never scale by proxy.users()/50.
	 * @returns {boolean} whether init() was called
	 */
	self.initIfNeed = function (node) {
		var working

		if (!node || node.inited) return false
		if (!node.eventsCount && !node.alwaysrun) return false

		working = self.getWorkingNodes()

		if (
			working.length < self.minNodesCount ||
			node.alwaysrun
		) {
			node.init()
			return true
		}

		return false
	}

	/**
	 * Shrink idle inited set toward MIN_NODES_COUNT.
	 * Prefer keeping canuse / higher rating; never forget stable/alwaysrun;
	 * WSS treated as 0 (always eligible after grace).
	 * @returns {number} nodes forgotten
	 */
	self.forgetIfNotUsing = function () {
		var u = ensureUtil()
		var min = self.minNodesCount
		var now = clockNow()
		var inited
		var candidates
		var remaining
		var forgotten = 0
		var i
		var n

		inited = self.initednodes()
		if (inited.length <= min) return 0

		candidates = u.filter(inited, function (node) {
			if (!node || node.alwaysrun || node.stable) return false
			if (node.initedTime == null) return false
			if (now - node.initedTime < forgetGraceMs) return false
			return true
		})

		// Ascending priority: forget lowest rating / non-canuse first (negate for sortByDesc).
		candidates = u.sortByDesc(candidates, function (node) {
			var rating =
				node.statistic && typeof node.statistic.rating === 'function'
					? Number(node.statistic.rating()) || 0
					: 0
			var canuseBonus =
				node.canuse || (node.export && node.export().canuse) ? 1000 : 0
			return -(rating + canuseBonus)
		})

		remaining = inited.length

		for (i = 0; i < candidates.length; i++) {
			if (remaining <= min) break
			n = candidates[i]
			if (!n || typeof n.forget !== 'function') continue
			n.forget()
			forgotten++
			remaining--
		}

		return forgotten
	}

	/**
	 * Light find-style tick: init a few not-inited if under budget, then forget extras.
	 * Does not hammer RPC (initIfNeed does not probe; health/discovery stay separate).
	 */
	self.manageNodeBudget = function () {
		var u = ensureUtil()
		var notinited
		var slice
		var i

		notinited = u.filter(self.nodes, function (node) {
			return node && !node.inited
		})
		slice = (
			typeof u.shuffle === 'function' ? u.shuffle(notinited, random) : notinited.slice()
		).slice(0, self.iniNodeCount || 5)

		for (i = 0; i < slice.length; i++) {
			self.initIfNeed(slice[i])
		}

		return self.forgetIfNotUsing()
	}

	/**
	 * True while seed health is in flight and within pingConnectingMs.
	 * Lets LocalNodeProxy.ping succeed briefly before canuse exists.
	 */
	self.isHealthConnecting = function () {
		if (healthState !== 'probing') return false
		if (!healthStartedAt) return true
		return clockNow() - healthStartedAt < pingConnectingMs
	}

	var rpcIdCounter = 1

	var mapTransportErrorCode = function (err) {
		var code = err && err.code
		if (code === 408 || code === 429 || code === 521) return code
		// Transport timeout (browser Abort / Cordova -8 → 20).
		if (code === 20) return 408
		// Preserve JSON-RPC soft codes used by Api.rpc retry (canchange).
		if (code === -28 || code === -1) return code
		return typeof code === 'number' && code > 0 ? code : 500
	}

	var unwrapJsonRpc = function (body) {
		if (body && body.error) {
			var err = body.error
			var e = new Error((err && err.message) || 'rpcerror')
			e.code = (err && err.code) || 500
			throw e
		}
		if (body && typeof body === 'object' && Object.prototype.hasOwnProperty.call(body, 'result')) {
			return body.result
		}
		return body
	}

	var resolveRpcPath = function (method, rpcOpts) {
		var allowlist
		var path

		rpcOpts = rpcOpts || {}
		if (rpcOpts.path) return rpcOpts.path

		allowlist =
			rpcOpts.allowlist ||
			(typeof LocalNodeRpcAllowlist !== 'undefined' ? LocalNodeRpcAllowlist : null)

		if (allowlist && typeof allowlist.pathFor === 'function') {
			path = allowlist.pathFor(method, rpcOpts)
			if (path) return path
		}

		// Health / Phase 3 fallback when allowlist module is not loaded.
		if (method === 'getnodeinfo') return '/public/'
		return null
	}

	var buildNodeRpcUrl = function (t, node, path, tls) {
		var port = tls && node.sport ? node.sport : node.port

		if (path === '/post/') {
			if (typeof t.buildPostUrl !== 'function') return null
			return t.buildPostUrl(node.host, port, tls)
		}

		if (path === '/public/') {
			if (typeof t.buildPublicUrl !== 'function') return null
			return t.buildPublicUrl(node.host, port, tls)
		}

		// Private root path requires credentials — never used on client MVP.
		return null
	}

	/**
	 * POST JSON-RPC to a node via transport (/public/ or /post/).
	 * Records statistic / penalty on the node. Browser relay stays inside transport.
	 * @returns {Promise<*>} unwrapped JSON-RPC result
	 */
	self.requestRpc = function (node, method, parameters, rpcOpts) {
		var t = self.transport
		var opts = rpcOpts || {}
		var path
		var url
		var started
		var tls
		var timeoutMs
		var body
		var id

		if (!node || !node.host) {
			return Promise.reject({ code: -1, message: 'badnode' })
		}
		if (!method || typeof method !== 'string') {
			return Promise.reject({ code: -32601, message: 'nomethod' })
		}
		if (!t || typeof t.request !== 'function') {
			return Promise.reject({ code: -1, message: 'notransport' })
		}

		path = resolveRpcPath(method, opts)
		if (!path || (path !== '/public/' && path !== '/post/')) {
			return Promise.reject({ code: -32601, message: 'methodnotallowed' })
		}

		tls = useTls === true
		url = buildNodeRpcUrl(t, node, path, tls)
		if (!url) {
			return Promise.reject({ code: -1, message: 'notransport' })
		}

		started = clockNow()
		timeoutMs =
			typeof opts.timeout === 'number' ? opts.timeout : defaultRpcTimeoutMs
		id = opts.id != null ? opts.id : rpcIdCounter++
		body =
			typeof t.buildJsonRpcBody === 'function'
				? t.buildJsonRpcBody(method, parameters || [], id)
				: {
						jsonrpc: '2.0',
						method: method,
						params: parameters || [],
						id: id,
				  }

		return t
			.request({
				url: url,
				method: 'POST',
				body: body,
				timeout: timeoutMs,
			})
			.then(function (resBody) {
				return unwrapJsonRpc(resBody)
			})
			.then(function (result) {
				if (typeof node.recordRpcResult === 'function') {
					node.recordRpcResult({
						success: true,
						code: 200,
						time: Math.max(0, clockNow() - started),
						method: method,
					})
				}
				return result
			})
			.catch(function (err) {
				var code = mapTransportErrorCode(err)
				var out

				if (typeof node.recordRpcResult === 'function') {
					node.recordRpcResult({
						success: false,
						code: code,
						time: Math.max(0, clockNow() - started),
						method: method,
					})
				}

				// Normalize transport timeout → 408 so Api soft-retry sees .code.
				if (err && err.code === 20) {
					out = { code: 408, message: err.message || 'timeout' }
					return Promise.reject(out)
				}

				if (err && err.code != null) {
					if (err.code !== code && (code === 408 || code === -28 || code === -1)) {
						out = { code: code, message: err.message || 'rpcfail' }
						return Promise.reject(out)
					}
					return Promise.reject(err)
				}

				return Promise.reject({
					code: code,
					message: (err && err.message) || 'rpcfail',
				})
			})
	}

	/**
	 * POST JSON-RPC getnodeinfo to a node via transport.
	 * @returns {Promise<Object>} result object
	 */
	self.requestNodeInfo = function (node) {
		return self.requestRpc(node, 'getnodeinfo', [], {
			path: '/public/',
			timeout: healthTimeoutMs,
		})
	}

	/**
	 * Apply getnodeinfo → height/version/bchain; mark inited/canuse when usable.
	 * @returns {boolean} whether node became canuse
	 */
	self.applyHealthResult = function (node, info, expectedChain) {
		var height
		var chain

		if (!node || !info) return false

		node.applyNodeInfo(info)
		chain = node.bchain || info.chain || info.bchain || null
		height = node.height()

		if (expectedChain && chain && chain !== expectedChain) {
			node.canuse = false
			node.allowRpc = false
			// Still mark inited so we do not keep reprobing forever without discovery.
			node.init()
			return false
		}

		if (!height) {
			node.canuse = false
			node.allowRpc = false
			node.init()
			return false
		}

		node.init()
		node.canuse = true
		node.allowRpc = true
		return true
	}

	/**
	 * Run async mapper over items with a concurrency cap.
	 * @returns {Promise<Array>}
	 */
	var mapPool = function (items, limit, fn) {
		var list = items || []
		var cap = limit > 0 ? limit : 1
		var results = new Array(list.length)
		var index = 0
		var active = 0

		return new Promise(function (resolve) {
			var pump = function () {
				if (index >= list.length && active === 0) {
					resolve(results)
					return
				}

				while (active < cap && index < list.length) {
					;(function (idx) {
						var item = list[idx]
						active++
						Promise.resolve()
							.then(function () {
								return fn(item, idx)
							})
							.then(
								function (value) {
									results[idx] = value
								},
								function () {
									results[idx] = null
								}
							)
							.then(function () {
								active--
								pump()
							})
					})(index++)
				}
			}

			if (!list.length) {
				resolve([])
				return
			}

			pump()
		})
	}

	var persistConnectedNodes = function (nodes) {
		var store = self.store
		var list = nodes || []

		if (!store || typeof store.put !== 'function' || !list.length) {
			return Promise.resolve(list)
		}

		return Promise.all(
			ensureUtil().map(list, function (node) {
				var doc =
					node && typeof node.export === 'function' ? node.export() : node
				return store.put(doc).catch(function () {
					return null
				})
			})
		).then(function () {
			return list
		})
	}

	/**
	 * Validate candidate nodes with getnodeinfo; keep those matching expected bchain.
	 * Caps parallel probes (discoveryConnectParallel).
	 * @returns {Promise<Array>} nodes that became canuse
	 */
	self.connected = function (nodes) {
		var expected = self.expectedBchain()
		var list = nodes || []
		var connected = []

		return mapPool(list, discoveryConnectParallel, function (node) {
			if (!node) return null

			return self.requestNodeInfo(node).then(
				function (info) {
					if (self.applyHealthResult(node, info, expected)) {
						connected.push(node)
						return node
					}
					return null
				},
				function () {
					return null
				}
			)
		}).then(function () {
			return connected
		})
	}

	/**
	 * Ask one inited node for peers → filter unknown → connected → add + store.put.
	 * @returns {Promise<Array>} newly connected nodes
	 */
	self.peernodes = function (node) {
		if (!node || typeof node.peers !== 'function') {
			return Promise.resolve([])
		}

		return node.peers().then(function (candidates) {
			var unknown = []
			var i
			var n

			for (i = 0; i < (candidates || []).length; i++) {
				n = candidates[i]
				if (!n || !n.key) continue
				if (self.nodesmap[n.key] || self.peers[n.key]) continue
				self.peers[n.key] = n
				unknown.push(n)
			}

			return self.connected(unknown)
		}).then(function (connected) {
			var i
			var nodeConnected

			for (i = 0; i < connected.length; i++) {
				nodeConnected = connected[i]
				if (!nodeConnected || !nodeConnected.key) continue
				self.add(nodeConnected)
				delete self.peers[nodeConnected.key]
			}

			self.remap()
			if (connected.length) {
				self.bestapply()
				self.bestnodesapply()
			}

			return persistConnectedNodes(connected).then(function () {
				return connected
			})
		})
	}

	/**
	 * Throttled peernodes ask for one source node (peernodesCheckTime window).
	 */
	self.peernodesTime = function (node) {
		var last
		var key

		if (!node || !node.key) return Promise.resolve([])
		key = node.key

		if (self.askingpeer[key]) {
			return Promise.reject({ code: -1, message: 'wait' })
		}

		last = self.askedpeers[key]
		if (last != null && clockNow() - last < peernodesCheckTime) {
			return Promise.resolve([])
		}

		self.askingpeer[key] = true

		return self
			.peernodes(node)
			.then(function (connected) {
				self.askedpeerssuccess[key] = clockNow()
				return connected
			})
			.finally(function () {
				self.askedpeers[key] = clockNow()
				delete self.askingpeer[key]
			})
	}

	/**
	 * From inited/canuse nodes, ask up to discoveryPeerAskBatch sources for peers.
	 * Skips when recent askedsuccess count ≥ discoveryAskSuccessCap inside the window.
	 * Discovery is always enabled (seeds are bootstrap, not the only source).
	 * @returns {Promise<Array>} flattened newly connected nodes
	 */
	self.peerAllNodesTime = function (nodes) {
		var sources
		var askedsuccess = 0
		var key
		var batch
		var i
		var added = []

		for (key in self.askedpeerssuccess) {
			if (!Object.prototype.hasOwnProperty.call(self.askedpeerssuccess, key)) {
				continue
			}
			if (clockNow() - self.askedpeerssuccess[key] < peernodesCheckTime) {
				askedsuccess++
			}
		}

		if (askedsuccess >= discoveryAskSuccessCap) {
			return Promise.resolve([])
		}

		sources = nodes
		if (!sources || !sources.length) {
			sources = ensureUtil().filter(self.nodes, function (n) {
				return n && (n.canuse || (n.export && n.export().canuse) || n.inited)
			})
		}

		batch = (
			typeof ensureUtil().shuffle === 'function'
				? ensureUtil().shuffle(sources, random)
				: sources.slice()
		).slice(0, discoveryPeerAskBatch)

		if (!batch.length) return Promise.resolve([])

		return batch
			.reduce(function (chain, source) {
				return chain.then(function () {
					return self.peernodesTime(source).then(
						function (connected) {
							for (i = 0; i < (connected || []).length; i++) {
								added.push(connected[i])
							}
							return added
						},
						function () {
							return added
						}
					)
				})
			}, Promise.resolve())
			.then(function () {
				return added
			})
	}

	/** Public kick for discovery (tests / later init tick). */
	self.discoverPeers = function (nodes) {
		return self.peerAllNodesTime(nodes)
	}

	/**
	 * Probe up to iniNodeCount not-yet-inited seeds via getnodeinfo.
	 * @returns {Promise<Array>} nodes that became canuse
	 */
	self.probeSeedsHealth = function () {
		var u = ensureUtil()
		var expected = self.expectedBchain()
		var candidates
		var slice
		var connected = []

		if (!self.transport || typeof self.transport.request !== 'function') {
			healthState = 'done'
			return Promise.resolve(connected)
		}

		healthState = 'probing'
		healthStartedAt = clockNow()

		candidates = u.filter(self.nodes, function (n) {
			return n && !n.inited
		})
		slice = (typeof u.shuffle === 'function' ? u.shuffle(candidates, random) : candidates).slice(
			0,
			self.iniNodeCount || 5
		)

		if (!slice.length) {
			healthState = 'done'
			return Promise.resolve(connected)
		}

		return Promise.all(
			u.map(slice, function (node) {
				return self.requestNodeInfo(node).then(
					function (info) {
						if (self.applyHealthResult(node, info, expected)) {
							connected.push(node)
						}
						return node
					},
					function () {
						// Failures already recorded statistic/penalty; leave canuse false.
						return null
					}
				)
			})
		).then(function () {
			healthState = 'done'
			if (connected.length) {
				self.bestapply()
				self.bestnodesapply()
			}
			return persistConnectedNodes(connected).then(function () {
				return connected
			})
		})
	}

	/**
	 * Cold start: purge bad versions → seeds → ≤N shuffled store peers → health →
	 * discovery tick → bestapply interval. Seeds win key conflicts for stable flags.
	 * Does not load 127.0.0.1 local PocketNet node on Cordova/web.
	 */
	self.init = function () {
		var chain = self.purgeBadVersions().catch(function () {
			return 0
		})

		return chain
			.then(function () {
				if (loadSeedsOnInit) {
					self.loadSeeds()
				}

				if (loadCatalogOnInit) {
					return self.loadCatalogFromStore().catch(function () {
						return []
					})
				}

				return []
			})
			.then(function () {
				if (probeHealthOnInit) {
					return self.probeSeedsHealth()
				}

				healthState = 'done'
				return []
			})
			.then(function () {
				self.remap()
				self.bestapply()
				self.bestnodesapply()

				if (!discoverOnInit) {
					return []
				}

				return self.discoverPeers().catch(function () {
					return []
				})
			})
			.then(function () {
				self.remap()
				self.bestapply()
				self.bestnodesapply()
				self.startBestapply()
				return self
			})
	}

	self.destroy = function () {
		var store = self.store
		var closePromise = Promise.resolve()

		self.stopBestapply()
		ensureUtil().each(self.nodes.slice(), function (node) {
			if (node && typeof node.destroy === 'function') node.destroy()
		})
		self.nodes = []
		self.nodesmap = {}
		self.bestnode = ''
		self.bestnodes = []
		self.bestnodeheight = 0
		self.peers = {}
		self.askedpeers = {}
		self.askedpeerssuccess = {}
		self.askingpeer = {}
		healthState = 'idle'
		healthStartedAt = 0

		if (
			closeStoreOnDestroy &&
			store &&
			typeof store.close === 'function'
		) {
			closePromise = Promise.resolve()
				.then(function () {
					return store.close()
				})
				.catch(function () {
					return null
				})
		}

		return closePromise.then(function () {
			return self
		})
	}

	self.now = clockNow

	return self
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeManager
}
