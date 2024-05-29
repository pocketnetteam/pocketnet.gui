var diagnosticsPage = (function () {
  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el, ed;

    var serversObject = {};
    var serverObjectsWithErrors = {};
    var timeZone;

    var serverAuth = {};
    var agentStats = {};

    var serversAmount, serversCounter;

    var diagnosticsInProgress = false;

    var actions = {
      stringifyErrorSafe(err) {
        let errorStringed;

        try {
          errorStringed = JSON.stringify(err, Object.getOwnPropertyNames(err));
        } catch (errorJSON) {
          errorStringed = `Unstringable error. Reason: ${errorJSON}`;
        }

        return errorStringed;
      },
      async getHosts() {
        try {
          const serversList =
            await self.app.peertubeHandler.api.proxy.allServers();
          return Promise.resolve(serversList);
        } catch (error) {
          return Promise.reject(error);
        }
      },

      async diagnoseSingleServer(serverName) {
        let reachableFlag = true;
        let gotVideosFlag = true;
        let masterPlaylistFlag = true;

        let videosList = [];
        let masterPlaylist = '';

        const responseStart = performance.now();

        try {
          const serverStatistics =
            await self.app.peertubeHandler.api.videos.serverStatistics(
              serverName,
            );

          serversObject[serverName].reachability = {
            reachable: true,
            time: `${((performance.now() - responseStart) / 1000).toFixed(
              2,
            )} s.`,
          };
        } catch (error) {
          serversObject[serverName].reachability = {
            reachable: false,
            error: actions.stringifyErrorSafe(error),
            time: `${((performance.now() - responseStart) / 1000).toFixed(
              2,
            )} s.`,
          };

          serversObject[serverName].videos = {
            gotVideos: false,
            error: 'Server unreachable, thus this step is skipped.',
          };

          serverObjectsWithErrors[serverName] = true;
          reachableFlag = false;
        }

        if (reachableFlag) {
          try {
            const serverResponse =
              await self.app.peertubeHandler.api.videos.latestVideos(
                serverName,
              );

            videosList = (serverResponse || {}).data;

            if (!videosList) {
              serversObject[serverName].videos = {
                gotVideos: false,
                error: `Wrong response from server: no video list. Response: ${actions.stringifyErrorSafe(
                  serverResponse,
                )}`,
              };

              serverObjectsWithErrors[serverName] = true;
              gotVideosFlag = false;
            }
          } catch (error) {
            serversObject[serverName].videos = {
              gotVideos: false,
              error: actions.stringifyErrorSafe(error),
            };

            serverObjectsWithErrors[serverName] = true;
            gotVideosFlag = false;
          }
        }

        if (gotVideosFlag && videosList[0]) {
          try {
            const videoObject = videosList[0];

            const resultInfo =
              await self.app.peertubeHandler.api.videos.getDirectVideoInfo(
                { id: videoObject.uuid },
                { host: serverName },
              );

            masterPlaylist = deep(
              resultInfo,
              'streamingPlaylists.0.playlistUrl',
            );

            if (!masterPlaylist) {
              serversObject[serverName].videos = {
                gotVideos: false,
                error: `Error getting master playlist - no information. Url: ${
                  resultInfo.url || 'No video url'
                }`,
              };

              serverObjectsWithErrors[serverName] = true;
              masterPlaylistFlag = false;
            }
          } catch (error) {
            serversObject[serverName].videos = {
              gotVideos: false,
              error: actions.stringifyErrorSafe(error),
            };

            serverObjectsWithErrors[serverName] = true;
            masterPlaylistFlag = false;
          }
        }

        if (masterPlaylistFlag && masterPlaylist) {
          try {
            const masterPlaylistFile = await axios.get(masterPlaylist);

            serversObject[serverName].videos = {
              gotVideos: true,
            };
          } catch (error) {
            serversObject[serverName].videos = {
              gotVideos: false,
              error: actions.stringifyErrorSafe(error),
            };

            serverObjectsWithErrors[serverName] = true;
          }
        }

        serversObject[serverName].finished = true;
        serversCounter++;
        renders.diagnoseProgress({});

        return Promise.resolve();
      },
    };

    var events = {
      eventGetHosts() {
        diagnosticsInProgress = true;

        return actions
          .getHosts()
          .then((res) => {
            const formattedServersList = Object.values(res).flat();

            serversAmount = formattedServersList.length;
            serversCounter = 0;

            formattedServersList.forEach((server) => {
              serversObject[server] = {};
            });

            renders.mainBody({});

            return formattedServersList;
          })
          .then((servers) =>
            Promise.allSettled(
              servers.map((server) => actions.diagnoseSingleServer(server)),
            ),
          )
          .then(async () => {
            if (self.app.user.address.value) {
              try {
                const auth = await self.app.peertubeHandler.api.user.me();

                serverAuth = {
                  gotAuth: true,
                  host: self.app.peertubeHandler.active(),
                };
              } catch (error) {
                serverAuth = {
                  gotAuth: false,
                  error: actions.stringifyErrorSafe(error),
                  host: self.app.peertubeHandler.active(),
                };
              }
            }
          })
          .then(() => {
            self.app.Logger.error({
              err: 'DIAGNOSE_COMPLETED',
              code: 100,
              payload: {
                result: JSON.stringify(serversObject),
                authResult: JSON.stringify(serverAuth),
                agentStats: JSON.stringify(agentStats),
                address: self.app.user.address.value || 'Unauthorized user',
                timeZone,
              },
              level: 'diagnostics',
            });
            renders.tableResult({});
          })
          .catch((err) => {
            renders.mainError({ err, title: 'Unable to get servers list.' });

            const errorBody = actions.stringifyErrorSafe(err);

            self.app.Logger.error({
              err: 'DIAGNOSE_UNREACHED_SERVERS',
              code: 101,
              payload: errorBody,
              level: 'diagnostics',
            });
          });
      },
    };

    var renders = {
      mainError({ err = {}, title = 'Default error.' }) {
        const errorStringed = actions.stringifyErrorSafe(err);

        self.shell(
          {
            name: 'mainError',
            el: el.diagnoseBody,
            data: {
              errorStringed,
              title,
            },
          },
          (p) => {},
        );
      },

      mainBody({}) {
        self.shell(
          {
            name: 'mainBody',
            el: el.diagnoseBody,
            data: {},
          },
          (p) => {
            el.diagnoseProgress = p.el.find('.progress');
            el.resultTable = p.el.find('.result');
          },
        );
      },

      diagnoseProgress({}) {
        if (!el.diagnoseProgress) return;

        const lastPendingServer = Object.keys(serversObject).findLast(
          (server) => !serversObject[server].finished,
        );

        self.shell(
          {
            name: 'diagnoseProgress',
            el: el.diagnoseProgress,
            data: {
              completed: serversCounter,
              total: serversAmount,
              lastPendingServer,
            },
          },
          (p) => {},
        );
      },

      tableResult({}) {
        if (!el.resultTable) return;

        const serversWithErrors = Object.keys(serverObjectsWithErrors);

        self.shell(
          {
            name: 'resultTable',
            el: el.resultTable,
            data: {
              serversWithErrors,
              serversObject,
              serverAuth: self.app.user.address.value ? serverAuth : '',
            },
          },
          (p) => {},
        );
      },
    };

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.startDiagnoseButton.on('click', function () {
        if (diagnosticsInProgress) return;

        const loadingButton = $(this);

        loadingButton.addClass('disabled');
        loadingButton.removeClass('orange');
        loadingButton.attr('disabled', true);

        events.eventGetHosts().finally(() => {
          loadingButton.removeClass('disabled');
          loadingButton.addClass('orange');
        });
      });
    };

    return {
      primary: primary,

      getdata: function (clbk, p) {
        ed = p.settings.essenseData;

        try {
          timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (error) {
          timeZone = 'Unable to identify';
        }

        const userAgent = navigator.userAgent;

        const agentMeter = new UAParser(userAgent);

        agentStats = {
          browser: agentMeter.getBrowser(),
          CPU: agentMeter.getCPU(),
          device: agentMeter.getDevice(),
          engine: agentMeter.getEngine(),
          OS: agentMeter.getOS(),
          result: agentMeter.getResult(),
        };

        var data = {
          ed,
          timeZone,
          agentStats,
        };

        clbk(data);
      },

      destroy: function () {
        ed = {};
        el = {};
      },

      init: function (p) {
        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);
        el.diagnoseBody = el.c.find('.diagnoseBody');
        el.startDiagnoseButton = el.c.find('.startDiagnoseButton');

        initEvents();

        p.clbk(null, p);
      },
    };
  };

  self.run = function (p) {
    var essense = self.addEssense(essenses, Essense, p);

    self.init(essense, p);
  };

  self.stop = function () {
    _.each(essenses, function (essense) {
      window.rifticker.add(() => {
        essense.destroy();
      });
    });
  };

  return self;
})();

if (typeof module != 'undefined') {
  module.exports = diagnosticsPage;
} else {
  app.modules.diagnosticsPage = {};
  app.modules.diagnosticsPage.module = diagnosticsPage;
}
