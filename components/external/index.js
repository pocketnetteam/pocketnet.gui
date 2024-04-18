var external = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, balanceMode, loading = false;

		
		var events = {
			
		}

		var renders = {
			loading : function(statusText){

				loading = statusText ? true : false
				if(!el.c) return

				if(statusText){
					el.c.addClass('wait')
					el.c.find('.loading .text').html(self.app.localization.e(statusText))
				}

				else{
					el.c.removeClass('wait')
				}
			},
			balance : function(value, clbk){

				self.shell({
					name :  'balance',
					data : {
						formattedValue : self.app.platform.mp.coin(value),
						value : value
					},

					el : el.c.find('.balanceWrapper')

				}, function(_p){

					if (clbk)
						clbk(_p);
				})
			},

			pay : function(_el, parameters, clbk){
				console.log('parameters', parameters)

				var lsdata = {}

				var customerClbk = function(response){

					successCheck()
					renders.loading(null)
					lsdata.customersend = response
					updateStatus()

					make()

				}

				var updateStatus = function(){
					
					try{
						localStorage['pays_' + parameters.hash] = JSON.stringify(lsdata) || {}
					}catch(e){
						console.error(e)
					}
				}

				var getStatus = function(){
					try{
						lsdata = JSON.parse(localStorage['pays_' + parameters.hash] || "{}") || {}
					}catch(e){
						console.error(e)
					}
				}

				var txclbk = function(txid){
					var cbpw = helpers.callbackPayWay(parameters)

					///

					lsdata.txid = txid

					updateStatus()

					/// saveHashInfo

					if(cbpw == 'redirect'){
						renders.loading('external_paySucc_redirect')

						helpers.callbackPay(parameters, txid).then((w) => {
							setTimeout(() => {
								customerClbk(w)
							}, 700)
						})

						
					}

					if(cbpw == 'fetch'){
						renders.loading('external_paySucc_fetch')

						helpers.callbackPay(parameters, txid).then((w) => {
							customerClbk(w)
						})

					}

					if(!cbpw){
						customerClbk(true)
					}
				}

				getStatus()

				self.shell({
					name :  'pay',
					data : {
						parameters,
						lsdata
					},

					el : _el

				}, function(_p){

					_p.el.find('.close').on('click', function(){
						self.closeContainer()
					})

					if(parameters.tx){
						_p.el.find('.sendtx').on('click', function(){

							if(loading) return
							
							renders.loading('external_prepareTransaction')

							helpers.sendTransaction(parameters.tx, parameters.fees).then((txid) => {

								txclbk(txid)

							}).catch(e => {

								siteMessage(e)

							}).finally(() => {
								renders.loading()
							})

							/*setTimeout(() => {

								txclbk('e563fa4c9440b81164c0049b324740ef156748607c668b2707551237c75d2591')
								
							}, 4300)*/

							/*
							
							renders.loading()
							siteMessage('error')
							
							*/

							/*helpers.sendTransaction(parameters.tx, parameters.fees).then(() => {

							}).catch(e => {

							}).finally(() => {

							})*/
							
						})
					}

					if (lsdata.txid){
						self.app.platform.papi.transaction(lsdata.txid, _p.el.find('.txBody'))
					}
					
					if (lsdata.txid && !lsdata.customersend){
						txclbk(lsdata.txid)
					}

					renders.recieverProfile(_p.el.find('.profileWrapper'), parameters.address)

					if (clbk)
						clbk(_p);
				})
			},

			recieverProfile : function(el, address){
				self.sdk.users.get(address, function(){
					var profile = self.psdk.userInfo.get(address)

					self.shell({
						name :  'recieverProfile',
						data : {
							profile
						},
	
						el : el
	
					}, function(_p){

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
			self.app.platform.actions.clbk('change', 'external', actions.balance)
		}

		var ways = {
			pay : function(clbk){

				var tx = null

				try{
					tx = helpers.getTransaction(ed.parameters.value, ed.parameters.address)
				}
				catch(e){

				}
				
				helpers.getFees(tx).then(fees => {

					renders.pay(el.c.find('.extcnt'), {...ed.parameters, tx, fees}, clbk)

				}).catch(e => {
					renders.pay(el.c.find('.extcnt'), {...ed.parameters, error : e}, clbk)
				})
				
				
			},
		}

		var helpers = {
			callbackPayWay : function(parameters){
				if(!parameters.c_url){
					return 
				}

				if(parameters.c_url_type == 'fetch') return 'fetch'

				return 'redirect'
			},

			callbackPay : function(parameters, tx){
				var way = helpers.callbackPayWay(parameters)

				if (way == 'redirect'){

					var Url = new URL(parameters.c_url)

					Url.searchParams.append('tx', tx);

					_.each(parameters.payload, (d, i) => {

						if(i == 'tx') return

						Url.searchParams.append(i, d);
					})

					var url = Url.toString()

					if (window.cordova){

						cordova.InAppBrowser.open(url, '_system');

						return Promise.resolve()
					}

					if (typeof _Electron != 'undefined'){

						electron = require('electron');
						electron.shell().openExternal(url);

						return Promise.resolve()
					}

					window.open(url)

					return Promise.resolve('redirect')
				}

				if (way == 'fetch'){

					var data = {tx : tx}

					_.each(parameters.payload, (d, i) => {

						if(i == 'tx') return

						data[i] = d
					})

					var headers = _.extend({
						'Accept': 'application/json',
						'Content-Type': 'application/json;charset=utf-8'
					})

					try{
						return fetch(parameters.c_url, {

							method: 'POST',
							mode: 'cors',
							headers: headers,
							body: JSON.stringify(data)
	
						}).then(r => {
							if(!r.ok){
								return Promise.reject(r.status)
							}

							return Promise.resolve('fetch')
						})
					}
					catch(e){
						return Promise.reject(e)
					}

				}

				return Promise.resolve('noway')
			},

			getAdresses : function(){
				var adresses = []

				if (balanceMode == 'all') adresses = [].concat(self.app.platform.sdk.addresses.storage.addresses).concat(self.app.user.address.value)
				if (balanceMode == 'user') adresses = [self.app.user.address.value]
				if (balanceMode == 'wallet') adresses = self.app.platform.sdk.addresses.storage.addresses

				if(!adresses) throw 'wrong:balanceMode'

				return adresses
			},

			getFees : function(transaction){

				if(!transaction){
					return Promise.resolve(0)
				}

				var account = self.psdk.actions.getCurrentAccount()

				if (account){

					var action = account.prepareAction(transaction)

					return action.prepareTransaction(0).then(txdata => {
						return Promise.resolve(txdata.calculatedFee)
					})
				}

				return Promise.resolve(0)
			},

			getTransaction : function(amount, reciever){
				var adresses = helpers.getAdresses()

				var transaction = new Transaction()
				
					transaction.source.set(adresses)
					transaction.reciever.set([
						{
							address : reciever,
							amount : amount
						}
					])

					transaction.feemode.set('exclude')
					transaction.message.set('')

				
				return transaction
			},

			sendTransaction : function(transaction, fees = 0){

				if(!transaction) return Promise.reject('missing:transaction')

				return self.app.platform.actions.addActionAndSendIfCan(transaction, 1, null, {
					calculatedFee : fees,
					rejectIfError : true
				}).then(action => {
					return Promise.resolve(action.transaction)
				})
			}
		}

		var actions = {
			

			balance : function(){
				var account = self.app.platform.actions.getCurrentAccount()
				var value = 0

				if(!account){
					
				}
				else{

					var balance = account.actualBalance(helpers.getAdresses())

					value = balance.actual

				}

				renders.balance(value)
			}
		}

		var make = function(clbk){

			actions.balance()

			if (ways[ed.action]){
				ways[ed.action](clbk)
			}
		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var userinfo = self.psdk.userInfo.getmy()

				var data = {
					ed, userinfo
				};

				balanceMode = 'all'

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};

				self.nav.api.history.removeParameters(['ext'])

				self.app.platform.actions.clbk('change', 'external', null)
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				initEvents();

				make(() => {
					p.clbk(null, p)
				})

				
			},

			wnd : {
				class : 'withoutButtons extwindow normalizedmobile maxheight externalwindow',
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
	module.exports = external;
}
else{

	app.modules.external = {};
	app.modules.external.module = external;

}