var popup = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, key, edata;

		var receiveMessage = function(e){

			var data = e.originalEvent.data;

			if (data.message == "finish") localStorage['popup_' + key] = true
		}

		var downloadapplication = function(){

			var oss = self.app.platform.applications['ui']

			var __os = os()
			var _os = oss[__os]

			if (_os){

				if (_os){

					if(_os.github){

						globalpreloader(true)

						$.get(_os.github.url, {}, function(d){

							var assets = deep(d, 'assets') || [];

							var l = _.find(assets, function(a){
								return a.name == _os.github.name
							})

							if (l){

								var link = document.createElement('a');
							        link.setAttribute('href', l.browser_download_url);
							        link.setAttribute('download','download');
							        link.click();
							}

							globalpreloader(false)


						})

						return true

					}

				}
			}

			return false
		}

		var popups = {
			application: {

				if : function(){
					return !self.app.mobileview && (typeof _Electron == 'undefined' || !_Electron)
				},

				caption : "",
				template : "application",

				clbk : function(_el){
				
					_el.find('.gotoapplications').on('click', function(){

						self.closeContainer()
						

						if(!downloadapplication()){

							self.nav.api.load({
								open : true,
								href : 'applications',
								history : true
							})

						}

						localStorage['popup_' + key] = true

						

					})
				}

			},
			test : {
				caption : "loc_caption",
				template : "test",

				clbk : function(el){

				}
			},

		}

		var actions = {

		}

		var events = {

		}

		var renders = {
			content : function(clbk){

				self.shell({

					nolinks : true,
					name :  key,
					el :   el.c.find('.pcontent .inr'),
					data : edata,

				}, function(_p){

					if (popups[key].clbk)
						popups[key].clbk(_p.el)

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



		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				key =  deep(p, 'settings.essenseData.key');

				edata = deep(p, 'settings.essenseData.data') || {};


				if(!key || !popups[key]  || popups[key].dontshow ||  (popups[key].if && !popups[key].if()) ) {

					return;
				}


				var data = {
					caption : popups[key].caption
				};

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

				renders.content(function(){
					p.clbk(null, p);
				})

				el.c.closest('.wnd').addClass((p.key || ""))
			},

			wnd : {
				buttons : {

					showagain : {
						class : 'showagain',
						html : app.localization.e('close'),
						fn : function(wnd, wndObj){
							wndObj.close();
						}
					},

					close : {
						class : 'close ',
						html : app.localization.e('donotshowagain'),
						fn : function(wnd, wndObj){

							localStorage['popup_' + key] = true

							wndObj.close();
						}
					},

				},
				close : function(){
				},
				success : function(_wnd, _wndObj){
					wndObj = _wndObj;
					wnd = _wnd;
				},
				noInnerScroll : true,
				class : 'popupwnd normalizedmobile'
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
	module.exports = popup;
}
else{

	app.modules.popup = {};
	app.modules.popup.module = popup;

}
