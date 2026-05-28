'use strict';

class ConfigurationRepository {
    /**
     * @returns {string}
     */
    getAppDataDir() {
        throw new Error('ConfigurationRepository.getAppDataDir is not implemented');
    }

    /**
     * @returns {Promise<boolean>}
     */
    ensureAppDataDirAsync() {
        throw new Error('ConfigurationRepository.ensureAppDataDirAsync is not implemented');
    }

    /**
     * @returns {string}
     */
    getTorConfigurationDir() {
        throw new Error('ConfigurationRepository.getTorConfigurationDir is not implemented');
    }

    /**
     * @returns {string}
     */
    getTorResourcesDir() {
        throw new Error('ConfigurationRepository.getTorResourcesDir is not implemented');
    }

    /**
     * @returns {string}
     */
    getTorConfPath() {
        throw new Error('ConfigurationRepository.getTorConfPath is not implemented');
    }

    /**
     * @param {string} pid
     * @returns {Promise<boolean>}
     */
    saveTorPidAsync(pid) {
        throw new Error('ConfigurationRepository.saveTorPidAsync is not implemented');
    }

    /**
     * @returns {Promise<string|null>}
     */
    getTorPidAsync() {
        throw new Error('ConfigurationRepository.getTorPidAsync is not implemented');
    }

    /**
     * @returns {number}
     */
    getTorControlPort() {
        throw new Error('ConfigurationRepository.getTorControlPort is not implemented');
    }

    /**
     * @returns {Promise<Buffer|null>}
     */
    getTorControlCookieAsync() {
        throw new Error('ConfigurationRepository.getTorControlCookieAsync is not implemented');
    }

    /**
     * @returns {Promise<boolean>}
     */
    deleteTorPidFileAsync() {
        throw new Error('ConfigurationRepository.deleteTorPidFileAsync is not implemented');
    }

    /**
     * @returns {Promise<import('stream').Readable|null>}
     */
    getTorAssetStreamAsync() {
        throw new Error('ConfigurationRepository.getTorAssetStreamAsync is not implemented');
    }

    /**
     * @returns {boolean}
     */
    isTorAssetAvailable() {
        throw new Error('ConfigurationRepository.isTorAssetAvailable is not implemented');
    }

    /**
     * @returns {Promise<boolean>}
     */
    isTorAssetAvailableAsync() {
        throw new Error('ConfigurationRepository.isTorAssetAvailableAsync is not implemented');
    }

    /**
     * @returns {Promise<boolean>}
     */
    isDefaultBridgesAvailableAsync() {
        throw new Error('ConfigurationRepository.isDefaultBridgesAvailableAsync is not implemented');
    }

    /**
     * @returns {Promise<boolean>}
     */
    isTorConfigurationAvailableAsync() {
        throw new Error('ConfigurationRepository.isTorConfigurationAvailableAsync is not implemented');
    }

    /**
     * @param {string[]} bridges
     * @returns {Promise<boolean>}
     */
    createTorConfigurationAsync(bridges) {
        throw new Error('ConfigurationRepository.createTorConfigurationAsync is not implemented');
    }

    /**
     * @returns {Array<{key: string, value: string}>}
     */
    getTorConfiguration() {
        throw new Error('ConfigurationRepository.getTorConfiguration is not implemented');
    }

    /**
     * @param {Array<{key: string, value: string}>} originalTorConf
     * @param {Array<{key: string, value: string}>} newTorConf
     * @returns {boolean}
     */
    updateTorConfiguration(originalTorConf, newTorConf) {
        throw new Error('ConfigurationRepository.updateTorConfiguration is not implemented');
    }

    /**
     * @returns {Promise<string>}
     */
    getCurrentBridgeTypeAsync() {
        throw new Error('ConfigurationRepository.getCurrentBridgeTypeAsync is not implemented');
    }

    /**
     * @returns {Promise<string[]>}
     */
    getCurrentBridgesAsync() {
        throw new Error('ConfigurationRepository.getCurrentBridgesAsync is not implemented');
    }

    /**
     * @param {string[]} bridges
     * @param {() => boolean} [canCommit]
     * @returns {Promise<boolean>}
     */
    setBridgesAsync(bridges, canCommit) {
        throw new Error('ConfigurationRepository.setBridgesAsync is not implemented');
    }

    /**
     * @returns {string}
     */
    getSnowflakeBridgeType() {
        throw new Error('ConfigurationRepository.getSnowflakeBridgeType is not implemented');
    }

    /**
     * @param {string} type
     * @returns {boolean}
     */
    setSnowflakeBridgeType(type) {
        throw new Error('ConfigurationRepository.setSnowflakeBridgeType is not implemented');
    }

    /**
     * @param {string} path
     * @returns {Promise<boolean>}
     */
    deleteBridgesFromStateFileAsync(path) {
        throw new Error('ConfigurationRepository.deleteBridgesFromStateFileAsync is not implemented');
    }

    /**
     * @param {string[]} bridges
     * @returns {Promise<string[]|null>}
     */
    createAndSaveTorCheckerConfigurationAsync(bridges) {
        throw new Error('ConfigurationRepository.createAndSaveTorCheckerConfigurationAsync is not implemented');
    }
}

module.exports = ConfigurationRepository;
