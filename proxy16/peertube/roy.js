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

		if (parent.instanses[url]){

			parent.instanses[url].counter++ 

			instances.push(parent.instanses[url].instance);

			return parent.instanses[url].instance
		}

		var instance = new Instance(url, options.ip, self);

		if (options.cantuploading) instance.cantuploading = true;
		if (options.special) instance.special = true;
		if (options.old) instance.old = true;
		if (options.offline) instance.offline = true;
		if (options.archiveDouble) instance.archiveDouble = true;
		if (options.archived) instance.archived = true;

		instance.init();

		instances.push(instance);



		parent.instanses[url] = {
			instance,
			counter : 1
		}

		return instance;
	};

	///

	self.removeInstance = function (host) {
		var instance = self.find(host);


		if (instance) {

			if (parent.instanses[host]){
				parent.instanses[host].counter--

				if (parent.instanses[host].counter <= 0){

					instance.destroy();
					delete parent.instanses[host]
				}
			}
			else{
				instance.destroy();
			}
			

			
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

			if (splittedUrl.length != 3 && splittedUrl[0] !== 'test' && splittedUrl.length != 1 && splittedUrl.length != 2 && splittedUrl.length != 4) return;

			self.addInstance(host, s);
		});
	};

	self.destroy = function () {
		_.each(instances, function (instance) {
			//instance.destroy();

			var host = instance.host

			if (parent.instanses[host]){
				parent.instanses[host].counter--

				if (parent.instanses[host].counter <= 0){

					instance.destroy();
					delete parent.instanses[host]
				}
			}
			else{
				instance.destroy();
			}
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

	self.canuse = function(){
		var _instances = _.filter(instances, function (instance) {
			return instance.canuse();
		});

		return _instances.length
	}

	self.availableInstances = () => {
		var i = []

		_.each(instances, (ins) => {
			if(!ins.old){
				i.push(ins.host)
			}
		})

		return i
	}

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

		if (!list.length) {
			return Promise.reject('failed');
		}

		var index = 0;
		var error = null;
		
	

		var request = function (instance) {
			return instance
				.request(method, data, p)
				.then((r) => {
					if (r.data && r.data.status === 404 && !r.data.videoBrief) {
						error = r.data;
						return Promise.reject(r);
					}
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

	self.info = function (compact) {
		var info = {};

		_.each(instances, function (instance) {

			if (compact && (!instance.canuse() || !instance.info().canuploading || instance.cantuploading)){
				return
			}

			var stats = instance.stats();

			info[instance.host] = {
				host: instance.host,
				ip : instance.ip,
				archived: !!instance.archived,
				canuse: instance.canuse(),
				stats,
				auto : self.auto
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
