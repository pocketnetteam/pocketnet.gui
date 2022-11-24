var pSDK = function({app, api, actions}){
    var self = this

    var storage = {}
    var objects = {}
    var temp = {}
    var queue = {}
    var dbstorages = {}
    var dbversion = 1;

    self.actions = actions

    /*self.actions.on('change', ({account}) => {
        if (account.address == app.user.address.value){
            
        }
    })*/

    

    var dbmeta = {

        userInfoFull : {
            time : 600
        },

        userInfoFullFB : {
            time : 0
        },

        userInfoLight : {
            time : 3000
        },

        userState : {
            time : 600
        },

        userStateFB : {
            time : 0
        },

        commentRequest: {
            time : 60
        },

        shareRequest : {
            time : 60
        },

        share : {
            time : 240
        },

        myScore : {
            time : 6000,
            authorized : true
        },

        myScoreFB : {
            time : 6000,
            authorized : true
        },

        tagRequest : {
            time : 6000
        },

        accSet : {
            time : 6000
        }
    }

    var checkObjectInActions = function(objects){

        var account = actions.getCurrentAccount()

        if(!account) return

        var txids = _.filter(_.map(objects, (o) => { return o.txid || o }), (o) => {
            return o && !_.isObject(o)
        })

        account.checkTransactionById(txids)
    }

    var getDBStorage = function ({name, time}) {

        var key = 'initdbstorage_' + name

        if (temp[key]) return temp[key]

		if (!dbstorages[name]) {
     
			temp[key] = pdbstorage(name, dbversion, time).then(storage => {
				dbstorages[name] = storage

                delete temp[key]

				return Promise.resolve(storage)
			})

            return temp[key]
		}

		return Promise.resolve(dbstorages[name])
	}

    var prepareStorage = function(key){
        if(!storage[key]) storage[key] = {}
        if(!temp[key]) temp[key] = {}
        if(!objects[key]) objects[key] = {}
        if(!queue[key]) queue[key] = []
    }

    var settodb = function(dbname, result){
        if(!dbname) return Promise.resolve()

        return getDBStorage({name : dbname, ...dbmeta[dbname]}).then((db) => {
            return Promise.all(_.map(result, ({key, data}) => {

                if(dbmeta[dbname].authorized) key = key + '_' + app.user.address.value

                return db.set(key, data).catch(e => {})
            }))

        })
    }

    var clearfromdb = function(dbname, ids){

        return getDBStorage({name : dbname, ...dbmeta[dbname]}).then(() => {

            if(dbmeta[dbname].authorized) ids = _.map(ids, id => {
                return id + '_' + app.user.address.value
            })

            return db.clearItems(ids)
        }).catch(e => {

        })
        
    }

    var clearallfromdb = function(dbname){

        return getDBStorage({name : dbname, ...dbmeta[dbname]}).then(() => {
            return db.clearall()
        }).catch(e => {

        })
        
    }

    var settodbone = function(dbname, hash, data){

        if(!hash || !data) return Promise.resolve()

        return settodb(dbname, [{
            key : hash,
            data
        }])
    }

    var getfromdbone = function(dbname, hash){
        return getfromdb(dbname, hash).then(r => {

            if (r.length){
                return Promise.resolve(r[0].data)
            }

            return Promise.resolve(null)
        })
    }

    var getfromdb = function(dbname, ids){

        if(!ids) return Promise.resolve([])

        if(!_.isArray(ids)) ids = [ids]

        if(!dbname) return Promise.resolve([])

        if(dbmeta[dbname].authorized) ids = _.map(ids, id => {
            return id + '_' + app.user.address.value
        })

        return getDBStorage({name : dbname, ...dbmeta[dbname]}).then((db) => {
            var result = []

            return Promise.all(_.map(ids, id => {

                

                return db.get(id).then(data => {

                    if(dbmeta[dbname].authorized){
                        id = id.replace('_' + app.user.address.value, '')
                    }

                    result.push({
                        key : id,
                        data : data
                    })
    
                }).catch(e => {})

            })).then(() => {
                return result
            })
            
        })

    }

    var loadone = function(key, index, executor, p){
        return loadList(key, [index], executor, p)
    }

    var processingQueue = function(queue){


        if (queue.length){

            var groupped = group(queue, (q) => {return q.executor})

            _.each(groupped, (g) => {

                var executor = g[0].executor
                var load = _.reduce(g, (m, q) => m.concat(q.load), [])

                executor(load).then(r => {

                    _.each(g, (q) => {
                        q.resolve(r)
                    })

                }).catch(e => {

                    _.each(g, (q) => {
                        q.reject(e)
                    })

                })

            })

        }

    }

    var processingAll = function(){
        _.each(queue, (q, type) => {

            processingQueue(q)

            queue[type] = []
        })
    }

    var loadList = function(key, keys, executor, p = {
        update : false, 
        fallbackIndexedDB : null, 
        indexedDb : null,
        alternativeGetStorage : null,
        transform : null
    }){

        if(!key) return Promise.reject('missing:key')
        if(!keys) return Promise.reject('missing:keys')

        if(!_.isArray(keys)) keys = [keys]

        keys = _.filter(_.uniq(keys), k => k)

        var loading = {}
        var loaded = {}
        var load = []

        _.each(keys, (k) => {

            if (p.alternativeGetStorage){

                if (temp[p.alternativeGetStorage][k]){
                    loading[k] = temp[p.alternativeGetStorage][k]
    
                    return
                }

                if(!p.update && storage[p.alternativeGetStorage][k]){
                    loaded[k] = storage[p.alternativeGetStorage][k]
    
                    return
                }

            }

            if (temp[key][k]){
                loading[k] = temp[key][k]

                return
            }
            

            if(!p.update && storage[key][k]){
                loaded[k] = storage[key][k]

                return
            }

            load.push(k)
        })

        var promise = !load.length ? Promise.resolve([]) : new Promise((resolve, reject) => {

            //var t = performance.now()

            getfromdb(p.indexedDb, load).then(dbr => {

                load = _.filter(load, (k) => {

                    return !_.find(dbr, ({key}) => {

                        return key == k
                    })

                })


                if(!load.length){
                    resolve(dbr)

                    return
                }

                var c = (result) => {

                    if (p.transformResult){
                        result = p.transformResult(result)
                    }
              
                    settodb(p.indexedDb, result)
                    settodb(p.fallbackIndexedDB, result)

                    return resolve(result.concat(dbr))

                }


                if(p.queue){
                    queue[key].push({
                        load,
                        executor,
                        resolve : c,
    
                        reject
                        
                    })
                }
                else{
                    executor(load).then(c).catch(reject)
                }

                /**/

                
                
                
                

                
            })


        }).catch(e => {

            console.error(e)

            if(p.fallbackIndexedDB){
                return getfromdb(p.fallbackIndexedDB, load)
            }

            return Promise.reject(e)

        }).then(result => {

            var filtered = []


            _.each(result, (r) => {

                if (r && r.key && r.data){
                    storage[key][r.key] = r.data
                    filtered.push(r)
                }


                if (p.transform){
                    var object = p.transform(r)

                    if (object)
                        objects[key][r.key] = object
                }

            })


            return filtered

        }).finally(() => {

            _.each(load, (k) => {
                delete temp[key][k]
            })

        })

        _.each(load, (k) => {
            temp[key][k] = promise
        })

        return Promise.all(_.map([promise].concat(_.toArray(loading)))).catch(e => {

            return null
        }).then((rpack) => {

            _.each(rpack, (result) => {
                if(result){
                    _.each(result, (r) => {
                        loaded[r.key] = r.data
                    })  
                }
            })

        }).then(() => {
            return loaded
        })
    }

    var request = function(key, hash, executor, p = {
        requestIndexedDb : null,
        insertFromResponse : null
    }){

        if(_.isObject(hash)) {
            try{
                hash = $.md5(JSON.stringify(hash))
            }
            catch(e){
                hash = null
            }
        }

        if(temp[key][hash]) return temp[key][hash]

        temp[key][hash] = getfromdbone(p.requestIndexedDb, hash).then((r) => {

            if(r) return Promise.resolve(r)

            return executor().then(r => {

                if (p.transformResult){
                    r = p.transformResult(r)
                }

                settodbone(p.requestIndexedDb, hash, r)

                return Promise.resolve(r)
            })

        }).then(result => {

            

            if(p.insertFromResponse){
                return p.insertFromResponse(result).then(() => {
                    return result
                })
            }

            return result
        })

        return temp[key][hash]

    }

    self.userInfo = {
        keys : ['userInfoFull', 'userInfoLight'],
        
        load : function(addresses, light, update){

            return loadList(light ? 'userInfoLight' : 'userInfoFull', addresses, (addresses) => {

                var parameters = [addresses]; 

                if (light) { parameters.push('1') }

                return api.rpc('getuserprofile', parameters).then((data) => {
                    

                    return _.map(addresses, (address) => {
                        return {
                            key : address,
                            data : _.find(data, (info) => {return info.address == address})
                        }
                    })
                   
                })

            }, {
                update, 
                indexedDb : light ? 'userInfoLight' : 'userInfoFull',
                fallbackIndexedDB : !light ? 'userInfoFullFB' : null,
                alternativeGetStorage : light ? 'userInfoFull' : null,
                transform : (r) => this.transform(r)
            })
        },

        insertFromResponse : function(data, light){

            var result = _.map(data, (r) => {
                return {
                    key : r.address,
                    data : r
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

                    if (r && r.key && r.data){
                        storage[key][r.key] = r.data
                        filtered.push(r)
                    }
    
                    var object = this.transform(r)

                    if (object)
                        objects[key][r.key] = object
    
                })

                return filtered

            })
            
        },

        transform : function({key, data}){

            var u = null
            
            if (data){
                u = new pUserInfo()
                u._import(data)
            }

            return u

        },

        getmy : function(){
            return app.user.address.value ? this.get(app.user.address.value) : null
        },

        get : function(address){
            return this.tempExtend(objects['userInfoFull'][address] || objects['userInfoLight'][address])
        },

        listener : function(action, address, status){

            if (status == 'completed'){

                var exp = action.get()

                objects['userInfoFull'][address] = this.applyAction(objects['userInfoFull'][address], exp)

                self.clear.db('userInfo', address)
                ///self.clear
            }
        },

        applyAction : function(object, exp){

            if(!object) {

                if(exp.address == app.user.address.value) {
                    return exp
                }
            }

            if (object.address == exp.address){
                object.name = exp.name
                object.image = exp.image
                object.language = exp.language
                object.about = exp.about
                object.site = exp.site
                object.txid = exp.txid

                object.temp = exp.temp
                object.relay = exp.relay
            }

            return object
        },

        tempExtend : function(object/*, address*/){

            var extendedObject = null

            _.each(actions.getAccounts(), (account) => {

                var temps = ['userInfo', 'blocking', 'unblocking', 'subscribe', 'subscribePrivate', 'unsubscribe']

                _.each(temps, (k) => {

                    if(k != 'userInfo' && !extendedObject) return
 
                    _.each(account.getTempActions(k), (action) => {

                        if (self[k] && self[k].applyAction){
                            var applied = self[k].applyAction(extendedObject || object.clone(), action)

                            if (applied) extendedObject = applied
                        }
                    })

                })
            
            })

            return extendedObject || object

        },

        getShortForm : function(address){
            if(!address) address = app.user.address.value

            var userInfo = this.get(address) || {}
            var name = app.platform.api.clearname(userInfo.name || address) || address

            return {
                address : address,
                name : name,
                reputation : Math.max(userInfo.reputation || 0, 0),
                image : userInfo.image,
                letter : (name ? name[0] : '').toUpperCase(),
                deleted : userInfo.deleted, /// check temp ///app.platform.sdk.user.deletedaccount(address),
                itisme : address == app.user.address.value,
                addresses : userInfo.addresses || [],
                dev : userInfo.dev || false,
                real : app.platform.real[address]
                //markHtml : app.platform.ui.markUser(address)
            }
        },

        getclear : function(address){
            return storage['userInfoFull'][address] || storage['userInfoLight'][address]
        },

        findlocal : function(finder){
            return _.find(_.toArray(objects['userInfoFull']).concat(objects['userInfoLight']), finder)
        },

        clearStorage : function(address){
            delete storage['userInfoFull'][address]
            delete storage['userInfoLight'][address]

            delete objects['userInfoFull'][address]
            delete objects['userInfoLight'][address]
        },

        cleardb : function(address){

            clearfromdb('userInfoFullFB', [address])
            clearfromdb('userInfoFull', [address])
        },

        clearAll : function(address){
            this.clearStorage(address)
            this.cleardb(address)
        }
    }

    self.comment = {
        keys : ['comment'],
        request : function(executor, hash){
            return request('comment', hash, executor, {
                requestIndexedDb : 'commentRequest',

                insertFromResponse : (r) => this.insertFromResponseEx(r)
            })
        },

        transform : function({key, data}){
            var comment = new pComment();
                comment.import(data)

            return comment
        },

        insertFromResponseEx : function(data){
            return Promise.resolve(this.insertFromResponse(data))
        },

        insertFromResponse : function(data){
            var result = _.map(data, (r) => {

                if(!r) return null

                return {
                    key : r.id,
                    data : r
                }
            })

            var key = 'comment'

            var filtered = []

            _.each(result, (r) => {

                if (r && r.key && r.data){
                    storage[key][r.key] = r.data
                    filtered.push(r)
                }

                var object = this.transform(r)

                if (object){
                    objects[key][r.key] = object

                    checkObjectInActions([{txid : object.id}])
                }

            })

            

        },

        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                this.applyAction(objects['comment'][exp.id], exp)
                this.applyAction(objects['share'][exp.postid], exp)
            }
        },
        applyAction : function(object, exp){

            if (object){
                if (object.type == 'share'){

                    if(object.txid == exp.postid){

                        var last = object.lastComment

                        if(exp.optype == 'comment'){
                            object.comments++

                            if (!last || Number(last.timeUpd) < Number(exp.timeUpd)) {
                                object.lastComment = tempComment
                            }
                        }
    
                        if(exp.optype == 'commentEdit'){

                            if (last && last.id == exp.id) {

                                exp.time = last.time
                                object.lastComment = exp

                            }
                        }
    
                        if(exp.optype == 'commentDelete'){
                            if (last && last.id == exp.id) {
                                last.deleted = true
                            }

                            if (object.comments > 0)
                                object.comments--
                        }
                    }
                }

                if(object.type == 'comment'){

                    if(exp.optype == 'comment'){
                        if(object.id == exp.id) return exp
                    }

                    if(exp.optype == 'commentEdit'){
                        if (object.id == exp.id){
                            object.msg = exp.msg
                            object.timeUpd = exp.timeUpd
                        }
                    }

                    if(exp.optype == 'commentDelete'){
                        if (object.id == exp.id){
                            object.deleted = true
                        }
                    }
                }
            }

            return object
        },


        gets : function(ids){
            return _.filter(_.map(ids, s => this.get(s)), s => s)
        },

        get : function(id){
            return this.tempExtend(id ? (objects.comment[id] || null) : null, id)
        },

        tempAdd : function(objects, filter){

            _.each(actions.getAccounts(), (account) => {
                var actions = account.getTempActions('comment', filter)

                _.each(actions, (a) => {
                    objects.unshift(a)
                })
            })

            return objects
            
        },

        tempExtend : function(object, id){

            var extendedObject = null

            _.each(actions.getAccounts(), (account) => {

                var temps = ['comment', 'cScore']

                _.each(temps, (k) => {

                    _.each(account.getTempActions(k), (action) => {

                        if (!object && action.id == id){
                            extendedObject = action
                        }
                        else{

                            if (self[k] && self[k].applyAction){

                                var applied = self[k].applyAction(extendedObject || object.clone(), action)
    
                                if (applied) extendedObject = applied
                            }

                        }

                        
                    })

                })
            
            })

            return extendedObject || object || null

        },
    }

    self.blocking = {
        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                this.applyAction(objects['userInfoFull'][address], exp)
                this.applyAction(objects['userInfoFull'][exp.vsaddress], exp)
            }
        },
        applyAction : function(object, exp){

            if (object){
                if (object.address == exp.address){ /// for me
                    object.addRelation(exp.vsaddress, 'blocking')
                }
               
                if (object.address == exp.vsaddress){ /// for me
                    //object.addRelation(exp.vsaddress, 'blocking')
                }
            }

            return object
        }
    }

    self.unblocking = {
        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                this.applyAction(objects['userInfoFull'][address], exp)
                this.applyAction(objects['userInfoFull'][exp.vsaddress], exp)
            }
        },
        applyAction : function(object, exp){

            if (object){
                if (object.address == exp.address){ /// for me
                    object.removeRelation(exp.vsaddress, 'blocking')
                }
               
                if (object.address == exp.vsaddress){ /// for me
                }
            }

            return object
        }
    }

    self.subscribe = {
        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                this.applyAction(objects['userInfoFull'][address], exp)
                this.applyAction(objects['userInfoFull'][exp.vsaddress], exp)
            }
        },
        applyAction : function(object, exp){

            if (object){
                if (object.address == exp.address){ /// for me
                    object.addRelation({
                        adddress : exp.vsaddress
                    })
                }
               
                if (object.address == exp.vsaddress){
                    object.addRelation(object.address, 'subscribers')
                    
                    
                    //object.addRelation(exp.vsaddress, 'blocking')
                }
            }

            return object
        }
    }

    self.subscribePrivate = {
        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                this.applyAction(objects['userInfoFull'][address], exp)
                this.applyAction(objects['userInfoFull'][exp.vsaddress], exp)
            }
        },
        applyAction : function(object, exp){

            if (object){
                if (object.address == exp.address){ /// for me
                    object.addRelation({
                        adddress : exp.vsaddress,
                        private : true
                    })
                }
               
                if (object.address == exp.vsaddress){
                    object.addRelation(object.address, 'subscribers')
                    
                    
                    //object.addRelation(exp.vsaddress, 'blocking')
                }
            }

            return object
        }
    }

    self.unsubscribe = {
        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                this.applyAction(objects['userInfoFull'][address], exp)
                this.applyAction(objects['userInfoFull'][exp.vsaddress], exp)
            }
        },
        applyAction : function(object, exp){

            if (object){
                if (object.address == exp.address){ /// for me
                    object.removeRelation({
                        adddress : exp.vsaddress
                    })
                }
               
                if (object.address == exp.vsaddress){
                    object.removeRelation(object.address, 'subscribers')
                    
                    
                    //object.addRelation(exp.vsaddress, 'blocking')
                }
            }

            return object
        }
    }

    self.contentDelete = {
        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                objects['share'][exp.txidEdit] = this.applyAction(objects['share'][exp.txidEdit], exp)
            }
        },
        applyAction : function(share, exp){

            if (share){
                if (share.txid == exp.txidEdit){ /// for me
                    share.deleted = true
                }
            }

            return share
        }
    }

    self.upvoteShare = {
        listener : function(action, address, status){
            if (status == 'completed'){

                var exp = action.get()

                objects['share'][exp.share] = this.applyAction(objects['share'][exp.share], exp)
            }
        },
        applyAction : function(share, exp){

            if (share){
                if (share.txid == exp.share && exp.address == app.user.address.value){ /// for me
                    share.myVal = Number(exp.value)
                }
            }

            return share
        }
    }

    self.myScore = {
        keys : ['myScore'],

        load : function(shareIds, commentIds, update){

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
                            key : id,
                            data : _.find(data, (v) => {
                                return id == (v.posttxid || v.cmntid)
                            }) || {}
                        }
                    })

                    return _.map(data, (v) => {
                        return {
                            key : v.posttxid || v.cmntid,
                            data : v
                        }
                    })
                   
                })

            }, {
                update, 
                transform : (v) => this.transform(v),
                indexedDb : 'myScore',
                fallbackIndexedDB : 'myScoreFB'
            })
        },

        transform : function({key, data}){
            if(data.posttxid){
                if (objects.share[data.posttxid]){
                    objects.share[data.posttxid].myVal = Number(data.value)
                }
            }

            if(data.cmntid){
                if (objects.comment[data.cmntid] && data.myScore){
                    objects.comment[data.cmntid].myScore = Number(data.myScore)
                }
            }

            return data
        }   
    }

    self.share = {
        keys : ['share'],

        request : function(executor, hash){
            return request('share', hash, executor, {
                requestIndexedDb : 'shareRequest',

                insertFromResponse : (r) => this.insertFromResponseEx(r)
            })
        },

        insertFromResponseEx : function(response){

            self.userInfo.insertFromResponse(response.users, true)

            app.platform.sdk.videos.getVideoResponse(response.videos)

            return this.insertFromResponse(response.contents)
        },

        insertFromResponse : function(data){
            var result = _.map(data, (r) => {

                if(!r) return null

                return {
                    key : r.txid,
                    data : r
                }
            })

            var indexedDb = 'share'
            var key = 'share'
            
            return settodb(indexedDb, result).then(() => {

                var filtered = []

                _.each(result, (r) => {

                    if (r && r.key && r.data){
                        storage[key][r.key] = r.data
                        filtered.push(r)
                    }
    
                    var object = this.transform(r)


                    if (object){
                        objects[key][r.key] = object

                        checkObjectInActions([object])
                    }
    
                })

                return filtered

            })

        },

        transform : function({key, data : share}){

            if (share.userprofile){
                self.userInfo.insertFromResponse([share.userprofile], true)
            }

            if(share.lastComment){
                self.comment.insertFromResponse([share.lastComment])
            }

            var s = new pShare();
                s._import(share);

            if (share.ranks){
                s.info = share.ranks
            }
            else
            {

                if(
                    share.BOOST || share.DPOST ||
                    share.DREP || share.LAST5 ||
                    share.LAST5 || share.LAST5R ||
                    share.POSTRF || share.PREP ||
                    share.PREPR || share.UREP
                )
                    s.info = {
                        BOOST : share.BOOST,
                        DPOST : share.DPOST,
                        DREP : share.DREP,
                        LAST5 : share.LAST5,
                        LAST5R : share.LAST5R,
                        POSTRF : share.POSTRF,
                        PREP : share.PREP,
                        PREPR : share.PREPR,
                        UREP : share.UREP,
                        UREPR : share.UREPR,
                    }
            }

            if (s.lastComment){
                s.lastComment = objects.comment[s.lastComment.id]
            }


            //deleted, likes temp

            return s
        },

        gets : function(ids){
            return _.filter(_.map(ids, s => this.get(s)), s => s)
        },

        get : function(id){
            return this.tempExtend(id ? (objects.share[id] || null) : null, id)
        },

        load : function(txids, update){

            return loadList('share', txids, (txids) => {

                return api.rpc('getrawtransactionwithmessagebyid', [txids]).then(d => {

                    if (d && !_.isArray(d)) d = [d];

                    d = _.sortBy(d, (share) => _.indexOf(txids, share.txid))

                    d = _.filter(d || [], (s) => s.address)

                    checkObjectInActions(d)

                    return _.map(d || [], (info) => {
                        return { 
                            key : info.txid,
                            data : info
                        }
                    })

                })
            }, {
                queue : true,
                transform : (r) => this.transform(r),
                update,
                indexedDb : 'share',
            })
        },

        listener : function(action, status){

            if (status == 'completed'){
                clearallfromdb('shareRequest')
                clearfromdb('share', [action.txid])

                var exp = action.get()

                objects['share'][action.txid] = this.applyAction(objects['userInfoFull'][action.txid], exp)
            }
        },


        applyAction : function(object, exp){

            if (exp.txidEdit){

                if(!object) return

                if(exp.txidEdit == object.txid){
                    object.message = exp.message
                    object.caption = exp.caption
                    object.tags = exp.tags
                    object.url = exp.url
                    object.language = exp.language
                    object.repost = exp.repost
                    object.settings = _.clone(exp.settings)
                    object.edit = true
                    object.txidEdit = exp.txidEdit
    
                    object.temp = exp.temp
                    object.relay = exp.relay   
                }

                         
            
            }

            else{

            }

            /*
            object.temp = exp.temp
                object.relay = exp.relay
            
            
            */
       
            return object
        },

        tempExtend : function(object, txid){

            var extendedObject = null

            _.each(actions.getAccounts(), (account) => {

                var temps = ['share', 'upvoteShare', 'comment', 'contentDelete', 'cScore']

                _.each(temps, (k) => {

                    _.each(account.getTempActions(k), (action) => {

                        if (!object && action.txid == txid){
                            extendedObject = action
                        }
                        else{

                            if (self[k] && self[k].applyAction){

                                var applied = self[k].applyAction(extendedObject || object.clone(), action)
    
                                if (applied) extendedObject = applied
                            }

                        }

                        
                    })

                })
            
            })

            return extendedObject || object || null

        },

        tempAdd : function(objects, filter){

            _.each(actions.getAccounts(), (account) => {
                var actions = account.getTempActions('share', filter)

                _.each(actions, (a) => {
                    objects.unshift(a)
                })
            })

            return objects
            
        }
    }

    self.userState = {
        keys : ['userState'],
        
        load : function(addresses, update){

            return loadList('userState', addresses, (addresses) => {

                return api.rpc('getuserstate', [(addresses).join(',')]).then((d) => {
                    if (d && !_.isArray(d)) d = [d] /// check responce

                    return _.map(d || [], (info) => {
                        return { 
                            key : info.address,
                            data : info
                        }
                    })

                }).catch(e => {

                    if(e && e.code == -5){
                        ///// userstate hack
                        return Promise.resolve(_.map(addresses, (address) => {
                            return {
                                key : address,
                                data : null //{}
                            }
                        }))
                    }

                    return Promise.reject(e)
                })

            }, { 
                update,
                indexedDb : 'userState',
                fallbackIndexedDB : 'userStateFB',
            })

        },

        get : function(address){
            return storage['userState'][address]
        },

        getmy : function(){
            return app.user.address.value ? this.get(app.user.address.value) : null
        },

        changeLimits : function(address, limit, value){
            var state = this.get(address);

            if (state){
                state[limit + "_spent"] = (state[limit + "_spent"] || 0) + value
                state[limit + "_unspent"] = (state[limit + "_unspent"] || 1) - value
            }
        },

        change : function(address, state){
            this.clear.all('userState', address)

            storage['userState'][address] = state
        }
    }
    
    self.transaction = {
        keys : ['transaction'],
        load : function(id, update){

            return loadone('transaction', id, (ids) => {
                return api.rpc('getrawtransaction', [ids[0], 1]).then(d => {

                    if(!d.confirmations) {
                        d.confirmations = 0

                        if(d.height) {
                            app.platform.currentBlock ? (d.confirmations = Math.max(app.platform.currentBlock - d.height, 0)) : null
                        } else {
                            app.platform.currentBlock ? (d.height = app.platform.currentBlock) : null
                        }
                    }

                    return [{
                        key : ids[0],
                        data : d
                    }]

                })
            }, {
                update
            })

            
        }
    }

    self.accSet = {
        keys : ['accSet'],
        load : function(address, update){

            return loadone('accSet', address, (ids) => {
                return api.rpc('getaccountsetting', [ids[0]]).then(d => {

                    var setting = {}

                    try{
                        setting = JSON.parse(d || "{}")
                    }
                    catch(e) {
                        
                    }
                
                    return [{
                        key : ids[0],
                        data : setting
                    }]

                })
            }, {
                update,
                indexedDb : 'accSet',
            })

        },


        get : function(address){
            return storage.accSet[address] || {}
        }

    }

    self.tag = {
        keys : ['tag'],
        request : function(executor, hash){
            return request('tag', hash, executor, {
                requestIndexedDb : 'tagRequest',

                transformResult : (r) => this.transformResult(r)
            })
        }, 

        transformResult : function(data){

            return _.filter(_.map(data, (tg) => {

                var t = null

                try{
                    t = {
                        count : tg.count,
                        tag : clearTagString(trim(decodeURIComponent(decodeURIComponent(tg.tag))))
                    }
                }catch(e){
                    console.log(tg, e)
                }

                return t
                
            }), (t) => {return t})


        }
    }
    
    self.clear = {
        storage : function(k, key){
            var keys = self[k]?.keys || []

            _.each(keys, (k) => {
                delete storage[k][key]
            })
        },

        db : function(k, key){
            var keys = self[k]?.keys || []

            _.each(keys, (k) => {

                if (key){
                    clearfromdb(k, [key])
                    clearfromdb(k + 'FB', [key])
                }
                
                clearallfromdb(k + 'Request')
            })
        },

        all : function(k, key){
            this.storage(k, key)
            this.db(k, key)
        }
    }

    


    _.each(self, (v) => {
        if(v && _.isObject(v) && v.keys){
            _.each(v.keys, (i) => {
                prepareStorage(i)
            })
        }
    })


    var interval = setInterval(() => {
        processingAll()
    }, 30)


    self.actions.on('actionFiltered', ({action, address, status}) => {

        var listener = self[action.object.type]?.listener

        if(!listener) return

        if (address == app.user.address.value){

            var alias = action.get()

            listener(alias, address, status)


            if (status == 'completed' && action.object.ustate) {

                var ustate = typeof alias.ustate == 'function' ? alias.ustate() : alias.ustate;

                if (ustate) self.userState.changeLimits(address, ustate, 1)

            }

        }
    })

    return self
}

if(typeof module != "undefined"){ module.exports = {pSDK}; } 
else { window.pSDK = pSDK;}