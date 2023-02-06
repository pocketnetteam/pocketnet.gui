var appsError = function(e){

    var error = new Error(e)

    if (e == 'broken:permissions') 
        error.tip = 'example: ["userinfo", "notifications", "messaging", "payment", "sign", "camera", "gallery"]'

    return error
}

var parseManifest = function(json){
    var data = {}
    var result = {}

    try{
        data = JSON.parse(json)
    }
    catch(e){
        throw appsError('broken:manifest')
    }

    result.id = data.id.replace(/[^a-z0-9\.]/g, '')
    result.name = data.name.replace(/[^\p{L}\p{N}\p{Z}]/gu, '')
    result.version = numfromreleasestring(data.version)
    result.description = data.description
    result.author = data.author
    result.develop = data.develop == false ? false : true
    result.scope = data.scope
    result.permissions = _.map(data.permissions || [], (p) => {return p.replace(/[^a-z0-9\.]/g, '')})


    var brokenPermissions = _.find(result.permissions, (p) => {!p})
    if (brokenPermissions) throw appsError('broken:permissions')

    if(!result.id) throw appsError('missing:id')
    if(!result.name) throw appsError('missing:name')
    if(!result.version) throw appsError('missing:version')
    if(!result.description) throw appsError('missing:description')
    if(!result.scope) throw appsError('missing:scope')

    

    try{
        bitcoin.address.fromBase58Check(result.author)
    }catch(e){
        throw appsError('broken:author')
    }
    
    return result
}

var importFile = function(application, path){
    return simpleRequest(application.path + '/' + path, path)
}

var importFileAsBase64 = function(application, path){
    return fetchLocalAppCopy(application.path + '/' + path, path).then(d => {
        return getBase64(d.data)
    })
}

var importIcon = function(application){
    return importFileAsBase64(application, 'b_icon.png').then((png) => {
        return Promise.resolve(png)
    }).catch(() => {
        return Promise.reject(appsError('import:icon'))
    })
}

var importManifest = function(application){

    return importFile(application, 'b_manifest.json').then((manifest) => {

        try{
            manifest = parseManifest(manifest)
        }
        catch(e){
            return Promise.reject(e)
        }

        if(manifest.id != application.id) return Promise.reject(appsError('discrepancy:id'))
        if(manifest.develop != application.develop) return Promise.reject(appsError('discrepancy:develop'))
        if(manifest.version < application.version) return Promise.reject(appsError('version'))


        if (application.develop) {
            manifest.scope = application.path
        }
        else
            manifest.scope = 'https://' + manifest.scope

        return Promise.resolve(manifest)
        
    }).catch((e) => {
        console.error(e)

        return Promise.reject(appsError('import:manifest'))
    })
}

var validateParameters = function(data, parameters){
    var e = _.find(parameters, (p) => {
        if(!data[p]) return true
    })

    if(!e) return null

    return appsError('parameters:missing:' + e)


}

