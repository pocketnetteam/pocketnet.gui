'use strict';

const path = require('path');

const ConfigurationRepositoryImpl = require('../../data/configuration/ConfigurationRepositoryImpl');
const BridgesCustomRepositoryImpl = require('../../data/configuration/BridgesCustomRepositoryImpl');
const BridgesDefaultRepositoryImpl = require('../../data/configuration/BridgesDefaultRepositoryImpl');
const CoreState = require('./CoreState');
const CoreStatus = require('./CoreStatus');
const BridgeType = require('../configuration/BridgeType');
const RendezvousType = require('../configuration/RendezvousType');
const NetworkChecker = require('../../utils/network/NetworkChecker');
const FileManager = require('../../utils/file/FileManager');
const Logger = require('../../utils/logger/Logger');

const DELAY_BEFORE_RESTART_TOR_SEC = 10;
const DELAY_BEFORE_FULL_RESTART_TOR_SEC = 60;
const MIN_DELAY_ROTATE_BRIDGE_MINUTES = 3;
const EXTRA_DELAY_ROTATE_BRIDGE_MINUTES = 1;
const MIN_DELAY_CHECK_BRIDGE_MINUTES = 1;
const EXTRA_DELAY_CHECK_BRIDGE_MINUTES = 1;

class TorRestarterReconnector {
    coreStatus = null;
    configuration = null;
    networkChecker = null;
    fileManager = null;
    torManager = null;
    bridgesDefaultRepository = null;
    bridgesCustomRepository = null;
    torCheckerManager = null;
    partialRestartCounter = 0;
    fullRestartCounter = 0;
    rotateBridgesCounter = 0;
    checkBridgesCounter = 0;
    restartTask = null;
    rotateBridgesTask = null;
    checkBridgesTask = null;
    torCheckerProcessRunning = false;
    torCheckerStopPromise = null;
    delayFunction = null;
    automationGeneration = 0;

    constructor({
        coreStatus = new CoreStatus(),
        configuration = new ConfigurationRepositoryImpl(),
        networkChecker = new NetworkChecker(),
        fileManager = new FileManager(),
        torManager = null,
        bridgesDefaultRepository = new BridgesDefaultRepositoryImpl({ configuration }),
        bridgesCustomRepository = new BridgesCustomRepositoryImpl({ configuration }),
        torCheckerManager = null,
        delayFunction = null
    } = {}) {
        this.coreStatus = coreStatus;
        this.configuration = configuration;
        this.networkChecker = networkChecker;
        this.fileManager = fileManager;
        this.torManager = torManager;
        this.bridgesDefaultRepository = bridgesDefaultRepository;
        this.bridgesCustomRepository = bridgesCustomRepository;
        this.torCheckerManager = torCheckerManager;
        this.delayFunction = delayFunction;
    }

    async startRestarterCounter() {
        try {
            if (this.isBridgeAdoptionPending()) {
                return;
            }

            if (this.coreStatus.isTorReady() && !this.isFullRestartCounterRunning() && !this.isFullRestartCounterLocked()) {
                this.stopRestartAndRotationCounters({ log: true });
                this.launchTask(this.makeTorDelayedFullRestart(), 'makeTorDelayedFullRestart');
            } else if (!this.coreStatus.isTorReady() && !this.isPartialRestartCounterRunning() && !this.isFullRestartCounterLocked()) {
                this.stopRestartAndRotationCounters({ log: true });
                this.launchTask(this.makeTorProgressivePartialRestart(), 'makeTorProgressivePartialRestart');
            } else if (!this.coreStatus.isTorReady() && !this.isPartialRestartCounterRunning()) {
                this.cancelRestartTask();
                this.cancelRotateBridgesTask();
                this.rotateBridgesCounter = 0;
                this.launchTask(this.makeTorProgressivePartialRestart(), 'makeTorProgressivePartialRestart');
            }

            const automationGeneration = this.automationGeneration;
            if (
                this.isAutoBridgesMode() &&
                !this.isRotateBridgesCounterRunning() &&
                await this.configuration.getCurrentBridgeTypeAsync() !== BridgeType.NONE &&
                this.isAutomationGenerationActive(automationGeneration)
            ) {
                this.launchTask(this.startRotatingBridges(automationGeneration), 'startRotatingBridges');
            }

            if (
                this.isAutoBridgesMode() &&
                this.isAutomationGenerationActive(automationGeneration) &&
                !this.isCheckBridgesCounterRunning() &&
                !this.checkBridgesTask &&
                !this.torCheckerProcessRunning &&
                !this.torCheckerStopPromise
            ) {
                const bridgeType = await this.configuration.getCurrentBridgeTypeAsync();
                if (
                    this.isAutomationGenerationActive(automationGeneration) &&
                    (
                        bridgeType === BridgeType.SNOWFLAKE ||
                        bridgeType === BridgeType.CONJURE ||
                        bridgeType === BridgeType.MEEK_LITE
                    )
                ) {
                    this.launchTask(this.startCheckingBridges(automationGeneration), 'startCheckingBridges');
                }
            }
        } catch (e) {
            Logger.loge('TorRestarterReconnector startRestarterCounter', e);
        }
    }

