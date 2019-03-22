var wallet = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var charts = {};

		var addressesGroup = {

			pnetwallet : {
				label : self.app.localization.e('tacaddress'),
				alabel : self.app.localization.e('tacaddress'),
				id : 'pnetwallet',

				addresses : function(){
					return [self.app.platform.sdk.address.pnet().address]
				}
			},

			wallet : {
				label : self.app.localization.e('twallet'),
				id : 'wallet',

				addresses : function(){
					return self.app.platform.sdk.addresses.storage.addresses || []
				},

				caption : self.app.localization.e('twalletaddresses')
			},

			total : {
				label : self.app.localization.e('tTotal'),
				id : 'total',

				addresses : function(){
					return [self.app.platform.sdk.address.pnet().address].concat(self.app.platform.sdk.addresses.storage.addresses || [])
				}
			},

		}

		var send = {
			parameters : {

				source : new Parameter({
					name : "Source",
					type : "VALUES",
					id : 'source',
					defaultValue : "pnetwallet",
					possibleValuesLabels : [self.app.localization.e('twallet'), self.app.localization.e('tacaddress'), self.app.localization.e('tTotal')],
					possibleValues : ['wallet', 'pnetwallet', 'total'],
					placeholder : self.app.localization.e('wsselect')
				}),

				reciever : new Parameter({
					name : self.app.localization.e('wsreciever'),
					type : "VALUESCUSTOM",
					id : 'reciever',
					possibleValuesLabels : [],
					possibleValues : [],
					placeholder : self.app.localization.e('wsenter'),
					onType : true
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

				fees : new Parameter({
					name : self.app.localization.e('wsincludefees'),
					type : "VALUES",
					id : 'fees',
					defaultValue : "include",
					possibleValuesLabels : [self.app.localization.e('wsrecieverpay'), self.app.localization.e('wssenderpay')],
					possibleValues : ['include', 'exclude']
				}),
			}
		}

		var recv = {

			wallet : self.app.localization.e('twallet'),
			pnetwallet : self.app.localization.e('tacaddress')

		}

		var deposit = {
			active : false,
			parameters : {
				deposit : new Parameter({
					name : self.app.localization.e('wrecieveon'),
					type : "VALUES",
					id : 'deposit',
					defaultValue : 'wallet',
					possibleValuesLabels : [self.app.localization.e('twallet'), self.app.localization.e('tacaddress')],
					possibleValues : ['wallet', 'pnetwallet'],
					placeholder : self.app.localization.e('wdselectfrom')
				}),

				depositamount : new Parameter({
					name : self.app.localization.e('wdamount'),
					id : 'depositamount',
					type : "NUMBER",
					placeholder : self.app.localization.e('wdenteramount'),
					onType : true,

					format : {
						Precision : 6
					}
				}),

				message : new Parameter({
					name : self.app.localization.e('wdmessage'),
					id : 'message',
					type : "TEXT",
					placeholder : self.app.localization.e('wdmessageplaceholder'),
					onType : true
				}),

				label : new Parameter({
					name : self.app.localization.e('wdlabel'),
					id : 'label',
					type : "STRING",
					onType : true
				}),
			}
		}

		var history = [];
		var historyp = [];
		var mode = 0

		var actions = {
			sendAddresses : function(){
				var v = send.parameters.source.value;

				return addressesGroup[v].addresses()
			},

			canChangeSend : function(){
				if(send.parameters.reciever.value){

					var _i = null;
					var r = _.find(recv, function(r, i){

						_i = i;

						return send.parameters.reciever.value == r || send.parameters.reciever.value == i
					})

					if(r){
						return _i
					}
				}

				return null;
			},

			sendParameters : function(){

				var v = send.parameters.source.value;

				send.parameters.reciever.possibleValues = []
				send.parameters.reciever.possibleValuesLabels = []				

				_.each(recv, function(r, i){

					if(i != v && v != 'total'){
						send.parameters.reciever.possibleValues.push(i)
						send.parameters.reciever.possibleValuesLabels.push(r)
					}

				})

				if(v == 'total'){
					var r = _.find(recv, function(r, i){
						return send.parameters.reciever.value == r || send.parameters.reciever.value == i
					})

					if(r){
						send.parameters.reciever.value = ''
					}
				}

				if (send.parameters.reciever.value == v || send.parameters.reciever.value == recv[v]){
					send.parameters.reciever.value = send.parameters.reciever.possibleValuesLabels[0];
				}

				if(!send.parameters.reciever.possibleValues.length){
					send.parameters.reciever.placeholder = self.app.localization.e('wrenteraddress')
				}
				else
				{
					send.parameters.reciever.placeholder = self.app.localization.e('wrenteraddressselect')
				}

				var addresses = actions.sendAddresses();

				self.app.platform.sdk.node.transactions.get.balance(function(amount){

					if(send.parameters.amount.value > amount) send.parameters.amount.value = amount
					
				}, addresses, null, true)
			},

			addaddress : function(){
				var l = self.app.platform.sdk.addresses.storage.addresses.length;

				self.app.platform.sdk.addresses.addWalletAddress(l);

				self.app.platform.sdk.addresses.save();

				topPreloader(0)

				make(function(){
					topPreloader(100)
				});
			},

			linkValidation : function(){

				return deposit.parameters.depositamount.value > 0 && trim(deposit.parameters.message.value)
			},

			linkValidationQr : function(){

				return deposit.parameters.depositamount.value > 0
			},

			
			showDepositInStep : function(action, step, name){
				renders.step(function(el){
					renders.deposit(function(_el){

						actions[action](_el)

						renders.stepB(_el, name)


					}, el)
				}, step, {
					class : 'deposit'
				})
			},
			showQrResult : function(el){
				
				if (deposit.address && actions.linkValidationQr()){
					renders.qrResultForDeposit(deposit.address, el.find('.actionbody'))
				}

			}, 
			showLinkResult : function(el){
				
				if (deposit.address && actions.linkValidation()){
					renders.linkResultForDeposit(deposit.address, el.find('.actionbody'))
				}

			},

			showLinkMaker : function(el){
			
				if (deposit.address){
					renders.linkMakerForDeposit(deposit.address, el.find('.actionbody'))
				}

			},

			showQrMaker : function(el){
			
				if (deposit.address){
					renders.qrMakerForDeposit(deposit.address, el.find('.actionbody'))
				}

			},

			showDeposit : function(el){

				deposit.address = ''

				var v = deposit.parameters.deposit.value

				var address = '';

				deposit.active = true;

				if(v == 'pnetwallet') {
					address = self.app.platform.sdk.address.pnet().address

					deposit.address = address;

					renders.addressForDeposit(address, el.find('.actionbody'))

					return

				}

				if(v == 'wallet'){

					self.app.platform.sdk.addresses.addNewWalletAddress(function(_a){

						self.app.platform.sdk.addresses.save();

						address = _a;

						deposit.address = address;

						renders.addresses()

						renders.addressForDeposit(address, el.find('.actionbody'))
					})

					return

				}
			},

			showSendInStep : function(action, step, name){
				renders.step(function(el){
					renders.send(function(_el){

						actions[action](_el)

						renders.stepB(_el, name)


					}, el)
				}, step, {
					class : 'send'
				})
			},

			calculateFee : function(el){

				self.app.platform.sdk.node.fee.estimate(function(fees){
					renders.sendFees(el.find('.actionbody'), fees)
				})

			},

			validSend : function(){
				var amount = send.parameters.amount.value;
				
				var reciever = send.parameters.reciever.value;

				if (amount > 0 && reciever){
					return true;
				}
				else
				{
					return false;
				}
			},

			prepareTransaction : function(feerate, clbk){

				var prepareClbk = function(addresses, outputs, feesMode){

					self.app.platform.sdk.wallet.txbase(addresses, _.clone(outputs), 0, feesMode, function(err, inputs, _outputs){

						if(err){
							sitemessage(err)

							return
						}

						var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs)


						var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

						
						if (clbk)
							clbk(addresses, outputs, totalFees, feesMode)
					})

				}


				var amount = send.parameters.amount.value;
				var feesMode = send.parameters.fees.value;
				var addresses = actions.sendAddresses();
				var outputs = [];

				var reciever = send.parameters.reciever.value;

				if(reciever == 'pnetwallet' || reciever == self.app.localization.e('tacaddress')){
					outputs.push({
						address : self.app.platform.sdk.address.pnet().address,
						amount : amount
					})

					prepareClbk(addresses, outputs, feesMode)

					return
				}

				if(reciever == 'wallet' || reciever == self.app.localization.e('twallet')){

					self.app.platform.sdk.addresses.addNewWalletAddress(function(_a){

						outputs.push({
							address : _a,
							amount : amount
						})

						self.app.platform.sdk.addresses.save();

						prepareClbk(addresses, outputs, feesMode)

					})

					return
				}

				outputs.push({
					address : reciever,
					amount : amount
				})

				prepareClbk(addresses, outputs, feesMode)
			}
		}

		var events = {

			addaddress : function(){
				actions.addaddress()
			},

			closeAdditional : function(){
				$(this).closest('.actionbody').html('')
			}
		}

		var renders = {

			clearMain : function(clbk){



				self.shell({

					animation : {
						id : 'fadeInByElement',
						selector : ".fadeInByElement",
						timeouts : 150
					},

					clear : true,
					el : el.c.find('.animationWrapper'),

				}, clbk)

				
			},

			clearStep : function(clbk){

				self.shell({

					animation : {
						id : 'fadeInByElement',
						selector : ".fadeInByElementStep",
						timeouts : 150
					},

					clear : true,
					el : el.step,

				}, clbk)

				
			},

			mainWithClear : function(clbk){
				history = [];
				historyp = [];

				renders.clearStep(function(){

					renders.main(function(){
						make();
					})
				})
			},

			main : function(clbk){

				self.shell({

					name :  'main',
					el :   el.main,

					data : {
						
					},

					animation : 'fadeIn',

				}, function(){

					el.total = el.c.find('.total');
					el.addresses = el.c.find('.addresses');
					el.send = el.c.find('.send');
					el.deposit = el.c.find('.deposit');

					if (clbk)
						clbk();
				})
			},

			stepB : function(s, name){
				s.find('._stepback').html('<div class="backWrapper"><div class="back"><i class="fas fa-arrow-left"></i></div></div>')
				s.find('._stepclose').html('<div class="closeAdditional"><span><i class="fas fa-undo"></i> '+self.app.localization.e('wreturntoeallet')+'</span></div>')					


				s.find('._subcaptionlevel span').html(name || '')
			},

			step : function(clbk, step, _p){

				if(!_p) _p = {};

				if(mode == step){					

					if (clbk)
						clbk(el.c.find('.step'))

				}

				else
				{
					mode = step;

					history[step] = clbk;
					historyp[step] = _p;

					renders.clearMain(function(){



						_scrollToTop(el.step, 0, 200, -70)

						setTimeout(function(){

							self.shell({

								name :  'step',
								el :   el.step,
								data : {
									
								},

								animation : 'fadeIn'

							}, function(p){


								var s = p.el.find('.step');

								if(_p.class) s.addClass(_p.class)								

								
								if (clbk)
									clbk(s)

							})

						}, 200)


					})
				}

				
			},

			//// DEPOSIT
				qrResultForDeposit : function(address, el, clbk){

					self.shell({

						name :  'depositqrresult',
						el :   el,
						data : {
							address : address,
							d : deposit
						},

					}, function(_p){

						
					})

				},
				linkResultForDeposit : function(address, el, clbk){

					self.shell({

						name :  'depositlinkresult',
						el :   el,
						data : {
							address : address,
							d : deposit
						},

					}, function(_p){

						_p.el.find('.copylink').on('click', function(){
							

							copyText(_p.el.find('.linkInTextArea'))

							sitemessage(self.app.localization.e('waddresswascop'))
						})
					})

				},
				linkMakerForDeposit : function(address, el, clbk){
		
					self.shell({

						name :  'depositlinkmaker',
						el :   el,
						data : {
							address : address,
							d : deposit
						},

					}, function(_p){

						var createLink = _p.el.find('.getlink')

						var ps = [deposit.parameters.depositamount, deposit.parameters.message, deposit.parameters.label]

						ParametersLive(ps, _p.el)

						_.each(ps, function(p){
							p._onChange = function(){
								if(actions.linkValidation()){
									createLink.removeClass('disabled')
								}
								else
								{
									createLink.addClass('disabled')
								}
							}
						})

						if(actions.linkValidation()){
							createLink.removeClass('disabled')
						}

						createLink.on('click', function(){

							if (actions.linkValidation())
								actions.showDepositInStep('showLinkResult', 3, self.app.localization.e('linkCreated'))

						});

					})

				},

				qrMakerForDeposit : function(address, el, clbk){
		
					self.shell({

						name :  'depositqrmaker',
						el :   el,
						data : {
							address : address,
							d : deposit
						},

					}, function(_p){

						var createLink = _p.el.find('.getlink')

						var ps = [deposit.parameters.depositamount, deposit.parameters.message, deposit.parameters.label]

						ParametersLive(ps, _p.el)

						_.each(ps, function(p){
							p._onChange = function(){
								if(actions.linkValidationQr()){
									createLink.removeClass('disabled')
								}
								else
								{
									createLink.addClass('disabled')
								}
							}
						})

						if(actions.linkValidationQr()){
							createLink.removeClass('disabled')
						}

						createLink.on('click', function(){

							if(actions.linkValidationQr())

								actions.showDepositInStep('showQrResult', 3, self.app.localization.e('wqrcodecreated'))
						});
					})

				},
				addressForDeposit : function(address, el, clbk){


					self.shell({

						name :  'depositaddress',
						el :   el,
						data : {
							address : address,
							d : deposit
						},

					}, function(_p){

						
						_p.el.find('.getlink').on('click', function(){
							actions.showDepositInStep('showLinkMaker', 2, self.app.localization.e('wlinkcreating'))
						})

						_p.el.find('.qrcode').on('click', function(){
							actions.showDepositInStep('showQrMaker', 2, self.app.localization.e('wqrcodecreating'))
						})
						

						_p.el.find('.copyaddress').on('click', function(){

							copyText(_p.el.find('.adr'))

							sitemessage(self.app.localization.e('waddresswascop'))

						})


					})

				},

				deposit : function(clbk, _el){
					self.shell({

						name :  'deposit',
						el :   _el || el.deposit,
						data : {
							d : deposit
						},

					}, function(_p){

						ParametersLive([deposit.parameters.deposit], _p.el)

						deposit.parameters.deposit._onChange = function(v){

							self.app.settings.set(self.map.uri, 'deposit', v)

							var label = deposit.parameters.deposit.labelByValue(v)

							_p.el.find('.type').html(label)		
							
							actions.showDepositInStep('showDeposit', 1, self.app.localization.e('wdoptions'))
									
						}

						_p.el.find('.recieveaddress').on('click', function(){

							actions.showDepositInStep('showDeposit', 1, self.app.localization.e('wdoptions'))

						})

						_p.el.on('click', '.closeAdditional', events.closeAdditional)

						if (clbk)
							clbk(_p.el)

					})
				},

			////
			//// SEND
				sendFees : function(el, fees, clbk){

					if(!actions.validSend()){
						return;
					}

					var f = (fees.feerate || 0.000001)

					actions.prepareTransaction(f, function(addresses, outputs, totalFees, feesMode){

						self.shell({

							name :  'sendfees',
							el :   el,
							data : {
								fees : totalFees,
								d : send
							},

						}, function(_p){

							ParametersLive([send.parameters.fees], _p.el)

							send.parameters.fees._onChange = function(v){
								self.app.settings.set(self.map.uri, 'feesMode', v)
							}

							_p.el.find('.sendtransaction').on('click', function(){

								actions.prepareTransaction(f, function(addresses, outputs, totalFees, feesMode){

									self.app.platform.sdk.wallet.txbase(addresses, _.clone(outputs), totalFees, feesMode, function(err, inputs, _outputs){

										if(err){
											sitemessage(err)

											return
										}

										var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs)

										self.app.platform.sdk.node.transactions.send(tx, function(d, err){
											if(err){
												sitemessage(err)
											}

											else
											{
												var ids = _.map(inputs, function(i){
													return i.txid
												})

												self.app.platform.sdk.node.transactions.clearUnspents(ids)

												mode = 0;

												renders.mainWithClear()

												sitemessage(self.app.localization.e('wssuccessfully'))
											}
										})	
									})

								})

							})

						})

					})

				},
				send : function(clbk, _el){

					actions.sendParameters();

					self.shell({

						name :  'send',
						el :   _el ||  el.send,
						data : {
							d : send
						},

					}, function(_p){

						ParametersLive(_.toArray(send.parameters), _p.el)

						var changer = _p.el.find('.change');

						var changerActive = function(){
							if(actions.canChangeSend()){
								changer.removeClass('hidden')
							}
							else
							{
								changer.addClass('hidden')
							}
						}

						send.parameters.amount._onChange = function(v){
							
							var addresses = actions.sendAddresses();


							self.app.platform.sdk.node.transactions.get.balance(function(amount){



								if(send.parameters.amount.value < 0) send.parameters.amount.value = 0;

								if (send.parameters.amount.value > amount) 
									send.parameters.amount.value = amount


								send.parameters.amount.el.closest('.inputWrapper').html(send.parameters.amount.input())

								ParametersLive([send.parameters.amount], _p.el)

								if (mode == 1){
									actions.showSendInStep('calculateFee', 1, self.app.localization.e('wscalculatefees'))
								}

								
							}, addresses, null, true)

						}
						

						send.parameters.source._onChange = function(v){
							
							actions.sendParameters();

							send.parameters.reciever.el.closest('.inputWrapper').html(send.parameters.reciever.input())

							send.parameters.amount.el.closest('.inputWrapper').html(send.parameters.amount.input())


							ParametersLive([send.parameters.reciever, send.parameters.amount], _p.el)

							changerActive()

							if (mode == 1){
								actions.showSendInStep('calculateFee', 1, self.app.localization.e('wscalculatefees'))
							}

						}

						send.parameters.reciever._onChange = function(v){
							changerActive()

							if(!actions.canChangeSend() && v){

								var valid = true;

								try{
									bitcoin.address.fromBase58Check(v)
								}

								catch (e){
									valid = false;
								}


								if(!valid) {
									_p.el.find('.notvalidaddress').html(self.app.localization.e('wsaddressnotv'))

									return

								}
								else
								{
									_p.el.find('.notvalidaddress').html("")
								}

								if(v[0] == "P"){
							
								}

								else{

								}



							}
							else
							{
								_p.el.find('.notvalidaddress').html("")
							}
						}

						changer.on('click', function(){
							var v = actions.canChangeSend();

							if (v){

								send.parameters.source.value = v;

								send.parameters.source._onChange()

								send.parameters.source.el.closest('.inputWrapper').html(send.parameters.source.input())
								ParametersLive([send.parameters.source], _p.el)
							}
						})

						_p.el.find('.calculateFee').on('click', function(){

							if (actions.validSend()){
								actions.showSendInStep('calculateFee', 1, self.app.localization.e('wscalculatefees'))

								_p.el.find('.required').addClass('hidden')
							}
							else
							{
								_p.el.find('.required').removeClass('hidden')
							}

							
						})

						changerActive()

						if (clbk)
							clbk(_p.el)

					})
				},

			////
			
			addresses : function(clbk){
				var a = addressesGroup.total.addresses();
				var as = {};

				self.app.platform.sdk.node.transactions.get.unspents(function(unspents){

					self.app.platform.sdk.node.transactions.get.balance(function(total){


						_.each(unspents, function(unspent, i){

							as[i] = _.reduce(unspent, function(m, u){
								return m + Number(u.amount)
							}, 0)

						})

						var meta = [addressesGroup.pnetwallet, addressesGroup.wallet];

						var _addressesGroup = _.map(meta, function(gr){

							var addresses = _.map(gr.addresses(), function(address){
								return {
									balance : as[address],
									address : address
								}
							})

							return {
								caption : gr.caption,
								details : addresses,
								label : gr.alabel
								
							}

						}, a)

						self.shell({

							name :  'addresses',
							el :   el.addresses,
							data : {
								addressesGroup : _addressesGroup,
								total : total
							},

						}, function(_p){

							_p.el.find('.addaddress').on('click', events.addaddress)

							if (clbk)
								clbk()

						})

					}, a)
				}, a)

				
			},

			updateTotal : function(item, clbk){

				renders.datasets(item, charts[item.id].data.datasets)

				charts[item.id].update();

				el.total.find('.totalItem[item="'+item.id+'"] .balanceWrapper').html(self.app.platform.mp.coinwithsmall(item.balance))
			
				if (clbk)
					clbk()

			},

			datasets : function(item, last){

				var mainbg = [];
				var main = _.map(item.move, function(m){

					mainbg.push(m.color)

					return Number(m.summary || 0)
				})

				var details = [];
				var colors = [];
				var t = [];
				var bw = [];

				var n = '#F1F1F1'

				_.each(item.move, function(m){
					_.each(m.items, function(i){
						details.push(Number(i.value))
						colors.push(i.color)
						t.push(n)
						bw.push(8)
					})
				})

				var datasets = [{
			        data : main,
			       	backgroundColor : mainbg,
			       	borderColor : [n, n],
			       	borderWidth : [8, 8]
			
			    },{
			        data : details,
			       	backgroundColor : colors,
			       	borderColor : t,
			       	borderWidth : bw
			    }]

			    _.each(last, function(l, i){
			    	l.data = datasets[i].data
			    })


			    return datasets
			},

			total : function(item, clbk){

				if(item.update){

					renders.updateTotal(item, clbk)

					return
				}

				self.shell({

					name :  'total',
					el :   el.total,
					inner : append,
					data : {
						item : item
					},

				}, function(_p){

					var ctx = _p.el.find('#chart' + item.id)[0].getContext('2d');
					

					charts[item.id] = new Chart(ctx, {
					    type: 'doughnut',
						data : {
						    datasets : renders.datasets(item)
						},
					    options: {
					    	rotation : 0.5 * Math.PI,
					    	cutoutPercentage : 85
					    }
					});

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
			
			el.c.on('click', '._stepclose', function(){
								
				mode = 0;

				renders.mainWithClear()
			})

			el.c.on('click', '._stepback', function(){
			
				if (mode > 1){

					renders.step(history[mode - 1], mode - 1, historyp[mode - 1])

				}
				else
				{
					mode = 0;
					renders.mainWithClear()
				}

				
			})
		}

		var prepareOptions = function(){
			deposit.parameters.deposit.value = self.app.settings.get(self.map.uri, 'deposit') || deposit.parameters.deposit.defaultValue
			send.parameters.source.value = self.app.settings.get(self.map.uri, 'source') || send.parameters.source.defaultValue
			send.parameters.reciever.value = ''
			send.parameters.fees.value = self.app.settings.get(self.map.uri, 'feesMode') || send.parameters.fees.defaultValue


			deposit.active = false;
	
			

			mode = 0;

			history = [];
			historyp = [];
		}

		var drawCircles = function(clbk, update){
			lazyEach({
				array : _.toArray(addressesGroup),
				sync : true,

				action : function(p){
					var group = p.item;

					var addresses = group.addresses();

					self.app.platform.sdk.node.transactions.get.balance(function(amount){

						self.app.platform.sdk.node.transactions.get.canSpend(addresses, function(spend, total){
							var color = '#414244';
							var samount = 100;
							var temp = self.app.platform.sdk.node.transactions.tempBalance()

							if(total){

								console.log('group.id', group.id, total)

								if(group.id == 'pnetwallet'){

									
										total = temp + total;


										console.log('group.id', temp, total)

								}

								samount = 100 * spend / total
								color = '#0F8623'
							}

							var move = {
								positive : {
									summary : samount,
									color : color
								}
							}

							if(spend < total){
								move.neutral = {
									summary : 100 - samount,
									color : '#414244'
								}
							}

							if(group.id == 'pnetwallet'){
								
								amount = temp + amount;

							}

							renders.total({

								label : group.label,
								id : group.id,
								balance : amount,
								move : move,
								update : update

							}, p.success)
						})
						
					}, addresses)

				},

				all : {
					success : function(){

						if(clbk)
							clbk()

					}
				}
			})
		}

		var make = function(clbk){

			el.total.html('')

			drawCircles(function(){

				lazyActions([renders.send, renders.deposit, renders.addresses], clbk)

				self.app.platform.sdk.node.transactions.clbks.circles = function(){

					drawCircles(null, true)
					
				};


				self.app.platform.sdk.node.transactions.clbks.walletaddresses = function(){
					renders.addresses()
				}

			})

			

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

					data.p2pkh = self.app.platform.sdk.address.pnet()

		

				prepareOptions()

				clbk(data);

			},

			destroy : function(){

				delete self.app.platform.sdk.node.transactions.clbks.circles
				delete self.app.platform.sdk.node.transactions.clbks.walletaddresses 

				el = {};
			},
			
			init : function(p){

				charts = {};

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.step = el.c.find('.actionstep');
				el.main = el.c.find('.mainstep')

				initEvents();

				renders.main(function(){
					make(function(){

						var _p = parameters()

						if(_p.action){

							if(_p.action == 'send'){

								send.parameters.amount.value = Number(_p.amount.replace(/,/g,''))
								send.parameters.reciever.value = _p.address

								send.parameters.amount._onChange();

								actions.showSendInStep('calculateFee', 1, self.app.localization.e('wscalculatefees'))


							}

						}


						p.clbk(null, p);

					});
					
				})
				

				
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
	module.exports = wallet;
}
else{

	app.modules.wallet = {};
	app.modules.wallet.module = wallet;

}