var _ = require('underscore');
var f = require('../functions');
const Roy = require('./roy');

var Peertube = function (settings) {
  var self = this;

  const PEERTUBE_ID = 'peertube://';
  const SLASH = '/';

  var roys = {};

  var cache = {};

  var parselink = function (link) {
    var ch = link.replace(PEERTUBE_ID, '').split(SLASH);

    return {
      host: ch[0],
      id: ch[1],
    };
  };

  var getroy = function (host) {
    var roy = null;

    if (host) {
      roy =
        roys[host] ||
        _.find(roys, function (roy) {
          return roy.find(host);
        });
    }

    if (!roy && host) {
      roy = self.addroy([host], host);
      roy.useall = true;
      roy.auto = true;
    }

    /*if(!roy){
            var aroy = _.toArray(roys)

            if (aroy.length) roy = aroy[0]
        }*/

    return roy;
  };

  self.timeout = function () {
    if (self.proxy.users() > 10) {
      return 1500;
    }

    return 30000;
  };

  self.statsInterval = function () {
    if (self.proxy.users() > 10) {
      return 60000;
    }

    return 600000;
  };

  self.request = function (method, data, host) {
    var roy = getroy(host);

    if (!roy) return Promise.reject('roy');

    return roy.request(method, data);
  };

  self.inner = {
    video: function (parsed) {
      if (!parsed.id) return Promise.reject('No id info received');

      return self
        .request('video', { id: parsed.id }, parsed.host)
        .then((res) => {
          return Promise.resolve(res);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  };

  self.api = {
    randroykey: function () {
      var _roys = {};

      _.each(roys, function (r, c) {
        if (!r.auto) _roys[c] = r;
      });

      var keys = _.map(_roys, function (i, c) {
        return c;
      });

      return keys[f.rand(0, keys.length - 1)];
    },

    best: function ({ roy, type }) {
      if (!roy) roy = self.api.randroykey();

      roy = getroy(roy);

      if (!roy) return Promise.reject('roy');

      var best = roy.best(type);

      if (!best) return Promise.reject('best');

      return Promise.resolve(best.export());
    },

    video: function ({ url }, cache) {
      var parsed = parselink(url);

      if (!parsed.id) return Promise.reject('No id info received');

      var cachekey = 'peertubevideo';
      var cacheparameters = _.clone(parsed);

      return new Promise((resolve, reject) => {
        cache.wait(cachekey, cacheparameters, function (waitstatus) {
          resolve(waitstatus);
        });
      })
        .then((waitstatus) => {
          var cached = cache.get(cachekey, cacheparameters);

          if (cached) {
            if (cached.error) {
              return Promise.reject({ error: true });
            }

            return Promise.resolve(cached);
          }

          return self.inner.video(parsed).then((r) => {
            var ontime = null;

            var fr = null;

            if (r && r.data) {
              fr = r.data;

              if ((fr && fr.isLive) || (fr.state && fr.state.id == 2))
                ontime = 60;

              if (fr && fr.isLive && (!fr.aspectRatio || fr.aspectRatio == '0'))
                fr.aspectRatio = 1.78;
            }

            cache.set(cachekey, cacheparameters, r, null, ontime);

            return Promise.resolve(r);
          });
        })
        .catch((e) => {
          cache.set(cachekey, cacheparameters, {
            error: true,
          });

          return Promise.reject(e);
        });
    },

    videos: function ({ urls }, cache) {
      var result = {};

      return Promise.all(
        _.map(urls, function (url) {
          return self.api
            .video({ url }, cache)
            .then((r) => {
              result[url] = r.data;

              return Promise.resolve();
            })
            .catch((e) => {
              result.errors ? result.errors.push(e) : (result.errors = [e]);
              return Promise.resolve();
            });
        }),
      )
        .then(() => {
          return Promise.resolve(result);
        })
        .catch((e = {}) =>
          Promise.reject({
            error: e,
            code: e.code || 500,
          }),
        );
    },

    stats() {
      const servers = Object.values(roys).map((roy) => roy.performance());

      return Promise.all(servers)
        .then((data) => {
          var d = {};
          _.each(data, function (dd) {
            _.each(dd, function (currVal) {
              d[currVal.host] = currVal.data;
            });
          });

          return d;

          return data.flat().reduce(
            (accumulator, currVal) => ({
              ...accumulator,
              [currVal.host]: currVal.data,
            }),
            {},
          );
        })
        .catch((e = {}) =>
          Promise.reject({
            error: e,
            code: e.code || 500,
          }),
        );
    },

    roys: () =>
      Promise.resolve(
        Object.values(roys).map((roy) => roy.hosts().map((host) => host.host)),
      ),
  };

  self.addroy = function (urls, key) {
    var roy = new Roy(self);

    roy.init(urls);

    roys[key] = roy;

    return roy;
  };

  self.info = function (compact) {
    var info = {};

    _.each(roys, function (roy) {
      info = _.extend(info, roy.info(compact));
    });

    return info;
  };

  self.init = function ({ urls, roys }) {
    if (roys) {
      _.each(roys, function (urls, i) {
        self.addroy(urls, i);
      });
    }

    if (urls) self.addroy(urls, 'default');

    return Promise.resolve();
  };

  self.extendApi = function (api, cache) {
    _.each(self.api, function (f, i) {
      api[i] = {
        path: '/peertube/' + i,

        action: function (data) {
          return f(data, cache)
            .then((r) => {
              return Promise.resolve({
                data: r,
                code: 200,
              });
            })
            .catch((e) => {
              console.log('PEERTUBE ERROR', e);

              if (!e) e = {};

              return Promise.reject({
                error: e,
                code: e.code || 500,
              });
            });
        },
      };
    });
  };

  return self;
};

module.exports = Peertube;
