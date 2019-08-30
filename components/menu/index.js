var menu = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(){

		var el,
			searchBlurTimer = null,
			autoUpdate = null,
			sitenameToNav = null,
			plissing = null,
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

			elswidth : function(){


				el.c.find('.autowidth.active').each(function(){
					actions.setWidth($(this))
				})

			},

			setWidth : function(_el){

				if(isMobile()) return

				if(_el.offset()){
					
					var left = _el.offset().left;

					var w = _el.width()

					var right = el.c.width() - left - w;

					var d = left - right;	

					_el.width(w + d)

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
			},

			sitenameToNav : function(){

				if(!events.navinit.el) return

				sitenameToNav = slowMade(function(){

					var pn = self.app.nav.current.href

					
					if ((pn == 'index' || pn == 'author') && $(window).scrollTop() > 45){

						el.nav.addClass('active')
						el.c.addClass('menupanelactive')

						el.nav.find('.pcenterLabel').removeClass('active')

						var r = parameters(self.app.nav.current.completeHref, true).r || 'empty'

						if (pn == 'index')
							el.nav.find('.pcenterLabel[r="'+r+'"]').addClass('active')
					}
					else
					{
						el.c.removeClass('menupanelactive')
						el.nav.removeClass('active')
					}

					actions.elswidth()

				}, sitenameToNav, 10)
				
			}
		}

		var events = {

			navinit : {
				init : function(el){

					if(!isTablet()){
						$(window).on('scroll', actions.sitenameToNav)

						self.app.nav.clbks.history.menu = function(href){

							actions.sitenameToNav()

						}
					}

					
				},

				destroy : function(){
					$(window).off('scroll', actions.sitenameToNav)

					delete self.app.nav.clbks.history.menu
				}
			},

			sitename : {

				click : function(){

					self.app.user.isState(function(state){

						if(self.app.nav.get.pathname() != 'index'){
							var k = localStorage['lentakey'] || 'index';

							if (parameters().r == k) k = 'index'

							if (k != 'index') k = 'index?r=' + k

							if(!state) k = 'index'

							self.nav.api.go({
								href : k,
								history : true,
								open : true,
								handler : true
							})
						}

					})

					
				},

				

			},

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

					var cordovabadge = null;
					
					if(typeof cordova != 'undefined'){
						cordovabadge = deep(cordova, 'plugins.notification.badge')
					}
					

					self.app.platform.sdk.notifications.init(function(){
						var l = unseen().length;

						actions.ah(el, l)

						if (cordovabadge)
							cordovabadge.set(l)

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

						if (cordovabadge)
							cordovabadge.set(l)

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


						_.each(rtchttp.storage.chat, function(info, id){

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

					self.app.platform.m.log('sharing_opened_menu', '0')

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

					if (el.c.hasClass('searchactive')){

						searchBackAction = null;

						el.postssearch.find('input').focus();
						el.postssearch.addClass('active')

						if (searchBlurTimer) {
							clearTimeout(searchBlurTimer)
							searchBlurTimer = null
						}
					}
					else
					{
						el.postssearch.removeClass('active')

						el.postssearch.find('input').val('')
					}

					actions.elswidth()
				}
			},
			searchinit : {
				init : function(_el){

					var close = function(cl){

						var pn = self.app.nav.current.href
						if (pn != 's' || cl){
							_el.find('input').val('')
							
							el.c.removeClass('searchactive')

							clearex()
						}

						else{

							if (searchBackAction){
								searchBackAction()
								searchBackAction = null;
							}

						}

						
					}

					var clearex = function(){
						if(searchBlurTimer)
						{
							clearTimeout(searchBlurTimer)
							searchBlurTimer = null;
						}
					}

					search(el.postssearch, {
						placeholder : 'SEARCH ON POCKETNET...',

						clbk : function(_el){

							_el.find('input').on('blur', function(){

								searchBlurTimer = slowMade(function(){

									close()

								}, searchBlurTimer, 200)
								
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

								self.app.platform.sdk.search.get(value, 'fs', null, null, null, function(r){


									renders.results(r || {}, value, function(tpl){

										clbk(tpl, function(el, helpers){

											bgImages(el)

											el.find('.result').on('click', function(){

												var r = $(this).attr('result')

												_el.find('input').val(r)

												self.nav.api.go({
													href : 's?ss=' + r.replace("#", 'tag:'),
													history : true,
													open : true
												})

												helpers.closeResults()

												clearex()

											})

											el.find('.user').on('click', function(){

												var r = $(this).attr('address')

												self.nav.api.go({
													href : 'author?address=' + r,
													history : true,
													open : true
												})

												helpers.closeResults()
												close()
												clearex()

											})
										})

									})

								})
								
							},

							search : function(value, clbk, e, helpers){
								
								self.nav.api.go({
									href : 's?ss=' + value.replace("#", 'tag:'),
									history : true,
									open : true
								})

								helpers.closeResults()

								clearex()

								if (clbk)
									clbk(true)
								
							},

							clear : function(fs){

								if(fs) return

								_el.find('input').blur();

								setTimeout(function(){
									close(true)
									clearex()
								}, 100)
								
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

								if(isMobile()) return

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

						//if(add < 0) c = 'bad'

						if(add == 0){
							al.text(self.app.platform.mp.coin(value))

							actions.elswidth()
						}
						else
						{
							al.animateNumber({
						    	number: add,

						    	numberStep: function(now, tween) {

						    		actions.elswidth()

						    		el.addClass(c)

						        	var number = Number(value + now).toFixed(8),
						            	target = $(tween.elem);

						           
						    		target.text(self.app.platform.mp.coin(number));

						    	},

						    }, rand(400, 1200), function(){

						    	el.removeClass(c)

						    });
						}
					
						
					}

					var setValue = function(){

						

						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){

							var t = self.app.platform.sdk.node.transactions.tempBalance()

							amount = amount + t

							var add = amount - current;


							if (first) {
								add = 0;
								current = amount
							}

							first = false;

							set(current, add)

							current = amount;

							self.app.platform.sdk.wallet.drawSpendLine(el.find('.numberWrp'))
						})

					}

					var setNewBalance = function(){
						self.app.platform.sdk.node.transactions.get.allBalance(function(amount){


							var t = self.app.platform.sdk.node.transactions.tempBalance()


							setValue(amount - current + t)	
							
						})
					}

					var act = function(){

						setValue()
						
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

					events[ekey].el = element

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

			$(window).on('resize', actions.elswidth)

			ParametersLive([loc], el.c);

			autoUpdate = setInterval(actions.autoUpdate, 100);
		}

		var renders = {
			results : function(results, value, clbk){
				//if(!p) p = {};

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

					el.c.find('.postssearch').addClass('active')
					

					actions.elswidth()

					el.postssearch.find('input').val(parameters().ss.replace('tag:', "#"));

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

				$(window).off('resize', actions.elswidth)

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

				_.each(events, function(e){

					delete e.el

					if (e.destroy)
						e.destroy()
				})

				el = {};
			},

			closesearch : function(){
				el.c.removeClass('searchactive')
			},

			showsearch : function(v, _searchBackAction){

				el.c.addClass('searchactive')
				
				el.postssearch.find('input').val(v.replace('tag:', "#"));

				searchBackAction = _searchBackAction || null

				actions.elswidth()
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
				el.nav = el.c.find('.menutoppanel')

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

	self.closesearch = function(){
		_.each(essenses, function(essense){

			essense.closesearch();

		})
	}

	self.showsearch = function(v){
		_.each(essenses, function(essense){

			essense.showsearch(v);

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