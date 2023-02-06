var application = (function(){

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
			frame : function(clbk){

				console.log('application', application)

				var src = application.manifest.scope + '/' + (application.manifest.start || '')

				self.shell({

					name :  'frame',
					el :   el.c,

					data : {
						application,
						src 
					},

				}, function(p){


					if (clbk)
						clbk();
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
			
			self.app.apps.on('loaded', (p) => {
				if (p.application == application.manifest.id){
					el.c.find('.iframewrapper').addClass('loaded')
				}
			})

		}

		return {
			primary : primary,

			getdata : function(clbk, p){
				

				var id = parameters().id

				self.app.apps.get.application(id).then((f) => {

					if(!f){
						self.app.nav.api.load({
							open : true,
							href : 'page404',
							history : true,
							replaceState : true
						})
	
						return
					}
	
					window.requestAnimationFrame(() => {
						self.app.el.html.addClass('allcontent_application')
					})
					
	
					application = f.application
					appdata = f.appdata
	
					ed = p.settings.essenseData
	
					var data = {
						ed
					};
	
					clbk(data);

				})


				

			},

			destroy : function(){
				ed = {}
				el = {};

				window.requestAnimationFrame(() => {
					self.app.el.html.removeClass('allcontent_application')
				})
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				renders.frame()



				p.clbk(null, p);

				
				/////

				setTimeout(() => {

					self.app.platform.matrixchat.core.renderChatToElement(el.c.find('.temp')[0], '').then((r) => {
						console.log("R", r)
					}).catch(e => {
						console.error(e)
					})

				}, 5000)

				/////
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
	module.exports = application;
}
else{

	app.modules.application = {};
	app.modules.application.module = application;

}