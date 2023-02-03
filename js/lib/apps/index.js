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

    var install = function(application){

        if (installing[application.id]) return installing[application.id]

        var promises = []
        var result = {}

        if (application.develop){
            application.path = 'apps/_develop/' + application.id + '/b_manifest.json'
        }
        else{   
            application.path = application.scope + '/b_manifest.json'
        }
      
        promises.push(importManifest(application).then((manifest) => {
            result.manifest = manifest
        }))

        promises.push(importIcon(application).then((icon) => {
            result.icon = icon
        }))
        

        installing[application.id] = Promise.all(promises).then(() => {

            installed[application.id] = result

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

        _.each(localdata)
    }

    var setlocaldata = function(data){
        var newlocaldata = {}

        try{
            newlocaldata = JSON.parse(data)
        }catch(e){

        }

        localdata = newlocaldata
    }

    self.init = function(){

        var promises = []

        if (app.developapps){

            promises.push(Promise.all(_.map(app.developapps, (application) => {
                return install({...application, develop : true, version : numfromreleasestring(application.version)})
            })))

        }

        try{
            setlocaldata(localStorage['apps'])
        }catch(e){

        }

        app.platform.sdk.syncStorage.on('change', 'apps', function(e){

            if(e.newValue == e.oldValue) return

            setlocaldata(e.newValue)

        });

        return Promise.all(promises).catch(e => {
            console.error(e)

            return Promise.reject(e)
        })
    }

    return self
}

if(typeof module != "undefined"){ module.exports = {BastyonApps}; } 
else { window.BastyonApps = BastyonApps; }