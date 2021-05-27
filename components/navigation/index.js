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
				if (w.scrollTop() > 250){

					el.c.addClass('scrolled')
				}
				else{
					el.c.removeClass('scrolled')
				}
			},	

			toup : function(){

				_scrollTop(0, null, 0)
			}
		}

		var renders = {
			menu : function(href){


				var indexkey = self.app.nav.api.backChainIndex()
				
				var k = localStorage['lentakey'] || indexkey + '?b=true';

				if (k == indexkey) k = indexkey + '?b=true'

				if (k.indexOf('?') == -1) {
					if(k == 'video'){
						k = indexkey + '?video=1'
					}
					else{
						k = indexkey + '?r=' + k
					}
					
				}


				var back = self.app.nav.api.backChainGet()


				self.shell({
					name :  'menu',
					inner : html,
					el : el.menu,

					data : {
						back : back,
						href : href,
						lentakey : k,
						indexkey : indexkey
					}
					

				}, function(p){

					p.el.find('.toup').on('click', events.toup)
					
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

			
			window.addEventListener('scroll', events.scroll)

			if(window.cordova){

				
				window.addEventListener('keyboardWillShow', renders.hide);
				window.addEventListener('keyboardWillHide', renders.show);

			}
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
				

				window.removeEventListener('scroll', events.scroll)

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