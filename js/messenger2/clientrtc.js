
var platformRTC = function(p){

	if(!p) p = {};

	var user = p.user || {};
	var platform = p.platform || null;
	var deviceModificator = hash_32b_to_16b(hashFnv32a(makeid()))


		user.id = (user.device || '') + deviceModificator

	var peers = {};

	var configuration = { 
		"iceServers": [
			{ "url": "stun:stun.l.google.com:19302" }
		] 
	};

	var signature = {
		sign : function(message){

			var keyPair = platform.app.user.keys();

			var str = message.tm + message.f + message.t + message.m;

			var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(str), 'utf8'));	

			message.ex.s = signature.toString('hex');
			message.ex.p = keyPair.publicKey.toString('hex')

		},

		check : function(message){
			if(!message.ex) return false

			if(!message.ex.s || !message.ex.p) return;

			var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(message.ex.p, 'hex'))

			var str = message.tm + message.f + message.t + message.m;

			var hash = Buffer.from(bitcoin.crypto.hash256(str), 'utf8')

			var verify = keyPair.verify(hash, Buffer.from(message.ex.s, 'hex'));

			return verify
		}
	}

	var relaystorage = {}

	var rtchttp = function(){

		var self = this;

		var ajax = platform.app.ajax.rtchttp

		self.storage = {
			chat : {},

			allchats : null
		};

		self.info = {
			chat : function(id, clbk){

				if(self.storage.chat[id]){
					if (clbk)
						clbk(self.storage.chat[id])
				}
				else
				{
					ajax({
						action : "info.address.chat",
						data : {
							address : user.address,
							id : id
						},

						success : function(d){

							if(d.data){
								self.storage.chat[id] = d.data
							}
							

							if (clbk)
								clbk(self.storage.chat[id])
						},

						fail : function(){
							if (clbk)
								clbk(null)
						}
					})
				}
			},

			chats : function(ids, clbk){

				ids = _.filter(ids, function(id){
					return !self.storage.chat[id]
				})

				if(!ids.length){
					if (clbk)
						clbk(true)
				}
				else
				{
					ajax({
						action : "info.address.chats",
						data : {
							address : user.address,
							ids : ids
						},

						success : function(d){

							_.each(d.data || {}, function(info, id){
								self.storage.chat[id] = info
							})

							if (clbk)
								clbk(true)
						},

						fail : function(){
							if (clbk)
								clbk()
						}
					})
				}
			},

			allchats : function(clbk){

				if (self.storage.allchats){
					if (clbk)
						clbk(true)
				}
				else
				{
					ajax({
						action : "info.address.allchats",
						data : {
							address : user.address
						},

						success : function(d){

							_.each(d.data || {}, function(info, id){
								self.storage.chat[id] = info
							})

							if (clbk)
								clbk(true)
						},

						fail : function(){
							if (clbk)
								clbk()
						}
					})
				}
			}
		}

		self.update = {
			chat : function(chatid, unreaded, users){
				var c = deep(self.storage, 'chat.' + chatid);

				if(!c) {
					c = {

						messages : {
							count : 0,
							unreaded : 0	
						},

						users : []
						
					}

					self.storage.chat[chatid] = c
				}

				c.messages.count = (c.messages.count || 0) + Math.abs(unreaded)
				c.messages.unreaded = (c.messages.unreaded || 0) + unreaded;

				if(users) c.users = users

				if (c.unreaded < 0)
					c.unreaded = 0
			}
		}

		self.get = {
			relayed : function(clbk){

				ajax({
					action : "relayed.address",
					data : {
						address : user.address
					},

					success : function(d){

						if (clbk)
							clbk(d.data)
					},

					fail : function(){
						if (clbk)
							clbk(null)
					}
				})

			},

			chats : {
				users : function(ids, clbk){
					ajax({
						action : "chats.users",
						data : {
							chats : ids.join(',')
						},

						success : function(d){

							if (clbk)
								clbk(d.data)
						},

						fail : function(){
							if (clbk)
								clbk(null)
						}
					})
				},

				messages : function(id, clbk){
					ajax({
						action : "info.chat.messages",
						data : {
							id : id
						},

						success : function(d){

							if (clbk)
								clbk(d.data)
						},

						fail : function(){
							if (clbk)
								clbk(null)
						}
					})
				}
			}
		}

		self.put = {

			chat : {
				messages : function(chat, clbk){


					if(chat){
						var m = chat.get.lastmessages(50);

						if (m.length){
							ajax({
								action : "put.chat.messages",
								data : {
									id : chat.id,
									messages : hexEncode(JSON.stringify(m)),
									address : user.address
								},

								success : function(d){

									if (clbk)
										clbk(true)
								},

								fail : function(){
									if (clbk)
										clbk(false)
								}
							})
						}
						else
						{
							if (clbk)
								clbk(false)
						}

						
					}

					
				}
			}

		}

		return self;
	}

	var chatRTC = function(chatid, addresses, events){

		var self = this;

		self.storage = new MessageStorage({id : chatid});
		self.clbks = {};
		self.addresses = addresses || [];
		self.id = chatid;

		self.disconnectTimeout = null;

		var createMessage = function(message, to){
				
			var m = {
				tm: platform.currentTimeSS(),
		        f: user.address,
		        t: to || '',
		        m: message,
		        ex: {
		            s : ''
		        }
			}

			signature.sign(m)

			return m
			
		}	

		var iniclbks = function(){
			self.clbks = {
				receive : {
					message : {},
					messages : {}
				},
				send : {
					message : {}
				}
			}
		}

		self.send = function(m){
			var message = createMessage(m)

			self.storage.AddMessage(message, true);

			if (events.send){
				events.send(message)
			}

			_.each(self.clbks.send.message || {}, function(c){
				c(message)
			})	

		}

		self.connect = function(clbk){

			events.connect(clbk)

		}

		self.leave = function(clbk){

			events.leave(clbk)

		}

		self.receive = {
			message : function(message){

				self.storage.AddMessage(message, true);

				_.each(self.clbks.receive.message || {}, function(c){
					c(message)
				})
			},
			messages : function(messages){

				if(!messages || _.isEmpty(messages)) return

				self.storage.MergeDB(messages);	

				_.each(self.clbks.receive.messages || {}, function(c){
					c(messages)
				})			
			}
		}

		self.get = {

			lastmessages : function(l){
				var ms = self.storage._db || {}

				ms = _.sortBy(_.clone(ms), function(msg){

					if(!msg.tm){

						return
					}

					var t = msg.tm

					if(msg.tm.length == 17) msg.tm = t + '0'

					return Number(msg.tm)
			
				})

				ms = _.map(ms, function(m){

					var t = _.clone(m)

					t.m = encodeURIComponent(t.m)

					return t
				})

				if (ms.length > l){
					ms.splice(0, ms.length - l)
				}

				return ms
			},
			message : function(id){
				return self.storage.GetMessage(id);
			}
			
		}

		self.remote = {
			lastmessages : function(){
				if (events.lastmessages){
					events.lastmessages(function(messages){
						self.receive.messages(messages)
					})
				}
			}
		}

		self.close = function(){

			iniclbks()
		}

		iniclbks()

		return self;
	}

	var clientRTC = function(){

		var self = this;

			self.chats = {};

			self.relay = {};

			self.relayed = {};

			self.clbks = {};


		var connection;	
		var clbks = {
			login : {}
		}

		var closing = false;
		var opened = false;
		var RTCPeerConnection = null;

		self.online = true;
		self.onlineCheck = true;

		if(typeof window != 'undefined'){
			self.online = deep(window, 'navigator.onLine') || false;

			RTCPeerConnection = window.RTCPeerConnection || 
								window.mozRTCPeerConnection || 
								window.webkitRTCPeerConnection;
		}


		var initOnlineListener = function(){
			if(self.onlineCheck && typeof window != 'undefined'){

				/*onlinetnterval = retry(function(){

					var online = deep(window, 'navigator.onLine');

					if (self.online != online){

						self.online = online;

						return true;

					}
					

				}, function(){

					if(!self.online){

						self.close();	

						initOnlineListener()
						
					}
					else
					{

						
						self.psinit(function(){

							_.each(self.chats, function(ch){
								ch.remote.lastmessages()

								ch.connect()
							})

						});	

						initOnlineListener();
					}

				}, 50)*/

			}
		}						

		var send = function(message){ 

			retry(function(){

				return opened

			}, function(){

				connection.send(JSON.stringify(message)); 

			}, 100)

			
		};

		var iniclbks = function(){
			self.clbks = {
				newchat : {},
				chat : {},
				message : {}
			}
		}

		
		var chats = {

			create : function(id, addresses){

				if(!self.chats[id]){

					self.chats[id] = new chatRTC(id, addresses, {
						send : function(m){

							var sm = _.clone(m)

								sm.m = encodeURIComponent(sm.m)

							send({
								type : 'message',
								chatid : id,
								message : m
							})
						},

						lastmessages : function(clbk){

							self.rtchttp.get.chats.messages(id, clbk)

						},

						connect : function(clbk){
							send({ 

						        type: "chat", 
						        chatid: id,
						        addresses : addresses || []

						    });

						    self.addclbk('chat', makeid(true), clbk)
						},

						leave : function(clbk){
							send({ 

						        type: "leave", 
						        chatid: id

						    });

							self.addclbk('leave', makeid(true), clbk)
							
							delete self.chats[id]
						}
					})
				}

				return self.chats[id]
			},

			close : function(id){

				if(!self.chats[id]) return

				self.chats[id].close()
			}
		}

		var notification = function(data){
			data.msg = data.type

			if(data.msg == 'message_newchat') data.msg = 'message'

			platform.ws.messageHandler(data)
		}

		var events = {

			leave : function(){

			},

			chat : function(data){

			    var ch = chats.create(data.chatid, data.addresses)

			    _.each(clbks.chat || {}, function(c){
			    	c(data, ch)
			    })


			    if(!data.l){

			    	self.rtchttp.put.chat.messages(ch)

			    }

			    else{

			    	ch.remote.lastmessages()

			    }

			},

			relay : function(data){

			    var re = relays.create(data.device, data.offline)

			},

			chat_newdevice : function(data){
				var ch = chats.create(data.chatid, data.addresses)

			    _.each(clbks.chat || {}, function(c){
			    	c(data, ch)
			    })
			},

			chat_newuser : function(data){	

				var chat = self.chats[data.chatid]

				if (chat){


				}
				
			},

			exit : function(data){
				
			},

			login : function(data){		    

			    _.each(clbks.login || {}, function(c){
			    	c(data)
			    })
			},

			message : function(data){

				var chat = self.chats[data.chatid]


				if (chat){
					
					chat.receive.message(data.message)

					//notification(data)

					self.rtchttp.update.chat(data.chatid, 1)

					_.each(self.clbks.message || {}, function(c){
				    	c(data, chat)
				    })
				}	

			},
		}

		var errors = {}

		var handlers = {
			message : function(message){
				var data = {}

				try {
					data = JSON.parse(message.data); 
				} 
				catch (e){

				}


				if (data.type){

					if(!data.success){
						if (errors[data.type]){
							errors[data.type](data)
						}
						else
						{
							if (data.error){
							}
						}
					}
					else
					{
						if (events[data.type]){
							events[data.type](data)
						}
					}

					
				}

				
			}
		}

		var init = function(clbk){

			connection = new ReconnectingWebSocket(platform.app.options.rtcws); 

			connection.onmessage = function (message) { 

			   handlers.message(message)
			   
			};

			/*connection.onerror = function (error) { 
			   
			   	connection.close()
			   
			};*/

			connection.onopen = function(){

				opened = true;

				if (clbk)
					clbk()

			}

			/*connection.onclose = function(){

				opened = false;

				connection = null;
				
				if(closing){
					return;
				}

				init();
			}*/
		
		}

		self.initChats = function(_chats){
			_.each(_chats, function(chat){
				chats.create(chat.id, chat.users)
			})
		}

		self.addclbk = function(event, id, clbk){

			clbks[event] || (clbks[event] = {})

			clbks[event][id] = function(d1, d2){
				delete clbks[event][id]

				if (clbk && typeof clbk == 'function')
		    	 	clbk(d1, d2)
		    }

		}

		self.api = {
			login : function(clbk){


				if (user){

					send({ 

				        type: "login", 
				        device: user.device,
				        id : user.id,
				        address : user.address,
				        signature : user.signature,
				        publicKey : user.publicKey,
				       // deviceModificator : deviceModificator

				    });

				    self.addclbk('login', makeid(true), clbk)
				}
				else
				{
					
				}
			},

			getChat : function(id, addresses, clbk){
				return chats.create(id, addresses)
			}
		}

		self.connection = function(){
			return connection 
		}

		self.close = function(){
			if(closing) return false

			iniclbks()

			opened = false;

			closing = true;

			connection.close();

			return true
		}

		self.destroy = function(){

		
			_.each(self.chats || {}, function(c){
				c.close()
			})

			self.chats = {};
		

			self.close()
		}

		self.psinit = function(clbk){
			init(function(){

				self.api.login(function(){
					if (clbk)
						clbk()
				})

			});
		}

		self.init = function(clbk){

			initOnlineListener()

			init();

			self.rtchttp = new rtchttp();

			self.api.login(function(){

				iniclbks();

				if(clbk)
					clbk()

			})
		}

		self.getchats = function(clbk){
			_.each(self.chats, function(ch){
				ch.remote.lastmessages()

				ch.connect()
			})

			if (clbk)
				clbk()
		}

		return self;
	}

	return new clientRTC()

}

if(typeof module != "undefined")
{
	module.exports = platformRTC;
}

