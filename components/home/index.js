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
			applicationSearch : function(){
				acsearch = new search(el.c.find('.applicationSearch'), {
					placeholder : self.app.localization.e('searchbyapplications'),

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
			},

			applicationClick : function(applicationId){
				var applications = self.app.apps.get.installedAndInstalling()

				var application = applications[applicationId]

				if(!application){
					//// not installed application from search, to app page

					return
				}

				if(application.installing){

					//// not installed application, to app page with installing bar 

					return
				}

				if(application.installed){

					self.nav.api.go({
						href : 'application?id=' + applicationId,
						history : true,
						open : true
					})	

					//// not installed application, to app page with installing bar 

					return
				}
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
					el :   el.c.find('.applicationsList'),
					data : {
						applications
					},

				}, function(p){

					p.el.find('.application').on('click', function(){

						var application = $(this).attr('application')

							actions.applicationClick(application)
					})

					if (clbk)
						clbk()

				})

				_.each(applications, (ins) => {
					if (ins.installing){
						ins.promise.then(() => {
							renders.applications()
						})
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

			window.rifticker.add(() => {
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