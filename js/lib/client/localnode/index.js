/**
 * Local Node Proxy — client-side truncated node manager facade.
 * Phase 0–2: flags, transport, list meta. Phase 3: manager + seed health/ping.
 * Phase 4: allowlist + RPC dispatch + slim TTL cache + nodes/select|canchange.
 * Phase 5: IndexedDB/memory catalog store + cold-start reload / discovery persist.
 */
var LocalNodeProxy = function (app, options) {
	var self = this
	options = options || {}

	self.app = app || null
	self.transport =
		options.transport ||
		(typeof LocalNodeTransport !== 'undefined' ? LocalNodeTransport : null)
	self.manager = options.manager || null
	self._managerOptions = options.managerOptions || null
	self.cache = options.cache || null
	self.store = options.store || null
	/** Sticky LocalNode instance after selectNode (Api also keeps export on Proxy16.current). */
	self.current = null

	if (!self.cache) {
		var CacheCtor =
			typeof LocalNodeCache !== 'undefined'
				? LocalNodeCache
				: LocalNodeProxy.Cache
		if (CacheCtor) {
			self.cache = new CacheCtor({
				now: options.now,
				maxEntries: options.cacheMaxEntries,
			})
		}
	}

	// Default: create catalog store (IndexedDB in browser/Cordova; memory when IDB missing).
	if (!self.store && options.createStore !== false) {
		var StoreCtor =
			typeof LocalNodeStore !== 'undefined'
				? LocalNodeStore
				: LocalNodeProxy.Store
		if (StoreCtor) {
			self.store = new StoreCtor({
				memory: options.storeMemory === true,
				dbName: options.storeDbName,
			})
		}
	}

	var buildManager = function () {
		var ManagerCtor =
			typeof LocalNodeManager !== 'undefined' ? LocalNodeManager : null
		var opts

		if (self.manager) return self.manager
		if (!ManagerCtor) return null

		opts = {
			transport: self.transport,
			seedEnv: self.app || options.seedEnv || null,
			bestapplyInterval:
				options.bestapplyInterval != null ? options.bestapplyInterval : 5000,
		}

		if (options.store) {
			opts.store = options.store
		} else if (self.store) {
			opts.store = self.store
		}

		if (self._managerOptions) {
			var k
			for (k in self._managerOptions) {
				if (Object.prototype.hasOwnProperty.call(self._managerOptions, k)) {
					opts[k] = self._managerOptions[k]
				}
			}
		}

		self.manager = new ManagerCtor(opts)
		return self.manager
	}

	var resolveAllowlist = function () {
		if (options.allowlist) return options.allowlist
		if (LocalNodeProxy.rpcAllowlist) return LocalNodeProxy.rpcAllowlist
		if (typeof LocalNodeRpcAllowlist !== 'undefined') return LocalNodeRpcAllowlist
		return null
	}

	var exportNode = function (node) {
		if (!node) return null
		if (typeof node.export === 'function') return node.export()
		return node
	}

	var nodeRating = function (node) {
		if (!node || !node.statistic || typeof node.statistic.rating !== 'function') {
			return 0
		}
		return Number(node.statistic.rating()) || 0
	}

	/**
	 * RPC targets must be canuse + allowRpc (same gate as selectProbability).
	 * Avoids hanging on seeds that exist but failed health / empty catalog.
	 */
	var nodeUsableForRpc = function (node) {
		var ex

		if (!node) return false
		if (node.allowRpc === false) return false
		if (node.backward === true) return false

		if (typeof node.export === 'function') {
			ex = node.export()
			if (ex && ex.canuse === true && ex.allowRpc !== false) return true
			return false
		}

		return node.canuse === true
	}

	var pickRpcNode = function (manager, rpcOpts) {
		var node = null
		var needle
		var candidate

		if (!manager) return null

		needle = rpcOpts && rpcOpts.node
		if (needle && typeof manager.find === 'function') {
			candidate = manager.find(needle)
			if (nodeUsableForRpc(candidate)) node = candidate
		}

		if (!node && self.current && self.current.key) {
			candidate = null
			if (typeof manager.find === 'function') {
				candidate = manager.find(self.current.key)
			}
			if (!candidate && self.current.host) {
				candidate = self.current
			}
			if (nodeUsableForRpc(candidate)) node = candidate
		}

		if (!node && typeof manager.selectProbability === 'function') {
			candidate = manager.selectProbability()
			if (nodeUsableForRpc(candidate)) node = candidate
		}

		if (!node && typeof manager.selectbest === 'function') {
			candidate = manager.selectbest()
			if (nodeUsableForRpc(candidate)) node = candidate
		}

		if (!node && typeof manager.canuseNodes === 'function') {
			candidate = manager.canuseNodes()[0] || null
			if (nodeUsableForRpc(candidate)) node = candidate
		}

		// No fallback to arbitrary manager.nodes[0]: empty / non-canuse must
		// reject immediately (clear error) instead of slow transport attempts.

		return node || null
	}

	/**
	 * Pick best canuse node among `list` (highest rating), else first.
	 */
	var pickBestFrom = function (list) {
		var i
		var best = null
		var bestR = -1
		var r

		if (!list || !list.length) return null

		for (i = 0; i < list.length; i++) {
			r = nodeRating(list[i])
			if (!best || r > bestR) {
				best = list[i]
				bestR = r
			}
		}

		return best || list[0]
	}

	/**
	 * Alternatives to `excludeKey` from canuse (or inited canuse-shaped) set.
	 */
	var alternateCanuse = function (manager, excludeKey) {
		var usable
		var out = []
		var i
		var n

		if (!manager) return out

		usable =
			typeof manager.canuseNodes === 'function' ? manager.canuseNodes() : []

		for (i = 0; i < usable.length; i++) {
			n = usable[i]
			if (!n) continue
			if (excludeKey && n.key === excludeKey) continue
			out.push(n)
		}

		return out
	}

	self.init = function () {
		var manager = buildManager()
		if (!manager || typeof manager.init !== 'function') {
			return Promise.resolve(self)
		}
		return manager.init().then(function () {
			return self
		})
	}

	self.destroy = function () {
		var p = Promise.resolve()
		var store = self.store

		if (self.manager && typeof self.manager.destroy === 'function') {
			// Manager closes store when closeStoreOnDestroy is left default.
			p = self.manager.destroy()
		} else if (store && typeof store.close === 'function') {
			p = Promise.resolve()
				.then(function () {
					return store.close()
				})
				.catch(function () {
					return null
				})
		}

		return p.then(function () {
			self.manager = null
			self.current = null
			self.store = null
			self.app = null
			return self
		})
	}

	/**
	 * Allowlisted JSON-RPC via manager transport (/public/ or /post/).
	 * Slim cache (TTL + wait dedupe) when method is in reduced ckeys.
	 * Skip cache read when opts.updateRPCCache (still writes on success).
	 * Propagates errors with .code for Api soft-retry (408/429/-28/-1).
	 */
	self.rpc = function (method, parameters, rpcOptions) {
		var manager = self.manager
		var allowlist = resolveAllowlist()
		var opts = rpcOptions || {}
		var params = parameters || []
		var node
		var dispatchOpts
		var cachehash
		var doDispatch

		if (allowlist) {
			if (!allowlist.isAllowed(method, opts)) {
				return Promise.reject({ code: -32601, message: 'methodnotallowed' })
			}
		} else if (method !== 'getnodeinfo') {
			// Without allowlist module (rare in Node tests), keep Phase 3 getnodeinfo-only.
			return Promise.reject({ code: -32601, message: 'methodnotallowed' })
		}

		if (!manager) {
			return Promise.reject({ code: -1, message: 'nomanager' })
		}

		node = pickRpcNode(manager, opts)
		if (!node) {
			return Promise.reject({ code: -1, message: 'node' })
		}

		dispatchOpts = {
			allowlist: allowlist,
			timeout: opts.timeout,
			id: opts.id,
			rpcuser: opts.rpcuser,
			rpcpass: opts.rpcpass,
		}

		if (allowlist && typeof allowlist.pathFor === 'function') {
			dispatchOpts.path = allowlist.pathFor(method, opts)
		}

		doDispatch = function () {
			if (typeof manager.requestRpc === 'function') {
				return manager.requestRpc(node, method, params, dispatchOpts)
			}

			if (method === 'getnodeinfo' && typeof manager.requestNodeInfo === 'function') {
				return manager.requestNodeInfo(node)
			}

			return Promise.reject({ code: -1, message: 'notransport' })
		}

		cachehash = opts.cachehash
		// Mirror proxy16: getnodeinfo is per-node (cachehash = node.key).
		if (
			(cachehash == null || cachehash === '') &&
			method === 'getnodeinfo' &&
			node &&
			node.key
		) {
			cachehash = node.key
		}

		if (self.cache && typeof self.cache.wrap === 'function') {
			return self.cache.wrap(
				method,
				params,
				{
					cachehash: cachehash,
					updateRPCCache: opts.updateRPCCache === true,
				},
				doDispatch
			)
		}

		return doDispatch()
	}

	/**
	 * Local nodes/select — sticky node for Api.nodes.select / Proxy16.fetch.
	 * Honors `data.fixed` when present; else selectProbability → selectbest → first canuse.
	 * Returns `{ node: export }` (shape Api expects after remote data-unwrap).
	 */
	self.selectNode = function (data) {
		var manager = self.manager || buildManager()
		var fixed
		var node = null

		data = data || {}
		fixed = data.fixed

		if (!manager) {
			return Promise.reject('cantselect')
		}

		if (fixed && fixed !== 'null' && fixed !== '') {
			if (typeof manager.find === 'function') {
				node = manager.find(fixed)
			}
		}

		if (!node && typeof manager.selectProbability === 'function') {
			node = manager.selectProbability()
		}
		if (!node && typeof manager.selectbest === 'function') {
			node = manager.selectbest()
		}
		if (!node && typeof manager.canuseNodes === 'function') {
			node = manager.canuseNodes()[0] || null
		}
		if (!node && typeof manager.initednodes === 'function') {
			node = manager.initednodes()[0] || null
		}

		if (!node) {
			return Promise.reject('cantselect')
		}

		self.current = node

		return Promise.resolve({
			node: exportNode(node),
		})
	}

	/**
	 * Local nodes/canchange — soft-error / sticky switch.
	 * Prefer a higher-rated canuse alternative; else any other canuse.
	 * Resolve `{}` when no alternative (Api.changeNode → falsy → no retry).
	 * Reject when current missing and nothing selectable (Api catch → false).
	 */
	self.canchangeNode = function (data) {
		var manager = self.manager || buildManager()
		var currentKey
		var current
		var alts
		var better
		var i
		var candidate
		var curRating

		data = data || {}
		currentKey = data.node

		if (!manager) {
			return Promise.reject('none')
		}

		current =
			currentKey && typeof manager.find === 'function'
				? manager.find(currentKey)
				: null

		if (!current) {
			candidate =
				(typeof manager.selectProbability === 'function' &&
					manager.selectProbability()) ||
				(typeof manager.selectbest === 'function' && manager.selectbest()) ||
				null

			if (!candidate) {
				return Promise.reject('none')
			}

			self.current = candidate
			return Promise.resolve({
				node: exportNode(candidate),
			})
		}

		alts = alternateCanuse(manager, current.key)
		if (!alts.length) {
			return Promise.resolve({})
		}

		curRating = nodeRating(current)
		better = []
		for (i = 0; i < alts.length; i++) {
			if (nodeRating(alts[i]) > curRating) {
				better.push(alts[i])
			}
		}

		candidate = pickBestFrom(better.length ? better : alts)
		if (!candidate || candidate.key === current.key) {
			return Promise.resolve({})
		}

		self.current = candidate
		return Promise.resolve({
			node: exportNode(candidate),
		})
	}

	/**
	 * Facade used by Proxy16.fetch for localnodes paths (ping / nodes/*).
	 */
	self.fetch = function (path, data) {
		var p = path || ''

		if (p === 'ping' || p === '/ping') {
			return self.ping()
		}

		if (p === 'nodes/select' || p === '/nodes/select') {
			return self.selectNode(data || {})
		}

		if (p === 'nodes/canchange' || p === '/nodes/canchange') {
			return self.canchangeNode(data || {})
		}

		console.error('notimplemented', { path: p, data: data })
		return Promise.reject('notimplemented')
	}

	/**
	 * Synthetic Api list ping (not Electron /ping).
	 *
	 * Predicate:
	 * - No manager yet → stub resolve (facade-only / Phase 2 compat).
	 * - ≥1 canuse (or inited-with-rating via selectbest) → resolve with height, no stub.
	 * - Health still probing within pingConnectingMs → resolve connecting (no stub).
	 * - Otherwise reject so Api treats localnodes as down.
	 */
	self.ping = function () {
		var manager = self.manager
		var usable
		var best
		var height = 0

		if (!manager) {
			return Promise.resolve({
				session: 'localnodes',
				height: 0,
				stub: true,
			})
		}

		usable =
			typeof manager.canuseNodes === 'function' ? manager.canuseNodes() : []

		if (usable.length) {
			best =
				(typeof manager.selectbest === 'function' && manager.selectbest()) ||
				usable[0]
			if (best && typeof best.height === 'function') {
				height = best.height() || 0
			}
			return Promise.resolve({
				session: 'localnodes',
				height: height,
			})
		}

		if (
			typeof manager.initednodeswithrating === 'function' &&
			manager.initednodeswithrating().length
		) {
			best = manager.selectbest() || manager.initednodeswithrating()[0]
			if (best && typeof best.height === 'function') {
				height = best.height() || 0
			}
			return Promise.resolve({
				session: 'localnodes',
				height: height,
			})
		}

		if (typeof manager.isHealthConnecting === 'function' && manager.isHealthConnecting()) {
			return Promise.resolve({
				session: 'localnodes',
				height: 0,
				connecting: true,
			})
		}

		return Promise.reject({
			code: -1,
			message: 'nolocalnodes',
		})
	}

	self.isEnabled = function () {
		return LocalNodeProxy.isEnabled(self.app)
	}

	return self
}

