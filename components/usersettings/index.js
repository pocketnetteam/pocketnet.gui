
var usersettings = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, composed, controller;

		var checking = false


		var actions = {
			removeAccount : function(){
				new dialog({
					html: self.app.localization.e('removeAccountQuestion'),
					btn1text: self.app.localization.e('ucancel'),
					btn2text: self.app.localization.e('removeAccountYes'),

					class: 'zindex accepting accepting2',

					success: () => {

						

					},

					fail: () => {

						globalpreloader(true)

						var ds = null

						var mes = (t) => {
							if (ds){
								ds()
								ds = null
							}


							if (t) ds = sitemessage(self.app.localization.e(t), null, 'inf')
						}

						self.app.platform.sdk.user.deleteaccount((progress) => {

							if (progress)
								mes('removeAccount_' + progress)

						}).then(() => {

							successCheck()

							new dialog({
								html : self.app.localization.e('removeAccount_success'),
								class : "one zindex"
							})

							self.app.reload({
								href : 'author'
							});

						}).catch(e => {

							console.log("E", e)

							var errors = {
								notprepared : 'notprepared',
								undefinedError : 'undefinedError',
								balance : 'balance'
							}

							console.error(e)

							new dialog({
								html : self.app.localization.e('removeAccount_' + (!e || !errors[e] ? errors.undefinedError : errors[e])),
								class : "one zindex"
							})

						}).finally(() => {

							globalpreloader(false)

							mes()
						})

					}
				})
			}
		}

		var events = {
			removeAccount : function(){
				actions.removeAccount()
			}
		}

		var renders = {

			downloadedvideoscontent : function(clbk){

				if(!window.cordova){
					if(clbk) clbk()

					return
				}

				self.shell({
					inner : html,
					name : 'downloadedvideoscontent',

					el : el.c.find('.downloadedvideoscontentWrapper')

				},
				function(p){

					var deleteButton = p.el.find('#deleteAllDownloadedVideos')

					deleteButton.on('click', function() {
						// Ask user for confirmation
						new dialog({
							html:  self.app.localization.e('deleteAllVideoDialog'),
							btn1text: self.app.localization.e('dyes'),
							btn2text: self.app.localization.e('dno'),
							success: function () {
								// User wants to delete all videos
								self.app.platform.sdk.localshares.deleteAll().then(r => {
									renders.downloadedvideoscontent()
									successCheck()
								}).catch(e => {
									sitemessage(self.app.localization.e('errorreload'))
								})


							},
							class : 'deleteAllDownloadVideoDialog'
						});
					});

					if (clbk)
						clbk()
				})
			},

			options : function(){

				self.shell({
					name :  'options',
					el : el.options,
					data : {
						composed : composed.c,
						themes : self.app.platform.sdk.theme.all,
						currentTheme : self.app.platform.sdk.theme.current,
						uiScales: self.app.platform.sdk.uiScale.all,
						currentUiScale: self.app.platform.sdk.uiScale.current,
					}

				}, function(p){
					ParametersLive(composed.o, p.el)

					p.el.find('.themewrapper').on('click', function(){

						var e = $(this)

						if (e.hasClass('active')) return

						var t = e.attr('theme')

						p.el.find('.themewrapper').removeClass('active')

						e.addClass('active')

						self.app.platform.sdk.theme.set(t)

					})

					p.el.find('.uiscalewrapper').on('click', function(){
						const elem = $(this);

						if (elem.hasClass('active')) {
							return;
						}

						const scaleName = elem.attr('scale');

						p.el.find('.uiscalewrapper').removeClass('active');

						elem.addClass('active');

						self.app.platform.sdk.uiScale.set(scaleName);

					})

					var input = p.el.find('.parameterMaketWrapper[parameter=telegram] input')


					input.on('change', function(e){


						var meta = self.sdk.usersettings.meta

						var value = e.target.value;

						if (meta.tgfrom[value] && meta.tgfrom[value].possibleValues){

							meta.tgfrom.possibleValues = meta.tgfrom[value].possibleValues;
							meta.tgfrom.possibleValuesLabels = meta.tgfrom[value].possibleValuesLabels;
							meta.tgfrom.value = meta.tgfrom[value].value;

						} else {

							meta.tgfrom.possibleValues = [];
							meta.tgfrom.possibleValuesLabels = [];
							meta.tgfrom.value = '';
						}

						if (meta.tgto[value] && meta.tgto[value].possibleValues){

							meta.tgto.possibleValues = meta.tgto[value].possibleValues;
							meta.tgto.possibleValuesLabels = meta.tgto[value].possibleValuesLabels;
							meta.tgto.value = meta.tgto[value].value;

						} else {

							meta.tgto.possibleValues = [];
							meta.tgto.possibleValuesLabels = [];
							meta.tgto.value = '';

						}
						
						composed = self.app.platform.sdk.usersettings.compose(make)

						self.sdk.usersettings.save();
						make();

						// make();

					})

					var value = input.val();

					self.app.platform.sdk.system.get.telegramGetMe(value, true, make, add);

					// const bot = (JSON.parse(localStorage.getItem('telegrambot')) && JSON.parse(localStorage.getItem('telegrambot')).token) || "no z"
					// self.app.platform.sdk.system.get.telegramGetMe(bot);
				})

			},

			cache : function(){
				var temp = self.app.platform.sdk.node.transactions.temp

				var t = [];

				_.each(temp, function(trx, s){
					_.each(trx, function(tr){
						t.push(tr)
					})
				})

				try{
					console.log("JSON TEMP", JSON.stringify(t))
				}catch(e){
					console.log("TEMP", t)
				}
				

				self.shell({
					name :  'cache',
					el : el.cache,
					data : {
						temp : t,
						checking : checking
					}

				}, function(p){
					p.el.find('.check').on('click', function(){

						if($(this).hasClass('disabled')) return

						checking = true

						renders.cache()

						self.app.platform.sdk.node.transactions.checkTemps(function(){

							setTimeout(function(){
								checking = false

								renders.cache()
							}, 100)

						})

					})

					p.el.find('.copyvalue').on('click', function(){

						copyText($(this))

						sitemessage(self.app.localization.e('successcopied'))
					})

					p.el.find('.clear').on('click', function(){


						new dialog({
							class : 'zindex',
							html : "Do you really want to clear temporary application information?",
							btn1text : self.app.localization.e('dyes'),
							btn2text : self.app.localization.e('dno'),
							success : function(){
								self.app.platform.sdk.node.transactions.clearTempHard()
								renders.cache()
							}
						})


					})
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

			const rerender = () => {

				renders.options();

			}


			//if (self.app.user.features.telegram){

			controller = self.app.platform.sdk.system.get.telegramUpdateAbort;

			controller.abort();
			self.app.platform.sdk.system.get.telegramUpdateAbort = new AbortController();


			el.c.find('.removeAccount').on('click', events.removeAccount)

			// self.app.platform.sdk.system.get.telegramGetMe(null, rerender);


			//}
		}

		var make = function(){

			renders.options()
			renders.cache()
			renders.downloadedvideoscontent()

			self.app.platform.sdk.node.transactions.clbks.settings = renders.cache;


		}

		var add = function(check){

			const addIcon = (icon, color) => {

				const div = document.createElement('div');
				div.classList.add("iWrapper");
				const i = document.createElement('i');
				const telegramInputWrapper = document.querySelector("div[parameter='telegram']");

				if (telegramInputWrapper) {

					telegramInputWrapper.setAttribute("style", "display: flex");

					div.classList = 'tokenResult ' + color
					i.classList.add("fa");
					i.classList.add(icon);
					div.appendChild(i);
					telegramInputWrapper.appendChild(div);

				}
			}

			if (check){
				addIcon("fa-check-circle", "success");

			} else {
				addIcon("fa-times", "failed");
			}


		}

		return {
			primary : primary,

			getdata : function(clbk){

				self.app.platform.sdk.usersettings.init();

				composed = self.app.platform.sdk.usersettings.compose(make)
				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};


				delete self.app.platform.sdk.node.transactions.clbks.settings

				if (self.app.user.features.telegram){

					controller.abort();
					controller = new AbortController();
					self.app.platform.sdk.system.get.telegramUpdates();

				}
			},

			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.options = el.c.find('.options')
				el.cache = el.c.find('.cache')

				initEvents();

				make();

				p.clbk(null, p);




			},
			wnd : {			
				header : "rsettings",
				class : 'normalizedmobile',
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
	module.exports = usersettings;
}
else{

	app.modules.usersettings = {};
	app.modules.usersettings.module = usersettings;

}
