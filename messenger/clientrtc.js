
var platformRTC = function(p){

	if(!p) p = {};

	var user = p.user || null;
	var platform = p.platform || null;
	var deviceModificator = hash_32b_to_16b(hashFnv32a(makeid()))

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

				console.log("UPDATE", c, unreaded)

				if (c.unreaded < 0)
					c.unreaded = 0
			}
		}

		return self;
	}

	var channelRTC = function(peer){
		var self = this;
			self.opened = false;
			self.peer = peer;

		var syncInterval = null;


		var dataChannelOptions = { 
			reliable : true,
			negotiated : true
		}; 

		var channelid = function(){

			var ids = [self.peer.user.id, user.id];

				ids = _.sortBy(ids);

			var str = _.reduce(ids, function(m, id){
				return m + "" + id
			}, '')

			return hash_32b_to_16b(hashFnv32a(str))
		}

		var channelEvents = {
			receiveSyncRequest : function(message, chatid){

				var chat = self.peer.chats[chatid]

			    let _db_diff = chat.storage.CompareDB(message.hv, message.tm_f, message.tm_t);

			    self.api.send({

			        sync_answer: 1,
			        messages: _db_diff

			    }, chatid);

			},

			receiveSyncAnswer : function(message, chatid){

			    channelEvents.receiveMessages(message, chatid)			

			},

			sendSyncRequest : function(chatid){

				var chat = self.peer.chats[chatid]

			    var _hv = chat.storage.HistoryVector();

			    var peers = chat.peers;

			    var peer = peers[Math.floor(Math.random() * peers.length)];	

			    self.api.send({

			        sync_request: 1,
			        hv: _hv,
			        tm_f: '',
			        tm_t: ''

			    }, chatid)

			},

			receiveMessages : function(message, chatid) {

				var chat = self.peer.chats[chatid]

				chat.receive.messages(message.messages)

			},

			receiveMessage : function(message, chatid) {

				var chat = self.peer.chats[chatid]

				chat.receive.message(message)

			},

			receiveRelay : function(message, users){
				var relay = self.peer.relay;

					relay.storages.addStorage(message.chatid)
					relay.storages.addMessage(message.m, message.chatid, message.addresses)

			}
		}

	

		self.init = function(c){

			//dataChannelOptions.id = channelid()

			//'messenger', dataChannelOptions

			self.c = c || self.peer.rtc.createDataChannel('messenger');

			self.c.onerror = function (error) { 
				console.log("Error:", error); 
			};

			self.c.onopen = function () { 

				self.opened = true;

			};

			self.c.onclose = function(event) {
                console.log("channel close")
            };


			self.c.onmessage = function (m) { 

				var data = {}

				try {
					data = JSON.parse(m.data); 
				} 
				catch (e){

				}

				var chatid = data.chatid;
				var message = data.message || {};

				//console.log("Got message:", chatid, message); 

				if (message.sync_request) {
			        channelEvents.receiveSyncRequest(message, chatid);
			        return;			        
			    }

			    if (message.sync_answer) {
			        channelEvents.receiveSyncAnswer(message, chatid);
			        return;
			    }

			    if (message.relay) {

			    	channelEvents.receiveRelay(message, chatid, addresses);

			    	//add to my storage

			        return;
			    }

			    if (message.typing) {
			        return;
			    }

			    if (message.stoppedTyping) {
			        return;
			    }	

			    channelEvents.receiveMessage(message, chatid);		
			};  
		}

		self.close = function(){
			self.c.close()

			self.opened = false;

			if (syncInterval){
				clearInterval(syncInterval)
			}

		}

		self.api = {
			sync : function(chatid){

				syncInterval = retry(function(){

					return self.opened

				}, function(){

					channelEvents.sendSyncRequest(chatid)

				})

			},

			send : function(m, chatid){

				var message = JSON.stringify({

					message : m,
					chatid : chatid

				})

				self.c.send(message)
			},

			relay : function(m, chatid, addresses){
				var message = JSON.stringify({

					message : m,
					addresses : addresses,
					chatid : chatid,
					relay : 1

				})

				self.c.send(message)
			}
		}

		self.peer.channel = self;

		return self;
	}

	var peerRTC = function(user){
		var self = this;

			self.channel = null;

			self.events = {};
			self.chats = {};
			self.relay = null;

			self.user = user;

		self.init = function(){

			if(self.channel) return

			var peer = new RTCPeerConnection(configuration, { 
		        //optional: [{RtpDataChannels: true}] 
		    }); 
				
		    peer.onicecandidate = function (event) { 
				
		        if (event.candidate) { 

		        	self.events.candidate(event.candidate)

		        } 
		    }; 			

		    self.rtc = peer;

		    self.channel = new channelRTC(self)
		    
		}	

		self.offer = function(){

			if(!self.events.offer){
				console.log("error, offer")

				return
			}

			self.channel.init()

			self.rtc.createOffer(function (offer) { 
		       	
		       	self.events.offer(offer)
				
				self.sys.localDescription(offer); 

		    }, function (error) { 
		        
		    }); 
		}

		self.answer = function(offer){

			if(!self.events.answer) {
				console.log("error, answer")

				return
			}


			self.sys.remoteDescription(offer, function(){

				self.rtc.ondatachannel = function(e) {

				    var channel = e.channel;

				    self.channel.init(channel);
				};
					
				self.rtc.createAnswer(function(answer){ 

				    self.sys.localDescription(answer, function(){

				    	self.events.answer(answer)

				    }); 
						
				    
						
				}, function (error) { 
				    console.log("answer error", error)
				});

			})
			
		}

		self.close = function(id){			
			
			delete self.chats[id]
			delete self.relay[id]

			if(_.isEmpty(self.chats) && _.isEmpty(self.relay)){

				self.channel.close()

				return user

			}
		}

		self.sys = {
			candidate : function(candidate){
				self.rtc.addIceCandidate(new RTCIceCandidate(candidate)); 
			},
			remoteDescription : function(answer, clbk){

				if(!clbk) 
					clbk = function(){}

				self.rtc.setRemoteDescription(new RTCSessionDescription(answer), clbk); 
			},

			localDescription : function(description, clbk){

				if(!clbk) 
					clbk = function(){}

				self.rtc.setLocalDescription(description, clbk); 
			}

		}

		self.send = function (m, chatid){
			self.channel.api.send(m, chatid)
		}

		self.sync = function(chatid){
			self.channel.api.sync(chatid)
		}

		self.relaySend = function(message, chatid){
			//self.relay.messages.get();

			self.channel.api.relay(message, chatid, self.relay.users)
			
		}

		return self;
	}

	var relayRTC = function(device, offlineUsers, events){
		var self = this;

			self.peer = null;
			self.id = device;

		var storages = {}

	
		self.storages = {
			get : storages,

			addStorage : function(chatid){
				if(!storages[chatid]){
					storages[chatid] = []
				}

				return storages[chatid]
			},

			addMessage : function(m, chatid, addresses){

				storages[chatid].push({
					m : m,
					a : addresses
				})

				/*_.each(addresses, function(address){
					storages[chatid][address] || (storages[chatid][address] = new MessageStorage({id : chatid + address});)
				

				})*/

				if (events.add){
					events.add(chatid, addresses)
				}
			}

		}

		self.peer = function(user, events){	

			peers[user.id] || (peers[user.id] = new peerRTC(user, events))	

			self.peer = peers[user.id]
			self.peer.events = events
			self.peer.init()
			self.peer.relay = self

		    return peer
		}

		self.users = offlineUsers || []

		return self;
	}

	var chatRTC = function(chatid, addresses, events){

		var self = this;

		self.peers = {};
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

		self.peer = function(user, events){	

			peers[user.id] || (peers[user.id] = new peerRTC(user, events))	

			var peer = peers[user.id]
			    peer.events = events
			    peer.init()

			   	peer.chats[self.id] = self

		    self.peers[user.id] = peer


		    return peer
		}

		self.sync = function(){
			_.each(self.peers, function(peer){
				peer.sync(self.id)
			})
		}

		self.send = function(m){
			var message = createMessage(m)

			self.storage.AddMessage(message);

			_.each(self.peers, function(peer){

				if (!peer.channel.opened) {
	                return;
	            }

	            peer.send(message, self.id);

			})

			if (events.send){
				events.send()
			}

			_.each(self.clbks.send.message || {}, function(c){
				c(message)
			})	

		}

		self.connect = function(clbk, timeToDisconnect){


			events.connect(clbk)

			if (!timeToDisconnect){

				if(self.disconnectTimeout){
					clearTimeout(self.disconnectTimeout)
				}

			}
			else
			{
				self.disconnectTimeout = setTimeout(function(){
					self.close()
				}, timeToDisconnect)
			}
		}

		self.receive = {
			message : function(message){

				self.storage.AddMessage(message);

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

		self.close = function(){

			console.log("CLOSECHAT")

			_.each(self.peers, function(p){

				var user = p.close(self.id)

				if (user){

					delete peers[user.id]

				}
			})

			self.peers = {}

			iniclbks()
		}

		iniclbks()

		return self;
	}

	var clientRTC = function(){

		var self = this;

			self.chats = {};

			self.relay = {};

			self.clbks = {};


		var connection;	
		var clbks = {
			login : {},
			relay : {}
		}

		var closing = false;
		var opened = false;
		

		var RTCPeerConnection = window.RTCPeerConnection || 
								window.mozRTCPeerConnection || 
								window.webkitRTCPeerConnection;
		



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

		var relays = {
			create : function(id, offlineUsers){

				if(!self.relay[id]){

					self.relay[id] = new relayRTC(id, offlineUsers, {
						add : function(chatid, forUsers){
							send({

								type : 'haveRelay',
								chatid : chatid,
								forUsers : forUsers,
								device : user.id,
								from : id

							})
						}
					})
				}

				return self.chats[id]
			},

			close : function(id){

				if(!self.relay[id]) return

				self.relay[id].close()
			}
		}

		var chats = {
			create : function(id, addresses){

				if(!self.chats[id]){

					self.chats[id] = new chatRTC(id, addresses, {
						send : function(){
							send({
								type : 'message',
								chatid : id
							})
						},

						connect : function(clbk){
							send({ 

						        type: "chat", 
						        chatid: id,
						        addresses : addresses || []

						    });

						    self.addclbk('chat', makeid(true), clbk)
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

			},

			relay : function(data){

			    var re = relay.create(data.device, data.offline)

			},

			chat_newdevice : function(data){
				var ch = chats.create(data.chatid, data.addresses)

			    _.each(clbks.chat || {}, function(c){
			    	c(data, ch)
			    })
			},

			chat_newuser : function(data){	

				var chat = self.chats[data.chatid]

				var peer = peers[data.id]

				if (chat){

					if(!peer){
						peer = chat.peer({

							id : data.id,
							address : data.address

						}, {
							candidate : function(candidate){

								send({ 
					               	type: "candidate", 
					               	candidate: candidate,
					               	id : data.id
					            });
							},

							offer : function(offer){
								send({ 
							        type: "offer", 
							        id : data.id,
							        offer : offer,
							        chatid : data.chatid
							    }); 
							}
						})

						peer.offer()
					}

					

					peer.sync(data.chatid)

				}
				
			},

			exit : function(data){
				
			},

			login : function(data){		    

			    _.each(clbks.login || {}, function(c){
			    	c(data)
			    })
			},

			candidate : function(data){

				var peer = peers[data.id]

				if (peer){

					peer.sys.candidate(data.candidate); 
				}
			},

			answer : function(data){
				var peer = peers[data.id]

				if (peer){

					peer.sys.remoteDescription(data.answer); 

				}
			},

			offer : function(data){
				var peer = peers[data.id]

				var context = null 

				var r = retry(function(){

					if (data.chatid){
						context = self.chats[data.chatid]
					}
					else
					{
						context = self.relays[data.id]
					}

					if (context) return true


				}, function(){


					if(!peer){

						peer = context.peer({

							id : data.id,
							address : data.address

						},{
							candidate : function(candidate){

								send({ 
					               	type: "candidate", 
					               	candidate: candidate,
					               	id : data.id
					            });

							},

							answer : function(answer){

								send({ 
							        type: "answer", 
							        answer: answer,
							        id : data.id 
							    }); 
							}
						})

						peer.answer(data.offer)

						if (data.chatid){
							peer.sync(data.chatid)
						}

					}


				}, 100)


				setTimeout(function(){

					if(r) {
						clearInterval(r)
					}

				}, 60000)
			},



			message : function(data){

				var chat = self.chats[data.chatid]


				if (chat){
					chat.connect(function(){
					
					}, 60000)

					notification(data)

					self.rtchttp.update.chat(data.chatid, 1)

					_.each(self.clbks.message || {}, function(c){
				    	c(data, chat)
				    })
				}	

			},

			message_newchat : function(data){
				var chat = self.chats[data.chatid]

				if(!chat){
					chat = chats.create(data.chatid, data.addresses)
				}	

				notification(data)

				self.rtchttp.update.chat(data.chatid, 1, data.addresses)

				_.each(self.clbks.message || {}, function(c){
			    	c(data, chat)
			    })

				chat.connect(function(){

					_.each(self.clbks.chat || {}, function(c){
				    	c(data, chat)
				    })

				}, 60000)
			},

			

			message_offline : function(data){

				_.each(data.online || [], function(user){
					var relay = relays.create(user.device, data.offline)

					var peer = peers[user.id]

					if(!peer){
						peer = relay.peer({

							id : user.id,
							address : user.address

						}, {
							candidate : function(candidate){

								send({ 
					               	type: "candidate", 
					               	candidate: candidate,
					               	id : user.id
					            });

							},

							offer : function(offer){
								send({ 
							        type: "offer", 
							        id : user.id,
							        offer : offer,

							        relayid : user.device
							    }); 
							}
						})

						peer.offer()


					}

					peer.relaySend(data.chatid) // + messages
						

				})

				

			},

			messages_readed : function(data){

			}
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
								console.log("Error: ", data.error)
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

			connection = new WebSocket(platform.app.options.rtcws); 

			connection.onmessage = function (message) { 

			   handlers.message(message)
			   
			};

			connection.onerror = function (error) { 
			   
			   console.log('error', error)
			   
			};

			connection.onopen = function(){

				opened = true;

				if (clbk)
					clbk()
			}

			connection.onclose = function(){

				opened = false;
				
				if(closing){
					return;
				}

				/*syncInterval = retry(function(){

					return self.opened

				}, function(){

					channelEvents.sendSyncRequest(chatid)

				})*/

				init();
			}

			self.rtchttp = new rtchttp()

			iniclbks()
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

		    	clbk(d1, d2)
		    }

		}

		self.api = {
			login : function(clbk){
				if (user){

					send({ 

				        type: "login", 
				        id: user.id,
				        address : user.address,
				        signature : user.signature,
				        publicKey : user.publicKey,
				        deviceModificator : deviceModificator

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

		self.destroy = function(){

			if(closing) return

			iniclbks()

			closing = true;

			connection.close();

			_.each(self.chats || {}, function(c){
				c.close()
			})
		}

		self.init = init

		return self;
	}

	return new clientRTC()

}