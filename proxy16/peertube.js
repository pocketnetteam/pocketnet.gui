const axios = require('axios');

const STATS_METHOD = '/api/v1/videos';

const Peertube = function () {
  const hardCodeUrlsList = [
    'pocketnetpeertube1.nohost.me',
    'pocketnetpeertube2.nohost.me',
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
      const statsStack = hardCodeUrlsList.map((server) =>
        axios
          .get(`https://${server}${STATS_METHOD}`)
          .then((res) => console.log(res.json())),
      );

      return axios.all(statsStack).then((res) => {
        // console.log(res.map((respServ) => respServ.json()));

        return Promise.resolve(res.json());
      });
    },

    getTest: () =>
      axios
        .get(`https://132${hardCodeUrlsList[0]}${STATS_METHOD}`)
        // .then((result) => result.json())
        .then((result) => {
          console.log('AAAA', result.data);

          return Promise.resolve(result.data);
        })
        .catch((err) => Promise.reject(err)),
  };

  return this;
};

module.exports = Peertube;
