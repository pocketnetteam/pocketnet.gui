
var usersettings = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, composed, controlller;

		var checking = false


		var actions = {

		}

		var events = {
			
		}

		var renders = {
			options : function(){

				self.shell({
					name :  'options',
					el : el.options,
					data : {
						composed : composed.c,
						themes : self.app.platform.sdk.theme.all,
						current : self.app.platform.sdk.theme.current,
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

					p.el.find('.clear').on('click', function(){


						dialog({
							class : 'zindex',
							html : "Do you really want to clear temporary application information? You balance can has changed on several minutes.",
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

			
			// self.app.platform.sdk.system.get.telegramGetMe(null, rerender);


			//}
		}

		var make = function(){

			renders.options()
			renders.cache()

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
	module.exports = usersettings;
}
else{

	app.modules.usersettings = {};
	app.modules.usersettings.module = usersettings;

}