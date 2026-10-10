'use strict';

class AddressCheckerRepository {
    /**
     * @param {{domain?: string, ip?: string, port: number}} address
     * @param {number} [timeoutSec]
     * @returns {Promise<boolean>}
     */
    isAddressReachable(address, timeoutSec) {
        throw new Error('AddressCheckerRepository.isAddressReachable is not implemented');
    }

    /**
     * @param {string[]} domains
     * @param {number} [timeoutSec]
     * @returns {Promise<string[]>}
     */
    getReachableDomains(domains, timeoutSec) {
        throw new Error('AddressCheckerRepository.getReachableDomains is not implemented');
    }

    /**
     * @param {Array<{ip: string, port: number}>} ips
     * @param {number} [timeoutSec]
     * @returns {Promise<Array<{ip: string, port: number}>>}
     */
    getReachableIps(ips, timeoutSec) {
        throw new Error('AddressCheckerRepository.getReachableIps is not implemented');
    }
}

module.exports = AddressCheckerRepository;
