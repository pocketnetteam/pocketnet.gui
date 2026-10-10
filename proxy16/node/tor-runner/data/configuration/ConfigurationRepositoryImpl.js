'use strict';

const ConfigurationRepository = require('../../domain/configuration/ConfigurationRepository');
const BridgeType = require('../../domain/configuration/BridgeType');
const RendezvousType = require('../../domain/configuration/RendezvousType');
const TorMode = require('../../domain/core/TorMode');
const PreferenceRepositoryImpl = require('../preferences/PreferenceRepositoryImpl');
const SnowflakeRepositoryImpl = require('./SnowflakeRepositoryImpl');
const ConfigurationManager = require('../../framework/ConfigurationManager');
const { MAX_PORT_NUMBER } = require('../../utils/Constants');
const FileManager = require('../../utils/file/FileManager');
const Logger = require('../../utils/logger/Logger');

const NUMBER_REGEX = /^\d{1,5}$/;
const DEFAULT_CLIENT_TRANSPORTS = new Set([
    'meek_lite',
    'obfs2',
    'obfs3',
    'obfs4',
    'scramblesuit',
    'webtunnel',
    'snowflake',
    'conjure'
]);

class ConfigurationRepositoryImpl extends ConfigurationRepository {
    torConfigurationMutationQueue = Promise.resolve();

    constructor({
        configurationManager = new ConfigurationManager(),
        preferences = new PreferenceRepositoryImpl({ configuration: configurationManager }),
        snowflakeRepository = new SnowflakeRepositoryImpl(),
        fileManager = new FileManager(),
        torManagerProvider = null
    } = {}) {
        super();
        this.configurationManager = configurationManager;
        this.preferences = preferences;
        this.snowflakeRepository = snowflakeRepository;
        this.fileManager = fileManager;
        this.torManagerProvider = torManagerProvider;
    }

    getAppDataDir() {
        return this.configurationManager.appDataDir;
    }

    async ensureAppDataDirAsync() {
        const appDataDir = this.getAppDataDir();
        const stat = await this.fileManager.lstatAsync(appDataDir);

        if (stat?.isDirectory()) {
            return true;
        }

        if (stat && !await this.fileManager.deleteFileAsync(appDataDir)) {
            return false;
        }

        return this.fileManager.createFolderAsync(appDataDir);
    }

    getTorConfigurationDir() {
        return this.configurationManager.torConfigurationDir;
    }

    getTorResourcesDir() {
        return this.configurationManager.torResourcesDir;
    }

    getTorConfPath() {
        return this.configurationManager.torConfPath;
    }

    async saveTorPidAsync(pid) {
        return this.fileManager.createFileAsync(this.configurationManager.torPidPath, pid);
    }

    async getTorPidAsync() {
        const lines = await this.fileManager.readFileAsync(this.configurationManager.torPidPath);
        return lines.length > 0 ? lines.join('\n') : null;
    }

    getTorControlPort() {
        return this.configurationManager.torDefaultControlPort;
    }

    async getTorControlCookieAsync() {
        return this.fileManager.readBytesAsync(this.configurationManager.torControlCookiePath);
    }

    async deleteTorPidFileAsync() {
        return this.fileManager.deleteFileAsync(this.configurationManager.torPidPath);
    }

    async isDefaultBridgesAvailableAsync() {
        return this.isFileAsync(this.configurationManager.torDefaultBridgesPath);
    }

    async isTorConfigurationAvailableAsync() {
        return Boolean((await this.fileManager.statAsync(this.configurationManager.torConfPath))?.isFile());
    }

    getTorPath() {
        return this.configurationManager.torPath;
    }

    getTorSocksPort() {
        const value = this.getTorConfiguration()
            .find((line) => line.key.toLowerCase() === 'socksport')?.value;

        return this.getPortFromConfigurationValue(value, this.configurationManager.torDefaultSocksPort);
    }

    getTorCheckerConfPath() {
        return this.configurationManager.torCheckerConfPath;
    }

