var slides = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, tag;

		var rendered = []
		var total = []

		var externals = []

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			lenta : function(){

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
		
		var get = function(){
			
		}

		var clear = function(){
			_.each(externals, (e) => {
				e.destroy()
			})

			externals = null
			el.c.empty()

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData || {}

				var p = parameters()

				tag = p.tag || "images"

				rendered = []
				total = []

				var data = {
					ed
				};

				clbk(data);

			},

			destroy : function(){

				clear()

				ed = {}
				el = {};

				rendered = []
				total = []

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

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = slides;
}
else{

	app.modules.slides = {};
	app.modules.slides.module = slides;

}