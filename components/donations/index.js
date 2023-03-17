var donations = (function(){

	var self = new nModule();

	var essenses = {};

	var supportOptions, ways;

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var donated = [
			'PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5', 
			'PTziv8ym7eJRUfyfAFBejJgEYemTdUgFzH', 
			'PBE1MLbsFoY3o1YW6t3Goi6spS1y9GY1vj', 
			'PRV1eoYkhA5PGkASm2tyD12xwdQnigbpkp', 
			'PRCeHituQ5WN2EXRZz4t9qTYyCBqTc4g4M', 
			'P9V67HjuApdEhj4DZxNnibxEqSnmCPbxvB',
			'PA57U1QmmowNzSaz6ThG2EPs34QCsLyksL',
			'PL7RNWypccYBPsDAygW3H4aKfzGBwMeWyt',
			'PDUGAwFmRRSnSVTtcAuyVrTLAREm6HN2BC',
			'PPvPW1sUAA1KPxcwbVKVk2EEp3uWkAKn2U',
			'PWkUgSod6FEyVq8Ve1dWChWMC8HcXJcLro'
		]

		var thankparameters = {

			amount : new Parameter({
				name : self.app.localization.e('wsamount'),
				id : 'amount',
				type : "NUMBER",
				placeholder : self.app.localization.e('wsamountof'),

				format : {
					Precision : 6
				}
			}),
		}


		supportOptions = {
			subject : new Parameter({
				name : self.app.localization.e('subject'),
				placeholder : self.app.localization.e('subject'),
				id : 'subject',
				type : "STRINGANY",
				onType : true,
				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),
			email : new Parameter({
				name : 'Email',
				placeholder : 'Email',
				id : 'email',
				type : "STRINGANY",
				onType : true,
				onFocus : function(pn){
					if (self.app.mobileview) setTimeout(function(){_scrollTo(pn, el.c.closest('.customscroll')), 200})
				}
			}),
			message : new Parameter({
				name : self.app.localization.e('message'),
				id : 'message',
				type : "TEXT",
				onType : true,
				
				placeholder : self.app.localization.e('message')
			}),

		}

		ways = [
			{
				"id": "BTC",
				"name": "Bitcoin (BTC)",
				"qrname": "BTC",
				"action": function(s){actions.ways.openAddress(s)}
			},
			{
				"id": "ETH",
				"name": "Ethereum (ETH)",
				"qrname": "ETH",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "USDT",
				"name": "Tether (USDT) ERC-20",
				"qrname": "USDT",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "BNB",
				"name": "Binance Coin (BNB) ERC-20",
				"qrname": "BNB",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "DOGE",
				"name": "Dogecoin (DOGE)",
				"qrname": "DOGE",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "XRP",
				"name": "XPR (XRP)",
				"qrname": "XRP",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "UNI",
				"name": "Uniswap (UNI) ERC-20",
				"qrname": "UNI",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "BCH",
				"name": "Bitcoin Cash (BCH)",
				"qrname": "BCH",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "LTC",
				"name": "Litecoin (LTC)",
				"qrname": "LTC",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "XLM",
				"name": "Stellar (XLM)",
				"qrname": "XLM",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "TRX",
				"name": "TRON (TRX)",
				"qrname": "TRX",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "DAI",
				"name": "DAI (DAI) ERC-20",
				"qrname": "DAI",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "NEO",
				"name": "NEO (NEO)",
				"qrname": "NEO",
				"action": function(s){actions.ways.openAddress(s)}
			},
			{
				"id": "BSV",
				"name": "Bitcoin SV (BSV)",
				"qrname": "BSV",
				"action": function(s){actions.ways.openAddress(s)}
			},
			{
				"id": "DASH",
				"name": "Dash (DASH)",
				"qrname": "DASH",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "ZEC",
				"name": "Zcash (ZEC)",
				"qrname": "ZEC",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "BAT",
				"name": "Basic Attention Token (BAT) ERC-20",
				"qrname": "BAT",
				"action": function(s){actions.ways.openAddress(s)}

			},
			{
				"id": "XEM",
				"name": "New Economy Movement (XEM)",
				"qrname": "XEM",
				"action": function(s){actions.ways.openAddress(s)}
			},
			{
				"id": "XMR",
				"name": "Monero (XMR)",
				"qrname": "XMR",
				"action": function(s){actions.ways.openAddressStatic(s, "48sfLqSiTZhhbfiUELdfTefrAZ2EDjaKSMnWvPiMc4kWMwCUbPFRJwxMPJVL72MGVqC1jzMbUeGXhRGS3abcnoYbUcKKPDD")}
			},
			{
				"id": "other",
				"name": self.app.localization.e('anotherSupport'),
				"qrname": "XEM",
				"action": function(s){}
			}
		];

		var storage = {}

		var autoupdate = null;

		var actions = {
			checkFunds : function(currency, address, clbk){

				actions.status(currency, address, function(err, info){

					if (clbk)
						clbk(info)

				})

			},
			waitfunds : function(currency, address, info, curobj){

				storage[currency] = address;

				state.save()

				globalpreloader(false);

				renders.address(currency, address, curobj, info, function(el){

					autoupdate = setInterval(function(){

						actions.checkFunds(currency, address, function(ninfo){

							if(ninfo.status != 'AWAITINGFUNDS' && ninfo.status != "AWAITINGDONATION"){

								clearInterval(autoupdate)
								autoupdate = null

							}

							if(ninfo.status == 'AWAITINGFUNDS' || ninfo.status == 'AWAITINGDONATION' || ninfo.status == 'EXPIREDAWAITINGFUNDS'){
								renders.address(currency, address, curobj, ninfo)
							}
							else
							{
								renders.thankyou(curobj, false, info);
							}
							

						})

					}, 60000)

				})
			},	
			ways : {
				openAddressStatic : function(curobj, address){
					renders.addressStatic(curobj.id, address, curobj);
				},

				openAddress : function(curobj){
					
					var createNewAddress = function(cur){


						actions.address(cur, function(address, err){
							
							if (err){

								globalpreloader(false);

							} else {

								actions.status(cur, address, function(err, info){
						
									actions.waitfunds(cur, address, info, curobj);
								})
							}


						})
					}

					var cur = curobj.id;

					globalpreloader(10)


					if(storage[cur]){

						actions.status(cur, storage[cur], function(err, info){

							if (info){

								if(info.status == "AWAITINGFUNDS" || info.status == "AWAITINGDONATION"){
									actions.waitfunds(cur, storage[cur], info, curobj)
								}

								else
								
								if(info.status == "EXPIREDAWAITINGFUNDS"){

									createNewAddress(cur);

								}

								else
								{
									globalpreloader(false)

									delete storage[cur]

									state.save();

									renders.thankyou(curobj, true, info);
								}

							} else {
								
								createNewAddress(cur);
							}

						})
					}
					else
					{
						createNewAddress(cur);
					}

					
				},

				xmr : function(curobj){
					renders.xmraddress(curobj, function(el){

					})
				},

				paypal : function(curobj){

					window.open('https://www.paypal.me/pocketnet', '_blank').focus();

					renders.thankyou(curobj);

				}
			},

			donate : function(){
				actions.hidepage(function(){
					renders.ways()
				}) 
			},

			hidepage : function(clbk){
				el.c.find('.hideprocess').fadeOut(200, clbk);
			},

			showpage : function(clbk){
				el.c.find('.hideprocess').fadeIn(200, clbk);
			},

			support : function(payload, clbk){
				self.app.platform.sdk.exchanges.support(payload, clbk)
			},


			status : function(currency, address, clbk){
				self.app.platform.sdk.exchanges.status(currency, address, clbk)
			},

			address : function(cur, clbk){

				self.app.platform.sdk.exchanges.address(cur, function(address, err){
					
					if (address){
						if (clbk)
							clbk(address)
					}
					else
					{	console.log('err address', err)
						sitemessage(err || self.app.localization.e('e13094'));
						clbk(null, err)
					}
				})

			}
			
		}

		var events = {
			donate : function(){
				actions.donate()
			}
		}

		var renders = {
			support: function(){
				self.shell({
					name :  'support',
					inner : html,
					el : el.supportForm,
					data : {
						supportOptions : supportOptions
					},

				}, function(p){

					ParametersLive(supportOptions, p.el)

					p.el.find('.send').on('click', function(){

						var subject = supportOptions.subject.value;
						var email = supportOptions.email.value;
						var message = supportOptions.message.value;

						if (!(subject && email && message)){
							sitemessage(self.app.localization.e('e13057'))
							return;
						}

						actions.support({
							paddress: self.app.user.address.value,
							subject: subject,
							email: email,
							text: message
						}, function(result, err){
							
							if (err){
								sitemessage(err);
								return;
							}

							supportOptions.subject.value = '';
							supportOptions.email.value = '';
							supportOptions.message.value = '';

							renders.support();

							sitemessage(self.app.localization.e('supportTicketSuccess'))

							successCheck();

						})
					})
					

				})
			},
			thankyou : function(curobj, second, info){
				self.app.actions.scroll(0)
				
				thankparameters.amount.value = deep(info, 'Amount') || 0

				self.shell({
					name :  'thankyou',
					inner : html,
					el : el.process.find('.step'),
					data : {
						second : second,
						curobj : curobj,
						info : info,
						parameters : thankparameters
					},

				}, function(p){

					ParametersLive(_.toArray(thankparameters), p.el)

					p.el.find('.send').on('click', function(){
						if(thankparameters.amount.value > 0){

							$.ajax({
								type: 'POST',
								url: 'https://pocketnet.app/Shop/AJAXMain.aspx',
								data: {
									Action : 'ADDTOMAILLIST',
									Lang : self.app.localization.key || 'en',
									TemplateID : 100,
									Email : self.app.platform.sdk.address.pnet().address,
									Name : (curobj.name || 'NAN0') + ", " + (thankparameters.amount.value || 0)
								},
								dataType: 'json',
								success : function(){

									p.el.html('')

									setTimeout(function(){
										actions.showpage()
									}, 100)

									new dialog({
										html : self.app.localization.e('e13095'),
										class : 'one'
									})

								},
								error : function(){

									p.el.html('')

									setTimeout(function(){
										actions.showpage()
									}, 100)
			
								},
							});

							

						}
						else
						{
							sitemessage(self.app.localization.e('e13096'))
						}
					})

					p.el.find('.back').on('click', function(){

						if(second){
							p.el.html('')

							setTimeout(function(){

								curobj.action(curobj)

							}, 100)
						}
						else
						{
							p.el.html('')

							setTimeout(function(){
								actions.showpage()
							}, 100)
						}
						
						
					})

				})
			},
			xmraddress : function(curobj, clbk){

				self.app.actions.scroll(0)


				self.shell({
					name :  'xmraddress',
					inner : html,
					el : el.process.find('.step'),
					data : {
						curobj : curobj
					},

				}, function(p){

					p.el.find('.back').on('click', function(){
						p.el.html('')

						setTimeout(function(){
							renders.ways()
						}, 100)
						
					})

					p.el.find('.next').on('click', function(){

						renders.thankyou(curobj, true);
						
					})

					p.el.on('click', '.copyaddress', function(){

						copyText(p.el.find('.aw'))

						sitemessage(self.app.localization.e('waddresswascop'))

					})

					if (clbk)
						clbk(p.el)
				})
			},
			addressStatic : function(currency, address, curobj, info, clbk){
				self.shell({
					name :  'addressStatic',
					inner : html,
					el : el.process.find('.step'),
					data : {
						curobj : curobj,
						address : address,
						currency : currency,
						info : info
					},

				}, function(p){

					p.el.find('.back').on('click', function(){
						p.el.html('')

						setTimeout(function(){
							renders.ways()
						}, 100)

						if(autoupdate){

							clearInterval(autoupdate)

							autoupdate = null
						}
						
					})

					p.el.on('click', '.copyaddress', function(){

						copyText(p.el.find('.aw'))

						sitemessage(self.app.localization.e('waddresswascop'))

					})

					if (clbk)
						clbk(p.el)
				})
			},	
			address : function(currency, address, curobj, info, clbk){
				self.shell({
					name :  'address',
					inner : html,
					el : el.process.find('.step'),
					data : {
						curobj : curobj,
						address : address,
						currency : currency,
						info : info
					},

				}, function(p){

					p.el.find('.back').on('click', function(){
						p.el.html('')

						setTimeout(function(){
							renders.ways()
						}, 100)

						if(autoupdate){

							clearInterval(autoupdate)

							autoupdate = null
						}
						
					})

					p.el.on('click', '.copyaddress', function(){

						copyText(p.el.find('.aw'))

						sitemessage(self.app.localization.e('waddresswascop'))

					})

					p.el.find('.reactivate').on('click', function(){
						self.app.platform.sdk.exchanges.reactivate({
							address : address,
							currency : currency

						}, function(err, _info){

							if(err){
								sitemessage(self.app.localization.e('e13097'))
							}
							else
							{

								actions.waitfunds(currency, address, info, curobj)
							}
						})
					})

					p.el.find('.next').on('click', function(){

						renders.thankyou(curobj, true);

						if(autoupdate){

							clearInterval(autoupdate)

							autoupdate = null
						}
						
					})

					if (clbk)
						clbk(p.el)
				})
			},	
			ways : function(clbk){

				self.app.actions.scroll(0)

				self.shell({
					name :  'ways',
					inner : html,
					el : el.process.find('.step'),
					data : {
						ways : ways
					},

				}, function(p){

					p.el.find('.back').on('click', function(){
						p.el.html('')

						setTimeout(function(){
							actions.showpage()
						}, 100)
						
					})

					p.el.find('.way').on('click', function(){
						var id = $(this).attr('way');

						var curobj = _.find(ways, function(w){
							return w.id == id
						})

						console.log('curobj', curobj)
						if (curobj.id === 'other'){
							$(this).toggleClass('active');
					
							el.supportForm = p.el.find('.supportForm');
							renders.support();						

							return;
						}

						if (curobj){
							curobj.action(curobj)
						}

						
					})

					if (clbk)
						clbk()
				})
			}
		}

		var state = {
			save : function(){
				self.app.settings.set(self.map.uri, 'storage', JSON.stringify(storage))
			},
			load : function(){

				storage = JSON.parse(self.app.settings.get(self.map.uri, 'storage') || "{}")

			}
		}

		var initEvents = function(){
			
			el.donate.on('click', events.donate)
		}

		return {
			primary : primary,

			getdata : function(clbk){

				state.load()

				self.sdk.users.get(donated, function(){

					var data = {
						donated : donated
					};

					clbk(data);

				}, true)

				

			},

			destroy : function(){
				if(autoupdate){
					clearInterval(autoupdate)
					autoupdate = null
				}
				

				el = {};
			},
			
			init : function(p){

				el = {};
				el.c = p.el.find('#' + self.map.id);

				
				el.process = el.c.find('.process')
				el.donate = el.c.find('.donate')


				initEvents();

				p.clbk(null, p);
			},

			
			wnd : {
				class : 'normalizedmobile'
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
	module.exports = donations;
}
else{

	app.modules.donations = {};
	app.modules.donations.module = donations;

}