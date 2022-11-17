var statistics = (function(){

	var self = new nModule();

	var essenses = {};

	var Essense = function(p){

		var primary = deep(p, 'history');

		var el, ed, statistic;

		var serversList = {};
		var peertubeServers = {};

		var helpers = {
			removeDuplicateVideos(host, videos) {
				let formattingVideos = [...videos];

				const serverRoy = Object.keys(serversList).find((royKey) =>
					(serversList[royKey] || []).includes(host),
				);

				(serversList[serverRoy] || []).forEach((server) => {
					if (server === host) return;

					if (!peertubeServers[server]) return;

					formattingVideos = formattingVideos.filter((video) => {
						const duplicate = peertubeServers[server].videos.find(
							(duplicatedVideo) => video.uuid === duplicatedVideo.uuid,
						);

						if (duplicate) {
							//pick max amount of views
							duplicate.views = Math.max(duplicate.views, video.views);

							return false;
						}

						return true;
					});
				});

				return formattingVideos;
			}
		}

		var actions = {

			getFullPageInfo() {
				
				actions
					.getTotalRatings()
					.then((result) => {
						const renderingStarts =
							result.scoreCnt && result.scoreSum
								? `${(result.scoreSum / result.scoreCnt).toFixed(1)} (${
									result.scoreCnt
								}) <i class="fas fa-star"></i>`
								: `&mdash;`;

						const renderingUsers = `${
							result.countLikers || 0
						}  <i class="fas fa-users"></i>`;
						
						renders.bonusProgram(
							{
								parameterName: 'bonusProgramRatings',
								value: renderingStarts,
							},
							el.bonusProgramContainerViews,
						);

						renders.bonusProgram(
							{
								parameterName: 'UniqueUsers',
								value: renderingUsers,
							},
							el.bonusProgramContainerUniqueUsers,
						);
					})
					.catch((e) => {
						renders.bonusProgram(
							{
								parameterName: 'bonusProgramRatings',
								value: `<span class="errorLoading"><i class="fas fa-exclamation-circle"></i> ${self.app.localization.e(
									'ErrorLoadingRates',
								)}</span>`,
							},
							el.bonusProgramContainerViews,
						);

						renders.bonusProgram(
							{
								parameterName: 'UniqueUsers',
								value: `<span class="errorLoading"><i class="fas fa-exclamation-circle"></i> ${self.app.localization.e(
									'ErrorLoadingRates',
								)}</span>`,
							},
							el.bonusProgramContainerUniqueUsers,
						);
					});
			},

			getTotalRatings() {
				if (self.app.platform.sdk.address.pnet()) {
					var address = self.app.platform.sdk.address.pnet().address;
					return self.app.api
						.rpc('getcontentsstatistic', [[address], 'video', 738274, 738274], {})
						.then((r) => {
							var d =
								_.find(r || [], function (obj) {
									return address == obj.address;
								}) || {};

							return Promise.resolve(d);
						})
						.catch((err) => {
							if (!err.text) err.text = 'GET_TOTAL_RATINGS_VIDEOCABINET';

							return sitemessage(helpers.parseVideoServerError(err));
						});
				} else {
					return Promise.reject();
				}
			},

		}

		var events = {
			
		}

		var renders = {

			statistic : function(){
				self.app.nav.api.load({
					open: true,
					id : 'statistic',
					el : el.c.find('.stat'),
					animation: false,
					clbk : (e, p) => {
						statistic = p
					}
				})
			},

			bonusProgram(parameters = {}, element) {
				self.shell(
					{
						name: 'bonusProgram',
						el: element,
						data: { ...parameters },
					},
					(p) => {},
				);
			},

		}

		var state = {
			save : function(){

			},
			load : function(){
				
			}
		}

		var initEvents = function(){
			renders.statistic();
			// actions.getFullPageInfo();

		}

		return {
			primary : primary,

			getdata : function(clbk, p){

				ed = p.settings.essenseData

				var data = {
					ed
				};

				clbk(data);

			},

			destroy : function(){
				ed = {}
				el = {};
			},
			
			init : function(p){

				state.load();

				el = {};
				el.c = p.el.find('#' + self.map.id);

				el.bonusProgramContainerViews = el.c.find('.leaderBoardContainerViews');
				el.bonusProgramContainerUniqueUsers = el.c.find(
					'.leaderBoardContainerUniqueUsers',
				);

				initEvents();

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

			window.requestAnimationFrame(() => {
				essense.destroy();
			})

		})

	}

	return self;
})();


if(typeof module != "undefined")
{
	module.exports = statistics;
}
else{

	app.modules.statistics = {};
	app.modules.statistics.module = statistics;

}