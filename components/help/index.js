var help = (function () {
  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el,
      cpage,
      external,
      c = {};

    c.roadmap = [
      {
        d: 'February 2019',
        n: 'Social Network Beta Test Starts',
        r: true,
      },
      {
        d: 'March 2019',
        n: 'Windows Desktop App',
        r: true,
      },
      {
        d: 'March 2019',
        n: 'Search users, posts',
        r: true,
      },
      {
        d: 'July 2019',
        n: 'Linux Desktop App',
        r: true,
      },

      {
        d: 'July 2019',
        n: 'Android App',
        r: true,
      },

      {
        d: 'August 2019',
        n: 'Search by tags, recommended users, poll transactions',
        r: true,
      },

      {
        d: 'August 2019',
        n:
          'Personal link ' +
          self.app.options.url +
          '/username plus history of personal posts and ability to search users’ posts (decentralized free blog hosting on ' +
          self.app.meta.fullname +
          ' blockchain)',
        r: true,
      },

      {
        d: 'June 2020',
        n: 'Running a node from the desktop app',
        r: true,
      },
      {
        d: 'August 2020',
        n: 'Pocketcoin listed on two exchanges: BTCPOP and Mercatox',
        r: true,
      },
      {
        d: 'January 2021',
        n:
          'Full decentralization: all apps can speak directly to the nodes, desktop app can work without the website ' +
          self.app.options.url +
          '',
        r: true,
      },
      {
        d: 'March 2021',
        n: 'PKOIN listed on Bilaxy, Digifinex, Bitforex',
        r: true,
      },

      {
        d: 'June 2021',
        n:
          'Integration of PeerTube into ' +
          self.app.meta.fullname +
          ', upload of videos and live streams',
        r: true,
      },
      {
        d: 'July 2021',
        n: 'Boost posts for Pocketcoin',
        r: false,
      },
      {
        d: 'August 2021',
        n: 'Peer-to-peer encrypted chat, including group chat',
        r: true,
      },
      {
        d: 'August 2021',
        n: 'Livestream Pocketcoin donations',
        r: true,
      },
      {
        d: 'September 2021',
        n: 'Rewrite of the backend to move to sqlite from Reindexer to make the node light on RAM use',
        r: false,
      },
      {
        d: 'December 2021',
        n: 'Decentralized alternative to adwords advertising through smart contracts',
        r: false,
      },
      {
        d: 'December 2021',
        n: 'Decentralized reputation platform and crypto store',
        r: false,
      },
      {
        d: 'January 2022',
        n: '' + self.app.meta.fullname + ' NFT 3.0',
        r: false,
      },
      {
        d: '2022',
        n:
          'Ability to fork Pocketcoin to create a diverse set of Dapps for users using ' +
          self.app.meta.fullname +
          ' platform i.e. ' +
          self.app.meta.fullname +
          ' as an alternative Appstore',
        r: false,
      },
    ];

    c.pkoin = {
      loading: true,
      emission: {
        api: 'emission',
        result: null,
      },

      blockhash: {
        api: 'blockhash/12000.json',
        result: {},
      },

      emission2: {
        api: 'emission/1000000.json',
        result: {},
      },

      topaddresses: {
        api: 'topaddresses/10.json',
        result: [],
      },
    };

    c.topaddresses = [];

    var actions = {
      menuitem: function (page) {
        if (external) {
          external.destroy();
          external = null;
        }

        el.menuitem.removeClass('active');

        el.c.find('.tipitem[page="' + page + '"]').addClass('active');

        cpage = page;

        state.save();

        if (renders[page]) {
          renders[page](page);
        } else {
          renders.page(page);
        }
      },
    };

    var events = {
      menuitem: function () {
        var page = $(this).attr('page');

        if(page)
          actions.menuitem(page);
      },
    };

    var renders = {
      applications: function (page) {
        this.page(page, function (_el) {
          self.nav.api.load({
            open: true,
            id: 'applications',
            el: _el.find('.applicationsWrapper'),

            clbk: function (e, p) {
              external = p;
            },
          });
        });
      },

      faq: function (page) {
        this.page(page, function (_el) {
          self.nav.api.load({
            open: true,
            id: 'faq',
            el: _el.find('.faqWrapper'),
            clbk: function (e, p) {
              external = p;
            },
          });
        });
      },
      guides: function (page) {
        this.page(page, function (_el) {
          _el.find('.postGuideButton').on('click', function () {
            const postId = $(this).attr('post');

            _el
              .find('.lenta')
              .html(
                '<div class="preloaderwr"><div class="preloader5"><img src="./img/three-dots.svg"/></div></div>',
              );
            self.app.platform.papi.post(
              postId,
              _el.find('.lenta'),
              function (e, p) {
                external = p;
              },
            );
          });

          const defaultId =
            'd85a0e1146e89ad6303cc8a081f1fb04da01ab21af913fa9e762de0d7972eaa6';

          self.app.platform.papi.post(
            defaultId,
            _el.find('.lenta'),
            function (e, p) {
              external = p;
            },
          );
        });
      },

      videos: function (page) {
        this.page(page, function (_el) {
          self.nav.api.load({
            open: true,
            id: 'lenta',
            el: _el.find('.lenta'),
            animation: false,

            mid: 'videos',

            essenseData: {
              byauthor: true,
              /*authAction : function(event){

								actions.join(event)

							},*/

              notscrollloading: true,
              nocomments: true,

              txids: [
                '9f73a1efbfb4b0feb88c134740afa0ab293f8072a80ecbe9fe65ed85591910e6',
                'ad9067c72a7be97c1752a00566940f372e5b526291278cf9bc203b99f81bbaf0',
                'df4064b9e2c8b311fd097804f36802ceb68337dca396bfdea732c0f94c977a3a',
              ],
            },

            clbk: function (e, p) {
              external = p;
            },
          });
        });
      },

      page: function (page, clbk) {
        self.shell(
          {
            name: page,
            el: el.page,
            data: {
              c: c,
            },
          },
          function (_p) {
            if (clbk) clbk(_p.el);
          },
        );
      },

      pkoin: function (page) {
        this.page(page, function (_el) {
          c.pkoin.loading = true;

          console.log('this.page', _el);
          var explorerBase = 'https://explorer.pocketnet.app/rest/';

          var endpoints = [
            c.pkoin.blockhash.api,
            c.pkoin.emission.api,
            c.pkoin.emission2.api,
            c.pkoin.topaddresses.api,
          ];

          var fetches = endpoints.map(function (point) {
            return fetch(explorerBase + point);
          });

          Promise.all(fetches)
            .then(function (responses) {
              return Promise.all(
                responses.map(function (response, idx) {
                  if (idx === 0) {
                    return response.text();
                  } else {
                    return response.json();
                  }
                }),
              );
            })
            .then(function (result) {
              c.pkoin.blockhash.result = JSON.parse(result[0]);
              c.pkoin.emission.result = result[1];
              c.pkoin.emission2.result = result[2];
              c.pkoin.topaddresses.result = result[3];

              c.pkoin.loading = false;

              renders.page('pkoin');

              _el.find('.copyaddress').on('click', function () {
                copyText($(this).find('.adr'));

                sitemessage(self.app.localization.e('waddresswascop'));
              });
            });
        });
      },
    };

    var state = {
      save: function () {
        self.app.nav.api.history.addParameters({
          page: cpage,
        });
      },
      load: function () {
        cpage = parameters().page || 'faq';
      },
    };

    var initEvents = function () {
      el.menuitem.on('click', events.menuitem);

      el.caption.find('.checkversion').on('click', function () {

        if (typeof _Electron != 'undefined') {
          
          el.caption.find('.checking').addClass('active');

          var electron = require('electron');

          setTimeout(function () {
            electron.ipcRenderer.send('electron-checkForUpdates');

            electron.ipcRenderer.on('updater-message', function (event, data) {
              if (
                data.msg == 'update-downloaded' ||
                data.msg == 'update-not-available' ||
                ((data.linux || data.macos) && data.msg == 'update-available')
              )
                el.caption.find('.checking').removeClass('active');
            });
          }, 100);
        }
      });
    };

    return {
      primary: primary,

      getdata: function (clbk) {
        state.load();

        var version = window.packageversion;

        /*if (typeof _Electron != 'undefined') {
          var electron = require('electron');

          version = electron.remote.app.getVersion();
        }*/

        var data = {
          version: version,
        };

        clbk(data);
      },

      destroy: function () {
        if (external) {
          external.destroy();

          external = null;
        }

        el = {};
      },

      init: function (p) {
        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);
        el.page = el.c.find('.page');
        el.menuitem = el.c.find('.tipitem');

        el.caption = el.c.find('.bgCaption');

        initEvents();

        actions.menuitem(cpage);

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
  module.exports = help;
} else {
  app.modules.help = {};
  app.modules.help.module = help;
}