var BastyonApps = function(app){
    var self = this
    var installed = {}
    var installing = {}
    var localdata = {}
    var windows = {}
    var clbks = {}

    var key = app.user.address.value || ''

    var permissions = {
        'account' : {
            name : 'permissions.name.account',
            description : 'permissions.descriptions.account',
            level : 9
        },

        'sign' : {
            name : 'permissions.name.account',
            description : 'permissions.descriptions.account',
            level : 1,
            uniq : true
        },

        'payment' : {
            name : 'permissions.name.payment',
            description : 'permissions.descriptions.payment',
            level : 2,
            uniq : true
        }
    }

    var actions = {
        rpc : {
            parameters : ['method', 'parameters'],
            action : function({data, application}){
                return app.api.rpc(data.method, data.parameters)
            }
        },

        account : {
            permissions : ['account'],
            action : function({data, application}){
                return Promise.resolve(app.user.address.value)
            }
        },

        balance : {
            permissions : ['account'],
            action : function(){
                var account = self.platform.actions.getCurrentAccount()

                if (account){
                    var balance = account.actualBalance([account.address])
                    return Promise.resolve(balance)
                }
                else{
                    return Promise.resolve({})
                }
            }
        },

        sign : {
            permissions : ['sign'],
            action : function({data, application}){
                return Promise.reject(appsError('todo:action:sign'))
            }
        },

        payment : {
            parameters : ['recievers', 'feemode', 'message'],
            permissions : ['payment'],
            action : function({data, application}){

                var source = [app.user.address.value];

                var transaction = new Transaction()
				
					transaction.source.set(source)
					transaction.reciever.set(data.recievers)
					transaction.feemode.set(data.feemode)

                if (data.message)
					transaction.message.set(data.message)

                return makeAction(transaction, application)

            }
        },

        getaction : {
            parameters : ['id'],
            action : function({data, application}){
                var action = app.platform.actions.getActionById(data.id)

                if(!action){
                    return Promise.resolve(null)
                }

                return action.export()
            }
        }

    }

    var makeAction = function(data, application){
        return app.platform.actions.addActionAndSendIfCan(data, null, null, {
            application : application.manifest.id
        }).then(action => {

            return Promise.resolve(action)

        }).catch(e => {

            Promise.reject(appsError(e))

        })
    }

    var emitters = {
        block : {
        },

        state : {

        },

        balance : {
            permissions : ['account']
        },

        test : {

        }
    }

    var events = {
        popstate : function(application, data, source){
            var value = hexEncode(application.manifest.id + ':' + data.value)

            trigger('popstate', {

                application : application.manifest.id,
                data : {
                    value : value,
                    encoded : hexEncode(data.value)
                }
                
            }, source)
        },

        loaded : function(application, data, source){
            trigger('loaded', {
                application : application.manifest.id,
                data
            }, source)
        }
    }

    var trigger = function(key, data, source){
        _.each(clbks[key] || [], (f) => {
            f(data, source)
        })
    }

    var listening = {
        
    }

    var appfiles = [
        {
            name : 'b_manifest.json',
            id : "manifest",
            type : "application/json",
            importer : importManifest,
            cache : true
        },

        {
            name : 'b_icon.png',
            id : "icon",
            type : 'image/png',
            importer : importIcon,
            cache : true
        },
        
    ]

    var registerLocal = function(application){
        if(!localdata[application.id]) {

            localdata[application.id] = {
                permissions : [],
                data : {},
                cached : {}
            }

            savelocaldata()
        }
            
    }

    var install = function(application, cached = {}){

        if (installed[application.id]) return Promise.resolve(installed[application.id])

        if (installing[application.id]) return installing[application.id]

        var promises = []
        var result = {
            fromcache : {}
        }


        if (application.develop){
            application.path = application.scope ? ('https://' + application.scope) : ('https://' + application.id + '.localhost/pocketnet/apps/_develop/' + application.id)
        }
        else{   
            application.path = 'https://' + application.scope
        }

        promises = promises.concat(Promise.all(_.map(appfiles, (file) => {

            return new Promise((resolve, reject) => {

                if(file.cache && cached[file.id]){
                    result[file.id] = cached[file.id]
                    result.fromcache[file.id] = true
                    resolve()
                }
                else{
                    file.importer(application).then(data => {
                        result[file.id] = data
    
                        delete result.fromcache[file.id]

                        resolve()
                    }).catch(reject)
                }
            })

            
            
        })))

        installing[application.id] = Promise.all(promises).then(() => {

            console.log("INSTALLED")

            installed[application.id] = result

            registerLocal(application)

            return installed[application.id]

        }).finally(() => {
            delete installing[application.id]
        })

        return installing[application.id]
    }

    var remove = function(id){

        delete localdata[id]
        delete installed[id]

        return Promise.resolve()
    }

    var savelocaldata = function(){
        var tosave = {}

        _.each(localdata, (info, id) => {

            var saving = {
                id,
                cached : {},
                permissions : info.permissions,
                data : info.data
            }

            _.each(appfiles, (file) => {
                if(file.cache){
                    saving.cached[file.id] = (installed[id] ? installed[id][file.id] : null) || info.cached[file.id] || null
                }
            })

            tosave[id] = saving
        })

        try{
            localStorage['apps_' + key] = JSON.stringify(tosave)
        }catch(e){

        }
        
    }

    var unregisterApplication = function(application){
        delete windows[application.manifest.id]
        delete listening[application.manifest.id]
    }

    var listener = function(event){

        var application = _.find(installed, (application) => {
            return application.manifest.scope.indexOf(event.origin) == 0
        })

        if(!application) return

        windows[application.manifest.id] = event.source

        var data = event.data || {}
        var promise = null

        if(!data.data) data.data = {}

        if (data.action){

            if(!actions[data.action]){
                promise = Promise.reject(appsError('missing:action in actions'))
            }

            else{   

                promise = requestPermissions(application, actions[data.action].permissions || [], data.data).then(() => {

                    var error = validateParameters(data.data, actions[data.action].parameters)

                    console.log('error', error)

                    if (error) return Promise.reject(error)

                    return actions[data.action].action({
                        data : data.data,
                        application
                    })
                })

            }
            
        }

        if (data.listener){

            listening[application.manifest.id] = data.listener

            promise = Promise.resolve('registered')
            
            //Promise.reject(appsError('todo:listeners'))
        }

        if (data.event){
            if (events[data.event]){
                events[data.event](application, data, event.source)
            }
        }

        if(!promise) return

        return promise.then((result) => {

            if (data.id){

                var response = {
                    response : data.id,
                    data : result
                }

                send(response, application)
            }

        }).catch(e => {

            if (data.id){

                var response = {
                    response : data.id,
                    error : e
                }

                send(response, application)
            }
        })
    }

    var requestPermissionForm = function(application, permission, data){


        var meta = permissions[permission]

        return app.platform.ui.requestPermission({application, meta, permission, data}).then((reason) => {
            return Promise.resolve(reason)
        }).catch(reason => {

            if (reason == 'error'){
                return Promise.reject(appsError('permission:requestform:error'))
            }

            return Promise.resolve(reason)
        })

      
    }

    var requestPermission = function(application, permission, data){
        if(checkPermission(application, permission)) return Promise.resolve()
        if(checkPermission(application, permission, 'forbid')) return Promise.reject(appsError('permission:denied:' + permission + '/forbid'))

        var meta = permissions[permission]
        var appdata = localdata[application.manifest.id]

        console.log('application:localdata', data)

        if(!appdata) return Promise.reject(appsError('error:code:appdata'))

        return requestPermissionForm(application, permission, data).then(state => {

            console.log('state', state)

            if(state == 'granted'){

                if(!meta.uniq){
                    appdata.permissions.push({
                        id : permission,
                        state
                    })

                    savelocaldata()
                }
        
                return Promise.resolve()
            }

            if (state == 'once'){
                ///maybe temp array
                return Promise.resolve()
            }

            if (state == 'forbid'){
                appdata.permissions.push({
                    id : permission,
                    state
                })

                savelocaldata()
            }

            return Promise.reject(appsError('permission:denied:' + permission + '/' + state))

        })

        ////resolve

        
        
    }

    var requestPermissions = function(application, permissions, data){

        return Promise.all(_.map(permissions, (permission) => {
            return requestPermission(application, permission, data)
        }))
        
    }

    var checkPermission = function(application, permission, state = 'granted'){
        var appdata = localdata[application.manifest.id]

        if(!appdata) return false

        return _.find(appdata.permissions, (_permission) => {
            return _permission.id == permission && _permission.state == state
        }) ? true : false
    }

    var emit = function(key, data, applicationId){

        var filteredListeners = listening

        if (applicationId){

            if(!listening[applicationId]) return

            filteredListeners = {}
            filteredListeners[applicationId] = listening[applicationId]
        }

        _.each(filteredListeners, (listener, id) => {
            var application = installed[id]

            if (application){

                var emitter = emitters[key]

                if(!emitter) return

                var notgranted = _.find(emitter.permissions || [], (permission) => {
                    if(!checkPermission(application, permission)){
                        return true
                    }
                })

                if (notgranted) return

                var message = {
                    listener,
                    key,
                    data
                }

                send(message, application)
            }
        })
        
    }

    var send = function(message, application){
        if(!application) return

        if(!windows[application.manifest.id]) return

        windows[application.manifest.id].window.postMessage(
            message, 
            application.manifest.scope
        )
    }

    var setlocaldata = function(data){
        var newlocaldata = {}

        try{
            newlocaldata = JSON.parse(data)
        }catch(e){

        }

        var removing = []
        var adding = []

        _.each(localdata, (info, id) => {
            if(!newlocaldata[id]) removing.push(id)
        })

        _.each(newlocaldata, (info, id) => {
            if(!localdata[id]) adding.push(info)
        })

        localdata = newlocaldata

        _.each(removing, (id) => {
            remove(id)
        })

        _.each(adding, (info => {

            return

            /// getapplication by info.id
            install(/* getapplication by info.id, */ info.cached).catch(e => {

            })
        }))

        
    }

    self.destroy = function(){
        window.removeEventListener("message", listener)
    }

    self.init = function(){

        var promises = []

        if (app.developapps){

            promises.push(Promise.all(_.map(app.developapps, (application) => {
                return install({...application, develop : true, version : numfromreleasestring(application.version)})
            })))

        }

        try{
            setlocaldata(localStorage['apps_' + key])
        }catch(e){

        }

        app.platform.sdk.syncStorage.on('change', 'apps', function(e){

            if(e.newValue == e.oldValue) return

            setlocaldata(e.newValue)

        });

        console.log("ININT")

        return Promise.all(promises).then(() => {
            
            console.log("application:EVENT LISTENER")
            window.addEventListener("message", listener)

        }).catch(e => {
            console.error(e)
            return Promise.reject(e)
        })
    }

    self.get = {
        application : function(id){
            if(installed[id]){
                return Promise.resolve({
                    application : installed[id],
                    appdata : localdata[id] || {}
                })
            }

            if (installing[id]){
                return installing[id].then(() => {

                    return Promise.resolve({
                        application : installed[id],
                        appdata : localdata[id] || {}
                    })

                }).catch(e => {
                    return Promise.resolve(null)
                })
            }
        }
    }

    self.on = function(key, action){
        if(!clbks[key]) clbks[key] = []

        clbks[key].push(action)
    }

    self.off = function(key, action){
        if(!clbks[key]) clbks[key] = []

        clbks[key] = clbks[key].filter((a) => {
            return a != action
        })
    }

    self.emit = emit

    return self
}

if(typeof module != "undefined"){ module.exports = {BastyonApps}; } 
else { window.BastyonApps = BastyonApps; }