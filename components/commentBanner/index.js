const commentBanner = (function() {
	const self = new nModule();
	const essenses = {};

	const Essense = function(p) {
		const primary = deep(p, 'history');

		let el, destroyDelay, address, block;

		const actions = {
			dontShowAgainBlock(){

				renders.closeBanner(true);

				const blockBanner = JSON.parse(localStorage.blockBanner || '[]');
				blockBanner.push(address);

				
				try {
					localStorage.setItem('blockBanner', JSON.stringify(blockBanner));
				}
				catch (e) { }
			},

			dontShowAgain() {

				renders.closeBanner();

				const commentBanner = JSON.parse(localStorage.commentBanner || '{}');
				commentBanner.count = -1;

				try {
					localStorage.setItem('commentBanner', JSON.stringify(commentBanner));
				}
				catch (e) { }
			

				
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
			block : function(address, clbk){

				self.app.platform.api.actions.blocking(address, function (tx, error) {
					if (!tx) {
						self.app.platform.errorHandler(error, true)
					}

					if (clbk){
						clbk();
					}
				})
			}
		};

		const events = {
			unsubscribe : function(){

				actions.unsubscribe(address)
			},

			subscribe : function(){
				
				actions.subscribe(address);
			},

			block : function(){

				actions.block(address);

			}
		};

		const renders = {
			show() {
				el.c.addClass('show')
			},
			closeBanner(block) {

				if (block){
					el.c.closest('.share').removeClass('ultrablurred');
				}
				
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

			el.c.on('click', '.noShowAgainComment', actions.dontShowAgain)
			el.c.on('click', '.noShowAgainBlock', actions.dontShowAgainBlock)
			el.c.on('click', '.closeBannerBtn', renders.closeBanner)

			el.c.on('click', '.subscribe', events.subscribe);
			el.c.on('click', '.unsubscribe', events.unsubscribe);

			el.c.on('click', '.block', events.block);

			if (block){
				el.c.closest('.share').addClass('ultrablurred');
			}

		};

		const destroyEvents = function() {
			el.c?.off?.('click', '.noShowAgain', actions.dontShowAgain)
			el.c?.off?.('click', '.closeBannerBtn', renders.closeBanner)
		};

		return {
			primary: primary,

			getdata: function(clbk, p) {
				
				address = p.settings.essenseData.address;
				block = p.settings.essenseData.block;

				const data = {
					address: address, 
					block: block
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