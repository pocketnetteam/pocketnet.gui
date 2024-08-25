var createpaymentlink = (function(){

	var self = new nModule();

	var essenses = {};



	var Essense = function(p){

		var primary = deep(p, 'history');

		var itemModel = {
			image : {
				id : 'image',
				type : "STRINGANY"
			},
			name : {
				id : 'name',
				type : "STRINGANY"
			},
			value: {
				id : 'value',
				type : "NUMBER",
				format : {
					Precision : 2,
					Step : 0.01,
					Min : 0.01
				}
			}
	
		}
	
		var storeModel = {
			
			name : {
				id : 'name',
				type : "STRINGANY"
			},
			website: {
				id : 'website',
				type : "STRINGANY"
			}
	
		}
	
		var model = {
			address : {
				id : 'address',
				type : "STRINGANY"
			},
	
			anonimus : {
				id : 'anonimus',
				type : "BOOLEAN"
			},
	
			email : {
				id : 'email',
				type : "BOOLEAN"
			},
	
			phone : {
				id : 'phone',
				type : "BOOLEAN"
			},
	
			description: {
				id : 'description',
				type : "TEXT"
			},
	
			
	
			value: {
				id : 'value',
				type : "NUMBER",
				format : {
					Precision : 2,
					Step : 0.01,
					Min : 0.01
				}
			},
	
			shipmentValue : {
				id : 'shipmentValue',
				type : "NUMBER"
			},
	
			items : {
				array : true,
				model : itemModel
			},
	
			store : {
				model : storeModel
			},
	
			s_url : {
				id : 's_url',
				type : "STRINGANY"
			},
	
			c_url : {
				id : 'c_url',
				type : "STRINGANY"
			},
	
			c_url_type : {
				id : 'c_url_type',
				type : "VALUES",
				possibleValues : ['fetch', 'redirect'],
				possibleValuesLabels : ['Fetch', 'Redirect'],
				defaultValue : 'fetch'
			},
	
			payload: {
				id : 'payload',
				type : "TEXT",
				value : '{"order" : "ABC10"}'
			},
		}

		var el, ed;

		var actions = {
			payment : function(parameters){
				var payment = self.app.platform.sdk.payments.make({
					payment : parameters
				})

				var url = payment.makeURL()

				return payment.makeQR().then(qr => {
					return {
						qr, url,
						json : 
						JSON.stringify(parameters, null, "\t")
					}
				})
			},

			

		}

		var helpers = {
			parameterFromModel : function(p){
				var ep = {...p}

				ep.name = ep.id
				ep.placeholder = ep.id

				return new Parameter(ep)
			}
		}

		var events = {
			
		}

		var renders = {
			form : function(parameters, clbk){
				self.shell({
					name :  'form',
					data : {
						parameters
					},

					el : el.c.find('.form')

				}, function(_p){
					if(clbk) clbk()
				})
			},

			paymentResult : function(paymentResult, clbk){
				self.shell({
					name :  'paymentResult',
					data : {
						payment
					},

					el : el.c.find('.paymentResult')

				}, function(_p){
					if(clbk) clbk()
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

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

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
	module.exports = createpaymentlink;
}
else{

	app.modules.createpaymentlink = {};
	app.modules.createpaymentlink.module = createpaymentlink;

}