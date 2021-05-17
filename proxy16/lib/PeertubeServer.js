const { performance } = require('perf_hooks');
const axios = require('axios');

const STATS_METHOD = '/api/v1/videos';
const UPDATE_INTERVAL = 5000;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

class PeertubeServer {
  constructor(url) {
    this.url = url;
    this.start();
  }

  serverStats = [];

  killSwitch = false;

  async getServerInfo() {
    const { url, serverStats } = this;
    const responseTime = performance.now();

    await axios
      .get(`https://${url}${STATS_METHOD}`)
      .then((res) => {
        serverStats.push({
          server: url,
          total: res.data.total,
          timeResponse: performance.now() - responseTime,
        });
      })
      .catch((err) => console.log('err', err));
  }

  async start() {
    // this.updateInterval = setInterval(() => this.getServerInfo(), UPDATE_INTERVAL);
    await this.getServerInfo();

    await delay(UPDATE_INTERVAL);

    if (this.killSwitch) {
      this.killSwitch = false;
      return;
    }

    this.start();
  }

  kill() {
    this.killSwitch = true;
  }

  getFreshStat() {
    const stats = [...this.serverStats];

    return stats.pop();
  }
}

module.exports = PeertubeServer;
