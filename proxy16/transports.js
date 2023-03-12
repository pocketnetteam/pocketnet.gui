'use strict';

const request = require('request');
const nodeFetch = require('node-fetch');
global.fetch = (...args) => {
    try {
        return nodeFetch(...args);
    } catch (err) {
        console.warn('Strange fetch error happened', err);
        return Promise.reject(err);
    }
}
const axios = require('redaxios');
const { SocksProxyAgent } = require('socks-proxy-agent');

const checkIfLocalhost = require('is-localhost-ip');

const net = require('net');
const fs = require('fs');
const path = require('path');

class WrappedAxios {
    constructor(transportsInstance) {
        this.transports = transportsInstance;
    }

    static instantiate(transportsInstance) {
        const wrappedAxios = new WrappedAxios(transportsInstance);

        const axiosMethods = (...args) => wrappedAxios.axios(...args);
        axiosMethods.get = (...args) => wrappedAxios.axios(...args);
        axiosMethods.post = (...args) => wrappedAxios.axios(...args);
        axiosMethods.put = (...args) => wrappedAxios.axios(...args);
        axiosMethods.delete = (...args) => wrappedAxios.axios(...args);
        axiosMethods.patch = (...args) => wrappedAxios.axios(...args);

        return axiosMethods;
    }

    static prepareArguments(arg1, arg2) {
        if (!arg1) {
            return Promise.reject('AXIOS_INVALID_ARG_TYPE');
        }

        if (typeof arg1 === 'string') {
            const preparedOpts = {};

            preparedOpts.url = arg1;

            if (typeof arg2 === 'object') {
                return { ...preparedOpts, ...arg2 };
            }

            return preparedOpts;
        } else if (typeof arg1 === 'object') {
            return arg1;
        }
    }

    async axios(...args) {
        const torCtrl = this.transports.torapplications;

        const preparedArgs = WrappedAxios.prepareArguments(...args);

        const hasDirectAccess = await this.transports.hasDirectAccess(preparedArgs.url);
        const isDirectAccessRestricted = (torCtrl.settings.enabled2 === 'always');
        const useDirectAccess = (hasDirectAccess && !isDirectAccessRestricted);

        let isTorReady = this.transports.isTorReady();

        if (isDirectAccessRestricted) {
            isTorReady = await this.transports.waitTorReady();
        }

        const isTorEnabledInSettings = (torCtrl.settings.enabled2 !== 'neveruse');
        const useTor = (!useDirectAccess && isTorReady && isTorEnabledInSettings);

        if (useTor) {
            const isTorAutoEnabled = (torCtrl.settings.enabled2 === 'auto');

            if (isTorAutoEnabled) {
                torCtrl.resetTimer();
            }

            this.attachAgent(preparedArgs);
        } else if (isDirectAccessRestricted && !isTorReady) {
            const failedFetch = new TypeError('Failed to fetch');
            return Promise.reject(failedFetch);
        }

        return axios(preparedArgs)
            .then(WrappedAxios.handleSuccess)
            .catch(async (error) => {
                const isAgentAttached = WrappedAxios.isAgentAttached(preparedArgs);
                const isAgentError = this.transports.checkForAgentError(error);

                if (isAgentAttached && isAgentError) {
                    return WrappedAxios.handleError(error);
                }

                const hasDirectAccess = await this.transports.hasDirectAccess(preparedArgs.url);
                const isDirectAccessRestricted = (torCtrl.settings.enabled2 === 'always');
                const useDirectAccess = (hasDirectAccess && !isDirectAccessRestricted);
                const isTorReady = await this.transports.waitTorReady();
                const isTorEnabledInSettings = (torCtrl.settings.enabled2 !== 'neveruse');
                const useTor = (!useDirectAccess && isTorReady && isTorEnabledInSettings);

                if (useTor) {
                    const isTorAutoEnabled = (torCtrl.settings.enabled2 === 'auto');

                    if (isTorAutoEnabled) {
                        torCtrl.resetTimer();
                    }

                    this.attachAgent(preparedArgs);
                } else if (isDirectAccessRestricted && !isTorReady) {
                    const failedFetch = new TypeError('Failed to fetch');
                    return Promise.reject(failedFetch);
                }

                return axios(preparedArgs)
                    .then((response) => WrappedAxios.handleSuccess(response))
                    .catch((error) => WrappedAxios.handleError(error));
            });
    }

    attachAgent(preparedArgs) {
        const urlInfo = new URL(preparedArgs.url);
        const isHttps = (urlInfo.protocol === 'https:');

        if (isHttps) {
            preparedArgs.httpsAgent = this.transports.getTorAgent();
        } else {
            preparedArgs.httpAgent = this.transports.getTorAgent();
        }
    }

