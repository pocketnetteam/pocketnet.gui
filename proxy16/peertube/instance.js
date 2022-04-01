const { performance } = require('perf_hooks');
const axios = require('axios');
var _ = require('underscore');
var f = require('../functions');
var Statistic = require('../lib/statistic');

var instance = function (host, ip, Roy) {
	var self = this;

	self.host = host;
	self.ip = ip;
	self.cantuploading = false

	var inited = false;
	var statistic = new Statistic()

	const FREE_SPACE_PERC = 0.95;

	var lastStat = null;
	
	var k = 1000;

	var info = []
	var infointerval = null
	var infotime = 240000
	var maxinfoevents = 20

	var methods = {
		stats: '/api/v1/videos',
		video: function ({ id }) {
			return '/api/v1/videos/' + id;
		},
		performance: '/api/v1/server/stats',
		diskSpace: '/api/v1/server/space',
		channelVideos: ({ account }) => `/api/v1/accounts/${account}/videos`,
	};

	var setinfointerval = function(){
		if(!infointerval){
			infointerval = setInterval(getinfo, infotime)
		}
	}

	
	var clearinfointerval = function(){
		if (infointerval){
			clearInterval(infointerval)
		}

		infointerval = null
	}

	var getinfo = function () {

		var result = {
			date : new Date()
		}

		return self.request('performance', {}, {timeout : 12000}).then((data) => {

			var stats = data.data || {}
			var performance = stats.performance || {}
			var re = f.deep(stats, 'videosRedundancy.0') || {}

			result.stats = {
				totalLocalVideos : stats.totalLocalVideos || 0,
				totalLocalVideoViews : stats.totalLocalVideoViews || 0,
				totalDailyActiveUsers : stats.totalDailyActiveUsers || 0
			}

			result.performance = {
				activeLivestreams: performance.activeLivestreams || 0,
				failImportsCount: performance.failImportsCount || 0,
				failTranscodingJobs: performance.failTranscodingJobs || 0,
				waitImportsCount: performance.waitImportsCount || 0,
				waitTranscodingJobs: performance.waitTranscodingJobs || 0,

				redundancy : {
					totalSize: re.totalSize || 0,
					totalUsed: re.totalUsed || 0,
					totalVideoFiles: re.totalVideoFiles || 0,
					totalVideos: re.totalVideos || 0
				}
			}

			return self.request('diskSpace',{}, {timeout : 12000})

		}).then((data) => {

			var space = data.data || {}

			result.space = {
				free: space.free,
				size : space.size
			}

			info.push(result)

			info = f.lastelements(info, maxinfoevents, maxinfoevents / 10)

			return Promise.resolve()

		}).catch(e => {

			//console.log("E", self.host, e)

			return Promise.resolve()

		})
	}

	self.info = function(){

		var canuploading = false;
		var v = null

		if (info.length) {
			v = info[info.length - 1]
			////
			
			var { free, size } = v.space;
            var occupiedPerc = (size - free) / size;

            if (occupiedPerc < FREE_SPACE_PERC) canuploading = true

		}

		return {
			last : v,
			canuploading : canuploading
		}
	}

	self.inited = function () {
		return inited;
	};

	self.request = function (method, data, p = {}) {
		var responseTime = performance.now();
		var url = methods[method];

		if (!url) return Promise.reject('url');

		if (typeof url == 'function') url = url(data);

		var timeout = p.timeout || Roy.parent.timeout() || 10000

		return axios[p.type || 'get'](`http://${host}${url}`, { timeout }).then((result) => {

			var meta = {
				code : 200,
				difference : performance.now() - responseTime,
				method : method
			}
		
			statistic.add(meta);

			return Promise.resolve({
				data: result.data || {},
				meta,
				host,
			});

		}).catch((error) => {

			//console.log('error', `http://${host}${url}`, url, ((error || {}).response || {}).status || 500)

			var meta = {
				code : ((error || {}).response || {}).status || 500,
				difference : performance.now() - responseTime,
				method : method
			}

			if (meta.code == 500) statistic.penalty.set(0.9, 30000, 500)
		
			statistic.add(meta);

			return Promise.reject((error || {}).response || {});

		});
	};

	self.availability = function(){
		return statistic.get.availability()
	}

	self.stats = function () {

		return {
			events : statistic.get.events(),
			slice : statistic.get.slice(),
			penalty : statistic.penalty.get(),
			info : self.info(),
			availability : statistic.get.availability()
		} 

		
	};

	self.canuse = function () {
		return inited
	};

	self.init = function () {

		inited = true;

		getinfo()

		setinfointerval()

		statistic.init()

	};

	self.export = function () {
		return {
			host,
		};
	};

	self.destroy = function () {
		inited = false;

		clearinfointerval()

		info = []

		statistic.destroy()
	};


	return self;
};

module.exports = instance;
