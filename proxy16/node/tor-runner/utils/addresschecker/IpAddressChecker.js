'use strict';

const SocketConnection = require('../network/SocketConnection');

const CONNECT_TIMEOUT_SEC = 5;
const READ_TIMEOUT_SEC = 5;

class IpAddressChecker {
    async isIpAddressReachable({
        ip,
        port,
        connectTimeoutSec = CONNECT_TIMEOUT_SEC,
        readTimeoutSec = READ_TIMEOUT_SEC
    }) {
        let socket;

        try {
            socket = await SocketConnection.createDirectSocket({
                domain: ip,
                port,
                timeoutMs: connectTimeoutSec * 1000
            });
            socket.setTimeout(readTimeoutSec * 1000);

            return socket.readyState === 'open';
        } catch (e) {
            return false;
        } finally {
            socket?.destroy();
        }
    }
}

module.exports = IpAddressChecker;
