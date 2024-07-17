var home = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, acsearch, svalue = '';

		var actions = {
			
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
							svalue = value
						},

						clear : function(fs){
							svalue = ''
							renders.clear()
							actions.makeApplicationList()
						}
					}
					
				})
			},

			applicationClick : function(applicationId){

				self.nav.api.go({
					href : 'application?id=' + applicationId,
					history : true,
					open : true
				})

			},

			makeApplicationList : function(){
				self.app.apps.get.applications({search : svalue}).then((applications) => {
					renders.applications(applications)
				})
			}
		}

		var events = {
			installed : function(p = {}){
				console.log("P", p)
				el.c.find('.application[application="'+p.application.manifest.id+'"]').addClass('installed').removeClass('installing')
			},

			removed : function(p = {}){
				el.c.find('.application[application="'+p.application.manifest.id+'"]').removeClass('installed').removeClass('installing')
			},
		}

		var renders = {
			/*applicationsInstalled : function(clbk){
				var applications = self.app.apps.get.installedAndInstalling()

				renders.applications()
			},*/
			applications : function(applications, clbk){

				self.shell({

					name :  'applications',
					el :   el.c.find('.applicationsList .list'),
					inner : append,
					data : {
						applications
					},

				}, function(p){
					if (clbk)
						clbk()

				})
				
			},

			clear : function(){
				el.c.find('.applicationsList .list').html('')
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			el.c.on('click', '.application', function(){
				var application = $(this).attr('application')

				actions.applicationClick(application)
			})

			self.app.apps.on('installed', events.installed)
			self.app.apps.on('removed', events.removed)
		}

		var make = function(){
			actions.applicationSearch()
			actions.makeApplicationList()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var data = {
					ed
				};

				console.log("APPS wait")


				pretry(function(){
                    return self.app.apps.inited
                }).then(r => {
					console.log("APPS CLBK")
					clbk(data);
                })


				

			},

			destroy : function(){
				ed = {}
				el = {};

				self.app.apps.off('installed', events.installed)
				self.app.apps.off('removed', events.removed)
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