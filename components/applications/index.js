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

								self.app.platform.m.log('registration_application_download', os.github.name)

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

				self.app.platform.m.log('registration_application')

				if (_os && self.app.platform.applications[ed.key][_os] && (typeof _Electron == 'undefined' && ed.key != 'ui') && !window.cordova){

					renders.os(self.app.platform.applications[ed.key][_os], clbk)

				}

				else
				{
					clbk(clbk);
				}
			}

		}

		var events = {
			
		}

		var renders = {
			os : function(os){
				self.shell({
					turi : 'registration',
					name :  'os',
					el : el.c.find('.currentos'),
					data : {
						os : os,
						last : false
					},

				}, function(_p){
					_p.el.find('.downloadOs').on('click', function(){
						actions.download(os, function(link){
							el.c.find('.os').addClass('rundownloading')
							el.c.find('.skipositem').html('<div class="downloadstart">'+self.app.localization.e('e13011')+'</div>'+
								'<div><a href="'+link+'"><b>'+self.app.localization.e('e13012')+'</b></a></div>')
					
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