var statistic = (function () {

  var self = new nModule();

  var essenses = {};
  

  var Essense = function (p) {

    var primary = deep(p, 'history');

    var el;

    var block;

    var selectedPeriod = {
      from: {},
      to: {}
    }

    var serversList = {};
		var peertubeServers = {};

    var lastMonth = moment().subtract(1, 'months').format('YYYY-MM-DD'); 
    var fields

    var loading = false

    var prevPeriod;

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
				if (self.app.user.address.value) {
					var address = self.app.user.address.value;
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

      loading: function (sh) {
        loading = sh
        renders.block()
      },

      getStat: async function () {

        // if (prevPeriod?.to.block === selectedPeriod.to.block && prevPeriod?.from.block === selectedPeriod.from.block ) {
        //   return
        // }

        prevPeriod = JSON.parse(JSON.stringify(selectedPeriod))

        actions.loading(true)
        fields = []

        pretry(() => {
          return self.app.platform.currentBlock > 0
        }).then(() => {
          let block = self.app.platform.currentBlock 

          let from = (selectedPeriod?.from?.block && selectedPeriod?.from?.block > 0) ? selectedPeriod.from.block : 0
          let to = (selectedPeriod?.to?.block && (block.height - selectedPeriod.to.block) > 0) ? block.height - selectedPeriod.to.block : 0

          return Promise.all(_.map([1, 3, 7], (i) => {

            return self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from, i]).then(r => {
              fields.push({...r[0], limit : i})
              return Promise.resolve()
            })

          })).then(() => {1
            actions.loading(false)
          }).catch(e => {
            console.error(e)
          })

          /*fields.push(...await self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from, 1]))
          fields.push(...await self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from, 3]))
          fields.push(...await self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from, 7]))*/


          
        })

        

        
      },

      from: function (e) {
        selectedPeriod.from.date = e.target ? e.target.value : e
        selectedPeriod.from.block = Math.floor((moment(selectedPeriod.to.date).unix() - moment(selectedPeriod.from.date).unix()) / 60)

        renders.form()
        actions.getStat()
      },
      to: function (e) {
        selectedPeriod.to.date = e.target.value
        selectedPeriod.to.block = Math.floor((moment().unix() - moment(e.target.value).unix()) / 60) - 1439
        selectedPeriod.from.date? actions.from(selectedPeriod.from.date): actions.from(lastMonth)
        // renders.form()
        // actions.getStat()
      }
    }

    var events = {}

    var renders = {
    

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
      
      form: function (clbk) {
        self.shell({

          name: 'form',
          el: el.form,
          data: {
            period: selectedPeriod,
          },
        }, function (_p) {
          _p.el.find('.from').on('change', actions.from)
          _p.el.find('.to').on('change', actions.to)
        })
      },

      block: function (clbk) {

        var earnings = 0;

        if (fields){

          fields.forEach(function(field){

            if (field.commentators){
              if (field.limit === 1){
                earnings += field.commentators;
              }
    
              if (field.limit === 3){
                earnings += field.commentators / 2;
              }
    
              if (field.limit === 7){
                earnings += field.commentators / 4;
              }
            }

          })

        }

        var real = self.app.platform.ui.usertype(self.user.address.value) === 'real';

        self.shell({

          name: 'block',
          el: el.block,
          data: {
            fields: _.sortBy(fields, function(c){
              return c.limit
            }),
            earnings: earnings,
            loading: loading, 
            real: real
          },
        }, function (_p) {
        })
      }
    }

    var state = {
      save: function () {

      },
      load: function () {

      }
    }

    var initEvents = function () {

      // renders.statistic();
			actions.getFullPageInfo();
      
    }

    return {
      primary: primary,

      getdata: async function (clbk) {

        var data = {
          period: selectedPeriod
        };

        clbk(data);

      },

      destroy: function () {
        prevPeriod = null
        el = {};
      },

      init: async function (p) {

        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);


        el.block = p.el.find('.block');
        el.form = p.el.find('.form')

        el.bonusProgramContainerViews = el.c.find('.leaderBoardContainerViews');
				el.bonusProgramContainerUniqueUsers = el.c.find(
					'.leaderBoardContainerUniqueUsers',
				);

        if (!selectedPeriod.to.block ){

          selectedPeriod.to.block = 0;

        }

        if (!selectedPeriod.from.block){

          selectedPeriod.from.block = Math.floor((moment().unix() - moment(lastMonth).unix()) / 60)

        }
        renders.form()

        initEvents();

        actions.getStat()
        p.clbk(null, p);
      }
    }
  };


  self.run = function (p) {

    var essense = self.addEssense(essenses, Essense, p);

    self.init(essense, p);

  };

  self.stop = function () {

    _.each(essenses, function (essense) {

      window.rifticker.add(() => {
				essense.destroy();
			})

    })

  }

  return self;
})();


if (typeof module != "undefined") {
  module.exports = statistic;
} else {

  app.modules.statistic = {};
  app.modules.statistic.module = statistic;

}