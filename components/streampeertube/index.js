var streampeertube = (function () {
  var self = new nModule();

  var essenses = {};

  var ed = {};

  var streamCreated = false;

  var streamInfo = null;

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el;

    var wnd;
    var wndObj;

    var actions = {};

    var events = {
      createStream(clbk = () => {}) {
        if (streamCreated) {
          streamCreated = false;

          return wndObj.close();
        }

        var contentSection = wnd.find('.content-section');
        var preloaderSection = wnd.find('.preloader-section');

        el.streamButton.addClass('disabledButton');
        el.streamButton.text('Starting...');

        contentSection.addClass('hidden');
        preloaderSection.removeClass('hidden');

        var videoWallpaperFile = el.videoWallpaper.prop('files');

        var videoName = wnd.find('.upload-video-name').val();
        var nameError = wnd.find('.name-type-error');

        var filesWrittenObject = {};

        filesWrittenObject.name = videoName;

        var options = {
          type: 'liveStream',
        };

        self.app.peertubeHandler.api.videos
          .live(filesWrittenObject, options)
          .then((response) => {
            var resultElement = wnd.find('.result-section');

            self.app.peertubeHandler.api.videos
              .getLiveInfo({ id: response.uuid }, { host: response.host })
              .then((res) => {
                preloaderSection.addClass('hidden');

                if (response.error) {
                  var error = deep(response, 'error.responseJSON.errors') || {};

                  var message = (Object.values(error)[0] || {}).msg;

                  sitemessage(message || 'Uploading error');

                  return;
                }

                streamCreated = true;

                resultElement.removeClass('hidden');
                el.streamButton.html(
                  '<i class="fas fa-check"></i> Stream Created',
                );
                el.streamButton.removeClass('disabledButton');
                el.streamButton.addClass('successButton');

                var rtmpInput = resultElement.find('.result-video-rtmp');
                var streamKeyInput = resultElement.find(
                  '.result-video-streamKey',
                );

                rtmpInput.val(res.rtmpUrl);
                streamKeyInput.val(res.streamKey);

                actions.added(response.formattedLink);

                clbk();
              });
          });
      },
    };

    var renders = {};

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.c.find('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        maxWidth: 600,
        zIndex: 1006,
        position: 'bottom',
      });

      el.copyButton.each((index, button) => {
        var buttonElement = $(button);

        var inputClass = buttonElement.attr('linkType');

        buttonElement.on('click', () => {
          var linkValue = el.c.find(`.${inputClass}`);

          copyText(linkValue);

          sitemessage('Link was copied to clipboard');
        });
      });

      el.c.find('.closewindowaction').on('click', function () {
        wndObj.close();
      });
    };

    return {
      primary: primary,

      getdata: function (clbk, p) {
        ed = p.settings.essenseData;

        actions = ed.actions;

        if (self.app.peertubeHandler.checklink(ed.currentLink)) {
          var parsedLink = self.app.peertubeHandler.parselink(ed.currentLink);
          var videoId = parsedLink.id;

          if (!videoId) {
            var data = {};

            clbk(data);
          } else {
            self.app.peertubeHandler.api.videos
              .getLiveInfo(
                { id: videoId },
                {
                  host: parsedLink.host,
                },
              )
              .then((res) => {
                if (res.error) {
                  var error = deep(res, 'error.responseJSON.errors') || {};

                  var message = (Object.values(error)[0] || {}).msg;

                  sitemessage(message || 'Server error');
                } else {
                  streamCreated = true;

                  streamInfo = {
                    rtmpUrl: res.rtmpUrl,
                    streamKey: res.streamKey,
                  };
                }

                var data = {};

                clbk(data);
              });
          }
        } else {
          var data = {};

          streamInfo = null;
          streamCreated = false;

          clbk(data);
        }
      },

      destroy: function () {
        el = {};
      },

      init: function (p) {
        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);
        el.videoInput = el.c.find('.upload-video-file');
        el.videoWallpaper = el.c.find('.upload-video-wallpaper');
        el.videoError = el.c.find('.file-type-error');
        el.wallpaperError = el.c.find('.wallpaper-type-error');
        el.uploadProgress = el.c.find('.upload-progress-container');
        el.contentSection = el.c.find('.content-section');
        el.resultSection = el.c.find('.result-section');
        el.dateInput = el.c.find('#dtBox');

        el.streamButton = el.c.find('.streamButton');

        el.copyButton = el.c.find('.copyStreamInfo');

        if (streamInfo) {
          streamCreated = true;
          el.contentSection.addClass('hidden');
          el.resultSection.removeClass('hidden');

          el.resultSection.find('.result-video-rtmp').val(streamInfo.rtmpUrl);
          el.resultSection
            .find('.result-video-streamKey')
            .val(streamInfo.streamKey);

          el.streamButton.html('<i class="fas fa-check"></i> Stream Created');
          el.streamButton.addClass('successButton');

          initEvents();

          p.clbk(null, p);
        } else {
          events.createStream(() => {
            initEvents();

            p.clbk(null, p);
          });
        }
      },

      wnd: {
        header: '',

        close: function () {
          if (ed.closeClbk) {
            ed.closeClbk();
          }
        },
        postRender: function (_wnd, _wndObj, clbk) {
          wndObj = _wndObj;
          wnd = _wnd;

          if (clbk) {
            clbk();
          }
        },
        offScroll: true,
        noInnerScroll: true,
        class: 'streampeertube',
        allowHide: true,
        noCloseButton: true,
        noButtons: true,

        swipeClose: true,
        swipeCloseDir: 'right',
        swipeMintrueshold: 30,
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
  module.exports = streampeertube;
} else {
  app.modules.streampeertube = {};
  app.modules.streampeertube.module = streampeertube;
}
