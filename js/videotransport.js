var initIndexedDbVideo = function () {

    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("assets", 1);

        request.onupgradeneeded = (event) => {
            console.info("Upgrading from", event.oldVersion, "to", event.newVersion);
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
    }

    storeSegment(segment) {
        return new Promise((resolve, reject) => {
            const segmentWithoutData = { ...segment };
            delete segmentWithoutData.data;

            const transaction = this.db.transaction(["segments", "segmentsData"], "readwrite");
            transaction.objectStore("segments").put(segmentWithoutData).onsuccess = () => {
                transaction.objectStore("segmentsData").put({
                    id: segment.id,
                    masterSwarmId: segment.masterSwarmId,
                    data: segment.data,
                });
            };

            transaction.onerror = (event) => reject(event);
            transaction.oncomplete = () => resolve();
        });
    }

    getSegmentsMap(masterSwarmId) {
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
                    result.set(cursor.value.id, { segment: cursor.value });
                    cursor.continue();
                } else {
                    resolve(result);
                }
            };
        });
    }

    getSegment(id, masterSwarmId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(["segments", "segmentsData"]);

            let segment;
            transaction.objectStore("segments").get([id, masterSwarmId]).onsuccess = (event) => {
                segment = event.target.result;
                if (segment === undefined) {
                    return;
                }

                transaction.objectStore("segmentsData").get([id, masterSwarmId]).onsuccess = (event) => {
                    segment.data = event.target.result.data;
                };
            };

            transaction.onerror = (event) => reject(event);
            transaction.oncomplete = () => resolve(segment);
        });
    }

    clean() { }
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
                /*const xhrSetup = this.loader.getSettings().xhrSetup;
                if (xhrSetup) {
                    xhrSetup(xhr, url);
                }*/

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
        })
    }

    self.assets = {
        storeAsset(asset){
            return idb_assetsStorage.storeAsset(asset)
        },
        getAsset(requestUri, requestRange, masterSwarmId){
   
            return idb_assetsStorage.getAsset(requestUri, requestRange, masterSwarmId)
            
            
            /*.catch(e => {
                return Promise.resolve()
            }).then(content => {

                if(content) return Promise.resolve(content.data)

                return requestLocal(requestUri, requestRange, masterSwarmId).then(content => {

                    return Promise.resolve(content)
                })
                .catch(e => {
                    return Promise.reject(e)
                })
            })
            
            .then(content => {

                if(content) return Promise.resolve(content)

                return xhr(requestUri, requestRange ? 'arraybuffer' : 'text', requestRange).then(xhr => {

                    idb_assetsStorage.storeAsset({
                        data : xhr.response,
                        responseUri: xhr.responseURL,
                        requestRange,
                        masterSwarmId
                    }).catch(e => {})

                    return Promise.resolve(xhr.response)
                })
            }).then(content => {
                return {
                    data : content,
                    responseUri : requestUri
                }
            })*/
        },
        destroy(){}
    }

    self.segments = {
        storeSegment(segment){
            return idb_segmentsStorage.storeSegment(segment)
        },
        getSegmentsMap(masterSwarmId){
            return idb_segmentsStorage.getSegmentsMap(masterSwarmId)
        },
        getSegment(id, masterSwarmId){
            return idb_segmentsStorage.getSegment(id, masterSwarmId)
        },
        clean() { },
        destroy() { }
    }

    return self
}