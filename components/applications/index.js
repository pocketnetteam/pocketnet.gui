var applications = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {

			download : function(os, clbk){
				if (os){

					if(os.github){

						$.get(os.github.url, {}, function(d){

							var assets = deep(d, 'assets') || [];

							var l = _.find(assets, function(a){
								return a.name == os.github.name
							})

							if (l){


								var link = document.createElement('a');
							        link.setAttribute('href', l.browser_download_url);
							        link.setAttribute('download','download');
							        link.click();

							    if (clbk)
									clbk(l.browser_download_url)
							}


						})

					}

				}
			},

			os : function(clbk){
				var _os = os();

				var oses = self.app.platform.applications[ed.key];

				var keys = Object.keys(oses);

				var current = oses[_os];
				var extraKeys = keys.filter(function(key){
					return key !== _os;
				})

				if (_os && current && (typeof _Electron == 'undefined' ) && !window.cordova && !isInStandaloneMode()){

					renders.os(current, clbk)

					extraKeys.forEach(function(key){
						renders.os(oses[key], clbk, true);
					})

				}

				else
				{	
					if (clbk)
						clbk();
				}
			}

		}

		var events = {
			
		}

		var renders = {
			os : function(os, clbk, extra){


				if(os.hidden) return

				var attr = extra ? os.id : '.currentos';

				self.shell({
					turi : 'registration',
					name :  'os',
					el : el.c.find(attr),
					data : {
						os : os,
						last : false
					},

				}, function(_p){
					_p.el.find('.downloadOs').on('click', function(){
						actions.download(os, function(link){
							el.c.find(attr + ' .os').addClass('rundownloading');

							el.c.find(attr + ' .skipositem').html('<div><a href="'+link+'"><b>'+self.app.localization.e('e13012')+'</b></a></div>')
					
						})
					})
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
			actions.os()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = deep(p, 'settings.essenseData') || {}

				ed.key ||(ed.key = 'ui')

				var data = {};

				clbk(data);

			},

			destroy : function(){
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

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = applications;
}
else{

	app.modules.applications = {};
	app.modules.applications.module = applications;

}