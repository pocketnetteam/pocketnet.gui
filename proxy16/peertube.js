const axios = require('axios');
const { performance } = require('perf_hooks');
const PeertubeServer = require('./lib/PeertubeServer');

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

const GOOD_STATUS = 'fulfilled';

const PEERTUBE_ID = 'peertube://';
const HTTPS_ID = 'https://';
const SLASH = '/';

const CACHE_SIZE = 100;
const UPDATE_INTERVAL = 5000;

const getAspectRatio = (width, height) => {
  if (!width || !height) return 0;

  return Number((width / height).toFixed(2));
};

const Peertube = function () {
  const hardCodeUrlsList = [
    'pocketnetpeertube3.nohost.me',
    'pocketnetpeertube5.nohost.me',
  ];

  const serversList = [];

  this.serversCache = [];

  this.statsInterval = null;

  const getServerStats = () => {
    const filteredResponse = serversList
      .map((server) => server.getFreshStat())
      .filter((stat) => stat);

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
  };
  this.destroy = () => {
    return Promise.resolve();
  };

  this.init = () => {
    hardCodeUrlsList.map((url) => {
      const newServer = new PeertubeServer(url);
      serversList.push(newServer);
    });

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

    getVideoinfo: (info) => {
      const { host, id } = info;

      if (!host || !id) return Promise.reject('No host/id info received');
      console.log(`${host}/api/v1/videos/${id}`);

      return axios
        .get(`${host}/api/v1/videos/${id}`)
        .then((res) => {
          const metadataUrl = res.data.files[0].metadataUrl;

          const statsObject = {
            info: res.data.id,
            thumbnailPath: `${host}${res.data.thumbnailPath}`,
            previewPath: `${host}${res.data.previewPath}`,
            duration: res.data.duration,
            views: res.data.views,
          };

          return axios
            .get(metadataUrl)
            .then((metadata) =>
              Promise.resolve({
                ...statsObject,
                aspectRatio: getAspectRatio(
                  metadata.data.streams[0].width,
                  metadata.data.streams[0].height,
                ),
              }),
            )
            .catch(() =>
              Promise.resolve({
                ...statsObject,
                aspectRatio: 0,
              }),
            );
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },

    async getListVideos(info) {
      if (!info.ids) return Promise.reject('No video ids');
      const idsArray = info.ids;

      const serverInfo = await this.getBestServer();

      const bestHost = serverInfo ? serverInfo.fastest.server : null;

      console.log('Best Host', bestHost);

      const videoIds = idsArray.map((id) => {
        const formattedId = id.replace(PEERTUBE_ID, HTTPS_ID);
        return {
          host: bestHost
            ? `https://${bestHost}`
            : formattedId.split(SLASH).slice(0, 3).join(SLASH),
          id: formattedId.split(SLASH).pop(),
        };
      });

      const infoStack = videoIds.map((info) => this.getVideoinfo(info));

      return Promise.allSettled(infoStack)
        .then((data) => {
          const outputData = data.reduce(
            (accumulator, currVideo, currIndex) => {
              accumulator[idsArray[currIndex]] =
                currVideo.status === GOOD_STATUS
                  ? currVideo.value
                  : { info: 'No info' };

              return accumulator;
            },
            {},
          );

          return Promise.resolve(outputData);
        })
        .catch((err) => Promise.reject(err));
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
