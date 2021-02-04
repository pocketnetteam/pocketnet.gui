var streampeertube = (function () {
  var self = new nModule();

  var essenses = {};

  var ed = {};

  var streamCreated = false;

  var streamInfo = null;

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el;

    var actions = {};

    var events = {};

    var renders = {};

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.videoWallpaper.change(function (evt) {
        var fileName = evt.target.files[0].name;

        el.wallpaperError.text(
          fileName.slice(0, 20) + (fileName.length > 20 ? '...' : ''),
        );
        el.wallpaperError.removeClass('error-message');
      });
    };

    return {
      primary: primary,

      getdata: function (clbk, p) {
        ed = p.settings.essenseData;

        actions = ed.actions;

        if (ed.currentLink.includes('peertube')) {
          var videoId = ed.currentLink.split('/').pop();

          if (!videoId) {
            var data = {};

            clbk(data);
          } else {
            
            self.app.peertubeHandler.getLiveInfo(videoId, {
              successFunction: (res) => {
                console.log(clbk);
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
              },
            });
          }
        } else {

          var data = {};

          streamInfo = null;
          streamCreated = false;

          clbk(data);
        }

        // var data = {};

        //   streamInfo = null;
        //   streamCreated = false;

        //   clbk(data);
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

        if (streamInfo) {
          streamCreated = true;
          el.contentSection.addClass('hidden');
          el.resultSection.removeClass('hidden');

          el.resultSection.find('.result-video-rtmp').val(streamInfo.rtmpUrl);
          el.resultSection
            .find('.result-video-streamKey')
            .val(streamInfo.streamKey);

          var closeButton = p.el.find(`.button.close`);
          console.log('Close', closeButton);

          closeButton.html('<i class="fas fa-check"></i> Stream Created');
          closeButton.addClass('successButton');
        }

        initEvents();

        p.clbk(null, p);
      },

      wnd: {
        header: '',
        buttons: {
          close: {
            class: 'close',
            html: '<i class="fas fa-broadcast-tower"></i> Go live',
            fn: function (wnd, wndObj) {
              if (streamCreated) {
                streamCreated = false;

                return wndObj.close();
              }

              var closeButton = wnd.find('.button.close');
              var contentSection = wnd.find('.content-section');
              var preloaderSection = wnd.find('.preloader-section');

              closeButton.addClass('disabledButton');
              closeButton.text('Starting...');

              contentSection.addClass('hidden');
              preloaderSection.removeClass('hidden');

              var videoWallpaperFile = el.videoWallpaper.prop('files');

              var videoName = wnd.find('.upload-video-name').val();
              var nameError = wnd.find('.name-type-error');

              nameError.text('');

              var filesWrittenObject = {};

              if (videoWallpaperFile[0]) {
                if (
                  videoWallpaperFile[0].type !== 'image/jpeg' &&
                  videoWallpaperFile[0].type !== 'image/jpg'
                ) {
                  el.wallpaperError.text(
                    'Incorrect wallpaper format. Supported: .jpg, .jpeg',
                  );
                  el.wallpaperError.addClass('error-message');

                  return;
                }

                filesWrittenObject.image = videoWallpaperFile[0];
              }
              if (!videoName) {
                nameError.text('Name is empty');

                return;
              }

              filesWrittenObject.name = videoName;

              filesWrittenObject.uploadFunction = function (percentComplete) {
                var formattedProgress = percentComplete.toFixed(2);

                el.uploadProgress
                  .find('.upload-progress-bar')
                  .css('width', formattedProgress + '%');
                el.uploadProgress
                  .find('.upload-progress-percentage')
                  .text(formattedProgress + '%');
              };

              filesWrittenObject.successFunction = function (response) {
                var resultElement = wnd.find('.result-section');

                preloaderSection.addClass('hidden');

                if (response.error) {
                  var error = deep(response, 'error.responseJSON.errors') || {};

                  var message = (Object.values(error)[0] || {}).msg;

                  sitemessage(message || 'Uploading error');
                  contentSection.removeClass('hidden');
                  closeButton.removeClass('disabledButton');
                  closeButton.html(
                    '<i class="fas fa-broadcast-tower"></i> Go Live',
                  );

                  return;
                }

                streamCreated = true;

                resultElement.removeClass('hidden');
                closeButton.html('<i class="fas fa-check"></i> Stream Created');
                closeButton.removeClass('disabledButton');
                closeButton.addClass('successButton');

                var rtmpInput = resultElement.find('.result-video-rtmp');
                var streamKeyInput = resultElement.find(
                  '.result-video-streamKey',
                );

                rtmpInput.val(response.rtmpUrl);
                streamKeyInput.val(response.streamKey);

                actions.added(response.video);
                actions.preloader(false);
                // wndObj.close();
              };

              // el.uploadProgress.removeClass('hidden');
              self.app.peertubeHandler.startLive(filesWrittenObject);
            },
          },
        },
        close: function () {
          if (ed.closeClbk) {
            ed.closeClbk();
          }
        },
        success: function (_wnd, _wndObj) {
          wndObj = _wndObj;
          wnd = _wnd;
        },
        offScroll: true,
        noInnerScroll: true,
        class: 'streampeertube',

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
