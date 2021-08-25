var navigation = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, w;

		var actions = {

		}


		var events = {
			/*scrollman : function(scroll){

				if (scroll >= 250){
					el.c.addClass('scrolled')
				}
				else{
					el.c.removeClass('scrolled')
				}
			},*/

			scroll : function(){

				if (self.app.lastScrollTop >= 250){

					el.c.addClass('scrolled')

				}
				else{

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
						k = indexkey + '?r=' + k
					}
				}

				var shw = parameters().video

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
						haschat : self.app.platform.matrixchat.core
					}
					

				}, function(p){

					p.el.find('.toup').on('click', events.toup)

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

				el.c.removeClass('scrolled')
				renders.menu(self.app.nav.get.pathname())

			}

			el.c.find('.fakem').on('click', function(){

				app.mobile.vibration()

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

				console.log("P", p)



				

				var data = {};


				w = $(window)

				clbk(data);

			},

			destroy : function(){
				
				/*if (self.app.scrolling){
					delete self.app.scrolling.clbks.navigation
				}*/

				delete self.app.events.scroll.navigation

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