    async makeTorProgressivePartialRestart() {
        this.cancelRestartTask();
        const task = this.createTask();
        this.restartTask = task;
        Logger.logi('Start Tor partial restarter counter');

        try {
            while (!task.cancelled) {
                if (this.isNetworkAvailable()) {
                    this.partialRestartCounter += 1;
                } else {
                    this.stopRestarterCounters();
                    await this.stopTorChecker();
                    break;
                }

                await this.delay(1000 * 60 * Math.pow(this.partialRestartCounter, 2), task);
                if (task.cancelled) {
                    break;
                }

                if (this.partialRestartCounter === 0) {
                    continue;
                }

                if (this.coreStatus.isTorReady() && !this.isFullRestartCounterLocked()) {
                    this.resetCounters();
                    this.launchTask(this.makeTorDelayedFullRestart(), 'makeTorDelayedFullRestart');
                    break;
                } else if (this.isNetworkAvailable()) {
                    Logger.logi('Reload Tor configuration to re-establish a connection');
                    this.reloadTorConfiguration();
                }
            }
        } catch (e) {
            if (!task.cancelled) {
                Logger.loge('TorRestarterReconnector makeTorProgressivePartialRestart', e);
            }
        }
    }

    async makeTorDelayedFullRestart() {
        this.cancelRestartTask();
        const task = this.createTask();
        this.restartTask = task;
        Logger.logi('Start Tor full restarter counter');

        try {
            while (!task.cancelled && this.fullRestartCounter < DELAY_BEFORE_FULL_RESTART_TOR_SEC) {
                if (
                    this.fullRestartCounter === DELAY_BEFORE_RESTART_TOR_SEC &&
                    this.coreStatus.isTorReady() &&
                    this.isNetworkAvailable()
                ) {
                    Logger.logi('Reload Tor configuration to re-establish a connection');
                    this.reloadTorConfiguration();
                }

                this.fullRestartCounter += 1;
                await this.delay(1000, task);
            }

            if (
                !task.cancelled &&
                this.coreStatus.getTorState() === CoreState.RUNNING &&
                this.coreStatus.isTorReady() &&
                this.isNetworkAvailable()
            ) {
                await this.deleteTorCachedFiles();
                if (
                    task.cancelled ||
                    this.restartTask !== task ||
                    this.coreStatus.getTorState() !== CoreState.RUNNING ||
                    !this.coreStatus.isTorReady() ||
                    !this.isNetworkAvailable()
                ) {
                    return;
                }
                this.restartTor();
                this.lockFullRestarterCounter();
                Logger.logi('Restart Tor to re-establish a connection');
            } else if (!task.cancelled) {
                this.resetCounters();
                Logger.logi('Reset Tor restarter counter');
            }
        } catch (e) {
            if (!task.cancelled) {
                Logger.loge('TorRestarterReconnector makeTorDelayedFullRestart', e);
            }
        }
    }

    stopRestarterCounters({ stopChecker = false } = {}) {
        try {
            this.invalidateAutomation();
            this.stopRestartAndRotationCounters({ log: true });
            if (stopChecker) {
                this.launchTask(this.stopTorChecker(), 'stopTorChecker');
            }
        } catch (e) {
            Logger.loge('TorRestarterReconnector stopRestarterCounters', e);
        }
    }

    stopBridgeAutomation() {
        this.invalidateAutomation();
        this.cancelRotateBridgesTask();
        this.rotateBridgesCounter = 0;
        this.launchTask(this.stopTorChecker(), 'stopTorChecker');
    }

