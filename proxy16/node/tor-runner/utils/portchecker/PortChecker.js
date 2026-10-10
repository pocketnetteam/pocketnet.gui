'use strict';

const dgram = require('dgram');
const net = require('net');

const {
    LOOPBACK_ADDRESS,
    MAX_PORT_NUMBER,
    NUMBER_REGEX
} = require('../Constants');

class PortChecker {
    async isPortBusy(port) {
        const portInt = this.parsePort(port);
        if (portInt === null) {
            return true;
        }

        return !(await this.isPortAvailable(portInt));
    }

    async isPortAvailable(port) {
        if (await this.isTCPPortAvailable(port)) {
            return this.isUDPPortAvailable(port);
        }

        return false;
    }

    async getFreePort(port) {
        const portInt = this.parsePort(port);
        if (portInt === null) {
            return port;
        }

        for (let i = 0; i < 3; i += 1) {
            const freePort = portInt + i + 1;
            if (await this.isPortAvailable(freePort)) {
                return String(freePort);
            }
        }

        return port;
    }

    isTCPPortAvailable(port) {
        return new Promise((resolve) => {
            const socket = new net.Socket();
            let settled = false;

            const finish = (available) => {
                if (settled) {
                    return;
                }

                settled = true;
                socket.destroy();
                resolve(available);
            };

            socket.setTimeout(200);
            socket.once('connect', () => finish(false));
            socket.once('timeout', () => finish(true));
            socket.once('error', (e) => {
                finish(e && e.code === 'ECONNREFUSED');
            });

            try {
                socket.connect(port, LOOPBACK_ADDRESS);
            } catch (e) {
                finish(false);
            }
        });
    }

    isUDPPortAvailable(port) {
        return new Promise((resolve) => {
            const socket = dgram.createSocket('udp4');
            let settled = false;

            const finish = (available) => {
                if (settled) {
                    return;
                }

                settled = true;
                socket.close(() => resolve(available));
            };

            socket.once('error', () => finish(false));
            socket.once('listening', () => finish(true));

            try {
                socket.bind(port, LOOPBACK_ADDRESS);
            } catch (e) {
                finish(false);
            }
        });
    }

    parsePort(port) {
        const portString = String(port);

        if (
            NUMBER_REGEX.test(portString)
            && portString.length <= 5
            && Number(portString) <= MAX_PORT_NUMBER
        ) {
            return Number(portString);
        }

        return null;
    }
}

module.exports = PortChecker;
