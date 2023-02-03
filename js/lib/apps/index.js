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

    result.scope = 'https://' + result.scope

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

var importIcon = function(application){
    return importFile(application, 'b_icon.png').then(png => {
        console.log('png', png)

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

        return Promise.resolve(manifest)
        
    }).catch(() => {
        return Promise.reject(appsError('import:manifest'))
    })
}

var BastyonApps = function(app){
    var self = this
    var installed = {}
    var installing = {}
    var localdata = {}

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
        api : {
            parameters : ['method', 'parameters']
        },

        account : {
            permissions : ['account']
        },

        sign : {
            permissions : ['sign']
        }
    }

    var listeners = {
        account : {
            permissions : ['account']
        }
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

        if (installing[application.id]) return installing[application.id]

        var promises = []
        var result = {
            fromcache : {}
        }

        if (application.develop){
            application.path = 'apps/_develop/' + application.id
        }
        else{   
            application.path = application.scope
        }

        promises = promises.concat(_.map(appfiles, (file) => {

            if(file.cache && cached[file.id]){
                result[file.id] = cached[file.id]
                result.fromcache[file.id] = true
            }
            else{
                file.importer(application).then(data => {
                    result[file.id] = data

                    delete result.fromcache[file.id]
                })
            }
            
        }))

        installing[application.id] = Promise.all(promises).then(() => {

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

    var listener = function(event){

        var application = _.find(installed, (application) => {
            return event.origin.indexOf(application.manifest.scope) > -1
        })

        if(!application) return

        var data = event.data || {}
        var promise = null

        if(!data.data) data.data = {}

        if (data.action){

            if(!actions[data.action]){
                promise = Promise.reject(appsError('missing:action in actions'))
            }

            else{   
                promise = requestPermissions(application, actions[data.action].permissions || [], data.data).then(() => {

                })
            }
            
        }

        if (data.listener){
            promise = Promise.reject(appsError('todo:listeners'))
        }

        if(!promise) return
        

        return promise.then(() => {

            if (data.id){

                var response = {
                    response : data.id,
                    data : {}
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

        ///// FORM

        return Promise.resolve()
    }

    var requestPermission = function(application, permission, data){
        if(checkPermission(application, permission)) return Promise.resolve()

        var meta = permissions[permission]
        var appdata = localdata[application.id]
        var oncetime = false

        if(!appdata) return Promise.reject(appsError('error:code:appdata'))

        return requestPermissionForm(application, permission, data).then(status => {

            if(status == 'granted'){

                if(!meta.uniq || oncetime){
                    appdata.permissions.push(permission)
                }
        
                return Promise.resolve()
                
            }

            return Promise.reject(appsError('permission:denied:' + permission))

        }).catch(e => {
            console.error(e)

            return Promise.reject(appsError('error:code'))
        })

        ////resolve

        
        
    }

    var requestPermissions = function(application, permissions){

        return Promise.all(_.map(permissions, (permission) => {
            return requestPermission(application, permission)
        }))
        
    }

    var checkPermission = function(application, permission){
        var appdata = localdata[application.id]

        if(!appdata) return Promise.reject(appsError('error:code:appdata'))

        return _.find(appdata.permissions, (_permission) => {
            return _permission.id == permission && _permission.state == 'granted'
        }) ? true : false
    }

    var send = function(data, application, permission){
        if(!application) return

        if (permission) {
            if(!checkPermission(application, permission)) return
        }

        postMessage(data, application.manifest.scope)
    }

    var sends = function(data, applications){

        _.each(applications, (application) => {
            send(data, application)
        })

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

        return Promise.all(promises).catch(e => {
            console.error(e)

            window.addEventListener("message", listener)

            return Promise.reject(e)
        })
    }

    return self
}

if(typeof module != "undefined"){ module.exports = {BastyonApps}; } 
else { window.BastyonApps = BastyonApps; }