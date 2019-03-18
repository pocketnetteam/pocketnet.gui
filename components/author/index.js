var author = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');
		var author;
		var el;

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

				self.app.platform.api.actions.unsubscribe(author.address, function(tx, err){

					if(tx){
						
					}
					else
					{
						self.app.platform.errorHandler(err, true)	
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
					if(self.user.isItMe(author.address)) return true
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

				self.app.nav.api.history.addParameters({
					report : report.id
				})

				renders[report.render](el.lenta, report)

				renders.menulight()
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

					p.el.find('.toReport').on('click', function(){
						var r = $(this).attr('report');

						renders.report(reports[r])

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

				self.nav.api.load({

					open : true,
					id : 'lenta',
					el : _el,
					animation : false,

					mid : author.address,

					essenseData : {
						author : author.address,
						byauthor : true
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



		}

		var make = function(){

			var r = parameters().report || 'shares'

			renders.report(reports[r])
			renders.menu()

			//renders.panel()

			if(!isMobile())
				renders.info(el.info)
		}

		return {
			primary : primary,

			getdata : function(clbk){

				author = {};

				var p = parameters();


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
				el.subscribe = el.c.find('.subscribebuttons');
				el.up = el.c.find('.upbutton')
				el.w = $(window)

				el.info = el.c.find('.authorinfoWrapper')

				make();
				initEvents();

				

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