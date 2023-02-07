var home = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, applicationSearch;

		var actions = {
			applicationSearchClear : function(){
				renders.applications()
			},
			applicationSearch : function(p){
				acsearch = new search(p.el.find('.applicationSearch'), {
					placeholder : self.app.localization.e('e13140'),

					clbk : function(_el){

					},

					last : {
						get : function(){

							return [];

						},

						tpl : function(result, clbk){
							
						}
					},

					events : {							
						search : function(value, clbk, e, helpers){

						},

						clear : function(fs){
							actions.applicationSearchClear()
						}
					}
					
				})
			}
		}

		var events = {
			
		}

		var renders = {
			applications : function(applications, clbk){

				if(!applications){
					applications = self.app.apps.get.installedAndInstalling()
				}

				self.shell({

					name :  'applications',
					el :   el.c.find('.applications'),
					data : {
						applications
					},

				}, function(p){

					if (clbk)
						clbk()

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
			

		}

		var make = function(){
			applicationSearch = actions.applicationSearch()

			renders.applications()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var data = {
					ed
				};

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

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

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = home;
}
else{

	app.modules.home = {};
	app.modules.home.module = home;

}