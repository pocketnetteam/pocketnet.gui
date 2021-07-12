var wallet = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var charts = {},
			essenseData = {};

		var craddress = 'PFF7PevK753eYTwWBScdEAbWQrgu36AdUA';
		var first = true;

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
					name : self.app.localization.e('source'),
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
					onType : true,

					labelToInput : function(d){
						if(_.isObject(d)){
							return d.name
						}
						else{
							return d
						}
					},
					defaultValueTemplate : function(d, f, g, firstdef){
						if(_.isObject(d)){

							var h = ''

								h+='<div class="table walletuservalue" firstdef="'+firstdef+'">'

								h+='<div class="iconcell">'
								h+='<img src="'+d.image+'">'
								h+='</div>'

								h+='<div class="namecell">'
								h+=d.name
								h+='</div>'

								h+='</div>'

							return h

						}
						else{

							return '<div class="walletdfvalue"><span>' + d + '</span></div>'

							if(!d){
								return '<div class="walletempvalue"><span>' + self.app.localization.e('wsreciever') + '</span></div>'
							}
							else{
								return '<div class="walletdfvalue"><span>' + d + '</span></div>'
							}
							
						}
					}
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

				message : new Parameter({
					name : self.app.localization.e('message'),
					id : 'message',
					type : "stringany",
					placeholder : self.app.localization.e('yourmessage'),
					
					format : {
						Length : 80
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

		var htls = {
			parameters : {

				source : new Parameter({
					name : self.app.localization.e('source'),
					type : "VALUES",
					id : 'source',
					defaultValue : "pnetwallet",
					possibleValuesLabels : [self.app.localization.e('twallet'), self.app.localization.e('tacaddress'), self.app.localization.e('tTotal')],
					possibleValues : ['wallet', 'pnetwallet', 'total'],
					placeholder : self.app.localization.e('wsselect')
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

		var crowdfunding = {
			active : false,
			parameters : {

				reciever : new Parameter({
					name : self.app.localization.e('wrecieveon'),
					type : "VALUES",
					id : 'reciever',
					defaultValue : 'pnetwallet',
					possibleValuesLabels : [/*self.app.localization.e('twallet'), */self.app.localization.e('tacaddress')],
					possibleValues : [/*'wallet', */'pnetwallet'],
					placeholder : self.app.localization.e('wdselectfrom')
				}),

				amount : new Parameter({
					name : self.app.localization.e('e13214'),
					id : 'amount',
					type : "NUMBER",
					placeholder : self.app.localization.e('wsamountof'),

					format : {
						Precision : 6
					}
				}),

				currency : new Parameter({
					name : self.app.localization.e('currency'),
					id : 'currency',
					type : "VALUES",

					defaultValue : 'btc',
					possibleValuesLabels : ["BTC", "LTC"],
					possibleValues : ['btc', 'ltc'],

					placeholder : self.app.localization.e('e13215')
				}),

				currencyAmount : new Parameter({
					name : self.app.localization.e('e13216'),
					id : 'currencyAmount',
					type : "NUMBER",
					placeholder : self.app.localization.e('wsamountof'),

					format : {
						Precision : 6
					}
				}),
			},

			segments : [

				{
					id : 'AWAITINGFUNDS',
					time : 180,
					exclude : 'all',

					label : function(status, info, addressobject){
						if(status == this.id){

							return '<div class="todeal">'+addressobject.currency.toUpperCase() + ": " + info.Address+' <i class="fas fa-chevron-circle-right"></i> </div>'

						}
					},

					currentLabel : function(info){

						return "Awaitng Funds. Address will be valid for <b>" + info.MinutesLeft + " minutes</b>"

					}
				},
				{
					id : 'EXPIREDAWAITINGFUNDS',
					class : 'bad',
					finish : true,

					exclude : 'all',

					label : function(status, info){

						return self.app.localization.e('e13217')
						
					},

					currentLabel : function(info){

						return self.app.localization.e('e13217') + ' <div class="reactivate">'+self.app.localization.e('reactivate')+'</div>'

					}
				},

				{
					id : 'CONFIRMATIONS0',
					time : 10,
					currentLabel : function(info){

						return self.app.localization.e('e13218') + ' (0/4)'

					}
				},
				{
					id : 'CONFIRMATIONS1',
					time : 10,
					currentLabel : function(info){

						return self.app.localization.e('e13218') + ' (1/4)'

					}
				},
				{
					id : 'CONFIRMATIONS2',
					time : 10,
					currentLabel : function(info){

						return self.app.localization.e('e13218') + ' (2/4)'

					}
				},
				{
					id : 'CONFIRMATIONS3',
					time : 10,
					currentLabel : function(info){

						return self.app.localization.e('e13218') + ' (3/4)'

					}
				},

				{
					id : 'POCSENT',
					time : 4,
					currentLabel : function(info){

						return self.app.localization.e('e13219')

					}
				},

				{
					id : 'POCDELEVERED',
					finish : true,
					currentLabel : function(info){

						return self.app.localization.e('e13220')

					}
				},

			]
		}

		var history = [];
		var historyp = [];
		var mode = 0

		var actions = {

			showCrInStep : function(action, step, name, data){
				renders.step(function(el){
					renders.crowdfunding(function(_el){

						if (action)
							actions[action](_el, data)

						renders.stepC(_el, name)


					}, el)
				}, step, {
					class : 'crowdfunding',
					view : action
				})
			},

			olddeal : function(el, addressobject){

				renders.crDeal(addressobject, self.app.platform.sdk.exchanges.info[addressobject.info.address], el.find('.actionbody'))
			},

			newdeal : function(el){

				var p = {
					currency : crowdfunding.parameters.currency.value,
					address : crowdfunding.parameters.reciever.value,
					amount : crowdfunding.parameters.amount.value,
					currencyAmount : crowdfunding.parameters.currencyAmount.value
				}

				actions.pocAddress(p, function(err, address, info){
					if(err){
						sitemessage(self.app.localization.e('errorreload') + " (error: 0003)")
					}
					else
					{

						renders.crDeal(address, info, el.find('.actionbody'))
					}
				})
			},

			showListcount : function(el){
				
				self.app.platform.sdk.exchanges.statuses(function(err, data){

					if(err){
						sitemessage(self.app.localization.e('errorreload') + " (error: 0004)")
					}
					else
					{

						renders.showListcount(data, el.find('.actionbody'))
					}

				})

				

			},

			status : function(){

			},

			pocAddress : function(p, clbk){
				p || (p = {});

				if(!p.reciever || p.reciever == 'pnetwallet'){
					p.address = self.app.platform.sdk.address.pnet().address
				}

				if (p.reciever == 'wallet'){
					p.address = self.app.platform.sdk.addresses.storage.addresses[0]
				}

				if(p.currency && p.address){

					self.app.platform.sdk.exchanges.address(p, function(error, addressobject, info){

						if(!error){
							if (clbk)
								clbk(null, addressobject, info)
						}
						else
						{
							if (clbk)
								clbk('fail', null)
						}


					})

				}
				else{
					if (clbk)
						clbk('no data', null)
				}
				
			},

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

			htlsParameters: function(){

				var v = htls.parameters.source.value;

				var addresses = actions.sendAddresses();

				self.app.platform.sdk.node.transactions.get.balance(function(amount){

					if(htls.parameters.amount.value > amount) htls.parameters.amount.value = amount
					
				}, addresses, null, true)

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
				else{

					
				}

				var c = 0

				_.each(self.sdk.activity.latest, function(c, k){

					_.each(c, function(v){

						if(c > 7) return

						if(v.type == 'user'){

							if(v.id != self.app.platform.sdk.address.pnet().address){
								c++

								send.parameters.reciever.possibleValues.push(v.id)
								send.parameters.reciever.possibleValuesLabels.push(v.data)
							}

							
						}

					})
					
				})

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

				return deposit.parameters.depositamount.value > 0 && trim(deposit.parameters.message.value) && trim(deposit.parameters.label.value)
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

			showSendInStep : function(action, step, name, clbk){
				renders.step(function(el){
					renders.send(function(_el){

						actions[action](_el)

						renders.stepB(_el, name)

						if(clbk) clbk()
					}, el)
				}, step, {
					class : 'send'
				})
			},

			showHtlsInStep : function(action, step, name, clbk){

				var _el = el.c.find('.htlsnoredraw')

				if(_el.length){

					mode = step

					console.log("ACTION", action)

					actions[action](_el)
	
					renders.stepB(_el, name)

					if(clbk) clbk()
				}
				else{
					renders.step(function(el){
						renders.htls(function(_el){
	
							actions[action](_el)
	
							renders.stepB(_el, name)
	
							if(clbk) clbk()
						}, el)
					}, step, {
						class : 'htls'
					})
				}

			},

			calculateFee : function(el){

				self.app.platform.sdk.node.fee.estimate(function(fees){
					renders.sendFees(el.find('.actionbody'), fees)
				})

			},

			calculateFeeHtls : function(el){

				console.log('calculateFeeHtls')

				self.app.platform.sdk.node.fee.estimate(function(fees){

					console.log(el, fees)

					renders.htlsFees(el.find('.actionbody'), fees)
				})

			},

			validHtls : function(){
				var amount = htls.parameters.amount.value;

				console.log('htls.parameters.amount.value', htls.parameters.amount.value)

				if (amount > 0){
					return true;
				}
				else
				{
					return false;
				}
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

			prepareTransactionCommon : function(amount, reciever, feesMode, feerate, message, clbk){

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

				var addresses = actions.sendAddresses();
				var outputs = [];


				if(reciever == 'pnetwallet' || reciever == self.app.localization.e('tacaddress')){
					outputs.push({
						address : self.app.platform.sdk.address.pnet().address,
						amount : amount
					})

					prepareClbk(addresses, outputs, feesMode)

					return
				}

				if(reciever == 'wallet' || reciever == self.app.localization.e('twallet')){

					self.app.platform.sdk.addresses.getFirstRandomAddress(function(_a){

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

				self.sdk.wallet.embed(outputs, message)

				prepareClbk(addresses, outputs, feesMode)
			},

			prepareTransaction : function(feerate, clbk){

				var amount = send.parameters.amount.value;
				var feesMode = send.parameters.fees.value;
				var message = send.parameters.message.value;
				var reciever = send.parameters.reciever.value;

				actions.prepareTransactionCommon(amount, reciever, feesMode, feerate, message, clbk)
				
			},

			prepareTransactionHlts : function(feerate, fee, clbk){


				var amount = htls.parameters.amount.value;
				var feesMode = htls.parameters.fees.value;

				var addresses = actions.sendAddresses();
				var outputs = [];

				var reciever = self.app.platform.sdk.address.pnet().address //// dummy

				outputs.push({
					amount : amount,
					key : 'htlc'
				})

				self.app.platform.sdk.wallet.txbase(addresses, _.clone(outputs), fee, feesMode, function(err, inputs, _outputs){

					if (err){
						sitemessage(err)
						return
					}


					self.sdk.node.transactions.htls.plcreate(essenseData.htls, amount, inputs, _outputs, function(txb, meta){
						
						var tx = txb.build()

						var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);
					
						if (clbk)
							clbk(addresses, outputs, inputs, totalFees, feesMode, meta, tx)

					})

					
				})
				
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

					el.total = el.c.find('.total .tttl');
					el.totaler = el.c.find('.total .tttlforerror');
					el.addresses = el.c.find('.addresses');
					el.send = el.c.find('.send');
					el.deposit = el.c.find('.deposit');
					el.crowdfunding = el.c.find('.crowdfunding');
					el.htls = el.c.find('.htls')

					console.log('el.htls', el.htls)

					self.iclbks.main = function(){


						if(self.app.errors.connection()){
							el.totaler.addClass('active')
						}
						else{
							el.totaler.removeClass('active')
						}
					}

					if (clbk)
						clbk();
				})
			},

			stepC : function(s, name){
				s.find('._stepback').html('<div class="backWrapper"><div class="back"><i class="fas fa-arrow-left"></i></div></div>')
				s.find('._stepclose').html('<div class="closeAdditional"><span><i class="fas fa-undo"></i> '+self.app.localization.e('wreturntoeallet')+'</span></div>')					


				s.find('._subcaptionlevel span').html(name || '')
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
								if(_p.view) {
									s.attr('view', _p.view)		
								}
								else{
									s.removeAttr('view')
								}						

								
								if (clbk)
									clbk(s)

							})

						}, 200)


					})
				}

				
			},

			//// crowdfunding
			///
				
				

				showListcount : function(data, el){

					var list = self.app.platform.sdk.exchanges.get();

					self.shell({

						name :  'listcr',
						el :   el,
						data : {
							list : list,
							c : crowdfunding,


						},

					}, function(_p){

						var remove = function(addressobject, iel){

							self.app.platform.sdk.exchanges.remove(addressobject.currency, addressobject.info.address);
							iel.remove()
							list = self.app.platform.sdk.exchanges.get();

							if(!list.length){
								renders.step(history[mode - 1], mode - 1, historyp[mode - 1])
							}
						}

						_p.el.find('.removecr').on('click', function(){
							var iel = $(this).closest('.item');
							var address = iel.attr('item');

							var addressobject = self.app.platform.sdk.exchanges.find(address);

							self.app.platform.sdk.exchanges.status(
								addressobject.currency,
								addressobject.info.address
							, function(err, info){
								if(err){
									sitemessage(self.app.localization.e('errorreload') + " (error: 0006)")
								}
								else
								{
									if(info.Status == 'AWAITINGFUNDS' || info.Status == 'EXPIREDAWAITINGFUNDS'){

										remove(addressobject, iel)
									}
									else
									{
										dialog({
											html : self.app.localization.e('e13221'),
											success : function(){
												remove(addressobject, iel)
											}
										})
									}
								}
							})
						})

						_p.el.find('.updatecr').on('click', function(){
							var iel = $(this).closest('.item');
							var address = iel.attr('item');

							var addressobject = self.app.platform.sdk.exchanges.find(address);


							if (addressobject){

								self.app.platform.sdk.exchanges.status({
									address : addressobject.info.address,
									currency : addressobject.currency

								}, function(err, info){
									if(err){
										sitemessage(self.app.localization.e('errorreload') + " (error: 0002)")
									}
									else
									{
										renders.crStatus(addressobject, info, iel.find('.status'))
									}
								})
							}
							else
							{
								sitemessage(self.app.localization.e('errorreload') + " (error: 0001)")
							}
						})

						_p.el.on('click', '.todeal', function(){
							var iel = $(this).closest('.item');
							var address = iel.attr('item');

							var addressobject = self.app.platform.sdk.exchanges.find(address);

							actions.showCrInStep('olddeal', mode + 1, "Deal", addressobject)
						})

						lazyEach({
							array : list,
							action : function(p){
								var addressobj = p.item;

								var el = _p.el.find('[item="' + addressobj.info.address + '"] .status')

								var info =  self.app.platform.sdk.exchanges.info[addressobj.info.address]

								renders.crStatus(addressobj, info, el)
							}
						})
					})
				},

				listcount : function(el){

					var h = '';

					//self.app.platform.sdk.exchanges.statuses(function(){
						var list = self.app.platform.sdk.exchanges.get();


						var s = el.find('.listcountWrapper')

						if (list.length > 0){
							h = '('+list.length+')'

							el.find('.listcount').html(h)

							s.fadeIn()
						}

						else
						{
							s.fadeOut()
						}
					//})

					

					
				},

				crdealstatusstep : function(addressobject, info, el){
					self.shell({

						name :  'crdealstatusstep',
						el :   el,
						data : {
							addressobject : addressobject,
							info : info
						},

					}, function(_p){
						
					})
				},

				crDeal : function(addressobject, info, el){

					self.shell({

						name :  'crdeal',
						el :   el,
						data : {
							addressobject : addressobject
						},

					}, function(_p){
						renders.crStatus(addressobject, info, _p.el.find('.status'))
						renders.crdealstatusstep(addressobject, info, _p.el.find('.crdealstatusstep'))

						_p.el.on('click', '.copyaddress1', function(){

							copyText(_p.el.find('.forcopyaddress1'))

							sitemessage(self.app.localization.e('waddresswascop'))

						})

						_p.el.on('click', '.copyaddress2', function(){

							copyText(_p.el.find('.forcopyaddress2'))

							sitemessage(self.app.localization.e('waddresswascop'))

						})

						_p.el.on('click', '.reactivate', function(){

							self.app.platform.sdk.exchanges.reactivate({
								address : addressobject.info.address,
								currency : addressobject.currency

							}, function(err, _info){
								if(err){
									sitemessage(self.app.localization.e('errorreload') + " (error: 0002)")
								}
								else
								{

									info = _info

									renders.crStatus(addressobject, info, _p.el.find('.status'))
									renders.crdealstatusstep(addressobject, info, _p.el.find('.crdealstatusstep'))
								}
							})

						})

						

					})
				},

				applyStatus : function(info, el){
					_.find(crowdfunding.segments, function(s){

						var sel = el.find('.segment[segment="'+s.id+'"]');

						if (s.id == info.Status){

							var w = Math.min((Number(s.time) - Number(info.MinutesLeft)) / Number(s.time), 0.99) * 100

							sel.find('.line').css('width', w + '%')

							sel.addClass('active')

							if(s.class) sel.addClass(s.class)

							if(s.finish){
								sel.addClass('ended')

								sel.find('.line').css('width', '100%')
							}

							if(s.finish || s.exclude == 'all'){
								el.find('.current').html(s.currentLabel(info))
							}

							return true
						}

						sel.addClass('ended')

						sel.find('.line').css('width', '100%')

					})
				},

				crStatus : function(addressobject, info, el, clbk){

					self.shell({

						name :  'pocstatus',
						el :   el,
						data : {
							addressobject : addressobject,
							info : info,
							segments : crowdfunding.segments
						},

					}, function(_p){

						renders.applyStatus(info, el)



						if (clbk)
							clbk()
					})
				},

				crowdRate : function(el, rates, currency){
					el.find('.rate .value').html('<b>1 PKOIN = ' + (rates[currency]).toFixed(6) + ' '+currency.toUpperCase()+'</b>')
				},

				crowdCurrencyLabel : function(el, currency){
					el.find('.currencyAmountLabel').html(currency.toUpperCase() + ' '+self.app.localization.e('amount')+'</b>')
				},

				crowdfunding : function(clbk, _el){

					if(mode == 2){
						history[1] = function(_el){
							actions.showCrInStep('', 1, "")
						};
						historyp[1] = {
							class : 'crowdfunding'
						}
					}
					

					crowdfunding.parameters.currency || (crowdfunding.parameters.currency.value = 'btc')

					self.app.platform.sdk.exchanges.rates(function(rates){


						self.app.platform.sdk.node.transactions.get.balance(function(amount){

							amount = Math.min(amount / 3, 1000);

							self.shell({

								name :  'crowdfunding',
								el :   _el || el.crowdfunding,
								data : {
									d : crowdfunding,
									amount : amount
								},

							}, function(_p){

								ParametersLive(_.toArray(crowdfunding.parameters), _p.el)

								_p.el.on('click', '.closeAdditional', events.closeAdditional)

								renders.crowdRate(_p.el, rates, crowdfunding.parameters.currency.value)
								renders.crowdCurrencyLabel(_p.el, crowdfunding.parameters.currency.value)
								renders.listcount(_p.el)

								crowdfunding.parameters.amount._onChange = function(v){

									if (crowdfunding.parameters.amount.value < 0) crowdfunding.parameters.amount.value = 0;

									if (crowdfunding.parameters.amount.value > amount) 
										crowdfunding.parameters.amount.value = amount


									crowdfunding.parameters.currencyAmount.value = crowdfunding.parameters.amount.value * rates[crowdfunding.parameters.currency.value]

									crowdfunding.parameters.amount.el.closest('.inputWrapper').html(crowdfunding.parameters.amount.input())
									crowdfunding.parameters.currencyAmount.el.closest('.inputWrapper').html(crowdfunding.parameters.currencyAmount.input())

									ParametersLive([crowdfunding.parameters.amount, crowdfunding.parameters.currencyAmount], _p.el)

								}

								crowdfunding.parameters.currency._onChange = function(v){
									self.app.platform.sdk.exchanges.rates(function(nrates){

										rates = nrates;

										renders.crowdRate(_p.el, rates, crowdfunding.parameters.currency.value)
										renders.crowdCurrencyLabel(_p.el, crowdfunding.parameters.currency.value)
									})

								}

								crowdfunding.parameters.currencyAmount._onChange = function(v){

									if (crowdfunding.parameters.currencyAmount.value < 0) crowdfunding.parameters.currencyAmount.value = 0;

									if (crowdfunding.parameters.currencyAmount.value / rates[crowdfunding.parameters.currency.value] > amount){ 
										
										crowdfunding.parameters.currencyAmount.value = Number((amount * rates[crowdfunding.parameters.currency.value]).toFixed(6))
										
									}

									crowdfunding.parameters.amount.value = crowdfunding.parameters.currencyAmount.value / rates[crowdfunding.parameters.currency.value]

									crowdfunding.parameters.amount.el.closest('.inputWrapper').html(crowdfunding.parameters.amount.input())
									crowdfunding.parameters.currencyAmount.el.closest('.inputWrapper').html(crowdfunding.parameters.currencyAmount.input())

									ParametersLive([crowdfunding.parameters.amount, crowdfunding.parameters.currencyAmount], _p.el)

								}

								_p.el.find('.listcountWrapper').on('click', function(){
									actions.showCrInStep('showListcount', 2, "List of deals")
								})

								
								_p.el.find('.newdeal').on('click', function(){


									if(crowdfunding.parameters.amount.value > 0){
										actions.showCrInStep('newdeal', 2, "Deal")

										_p.el.find('.required').addClass('hidden')
									}
									else
									{
										_p.el.find('.required').removeClass('hidden')
									}

									
								})

								if (clbk)
									clbk(_p.el)

							})

						}, craddress, true, true)

					})
					
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
			//// HTLS

			embeddingcode : function(id){
				var p = {};

				p.comments = 'no'
				p.footer = 'no'

				p = hexEncode(JSON.stringify(p))

				var seed = rand(10000, 99999)

				return '<div id="pocketnet_'+seed+'"></div><script src="https://'+self.app.options.url+'/js/widgets.js"></script><script type="text/javascript">(new window.PNWIDGETS()).make('+seed+', "lenta", "'+id+'", "'+p+'")</script>'
			

				
			},

			htlsFees : function(el, fees, clbk){

				console.log('el, fees', el, fees)

				if(!actions.validHtls()){
					return;
				}

				var f = (fees.feerate || 0.000001)

				console.log('htlsFees', f)

				actions.prepareTransactionHlts(f, 0, function(addresses, outputs, inputs, totalFees, feesMode, meta){

					console.log('prepareTransactionHlts', totalFees)

					self.shell({

						name :  'htlsFees',
						el :   el,
						data : {
							fees : totalFees,
							d : htls,
							meta : meta
						},

					}, function(_p){

						ParametersLive([htls.parameters.fees], _p.el)

						htls.parameters.fees._onChange = function(v){
							self.app.settings.set(self.map.uri, 'feesModehtls', v)
						}

						var sendpreloader = function(r){
							if (r){
								_p.el.find('.sendtransaction').addClass('loading')
							}
							else{
								_p.el.find('.sendtransaction').removeClass('loading')
							}
							
						}

						_p.el.find('.sendtransaction').on('click', function(){

							if($(this).hasClass('loading')) return

							sendpreloader(true)

							actions.prepareTransactionHlts(f, totalFees, function(addresses, outputs, inputs, totalFees, feesMode, meta, tx){

								console.log("TX", tx)

								_.each(inputs, function(t){
									t.cantspend = true
							    })

							   self.app.platform.sdk.node.transactions.send(tx, function(d, err){

								   console.log("err", err)

								   if(err){
									   self.app.platform.sdk.node.transactions.releaseCS(inputs)
									   sendpreloader(false)
									   self.app.platform.errorHandler(err, true)
								   }

								   else
								   {
									   var ids = _.map(inputs, function(i){
										   return i.txid
									   })

									   self.app.platform.sdk.node.transactions.clearUnspents(ids)

									   mode = 0;

									   renders.mainWithClear()

									   self.app.platform.sdk.wallet.saveTempInfoWallet(d, inputs, outputs)
									   sendpreloader(false)
									   sitemessage(self.app.localization.e('wssuccessfully'))
									   
								   }
							    })

								

							})

						})


						

					})

				})

			},
			htls : function(clbk, _el){

				console.log("el.htls", el.htls)

				actions.htlsParameters();

				self.shell({

					name :  'htls',
					el :   _el ||  el.htls,
					data : {
						d : htls,
						ed : essenseData
					},

				}, function(_p){

					ParametersLive(_.toArray(htls.parameters), _p.el)

					htls.parameters.amount._onChange = function(v){
						
						var addresses = actions.sendAddresses();


						self.app.platform.sdk.node.transactions.get.balance(function(amount){

							if (htls.parameters.amount.value < 0) htls.parameters.amount.value = 0;

							if (htls.parameters.amount.value > amount) 
								htls.parameters.amount.value = amount


							htls.parameters.amount.el.closest('.inputWrapper').html(htls.parameters.amount.input())

							ParametersLive([htls.parameters.amount], _p.el)

							console.log("MODE", mode)

							if (mode == 1){
								actions.showHtlsInStep('calculateFeeHtls', 1, 'htls')
							}
							
						}, addresses, null, true)

					}
				
					_p.el.find('.calculateFee').on('click', function(){

						if (actions.validHtls()){
							actions.showHtlsInStep('calculateFeeHtls', 1, 'htls')

							_p.el.find('.required').addClass('hidden')
						}
						else
						{
							_p.el.find('.required').removeClass('hidden')
						}

						
					})
					
					if (essenseData.htls){
						_p.el.find('.htlsWrapper').html(renders.embeddingcode(essenseData.htls))
					}

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

							var sendpreloader = function(r){
								if (r){
									_p.el.find('.sendtransaction').addClass('loading')
								}
								else{
									_p.el.find('.sendtransaction').removeClass('loading')
								}
								
							}

							_p.el.find('.sendtransaction').on('click', function(){

								if($(this).hasClass('loading')) return

								sendpreloader(true)

								actions.prepareTransaction(f, function(addresses, outputs, totalFees, feesMode){

									self.app.platform.sdk.wallet.txbase(addresses, _.clone(outputs), totalFees, feesMode, function(err, inputs, _outputs){

										if(err){
											sendpreloader(false)
											sitemessage(err.text || err)

											return
										}

										var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs)

										_.each(inputs, function(t){
							 				t.cantspend = true
							 			})

										self.app.platform.sdk.node.transactions.send(tx, function(d, err){

											console.log("err", err)

											if(err){

												self.app.platform.sdk.node.transactions.releaseCS(inputs)
												sendpreloader(false)
												sitemessage(err.text || err)
											}

											else
											{
												var ids = _.map(inputs, function(i){
													return i.txid
												})

												self.app.platform.sdk.node.transactions.clearUnspents(ids)

												mode = 0;

												renders.mainWithClear()

												self.app.platform.sdk.wallet.saveTempInfoWallet(d, inputs, _outputs)
												sendpreloader(false)
												sitemessage(self.app.localization.e('wssuccessfully'))


												self.app.platform.matrixchat.transaction(d, essenseData.roomid)

												if(essenseData.sendclbk) essenseData.sendclbk({
													txid : d
												})
												
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
							d : send,
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
							_p.el.find('.copyaddress').on('click', function(){
								copyText($(this))

								sitemessage(self.app.localization.e('successcopied'))
							})
							

							if (clbk)
								clbk()

						})

					}, a)

				}, a)

				
			},

			updateTotal : function(item, clbk){

				renders.datasets(item, charts[item.id].data.datasets)

				charts[item.id].update();

				if (el.total)
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

				if($('html').hasClass('stblack')) n = '#112035'

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

			if(isMobile()){

				var cc = el.c.find('.circularprogress');
				var maxheight = 220;

				var progress = new CircularProgress({
					radius: 30,
					strokeStyle: '#00A3F7',
					lineCap: 'round',
					lineWidth: 1,
					font: "100 14px 'Segoe UI',SegoeUI,'Helvetica Neue',Helvetica,Arial,sans-serif",
					fillStyle : "#00A3F7",
					text : {						
						value : ""
					},
					initial: {
						strokeStyle: '#fff',
						lineWidth: 1
					}
				});

				progress.update(70);

				el.c.find('.circularprogressWrapper').html(progress.el);

				var trueshold = 80

				var w = $(window)

				if(!essenseData.api){
					var parallax = new SwipeParallaxNew({

						el : el.c.find('.ntf'),
	
						allowPageScroll : 'vertical',
		
						directions : {
							down : {
								cancellable : true,						
	
								positionclbk : function(px){
									var percent = Math.abs(px) / trueshold;
	
	
									console.log("PX", px)
	
									if (px >= 0){
	
										progress.options.text = {
											value: ''
										};
										cc.fadeIn(1)
										progress.update(percent * 100);
	
	
										cc.height((maxheight * percent)+ 'px')								
	
										//tp.css('opacity', 1 -  (4 * percent))
	
									}
									else{
										progress.renew()
										cc.fadeOut(1)
									}
	
								},
	
								constraints : function(){
									if(w.scrollTop() <= 0){
										return true;
									}
								},
	
								restrict : true,
								trueshold : trueshold,
								clbk : function(){
	
									progress.update(0);
									cc.fadeOut(1)
									self.app.platform.sdk.notifications.getNotifications()
	
									self.app.platform.sdk.node.transactions.get.allBalanceUpdate(function(){
										make()
									})
	
								}
		
							}
						}
						
		
					}).init()
				}

				
			}
		}

		var prepareOptions = function(){

			deposit.parameters.deposit.value = self.app.settings.get(self.map.uri, 'deposit') || deposit.parameters.deposit.defaultValue

			send.parameters.source.value = self.app.settings.get(self.map.uri, 'source') || send.parameters.source.defaultValue

			send.parameters.reciever.value = ''

			send.parameters.fees.value = self.app.settings.get(self.map.uri, 'feesMode') || send.parameters.fees.defaultValue

			htls.parameters.fees.value = self.app.settings.get(self.map.uri, 'feesModehtls') || htls.parameters.fees.defaultValue

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

								if(group.id == 'pnetwallet' || group.id == 'total'){

									
									total = temp + total;

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

							if(group.id == 'pnetwallet'|| group.id == 'total'){
								
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

		var makesimple = function(clbk){

			var actions = [renders.send, renders.deposit, renders.addresses]

			console.log("essenseData", essenseData)

			if(essenseData.api && essenseData.action) actions = [renders[essenseData.action]]

			el.c.addClass('loading')

			console.log('actions', actions)

			lazyActions(actions, function(){

				
				
				clbk()
			})
		}

		var make = function(clbk){

			el.total.html('')

			drawCircles(function(){

				/*renders.crowdfunding,*/ 

				var actions = [renders.send, renders.deposit, renders.addresses/*, renders.htls*/]

				lazyActions(actions, clbk)

				self.app.platform.sdk.node.transactions.clbks.circles = function(){
					drawCircles(null, true)
				};


				self.app.platform.sdk.node.transactions.clbks.walletaddresses = function(){
					renders.addresses()
				}

			})

			self.app.platform.sdk.node.transactions.get.allBalance(null, true)

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				var data = {};

					data.p2pkh = self.app.platform.sdk.address.pnet()

				 essenseData = p.settings.essenseData || {}


				prepareOptions()

				clbk(data);

			},

			destroy : function(){

				delete self.app.platform.sdk.node.transactions.clbks.circles
				delete self.app.platform.sdk.node.transactions.clbks.walletaddresses 

				delete self.iclbks.main

				el = {};
			},
			
			init : function(p){

				var _p = _.extend(parameters(), essenseData)

				charts = {};


				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.step = el.c.find('.actionstep');
				el.main = el.c.find('.mainstep')

				initEvents();

				if(essenseData.class) el.c.addClass(essenseData.class)

				var executor = make

				if(_p.api) executor = makesimple

				renders.main(function(){
					executor(function(){


						console.log('_p', _p)
						

						if (_p.action){

							if(_p.action == 'send'){

								send.parameters.amount.value = Number((_p.amount || '0').replace(/,/g,''))
								send.parameters.reciever.value = _p.address || ""
								send.parameters.message.value = _p.message || ""

								send.parameters.amount._onChange();

								actions.showSendInStep('calculateFee', 1, self.app.localization.e('wscalculatefees'), function(){
									el.c.removeClass('loading')
								})


							}

							if(_p.action == 'htls'){

								console.log('actions.showSendInStep')

								actions.showHtlsInStep('calculateFeeHtls', 1, 'HTLS', function(){
									el.c.removeClass('loading')
								})


							}

							if(_p.action == 'recieve'){

								actions.showDepositInStep('showDeposit', 1, self.app.localization.e('wdoptions'))


							}

						}


						p.clbk(null, p);

					});
					
				})
				

				
			},

			wnd : {
				class : 'withoutButtons walletwindow'
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