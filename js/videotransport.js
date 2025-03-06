var initIndexedDbVideo = function () {

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("assets", 1);

        request.onupgradeneeded = (event) => {
  
            const db = event.target.result;

            switch (event.oldVersion) {
                case 0:
                    {
                        // create DB
                        db.createObjectStore("assets", {
                            keyPath: ["requestUri", "requestRange", "masterSwarmId"],
                        });
                        db.createObjectStore("segmentsData", { keyPath: ["id", "masterSwarmId"] });
                        const segments = db.createObjectStore("segments", {
                            keyPath: ["id", "masterSwarmId"],
                        });
                        segments.createIndex("masterSwarmId", "masterSwarmId", { multiEntry: true });
                    }
                    break;

                default:
                    throw new Error("unknown database version:", event.oldVersion);
            }
        };

        request.onerror = (event) => reject(event);
        request.onsuccess = (event) => resolve(event.target.result);


    });
}

class IdbAssetsStorage {
    constructor(db) {
        this.db = db;
    }

    storeAsset(asset) {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction(["assets"], "readwrite")
                .objectStore("assets")
                .put(asset.requestRange === undefined ? { ...asset, requestRange: "" } : asset);
            request.onerror = (event) => reject(event);
            request.onsuccess = (event) => resolve();
        });
    }

    getAsset(requestUri, requestRange, masterSwarmId) {
        return new Promise((resolve, reject) => {
            const request = this.db
                .transaction(["assets"])
                .objectStore("assets")
                .get([requestUri, requestRange === undefined ? "" : requestRange, masterSwarmId]);
            request.onerror = (event) => reject(event);
            request.onsuccess = (event) => resolve(event.target.result);
        });
    }

    destroy() { }
}


class IdbSegmentsStorage {
    constructor(db) {
        this.db = db;

        this.settings = {
            cache : {
                cachedSegmentExpiration : 5 * 60 * 1000,
                cachedSegmentsCount : 45
            },

            idb : {
                cachedSegmentExpiration : 60 * 60 * 1000,
                cachedSegmentsCount : 300
            }
        }

        this.cache = new Map();

        this.clearDb()

        this.midcache = {}

        this.clearDbThrottled = _.throttle((f) => {
            this.clearDb(f)
        }, 15000)
    }

