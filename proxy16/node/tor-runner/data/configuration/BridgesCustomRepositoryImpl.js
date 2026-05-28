'use strict';

const BridgesCustomRepository = require('../../domain/configuration/BridgesCustomRepository');
const BridgeType = require('../../domain/configuration/BridgeType');
const ConfigurationUtils = require('../../domain/configuration/ConfigurationUtils');
const DomainToPort = require('../../domain/addresschecker/DomainToPort');
const IpToPort = require('../../domain/addresschecker/IpToPort');
const AddressCheckerRepositoryImpl = require('../addresschecker/AddressCheckerRepositoryImpl');
const BridgesCleanerManagerImpl = require('./BridgesCleanerManagerImpl');
const ConfigurationRepositoryImpl = require('./ConfigurationRepositoryImpl');
const PreferenceRepositoryImpl = require('../preferences/PreferenceRepositoryImpl');
const SniRepositoryImpl = require('../sni/SniRepositoryImpl');
const VanillaRelaysRepositoryImpl = require('./VanillaRelaysRepositoryImpl');
const {
    IPv4_REGEX,
    IPv6_REGEX,
    MAX_PORT_NUMBER,
    NUMBER_REGEX,
    TOR_BRIDGES_ADDRESS,
    URL_REGEX
} = require('../../utils/Constants');
const BridgeChecker = require('../../utils/bridges/BridgeChecker');
const FileManager = require('../../utils/file/FileManager');
const Logger = require('../../utils/logger/Logger');
const HttpsConnectionManager = require('../../utils/web/HttpsConnectionManager');

const REQUEST_BRIDGES_INTERVAL_HOURS = 24;
const REQUEST_BRIDGES_RETRY_INTERVAL_HOURS = 1;
const MAX_BRIDGES_QUANTITY = 300;
const MIN_DELAY_MSEC = 1000;
const MAX_DELAY_MSEC = 5000;
const FINGERPRINT_REGEX = String.raw`\w{40}`;
const CANCELLED_ERROR_CODE = 'BRIDGES_CUSTOM_REPOSITORY_CANCELLED';

class BridgesCustomRepositoryImpl extends BridgesCustomRepository {
    checkBridgesQueue = null;
    requestingTorBridges = false;
    requestToken = null;
    requestTask = null;
    customBridgesFileOperationQueue = Promise.resolve();
    customBridgesRevision = 0;

    constructor({
        configuration = new ConfigurationRepositoryImpl(),
        httpsConnectionManager = new HttpsConnectionManager({ configuration }),
        fileManager = new FileManager(),
        bridgeChecker = new BridgeChecker(),
        preferences = new PreferenceRepositoryImpl({ configuration: configuration.configurationManager }),
        addressCheckerRepository = new AddressCheckerRepositoryImpl({ preferences }),
        sniRepository = null,
        random = Math.random,
        vanillaRelaysRepository = new VanillaRelaysRepositoryImpl({
            httpsConnectionManager,
            addressCheckerRepository,
            random
        }),
        bridgesCleanerManager = new BridgesCleanerManagerImpl({ preferences }),
        now = () => Date.now(),
        delay = (timeoutMs) => new Promise((resolve) => setTimeout(resolve, timeoutMs))
    } = {}) {
        super();
        this.httpsConnectionManager = httpsConnectionManager;
        this.configuration = configuration;
        this.fileManager = fileManager;
        this.bridgeChecker = bridgeChecker;
        this.preferences = preferences;
        this.addressCheckerRepository = addressCheckerRepository;
        this.sniRepository = sniRepository || new SniRepositoryImpl({
            configuration,
            addressCheckerRepository,
            preferences,
            fileManager
        });
        this.vanillaRelaysRepository = vanillaRelaysRepository;
        this.bridgesCleanerManager = bridgesCleanerManager;
        this.random = random;
        this.now = now;
        this.delay = delay;
        this.numberRegex = NUMBER_REGEX;
        this.urlRegex = new RegExp(`^${URL_REGEX}$`);
        this.ipv4Regex = new RegExp(`^${IPv4_REGEX}$`);
        this.vanillaBridgePatternIPv4 = new RegExp(`(${IPv4_REGEX}):(\\d+) +${FINGERPRINT_REGEX}`);
        this.vanillaBridgePatternIPv6 = new RegExp(`\\[${IPv6_REGEX}]:(\\d+) +${FINGERPRINT_REGEX}`);
        this.obfs4BridgePatternIPv4 = new RegExp(`obfs4 +(${IPv4_REGEX}):(\\d+) +${FINGERPRINT_REGEX} +cert=.+ +iat-mode=\\d`);
        this.obfs4BridgePatternIPv6 = new RegExp(`obfs4 +\\[${IPv6_REGEX}]:(\\d+) +${FINGERPRINT_REGEX} +cert=.+ +iat-mode=\\d`);
        this.webTunnelBridgePatternIPv4 = new RegExp(`webtunnel +(${IPv4_REGEX}):(\\d+) +${FINGERPRINT_REGEX} +url=http(s)?://[\\w./-]+`);
        this.webTunnelBridgePatternIPv6 = new RegExp(`webtunnel +\\[${IPv6_REGEX}]:(\\d+) +${FINGERPRINT_REGEX} +url=http(s)?://[\\w./-]+`);
    }

