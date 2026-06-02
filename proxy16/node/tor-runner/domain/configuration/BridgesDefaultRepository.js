'use strict';

class BridgesDefaultRepository {
    /**
     * @returns {Promise<string[]>}
     */
    getNextBridgesFromAutoQueue() {
        throw new Error('BridgesDefaultRepository.getNextBridgesFromAutoQueue is not implemented');
    }

    /**
     * @returns {Promise<string[]>}
     */
    getInitialAutoBridgesAsync() {
        throw new Error('BridgesDefaultRepository.getInitialAutoBridgesAsync is not implemented');
    }

    /**
     * @returns {Promise<string[]>}
     */
    getNextBridgesFromCheckingQueue() {
        throw new Error('BridgesDefaultRepository.getNextBridgesFromCheckingQueue is not implemented');
    }

    /**
     * @returns {string[]}
     */
    getDefaultSnowflakeBridges() {
        throw new Error('BridgesDefaultRepository.getDefaultSnowflakeBridges is not implemented');
    }

    /**
     * @returns {string[]}
     */
    getCheckFailedBridges() {
        throw new Error('BridgesDefaultRepository.getCheckFailedBridges is not implemented');
    }

    /**
     * @param {string} bridgeAddress
     * @returns {void}
     */
    addCheckFailedBridge(bridgeAddress) {
        throw new Error('BridgesDefaultRepository.addCheckFailedBridge is not implemented');
    }

    /**
     * @returns {void}
     */
    clearCheckFailedBridges() {
        throw new Error('BridgesDefaultRepository.clearCheckFailedBridges is not implemented');
    }

    /**
     * @returns {Promise<number>}
     */
    getAutoQueueLengthAsync() {
        throw new Error('BridgesDefaultRepository.getAutoQueueLengthAsync is not implemented');
    }

    /**
     * @returns {Promise<number>}
     */
    getCheckQueueLengthAsync() {
        throw new Error('BridgesDefaultRepository.getCheckQueueLengthAsync is not implemented');
    }

    /**
     * @returns {Promise<boolean>}
     */
    updateDefaultBridges() {
        throw new Error('BridgesDefaultRepository.updateDefaultBridges is not implemented');
    }
}

module.exports = BridgesDefaultRepository;
