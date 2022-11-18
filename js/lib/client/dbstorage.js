const pdbstorage = function(storageName, version, time) {
    /** Set this flag to TRUE if debug logs needed */
    const DebugFlag = false;
    const DebugForceLocalStorage = false;

    let debugLog = () => {};

    if (DebugFlag) {
        debugLog = console.log;
    }

    /** Time constants */
    const SecondsInHour = 60 * 60;
    const SecondsInDay = SecondsInHour * 24;
    const SecondsInMonth = SecondsInDay * 30;

    var cacheTime = time || SecondsInMonth

    var memorystorage = {}

    /**
     * Function generates UNIX timestamp
     * floored to current hour.
     *
     * @return {number}
     */
    function getHourUnixtime() {
        const dateNow = Math.floor(Date.now() / 1000);
        const hourUnix = dateNow;

        return hourUnix;
    }

    /**
     * Using IndexedDB initializer
     * if it is supported.
     */
    function initIndexedDb() {
        let db;

        let openRequest = indexedDB.open(storageName, version);

        openRequest.onblocked = function (err) {
        };

        openRequest.onupgradeneeded = function (e) {
            let db = openRequest.result;

            const isVersionChanged = (e.oldVersion !== e.newVersion);
            const didExistBefore = (e.oldVersion === 0);

            /**
             * If PCryptoStorage version is changed,
             * then ObjectStore could be removed.
             */
            if (isVersionChanged && !didExistBefore) {
                if (!db.objectStoreNames.contains('items')) {
                    db.deleteObjectStore('items');
                }
            }

            /**
             * Here PCryptoStorage creates ObjectStore
             * needed to function correctly.
             */
            if (!db.objectStoreNames.contains('items')) {
                db.createObjectStore('items', {keyPath: 'id'});
            }
        };

        /**
         * Function get all items to memory cache
         */
        function getall() {

            const transaction = openTransaction('items');
            const items = transaction.objectStore('items');

            const req = items.getAll();

            return new Promise((resolve, reject) => {

                req.onsuccess = (data) => {
                    const cursor = data.target.result;

                    if (cursor) {
                        _.each(cursor, (item) => {
                            memorystorage[item.id] = {
                                cachedAt : item.cachedAt,
                                data : item.message,
                                invalidate : item.invalidate
                            }
                        })
                    }


                    resolve()
                };

                req.onerror = (data) => {

                    debugLog('PCryptoStorage CLEAR OUTDATED error', data);

                    resolve()
                };

            })
        }

        /**
         * Function removes items cached
         * in IndexedDB 30 days ago
         */
        function clearOldItems() {
            const timeFromCurrent = getHourUnixtime() - cacheTime;
            

            const transaction = db.transaction('items', 'readwrite');
            const items = transaction.objectStore('items');

            const req = items.openCursor();

            return new Promise((resolve, reject) => {

                req.onsuccess = (data) => {
                    const cursor = data.target.result;
    
                    if (cursor) {

                        if (timeFromCurrent >= cursor.value.cachedAt) {
                            debugLog('PCryptoStorage CLEAR OUTDATED log', data);
                            cursor.delete();
                        }
    
                        cursor.continue();
                    }

                    resolve()
                };
    
                req.onerror = (data) => {
                    debugLog('PCryptoStorage CLEAR OUTDATED error', data);

                    resolve()
                };

            })

            
        }

        /**
         * Function opens IDBDatabase transaction.
         *
         * @param {string} name - Name of IDBDatabase store
         * @param {boolean} writeMode - Enable write mode
         *
         * @return {IDBTransaction}
         */
        function openTransaction(name, writeMode = false) {
            const transaction = db.transaction('items', 'readwrite');

            transaction.onsuccess = function (data) {
                debugLog('PCryptoStorage TRANSACTION finished', data);
            };

            transaction.onabort = function (data) {
                debugLog('PCryptoStorage TRANSACTION abort', data.target.error);
            }

            transaction.onerror = function (data) {
                debugLog('PCryptoStorage TRANSACTION error', data.target.error);
            };

            return transaction;
        }

        const instanceFunctions = {

            invalidateMany : function(updated = getHourUnixtime()){
                var needToClear = []

                _.each(memorystorage, (item, itemid) => {

                    if(item.cachedAt < updated){
                        needToClear.push(itemid)
                    }

                })

                return this.clearItems(needToClear).then(() => {

                    //console.log("CLEARED", storageName, needToClear.length)

                    return Promise.resolve()
                })
            },

            invalidate : function(updated = getHourUnixtime(), index) {

                var needToClear = []
                var cleared = []


                _.each(memorystorage, (item, itemid) => {
                    if (item.itemid == index){
                        if(item.cachedAt < updated){
                            needToClear.push(itemid)
                            cleared.push(item.invalidate.index)
                        }
                    }   
                })


                return this.clearItems(needToClear).then(() => {


                    return Promise.resolve(cleared)
                })
            },

            clearall : () => { 

                function executor(resolve, reject) {
                    const transaction = openTransaction('items');
                    const items = transaction.objectStore('items');

                    items.clear()

                    var req = items.clear()

                    memorystorage = {}

                    req.onsuccess = (data) => {
                        resolve(true);
                    };

                    req.onerror = (data) => {
                        reject(data.target.error);
                    };
                }

                return new Promise(executor);
            },

            clearItems : function(itemIds) {
                return Promise.all(_.map(itemIds, (itemId) => {
                    return this.clear(itemId)
                }))
            },

            clear: (itemId) => {
                debugLog('PCryptoStorage clearing', itemId);


                function executor(resolve, reject) {
                    const transaction = openTransaction('items', true);
                    const items = transaction.objectStore('items');

                    const req = items.delete(itemId);

                    delete memorystorage[itemId]

                    req.onsuccess = (data) => {
                        debugLog('PCryptoStorage CLEAR log', data);
                        resolve(true);
                    };

                    req.onerror = (data) => {
                        debugLog('PCryptoStorage CLEAR error', data.target.error);
                        reject(data.target.error);
                    };
                }

                return new Promise(executor);
            },

            set: (itemId, message) => {
                debugLog('PCryptoStorage writing', itemId);

                function executor(resolve, reject) {
                    const transaction = openTransaction('items', true);
                    const items = transaction.objectStore('items');

                    const unixtime = getHourUnixtime();

                    const item = {
                        id: itemId,
                        message,
                        cachedAt: unixtime,
                    };

                    memorystorage[itemId] = {
                        cachedAt: item.cachedAt,
                        data : message
                    }

                    /**
                     * FIXME: It is not the best practice to use
                     *        here put() instead of add(), but it
                     *        solves vue.js repeating decryption
                     *        requests as it doesn't throw Error
                     *        on data update...
                     */
                    const req = items.put(item);

                    req.onsuccess = function (data) {
                        debugLog('PCryptoStorage SET log', data);
                        resolve(true);
                    };

                    req.onerror = function (data) {
                        debugLog('PCryptoStorage SET error', data.target.error);
                        reject(data.target.error);
                    };
                }

                return new Promise(executor);
            },
            get: (itemId) => {
                debugLog('PCryptoStorage reading', itemId);

                function executor(resolve, reject) {

                    if (memorystorage[itemId]){
                        return resolve(memorystorage[itemId].data);
                    }

                    const transaction = openTransaction('items');
                    const items = transaction.objectStore('items');

                    const req = items.get(itemId);


                    req.onsuccess = (data) => {
                        debugLog('PCryptoStorage GET log', data, req.result);

                        if (!req.result) {
                            reject('Data does not exist');
                            return;
                        }

                        const foundMessage = ('message' in req.result);

                        if (!foundMessage) {
                            reject('Message property does not exist');
                            return;
                        }

                        memorystorage[itemId] = {
                            cachedAt: req.result.cachedAt,
                            data : req.result.message,
                        }

                        resolve(req.result.message);
                    };

                    req.onerror = (data) => {
                        reject(data.target.error);
                    };
                }

                return new Promise(executor);
            },
        }

        function executor(resolve, reject) {


            openRequest.onblocked = function (err) {
                reject('PCryptoStorage error initiating IndexedDB');
            };

            openRequest.onerror = function (err) {
                debugLog('PCryptoStorage error occurred:', err);
                reject('PCryptoStorage error initiating IndexedDB');
            };

            openRequest.onsuccess = function () {

                db = openRequest.result;

                clearOldItems().then(r => {
                    return getall()
                }).then(r => {
                    resolve(instanceFunctions);
                })
                
            };


        }


        return new Promise(executor);
    }

    /**
     * Using LocalStorage initializer
     * if IndexedDB is not supported.
     */
    function initLocalStorage() {
        /**
         * Function removes items cached
         * in LocalStorage 7 days ago
         */
        function clearOldItems() {
            const timeFromCurrent = getHourUnixtime() - SecondsInDay * 7;

            let k = Object.keys(localStorage);

            let msgItems = k.filter(item => item.includes(storageName));

            msgItems.forEach((msgItem) => {
                const msg = JSON.parse(localStorage[msgItem]);

                if (timeFromCurrent >= msg.cachedAt) {

                    delete localStorage[msgItem];
                }
            });
        }

        const instanceFunctions = {
            invalidateMany: function(updated = getHourUnixtime()) {

                var needToClear = []

                _.each(memorystorage, (item, itemid) => {

                    if(item.cachedAt > updated){
                        needToClear.push(itemid)
                    }
                })

                return this.clearItems(needToClear)
            },
            invalidate : function(updated = getHourUnixtime(), index) {

                var needToClear = []

                _.each(memorystorage, (item, itemid) => {

                    if(itemid == index && item.cachedAt < updated) needToClear.push(itemid)

                })

                return this.clearItems(needToClear)
            },

            clearall : () => { 

                for (itemName in localStorage){
                    if(itemName.indexOf(storageName) > -1){
                        delete localStorage[itemName];
                    }
                }
               
                return new Promise();
            },

            clearItems :  function (itemIds) {
                return Promise.all(_.map(itemIds, (itemId) => {
                    return this.clear(itemId)
                }))
            },

            clear: async (itemId) => {
                debugLog('PCryptoStorage clearing localstorage', itemId);

                const itemName = `${storageName}_${itemId}`;

                const isItemSet = (itemName in localStorage);

                if (!isItemSet) {
                    throw Error('Data does not exist');
                }

                const foundMessage = ('message' in localStorage[itemName]);

                if (!foundMessage) {
                    throw Error('Message property does not exist');
                }

                delete localStorage[itemName];
                delete memorystorage[itemName]

                return new Promise();
            },
            set: async (itemId, message) => {
                debugLog('PCryptoStorage writing localstorage', itemId);

                const itemName = `${storageName}_${itemId}`;
                const unixtime = getHourUnixtime();

                const item = {
                    message,
                    cachedAt: unixtime,
                };

                memorystorage[itemId] = {
                    cachedAt: item.cachedAt,
                    data : message
                }

                localStorage[itemName] = JSON.stringify(item);
            },
            get: async (itemId) => {
                debugLog('PCryptoStorage reading', itemId);

                const itemName = `${storageName}_${itemId}`;

                const isItemSet = (itemName in localStorage);

                if (!isItemSet) {
                    throw Error('Data does not exist');
                }

                return localStorage[itemName].message;
            },
        };

        /** Clearing old items on init */
        clearOldItems();

        return instanceFunctions;
    }

    /**
     * Is IndexedDB supported?
     */
    if(!window.indexedDB || DebugForceLocalStorage) {
        debugLog('PCryptoStorage LOCALSTORAGE_FALLBACK');
        return initLocalStorage();
    }


    return initIndexedDb();
};

if(typeof module != "undefined"){ module.exports = {pdbstorage}; } 
else { window.pdbstorage = pdbstorage;}