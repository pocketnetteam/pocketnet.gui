'use strict';

const Logger = require('../../utils/logger/Logger');
const ZipFileManager = require('../../utils/zip/ZipFileManager');

class Installer {
    installing = false;

    constructor({
        configurationRepository,
        zipManager = new ZipFileManager()
    } = {}) {
        if (!configurationRepository) {
            throw new TypeError('Installer requires configurationRepository');
        }

        this.configurationRepository = configurationRepository;
        this.zipManager = zipManager;
    }

    async installTorIfRequired() {
        if (this.installing) {
            return true;
        }

        this.installing = true;
        try {
            if (!await this.configurationRepository.isDefaultBridgesAvailableAsync()) {
                return await this.installTorConfiguration();
            }

            return true;
        } catch (e) {
            Logger.loge('Installer installTorIfRequired', e);
            return false;
        } finally {
            this.installing = false;
        }
    }

    async installTorConfiguration() {
        try {
            if (!await this.configurationRepository.isTorAssetAvailableAsync()) {
                return false;
            }

            Logger.logi('Start adding Tor configuration');

            const success = await this.extractTorConfigurationFiles();

            if (success) {
                Logger.logi('Configuring Tor is successful');
            } else {
                Logger.loge('Configuring Tor is failed');
            }

            return success;
        } catch (e) {
            Logger.loge('Configuring Tor is failed', e);
            return false;
        }
    }

    async extractTorConfigurationFiles() {
        const torAssetStream = await this.configurationRepository.getTorAssetStreamAsync();
        if (!torAssetStream) {
            return false;
        }

        return this.zipManager.extractZipFromInputStream(
            torAssetStream,
            this.configurationRepository.getAppDataDir()
        );
    }

}

module.exports = Installer;
