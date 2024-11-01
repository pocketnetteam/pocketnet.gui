var miniapps = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			miniapps : function(){
				var apps = self.app.apps.get.forminiapps()

				self.shell({
					name :  'apps',
					data : {
						apps
					},

					el : el.c

				}, function(_p){
					if(clbk) clbk()
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
			
			self.app.apps.on('installed', renders.miniapps)
			self.app.apps.on('removed', renders.miniapps)
			self.app.apps.on('loaded', renders.miniapps)
		}

		return {
			primary : primary,

			getdata : function(clbk, p){


				ed = p.settings.essenseData

				var data = {
					ed
				};


				pretry(() => {
					return self.app.apps.inited
				}, 100, 15000).then(() => {
					var apps = self.app.apps.get.forminiapps()

					data.apps = apps

	
					clbk(data);
				})

				

			},

			destroy : function(){
				ed = {}
				el = {};

				self.app.apps.off('installed', renders.miniapps)
				self.app.apps.off('removed', renders.miniapps)
				self.app.apps.off('loaded', renders.miniapps)
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				renders.miniapps()

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
	module.exports = miniapps;
}
else{

	app.modules.miniapps = {};
	app.modules.miniapps.module = miniapps;

}