    generateCheckBridgesQueue(customBridges = this.getCustomBridges()) {
        const obfs4Bridges = ConfigurationUtils.chunk(
            ConfigurationUtils.shuffle(this.getCustomObfs4BridgesIPv4(customBridges), this.random),
            2
        );
        const webTunnelBridges = ConfigurationUtils.chunk(
            ConfigurationUtils.shuffle(this.getCustomWebTunnelBridges(customBridges), this.random),
            2
        );
        const vanillaBridges = ConfigurationUtils.chunk(
            ConfigurationUtils.shuffle(this.getCustomVanillaBridgesIPv4(customBridges), this.random)
                .map((bridge) => bridge.replace(/^vanilla /, '')),
            2
        );

        return ConfigurationUtils.interleave(webTunnelBridges, vanillaBridges, obfs4Bridges);
    }

    async getCheckBridgesQueueAsync() {
        return this.runCustomBridgesFileOperation(async () => {
            while (!this.checkBridgesQueue) {
                const revision = this.customBridgesRevision;
                const queue = this.generateCheckBridgesQueue(await this.getCustomBridgesAsync());
                if (revision === this.customBridgesRevision) {
                    this.checkBridgesQueue = queue;
                }
            }

            return this.checkBridgesQueue;
        });
    }

    startRequestingBridgesFromTorProjectDb() {
        try {
            const nextTimeForBridgesRequest = this.preferences.getNextTimeForBridgesRequest();
            if (this.now() < nextTimeForBridgesRequest || this.requestingTorBridges) {
                return;
            }

            this.requestingTorBridges = true;
            this.requestToken = { cancelled: false };
            Logger.logi('Start requesting bridges from the Tor Project database');

            const requestTask = this.requestingBridgesFromTorProjectDb(this.requestToken)
                .catch(async (e) => {
                    if (e?.code === CANCELLED_ERROR_CODE) {
                        return;
                    }

                    await this.preferences.setNextTimeForBridgesRequest(
                        this.now() + REQUEST_BRIDGES_RETRY_INTERVAL_HOURS * 60 * 60 * 1000
                    );
                    Logger.loge('BridgesCustomRepository requestingBridgesFromTorProjectDb', e);
                })
                .finally(() => {
                    if (this.requestTask === requestTask) {
                        this.requestingTorBridges = false;
                        this.requestToken = null;
                        this.requestTask = null;
                    }
                });
            this.requestTask = requestTask;
        } catch (e) {
            Logger.loge('BridgesCustomRepository startRequestingBridgesFromTorProjectDb', e);
        }
    }

    async stopRequestingBridgesFromTorProjectDb() {
        if (this.requestToken) {
            this.requestToken.cancelled = true;
        }

        await this.requestTask;
    }

