var applications = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, oss, block = false;

		var actions = {

			download : function(os, clbk){
				if (os){

					if(os.github){

						globalpreloader(true)

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

							globalpreloader(false)


						})

					}

				}
			},

		}

		var events = {
			block : function(){
				block = true

				setTimeout(function(){
					block = false
				}, 1000)
			}
		}

		var renders = {

			mainoss : function(os){
				renders.oss([os], el.c.find('.mainos'))
			},	

			oss : function(_oss, _el){

				self.shell({
					name :  'oss',
					data : {
						oss : _oss
					},

					el : _el || el.c.find('.oss')

				}, function(_p){

					_p.el.find('.downloadOs').on('click', function(){

						if(block) return

						events.block()

						var osid = $(this).closest('.os').attr('osid')

						var os = _.find(_oss, (os) => {return osid == os.id})
				
						if (os){
							actions.download(os, function(link){})
						}
						else{
							sitemessage('error')
						}
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

			var filtered = _.filter(oss, function(os){
				return !ed.filter || ed.filter(os)
			})

			var fl = filtered.length

			var __os = os()

			var filtered = _.filter(oss, function(os){
				return os.id != __os
			})

			if(filtered.length != fl){
				renders.mainoss(oss[__os])
			}
			
			renders.oss(filtered)

			
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = deep(p, 'settings.essenseData') || {}

				oss = self.app.platform.applications[ed.key || 'ui']

				var data = {
					ed : ed
				};

				clbk(data);

			},

			destroy : function(){
				el = {};
				ed = {}
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