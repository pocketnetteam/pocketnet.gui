var devapplication = (function(){

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

				var applicationId = parameters().id || null
				var address = self.app.user.address.value // current user

				///get from blockchain
				///get from ls
				// if none create application
				// if exist check author address

				var data = {
					ed
				};

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
	module.exports = devapplication;
}
else{

	app.modules.devapplication = {};
	app.modules.devapplication.module = devapplication;

}