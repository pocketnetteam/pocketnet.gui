var pSDK = function ({ app, api, actions }) {
    var self = this

    var storage = {}
    var objects = {}
    var baddata = {}
    var temp = {}
    var queue = {}
    var qtick = 300
    //var dbstorages = {}

    var dbmeta = {

        userInfoFull: {
            time: 600
        },

        subscribes: {
            time: 600
        },

        subscribers: {
            time: 600
        },

        blocking: {
            time: 600
        },

        userInfoFullFB: {
            time: 0
        },

        userInfoLight: {
            time: 30000
        },

        userState: {
            time: 600
        },

        userStateFB: {
            time: 0
        },

        commentRequest: {
            time: 60,
            authorized: true
        },

        comment: {
            time: 120,
            authorized: true
        },

        shareRequest: {
            time: 60 // temp
        },

        share: {
            time: 240
        },

        myScore: {
            time: 6000,
            authorized: true
        },

        myScoreFB: {
            time: 6000,
            authorized: true
        },

        tagRequest: {
            time: 6000
        },

        accSet: {
            time: 6000
        },

        nameAddress: {
            time: 6000
        },

        searchUsersRequest: {
            time: 120
        },

        searchRequest: {
            time: 240
        },

        postScores : {
            time : 240
        }
    }

    var storages = _.map(dbmeta, (v, i) => {return i})

    var dbversion = 2 + storages.length;

    self.db = new ResoursesDB('psdk_' + (window.testpocketnet ? 'test' : 'production'), dbversion, storages)

    var rt = performance.now()

    self.db.getdb().then(() => {
    }).catch(e => {
        console.error(e)
    })

    self.actions = actions

    

    var checkObjectInActions = function (objects) {

        var account = actions.getCurrentAccount()

        if (!account) return

        var txids = _.filter(_.map(objects, (o) => { return o.txid || o }), (o) => {
            return o && !_.isObject(o)
        })

        account.checkTransactionById(txids)
    }

    var prepareStorage = function (key) {
        if (!storage[key]) storage[key] = {}
        if (!temp[key]) temp[key] = {}
        if (!objects[key]) objects[key] = {}
        if (!queue[key]) queue[key] = {
            d : 0,
            a : [],
            mc : 0
        }

        if(!baddata[key]) baddata[key] = {}
    }

    var settodb = function (dbname, result) {
        if (!dbname || !dbmeta[dbname]) {
            return Promise.resolve()
        }

        return Promise.all(_.map(result, ({ key, data }) => {

            if(!data) return Promise.resolve()

            if (data.___temp) return Promise.resolve()

            if (dbmeta[dbname].authorized) key = key + '_' + app.user.address.value

            return self.db.set(dbname, dbmeta[dbname].time, key, data).catch(e => {
                console.error(e)
                return Promise.resolve()
            })
        }))

    }

    var clearfromdb = function (dbname, ids) {

        if (!dbname || !dbmeta[dbname]) return Promise.resolve()

        if (dbmeta[dbname].authorized) ids = _.map(ids, id => {
            return id + '_' + app.user.address.value
        })

        return self.db.clearMany(dbname, ids).catch(e => {
            console.error(e)
            return Promise.resolve()
        })

    }

    var clearallfromdb = function (dbname) {

        if (!dbname || !dbmeta[dbname]) return Promise.resolve()
        
        return self.db.clearAll(dbname)
    }

    var settodbone = function (dbname, hash, data) {

        if (!hash || !data) return Promise.resolve()

        return settodb(dbname, [{
            key: hash,
            data
        }])
    }

    var getfromdbone = function (dbname, hash, getold) {
        return getfromdb(dbname, hash, getold).then(r => {

            if (r.length) {
                return Promise.resolve(r[0].data)
            }

            return Promise.resolve(null)
        })
    }

    var getfromdb = function (dbname, ids, getold) {


        if (!ids) return Promise.resolve([])

        if (!_.isArray(ids)) ids = [ids]

        if (!dbname) return Promise.resolve([])

        if (dbmeta[dbname].authorized) ids = _.map(ids, id => {
            return id + '_' + app.user.address.value
        })

        var result = []


        return Promise.all(_.map(ids, id => {
            return self.db.get(dbname, id, getold).then(({data, date}) => {

                if (dbmeta[dbname].authorized) {
                    id = id.replace('_' + app.user.address.value, '')
                }

                ///// 

                result.push({
                    key: id,
                    data,
                    date
                })

            }).catch(e => { 

                //console.error(e)

            })
        })).then(() => {


            return result
        })

    }

    var loadone = function (key, index, executor, p) {
        return loadList(key, [index], executor, p)
    }

    var processingQueue = function (queue) {


        if (queue.a.length) {

            var grouppedByEx = _.toArray(group(queue.a, (q) => { return q.executor }))

            _.each(grouppedByEx, (g) => {

                var executor = g[0].executor
                var load = _.reduce(g, (m, q) => m.concat(q.load), [])

                load = _.uniq(load)

                var batches = []

                if (queue.mc){

                    for (let i = 0; i < load.length; i += queue.mc) {

                        var batch = load.slice(i, i + queue.mc)

                        batches.push(batch)
                    }

                }
                else{
                    batches.push(load)
                }

                Promise.all(_.map(batches, (batch) => {
                    return executor(batch)


                })).then((r) => {

                    return Promise.resolve(_.flatten(r, true))

                }).then(r => {

                    _.each(g, (q) => {

                        var localresult = _.filter(r, (d) => {
                            if(d && d.key){
                                return _.indexOf(q.load, d.key) > -1
                            }
                        })

                        q.resolve(localresult)
                    })

                }).catch(e => {

                    _.each(g, (q) => {
                        q.reject(e)
                    })

                })

            })

        }

    }

    var processingAll = function () {
        _.each(queue, (q, type) => {


            if (q.d && q.d > 0){
                q.d = q.d - qtick
                return
            }

            processingQueue(q)

            queue[type] = {
                d : 0,
                a : [],
                mc : 0
            }
        })
    }

    var loadList = function (key, keys, executor, p = {
        update: false,
        fallbackIndexedDB: null,
        indexedDb: null,
        alternativeGetStorage: null,
        transform: null,
        maxcount: 0,
        ignoreBadData : false
    }) {

        if (!key) return Promise.reject('missing:key')
        if (!keys) return Promise.reject('missing:keys')

        if (!_.isArray(keys)) keys = [keys]

        keys = _.filter(_.uniq(keys), k => k)

        if(p.ignoreBadData){
            keys = _.filter(keys, (k) => {

                if(p.update && baddata[key][k]){
                    delete baddata[key][k]
                }

                return !baddata[key][k]
            })
        }

        var loading = {}
        var loaded = {}
        var load = []

        _.each(keys, (k) => {

            if (p.alternativeGetStorage) {

                if (temp[p.alternativeGetStorage][k]) {
                    loading[k] = temp[p.alternativeGetStorage][k]

                    return
                }

                if (!p.update && storage[p.alternativeGetStorage][k] && !storage[p.alternativeGetStorage][k].___temp) {
                    loaded[k] = storage[p.alternativeGetStorage][k]

                    return
                }

            }

            if (temp[key][k]) {
                loading[k] = temp[key][k]

                return
            }


            if(storage[key][k] && storage[key][k].___temp){
                clearIdCache(key, k)
            }

            if (!p.update && storage[key][k] && !storage[key][k].___temp) {
                loaded[k] = storage[key][k]

                return
            }

            load.push(k)
        })

        var fixload = _.clone(load)


        var promise = !load.length ? Promise.resolve([]) : new Promise((resolve, reject) => {

            (p.update ? Promise.resolve([]) : getfromdb(p.indexedDb, load)).then(dbr => {

                load = _.filter(load, (k) => {

                    return !_.find(dbr, ({ key }) => {

                        return key == k
                    })

                })

                if (!load.length) {
                    resolve(dbr)

                    return
                }

                var rjc = function(e){

                    getfromdb(p.indexedDb, load, true).then(r => {
                        if(!r || r.length != load.length){
                            reject(e)
                        }
                        else{
                            resolve(r)
                        }
                    }).catch(e2 => {
                        console.error(e2)
                        reject(e2)
                    })

                }

                var c = (result) => {

                    if (p.transformResult) {
                        result = p.transformResult(result)
                    }

                    settodb(p.indexedDb, result).then(() => {
                        settodb(p.fallbackIndexedDB, result)
                    })

                    resolve(result.concat(dbr))

                }

                if (p.queue) {

                    if(!queue[key].a.length){

                        if (p.queueDelay){
                            queue[key].d = p.queueDelay
                        }
                        if (p.maxcount){
                            queue[key].mc = p.maxcount
                        }

                        
                    }

                    queue[key].a.push({
                        load,
                        executor,
                        resolve: c,
                        reject : rjc
                    })

                    
                }
                else {

                    var batches = []

                    if (p.maxcount){

                        for (let i = 0; i < load.length; i += p.maxcount) {
                            batches.push(load.slice(i, i + p.maxcount))
                        }

                    }
                    else{
                        batches.push(load)
                    }

                    Promise.all(_.map(batches, (batch) => {
                        return executor(batch)
                    })).then((r) => {

                        c(_.flatten(r, true))

                    }).catch(rjc)
                }

                /**/

            })


        }).catch(e => {

            console.error(e)

            if (p.fallbackIndexedDB) {
                return getfromdb(p.fallbackIndexedDB, load)
            }

            return Promise.reject(e)

        }).then(result => {

            var filtered = []


            //// TODO NOW check load length and result length


            try{
            
                _.each(result, (r) => {

                    if (r && r.key && r.data) {
                        storage[key][r.key] = r.data // ADD STORAGE
                        filtered.push(r)
                    }
                    else{
                        if (r && r.key){
                            baddata[key][r.key] = true
                        }
                        
                    }


                    if (p.transform) {
                        var object = p.transform(r)

                        if (object){
                            objects[key][r.key] = object
                            
                        }
                            
                    }

                })

            }catch(e){
                console.error(e)
            }


            return filtered

        }).finally(() => {


            _.each(fixload, (k) => {
                delete temp[key][k]
            })

        })

        _.each(fixload, (k) => {
            temp[key][k] = promise
        })

        return Promise.all(_.map([promise].concat(_.toArray(loading)))).catch(e => {

            return null
        }).then((rpack) => {

            _.each(rpack, (result) => {
                if (result) {
                    _.each(result, (r) => {
                        loaded[r.key] = r.data
                    })
                }
            })

        }).then(() => {
            return loaded
        })
    }

    var request = function (key, hash, executor, p = {
        requestIndexedDb: null,
        insertFromResponse: null
    }) {

        if (_.isObject(hash)) {
            try {
                hash = $.md5(JSON.stringify(hash))
            }
            catch (e) {
                hash = null
            }
        }

        if (temp[key][hash]) return temp[key][hash]

        temp[key][hash] = getfromdbone(p.requestIndexedDb, hash).then((r) => {

            if (r) return Promise.resolve(r)

            return executor().then(r => {

          
                if (p.transformResult) {
                    r = p.transformResult(r)
                }

                settodbone(p.requestIndexedDb, hash, r)

                return Promise.resolve(r)
            }).catch(e => {
                return getfromdbone(p.requestIndexedDb, hash, true).then((r) => {

                    if (r) return Promise.resolve(r)

                    return Promise.reject(e)

                })
            })

        }).then(result => {

            if (p.insertFromResponse) {
                return p.insertFromResponse(result).then(() => {
                    return result
                })
            }

            return result
        }).finally(() => {
            delete temp[key][hash]
        })

        return temp[key][hash]

    }

    var extendCache = {}

    self.extendCache = extendCache

    var clearIdCache = function(type, helpId){

        _.each(extendCache, (o, cid) => {
            if(cid.indexOf(type + ":" + (helpId || "")) == 0){
                delete extendCache[cid]
            }
        })
    }   

    self.clearIdCacheAll = function(){
        extendCache = {}
        self.extendCache = extendCache
    }

    var extendFromActions = function(type, temps, object, helpId){

        var cacheId = type + ":" + (helpId || "") + ":" + _.reduce(temps, (m, t) => {m + t}, '') + (helpId || "")

        if (extendCache[cacheId]) {

            return extendCache[cacheId]
        }

        var extendedObject = null

        _.each(actions.getAccounts(), (account) => {

            _.each(temps, (k) => {

                _.each(account.getTempActions(k), (alias) => {

                    if (k == type){

                        if(helpId){

                            if (!object && (alias.id == helpId || alias.actionId == helpId || (k == 'userInfo' && alias.actor == helpId))) {
                                extendedObject = alias

                                return
                            }
                            else{
                                if(!object) return
                            }
    
                        }
                    }

                    if(!extendedObject && !object) return

                    if (self[k] && self[k].applyAction) {

                        if(!extendedObject){
                            //console.log("RELA CLONE OBJECT", object, k, alias)
                        }

                        var applied = self[k].applyAction(extendedObject || object.clone(), alias)

                        if (applied) extendedObject = applied
                    }
                })

            })

        })


        extendCache[cacheId] = extendedObject || object

        return extendedObject || object

    }

    /// main

    self.userInfo = {
        keys: ['userInfoFull', 'userInfoLight'],

        cleanData: function (rawinfo) {
            return _.filter(_.map(rawinfo, (c) => {

                try {

                    c.name = clearStringXss(decodeURIComponent(c.name || ''));
                    c.i = checkIfAllowedImageApply(clearStringXss(trydecode(c.i || '')));
                    c.s = clearStringXss(trydecode(c.s || ''));
                    c.l = clearStringXss(trydecode(c.l || ''));
                    c.a = clearStringXss(trydecode(c.a || ''));

                    c.address = clearStringXss(c.address);

                }
                catch (e) {
                    console.error(e)
                    return null
                }


                return c

            }), c => c)
        },

        load: function (addresses, light, update) {

            return loadList(light ? 'userInfoLight' : 'userInfoFull', addresses, (addresses) => {

                var parameters = [addresses];

                if (light) { parameters.push('1') }

                return api.rpc('getuserprofile', parameters).then((data) => {

                    data = this.cleanData(data)

                    return _.map(addresses, (address) => {
                        return {
                            key: address,
                            data: _.find(data, (info) => { return info.address == address })
                        }
                    })

                })

            }, {
                queue: light ? true : false,
                update,
                indexedDb: light ? 'userInfoLight' : 'userInfoFull',
                fallbackIndexedDB: !light ? 'userInfoFullFB' : null,
                alternativeGetStorage: light ? 'userInfoFull' : null,
                transform: (r) => this.transform(r),
                maxcount : light ? 70 : 10,
                ignoreBadData : true
            })
        },

        insertFromResponse: function (data, light) {

            var result = _.map(data, (r) => {
                return {
                    key: r.address,
                    data: r
                }
            })

            var indexedDb = light ? 'userInfoLight' : 'userInfoFull'
            var fallbackIndexedDB = !light ? 'userInfoFullFB' : null
            var key = light ? 'userInfoLight' : 'userInfoFull'

            return settodb(indexedDb, result).then(() => {

                return settodb(fallbackIndexedDB, result)
            }).then(() => {

                var filtered = []

                _.each(result, (r) => {

                    if (r && r.key && r.data) {
                        storage[key][r.key] = r.data // ADD STORAGE
                        filtered.push(r)
                    }



                    if (objects[key][r.key]){
                        return
                    }

                    var object = this.transform(r)

                    if (object && !objects[key][r.key]){
                        
                        objects[key][r.key] = object
                    }
                        

                })

                return filtered

            })

        },

        insertFromResponseSmall: function (data, light) {

            var result = _.map(data, (r) => {
                return {
                    key: (r.address || r.adr),
                    data: r
                }
            })

            var key = light ? 'userInfoLight' : 'userInfoFull'

            _.each(result, (r) => {

                if (!storage[key][r.key])
                    storage[key][r.key] = r.data // ADD STORAGE

                var object = this.transform(r)

                if (object && !objects[key][r.key])
                    objects[key][r.key] = object

            })

            return

        },

        transform: function ({ key, data }) {

            var u = null

            if (data) {
                u = new pUserInfo()
                u._import(data)

                if (data.subscribers) u.subscribers_loaded = true
                if (data.subscribes) u.subscribes_loaded = true
                if (data.blocking) u.blocking_loaded = true

                clearIdCache('userInfo', u.address)
            }

           

            return u

        },

        getmy: function () {
            return app.user.address.value ? this.get(app.user.address.value) : null
        },

        getmyoriginal : function(){
            if(!app.user.address.value) return null


            return objects['userInfoFull'][app.user.address.value] || objects['userInfoLight'][app.user.address.value]

        },

        get: function (address) {

            return this.tempExtend(objects['userInfoFull'][address] || objects['userInfoLight'][address], address)
        },

        gets: function (addresses) {
            return _.map(addresses, (address) => {
                return this.get(address)
            })
        },

        listener: function (exp, address, status) {

            if (status == 'completed') {

                objects['userInfoFull'][address] = this.applyAction(objects['userInfoFull'][address], exp)

                this.cleardb(address)

            }
        },

        applyAction: function (object, exp) {

            if (!object) {

                if (exp.actor == app.user.address.value) {
                    return exp
                }
            }

            if (object.address == exp.actor) {
                object.name = exp.name
                object.image = exp.image
                object.language = exp.language
                object.about = exp.about
                object.site = exp.site
                object.txid = exp.txid

                object.temp = exp.temp
                object.relay = exp.relay
                object.extended = true
            }

            return object
        },

        tempExtend: function (object, address) {

            return extendFromActions('userInfo', 
                ['userInfo', 'blocking', 'unblocking', 'subscribe', 'subscribePrivate', 'unsubscribe', 'accDel'],
                object,
                address
            )

        },

        getShortForm: function (address) {
            if (!address) address = app.user.address.value

            var userInfo = this.get(address) || {}
            var name = app.platform.api.clearname(userInfo.name || address) || address

            return {
                address: address,
                name: name,
                reputation: userInfo.reputation || 0,
                image: userInfo.image,
                letter: (name ? name[0] : '').toUpperCase(),
                deleted: userInfo.deleted, /// check temp ///app.platform.sdk.user.deletedaccount(address),
                itisme: address == app.user.address.value,
                addresses: userInfo.addresses || [],
                dev: userInfo.dev || false,
                real: app.platform.real[address],
                about : userInfo.about,
                regdate : userInfo.regdate,
                clname : app.platform.api.clearname(userInfo.name)
                //markHtml : app.platform.ui.markUser(address)
            }
        },

        getclear: function (address) {
            return storage['userInfoFull'][address] || storage['userInfoLight'][address]
        },

        findlocal: function (finder) {
            return _.find(_.toArray(objects['userInfoFull']).concat(objects['userInfoLight']), finder)
        },

        clearStorage: function (address) {
            delete storage['userInfoFull'][address]
            delete storage['userInfoLight'][address]

            delete objects['userInfoFull'][address]
            delete objects['userInfoLight'][address]
        },

        cleardb: function (address) {

            clearfromdb('userInfoFullFB', [address])
            clearfromdb('userInfoFull', [address])
            clearfromdb('userInfoLight', [address])
        },

        clearAll: function (address) {
            this.clearStorage(address)
            this.cleardb(address)
        }
    }

    self.userState = {
        keys: ['userState'],

        load: function (addresses, update) {



            return loadList('userState', addresses, (addresses) => {

                return api.rpc('getuserstate', [(addresses).join(',')]).then((d) => {
                    if (d && !_.isArray(d)) d = [d] /// check responce

                    return _.filter(_.map(d || [], (info) => {
                        return {
                            key: info.address,
                            data: _.isEmpty(info) ? null : info
                        }
                    }), d => {
                        return d.data
                    })

                }).catch(e => {

                    if (e && e.code == -5) {
                        ///// userstate hack
                        return Promise.resolve(_.map(addresses, (address) => {
                            return {
                                key: address,
                                data: null //{}
                            }
                        }))
                    }

                    return Promise.reject(e)
                })

            }, {
                update,
                indexedDb: 'userState',
                fallbackIndexedDB: 'userStateFB',
            })

        },

        get: function (address) {
            return storage['userState'][address]
        },

        getmy: function () {
            return app.user.address.value ? this.get(app.user.address.value) : null
        },

        changeLimits: function (address, limit, value) {
            var state = this.get(address);

            if (state) {
                state[limit + "_spent"] = (state[limit + "_spent"] || 0) + value
                state[limit + "_unspent"] = (state[limit + "_unspent"] || 1) - value
            }
        },

        change: function (address, state) {
            this.clear.all('userState', address)

            storage['userState'][address] = state // ADD STORAGE
        }
    }

    self.accSet = {
        keys: ['accSet'],
        load: function (address, update) {

            return loadone('accSet', address, (ids) => {
                return api.rpc('getaccountsetting', [ids[0]]).then(d => {

                    var setting = {}

                    try {
                        setting = JSON.parse(d || "{}")
                    }
                    catch (e) {

                    }

                    return [{
                        key: ids[0],
                        data: {
                            d : setting
                        }
                    }]

                })
            }, {
                update,
                indexedDb: 'accSet',
                transform: (r) => this.transform(r),
            })

        },

        applyAction: function (object, exp) {
            
            if (!object) {

                if (exp.actor == app.user.address.value) {
                    return exp
                }
            }

            if (object.address == exp.actor) {
                object.pin = exp.pin
                object.temp = exp.temp
                object.relay = exp.relay
                object.extended = true
            }

            return object
        },


        transform: function ({ key, data }) {

            var setting = new pSettings();
                setting._import(data)
                setting.address = key



            return setting
        },

        cleardb : function(address){
            clearfromdb('accSet', [address])
        },

        listener: function (exp, address, status) {

            if (status == 'completed') {

                this.cleardb(address)

            }
        },

        tempExtend: function (object, address) {

            return extendFromActions('accSet', 
                ['accSet'],
                object,
                address
            )

        },

        get: function (address) {
            return this.tempExtend(objects.accSet[address] || null, address)
        }

    }
    /// content

    self.comment = {
        keys: ['comment'],
        request: function (executor, hash) {


            return request('comment', hash, (data) => {

                return executor(data).then(r => {
                    return this.cleanData(r)
                })

            }, {
                requestIndexedDb: 'commentRequest',

                insertFromResponse: (r) => this.insertFromResponseEx(r)
            })
        },

        cleanData: function (rawcomments) {

            return _.filter(_.map(rawcomments, (c) => {
                
                //if(c.deleted) return

                if(!c.msgparsed && !c.msg) return null

                try {

                    c.msgparsed = c.msgparsed || JSON.parse(c.msg)

                    if(_.isObject(c.msgparsed)){
                        c.msgparsed.url = clearStringXss(trydecode(c.msgparsed.url || ""));

                        c.msgparsed.message = clearStringXss(trydecode(c.msgparsed.message || "")).replace(/\n{2,}/g, '\n\n')
    
                        c.msgparsed.images = _.filter(_.map(c.msgparsed.images || [], function (i) {
    
                            return checkIfAllowedImageApply(clearStringXss(trydecode(i)))
                        }), function(i){return i});
                    }

                    else{
                        return null
                    }

                    

                }
                catch (e) {
                    console.error(e)
                    console.log(c)
                    return null
                }


                return c

            }), c => c)
        },

        load: function (ids, update) {
            return loadList('comment', ids, (ids) => {

                return api.rpc('getcomments', ['', '', app.user.address.value || '', ids]).then(d => {

                    d = this.cleanData(d)

                    checkObjectInActions(_.map(d, (c) => {
                        return {
                            txid: c.id
                        }
                    }))

                    return _.map(d || [], (info) => {
                        return {
                            key: info.id,
                            data: info
                        }
                    })

                })
            }, {
                transform: (r) => this.transform(r),
                update,
                indexedDb: 'comment',
            })
        },

        transform: function ({ key, data }) {

            var comment = new pComment();
            comment.import(data)

            return comment
        },

        insertFromResponseEx: function (data) {
            return Promise.resolve(this.insertFromResponse(data))
        },

        insertFromResponse: function (data) {
            var result = _.map(data, (r) => {

                if (!r) return null

                return {
                    key: r.id,
                    data: r
                }
            })

            var key = 'comment'

            var filtered = []

            _.each(result, (r) => {

                if (r && r.key && r.data) {
                    storage[key][r.key] = r.data // ADD STORAGE
                    filtered.push(r)
                }

                var object = this.transform(r)

                if (object) {
                    objects[key][r.key] = object

                    checkObjectInActions([{ txid: object.id }])
                }

            })

            return filtered

        },

        insertFromResponseSmall: function (data) {
            var result = _.map(data, (r) => {

                if (!r) return null

                return {
                    key: r.id,
                    data: r
                }
            })

            var key = 'comment'

            _.each(result, (r) => {

                if (!storage[key][r.key]) {
                    storage[key][r.key] = r.data // ADD STORAGE
                }

                var object = this.transform(r)

                if (object && !objects[key][r.key]) {
                    objects[key][r.key] = object
                }

            })



        },

        listener: function (exp, address, status) {
            if (status == 'completed') {

                if (exp.optype == 'comment') {
                    objects['comment'][exp.id] = this.applyAction(objects['comment'][exp.id] || exp, exp)
                }
                else {
                    this.applyAction(objects['comment'][exp.id], exp)
                }

                this.applyAction(objects['share'][exp.postid], exp)

                clearallfromdb('commentRequest')
                clearfromdb('share', [exp.postid])
            }
        },
        applyAction: function (object, exp) {


            if (object) {
                if (object.type == 'share') {

                    if (object.txid == exp.postid) {


                        if (exp.optype == 'comment') {
                            object.comments++

                            var last = object.lastComment ? self.comment.get(object.lastComment) : null
                            
                            if(exp.parentid){
                                if (last){
                                    if (exp.parentid == last.id){
                                        //last.children++
                                    }
                                }
                            }
                            else{
                                if (!last || Number(last.timeUpd) < Number(exp.timeUpd)) {
                                    object.lastComment = exp.id
                                }
                            }

                            
                        }

                        if (exp.optype == 'commentEdit') {

                        }

                        if (exp.optype == 'commentDelete') {

                            if (object.comments > 0)
                                object.comments--

                            if (exp.parentid){
                                var last = object.lastComment ? self.comment.get(object.lastComment) : null

                                if (last){
                                    if (exp.parentid == last.id){

                                        //last.children--
                                    }
                                }
                            }
                        }
                    }
                }

                if (object.type == 'comment') {


                    if (exp.optype == 'comment') {
                        if (object.id == exp.id) return exp

                        if (object.id == exp.parentid) {
                            object.children++
                        }
                    }

                    if (exp.optype == 'commentEdit') {
                        if (object.id == exp.id) {
                            object.message = exp.message
                            object.timeUpd = exp.timeUpd
                        }
                    }

                    if (exp.optype == 'commentDelete') {
                        if (object.id == exp.id) {
                            object.deleted = true
                        }

                        if (object.id == exp.parentid) object.children--
                    }
                }
            }


            return object
        },


        gets: function (ids) {

            if (!_.isArray(ids)) ids = [ids]

            return _.filter(_.map(ids, s => this.get(s)), s => s)
        },

        get: function (id) {
            return this.tempExtend(id ? (objects.comment[id] || null) : null, id)
        },

        getclear: function (id) {
            return objects.comment[id] || null
        },

        tempAdd: function (objects = [], filter) {

            _.each(actions.getAccounts(), (account) => {
                var actions = _.filter(account.getTempActions('comment'), filter)

                _.each(actions, (a) => {

                    if (a.optype == 'comment'){
                        objects.unshift(a)
                    }
                })
            })

            return objects

        },

        tempExtend: function (object, id) {


            return extendFromActions('comment', 
                ['comment', 'cScore'],
                object,
                id
            )


        },
    }

    self.cScore = {
        listener: function (exp, address, status) {
            if (status == 'completed') {
                objects['comment'][exp.comment.v] = this.applyAction(objects['comment'][exp.comment.v], exp)

                
                var result = {
                    key : exp.comment.v,
                    data : {
                        cmntid : exp.comment.v,
                        myScore : Number(exp.value.v)
                    }
                }

                if(exp.actor == app.user.address.value){
                    settodb('myScore', [result]).then(() => {
                    }).catch(e => {
                        console.error(e)
                    })
                }
            }
        },
        applyAction: function (comment, exp) {

            if (comment) {
                if (comment.id == exp.comment.v) {

                    var v = Number(exp.value.v)
                    
                    if(exp.actor == app.user.address.value){
                        comment.myScore = v
                    }
                   
                    
                    if(v > 0){
                        comment.scoreUp = (comment.scoreUp || 0) + 1
                    }

                    else{
                        comment.scoreDown = (comment.scoreDown || 0) + 1
                    }
                }
            }

            return comment
        }
    }

    self.share = {
        keys: ['share'],

        request: function (executor, hash) {


            return request('share', hash, (data) => {
                
                return executor(data).then(r => {

                    if (r.boosts){
                        return r
                    }



                    if(_.isArray(r)){
                        r = {
                            contents : r
                        }
                        /*return Promise.resolve({
                            contents : data
                        })*/
                    }


                    if(r.contents) r.contents = this.cleanData(r.contents)
                    else r = this.cleanData(r)


                    return r
                })

            }, {
                requestIndexedDb: 'shareRequest',

                insertFromResponse: (r) => this.insertFromResponseEx(r)
            })
        },

        insertFromResponseEx: function (response) {

            self.userInfo.insertFromResponse(self.userInfo.cleanData(response.users), true)

            app.platform.sdk.videos.getVideoResponse(response.videos)

            return this.insertFromResponse(response.contents)
        },

        insertFromResponse: function (data) {

            var result = _.map(data, (r) => {

                if (!r) return null

                return {
                    key: r.txid,
                    data: r
                }
            })

            var indexedDb = 'share'
            var key = 'share'

            return settodb(indexedDb, result).then(() => {

                var filtered = []

                _.each(result, (r) => {

                    if (r && r.key && r.data) {
                        storage[key][r.key] = r.data // ADD STORAGE
                        filtered.push(r)
                    }

                    var object = this.transform(r)  // ADD STORAGE (TR)

                    if (object) {
                        objects[key][r.key] = object

                        checkObjectInActions([object])
                    }

                })

                return filtered

            })

        },

        insertFromResponseSmall: function (data, ncn) {

            if(!ncn)
                data = this.cleanData(data)

            var result = _.map(data, (r) => {

                if (!r) return null

                return {
                    key: r.txid,
                    data: r
                }
            })

            var key = 'share'


            _.each(result, (r) => {

                if (!storage[key][r.key] || (storage[key][r.key] && storage[key][r.key].___temp))
                    storage[key][r.key] = r.data // ADD STORAGE

                var object = this.transform(r, true)

                if (object && !(objects[key][r.key] && objects[key][r.key].___temp)) {
                    objects[key][r.key] = object
                }

            })

            return data

        },

        transform: function ({ key, data: share }, small) {


            if (share.userprofile || share.user) {
                self.userInfo[!small ? 'insertFromResponse' : 'insertFromResponseSmall'](self.userInfo.cleanData([share.userprofile || share.user]), true)
            }

            if (share.lastComment) {
                self.comment[!small ? 'insertFromResponse' : 'insertFromResponseSmall'](self.comment.cleanData([share.lastComment]))
            }

            var s = new pShare();

            s._import(share);



            if (share.ranks) {
                s.info = share.ranks
            }
            else {

                if (
                    share.BOOST || share.DPOST ||
                    share.DREP || share.LAST5 ||
                    share.LAST5 || share.LAST5R ||
                    share.POSTRF || share.PREP ||
                    share.PREPR || share.UREP
                )
                    s.info = {
                        BOOST: share.BOOST,
                        DPOST: share.DPOST,
                        DREP: share.DREP,
                        LAST5: share.LAST5,
                        LAST5R: share.LAST5R,
                        POSTRF: share.POSTRF,
                        PREP: share.PREP,
                        PREPR: share.PREPR,
                        UREP: share.UREP,
                        UREPR: share.UREPR,
                    }
            }

            /*if (s.lastComment) {
                //s.lastComment = objects.comment[s.lastComment.id]
            }*/


            //deleted, likes temp

            return s
        },

        gets: function (ids) {

            if (!_.isArray(ids)) ids = [ids]

            return _.filter(_.map(ids, s => this.get(s)), s => s)
        },

        get: function (id) {
            return this.tempExtend(id ? (objects.share[id] || null) : null, id)
        },

        cleanData: function (rawshares) {

            return _.filter(_.map(rawshares, (c) => {

                if(!c) return false

                try {
                    c.u = clearStringXss(trydecode(c.u || ''));
                    c.c = clearStringXss(trydecode(c.c || '')).replace(/&nbsp;/g, ' ');

                    if (c.s && c.s.v == 'a') {

                        if (c.s.version >= 2) {

                            if(!_.isObject(c.m)){
                                c.m = JSON.parse(c.m)
                            }
                                
                        }
                        else {
                            var whiteclass = {
                                'js-player': true,
                                'plyr': true,
                                'medium-insert-images': true,
                                'medium-insert-images-grid': true,
                                'medium-insert-embeds': true
                            }

                            c.m = superXSS(trydecode(c.m || ''), {
                                stripIgnoreTag: true,
                                whiteList: {
                                    a: ["href", "title", "target", 'cordovalink'],
                                    br: ["style"],
                                    b: ["style"],
                                    span: ["style"],
                                    figure: ["style"],
                                    figcaption: ["style"/*, "class"*/],
                                    i: ["style"],
                                    img: ["src"/*, "width", "height"*/],
                                    div: [ /*"class",*/"data-plyr-provider", "data-plyr-embed-id"],
                                    p: [],
                                    ul: [],
                                    ol: [],
                                    li: [],
                                    h2: [],
                                    h1: [],
                                    h3: [],
                                    h4: [],
                                    h5: [],
                                    em: [],
                                    u: [],
                                    blockquote: [],
                                    strong: [],
                                    picture: ['img-type'],
                                    source: ['srcset', 'type'],
                                    strike: []

                                },

                                onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
                                    if (name === "class") {
                                        var v = value.split(' ');

                                        v = _.filter(v, function (v) {
                                            return whiteclass[v]
                                        })

                                        return name + '="' + v.join(' ') + '"';
                                    }
                                }

                            }).replace(/http:\/\//g, 'https://').replace(/\n{2,}/g, '\n\n')

                        }

                    }
                    else {
                        c.m = trimrn((superXSS(trydecode(c.m || ''), {
                            whiteList: [],
                            stripIgnoreTag: true,
                        }))).replace(/\n{2,}/g, '\n\n')
                    }

                    c.t = _.map(c.t || [], function(t){ 
                        return clearStringXss(clearTagString(trydecode(t)))
                    })

                    c.i = _.filter(_.map(c.i || [], function(i){return checkIfAllowedImageApply(clearStringXss(i))}), function(i){return i});
                }
                catch (e) {
                    console.error(e)

                    return null
                }


                return c

            }), c => c)
        },

        load: function (txids, update) {
            

            return loadList('share', txids, (txids) => {

                return api.rpc('getrawtransactionwithmessagebyid', [txids]).then(d => {

                    if (d && !_.isArray(d)) d = [d];

                    d = this.cleanData(d)

                    d = _.sortBy(d, (share) => _.indexOf(txids, share.txid))

                    d = _.filter(d || [], (s) => s.address)

                    checkObjectInActions(d)

                    return _.map(d || [], (info) => {
                        return {
                            key: info.txid,
                            data: info
                        }
                    })

                })
            }, {
                queue: true,
                transform: (r) => this.transform(r),
                update,
                indexedDb: 'share',
            })
        },

        listener: function (exp, address, status) {


            if (status == 'completed') {
                clearallfromdb('shareRequest')
                clearfromdb('share', _.filter([exp.txid], r => r))

                //objects['share'][exp.txid] =

                var modified = this.applyAction(objects['share'][exp.txid], exp) //// check txidEdit

                if (modified) {
                    objects['share'][modified.txid] = modified
                }
                else {

                    /*if (exp.txidEdit){
                        exp = exp.clone()
                        exp.txid = exp.txidEdit
                        delete exp.txidEdit
                    }*/

                    objects['share'][exp.txid] = exp
                }
            }
        },


        applyAction: function (object, exp) {

            if (exp.editing) {

                if (!object) return

                if (exp.txid == object.txid) {

                    object.message = exp.message
                    object.caption = exp.caption
                    object.tags = exp.tags
                    object.url = exp.url
                    object.language = exp.language
                    object.repost = exp.repost
                    object.settings = _.clone(exp.settings)
                    object.edit = true
                    //object.txidEdit = exp.txid
                    object.temp = exp.temp
                    object.relay = exp.relay
                    object.rejected = exp.rejected

                }



            }

            else {

            }

            return object
        },

        tempExtend: function (object, txid) {

            return extendFromActions('share', 
                ['share', 'upvoteShare', 'comment', 'contentDelete'],
                object,
                txid
            )

        },

        tempAdd: function (objects = [], filter) {

            _.each(actions.getAccounts(), (account) => {
                var actions = _.filter(account.getTempActions('share'), filter)

                _.each(actions, (a) => {
                    objects.unshift(a)
                })
            })

            return objects

        }
    }

    /// actions

 
    self.unblocking = {
        listener: function (exp, address, status) {
            if (status == 'completed') {

                this.applyAction(objects['userInfoFull'][exp.actor], exp)
                this.applyAction(objects['userInfoFull'][exp.address.v], exp)

                self.userInfo.cleardb(exp.actor)
                self.userInfo.cleardb(exp.address.v)

                clearfromdb('blocking', [exp.actor])
            }
        },
        applyAction: function (object, exp) {

            if (object) {
                if (object.address == exp.actor) { /// for me
                    object.removeRelation(exp.address.v, 'blocking')
                }

                if (object.address == exp.address.v) { /// for me
                }
            }

            return object
        }
    }

    self.subscribe = {
        listener: function (exp, address, status) {
            if (status == 'completed') {

                this.applyAction(objects['userInfoFull'][exp.actor], exp)
                this.applyAction(objects['userInfoFull'][exp.address.v], exp)

                self.userInfo.cleardb(exp.actor)
                self.userInfo.cleardb(exp.address.v)

                clearfromdb('subscribes', [exp.actor])
                clearfromdb('subscribers', [exp.address.v])
            }
        },
        applyAction: function (object, exp) {


            if (object) {
                if (object.address == exp.actor) { 
                    
                    object.removeRelation({
                        adddress: exp.address.v,
                    })

                    /// for me
                    object.addRelation({
                        adddress: exp.address.v
                    })
                }

                if (object.address == exp.address.v) {
                    object.addRelation(exp.actor, 'subscribers')
                }
            }

            return object
        },

        tempAdd: function (objects = [], filter) {

            _.each(actions.getAccounts(), (account) => {
                var actions = _.filter(account.getTempActions('subscribePrivate'), filter).concat(_.filter(account.getTempActions('subscribe'), filter))

                _.each(actions, (a) => {
                    objects.unshift(a)
                })
            })

            return objects

        }
    }

    self.accDel = {
        listener: function (exp, address, status) {
            if (status == 'completed') {
                this.applyAction(objects['userInfoFull'][exp.actor], exp)
                self.userInfo.cleardb(exp.actor)
            }
        },
        applyAction: function (object, exp) {

            if (object) {
                if (object.address == exp.actor) { 
                    object.deleted = (exp.temp || exp.relay) ? 'temp' : true
                }
            }

            return object
        }
    }

    self.subscribePrivate = {
        listener: function (exp, address, status) {
            if (status == 'completed') {

                this.applyAction(objects['userInfoFull'][exp.actor], exp)
                this.applyAction(objects['userInfoFull'][exp.address.v], exp)

                self.userInfo.cleardb(exp.actor)
                self.userInfo.cleardb(exp.address.v)

                clearfromdb('subscribes', [exp.actor])
                clearfromdb('subscribers', [exp.address.v])
            }
        },
        applyAction: function (object, exp) {

            if (object) {
                if (object.address == exp.actor) { /// for me

                    object.removeRelation({
                        adddress: exp.address.v,
                    })

                    object.addRelation({
                        adddress: exp.address.v,
                        private: true
                    })
                }

                if (object.address == exp.address.v) {

                    object.addRelation(exp.actor, 'subscribers')
                }
            }

            return object
        }
    }

    self.unsubscribe = {
        listener: function (exp, address, status) {
            if (status == 'completed') {


                this.applyAction(objects['userInfoFull'][exp.actor], exp)
                this.applyAction(objects['userInfoFull'][exp.address.v], exp)

                self.userInfo.cleardb(exp.actor)
                self.userInfo.cleardb(exp.address.v)

                clearfromdb('subscribes', [exp.actor])
                clearfromdb('subscribers', [exp.address.v])
            }
        },
        applyAction: function (object, exp) {

            if (object) {
                if (object.address == exp.actor) { /// for me
                    object.removeRelation({
                        adddress: exp.address.v
                    })
                }

                if (object.address == exp.address.v) {
                    object.removeRelation(exp.actor, 'subscribers')
                }
            }

            return object
        }
    }

    self.contentDelete = {
        listener: function (exp, address, status) {
            if (status == 'completed') {

                objects['share'][exp.txidEdit] = this.applyAction(objects['share'][exp.txidEdit], exp)

                clearallfromdb('shareRequest')
            }
        },
        applyAction: function (share, exp) {

            if (share) {
                if (share.txid == exp.txidEdit) { /// for me
                    share.deleted = true
                }
            }

            return share
        }
    }

    self.upvoteShare = {
        listener: function (exp, address, status) {
            if (status == 'completed') {
                objects['share'][exp.share.v] = this.applyAction(objects['share'][exp.share.v], exp)

                var result = {
                    key : exp.share.v,
                    data : {
                        posttxid : exp.share.v,
                        value : exp.value.v
                    }
                }

                clearfromdb('postScores', [exp.share.v])
                clearfromdb('share', [exp.share.v])
                //// long like cache

                
                if(exp.actor == app.user.address.value){
                    settodb('myScore', [result]).then(() => {
                    }).catch(e => {
                        console.error(e)
                    })
                }
            }
        },
        applyAction: function (share, exp) {

            if (share) {
                if (share.txid == exp.share.v) { /// for me
                    
                    if(exp.actor == app.user.address.value){
                        share.myVal = Number(exp.value.v)
                    }
                    
                    share.scnt = (share.scnt || 0) + 1
                    share.score = (share.score || 0) + Number(exp.value.v)
                }
            }

            return share
        },

        tempGet: function (filter) {

            var objects = []

            _.each(actions.getAccounts(), (account) => {
                var actions = _.filter(account.getTempActions('upvoteShare'), filter)

                _.each(actions, (a) => {

                    objects.unshift(a)
                })
            })

            return objects

        },
    }

    /// requests

    self.myScore = {
        keys: ['myScore'],

        load: function (shareIds, commentIds, update) {

            var ids = [].concat(shareIds, commentIds)

            return loadList('myScore', ids, (ids) => {


                var sIds = _.filter(ids, (id) => {
                    return _.indexOf(shareIds, id) > -1
                })

                var cIds = _.filter(ids, (id) => {
                    return _.indexOf(commentIds, id) > -1
                })

                return api.rpc('getpagescores', [sIds, app.user.address.value, cIds]).then((data) => {

                    return _.map(ids, (id) => {
                        return {
                            key: id,
                            data: _.find(data, (v) => {
                                return id == (v.posttxid || v.cmntid)
                            }) || {}
                        }
                    })

                })

            }, {
                queue : true,
                queueDelay : 1000,
                update,
                transform: (v) => this.transform(v),
                indexedDb: 'myScore',
                fallbackIndexedDB: 'myScoreFB'
            })
        },

        transform: function ({ key, data }) {

            if (data.posttxid) {
                if (objects.share[data.posttxid]) {
                    objects.share[data.posttxid].myVal = Number(data.value)
                }
            }

            if (data.cmntid) {
                if (objects.comment[data.cmntid] && data.myScore) {
                    objects.comment[data.cmntid].myScore = Number(data.myScore)
                }
            }

            return data
        }
    }

    self.transaction = {
        keys: ['transaction'],
        load: function (id, update, p) {

            return loadone('transaction', id, (ids) => {

                return api.rpc('getrawtransaction', [ids[0], 1], {rpc : p}).then(d => {

                    if(_.isEmpty(d)) {
                        return []
                    }

                    if (!d.confirmations) {
                        d.confirmations = 0

                        if (d.height) {
                            app.platform.currentBlock ? (d.confirmations = Math.max(app.platform.currentBlock - d.height, 0)) : null
                        } else {
                            app.platform.currentBlock ? (d.height = app.platform.currentBlock) : null
                        }
                    }

                    return [{
                        key: ids[0],
                        data: d
                    }]

                })
            }, {
                update
            }).then(r => {

                if (!r[id]) return Promise.reject({
                    code: -5
                })

                return r[id]

            })


        }
    }

    self.postScores = {
        keys: ['postScores'],
        load: function (txids, update) {

            return loadList('postScores', txids, (txids) => {

                return api.rpc('getpostscores', txids).then((d) => {

                    var g = group(d, (info) => {
                        return info.posttxid
                    })

                    return _.map(g, (info, i) => {
                        return {
                            key : i,
                            data : info
                        }
                    })

                }).catch(e => {

                    return Promise.reject(e)
                })

            }, {
                update,
                indexedDb: 'postScores'
            })
        },

        get: function (txid) {
            return storage['postScores'][txid] || [] 
        },

    }

    self.nameAddress = {
        keys: ['nameAddress'],
        load: function (name, update) {

            return loadone('nameAddress', name, (ids) => {
                return api.rpc('getuseraddress', [ids[0]]).then(r => {

                    if (r && r[0]) {
                        return [{
                            key: name,
                            data: r[0].address
                        }]
                    }

                    return Promise.reject('404')

                })
            }, {
                update,
                indexedDb: 'nameAddress',

            }).then(r => {

                if (!r[name]) return Promise.reject('404')

                return r[name]

            })

        },
    }

    self.blocking = {
        keys: ['blocking'],

        listener: function (exp, address, status) {
            if (status == 'completed') {

                this.applyAction(objects['userInfoFull'][exp.actor], exp)
                this.applyAction(objects['userInfoFull'][exp.address.v], exp)

                this.applyAction(objects['userInfoFull'][exp.actor], exp)


                self.userInfo.cleardb(exp.actor)
                self.userInfo.cleardb(exp.address.v)


                clearfromdb('blocking', [exp.actor])
            }
        },
        applyAction: function (object, exp) {

            if (object) {
                if (object.address == exp.actor) { /// for me
                    object.addRelation(exp.address.v, 'blocking')
                }

                if (object.address == exp.address.v) { 
                }
            }

            return object
        },

        load: function (address, update) {

            return loadone('blocking', address, (ids) => {

                return api.rpc('getuserblockings', [ids[0], '1', '', '', 0, 5000], {
                    rpc : {
                        fnode : '65.21.56.203:38081'
                    }
                }).then(r => {

                    /*r = _.map(r, (v) => {
                        return v.address
                    })*/

                    if (r) {
                        return [{
                            key: address,
                            data: r
                        }]
                    }

                    return Promise.reject('404')

                })
            }, {
                update,
                indexedDb: 'blocking',

            }).then(r => {

                return r[address]

            })

        },
    }

    self.subscribers = {
        keys: ['subscribers'],
        load: function (address, update) {

            return loadone('subscribers', address, (ids) => {
                return api.rpc('getusersubscribers', [ids[0], '', '', 0, 5000]).then(r => {

                    r = _.map(r, (v) => {
                        return v.address
                    })

                    if (r) {
                        return [{
                            key: address,
                            data: r
                        }]
                    }

                    return Promise.reject('404')

                })
            }, {
                update,
                indexedDb: 'subscribers',

            }).then(r => {

                return r[address]

            })

        },
    }

    self.subscribes = {
        keys: ['subscribes'],
        load: function (address, update) {

            return loadone('subscribes', address, (ids) => {
                return api.rpc('getusersubscribes', [ids[0], '', '', 0, 5000]).then(r => {

                    r = _.map(r, (v) => {
                        return {
                            adddress : v.adddress,
                            private : v.private
                        }
                    })

                    if (r) {
                        return [{
                            key: address,
                            data: r
                        }]
                    }

                    return Promise.reject('404')

                })
            }, {
                update,
                indexedDb: 'subscribes',

            }).then(r => {

                return r[address]

            })

        },
    }

    self.search = {
        keys: ['search'],
        request: function (executor, hash) {
            return request('search', hash, executor, {
                requestIndexedDb: 'searchRequest',
            })
        },
    }

    self.searchUsers = {
        keys: ['searchUsers'],
        request: function (executor, hash) {
            return request('searchUsers', hash, executor, {
                requestIndexedDb: 'searchUsersRequest',
                insertFromResponse: (r) => this.insertFromResponseEx(r)
            })
        },

        insertFromResponseEx : function(data){

            data = _.filter(data, (d) => {
                return d
            })

            data = self.userInfo.cleanData(data)

            return self.userInfo.insertFromResponse(data, true).then(() => {
                return Promise.resolve(data)
            })

        }
    }

    self.tag = {
        keys: ['tag'],
        request: function (executor, hash) {
            return request('tag', hash, executor, {
                requestIndexedDb: 'tagRequest',

                transformResult: (r) => this.transformResult(r)
            })
        },

        transformResult: function (data) {

            return _.filter(_.map(data, (tg) => {

                var t = null

                try {
                    t = {
                        count: tg.count,
                        tag: clearTagString(trim(decodeURIComponent(decodeURIComponent(tg.tag))))
                    }
                } catch (e) {
                    //console.log(tg, e)
                }

                return t

            }), (t) => { return t })


        }
    }


    /// end

    self.clear = {
        storage: function (k, key) {
            var keys = self[k]?.keys || []

            _.each(keys, (k) => {
                delete storage[k][key]
                delete baddata[k][key]
            })
        },

        db: function (k, key) {
            var keys = self[k]?.keys || []

            _.each(keys, (k) => {

                if (key) {
                    clearfromdb(k, [key]).catch(e => {
                        console.error(e)
                    })
                    clearfromdb(k + 'FB', [key]).catch(e => {
                        console.error(e)
                    })
                }

                clearallfromdb(k + 'Request').catch(e => {
                    console.error(e)
                })
            })
        },

        all: function (k, key) {
            this.storage(k, key)
            this.db(k, key)
        }
    }




    _.each(self, (v) => {
        if (v && _.isObject(v) && v.keys) {
            _.each(v.keys, (i) => {
                prepareStorage(i)
            })
        }
    })


    var interval = setInterval(() => {
        processingAll()
    }, qtick)


    self.actions.on('actionFiltered', ({ action, address, status }) => {

        extendCache = {}

        var listener = self[action.object.type]?.listener

        if (!listener) return

        if (address == app.user.address.value) {

            var alias = action.get()

            self[action.object.type].listener(alias, address, status)

            if (status == 'completed' && action.object.ustate) {

                var ustate = typeof alias.ustate == 'function' ? alias.ustate() : alias.ustate;

                if (ustate) self.userState.changeLimits(address, ustate, 1)

            }

        }
    })

    self. storage = storage
    self. objects = objects

    var prepareStorages = function(){
        _.each(self, (v) => {
            if (v && _.isObject(v) && v.keys) {
                _.each(v.keys, (i) => {
                    prepareStorage(i)
                })
            }
        })
    }

    self.clearStorageAndObjects = function(){
        self.storage = storage = {}
        self.objects = objects = {}

        prepareStorages()
    }

    self.ws = {
        update : function(type, wsdata){

            var status = 'completed'
            var alias = null

            if (type == 'comment'){

                if(!wsdata.comment) return

                alias = wsdata.comment

                alias.transaction = wsdata.comment.id
                alias.actor = wsdata.comment.address
                alias.optype || (alias.optype = wsdata.comment.type)

                self.comment.listener(alias, wsdata.addrFrom, status)
              
            }

            if(type == 'cScore'){
                alias = {
                    actor : wsdata.addrFrom,
                    comment : {
                        v : wsdata.commentid,
                    },
                    value : {
                        v : wsdata.upvoteVal
                    }
                }

                self.cScore.listener(alias, wsdata.addrFrom, status)
                
            }

            if (type == 'upvoteShare'){

                alias = {
                    actor : wsdata.addrFrom,
                    share : {
                        v : wsdata.posttxid,
                    },
                    value : {
                        v : wsdata.upvoteVal
                    }
                }

                self.upvoteShare.listener(alias, wsdata.addrFrom, status)

            }

            if (type == 'subscribe' || type == 'subscribePrivate' || type == 'unsubscribe'){

                alias = {
                    actor : wsdata.addrFrom,
                    address : {
                        v : wsdata.addr,
                    }
                }

                self[type].listener(alias, wsdata.addrFrom, status)

            }

            if (alias){
                _.each(self.updatelisteners, (l) => {
                    l({type, alias, status}, 'updateListener')
                })
            }
            

            return
        }
    }

    self.clearfromdb = clearfromdb
    self.clearallfromdb = clearallfromdb

    self.updatelisteners = {}

    return self
}


if (typeof module != "undefined") { module.exports = { pSDK }; }
else { window.pSDK = pSDK; }