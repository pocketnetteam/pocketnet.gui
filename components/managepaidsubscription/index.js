var managepaidsubscription = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, address = null, currentValue = 0, oldCurrentValue = 0, minValue = 1;

		var input = null;

		var actions = {
			get : function(){
				return self.sdk.paidsubscription.getcondition(address).then(value => {
					oldCurrentValue = value
					currentValue = value

					if(currentValue < minValue) currentValue = minValue
					
					return Promise.resolve(value)
				})
			},

			set :  function(){
				return self.sdk.paidsubscription.setcondition(currentValue, function(err){

					if(!err){
						oldCurrentValue = currentValue
						
	
						new dialog({
							html : self.app.localization.e('paidsubscription_updatecondition_success'),
							class : "one zindex",
							btn1text :  self.app.localization.e('ok')
						})
	
						self.closeContainer()
					}

				})
			}
		}

		var events = {
			
		}

		var renders = {
			yhy : function(){
				var _el = el.c.find('.cnt').find('.otherConditions')
				var b = el.c.find('.cnt').find('.setcondition')

				var hy = currentValue * 5.5
				var y = currentValue * 10

				_el.find('.value[index="hy"]').html(self.app.platform.mp.coin(hy) + ' PKOIN')
				_el.find('.value[index="y"]').html(self.app.platform.mp.coin(y) + ' PKOIN')

				if(currentValue != oldCurrentValue){
					b.removeAttr('disabled')
					b.removeClass('disabled')

				}
				else{
					b.attr('disabled', 'disabled')
					b.addClass('disabled')
				}

			},
			form : function(){

				input = new Parameter({
					name: self.app.localization.e('paidsubscription_condition_value'),
					type: 'NUMBER',
					id: 'amount',
					placeholder : '0',
					value : Number((currentValue).toFixed(0)),
					format: {
						Precision: 0,
						max : 1500,
						min : minValue
					}
				})

				input._onChange = function(value){

					currentValue = value;

					renders.yhy();
				},

				self.shell({

					name: 'form',
					el: el.c.find('.cnt'),
					data: {
						currentValue,
						oldCurrentValue,
						input
					},

				}, function (_p) {
					renders.yhy()

					ParametersLive([input], _p.el)

					_p.el.find('.removecondition').on('click', function(){
						new dialog({
							html : self.app.localization.e('paidsubscription_removecondition_question'),
							btn1text :  self.app.localization.e('dyes'),
							btn2text :  self.app.localization.e('dno'),
		
							class : 'zindex',
		
							success : function(){

								currentValue = -1
		
								actions.set();
		
							}
						})
					})

					_p.el.find('.setcondition').on('click', function(){
						if(!oldCurrentValue){
							actions.set();
						}
						else{
							new dialog({
								html : self.app.localization.e('paidsubscription_updatecondition_question'),
								btn1text :  self.app.localization.e('dyes'),
								btn2text :  self.app.localization.e('dno'),
			
								class : 'zindex',
			
								success : function(){
			
									actions.set();
			
								}
							})
						}
					})
				})
			},
			error : function(){

				self.shell({

					name: 'error',
					el: el.c.find('.cnt'),
					data: {
					},

				}, function (_p) {
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
			actions.get().then(value => {
				renders.form()
			}).catch(e => {
				renders.error()
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				address = null;
				currentValue = 0;
				oldCurrentValue = 0;
				input = null;

				ed = p.settings.essenseData

				address = self.app.user.address.value

				self.sdk.users.get(address, function(){

					var data = {
						ed
					};
	
					clbk(data);

					
				})

			

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
				make()

				p.clbk(null, p);
			},
			wnd : {
				header : "",
				class : 'managepaidsubscriptionWindow normalizedmobile maxheight withoutButtons',
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
	module.exports = managepaidsubscription;
}
else{

	app.modules.managepaidsubscription = {};
	app.modules.managepaidsubscription.module = managepaidsubscription;

}