var _ = require('underscore');
var f = require('../functions');
const Roy = require('./roy');
const { performance } = require('perf_hooks');

var Statistic = require('../lib/statistic');

var Peertube = function (settings) {
	var self = this;

	const PEERTUBE_ID = 'peertube://';
	const SLASH = '/';

	var roys = {};
	var statistic = new Statistic();

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
			roy = self.addroy([host], host, true);

			roy.useall = true;
			roy.auto = true;
		}

		return roy;
	};

	self.timeout = function () {
		return 5500;
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

		var responseTime = performance.now();

		return roy
			.request(method, data, parameters)
			.then((r) => {
				statistic.add({
					code: 200,
					difference: performance.now() - responseTime,
					method: method,
				});

				return Promise.resolve(r);
			})
			.catch((e) => {
				statistic.add({
					code: e == 'failed' ? 501 : (e || {}).code || 500,
					difference: performance.now() - responseTime,
					method: method,
				});

				return Promise.reject(e);
			});
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
		randroykey: function (type, special) {
			var _roys = {};

			_.each(roys, function (r, c) {
				if (!r.auto) {
					if (!special) {
						if (r.hasspecial()) return;
					}

					if (type && type == 'upload' && !r.canupload()) return;

					_roys[c] = r;
				}
			});

			var keys = _.map(_roys, function (i, c) {
				return c;
			});

			return keys[f.rand(0, keys.length - 1)];
		},

		best: function ({ roy, type, special }) {
			if (!type || !roy) {
				type = 'upload';
				roy = null;
			}

			if (!roy) roy = self.api.randroykey(type, special);

			roy = getroy(roy);

			if (!roy) return Promise.reject('roy');

			var best = roy.best(type);

			if (!best) return Promise.reject('best');

			return Promise.resolve(best.export());
		},

		video: function ({ url, fast }, cache) {
			var parsed = parselink(url);

			if (!parsed.id) return Promise.reject('No id info received');

			var cachekey = 'peertubevideo';
			var cachehash = parsed.id;
			var cacheparameters = _.clone(parsed);
			var _waitstatus = '';

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
					_waitstatus = waitstatus;

					var cached = cache.get(cachekey, cacheparameters, cachehash);

					if (cached) {
						if (cached.error) {
							return Promise.reject({ error: true, cached: true });
						}

						return Promise.resolve(cached);
					}

					if (waitstatus == 'attemps') {
						return Promise.reject({ error: true, cached: true });
					}

					return self.inner.video(parsed).then((r) => {
						var ontime = null;

						var fr = null;

						if (r && r.data) {
							fr = r.data;

							if (
								(fr && fr.isLive) ||
								(fr.state && (fr.state.id == 2 || fr.state.id == 3))
							)
								ontime = 20;

							if (fr && fr.isLive && (!fr.aspectRatio || fr.aspectRatio == '0'))
								fr.aspectRatio = 1.78;
						}

						cache.set(cachekey, cacheparameters, r, null, ontime, cachehash);

						return Promise.resolve(r);
					});
				})
				.catch((e) => {
					if (!e) e = {};

					var cachedone = false;
					var ontime = 20;

					if (e && e.status == '404') {
						ontime = 120;
					}

					if (!e.cached) {
						cache.set(
							cachekey,
							cacheparameters,
							{
								error: true,
							},
							null,
							ontime,
							cachehash,
						);
					}

					/*if(!e.cached && _waitstatus == 'execute'){
					if(!cachedone){
					  cache.remove(
						cachekey,
						cacheparameters,
						cachehash,
					  );
					}
				  }*/

					return Promise.reject(e);
				});
		},

		videos: function ({ urls, fast }, cache) {
			var result = {};

			return Promise.all(
				_.map(urls, function (url) {
					return self.api
						.video({ url, fast }, cache)
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

		stats: function () {
			return Promise.resolve({});
		},

		roys: ({ type = 'upload', special }) => {
			const output = {};

			var _roys = _.filter(roys, function (r) {
				return !r.auto;
			});

			if (type == 'upload')
				_roys = _.filter(_roys, function (r) {
					if (!special) {
						if (r.hasspecial()) return;
					}

					return r.canupload();
				});

			Object.keys(_roys).map((roy) => {
				_roys[roy].best() ? (output[roy] = _roys[roy].best().host) : null;
			});

			return Promise.resolve(output);
		},

		allservers: ({ type }) => {
			const output = {};

			Object.keys(roys).map((roy) => {
				output[roy] = roys[roy].instances();
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

					return outputInfo;
				})
				.catch(() => ({ total: 0, data: [] }));
		},

		getHostIp({ host }) {
			const hostsWithIp = Object.values(roys)
				.map((roy) => roy.hosts())
				.flat()
				.find(instance => instance.host === host);

			return hostsWithIp ? Promise.resolve(hostsWithIp.ip) : Promise.reject('Host not found');
		},

		getHosts() {
			return Promise.resolve(
				Object.values(roys).map((roy) => roy.export()) 
			);
		},
	};

	self.addroy = function (urls, key) {
		if (!urls.length) return;

		var roy = new Roy(self);

		roy.init(urls);

		roys[key] = roy;

		return roy;
	};

	self.info = function (compact) {
		var info = {
			events: statistic.get.events(),
			slice: statistic.get.slice(),
			instances: {},
		};

		_.each(roys, function (roy) {
			info.instances = _.extend(info.instances, roy.info(compact));
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

		statistic.init();

		return Promise.resolve();
	};

	self.destroy = function () {
		statistic.destroy();
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
