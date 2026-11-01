'use strict';

const BridgesDefaultRepository = require('../../domain/configuration/BridgesDefaultRepository');
const ConfigurationUtils = require('../../domain/configuration/ConfigurationUtils');
const RendezvousType = require('../../domain/configuration/RendezvousType');
const PreferenceRepositoryImpl = require('../preferences/PreferenceRepositoryImpl');
const AddressCheckerRepositoryImpl = require('../addresschecker/AddressCheckerRepositoryImpl');
const SniRepositoryImpl = require('../sni/SniRepositoryImpl');
const SnowflakeRepositoryImpl = require('./SnowflakeRepositoryImpl');
const ConfigurationRepositoryImpl = require('./ConfigurationRepositoryImpl');
const BridgeChecker = require('../../utils/bridges/BridgeChecker');
const FileManager = require('../../utils/file/FileManager');
const Logger = require('../../utils/logger/Logger');
const ZipFileManager = require('../../utils/zip/ZipFileManager');

const DEFAULT_SNOWFLAKE_BRIDGES_FALLBACK = Object.freeze([
    'snowflake 192.0.2.3:80 2B280B23E1107BB62ABFC40DDCC8824814F80A72 fingerprint=2B280B23E1107BB62ABFC40DDCC8824814F80A72',
    'snowflake 192.0.2.4:80 8838024498816A039FCBBAB14E6F40A0843051FA fingerprint=8838024498816A039FCBBAB14E6F40A0843051FA'
]);

class BridgesDefaultRepositoryImpl extends BridgesDefaultRepository {
    failedBridgesAccordingTorLog = [];
    autoBridgesQueue = null;
    checkBridgesQueue = null;

    constructor({
        configuration = new ConfigurationRepositoryImpl(),
        snowflakeRepository = null,
        sniRepository = null,
        preferences = new PreferenceRepositoryImpl({ configuration: configuration.configurationManager }),
        addressCheckerRepository = new AddressCheckerRepositoryImpl({ preferences }),
        bridgeChecker = new BridgeChecker(),
        fileManager = new FileManager(),
        zipFileManager = new ZipFileManager(),
        random = Math.random
    } = {}) {
        super();
        this.configuration = configuration;
        this.snowflakeRepository = snowflakeRepository || new SnowflakeRepositoryImpl({
            bridgesDefaultRepository: this
        });
        this.sniRepository = sniRepository || new SniRepositoryImpl({
            configuration,
            addressCheckerRepository,
            preferences,
            fileManager
        });
        this.preferences = preferences;
        this.addressCheckerRepository = addressCheckerRepository;
        this.bridgeChecker = bridgeChecker;
        this.fileManager = fileManager;
        this.zipFileManager = zipFileManager;
        this.random = random;
    }

    async getNextBridgesFromAutoQueue() {
        const currentBridges = await this.configuration.getCurrentBridgesAsync();
        const queue = await this.getAutoBridgesQueueAsync();

        if (queue.length === 0) {
            Logger.logw('BridgesDefaultRepository auto bridge queue is empty');
            return [];
        }

        for (let index = 0; index < queue.length; index += 1) {
            const bridges = queue[index];
            if (currentBridges.length === bridges.length && bridges.every((bridge) => currentBridges.includes(bridge))) {
                return index < queue.length - 1 ? queue[index + 1] : queue[0];
            }
        }

        Logger.logw('BridgesDefaultRepository unable to find next bridge');
        return queue[0];
    }

    async getInitialAutoBridgesAsync() {
        return [...((await this.getAutoBridgesQueueAsync())[0] || [])];
    }

    async getNextBridgesFromCheckingQueue() {
        const checkedBridges = this.getLastCheckedBridges().map((bridge) => {
            return ConfigurationUtils.isWebTunnelBridge(bridge)
                ? bridge.replace(ConfigurationUtils.webTunnelSniRegex, '')
                : bridge;
        });
        const queue = await this.getCheckBridgesQueueAsync();

        if (queue.length === 0) {
            Logger.logw('BridgesDefaultRepository check bridge queue is empty');
            return [];
        }

        let nextBridges = queue[0];
        for (let index = 0; index < queue.length; index += 1) {
            const bridges = queue[index];
            if (checkedBridges.length === bridges.length && bridges.every((bridge) => checkedBridges.includes(bridge))) {
                let offset = 1;
                while (index + offset < queue.length) {
                    nextBridges = queue[index + offset];
                    const firstBridge = nextBridges[0] || '';
                    if (
                        this.sniRepository.isWhiteListSuspected() &&
                        !ConfigurationUtils.isWebTunnelBridge(firstBridge) &&
                        !ConfigurationUtils.isVanillaBridge(firstBridge)
                    ) {
                        offset += 1;
                    } else {
                        break;
                    }

                    if (index + offset === queue.length) {
                        nextBridges = queue[0];
                    }
                }
                break;
            }
        }

        if (ConfigurationUtils.isWebTunnelBridge(nextBridges[0] || '')) {
            const fakeSni = this.getNonEmptySniHosts(await this.sniRepository.getFakeSniHosts());
            await this.preferences.setLastSni(fakeSni);
            if (fakeSni.length > 0) {
                nextBridges = nextBridges.map((bridge) => {
                    return `${bridge} servername=${fakeSni.join(',')}`;
                });
            }
        }

        await this.setLastCheckedBridges(nextBridges);
        return nextBridges;
    }

