'use strict';

const https = require('https');

const { CHROME_BROWSER_USER_AGENT } = require('../Constants');
const Logger = require('../logger/Logger');
const SocketConnection = require('../network/SocketConnection');

const CONNECT_TIMEOUT_SEC = 180;
const READ_TIMEOUT_SEC = 180;
const DEFAULT_TOR_SOCKS_PORT = 9250;

class HttpsConnectionManager {
    constructor({ configuration } = {}) {
        this.configuration = configuration || {};
    }

    async get(url, useTor, block) {
        this.requireBlock(block, 'get');

        return this.requestStream({
            url,
            method: 'GET',
            useTor,
            block
        });
    }

    async getLines(url, data = {}, useTor = false) {
        return this.requestLines({
            url: this.appendQuery(url, data),
            method: 'GET',
            useTor
        });
    }

    async post(url, data = {}, useTor = false, block) {
        this.requireBlock(block, 'post');

        const query = this.mapToQuery(data);
        const body = Buffer.from(query, 'utf8');

        return this.requestStream({
            url,
            method: 'POST',
            useTor,
            body,
            headers: {
                'Content-Length': body.length.toString()
            },
            block
        });
    }

    async postLines(url, data = {}, useTor = false) {
        const query = this.mapToQuery(data);
        const body = Buffer.from(query, 'utf8');

        return this.requestLines({
            url,
            method: 'POST',
            useTor,
            body,
            headers: {
                'Content-Length': body.length.toString()
            }
        });
    }

    async requestLines(request) {
        const chunks = [];

        await this.requestStream({
            ...request,
            block: async (inputStream) => {
                for await (const chunk of inputStream) {
                    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
                }
            }
        });

        const content = Buffer.concat(chunks).toString('utf8');
        if (!content) {
            return [];
        }

        return content.split(/\r?\n/).filter((line, index, lines) => {
            return line.length > 0 || index < lines.length - 1;
        });
    }

    async requestStream({
        url,
        method,
        useTor,
        body,
        headers = {},
        block
    }) {
        const response = await this.getHttpsUrlConnection(url, useTor, {
            method,
            headers: {
                'User-Agent': CHROME_BROWSER_USER_AGENT,
                ...headers
            },
            body
        });

        if (response.statusCode !== 200) {
            response.destroy();
            throw new Error(`HttpsConnectionManager ${url} response code ${response.statusCode}`);
        }

        if (typeof block === 'function') {
            try {
                return await block(response);
            } finally {
                response.destroy();
            }
        }

        return response;
    }

    getHttpsUrlConnection(url, useTor, options = {}) {
        const urlInfo = new URL(url);

        if (urlInfo.protocol !== 'https:') {
            return Promise.reject(new Error(`HttpsConnectionManager supports only HTTPS URLs: ${url}`));
        }

        if (useTor) {
            Logger.logi('Using tor socks proxy for url connection');
        }

        return new Promise((resolve, reject) => {
            let settled = false;
            let request;

            const finish = (callback) => {
                if (settled) {
                    return;
                }

                settled = true;
                callback();
            };

            const requestOptions = {
                hostname: urlInfo.hostname,
                port: Number(urlInfo.port || 443),
                path: `${urlInfo.pathname}${urlInfo.search}`,
                method: options.method || 'GET',
                headers: options.headers || {},
                timeout: READ_TIMEOUT_SEC * 1000
            };

            if (useTor) {
                requestOptions.createConnection = (_, connectCallback) => {
                    this.createTorSocket(urlInfo)
                        .then((socket) => SocketConnection.createTlsSocket({
                            plainSocket: socket,
                            domain: urlInfo.hostname,
                            timeoutMs: CONNECT_TIMEOUT_SEC * 1000
                        }))
                        .then((tlsSocket) => connectCallback(null, tlsSocket))
                        .catch((error) => connectCallback(error));
                };
            }

            request = https.request(requestOptions, (response) => {
                finish(() => resolve(response));
            });

            request.setTimeout(READ_TIMEOUT_SEC * 1000, () => {
                request.destroy(new Error('HTTPS_CONNECTION_READ_TIMEOUT'));
            });

            request.once('error', (error) => {
                finish(() => reject(error));
            });

            if (options.body) {
                request.write(options.body);
            }

            request.end();
        });
    }

    async createTorSocket(urlInfo) {
        return SocketConnection.createSocksSocket({
            domain: urlInfo.hostname,
            port: Number(urlInfo.port || 443),
            socksPort: this.getTorSocksPort(),
            timeoutMs: CONNECT_TIMEOUT_SEC * 1000
        });
    }

    getTorSocksPort() {
        if (typeof this.configuration.getTorSocksPort === 'function') {
            return this.configuration.getTorSocksPort();
        }

        return this.configuration.torSocksPort || DEFAULT_TOR_SOCKS_PORT;
    }

    mapToQuery(data) {
        return new URLSearchParams(data).toString();
    }

    requireBlock(block, methodName) {
        if (typeof block !== 'function') {
            throw new TypeError(`HttpsConnectionManager.${methodName} requires a block callback. Use ${methodName}Lines for line-list responses.`);
        }
    }

    appendQuery(url, data = {}) {
        const query = this.mapToQuery(data);
        if (!query) {
            return url;
        }

        return `${url}${url.includes('?') ? '&' : '?'}${query}`;
    }
}

module.exports = HttpsConnectionManager;
