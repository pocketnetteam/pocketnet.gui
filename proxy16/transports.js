'use strict';

const _request = require("request");
global.fetch = require("node-fetch");
const _axios = require("redaxios");
const { SocksProxyAgent } = require("socks-proxy-agent");
const tls = require("tls");

const promisedLocalhostChecker = import("is-localhost-ip");

const dns = require("dns");

const pingUtil = require("icmp-ping").createSession({
    packetSize: 64,
    timeout: 5000,
    retries: 3,
});

module.exports = function (enable = false) {
    const self = {};
    self.proxyHosts = {};
    self.lastUpdate = Date.now();

    let torHttpsAgent = null;
    const initHttpsAgent = async (opts, name) => {
        if (!torHttpsAgent) {
            await awaitTor();
            torHttpsAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050", { keepAlive: true });
        }

        opts[name] = torHttpsAgent;
    };

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
        const limitTries = 1;

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

    const getHostIp = async (host) => {
        return new Promise((resolve, reject) => {
            dns.lookup(host, 4, (err, address) => {
                if (err) {
                    reject(err);
                }

                resolve(address);
            });
        });
    }

    const pingHost = async function(host) {
        function tlsPing() {
            return new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject('TLS_PING_FAILED');
                }, 10000);

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
            return new Promise(async (resolve, reject) => {
                const hostIp = await getHostIp(host);

                pingUtil.pingHost(hostIp, (err, target) => {
                    if (err) {
                        reject('ICMP_PING_FAILED');
                        return;
                    }

                    resolve(true);
                });
            });
        }

        console.log('Proxy16: Ping started', host);
        const pingStart = Date.now();

        return Promise.any([icmpPing(), tlsPing()])
            .then((response) => {
                const pingTime = (Date.now() - pingStart) / 1000;

                console.log('Proxy16: Ping success', host, pingTime);
                return response;
            })
            .catch(() => {
                const pingTime = (Date.now() - pingStart) / 1000;

                console.log('Proxy16: Ping fail', host, pingTime);
                return false;
            });
    }

    const axiosRequest = async (arg1, arg2, child)=> {
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

        const urlParts = new URL(preparedOpts.url);
        const checkIfLocalhost = (await promisedLocalhostChecker).default;
        const isLocalhost = await checkIfLocalhost(urlParts.hostname);

        if (!isLocalhost && isTorNeeded(preparedOpts.url) && enable) {
            await initHttpsAgent(preparedOpts, 'httpsAgent');
        } else if (!isLocalhost) {
            const isPingSuccess = await pingHost(urlParts.hostname);

            if (!isPingSuccess) {
                console.log('Proxy16: Proxifing', urlParts.host)

                saveHostStats(preparedOpts.url);

                await initHttpsAgent(preparedOpts, 'httpsAgent');
            }
        }

        try {
            return await _axios(preparedOpts)
              .then((response) => {
                    if (preparedOpts.httpsAgent) {
                        saveHostStats(preparedOpts.url);
                    } else {
                        saveHostStats(preparedOpts.url, { accessible: true });
                    }

                  return response;
                })
                .catch((err) => {
                    saveHostStats(preparedOpts.url);
                    throw err;
              });
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (!isLocalhost && !isTorNeeded(preparedOpts.url) && isTorEnabled && enable) {
                return _axios(preparedOpts)
                    .then((response) => {
                        saveHostStats(preparedOpts.url);
                        return response;
                    })
                    .catch((err) => {
                        saveHostStats(preparedOpts.url);
                        throw err;
                    });
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

        function timeout(time) {
            const abortControl = new AbortController();

            parentAbortControlSignal?.addEventListener('abort', () => abortControl.abort());
            setTimeout(() => abortControl.abort(), time * 1000);

            return abortControl.signal;
        }

        const urlParts = new URL(url);
        const checkIfLocalhost = (await promisedLocalhostChecker).default;
        const isLocalhost = await checkIfLocalhost(urlParts.hostname);

        if (!isLocalhost && isTorNeeded(url) && enable) {
            await initHttpsAgent(opts, 'agent');
        } else {
            const isPingSuccess = await pingHost(urlParts.hostname);

            if (!isPingSuccess) {
                console.log('Proxy16: Proxifing', urlParts.host)

                saveHostStats(url);

                await initHttpsAgent(opts, 'agent');
            }
        }

        try {
            opts.signal = timeout(30);

            console.log('Proxy16: Fetch request arrived for', url, 'tor enabled?', !!opts.agent);
            return await fetch(url, opts)
                .then(async (res) => {
                    console.log('Proxy16: Fetch request received SUCCESS', 'tor enabled?', !!opts.agent);

                    if (opts.agent) {
                        saveHostStats(url);
                    } else {
                        saveHostStats(url, { accessible: true });
                    }

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

            if (!isLocalhost && enable && isTorEnabled && !isTorNeeded(url)) {
                saveHostStats(url)

                opts.agent = torHttpsAgent;
                opts.signal = timeout(40);

                return await fetch(url, opts)
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

        const urlParts = new URL(options.url);
        const checkIfLocalhost = (await promisedLocalhostChecker).default;
        const isLocalhost = await checkIfLocalhost(urlParts.hostname);

        if (!isLocalhost && isTorNeeded(options.url) && enable) {
            req = _request.defaults({agent: torHttpsAgent});
        }

        try {
            return req(options, (...args) => {
                callBack?.(...args)
            });
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (!isLocalhost && enable && isTorEnabled && !isTorNeeded(options.url)) {
                saveHostStats(options.url)
                return self.request(options, callBack);
            }

            callBack?.(e);
        }
    }

    self.isTorNeeded = (url) => isTorNeeded(url);

    self.saveHostStats = (url, stats) => saveHostStats(url, stats);

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
