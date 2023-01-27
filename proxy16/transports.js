'use strict';

const _request = require("request");
global.fetch = require("node-fetch");
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
                if (!fs.existsSync(torcontrol.settings.path)) {
                    fs.mkdirSync(torcontrol.settings.path, { recursive: true });
                }

                fs.writeFileSync(statsFilePath, JSON.stringify(self.accessRecords, null, 2));
            } catch (err) {
                console.log('Looks like stats file is busy. Will write data next time...');
            }
        }

        const isAccessOk = (self.accessRecords[hostname].accessOk === true);
        const isNextTryTime = (self.accessRecords[hostname].nextTry <= Date.now());

        if (isNextTryTime) {
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
        }

        return isAccessOk;
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

        return synackPing().catch(() => false);
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

        return _axios(preparedOpts)
            .then(res => res)
            .catch(async (err) => {
                if (preparedOpts.httpsAgent) {
                    throw err;
                }

                const isDirectRequest = await isDirectAccess(urlParts.hostname);
                const isTorStateStarted = await isTorStarted(false);

                if (!isDirectRequest && isTorStateStarted) {
                    await initHttpsAgent(preparedOpts, 'httpsAgent');

                    return _axios(preparedOpts)
                        .catch(async (err) => {
                            throw err;
                        });
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
        return fetch(url, opts)
            .then(res => res)
            .catch(async (err) => {
                if (opts.agent) {
                    throw err;
                }

                const isDirectRequest = await isDirectAccess(urlParts.hostname);
                const isTorStateStarted = await isTorStarted(false);

                if (!isDirectRequest && isTorStateStarted) {
                    opts.signal = timeout(40);

                    await initHttpsAgent(opts, 'agent');

                    return fetch(url, opts)
                        .catch(() => {
                            throw err;
                        });
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

    return self;
}
