
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

				console.log("UPDATE", c, unreaded)

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
				users : function(ids){
					ajax({
						action : "chats.users",
						data : {
							chats : ids
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

		var intervals = {};

		
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

			receiveRelay : function(message, chatid){
				var relay = self.peer.relay;

					relay.storages.addStorage(chatid)
					relay.storages.addMessage(message.message, chatid, message.from, message.addresses)

			},

			receiveRelayForMe : function(data){
				relay.recieveChats(data.messages)
			}
		}

	

		self.init = function(c){


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

				console.log('self.c.onmessage', m)

				var data = {}

				try {
					data = JSON.parse(m.data); 
				} 
				catch (e){

				}

				var chatid = data.chatid;
				var message = data.message || {};


				console.log('message', message)

				//console.log("Got message:", chatid, message); 

				if (message.sync_request) {
			        channelEvents.receiveSyncRequest(message, chatid);
			        return;			        
			    }

			    if (message.sync_answer) {
			        channelEvents.receiveSyncAnswer(message, chatid);
			        return;
			    }

			    if (message.relaySend) {

			    	channelEvents.receiveRelay(message, chatid);

			    	//add to my storage

			        return;
			    }

			    if (message.relayToReciever) {

			    	channelEvents.receiveRelayForMe(message);

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

			_.each(intervals, function(interval){
				clearInterval(interval)
			})

			intervals = {}

		}

		self.api = {
			sync : function(chatid){

				intervals.sync = retry(function(){

					return self.opened

				}, function(){

					channelEvents.sendSyncRequest(chatid)

					delete intervals.sync

				})

			},

			send : function(m, chatid){

				intervals['send' + m.id] = retry(function(){

					return self.opened

				}, function(){

					var message = JSON.stringify({

						message : m,
						chatid : chatid

					})

					self.c.send(message)

					delete intervals['send' + m.id]
				})

				
			},

			relaySend : function(m, chatid, from, addresses){

				intervals['relaySend' + m.id] = retry(function(){

					console.log('self.opened')

					return self.opened

				}, function(){

					var message = JSON.stringify({

						message : {

							message : m,
							addresses : addresses,
							from : from,
							relaySend : 1
						},
						
						chatid : chatid,
						

					})

					console.log('SEND', message)
					
					self.c.send(message)

					delete intervals['relaySend' + m.id]

				})
				
				
			},

			relayToReciever : function(messages){

				intervals.relayToReciever = retry(function(){

					return self.opened

				}, function(){

					var message = JSON.stringify({

						message : messages,
						relayToReciever : 1

					})
					
					self.c.send(message)

					delete intervals.relayToReciever

				})
				
				
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

			if(id == 'relay') self.relay = null;

			if(_.isEmpty(self.chats) && !self.relay){

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

		self.relaySend = function(message, chatid, from){
			self.channel.api.relaySend(message, chatid, from, self.relay.users)
		}

		self.relayToReciever = function(id){


			self.channel.api.relay(self.relay.storages.get(id))

			self.relay.release(id)

		}

		return self;
	}

	var relayRTC = function(device, offlineUsers, events){
		var self = this;

			self.peer = null;
			self.id = device;

	
		self.storages = {

			clear : function(userid){

				var removechats = [];

				_.each(relaystorage, function(messages, chatid){

					relaystorage[chatid] = _.filter(messages, function(message){

						delete message.a[userid];

						if(!_.isEmpty(message.a)){
							return true;
						}

					})

					if (!relaystorage[chatid].length){
						removechats.push(chatid)
					}
				})

				_.each(removechats, function(chatid){
					delete relaystorage[chatid]
				})
			},

			get : function(userid){
				var chats = {};

				_.each(relaystorage, function(chat, chatid){
					var messages = _.filter(chat, function(message){

						if(message.a[userid]) return true

					})

					if (messages.length){
						chats[chatid] = _.map(messages, function(mobj){
							return {
								message : mobj.m,
								from : mobj.f
							}
						})
					}
				})

				return chats;
			},

			addStorage : function(chatid){
				if(!relaystorage[chatid]){
					relaystorage[chatid] = []
				}

				return relaystorage[chatid]
			},

			addMessage : function(m, chatid, from, addresses){

				var addressesMap = {};

				_.each(addresses, function(a){
					addressesMap[a] = true
				})

				relaystorage[chatid].push({
					m : m,
					f : from,
					a : addressesMap
				})

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

			self.linkPeer(self.peer)

		    return self.peer
		}

		self.linkPeer = function(peer){
			peer.relay = self
		}

		self.release = function(userid){

			self.relay.storages.clear(userid)

			if (events.release){
				events.release(userid)
			}

		}

		self.recieveChats = function(chats){


			if (events.recieveChats){
				events.recieveChats(chats)
			}

			


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


		    self.linkPeer(peer, user.id)

		    return peer
		}

		self.linkPeer = function(peer, id){
			peer.chats[self.id] = self

		    self.peers[id] = peer
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
				events.send(message.tm + message.f)
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

		self.get = {
			message : function(id){
				return self.storage.GetMessage(id);
			}
		}

		self.close = function(){

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

			self.relayed = {};

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

		var relayed = {
			relay : function(data){

				if(!self.relay[data.id]){

					relays.create(data.id, [])

				}

				var peer = peers[data.id]

				if(!peer){
					peer = self.relay[data.id].peer({

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

						        relay : user.id,

						        getRelay : true
						    }); 
						}
					})

					peer.offer()

				}

				return self.relayed[id]
			},
			direct : function(data){
				var chs = []

				var chatids = []

				_.each(data.chats, function(chat){
					var ch = chats.create(chat.chatid, chat.addresses)

						chs.push(ch)
						chatids.push(ch.id)

				    _.each(clbks.chat || {}, function(c){
				    	c(data, ch)
				    })

				})
			    	
			    if (chs.length){

			    	var peer = peers[data.id]

					_.each(chs, function(ch){

						if(!peer){
							peer = ch.peer({

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
								        chatid : chs[0].id
								    }); 
								}
							})

							peer.offer()
						}
						else
						{
							ch.linkPeer(peer, data.id)
						}


						peer.sync(chat.id)
					})
					

			    }
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
						},

						recieveChats : function(chats){

							var ids = _.map(chats, function(m, id){
								return id
							});

							chats.createMany(ids, function(){

								_.each(chats, function(messages, chatid){

									var chat = self.chats[chatid]

									_.each(messages, function(message){

										self.rtchttp.update.chat(chatid, 1, chat.addresses)

										chat.receive.message(message.message)

										notification({
											type : 'message',
											chatid : chatid,
											address : message.from
										})

									})
								})

							})

							

							/*	

							notification(data)

							self.rtchttp.update.chat(data.chatid, 1, data.addresses)

							_.each(self.clbks.message || {}, function(c){
						    	c(data, chat)
						    })

							chat.connect(function(){

								_.each(self.clbks.chat || {}, function(c){
							    	c(data, chat)
							    })

							}, 60000)*/
						}
					})
				}

				return self.relay[id]
			},

			close : function(id){

				if(!self.relay[id]) return

				self.relay[id].close()
			},

			
		}

		var chats = {

			createMany : function(ids, clbk){
				self.rtchttp.get.chats.users(ids, function(info){

					_.each(ids, function(id){

						addresses = info[id] || [];

						var chat = self.chats[id]

						if(!chat){
							chat = chats.create(id, addresses)
						}

					})

					if (clbk)
						clbk()

				})
			},

			create : function(id, addresses){

				if(!self.chats[id]){

					self.chats[id] = new chatRTC(id, addresses, {
						send : function(mid){
							send({
								type : 'message',
								chatid : id,
								id : mid
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
					else
					{
						chat.linkPeer(peer, data.id)
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

				console.log("OFFER RECIEVED", data)

				var r = retry(function(){

					if (data.chatid){
						context = self.chats[data.chatid]
					}

					if (data.relay)
					{
						relays.create(data.relay, data.offline)

						context = self.relay[data.relay]
					}

					console.log('context', context)

					if (context) return true


				}, function(){

					console.log("OFFER RECIEVED 2", data)


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

					}
					else
					{
						context.linkPeer(peer, data.id)
					}

					peer.answer(data.offer)

					if (data.chatid){
						peer.sync(data.chatid)
					}

					if (data.relay && data.get){
						peer.relayToReciever(data.id)

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

				console.log('data', data)

				_.each(data.online || [], function(user){
					var relay = relays.create(user.device, data.offline)

					var peer = peers[user.id]

					console.log('relay', relay, peer)

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

							        relay : user.device
							    }); 
							}
						})

						console.log('peer.offer')

						peer.offer()

					}


					console.log('relaySend', self.chats[data.chatid].get.message(data.id), data.chatid, user.address)

					peer.relaySend(self.chats[data.chatid].get.message(data.id), data.chatid, user.address) // + messages
						
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
			getRelayed : function(clbk){
				self.rtchttp.get.relayed(function(relayed){
					if(relayed){

						lazyEach({
							array : relayed.direct || [],
							action : function(p){
								var direct = p.item;

								p.success();
							},

							all : {
								success : function(){
									lazyEach({
										array : relayed.relay || [],
										action : function(p){
											var relay = p.item;

											p.success();
										},

										all : {
											success : function(){
												if (clbk)
													clbk()
											}
										}
									})
								}
							}
						})

						

					}
				})
			},	
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