/**
 * Local Node Proxy — rpc-ex feed scenarios (Phase 9).
 * Port of proxy16/proxy.js rpcscenarios.gethierarchicalstrip (+ feed aliases).
 * Returns unwrapped Api shape { contents, users?, videos? } (not { data: ... }).
 * Skips aTransactions (proxy marks that path as Brighteon-only).
 */
var LocalNodeRpcScenarios = (function () {
	var USER_METHODS = {
		gethierarchicalstrip: true,
		getsubscribesfeed: true,
		getprofilefeed: true,
		getmostcommentedfeed: true,
	}

	var collectTrustHosts = function (peertube) {
		var hosts = []
		var seen = {}
		var swarms
		var archived
		var i
		var j
		var s
		var h

		var pushHost = function (host) {
			if (!host || seen[host]) return
			seen[host] = true
			hosts.push(host)
		}

		if (!peertube) return hosts

		if (typeof peertube.getSwarms === 'function') {
			swarms = peertube.getSwarms() || []
			for (i = 0; i < swarms.length; i++) {
				for (j = 0; j < (swarms[i] || []).length; j++) {
					s = swarms[i][j]
					pushHost(s && s.host)
				}
			}
		}

		if (typeof peertube.getArchivedHosts === 'function') {
			archived = peertube.getArchivedHosts() || []
			for (i = 0; i < archived.length; i++) {
				h = archived[i]
				if (typeof h === 'string') pushHost(h)
				else if (h && h.host) pushHost(h.host)
			}
		}

		return hosts
	}

	var ensureTrustHosts = function (peertube) {
		if (!peertube) return Promise.resolve([])
		if (typeof peertube.ensureList === 'function') {
			return peertube.ensureList().then(function () {
				return collectTrustHosts(peertube)
			}).catch(function () {
				return collectTrustHosts(peertube)
			})
		}
		return Promise.resolve(collectTrustHosts(peertube))
	}

	var urlTrusted = function (url, trustHosts) {
		var i
		if (!url || !trustHosts || !trustHosts.length) return false
		for (i = 0; i < trustHosts.length; i++) {
			if (trustHosts[i] && url.indexOf(trustHosts[i]) > -1) return true
		}
		return false
	}

	var lastCommentAddress = function (post) {
		if (!post || !post.lastComment) return null
		return post.lastComment.address || null
	}

	/**
	 * Enrich a feed RPC result with comment-author profiles and PeerTube videos.
	 * @param {Object} args
	 * @param {string} args.method
	 * @param {Array} args.parameters
	 * @param {Object} [args.options] — passed to rpc without ex
	 * @param {function} args.rpc — LocalNodeProxy.rpc(method, parameters, options)
	 * @param {Object} [args.peertube] — LocalNodePeertube instance
	 * @returns {Promise<Object>} { contents, users?, videos? }
	 */
	var gethierarchicalstrip = function (args) {
		var method = args.method
		var parameters = args.parameters || []
		var options = args.options || {}
		var rpc = args.rpc
		var peertube = args.peertube
		var optsNoEx
		var result = null
		var users = []
		var videoUrls = []

		if (typeof rpc !== 'function') {
			return Promise.reject({ code: -1, message: 'norpc' })
		}

		optsNoEx = {}
		for (var optKey in options) {
			if (
				Object.prototype.hasOwnProperty.call(options, optKey) &&
				optKey !== 'ex'
			) {
				optsNoEx[optKey] = options[optKey]
			}
		}
		optsNoEx.ex = false

		return rpc(method, parameters, optsNoEx)
			.then(function (raw) {
				var data
				var posts
				var i
				var p
				var addr
				var decoded
				var withVideos

				if (raw && typeof raw === 'object' && !Array.isArray(raw) && raw.contents) {
					data = raw
				} else {
					data = { contents: raw }
				}

				posts = data.contents || []
				if (!Array.isArray(posts)) posts = []

				withVideos = []
				for (i = 0; i < posts.length; i++) {
					p = posts[i]
					if (!p || !p.txid) continue
					if ((p.type === 'video' || p.type === 'audio') && p.u) {
						withVideos.push(p)
					}
				}

				result = data
				result.contents = posts.filter(function (post) {
					return post && post.txid
				})
				posts = result.contents

				if (USER_METHODS[method]) {
					users = []
					for (i = 0; i < posts.length; i++) {
						addr = lastCommentAddress(posts[i])
						if (!addr) continue
						if (
							posts.some(function (post) {
								return post.address === addr
							})
						) {
							continue
						}
						if (users.indexOf(addr) === -1) users.push(addr)
					}
				}

				return ensureTrustHosts(peertube).then(function (trustHosts) {
					videoUrls = []
					for (i = 0; i < withVideos.length; i++) {
						try {
							decoded = decodeURIComponent(withVideos[i].u)
						} catch (e) {
							decoded = withVideos[i].u
						}
						if (urlTrusted(decoded, trustHosts)) {
							videoUrls.push(decoded)
						}
					}
				})
			})
			.then(function () {
				var userPr
				var videosPr

				if (!users.length) {
					userPr = Promise.resolve()
				} else {
					userPr = rpc('getuserprofile', [users, '1'], optsNoEx).then(
						function (profiles) {
							result.users = profiles
							return null
						}
					)
				}

				if (!videoUrls.length || !peertube || typeof peertube.videos !== 'function') {
					videosPr = Promise.resolve()
				} else {
					videosPr = peertube
						.videos({
							urls: videoUrls,
							fast: true,
						})
						.then(function (videos) {
							result.videos = videos
							return null
						})
						.catch(function () {
							return null
						})
				}

				return Promise.all([userPr, videosPr])
			})
			.then(function () {
				return result
			})
	}

	var scenarios = {
		gethierarchicalstrip: gethierarchicalstrip,
	}

	scenarios.getrecommendedcontentbyaddress = gethierarchicalstrip
	scenarios.getprofilefeed = gethierarchicalstrip
	scenarios.getsubscribesfeed = gethierarchicalstrip
	scenarios.gethotposts = gethierarchicalstrip
	scenarios.getmostcommentedfeed = gethierarchicalstrip

	return {
		scenarios: scenarios,
		gethierarchicalstrip: gethierarchicalstrip,
		USER_METHODS: USER_METHODS,
		collectTrustHosts: collectTrustHosts,
		has: function (method) {
			return !!(method && scenarios[method])
		},
		run: function (method, args) {
			var fn = scenarios[method]
			if (!fn) {
				return Promise.reject({ code: -32601, message: 'noscenario' })
			}
			args = args || {}
			args.method = method
			return fn(args)
		},
	}
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeRpcScenarios
}