    async stopAutomationAndChecker() {
        this.stopRestarterCounters();
        await this.stopTorChecker();
        await this.torCheckerManager?.waitForPendingReportTasks?.();
    }

    stopRestartAndRotationCounters({ log = false } = {}) {
        if (log) {
            if (this.partialRestartCounter > 0) {
                Logger.logi('Stop Tor partial restarter counter');
            } else if (this.partialRestartCounter < 0) {
                Logger.logi('Reset Tor partial restarter counter');
            } else if (this.fullRestartCounter > 0) {
                Logger.logi('Stop Tor full restarter counter');
            } else if (this.fullRestartCounter < 0) {
                Logger.logi('Reset Tor full restarter counter');
            }

            if (this.rotateBridgesCounter > 0) {
                Logger.logi('Stop rotating bridges');
            }
        }

        this.cancelRestartTask();
        this.cancelRotateBridgesTask();
        this.resetCounters();
    }

    cancelRestartTask() {
        this.cancelTask(this.restartTask);
        this.restartTask = null;
    }

    cancelRotateBridgesTask() {
        this.cancelTask(this.rotateBridgesTask);
        this.rotateBridgesTask = null;
        this.rotateBridgesCounter = 0;
    }

    isPartialRestartCounterRunning() {
        return this.partialRestartCounter > 0;
    }

    isFullRestartCounterRunning() {
        return this.fullRestartCounter > 0;
    }

    isFullRestartCounterLocked() {
        return this.fullRestartCounter < 0;
    }

    isRotateBridgesCounterRunning() {
        return this.rotateBridgesCounter > 0;
    }

    isCheckBridgesCounterRunning() {
        return this.checkBridgesCounter > 0;
    }

    lockFullRestarterCounter() {
        this.fullRestartCounter = -1;
    }

    resetCounters() {
        this.partialRestartCounter = 0;
        this.fullRestartCounter = 0;
        this.rotateBridgesCounter = 0;
    }

    restartTor() {
        this.launchTask(this.torManager?.restartTor?.(), 'restartTor');
    }

    reloadTorConfiguration() {
        this.launchTask(this.torManager?.reloadTorConfiguration?.(), 'reloadTorConfiguration');
    }

    isNetworkAvailable() {
        return this.networkChecker.isNetworkAvailable(true);
    }

    async deleteTorCachedFiles() {
        await this.fileManager.deleteFileAsync(path.join(this.configuration.getAppDataDir(), 'data', 'cached-microdesc-consensus'));
    }

    async startRotatingBridges(automationGeneration = this.automationGeneration) {
        if (this.rotateBridgesTask || !this.isAutomationGenerationActive(automationGeneration)) {
            return;
        }

        const task = this.createTask();
        task.automationGeneration = automationGeneration;
        this.rotateBridgesTask = task;
        Logger.logi('Start rotating bridges');
        this.rotateBridgesCounter += 1;

        try {
            while (!task.cancelled) {
                if (!this.isNetworkAvailable()) {
                    this.stopRestarterCounters();
                    await this.stopTorChecker();
                    break;
                }

                await this.delay((await this.getDelayForRotatingBridges()) / 2, task);
                if (this.coreStatus.getTorLoadingPercent() > 10) {
                    await this.delay((await this.getDelayForRotatingBridges()) / 2, task);
                }
                if (this.coreStatus.getTorLoadingPercent() > 65) {
                    await this.delay(EXTRA_DELAY_ROTATE_BRIDGE_MINUTES * 60 * 1000, task);
                }
                if (this.coreStatus.getTorLoadingPercent() > 90) {
                    await this.delay(EXTRA_DELAY_ROTATE_BRIDGE_MINUTES * 60 * 1000, task);
                }
                if (task.cancelled) {
                    break;
                }

                if (
                    this.coreStatus.getTorState() === CoreState.RUNNING &&
                    !this.isFullRestartCounterRunning() &&
                    this.isNetworkAvailable()
                ) {
                    this.rotateBridgesCounter += 1;
                    if (await this.configuration.getCurrentBridgeTypeAsync() !== BridgeType.NONE) {
                        if (!await this.setNextBridge(task)) {
                            break;
                        }
                        this.partialRestartCounter = 0;
                    } else {
                        this.rotateBridgesCounter = 0;
                        break;
                    }
                }
            }
        } catch (e) {
            if (!task.cancelled) {
                Logger.loge('TorRestarterReconnector startRotatingBridges', e);
            }
        } finally {
            if (this.rotateBridgesTask === task) {
                this.rotateBridgesTask = null;
                this.rotateBridgesCounter = 0;
            }
        }
    }

