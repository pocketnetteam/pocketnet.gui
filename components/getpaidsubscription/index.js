var getpaidsubscription = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, subdata = null, me = null, relation = null, selectedOption;

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
					transaction.message.set('a:subscription')
					

				return transaction

			}
		}

		var events = {
			
		}

		var renders = {
			preloader : function(){
				el.c.find('.fieldsWrapper').html(`<div class="preloadeWrapper">
					<div class="preloader5"><img src="./img/three-dots.svg"/></div>
				</div>`)
			},
			form : function(data){
				
				self.shell({
					animation : false,
					inner : html,
					name : 'form',
					data : {
						subscriptiondata : data,
						relation,
						selectedOption
					},
					el : el.c.find('.fieldsWrapper')

				},
				function(p){

					subdata = data

					p.el.find('.option').on('click', function(){
						selectedOption = $(this).attr('option')

						p.el.find('.option').removeClass('selected')
						$(this).addClass('selected')
					})

					if (subdata.result == 'paid' || !relation){
						el.c.find('.content').addClass('ready')
					}
					else{
						el.c.find('.content').removeClass('ready')
					}
					
				})
			},

			error : function(data){
				self.shell({
					animation : false,
					inner : html,
					name : 'error',
					data : {
						error : data.error
					},
					el : el.c.find('.fieldsWrapper')

				},
				function(p){

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
			
			self.app.platform.sdk.paidsubscription._clbks.updatepaiddata.getpaidsubscription = function(address, data){
				if (making) return

				if (address == ed.address){
					if(!data.error){
						renders.form(data)

					}
				}
			}

			el.c.find('.sendButton .button').on('click', function(){

				if(!subdata) return

				if(!subdata.data){
					return 
				}

				var ui = self.psdk.userInfo.get(ed.address)

				if(!ui){
					return
				}

				var amount = 0
				
				var mactions = {
					paid : {
						text : () => {
							return self.app.localization.e('getpaidsubscription_acceptQuestion_paid', {amount : self.app.platform.mp.coin(amount), name : ui.name})
						},
						action : () => {

							if (amount <= 0){
								return sitemessage('error')
							}

							var transaction = actions.getTransaction(amount, ed.address)

							return self.app.platform.actions.addActionAndSendIfCan(transaction, 1, null, {
								calculatedFee : 0,
								rejectIfError : true
							})

						}
					},

					subscribe : {
						text : () => {
							return self.app.localization.e('getpaidsubscription_acceptQuestion_subscribe', {name : ui.name})
						},
						action : () => {

							return new Promise((resolve, reject) => {
								self.app.platform.api.actions.notificationsTurnOn(ed.address, function (tx, error) {
									if (error) {
										return reject(error)
									}

									resolve(tx)
								})
							})
						}
					}
				}

				var actions = []

				if (!relation){
					actions.push(mactions.subscribe)
				}

				if (subdata.result == 'paid'){
					actions.push(mactions.paid)

					if(!selectedOption){

						sitemessage(self.app.localization.e('getpaidsubscription_select_option'))

						return
					}

					amount = - subscriptiondata.data[selectedOption].balance

					if (amount <= 0){
						sitemessage('error')

						return
					}
				}

				if (actions.length){

					new dialog({
						html : self.app.localization.e('getpaidsubscription_acceptQuestion') + _.map(actions, (a) => {return a.text()}),
						btn1text :  self.app.localization.e('daccept'),
						btn2text :  self.app.localization.e('dcancel'),
						class : 'zindex',
						success : function(){

							globalpreloader(true)

							return processArray(actions, (action) => {
								return action.action().catch(e => {
									return Promise.reject(e)
								})
							}).then(() => {

								return self.app.platform.sdk.paidsubscription.checkvisibilityStrong(ed.address, false, true)

								

							}).then(() => {

								sitemessage(self.app.localization.e('wssuccessfully'))
								successCheck()

								return new Promise((resolve) => {
									setTimeout(() => {
										self.closeContainer()
										resolve()
									}, 400)

								})

							}).catch(e => {

								self.app.platform.errorHandler(e, true)

								make()

							}).finally(() => {
								globalpreloader(false)
							})
							

						}
					})

				}
			})

		}

		var make = function(){

			making = true

			relation = me.relation(ed.address, 'subscribes')

			renders.preloader()

			self.app.platform.sdk.paidsubscription.checkvisibilityStrong(ed.address, true).then(r => {

				console.log('checkvisibilityStrong', r)

				if(r.error){
					renders.error(r)
					return
				}

				renders.form(r)

			}).catch(e => {

			}).finally(() => {
				making = false
			})
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				subdata = null
				me = null
				relation = null
				selectedOption = null

				ed = p.settings.essenseData

				var data = {
					ed
				};

				self.sdk.users.get(ed.address, function(){

					me = self.app.platform.psdk.userInfo.getmy()

					if(self.app.user.isItMe(ed.address) || !me){
						return
					}

					

					data.userinfo = self.psdk.userInfo.get(ed.address)

					clbk(data);

				})

			},

			destroy : function(){
				ed = {}
				el = {};

				delete self.app.platform.sdk.paidsubscription._clbks.updatepaiddata.getpaidsubscription
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make();

				p.clbk(null, p);
			},
			wnd : {
				swipeClose : true,
				trueshold : 1,
				swipeCloseDir : 'down',
				class : 'getpaidsubscriptionwindow normalizedmobile maxheight',
				type : 'pkoin'
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
	module.exports = getpaidsubscription;
}
else{

	app.modules.getpaidsubscription = {};
	app.modules.getpaidsubscription.module = getpaidsubscription;

}