var electron = null

if (typeof _Electron != 'undefined') {
    electron = require('electron');
}

var WssDummy = function(system16){
	var self = this

	self.ip = 'localhost'

	self.onmessage = null
	self.onopen = null

	self.send = function(message){
		system16.wsssend(message)
	}

	self.recieve = function(data){

		if (self.onmessage){
			self.onmessage(data)
		}

	}

	self.close = function(){
		self.onmessage = null
		self.onopen = null

        if (self.onclose){
			self.onclose()
		}

        self.onclose = null
	}

	self.init = function(){
		if(self.onopen) self.onopen()
	}

	return self
}

var System16 = function(app, proxy, direct){
    var self = this

    var requestes = {}

    self.wssdummy = new WssDummy(self)

    var state = {
        hash : [],
        tick : {}
    }

    var wssdummy = function(e, message){
        self.wssdummy.recieve(message)
    }

    var response = function(e, message){
        var request = requestes[message.id]


        if (request) {

            if (request.clbk) 
                request.clbk(message.error, message.data)

            delete requestes[message.id]
        }
    }

    var tick = function(e, d){

        var message = d.data || d

        if(!message) return
        
        var settings = message.settings || {}

        var hash = bitcoin.crypto.hash256(JSON.stringify(settings))

        var change = (hash.join('') !== state.hash.join(''))

        state.hash = hash
        state.tick = settings

        _.each(self.clbks.tick, (c) => { c(state.tick, message.state, change) })
    }

    var sign = function(data){
        var signature = null

        if (app.user && app.user.getstate() == 1){
            try{ signature = app.user.signature() } catch(e){}
        }

        if (signature){ data.signature = signature }

        return data
    }

    self.tick = function(message){
        tick(null, message)
    }

    self.clbks = {
        tick : {}
    }

    self.settings = {
        server : {
            enabled : {
                type: "BOOLEAN",
            },
            ports : {
                //https,
                //wss
            },
            iplimiter : {
                //interval,
                //count,
                //blacklistcount
            },
            captcha : {
                type: "BOOLEAN",
                //enabled
            },
            ssl : {
                //key, /FILE_UPLOAD
                //cert, /FILE_UPLOAD
                //passphrase
            },
            firebase : {
                //id
                //fbkjsonfile /FILE_UPLOAD
            }
        },
        wallet : {
            addresses : {
            }
        },
        admins : {
            // addressesArray, push, remove
        },
        node : {

            enabled : {
                type: "BOOLEAN"
            },

            binPath : {
                type: "FILE_SELECT"
            },

            dataPath : {
                type: "FILE_SELECT"
            },

            stacking : {
                // addressesArray, push, remove
            }
    
        }
    }

    var request = function(pack){

        pack.id = makeid()
        pack.data || (pack.data = {})

        sign(pack.data)

        electron.ipcRenderer.send('proxy-message', pack);

        return new Promise((resolve, reject) => {

            requestes[pack.id] = {
                id: pack.id,
                clbk: function (error, data) {

                    if(error){
                        reject(error)
                    }
                    else{
                        resolve(data)
                    }

                }
                
            }

        })
    }

    self.request = function(action, data){

        var rdata = {
            action: action,
            data: data || {}
        }

        if (electron && direct){
            return request(rdata)
        }

        else{
            return proxy.fetchauth('manage', rdata)
        } 
            
    }

    self.api = {
        get : {
            settings : function(){
                return self.request('get.settings', {})
            }
        }
    }


    self.rpc = function(method, parameters, options){

        return request({
            path : "/rpc/*",
            data : {
                method : method,
                parameters : parameters,
                options : options || {}
            }
        })

    }

    self.fetch = function(path, data){

        var pack = {
            path : '/' + path,
            data : data
        }

        return request(pack)
    }

    self.wsssend = function(data){

        var pack = {
            wss : true,
            data : data
        }

        return request(pack)
    }

    self.listen = function(){

        if (electron && direct) {
            electron.ipcRenderer.on('proxy-message', response)
            electron.ipcRenderer.on('proxy-message-tick', tick)
            electron.ipcRenderer.on('wssdummy', wssdummy)
        }

    }

    self.stop = function(){
        if (electron && direct) {
            electron.ipcRenderer.off('proxy-message', response)
            electron.ipcRenderer.off('proxy-message-tick', tick)
            electron.ipcRenderer.off('wssdummy', wssdummy)
        }
    }

    return self
}

var IpcBridge = function(){
    var self = this

    var requestes = {}

    var response = function(e, message){

        var request = requestes[message.id]

        if (request) {

            if (request.clbk) 
                request.clbk(message.error, message.data)

            delete requestes[message.id]
        }
    }

    var request = function(pack){

        pack.id = makeid()
        pack.data || (pack.data = {})

        electron.ipcRenderer.send('ipc-bridge', pack);

        return new Promise((resolve, reject) => {

            requestes[pack.id] = {
                id: pack.id,
                clbk: function (error, data) {

                    if(error){
                        reject(error)
                    }
                    else{
                        resolve(data)
                    }

                }
                
            }

        })
    }

    self.request = function(action, data){

        var rdata = {
            action: action,
            data: data || {}
        }

        if (electron){
            return request(rdata)
        }
    }

    self.listen = function(){

        if (electron) {
            electron.ipcRenderer.on('ipc-bridge', response)
        }

        return self

    }

    self.stop = function(){
        if (electron) {
            electron.ipcRenderer.off('ipc-bridge', response)
        }
    }

    return self
}

if(typeof module != "undefined"){ module.exports = {System16, IpcBridge}; } 
else { window.System16 = System16; window.IpcBridge = IpcBridge }