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

		var stats = []
		var monetizationOpportunity = false

		var loading = false

		var actions = {

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

			monetizationWrapper(clbk){

				console.log('monetizationOpportunity', monetizationOpportunity)

				if(!monetizationOpportunity){
					if(clbk) clbk()

					return
				}

				self.app.platform.sdk.users.checkMonetization(self.app.user.address.value).then((monetization) => {

					console.log("??????????")

					try{
						self.app.monetization.test_getauthorsmonetizationearns().then(result => {
							console.log('result', result)
						}).catch(e => {
							console.error(e)
	
						})
					}catch(e){
						console.error(e)
					}
					

					self.shell({

						name: 'monetizationwrapper',
						el: el.c.find('.monetizationOpportunity'),
						data: {
							monetization
						},
	
					}, function (_p) {

						_p.el.find('.monetizationEnable').on('click', function(){

							globalpreloader(true)

							setTimeout(() => {

								renders.monetizationWrapper(() => {
									globalpreloader(false)
								})

							}, 500)
						})
						
						if(clbk) clbk()
	
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