var IpcBridge = function(ipc, wc){
	var self = this;

	var send = function(id, error, p){

		wc.send('ipc-bridge', {

			error : error,
			id : id || '0',
			data : p || {}

		})

		return Promise.resolve()
	}

	
    var handleMessage = function(e, message) {

		if(!message.action) return Promise.reject('message.action')

		if(!message.id) message.id = f.makeid()

		var promise = null

		if (message.action)
			promise = self.actions[message.action] ? self.actions[message.action](message.data) : null
		
		if(!promise) return Promise.reject('action')

		
		promise.then(data => {

			send(message.id, null, data)
		}).catch(e => {

			send(message.id, e)
		})

	}

    self.actions = {}

	self.init = function(){
		ipc.on('ipc-bridge', handleMessage)
	}

	self.destroy = function(){
		ipc.off('ipc-bridge', handleMessage)
	}

	return self
}

module.exports = IpcBridge