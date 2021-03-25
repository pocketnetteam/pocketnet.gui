const axios = require('axios');
const { performance } = require('perf_hooks');

//polyfill
if (!Promise.allSettled) {
  Promise.allSettled = function (promises) {
    return Promise.all(
      promises.map((p) =>
        Promise.resolve(p).then(
          (value) => ({
            status: 'fulfilled',
            value: value,
          }),
          (error) => ({
            status: 'rejected',
            reason: error,
          }),
        ),
      ),
    );
  };
}

const STATS_METHOD = '/api/v1/videos';
const SETTELED_SUCCESS_STATUS = 'fulfilled';

const CACHE_SIZE = 100;
const UPDATE_INTERVAL = 5000;

const Peertube = function () {
  const hardCodeUrlsList = [
    'pocketnetpeertube1.nohost.me',
    'pocketnetpeertube2.nohost.me',
    'pocketnetpeertube3.nohost.me',
  ];

  this.serversCache = [];

  this.statsInterval = null;

  const getServerStats = () => {
    const timerStack = {};

    const statsStack = hardCodeUrlsList.map((server) => {
      timerStack[server] = performance.now();

      return axios.get(`https://${server}${STATS_METHOD}`).then((data) => {
        timerStack[server] = performance.now() - timerStack[server];

        return data;
      });
    });

    return Promise.allSettled(statsStack).then((res) => {
      const filteredResponse = res
        .filter((response) => response.status === SETTELED_SUCCESS_STATUS)
        .map((item) => {
          const serverLink = item.value.config.url
            .replace('https://', '')
            .replace(item.value.request.path, '');

          return {
            server: serverLink,
            total: item.value.data.total,
            timeResponse: timerStack[serverLink],
          };
        });

      const output = {
        all: filteredResponse,
        best: {
          fastest: filteredResponse.reduce((accumulator, current) => {
            return accumulator.timeResponse < current.timeResponse
              ? accumulator
              : current;
          }, filteredResponse[0]),

          leastUsed: filteredResponse.reduce((accumulator, current) => {
            return accumulator.total < current.total ? accumulator : current;
          }, filteredResponse[0]),
        },
      };

      if (this.serversCache.length > CACHE_SIZE) this.serversCache.shift();

      this.serversCache.push(output);
    });
  };

  this.destroy = () => {
    return Promise.resolve();
  };

  this.init = () => {
    this.statsInterval = setInterval(getServerStats, UPDATE_INTERVAL);

    return Promise.resolve();
  };

  this.kit = {
    getRandomServer: () =>
      Promise.resolve(
        hardCodeUrlsList[Math.floor(Math.random() * hardCodeUrlsList.length)],
      ),

    getBestServer: () => {
      const { serversCache } = this;

      return Promise.resolve(
        (serversCache[serversCache.length - 1] || {}).best,
      );
    },

    getTest: () =>
      axios
        .get(`https://${hardCodeUrlsList[0]}${STATS_METHOD}`)
        .then((result) => {
          return Promise.resolve(result.data);
        })
        .catch((err) => Promise.reject(err)),
  };

  return this;
};

module.exports = Peertube;
