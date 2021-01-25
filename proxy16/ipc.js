var Path = require('path');
var kit = require('./kit.js');
var f = require('./functions');
const electron = require('electron')
const { dialog } = require('electron');

var IPC = function(ipc, wc){
	var self = this;

	var tickInterval = function(){

	}

	var send = function(id, error, p, key){

		wc.send(key || 'proxy-message', {

			error : error,
			id : id || '0',
			data : p

		})

		return Promise.resolve()
	}

	var handleMessage = function(e, message) {
		
		if(!message.action) return
		if(!message.id) message.id = f.makeid()

		//node.exist

		var promise = f.deep(actions, message.action) ? f.deep(actions, message.action)() : actions.manage(message)
		
		promise.catch(e => {
			send(message.id, e)
		})


		/*if (f.deep(actions, message.action)){
			f.deep(actions, message.action)().catch(e => {
				send(message.id, e)
			})

			return
		}

		return actions.manage(message).catch(e => {
			send(message.id, e)
		})*/

		/*if (f.deep(actions, message.action)){
			f.deep(actions, message.action).catch(e => {
				send(message.id, e)
			})

			return
		}
	
		send(message.id, 'unknownAction')*/


	}
    
    var tick = function() {

		kit.manage.get.settings().then(settings => {
			send('state', null, settings, 'proxy-message-tick')
		})

		kit.manage.get.state().then(state => {
			send('state', null, state, 'proxy-message-tick')
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
		/*get : function(message){
			if(!message.get || !f.deep(kit, 'manage.get.' + message.get)){
				return Promise.reject('unknownParameter')
			}

			return middle(message).then(r => {
				return f.deep(kit, 'manage.get.' + message.get)(message.data)
			})
			
			.then(r => {
				return send(message.id, null, r)
			})

		},

		set : function(message){
			if(!message.set || !f.deep(kit, 'manage.set.' + message.set)){
				return Promise.reject('unknownSettings')
			}

			return middle(message).then(r => {
				return f.deep(kit, 'manage.set.' + message.set)(message.data)
			})
			
			.then(r => {
				return send(message.id, null, r)
			})

		},*/

		manage : function(message){
			var kaction = f.deep(kit, 'manage.' + message.action)

			if(!kaction) return Promise.reject('unknownAction')

			return middle(message).then(r => { 
				
				return kaction(message.data)

			}).then(data => {
				send(message.id, null, data)
			})
		},

		/*node : {
			request : function(message){

				//getWallet, setWallet

				return kit.proxy().then(proxy => {

					if(!message.data[0]) return Promise.reject('methodname')

					if(!proxy.nodeControl.request[message.data[0]]){
						return proxy.nodeControl.kit.rpc(message.data[0], message.data[1])
					}

					return proxy.nodeControl.request[message.data[0]](message.data[1])
					
				}).then(data => {
					send(message.id, null, data)
				})
			}
		},*/

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

        tickInterval = setInterval(tick, 2500)
	}

	self.destroy = function(){

		ipc.off('proxy-message', handleMessage)	

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
	})

	return self
}

module.exports = IPC