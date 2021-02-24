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

const Peertube = function () {
  const hardCodeUrlsList = [
    'pocketnetpeertube1.nohost.me',
    '123pocketnetpeertube2.nohost.me',
    'pocketnetpeertube3.nohost.me',
  ];

  this.destroy = () => {
    return Promise.resolve();
  };

  this.init = () => {
    return Promise.resolve();
  };

  this.kit = {
    getRandomServer: () =>
      Promise.resolve(
        hardCodeUrlsList[Math.floor(Math.random() * hardCodeUrlsList.length)],
      ),

    getBestServer: () => {
      const timerStack = [];

      const statsStack = hardCodeUrlsList.map((server, serverIndex) => {
        timerStack.push(performance.now());
        return axios.get(`https://${server}${STATS_METHOD}`).then((data) => {
          timerStack[serverIndex] = performance.now() - timerStack[serverIndex];

          return data;
        });
      });

      return Promise.allSettled(statsStack).then((res) => {
        const filteredResponse = res
          .filter((response) => response.status === SETTELED_SUCCESS_STATUS)
          .map((item) => {
            console.log('AAA', item.value.config.url, item.value.request.path);
            return item.value.data.total;
          });

        const output = {
          fastest:
            hardCodeUrlsList[timerStack.indexOf(Math.min(...timerStack))],
          leastUsed:
            hardCodeUrlsList[
              filteredResponse.indexOf(Math.min(...filteredResponse))
            ],
        };

        return Promise.resolve(output);
      });
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
