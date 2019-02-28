var panel = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, discussions = null;

		var ed = null;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			discussions : function(){

				var d = ed.discussions || {};

					d.view = 'fixedin'

				self.nav.api.load({

					open : true,
					id : 'discussions',
					el : el.cnt,
					animation : false,

					essenseData : d,
					
					clbk : function(e, p){
						discussions = p
					}

				})
			},
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			

		}

		var make = function(){
			renders.discussions()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var data = {};

				clbk(data);

			},

			destroy : function(){

				if (discussions){
					discussions.destroy()
					discussions = null;
				}

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.cnt = el.c.find('.panelcnt')

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
	module.exports = panel;
}
else{

	app.modules.panel = {};
	app.modules.panel.module = panel;

}