'use strict';

const VanillaRelaysRepository = require('../../domain/configuration/VanillaRelaysRepository');
const RelayAddressFingerprint = require('../../domain/configuration/RelayAddressFingerprint');
const IpToPort = require('../../domain/addresschecker/IpToPort');
const AddressCheckerRepositoryImpl = require('../addresschecker/AddressCheckerRepositoryImpl');
const {
    IPv4_REGEX,
    IPv6_REGEX,
    MAX_PORT_NUMBER,
    NUMBER_REGEX,
    ONIONOO_SITE_ADDRESS
} = require('../../utils/Constants');
const Logger = require('../../utils/logger/Logger');
const HttpsConnectionManager = require('../../utils/web/HttpsConnectionManager');

const MAX_CHECK_RELAY_COUNT = 30;
const MAX_GET_RELAY_COUNT = 3;
const FINGERPRINT_LENGTH = 40;
const DESIGNATED_TOR_PORTS = new Set(['9001', '9030', '9040', '9050', '9051', '9150']);

class VanillaRelaysRepositoryImpl extends VanillaRelaysRepository {
    constructor({
        httpsConnectionManager = new HttpsConnectionManager(),
        addressCheckerRepository = new AddressCheckerRepositoryImpl(),
        random = Math.random
    } = {}) {
        super();
        this.httpsConnectionManager = httpsConnectionManager;
        this.addressCheckerRepository = addressCheckerRepository;
        this.random = random;
        this.bridgeIPv4Pattern = new RegExp(`(${IPv4_REGEX}):(\\d+)\\b`);
        this.bridgeIPv6Pattern = new RegExp(`\\[(${IPv6_REGEX})]:(\\d+)\\b`);
    }

    async requestVanillaRelays(allowIPv6Relays) {
        const relays = this.shuffle(await this.getRelaysWithFingerprintAndAddress(allowIPv6Relays))
            .slice(0, MAX_CHECK_RELAY_COUNT)
            .sort((left, right) => Number(left.port) - Number(right.port));

        const reachableRelays = [];

        for (const relay of relays) {
            if (DESIGNATED_TOR_PORTS.has(relay.port)) {
                continue;
            }

            const reachable = await this.addressCheckerRepository.isAddressReachable(
                new IpToPort({ip: relay.ip, port: Number(relay.port)}),
                2
            );

            if (reachable) {
                reachableRelays.push(relay);
            }

            if (reachableRelays.length >= MAX_GET_RELAY_COUNT) {
                break;
            }
        }

        return reachableRelays.map((relay) => {
            return `${this.formatRelayAddress(relay)} ${relay.fingerprint}`;
        });
    }

    async getRelaysWithFingerprintAndAddress(allowIPv6Relays) {
        const relayLines = await this.requestRelaysWithFingerprintAndAddress();
        if (relayLines.length === 0) {
            return [];
        }

        try {
            return this.mapResponseToRelays(relayLines.join('\n'), allowIPv6Relays);
        } catch (responseError) {
            const relays = [];

            for (const relayLine of relayLines) {
                try {
                    relays.push(...this.mapResponseToRelays(relayLine, allowIPv6Relays));
                } catch (e) {}
            }

            if (relays.length > 0) {
                return relays;
            }

            Logger.logw('VanillaRelaysRepository getRelaysWithFingerprintAndAddress', responseError);
            return [];
        }
    }

    async requestRelaysWithFingerprintAndAddress() {
        try {
            return await this.httpsConnectionManager.getLines(`${ONIONOO_SITE_ADDRESS}details`, {
                type: 'relay',
                running: 'true',
                fields: 'fingerprint,or_addresses'
            }, true);
        } catch (e) {
            Logger.loge('VanillaRelaysRepository requestRelaysWithFingerprintAndAddress', e);
            return [];
        }
    }

    mapResponseToRelays(response, allowIPv6Relays) {
        const json = JSON.parse(response);
        if (Array.isArray(json.relays)) {
            const relays = [];

            for (const relay of json.relays) {
                try {
                    relays.push(...this.mapJsonToRelay(relay, allowIPv6Relays));
                } catch (e) {
                    Logger.logw('VanillaRelaysRepository getRelaysWithFingerprintAndAddress', e);
                }
            }

            return relays;
        }

        return this.mapJsonToRelay(json, allowIPv6Relays);
    }

    mapJsonToRelay(json, allowIPv6Relays) {
        const relays = [];
        const orAddresses = Array.isArray(json.or_addresses) ? json.or_addresses : [];
        const fingerprint = typeof json.fingerprint === 'string' ? json.fingerprint : '';

        for (const relayLine of orAddresses) {
            if (typeof relayLine !== 'string') {
                continue;
            }

            const ipv4Relay = this.parseIPv4Relay(relayLine, fingerprint);
            if (ipv4Relay) {
                relays.push(ipv4Relay);
            }

            if (allowIPv6Relays && this.isIPv6Bridge(relayLine)) {
                const ipv6Relay = this.parseIPv6Relay(relayLine, fingerprint);
                if (ipv6Relay) {
                    relays.push(ipv6Relay);
                }
            }
        }

        if (relays.length > 0) {
            return relays;
        }

        throw new Error(`JSON ${JSON.stringify(json)} is not valid relay`);
    }

    parseIPv4Relay(relayLine, fingerprint) {
        const match = this.bridgeIPv4Pattern.exec(relayLine);
        if (!match) {
            return null;
        }

        return this.mapToRelayAddressFingerprint(match[1], match[2], fingerprint);
    }

    parseIPv6Relay(relayLine, fingerprint) {
        const match = this.bridgeIPv6Pattern.exec(relayLine);
        if (!match) {
            return null;
        }

        const ip = match[1];
        const port = match[match.length - 1];

        return this.mapToRelayAddressFingerprint(ip, port, fingerprint);
    }

    mapToRelayAddressFingerprint(ip, port, fingerprint) {
        const portValue = Number(port);

        if (typeof ip === 'string' && ip.trim().length > 0
            && typeof port === 'string' && port.trim().length > 0
            && NUMBER_REGEX.test(port) && port.length <= 5 && portValue <= MAX_PORT_NUMBER
            && typeof fingerprint === 'string' && fingerprint.length === FINGERPRINT_LENGTH
        ) {
            return new RelayAddressFingerprint({
                ip,
                port,
                fingerprint
            });
        }

        return null;
    }

    isIPv6Bridge(relayLine) {
        return relayLine.includes('[') && relayLine.includes(']');
    }

    formatRelayAddress(relay) {
        if (relay.ip.includes(':') && !relay.ip.startsWith('[')) {
            return `[${relay.ip}]:${relay.port}`;
        }

        return `${relay.ip}:${relay.port}`;
    }

    shuffle(items) {
        const result = [...items];

        for (let index = result.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(this.random() * (index + 1));
            [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
        }

        return result;
    }
}

module.exports = VanillaRelaysRepositoryImpl;