    async setNextBridge(task) {
        const bridges = await this.bridgesDefaultRepository.getNextBridgesFromAutoQueue();
        if (task?.cancelled || this.rotateBridgesTask !== task) {
            return false;
        }

        const configurationUpdated = await this.configuration.setBridgesAsync(
            bridges,
            () => this.isRotationTaskActive(task)
        );
        if (!configurationUpdated || !this.isRotationTaskActive(task)) {
            return false;
        }
        bridges.forEach((bridge) => Logger.logi(`Try bridge: ${this.shortBridge(bridge)}`));
        return true;
    }

    async startCheckingBridges(automationGeneration = this.automationGeneration) {
        if (
            !this.isAutomationGenerationActive(automationGeneration) ||
            this.checkBridgesTask ||
            this.torCheckerProcessRunning ||
            this.torCheckerStopPromise
        ) {
            return;
        }

        const task = this.createTask();
        task.automationGeneration = automationGeneration;
        task.completion = new Promise((resolve) => {
            task.complete = resolve;
        });
        this.checkBridgesTask = task;
        Logger.logi('Start checking bridges');
        const currentBridgesToCheck = [];

        try {
            this.checkBridgesCounter += 1;
            while (!task.cancelled) {
                this.bridgesDefaultRepository.clearCheckFailedBridges();

                if (!this.isNetworkAvailable()) {
                    this.stopRestarterCounters();
                    break;
                }

                if (this.coreStatus.getTorState() === CoreState.RUNNING && this.isNetworkAvailable()) {
                    this.checkBridgesCounter += 1;
                    const bridgeType = await this.configuration.getCurrentBridgeTypeAsync();
                    if (!this.isCheckingTaskActive(task)) {
                        break;
                    }
                    if (bridgeType !== BridgeType.NONE) {
                        currentBridgesToCheck.length = 0;
                        const isDefaultCheck = this.checkBridgesCounter % 2 === 0;
                        const bridges = isDefaultCheck
                            ? await this.checkNextDefaultBridges(task)
                            : await this.checkNextCustomBridges(task);
                        if (task.cancelled || this.checkBridgesTask !== task) {
                            break;
                        }
                        currentBridgesToCheck.push(...bridges);
                        currentBridgesToCheck.forEach((bridge) => {
                            Logger.logi(`Check next ${isDefaultCheck ? 'default' : 'custom'} bridge: ${this.shortBridge(bridge)}`);
                        });
                    } else {
                        break;
                    }
                }

                await this.delay((await this.getDelayForCheckingBridges()) / 2, task);
                if (this.coreStatus.getTorCheckerLoadingPercent() > 10 && this.coreStatus.getTorCheckerLoadingPercent() < 100) {
                    await this.delay((await this.getDelayForCheckingBridges()) / 2, task);
                }
                if (this.coreStatus.getTorCheckerLoadingPercent() > 65 && this.coreStatus.getTorCheckerLoadingPercent() < 100) {
                    await this.delay(EXTRA_DELAY_CHECK_BRIDGE_MINUTES * 60 * 1000, task);
                }
                if (this.coreStatus.getTorCheckerLoadingPercent() > 90 && this.coreStatus.getTorCheckerLoadingPercent() < 100) {
                    await this.delay(EXTRA_DELAY_CHECK_BRIDGE_MINUTES * 60 * 1000, task);
                }

                if (
                    !task.cancelled &&
                    this.checkBridgesTask === task &&
                    this.coreStatus.getTorCheckerLoadingPercent() === 100 &&
                    this.coreStatus.getTorState() === CoreState.RUNNING &&
                    currentBridgesToCheck.length > 0
                ) {
                    this.stopRestartAndRotationCounters({ log: true });
                    const bridgesToUse = this.getReachableCheckedBridges(currentBridgesToCheck);
                    this.torManager?.cancelTorConnectionCheck?.();
                    const bridgeType = await this.configuration.getCurrentBridgeTypeAsync();
                    if (
                        this.isCheckingTaskActive(task) &&
                        (
                            bridgeType === BridgeType.SNOWFLAKE ||
                            bridgeType === BridgeType.CONJURE ||
                            bridgeType === BridgeType.MEEK_LITE
                        )
                    ) {
                        const configurationUpdated = await this.configuration.setBridgesAsync(
                            bridgesToUse,
                            () => this.isCheckingTaskActive(task)
                        );
                        if (!this.isCheckingTaskActive(task)) {
                            break;
                        }
                        if (configurationUpdated) {
                            await this.bridgesCustomRepository.reportBridgesReachable(bridgesToUse);
                            bridgesToUse.forEach((bridge) => Logger.logi(`Use bridge: ${this.shortBridge(bridge)}`));
                        } else {
                            this.torManager?.checkInternetConnection?.();
                        }
                    } else if (this.isCheckingTaskActive(task)) {
                        this.torManager?.checkInternetConnection?.();
                    }
                    break;
                }
            }
        } catch (e) {
            if (!task.cancelled) {
                Logger.loge('TorRestarterReconnector startCheckingBridges', e);
            }
        } finally {
            if (this.checkBridgesTask === task) {
                this.checkBridgesTask = null;
                this.checkBridgesCounter = 0;

                try {
                    await this.stopTorCheckerProcess();
                } catch (e) {
                    Logger.loge('TorRestarterReconnector stopTorCheckerProcess', e);
                }
            }
            task.complete();
        }
    }

