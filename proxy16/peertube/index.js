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

  self.request = function (method, data, host, parameters = {}) {
    var roy = getroy(host);

    if (!roy) return Promise.reject('roy');

    return roy.request(method, data, parameters);
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

    best: function ({ roy, type, address }) {
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
      var cachehash = parsed.id;
      var cacheparameters = _.clone(parsed);

      return new Promise((resolve, reject) => {
        cache.wait(
          cachekey,
          cacheparameters,
          function (waitstatus) {
            resolve(waitstatus);
          },
          cachehash,
        );
      })
        .then((waitstatus) => {
          var cached = cache.get(cachekey, cacheparameters, cachehash);

          //console.log("GET", cachehash, cached)

          if (cached) {
            //console.log("VIDEO FROM CACHE", cachehash)

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

            //console.log('cachehash', cachehash, ontime)

            cache.set(cachekey, cacheparameters, r, null, ontime, cachehash);

            return Promise.resolve(r);
          });
        })
        .catch((e) => {
          if (e && !e.data) {
            console.log('E video', e, url);
          }

          if (e && e.status == '404') {
            cache.set(cachekey, cacheparameters, {
              error: true,
            });
          }

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
              result.errors ? result.errors.push(url) : (result.errors = [url]);

              return Promise.resolve();
            });
        }),
      )
        .then(() => {
          return Promise.resolve(result);
        })
        .catch((e = {}) => {
          return Promise.reject({
            error: e,
            code: e.code || 500,
          });
        });
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
        })
        .catch((e = {}) =>
          Promise.reject({
            error: e,
            code: e.code || 500,
          }),
        );
    },

    roys: () => {
      const output = {};

      Object.keys(roys).map((roy) => {
        roys[roy].best() ? (output[roy] = roys[roy].best().host) : null;
      });

      return Promise.resolve(output);
    },

    accountVideos({ account, servers = [], start, count }, cahce) {
      const requestServers = servers.length
        ? [...servers]
        : Object.values(roys)
            .map((roy) => roy.hosts().map((host) => host.host))
            .flat();

      return Promise.allSettled(
        requestServers.map((server) =>
          self.request('channelVideos', { account, start, count }, server, {
            host: server,
          }),
        ),
      )
        .then((data) => {
          const outputInfo = data
            .map((serverData) => serverData.data)
            .reduce(
              (accum, currServer) => ({
                total: accum.total + currServer.total,
                data: accum.data.concat(currServer.data || []),
              }),
              { total: 0, data: [] },
            );

          console.log(outputInfo);
          return outputInfo;
        })
        .catch(() => ({ total: 0, data: [] }));
    },
  };

  self.addroy = function (urls, key) {

    if(!urls.length) return

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