    static isAgentAttached = (preparedArgs) => (!!preparedArgs.httpsAgent);

    static handleSuccess(response) {
        return Promise.resolve(response);
    }

    static handleError(error) {
        const isConnRefused = error.message.includes('ECONNREFUSED 127.0.0.1:9151');
        const isSocksRejection = error.message.includes('Socks5 proxy rejected connection');

        if (isConnRefused || isSocksRejection) {
            console.warn('SOCKS5 proxy rejection');
            return;
        }

        return Promise.reject(error);
    }
}

class WrappedFetch {
    constructor(transportsInstance) {
        this.transports = transportsInstance;
    }

    static instantiate(transportsInstance) {
        const wrappedFetch = new WrappedFetch(transportsInstance);

        return (...args) => wrappedFetch.fetch(...args);
    }

    async fetch(url, options) {
        const torCtrl = this.transports.torapplications;

        const preparedArgs = {...options};

        const hasDirectAccess = await this.transports.hasDirectAccess(url);
        const isDirectAccessRestricted = (torCtrl.settings.enabled2 === 'always');
        const useDirectAccess = (hasDirectAccess && !isDirectAccessRestricted);

        let isTorReady = this.transports.isTorReady();

        if (isDirectAccessRestricted) {
            isTorReady = await this.transports.waitTorReady();
        }

        const isTorEnabledInSettings = (torCtrl.settings.enabled2 !== 'neveruse');
        const useTor = (!useDirectAccess && isTorReady && isTorEnabledInSettings);

        if (useTor) {
            const isTorAutoEnabled = (torCtrl.settings.enabled2 === 'auto');

            if (isTorAutoEnabled) {
                torCtrl.resetTimer();
            }

            this.attachAgent(preparedArgs);
        } else if (isDirectAccessRestricted && !isTorReady) {
            const failedFetch = new TypeError('Failed to fetch');
            return Promise.reject(failedFetch);
        }

        return fetch(url, preparedArgs)
            .then((response) => {
                return WrappedFetch.handleSuccess(response, {
                    isAgentAttached: WrappedFetch.isAgentAttached(preparedArgs),
                });
            })
            .catch(async (error) => {
                const isAgentAttached = WrappedFetch.isAgentAttached(preparedArgs);
                const isAgentError = this.transports.checkForAgentError(error);

                if (isAgentAttached && isAgentError) {
                    return WrappedFetch.handleError(error);
                }

                const hasDirectAccess = await this.transports.hasDirectAccess(url);
                const isDirectAccessRestricted = (torCtrl.settings.enabled2 === 'always');
                const useDirectAccess = (hasDirectAccess && !isDirectAccessRestricted);

                let isTorReady = this.transports.isTorReady();

                if (isDirectAccessRestricted) {
                    isTorReady = await this.transports.waitTorReady();
                }

                const isTorEnabledInSettings = (torCtrl.settings.enabled2 !== 'neveruse');
                const useTor = (!useDirectAccess && isTorReady && isTorEnabledInSettings);

                if (useTor) {
                    const isTorAutoEnabled = (torCtrl.settings.enabled2 === 'auto');

                    if (isTorAutoEnabled) {
                        torCtrl.resetTimer();
                    }

                    this.attachAgent(preparedArgs);
                } else if (isDirectAccessRestricted && !isTorReady) {
                    const failedFetch = new TypeError('Failed to fetch');
                    return Promise.reject(failedFetch);
                }

                return fetch(url, preparedArgs)
                    .then((response) => {
                        return WrappedFetch.handleSuccess(response, {
                            isAgentAttached: WrappedFetch.isAgentAttached(preparedArgs),
                        });
                    })
                    .catch((error) => WrappedFetch.handleError(error));
            });
    }

    attachAgent(preparedArgs) {
        preparedArgs.agent = this.transports.getTorAgent();
    }

    static isAgentAttached = (preparedArgs) => (!!preparedArgs.agent);

    static handleSuccess(response, args = {}) {
        if (args.isAgentAttached) {
            response.headers.append('#bastyon-proxy-transport', 'tor');
        } else {
            response.headers.append('#bastyon-proxy-transport', 'direct');
        }

        return Promise.resolve(response);
    }

    static handleError(error) {
        const isConnRefused = error.message.includes('ECONNREFUSED 127.0.0.1:9151');
        const isSocksRejection = error.message.includes('Socks5 proxy rejected connection');

        if (isConnRefused || isSocksRejection) {
            console.warn('SOCKS5 proxy rejection');
            return;
        }

        return Promise.reject(error);
    }
}