    getLastCheckedBridges() {
        return [...this.preferences.getLastDefaultBridges()];
    }

    setLastCheckedBridges(bridges) {
        return this.preferences.setLastDefaultBridges(new Set(bridges));
    }

    getCheckFailedBridges() {
        return [...this.failedBridgesAccordingTorLog];
    }

    addCheckFailedBridge(bridgeAddress) {
        this.failedBridgesAccordingTorLog.push(bridgeAddress);
    }

    clearCheckFailedBridges() {
        this.failedBridgesAccordingTorLog.length = 0;
    }

    async getAutoQueueLengthAsync() {
        return (await this.getAutoBridgesQueueAsync()).length;
    }

    async getCheckQueueLengthAsync() {
        return (await this.getCheckBridgesQueueAsync()).length;
    }

    async getAutoBridgesQueueAsync() {
        if (!this.autoBridgesQueue) {
            this.autoBridgesQueue = this.createAutoBridgesQueue(await this.getDefaultBridgesAsync());
        }

        return this.autoBridgesQueue;
    }

    createAutoBridgesQueue(defaultBridges) {
        const snowflakeBases = this.getDefaultSnowflakeBridges(defaultBridges);
        const snowFlakeBridges = [
            this.snowflakeRepository.getBridgeLines(RendezvousType.AMP_CACHE, snowflakeBases),
            this.snowflakeRepository.getBridgeLines(RendezvousType.AMAZON_SQS, snowflakeBases),
            this.snowflakeRepository.getBridgeLines(RendezvousType.CDN77, snowflakeBases)
        ].filter((bridges) => bridges.length > 0);
        const conjureBridges = this.getDefaultConjureBridges(defaultBridges).map((bridge) => [bridge]);
        const meekLiteBridges = this.getDefaultMeekLiteBridges(defaultBridges).map((bridge) => [bridge]);

        return ConfigurationUtils.interleave(
            snowFlakeBridges,
            conjureBridges,
            meekLiteBridges
        );
    }

    async getCheckBridgesQueueAsync() {
        if (!this.checkBridgesQueue) {
            const defaultBridges = await this.getDefaultBridgesAsync();
            const obfs3Bridges = ConfigurationUtils.chunk(
                ConfigurationUtils.shuffle(this.getDefaultObfs3Bridges(defaultBridges), this.random),
                2
            );
            const obfs4Bridges = ConfigurationUtils.chunk(
                ConfigurationUtils.shuffle(this.getDefaultObfs4Bridges(defaultBridges), this.random),
                2
            );
            const webTunnelBridges = ConfigurationUtils.chunk(
                ConfigurationUtils.shuffle(this.getDefaultWebTunnelBridges(defaultBridges), this.random),
                2
            );
            const vanillaBridges = ConfigurationUtils.chunk(
                ConfigurationUtils.shuffle(this.getDefaultVanillaBridges(defaultBridges), this.random),
                2
            );

            this.checkBridgesQueue = ConfigurationUtils.interleave(
                webTunnelBridges,
                vanillaBridges,
                obfs3Bridges,
                obfs4Bridges
            );
        }

        return this.checkBridgesQueue;
    }

    getDefaultBridges() {
        if (!this.isTorAssetAvailable()) {
            return [];
        }

        return this.fileManager.readFile(this.configuration.getTorDefaultBridgesPath());
    }

    async getDefaultBridgesAsync() {
        if (!await this.configuration.isTorAssetAvailableAsync()) {
            return [];
        }

        return this.fileManager.readFileAsync(this.configuration.getTorDefaultBridgesPath());
    }

    getDefaultObfs4Bridges(defaultBridges = this.getDefaultBridges()) {
        return this.getValidatedDefaultBridges(defaultBridges, 'obfs4', (bridge) => {
            return this.bridgeChecker.getObfs4BridgeChecker(bridge);
        });
    }

