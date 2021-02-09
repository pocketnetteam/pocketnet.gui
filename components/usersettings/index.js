
var usersettings = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, composed, controlller;


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

					
					input.on('blur', function(){

						renders.options();

					})

					var value = input.val();

					self.app.platform.sdk.system.get.telegramGetMe(value, true, make, add);



					// const bot = (JSON.parse(localStorage.getItem('telegrambot')) && JSON.parse(localStorage.getItem('telegrambot')).token) || "no z"
					// self.app.platform.sdk.system.get.telegramGetMe(bot);
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

		}

		var add = function(check){

			const addIcon = (icon, color) => {

				const div = document.createElement('div');
				div.classList.add("iWrapper");
				const i = document.createElement('i');
				const telegramInputWrapper = document.querySelector("div[parameter='telegram']");
				div.classList.add("iWrapper");

				if (telegramInputWrapper) {

					telegramInputWrapper.setAttribute("style", "display: flex");

					div.setAttribute("style", `color:${color}; display:inline-block; font-size:30px; padding: 5px; margin-left: 1em`);
					i.classList.add("fa");
					i.classList.add(icon);
					div.appendChild(i);
					telegramInputWrapper.appendChild(div);

				}
			}

			if (check){
				addIcon("fa-check-circle", "green")

			} else {

				addIcon("fa-times", "red");	

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