class WrappedRequest {
    constructor(transportsInstance) {
        this.transports = transportsInstance;
    }

    static instantiate(transportsInstance) {
        const wrappedRequest = new WrappedRequest(transportsInstance);

        return (...args) => wrappedRequest.request(...args);
    }

    async request(options, callback) {
        const torCtrl = this.transports.torapplications;

        const preparedArgs = {...options};

        const hasDirectAccess = await this.transports.hasDirectAccess(preparedArgs.url);
        const isDirectAccessRestricted = (torCtrl.settings.enabled2 === 'always');
        const useDirectAccess = (hasDirectAccess && !isDirectAccessRestricted);

        let isTorReady = this.transports.isTorReady();

        if (isDirectAccessRestricted) {
            isTorReady = await this.transports.waitTorReady();
        }

        const isTorEnabledInSettings = (torCtrl.settings.enabled2 !== 'neveruse');
        const useTor = (!useDirectAccess && isTorReady && isTorEnabledInSettings);

        if (useTor) {
            const isTorAutoEnabled = (torCtrl.settings.enabled2 === 'auto');

            if (isTorAutoEnabled) {
                torCtrl.resetTimer();
            }

            this.attachAgent(preparedArgs);
        } else if (isDirectAccessRestricted && !isTorReady) {
            const failedFetch = new TypeError('Failed to fetch');
            return Promise.reject(failedFetch);
        }

        request(preparedArgs, async (error, response, body) => {
            let preparedResult = {};

            if (error) {
                const isAgentAttached = WrappedRequest.isAgentAttached(preparedArgs);
                const isAgentError = this.transports.checkForAgentError(error);

                if (isAgentAttached && isAgentError) {
                    preparedResult.error = WrappedRequest.handleError(error);
                    callback?.(preparedResult.error, response, body);
                }

                const hasDirectAccess = await this.transports.hasDirectAccess(url);
                const isDirectAccessRestricted = (torCtrl.settings.enabled2 === 'always');
                const useDirectAccess = (hasDirectAccess && !isDirectAccessRestricted);
                const isTorReady = await this.transports.waitTorReady();
                const isTorEnabledInSettings = (torCtrl.settings.enabled2 !== 'neveruse');
                const useTor = (!useDirectAccess && isTorReady && isTorEnabledInSettings);

                if (useTor) {
                    const isTorAutoEnabled = (torCtrl.settings.enabled2 === 'auto');

                    if (isTorAutoEnabled) {
                        torCtrl.resetTimer();
                    }

                    this.attachAgent(preparedArgs);
                } else if (isDirectAccessRestricted && !isTorReady) {
                    const failedFetch = new TypeError('Failed to fetch');
                    return Promise.reject(failedFetch);
                }

                request(preparedArgs, () => {
                    if (error) {
                        preparedResult.error = WrappedRequest.handleError(error);
                    } else {
                        const success = WrappedRequest.handleSuccess(response, body);
                        preparedResult.response = success.response;
                        preparedResult.body = success.body;
                    }

                    callback?.(preparedResult.error, preparedResult.response, preparedResult.body);
                });
            } else {
                const success = WrappedRequest.handleSuccess(response, body);
                preparedResult.response = success.response;
                preparedResult.body = success.body;

                callback?.(error, preparedResult.response, preparedResult.body);
            }
        });
    }

    attachAgent(preparedArgs) {
        preparedArgs.agent = this.transports.getTorAgent();
    }

    static isAgentAttached = (preparedArgs) => (!!preparedArgs.agent);

    static handleSuccess(response, body) {
        return { response, body };
    }

    static handleError(error) {
        const isConnRefused = error.message.includes('ECONNREFUSED 127.0.0.1:9151');
        const isSocksRejection = error.message.includes('Socks5 proxy rejected connection');

        if (isConnRefused || isSocksRejection) {
            console.warn('SOCKS5 proxy rejection');
            return;
        }

        return error;
    }
}

class Transports {
    accessRecords = {};
    torAgent = null;
    torStartPromise = null;

    axios = WrappedAxios.instantiate(this);
    fetch = WrappedFetch.instantiate(this);
    request = WrappedRequest.instantiate(this);

    static waitTimeout = (seconds, orReturn) => new Promise((resolve) => {
        setTimeout(() => resolve(orReturn), seconds * 1000);
    });