if (typeof LocalNodeTransport !== 'undefined') {
	LocalNodeProxy.Transport = LocalNodeTransport
}

if (typeof LocalNode !== 'undefined') {
	LocalNodeProxy.Node = LocalNode
}

if (typeof LocalNodeUtil !== 'undefined') {
	LocalNodeProxy.Util = LocalNodeUtil
}

if (typeof LocalNodeManager !== 'undefined') {
	LocalNodeProxy.Manager = LocalNodeManager
}

if (typeof LocalNodeSeeds !== 'undefined') {
	LocalNodeProxy.Seeds = LocalNodeSeeds
}

if (typeof LocalNodeConstants !== 'undefined') {
	LocalNodeProxy.Constants = LocalNodeConstants
}

/** Allowlist helpers (publics/posts/privates) when the module is loaded. */
LocalNodeProxy.rpcAllowlist =
	typeof LocalNodeRpcAllowlist !== 'undefined' ? LocalNodeRpcAllowlist : null

/** Slim cache constructor when the module is loaded. */
LocalNodeProxy.Cache =
	typeof LocalNodeCache !== 'undefined' ? LocalNodeCache : null

/** Catalog store constructor when the module is loaded. */
LocalNodeProxy.Store =
	typeof LocalNodeStore !== 'undefined' ? LocalNodeStore : null

