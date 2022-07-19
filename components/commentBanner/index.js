const commentBanner = (function() {
	const self = new nModule();
	const essenses = {};

	const Essense = function(p) {
		const primary = deep(p, 'history');

		let anchor, el, essenseData, destroyDelay;

		const actions = {
			dontShowAgain() {
				renders.closeBanner();
				localStorage.nextCommentBanner = -1;
			},
		};

		const events = {

		};

		const renders = {
			show() {
				el.c.addClass('show')
			},
			closeBanner() {
				el.c.removeClass('show');
				destroyDelay = setTimeout(() => {
					if (el.c)
						el.c.empty();
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
		};

		return {
			primary: primary,

			getdata: function(clbk) {
				const data = {};

				clbk(data);
			},

			destroy: function() {
				if (el.c)
					el.c.empty();
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
			essense.destroy();
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