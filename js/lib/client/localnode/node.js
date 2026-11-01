/**
 * Local Node Proxy — per-node statistic, penalty, rating (HTTP-only MVP).
 * Ported from proxy16/node/node.js with calcAvailability no longer gated on WSS.
 */
var LocalNode = function (options, manager) {
	options = options || {}

	var self = this
	var maxevents = 10000
	var maxeventsHistory = 30
	var eventschecktime = 10000
	var cachedrating = null
	var chain = []
	var clockNow =
		options.now ||
		function () {
			return Date.now()
		}
	var clockTimeout =
		options.setTimeout ||
		function (fn, ms) {
			return setTimeout(fn, ms)
		}
	var clockClearTimeout =
		options.clearTimeout ||
		function (id) {
			return clearTimeout(id)
		}

	self.host = options.host || ''
	self.port = options.port || 38081
	self.sport = options.sport || 38881
	self.ws = options.ws || 8087
	self.sws = options.sws || 8087
	self.name = options.name || 'Pocketnet Node'
	self.stable = options.stable || false
	self.alwaysrun = options.alwaysrun === true
	self.peer = options.peer || false
	self.local = options.local || false
	self.addedby = options.addedby || ''
	self.version = options.version || null
	self.vcode = typeof options.vcode !== 'undefined' ? options.vcode : null
	self.bchain = options.bchain || null
	self.testing = false
	self.allowRpc = typeof options.allowRpc !== 'undefined' ? options.allowRpc : true
	self.backward = options.backward === true
	self.inited = options.inited === true
	self.initedTime =
		options.initedTime != null
			? options.initedTime
			: self.inited
				? clockNow()
				: null
	self.canuse = options.canuse === true
	self.manager = manager || null

	var webport = self.port
	self.key = options.key || self.host + ':' + webport
	self.wskey = self.host + ':' + self.ws
	self.ckey = self.host + ':' + webport + ':' + self.ws

	self.events = []
	self.eventsCount = 0

	var statistic = {
		events: null,
		bymethods: null,
		history: [],
		historyslice: null,
	}

	var invalidateRatingCache = function () {
		cachedrating = null
	}

	var penalty = {
		k: 0,
		counter: 0,
		reason: null,
		timer: null,
		time: null,
		started: null,

		set: function (_k, time, reason) {
			if (_k < 0 || _k > 1) return
			if (penalty.k || !time || !reason || !_k) return

			penalty.reason = reason
			penalty.started = clockNow()
			penalty.time = time
			penalty.k = _k
			penalty.counter++

			if (penalty.counter > 10) {
				penalty.counter = 0
				self.statistic.clearAlltime()
			}

			penalty.clearTimer()
			penalty.timer = clockTimeout(function () {
				penalty.clear()
			}, time)

			invalidateRatingCache()
		},

		clear: function () {
			penalty.clearTimer()
			penalty.k = 0
			penalty.time = null
			penalty.started = null
			penalty.reason = null
			invalidateRatingCache()
		},

		clearTimer: function () {
			if (penalty.timer) {
				clockClearTimeout(penalty.timer)
				penalty.timer = null
			}
		},

		expireIfNeeded: function () {
			if (!penalty.k || !penalty.time || penalty.started == null) return

			var started =
				typeof penalty.started === 'number'
					? penalty.started
					: penalty.started.getTime
						? penalty.started.getTime()
						: Number(penalty.started)

			if (clockNow() - started >= penalty.time) {
				penalty.clear()
			}
		},

		getk: function () {
			penalty.expireIfNeeded()
			return 1 - (penalty.k || 0)
		},

		get: function () {
			penalty.expireIfNeeded()
			return {
				k: penalty.k,
				reason: penalty.reason,
				time: penalty.time,
				started: penalty.started,
			}
		},
	}

	self.penalty = function () {
		return penalty.get()
	}

	self.penaltyApi = penalty

	self.lastblock = function () {
		if (chain.length) return chain[chain.length - 1]
		return null
	}

	self.height = function () {
		var lastblock = self.lastblock() || {}
		return lastblock.height || 0
	}

	self.setHeight = function (height, blockhash) {
		var h = Number(height) || 0
		if (!h) return
		chain = [
			{
				height: h,
				blockhash: blockhash || null,
			},
		]
		invalidateRatingCache()
	}

	self.applyNodeInfo = function (info) {
		info = info || {}
		if (info.version != null) self.version = info.version
		if (info.chain != null) self.bchain = info.chain
		if (info.bchain != null) self.bchain = info.bchain
		if (typeof info.vcode !== 'undefined') self.vcode = info.vcode

		var height = null
		if (info.lastblock && info.lastblock.height) height = info.lastblock.height
		else if (info.height) height = info.height

		if (height) {
			self.setHeight(
				height,
				(info.lastblock && info.lastblock.hash) || info.bestblockhash || null
			)
		}

		invalidateRatingCache()
		return self
	}

	self.chainStatus = function () {
		return {
			fork: false,
			difference: 0,
		}
	}

	self.forbidUsage = function () {
		return false
	}

	var each = function (list, fn) {
		var i
		if (!list) return
		if (typeof list.length === 'number') {
			for (i = 0; i < list.length; i++) fn(list[i], i)
			return
		}
		for (i in list) {
			if (Object.prototype.hasOwnProperty.call(list, i)) fn(list[i], i)
		}
	}

	var cloneEvent = function (p) {
		var out = {}
		var k
		for (k in p) {
			if (Object.prototype.hasOwnProperty.call(p, k)) out[k] = p[k]
		}
		return out
	}

	self.statistic = {
		clear: function () {
			self.events = []
			self.eventsCount = 0
			statistic = {
				events: null,
				bymethods: null,
				history: [],
				historyslice: null,
			}
			invalidateRatingCache()
		},

		clearAlltime: function () {
			statistic.events = statistic.historyslice
				? cloneEvent(statistic.historyslice)
				: null
			invalidateRatingCache()
		},

		add: function (p) {
			var push = cloneEvent(p || {})
			push.time = clockNow()
			self.events.push(push)

			if (!self.inited) {
				var d = self.events.length - maxevents
				if (d > 100) {
					self.events = self.events.slice(d)
				}
			}

			self.eventsCount++
			invalidateRatingCache()
		},

		mixeventsArray: function (objs) {
			var common = {
				success: 0,
				failed: 0,
				count: 0,
				time: 0,
				rate: 0,
				percent: 0,
			}

			each(objs, function (obj) {
				common.success += (obj && obj.success) || 0
				common.failed += (obj && obj.failed) || 0
				common.count += (obj && obj.count) || 0
			})

			if (common.count) {
				each(objs, function (obj) {
					common.time += ((obj && obj.time) || 0) * ((obj && obj.count) || 0)
					common.rate += ((obj && obj.rate) || 0) * ((obj && obj.count) || 0)
					common.percent += ((obj && obj.percent) || 0) * ((obj && obj.count) || 0)
				})
				common.time = common.time / common.count
				common.rate = common.rate / common.count
				common.percent = common.percent / common.count
			}

			common.date = clockNow()
			return common
		},

		mixevents: function (obj1, obj2) {
			var common = {}
			obj1 = obj1 || {}
			obj2 = obj2 || {}

			common.success = (obj1.success || 0) + (obj2.success || 0)
			common.failed = (obj1.failed || 0) + (obj2.failed || 0)
			common.count = (obj1.count || 0) + (obj2.count || 0)

			if (common.count) {
				common.time =
					((obj1.time || 0) * (obj1.count || 0) + (obj2.time || 0) * (obj2.count || 0)) /
					common.count
				common.rate =
					((obj1.rate || 0) * (obj1.count || 0) + (obj2.rate || 0) * (obj2.count || 0)) /
					common.count
				common.percent =
					((obj1.percent || 0) * (obj1.count || 0) +
						(obj2.percent || 0) * (obj2.count || 0)) /
					common.count
			} else {
				common.time = 0
				common.rate = 0
				common.percent = 0
			}

			common.date = obj2.date || obj1.date || clockNow()
			return common
		},

		fixhistory: function (e) {
			statistic.history.push(e)
			var d = statistic.history.length - maxeventsHistory
			if (d > maxeventsHistory / 10) {
				statistic.history = statistic.history.slice(d)
			}
			statistic.historyslice = self.statistic.mixeventsArray(statistic.history)
		},

		rate: function (method) {
			var s = clockNow() - eventschecktime
			var l = self.events.length
			var c = 0

			while (l && self.events[l - 1].time > s) {
				if (!method || self.events[l - 1].method === method) c++
				l--
			}

			return c / (eventschecktime / 1000)
		},

		get: function (method) {
			var evt = []
			var i
			var l
			var r
			var timecounter = 0

			for (i = 0; i < self.events.length; i++) {
				l = self.events[i]
				if (method && l.method !== method) continue
				evt.push(l)
			}

			r = {
				success: 0,
				failed: 0,
				time: 0,
				count: evt.length,
				rate: self.statistic.rate(method),
				date: null,
			}

			for (i = 0; i < evt.length; i++) {
				l = evt[i]
				if (l.code === 200) {
					r.success++
					r.time += l.difference || 0
					timecounter++
				} else {
					r.failed++
				}
			}

			r.percent = (r.success / (r.count || 1)) * 100
			r.time = r.time / (timecounter || 1)
			return r
		},

		eventsfix: function () {
			var events = self.statistic.get()
			statistic.events = self.statistic.mixevents(statistic.events, events)
			self.statistic.fixhistory(events)
			self.events = []
		},

		flushIfNeeded: function () {
			if (self.events.length) self.statistic.eventsfix()
		},

		getst: function () {
			self.statistic.flushIfNeeded()
			if (!statistic.events) {
				statistic.events = {
					success: 0,
					failed: 0,
					count: 0,
					time: 0,
					rate: 0,
					percent: 0,
				}
			}
			return statistic.events
		},

		get5min: function () {
			self.statistic.flushIfNeeded()
			return statistic.historyslice
		},

		events: function () {
			return self.events
		},

		/**
		 * MVP: HTTP-only availability. Do not gate on wssconnected.
		 */
		calcAvailability: function (s) {
			if (!s || !s.count) return 0.01

			var time = s.time
			var rate = (s.rate || 0) + 1
			var timemult = 1

			if (time && time > 0 && time <= 200) time = 200
			if (time && time > 200 && time <= 400) time = 300
			if (time && time > 400 && time <= 700) time = 500
			if (time && time > 700 && time <= 1300) time = 1000
			if (time && time > 1300 && time <= 2300) time = 1700
			if (time && time > 2300 && time <= 4000) time = 3100
			if (time && time > 4000 && time <= 7000) time = 5300
			if (time && time > 7000 && time <= 15000) time = 100000
			if (time && time > 15000) time = 300000

			if (time > 2000) timemult = 2
			if (time > 7000) timemult = 4

			if (rate <= 2) rate = 2
			if (rate > 2 && rate <= 10) rate = 5
			if (rate > 10 && rate <= 30) rate = 15
			if (rate > 30 && rate <= 100) rate = 65
			if (rate > 100 && rate <= 200) rate = 150
			if (rate > 200) rate = 500

			return (s.percent * s.percent) / (rate * time * timemult)
		},

		rating: function () {
			if (cachedrating) {
				if (cachedrating.time + 130000 > clockNow()) {
					return cachedrating.result || 0
				}
			}

			var lastblock = self.lastblock() || {}
			var result = 0
			var notcache = false

			if (!lastblock.height || self.testing || !self.inited) {
				notcache = true
			} else {
				var status = self.chainStatus()
				var difference = status.difference || 0

				if (difference > 0) difference = 0
				difference = -difference

				if ((status.fork && difference > 5) || difference > 50) {
					result = 0
				} else {
					self.statistic.flushIfNeeded()

					var s = self.statistic.getst()
					var slice = statistic.historyslice || s
					var availabilityAllTime = self.statistic.calcAvailability(s) || 0
					var availability5Minutes = self.statistic.calcAvailability(slice) || 0
					// Single-user client: userski fixed at 1 (do not use WSS user lists).
					var userski = 1

					if (difference <= 1) difference = 0

					result =
						(penalty.getk() *
							Math.sqrt(availabilityAllTime * Math.sqrt(availability5Minutes)) *
							(lastblock.height || 1)) /
							(1000 * userski * (difference + 1)) || 0
				}
			}

			if (!notcache) {
				cachedrating = {
					result: result,
					time: clockNow(),
				}
			}

			return result
		},

		probabilityNodes: function (nodes) {
			var total = 0
			var list = nodes || []

			each(list, function (node) {
				var rating = node.statistic.rating()
				if (rating && rating > 0) total += rating
			})

			if (!total) {
				if (!list.length) return 1
				return 1 / list.length
			}

			return self.statistic.rating() / total
		},

		probability: function () {
			if (!self.manager || typeof self.manager.initednodes !== 'function') return 1
			return self.statistic.probabilityNodes(self.manager.initednodes())
		},
	}

	/**
	 * Scoring hook for RPC outcomes (full dispatch in Phase 4).
	 * @param {{success?: boolean, time?: number, method?: string, code?: number}} result
	 */
	self.recordRpcResult = function (result) {
		result = result || {}
		var code = result.code
		var difference = typeof result.time === 'number' ? result.time : 0
		var method = result.method || ''

		if (result.success === true || code === 200) {
			code = 200
		} else if (code == null) {
			code = 500
		}

		if (code === 521) penalty.set(0.8, 220000, '521')
		if (code === 408) penalty.set(0.5, 60000, '408')
		if (code === 429) penalty.set(0.3, 60000, '429')

		self.statistic.add({
			code: code,
			difference: difference,
			method: method,
		})
	}

	self.applyPenaltyCode = function (code) {
		if (code === 521) penalty.set(0.8, 220000, '521')
		else if (code === 408) penalty.set(0.5, 60000, '408')
		else if (code === 429) penalty.set(0.3, 60000, '429')
	}

	self.export = function () {
		var s = self.statistic.getst()
		var lastblock = self.lastblock() || {}
		var chainStatus = self.chainStatus()
		var vcode = self.vcode

		if (vcode == null && self.version) {
			vcode = 1
		}

		return {
			host: self.host,
			port: self.port,
			sport: self.sport,
			ws: self.ws,
			sws: self.sws,
			name: self.name,
			addedby: self.addedby,
			key: self.key,
			testing: self.testing,
			stable: self.stable,
			canuse:
				self.canuse ||
				(s.success > 0 && lastblock.height && !self.forbidUsage() ? true : false),
			local: self.local || false,
			peer: self.peer,
			bchain: self.bchain,
			version: self.version,
			vcode: vcode != null ? vcode : 1,
			allowRpc: self.allowRpc,
			backward: self.backward || chainStatus.fork || chainStatus.difference > 20,
			height: lastblock.height || 0,
		}
	}

	self.init = function () {
		self.inited = true
		self.initedTime = clockNow()
		invalidateRatingCache()
		return self
	}

	/** Drop inited state (proxy forget → destroy); node may stay in manager list. */
	self.forget = function () {
		return self.destroy()
	}

	self.destroy = function () {
		penalty.clear()
		self.inited = false
		self.initedTime = null
		self.canuse = false
		self.allowRpc = false
		invalidateRatingCache()
		return self
	}

	/**
	 * Ask this node for peers (getPeerInfo), filter i2p/localhost, map to LocalNode metas.
	 * Uses manager.requestRpc — not a second transport stack.
	 * @returns {Promise<Array>} candidate LocalNode instances (not yet added)
	 */
	self.peers = function () {
		var mgr = self.manager

		if (!mgr || typeof mgr.requestRpc !== 'function') {
			return Promise.reject({ code: -1, message: 'nomanager' })
		}

		return mgr
			.requestRpc(self, 'getpeerinfo', [], { path: '/public/' })
			.then(function (result) {
				var metas = LocalNode.mapPeerInfosToCandidates(result || [])
				var out = []
				var i
				var meta

				for (i = 0; i < metas.length; i++) {
					meta = metas[i]
					if (!meta) continue
					out.push(new LocalNode(meta, mgr))
				}

				return out
			})
	}

	if (typeof options.height === 'number' && options.height > 0) {
		self.setHeight(options.height)
	}

	return self
}

