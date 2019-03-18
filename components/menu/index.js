var menu = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(){

		var el,
			searchBlurTimer = null,
			autoUpdate = null,
			autoUpdateWallet = null;

		var loc = new Parameter({

			type : "VALUES",
			name : "Localization",
			id : 'localization',
			defaultValue : app.localization.current().name,
			possibleValues : app.localization.availableMap('name'),
			format : {
				right : true
			},

			_onChange : function(value){
				var a = app.localization.findByName(value);

				if (a && a.key != app.localization.key)
				{
					app.localization.set(a.key);
				}
			}

		})

		var balanceHash;

		var actions = {
			/*extraLinks : function(){
				self.app.nav.clbks.history.menu = events.hambclose.click;
			},*/
			autoUpdate : function(){

				self.app.user.isState(function(state){

					if(state){


					}

				})

			},

			searchWidth : function(){


				if(el.postssearch.offset()){
					
					var left = el.postssearch.offset().left;

					var w = el.postssearch.width()

					var right = el.c.width() - left - w;

					var d = left - right;	

					el.postssearch.width(w + d)

				}

				
			},

			ah : function(el, c){
				if (c > 0){
					el.addClass('amountHave')
				}
				else
				{
					el.removeClass('amountHave')
				}

				el.find('.amount').html(c)
			}
		}

		var events = {
			activate : {
				click : function(){

					dialog({
						header : self.app.localization.e('id167'),
						html : self.app.localization.e('id168'),
						class : "one",
						btn1text : self.app.localization.e('id169'),

						success : function(){
							self.app.platform.sdk.user.activateWithDialogs(function(result){

							})
						}
					})

				}
			},

			notifications : {
				init : function(el){

					var unseen = function(){

						return _.filter(self.app.platform.sdk.notifications.storage.notifications, function(n){
							if(!n.seen) return true
						})

					}

					self.app.platform.sdk.notifications.init(function(){
						var l = unseen().length;

						actions.ah(el, l)

						self.app.platform.api.electron.notifications(l, 'notifications')

						if(!isMobile())

							self.nav.api.load({
								open : true,
								id : 'notifications',
								el : el,
								inTooltip : true
							})

					})

					self.app.platform.sdk.notifications.clbks.added.menu =
					self.app.platform.sdk.notifications.clbks.seen.menu = function(){
						var l = unseen().length;

						actions.ah(el, l)

						self.app.platform.api.electron.notifications(l, 'notifications')
					}
				},

				click : function(el){

					if(isMobile())
						self.nav.api.go({
							href : 'userpage?id=notifications&report=notifications',
							history : true,
							open : true
						})

				}
			},

			messenger : {
				init : function(el){

					var rtchttp = self.app.platform.clientrtc.rtchttp;

					var unread = function(){

						var c = 0;

						console.log('rtchttp.storage', rtchttp.storage)

						_.each(rtchttp.storage.chat, function(info, id){

							console.log(info)

							c = c + info.messages.unreaded 
						})

						return c;
					}

					self.app.platform.clientrtc.rtchttp.info.allchats(function(){

						actions.ah(el, unread())

					})	

					self.app.platform.sdk.messenger.clbks.menu = function(){
						actions.ah(el, unread())
					}

				},

				click : function(el){

					if(!isMobile())
						self.nav.api.go({
							href : 'userpage?id=messenger&report=messenger',
							history : true,
							open : true
						})
					else
						self.nav.api.load({
							href : 'messenger',
							history : true,
							open : true
						})

				}
			},

			savecross : {
				init : function(el){

					var n = deep(self.app, 'platform.sdk.user.storage.me.rc') || 0

					actions.ah(el, n)

					self.app.platform.ws.messages.event.clbks.menusave = function(d){
						if(d.mesType == 'userInfo'){

							var n = deep(self.app, 'platform.sdk.user.storage.me.rc') || 0

							actions.ah(el, n)
							
						}
					}
				},
				click : function(){
					self.nav.api.load({
						open : true,
						href : 'socialshare',
						history : true,
						inWnd : true,

						essenseData : {
							rescue : true
						}
					})
				}
			},

			search : {
				click : function(){
					el.c.toggleClass('searchactive')

					if(el.c.hasClass('searchactive')){
						el.postssearch.find('input').focus();

						actions.searchWidth()

						if(searchBlurTimer) {
							clearTimeout(searchBlurTimer)
							searchBlurTimer = null
						}
					}
				}
			},
			searchinit : {
				init : function(_el){

					search(el.postssearch, {
						placeholder : 'SEARCH ON POCKETNET...',

						clbk : function(_el){

							_el.find('input').on('blur', function(){

								/*searchBlurTimer = slowMade(function(){
									el.c.removeClass('searchactive')
								}, searchBlurTimer, 10000)*/
								
							})

						},

						last : {
							get : function(){

								return [];

							},

							tpl : function(result, clbk){
								
							}
						},

						events : {
							fastsearch : function(value, clbk){

								self.app.platform.sdk.search.get(value, 'fs', function(r){

									renders.results(r.fastsearch || [], value, function(tpl){

										clbk(tpl, function(el, helpers){

											el.find('.result').on('click', function(){

												var r = $(this).attr('.result')

												self.nav.api.go({
													href : 's?ss=' + r,
													history : true,
													open : true
												})

												helpers.closeResults()

											})
										})

									})

								})
								
							},

							search : function(value, clbk, e, helpers){
								
								self.nav.api.go({
									href : 's?ss=' + value,
									history : true,
									open : true
								})

								helpers.closeResults()

								if (clbk)
									clbk(true)
								
							}
						}
						
					})
				}
			},
			newaccount: {
				
				click : function(){
					self.nav.api.go({
						href : 'registration',
						history : true,
						open : true
					})	
				}

			},
			ustate : {
				click : function(){

					if(isMobile())
						self.nav.api.go({
							href : 'userpage?id=ustate&report=ustate',
							history : true,
							open : true
						})
					
				},

				init : function(el){

					if(!isMobile())

						self.nav.api.load({
							open : true,
							id : 'ustate',
							el : el,
							inTooltip : true
						})

					var act = function(){
						self.app.platform.sdk.user.waitActions(function(r){
							self.app.platform.sdk.ustate.attention(1, function(error){

								if(error || !self.app.user.validate() || r){
									el.removeClass('hidden')
								}
								else
								{
									el.addClass('hidden')
								}

								self.app.platform.sdk.ustate.me(function(_mestate){
									if(_mestate){
										el.removeClass('disconected')

										if (self.app.user.validate() && r){
											el.addClass('wait')
										}
										else
										{
											el.removeClass('wait')
										}
									}
									else
									{
										el.addClass('disconected')


									}
								})
								
							})
						})
					}

					act()

					self.app.platform.sdk.ustate.clbks.menu = act;
					self.app.platform.ws.messages.transaction.clbks.menu = act;

					
				}
			},
			wallets : {
				click : function(){

					
					self.nav.api.go({
						open : true,
						href : 'userpage?id=wallet',
						history : true
					})
					
				},

				init : function(el){

					var al = el.find('.number');
					var first = true;
					var current = 0;

					var set = function(value, add){

						var c = 'good';

						el.removeClass('hidden')

						if(add < 0) c = 'bad'
					
						al.animateNumber({
					    	number: add,

					    	numberStep: function(now, tween) {

					    		actions.searchWidth()

					    		el.addClass(c)

					        	var number = Number(value + now).toFixed(8),
					            	target = $(tween.elem);

					           
					    		target.text(self.app.platform.mp.coin(number));

					    	},

					    }, rand(400, 1200), function(){

					    	el.removeClass(c)

					    });
					}

					var setValue = function(added){


						var value = current

						if (first || typeof added == 'undefined'){

							first = false;

							self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

								set(amount, added)

								current = amount;

								self.app.platform.sdk.wallet.drawSpendLine(el.find('.numberWrp'))
							})
						}
						else
						{
							set(value, added)

							current = value + added
						}

					}

					var setNewBalance = function(){
						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

							setValue(amount - current)	
							
						})
					}

					var act = function(added){

						setValue(added)
						
					}

					self.app.platform.sdk.node.transactions.clbks.menu = act;

					act(0)
					
				}
			},
			signout : {
				click : function(){
					self.app.user.signout();

					self.app.reload({
						href : 'authorization'
					});
				}
			},
			signin : {
				init : function(element){

				},
				click : function(){
					self.nav.api.go({
						href : 'authorization',
						history : true,
						open : true
					})	
				}
			},

			signup : {
				init : function(element){

				},
				click : function(){
					self.nav.api.go({
						href : 'registration',
						history : true,
						open : true
					})	
				}
			},

			/*hamb : {
				click : function(){
					var _cl = el.c.hasClass('active');

					if (_cl)
					{
						el.c.removeClass('active');
						self.app.actions.onScroll();

					}
					else
					{
						el.c.addClass('active');
						self.app.actions.offScroll();
						
					}
				}
			},
			hambclose : {
				click : function(){

					el.c.removeClass('active');

					self.app.actions.onScroll();
				}
			}*/
		}

		var initEvents = function(){

			el.c.find('[events]').each(function(){

				var element = $(this);

				var ekey = element.attr('events');

				if (events[ekey]){

					_.each(events[ekey], function(action, event){

						if(event == 'init')
						{
							action(element)
						}
						else
						{
							element.on(event, action)
						}


					})

				}

			})

			$(window).on('resize', actions.searchWidth)

			ParametersLive([loc], el.c);

			autoUpdate = setInterval(actions.autoUpdate, 100);
		}

		var renders = {
			results : function(results, value, clbk){
				if(!p) p = {};

				self.shell({
					name :  'results',
					data : {
						results : results,
						value : value
					},

				}, function(_p){
					if (clbk)
						clbk(_p.rendered);
				})
			}
		}

		var make = function(){

			self.app.user.isState(function(state){

				if(parameters().ss){

					el.c.addClass('searchactive')
					actions.searchWidth()

					el.postssearch.find('input').val(parameters().ss);

				}
				
			})

		}

		

		return {

			getdata : function(clbk, p){



				var data = {};

					loc.value = app.localization.current().name;

					data.loc = loc;
					data._SEO = _SEO;

				if(p.state){

					clbk(data)
					

				}
				else
				{
					clbk(data);
				}

				

			},

			destroy : function(){

				$(window).off('resize', actions.searchWidth)

				delete self.app.platform.sdk.node.transactions.clbks.menu
				delete self.app.platform.ws.messages.event.clbks.menusave

				delete self.app.platform.sdk.notifications.clbks.seen.menu
				delete self.app.platform.sdk.notifications.clbks.added.menu

				delete self.app.platform.sdk.messenger.clbks.menu

				if(autoUpdate){
					clearInterval(autoUpdate);
				}

				if(autoUpdateWallet)
					clearInterval(autoUpdateWallet);

				el = {};
			},
			
			init : function(p){


				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.a = p.el.find('.additionalbar');
				el.cart = el.c.find('.cart');
				el.likes = el.c.find('.favorites');

				el.messagesCount = el.c.find('.dialogs .count');
				el.notificationsCount = el.c.find('.notifications .count');

				el.walletsAmount = el.c.find('.wallets .amount');
				el.notactive = el.c.find('.notactive');
				el.currency = el.c.find('.currencyWrapper');
				el.postssearch =  el.c.find('.postssearch')

				initEvents();

				make();

				

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
	module.exports = menu;
}
else{

	app.modules.menu = {};
	app.modules.menu.module = menu;

}