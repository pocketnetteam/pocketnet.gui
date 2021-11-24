var bastyonhelper = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}

		var events = {
			sendMnemonic(iframe, mnemonic, pool){

				iframe.contentWindow.postMessage({
					pocketnet: true,
					mnemonic: mnemonic,
					pool: pool,
				}, 'https://bastyon.com')

			}
		}

		var renders = {

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){

			var href = history.state && history.state.href || 'index'
			
			if (el.iframe && el.iframe[0]){

				setTimeout(function(){
					var mnemonic = localStorage.getItem('mnemonic');
					var pool = localStorage.getItem('pool');

					events.sendMnemonic(el.iframe[0], mnemonic, pool)
				}, 1000)
					

			}

			setTimeout(function(){
				window.location.href = 'https://bastyon.com/' + href
			}, 3000)
		}

		return {
			primary : primary,

			getdata : function(clbk){


				if (typeof _Electron == 'undefined' && !window.cordova && window.pocketnetproject !== 'Bastyon' && !bastyonhelperOpened && !window.testpocketnet){
					
					var href = history.state && history.state.href || 'index'

					var data = {
						href
					};

					clbk(data);
				}

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.iframe = p.el.find('#iframe');
	
				el.bastyonlink = p.el.find('#bastyonlink');

				initEvents();

				p.clbk(null, p);
			},

			wnd : {
				class : 'wndredirect'
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
	module.exports = bastyonhelper;
}
else{

	app.modules.bastyonhelper = {};
	app.modules.bastyonhelper.module = bastyonhelper;

}