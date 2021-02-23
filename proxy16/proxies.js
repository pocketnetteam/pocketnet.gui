/*var hashFiles = require('hash-files');*/


var ProxyRequest = function(){
    var self = this

    var sign = function(data){
        var signature = null

        if (signature){ data.signature = signature }

        return data
    }
    
    var timeout = function (ms, promise, controller) {

        var cancelled = false

        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                if (controller){
                    controller.abort()
                }
            }, ms)
      
            promise.then(value => {

                clearTimeout(timer)
                resolve(value)

            }).catch(reason => {

                clearTimeout(timer)

                reject(reason)

            })
        })
    }

    var direct = function(url, data){
        var controller = (new AbortController())

        var time = 15000

        if (window.cordova){
            time = 35000
        }

        return timeout(time, directclear(url, data, controller.signal), controller)
    }

    var directclear = function(url, data, signal){

        if(!data) 
            data = {}

        var er = false

        return fetch(url, {

            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            signal : signal,
            body: JSON.stringify(sign(data))

        }).then(r => {

            if(!r.ok){
                er = true
            }

            return r.json()

        }).then(result => {

            if (er){
                return Promise.reject(result.error)
            }

            return Promise.resolve(result.data || {})
        }).catch(e => {


            if (e.code == 20){
                return Promise.reject({
                    code : 408
                })
                
            }

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

var Proxy16 = function(meta){
    var self = this
    var request = new ProxyRequest()

    self.host = meta.host || ""
    self.port = meta.port || 0
    self.wss = meta.wss || 0

    self.id = self.host + ":" + self.port + ":" + self.wss
    self.enabled = true
    self.current = null

    self.export = function(){
        return {
            host : self.host,
            port : self.port,
            wss : self.wss,
            user : self.user
        }
    }

    self.api = {
        ping : () => {
            return self.fetch('ping').then(r => {

                self.ping = new Date()

                return Promise.resolve(r)
            }).catch(e => {
                return Promise.reject(e)
            })
        },

        actualping : function(){

            var promise = null

            if(!self.ping || self.ping.addSeconds(5) < new Date){
                promise = self.api.ping()
            }
            else{
                promise = Promise.resolve(true)
            }

            return promise.catch(e => {
                return Promise.resolve(false)
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

        var promise = request.rpc(self.url.https(), method, parameters, options)

        return promise.then(r => {
            return Promise.resolve(r)
        }).catch(e => {
            return Promise.reject(e)
        })
    }


    self.fetch = function(path, data){

        var promise = null

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
            return self.url.https()
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

        self.destroy();

        return Promise.resolve()
    }

    self.destroy = function(){

        nodes = []
    }

    return self
}

var Proxies = function (settings, manage) {
    var self = this

    self.kit = {
        addlist : function(proxies){

        }
    }

    self.api = {
        ping : function(){

        }
    }

    self.init = function(){

    }


    self.hash = function(clbk){

        if(typeof hashFiles != 'undefined'){
            hashFiles({
                files : [
                    './lib/**', './node/**', './server/**', './wallet/**', 
                    './cli.js', './functions.js', './ipc.js', './kit.js', 
                    './package.js', './pocketnet.js', './proxies.js', 
                    './proxy.js', './remote.js'
                ]
            }, function(error, hash) {
                // hash will be a string if no error occurred

                if(clbk) clbk(hash)
            });

            return
        }

        if (clbk){
            clbk('1')
        }
    }

    return self
}

module.exports = Proxies