    async requestingBridgesFromTorProjectDb(token) {
        const customBridges = await this.getCustomBridgesAsync();
        const webTunnelBridges = this.getCustomWebTunnelBridges(customBridges).length < MAX_BRIDGES_QUANTITY
            ? await this.withRandomDelay(token, () => this.requestWebTunnelBridges(token, customBridges))
            : [];

        const vanillaBridges = this.getCustomVanillaBridgesIPv4(customBridges).length < MAX_BRIDGES_QUANTITY
            ? (await this.withRandomDelay(token, () => this.requestVanillaBridgesIPv4(token, customBridges))).map((bridge) => `vanilla ${bridge}`)
            : [];

        const obfs4Bridges = this.getCustomObfs4BridgesIPv4(customBridges).length < MAX_BRIDGES_QUANTITY
            ? await this.withRandomDelay(token, () => this.requestObfs4BridgesIPv4(token, customBridges))
            : [];

        const vanillaRelays = this.getCustomVanillaBridgesIPv4(customBridges).length < MAX_BRIDGES_QUANTITY
            ? (await this.withRandomDelay(token, () => this.vanillaRelaysRepository.requestVanillaRelays(false))).map((bridge) => `vanilla ${bridge}`)
            : [];

        this.ensureActive(token);

        const bridges = [
            ...webTunnelBridges,
            ...vanillaBridges,
            ...vanillaRelays,
            ...obfs4Bridges
        ];

        if (bridges.length > 0) {
            const saved = await this.saveTorBridgesAsync(bridges);
            const intervalHours = saved ? REQUEST_BRIDGES_INTERVAL_HOURS : REQUEST_BRIDGES_RETRY_INTERVAL_HOURS;
            await this.preferences.setNextTimeForBridgesRequest(this.now() + intervalHours * 60 * 60 * 1000);
        } else {
            await this.preferences.setNextTimeForBridgesRequest(this.now() + REQUEST_BRIDGES_RETRY_INTERVAL_HOURS * 60 * 60 * 1000);
        }
    }

    async requestWebTunnelBridges(token, customBridges = []) {
        const bridges = await this.requestTorBridges({
            transport: BridgeType.WEBTUNNEL,
            ipv6: false,
            useTor: true
        });

        return this.filterReachable(bridges, token, (bridge) => {
            return this.isWebTunnelBridgeReachable(bridge, this.isBridgeStored(customBridges, bridge));
        });
    }

    async isWebTunnelBridgeReachable(bridge, reportUnreachable = true) {
        const url = bridge.split(' ').find((part) => part.startsWith('url='))?.replace(/^url=/, '');
        if (!url || !this.urlRegex.test(url)) {
            await this.deleteBridgeAsync(bridge);
            return false;
        }

        const domainWithPort = url.split('//').pop().split('/')[0];
        const domain = domainWithPort.split(':')[0];
        let port = domainWithPort.includes(':') ? domainWithPort.split(':').pop() : '443';
        port = this.isValidPort(port) ? port : '443';

        const reachable = await this.addressCheckerRepository.isAddressReachable(
            new DomainToPort({ domain, port: Number(port) })
        );
        if (!reachable && reportUnreachable) {
            await this.bridgesCleanerManager.reportBridgeReachable(bridge, false);
        }

        return reachable;
    }

    async requestVanillaBridgesIPv4(token, customBridges = []) {
        const bridges = await this.requestTorBridges({
            transport: BridgeType.VANILLA,
            ipv6: false,
            useTor: true
        });

        return this.filterReachable(bridges, token, (bridge) => {
            return this.isVanillaBridgeIPv4Reachable(bridge, this.isBridgeStored(customBridges, bridge));
        });
    }

    async isVanillaBridgeIPv4Reachable(bridge, reportUnreachable = true) {
        const ipWithPort = bridge.split(' ')[0];
        const ip = ipWithPort.split(':')[0];
        const port = ipWithPort.split(':').pop();

        if (!this.ipv4Regex.test(ip) || !this.isValidPort(port)) {
            await this.deleteBridgeAsync(bridge);
            return false;
        }

        const reachable = await this.addressCheckerRepository.isAddressReachable(
            new IpToPort({ ip, port: Number(port) }),
            5
        );
        if (!reachable && reportUnreachable) {
            await this.bridgesCleanerManager.reportBridgeReachable(bridge, false);
        }

        return reachable;
    }

    async requestObfs4BridgesIPv4(token, customBridges = []) {
        const bridges = await this.requestTorBridges({
            transport: BridgeType.OBFS4,
            ipv6: false,
            useTor: true
        });

        return this.filterReachable(bridges, token, (bridge) => {
            return this.isObfs4BridgeIPv4Reachable(bridge, this.isBridgeStored(customBridges, bridge));
        });
    }

    async isObfs4BridgeIPv4Reachable(bridge, reportUnreachable = true) {
        const ipWithPort = bridge.replace(/^obfs4 +/, '').split(' ')[0];
        const ip = ipWithPort.split(':')[0];
        const port = ipWithPort.split(':').pop();

        if (!this.ipv4Regex.test(ip) || !this.isValidPort(port)) {
            await this.deleteBridgeAsync(bridge);
            return false;
        }

        const reachable = await this.addressCheckerRepository.isAddressReachable(
            new IpToPort({ ip, port: Number(port) }),
            5
        );
        if (!reachable && reportUnreachable) {
            await this.bridgesCleanerManager.reportBridgeReachable(bridge, false);
        }

        return reachable;
    }

