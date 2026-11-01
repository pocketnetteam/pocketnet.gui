'use strict';

class BridgesCustomRepository {
    /**
     * @returns {void}
     */
    startRequestingBridgesFromTorProjectDb() {
        throw new Error('BridgesCustomRepository.startRequestingBridgesFromTorProjectDb is not implemented');
    }

    /**
     * @returns {Promise<void>}
     */
    stopRequestingBridgesFromTorProjectDb() {
        throw new Error('BridgesCustomRepository.stopRequestingBridgesFromTorProjectDb is not implemented');
    }

    /**
     * @returns {Promise<string[]>}
     */
    getNextBridgesFromCheckingQueue() {
        throw new Error('BridgesCustomRepository.getNextBridgesFromCheckingQueue is not implemented');
    }

    /**
     * @returns {Promise<number>}
     */
    getCheckQueueLengthAsync() {
        throw new Error('BridgesCustomRepository.getCheckQueueLengthAsync is not implemented');
    }

    /**
     * @param {string[]} bridges
     * @returns {Promise<void>}
     */
    reportBridgesReachable(bridges) {
        throw new Error('BridgesCustomRepository.reportBridgesReachable is not implemented');
    }

    /**
     * @param {string} address
     * @returns {Promise<void>}
     */
    reportBridgeAddressUnreachableAsync(address) {
        throw new Error('BridgesCustomRepository.reportBridgeAddressUnreachableAsync is not implemented');
    }

    /**
     * @param {string} bridgeAddress
     * @returns {Promise<boolean>}
     */
    deleteBridgeByAddressAsync(bridgeAddress) {
        throw new Error('BridgesCustomRepository.deleteBridgeByAddressAsync is not implemented');
    }
}

module.exports = BridgesCustomRepository;
