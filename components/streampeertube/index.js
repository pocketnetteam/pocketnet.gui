var streampeertube = (function () {
  var self = new nModule();

  var essenses = {};

  var ed = {};

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el;

    var actions = {
      
    };

    var events = {
  
    };

    var renders = {};

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {};

    return {
      primary: primary,

      getdata: function (clbk, p) {
        ed = p.settings.essenseData;

        actions = ed.actions;

        actions.preloader = function(show){

          if(!el.c) return
      
          if(show){
            el.c.addClass('loading')
          }
          else
          {
            el.c.removeClass('loading')
          }
      
          
        };

        var data = {};

        clbk(data);
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
                if (response === 'error') {
                  sitemessage('Uploading error');

                  return;
                }

                console.log('Finished', response);

                actions.added(response.video);
                actions.preloader(false);
                // wndObj.close();
              };

              // el.uploadProgress.removeClass('hidden');
              self.app.peertubeHandler.startLive(filesWrittenObject);
              actions.preloader(true);
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
