var diagnosticsPage = (function () {
  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el, ed;

    var serversObject = {};

    var diagnosticsInProgress = false;

    var actions = {
      async getHosts() {	
        try {
          const serversList =
            await self.app.peertubeHandler.api.proxy.allServers();
          return Promise.resolve(serversList);
        } catch (error) {
          return Promise.reject(error);
        }
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

            formattedServersList.forEach((server) => {
              serversObject[server] = {};
            });

            return formattedServersList;
          })
          .then((res) => {
          })
          .catch((err) => {
            renders.mainError({ err });

            let errorBody;

            try {
              errorBody = JSON.stringify(err, Object.getOwnPropertyNames(err));
            } catch (errorJSON) {
              errorBody = `Unable to stringify. Reason: ${errorJSON}`;
            }

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
      mainError({ err = {} }) {
        let errorStringed;

        try {
          errorStringed = JSON.stringify(err, Object.getOwnPropertyNames(err));
        } catch (errorJSON) {
          errorStringed = `Unstringable error. Reason: ${errorJSON}`;
        }

        self.shell(
          {
            name: 'mainError',
            el: el.diagnoseBody,
            data: {
              errorStringed,
            },
          },
          (p) => {},
        );
      },

      mainBody() {},
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
