var testApi = (function () {
  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {
    var primary = deep(p, 'history');

    var el;

    var actions = {
      addHeader() {
        const container = $('<div class="headerWrapper"></div>');
        container.appendTo(el.headersContainer);
        self.shell(
          {
            name: 'header',
            el: el.headersContainer.children().last(),

            data: {},
          },
          (p) => {
            p.el.find('.removeHeaderButton').on('click', () => {

              p.el.remove();
            });
          },
        );
      },
    };

    var events = {};

    var renders = {};

    var state = {
      save: function () {},
      load: function () {},
    };

    var initEvents = function () {
      el.addTestHeaderButton.on('click', actions.addHeader);
    };

    return {
      primary: primary,

      getdata: function (clbk) {
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

        el.linkInput = el.c.find('.testQueryInput');
        el.headersContainer = el.c.find('.headersContainer');
        el.addTestHeaderButton = el.c.find('.addTestHeader');
        el.responseOutput = el.c.find('.responseOutput');

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
      essense.destroy();
    });
  };

  return self;
})();

if (typeof module != 'undefined') {
  module.exports = testApi;
} else {
  app.modules.testApi = {};
  app.modules.testApi.module = testApi;
}
