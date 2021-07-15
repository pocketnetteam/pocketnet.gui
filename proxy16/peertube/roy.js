var _ = require('underscore');
var f = require('../functions');
const Instance = require('./instance');

const getBestByType = {
  responseSpeed: (instance) => -instance.stats().k,
  uploadVideo: (instance) => {
    const performance = instance.performance();

    if (!performance) return -10;

    const serverData = performance.data;

    if (!serverData.performance) return -10;

    const ratings = [
      {
        value: serverData.performance.waitTranscodingJobs || 0,
        name: 'Waiting Jobs',
        weight: 0.6,
        calculate() {
          const { weight, value } = this;

          return weight / (1 + Math.pow(value, 0.25));
        },
      },
      {
        value: serverData.totalLocalVideoFilesSize || 0,
        name: 'Occupied Space',
        weight: 0.3,
        calculate() {
          const { weight, value } = this;

          let metricValue = 1 - value / 100000000000;

          if (metricValue < 0) metricValue = 1 - value / 400000000000;

          return weight * metricValue;
        },
      },
      {
        value: serverData.totalDailyActiveUsers,
        name: 'Active Users',
        weight: 0.1,
        calculate() {
          const { weight, value } = this;

          return weight / (1 + Math.pow(value, 0.25));
        },
      },
    ];

    return ratings.reduce((accumulator, metric) => {
      const currentRating = metric.calculate() || 0;

      return accumulator + currentRating;
    }, 0);
  },
  importVideo: (instance) => {},
  watchVideo: (instance) => {},
  liveStream: (instance) => {},
};

var Roy = function (parent) {
  var self = this;

  self.parent = parent;

  var instances = [];
  var inited = false;

  self.useall = false;

  self.addInstance = function (url) {
    var instance = new Instance(url, self);

    instance.init();

    instances.push(instance);
  };

  self.removeInstance = function (host) {
    var instance = self.find(host);

    if (instance) {
      instance.destroy();
    }

    instances = _.filter(instances, function (instance) {
      return instance.host == host;
    });
  };

  self.init = function (urls) {
    _.each(urls, function (host) {
      self.addInstance(host);
    });
  };

  self.destroy = function () {
    _.each(instances, function (instance) {
      instance.destroy();
    });

    instances = [];

    inited = false;
  };

  self.bestlist = function (type) {
    var _instances = _.filter(instances, function (instance) {
      return instance.canuse() || self.useall;
    });

    return _.sortBy(_instances, (instance) => {
      console.log(instance.host, getBestByType[type](instance));
      return getBestByType[type](instance);
    });
  };

  self.best = function (type = 'uploadVideo') {
    var bestlist = self.bestlist(type);

    if (bestlist.length) return bestlist[0];

    return null;
  };

  self.requestToBest = function (method, data, p) {
    var best = self.best();

    if (!best) return Promise.reject('best');

    return best.request(method, data, p);
  };

  self.direct = function (host, method, data, p) {
    var instance = self.find(host);

    if (!instance) {
      return Promise.reject({
        code: 404,
        message: 'host',
      });
    }

    return instance.request(method, data, p);
  };

  self.request = function (method, data, p, list, index) {
    if (!list) list = self.bestlist();
    if (!index) index = 0;

    var instance = list[index];

    if (!instance) return Promise.reject('failed');

    return instance
      .request(method, data, p)
      .catch((e) => {
        if (e == 'failed')
          return self.request(method, data, p, list, index + 1);

        return Promise.reject(e);
      })
      .then((r) => {
        if (r.data) r.data.from = instance.host;

        return Promise.resolve(r);
      });
  };

  self.find = function (host) {
    return _.find(instances, function (instance) {
      return instance.host == host;
    });
  };

  self.info = function (compact) {
    var info = {};

    _.each(instances, function (instance) {
      info[instance.host] = {
        host: instance.host,
        stats: instance.stats(),
        canuse: instance.canuse(),
      };
    });

    return info;
  };

  self.performance = () => {
    const promises = instances.map((inst) => inst.performance());

    return Promise.all(promises);
  };

  return self;
};

module.exports = Roy;
