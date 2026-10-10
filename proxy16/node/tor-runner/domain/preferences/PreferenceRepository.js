'use strict';

class PreferenceRepository {
    /**
     * @returns {string}
     */
    getTorMode() {
        throw new Error('PreferenceRepository.getTorMode is not implemented');
    }

    /**
     * @param {string} mode
     * @returns {boolean}
     */
    setTorMode(mode) {
        throw new Error('PreferenceRepository.setTorMode is not implemented');
    }

    /**
     * @returns {string}
     */
    getLastNetwork() {
        throw new Error('PreferenceRepository.getLastNetwork is not implemented');
    }

    /**
     * @param {string} networkType
     * @returns {Promise<boolean>}
     */
    setLastNetwork(networkType) {
        throw new Error('PreferenceRepository.setLastNetwork is not implemented');
    }

    /**
     * @returns {string[]}
     */
    getLocales() {
        throw new Error('PreferenceRepository.getLocales is not implemented');
    }

    /**
     * @param {string[]} locales
     * @returns {Promise<boolean>}
     */
    setLocales(locales) {
        throw new Error('PreferenceRepository.setLocales is not implemented');
    }

    /**
     * @returns {string[]}
     */
    getLastSni() {
        throw new Error('PreferenceRepository.getLastSni is not implemented');
    }

    /**
     * @param {string[]} sni
     * @returns {Promise<boolean>}
     */
    setLastSni(sni) {
        throw new Error('PreferenceRepository.setLastSni is not implemented');
    }

    /**
     * @returns {number}
     */
    getNextTimeForBridgesRequest() {
        throw new Error('PreferenceRepository.getNextTimeForBridgesRequest is not implemented');
    }

    /**
     * @param {number} time
     * @returns {Promise<boolean>}
     */
    setNextTimeForBridgesRequest(time) {
        throw new Error('PreferenceRepository.setNextTimeForBridgesRequest is not implemented');
    }

    /**
     * @returns {Set<string>}
     */
    getLastDefaultBridges() {
        throw new Error('PreferenceRepository.getLastDefaultBridges is not implemented');
    }

    /**
     * @param {Iterable<string>} bridges
     * @returns {Promise<boolean>}
     */
    setLastDefaultBridges(bridges) {
        throw new Error('PreferenceRepository.setLastDefaultBridges is not implemented');
    }

    /**
     * @returns {Set<string>}
     */
    getLastCustomBridges() {
        throw new Error('PreferenceRepository.getLastCustomBridges is not implemented');
    }

    /**
     * @param {Iterable<string>} bridges
     * @returns {Promise<boolean>}
     */
    setLastCustomBridges(bridges) {
        throw new Error('PreferenceRepository.setLastCustomBridges is not implemented');
    }

    /**
     * @returns {Promise<boolean>}
     */
    flush() {
        throw new Error('PreferenceRepository.flush is not implemented');
    }

    /**
     * @param {string} bridge
     * @returns {Promise<boolean>}
     */
    addUnreachableBridgeRecord(bridge) {
        throw new Error('PreferenceRepository.addUnreachableBridgeRecord is not implemented');
    }

    /**
     * @param {string} bridge
     * @returns {Promise<boolean>}
     */
    removeUnreachableBridgeRecord(bridge) {
        throw new Error('PreferenceRepository.removeUnreachableBridgeRecord is not implemented');
    }
}

module.exports = PreferenceRepository;
