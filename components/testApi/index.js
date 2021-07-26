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
      sendRequest() {
        const headers = {};
        const headersElements = el.c.find('.headerWrapper');
        headersElements.each(function () {
          const headerEl = $(this);
          const headerName = headerEl.find('.headerInput').val();
          const headerValue = headerEl.find('.headerValueInput').val();

          if (headerName) headers[headerName] = headerValue;
        });

        const url = el.linkInput.val();

        const method = el.testMethodSelect.val();

        if (!url) el.linkInput.focus();

        return axios({
          method,
          url,
          headers,
        }).then((result = {}) => {
          const jsonStr = JSON.stringify(result.data || {}, undefined, 4);
          el.responseOutput.html(syntaxHighlight(jsonStr));
        });
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
      el.sendRequestButton.on('click', actions.sendRequest);
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
        el.sendRequestButton = el.c.find('.sendRequest');
        el.testMethodSelect = el.c.find('.testMethodSelect');

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