    getTorStateFilePath() {
        return this.configurationManager.torStateFilePath;
    }

    getTorCheckerPidPath() {
        return this.configurationManager.torCheckerPidPath;
    }

    getTorCheckerDataPath() {
        return this.configurationManager.torCheckerDataDir;
    }

    getTorCheckerStateFilePath() {
        return this.configurationManager.torCheckerStateFilePath;
    }

    getTorDefaultSocksPort() {
        return this.configurationManager.torDefaultSocksPort;
    }

    async getTorAssetStreamAsync() {
        return await this.isTorAssetAvailableAsync() ? this.configurationManager.torAssetsStream() : null;
    }

    isTorAssetAvailable() {
        return this.isFile(this.configurationManager.torAssetsPath);
    }

    async isTorAssetAvailableAsync() {
        return this.isFileAsync(this.configurationManager.torAssetsPath);
    }

    getTorDefaultBridgesPath() {
        return this.configurationManager.torDefaultBridgesPath;
    }

    getTorCustomBridgesPath() {
        return this.configurationManager.torCustomBridgesPath;
    }

    async createTorConfigurationAsync(bridges = []) {
        const torConf = [
            ...this.getBaseTorConfiguration(),
            ...this.getBridgesConfigurationLines(bridges)
        ];

        return this.runTorConfigurationMutation(() => {
            return this.fileManager.rewriteFileAsync(this.configurationManager.torConfPath, torConf);
        });
    }

    getBaseTorConfiguration() {
        return [
            '# This configuration was generated automatically.',
            '# The user is free to edit this config if he know',
            '# how to do that. Read TOR documentation before...',
            'AutomapHostsOnResolve 1',
            'AutomapHostsSuffixes .exit, .onion',
            'VirtualAddrNetworkIPv4 10.192.0.0/10',
            'VirtualAddrNetworkIPv6 [FC00::]/8',
            'HardwareAccel 1',
            'ClientOnly 1',
            'ExitPolicy reject *:*',
            'ExitPolicy reject6 *:*',
            `SocksPort ${this.configurationManager.torDefaultSocksPort} # Default: Bind to localhost:9250 for local connections.`,
            `ControlPort ${this.configurationManager.torDefaultControlPort}`,
            'CookieAuthentication 1',
            'DormantCanceledByStartup 1',
            `DataDirectory ${this.configurationManager.torDataDir}`,
            'Log notice stdout',
            'AvoidDiskWrites 1',
            `GeoIPFile ${this.configurationManager.torGeoipPath}`,
            `GeoIPv6File ${this.configurationManager.torGeoip6Path}`,
            'KeepalivePeriod 10',
            'ConnectionPadding 1',
            'ReducedConnectionPadding 1',
            'NewCircuitPeriod 30',
            'MaxCircuitDirtiness 600',
            'EnforceDistinctSubnets 1',
            'CircuitsAvailableTimeout 86400',
            'ClientUseIPv4 1',
            'ClientUseIPv6 1'
        ];
    }

    getTorConfiguration() {
        return this.fileManager.readFile(this.configurationManager.torConfPath)
            .map((line) => this.parseTorConfigurationLine(line));
    }

    async getTorConfigurationAsync() {
        return (await this.fileManager.readFileAsync(this.configurationManager.torConfPath))
            .map((line) => this.parseTorConfigurationLine(line));
    }

    parseTorConfigurationLine(line) {
        const spaceIndex = line.indexOf(' ');
        if (spaceIndex > 0) {
            return {
                key: line.slice(0, spaceIndex).trim(),
                value: line.slice(spaceIndex).trim()
            };
        }

        return { key: line, value: '' };
    }

    updateTorConfiguration(originalTorConf, newTorConf) {
        const rewritten = this.rewriteTorConfiguration(originalTorConf, newTorConf);
        if (rewritten) {
            this.restartTor();
        }

        return rewritten;
    }