if (
	!LocalNodeProxy.rpcAllowlist &&
	typeof module !== 'undefined' &&
	typeof require === 'function'
) {
	try {
		LocalNodeProxy.rpcAllowlist = require('./rpc-allowlist.js')
	} catch (e) {}
}

if (
	!LocalNodeProxy.Cache &&
	typeof module !== 'undefined' &&
	typeof require === 'function'
) {
	try {
		LocalNodeProxy.Cache = require('./cache.js')
	} catch (e) {}
}

if (
	!LocalNodeProxy.Store &&
	typeof module !== 'undefined' &&
	typeof require === 'function'
) {
	try {
		LocalNodeProxy.Store = require('./store.js')
	} catch (e) {}
}

/**
 * Meta for Api proxy list registration.
 * `direct: true` here is ONLY the Api failover flag (exclude from get.working,
 * last-resort via changeProxyIfNeedWithDirect). It does NOT mean a PocketNet
 * node/process runs on this device — that Electron-only System16 path is
 * `direct && !localnodes`. Cordova/phone uses this JS manager + HTTP to remote seeds.
 * Id becomes localnodes:0:0 via host:port:wss.
 */
LocalNodeProxy.proxyListMeta = function () {
	return {
		direct: true,
		localnodes: true,
		host: 'localnodes',
		port: 0,
		wss: 0,
	}
}

