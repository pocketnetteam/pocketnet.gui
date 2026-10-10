'use strict';

class NetworkRepository {
    /**
     * @returns {void}
     */
    listenNetworkChanges() {
        throw new Error('NetworkRepository.listenNetworkChanges is not implemented');
    }

    /**
     * @returns {void}
     */
    unlistenNetworkChanges() {
        throw new Error('NetworkRepository.unlistenNetworkChanges is not implemented');
    }

    /**
     * @param {(snapshot: object) => void} listener
     * @returns {() => void}
     */
    networkChanges(listener) {
        throw new Error('NetworkRepository.networkChanges is not implemented');
    }
}

module.exports = NetworkRepository;