    getDefaultObfs3Bridges(defaultBridges = this.getDefaultBridges()) {
        return this.getValidatedDefaultBridges(defaultBridges, 'obfs3', (bridge) => {
            return this.bridgeChecker.getObfs3BridgeChecker(bridge);
        });
    }

    getDefaultMeekLiteBridges(defaultBridges = this.getDefaultBridges()) {
        return this.getValidatedDefaultBridges(defaultBridges, 'meek_lite', (bridge) => {
            return this.bridgeChecker.getMeekLiteBridgeChecker(bridge);
        });
    }

    getDefaultSnowflakeBridges(defaultBridges = this.getDefaultBridges()) {
        const bridges = this.getValidatedDefaultBridges(defaultBridges, 'snowflake', (bridge) => {
            return this.bridgeChecker.getSnowFlakeBridgeChecker(bridge);
        });

        return bridges.length > 0 ? bridges : [...DEFAULT_SNOWFLAKE_BRIDGES_FALLBACK];
    }

    getDefaultConjureBridges(defaultBridges = this.getDefaultBridges()) {
        return this.getValidatedDefaultBridges(defaultBridges, 'conjure', (bridge) => {
            return this.bridgeChecker.getConjureBridgeChecker(bridge);
        });
    }

    getDefaultWebTunnelBridges(defaultBridges = this.getDefaultBridges()) {
        return this.getValidatedDefaultBridges(defaultBridges, 'webtunnel', (bridge) => {
            return this.bridgeChecker.getWebTunnelBridgeChecker(bridge);
        });
    }

    getDefaultVanillaBridges(defaultBridges = this.getDefaultBridges()) {
        const bridges = defaultBridges
            .filter((bridge) => bridge.startsWith('vanilla'))
            .map((bridge) => bridge.replace(/^vanilla /, ''));

        if (bridges.length === 0) {
            return [];
        }

        const check = this.bridgeChecker.getOtherBridgeChecker(bridges[0]);
        return bridges.filter((bridge) => check(bridge));
    }

    getValidatedDefaultBridges(defaultBridges, prefix, createChecker) {
        const bridges = defaultBridges.filter((bridge) => bridge.startsWith(prefix));
        if (bridges.length === 0) {
            return [];
        }

        const check = createChecker(bridges[0]);
        return bridges.filter((bridge) => check(bridge));
    }

    async updateDefaultBridges() {
        let tempDir;

        try {
            if (!await this.configuration.isTorAssetAvailableAsync()) {
                return false;
            }

            const currentDefaultBridgesPath = this.configuration.getTorDefaultBridgesPath();
            const torAssetStream = await this.configuration.getTorAssetStreamAsync();
            if (!torAssetStream) {
                return false;
            }
            tempDir = await this.fileManager.createTempDirAsync('tor-runner-assets-');
            if (!tempDir) {
                return false;
            }

            const extracted = await this.zipFileManager.extractZipFromInputStream(torAssetStream, tempDir);
            if (!extracted) {
                return false;
            }

            const extractedDefaultBridgesPath = await this.fileManager.findFileEndingWithAsync(tempDir, 'bridges_default.lst');
            if (!extractedDefaultBridgesPath) {
                return false;
            }

            const extractedDefaultBridgesDigest = await this.fileManager.getFileDigestAsync(extractedDefaultBridgesPath);
            if (!extractedDefaultBridgesDigest) {
                return false;
            }

            const currentDefaultBridgesDigest = await this.fileManager.getFileDigestAsync(currentDefaultBridgesPath);
            if (extractedDefaultBridgesDigest !== currentDefaultBridgesDigest) {
                if (await this.fileManager.copyFileAsync(extractedDefaultBridgesPath, currentDefaultBridgesPath)) {
                    Logger.logi('Tor default bridges were updated!');
                    this.autoBridgesQueue = null;
                    this.checkBridgesQueue = null;
                    return true;
                }

                return false;
            }

            return true;
        } catch (e) {
            Logger.loge('BridgesDefaultRepository updateDefaultBridges', e);
            return false;
        } finally {
            if (tempDir) {
                await this.fileManager.deleteTempDirAsync(tempDir);
            }
        }
    }

    isTorAssetAvailable() {
        return this.configuration.isTorAssetAvailable?.() ?? true;
    }

    getNonEmptySniHosts(fakeSni) {
        return Array.isArray(fakeSni)
            ? fakeSni.map((host) => typeof host === 'string' ? host.trim() : '').filter(Boolean)
            : [];
    }

}

module.exports = BridgesDefaultRepositoryImpl;