    clearDb(lockedSegmentsFilter) {

        var allSegments = []
        var deleteSegments = []
        const now = performance.now();

        var clearSegment = (key) => {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(["segments", "segmentsData"], 'readwrite');
    
                transaction.objectStore("segments").delete(key).onsuccess = (event) => {
                    transaction.objectStore("segmentsData").delete(key).onsuccess = (event) => {
                    };
                };
    
                transaction.onerror = (event) => reject(event);
                transaction.oncomplete = () => resolve();
            });
        }

        return new Promise((resolve, reject) => {
            const cursor = this.db
                .transaction(["segments"])
                .objectStore("segments")
                .openCursor();

            cursor.onerror = (event) => reject(event);
            cursor.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {

                    if(!lockedSegmentsFilter || !lockedSegmentsFilter(cursor.value)){
                        allSegments.push({
                            key : cursor.key,
                            id : cursor.value,
                            masterSwarmId : cursor.value.masterSwarmId,
                            lastAccessed : cursor.value.lastAccessed
                        })
                    }

                    cursor.continue();

                } else {
                    resolve()
                }
            };
        }).then(() => {

            allSegments = _.sortBy(allSegments, (v) => {
                return -(v.lastAccessed || 0)
            })
            
            for(var i = 0; i < allSegments.length; i++){

                var s = allSegments[i]

                if(!s.lastAccessed || now - s.lastAccessed > this.settings.idb.cachedSegmentExpiration || i > this.settings.idb.cachedSegmentsCount){

                    if(s.masterSwarmId && this.midcache[s.masterSwarmId]){
                        delete this.midcache[s.masterSwarmId]
                    }

                    deleteSegments.push(s.key)
                }

            }

            if(deleteSegments.length){

                return Promise.all(_.map(deleteSegments, (key) => {
                    return clearSegment(key)
                })).then(() => {
                   
                })
                
            }
            else{
                return Promise.resolve()
            }
        }).catch(e => {
            console.error(e)
        })
    }

    storeSegment(segment) {

        if (this.midcache[segment.masterSwarmId]) delete this.midcache[segment.masterSwarmId]


        this.cache.set(segment.id, { segment, lastAccessed: performance.now() });


        return new Promise((resolve, reject) => {
            const segmentWithoutData = { ...segment, lastAccessed: performance.now() };
            delete segmentWithoutData.data;

            const transaction = this.db.transaction(["segments", "segmentsData"], "readwrite");

            transaction.objectStore("segments").put(segmentWithoutData).onsuccess = () => {
                transaction.objectStore("segmentsData").put({
                    id: segment.id,
                    masterSwarmId: segment.masterSwarmId,
                    data: segment.data
                });
            };

            transaction.onerror = (event) => {
                console.error("fatal: can't store segment")
                console.error(event)

                reject(event)
            };
            transaction.oncomplete = () => resolve();
        });
    }

    getSegmentsMap(masterSwarmId) {

        if(this.midcache[masterSwarmId]) return Promise.resolve(this.midcache[masterSwarmId])

        return new Promise((resolve, reject) => {
            const cursor = this.db
                .transaction(["segments"])
                .objectStore("segments")
                .index("masterSwarmId")
                .openCursor(IDBKeyRange.only(masterSwarmId));
            const result = new Map();

            cursor.onerror = (event) => reject(event);
            cursor.onsuccess = (event) => {
                const cursor = event.target.result;

                if (cursor) {

                    var segment = cursor.value

                    result.set(segment.id, { segment });

                    cursor.continue();

                } else {


                    this.cache.forEach(function(value, key) {
                        result.set(key, value);
                    });


                    this.midcache[masterSwarmId] = result


                    resolve(result);
                }
            };
        }).catch(e => {
            console.error(e)
            return Promise.resolve(this.cache);
        })
    }

    getSegment(id, masterSwarmId) {


        var cacheItem = this.cache.get(id);

        if (cacheItem === undefined) {

            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(["segments", "segmentsData"]);
    
                let segment;
                transaction.objectStore("segments").get([id, masterSwarmId]).onsuccess = (event) => {
                    segment = event.target.result;
                    
                    if (segment === undefined) {
                        return reject();
                    }
    
                    transaction.objectStore("segmentsData").get([id, masterSwarmId]).onsuccess = (event) => {
                        if(!event.target.result || !event.target.result.data){
                            return reject()
                        }
    
                        segment.data = event.target.result.data;

                        this.cache.set(segment.id, { segment, lastAccessed: performance.now() });
                    };
                };
    
                transaction.onerror = (event) => reject(event);
                transaction.oncomplete = () => resolve(segment);
            });

        }

        else{
            cacheItem.lastAccessed = performance.now();
            return Promise.resolve(cacheItem.segment);
        }
        
    }

    clean(masterSwarmId, lockedSegmentsFilter) { 

        return new Promise((resolve) => {

            const segmentsToDelete = [];
            const remainingSegments = [];
            // Delete old segments
            const now = performance.now();
            for (const cachedSegment of this.cache.values()) {
                if (now - cachedSegment.lastAccessed > this.settings.cache.cachedSegmentExpiration) {
                    segmentsToDelete.push(cachedSegment.segment.id);
                }
                else {
                    remainingSegments.push(cachedSegment);
                }
            }
            // Delete segments over cached count
            let countOverhead = remainingSegments.length - this.settings.cache.cachedSegmentsCount;
            if (countOverhead > 0) {
                remainingSegments.sort((a, b) => a.lastAccessed - b.lastAccessed);
                for (const cachedSegment of remainingSegments) {
                    if (lockedSegmentsFilter === undefined || !lockedSegmentsFilter(cachedSegment.segment.id)) {
                        segmentsToDelete.push(cachedSegment.segment.id);
                        countOverhead--;
                        if (countOverhead === 0) {
                            break;
                        }
                    }
                }
            }
            segmentsToDelete.forEach((id) => this.cache.delete(id));

            this.clearDbThrottled(lockedSegmentsFilter)

            resolve(segmentsToDelete.length > 0) ;

        })

    }
    destroy() { }
}

