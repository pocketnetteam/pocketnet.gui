
var electron = null

if (typeof _Electron != 'undefined') {
    electron = require('electron');
}

var ProxyRequest = function(app = {}){
    var self = this

    var sign = function(data){
        var signature = null

        if (app.user && app.user.getstate() == 1){
            try{ signature = app.user.signature() } catch(e){}
        }

        if (signature){ data.signature = signature }

        return data
    }

    var direct = function(url, data){

        if(!data) 
            data = {}

        return fetch(url, {

            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(sign(data))

        }).then(r => {
            return r.json()

        }).then(result => {
            return Promise.resolve(result.data || {})
        }).catch(e => {
            return Promise.reject(e)
        })
    }

    self.rpc = function(url, method, parameters, options){

        if(!method) return Promise.reject('method')

        var data = {}

            data.parameters = parameters || []
            data.method = method

            if (options)
                data.options = options

        return direct(url + '/rpc/' + method, data)

    }

    self.fetch = function(url, path, data){
        return direct(url + '/' + path, data)
    }

    return self
}

var Node = function(meta, app/*, proxy ??*/){
    var self = this

    self.host = meta.host || ""
    self.port = meta.port || 0
    self.wss = meta.wss || 0

    self.id = self.host + ":" + self.port + ":" + self.wss

    return self
}

var Proxy16 = function(meta, app){
    var self = this
    var request = new ProxyRequest(app)

    self.system = new System16(app, self, meta.direct)

    self.host = meta.host || ""
    self.port = meta.port || 0
    self.wss = meta.wss || 0
    self.direct = meta.direct
    self.user = meta.user || false

    self.current = null //current node

    self.id = self.host + ":" + self.port + ":" + self.wss
    self.enabled = true

    nodes = []

    var state = {
        hash : [],
        tick : {}
    }

    var internal = {
        node : {

            manage : {
                addlist : function(metas){
                    _.each(metas, meta => { this.add(meta) })
                },
                add : function(meta){
                    var node = new Node(meta, app)
                    nodes.push(node)
                }
            }
        }
    }

    self.changeNode = function(node){

        if (node){
            self.current = node

            return true
        }
        
    }

    self.export = function(){
        return {
            host : self.host,
            port : self.port,
            wss : self.wss,
            user : self.user
        }
    }

    self.changed = function(settings){

        var reconnectws = false;

        if (settings.ports || settings.host){
            if((settings.ports || {}).https){
                self.port = settings.ports.https
            }

            if((settings.ports || {}).wss){
                self.wss = settings.ports.wss
                reconnectws = true
            }

            if(settings.host){
                self.host = settings.host
                reconnectws = true
            }

            var lastid = self.id 

            self.id = self.host + ":" + self.port + ":" + self.wss

            var currentapi = app.api.get.currentstring()

            console.log('editinsaved, ', lastid)

            app.api.editinsaved(lastid, self)

            if (currentapi == lastid){
                app.api.set.current(self.id, reconnectws)
            }
        }

        if (typeof settings.enabled != 'undefined'){
            self.enabled = settings.enabled
        }

        if (settings.ssl){
            reconnectws = true
        }

        if (settings.firebase){

        }


        _.each(self.clbks.changed, function(c){
            c(settings)
        })

        return reconnectws
    }

    self.api = {
        ping : () => {
            return self.fetch('ping').then(r => {

                self.ping = new Date()

                return Promise.resolve(r)
            })
        },
        nodes : {

            select : function(){
                return self.fetch('nodes/select').then(r => {

                    self.current = r.node

                    return Promise.resolve(r)
                })
            },
            get : () => {
                return self.fetch('nodes/get').then(r => {
                    internal.node.manage.addlist(r.nodes)

                    return Promise.resolve(r)
                })
            },

            addlist : function(metas){
                _.each(metas, meta => { this.add(meta) })
            },

            add : function(meta){
                var node = new Node(meta, app)

                if(!this.find(node.id)){
                    nodes.push(node)
                }
                
            },

            find : function(id){
                return _.find(nodes, node => node.id == id)
            }
        }
    }

    self.url = {
        https : () => {return "https://" + self.host + ":" + self.port},
        wss : () => {return "wss://" + self.host + ":" + self.wss}
    }

    self.rpc = function(method, parameters, options){

        if(!options) options = {}

        if (self.current){
            options.node = self.current.key
        }

        var promise = null

        if (self.direct){
            promise = self.system.rpc(method, parameters, options)
        }
        else{
            promise = request.rpc(self.url.https(), method, parameters, options)
        }

        return promise.then(r => {
            return Promise.resolve(r)
        })
    }

    self.fetch = function(path, data){

        if(self.direct){
            promise = self.system.fetch(path, data)
        }
        else{
            promise = request.fetch(self.url.https(), path, data)
        }

        return promise.then(r => {
            return Promise.resolve(r)
        })
       
    }

    self.get = {
        nodes : () => nodes,

        name : function(){
            if(self.direct) return 'Electron Proxy'

            else return self.url.https()
        },

        info : function(){
            return self.fetch('info')
        },

        stats : function(){
            return self.fetch('stats')
        }
    }

    self.valid = function(){
        return self.host && self.port && self.wss
    }

    self.init = function(){

        if (self.direct) {
            self.system.listen()
        }

        self.system.clbks.tick.proxy = function(settings, proxystate){

            if(!proxystate) return


            var hash = bitcoin.crypto.hash256(JSON.stringify(proxystate))

            var change = (hash.join('') !== state.hash.join(''))

            state.hash = hash
            state.tick = proxystate

            _.each(self.clbks.tick, (c) => { c(state.tick, change) })

        }

        return self.refreshNodes()
    }

    self.refreshNodes = function(){
        return self.api.nodes.get().then(r => {

            return self.api.nodes.select()

        }).catch(e => {
            return Promise.resolve()
        })
    }

    self.destroy = function(){

        if(self.direct) self.system.stop()

        nodes = []
    }

    self.clbks = {
        tick : {},
        changed : {}
    }

    return self
}