    async hasDirectAccess(url) {
        let { hostname, port, protocol } = new URL(url);

        if (!port) {
            port = (protocol === 'https:') ? 443 : 80;
        }

        const isLocalhost = await checkIfLocalhost(hostname);

        if (isLocalhost) {
            return true;
        }

        const isHostListed = (hostname in this.accessRecords);

        if (!isHostListed) {
            this.accessRecords[hostname] = {};
            this.accessRecords[hostname].inProgress = await this.pingHost(hostname, port)
                .then((result) => {
                    this.accessRecords[hostname] = { accessOk: result };

                    if (result === true) {
                        // Retry in 30 minutes
                        this.accessRecords[hostname].nextTry = Date.now() + 30 * 60 * 60 * 1000;
                    } else {
                        // Retry in 10 minutes
                        this.accessRecords[hostname].nextTry = Date.now() + 10 * 60 * 60 * 1000;
                    }

                    return result;
                });

            const torcontrol = this.torapplications;

            const statsFilePath = path.join(torcontrol.getsettingspath(), 'hosts-stats.json');
            const areStatsEmpty = (Object.keys(this.accessRecords).length === 0);

            if (areStatsEmpty && fs.existsSync(statsFilePath)) {
                const fileData = fs.readFileSync(statsFilePath, { encoding: 'utf8' });
                this.accessRecords = JSON.parse(fileData);
            }

            try {
                if (!fs.existsSync(torcontrol.settings.path)) {
                    fs.mkdirSync(torcontrol.settings.path, { recursive: true });
                }

                fs.writeFileSync(statsFilePath, JSON.stringify(this.accessRecords, null, 2), {encoding:'utf8',flag:'w'});
            } catch (err) {
                console.warn('Hosts stats are not available:', err.message);
            }
        }

        const pingPromise = this.accessRecords[hostname].inProgress;
        const isPingIsPromised = (pingPromise instanceof Promise);

        if (isPingIsPromised) {
            await pingPromise;
        }

        const isAccessOk = (this.accessRecords[hostname].accessOk === true);
        const isPingInProgress = (this.accessRecords[hostname].inProgress === true);
        const isNextTryTime = (this.accessRecords[hostname].nextTry <= Date.now());

        if (isNextTryTime && !isPingInProgress) {
            const pingResult = await this.pingHost(hostname, port);

            if (pingResult) {
                this.accessRecords[hostname] = {
                    accessOk: true,
                    nextTry: Date.now() + 30 * 60 * 60 * 1000, // Retry in 30 minutes
                };
            } else {
                this.accessRecords[hostname] = {
                    accessOk: false,
                    nextTry: Date.now() + 10 * 60 * 60 * 1000, // Retry in 10 minutes
                };
            }
        }

        return isAccessOk;
    }

    async pingHost(host, port) {
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
            return false;
        });
    }

    async waitTorReady() {
        const timeout = Transports.waitTimeout(60 * 5, false);

        let torStart;

        if (this.torStartPromise) {
            torStart = this.torStartPromise;
        } else {
            torStart = new Promise((resolve) => {
                this.torapplications.onStarted(() => resolve(true));
            });

            this.torStartPromise = torStart;
        }

        return Promise.race([ torStart, timeout ]);
    }

    isTorReady() {
        const torCtrl = this.torapplications;
        return torCtrl && torCtrl.isStarted();
    }

    getTorAgent() {
        if (!this.torAgent) {
            this.torAgent = new SocksProxyAgent('socks5h://127.0.0.1:9151', {
                keepAlive: true,
                timeout: 60000,
            });
        }

        return this.torAgent;
    }

    async isTorNeeded(url) {
        const torCtrl = this.torapplications;

        const hasDirectAccess = await this.hasDirectAccess(url);
        const isDirectRestricted = (torCtrl.settings.enabled2 === 'always');
        const isTorAutoEnabled = (torCtrl.settings.enabled2 === 'auto');
        const useDirectAccess = (hasDirectAccess && !isDirectRestricted);

        let isTorReady = this.isTorReady();

        if (isDirectRestricted || (isTorAutoEnabled && !hasDirectAccess && !isTorReady)) {
            torCtrl.start();
            isTorReady = await this.waitTorReady();
        }

        const isTorEnabledInSettings = (torCtrl.settings.enabled2 !== 'neveruse');
        const useTor = (!useDirectAccess && isTorReady && isTorEnabledInSettings);

        return !!useTor;
    }

    checkForAgentError(error) {
        const isSocksRejected = /Socks5 proxy rejected connection - Failed/;
        const isSocketNotCreated = /A "socket" was not created/;

        return (
            isSocksRejected.test(error.message) ||
            isSocketNotCreated.test(error.message)
        );
    }
}

module.exports = Transports;
