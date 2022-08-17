var activities = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el;

		var filtersList = ['all', 'rating', 'comments', 'following', 'donates']

		var activities

		var actions = {
			getactivities : async function(filter){
				self.app.api.fetch('ping', {}, {timeout : 4000}).then( async (r) => {
					activities = await self.app.api.rpc('getactivities', [self.user.address.value, r.height, 99999, filter ? [filter] : []])
				}).then(() => {
					activities.map(i => {
						if (i.description) {
							i.description = JSON.parse(i.description)
						}

						if (!i.description && i.relatedContent.description) {
							try {
								i.description = JSON.parse(i.relatedContent.description)
							} catch (e) {
								i.description = {}
								i.description.message = i.relatedContent.description
							}
						}
						if (i.height) {

							let range = (self.app.platform.currentBlock - i.height) / 2
							i.date = moment().subtract(range, 'minute').calendar();
						}
					})
					renders.content()
				})

			}
		}

		var events = {

			filter : function(e){
				var id = $(this).attr('rid');

				try {
					actions.getactivities(id)
				} catch (e) {
					return
				}
				el.c.find('.tab').removeClass('active')

				el.c.find('[rid="' + id + '"]').addClass('active')

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
					if (clbk){
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

				actions.getactivities()

				initEvents();


				p.clbk(null, p);
			},
			wnd : {
				//header : "notifications",
				class : 'wndactivities normalizedmobile maxheight',
				parallaxselector : '.wndback,.wndheader'
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