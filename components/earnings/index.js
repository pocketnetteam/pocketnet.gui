var earnings = (function () {

	var self = new nModule();

	var essenses = {};


	var Essense = function (p) {

		var primary = deep(p, 'history');

		var el;

		var selectedPeriod = {
			from: {},
			to: {}
		}

		var monetizationParameters = {
			currentYear : new Date().getFullYear(),
			years : [2023, new Date().getFullYear()],
			exchanges : ['PMZ3DiGWKGybLb5oCz9ojwxuTBA6GcYAKq', 'PLpzAiA6H8isp33WeVx2UEuXLfc3SyqkzK', 'PEL45oK7ppFhB69G6GSsMLxHatNu5FJc5P']
		}

		var address = ''

		var stats = []
		var monetizationOpportunity = false

		var actions = {
			getEarnings : function(){
				return self.app.monetization.getEarnings(address, monetizationParameters.currentYear)
			},
			

		}

		var renders = {

			posts: function (posts, els, show, clbk, current) {

				if(show){

					var txids = _.map(posts, (p) => {
						return p.rootTxHash
					})

					renders.monetizationLoading(els, true)

					self.app.platform.sdk.node.shares.getbyid(txids, function(shares){

						var postTable = _.map(posts, (p) => {
							return {
								...p,
								share : _.find(shares, (share) => {
									return share.txid == p.rootTxHash
								})
							}
						})

						renders.monetizationLoading(els, false)

						self.shell({

							name: 'posts',
							el: els,
							inner: html,
							data: {
								tpl : self.app.platform.ws.tempates.share,
								postTable,
								current

							},
		
						}, function (_p) {
		
							_p.el.find('.postTable .notification').on('click', function() {
								var txid = $(this).attr('share')

								self.app.nav.api.load({
									open : true,
									href : 'post?s=' + txid,
									history : true,
									inWnd: true,
								})


							})	
						})

					})


					

				}
				else{
					els.html('')
				}

				

			},

			total: function (item, clbk) {

				self.shell({

					name: 'total',
					el: el.content,
					inner: append,
					data: {
						item: item
					},

				}, function (_p) {


				})

			},

			monetizationLoading(_el, r){

				if(r)
					_el.html('<div class="preloader5"><img src="./img/three-dots.svg"/></div>')
				else _el.html('')
			},

			error(_el){
				_el.html('<div class="error">'+ self.app.localization.e('e13230') +'</div>')
			},

			monetizationEarnings(data, _el, clbk){

				var hascurrent = _.find(data.months, (r) => {
					return r.current
				})

				self.shell({

					name: 'monetizationearnings',
					el: _el,
					data: {
						earnings : data,
						monetization : monetizationParameters,
						hascurrent
					},

				}, function (_p) {

					_p.el.find('.canexpand').on('click', function(){
						var type = $(this).attr('type')

						if(type == 'month'){
							$(this).closest('.month').toggleClass('expanded')
						}
						else{
							var weekel = $(this).closest('.week')
							var exp = !weekel.hasClass('expanded')

							var i = weekel.attr('index')
							var m = weekel.attr('month')

							var w = data.months[m].weeks[i]

							weekel.toggleClass('expanded')


							renders.posts(w.posts, weekel.find('.postsTable'), exp, null, w.current)
						}
					})

					
					if(clbk) clbk()

				})
			},

			exchanges(el, clbk){

				_.each(monetizationParameters.exchanges, (address) => {

					var cel = el.find('.exchange[address="'+address+'"]')

					self.nav.api.load({
						open : true,
						id : 'channel',
						el : cel,
						eid : 'earnings_' + address,
						essenseData : {
							id : address,
							customaction : {
								label : 'monetization_buychat',
								action : function(profile){

									self.app.platform.matrixchat.startchat(profile.address)
								}
							}
						},

						clbk : function(){
							cel.addClass('loaded')
						}
					})
				})
			},

			monetizationWrapper(clbk){

				if(!monetizationOpportunity){
					if(clbk) clbk()

					return
				}

				self.app.platform.sdk.users.checkMonetization(address).then((monetization) => {

					self.shell({

						name: 'monetizationwrapper',
						el: el.c.find('.monetizationOpportunity'),
						data: {
							monetization,
							monetizationParameters : monetizationParameters
						},
	
					}, function (_p) {

						renders.exchanges(_p.el.find('.exchangesProfiles'))

						_p.el.find('.yearleft').on('click', function(){
							monetizationParameters.currentYear-- 

							renders.monetizationWrapper()
						})

						_p.el.find('.yearright').on('click', function(){
							monetizationParameters.currentYear++ 

							renders.monetizationWrapper()
						})

						_p.el.find('.monetizationEnable').on('click', function(){

							globalpreloader(true)

							self.app.platform.sdk.users.setMonetization(true, (err, alias) => {
								renders.monetizationWrapper(() => {
									globalpreloader(false)
								})
							})

						})

						_p.el.find('.disableMonetization').on('click', function(){

							new dialog({
								html:  self.app.localization.e('monetization_disable_question'),
								btn1text: self.app.localization.e('dyes'),
								btn2text: self.app.localization.e('dno'),
					
								success: function () {
									globalpreloader(true)

									

									self.app.platform.sdk.users.setMonetization(false, (err, alias) => {

										if(!err){
											new dialog({
												html:  self.app.localization.e('monetization_disable_time'),
												btn1text: self.app.localization.e('ok'),
												btn2text: self.app.localization.e('dno'),
									
												success: function () {
													
												},
									
												fail: function () {
							
												},
								
												class : 'zindex one'
											})
										}

										

										renders.monetizationWrapper(() => {
											globalpreloader(false)
										})
									})
								},
					
								fail: function () {
			
								},
				
								class : 'zindex'
							})

						})


						if (monetization){

							var elm = _p.el.find('.monetizationEarnings')

							renders.monetizationLoading(elm, true)

							var fixyear = monetizationParameters.currentYear
							
							actions.getEarnings().then((data) => {

								if(monetizationParameters.currentYear != fixyear) return

								renders.monetizationLoading(elm, false)
								renders.monetizationEarnings(data, elm)

							}).catch(e => {
								renders.monetizationLoading(elm, false)
								renders.error(elm)
							})
						}

						if(clbk) clbk(monetization)
	
					})

				}).catch(e => {
					if(clbk) clbk()
				})

				
			}
		}

		var state = {
			save: function () {

			},
			load: function () {

			}
		}

		var initEvents = function () {

			// renders.earnings();

		}

		var make = function(){
			
			renders.monetizationWrapper(() => {
				//actions.getStat()
			})

		}

		return {
			primary: primary,

			getdata: async function (clbk) {

					address	= self.app.user.address.value //parameters().address || self.app.user.address.value

					self.sdk.users.get(address, function(){


						monetizationOpportunity = self.app.platform.sdk.users.checkMonetizationOpportunity(address) 
						
						var data = {
							period: selectedPeriod,
							monetizationOpportunity,
							my : address == self.app.user.address.value
						};

						clbk(data);

					})

			},

			destroy: function () {
				prevPeriod = null
				el = {};
			},

			init: async function (p) {

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				stats = [{
					balance: 0,
					id: "amountDonation",
					label: self.app.localization.e('amountDonation'),
				},
				{
					balance: 0,
					id: "amountLottery",
					label: self.app.localization.e('amountLottery'),
				},
				{
					balance: 0,
					id: "amountTransfer",
					label: self.app.localization.e('amountTransfer'),
				}]

				el.content = el.c.find('.earnings .content');

				initEvents();

				make()

				

				p.clbk(null, p);
			},
			wnd : {
				showbetter : true,
			
				class: 'transactionlistwnd normalizedmobile withoutButtons',
				
			}
		}
	};


	self.run = function (p) {

		var essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);

	};

	self.stop = function () {

		_.each(essenses, function (essense) {

			window.rifticker.add(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if (typeof module != "undefined") {
	module.exports = earnings;
} else {

	app.modules.earnings = {};
	app.modules.earnings.module = earnings;

}