'use strict';

const TorConnectionCheckerRepository = require('../../domain/network/TorConnectionCheckerRepository');
const ConfigurationRepositoryImpl = require('../configuration/ConfigurationRepositoryImpl');
const {
    CLOUDFLARE_WEBSITE,
    GOOGLE_WEBSITE,
    QUAD9_WEBSITE,
    TOR_PROJECT_WEBSITE
} = require('../../utils/Constants');
const HttpAddressChecker = require('../../utils/addresschecker/HttpAddressChecker');

const CHECK_TIMEOUT_MS = 10000;
const CHECK_DOMAINS = Object.freeze([
    TOR_PROJECT_WEBSITE,
    GOOGLE_WEBSITE,
    CLOUDFLARE_WEBSITE,
    QUAD9_WEBSITE
]);

class TorConnectionCheckerRepositoryImpl extends TorConnectionCheckerRepository {
    constructor({
        addressChecker = new HttpAddressChecker(),
        configurationRepository = new ConfigurationRepositoryImpl(),
        random = Math.random
    } = {}) {
        super();
        this.addressChecker = addressChecker;
        this.configurationRepository = configurationRepository;
        this.random = random;
    }

    async isTorConnected(signal) {
        const domain = this.getRandomDomain();

        return this.addressChecker.isHttpsAddressReachable({
            domain,
            port: 443,
            timeoutMs: CHECK_TIMEOUT_MS,
            socksPort: this.configurationRepository.getTorSocksPort(),
            signal
        });
    }

    getRandomDomain() {
        const index = Math.floor(this.random() * CHECK_DOMAINS.length);
        return CHECK_DOMAINS[index];
    }
}

module.exports = TorConnectionCheckerRepositoryImpl;
