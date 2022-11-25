var donate = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, input = null;

		
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
			
			el.c.find('.apply').on('click', function(){

				var val = input.get();

					ed.clbk(val)

				self.closeContainer()
				
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData;

				self.sdk.users.get(ed.receiver, function(){

					var account = self.app.platform.actions.getCurrentAccount()

					if (account){
						var b = account.actualBalance()
						var total = b.actual
						var balance = b.actual - b.tempbalance

						input = new Parameter({
							name: self.app.localization.e('wsamountof'),
							type: 'NUMBER',
							id: 'amount',
							placeholder : '0',
							value : ed.value || 0.5,
							format: {
								Precision: 3,
								max : balance,
								min : 0.5
							}
						})

						var data = {
							total, 
							balance,
							receiver : self.psdk.userInfo.get(ed.receiver),
							sender : self.psdk.userInfo.getmy(),
							input,
							error : false
						};

						clbk(data);
					}

					else{
						clbk({
							error : true
						});
					}

				}, true)

				
			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				ParametersLive([input], el.c)

				p.clbk(null, p);
			},

			wnd : {
				header : "",
				class : 'donationWindow normalizedmobile maxheight withoutButtons',
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
	module.exports = donate;
}
else{

	app.modules.donate = {};
	app.modules.donate.module = donate;

}