/** Stable Api proxy id for proxyListMeta (host:port:wss). */
LocalNodeProxy.proxyListId = function (meta) {
	var m = meta || LocalNodeProxy.proxyListMeta()
	return String(m.host) + ':' + String(m.port) + ':' + String(m.wss)
}

/**
 * Pick last-resort direct proxy when multiple directs exist.
 * Electron: prefer System16 (`direct && !localnodes`).
 * Cordova / web: prefer `localnodes`.
 * Falls back to the first direct if the preferred kind is absent.
 *
 * @param {Array} proxies Api Proxy16-like objects (`direct`, `localnodes`)
 * @param {Object} [env] `{ electron: bool, cordova: bool }` (or `_Electron`)
 * @returns {Object|undefined}
 */
LocalNodeProxy.pickDirectProxy = function (proxies, env) {
	var list = proxies || []
	var directs = []
	var i
	var p

	for (i = 0; i < list.length; i++) {
		p = list[i]
		if (p && p.direct) {
			directs.push(p)
		}
	}

	if (!directs.length) {
		return undefined
	}

	env = env || {}

	var electron = env.electron === true || env._Electron === true
	var preferred = null

	if (electron) {
		for (i = 0; i < directs.length; i++) {
			if (!directs[i].localnodes) {
				preferred = directs[i]
				break
			}
		}
	} else {
		// Cordova, browser, or unknown non-Electron: Local Node Proxy first.
		for (i = 0; i < directs.length; i++) {
			if (directs[i].localnodes) {
				preferred = directs[i]
				break
			}
		}
	}

	return preferred || directs[0]
}

