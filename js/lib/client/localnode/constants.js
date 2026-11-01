/**
 * Local Node Proxy — client budgets (single-user; no proxy.users()/50 scaling).
 * Mirror Electron MIN_NODES_COUNT; keep iniNodeCount in the 3–5 client range.
 */
var LocalNodeConstants = {
	/**
	 * Default JSON-RPC / transport timeout when callers omit timeout.
	 * Matches Cordova ProxyRequest family (`p.timeout || 30000`); stay in 30–55s.
	 */
	DEFAULT_RPC_TIMEOUT_MS: 30000,

	/**
	 * Shorter probe for getnodeinfo health / seed init (intentional vs full RPC).
	 */
	HEALTH_TIMEOUT_MS: 12000,

	/**
	 * Max time ping may wait for IndexedDB + seed list + first working node
	 * (proxy16 waitreadywithrating window; client uses 30s as requested).
	 */
	WAIT_READY_MS: 30000,

	/** Poll interval while waiting for a rated/canuse node (proxy16 f.pretry default). */
	WAIT_READY_INTERVAL_MS: 30,

	/** Minimum working/inited nodes to keep (proxy16/ipc.js). */
	MIN_NODES_COUNT: 3,

	/**
	 * How many not-yet-inited nodes to probe on each find/init pass.
	 * Client/mobile: fixed 5 (within architecture 3–5). Do not scale by user count.
	 */
	INI_NODE_COUNT: 5,

	/**
	 * Max shuffled catalog peers loaded on cold start (proxy init: filter shuffle docs i < 5).
	 * Seeds are loaded separately and win on key conflict.
	 */
	STORE_RELOAD_LIMIT: 5,

	/** Effective concurrent users for init/forget budget math. Always 1 on device. */
	EFFECTIVE_USERS: 1,

	/**
	 * Min interval between getPeerInfo asks per source node (proxy peernodesCheckTime).
	 * ~2.78 h — mobile/browser must not poll on a seconds scale.
	 */
	PEERNODES_CHECK_MS: 10000000,

	/** Max successful peer-asks counted inside one PEERNODES_CHECK_MS window. */
	DISCOVERY_ASK_SUCCESS_CAP: 5,

	/** How many inited sources to ask peers from per discoverPeers tick. */
	DISCOVERY_PEER_ASK_BATCH: 5,

	/** Max parallel getnodeinfo probes while validating discovered peers. */
	DISCOVERY_CONNECT_PARALLEL: 3,

	/**
	 * Grace before forgetIfNotUsing may drop an idle inited node (proxy: 60s from initedTime).
	 * WSS user count is treated as 0 on client — extras are eligible after this grace.
	 */
	FORGET_GRACE_MS: 60000,

	/**
	 * Peertube swarm list (mirror proxy16/config.json peertubesListLink).
	 * LocalNodeProxy.fetch('peertubeserversList') loads this directly.
	 */
	PEERTUBE_LIST_URL:
		'https://raw.githubusercontent.com/shpingalet007/bastyon-peertubes/master/list.json',

	/** localStorage key for archived peertube hosts cache. */
	PEERTUBE_LIST_STORAGE_KEY: 'localnode:peertubeserversList',

	/** localStorage key for full GitHub list.json (catalog offline fallback). */
	PEERTUBE_LIST_FULL_STORAGE_KEY: 'localnode:peertubeListJson',

	/** Soft reachability probe for peertube/best (ms). */
	PEERTUBE_PROBE_TIMEOUT_MS: 4000,

	/** Memory TTL for a successful best-host probe (ms). */
	PEERTUBE_PROBE_TTL_MS: 600000,

	/** Default video metadata cache TTL (ms); matches proxy peertubevideo ~600s. */
	PEERTUBE_VIDEO_CACHE_TTL_MS: 600000,

	/** Shorter video cache for live / transcoding states (ms). */
	PEERTUBE_VIDEO_CACHE_LIVE_TTL_MS: 20000,

	/** HTTP timeout for peertube/videos GETs (ms); proxy Peertube.timeout ~5500. */
	PEERTUBE_VIDEO_HTTP_TIMEOUT_MS: 5500,

	/**
	 * Versions purged from catalog (copy of proxy16/node/manager.js cleardatabase $in).
	 * Sync debt: update when proxy list changes.
	 */
	BAD_NODE_VERSIONS: [
		'0.22.6',
		'0.22.5',
		'0.22.4',
		'0.22.3',
		'0.22.2',
		'0.22.0',
		'0.22.1',
		'0.21.1',
		'0.21.2',
		'0.21.3',
		'0.20.29',
		'0.20.28',
		'0.20.27',
		'0.20.26',
		'0.20.25',
		'0.20.24',
		'0.20.23',
		'0.20.22',
	],
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeConstants
}
