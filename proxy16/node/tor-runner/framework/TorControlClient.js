'use strict';

const crypto = require('crypto');
const net = require('net');

const ConfigurationRepositoryImpl = require('../data/configuration/ConfigurationRepositoryImpl');

const CONTROL_CHECK_TIMEOUT_MS = 2000;
const CONTROL_COOKIE_LENGTH = 32;
const SAFECOOKIE_SERVER_KEY = Buffer.from('Tor safe cookie authentication server-to-controller hash');
const SAFECOOKIE_CLIENT_KEY = Buffer.from('Tor safe cookie authentication controller-to-server hash');
const SUPPORTED_SIGNALS = new Set(['RELOAD', 'SHUTDOWN']);

class TorControlClient {
    constructor({
        configuration = new ConfigurationRepositoryImpl(),
        timeoutMs = CONTROL_CHECK_TIMEOUT_MS
    } = {}) {
        this.configuration = configuration;
        this.timeoutMs = timeoutMs;
    }

    async getPid() {
        return this.execute();
    }

    async signal(command) {
        if (!SUPPORTED_SIGNALS.has(command)) {
            return null;
        }

        return this.execute(command);
    }

    async execute(signal = null) {
        const port = this.configuration.getTorControlPort?.();
        const cookie = await this.configuration.getTorControlCookieAsync?.();
        if (
            !Number.isInteger(port) ||
            !Buffer.isBuffer(cookie) ||
            cookie.length !== CONTROL_COOKIE_LENGTH
        ) {
            return null;
        }

        return new Promise((resolve) => {
            const socket = net.createConnection({ host: '127.0.0.1', port });
            let responseBuffer = '';
            let completed = false;
            let state = 'protocolInfo';
            let supportsSafeCookie = false;
            let clientNonce = null;
            let authenticatedPid = null;
            let timeoutId = null;
            const finish = (pid) => {
                if (completed) {
                    return;
                }

                completed = true;
                clearTimeout(timeoutId);
                socket.destroy();
                resolve(pid);
            };
            const finishRunning = () => finish(authenticatedPid);
            const finishUnknown = () => finish(null);
            const createHash = (key, serverNonce) => {
                return crypto.createHmac('sha256', key)
                    .update(Buffer.concat([cookie, clientNonce, serverNonce]))
                    .digest();
            };
            const finishAfterConnectionClosed = () => {
                if (signal === 'SHUTDOWN' && state === 'signal' && authenticatedPid) {
                    finishRunning();
                    return;
                }

                finishUnknown();
            };
            const handleLine = (line) => {
                if (/^5\d\d /.test(line)) {
                    finishUnknown();
                    return;
                }

                if (state === 'protocolInfo') {
                    if (/^250-AUTH .*METHODS=[^ ]*SAFECOOKIE/.test(line)) {
                        supportsSafeCookie = true;
                    } else if (line === '250 OK') {
                        if (!supportsSafeCookie) {
                            finishUnknown();
                            return;
                        }

                        clientNonce = crypto.randomBytes(CONTROL_COOKIE_LENGTH);
                        state = 'challenge';
                        socket.write(`AUTHCHALLENGE SAFECOOKIE ${clientNonce.toString('hex')}\r\n`);
                    }
                    return;
                }

                if (state === 'challenge') {
                    const match = line.match(/^250 AUTHCHALLENGE SERVERHASH=([A-Fa-f0-9]{64}) SERVERNONCE=([A-Fa-f0-9]{64})$/);
                    if (!match) {
                        return;
                    }

                    const serverHash = Buffer.from(match[1], 'hex');
                    const serverNonce = Buffer.from(match[2], 'hex');
                    const expectedHash = createHash(SAFECOOKIE_SERVER_KEY, serverNonce);
                    if (!crypto.timingSafeEqual(serverHash, expectedHash)) {
                        finishUnknown();
                        return;
                    }

                    const clientHash = createHash(SAFECOOKIE_CLIENT_KEY, serverNonce);
                    state = 'authenticate';
                    socket.write(`AUTHENTICATE ${clientHash.toString('hex')}\r\n`);
                    return;
                }

                if (state === 'authenticate' && line === '250 OK') {
                    state = 'getPid';
                    socket.write('GETINFO process/pid\r\n');
                    return;
                }

                if (state === 'getPid') {
                    const match = line.match(/^250-process\/pid=(\d+)$/);
                    if (match) {
                        authenticatedPid = TorControlClient.parsePid(match[1]);
                    } else if (line === '250 OK' && authenticatedPid) {
                        if (!signal) {
                            finishRunning();
                        } else {
                            state = 'signal';
                            socket.write(`SIGNAL ${signal}\r\n`);
                        }
                    }
                    return;
                }

                if (state === 'signal' && line === '250 OK') {
                    finishRunning();
                }
            };
            timeoutId = setTimeout(finishUnknown, this.timeoutMs);

            socket.once('connect', () => {
                socket.write('PROTOCOLINFO 1\r\n');
            });
            socket.on('data', (chunk) => {
                responseBuffer += String(chunk);
                const lines = responseBuffer.split(/\r?\n/);
                responseBuffer = lines.pop() || '';
                lines.filter(Boolean).forEach(handleLine);
            });
            socket.once('error', () => {
                finishAfterConnectionClosed();
            });
            socket.once('end', finishAfterConnectionClosed);
            socket.once('close', finishAfterConnectionClosed);
        });
    }

    static parsePid(pid) {
        const parsedPid = Number(pid);
        return Number.isInteger(parsedPid) && parsedPid > 0 ? parsedPid : null;
    }
}

module.exports = TorControlClient;
