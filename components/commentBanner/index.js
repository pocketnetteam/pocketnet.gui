const commentBanner = (function() {
	const self = new nModule();
	const essenses = {};

	const Essense = function(p) {
		const primary = deep(p, 'history');

		let anchor, el, essenseData;

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
				console.log('show', p.el)
				p.el.addClass('show')
			},
			closeBanner() {
				p.el.removeClass('show');
				setTimeout(() => {
					p.el.empty();
				}, 1000);

				p.el.off('click');
			}
		};

		const state = {
			save: function() {

			},
			load: function() {
				
			}
		};

		const initEvents = function() {
			p.el.on('click', '.noShowAgain', actions.dontShowAgain)
			p.el.on('click', '.closeBannerBtn', renders.closeBanner)
		};

		return {
			primary: primary,

			getdata: function(clbk) {
				const data = {};

				clbk(data);
			},

			destroy: function() {
				el = {};
			},
			
			init: function(p) {
				state.load();

				el = {};

				renders.show();

				initEvents();

				p.clbk?.(null, p);
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