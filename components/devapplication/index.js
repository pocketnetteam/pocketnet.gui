var devapplication = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, application;

		var publishedStatus = null // published|development
		var authorStatus = null // my, not my

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			example : function(){
				self.shell({
					name :  'example',
					el : el.c.find('.cntexample'),
					data : {
						x : 1
					},

				}, function(p){
					
					p.el.find('.ex').on('click', function(){
						alert(1)
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
			renders.example()
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var applicationId = parameters().id || null
				var address = self.app.user.address.value // current user

				// statuses - published|development, by author

				// get from blockchain by applicationId (published) - skip now - 
				// if none get from ls (development) 
				// if none create application (application = new Application({id : applicationId}))
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
				make();

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