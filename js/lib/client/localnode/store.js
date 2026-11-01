/**
 * Local Node Proxy — node catalog persistence.
 * IndexedDB when available; in-memory Map otherwise (Node tests / SSR).
 * Persist export-shaped docs only — never statistic / penalty blobs.
 *
 * DB: localnode-catalog / object store nodes (keyPath: key)
 */
var LocalNodeStore = (function () {
	var DB_NAME = 'localnode-catalog'
	var DB_VERSION = 1
	var STORE_NAME = 'nodes'

	/** Fields allowed on a persisted catalog document. */
	var PERSIST_KEYS = [
		'host',
		'port',
		'sport',
		'ws',
		'sws',
		'name',
		'addedby',
		'key',
		'testing',
		'stable',
		'local',
		'peer',
		'bchain',
		'version',
		'vcode',
		'allowRpc',
		'height',
	]

	/**
	 * Strip runtime / session-only fields. Returns null if not persistable.
	 */
	function docFromExport(nodeExport) {
		var src
		var out
		var i
		var k
		var v

		if (!nodeExport || typeof nodeExport !== 'object') return null

		src =
			typeof nodeExport.export === 'function'
				? nodeExport.export()
				: nodeExport

		if (!src || !src.key || !src.host) return null

		out = {}
		for (i = 0; i < PERSIST_KEYS.length; i++) {
			k = PERSIST_KEYS[i]
			if (!Object.prototype.hasOwnProperty.call(src, k)) continue
			v = src[k]
			if (v === undefined) continue
			out[k] = v
		}

		if (!out.key || !out.host) return null
		return out
	}

	function shouldPersist(nodeExport) {
		return docFromExport(nodeExport) != null
	}

	function filterByBchain(docs, bchain) {
		var list = docs || []
		var out = []
		var i
		var d

		if (bchain == null || bchain === '') {
			for (i = 0; i < list.length; i++) {
				if (list[i]) out.push(list[i])
			}
			return out
		}

		for (i = 0; i < list.length; i++) {
			d = list[i]
			if (!d) continue
			if (d.bchain == null || d.bchain === '' || d.bchain === bchain) {
				out.push(d)
			}
		}

		return out
	}

	function MemoryBackend() {
		var map = {}

		this.open = function () {
			return Promise.resolve(this)
		}

		this.loadAll = function () {
			var keys = Object.keys(map)
			var docs = []
			var i
			for (i = 0; i < keys.length; i++) {
				docs.push(map[keys[i]])
			}
			return Promise.resolve(docs)
		}

		this.put = function (doc) {
			if (!doc || !doc.key) {
				return Promise.reject(new Error('LocalNodeStore: put requires key'))
			}
			map[doc.key] = doc
			return Promise.resolve(doc)
		}

		this.remove = function (key) {
			if (key) delete map[key]
			return Promise.resolve()
		}

		this.clear = function () {
			map = {}
			return Promise.resolve()
		}

		this.close = function () {
			return Promise.resolve()
		}

		/** Test helper — current size. */
		this.size = function () {
			return Object.keys(map).length
		}
	}

	function IndexedDbBackend(idbFactory, dbName) {
		var self = this
		var db = null
		var opening = null
		var name = dbName || DB_NAME

		self.open = function () {
			var factory
			var openRequest

			if (db) return Promise.resolve(self)
			if (opening) return opening

			factory = idbFactory
			if (!factory) {
				return Promise.reject(new Error('LocalNodeStore: indexedDB missing'))
			}

			opening = new Promise(function (resolve, reject) {
				openRequest = factory.open(name, DB_VERSION)

				openRequest.onupgradeneeded = function () {
					var database = openRequest.result
					if (!database.objectStoreNames.contains(STORE_NAME)) {
						database.createObjectStore(STORE_NAME, { keyPath: 'key' })
					}
				}

				openRequest.onerror = function () {
					reject(openRequest.error || new Error('LocalNodeStore: open failed'))
				}

				openRequest.onblocked = function () {
					reject(new Error('LocalNodeStore: open blocked'))
				}

				openRequest.onsuccess = function () {
					db = openRequest.result
					db.onversionchange = function () {
						try {
							db.close()
						} catch (e) {}
						db = null
					}
					resolve(self)
				}
			}).finally(function () {
				opening = null
			})

			return opening
		}

		var withStore = function (mode, fn) {
			return self.open().then(function () {
				return new Promise(function (resolve, reject) {
					var tx
					var store
					try {
						tx = db.transaction(STORE_NAME, mode)
						store = tx.objectStore(STORE_NAME)
						fn(store, resolve, reject)
						tx.onerror = function () {
							reject(tx.error || new Error('LocalNodeStore: tx failed'))
						}
					} catch (e) {
						reject(e)
					}
				})
			})
		}

		self.loadAll = function () {
			return withStore('readonly', function (store, resolve, reject) {
				var request = store.getAll ? store.getAll() : null

				if (request) {
					request.onsuccess = function () {
						resolve(request.result || [])
					}
					request.onerror = function () {
						reject(request.error)
					}
					return
				}

				// Fallback without getAll (older IDB).
				var docs = []
				var cursorReq = store.openCursor()
				cursorReq.onsuccess = function (event) {
					var cursor = event.target.result
					if (cursor) {
						docs.push(cursor.value)
						cursor.continue()
					} else {
						resolve(docs)
					}
				}
				cursorReq.onerror = function () {
					reject(cursorReq.error)
				}
			})
		}

		self.put = function (doc) {
			if (!doc || !doc.key) {
				return Promise.reject(new Error('LocalNodeStore: put requires key'))
			}
			return withStore('readwrite', function (store, resolve, reject) {
				var request = store.put(doc)
				request.onsuccess = function () {
					resolve(doc)
				}
				request.onerror = function () {
					reject(request.error)
				}
			})
		}

		self.remove = function (key) {
			if (!key) return Promise.resolve()
			return withStore('readwrite', function (store, resolve, reject) {
				var request = store.delete(key)
				request.onsuccess = function () {
					resolve()
				}
				request.onerror = function () {
					reject(request.error)
				}
			})
		}

		self.clear = function () {
			return withStore('readwrite', function (store, resolve, reject) {
				var request = store.clear()
				request.onsuccess = function () {
					resolve()
				}
				request.onerror = function () {
					reject(request.error)
				}
			})
		}

		self.close = function () {
			if (db) {
				try {
					db.close()
				} catch (e) {}
				db = null
			}
			return Promise.resolve()
		}
	}

	/**
	 * @param {Object} [options]
	 * @param {boolean} [options.memory] force in-memory backend
	 * @param {IDBFactory} [options.indexedDB] inject factory (tests)
	 * @param {string} [options.dbName]
	 * @param {Object} [options.backend] inject full backend
	 */
	function LocalNodeStoreCtor(options) {
		options = options || {}

		var self = this
		var backend = options.backend || null
		var idbFactory =
			options.indexedDB ||
			(typeof indexedDB !== 'undefined' ? indexedDB : null)
		var forceMemory = options.memory === true || (!idbFactory && !backend)

		if (!backend) {
			if (forceMemory) {
				backend = new MemoryBackend()
			} else {
				backend = new IndexedDbBackend(idbFactory, options.dbName)
			}
		}

		self.backendName = forceMemory || options.memory ? 'memory' : 'indexeddb'
		if (options.backend) self.backendName = 'custom'

		self.open = function () {
			return backend.open().then(function () {
				return self
			})
		}

		/**
		 * Load catalog docs, optionally filtered by bchain.
		 * Docs with empty/missing bchain are kept (legacy / seed-shaped).
		 */
		self.loadAll = function (bchain) {
			return self.open().then(function () {
				return backend.loadAll().then(function (docs) {
					return filterByBchain(docs, bchain)
				})
			})
		}

		self.put = function (nodeExport) {
			var doc = docFromExport(nodeExport)
			if (!doc) {
				return Promise.reject(new Error('LocalNodeStore: invalid export'))
			}
			return self.open().then(function () {
				return backend.put(doc)
			})
		}

		self.remove = function (key) {
			return self.open().then(function () {
				return backend.remove(key)
			})
		}

		/**
		 * Remove docs whose `version` is in versionList (string match).
		 * Returns number of removed keys.
		 */
		self.removeVersions = function (versionList) {
			var bad = versionList || []
			var set = {}
			var i

			for (i = 0; i < bad.length; i++) {
				if (bad[i] != null && bad[i] !== '') {
					set[String(bad[i])] = true
				}
			}

			return self.open().then(function () {
				return backend.loadAll().then(function (docs) {
					var removed = 0
					var chain = Promise.resolve()

					;(docs || []).forEach(function (doc) {
						if (!doc || !doc.key) return
						if (!doc.version || !set[String(doc.version)]) return
						removed++
						chain = chain.then(function () {
							return backend.remove(doc.key)
						})
					})

					return chain.then(function () {
						return removed
					})
				})
			})
		}

		self.clear = function () {
			return self.open().then(function () {
				return backend.clear()
			})
		}

		self.close = function () {
			if (backend && typeof backend.close === 'function') {
				return backend.close()
			}
			return Promise.resolve()
		}

		/** Expose backend size for memory tests. */
		self.size = function () {
			if (backend && typeof backend.size === 'function') {
				return backend.size()
			}
			return -1
		}

		return self
	}

	LocalNodeStoreCtor.DB_NAME = DB_NAME
	LocalNodeStoreCtor.DB_VERSION = DB_VERSION
	LocalNodeStoreCtor.STORE_NAME = STORE_NAME
	LocalNodeStoreCtor.PERSIST_KEYS = PERSIST_KEYS
	LocalNodeStoreCtor.docFromExport = docFromExport
	LocalNodeStoreCtor.shouldPersist = shouldPersist
	LocalNodeStoreCtor.filterByBchain = filterByBchain
	LocalNodeStoreCtor.MemoryBackend = MemoryBackend

	return LocalNodeStoreCtor
})()

if (typeof module !== 'undefined' && module.exports) {
	module.exports = LocalNodeStore
}
