var dust = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var parameters = {

			

		}

		var initparameters = function(){

			var pk = deep(parameters, 'pk.value')

			parameters = {
				pk : new Parameter({
					name : "Private Key",
					type : "string",
					id : 'pk',
					placeholder : "Private Key",

					value : pk || ''
				}),

				reciever : new Parameter({
					name : self.app.localization.e('wsreciever'),
					type : "string",
					id : 'reciever',
					placeholder : self.app.localization.e('wsenter')
				}),

				amount : new Parameter({
					name : self.app.localization.e('wsamount'),
					id : 'amount',
					type : "NUMBER",
					placeholder : self.app.localization.e('wsamountof'),
					format : {
						Precision : 6
					}
				}),

				outputs : new Parameter({
					name : "Count of outputs",
					id : 'outputs',
					type : "NUMBER",
					placeholder : 'Count of outputs',
					defaultValue : 1,
					format : {
						Precision : 0,
						Min : 1,
						Max : 200
					}
				}),

				message : new Parameter({
					name : "Message",
					id : 'message',
					type : "stringany",
					placeholder : "Your message",
					
					format : {
						Length : 80
					}
				}),
			}

		}

		var actions = {
			sendWrapper : function(){

				if(!parameters.reciever.value){
					sitemessage("You Must Enter Reciever Address")

					return
				}

				var valid = true;

				try{
					bitcoin.address.fromBase58Check(parameters.reciever.value)
				}

				catch (e){
					valid = false;
				}

				if(!valid){

					sitemessage("Address is not valid")
					return
				}


				if(!parameters.amount.value){

					sitemessage("You must enter Amount")

					return

				}

				if(!parameters.pk.value){

					dialog({
						html : "Do you want to send coins from current acount?",
						btn1text : "Yes",
						btn2text : "No, cancel",

						success : function(){

							actions.send(self.app.user.private.value.toString('hex'))
						}
					})

				}

				else{
					actions.send(parameters.pk.value)
				}
			},
			send : function(pk){

				el.c.find('.loader').fadeIn()

				self.app.platform.sdk.wallet.sendmanyoutputs(pk, parameters.reciever.value, parameters.amount.value, parameters.outputs.value, function(err , data){

					console.log("ERR", err)

					el.c.find('.loader').fadeOut()

					if(err){
						self.app.platform.errorHandler(err, true)	
					}
					else{

						initparameters()

						renders.parameters();

						sitemessage("Success!")
					}

				}, parameters.message.value)	
			}
		}

		var events = {
			
		}

		var renders = {
			parameters : function(){
				self.shell({
					name :  'parameters',
					el : el.c.find('.parametersWrapper'),
					data : {
						d : {
							parameters : parameters
						}
					}					

				}, function(p){


					ParametersLive(_.toArray(parameters), p.el)

					p.el.find('.sends').on('click', actions.sendWrapper)

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

			getdata : function(clbk){

				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				initparameters()

				renders.parameters();

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
	module.exports = dust;
}
else{

	app.modules.dust = {};
	app.modules.dust.module = dust;

}