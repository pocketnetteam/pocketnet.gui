/**
 * Local Node Proxy — small pure helpers (ES5, no lodash required).
 */

var LocalNodeUtil = (function () {
	var api = {}

	api.each = function (list, fn) {
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

	api.filter = function (list, fn) {
		var out = []
		api.each(list, function (item, i) {
			if (fn(item, i)) out.push(item)
		})
		return out
	}

	api.map = function (list, fn) {
		var out = []
		api.each(list, function (item, i) {
			out.push(fn(item, i))
		})
		return out
	}

	api.sortByDesc = function (list, scoreFn) {
		var copy = list.slice ? list.slice() : api.map(list, function (x) {
			return x
		})
		copy.sort(function (a, b) {
			return Number(scoreFn(b) || 0) - Number(scoreFn(a) || 0)
		})
		return copy
	}

	api.maxBy = function (list, scoreFn) {
		var best = null
		var bestScore = null
		api.each(list, function (item) {
			var score = Number(scoreFn(item) || 0)
			if (best === null || score > bestScore) {
				best = item
				bestScore = score
			}
		})
		return best
	}

	/** Fisher–Yates shuffle; uses injectable `random` in [0,1). */
	api.shuffle = function (list, random) {
		var copy = list && list.slice ? list.slice() : []
		var i
		var j
		var tmp
		random =
			typeof random === 'function'
				? random
				: function () {
						return Math.random()
				  }

		for (i = copy.length - 1; i > 0; i--) {
			j = Math.floor(random() * (i + 1))
			tmp = copy[i]
			copy[i] = copy[j]
			copy[j] = tmp
		}
		return copy
	}

	/**
	 * Poll until checkFn() is true or totalMs elapses (proxy16 f.pretry).
	 * Resolves true when check passes, false on timeout.
	 * @param {function():boolean} checkFn
	 * @param {number} [intervalMs]
	 * @param {number} [totalMs]
	 * @param {{setTimeout?:function, clearTimeout?:function}} [timers]
	 * @returns {Promise<boolean>}
	 */
	api.pretry = function (checkFn, intervalMs, totalMs, timers) {
		var setT
		var clearT
		var elapsed = 0
		var timerId = null

		intervalMs = typeof intervalMs === 'number' ? intervalMs : 30
		timers = timers || {}
		setT =
			typeof timers.setTimeout === 'function'
				? timers.setTimeout
				: typeof setTimeout !== 'undefined'
					? setTimeout
					: null
		clearT =
			typeof timers.clearTimeout === 'function'
				? timers.clearTimeout
				: typeof clearTimeout !== 'undefined'
					? clearTimeout
					: null

		return new Promise(function (resolve) {
			var finish = function (ok) {
				if (timerId != null && clearT) clearT(timerId)
				timerId = null
				resolve(ok === true)
			}

			var tick = function () {
				if (typeof checkFn === 'function' && checkFn()) {
					finish(true)
					return
				}

				if (totalMs != null && elapsed >= totalMs) {
					finish(false)
					return
				}

				if (!setT) {
					finish(false)
					return
				}

				elapsed += intervalMs
				timerId = setT(tick, intervalMs)
			}

			tick()
		})
	}

	/**
	 * Weighted pick by `probability` (ported from proxy16/functions.js randmap).
	 * @param {Array<{probability:number}>} ar
	 * @param {function(number,number):number} [randomFloat] — default Math.random in [min,max)
	 */
	api.randmap = function (ar, randomFloat) {
		var total
		var seed
		var counter
		var picked
		var i
		var sorted

		if (!ar || !ar.length) return null

		randomFloat =
			randomFloat ||
			function (min, max) {
				return min + Math.random() * (max - min)
			}

		sorted = ar.slice()
		sorted.sort(function (a, b) {
			return Number(b.probability || 0) - Number(a.probability || 0)
		})

		total = 0
		for (i = 0; i < sorted.length; i++) {
			total += Number(sorted[i].probability || 0)
		}

		if (total <= 0) {
			i = Math.floor(randomFloat(0, sorted.length))
			if (i >= sorted.length) i = sorted.length - 1
			return sorted[i]
		}

		seed = randomFloat(0, total)
		counter = 0
		picked = null

		for (i = 0; i < sorted.length; i++) {
			if (counter + sorted[i].probability > seed && counter <= seed) {
				picked = sorted[i]
				break
			}
			counter = counter + sorted[i].probability
		}

		return picked || sorted[0]
	}

	return api
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeUtil
}
