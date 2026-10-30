'use strict';

const BridgesCleanerManager = require('../../domain/configuration/BridgesCleanerManager');
const PreferenceRepositoryImpl = require('../preferences/PreferenceRepositoryImpl');
const NetworkChecker = require('../../utils/network/NetworkChecker');

class BridgesCleanerManagerImpl extends BridgesCleanerManager {
    constructor({
        preferences = new PreferenceRepositoryImpl(),
        networkChecker = new NetworkChecker()
    } = {}) {
        super();
        this.preferences = preferences;
        this.networkChecker = networkChecker;
    }

    async reportBridgeReachable(bridge, reachable) {
        if (!this.networkChecker.isNetworkAvailable()) {
            return false;
        }

        if (reachable) {
            return this.preferences.removeUnreachableBridgeRecord(bridge);
        }

        return this.preferences.addUnreachableBridgeRecord(bridge);
    }
}

module.exports = BridgesCleanerManagerImpl;