var Api = function(app){
    var self = this

    var proxies = [];
    var nodes = []

    var current = null // 'localhost:8888:8088' //null;///'pocketnet.app:8899:8099'
    var useproxy = true;

    var getproxyas = function(key){

        if(!key){
            key = current
        }

        if(_.isObject(key)) return key

        var proxy = _.find(proxies, function(p){
            return p.id == key
        })

        return proxy
    }

    var getproxy = function(key){

        var proxy = getproxyas()

        return proxy ? Promise.resolve(proxy) : Promise.reject('proxy')
    }

    self.addproxy = function(meta){
        var lsproxies = JSON.parse(localStorage['listofproxies'] || "[]")

        var proxy = internal.proxy.manage.add(meta)

        if (proxy){

            lsproxies.push(meta)

            internal.proxy.manage.savelist(lsproxies)

            return proxy
        }
    }

    self.removeproxy = function(key){
        var lsproxies = JSON.parse(localStorage['listofproxies'] || "[]")

            lsproxies = _.filter(lsproxies, function(meta){
                var proxy = new Proxy16(meta, app)

                if(proxy.id == key) return false

                return true
            })

            proxies = _.filter(proxies, function(proxy){
                if(proxy.id != key || proxy.direct) return true

                else{
                    proxy.destroy()
                }
            })

        if(current == key && proxies.length) current = proxies[0].id

        internal.proxy.manage.savelist(lsproxies)
    }

    self.editinsaved = function(key, proxy){
        var lsproxies = JSON.parse(localStorage['listofproxies'] || "[]")

        var proxyinlist = _.find(lsproxies, function(p){

            var id = p.host + ":" + p.port + ":" + p.wss

            return id == key
        })


        if (proxyinlist){
            proxyinlist.host = proxy.host
            proxyinlist.port = proxy.port
            proxyinlist.wss = proxy.wss

            internal.proxy.manage.savelist(lsproxies)
        }
    }

    self.editproxy = function(key, meta){
        
        var proxy = self.get.byid(key)

        proxy.changed({
            host : meta.host,
            ports : {
                https : meta.port,
                wss : meta.wss
            }
        })

        return proxy
        
    }

    var internal = {
        api : {
            manage : {

            },
        },
        proxy : {

            manage : {
                savelist : function(lsproxies){
                    localStorage['listofproxies'] = JSON.stringify(lsproxies || [])
                },  
                init : function(){

                    return this.addlocalelectronproxy().then(r => {

                        this.addlist(deep(app, 'options.listofproxies') || [])
                    
                        try{ this.addlist(JSON.parse(localStorage['listofproxies'] || "[]")) }
                        catch(e){}

                        return Promise.resolve()

                    }).then(r => {

                        var oldc = localStorage['currentproxy']

                        if (oldc){
                            return self.set.current(oldc)
                        }

                        return Promise.resolve()

                    }).catch(e => {

                        return Promise.resolve()

                    }).then(() => {

                        if(!current && proxies.length){
                            current = proxies[0].id
                        }

                        return Promise.resolve()

                    })

                },
                addlocalelectronproxy : function(){
                    if (electron){

                        var esystem = new System16(app, null, true)

                            esystem.listen()

                        return esystem.request('get.settings').then(settings => {

                            esystem.stop()

                            this.add({
                                direct : true,
                                host : 'localhost',
                                port : deep(settings, 'server.ports.https') || 0,
                                wss : deep(settings, 'server.ports.wss') || 0,
                            })

                            return Promise.resolve()

                        })
                    }

                    else{
                        return Promise.resolve()
                    }
                },
                addlist : function(metas){
                    _.each(metas, meta => { this.add(meta) })
                },
                add : function(meta){
                    var proxy = new Proxy16(meta, app)

                    if(!this.find(proxy.id) && (proxy.valid() || proxy.direct)){
                        proxies.push(proxy)
                        proxy.init()

                        return proxy
                    }
                    
                },

                find : function(id){
                    return _.find(proxies, proxy => proxy.id == id)
                }
            },

            api : {
                ping : function(proxies){
                    var promises = _.map(proxies, proxy => {
                        return proxy.api.ping().catch(e => {})
                    })
        
                    return Promise.all(promises)
                },
            }
        }
    }

    self.rpc = function(method, parameters, options){

        if(!method) return Promise.reject('method')

        if(!options) 
            options = {}

        return getproxy(options.proxy).then(proxy => {

            return proxy.rpc(method, parameters, options.rpc)

        })


    }

    self.fetch = function(path, data, options){

        if(!useproxy) return Promise.reject('useproxy')

        if(!options) 
            options = {}

        return getproxy(options.proxy).then(proxy => {

            return proxy.fetch(path, data)

        })
    }

    self.ready = {
        proxies : () => {
            return _.filter(proxies, proxy => { return proxy.ping })
        },

        use : () => {
            return useproxy ? _.filter(proxies, proxy => { return proxy.ping && proxy.get.nodes().length }).length : false
        },
    }

    self.wait = {
        ready : function(key, total){

            if(!key) key = 'use'

            return pretry(self.ready[key], 50, total)
        }
    }

    self.set = {
        current : function(ncurrent, reconnectws){

            var proxy = self.get.byid(ncurrent)

            if(!proxy) return Promise.reject('hasnt')

            current = ncurrent

            localStorage['currentproxy'] = current

            return proxy.fetch('use').catch(e => {}).then(r => {

                

                if (reconnectws)
                    app.platform.ws.reconnect()

                if(r.refresh){
                    return proxy.refreshNodes()
                }
                else
                    return Promise.resolve()
            })
        }
    }

    self.get = {
        currentwss : function(){
            return getproxy().then(proxy => {

                if(proxy.direct){
                    return {
                        dummy : proxy.system.wssdummy,
                        proxy : proxy
                    }
                }

                return {
                    url : proxy.url.wss(),
                    proxy : proxy
                }
            })
        },
        proxies : function(){
            return proxies
        },
        current : function(){
            return getproxyas()
        },

        currentstring : function(){
            return current
        },

        byid : function(id){
            return _.find(proxies, function(proxy){
                return proxy.id == id
            })
        }
    }

    self.init = function(){

        return internal.proxy.manage.init().then(r => {
            internal.proxy.api.ping(proxies);

            return Promise.resolve()
        })

        

    }

    self.destroy = function(){
        proxies = []
    }

    

    return self
}   

if(typeof module != "undefined"){ module.exports = {Api, ProxyRequest, Proxy}; } 
else { window.Api = Api; window.ProxyRequest = ProxyRequest; window.Proxy = Proxy }