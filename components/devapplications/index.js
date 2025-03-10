var devapplications = (function () {
  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, "history");

    var el, ed;

    var actions = {};

    var events = {};

    var renders = {};

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.c.find("#navigateToDocs").on('click', () => {
        self.app.apps.openInWndById('app.pocketnet.docs', null, '')
      })
    };

    return {
      primary: primary,

      getdata: function (clbk, p) {
        ed = p.settings.essenseData;
        userAddress = self.app.user.address.value;
        var data = {
          ed,
          userAddress,
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
        el.c = p.el.find("#" + self.map.id);

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

if (typeof module != "undefined") {
  module.exports = devapplications;
} else {
  app.modules.devapplications = {};
  app.modules.devapplications.module = devapplications;
}
