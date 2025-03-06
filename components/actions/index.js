var actions = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, accounts;

		var actions = {

		}

		var events = {
			change : function({account}){
				renders.state(account)
			}
		}

		var renders = {
			accounts : function(){
				_.each(accounts, (account) => {
					renders.state(account)
				})
			},
			state : function(account, clbk){

				self.shell({

					name :  'state',
					el :   el.c.find('.account[address="'+account.address+'"] .stateWrapper'),

					data : {
						account
					},

				}, function(p){


					if (clbk)
						clbk();
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
			
			self.app.platform.actions.on('change', events.change)
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData
				accounts = self.app.platform.actions.getAccounts()

				var data = {
					ed,

					accounts
				};

				clbk(data);

			},

			destroy : function(){

				self.app.platform.actions.off('change', events.change)


				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				renders.accounts()

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
	module.exports = actions;
}
else{

	app.modules.actions = {};
	app.modules.actions.module = actions;

}