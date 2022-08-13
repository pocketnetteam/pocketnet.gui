var statistic = (function () {

  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {

    var primary = deep(p, 'history');

    var el;

    var period = {
      from: {},
      to: {}
    }
    var fields = []

    var actions = {
      getStat: async function () {

        // let novblock = 1766504

        let block = await self.app.api.fetch('ping', {}, {timeout: 4000})

        let from = (period?.from?.block && period?.from?.block > 0) ? block.height - period.from.block : 0
        let to = (period?.to?.block && (block.height - period.to.block)> 0) ? period.to.block : 0
        fields = await self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from,  1])
        renders.block()
      },

      from: function (e) {
        period.from.date = e.target.value
        period.from.block = Math.floor((moment().unix() - moment(e.target.value).unix()) / 60)
        renders.form()
      },
      to: function (e) {
        period.to.date = e.target.value
        period.to.block = Math.floor((moment().unix() - moment(e.target.value).unix()) / 60)
        renders.form()
      }
    }

    var events = {}

    var renders = {
      form: function (clbk) {
        self.shell({

          name: 'form',
          el: el.form,
          data: {
            period: period,
          },
        }, function (_p) {
          _p.el.find('.button').on('click', (e) => {
            e.preventDefault()
            actions.getStat()
          });

          _p.el.find('.from').on('change', actions.from)
          _p.el.find('.to').on('change', actions.to)
        })
      },

      block: function (clbk) {
        self.shell({

          name: 'block',
          el: el.block,
          data: {
            fields: fields,
          },
        }, function (_p) {

        })
      }
    }

    var state = {
      save: function () {

      },
      load: function () {

      }
    }

    var initEvents = function () {

    }

    return {
      primary: primary,

      getdata: async function (clbk) {

        var data = {
          period: period
        };

        clbk(data);

      },

      destroy: function () {
        el = {};
      },

      init: async  function (p) {

        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);


        el.block = p.el.find('.block');
        el.form = p.el.find('.form')

        period.to.block = 0
        period.from.block = Math.floor((moment().unix() - moment('2022-07-01').unix()) / 60)
        renders.form()

        initEvents();

        actions.getStat()
        p.clbk(null, p);
      }
    }
  };


  self.run = function (p) {

    var essense = self.addEssense(essenses, Essense, p);

    self.init(essense, p);

  };

  self.stop = function () {

    _.each(essenses, function (essense) {

      essense.destroy();

    })

  }

  return self;
})();


if (typeof module != "undefined") {
  module.exports = statistic;
} else {

  app.modules.statistic = {};
  app.modules.statistic.module = statistic;

}