/**
 * Whether a resolved LocalNodeProxy.ping() result should count as Api successping.
 * Api.ping sets successping on any resolved fetch; reject path is failure.
 */
LocalNodeProxy.isPingOk = function (result) {
	return result != null && typeof result === 'object'
}

/**
 * Enabled if window.localNodeProxy / app.options.localNodeProxy are set;
 * else Cordova on, Electron off, localhost/testpocketnet web on, production web off.
 * Re-call after toggling window.localNodeProxy — do not cache a boot-time boolean.
 */
LocalNodeProxy.isEnabled = function (app) {
	if (typeof window !== 'undefined' && window.localNodeProxy === true) {
		return true
	}

	if (typeof window !== 'undefined' && window.localNodeProxy === false) {
		return false
	}

	var opt = typeof deep === 'function' ? deep(app, 'options.localNodeProxy') : (app && app.options && app.options.localNodeProxy)

	if (opt === true) {
		return true
	}

	if (opt === false) {
		return false
	}

	if (typeof window !== 'undefined' && window.cordova) {
		return true
	}

	if (typeof _Electron !== 'undefined' && _Electron) {
		return false
	}

	// Non-prod web: testpocketnet build or local hostname (dev:bastyon / agents).
	if (typeof window !== 'undefined') {
		if (window.testpocketnet) {
			return true
		}

		var host = (window.location && window.location.hostname) || ''

		if (host === 'localhost' || host === '127.0.0.1') {
			return true
		}
	}

	return false
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeProxy
}
