const { performance } = require('perf_hooks');

const STATS_METHOD = '/api/v1/videos';

class PeertubeServer {
  constructor(url) {
    this.url = url;
  }

  serverStats = [];

  async getServerInfo() {
    const { url, serverStats } = this;
    const responseTime = performance.now();

    await axios
      .get(`https://${url}${STATS_METHOD}`)
      .then((data) => {
        responseTime = performance.now() - responseTime;

        return data;
      })
      .then((res) => {
        serverStats.push({
          server: url,
          total: res.value.data.total,
          timeResponse: responseTime,
        });
      });
  }
}

module.exports = PeertubeServer;
