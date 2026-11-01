/**
 * Local Node Proxy — trust seed lists mirrored from proxy16/kit.js.
 * Main vs test switch: window.testpocketnet / options.test / env.test.
 */
var LocalNodeSeeds = (function () {
	var WebPort = 38081
	var SecureWebPort = 38881
	var WsPort = 8087
	var SecureWsPort = 8887

	var TestWebPort = 39091
	var TestSecureWebPort = 39991
	var TestWsPort = 6067
	var TestSecureWsPort = 6667

	/** Active mainnet trust seeds (commented kit entries omitted). */
	var activenodes = [
		{
			host: '202.61.253.55',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '202.61.253.55',
			stable: true,
		},
		{
			host: '207.180.201.246',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '207.180.201.246',
			stable: true,
		},
		{
			host: '5.189.141.204',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '5.189.141.204',
			stable: true,
		},
		{
			host: '162.246.52.155',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '162.246.52.155',
			stable: true,
		},
		{
			host: '95.31.45.162',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '95.31.45.162',
			stable: true,
		},
		{
			host: '79.143.35.233',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '79.143.35.233',
			stable: true,
		},
		{
			host: '109.197.196.106',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '109.197.196.106',
			stable: true,
		},
		{
			host: '178.217.159.221',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '178.217.159.221',
			stable: true,
		},
		{
			host: '128.69.178.18',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '128.69.178.18',
			stable: true,
		},
		{
			host: '85.175.4.178',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '85.175.4.178',
			stable: true,
		},
		{
			host: '178.234.11.26',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '178.234.11.26',
			stable: true,
		},
		{
			host: '5.187.79.252',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '5.187.79.252',
			stable: true,
		},
		{
			host: '195.133.13.225',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '195.133.13.225',
			stable: true,
		},
		{
			host: '52.144.105.179',
			port: WebPort,
			ws: WsPort,
			sport: SecureWebPort,
			sws: SecureWsPort,
			name: '52.144.105.179',
			stable: true,
		},
	]

	/** Active testnet trust seeds (commented kit entries omitted). */
	var testnodes = [
		{
			host: '157.90.228.34',
			port: TestWebPort,
			ws: TestWsPort,
			sport: TestSecureWebPort,
			sws: TestSecureWsPort,
			name: 'test.2.pocketnet.app',
			stable: true,
		},
		{
			host: '116.203.219.28',
			port: TestWebPort,
			ws: TestWsPort,
			sport: TestSecureWebPort,
			sws: TestSecureWsPort,
			name: 'test.pocketnet.app',
			stable: true,
		},
	]

	var cloneMeta = function (meta) {
		return {
			host: meta.host,
			port: meta.port,
			ws: meta.ws,
			sport: meta.sport,
			sws: meta.sws,
			name: meta.name,
			stable: meta.stable === true,
		}
	}

	var cloneList = function (list) {
		var out = []
		var i
		for (i = 0; i < list.length; i++) {
			out.push(cloneMeta(list[i]))
		}
		return out
	}

	/**
	 * @param {Object} [env] `{ test, testpocketnet, app }` or truthy test flag
	 * @returns {boolean}
	 */
	var isTestNetwork = function (env) {
		if (env === true) return true
		if (!env || typeof env !== 'object') {
			if (typeof window !== 'undefined' && window.testpocketnet) return true
			return false
		}
		if (env.test === true || env.testpocketnet === true) return true
		if (env.app && env.app.options && env.app.options.testpocketnet === true) {
			return true
		}
		if (typeof window !== 'undefined' && window.testpocketnet) return true
		return false
	}

	/**
	 * Trust seed metas for the active network (shallow clones).
	 * @param {Object|boolean} [env]
	 * @returns {Array}
	 */
	var list = function (env) {
		return cloneList(isTestNetwork(env) ? testnodes : activenodes)
	}

	return {
		PORTS: {
			WebPort: WebPort,
			SecureWebPort: SecureWebPort,
			WsPort: WsPort,
			SecureWsPort: SecureWsPort,
			TestWebPort: TestWebPort,
			TestSecureWebPort: TestSecureWebPort,
			TestWsPort: TestWsPort,
			TestSecureWsPort: TestSecureWsPort,
		},
		activenodes: activenodes,
		testnodes: testnodes,
		isTestNetwork: isTestNetwork,
		list: list,
		/** Alias used by manager loaders. */
		getTrustSeeds: list,
	}
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeSeeds
}
