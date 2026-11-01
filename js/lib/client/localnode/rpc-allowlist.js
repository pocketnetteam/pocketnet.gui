/**
 * Local Node Proxy — RPC method allowlist (deliberate copy of proxy16/node/rpc.js).
 * Sync debt: keep publics / posts / privates keys aligned with proxy16/node/rpc.js.
 * Never store or prompt for rpcuser/rpcpass on the client; privates fail closed in MVP.
 */
var LocalNodeRpcAllowlist = (function () {
	/** Copied from proxy16/node/rpc.js — privates (wallet / node admin). */
	var privates = {
		stop: true,
		listaddressgroupings: true,
		listaddresses: true,
		importprivkey: true,
		getbalance: true,
		getstakinginfo: true,
		getnewaddress: true,
		dumpwallet: true,
		importwallet: true,
		sendtoaddress: true,
	}

	/** Copied from proxy16/node/rpc.js — broadcast via /post/. */
	var posts = {
		sendrawtransaction: true,
		sendrawtransactionwithmessage: true,
	}

	/** Copied from proxy16/node/rpc.js — public JSON-RPC via /public/. */
	var publics = {
		getcontent: true,
		getcontents: true,
		getlastcomments: true,
		gettags: true,
		getrawtransactionwithmessagebyid: true,
		getrawtransactionwithmessage: true,
		getrawtransaction: true,
		getuserprofile: true,
		getuserstate: true,
		getaccountsetting: true,
		getaddressregistration: true,

		getusersubscribes: true,
		getusersubscribers: true,
		getuserblockings: true,

		signrawtransactionwithkey: true,
		getrecommendedposts: true,
		gettime: true,
		getmissedinfo: true,
		gethotposts: true,
		getmostcommentedfeed: true,
		getuseraddress: true,
		search: true,
		searchlinks: true,
		searchusers: true,
		getcomments: true,
		sendcomment: true,
		getnodeinfo: true,
		getaddressscores: true,
		getnotifications: true,
		getpostscores: true,
		getpagescores: true,
		getactivities: true,
		getrandomcontents: true,
		getrecomendedaccountsbysubscriptions: true,
		getrecomendedaccountsbyscoresonsimilaraccounts: true,
		getrecomendedaccountsbyscoresfromaddress: true,
		getrecomendedcontentsbyscoresfromaddress: true,
		getrecomendedaccountsbytags: true,
		getboostfeed: true,
		getboostsbyaddress: true,
		getprofilefeed: true,
		getsubscribesfeed: true,

		// BlockExplorer
		getblocktransactions: true,
		getaddressinfo: true,
		getaddresstransactions: true,
		gettransactions: true,
		getblock: true,
		getblocks: true,
		getlastblocks: true,
		getcompactblock: true,
		checkstringtype: true,
		getstatistic: true,
		getinfo: true,
		getcoininfo: true,
		getpeerinfo: true,
		// Node JSON-RPC uses camelCase; keep lowercase alias for callers that normalize.
		getPeerInfo: true,
		txunspent: true,
		estimatefee: true,
		estimatesmartfee: true,
		gettransaction: true,
		gethierarchicalstrip: true,
		getprofilecollections: true,
		gethistoricalstrip: true,
		getusercontents: true,
		getcontentstatistic: true,
		getuserstatistic: true,
		searchbyhash: true,
		getstatisticbyhours: true,
		getstatisticbydays: true,
		getstatisticcontentbyhours: true,
		getstatisticcontentbydays: true,

		gettopfeed: true,
		getrecommendedcontentbyaddress: true,
		gettopaccounts: true,
		getrecommendedaccountbyaddress: true,
		getcontentactions: true,
		getsubscribeschannels: true,

		getaccountearning: true,

		// Barteron
		getbarteronaccounts: true,
		getbarteronoffersbyaddress: true,
		getbarteronoffersbyroottxhashes: true,
		getbarteronfeed: true,
		getbarterondeals: true,
		getbarteronoffersdetails: true,
		getbarteroncomplexdeals: true,
		getbarterongroups: true,
		// Jury
		getalljury: true,
		getjuryassigned: true,
		getjurymoderators: true,

		getbans: true,
		getfromtotransactions: true,

		getapps: true,
		getappscores: true,
		getappcomments: true,
	}

	function hasCredentials(opts) {
		if (!opts) return false
		return Boolean(opts.rpcuser && opts.rpcpass)
	}

	/**
	 * @param {string} method
	 * @returns {'public'|'post'|'private'|null}
	 */
	function classify(method) {
		if (!method || typeof method !== 'string') return null
		if (posts[method]) return 'post'
		if (publics[method]) return 'public'
		if (privates[method]) return 'private'
		return null
	}

	/**
	 * Unknown → false. Private → false unless rpcuser+rpcpass (MVP: client has none → fail closed).
	 * Public / post → true.
	 *
	 * @param {string} method
	 * @param {Object} [opts]
	 * @returns {boolean}
	 */
	function isAllowed(method, opts) {
		var kind = classify(method)
		if (kind === 'public' || kind === 'post') return true
		if (kind === 'private') return hasCredentials(opts)
		return false
	}

	/**
	 * Wire path for allowed methods. Unknown / private without creds → null (never '/').
	 *
	 * @param {string} method
	 * @param {Object} [opts]
	 * @returns {'/public/'|'/post/'|null}
	 */
	function pathFor(method, opts) {
		var kind = classify(method)
		if (kind === 'post') return '/post/'
		if (kind === 'public') return '/public/'
		if (kind === 'private' && hasCredentials(opts)) return '/'
		return null
	}

	return {
		publics: publics,
		posts: posts,
		privates: privates,
		classify: classify,
		isAllowed: isAllowed,
		pathFor: pathFor,
	}
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeRpcAllowlist
}
