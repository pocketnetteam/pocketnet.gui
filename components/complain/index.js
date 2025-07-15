var complain = (function () {

	var self = new nModule();

	var essenses = {};

	var Essense = function (p) {

		var primary = deep(p, 'history');

		var el, ess, sobj, selected, ed, textreason;

		var reasonIds = {
			1: 'Erotic/Porn',
			2: 'Child exploitation',
			3: 'Direct threat of violence',
			4: 'Illegal narcotics',
			5: 'Copyrighted content',
			6: 'Spam',
		}

		var reasons = {

			post: [
				{
					name: self.app.localization.e('lowstar_reason_1'),
					gid: 1
				},
				{
					name: self.app.localization.e('lowstar_reason_2'),
					gid: 2
				},
				{
					name: self.app.localization.e('lowstar_reason_3'),
					gid: 3
				},
				{
					name: self.app.localization.e('lowstar_reason_4'),
					gid: 4
				},
				/*{
					name: self.app.localization.e('lowstar_reason_5'),
					gid: 5
				},*/
				{
					name: self.app.localization.e('lowstar_reason_6'),
					gid: 6
				}

			],
			miniapp: [
				{
					name: self.app.localization.e('lowstar_reason_1'),
					gid: 1
				},
				{
					name: self.app.localization.e('lowstar_reason_2'),
					gid: 2
				},
				{
					name: self.app.localization.e('lowstar_reason_3'),
					gid: 3
				},
				{
					name: self.app.localization.e('lowstar_reason_4'),
					gid: 4
				},
				/*{
					name: self.app.localization.e('lowstar_reason_5'),
					gid: 5
				},*/
				{
					name: self.app.localization.e('lowstar_reason_6'),
					gid: 6
				}

			],
			user: [
				{
					name: self.app.localization.e('lowstar_reason_1'),
					gid: 1
				},
				{
					name: self.app.localization.e('lowstar_reason_2'),
					gid: 2
				},
				{
					name: self.app.localization.e('lowstar_reason_3'),
					gid: 3
				},
				{
					name: self.app.localization.e('lowstar_reason_4'),
					gid: 4
				},
				{
					name: self.app.localization.e('lowstar_reason_5'),
					gid: 5
				},
				{
					name: self.app.localization.e('lowstar_reason_6'),
					gid: 6
				}

			],
			miniapp_entity: [
				{
					name: self.app.localization.e('lowstar_reason_1'),
					gid: 1
				},
				{
					name: self.app.localization.e('lowstar_reason_2'),
					gid: 2
				},
				{
					name: self.app.localization.e('lowstar_reason_3'),
					gid: 3
				},
				{
					name: self.app.localization.e('lowstar_reason_4'),
					gid: 4
				},
				{
					name: self.app.localization.e('lowstar_reason_5'),
					gid: 5
				},
				{
					name: self.app.localization.e('lowstar_reason_6'),
					gid: 6
				}
			],
		}


		var actions = {
			find: function (id) {
				return _.find(reasons[ess], function (r) {
					return (r.gid || r.id) == id
				})
			},

			actionValue: function (id) {
				var target = actions.find(id);
				return reasonIds[target.gid] || id;
			},

			complain: function (clbk) {
				self.app.platform.sdk.ustate.me(function (mestate) {


					if (ess == 'post') {

						if ((typeof mestate != 'undefined' && mestate.badges && Object.values(mestate.badges).includes('shark'))) {

							var modFlag = sobj.modFlag(selected);

							self.app.platform.actions.addActionAndSendIfCan(modFlag).then(action => {

								var alias = action.object

								successCheck()
								sitemessage(self.app.localization.e('complain_success'))

								if (clbk) clbk(true)

							}).catch(e => {
								self.app.platform.errorHandler(e, true)

								if (clbk) clbk(true)
							})

						

						}

						else {
							try {
								self.app.Logger.info({
									actionId: 'POST_COMPLAIN',
									actionValue: actions.actionValue(selected),
									actionSubType: sobj.txid,

									active : true
								});

								clbk(true)
								sitemessage(self.app.localization.e('complain_success'))
							} catch (error) {


								self.app.platform.errorHandler(error, true)

								if (clbk) clbk(false)
							}

							// var i1 = ((actions.find(selected) || {}).name) || selected;
							// self.app.complainletters.post({
							//   i1,
							//   s3 : mestate.address,
							//   s2 : sobj.txid
							// }, function(r){
							//   successCheck()
							//
							//   if (clbk)
							//     clbk(r)
							// })
						}
					}

					if (ess == 'user') {
						if ((typeof mestate != 'undefined' && mestate.badges && Object.values(mestate.badges).includes('shark'))) {

							var modFlag = sobj.data.modFlag(selected);

							//topPreloader(30);

							self.app.platform.actions.addActionAndSendIfCan(modFlag).then(action => {


								var alias = action.get()
								

								successCheck()
								sitemessage(self.app.localization.e('complain_success'))

								if (clbk) clbk(true)

							}).catch(e => {
								self.app.platform.errorHandler(e, true)

								if(clbk) clbk(true)
							})

						}

						else {

							try {
								self.app.Logger.info({
									actionId: 'USER_COMPLAIN',
									actionValue: actions.actionValue(selected),
									actionSubType: sobj.data.address,

									active : true
								});
								clbk(true)
								sitemessage(self.app.localization.e('complain_success'))
							} catch (error) {
								self.app.platform.errorHandler(error, true)

								clbk(false)
							}

						}
					}
					if (ess == 'miniapp') {
						if ((typeof mestate != 'undefined' && mestate.badges && Object.values(mestate.badges).includes('shark'))) {

							var modFlag = sobj.data.modFlag(selected);

							//topPreloader(30);

							self.app.platform.actions.addActionAndSendIfCan(modFlag).then(action => {


								var alias = action.get()
								

								successCheck()
								sitemessage(self.app.localization.e('complain_success'))

								if (clbk) clbk(true)

							}).catch(e => {
								self.app.platform.errorHandler(e, true)

								if(clbk) clbk(true)
							})

						}

						else {

							try {
								var i1 = ((actions.find(selected) || {}).name) || selected;
								self.app.Logger.info({
									actionId: 'MINIAPP_COMPLAIN',
									actionValue: i1,
									actionSubType: sobj.hash,
									active : true
								});
								clbk(true)
								sitemessage(self.app.localization.e('complain_success'))
							} catch (error) {
								self.app.platform.errorHandler(error, true)

								clbk(false)
							}

						}
					}

					if (ess == 'miniapp_entity') {

						try {
							var actionSubType = JSON.stringify(
								{
									link: sobj.entityLink, 
									txid: sobj.entityTxid,
									type: sobj.entityType,
								}
							);

							self.app.Logger.info({
								actionId: 'MINIAPP_COMPLAIN',
								actionValue: actions.actionValue(selected),
								actionSubType,

								active : true
							});
							clbk(true)
							sitemessage(self.app.localization.e('complain_success'))
						} catch (error) {
							self.app.platform.errorHandler(error, true)

							clbk(false)
						}

					}

				})


			},

			nextActive: function () {

				if (selected || textreason) {

					el.next.removeClass('disabled')

				}
				else {
					el.next.addClass('disabled')
				}
			},
		}

		var events = {
			close: function () {
				self.closeContainer();
			},

			complain: function () {
				if (!el.next.hasClass('disabled') && (selected || textreason)) {

					globalpreloader(true)

					actions.complain(function (r) {

						globalpreloader(false)


						if (r) {
							self.closeContainer();

							if (ed.success) {
								ed.success()
							}
						}

					})
				}

			},



			select: function () {
				var id = $(this).attr('reason')

				var reason = actions.find(id);

				if (reason) {

					if ($(this).hasClass('active')) {

					}
					else {
						el.c.find('.reason').removeClass('active');

						selected = null

						$(this).addClass('active')

						selected = reason.gid

						actions.nextActive()
					}

				}
			}
		}

		var renders = {
			reasons: function () {
				self.shell({
					name: 'reasons',
					inner: html,
					el: el.reasons,
					data: {
						reasons: reasons[ess]
					},

				}, function (p) {
					p.el.find('.reason').on('click', events.select)
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

			el.c.find('.cancel').on('click', events.close)

			el.next.on('click', events.complain)

			el.c.find('textarea').on('keyup', function () {
				textreason = $(this).val()
				actions.nextActive()
			})
		}

		var make = function () {
			renders.reasons()
		}

		return {
			primary: primary,

			getdata: function (clbk, p) {

				selected = null;
				textreason = ''

				ess = deep(p, 'settings.essenseData.item') || 'post';

				sobj = deep(p, 'settings.essenseData.obj') || null;
				

				ed = p.settings.essenseData || {};

				if (sobj) {
					var data = {
						ess: ess
					};
					clbk(data);
				}

			},

			destroy: function () {
				el = {};
			},

			init: function (p) {

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.reasons = el.c.find('.reasons')
				el.next = el.c.find('.next')

				initEvents();

				make()

				p.clbk(null, p);
			},
			wnd: {
				class: 'withoutButtons transparent small complain normalizedmobile maxheight'
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
	module.exports = complain;
}
else {
	app.modules.complain = {};
	app.modules.complain.module = complain;

}