var videoCabinet = (function () {
  var self = new nModule();

  var essenses = {};

  var videoServers = {};

  var peertubeServers = {};

  var userQuota = {};

  var perServerCounter = 10;

  var startingPosition = 0;

  var external = null;

  const ROTATE_ONE_PERCENTAGE = 3.6;
  const HALF_CIRCLE_ROTATE_PERCENTAGE = 50;
  const HUDRED_PERC = 100;
  const LAZYLOAD_PERCENTAGE = 0.9;
  const POSITIVE_STATUS = 'fulfilled';

  let newVideosAreUploading = false;

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
          .then((data = {}) => {
            peertubeServers[server].start += perServerCounter;
            peertubeServers[server].videos.push(...(data.data || []));
            peertubeServers[server].total = data.total || 0;
            peertubeServers[server].isFull =
              peertubeServers[server].start > data.total;

            return data;
          })
          .catch(() => {
            sitemessage(`Error loading ${server}`);
            return [];
          });
      },

      async getQuota() {
        return self.app.peertubeHandler.api.videos
          .getQuotaStatus()
          .then((res) => (userQuota = { ...res }));
      },
    };

    var events = {
      onPageScroll() {
        const scrollProgress = el.windowElement.scrollTop() / el.c.height();

        if (scrollProgress >= LAZYLOAD_PERCENTAGE && !newVideosAreUploading) {
          const activeServers = Object.keys(peertubeServers).filter(
            (server) => !(peertubeServers[server] || {}).isFull,
          );

          if (!activeServers.length) return;

          events.getAdditionalVideos(activeServers);
          newVideosAreUploading = true;
        }
      },

      getAdditionalVideos(activeServers = []) {
        if (!activeServers.length) return;

        const videoProtionElement = $(
          '<div class="videoPage"><div class="preloaderwr"><div class="preloader5"><span></span><span></span><span></span></div></div></div>',
        );

        el.videoContainer.append(videoProtionElement);

        return Promise.allSettled(
          activeServers.map((server) => actions.getVideos(server)),
        ).then((data = []) => {
          const newVideos = data
            .filter((item) => item.status === POSITIVE_STATUS)
            .map((item) => item.value.data)
            .flat();
          newVideosAreUploading = false;

          renders.videos(newVideos, videoProtionElement);
        });
      },
    };

    var renders = {
      videos(videosForRender, videoProtionElement) {
        const videos =
          videosForRender ||
          Object.values(peertubeServers)
            .map((value) => value.videos)
            .filter((video) => video)
            .flat();

        self.shell(
          {
            name: 'videoList',
            el: videoProtionElement,
            data: {
              videos,
            },
          },
          (p) => {
            p.el.find('.tooltip').tooltipster({
              theme: 'tooltipster-light',
              maxWidth: 600,
              zIndex: 20,
            });
            const videoElementsWrapper = p.el.find('.videosWrapper');
          },
        );
      },

      quota() {
        self.shell(
          {
            name: 'quota',
            el: el.quotaContainer,
            data: {
              userQuota,
            },
          },
          (p) => {
            const freePercentage = (
              (userQuota.videoQuotaRemainingDaily / userQuota.videoQuotaDaily) *
              HUDRED_PERC
            ).toFixed(0);

            const leftPercentageCircle = p.el.find('.left .progress');
            const rightPercentageCircle = p.el.find('.right .progress');

            if (freePercentage >= HALF_CIRCLE_ROTATE_PERCENTAGE) {
              rightPercentageCircle.css(
                'transform',
                `rotate(${
                  (freePercentage - HALF_CIRCLE_ROTATE_PERCENTAGE) *
                  ROTATE_ONE_PERCENTAGE
                }deg)`,
              );
              leftPercentageCircle.css('transform', 'rotate(180deg)');
            } else {
              leftPercentageCircle.css(
                'transform',
                `rotate(${freePercentage * ROTATE_ONE_PERCENTAGE}deg)`,
              );
              rightPercentageCircle.css('transform', 'rotate(0deg)');
            }
          },
        );
      },

      streamPage(p = {}) {
        const typeDictionary = {
          addVideo: 'uploadpeertube',
          addStream: 'streampeertube',
        };

        const elName = typeDictionary[p.type];

        if (external && external.id == elName) {
          external.container.show();

          return;
        }

        if (external) external.container.close();

        self.nav.api.load({
          open: true,
          id: elName,
          inWnd: true,

          history: false,

          essenseData: {
            storage: p.storage,
            value: p.value,
            currentLink: '',
            actions: {
              added: function () {
                debugger;
                actions.getVideos().then(() => renders.videos());
              },
            },

            closeClbk: function () {
              external = null;
            },
          },

          clbk: function (p, element) {
            external = element;

            videoUploadData = element.essenseData;
          },
        });
      },
    };

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.windowElement.on('scroll', events.onPageScroll);
      el.videoButtons.on('click', function () {
        const type = $(this).attr('rendersElement');

        renders.streamPage({ type });
      });
    };

    return {
      primary: primary,

      getdata: function (clbk) {
        var data = {};
        clbk(data);
      },

      destroy: function () {
        el.windowElement.off('scroll', events.onPageScroll);

        el = {};
      },

      init: function (p) {
        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);

        el.videoContainer = el.c.find('.videoContainer');
        el.quotaContainer = el.c.find('.quotaContainer');
        el.videoButtons = el.c.find('.videoActiveButton');

        el.windowElement = $(window);

        initEvents();

        const videoProtionElement = $(
          '<div class="videoPage"><div class="preloaderwr"><div class="preloader5"><span></span><span></span><span></span></div></div></div>',
        );

        el.videoContainer.append(videoProtionElement);

        actions
          .getHosts()
          .then((hosts = {}) => {
            const servers = Object.values(hosts).flat();

            servers.forEach(
              (server) =>
                (peertubeServers[server] = {
                  videos: [],
                  start: 0,
                }),
            );

            const serverPromises = servers.map((server) =>
              actions.getVideos(server),
            );

            return Promise.allSettled(serverPromises);
          })
          .then(() => renders.videos(null, videoProtionElement))
          .catch(() => renders.videos(null, videoProtionElement));

        actions
          .getQuota()
          .then(() => renders.quota())
          .catch(() => renders.quota());

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
