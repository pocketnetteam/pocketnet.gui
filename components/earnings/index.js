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
			startPeriod : 1725235200,
			periodDuration : 'w',
			groupDuration : 'm',
			years : [2023, new Date().getFullYear()]
		}

		console.log('monetizationParameters', monetizationParameters)

		var stats = []
		var monetizationOpportunity = false

		var loading = false

		var helpers = {
			getYearPeriod : function(year){

				var start = moment.utc([year, 0, 1]).unix()

				var end = moment.utc([year + 1, 0, 1]).unix()

				return {
					start, end
				}
			},
			
			total : function(ar, f){

				var total = {}

				_.each(ar, (o) => {

					var p = f(o)

					total.commentsCount = (total.commentsCount || 0) + (p.commentsCount || 0)
					total.commentsFromSharks = (total.commentsFromSharks || 0) + (p.commentsFromSharks || 0)
					total.reward = (total.reward || 0) + (p.reward || 0)
					total.scoresCount = (total.scoresCount || 0) + (p.scoresCount || 0)
					total.scoresCountFromSharks = (total.scoresCountFromSharks || 0) + (p.scoresCountFromSharks || 0)
				})


				total.comments = (total.commentsCount || 0) + (total.commentsFromSharks || 0)
				total.scores = (total.scoresCount || 0) + (total.scoresCountFromSharks || 0)

				return total

			}
		}

		var actions = {
			openposts : function(txids){
				console.log('txids', txids)
			},
			getEarnings : function(){
				return self.app.monetization.contentperformance({
					addresses : [self.app.user.address.value],
					...helpers.getYearPeriod(monetizationParameters.currentYear)
				}).then((result = {}) => {

					var r = result[self.app.user.address.value] || []

					var weeks = _.sortBy(weeksInYear(monetizationParameters.currentYear), (w) => {
						return -w.n
					})

					var weeksResult = _.map(weeks, (w) => {

						var posts = _.filter(r, (f) => {

							console.log('getWeekNumber(moment.utc(f.time).toDate())[1]', moment.utc(f.time).toDate(), getWeekNumber(moment.utc(f.time).toDate())[1])

							return getWeekNumber(new Date(moment.utc(f.time * 1000).toDate()))[1] == w.n
						})

						w.notIncluded = w.date > moment.utc().unix()

						w.beforeProgram = w.date < monetizationParameters.startPeriod

						return {
							...w, posts, total : helpers.total(posts, (r) => {return r}), startof : w.date == monetizationParameters.startPeriod
						}
					})

					var byMonth = _.sortBy(_.map(group(weeksResult, (w) => {
						return (new Date(w.end * 1000)).getMonth() + 1
					}), (bm, i) => {

						var postsCount = _.reduce(bm, (m, p) => {
							return m + p.posts.length
						}, 0)

						var start = new Date(monetizationParameters.currentYear, i - 1, 1)
						var end = new Date(monetizationParameters.currentYear, i, 1)
						var current = new Date()

						return {
							end,
							start,
							current : current.getTime() > start.getTime() && current.getTime() <= end.getTime(),
							weeks : bm,
							total : {postsCount, ...helpers.total(bm, (r) => {return r.total})},
							notIncluded : !_.find(bm, (w) => {
								return !w.notIncluded
							}),
							beforeProgram : !_.find(bm, (w) => {
								return !w.beforeProgram
							}),

							startof : _.find(bm, (w) => {
								return w.startof
							})
						}
					}), (m) => {
						return -(new Date(m.start)).getTime()
					})

					var postsCount = _.reduce(byMonth, (m, p) => {
						return m + p.total.postsCount
					}, 0)

					var year = {
						months : byMonth,
						total : {postsCount, ...helpers.total(byMonth, (r) => {return r.total})}
					}

					console.log('year', year)

					return Promise.resolve(year)

				}).catch(e => {
					console.error(e)

					return Promise.reject(e)

				})
			},

			loading: function (sh) {
				loading = sh
				renders.block()
			},

			getStat: async function () {

				return self.app.api.rpc('getaccountearning', [self.user.address.value, 0, 1627534]).then(function (r) {

					el.content.empty();

					var statValues = r && r[0];

					if (statValues) {

						for (var key in statValues) {

							if (key !== 'address') {

								var stat = stats.find(function (s) {
									return s.id === key;
								})

								if (stat) {

									stat.balance = statValues[key] / 100000000;

									renders.total(stat);

								}

							}
						}
					}
					return Promise.resolve()
				})

			},

		}

		var renders = {

			posts: function (posts, els, show, clbk) {

				if(show){

					var txids = _.map(posts, (p) => {
						return p.rootTxHash
					})

					renders.monetizationLoading(els, true)

					self.app.platform.sdk.node.shares.getbyid(txids, function(shares){

						console.log('shares', shares)

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
								postTable

							},
		
						}, function (_p) {
		
							_p.el.find('.postTable').on('click', function() {
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

				console.log('monetizationEarnings', data, _el)
				
				self.shell({

					name: 'monetizationearnings',
					el: _el,
					data: {
						earnings : data,
						monetization : monetizationParameters
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

							console.log("WWW", w)

							renders.posts(w.posts, weekel.find('.postsTable'), exp)
						}
					})

					_p.el.find('.openpostsweek').on('click', function(){

						var i = $(this).attr('index')
						var m = $(this).attr('month')

						var w = data.months[m].weeks[i]

						var txids = _.map(w.posts, (p) => {
							return p.rootTxHash
						})

						actions.openposts(txids)

						return false

					})

					_p.el.find('.openpostsmonth').on('click', function(){
						var i = $(this).attr('index')

						var posts = _.reduce(data.months[i].weeks, (m, w) => {
							return m.concat(w.posts)
						}, [])

						var txids = _.map(posts, (p) => {
							return p.rootTxHash
						})

						actions.openposts(txids)

						return false

					})
					
					if(clbk) clbk()

				})
			},

			monetizationWrapper(clbk){

				if(!monetizationOpportunity){
					if(clbk) clbk()

					return
				}

				self.app.platform.sdk.users.checkMonetization(self.app.user.address.value).then((monetization) => {

					

					self.shell({

						name: 'monetizationwrapper',
						el: el.c.find('.monetizationOpportunity'),
						data: {
							monetization,
							monetizationParameters : monetizationParameters
						},
	
					}, function (_p) {

						_p.el.find('.yearleft').on('click', function(){
							monetizationParameters.currentYear -- 

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
				actions.getStat()
			})

		}

		return {
			primary: primary,

			getdata: async function (clbk) {


				

					monetizationOpportunity = self.app.platform.sdk.users.checkMonetizationOpportunity(self.app.user.address.value) 
					
					var data = {
						period: selectedPeriod,
						monetizationOpportunity
					};

					clbk(data);

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