var VideoTransport = function (app, ipcRenderer) {
    var self = this

    var idb_segmentsStorage = null
    var idb_assetsStorage = null

    const isElectron = (typeof _Electron !== 'undefined');


    var xhr = function(url, responseType, range){
        return new Promise((resolve, reject) => {
            try{
           
                const xhr = new XMLHttpRequest();

                xhr.open("GET", url, true);
                xhr.responseType = responseType;

                if (range) {
                    xhr.setRequestHeader("Range", range);
                }

                xhr.addEventListener("readystatechange", () => {
                    if (xhr.readyState !== 4)
                        return;
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr);
                    }
                    else {
                        reject(xhr.statusText);
                    }
                });
            

                xhr.send();

            }
            catch(e){
                console.error(e)
                reject(e)
            }
        })
    }

    var requestLocal = function(requestUri, requestRange, masterSwarmId){

        if (isElectron) {

            var type = requestRange ? 'arrayBuffer' : 'text'

            var localVideo = app.platform.sdk.localshares.getByMasterSwarmId(masterSwarmId)

            var transport = peertubeTransport(ipcRenderer, localVideo);

            var headers = new Headers()

            headers.append('Range', requestRange)

            return transport(requestUri, {
                headers 
            }).then(request => {
                return request[type]()
            }).catch(e => {
                return Promise.reject(e)
            })

        }

        return Promise.resolve(null)
    }

    self.init = function(){
        return initIndexedDbVideo().then(db => {
            idb_segmentsStorage = new IdbSegmentsStorage(db)
            idb_assetsStorage = new IdbAssetsStorage(db)
        }).catch(() => {
            console.error(e)
        })
    }

    self.assets = {
        storeAsset(asset){
            try{
                return idb_assetsStorage.storeAsset(asset).catch(e => {
                    return Promise.resolve(undefined)
                })
            }
            catch(e){
                return Promise.resolve(undefined)
            }
            
        },
        getAsset(requestUri, requestRange, masterSwarmId){
            try{
                return idb_assetsStorage.getAsset(requestUri, requestRange, masterSwarmId) .catch(e => {
                    return Promise.resolve(undefined)
                })
            }
            catch(e){
                return Promise.resolve(undefined)
            }
            
        },
        destroy(){}
    }

    self.segments = {
        storeSegment(segment){
            try{
                return idb_segmentsStorage.storeSegment(segment).catch(e => {
                    if (e)
                        console.error('e', e)
                    return Promise.resolve(undefined)
                })
            }
            catch(e){
                return Promise.resolve(undefined)
            }
        },
        getSegmentsMap(masterSwarmId){
            try{
                return idb_segmentsStorage.getSegmentsMap(masterSwarmId).catch(e => {
                    if (e)
                        console.error('e', e)
                    return Promise.resolve(undefined)
                })
            }
            catch(e){
                return Promise.resolve(undefined)
            }
        },
        getSegment(id, masterSwarmId){
            try{
                return idb_segmentsStorage.getSegment(id, masterSwarmId).catch(e => {
                    if (e)
                        console.error('e', e)
                    return Promise.resolve(undefined)
                })
            }
            catch(e){
                return Promise.resolve(undefined)
            }
        },
        clean(masterSwarmId, lockedSegmentsFilter) { 
            return idb_segmentsStorage.clean(masterSwarmId, lockedSegmentsFilter).catch(e => {
                if (e)
                    console.error('e', e)
                return Promise.resolve(undefined)
            })
        },
        destroy() { }
    }

    self.internal = {
      
        storeSegment(segment){
            return Promise.resolve()
        },
        getSegmentsMap(masterSwarmId){

            var video = app.platform.sdk.localshares.getByMasterSwarmId(masterSwarmId)

            if(!video) return Promise.resolve([])

            return Promise.resolve(video.infos.segments)
        },
        getSegment(id, masterSwarmId){


            var video = app.platform.sdk.localshares.getByMasterSwarmId(masterSwarmId)

            if(!video) return Promise.resolve(null)

            var sm = video.infos.segments.get(id)


            if(!sm) return Promise.resolve(null)

            var segment = sm.segment

            var filename = segment.range.replace('bytes=', 'fragment_') + '.mp4'

            return app.platform.sdk.localshares.getSegment(video.infos.dir, filename).then(data => {

                if(!data){
                    return Promise.reject(null)
                }

                var buffer = data.buffer 

                return {
                    ...segment,
                    ...{data : buffer}
                }
            })

        },
        clean() { },
        destroy() { }
    }

    return self
}