'use strict';

const fs = require('fs');
const path = require('path');

const f = require('../../../functions');

class ConfigurationManager {
    settings = {};
    proxy = null;
    resourcesPath = process.resourcesPath;
    torDefaultSocksPort = 9250;
    torDefaultHttpPort = 8189;
    torDefaultControlPort = 9251;

    constructor({
        settings = {},
        proxy = null,
        resourcesPath = process.resourcesPath
    } = {}) {
        this.settings = { ...settings };
        this.proxy = proxy;
        this.resourcesPath = resourcesPath;
    }

    binName(name) {
        if (process.platform === 'win32') {
            return `${name}.exe`;
        }

        if (process.platform === 'darwin' || process.platform === 'linux') {
            return name;
        }

        return name;
    }

    get appDataDir() {
        return this.getSettingsPath();
    }

    get torResourcesDir() {
        return path.join(this.resourcesPath, 'tor');
    }

    get torPath() {
        return path.join(this.torResourcesDir, this.binName('tor'));
    }

    get obfsPath() {
        return path.join(this.torResourcesDir, 'pluggable_transports', this.binName('lyrebird'));
    }

    get snowflakePath() {
        return path.join(this.torResourcesDir, 'pluggable_transports', this.binName('snowflake-client'));
    }

    get conjurePath() {
        return path.join(this.torResourcesDir, 'pluggable_transports', this.binName('conjure-client'));
    }

    get relativeObfsPath() {
        return `.${path.sep}${path.join('pluggable_transports', this.binName('lyrebird'))}`;
    }

    get relativeSnowflakePath() {
        return `.${path.sep}${path.join('pluggable_transports', this.binName('snowflake-client'))}`;
    }

    get relativeConjurePath() {
        return `.${path.sep}${path.join('pluggable_transports', this.binName('conjure-client'))}`;
    }

    get torConfigurationDir() {
        return this.appDataDir;
    }

    get torConfPath() {
        return path.join(this.torConfigurationDir, 'torrc');
    }

    get torCheckerConfPath() {
        return path.join(this.torConfigurationDir, 'tor_checker.conf');
    }

    get torGeoipPath() {
        return path.join(this.resourcesPath, 'tor-assets', 'geoip');
    }

    get torGeoip6Path() {
        return path.join(this.resourcesPath, 'tor-assets', 'geoip6');
    }

    get torPidPath() {
        return path.join(this.appDataDir, 'tor.pid');
    }

    get torDataDir() {
        return path.join(this.appDataDir, 'data');
    }

    get torStateFilePath() {
        return path.join(this.torDataDir, 'state');
    }

    get torControlCookiePath() {
        return path.join(this.torDataDir, 'control_auth_cookie');
    }

    get torCheckerPidPath() {
        return path.join(this.appDataDir, 'tor_checker.pid');
    }

    get torCheckerDataDir() {
        return path.join(this.appDataDir, 'tor_checker_data');
    }

    get torCheckerStateFilePath() {
        return path.join(this.torCheckerDataDir, 'state');
    }

    get torDefaultBridgesPath() {
        return path.join(this.torConfigurationDir, 'bridges_default.lst');
    }

    get torCustomBridgesPath() {
        return path.join(this.torConfigurationDir, 'bridges_custom.lst');
    }

    get preferencesPath() {
        return path.join(this.appDataDir, 'tor-preferences.json');
    }

    get torAssetsPath() {
        return path.join(this.resourcesPath, 'tor-assets', 'tor.mp3');
    }

    torAssetsStream() {
        return fs.createReadStream(this.torAssetsPath);
    }

    getSettingsPath() {
        const settingsPath = this.settings.path || 'tor';

        if (this.proxy?.userDataPath) {
            return path.join(this.proxy.userDataPath, settingsPath);
        }

        return f.path(settingsPath);
    }
}

module.exports = ConfigurationManager;
