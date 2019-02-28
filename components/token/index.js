var token = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var data = null;

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

				var token = parameters().token || null;
				var type = parameters().type || null;

				return {
					type : type,
					token : token
				};
			}
		}

		var initEvents = function(){
			

		}

		var make = function(){

			

		}

		return {
			primary : primary,

			getdata : function(clbk){


				var data = state.load();

				

				if (data.type != 'activate'){
					self.app.platform.ws.addBlock();
				}
				else
				{
					var a = self.app.platform.ws.messages.CUSTOMER.ACTIVE;

					delete a.clbks.successDialog

					a.clbks.success = function(){
						var menu = deep(self, 'app.modules.menu.module');

						if (menu){
							menu.restart();
						}
					}
				}

				self.app.platform.sdk.tokens.check(data.token, function(result){

					data.result = result;

					clbk(data);
					
				})


			},

			destroy : function(){

				self.app.platform.ws.removeBlock();

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

			essense.destroy();

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = token;
}
else{

	app.modules.token = {};
	app.modules.token.module = token;

}