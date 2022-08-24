var statistic = (function () {

  var self = new nModule();

  var essenses = {};

  var Essense = function (p) {

    var primary = deep(p, 'history');

    var el;

    var selectedPeriod = {
      from: {},
      to: {}
    }
    var fields

    var loading = false

    var prevPeriod

    var actions = {

      loading: function (sh) {
        loading = sh
        renders.block()
      },

      getStat: async function () {

        if (prevPeriod?.to.block === selectedPeriod.to.block && prevPeriod?.from.block === selectedPeriod.from.block ) {
          return
        }

        prevPeriod = JSON.parse(JSON.stringify(selectedPeriod))
        actions.loading(true)
        fields = []

        let block = await self.app.api.fetch('ping', {}, {timeout: 4000})

        let from = (selectedPeriod?.from?.block && selectedPeriod?.from?.block > 0) ? selectedPeriod.from.block : 0
        let to = (selectedPeriod?.to?.block && (block.height - selectedPeriod.to.block) > 0) ? block.height - selectedPeriod.to.block : 0


        fields.push(...await self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from, 1]))
        fields.push(...await self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from, 3]))
        fields.push(...await self.app.api.rpc('getuserstatistic', [self.user.address.value, to, from, from, 7]))


        actions.loading(false)
      },

      from: function (e) {
        selectedPeriod.from.date = e.target ? e.target.value : e
        selectedPeriod.from.block = Math.floor((moment(selectedPeriod.to.date).unix() - moment(selectedPeriod.from.date).unix()) / 60)

        renders.form()
        actions.getStat()
      },
      to: function (e) {
        selectedPeriod.to.date = e.target.value
        selectedPeriod.to.block = Math.floor((moment().unix() - moment(e.target.value).unix()) / 60) - 1439
        selectedPeriod.from.date? actions.from(selectedPeriod.from.date): actions.from('2022-07-01')
        renders.form()
        actions.getStat()
      }
    }

    var events = {}

    var renders = {
      form: function (clbk) {
        self.shell({

          name: 'form',
          el: el.form,
          data: {
            period: selectedPeriod,
          },
        }, function (_p) {
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
            loading: loading
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
          period: selectedPeriod
        };

        clbk(data);

      },

      destroy: function () {
        el = {};
      },

      init: async function (p) {

        state.load();

        el = {};
        el.c = p.el.find('#' + self.map.id);


        el.block = p.el.find('.block');
        el.form = p.el.find('.form')

        selectedPeriod.to.block = 0
        selectedPeriod.from.block = Math.floor((moment().unix() - moment('2022-07-01').unix()) / 60)
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