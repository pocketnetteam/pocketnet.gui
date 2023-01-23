'use strict';

const _request = require("request");
global.fetch = require("node-fetch");
const _axios = require("redaxios");
const { SocksProxyAgent } = require("socks-proxy-agent");

const checkIfLocalhost = require("is-localhost-ip");

const dns = require("dns");
const net = require("net");

let netPing;
let pingUtil;

function initPingUtil() {
    try {
        netPing = require("net-ping");
    } catch (err) {
        console.log('-----------------------------------------------------');
        console.log('Raw-Socket is not compiled for current platform/arch:', process.platform, process.arch);
        console.log('-----------------------------------------------------');
    }

    if (netPing) {
        try {
            pingUtil = netPing.createSession({
                packetSize: 64,
                timeout: 5000,
                retries: 3,
            });
        } catch (err) {
            console.log('-----------------------------------------------------');

            if (err.message === 'Operation not permitted') {
                console.log('Raw-Socket is not permitted on current machine, looks like it is in sandbox...');
            } else {
                console.log('Raw-Socket encountered an unexpected error:', err.message);
            }

            console.log('-----------------------------------------------------');
        }
    }
}

initPingUtil();

module.exports = function (isTorEnabled = false) {
    const self = {};
    self.proxyHosts = {};
    self.lastUpdate = Date.now();

    let torHttpsAgent = null;
    const initHttpsAgent = async (opts, name) => {
        if (!torHttpsAgent) {
            const isTorStateStarted = await isTorStarted(false);

            if (!isTorStateStarted) {
                return;
            }

            torHttpsAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050", {
                keepAlive: true,
                timeout: 60000,
            });
        }

        opts[name] = torHttpsAgent;
    };

    const isTorStarted = async (wait = true) => {
        if (!isTorEnabled) {
            return Promise.resolve(false);
        }

        const torcontrol = self.torapplications;

        if (!torcontrol || torcontrol?.isStopped()) {
            return Promise.resolve(false);
        }

        if (torcontrol.isStarted()) {
            return Promise.resolve(true);
        }

        if (!wait) {
            return Promise.resolve(false);
        }

        return new Promise((resolve, reject) => {
            const torTimeout = setTimeout(() => {
                resolve(false);
            }, 60000);

            self.torapplications.onStarted(() => {
                resolve(true);
                clearInterval(torTimeout);
            });
        });
    };

    const isTorNeeded = async (url) => {
        const isTorStateStarted = await isTorStarted(false);

        if (!isTorStateStarted) {
            return false;
        }

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

    const saveHostStats = async (url, stats) => {
        const isTorStateStarted = await isTorStarted(false);

        if (!isTorStateStarted) {
            return;
        }

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
        function synackPing() {
            return new Promise((resolve, reject) => {
                let socket;

                try {
                    socket = net.createConnection(443, host, () => {
                        socket.end();
                        socket.destroy();
                        resolve(true);
                    });
                } catch (err) {
                    reject('SYNACK_PING_FAILED');
                }

                socket.setTimeout(3000);

                socket.on('error', (err) => {
                    socket.end();
                    socket.destroy();
                    reject('SYNACK_PING_FAILED');
                });

                socket.on('timeout', (err) => {
                    socket.end();
                    socket.destroy();
                    reject('SYNACK_PING_TIMEOUT');
                });
            });
        }

        function icmpPing() {
            if (!pingUtil) {
                return Promise.reject('ICMP_PING_FAILED');
            }

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

        return Promise.any([icmpPing(), synackPing()])
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
        const isLocalhost = await checkIfLocalhost(urlParts.hostname);
        const isTorRequest = isTorNeeded(preparedOpts.url);
        const isTorStateStarted = await isTorStarted(false);

        if (!isLocalhost && isTorRequest && isTorStateStarted) {
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
            const isTorStateStarted = await isTorStarted();
            const isTorRequest = isTorNeeded(preparedOpts.url);

            if (!isLocalhost && !isTorRequest && isTorStateStarted) {
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
        const isLocalhost = await checkIfLocalhost(urlParts.hostname);
        const isTorRequest = isTorNeeded(url);
        const isTorStateStarted = await isTorStarted(false);

        if (!isLocalhost && isTorRequest && isTorStateStarted) {
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
            const isTorStateStarted = await isTorStarted();
            const isTorRequest = isTorNeeded(url);
            console.log('Proxy16: Is TOR active?', isTorStateStarted);

            if (!isLocalhost && isTorStateStarted && !isTorRequest) {
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
        }
    }

    self.request = async (options, callBack) => {
        let req = _request;

        const urlParts = new URL(options.url);
        const isLocalhost = await checkIfLocalhost(urlParts.hostname);
        const isTorRequest = isTorNeeded(options.url);
        const isTorStateStarted = await isTorStarted(false);

        if (!isLocalhost && isTorRequest && isTorStateStarted) {
            req = _request.defaults({agent: torHttpsAgent});
        }

        try {
            return req(options, (...args) => {
                callBack?.(...args)
            });
        } catch (e) {
            const isTorStateStarted = await isTorStarted();
            const isTorRequest = isTorNeeded(options.url);

            if (!isLocalhost && isTorStateStarted && !isTorRequest) {
                saveHostStats(options.url)
                return self.request(options, callBack);
            }

            callBack?.(e);
        }
    }

    self.isTorNeeded = (url) => isTorNeeded(url);

    self.saveHostStats = (url, stats) => saveHostStats(url, stats);

    return self;
}
