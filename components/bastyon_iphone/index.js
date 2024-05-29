var bastyon_iphone = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed;

		var actions = {

		}

		var events = {
			
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
			

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var data = {
					ed,
				};

				data.theme = self.app.platform.sdk.theme.current == "white" ? 'white' : 'black'

				clbk(data);

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

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = bastyon_iphone;
}
else{

	app.modules.bastyon_iphone = {};
	app.modules.bastyon_iphone.module = bastyon_iphone;

}