var _ = require('underscore');
var f = require('../functions');
const Instance = require('./instance');

const metricsList = require('./metricsList');
const PerformanceMetric = require('./PerformanceMetric');

//Creating metrics object
const getBestByType = Object.entries(metricsList).reduce(
  (output, [metricName, metricData]) => {
    const newMetric = new PerformanceMetric(
      metricData.ratings,
      metricData.calculator,
    );
    output[metricName] = newMetric;
    return output;
  },
  {},
);

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
      return getBestByType[type]
        ? getBestByType[type].calculate(instance)
        : -10;
    });
  };

  self.best = function (type = 'responseSpeed') {
    var bestlist = self.bestlist(type);

    if (bestlist.length) return [...bestlist].pop();

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
      })
      .catch((e) => Promise.reject(e));
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

    return Promise.all(promises).catch(() => Promise.resolve());
  };

  return self;
};

module.exports = Roy;
