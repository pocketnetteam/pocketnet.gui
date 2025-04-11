var donate = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, input = null;

		
		var actions = {
			getTransaction : function(amount, reciever){

				var transaction = new Transaction()
				
					transaction.source.set([self.app.user.address.value])
					transaction.reciever.set([
						{
							address : reciever,
							amount : amount
						}
					])
					transaction.feemode.set('include')

					if(ed.donatemode){
						transaction.message.set('a:donate')
					}
					else{
						transaction.message.set('')
					}
					

					

				return transaction

			},
			send : function(amount, receiver, clbk, onerror){

				globalpreloader(true)

				var transaction = actions.getTransaction(amount, receiver)

				self.app.platform.actions.addActionAndSendIfCan(transaction, 1, null, {
					calculatedFee : 0,
					rejectIfError : true
				}).then((action) => {

					setTimeout(() => {

						sitemessage(self.app.localization.e('wssuccessfully'))
		
						successCheck()
		
						if(clbk) clbk(action, action.transaction)

					}, 300)

				}).catch(e => {

					self.app.platform.errorHandler(e, true)
					//sitemessage(e)

					if(onerror) onerror(e)

				}).finally(() => {
					globalpreloader(false)
				})

			}
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

				var val = Number(input.get() || '0');

				if (ed.min){
					if (val < ed.min){
						sitemessage(self.app.localization.e('minPkoin', 0.5))
                        return;
					}
				}


				var account = self.app.platform.actions.getCurrentAccount()

				if (account){
					var b = account.actualBalance()
					var total = b.actual

					if (val > total){
						val = Number(total.toFixed(3))
					}

					
						if (ed.send){
							actions.send(val, ed.receiver, (action, txid) => {
		
								if (ed.clbk){
									ed.clbk(val, action, txid)
								}
		
								self.closeContainer()
							})
						}
						else{
		
							if (ed.clbk){

								var reciever = ed.receiver

								ed.clbk(val, null, null, {
									send : function(){

										return new Promise((resolve, reject) => {

											actions.send(val, reciever, (action, txid) => {

												resolve(app.meta.protocol + '://i?stx=' + txid)
						
											}, (e) => {
												reject(e)
											})

										})
									}
								})
							}
		
							self.closeContainer()
						}
					
				}

				

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
							value : Number((ed.value || 0.5).toFixed(3)),
							format: {
								Precision: 3,
								max : total,
								min : 0.5
							}
						})

						var data = {
							total, 
							balance,
							receiver : self.psdk.userInfo.get(ed.receiver),
							sender : self.psdk.userInfo.getmy(),
							input,
							error : false,
							ed
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

			window.rifticker.add(() => {
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