    rewriteTorConfiguration(originalTorConf, newTorConf) {
        if (!Array.isArray(newTorConf) || newTorConf.length === 0) {
            return false;
        }

        if (!this.isTorConfigurationChanged(originalTorConf, newTorConf)) {
            return false;
        }

        return this.fileManager.rewriteFile(
            this.configurationManager.torConfPath,
            newTorConf.map((line) => line.value ? `${line.key} ${line.value}` : line.key)
        );
    }

    async rewriteTorConfigurationAsync(originalTorConf, newTorConf) {
        if (!Array.isArray(newTorConf) || newTorConf.length === 0) {
            return false;
        }

        if (!this.isTorConfigurationChanged(originalTorConf, newTorConf)) {
            return false;
        }

        return this.fileManager.rewriteFileAsync(
            this.configurationManager.torConfPath,
            newTorConf.map((line) => line.value ? `${line.key} ${line.value}` : line.key)
        );
    }

    restartTor() {
        Promise.resolve(this.getTorManager()?.restartTor?.()).catch((e) => {
            Logger.loge('ConfigurationRepository restartTor', e);
        });
    }

    getTorManager() {
        return typeof this.torManagerProvider === 'function' ? this.torManagerProvider() : null;
    }

    async getCurrentBridgeTypeAsync() {
        const bridge = (await this.getTorConfigurationAsync())
            .find((line) => this.isEqualIgnoreCase(line.key, 'Bridge'));
        return bridge ? this.getBridgeTypeFromLine(bridge.value) : BridgeType.NONE;
    }

    async getCurrentBridgesAsync() {
        return (await this.getTorConfigurationAsync())
            .filter((line) => this.isEqualIgnoreCase(line.key, 'Bridge'))
            .map((line) => line.value);
    }

    async setBridgesAsync(bridges, canCommit = () => true) {
        return this.runTorConfigurationMutation(async () => {
            try {
                const torConf = await this.getTorConfigurationAsync();
                const newTorConf = this.addUseBridgesToTorConf(
                    this.clearUseTorBridgesFromTorConf(torConf),
                    bridges
                );
                if (!canCommit()) {
                    return false;
                }

                const rewritten = await this.rewriteTorConfigurationAsync(torConf, newTorConf);
                if (rewritten && !canCommit()) {
                    if (!await this.rewriteTorConfigurationAsync(newTorConf, torConf)) {
                        Logger.loge('ConfigurationRepository setBridgesAsync unable to restore cancelled bridge update');
                    }
                    return false;
                }
                if (rewritten) {
                    this.restartTor();
                }

                return rewritten;
            } catch (e) {
                Logger.loge(`ConfigurationRepository setBridgesAsync ${bridges}`, e);
                return false;
            }
        });
    }

    runTorConfigurationMutation(operation) {
        const task = this.torConfigurationMutationQueue
            .catch(() => {})
            .then(operation);
        this.torConfigurationMutationQueue = task.catch(() => {});
        return task;
    }

    getSnowflakeBridgeType() {
        for (const confLine of this.getTorConfiguration()) {
            if (this.isEqualIgnoreCase(confLine.key, 'Bridge') && this.getBridgeTypeFromLine(confLine.value) === BridgeType.SNOWFLAKE) {
                if (confLine.value.includes('ampcache=')) {
                    return RendezvousType.AMP_CACHE;
                }

                if (confLine.value.includes('sqsqueue=')) {
                    return RendezvousType.AMAZON_SQS;
                }

                return RendezvousType.CDN77;
            }
        }

        return RendezvousType.AMP_CACHE;
    }

    setSnowflakeBridgeType(type) {
        try {
            const torConf = this.getTorConfiguration();
            const newTorConf = this.changeSnowFlakeBridgesType([...torConf], type);
            return this.updateTorConfiguration(torConf, newTorConf);
        } catch (e) {
            Logger.loge(`ConfigurationRepository setSnowflakeBridgeType ${type}`, e);
            return false;
        }
    }

