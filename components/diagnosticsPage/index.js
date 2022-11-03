var diagnosticsPage = (function () {
  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el, ed;

    var serversObject = {};
    var serverObjectsWithErrors = {};

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
        try {
          const serverStatistics =
            await self.app.peertubeHandler.api.videos.serverStatistics(
              serverName,
            );

          serversObject[serverName].reachability = {
            reachable: true,
          };
        } catch (error) {
          serversObject[serverName].reachability = {
            reachable: false,
            error: actions.stringifyErrorSafe(error),
          };

          serverObjectsWithErrors[serverName] = true;
        }

        serversCounter++;
        renders.diagnoseProgress({});

        return Promise.resolve();
      },
    };

    var events = {
      eventGetHosts() {
        if (diagnosticsInProgress) return;

        diagnosticsInProgress = true;

        actions
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
          .then(() => {
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
          })
          .finally(() => {
            diagnosticsInProgress = false;
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

        self.shell(
          {
            name: 'diagnoseProgress',
            el: el.diagnoseProgress,
            data: {
              completed: serversCounter,
              total: serversAmount,
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
      el.startDiagnoseButton.on('click', () => events.eventGetHosts());
    };

    return {
      primary: primary,

      getdata: function (clbk, p) {
        ed = p.settings.essenseData;

        var data = {
          ed,
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
      window.requestAnimationFrame(() => {
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
