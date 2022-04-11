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
		
		if(!message.action && !message.path && !message.wss) return
		if(!message.id) message.id = f.makeid()

		var promise = null

		if (message.action)
			promise = f.deep(actions, message.action) ? f.deep(actions, message.action)() : actions.manage(message)

		if (message.path)
			promise = kit.gateway(message)

		

		if (message.wss){
			promise = wssdummy.recieve(message.data)
		}
		
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
			return dialog.showOpenDialog(options).then(res => {
				if (!res.canceled && (res.filePaths && res.filePaths.length > 0)) {
					return Promise.resolve(res.filePaths)
				}

				return Promise.reject()
			})
        },
		saveFileDialog : function(options){
			return dialog.showSaveDialog(options).then(res => {
				if (!res.canceled && (res.filePath && res.filePath.length > 0)) {
					return Promise.resolve(res.filePath)
				}

				return Promise.reject()
			})
        },
		openFileDialog : function(options){
			return dialog.showOpenDialog(options).then(res => {
				if (!res.canceled && (res.filePaths && res.filePaths.length > 0)) {
					return Promise.resolve(res.filePaths)
				}

				return Promise.reject()
			})
        }
	}

	var middles = {
		set : {
			node : {
				ndataPath : function(message){
					return helpers.dialog({
						properties: ['openDirectory'],
                        defaultPath: message.data.defaultPath || ''
					}).then(res => {
	
						message.data = {
							ndataPath : res[0]
						}

		
						return Promise.resolve()
	
					})
				},
				binPath : function(message){
					return helpers.dialog({
						properties: ['openDirectory'],
                        defaultPath: message.data.defaultPath || ''
						/*filters: [
							{ name: 'Pocketcoin Executable', extensions: ['exe'] },
							{ name: 'All Files', extensions: ['*'] }
						]*/
					}).then(res => {

	
						message.data = {
							binPath : res[0]
						}
	
						return Promise.resolve()
	
					}) 
				},
                dumpWallet : function(message) {
					return helpers.saveFileDialog({
						properties: ['dontAddToRecent'],
                        defaultPath: message.data.defaultPath || ''
					}).then(res => {
	
                        message.data = {
							path : res
						}

						return Promise.resolve()
					})
				},
                importWallet : function(message) {
					return helpers.openFileDialog({
						properties: ['openFile'],
                        defaultPath: message.data.defaultPath || ''
					}).then(res => {
	
                        message.data = {
							path : res[0]
						}

						return Promise.resolve()
					}).catch(e => {
                        return Promise.reject({
							cancel : true
						})
                    })
				},
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

		return kit.destroyhard()
	}

    self.candestroy = function() {
        return kit.candestroy()
    }
    
    self.nodeStop = function() {
        return kit.manage.node.stop()
    }

    kit.init({}, { wssdummy, userDataPath : electron.app.getPath('userData')})

	return self
}

module.exports = IPC