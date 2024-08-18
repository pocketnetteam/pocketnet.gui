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
		var monetization = false

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

		return {
			primary: primary,

			getdata: async function (clbk) {


				

					monetization = self.app.platform.sdk.users.checkMonetization(self.app.user.address.value) 
					
					var data = {
						period: selectedPeriod,
						monetization
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

				actions.getStat()
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