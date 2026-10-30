'use strict';

class RelayAddressFingerprint {
    constructor({ ip, port, fingerprint } = {}) {
        this.ip = ip;
        this.port = port;
        this.fingerprint = fingerprint;
    }
}

module.exports = RelayAddressFingerprint;
