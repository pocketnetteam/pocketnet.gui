var bastyonhelper = (function(){

	var self = new nModule();

	var essenses = {};


	var Essense = function(p){

		var primary = deep(p, 'history');

		var mnemonic = localStorage.getItem('mnemonic');

		var el;

		var actions = {

		}

		var events = {

			sendMnemonic(mnemonic){

				iframe[0].contentWindow.postMessage({
					pocketnet: true,
					mnemonic: mnemonic
				}, '*')

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

			console.log('bastyonhelper init!!!!!')


			const iframe = el.c.find('#iframe');

			console.log('iframe', iframe[0]);

			if (mnemonic){

				setTimeout(function(){

					events.sendMnemonic(mnemonic)
					
				}, 1000);

			}

		}

		return {
			primary : primary,

			getdata : function(clbk){

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
	module.exports = bastyonhelper;
}
else{

	app.modules.bastyonhelper = {};
	app.modules.bastyonhelper.module = bastyonhelper;

}