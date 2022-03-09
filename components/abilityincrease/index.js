var abilityincrease = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, template, increase;

		var actions = {

		}

		var events = {
			
		}

		var renders = {

		}

		var meta = {
			video : function(increase){

				if(_.isEmpty(increase)){
					return {
						icon : 'fas fa-wifi',
						header : 'unableToAuthorizeConnection',
						body : 'unableToAuthorizeConnectionBody'
					}
				}
				else{
					return {
						icon : 'fas fa-exclamation-circle',
						header : 'unableToAuthorize',
						body : 'unableToAuthorizeBody',
						additional : 'videobloggerRequest',
						support : {
							template : 'videoblogger',
							text : 'submitapplicationVideo'
						}
					}
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

			el.c.find('.buypkoins').on('click', function () {
				self.closeContainer();

				self.nav.api.load({
					open: true,
					href: 'wallet',
					history: true,
					inWnd: true,

					essenseData: {
						simple: true,
						action: 'buy',
					},
				});
			});

			el.c.find('.writesupport').on('click', function () {
				self.closeContainer();

				
				var template = $(this).attr('template')

				console.log("templatetemplatetemplate")

				self.nav.api.load({
					open: true,
					href: 'support',
					history: true,
					inWnd: true,

					essenseData: {
						template 
					},
				});
			});

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

				template = deep(p, 'settings.essenseData.template') || 'video'

				console.log('template', template)

				self.app.platform.sdk.ustate.canincrease(

					{ template },

					function (_increase) {

						increase = _increase

						data.increase = _increase
						data.template = template
						data.meta = meta[template](increase)

						clbk(data);

					}
				)

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
	module.exports = abilityincrease;
}
else{

	app.modules.abilityincrease = {};
	app.modules.abilityincrease.module = abilityincrease;

}