    async deleteBridgesFromStateFileAsync(stateFilePath) {
        try {
            if (!await this.isFileAsync(stateFilePath)) {
                return false;
            }

            const lines = await this.fileManager.readFileAsync(stateFilePath);
            const filteredLines = lines.filter((line) => !line.startsWith('Guard in=bridges '));
            if (filteredLines.length === lines.length) {
                return false;
            }

            const tempFilePath = `${stateFilePath}.tmp`;
            if (!await this.fileManager.rewriteFileAsync(tempFilePath, filteredLines)) {
                return false;
            }

            if (await this.fileManager.moveFileAsync(tempFilePath, stateFilePath)) {
                return true;
            }

            Logger.loge(`ConfigurationRepository deleteBridgesFromStateFileAsync failed to replace file: ${stateFilePath}`);
            return false;
        } catch (e) {
            Logger.loge('ConfigurationRepository deleteBridgesFromStateFileAsync failed to replace file', e);
            return false;
        }
    }

    async createAndSaveTorCheckerConfigurationAsync(bridges) {
        const conf = this.getTorCheckerConfiguration(bridges);

        return await this.fileManager.rewriteFileAsync(this.configurationManager.torCheckerConfPath, conf)
            ? conf
            : null;
    }

    getTorCheckerConfiguration(bridges) {
        return [
            'AvoidDiskWrites 1',
            'AutomapHostsOnResolve 1',
            'AutomapHostsSuffixes .exit, .onion',
            'SOCKSPort 0',
            'HardwareAccel 1',
            'ClientOnly 1',
            `DataDirectory ${this.getTorCheckerDataPath()}`,
            'Log notice stdout',
            'ConnectionPadding 1',
            'ReducedConnectionPadding 1',
            'ClientUseIPv4 1',
            'ClientUseIPv6 1',
            ...this.getBridgesConfigurationLines(bridges)
        ];
    }

    addUseBridgesToTorConf(torConf, bridges) {
        try {
            return [
                ...torConf,
                ...this.getBridgesConfigurationLines(bridges)
                    .map((line) => this.parseTorConfigurationLine(line))
            ];
        } catch (e) {
            Logger.loge(`ConfigurationRepository addUseBridgesToTorConf ${bridges}`, e);
            return [...torConf];
        }
    }

    clearUseTorBridgesFromTorConf(torConf) {
        try {
            return torConf.filter((conf) => {
                return !this.isEqualIgnoreCase(conf.key, 'UseBridges') &&
                    !this.isDefaultClientTransportPlugin(conf) &&
                    !this.isEqualIgnoreCase(conf.key, 'Bridge');
            });
        } catch (e) {
            Logger.loge('ConfigurationRepository clearUseBridges', e);
            return [...torConf];
        }
    }

    changeSnowFlakeBridgesType(torConf, type) {
        try {
            const bridges = this.snowflakeRepository?.getBridgeLines?.(type) || [];
            const conf = this.clearUseTorBridgesFromTorConf(torConf);
            return this.addUseBridgesToTorConf(conf, bridges);
        } catch (e) {
            Logger.loge('ConfigurationRepository setUseSnowflakeBridges', e);
            return torConf;
        }
    }

    setTorSocksPort(torConf, port) {
        try {
            const newPort = this.parsePort(port, 0);
            if (!newPort) {
                return torConf;
            }

            return torConf.map((line) => {
                if (!this.isTorOption(line.key, 'SocksPort')) {
                    return line;
                }

                return {
                    key: 'SocksPort',
                    value: this.replacePortInConfigurationValue(line.value, String(newPort))
                };
            });
        } catch (e) {
            Logger.loge('ConfigurationRepository setTorSocksPort', e);
            return torConf;
        }
    }

    setTorMode(torMode) {
        const mode = Object.values(TorMode).includes(torMode) ? torMode : TorMode.UNDEFINED;
        if (mode === TorMode.UNDEFINED && torMode !== TorMode.UNDEFINED) {
            Logger.loge(`TorPluginManager setTorMode invalid mode ${torMode}`);
        }

        return this.preferences.setTorMode(mode);
    }

