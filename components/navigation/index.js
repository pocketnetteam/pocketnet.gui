var navigation = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, w;

		var actions = {

		}


		var events = {

			scroll : function(){

				if (self.app.lastScrollTop >= 250){

					if(!el.c.hasClass('scrolled'))
						el.c.addClass('scrolled')

				}
				else{
					if (el.c.hasClass('scrolled'))
						el.c.removeClass('scrolled')

				}
			},	

			toup : function(){
				self.app.mobile.vibration.small()
				self.app.actions.scroll(0)
			}
		}

		var renders = {
			menu : function(href){

				var indexkey = self.app.nav.api.backChainIndex()
				
				var k = localStorage['lentakey'] || indexkey + '?b=true';

				if (k == indexkey) k = indexkey + '?b=true'

				if (k.indexOf('?') == -1) {

					if (k == 'video'){
						k = indexkey + '?video=1'
					}
					else{
						if (k == 'read'){
							k = indexkey + '?read=1'
						}
						else{
							k = indexkey + '?r=' + k
						}
					}
				}

				var shw = parameters().video

				var search = parameters().ss || parameters().sst

				var back = self.app.nav.api.backChainGet()


				self.shell({
					name :  'menu',
					inner : html,
					el : el.menu,

					data : {
						back : back,
						href : href,
						lentakey : k,
						indexkey : indexkey,
						shw : shw,
						search,
						haschat : self.app.platform.matrixchat.core,
						thref : self.app.nav.get.href(),
						ps : parameters()
						//mestate : _mestate
					}

				}, function(p){

					p.el.find('.toup').on('click', events.toup)

					p.el.find('.toregistration').on('click', function(){
						self.app.platform.sdk.registrations.getredirectFromCurrentPage()
						self.nav.api.go({
							href : 'authorization',
							history : true,
							open : true
						})	
					})

					p.el.find('.addshare').on('click', function(){

						self.nav.api.go({
							open : true,
							href : 'share',
							inWnd : true,
							history : true,
							
							essenseData : {
								rmhistory : true
							}
						})

					})

					p.el.find('.showmenu').on('click', function(){

						self.nav.api.go({
							open : true,
							href : 'userpage',
							inWnd : true,
							history : true,
							
							essenseData : {
								rmhistory : true
							}
						})

					})


					p.el.find('.matrixchat').on('click', function(){

						var show = deep(self, 'app.platform.matrixchat.core.apptochat')

						if (show) show()

					})
					
				})

			},

			hide : function(){

				if (el.c)
					el.c.closest('#navigationWrapper').addClass('hidden')
			},

			show : function(){

				if (el.c)
					el.c.closest('#navigationWrapper').removeClass('hidden')
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			self.app.nav.clbks.history.navigation = function(href){
				renders.menu(self.app.nav.get.pathname())
			}

			self.app.platform.sdk.registrations.clbks.navigation = function(){

				renders.menu(self.app.nav.get.pathname())
			}


			el.c.find('.fakem').on('click', function(){

				$('html').removeClass('scrollmodedown')
			})

			self.app.events.scroll.navigation = events.scroll

			events.scroll()

			if(window.cordova){
				
				window.addEventListener('keyboardWillShow', renders.hide);
				window.addEventListener('keyboardWillHide', renders.show);

			}

			/*if (self.app.scrolling){
				self.app.scrolling.clbks.navigation = events.scrollman
			}*/
		}

		var make = function(){

			renders.menu(self.app.nav.get.pathname())
		}

		return {
			primary : primary,

			getdata : function(clbk, p){


				var data = {};

				w = $(window)

				clbk(data);

			},

			destroy : function(){
				
				/*if (self.app.scrolling){
					delete self.app.scrolling.clbks.navigation
				}*/

				delete self.app.events.scroll.navigation
				delete self.app.platform.sdk.registrations.clbks.navigation

				if(window.cordova){
					window.removeEventListener('keyboardWillShow', renders.hide);
					window.removeEventListener('keyboardWillHide', renders.show);	
				}

				delete self.app.nav.clbks.history.navigation

				if (el){
					
					if (el.c)
						el.c.remove();

					el = {};
				}
					
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.menu = el.c.find('.nmenu')

				initEvents();

				p.clbk(null, p);

				make();
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
	module.exports = navigation;
}
else{

	app.modules.navigation = {};
	app.modules.navigation.module = navigation;

}