'use strict';

const _request = require("request");
global.fetch = require("node-fetch");
const _axios = require("redaxios");
const { SocksProxyAgent } = require("socks-proxy-agent");

const checkIfLocalhost = require("is-localhost-ip");

const dns = require("dns");
const net = require("net");
const fs = require("fs");
const path = require("path");

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
    self.accessRecords = {};
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
        const torcontrol = self.torapplications;

        const statsFilePath = path.join(torcontrol.settings.path, 'hosts-stats.json');
        const areStatsEmpty = (Object.keys(self.proxyHosts).length === 0);

        if (areStatsEmpty && fs.existsSync(statsFilePath)) {
            const fileData = fs.readFileSync(statsFilePath, { encoding: 'utf8' });
            self.proxyHosts = JSON.parse(fileData);
        }

        try {
            fs.writeFileSync(statsFilePath, JSON.stringify(self.proxyHosts, null, 2));
        } catch (err) {
            console.log('Looks like stats file is busy. Will write data next time...');
        }

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

        const torcontrol = self.torapplications;

        const statsFilePath = path.join(torcontrol.settings.path, 'hosts-stats.json');

        try {
            fs.writeFileSync(statsFilePath, JSON.stringify(self.proxyHosts, null, 2));
        } catch (err) {
            console.log('Looks like stats file is busy. Will write data next time...');
        }
    }

    const isDirectAccess = async (hostname) => {
        const isLocalhost = await checkIfLocalhost(hostname);

        if (isLocalhost) {
            return true;
        }

        const isHostListed = (hostname in self.accessRecords);

        if (!isHostListed) {
            self.accessRecords[hostname] = {};

            const pingResult = await pingHost(hostname);

            if (pingResult) {
                self.accessRecords[hostname] = {
                    accessOk: true,
                    nextTry: Date.now() + 30 * 60 * 60 * 1000, // Retry in 30 minutes
                };
            } else {
                self.accessRecords[hostname] = {
                    accessOk: false,
                    nextTry: Date.now() + 10 * 60 * 60 * 1000, // Retry in 10 minutes
                };
            }

            const torcontrol = self.torapplications;

            const statsFilePath = path.join(torcontrol.settings.path, 'hosts-stats.json');
            const areStatsEmpty = (Object.keys(self.accessRecords).length === 0);

            if (areStatsEmpty && fs.existsSync(statsFilePath)) {
                const fileData = fs.readFileSync(statsFilePath, { encoding: 'utf8' });
                self.accessRecords = JSON.parse(fileData);
            }

            try {
                fs.writeFileSync(statsFilePath, JSON.stringify(self.accessRecords, null, 2));
            } catch (err) {
                console.log('Looks like stats file is busy. Will write data next time...');
            }
        }

        const isAccessOk = (self.accessRecords[hostname].accessOk === true);
        const isNextTryTime = (self.accessRecords[hostname].nextTry <= Date.now());

        return isAccessOk || isNextTryTime;
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
                return true;
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
        const isDirectRequest = await isDirectAccess(urlParts.hostname);
        const isTorStateStarted = await isTorStarted(false);

        if (!isDirectRequest && isTorStateStarted) {
            await initHttpsAgent(preparedOpts, 'httpsAgent');
        }

        return await _axios(preparedOpts)
            .catch(async (err) => {
                if (preparedOpts.httpsAgent) {
                    throw err;
                }

                const isDirectRequest = await isDirectAccess(urlParts.hostname);
                const isTorStateStarted = await isTorStarted(false);

                if (!isDirectRequest && isTorStateStarted) {
                    await initHttpsAgent(preparedOpts, 'httpsAgent');

                    return await _axios(preparedOpts);
                }

                throw Error('Tor not started. No fallback');
            });
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
        const isDirectRequest = await isDirectAccess(urlParts.hostname);
        const isTorStateStarted = await isTorStarted(false);

        if (!isDirectRequest && isTorStateStarted) {
            await initHttpsAgent(opts, 'agent');
        }

        opts.signal = timeout(30);

        console.log('Proxy16: Fetch request arrived for', url, 'tor enabled?', !!opts.agent);
        return await fetch(url, opts)
            .catch(async (err) => {
                if (opts.agent) {
                    throw err;
                }

                const isDirectRequest = await isDirectAccess(urlParts.hostname);
                const isTorStateStarted = await isTorStarted(false);

                if (!isDirectRequest && isTorStateStarted) {
                    opts.signal = timeout(40);

                    await initHttpsAgent(opts, 'agent');

                    return await fetch(url, opts);
                }

                throw Error('Tor not started. No fallback');
            });
    }

    self.request = async (options, callBack) => {
        let req = _request;

        const urlParts = new URL(options.url);
        const isDirectRequest = await isDirectAccess(urlParts.hostname);
        const isTorStateStarted = await isTorStarted(false);

        if (!isDirectRequest && isTorStateStarted) {
            await initHttpsAgent(options, 'agent');
        }

        try {
            return req(options, (...args) => {
                callBack?.(...args)
            });
        } catch (e) {
            if (options.agent) {
                throw err;
            }

            const isDirectRequest = await isDirectAccess(urlParts.hostname);
            const isTorStateStarted = await isTorStarted(false);

            if (!isDirectRequest && isTorStateStarted) {
                await initHttpsAgent(options, 'agent');

                return req(options, (...args) => {
                    callBack?.(...args)
                });
            }

            throw Error('Tor not started. No fallback');
        }
    }

    self.isTorNeeded = async (url) => {
        const urlParts = new URL(url);
        const directAccess = await isDirectAccess(urlParts.hostname);

        return !directAccess;
    };

    self.saveHostStats = (url, stats) => undefined; //saveHostStats(url, stats);

    return self;
}
