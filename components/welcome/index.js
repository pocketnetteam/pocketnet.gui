var welcome = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var actions = {

		}

		var events = {
			
		}

		var renders = {
			invitation : function(address){
				self.shell({

					name :  'invitation',
					el :   el.invitation,
					data : {
						address : address
					},

				}, function(_p){

					_p.el.find('.cancelinvite').on('click', function(){

						self.app.platform.matrixchat.connectWith = null
						

						_p.el.html('')

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

			if (self.app.platform.matrixchat.connectWith){
				self.app.platform.sdk.users.get([self.app.platform.matrixchat.connectWith], function () {
					renders.invitation(self.app.platform.matrixchat.connectWith)
				})
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

				if(p.state){
					self.nav.api.load({
						open : true,
						href : 'userpage',
						history : true
					})

					return
				}

				clbk(data);

			},

			destroy : function(){
				el = {};


			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.invitation = el.c.find('.invitation')

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
	module.exports = welcome;
}
else{

	app.modules.welcome = {};
	app.modules.welcome.module = welcome;

}