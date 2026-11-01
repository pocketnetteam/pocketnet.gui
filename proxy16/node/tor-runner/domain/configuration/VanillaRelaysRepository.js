'use strict';

class VanillaRelaysRepository {
    /**
     * @param {boolean} allowIPv6Relays
     * @returns {Promise<string[]>}
     */
    requestVanillaRelays(allowIPv6Relays) {
        throw new Error('VanillaRelaysRepository.requestVanillaRelays is not implemented');
    }
}

module.exports = VanillaRelaysRepository;
