'use strict';

const _request = require("request");
const _axios = require("axios");
const fetch = require("node-fetch");
const { SocksProxyAgent } = require("socks-proxy-agent");
const torHttpsAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050");
const yaping = require("yaping");
const tls = require("tls");

module.exports = function (enable = false) {
    const self = {};
    self.proxyHosts = {};
    self.lastUpdate = Date.now();

    const isTorNeeded = (url) => {
        const urlParts = new URL(url);
        const { hostname } = urlParts;

        const timeNow = Date.now();

        const hostStats = self.proxyHosts[hostname];

        if (!hostStats) {
            return false;
        }

        if (timeNow >= hostStats.nextTry) {
            delete self.proxyHosts[hostname];

            console.log('Proxy16: Tor needed? false. Tries left for', hostname, hostStats.triesLeft);
            return false;
        }

        if (hostStats.triesLeft || hostStats.accessible) {
            console.log('Proxy16: Tor needed? false. Tries left for', hostname, hostStats.triesLeft);
            return false;
        }

        console.log('Proxy16: Tor needed? true. Tries left for', hostname, hostStats.triesLeft);
        return true;
    }

    const saveHostStats = (url, stats) => {
        const urlParts = new URL(url);
        const { hostname } = urlParts;

        const oneHour = 60 * 60 * 1000;
        const limitTries = 3;

        const hostStats = self.proxyHosts[hostname];

        if (stats) {
            self.proxyHosts[hostname] = {
                ...self.proxyHosts[hostname],
                ...stats,
            };
        }

        if (hostStats) {
            if (hostStats.triesLeft === 0 || hostStats.accessible) {
                return;
            }

            const timeNow = Date.now();

            if (timeNow >= hostStats.nextTry - oneHour + 60 * 60) {
                console.log('Proxy16: Remove 1 try for', hostname);
                hostStats.triesLeft -= 1;
            }
        }

        self.proxyHosts[hostname] = {
            triesLeft: limitTries - 1,
            ...self.proxyHosts[hostname],
            nextTry: Date.now() + oneHour,
        };
    }

    const axiosRequest = async (arg1, arg2)=> {
        let preparedOpts = {};

        if (!arg1) {
            return Promise.reject('AXIOS_INVALID_ARG_TYPE');
        }

        if (typeof arg1 === 'string') {
            preparedOpts.url = arg1;

            if (typeof arg2 === 'object') {
                preparedOpts = { ...preparedOpts, ...arg2 };
            }
        } else if (typeof arg1 === 'object') {
            preparedOpts = arg1;
        }

        if (isTorNeeded(preparedOpts.url) && enable) {
            await awaitTor();
            preparedOpts.httpsAgent = torHttpsAgent;
        }

        try {
            return await _axios(preparedOpts)
              .then(() => {
                  saveHostStats(preparedOpts.url, { accessible: true });
              });
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (!isTorNeeded(preparedOpts.url) && isTorEnabled && enable) {
                saveHostStats(preparedOpts.url)
                return axiosRequest(preparedOpts);
            }

            throw e;
        }
    }

    self.axios = (...args) => axiosRequest(...args);
    self.axios.get = (...args) => axiosRequest(...args);
    self.axios.post = (...args) => axiosRequest(...args);
    self.axios.put = (...args) => axiosRequest(...args);
    self.axios.delete = (...args) => axiosRequest(...args);
    self.axios.patch = (...args) => axiosRequest(...args);

    self.fetch = async (url, opts = {}) => {
        let parentAbortControlSignal = opts?.signal;

        async function pingHost(host) {
            function tlsPing() {
                return new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        reject('TLS_PING_FAILED');
                    }, 5000);

                    const socket = tls.connect({ port: 443, host: host, servername: host }, () => {
                        clearTimeout(timeoutId);
                        socket.destroy();
                        resolve(true);
                    });

                    socket.on('error', (err) => {
                        reject('TLS_PING_TIMEOUT');
                    });
                });
            }

            function icmpPing() {
                return new Promise((resolve, reject) => {
                    yaping(host, (err, target) => {
                        if (err) {
                            reject('ICMP_PING_FAILED');
                            return;
                        }

                        resolve(true);
                    });
                });
            }

            return Promise.any([icmpPing(), tlsPing()])
              .catch(() => {
                  return false;
              });
        }

        function timeout(time) {
            const abortControl = new AbortController();

            parentAbortControlSignal.addEventListener('abort', () => abortControl.abort());
            setTimeout(() => abortControl.abort(), time * 1000);

            return abortControl.signal;
        }

        if (isTorNeeded(url) && enable) {
            opts.agent = torHttpsAgent;
        } else {
            const urlParts = new URL(url);
            const isPingSuccess = await pingHost(urlParts.hostname);

            if (!isPingSuccess) {
                console.log('Proxy16: Proxifing', urlParts.host)

                saveHostStats(url);
                opts.agent = torHttpsAgent;
            }
        }

        try {
            opts.signal = timeout(30);

            console.log('Proxy16: Fetch request arrived for', url, 'tor enabled?', !!opts.agent);
            return await fetch(url, opts)
                .then(async (res) => {
                    console.log('Proxy16: Fetch request received SUCCESS', 'tor enabled?', !!opts.agent);

                    saveHostStats(url, { accessible: true });
                    return res;
                })
                .catch((err) => {
                    console.log('Proxy16: Fetch request received ERROR', 'tor enabled?', !!opts.agent);
                    throw err;
                });
        } catch (e) {
            console.log('Proxy16: Retry with TOR');
            const isTorEnabled = await awaitTor();
            console.log('Proxy16: Is TOR active?', isTorEnabled);

            if (enable && isTorEnabled && !isTorNeeded(url)) {
                saveHostStats(url)

                opts.agent = torHttpsAgent;
                opts.signal = timeout(40);

                return await self.fetch(url, opts)
                  .then((res) => {
                      console.log('Proxy16: TOR Fetch request received SUCCESS');
                      return res;
                  })
                  .catch((err) => {
                      console.log('Proxy16: TOR Fetch request received ERROR');
                      if (err.code !== 'FETCH_ABORTED') {
                          // For debugging, don't remove
                          // console.log(err);
                      }
                  });
            }

            throw e;
        }
    }

    self.request = async (options, callBack) => {
        let req = _request;
        if (isTorNeeded(options.url) && enable) {
            req = _request.defaults({agent: torHttpsAgent});
        }
        try {
            return req(options, (...args) => {
                callBack?.(...args)
            });
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (enable && isTorEnabled && !isTorNeeded(options.url)) {
                saveHostStats(options.url)
                return self.request(options, callBack);
            }

            callBack?.(e);
        }
    }

    const awaitTor = async () => {
        const torcontrol = self.torapplications;

        if (!torcontrol || torcontrol?.isStopped()) {
            return Promise.resolve(false);
        }

        if (torcontrol.isStarted()) {
            return Promise.resolve(true);
        }

        return new Promise((resolve, reject) => {
            self.torapplications.onStarted(() => resolve(true));
        });
    };

    return self;
}
