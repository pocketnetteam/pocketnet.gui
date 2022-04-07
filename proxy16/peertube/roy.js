var _ = require('underscore');
var f = require('../functions');
const Instance = require('./instance');

const metricsList = require('./metricsList');
const PerformanceMetric = require('./PerformanceMetric');

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

	//self.activeForUploading = true;

	self.canupload = function () {
		var can = true;

		_.each(instances, function (instance) {
			if (!instance.info().canuploading || instance.cantuploading) can = false;
		});

		return can && instances.length;
	};

	self.hasspecial = function () {

		return _.find(instances, function (instance) {
			return instance.special
		}) ? true : false;

	};

	///

	self.addInstance = function (url, options) {
		if (!url) return;
		if (!options) options = {};

		var instance = new Instance(url, options.ip, self);

		if (options.cantuploading) instance.cantuploading = true;
		if (options.special) instance.special = true;

		instance.init();

		instances.push(instance);

		return instance;
	};

	///

	self.removeInstance = function (host) {
		var instance = self.find(host);

		if (instance) {
			instance.destroy();
		}

		instances = _.filter(instances, function (instance) {
			return instance.host == host;
		});
	};

	///

	self.init = function (urls) {
		inited = true;

		_.each(urls, function (ins) {
			var host = ins;
			var s = {};

			if (_.isObject(ins)) {
				host = ins.host;
				s = ins;
			}

			if (!host || !host.split) return;

			const splittedUrl = host.split('.');

			if (splittedUrl.length != 3 && splittedUrl[0] !== 'test' && splittedUrl.length != 1 && splittedUrl.length != 2) return;

			self.addInstance(host, s);
		});
	};

	self.destroy = function () {
		_.each(instances, function (instance) {
			instance.destroy();
		});

		instances = [];

		inited = false;
	};

	///___
	self.findInstanceByName = (name) =>
		instances.find((server) => server.host === name);

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

	self.best = function (type = 'view') {
		var bestlist = self.bestlist(type);

		if (bestlist.length) return [...bestlist].pop();

		return null;
	};

	self.instances = () => instances.map((instance) => instance.host);

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

	self.request = function (method, data = {}, p = {}, list) {
		p.royrequest = true;

		if (!index) index = 0;

		if (!list) {
			var list = [];

			if (p.host) {
				var instance = self.findInstanceByName(p.host);

				if (instance) list = [instance];
			} else {
				list = self.bestlist();
			}
		}

		if (!list.length) return Promise.reject('failed');

		var index = 0;
		var error = null;

		var request = function (instance) {
			return instance
				.request(method, data, p)
				.then((r) => {
					if (r.data) {
						r.data.from = instance.host;
					}
					return Promise.resolve(r);
				})
				.catch((e) => {
					if (e && e.status) {
						if (e.status != 500) {
							error = e;
						}
					}

					return Promise.reject(e);
				});
		};

		var recrequest = function () {
			var instance = list[index];

			if (!instance) {
				return Promise.reject(error || 'failed');
			}

			return request(instance).catch((e) => {
				index++;
				return recrequest();
			});
		};

		return recrequest();
	};

	self.find = function (host) {
		return _.find(instances, function (instance) {
			return instance.host == host;
		});
	};

	self.info = function () {
		var info = {};

		_.each(instances, function (instance) {
			var stats = instance.stats();

			info[instance.host] = {
				host: instance.host,
				ip : instance.ip,
				canuse: instance.canuse(),
				stats
			};
			
		});

		return info;
	};

	self.export = function () {
		var info = {};

		_.each(instances, function (instance) {

			info[instance.host] = {
				host: instance.host,
				ip : instance.ip,
			};
			
		});

		return info;
	};

	self.hosts = () => instances;

	return self;
};

module.exports = Roy;
