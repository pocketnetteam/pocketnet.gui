var videoCabinet = (function () {
  var self = new nModule();

  var essenses = {};

  var videoServers = {};

  var peertubeServers = {};

  var perServerCounter = 10;

  var startingPosition = 0;

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el;

    var actions = {
      async getHosts() {
        const serverStructureHosts = await self.app.peertubeHandler.api.proxy
          .roys()
          .catch(() => ({}));

        Object.entries(serverStructureHosts).forEach(
          ([name, bestHost]) =>
            (videoServers[name] = { ...videoServers[name], bestHost }),
        );

        return Promise.resolve(serverStructureHosts);
      },

      async getVideos(server) {
        const options = {
          start: peertubeServers[server].start,
          count: perServerCounter,
        };

        return self.app.peertubeHandler.api.videos
          .getMyAccountVideos(options, {
            host: server,
          })
          .then((data = []) => {
            peertubeServers[server].start += perServerCounter;
            peertubeServers[server].videos = [...data];

            return data;
          })
          .catch(() => {
            sitemessage(`Error loading ${server}`);
            return [];
          });
      },
    };

    var events = {};

    var renders = {
      videos() {
        const videos = Object.values(peertubeServers)
          .map((value) => value.videos)
          .filter((video) => video)
          .flat();

        self.shell(
          {
            name: 'videoList',
            el: el.videoContainer,
            data: {
              videos,
            },
          },
          function (p) {},
        );
      },

      quota() {
        self.shell(
          {
            name: 'quota',
            el: el.quotaContainer,
            data: {},
          },
          function (p) {},
        );
      },
    };

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {};

    return {
      primary: primary,

      getdata: function (clbk) {
        var data = {};

        actions
          .getHosts()
          .then((hosts = {}) => {
            const servers = Object.values(hosts).flat();

            servers.forEach(
              (server) =>
                (peertubeServers[server] = {
                  videos: null,
                  start: 0,
                }),
            );

            const serverPromises = servers.map((server) =>
              actions.getVideos(server),
            );

            return Promise.allSettled(serverPromises);
          })
          .then((res) => {
            clbk(data);
          })
          .catch(() => clbk(data));
      },

      destroy: function () {
        el = {};
      },

      init: function (p) {
        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);

        el.videoContainer = el.c.find('.videoContainer');
        el.quotaContainer = el.c.find('.quotaContainer');

        initEvents();

        renders.videos();
        renders.quota();

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
      essense.destroy();
    });
  };

  return self;
})();

if (typeof module != 'undefined') {
  module.exports = videoCabinet;
} else {
  app.modules.videoCabinet = {};
  app.modules.videoCabinet.module = videoCabinet;
}
