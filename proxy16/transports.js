'use strict';

const _request = require("request");
const nodeFetch = require("node-fetch");
global.fetch = (...args) => nodeFetch(...args);
const _axios = require("redaxios");
const { SocksProxyAgent } = require("socks-proxy-agent");

const checkIfLocalhost = require("is-localhost-ip");

const net = require("net");
const fs = require("fs");
const path = require("path");

module.exports = function (isTorEnabled = false) {
    const self = {};
    self.accessRecords = {};
    self.lastUpdate = Date.now();

    let torHttpsAgent = null;
    const initHttpsAgent = async (opts, name) => {
        if (!torHttpsAgent) {
            const isTorStateStarted = await isTorStarted(false);

            if (!isTorStateStarted) {
                return;
            }

            torHttpsAgent = new SocksProxyAgent("socks5h://127.0.0.1:9151", {
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

    const isDirectAccess = async (url) => {
        let { hostname, port, protocol } = new URL(url);

        if (!port) {
            port = (protocol === 'https:') ? 443 : 80;
        }

        const isLocalhost = await checkIfLocalhost(hostname);

        if (isLocalhost) {
            return true;
        }

        const isHostListed = (hostname in self.accessRecords);

        if (!isHostListed) {
            self.accessRecords[hostname] = {};
            self.accessRecords[hostname].inProgress = await pingHost(hostname, port)
                .then((result) => {
                    self.accessRecords[hostname] = { accessOk: result };

                    if (result === true) {
                        // Retry in 30 minutes
                        self.accessRecords[hostname].nextTry = Date.now() + 30 * 60 * 60 * 1000;
                    } else {
                        // Retry in 10 minutes
                        self.accessRecords[hostname].nextTry = Date.now() + 10 * 60 * 60 * 1000;
                    }

                    return result;
                });

            const torcontrol = self.torapplications;

            const statsFilePath = path.join(torcontrol.settings.path, 'hosts-stats.json');
            const areStatsEmpty = (Object.keys(self.accessRecords).length === 0);

            if (areStatsEmpty && fs.existsSync(statsFilePath)) {
                const fileData = fs.readFileSync(statsFilePath, { encoding: 'utf8' });
                self.accessRecords = JSON.parse(fileData);
            }

            try {
                if (!fs.existsSync(torcontrol.settings.path)) {
                    fs.mkdirSync(torcontrol.settings.path, { recursive: true });
                }

                fs.writeFileSync(statsFilePath, JSON.stringify(self.accessRecords, null, 2), {encoding:'utf8',flag:'w'});
            } catch (err) {
                console.log('STATS_BUSY??', err);
            }
        }

        const pingPromise = self.accessRecords[hostname].inProgress;
        const isPingIsPromised = (pingPromise instanceof Promise);

        if (isPingIsPromised) {
            await pingPromise;
        }

        const isAccessOk = (self.accessRecords[hostname].accessOk === true);
        const isPingInProgress = (self.accessRecords[hostname].inProgress === true);
        const isNextTryTime = (self.accessRecords[hostname].nextTry <= Date.now());

        if (isNextTryTime && !isPingInProgress) {
            const pingResult = await pingHost(hostname, port);

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
        }

        return isAccessOk;
    }

    const pingHost = async function(host, port) {
        function synackPing() {
            return new Promise((resolve, reject) => {
                let socket;

                try {
                    socket = net.createConnection(port, host, () => {
                        socket.end();
                        socket.destroy();
                        resolve(true);
                    });
                } catch (err) {
                    reject('SYNACK_PING_FAILED');
                }

                socket.setTimeout(100);

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

        return synackPing().catch(() => {
            self.logger.w('transports', 'error', `Host ${host}:${port} was not responding 100 ms`);
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

        const isDirectRequest = await isDirectAccess(preparedOpts.url);
        const isTorStateStarted = await isTorStarted(false);

        if (!isDirectRequest && isTorStateStarted) {
            await initHttpsAgent(preparedOpts, 'httpsAgent');
        }

        self.logger.w('transports', 'error', `Sending request ${preparedOpts.url} via ${(!isDirectRequest && isTorStateStarted) ? 'TOR TRANSPORT' : 'NATIVE TRANSPORT' }`);
        return _axios(preparedOpts)
            .then(res => res)
            .catch(async (err) => {
                self.logger.w('transports', 'error', `Axios request failed for ${preparedOpts.url}: ${err}`);

                if (preparedOpts.httpsAgent) {
                    return Promise.reject(err);
                }

                const isDirectRequest = await isDirectAccess(preparedOpts.url);
                const isTorStateStarted = await isTorStarted();

                if (!isDirectRequest && isTorStateStarted) {
                    await initHttpsAgent(preparedOpts, 'httpsAgent');

                    return _axios(preparedOpts)
                        .catch(async (err) => {
                            self.logger.w('transports', 'error', `Axios nested request failed for ${preparedOpts.url}: ${err}`);
                            return Promise.reject(err);
                        });
                }

                return Promise.reject(err);
            });
    }

    self.axios = (...args) => axiosRequest(...args);
    self.axios.get = (...args) => axiosRequest(...args);
    self.axios.post = (...args) => axiosRequest(...args);
    self.axios.put = (...args) => axiosRequest(...args);
    self.axios.delete = (...args) => axiosRequest(...args);
    self.axios.patch = (...args) => axiosRequest(...args);

    self.fetch = async (url, opts = {}) => {
        const isDirectRequest = await isDirectAccess(url);
        const isTorStateStarted = await isTorStarted(false);

        if (!isDirectRequest && isTorStateStarted) {
            await initHttpsAgent(opts, 'agent');
        }

        console.log('Proxy16: Fetch request arrived for', url, 'tor enabled?', !!opts.agent);
        self.logger.w('transports', 'error', `Sending request ${url} via ${(!isDirectRequest && isTorStateStarted) ? 'TOR TRANSPORT' : 'NATIVE TRANSPORT' }`);
        return fetch(url, opts)
            .catch(async (err) => {
                self.logger.w('transports', 'error', `Fetch request failed for ${url}: ${err}`);

                if (opts.agent) {
                    return Promise.reject(err);
                }

                const isDirectRequest = await isDirectAccess(url);
                const isTorStateStarted = await isTorStarted();

                self.logger.w('transports', 'error', `Pre request TOR checkpoint. Is TOR state = STARTED? ${isTorStateStarted}`);

                if (!isDirectRequest && isTorStateStarted) {
                    await initHttpsAgent(opts, 'agent');

                    return fetch(url, opts)
                        .catch(() => {
                            self.logger.w('transports', 'error', `Fetch nested request failed for ${url}: ${err}`);
                            return Promise.reject(err);
                        });
                }

                return Promise.reject(err);
            });
    }

    self.request = async (options, callBack) => {
        let req = _request;

        const isDirectRequest = await isDirectAccess(options.url);
        const isTorStateStarted = await isTorStarted(false);

        if (!isDirectRequest && isTorStateStarted) {
            await initHttpsAgent(options, 'agent');
        }

        self.logger.w('transports', 'error', `Sending request ${options.url} via ${(!isDirectRequest && isTorStateStarted) ? 'TOR TRANSPORT' : 'NATIVE TRANSPORT' }`);
        try {
            return req(options, (...args) => {
                callBack?.(...args)
            });
        } catch (e) {
            self.logger.w('transports', 'error', `Regular request failed for ${options.url}: ${err}`);

            if (options.agent) {
                return Promise.reject(err);
            }

            const isDirectRequest = await isDirectAccess(options.url);
            const isTorStateStarted = await isTorStarted();

            self.logger.w('transports', 'error', `Pre request TOR checkpoint. Is TOR state = STARTED? ${isTorStateStarted}`);

            if (!isDirectRequest && isTorStateStarted) {
                await initHttpsAgent(options, 'agent');

                return req(options, (...args) => {
                    callBack?.(...args)
                });
            }

            self.logger.w('transports', 'error', `Regular nested request failed for ${options.url}: ${err}`);
            return Promise.reject(err);
        }
    }

    self.isTorNeeded = async (url) => {
        const directAccess = await isDirectAccess(url);

        return !directAccess;
    };

    return self;
}
