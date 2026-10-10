'use strict';

const net = require('net');
const tls = require('tls');

const { LOOPBACK_ADDRESS } = require('../Constants');

class SocketConnection {
    static createDirectSocket({ domain, port, timeoutMs, signal }) {
        return new Promise((resolve, reject) => {
            const socket = net.createConnection({ host: domain, port });
            let settled = false;

            const cleanup = () => {
                socket.removeListener('connect', onConnect);
                socket.removeListener('error', onError);
                socket.removeListener('timeout', onTimeout);
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

            const onConnect = () => {
                finish(() => {
                    socket.setTimeout(timeoutMs);
                    resolve(socket);
                });
            };

            const onError = (error) => {
                finish(() => {
                    socket.destroy();
                    reject(error);
                });
            };

            const onTimeout = () => {
                finish(() => {
                    socket.destroy();
                    reject(new Error('SOCKET_TIMEOUT'));
                });
            };

            const onEnd = () => {
                finish(() => reject(new Error('SOCKET_CLOSED')));
            };

            const onClose = () => {
                finish(() => reject(new Error('SOCKET_CLOSED')));
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

            socket.setTimeout(timeoutMs);
            socket.once('connect', onConnect);
            socket.once('error', onError);
            socket.once('timeout', onTimeout);
            socket.once('end', onEnd);
            socket.once('close', onClose);
            signal?.addEventListener?.('abort', onAbort, { once: true });
        });
    }

    static async createSocksSocket({ domain, port, socksPort, timeoutMs, signal }) {
        const socket = await SocketConnection.createDirectSocket({
            domain: LOOPBACK_ADDRESS,
            port: socksPort,
            timeoutMs,
            signal
        });

        try {
            await SocketConnection.writeAndExpectSocksResponse({
                socket,
                request: Buffer.from([0x05, 0x01, 0x00]),
                timeoutMs,
                signal,
                isComplete: (response) => response.length >= 2,
                validate: (response) => response[0] === 0x05 && response[1] === 0x00,
                errorMessage: 'SOCKS_AUTH_NEGOTIATION_FAILED'
            });

            const destination = Buffer.from(domain, 'utf8');
            if (destination.length > 255) {
                throw new Error('SOCKS_DOMAIN_TOO_LONG');
            }

            const request = Buffer.alloc(7 + destination.length);
            request[0] = 0x05;
            request[1] = 0x01;
            request[2] = 0x00;
            request[3] = 0x03;
            request[4] = destination.length;
            destination.copy(request, 5);
            request.writeUInt16BE(port, 5 + destination.length);

            await SocketConnection.writeAndExpectSocksResponse({
                socket,
                request,
                timeoutMs,
                signal,
                isComplete: (response) => SocketConnection.isCompleteSocksConnectResponse(response),
                validate: (response) => SocketConnection.isValidSocksConnectResponse(response),
                errorMessage: 'SOCKS_CONNECT_FAILED'
            });

            return socket;
        } catch (e) {
            socket.destroy();
            throw e;
        }
    }

    static writeAndExpectSocksResponse({
        socket,
        request,
        timeoutMs,
        signal,
        isComplete,
        validate,
        errorMessage
    }) {
        return new Promise((resolve, reject) => {
            let buffer = Buffer.alloc(0);
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
                buffer = Buffer.concat([buffer, chunk]);

                if (!isComplete(buffer)) {
                    return;
                }

                if (validate(buffer)) {
                    finish(() => resolve(buffer));
                } else {
                    finish(() => reject(new Error(`${errorMessage}: ${buffer.toString('hex')}`)));
                }
            };

            const onError = (error) => {
                finish(() => reject(error));
            };

            const onEnd = () => {
                finish(() => reject(new Error(`${errorMessage}: CLOSED`)));
            };

            const onClose = () => {
                finish(() => reject(new Error(`${errorMessage}: CLOSED`)));
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
                finish(() => reject(new Error(`${errorMessage}: TIMEOUT`)));
            }, timeoutMs);

            socket.on('data', onData);
            socket.once('error', onError);
            socket.once('end', onEnd);
            socket.once('close', onClose);
            signal?.addEventListener?.('abort', onAbort, { once: true });
            socket.write(request);
        });
    }

    static isCompleteSocksConnectResponse(response) {
        if (response.length < 5) {
            return false;
        }

        const atyp = response[3];
        if (atyp !== 0x01 && atyp !== 0x03 && atyp !== 0x04) {
            return true;
        }

        if (atyp === 0x01) {
            return response.length >= 10;
        }

        if (atyp === 0x03) {
            return response.length >= 7 + response[4];
        }

        if (atyp === 0x04) {
            return response.length >= 22;
        }

        return false;
    }

    static isValidSocksConnectResponse(response) {
        return (
            response[0] === 0x05 &&
            response[1] === 0x00 &&
            response[2] === 0x00 &&
            (response[3] === 0x01 || response[3] === 0x03 || response[3] === 0x04)
        );
    }

    static createTlsSocket({
        plainSocket,
        domain,
        timeoutMs,
        rejectUnauthorized = true,
        signal
    }) {
        return new Promise((resolve, reject) => {
            const options = {
                socket: plainSocket,
                rejectUnauthorized
            };
            if (net.isIP(domain) === 0) {
                options.servername = domain;
            }

            const socket = tls.connect(options);
            let settled = false;

            const cleanup = () => {
                socket.removeListener('secureConnect', onSecureConnect);
                socket.removeListener('error', onError);
                socket.removeListener('timeout', onTimeout);
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

            const onSecureConnect = () => {
                finish(() => {
                    socket.setTimeout(timeoutMs);
                    resolve(socket);
                });
            };

            const onError = (error) => {
                finish(() => {
                    socket.destroy();
                    reject(error);
                });
            };

            const onTimeout = () => {
                finish(() => {
                    socket.destroy();
                    reject(new Error('TLS_SOCKET_TIMEOUT'));
                });
            };

            const onEnd = () => {
                finish(() => reject(new Error('TLS_SOCKET_CLOSED')));
            };

            const onClose = () => {
                finish(() => reject(new Error('TLS_SOCKET_CLOSED')));
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

            socket.setTimeout(timeoutMs);
            socket.once('secureConnect', onSecureConnect);
            socket.once('error', onError);
            socket.once('timeout', onTimeout);
            socket.once('end', onEnd);
            socket.once('close', onClose);
            signal?.addEventListener?.('abort', onAbort, { once: true });
        });
    }

    static createAbortError() {
        const error = new Error('SOCKET_ABORTED');
        error.code = 'ECANCELLED';
        return error;
    }
}

module.exports = SocketConnection;
