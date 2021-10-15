var donations = (function(){

	var self = new nModule();

	var essenses = {};

	

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

		var ways = [{
			id : 'btc',
			name : "Bitcoin",

			action : function(s){
				actions.ways.ltcbtc(s)
			},

			qrname : 'bitcoin'
		},{
			id : 'ltc',
			name : "Litecoin",

			qrname : 'litecoin',

			action : function(s){
				actions.ways.ltcbtc(s)
			}
		}/*,{
			id : 'xmr',
			name : "Monero",

			qrname : 'monero',

			action : function(s){
				actions.ways.xmr(s)
			}
		}*//*,{
			id : 'paypal',
			name : "Paypal",

			action : function(s){
				actions.ways.paypal(s)
			}
		}*/];

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

				renders.address(currency, address, curobj, info, function(el){

					autoupdate = setInterval(function(){

						actions.checkFunds(currency, address, function(ninfo){

							if(ninfo.Status != 'AWAITINGFUNDS' && ninfo.Status != "AWAITINGDONATION"){

								clearInterval(autoupdate)
								autoupdate = null

							}

							if(ninfo.Status == 'AWAITINGFUNDS' || ninfo.Status == 'AWAITINGDONATION' || ninfo.Status == 'EXPIREDAWAITINGFUNDS'){
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
				ltcbtc : function(curobj){

					var cur = curobj.id

					if(storage[cur]){

						actions.status(cur, storage[cur], function(err, info){
							if(info.Status == "AWAITINGFUNDS" || info.Status == "AWAITINGDONATION"){
								actions.waitfunds(cur, storage[cur], info, curobj)
							}

							else
							
							if(info.Status == "EXPIREDAWAITINGFUNDS"){


								actions.address(cur, function(address, info){
									actions.waitfunds(cur, address, info, curobj)
								})


							}

							else
							{
								delete storage[cur]

								state.save();

								renders.thankyou(curobj, true, info);
							}

						})
					}
					else
					{
						actions.address(cur, function(address, info){
							actions.waitfunds(cur, address, info, curobj)
						})
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


			status : function(currency, address, clbk){
				self.app.platform.sdk.exchanges.status(currency, address, clbk)
			},

			address : function(cur, clbk){

				self.app.ajax.run({
					data : {
						Action : 'GETADDRESSFORDONATION',
						Currency : cur.toUpperCase()
					},
					success : function(d){

						var address = deep(d, 'Address.Address')

						if (address){
							if (clbk)
								clbk(address, d.Address)
						}
						else
						{
							sitemessage(self.app.localization.e('e13094'))
						}
						
					},

					fail : function(){
						sitemessage(self.app.localization.e('e13094'))
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

									dialog({
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
	module.exports = donations;
}
else{

	app.modules.donations = {};
	app.modules.donations.module = donations;

}