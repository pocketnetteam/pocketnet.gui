'use strict';

const tls = require('tls');

const { CHROME_BROWSER_USER_AGENT } = require('../Constants');
const Logger = require('../logger/Logger');
const SocketConnection = require('../network/SocketConnection');

class HttpAddressChecker {
    async isHttpsAddressReachable({
        domain,
        port = 443,
        timeoutMs = 3000,
        socksPort = 0,
        signal
    }) {
        let plainSocket;
        let tlsSocket;

        try {
            plainSocket = socksPort
                ? await SocketConnection.createSocksSocket({ domain, port, socksPort, timeoutMs, signal })
                : await SocketConnection.createDirectSocket({ domain, port, timeoutMs, signal });

            tlsSocket = await SocketConnection.createTlsSocket({
                plainSocket,
                domain,
                timeoutMs,
                rejectUnauthorized: false,
                signal
            });

            if (!this.validateCertificateDomain(tlsSocket, domain)) {
                return false;
            }

            this.writeHttpRequestNoCache({
                socket: tlsSocket,
                domain,
                method: 'GET',
                headers: {
                    'User-Agent': CHROME_BROWSER_USER_AGENT
                }
            });

            const responseLine = await this.readResponseLine(tlsSocket, timeoutMs, signal);

            if (!responseLine || !responseLine.startsWith('HTTP/')) {
                Logger.logw(`Unexpected response from ${domain}:${port} -> ${responseLine}`);
                return false;
            }

            const statusCode = Number.parseInt(responseLine.split(' ')[1], 10);
            if (statusCode >= 200 && statusCode <= 404) {
                return true;
            }

            Logger.logw(`Received non-OK status code ${statusCode} from ${domain}`);
            return false;
        } catch (e) {
            this.logUnreachableAddress(domain, port, e);
            return false;
        } finally {
            tlsSocket?.destroy();
            plainSocket?.destroy();
        }
    }

    writeHttpRequestNoCache({
        socket,
        domain,
        path = '/',
        method = 'HEAD',
        headers = {}
    }) {
        const nonce = Date.now();
        const requestPath = path.includes('?')
            ? `${path}&nocache=${nonce}`
            : `${path}?nocache=${nonce}`;

        const requestHeaders = [
            `${method} ${requestPath} HTTP/1.1`,
            `Host: ${domain}`,
            'Connection: close',
            'Cache-Control: no-cache, no-store, must-revalidate',
            'Pragma: no-cache',
            'Expires: 0',
            ...Object.entries(headers).map(([key, value]) => `${key}: ${value}`),
            '',
            ''
        ];

        socket.write(requestHeaders.join('\r\n'));
    }

    readResponseLine(socket, timeoutMs, signal) {
        return new Promise((resolve, reject) => {
            let buffer = '';
            let timerId;
            let settled = false;

            const cleanup = () => {
                clearTimeout(timerId);
                socket.removeListener('data', onData);
                socket.removeListener('error', onError);
                socket.removeListener('end', onEnd);
                socket.removeListener('close', onClose);
                signal?.removeEventListener?.('abort', onAbort);
            };

            const finish = (callback) => {
                if (settled) {
                    return;
                }

                settled = true;
                cleanup();
                callback();
            };

            const onData = (chunk) => {
                buffer += chunk.toString('utf8');

                const lineEnd = buffer.indexOf('\r\n');
                if (lineEnd === -1) {
                    return;
                }

                finish(() => resolve(buffer.slice(0, lineEnd)));
            };

            const onError = (error) => {
                finish(() => reject(error));
            };

            const onEnd = () => {
                finish(() => resolve(null));
            };

            const onClose = () => {
                finish(() => resolve(null));
            };

            const onAbort = () => {
                finish(() => {
                    socket.destroy();
                    reject(SocketConnection.createAbortError());
                });
            };

            if (signal?.aborted) {
                onAbort();
                return;
            }

            timerId = setTimeout(() => {
                finish(() => reject(new Error('HTTP_RESPONSE_TIMEOUT')));
            }, timeoutMs);

            socket.on('data', onData);
            socket.once('error', onError);
            socket.once('end', onEnd);
            socket.once('close', onClose);
            signal?.addEventListener?.('abort', onAbort, { once: true });
        });
    }

    validateCertificateDomain(socket, domain) {
        const certificate = socket.getPeerCertificate();
        const error = tls.checkServerIdentity(domain, certificate);

        if (error) {
            const subject = certificate?.subject
                ? Object.entries(certificate.subject).map(([key, value]) => `${key}=${value}`).join(', ')
                : 'unknown';

            Logger.logw(`Address ${domain} certificate failure, mismatch domain in SAN or CN: ${subject}`);
            return false;
        }

        return true;
    }

    logUnreachableAddress(domain, port, error) {
        if (error?.message) {
            if (error.cause) {
                Logger.logw(`Address ${domain}:${port} unreachable. Reason: ${error.constructor.name} Details: ${error.message} ${error.cause}`);
            } else {
                Logger.logw(`Address ${domain}:${port} unreachable. Reason: ${error.constructor.name} Details: ${error.message}`);
            }
        } else {
            Logger.logw(`Address ${domain}:${port} unreachable. Reason: ${error?.constructor?.name || 'UnknownError'} `);
        }
    }
}

module.exports = HttpAddressChecker;
