var navigation = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			menu : function(href){
				
				var k = localStorage['lentakey'] || 'index';

				if (k != 'index') k = 'index?r=' + k


				self.shell({
					name :  'menu',
					inner : html,
					el : el.menu,

					data : {
						href : href,
						lentakey : k
					}
					

				}, function(p){

					
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
			
			self.app.nav.clbks.history.navigation = function(href){

				renders.menu(self.app.nav.get.pathname())

			}

		}

		var make = function(){

			renders.menu(self.app.nav.get.pathname())
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

				clbk(data);

			},

			destroy : function(){

				delete self.app.nav.clbks.history.navigation

				el = {};
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