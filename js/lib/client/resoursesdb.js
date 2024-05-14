ResoursesDB = function(storageName, version, storages){
    var self = this
    var db = null
    var debugFlag = false
    var initing = null
    var apptimeCorrection = 60 * 60 * 24 * 365

    useapptimeCorrection = function(){
        if(window.cordova || typeof _Electron != 'undefined'){
            return true
        }
    }

    let debugLog = () => {};

    if (debugFlag) {
        debugLog = console.log;
    }

    var getHourUnixtime = function() {
        return Math.floor(Date.now() / 1000);
    }

    var scheduleToClear = function(name, time){

        setTimeout(() => {
            if(!db) return

            if (db.objectStoreNames.contains(name)){
                clearOld(name)
            }

        }, time)

        
    }

    var clearOld = function(name){

        return transaction(name).then(items => {
            const req = items.openCursor();

            var time = getHourUnixtime()

            if(useapptimeCorrection()){
                time = time - apptimeCorrection
            }

            return new Promise((resolve, reject) => {

                req.onsuccess = (data) => {
                    const cursor = data.target.result;
    
                    if (cursor) {
    
                        if (time >= cursor.value.cachedTo) {
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
        })

        
       

    }

    var transaction = function(name, mode = 'readwrite') {

        return self.getdb().then(db => {

            try{
                const transaction = db.transaction(name, mode);
    
                transaction.onsuccess = function (data) {
                    debugLog('PCryptoStorage TRANSACTION finished', data);
                };
        
                transaction.onabort = function (data) {
                    debugLog('PCryptoStorage TRANSACTION abort', data.target.error);
                }
        
                transaction.onerror = function (data) {
                    debugLog('PCryptoStorage TRANSACTION error', data.target.error);
                };
    
                const items = transaction.objectStore(name);

                return Promise.resolve(items)

            }
            catch(e){
                console.error(e)
                return Promise.reject(e)
            }

        })

    }

    self.clear = function(key, id){


        return transaction(key).then(items => {


            const req = items.delete(id);

            return new Promise((resolve, reject) => {

                req.onsuccess = function (data) {
                    debugLog('PCryptoStorage CLEAR log', data);
                    resolve(true);
                };
    
                req.onerror = function (data) {
                    debugLog('PCryptoStorage CLEAR error', data.target.error);
                    reject(data.target.error);
                };

            })

        })
    }

    self.clearMany = function(key, ids){

        return Promise.all(_.map(ids, id => {
            return self.clear(key, id)
        }))
    }

    self.clearAll = function(key){
        return transaction(key).then(items => {

            const req = items.clear();

            return new Promise((resolve, reject) => {

                req.onsuccess = function (data) {
                    resolve(true);
                };
    
                req.onerror = function (data) {
                    reject(data.target.error);
                };

            })

        })
    }

    self.get = function(key, id, getold){

        var time = getHourUnixtime()

        return transaction(key).then(items => {

            const req = items.get(id);

            return new Promise((resolve, reject) => {

                req.onsuccess = function (data) {


                    if(!req.result) {
                        reject('Data does not exist');
                        return;
                    }

                    if(!req.result.message) {
                        reject('Message property does not exist');
                        return;
                    }
                    
                    if (time >= req.result.cachedTo && !getold) {

                        if (useapptimeCorrection()){

                            var ttime = time - apptimeCorrection

                            if (ttime >= req.result.cachedTo) {
                                reject('delete');
                                return;
                            }

                            if(!getold){
                                reject('Data does not exist');
                                return;
                            }
                        }
                        else{
                            reject('delete');
                            return;
                        }
                        

                        

                        
                    }

                    resolve({data : req.result.message, date : req.result.date || getHourUnixtime()});
                };
    
                req.onerror = function (data) {
                    console.error(data.target.error)
                    reject(data.target.error);
                };

            }).catch(e => {

                if (e == 'delete'){
                    self.clear(key, id)
                }

                return Promise.reject(e)
            })

        })
    }

    self.set = function(key, time, id, message){
        debugLog('PCryptoStorage writing', id);

        return transaction(key).then(items => {

            const unixtime = getHourUnixtime();

            const item = {
                id,
                message,
                cachedTo: unixtime + time,
                date : unixtime
            };

            const req = items.put(item);

            return new Promise((resolve, reject) => {

                req.onsuccess = function (data) {
                    debugLog('PCryptoStorage SET log', data);
                    resolve(true);
                };
    
                req.onerror = function (data) {
                    debugLog('PCryptoStorage SET error', data.target.error);
                    reject(data.target.error);
                };

            })
            
        })
    }

    self.getdb = function(){

        if (db) return Promise.resolve(db)

        if (initing){
            return initing
        }


        initing = new Promise((resolve, reject) => {
            var openRequest = indexedDB.open(storageName, version);


            openRequest.onupgradeneeded = function (e) {
                let db = openRequest.result;

                const isVersionChanged = (e.oldVersion !== e.newVersion);
                const didExistBefore = (e.oldVersion === 0);

                if (isVersionChanged && !didExistBefore) {
                    _.each(db.objectStoreNames, (key) => {
                        db.deleteObjectStore(key);
                    })
                }

                _.each(storages, (name) => {
                    if(!db.objectStoreNames.contains(name)) {
                        db.createObjectStore(name, {keyPath: 'id'});
                        /////
                    }
                })

                
            };


            openRequest.onblocked = function (err) {

                console.error(err)

                reject('PCryptoStorage error initiating IndexedDB');
            };

            openRequest.onerror = function (err) {

                console.error(err)

                debugLog('PCryptoStorage error occurred:', err);
                reject('PCryptoStorage error initiating IndexedDB');
            };

            openRequest.onsuccess = function () {

                db = openRequest.result;

                debugLog('PCryptoStorage opened');

                _.each(db.objectStoreNames, (key) => {
                    scheduleToClear(key, rand(15000, 40000))
                })

                resolve(db)

                db.onversionchange = function (err) {

                    db.close()
                };
                
            };
            
        }).finally(() => {
            initing = null
        })

        return initing

    }

    return self
}

