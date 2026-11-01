'use strict';

class SnowflakeRepository {
    /**
     * @param {string} rendezvousType
     * @param {string[]} [bases]
     * @returns {string[]}
     */
    getBridgeLines(rendezvousType, bases) {
        throw new Error('SnowflakeRepository.getBridgeLines is not implemented');
    }

    /**
     * @returns {string[]}
     */
    getBases() {
        throw new Error('SnowflakeRepository.getBases is not implemented');
    }

    /**
     * @param {string} rendezvousType
     * @returns {string}
     */
    getUrl(rendezvousType) {
        throw new Error('SnowflakeRepository.getUrl is not implemented');
    }

    /**
     * @param {string} rendezvousType
     * @returns {string[]}
     */
    getFronts(rendezvousType) {
        throw new Error('SnowflakeRepository.getFronts is not implemented');
    }

    /**
     * @returns {string[]}
     */
    getSnowflakeStunServers() {
        throw new Error('SnowflakeRepository.getSnowflakeStunServers is not implemented');
    }

    /**
     * @returns {string}
     */
    getUtlsClientID() {
        throw new Error('SnowflakeRepository.getUtlsClientID is not implemented');
    }

    /**
     * @returns {string}
     */
    getCovertDtls() {
        throw new Error('SnowflakeRepository.getCovertDtls is not implemented');
    }
}

module.exports = SnowflakeRepository;