    async checkNextDefaultBridges(task) {
        try {
            const bridges = await this.bridgesDefaultRepository.getNextBridgesFromCheckingQueue();
            if (!this.isCheckingTaskActive(task)) {
                return [];
            }
            const started = await this.torCheckerManager?.runTorChecker?.(bridges);
            if (started) {
                this.torCheckerProcessRunning = true;
            }
            if (task?.cancelled || this.checkBridgesTask !== task) {
                return [];
            }
            this.coreStatus.setTorCheckerLoadingPercent(0);
            return bridges;
        } catch (e) {
            Logger.loge('TorRestarterReconnector checkNextDefaultBridges', e);
            return [];
        }
    }

    async checkNextCustomBridges(task) {
        try {
            const bridges = await this.bridgesCustomRepository.getNextBridgesFromCheckingQueue();
            if (!this.isCheckingTaskActive(task)) {
                return [];
            }
            const started = await this.torCheckerManager?.runTorChecker?.(bridges);
            if (started) {
                this.torCheckerProcessRunning = true;
            }
            if (task?.cancelled || this.checkBridgesTask !== task) {
                return [];
            }
            this.coreStatus.setTorCheckerLoadingPercent(0);
            return bridges;
        } catch (e) {
            Logger.loge('TorRestarterReconnector checkNextCustomBridges', e);
            return [];
        }
    }

    async stopTorChecker() {
        const task = this.checkBridgesTask;
        const shouldStopProcess = Boolean(task) || this.torCheckerProcessRunning || this.torCheckerStopPromise;
        this.cancelTask(task);
        this.checkBridgesTask = null;
        this.checkBridgesCounter = 0;

        if (!shouldStopProcess) {
            return;
        }

        try {
            await this.stopTorCheckerProcess(Boolean(task));
        } catch (e) {
            Logger.loge('TorRestarterReconnector stopTorCheckerProcess', e);
        }
        await task?.completion;
    }

    async stopTorCheckerProcess(stopPendingStart = false) {
        if (this.torCheckerStopPromise) {
            return this.torCheckerStopPromise;
        }

        if (!this.torCheckerProcessRunning && !stopPendingStart) {
            return false;
        }

        this.torCheckerStopPromise = Promise.resolve(this.torCheckerManager?.stopTorChecker?.())
            .then((result) => {
                if (result !== false || !this.isTorCheckerProcessAlive()) {
                    this.torCheckerProcessRunning = false;
                }
                return result;
            })
            .finally(() => {
                this.torCheckerStopPromise = null;
            });
        return this.torCheckerStopPromise;
    }

    isTorCheckerProcessAlive() {
        return Boolean(this.torCheckerManager?.getTorCheckerPid?.());
    }

