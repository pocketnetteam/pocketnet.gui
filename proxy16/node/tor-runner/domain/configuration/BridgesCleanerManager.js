'use strict';

class BridgesCleanerManager {
    /**
     * @param {string} bridge
     * @param {boolean} reachable
     * @returns {Promise<boolean>}
     */
    reportBridgeReachable(bridge, reachable) {
        throw new Error('BridgesCleanerManager.reportBridgeReachable is not implemented');
    }
}

module.exports = BridgesCleanerManager;
