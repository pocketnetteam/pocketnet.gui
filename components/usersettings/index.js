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
						console.log(self.app.platform.sdk.theme.set, 'set')
						self.app.platform.sdk.theme.set(t)
						
					})

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

				console.log('rerender???')
				renders.options()

			}

			controller = self.app.platform.sdk.system.get.telegramUpdateAbort;

			controller.abort(); 
			self.app.platform.sdk.system.get.telegramUpdateAbort = new AbortController();

			console.log('controller', self.app.platform.sdk.system.get.telegramUpdateAbort)
			
			setTimeout(() => self.app.platform.sdk.system.get.telegramUpdates(null, rerender), 0)
		}

		var make = function(){
			renders.options()

		}

		return {
			primary : primary,

			getdata : function(clbk){

				composed = self.app.platform.sdk.usersettings.compose()
				var data = {};

				clbk(data);

			},

			destroy : function(){
				el = {};
				console.log('destroyed?');
				controller.abort(); 
				controller = new AbortController();
				self.app.platform.sdk.system.get.telegramUpdates();
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.options = el.c.find('.options')

				initEvents();

				make()

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