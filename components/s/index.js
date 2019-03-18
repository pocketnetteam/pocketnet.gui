var s = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, value, result;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			users : {
				preview : function(clbk){
					self.shell({
						name :  'userspre',
						el : el.users.find(".sectioncnt"),
						data : {
							users : result.users
						}

					}, function(p){

						if (clbk)
							clbk(p);
					})
				},

				full : function(){

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
			

		}

		var make = function(){

			renders.users.preview()

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				value = parameters().ss || '';

				self.app.platform.sdk.search.get(value, 'all', function(r){

					console.log(r)

					result = r;

					data.result = r;
					data.value = value;

					clbk(data);

				})
				

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.users = el.c.find('.users')
				el.posts = el.c.find('.posts')

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
	module.exports = s;
}
else{

	app.modules.s = {};
	app.modules.s.module = s;

}