    async getNextBridgesFromCheckingQueue() {
        const checkedBridges = this.getLastCheckedBridges().map((bridge) => {
            return ConfigurationUtils.isWebTunnelBridge(bridge)
                ? bridge.replace(ConfigurationUtils.webTunnelSniRegex, '')
                : bridge;
        });
        const queue = await this.getCheckBridgesQueueAsync();

        if (queue.length === 0) {
            Logger.logw('BridgesCustomRepository check bridge queue is empty');
            return [];
        }

        let nextBridges = queue[0];
        for (let index = 0; index < queue.length; index += 1) {
            const bridges = queue[index];
            if (checkedBridges.length === bridges.length && bridges.every((bridge) => checkedBridges.includes(bridge))) {
                let offset = 1;
                while (index + offset < queue.length) {
                    nextBridges = queue[index + offset];

                    if (
                        this.sniRepository.isWhiteListSuspected() &&
                        !ConfigurationUtils.isWebTunnelBridge(nextBridges[0] || '') &&
                        !ConfigurationUtils.isVanillaBridge(nextBridges[0] || '')
                    ) {
                        offset += 1;
                    }

                    if (index + offset === queue.length) {
                        nextBridges = queue[0];
                        break;
                    }

                    nextBridges = queue[index + offset];
                    const firstBridge = nextBridges[0] || '';
                    if (ConfigurationUtils.isWebTunnelBridge(firstBridge) && !this.sniRepository.isWhiteListSuspected()) {
                        nextBridges = await this.filterReachable(nextBridges, null, (bridge) => this.isWebTunnelBridgeReachable(bridge));
                        if (nextBridges.length === 0) {
                            offset += 1;
                        } else {
                            break;
                        }
                    } else if (ConfigurationUtils.isObfs4Bridge(firstBridge)) {
                        nextBridges = await this.filterReachable(nextBridges, null, (bridge) => this.isObfs4BridgeIPv4Reachable(bridge));
                        if (nextBridges.length === 0) {
                            offset += 1;
                        } else {
                            break;
                        }
                    } else if (ConfigurationUtils.isVanillaBridge(firstBridge)) {
                        nextBridges = await this.filterReachable(nextBridges, null, (bridge) => this.isVanillaBridgeIPv4Reachable(bridge));
                        if (nextBridges.length === 0) {
                            offset += 1;
                        } else {
                            break;
                        }
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
                nextBridges = nextBridges.map((bridge) => `${bridge} servername=${fakeSni.join(',')}`);
            }
        }

        await this.setLastCheckedBridges(nextBridges);
        return nextBridges;
    }

    getNonEmptySniHosts(fakeSni) {
        return Array.isArray(fakeSni)
            ? fakeSni.map((host) => typeof host === 'string' ? host.trim() : '').filter(Boolean)
            : [];
    }

    async getCheckQueueLengthAsync() {
        return (await this.getCheckBridgesQueueAsync()).length;
    }

    async reportBridgesReachable(bridges) {
        for (const bridge of bridges) {
            await this.bridgesCleanerManager.reportBridgeReachable(bridge, true);
        }
    }

    async reportBridgeAddressUnreachableAsync(address) {
        const bridge = await this.runCustomBridgesFileOperation(async () => {
            return (await this.getCustomBridgesAsync())
                .find((customBridge) => customBridge.includes(address));
        });
        if (bridge) {
            await this.bridgesCleanerManager.reportBridgeReachable(bridge, false);
        }
    }

    async deleteBridgeAsync(bridge) {
        return this.runCustomBridgesFileOperation(async () => {
            try {
                const deleted = await this.fileManager.rewriteFileAsync(
                    this.configuration.getTorCustomBridgesPath(),
                    (await this.getCustomBridgesAsync())
                        .filter((customBridge) => !this.isStoredBridgeEqual(customBridge, bridge))
                );
                return this.invalidateCheckBridgesQueueOnSuccess(deleted);
            } catch (e) {
                Logger.logw('BridgesCustomRepository deleteBridgeAsync', e);
                return false;
            }
        });
    }

    async deleteBridgeByAddressAsync(bridgeAddress) {
        return this.runCustomBridgesFileOperation(async () => {
            try {
                const deleted = await this.fileManager.rewriteFileAsync(
                    this.configuration.getTorCustomBridgesPath(),
                    (await this.getCustomBridgesAsync()).filter((bridge) => !bridge.includes(bridgeAddress))
                );
                return this.invalidateCheckBridgesQueueOnSuccess(deleted);
            } catch (e) {
                Logger.logw('BridgesCustomRepository deleteBridgeByAddressAsync', e);
                return false;
            }
        });
    }

    getLastCheckedBridges() {
        return [...this.preferences.getLastCustomBridges()];
    }

    setLastCheckedBridges(bridges) {
        return this.preferences.setLastCustomBridges(new Set(bridges));
    }

    async requestTorBridges({ transport, ipv6, useTor }) {
        try {
            const bridges = [];
            const type = this.getBridgeRequestType(transport);
            const url = ipv6
                ? `${TOR_BRIDGES_ADDRESS}bridges?transport=${type}&ipv6=yes`
                : `${TOR_BRIDGES_ADDRESS}bridges?transport=${type}`;

            await this.httpsConnectionManager.post(url, {}, useTor, async (inputStream) => {
                bridges.push(...await this.parseBridges(inputStream, ipv6));
            });

            return bridges;
        } catch (e) {
            Logger.logw('BridgesCustomRepository requestTorBridges', e);
            return [];
        }
    }

    getBridgeRequestType(transport) {
        switch (transport) {
        case BridgeType.VANILLA:
            return 'vanilla';
        case BridgeType.OBFS4:
            return 'obfs4';
        case BridgeType.WEBTUNNEL:
            return 'webtunnel';
        default:
            throw new Error(`Requesting ${transport} bridges is not supported`);
        }
    }

    async saveTorBridgesAsync(bridges) {
        return this.runCustomBridgesFileOperation(async () => {
            try {
                if (bridges.length === 0) {
                    return false;
                }

                const newBridges = (await this.getCustomBridgesAsync())
                    .filter((bridge) => !bridges.includes(bridge))
                    .concat(bridges)
                    .sort();

                const saved = await this.fileManager.rewriteFileAsync(
                    this.configuration.getTorCustomBridgesPath(),
                    newBridges
                );
                return this.invalidateCheckBridgesQueueOnSuccess(saved);
            } catch (e) {
                Logger.logw('BridgesCustomRepository saveTorBridgesAsync', e);
                return false;
            }
        });
    }

    getCustomBridges() {
        return this.fileManager.readFile(this.configuration.getTorCustomBridgesPath());
    }

    async getCustomBridgesAsync() {
        return this.fileManager.readFileAsync(this.configuration.getTorCustomBridgesPath());
    }

    isStoredBridgeEqual(storedBridge, bridge) {
        return storedBridge === bridge || storedBridge === `vanilla ${bridge}`;
    }

    isBridgeStored(customBridges, bridge) {
        return customBridges.some((storedBridge) => this.isStoredBridgeEqual(storedBridge, bridge));
    }

    invalidateCheckBridgesQueueOnSuccess(success) {
        if (success) {
            this.customBridgesRevision += 1;
            this.checkBridgesQueue = null;
        }

        return success;
    }

    runCustomBridgesFileOperation(operation) {
        const task = this.customBridgesFileOperationQueue
            .catch(() => {})
            .then(operation);
        this.customBridgesFileOperationQueue = task.catch(() => {});
        return task;
    }

    getCustomObfs4BridgesIPv4(customBridges = this.getCustomBridges()) {
        const bridges = customBridges.filter((bridge) => {
            return bridge.startsWith('obfs4') && !this.isIPv6Bridge(bridge);
        });
        if (bridges.length === 0) {
            return [];
        }

        const check = this.bridgeChecker.getObfs4BridgeChecker(bridges[0]);
        return bridges.filter((bridge) => check(bridge));
    }

    getCustomWebTunnelBridges(customBridges = this.getCustomBridges()) {
        const bridges = customBridges.filter((bridge) => bridge.startsWith('webtunnel'));
        if (bridges.length === 0) {
            return [];
        }

        const check = this.bridgeChecker.getWebTunnelBridgeChecker(bridges[0]);
        return bridges.filter((bridge) => check(bridge));
    }

    getCustomVanillaBridgesIPv4(customBridges = this.getCustomBridges()) {
        const bridges = customBridges
            .filter((bridge) => bridge.startsWith('vanilla') && !this.isIPv6Bridge(bridge))
            .map((bridge) => bridge.replace(/^vanilla /, ''));
        if (bridges.length === 0) {
            return [];
        }

        const check = this.bridgeChecker.getOtherBridgeChecker(bridges[0]);
        return bridges.filter((bridge) => check(bridge));
    }

    async parseBridges(inputStream, acceptIPv6) {
        const newBridges = [];
        const lines = await this.readLines(inputStream);

        for (const line of lines) {
            if (this.vanillaBridgePatternIPv4.test(line) || this.vanillaBridgePatternIPv6.test(line)) {
                const bridge = this.parseBridge(this.unescapeHTML(line), acceptIPv6);
                if (bridge) {
                    newBridges.push(bridge);
                }
            } else if (newBridges.length > 0 && line.includes('</div>')) {
                break;
            }
        }

        return newBridges;
    }

    parseBridge(line, acceptIPv6) {
        if (this.containsObfs4Bridge(line)) {
            return this.parseObfs4Bridge(line, acceptIPv6);
        }

        if (this.containsWebTunnelBridge(line)) {
            return this.parseWebTunnelBridge(line);
        }

        return this.parseVanillaBridge(line, acceptIPv6);
    }

    parseObfs4Bridge(line, acceptIPv6) {
        if (!acceptIPv6) {
            const match = line.match(this.obfs4BridgePatternIPv4);
            if (match) {
                return match[0];
            }
        }

        if (acceptIPv6) {
            const match = line.match(this.obfs4BridgePatternIPv6);
            if (match) {
                return match[0];
            }
        }

        Logger.loge(`BridgesCustomRepository parseObfs4Bridge failed ${line}`);
        return null;
    }

    parseWebTunnelBridge(line) {
        const matchIPv4 = line.match(this.webTunnelBridgePatternIPv4);
        if (matchIPv4) {
            return matchIPv4[0];
        }

        const matchIPv6 = line.match(this.webTunnelBridgePatternIPv6);
        if (matchIPv6) {
            return matchIPv6[0];
        }

        Logger.loge(`BridgesCustomRepository parseWebTunnelBridge failed ${line}`);
        return null;
    }

    parseVanillaBridge(line, acceptIPv6) {
        if (!acceptIPv6) {
            const match = line.match(this.vanillaBridgePatternIPv4);
            if (match) {
                return match[0];
            }
        }

        if (acceptIPv6) {
            const match = line.match(this.vanillaBridgePatternIPv6);
            if (match) {
                return match[0];
            }
        }

        Logger.loge(`BridgesCustomRepository parseVanillaBridge failed ${line}`);
        return null;
    }

    isIPv6Bridge(bridge) {
        return String(bridge).includes('[') && String(bridge).includes(']');
    }

    containsObfs4Bridge(line) {
        return line.includes('obfs4');
    }

    containsWebTunnelBridge(line) {
        return line.includes('webtunnel');
    }

    unescapeHTML(line) {
        return line.replace(/&#(\d+);/g, (entity, codePoint) => {
            try {
                return String.fromCodePoint(Number(codePoint));
            } catch (e) {
                return entity;
            }
        });
    }

    async withRandomDelay(token, action) {
        await this.makeRandomDelay(token);
        this.ensureActive(token);
        const result = await action();
        this.ensureActive(token);
        return result;
    }

    async makeRandomDelay(token) {
        const timeoutMs = Math.floor(this.random() * (MAX_DELAY_MSEC - MIN_DELAY_MSEC)) + MIN_DELAY_MSEC;
        await this.delay(timeoutMs);
        this.ensureActive(token);
    }

    ensureActive(token) {
        if (token?.cancelled) {
            const error = new Error('BridgesCustomRepository request cancelled');
            error.code = CANCELLED_ERROR_CODE;
            throw error;
        }
    }

    async filterReachable(bridges, token, checkBridge) {
        const result = [];

        for (const bridge of bridges) {
            this.ensureActive(token);
            if (await checkBridge(bridge)) {
                result.push(bridge);
            }
        }

        return result;
    }

    isValidPort(port) {
        const portValue = Number(port);
        return this.numberRegex.test(String(port)) && String(port).length <= 5 && portValue <= MAX_PORT_NUMBER;
    }

    async readLines(inputStream) {
        const chunks = [];
        for await (const chunk of inputStream) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }

        const content = Buffer.concat(chunks).toString('utf8');
        if (!content) {
            return [];
        }

        return content.split(/\r?\n/);
    }

}

module.exports = BridgesCustomRepositoryImpl;