LocalNode.PENALTY = {
	521: { k: 0.8, ms: 220000 },
	408: { k: 0.5, ms: 60000 },
	429: { k: 0.3, ms: 60000 },
}

/** Default RPC/WS ports for discovered peers (proxy16/node/node.js peers()). */
LocalNode.PEER_DEFAULTS = {
	port: 38081,
	sport: 38881,
	ws: 8087,
	sws: 8887,
}

/**
 * Hosts that must not enter the discovery catalog (localhost / empty).
 * checkParameters-like gate used before adding peer candidates.
 */
LocalNode.isUnusablePeerHost = function (host) {
	if (!host || typeof host !== 'string') return true
	var h = host.trim().toLowerCase()
	if (!h) return true
	if (h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0') return true
	return false
}

/**
 * Drop getPeerInfo rows with missing addr or .i2p (proxy peers filter).
 */
LocalNode.filterPeerInfos = function (peers) {
	var list = peers || []
	var out = []
	var i
	var peer
	var addr

	for (i = 0; i < list.length; i++) {
		peer = list[i]
		if (!peer) continue
		addr = peer.addr
		if (!addr || typeof addr !== 'string') continue
		if (addr.indexOf('.i2p') > -1) continue
		out.push(peer)
	}

	return out
}

/**
 * Map peer.addr → candidate meta (host + fixed RPC/WS ports, peer: true).
 * Returns null if addr/host is unusable.
 */
LocalNode.peerCandidateMeta = function (addr) {
	var host
	var colon

	if (!addr || typeof addr !== 'string') return null

	colon = addr.lastIndexOf(':')
	host = colon > -1 ? addr.slice(0, colon) : addr
	host = (host || '').trim()

	if (LocalNode.isUnusablePeerHost(host)) return null

	return {
		host: host,
		port: LocalNode.PEER_DEFAULTS.port,
		sport: LocalNode.PEER_DEFAULTS.sport,
		ws: LocalNode.PEER_DEFAULTS.ws,
		sws: LocalNode.PEER_DEFAULTS.sws,
		peer: true,
		key: host + ':' + LocalNode.PEER_DEFAULTS.port,
	}
}

/**
 * Pure pipeline: getPeerInfo rows → unique candidate metas (i2p/localhost dropped).
 */
LocalNode.mapPeerInfosToCandidates = function (peers) {
	var filtered = LocalNode.filterPeerInfos(peers)
	var out = []
	var seen = {}
	var i
	var meta

	for (i = 0; i < filtered.length; i++) {
		meta = LocalNode.peerCandidateMeta(filtered[i].addr)
		if (!meta || !meta.key) continue
		if (seen[meta.key]) continue
		seen[meta.key] = true
		out.push(meta)
	}

	return out
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNode
}