    getBridgeTypeFromLine(line = '') {
        switch (line.split(' ')[0]) {
        case 'obfs2':
            return BridgeType.OBFS2;
        case 'obfs3':
            return BridgeType.OBFS3;
        case 'obfs4':
            return BridgeType.OBFS4;
        case 'scramblesuit':
            return BridgeType.SCRAMBLESUIT;
        case 'meek_lite':
            return BridgeType.MEEK_LITE;
        case 'snowflake':
            return BridgeType.SNOWFLAKE;
        case 'webtunnel':
            return BridgeType.WEBTUNNEL;
        case 'conjure':
            return BridgeType.CONJURE;
        default:
            return BridgeType.VANILLA;
        }
    }

    hasPluggableTransportBridge(bridges) {
        return bridges.some((bridge) => this.getBridgeTypeFromLine(bridge) !== BridgeType.VANILLA);
    }

    getBridgesConfigurationLines(bridges = []) {
        if (bridges.length === 0) {
            return ['UseBridges 0'];
        }

        const conf = ['UseBridges 1'];
        if (this.hasPluggableTransportBridge(bridges)) {
            conf.push(...this.getClientTransportPlugins());
        }

        bridges.forEach((bridge) => conf.push(`Bridge ${bridge}`));
        return conf;
    }

    getClientTransportPlugins() {
        return [
            `ClientTransportPlugin meek_lite,obfs2,obfs3,obfs4,scramblesuit,webtunnel exec ${this.configurationManager.relativeObfsPath}`,
            `ClientTransportPlugin snowflake exec ${this.configurationManager.relativeSnowflakePath}`,
            `ClientTransportPlugin conjure exec ${this.configurationManager.relativeConjurePath}`
        ];
    }

    isDefaultClientTransportPlugin(conf) {
        if (!this.isEqualIgnoreCase(conf.key, 'ClientTransportPlugin')) {
            return false;
        }

        const transports = conf.value.trim().split(/\s+/, 1)[0].split(',');
        return transports.some((transport) => DEFAULT_CLIENT_TRANSPORTS.has(transport.toLowerCase()));
    }

    isTorConfigurationChanged(originalTorConf, newTorConf) {
        if (newTorConf.length !== originalTorConf.length) {
            return true;
        }

        return newTorConf.some((newLine, index) => {
            const originalLine = originalTorConf[index];
            return newLine.key !== originalLine.key || newLine.value !== originalLine.value;
        });
    }

    parsePort(port, defaultPort) {
        if (typeof port !== 'string' || !NUMBER_REGEX.test(port)) {
            return defaultPort;
        }

        const parsedPort = Number(port);
        return parsedPort <= MAX_PORT_NUMBER ? parsedPort : defaultPort;
    }

    getPortFromConfigurationValue(value, defaultPort) {
        const address = typeof value === 'string' ? value.trim().split(/\s+/)[0] : '';
        const port = address.split(':').pop();
        return this.parsePort(port, defaultPort);
    }

    isTorOption(key, option) {
        return key.replace(/^#/, '').toLowerCase() === option.toLowerCase();
    }

    isEqualIgnoreCase(first, second) {
        return first.toLowerCase() === second.toLowerCase();
    }

    replacePortInConfigurationValue(value, newPort) {
        const separatorIndex = value.search(/\s/);
        const endpoint = separatorIndex === -1 ? value : value.slice(0, separatorIndex);
        const suffix = separatorIndex === -1 ? '' : value.slice(separatorIndex);
        const lastColonIndex = endpoint.lastIndexOf(':');
        if (lastColonIndex === -1) {
            return `${newPort}${suffix}`;
        }

        return `${endpoint.slice(0, lastColonIndex + 1)}${newPort}${suffix}`;
    }

    isFile(filePath) {
        return Boolean(this.fileManager.stat(filePath)?.isFile());
    }

    async isFileAsync(filePath) {
        return Boolean((await this.fileManager.statAsync(filePath))?.isFile());
    }
}

module.exports = ConfigurationRepositoryImpl;
