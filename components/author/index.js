var author = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var author, _state;
		var el;
		var upbutton;

		var panel = null, uptimer = null;

		var actions = {
			showmoreabout : function(){

				var a = filterXSS(clearScripts((findAndReplaceLink(deep(author, 'data.about'), true))))

				el.c.find('.aboutwrapper').html(a)
				el.c.find('.showmoreabout').remove()
			},
			showHideUp : function(){

				if (el.w.scrollTop() > 200){
					el.up.addClass('active')
				}
				else
				{
					el.up.removeClass('active')
				}
			},
			panelTopPosition : function(){

				if(!isMobile()){
					var s = $(window).scrollTop();

					if (el.caption.height() + 20 < s){
						el.fxd.addClass('dfxd')
					}
					else
					{
						el.fxd.removeClass('dfxd')
					}

					actions.panelPosition()
				}

			},

			panelPosition : function(){

				if(isMobile()){
					return 
				}

				var cnt = el.fxd;
				var mwork = el.panel.closest('.mwork');
				var width = $(window).width();

				var maxWidth = 1280;

				var paddingR = 0;
				var paddingL = 0;

				var over = (width - maxWidth) / 2;

				if (over < 0) over = 0;

				var right = width - (mwork.offset().left + mwork.width()) + paddingR;

				var left = width - right - 350 + paddingL + paddingR



				cnt.css('right', right + "px")
				cnt.css('left', left + "px")
			},
			destroy : function(){
				_.each(reports, function(r){
					r.active = false;

					if (r.module)
						r.module.destroy()
				})
			},

			/*unsubscribe : function(clbk){
				var unsubscribe = new Unsubscribe();
					unsubscribe.address.set(author.address);

					topPreloader(10)



				self.sdk.node.transactions.create.commonFromUnspent(

					unsubscribe,

					function(tx, error){

						if(tx){
							var me = deep(app, 'platform.sdk.users.storage.' + self.user.address.value.toString('hex'))

							var u = self.app.platform.sdk.users.storage[author.address];

							if (me) me.removeRelation({
								adddress : author.address
							})

							if(u){
								u.removeRelation(author.address, 'subscribers')

								el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
								el.c.find('.toReport[report="following"] .count').html(reports.following.count())
							}
						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},

			subscribe : function(clbk){
				var subscribe = new Subscribe();
					subscribe.address.set(author.address);

					topPreloader(10)

				self.sdk.node.transactions.create.commonFromUnspent(

					subscribe,

					function(tx, error){

						if(tx){
							var me = deep(self.app, 'platform.sdk.users.storage.' + self.user.address.value.toString('hex'))
							var u = self.app.platform.sdk.users.storage[author.address];


							if (me) me.addRelation({
								adddress : author.address,
								private : false
							})

							if(u){
								u.addRelation(author.address, 'subscribers')

								el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
								el.c.find('.toReport[report="following"] .count').html(reports.following.count())
							}
						}

						topPreloader(100)

						clbk(tx, error)

					}
				)	
			},*/

			
		}

		var events = {
			showHideUp : function(){
				uptimer = slowMade(function(){
					actions.showHideUp()
				}, uptimer, 30)			
			},

			up : function(){
				_scrollTop(0)
			},
			unsubscribe : function(){

				dialog({
					html : "Do you really want to unfollow user?",
					btn1text : "Unfollow",
					btn2text : "Cancel",

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(author.address, function(tx, err){

							if(tx){
								
							}
							else
							{
								self.app.platform.errorHandler(err, true)	
							}
		
						})

					}
				})

				
			},
			subscribe : function(){
				self.app.platform.api.actions.subscribe(author.address, function(tx, err){

					if(tx){
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

				})
			},
			subscribePrivate : function(){
				actions.subscribePrivate(function(tx, err){

					if(tx){
						el.subscribe.addClass('subscribed')
					}
					else
					{
						self.app.platform.errorHandler(err, true)
					}

				})
			},

		}

		var reports = {
			shares : {
				name : self.app.localization.e('uposts'),
				mobile : '<i class="fas fa-align-justify"></i>',
				id : 'shares',
				render : 'lenta',
				count : function(){
					return 0
				}
			},

			followers : {
				name : self.app.localization.e('followers'),
				mobile : '<i class="fas fa-users"></i>',
				id : 'followers',
				render : 'followers',
				count : function(){
					
					return deep(author, 'data.subscribers.length') || 0 
				
				}
			},

			following : {
				name : self.app.localization.e('following'),
				id : 'following',
				mobile : '<i class="fas fa-user-plus"></i>',
				render : 'following',
				count : function(){
					return deep(author, 'data.subscribes.length') || 0 
				}
			},

			settings : {
				name : self.app.localization.e('settings') + ' <i class="fas fa-cog"></i>',
				mobile : '<i class="fas fa-cog"></i>',
				id : 'settings',
				href : 'userpage?id=test',
				class : 'tosettings',

				if : function(){
					if(self.user.isItMe(author.address) && !isMobile()) return true
				}
			},

			more : {
				name : '<i class="fas fa-ellipsis-h"></i>',
				mobile : '<i class="fas fa-ellipsis-h"></i>',
				id : 'more',
				class : 'more',

				if : function(){
					if(!self.user.isItMe(author.address) && _state) return true
				},

				events : {
					click : function(){
						renders.metmenu($(this))
					}
				}
			},


			info : {
				name : 'Info <i class="fas fa-info-circle"></i>',
				mobile : '<i class="fas fa-info-circle"></i>',
				id : 'info',
				class : 'info',
				render : 'info',
				if : function(){
					if(isMobile()) return true
				}
			},
			
		}

		var renders = {
			metmenu : function(_el){

				var d = {};

				self.fastTemplate('metmenu', function(rendered, template){

					self.app.platform.api.tooltip(_el, function(){
						d.author = author
					
						return template(d);

					}, function(el){

						el.find('.donate').on('click', function(){

							actions.donate(id)

							_el.tooltipster('hide')	

						})

						el.find('.block').on('click', function(){

							self.app.platform.api.actions.blocking(author.address, function(tx, error){
								if(!tx){
									self.app.platform.errorHandler(error, true)	
								}
							})

							_el.tooltipster('hide')	

						})
						
						el.find('.unblock').on('click', function(){

							self.app.platform.api.actions.unblocking(author.address, function(tx, error){
								if(!tx){
									self.app.platform.errorHandler(error, true)	
								}
							})

							_el.tooltipster('hide')	

						})
						

					})

				}, d)

			},
			panel : function(){

				var discussions = {};

				if(!self.user.isItMe(author.address)){
					discussions.author = author.address
				}

				self.nav.api.load({

					open : true,
					id : 'panel',
					el : el.panel,
					animation : false,

					essenseData : {
						discussions : discussions
					},
					
					clbk : function(e, p){

						panel = p;

						actions.panelPosition()

						window.addEventListener('resize', events.panelPosition)

						window.addEventListener('scroll', actions.panelTopPosition)

					}

				})
				
				
			},

			report : function(report){

				actions.destroy();

				report.active = true;

				if(report.id != 'shares')

					self.app.nav.api.history.addParameters({
						report : report.id
					})


				if (renders[report.render]){
					renders[report.render](el.lenta, report)

					renders.menulight()
				}
				
			},

			menulight : function(){
				el.menu.find('.usermenuitem').removeClass('active')

				var r = _.find(reports, function(r){
					return r.active
				})

				if(r){
					el.menu.find('.usermenuitem .c' + r.class).addClass('active')
				}
			},

			menu : function(clbk){
				self.shell({

					name :  'menu',
					el :   el.menu,

					data : {
						reports : reports
					},

					animation : 'fadeIn',

				}, function(p){

					p.el.find('.usermenuitem').swipe({
						tap : function(){
							var r = $(this).attr('menuitem');

							console.log('r', r)

							renders.report(reports[r])
						}
					})
					
					_.each(reports, function(r, j){
						if(r.events){

							var el = p.el.find('[menuitem="'+j+'"]')

							_.each(r.events, function(e, i){

								if(i == 'click' && isMobile()){

									el.swipe({
										tap : e
									})

								}
								else{
									el.on(i, e)
								}

								
							})

						}
					})

					if (clbk)
						clbk();
				})
			},

			userslist : function(_el, users, empty, caption, clbk){
				self.nav.api.load({

					open : true,
					id : 'userslist',
					el : _el,
					animation : false,

					essenseData : {
						addresses : users,
						empty : empty,
						caption : caption
					},
					
					clbk : function(e, p){
						if (clbk)
							clbk(e, p)
					}

				})
			},

			info : function(_el){

				self.shell({

					name :  'info',
					el :   _el,

					data : {
						author : author
					},

					animation : 'fadeIn',

				}, function(p){

					p.el.find('.showmoreabout').on('click', actions.showmoreabout)

				})
			},

			followers : function(_el, report){

				var u = _.map(deep(author, 'data.subscribers') || [], function(a){
					return a
				})

				var e = self.app.localization.e('anofollowers');

				if(self.user.isItMe(author.address)){
					e = self.app.localization.e('aynofollowers')
				}

				renders.userslist(_el, u, e, "Followers", function(e, p){
					report.module = p;
				})
			},

			following : function(_el, report){

				var u = _.map(deep(author, 'data.subscribes') || [], function(a){
					return a.adddress
				})

				var e = self.app.localization.e('anofollowing');

				if(self.user.isItMe(author.address)){
					e = self.app.localization.e('aynofollowing')
				}

				renders.userslist(_el, u, e, "Following", function(e, p){
					report.module = p;
				})
			},

			lenta : function(_el, report){

				//localStorage['lentakey'] = 'author?address=' + parameters().address

				self.nav.api.load({

					open : true,
					id : 'lenta',
					el : _el,
					animation : false,

					mid : author.address,



					essenseData : {
						author : author.address,
						byauthor : true,

						hr : 'author?address=' + author.address + '&'
				
					},
					
					clbk : function(e, p){
					
						report.module = p;

						
				
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

			el.up.on('click', events.up)

			el.subscribe.find('.subscribe').on('click', events.subscribe)
			el.subscribe.find('.unsubscribe').on('click', events.unsubscribe)
			el.subscribe.find('.subscribeprivate').on('click', events.subscribePrivate)

			el.caption.find('.unblocking').on('click', function(){

				dialog({
					html : "Do you really want to unblock user?",
					btn1text : "Unblock",
					btn2text : "Cancel",

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unblocking(author.address, function(tx, error){
							if(!tx){
								self.app.platform.errorHandler(error, true)	
							}
						})

					}
				})

				
			})

			//window.addEventListener('scroll', events.showHideUp);

			self.app.platform.ws.messages.event.clbks.author = function(data){
			
				if(data.mesType == 'subscribe' || data.mesType == 'unsubscribe'){

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
					
				}
				
			}


			self.app.platform.clbks.api.actions.subscribe.author = function(address){

				if(address == author.address){
					el.subscribe.addClass('subscribed')

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
				}

				
			}

			self.app.platform.clbks.api.actions.unsubscribe.author = function(address){

				if(address == author.address){
					el.subscribe.removeClass('subscribed')

					el.c.find('.toReport[report="followers"] .count').html(reports.followers.count())
					el.c.find('.toReport[report="following"] .count').html(reports.following.count())
				}
			}

			/*el.c.find('.caption').on('click', function(){
				self.app.platform.api.actions.unblocking(author.address, function(tx, error){
					if(!tx){
						self.app.platform.errorHandler(error, true)	
					}
				})
			})*/

			self.app.platform.clbks.api.actions.blocking.author = function(address){

				if(address == author.address){
					el.caption.addClass('blocking');
				}

				
			}

			self.app.platform.clbks.api.actions.unblocking.author = function(address){

				if(address == author.address){
					el.caption.removeClass('blocking');
				}

			}

		}

		var make = function(){

			var r = parameters().report || 'shares'

			renders.report(reports[r])
			renders.menu()

			//renders.panel()

			

			self.app.user.isState(function(state){

				if(state){
					var me = self.app.platform.sdk.users.storage[self.app.platform.sdk.address.pnet().address];

					if (me && me.relation(author.address, 'blocking')){
						el.caption.addClass('blocking');
					}
				}
				
				

			})
			
			upbutton = self.app.platform.api.upbutton(el.up, {
				top : function(){

					return '65px'
				},
				class : 'light',
				rightEl : el.c.find('.leftpanelcell')
			})	
			

			if(!isMobile())
				renders.info(el.info)
		}

		return {
			primary : primary,

			parametersHandler : function(){
				var r = parameters().report || 'shares'

				renders.report(reports[r])
				renders.menu()
			},

			getdata : function(clbk, settings){

				author = {};

				var p = parameters();

				_state = settings.state

				self.sdk.users.addressByName(p.address, function(address){

					if(address){
						author.address = address

						self.sdk.users.get(author.address, function(){

							self.sdk.ustate.get(author.address, function(){

								if(!self.app.platform.sdk.address.pnet() || author.address != self.app.platform.sdk.address.pnet().address){
									reports.shares.name = self.app.localization.e('uposts')
								}
								else
								{
									reports.shares.name = self.app.localization.e('myuposts')
								}
							

								author.data = self.sdk.users.storage[author.address]
								author.state = self.sdk.ustate.storage[author.address]

								var data = {
									author : author
								};

								clbk(data);

							})
						})
					}

					else
					{
						console.log('sd');
					}

					
				})

				

				

			},

			destroy : function(){

				if (upbutton)
					upbutton.destroy()

					upbutton = null

				if (panel)
					panel.destroy();

				window.removeEventListener('resize', events.panelPosition)
				window.removeEventListener('scroll', actions.panelTopPosition)
				window.removeEventListener('scroll', events.showHideUp);

				delete self.app.platform.ws.messages.event.clbks.author
				delete self.app.platform.clbks.api.actions.subscribe.author
				delete self.app.platform.clbks.api.actions.unsubscribe.author

				actions.destroy();
				
				el = {};
			},
			
			init : function(p){

				

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.lenta = el.c.find('.lentaWrapper');
				el.menu = el.c.find('.usermenu')
				el.panel = el.c.find('.panel')
				el.caption = el.c.find('.bgCaption')
				el.fxd = el.c.find('.fxd')
				el.subscribe = el.c.find('.subscribebuttonstop');
				el.up = el.c.find('.upbuttonwrapper')
				el.w = $(window)

				el.info = el.c.find('.authorinfoWrapper')

				make();
				initEvents();

				if(self.user.isItMe(author.address)){
					self.app.nav.api.backChainClear()
				}

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
	module.exports = author;
}
else{

	app.modules.author = {};
	app.modules.author.module = author;

}