    launchTask(promise, name) {
        Promise.resolve(promise).catch((e) => {
            Logger.loge(`TorRestarterReconnector ${name}`, e);
        });
    }

    setNextSnowFlakeBridge() {
        const currentSnowflakeType = this.configuration.getSnowflakeBridgeType();
        const nextSnowflakeBridgeType = currentSnowflakeType === RendezvousType.AMP_CACHE
            ? RendezvousType.AMAZON_SQS
            : currentSnowflakeType === RendezvousType.AMAZON_SQS
                ? RendezvousType.CDN77
                : RendezvousType.AMP_CACHE;
        this.configuration.setSnowflakeBridgeType(nextSnowflakeBridgeType);
        return nextSnowflakeBridgeType;
    }

    getReachableCheckedBridges(currentBridgesToCheck) {
        const failedBridgesAddresses = this.bridgesDefaultRepository.getCheckFailedBridges();
        const bridgesToUse = currentBridgesToCheck.filter((bridge) => {
            return !failedBridgesAddresses.some((address) => bridge.includes(address));
        });

        return bridgesToUse.length > 0 ? bridgesToUse : [...currentBridgesToCheck];
    }

    async getDelayForRotatingBridges() {
        const queueLength = await this.bridgesDefaultRepository.getAutoQueueLengthAsync();
        const divisor = queueLength > 0 ? queueLength : 1;
        return 1000 * 60 * MIN_DELAY_ROTATE_BRIDGE_MINUTES * Math.ceil(this.rotateBridgesCounter / divisor);
    }

    async getDelayForCheckingBridges() {
        const queueLength = await this.bridgesDefaultRepository.getCheckQueueLengthAsync() +
            await this.bridgesCustomRepository.getCheckQueueLengthAsync();
        const divisor = queueLength > 0 ? queueLength : 1;
        return 1000 * 60 * MIN_DELAY_CHECK_BRIDGE_MINUTES * Math.ceil(this.checkBridgesCounter / divisor);
    }

    createTask() {
        return {
            cancelled: false,
            timers: new Map()
        };
    }

    invalidateAutomation() {
        this.automationGeneration += 1;
    }

    isAutomationGenerationActive(automationGeneration) {
        return automationGeneration === this.automationGeneration && this.isAutoBridgesMode();
    }

    isAutoBridgesMode() {
        return this.torManager?.isAutoBridgesMode?.() ?? true;
    }

    isRotationTaskActive(task) {
        return !task?.cancelled &&
            this.rotateBridgesTask === task &&
            this.isAutomationGenerationActive(task.automationGeneration);
    }

    isCheckingTaskActive(task) {
        return !task?.cancelled &&
            this.checkBridgesTask === task &&
            this.isAutomationGenerationActive(task.automationGeneration);
    }

    isBridgeAdoptionPending() {
        return Boolean(this.checkBridgesTask) &&
            this.coreStatus.getTorCheckerLoadingPercent?.() === 100;
    }

    cancelTask(task) {
        if (!task) {
            return;
        }
        task.cancelled = true;
        task.timers.forEach((resolve, timer) => {
            clearTimeout(timer);
            resolve();
        });
        task.timers.clear();
    }

    delay(timeoutMs, task) {
        if (task?.cancelled) {
            return Promise.resolve();
        }

        const delayFunction = this.delayFunction;
        if (typeof delayFunction === 'function') {
            return new Promise((resolve, reject) => {
                const token = {};
                let settled = false;
                const finish = (callback, value) => {
                    if (settled) {
                        return;
                    }
                    settled = true;
                    task?.timers?.delete(token);
                    callback(value);
                };

                task?.timers?.set(token, () => finish(resolve));
                try {
                    Promise.resolve(delayFunction(timeoutMs, task))
                        .then((value) => finish(resolve, value))
                        .catch((error) => finish(reject, error));
                } catch (e) {
                    finish(reject, e);
                }
            });
        }

        return new Promise((resolve) => {
            const timer = setTimeout(() => {
                task?.timers?.delete(timer);
                resolve();
            }, Math.max(0, timeoutMs));
            task?.timers?.set(timer, resolve);
        });
    }

    shortBridge(bridge) {
        const parts = String(bridge).split(' ');
        return parts.length > 2 ? `${parts[0]} ${parts[1]}` : String(bridge);
    }
}

module.exports = TorRestarterReconnector;
