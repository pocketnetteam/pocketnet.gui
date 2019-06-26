var discussions = (function(){


	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var opening = {};
		var inited = {};
		var closing = {};

		var ed = null;

		var initp = null;

		var el, discussions, w, inViewTimer, block = false;

		var openedChat = null;
		var openingChat = null;

		var actions = {
			preloader : function(show){

				if(!el.c) return

				if(show){
					el.c.addClass('loading')
				}
				else
				{
					el.c.removeClass('loading')
				}

				
			},
			inView : function(clbk, selector, nv){
 
				if(_.toArray(discussions).length &&  el.c){
					
					var els = el.c.find(selector || '.discussion');

					var f = 'offset'

					if(ed.view == 'fixedin'){
						f = 'position'
					}
					
					var inv = inView(els, {
						inel : w,
						offset : 0,
						mode : 'part',
						f : f
					})


					if (inv.length > 0){

						var invmap = {};
					
						var invdiscussions = _.map(inv, function(el){
						
							var id = $(el).attr('chat');

							invmap[id] = true;

							return discussions[id]
						})

						if(nv){
							var ds = [];

							_.each(discussions, function(d, id){
								if(!invmap[id]){
									ds.push(d)
								}
							})

							nv(ds)
						}

						if (clbk)
							clbk(invdiscussions)
					}

				}
				
			},

			chatp : function(id){
				if (discussions[id]){	

					actions.preloader(true);

					retry(function(){

						if(inited[id] || !opening[id]) return true

					}, function(){

						actions.chat(discussions[id])
					})
					
				}
			},

			chat : function(discussion){	

				openingChat = true;		
				
				actions.closeAll(function(){	


					self.app.platform.sdk.chats.save()	

					var v = 'buildin';

					var p = {
						open : true,
						href : 'chat',
						animation : false,
						history : true
					}


					if(ed.view == "fixedin"){

					
						p.history = false;

						p.el = el.c.find('.chatWrapper')	

						p.essenseData = {
							view : 'fixedin',

							chat : discussion,

							destroyClbk : function(){

								openingChat = false

								actions.preloader(true)

								el.c.removeClass("forChat");

								p.el.html('')

								renders.discussions(null, function(){	

									openedChat = null;

									actions.preloader(false)

									w.scrollTop(0)
									setTimeout(function(){
										actions.openInView();
									}, 100)
									

								})
								
							}
						}

						p.clbk = function(r, p){

							openedChat = p;

							el.c.addClass("forChat");

							actions.preloader(false)
						}
					}

					else
					{
						p.href = 'chat?chatid=' + discussion.chat.id
					}


					self.nav.api.load(p)

				})
				
			},

			open : function(discussion, clbk){

				return

				/*if(opening[discussion.chat.id]){

					retry(function(){
						return inited[discussion.chat.id]
					}, clbk)
				}
				else
				{*/
					opening[discussion.chat.id] = true

					/*self.app.platform.rtc.connect(discussion.chat.id, {

						sendMessage : function(msg){

							self.app.platform.rtc.load.users(msg, function(){
								renders.message(msg, discussion.chat.id)
							})
						},

						receiveMessage : function(msg){

							self.app.platform.rtc.load.users(msg, function(){
								renders.message(msg, discussion.chat.id)
							})

						},

						receiveMessages : function(msgs){

							var msg = msgs[msgs.length - 1]

							self.app.platform.rtc.load.users(msg, function(){
								renders.message(msg, discussion.chat.id)
							})

						},

						onclose : function(){							

						},

						onopen : function(){
						

						}			

					}, function(){



						inited[discussion.chat.id] = true

						if (clbk)
							clbk()

					})*/

					var m = _.toArray(self.app.platform.rtc.storages[discussion.chat.id]._db || {});

					if (m.length){

						var me = m[m.length - 1]

						self.app.platform.rtc.load.users(me, function(){
							renders.message(me, discussion.chat.id)
						})							
					}
				//}


				
			},

			remove : function(id){

				actions.preloader(true)

				actions.close(id, function(){

					actions.preloader(false)

					self.app.platform.sdk.chats.remove(id)

					discussions = self.app.platform.sdk.discussions.fromChats(self.app.platform.sdk.chats.get('share'), ed.author)

					var _el = el.c.find('.discussion[chat="'+id+'"]')

						_el.remove()

					

					renders.empty();
				})

				
			},

			openInView : function(selector){
				actions.inView(function(d){

					var ids = _.map(d, function(d){

						return d.chat.id
					})

					_.each(d, function(d){

						actions.open(d)

					})
				}, '.discussion:not(.dempty)', function(nv){

					var ids = _.map(nv, function(d){
						return d.chat.id
					})

					actions.closeMany(ids)
				})
			},

			close : function(id, clbk){

				if(closing[id]){

					retry(function(){

						if(!closing[id]) return true

					}, clbk)

				}
				else{
					closing[id] = true

					retry(function(){

						if(inited[id]) return true

					}, function(){

						self.app.platform.rtc.destroy(id)

						delete closing[id]
						delete inited[id]
						delete opening[id]

						clbk()

					})
				}

				
			},

			closeMany : function(ids, clbk){
				lazyEach({
					array : ids,
					action : function(p){
						var id = p.item;

						if(opening[id]){
							actions.close(id, p.success)
						}
						else
						{
							p.success()
						}
					},

					all : {
						success : function(){

							if (clbk)
								clbk()
						}
					}

				})

				
			},

			closeAll : function(clbk){

				var m = _.map(opening, function(o,id){
					return id
				})

				lazyEach({
					array : m,
					action : function(p){
						var id = p.item;

						actions.close(id, p.success)
						
					},

					all : {
						success : function(){

							opening = {};
							inited = {};
							closing = {};

							if (clbk)
								clbk()
						}
					}

				})

				
			}
		}

		var events = {

			inViewScroll : function(){
				inViewTimer = slowMade(function(){

					if(openingChat) return						
					
					events.inView()

					actions.openInView()

				}, inViewTimer, 200)
			},

			inView : function(){


				if (block){
					return
				}

				actions.inView(function(ds){

					block = true;

					self.app.platform.sdk.discussions.info(ds, function(nds){

						renders.fdiscussions(nds, function(){
							block = false;
						})

						discussions = self.app.platform.sdk.discussions.fromChats(self.app.platform.sdk.chats.get('share'), ed.author)

					})
				}, '.discussion.dempty')

			},

			chat : function(){
				var id = $(this).closest('.discussion').attr('chat')

				actions.chatp(id)
				
			},

			remove : function(){
				var id = $(this).closest('.discussion').attr('chat')

				actions.remove(id)
			}
		}

		var renders = {

			empty : function(){

				if (_.toArray(discussions).length){
					el.c.removeClass("sempty")
				}
				else
				{
					el.c.addClass("sempty")
				}
			},

			message : function(message, did){

				self.shell({
					name :  'message',
					inner : html,
					el : el.list.find('[chat="'+did+'"] .lastMessage'),
					data : {
						message : message
					},

				}, function(p){

				})
			},



			discussion : function(discussion, clbk){

				var _el = el.list.find('[chat="'+discussion.chat.id+'"]');

				if(discussion.share && discussion.author){

					self.shell({
						name :  'discussion',
						inner : html,
						el : _el,
						data : {
							discussion : discussion
						},

					}, function(p){

						_el.removeClass('dempty')

						p.el.find('.discussioncnt').on('click', events.chat)
						p.el.find('.remove').on('click', events.remove)

						//actions.open(discussion);

						

						if (clbk)
							clbk();
					})

				}
				else
				{
					_el.remove()

					if (clbk)
							clbk();
				}
			},

			fdiscussions : function(discussions, clbk){

				lazyEach({
					array : _.toArray(discussions),

					action : function(p){
						var d = p.item;

						renders.discussion(d, p.success)
					},

					all : {
						success : function(){

							actions.openInView()

							if (clbk)
								clbk()

						}
					}
				})
			

			},
			discussions : function(d, clbk, insert){

				if(!d) d = discussions


				var _discussions = _.toArray(d);
					_discussions = _.sortBy(_discussions, function(d){
						return -d.chat.time
					})	


				self.shell({
					name :  'discussions',
					inner : insert || html,
					el : el.list,
					data : {
						discussions : _discussions
					},

				}, function(p){

					//setTimeout(function(){
						events.inView()

						if (clbk)
							clbk();
					//}, 150)

					
				})
			},

			discussionTemp : function(d, c, clbk){

				self.shell({
					name :  'discussions',
					el : el.temp,
					data : {
						discussions : d
					},

				}, function(p){

					var _el = p.el.find('.discussion')

					self.app.platform.sdk.discussions.info(d, function(nds){

						self.shell({
							name :  'discussion',
							inner : html,
							el : _el,
							data : {
								discussion : d[0],
								c : c
							},

						}, function(p){

							_el.removeClass('dempty')
							
							_el.on('click', function(){
								self.app.platform.sdk.chats.add(d[0].chat.id, 'share')
							})

							if (clbk)
								clbk();
						})

					})

					
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
			w.on('scroll', events.inViewScroll)

			self.app.platform.sdk.chats.clbks.discussions = function(d, t, c){

				if(t == 'removeTemp'){

					el.temp.html('')
					el.temp.fadeOut(1)

					return
				}


				var discussion = _.toArray(self.app.platform.sdk.discussions.fromChats([d]))

				if(t == 'add'){

					discussions = self.app.platform.sdk.discussions.fromChats(self.app.platform.sdk.chats.get('share'), ed.author)

					renders.empty()

					renders.discussions(discussion, function(){
						actions.chatp(discussion[0].chat.id)
					}, prepend)
				}

				if(t == 'addTemp'){

					renders.discussionTemp(discussion, c, function(){
						
					})

				}



				if(t == 'addtwice'){

					renders.discussions()

					actions.chatp(discussion[0].chat.id)
				}
			}
		}

		var make = function(){
			//renders.empty()
			
			//renders.discussions()

			actions.chatp('6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd')

			//actions.chatp('9560e4555f644956ed40a420f0a327e9b18fb450508108a5a806e74ebe9b011c_PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM')
			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				block = false;

				var k = self.app.platform.sdk.address.pnet().address + 'addedtochat'

				//if(!localStorage[k]){
					localStorage[k] = true
					self.app.platform.sdk.chats.add('6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd', 'share')
					//
					
					//self.app.platform.sdk.chats.add('9560e4555f644956ed40a420f0a327e9b18fb450508108a5a806e74ebe9b011c_PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM', 'share')
				//}


				var data = {};


					discussions = self.app.platform.sdk.discussions.fromChats(self.app.platform.sdk.chats.get('share'), ed.author)

					data.discussions = discussions

				clbk(data);

			},

			destroy : function(){

				if (w)

					w.off('scroll', events.inViewScroll)

				delete self.app.platform.sdk.chats.clbks.discussions

				actions.closeAll();

				if (openedChat){
					openedChat.destroy();

					openedChat = null;
				}

				el = {};
			},
			
			init : function(p){

				initp = p;

				opening = {};
				opened = {};
				inited = {};

				openingChat = false

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				if(ed.view == 'fixedin'){
					w = el.c.find('.discussionsWrapper');
				}
				else
				{
					w = $(window)
				}
				

				el.list = el.c.find('.list')

				el.temp = el.c.find('.gotoDisscussion')

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
	module.exports = discussions;
}
else{

	app.modules.discussions = {};
	app.modules.discussions.module = discussions;

}