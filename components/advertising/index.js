var advertising = (function () {

	var self = new nModule();

	var essenses = {};


	var Essense = function (p) {

		var primary = deep(p, 'history');

		var el;


		var advertisingParameters = {
			currentYear : new Date().getFullYear(),
			years : [2022, new Date().getFullYear()],
			exchanges : ['PMZ3DiGWKGybLb5oCz9ojwxuTBA6GcYAKq', 'PLpzAiA6H8isp33WeVx2UEuXLfc3SyqkzK'],
			groupBy : 'shares',
			groupByOptions : ['shares', 'months']
		}

		var address = ''

		var actions = {
			getEarnings : function(group){
				return self.app.monetization.getBoosts(address, advertisingParameters.currentYear, group).then((r) => {
					return r
				})
			}
		}

		var renders = {

			posts: function (posts, els, show, clbk) {

				if(show){

					var txids = _.map(posts, (p) => {
						return p.contentRootTxHash
					})

					renders.advertisingLoading(els, true)

					self.app.platform.sdk.node.shares.getbyid(txids, function(shares){

						var postTable = _.map(posts, (p) => {
							return {
								...p,
								share : _.find(shares, (share) => {
									return share.txid == p.contentRootTxHash
								})
							}
						})

						renders.advertisingLoading(els, false)

						self.shell({

							name: 'posts',
							el: els,
							inner: html,
							data: {
								tpl : self.app.platform.ws.tempates.share,
								postTable

							},
							insertimmediately : true,
		
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

							var users = _.filter(_.map(postTable, (p) => {
								return p.share?.address
							}), (a) => {return a})


							self.app.platform.sdk.users.get(users, function () {

								_.each(users, (address) => {
									var _el = _p.el.find('.usericonWrapper[address="'+address+'"]')
									var ui = self.app.platform.psdk.userInfo.getShortForm(address)

									if(_el.length && ui){

									
										self.shell({

											name: 'usericon',
											el: _el,
											data: {
												sUserInfo : ui
											},
						
										}, function (_p) {
						
						
										})

									}

								})
								
								
		
							}, true)
						})

					})


					

				}
				else{
					els.html('')
				}

				

			},

			advertisingLoading(_el, r){

				if(r)
					_el.html('<div class="preloader5"><img src="./img/three-dots.svg"/></div>')
				else _el.html('')
			},

			error(_el){
				_el.html('<div class="error">'+ self.app.localization.e('e13230') +'</div>')
			},

			advertisingEarningsPosts(data, _el, clbk){

				self.shell({

					name: 'advertisingearningsposts',
					el: _el,
					data: {
						earnings : data
					},
					insertimmediately : true,

				}, function (_p) {

					renders.posts(data.posts, _el.find('.postsTable'), true)
					
					if(clbk) clbk()

				})


				if(clbk) clbk()
			},

			advertisingEarningsMonth(data, _el, clbk){

				self.shell({

					name: 'advertisingearningsmonth',
					el: _el,
					data: {
						earnings : data
					},
					insertimmediately : true,

				}, function (_p) {

					_p.el.find('.canexpand').on('click', function(){
						var type = $(this).attr('type')

						if(type == 'month'){
							var monthel = $(this).closest('.month')
							var exp = !monthel.hasClass('expanded')

							var m = monthel.attr('month')

							var w = data.months[m]

							monthel.toggleClass('expanded')

							console.log('w', w)

							renders.posts(w.posts, monthel.find('.postsTable'), exp)
						}
						else{
							
						}
					})

					
					if(clbk) clbk()

				})
			},

			exchanges(el, clbk){

				_.each(advertisingParameters.exchanges, (address) => {

					var cel = el.find('.exchange[address="'+address+'"]')

					self.nav.api.load({
						open : true,
						id : 'channel',
						el : cel,
						eid : 'advertising_' + address,
						essenseData : {
							id : address,
							customaction : {
								label : 'advertising_buychat',
								action : function(profile){
									console.log('profile', profile)

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

			panel : function(clbk){
				self.shell({

					name: 'panel',
					el: el.c.find('.advertisingPanel'),
					data: {
						advertisingParameters
					},
					insertimmediately : true,

				}, function (_p) {
					_p.el.find('.yearleft').on('click', function(){
						advertisingParameters.currentYear-- 
		
						make()
					})
		
					_p.el.find('.yearright').on('click', function(){
						advertisingParameters.currentYear++ 
		
						make()
					})

					_p.el.find('.groupping').on('click', function(){
						var items = []
		
						_.each(advertisingParameters.groupByOptions, function(a){

							items.push({
								text : self.app.localization.e('groupBy_' + a),
								action : function (clbk) {
		
									advertisingParameters.groupBy = a

									try{
										localStorage['advertising_groupBy'] = a
									}catch(e){

									}

									make()

									setTimeout(() => {
										clbk()

									},200)
		
								}
							})

						})
		
						menuDialog({
							items: items
						})
					})

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

		}

		var make = function(){

			el.c.addClass('making')

			renders.panel(() => {

				renders.exchanges(el.c.find('.exchangesProfiles'))


				var elm = el.c.find('.advertisingEarnings')

				renders.advertisingLoading(elm, true)

				var fixyear = advertisingParameters.currentYear
				var fixgroup = advertisingParameters.groupBy

				var group = advertisingParameters.groupBy == 'shares' ? 'groupByPostsYear' : 'groupByMonthYear'
				var renderFunction = advertisingParameters.groupBy == 'shares' ? 'advertisingEarningsPosts' : 'advertisingEarningsMonth'
				
				actions.getEarnings(group).then((data) => {

					console.log('data', data, advertisingParameters.groupBy, advertisingParameters.currentYear)

					if(advertisingParameters.currentYear != fixyear) return
					if(advertisingParameters.groupBy != fixgroup) return

					renders.advertisingLoading(elm, false)

					renders[renderFunction](data, elm)

				}).catch(e => {
					renders.advertisingLoading(elm, false)
					renders.error(elm)
				}).finally(() => {
					setTimeout(() => {
						if (el.c)
							el.c.removeClass('making')

					}, 300)

				})
				
			})
			

			


				
		

		}

		return {
			primary: primary,

			getdata: async function (clbk) {

				address	= parameters().address || self.app.user.address.value

				try{
					var prevgroup = localStorage['advertising_groupBy']

					if(prevgroup) advertisingParameters.groupBy = prevgroup
				}catch(e){

				}
				


				self.sdk.users.get(address, function(){


					var data = {
						my : address == self.app.user.address.value,
						advertisingParameters
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

				initEvents();

				make()

				p.clbk(null, p);
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
	module.exports = advertising;
} else {

	app.modules.advertising = {};
	app.modules.advertising.module = advertising;

}