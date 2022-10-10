const commentBanner = (function() {
	const self = new nModule();
	const essenses = {};

	const Essense = function(p) {
		const primary = deep(p, 'history');

		let el, destroyDelay, address;

		const actions = {
			dontShowAgain() {
				renders.closeBanner();
				localStorage.nextCommentBanner = -1;
			},
			unsubscribe : function(address, clbk){

				dialog({
					html : self.app.localization.e('e13022'),
					btn1text : self.app.localization.e('unsub'),
					btn2text :  self.app.localization.e('ucancel'),

					class : 'zindex',

					success : function(){

						self.app.platform.api.actions.unsubscribe(address, function(tx, err){

							if(!tx){
								self.app.platform.errorHandler(err, true)	
							}

							if (clbk){
								clbk();
							}
		
						})

					}
				})

				
			},
			subscribe : function(address, clbk){

				self.app.platform.api.actions.notificationsTurnOn(address, function(tx, err){

					if(!tx){

						self.app.platform.errorHandler(err, true)
					}


					if (clbk){
						clbk();
					}

				})
				 
			},
		};

		const events = {
			unsubscribe : function(){

				actions.unsubscribe(address)
			},

			subscribe : function(){
				
				actions.subscribe(address);
			},
		};

		const renders = {
			show() {
				el.c.addClass('show')
			},
			closeBanner() {
				el.c.removeClass('show');
				destroyDelay = setTimeout(() => {
					if (el.c) {
						el.c.empty();
					}
				}, 1000);

				el.c.off('click');
			}
		};

		const state = {
			save: function() {

			},
			load: function() {
				
			}
		};

		const initEvents = function() {

			el.c.on('click', '.noShowAgain', actions.dontShowAgain)
			el.c.on('click', '.closeBannerBtn', renders.closeBanner)

			el.c.on('click', '.subscribe', events.subscribe);
			el.c.on('click', '.unsubscribe', events.unsubscribe);
		};

		const destroyEvents = function() {
			el.c?.off?.('click', '.noShowAgain', actions.dontShowAgain)
			el.c?.off?.('click', '.closeBannerBtn', renders.closeBanner)
		};

		return {
			primary: primary,

			getdata: function(clbk, p) {
				
				address = p.settings.essenseData.address;

				const data = {
					address: address, 
				};

				clbk(data);
			},

			destroy: function() {

				destroyEvents()
				
				if (el.c) {
					el.c.empty();
				}

				if (destroyDelay) {
					clearTimeout(destroyDelay);
					destroyDelay = null;
				}

				el = {};

				
			},
			
			init: function(p) {

				state.load();

				el = {};

				el.c = p.el;

				renders.show();

				initEvents();

				p.clbk(null, p);
			}
		};
	};

	self.run = function(p) {
		const essense = self.addEssense(essenses, Essense, p);

		self.init(essense, p);
	};

	self.stop = function() {
		essenses.forEach((essense) => {
			window.requestAnimationFrame(() => {
				essense.destroy();
			})
		});
	};

	return self;
})();

if (typeof module != "undefined") {
	module.exports = commentBanner;
} else {
	app.modules.commentBanner = {};
	app.modules.commentBanner.module = commentBanner;
}