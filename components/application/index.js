var application = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, application, appdata;

		var actions = {
			openinfo : function(){
				app.nav.api.load({
                    open : true,
                    id : 'applicationmeta',
                    inWnd : true,

                    essenseData : {
                        application : application.manifest.id
                    }
                })
			}
		}

		var events = {
			pageevents : function(p){
				p.el.find('.settings .icon').on('click', () => {
					actions.openinfo()
				})
			},

			loaded : function(p){

				if(!application) return

				if (p.application == application.manifest.id){
					el.c.find('.iframewrapper').addClass('loaded')
				}
			}
		}

		var renders = {
			error : function(error, clbk){

				self.shell({

					name :  'error',
					el :   el.c,
					data : {
						application,
						error
					},

				}, function(p){

					events.pageevents(p)
					
					if (clbk)
						clbk();
				})
			},
			frame : function(html, clbk){

				/// unsafe, no use

				/*var blb = new Blob([html], {type: "text/html"});

				var src = URL.createObjectURL(blb)*/

				self.shell({

					name :  'frame',
					el :   el.c,

					data : {
						application
					},

				}, function(p){

					//iframeElem.contentDocument.documentElement.appendChild(m);

					var frame = p.el.find('iframe')[0]

					frame.contentWindow.document.open();
					frame.contentWindow.document.write(html);
					frame.contentWindow.document.close();

					events.pageevents(p)

					if (clbk)
						clbk();
				})
			},
			frameremote : function(clbk){

				var src = application.manifest.scope + '/' + (application.manifest.start || '')

				self.shell({

					name :  'frameremote',
					el :   el.c,

					data : {
						application,
						src 
					},

				}, function(p){

					events.pageevents(p)

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
			self.app.apps.on('loaded', events.loaded)
		}

		var make = function(){

			if(!application || !appdata){
				renders.error('notexist')
				return
			}

			renders.frameremote()

			/*if (application.develop && !application.production){
				renders.frameremote()
			}
			else{

				self.app.apps.get.output(application.manifest.id).then((html) => {

					renders.frame(html)

				}).catch(e => {
					console.error(e)
					renders.error(e)
				})
				
			}*/

		}

		return {
			primary : primary,

			getdata : function(clbk, p){
				
				window.requestAnimationFrame(() => {
					self.app.el.html.addClass('allcontent_application')
				})

				var id = parameters().id

				self.app.apps.get.application(id).then((f) => {

					if (f){
						application = f.application
						appdata = f.appdata
					}
					
	
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

				self.app.apps.off('loaded', events.loaded)

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
	module.exports = application;
}
else{

	app.modules.application = {};
	app.modules.application.module = application;

}