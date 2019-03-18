var messenger = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, chats, selected, openingChat;

		var actions = {
			toChat : function(chatid){
				el.c.addClass('toChat')

				renders.chat(chatid)
			},

			unread : function(chatid){

				var rtchttp = self.app.platform.clientrtc.rtchttp;

				var c = 0;

				var info = deep(rtchttp, 'storage.chat.' + chatid)

				if (info){
					c = info.messages.unreaded
				}

				return c;
			}
		}



		var events = {

			toChat : function(){

				var chatid = $(this).closest('.chat').attr('chat')

				actions.toChat(chatid)
			},

			toNewChat : function(){
				el.c.addClass('toNewChat')

				selected = [];

				renders.userslist()
			},

			backToChats : function(){
				el.c.removeClass('toNewChat')
				el.c.removeClass('toChat')
			},

			selectUser : function(){
				var e = $(this)
					e.toggleClass('active')

				var a = e.attr('address');

				if(e.hasClass('active')){
					selected.push(a)
				}
				else
				{
					removeEqual(selected, a)
				}				
			},

			createChat : function(){
				if(selected.length){

					var uselected = _.sortBy(selected, function(a){
						return a
					})

					uselected.unshift(self.app.platform.sdk.address.pnet().address)

					var hash = _.reduce(uselected, function(m, a){
						return m + '' + a
					}, '')

					var chat =  self.app.platform.sdk.chats.add(bitcoin.crypto.hash256(hash).toString('hex'), 'messenger') 
						chat.users = _.clone(uselected)

					self.app.platform.sdk.chats.save()

					self.app.platform.sdk.messenger.getChat(chat)

					chats = self.app.platform.sdk.chats.get('messenger');

					make()

					actions.toChat(chat.id)


					
				}
				else
				{
					dialog({
						html : "You must select at least one user",
						class : "one"
					})
				}
			}
		}

		var loaders = {
			users : function(list, clbk){
				self.app.platform.sdk.users.get(list, clbk)
			},

			info : function(clbk){

				var rtchttp = self.app.platform.clientrtc.rtchttp;

				self.app.platform.clientrtc.rtchttp.info.allchats(function(){
					if (clbk)
						clbk()
				})	

			}
		}

		var renders = {

			chat : function(chatid){
				self.shell({

					name :  'chat',
					el :   el.chat,
					data : {
						chatid : chatid
					},

				}, function(_p){
					
					var chat = self.app.platform.sdk.chats.storage[chatid]


					var p = {
						open : true,
						href : 'mchat',
						animation : false,
						history : true
					}

					
					p.history = false;

					p.el = _p.el.find('.chatWrapper')	

					p.essenseData = {
						view : 'buildin',

						chat : chat,

						destroyClbk : function(){

							openedChat = null;

							events.backToChats();
						}
					}

					p.clbk = function(r, p){

						openedChat = p;
					}


					self.nav.api.load(p)


				})
			},

			chats : function(chats, clbk){
				self.app.platform.sdk.chats.info(chats, function(){

					self.shell({

						name :  'chats',
						el :   el.chats,
						data : {
							chats : chats
						},



					}, function(_p){
						
						_p.el.find('.chatBody').on('click', events.toChat)

						if (clbk){
							clbk()
						}

					})

				})

			},
			userslist : function(){

				var list = [];

				var me = deep(self.app, 'platform.sdk.users.storage.' + self.app.platform.sdk.address.pnet().address)

				_.each(deep(me, 'subscribes') || [], function(a){
					list.push(a.adddress) 
				})

				_.each(deep(me, 'subscribers') || [], function(a){
					list.push(a) 
				})

				list = _.uniq(list)

				loaders.users(list, function(){

					self.shell({

						name :  'userslist',
						el :   el.userslist,
						data : {
							list : list
						},

					}, function(_p){
						_p.el.find('.addressTable').on('click', events.selectUser)
					})

				})
			},

			newmessages : function(chatid, clbk){

				var _el = el.chats.find('[chat="' + chatid + '"] .newMessages')

				var count = actions.unread(chatid);

				if (count){
					self.shell({

						name :  'newmessages',
						el :   _el,
						data : {
							count : actions.unread(chatid)
						},

						display : 'table-cell'

					}, function(_p){
						
						if (clbk)
							clbk()

					})
				}
				else
				{
					_el.css('display', 'none')

					if (clbk)
						clbk()
				}

				


			},

			newmessagesAll : function(clbk){

				lazyEach({
					array : _.toArray(chats),

					action : function(p){
						renders.newmessages(p.item.id, p.success)
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

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			el.newChat.on('click', events.toNewChat)

			el.back.on('click', events.backToChats)

			el.createChat.on('click', events.createChat)

			search(el.messengerSearch, {
				placeholder : 'Search',

				clbk : function(_el){

					

				},

				events : {
					fastsearch : function(value, clbk){
						clbk(null)
					},

					search : function(value, clbk){
						
						
					}
				}
				
			})

			search(el.usersSearch, {
				icon : '<i class="fas fa-users"></i> Recievers',

				class : 'recievers',

				clbk : function(_el){

					

				},

				collectresults : true,

				events : {
					fastsearch : function(value, clbk){
						clbk(['asdads', 'asdasd', 'assaddss'])
					},

					search : function(value, clbk){
						
						
					}
				}
				
			})
			
			self.app.platform.sdk.messenger.clbks.messenger = function(key, data){

				if (key == 'chat'){
					chats = self.app.platform.sdk.chats.get('messenger');

					make()
				}

				if (key == 'message'){
					renders.newmessages(data.id, p.success)
				}

				
			}
		}

		var make = function(){
			renders.chats(chats, function(){
				loaders.info(function(){
					renders.newmessagesAll()
				})

			})
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				chats = self.app.platform.sdk.chats.get('messenger');

				self.loadTemplate({
					name : 'newmessages'
				}, function(){

					clbk(data);
				})

			},

			destroy : function(){
				delete self.app.platform.sdk.messenger.clbks.messenger

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.newChat = el.c.find('.newMessage')
				el.back = el.c.find('.back')
				el.messengerSearch = el.c.find('.messengerSearch')
				el.usersSearch = el.c.find('.usersSearch')
				el.createChat = el.c.find('.createChat')
				el.userslist = el.c.find('.usersListWrapper')

				el.chats = el.c.find('.mchatsContent')
				el.chat = el.c.find('.currentChat')

				initEvents();

				make()

				p.clbk(null, p);
			}
		}
	};



	self.run = function(p){

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function(){

		_.each(essenses, function(essense){

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = messenger;
}
else{

	app.modules.messenger = {};
	app.modules.messenger.module = messenger;

}