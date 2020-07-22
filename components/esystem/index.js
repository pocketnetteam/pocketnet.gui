var esystem = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var proxy = {
			parameters : function(){



			}
		}

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}



		var events = {
			
		}


		var renders = {

			proxyOptions : function(clbk){

				var composed = null;

				if (self.sdk.esystem.tickstate){
					composed = self.sdk.esystem.proxy.settings.compose(deep(self, 'sdk.esystem.tickstate.settings'))

					
				}
				else{

				}

				console.log('composed', composed)

				renders.options(composed, el.proxyoptions, clbk)
				
				 
				
			},

			options : function(composed, _el, clbk){

				self.shell({
					name :  'options',
					el : _el,
					data : {
						composed : composed
					}					

				}, function(p){
					ParametersLive(composed.o, p.el)
				})	
			},
			download : function(){
				if(el.downloadElectron.length){

					self.nav.api.load({
						open : true,
						id : 'applications',
						el : el.downloadElectron,

						eid : 'applications_ui',

						essenseData : {
							
						},

						clbk : function(e, p){

							if(!el.c) return

						}
					})

				}

				if(el.downloadNode.length){

					self.nav.api.load({
						open : true,
						id : 'applications',
						el : el.downloadNode,

						eid : 'applications_node',

						essenseData : {
							key : 'node'
						},

						clbk : function(e, p){

							if(!el.c) return

						}
					})
					
				}
			}
		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			
			self.sdk.esystem.clbks.tick.esystem = function(settings, changed){
				renders.proxyOptions()
			}

		}

		var make = function(){
			renders.download()
			renders.proxyOptions()
		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){

				delete self.sdk.esystem.clbks.tick.esystem

				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.downloadElectron = el.c.find('.downloadApplication.ui')
				el.downloadNode = el.c.find('.downloadApplication.node')
				el.proxyoptions = el.c.find('.proxyoptions')

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
	module.exports = esystem;
}
else{

	app.modules.esystem = {};
	app.modules.esystem.module = esystem;

}