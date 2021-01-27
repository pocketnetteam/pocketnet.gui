var chat = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var id = makeid(), readinterval;

		var el;
		var essenseData = {};
		var topcaption = null;
		var bottomcaption = null;
		var getPreviewTimer = null;

		var mestate;

		var newmessageslength = 0;

        var chat = null;
        var chatInterval = null;
		var lastUpdate = null;

		var lastmessage = null;

		var renderedMessages = {};
		var renderedMessagesTime = {};

		var actions ={}

		var events = {}

		var helpers = {}
		var renders = {
			gallery : function(p){

				if(!p) p = {};

				self.app.nav.api.load({
					open : true,
					id : 'imageGallery',
					inWnd : true,
					essenseData : p
				})

			},

			safemessages : function(messages, clbk){

				
				var times = _.map(renderedMessagesTime, function(m, t){
					return {
						m : m,
						t : t
					}
				})

				times = _.sortBy(times, function(mt){
					return Number(mt.t);
				})

				var messagesPack = [];

				_.each(times, function(mt, index){

					var pack = {
						newmessages : [],
						oldmessage : mt
					};

					_.each(messages, function(m){

						if( (Number(m.tm) < Number(mt.t) || (index == times.length - 1)) 

							&& (!index ||  Number(times[index - 1].t) > Number(m.tm))){


							pack.newmessages.push(m)

						}

					})

					if(pack.newmessages.length)
					{
						pack.newmessages.push(pack.oldmessage.m)

						pack.newmessages = _.sortBy(pack.newmessages, function(m){
							return Number(mt.t);
						})

						messagesPack.push(pack)
					}

				})

				if(messagesPack.length){
					lazyEach({
						array : messagesPack,
						action : function(p){
							var pack = p.item

							var el = helpers.findEl(pack.oldmessage)


							renders.messages(p.success, pack.newmessages, null, el)
						},

						all : {
							success : clbk
						}
					})
				}
				else
				{
					renders.messages(clbk, messages)
				}

			},

			messages : function(clbk, messages, saveTempMessages, replace){

				if(!el.c) return

				messages = _.filter(messages, function(m, i){

						
					var t = m.tm

					if(m.tm.length == 17) m.tm = t + '0'


					if(lastmessage && lastmessage.tm > m.tm) return

					if(messages.length - 50 > i) return false

						return true
				})

				var scrollMode = 'toLast';

				if (messages) scrollMode = 'fixed';

				var px = actions.scrollPx(scrollMode);

				messages || (messages = []);

				messages = _.filter(messages, function(m){
					var id = m.tm + m.f

					if(!m.tm) return false

					if(!renderedMessages[id]) {

						renderedMessages[id] = true;

						renderedMessagesTime[m.tm] = m;



						return true;
					}

				})

				var sorted = _.sortBy(messages, function(msg){

					var t = msg.tm

					if(msg.tm.length == 17) msg.tm = t + '0'

					return Number(msg.tm)
				})


				if(!saveTempMessages) actions.clearTempMessages()

				//lastUpdate = chat.lastUpdate;

				var inner = append;
				var _el = el.messages;

				if (replace) {
					inner = replaceWith
					_el = replace;
				}

				if(!messages.length){
					if (clbk)
						clbk();
					
					return
				}
				
				lastmessage = sorted[sorted.length - 1]

				self.shell({
					name :  'messages',
					el :   _el,
					data : {
						chat : chat,
						messages : sorted						
					},

					inner : inner

				}, function(_p){

					if (essenseData.messagesClbk)
					{
						essenseData.messagesClbk();
					}

					

					el.messages.find('.attachment').off('click')

					el.messages.find('.attachment').on('click', events.getAttachment)

					events.messagesInView();

					var els = el.messages.find('.chatmessage');

					if (els.length > 0){
						el.c.find('.other').fadeOut(1);
					}
					else
					{
						el.c.find('.other').fadeIn(1);
					}

					if(saveTempMessages) px = 'toLast'

						actions.spacer();

					setTimeout(function(){
						actions.scrollToPx(scrollMode, px);
					}, 20)

					

					if (topcaption)
						topcaption.action();

					if (bottomcaption)
						bottomcaption.action();

					/*if(_p.el.find('img').length){
						_p.el.find('img').imagesLoaded(function(image){*/
						
							

							actions.countUnread();

							/*actions.scrollToPx(scrollMode, px);

							
						/*})
					}*/

					

					if (clbk)
						clbk();
					
				})
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){}



		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

				var _chat = deep(p, 'settings.essenseData.chat');

				if(!_chat){

					var chatid = parameters().chatid

					_chat = self.app.platform.sdk.discussions.fromChatId(chatid)

				}

				var ed = deep(p, 'settings.essenseData') || {};

				if (_chat) 
				{
					chat = _chat.chat
					self.app.platform.sdk.chats.info([_chat.chat], function(d){

						data.chat = _chat;


						self.app.platform.sdk.tempmessenger.getChat(_chat.chat)

						data.canEnc = true;

						self.app.platform.sdk.ustate.me(function(_mestate){

							mestate = _mestate

							data.mestate = mestate;
						
							clbk(data);

						})

					})

					
				
				}
					

			},

			destroy : function(){

			},
			
			init : function(p){

				console.log("INICHAT")


				renderedMessages = {};
				renderedMessagesTime = {};

				essenseData = p.essenseData || {};
				essenseData.view || (essenseData.view = 'buildin')

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.c.addClass(essenseData.view)

				initEvents();

				//setTimeout(function(){

					p.clbk(null, p);

				//}, 10)
			},
			id : id,
			api : events
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
	module.exports = chat;
}
else{

	app.modules.chat = {};
	app.modules.chat.module = chat;

}