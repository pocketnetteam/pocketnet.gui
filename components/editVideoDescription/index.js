var editVideoDescription = (function () {
  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el, ed;

    var actions = {};

    var events = {};

    var renders = {};

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.acceptChanges.on('click', function () {
        ed.success({
          el: el.c,
          close: self.container ? self.container.close : () => {},
        });
      });

      el.cacnelChanges.on('click', function () {
        if (self.container) self.container.close();
      });
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

        el.acceptChanges = el.c.find('.confirmEditing');
        el.cacnelChanges = el.c.find('.cancelEditing');

        initEvents();

        p.clbk(null, p);
      },

      wnd: {
        header: '',
        // close: function () {
        // 	if (ed.closeClbk) {
        // 		ed.closeClbk();
        // 	}
        // },
        // postRender: function (_wnd, _wndObj, clbk) {
        // 	wndObj = _wndObj;
        // 	wnd = _wnd;

        // 	if (clbk) {
        // 		clbk();
        // 	}
        // },
        offScroll: true,
        noInnerScroll: true,
        class:
          'editVideoDescription normalizedmobile nobfilter maxheight showbetter',
        allowHide: false,
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
      window.rifticker.add(() => {
        essense.destroy();
      });
    });
  };

  return self;
})();

if (typeof module != 'undefined') {
  module.exports = editVideoDescription;
} else {
  app.modules.editVideoDescription = {};
  app.modules.editVideoDescription.module = editVideoDescription;
}
