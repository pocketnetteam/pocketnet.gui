var activities = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, loading;

		var filtersList = ['all', 'rating', 'comment', 'subscriber', 'money']

		var activities

		var getters = {
			getFilters : function(filter){
				if (filter === 'all') return []
				if (filter === 'rating') return ['contentscore']
				if (filter === 'comment') return ['commentscore', 'comment']
				if (filter === 'money') return ['money']
				if (!filter) return []
				return [filter]
			}
		}

		var actions = {
			getdata : async function(filter){

				return self.app.api.fetch('ping', {}, { timeout : 4000 }).then(async (r) => {

					try {

						activities = await self.app.api.rpc('getactivities', [self.user.address.value, r.height, , getters.getFilters(filter)])
					} catch (e) {
						return e
					}

				}).then((e) => {
					if (e) return e
					activities.map(i => {
						if (i.description) {
							i.description = JSON.parse(i.description)
						}

						if (!i.description && i.relatedContent?.description) {
							try {
								i.description = JSON.parse(i.relatedContent.description)
							} catch (e) {
								i.description = {}
								i.description.message = i.relatedContent.description
							}
						}
						if (i.height) {

							let range = (self.app.platform.currentBlock - i.height) / 2
							i.date = moment().subtract(range, 'minute');
						}
					})

					activities = group(activities, function(n){
						var currentDate = new Date();

						var d = n.date._d
						if (d.addMinutes(60) > currentDate) return 'ntlasthour';

						if (d.addMinutes(1440) > currentDate) return 'nttoday';
						if (d.addMinutes(2880) > currentDate) return 'ntyesterday';

						if (d.getFullYear().toString() + (d.getMonth() + 1).toString() == currentDate.getFullYear().toString() + (currentDate.getMonth() + 1).toString()) return 'ntmounth';

						return 'ntearlier';

					})
					renders.content()
					return e
				})
			}
		}

		var events = {

			filter : function(){
				if (this.classList.contains('active')) {
					return
				}

				var id = $(this).attr('rid');

				actions.getdata(id).then((e) => {

					if (e) return sitemessage(e.error.message || e.error)

					el.c.find('.tab').removeClass('active')

					el.c.find('[rid="' + id + '"]').addClass('active')

					_scrollTo(el.c.find('.active'), el.c.find('.filters'), 0, 0, 'Left')

				})

			}

		}

		var renders = {
			filters : function(clbk){
				self.shell({

					name : 'filters',
					el : el.filters,
					data : {
						filters : filtersList,
					},
				}, function(_p){
					_p.el.find('.tab').on('click', events.filter)
					if (clbk) {
						clbk()
					}
				})
			},

			content : function(type){
				self.shell({

					name : 'content',
					el : el.content,
					data : {
						activities : activities,
					},
				}, function(_p){


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

		}

		return {
			primary : primary,

			getdata : function(clbk){

				var data = {};

				clbk(data);


			},

			destroy : function(){
				el = {};
			},

			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);
				el.filters = p.el.find('.filters');
				el.content = p.el.find('.content');

				renders.filters()

				actions.getdata()

				initEvents();


				p.clbk(null, p);
			},
			wnd : {
				class : 'wndactivities normalizedmobile maxheight',
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


if (typeof module != "undefined") {
	module.exports = activities;
} else {

	app.modules.activities = {};
	app.modules.activities.module = activities;

}