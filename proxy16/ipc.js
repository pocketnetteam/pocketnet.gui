var Path = require('path');
var kit = require('./kit.js');
var f = require('./functions');
const electron = require('electron')
const { dialog } = require('electron');

var WssDummy = function(wc){
	var self = this

	var on = {}

	self.ip = 'localhost'

	self.on = function(key, action){
		if(!on[key]) on[key] = []

		on[key].push(action)
	}

	self.off = function(key, action){

		if(!on[key]) on[key] = []

		if(!action) on[key] = []

		else on[key] = _.filter(on[key], function(a){ return a == action })
	}

	self.send = function(message){
		wc.send('wssdummy', message)
	}

	self.recieve = function(data){

		_.each(on.message || {}, function(a){
			a(data)
		})

		return Promise.resolve()
	}

	self.destroy = function(){
		_.each(on.close || {}, function(a){
			a()
		})

		on = {}
	}

	self.init = function(){
		on = {}
	}

	return self
}

var IPC = function(ipc, wc){
	var self = this;

	var wssdummy = new WssDummy(wc)

	var tickInterval = function(){

	}

	var send = function(id, error, p, key){

		wc.send(key || 'proxy-message', {

			error : error,
			id : id || '0',
			data : p || {}

		})

		return Promise.resolve()
	}

	var handleMessage = function(e, message) {
		
		if(!message.action && !message.path) return
		if(!message.id) message.id = f.makeid()

		var promise = null

		if (message.action)
			promise = f.deep(actions, message.action) ? f.deep(actions, message.action)() : actions.manage(message)

		if (message.path)
			promise = kit.gateway(message)

		if (message.wss)
			promise = wssdummy.recieve(message.data)
		
		if(!promise) return
		
		promise.then(data => {
			send(message.id, null, data)
		}).catch(e => {
			send(message.id, e)
		})

	}
    
    var tick = function() {
		kit.manage.get.state(true).then(state => {

			kit.manage.get.settings().then(settings => {
				send('tick', null, {settings, state}, 'proxy-message-tick')
			})

		})
        
	}

	var helpers = {
		dialog : function(options){
            return new Promise((resolve, reject) => {
                dialog.showOpenDialog(options, function(res) {
                    if (!res.canceled && res.length > 0) {
                        return resolve(res)
                    }

                    return reject()
                })
            })
        }
	}

	var middles = {
		node : {
			dataPath : function(message){
				return helpers.dialog({
					properties: ['openDirectory']
				}).then(res => {
	
					message.data = res[0]
					return Promise.resolve()

				})
			},
			binPath : function(message){
				return helpers.dialog({
					filters: [
						{ name: 'Pocketcoin Executable', extensions: ['exe'] },
						{ name: 'All Files', extensions: ['*'] }
					]
				}).then(res => {

					message.data = res[0]
					return Promise.resolve()

				}) 
			}
		}
	}

	var middle = function(message){
		if(f.deep(middles, message.action)){
			return f.deep(middles, message.action)(message)
		}

		return Promise.resolve()
	}
    
	var actions = {

		manage : function(message){
			var kaction = f.deep(kit, 'manage.' + message.action)

			if(!kaction) return Promise.reject('unknownAction')

			return middle(message).then(r => { 
				
				return kaction(message.data)

			}).then(data => {

				send(message.id, null, data)
			})
		},

		electron : {
			dialog : function(message){
				return helpers.dialog(message.data).then(res => {
					return send(message.id, null, res)
				})
			}
		}

    }

	self.init = function(){
		ipc.on('proxy-message', handleMessage)

		wssdummy.init()

        tickInterval = setInterval(tick, 2500)
	}

	self.destroy = function(){

		ipc.off('proxy-message', handleMessage)
		
		wssdummy.destroy()

		if (tickInterval){
			clearInterval(tickInterval)

			tickInterval = null
		}

		return kit.destroy()
	}

	var isDevelopment = process.argv.find(function(el) { return el == '--development'; })
	
    kit.init({
		node : {
			dataPath : isDevelopment? f.path('pocketcoin') : Path.join(electron.app.getPath('userData'), 'pocketcoin')
		}
	}, { wssdummy })

	return self
}

module.exports = IPC