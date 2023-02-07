var applicationmeta = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, application, appdata;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			permissions : function(clbk){

				if(!appdata || !application){
					if (clbk)
						clbk()

					return
				}

				var appsinfo = self.app.apps.info()

				var permissions = _.filter(application.manifest.permissions, (permission) => {
					var meta = appsinfo.permissions[permission]

					if (meta) {

						if(meta.uniq) return false

						return true
					}

				})

				self.shell({

					name :  'permissions',
					el :   el.c.find('.permissions'),
					data : {
						application,
						appdata,
						appsinfo,
						permissions
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
			renders.permissions(() => {
				el.c.addClass('permissionsRendered')
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var installed = false

				self.app.apps.get.application(ed.application).then(f => {
					if(f) {
						installed = true
						return Promise.resolve(f)
					}


					///// TODO GET

					return Promise.resolve()

				}).then((f) => {
	
					application = f.application
					appdata = f.appdata
	
					var data = {
						application,
						appdata,
						installed
					};
	
					clbk(data);

				})

			

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
			},

			wnd : {
				class : 'applicationmetaWindow normalizedmobile maxheight withoutButtons',
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
	module.exports = applicationmeta;
}
else{

	app.modules.applicationmeta = {};
	app.modules.applicationmeta.module = applicationmeta;

}