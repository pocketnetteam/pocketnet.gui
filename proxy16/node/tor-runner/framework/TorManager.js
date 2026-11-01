'use strict';

const childProcess = require('child_process');
const kill = require('tree-kill');

const Applications = require('../../applications');
const ConfigurationRepositoryImpl = require('../data/configuration/ConfigurationRepositoryImpl');
const BridgesDefaultRepositoryImpl = require('../data/configuration/BridgesDefaultRepositoryImpl');
const PreferenceRepositoryImpl = require('../data/preferences/PreferenceRepositoryImpl');
const ConfigurationUtils = require('../domain/configuration/ConfigurationUtils');
const BridgeMode = require('../domain/core/BridgeMode');
const CoreState = require('../domain/core/CoreState');
const CoreStatus = require('../domain/core/CoreStatus');
const NetworkChecker = require('../utils/network/NetworkChecker');
const Logger = require('../utils/logger/Logger');
const TorControlClient = require('./TorControlClient');

const START_TOR_DELAY_MS = 2000;
const RESTART_TOR_DELAY_MS = 5000;
const EXTRA_CONNECTION_CHECK_MIN_INTERVAL_MS = 60 * 1000;
const CONTROL_SHUTDOWN_WAIT_TIMEOUT_MS = 5000;
const CONTROL_SHUTDOWN_POLL_INTERVAL_MS = 100;

class TorManager {
    instance = null;
    listeners = [];
    settings = {};
    proxy = null;
    state = null;
    application = null;
    timeoutIntervalId = null;
    timeoutCounter = null;
    restartTimeoutId = null;
    status = 'stopped';
    statusInfo = '';
    locked = false;
    destroyRequested = false;
    lifecycleLockQueue = [];
    settingsChangeQueue = Promise.resolve();
    idleStopPending = false;
    stopRequested = false;
    pendingStopRequests = 0;
    restartRequested = false;
    restartTask = null;
    lastExtraConnectionCheck = 0;
    unsubscribeNetworkChanges = null;

    constructor({
        settings = {},
        proxy = null,
        coreStatus = new CoreStatus(),
        networkChecker = new NetworkChecker(),
        networkRepository = null,
        configuration = new ConfigurationRepositoryImpl(),
        torConnectionCheckerInteractor = null,
        bridgesCustomRepository = null,
        bridgesDefaultRepository = new BridgesDefaultRepositoryImpl({ configuration }),
        installer = null,
        preferences = new PreferenceRepositoryImpl({ configuration: configuration.configurationManager }),
        torRestarterReconnectorProvider = null,
        torControlClient = new TorControlClient({ configuration }),
        application = null
    } = {}) {
        this.settings = { ...settings };
        this.proxy = proxy;
        this.coreStatus = coreStatus;
        this.networkChecker = networkChecker;
        this.networkRepository = networkRepository;
        this.configuration = configuration;
        this.torConnectionCheckerInteractor = torConnectionCheckerInteractor;
        this.bridgesCustomRepository = bridgesCustomRepository;
        this.bridgesDefaultRepository = bridgesDefaultRepository;
        this.installer = installer;
        this.preferences = preferences;
        this.torRestarterReconnectorProvider = torRestarterReconnectorProvider;
        this.torControlClient = torControlClient;
        this.state = this.createStateAdapter();
        this.application = application || new Applications(settings, {}, proxy, true);
        this.torConnectionCheckerInteractor?.addListener?.(this);
    }

    createStateAdapter() {
        const manager = this;

        return {
            instance: manager,
            get status() {
                return manager.status;
            },
            set status(status) {
                manager.setStatus(status);
            },
            get info() {
                return manager.statusInfo;
            },
            set info(info) {
                manager.statusInfo = info;
            }
        };
    }

    isStarted() {
        return this.status === 'started';
    }

    isStopped() {
        return this.status === 'stopped';
    }

    isRunning() {
        return this.status === 'running';
    }

    onStarted(listener) {
        this.listeners.push({ type: 'started', listener });
    }

    onStopped(listener) {
        this.listeners.push({ type: 'stopped', listener });
    }

    onRunning(listener) {
        this.listeners.push({ type: 'running', listener });
    }

    onAny(listener) {
        this.listeners.push({ type: 'any', listener });
    }

    setStatus(status) {
        this.status = status;
        this.syncCoreStatus(status);

        this.listeners.forEach((listener) => {
            const isAnyListener = listener.type === 'any';
            const isTargetListenerType = listener.type === status;

            if (isAnyListener || isTargetListenerType) {
                listener.listener(status);
            }
        });

        if (status !== 'running' && status !== 'started') {
            this.statusInfo = '';
        }
    }

    syncCoreStatus(status) {
        if (status === 'running') {
            this.coreStatus.setTorState?.(CoreState.RUNNING);
        } else if (status === 'stopped') {
            this.coreStatus.setTorReady?.(false);
            this.coreStatus.setTorState?.(CoreState.STOPPED);
        } else if (status === 'failed') {
            this.coreStatus.setTorReady?.(false);
            this.coreStatus.setTorState?.(CoreState.FAULT);
        }
    }

    async init() {
        try {
            await this.application.init();
            await this.folders();

            this.autorun().catch((e) => {
                this.startFailed(e);
            });
        } catch (e) {
            this.startFailed(e);
        }
    }

    settingChanged(settings) {
        const requestedSettings = { ...settings };
        const applyChange = () => this.applySettingsChange(requestedSettings);
        const task = this.settingsChangeQueue
            .catch(() => {})
            .then(applyChange);
        this.settingsChangeQueue = task.catch(() => {});
        return task;
    }

    async applySettingsChange(settings) {
        await this.acquireLifecycleLock();
        if (this.destroyRequested) {
            this.unlockLifecycle();
            return false;
        }

        try {
            const previousMode = this.getBridgeMode();
            const nextMode = this.getBridgeMode(settings);
            const isTorStateChanged = settings.enabled3 !== this.settings.enabled3;
            const keepInstanceAlive = (
                settings.enabled3 === 'auto' && this.settings.enabled3 === 'always' ||
                settings.enabled3 === 'always' && this.settings.enabled3 === 'auto'
            );
            const userBridgesChanged = nextMode === BridgeMode.USER_BRIDGES &&
                !this.isBridgesEqual(this.getUserBridges(), this.getUserBridges(settings));
            const bridgeConfigurationChanged = previousMode !== nextMode || userBridgesChanged;
            const needRestart = bridgeConfigurationChanged || (isTorStateChanged && !keepInstanceAlive);
            const unmanagedTorPid = needRestart && !this.instance && this.status === 'stopped'
                ? await this.torControlClient.getPid()
                : null;
            const replaceRunningTor = needRestart && Boolean(this.instance || this.status !== 'stopped');
            const stopExistingTor = replaceRunningTor || Boolean(unmanagedTorPid);
            const shouldStopBridgeAutomation = previousMode === BridgeMode.AUTO_BRIDGES &&
                (nextMode !== BridgeMode.AUTO_BRIDGES || settings.enabled3 === 'neveruse');
            const previousBridges = bridgeConfigurationChanged && stopExistingTor
                ? await this.configuration.getCurrentBridgesAsync()
                : null;

            if (bridgeConfigurationChanged) {
                try {
                    if (!await this.ensureTorConfiguration({ replace: true, settings })) {
                        Logger.loge('TorManager settingChanged unable to create Tor configuration');
                        return false;
                    }
                } catch (e) {
                    Logger.loge('TorManager settingChanged unable to create Tor configuration', e);
                    return false;
                }
            }

            if (shouldStopBridgeAutomation) {
                this.getTorRestarterReconnector()?.stopBridgeAutomation?.();
            }

            const replacementStopReason = settings.enabled3 === 'neveruse' ? 'stop' : 'restart';
            const stopReason = replaceRunningTor ? replacementStopReason : 'stop';
            if (stopExistingTor && !await this.stopCurrentProcess(stopReason, { unmanagedTorPid })) {
                if (previousBridges !== null) {
                    await this.restoreTorConfiguration(previousBridges);
                }
                if (shouldStopBridgeAutomation) {
                    this.launchTask(
                        this.getTorRestarterReconnector()?.startRestarterCounter?.(),
                        'startRestarterCounterAfterSettingsRollback'
                    );
                }
                return false;
            }
            if (this.destroyRequested) {
                return false;
            }

            this.settings = { ...settings };

            if (nextMode === BridgeMode.NO_BRIDGES || settings.enabled3 === 'neveruse') {
                this.launchTask(
                    this.bridgesCustomRepository?.stopRequestingBridgesFromTorProjectDb?.(),
                    'stopRequestingBridgesAfterSettingsChange'
                );
            }

            if (!needRestart && keepInstanceAlive) {
                this.updateIdleTimerForModeChange(settings.enabled3);
            }

            if (needRestart) {
                try {
                    if (settings.enabled3 === 'neveruse') {
                        return true;
                    }

                    if (replaceRunningTor) {
                        return await this.scheduleFacadeRestartAfterStopLocked();
                    }

                    return await this.autorunLocked();
                } catch (e) {
                    if (!this.destroyRequested) {
                        this.startFailed(e);
                    }
                    return false;
                }
            }
            return true;
        } finally {
            this.unlockLifecycle();
        }
    }

    getBridgeMode(settings = this.settings) {
        if (settings.useSnowFlake2 === true) {
            return BridgeMode.AUTO_BRIDGES;
        }

        if (this.getUserBridges(settings).length > 0) {
            return BridgeMode.USER_BRIDGES;
        }

        return BridgeMode.NO_BRIDGES;
    }

    getUserBridges(settings = this.settings) {
        return Array.isArray(settings.customObfs4) ? settings.customObfs4 : [];
    }

    isBridgesEqual(first, second) {
        return first.length === second.length && first.every((bridge, index) => bridge === second[index]);
    }

    isAutoBridgesMode(settings = this.settings) {
        return this.getBridgeMode(settings) === BridgeMode.AUTO_BRIDGES;
    }

    shouldRequestBridges() {
        return this.getBridgeMode() !== BridgeMode.NO_BRIDGES;
    }

    startFailed(err) {
        this.stopListeningNetworkChanges();
        Logger.loge('Tor control failed to start', err);
        this.setStatus('failed');
        this.coreStatus.setTorState?.(CoreState.FAULT);
    }

    async autorun() {
        if (this.destroyRequested) {
            return false;
        }

        if (this.settings.enabled3 === 'neveruse') {
            return await this.stopTor();
        }

        if (this.instance || this.status !== 'stopped') {
            return await this.restartTorFromFacade();
        } else if (this.settings.enabled3 === 'always') {
            return await this.startTor();
        }

        return true;
    }

    async autorunLocked() {
        if (this.destroyRequested) {
            return false;
        }

        if (this.settings.enabled3 === 'neveruse') {
            return this.stopCurrentProcess('stop');
        }

        if (this.instance || this.status !== 'stopped') {
            return this.restartTorFromFacadeLocked();
        }

        if (this.settings.enabled3 === 'always') {
            return this.startTorLocked(
                () => this.startTorProcess(),
                () => this.setStatus('failed')
            );
        }

        return true;
    }

    gettordirpath() {
        return this.configuration.getTorResourcesDir();
    }

    getpath() {
        return this.configuration.getTorPath();
    }

    getsettingspath() {
        return this.configuration.getAppDataDir();
    }

    async folders() {
        if (!await this.configuration.ensureAppDataDirAsync()) {
            throw 'tordatapath';
        }
    }

    async ensureTorConfiguration({ replace = false, settings = this.settings } = {}) {
        if (
            !replace &&
            await this.configuration.isTorConfigurationAvailableAsync() &&
            await this.isTorConfigurationCompatibleWithSettings(settings)
        ) {
            return true;
        }

        let bridges = [];
        if (this.isAutoBridgesMode(settings)) {
            await this.installer?.installTorIfRequired?.();
            bridges = await this.bridgesDefaultRepository.getInitialAutoBridgesAsync();
        } else if (this.getBridgeMode(settings) === BridgeMode.USER_BRIDGES) {
            bridges = this.getUserBridges(settings);
        }

        return await this.configuration.createTorConfigurationAsync(bridges) === true;
    }

    async isTorConfigurationCompatibleWithSettings(settings = this.settings) {
        const currentBridges = await this.configuration.getCurrentBridgesAsync();
        const mode = this.getBridgeMode(settings);

        if (mode === BridgeMode.NO_BRIDGES) {
            return currentBridges.length === 0;
        }

        if (mode === BridgeMode.USER_BRIDGES) {
            return this.isBridgesEqual(currentBridges, this.getUserBridges(settings));
        }

        const userBridges = this.getUserBridges(settings);
        return currentBridges.length > 0 &&
            (userBridges.length === 0 || !this.isBridgesEqual(currentBridges, userBridges));
    }

    async restoreTorConfiguration(bridges) {
        try {
            if (await this.configuration.createTorConfigurationAsync(bridges) !== true) {
                Logger.loge('TorManager settingChanged unable to restore Tor configuration after stop failure');
            }
        } catch (e) {
            Logger.loge('TorManager settingChanged unable to restore Tor configuration after stop failure', e);
        }
    }

    async updateDefaultBridges() {
        await this.installer?.installTorIfRequired?.();
        return this.bridgesDefaultRepository?.updateDefaultBridges?.();
    }

    log(data) {
        try {
            const isBootstrapped100 = ({ data: output }) => output?.trimEnd().endsWith('Bootstrapped 100% (done): Done') || output?.includes('Bootstrapped 100%');
            const isBrokerFailure = ({ data: output }) => (/Managed proxy .*: broker failure/g).test(output);
            const isConnectionFailure = ({ data: output }) => (/Managed proxy .*: connection failed/g).test(output);
            const extractBootstrapMessage = ({ data: output }) => (output?.match(/Bootstrapped \d+%.*/) || [null])[0];
            const extractBootstrapPercent = ({ data: output }) => output?.match(/Bootstrapped (\d+)%/)?.[1];
            const isConnectionFailureSuspected = ({ data: output }) => {
                const line = output?.trimEnd();
                return Boolean(
                    line?.endsWith('Ignoring directory request, since no bridge nodes are available yet.') ||
                    line?.endsWith('Delaying directory fetches: No running bridges') ||
                    line?.endsWith('We will try to fetch missing descriptors soon.') ||
                    line?.endsWith('Discarding this circuit.') ||
                    line?.endsWith('Possible compression bomb; abandoning stream.') ||
                    line?.endsWith('Retrying on a new circuit.') ||
                    line?.endsWith('(waiting for circuit)') ||
                    line?.endsWith('retrying conjure registration: registration failed')
                );
            };

            const percent = extractBootstrapPercent(data);
            if (percent !== undefined) {
                this.coreStatus.setTorLoadingPercent(Number(percent));
            }

            const message = extractBootstrapMessage(data);
            if (message !== null) {
                this.statusInfo = message;
            }

            if (isBootstrapped100(data)) {
                this.coreStatus.setTorReady?.(true);
                if (!this.markTorStartedIfReady()) {
                    this.checkInternetConnectionIfReady();
                }
            } else if (this.canRunExtraConnectionCheck() &&
                (isBrokerFailure(data) ||
                isConnectionFailure(data) ||
                isConnectionFailureSuspected(data))) {
                this.lastExtraConnectionCheck = Date.now();
                this.checkInternetConnection();
            }
        } catch (e) {
            Logger.loge('TorManager log', e);
        }
    }

    canRunExtraConnectionCheck() {
        return Date.now() - this.lastExtraConnectionCheck > EXTRA_CONNECTION_CHECK_MIN_INTERVAL_MS;
    }

    startTimer() {
        clearInterval(this.timeoutIntervalId);
        this.timeoutCounter = 5 * 60 * 1000;

        this.timeoutIntervalId = setInterval(() => {
            this.timeoutCounter -= 5000;

            if (this.timeoutCounter <= 0) {
                Logger.logi('Tor was idle for 5 minutes, switching it off');
                this.stopTorWhenIdle();
            }
        }, 5000);
    }

    startAutoTimerIfRequired() {
        if (this.settings.enabled3 === 'auto') {
            this.startTimer();
        }
    }

    updateIdleTimerForModeChange(enabledMode) {
        if (!this.instance) {
            return;
        }

        if (enabledMode === 'auto') {
            this.startTimer();
        } else {
            clearInterval(this.timeoutIntervalId);
            this.timeoutIntervalId = null;
            this.timeoutCounter = null;
        }
    }

    resetTimer() {
        this.timeoutCounter = 5 * 60 * 1000;
    }

    stopTorWhenIdle() {
        if (this.idleStopPending) {
            return;
        }

        this.idleStopPending = true;
        this.stopTor().then((stopped) => {
            if (stopped || this.destroyRequested) {
                this.timeoutCounter = null;
                clearInterval(this.timeoutIntervalId);
                this.timeoutIntervalId = null;
            }
        }).catch((e) => {
            Logger.loge('TorManager idle stop', e);
        }).finally(() => {
            this.idleStopPending = false;
        });
    }

    async startTor() {
        if (this.isFacadeReplacementPending()) {
            return true;
        }

        return this.runTorStart(
            () => this.startTorProcess(),
            () => this.setStatus('failed')
        );
    }

    async startTorAfterRestart() {
        if (this.destroyRequested || this.settings.enabled3 === 'neveruse') {
            return false;
        }

        await this.acquireLifecycleLock();

        try {
            if (
                this.destroyRequested ||
                this.stopRequested ||
                this.settings.enabled3 === 'neveruse'
            ) {
                return false;
            }

            if (this.instance) {
                return this.isUsableManagedProcess(this.instance);
            }

            if (this.coreStatus.getTorState?.() !== CoreState.RESTARTING) {
                return false;
            }

            return await this.startTorLocked(
                () => this.startReplacementTorProcess(),
                () => this.markRestartStartFailed()
            );
        } finally {
            this.unlockLifecycle();
        }
    }

    isFacadeReplacementPending() {
        return Boolean(
            this.restartTimeoutId &&
            !this.instance &&
            this.settings.enabled3 !== 'neveruse' &&
            this.coreStatus.getTorState?.() === CoreState.RESTARTING
        );
    }

    async runTorStart(startProcess, handleStartFailure) {
        if (this.destroyRequested) {
            return false;
        }

        if (this.settings.enabled3 === 'neveruse') {
            return false;
        }

        if (this.instance) {
            return this.isUsableManagedProcess(this.instance);
        }

        if (!this.tryAcquireLifecycleLock()) {
            return false;
        }

        try {
            return await this.startTorLocked(startProcess, handleStartFailure);
        } finally {
            this.unlockLifecycle();
        }
    }

    async startTorLocked(startProcess, handleStartFailure) {
        try {
            if (
                this.coreStatus.getTorState?.() === CoreState.STOPPED ||
                this.coreStatus.getTorState?.() === CoreState.FAULT
            ) {
                this.coreStatus.setTorState?.(CoreState.STARTING);
            }

            if (!await this.ensureTorConfiguration()) {
                Logger.loge('Tor config creation failed');
                handleStartFailure();
                return false;
            }

            if (this.isStartCancellationRequested()) {
                return false;
            }

            const unmanagedTorPid = await this.torControlClient.getPid();
            if (this.isStartCancellationRequested()) {
                return false;
            }

            if (unmanagedTorPid) {
                if (!await this.stopUnmanagedTor(unmanagedTorPid)) {
                    Logger.loge('TorManager unable to stop existing unmanaged Tor process');
                    handleStartFailure();
                    return false;
                }
            }

            await this.deletePidFile();
            return await this.startNewTorProcess(startProcess);
        } catch (e) {
            Logger.loge('Tor was unable to start', e);
            handleStartFailure();
            return false;
        }
    }

    isStartCancellationRequested() {
        return this.destroyRequested || this.stopRequested;
    }

    async startNewTorProcess(startProcess) {
        if (this.isStartCancellationRequested()) {
            return false;
        }

        Logger.logi('Tor start triggered');
        const torProcess = await startProcess();
        if (!torProcess) {
            return false;
        }

        Logger.logi(`Tor executable: ${this.getpath()} data directory: ${this.getsettingspath()}`);

        await this.savepid(torProcess.pid);

        Logger.logi(`Tor running with pid: ${torProcess.pid}`);

        const started = await this.changeTorStatus(torProcess);
        if (started) {
            this.startAutoTimerIfRequired();
        }
        return started;
    }

    async startTorProcess() {
        const fakeHosts = await this.getFakeHostsAsync();
        if (this.isStartCancellationRequested()) {
            return null;
        }

        const torProcess = this.createTorProcess(fakeHosts);
        torProcess.isReplacementStart = false;
        this.observeTorProcess(torProcess);
        return torProcess;
    }

    async startReplacementTorProcess() {
        const fakeHosts = await this.getFakeHostsAsync();
        if (this.isStartCancellationRequested()) {
            return null;
        }

        const torProcess = this.createTorProcess(fakeHosts);
        torProcess.isReplacementStart = true;
        this.observeTorProcess(torProcess);
        return torProcess;
    }

    createTorProcess(fakeHosts = []) {
        const args = [
            '-f', this.configuration.getTorConfPath()
        ];
        if (fakeHosts.length > 0) {
            args.push('--fake-hosts', fakeHosts.join(','));
        }

        const torProcess = childProcess.spawn(this.getpath(), args, {
            stdio: ['ignore'],
            detached: false,
            shell: false,
            cwd: this.gettordirpath(),
            env: {
                ...process.env,
                LD_LIBRARY_PATH: this.getsettingspath()
            }
        });

        torProcess.stopReason = null;
        torProcess.failed = false;
        torProcess.cleanupTask = null;
        torProcess.stdoutBuffer = '';
        torProcess.stderrBuffer = '';
        this.instance = torProcess;

        return torProcess;
    }

    async getFakeHostsAsync() {
        const bridges = await this.configuration.getCurrentBridgesAsync();
        if (!bridges.some((bridge) => ConfigurationUtils.isVanillaBridge(bridge))) {
            return [];
        }

        const fakeHosts = this.preferences?.getLastSni?.();
        return Array.isArray(fakeHosts)
            ? fakeHosts.map((host) => typeof host === 'string' ? host.trim() : '').filter(Boolean)
            : [];
    }

    observeTorProcess(torProcess) {
        torProcess.on('error', (error) => {
            this.launchTask(this.onTorProcessError(torProcess, error), 'onTorProcessError');
        });
        torProcess.on('exit', (code) => {
            this.launchTask(this.onTorProcessExit(torProcess, code), 'onTorProcessExit');
        });
        torProcess.stderr?.on('data', (chunk) => this.onTorStdError(torProcess, String(chunk)));
        torProcess.stdout?.on('data', (chunk) => this.onTorStdOutput(torProcess, String(chunk)));
    }

    onTorStdOutput(torProcess, output) {
        torProcess.stdoutBuffer = this.processBufferedLines(
            torProcess.stdoutBuffer,
            output,
            (line) => this.handleTorStdoutLine(torProcess, line)
        );
    }

    onTorStdError(torProcess, output) {
        torProcess.stderrBuffer = this.processBufferedLines(
            torProcess.stderrBuffer,
            output,
            (line) => this.handleTorStderrLine(line)
        );
    }

    flushBufferedLines(torProcess) {
        const stdoutLine = torProcess.stdoutBuffer.trim();
        torProcess.stdoutBuffer = '';
        if (stdoutLine) {
            this.handleTorStdoutLine(torProcess, stdoutLine);
        }

        const stderrLine = torProcess.stderrBuffer.trim();
        torProcess.stderrBuffer = '';
        if (stderrLine) {
            this.handleTorStderrLine(stderrLine);
        }
    }

    processBufferedLines(buffer, output, lineHandler) {
        const content = `${buffer}${output}`;
        const lines = content.split(/\r?\n/);
        const remainder = lines.pop() || '';

        lines.map((line) => line.trim()).filter(Boolean).forEach(lineHandler);

        return remainder;
    }

    handleTorStdoutLine(torProcess, line) {
        if (this.instance === torProcess) {
            this.log({ data: line });
            if (this.status === 'started') {
                torProcess.isReplacementStart = false;
            }
        }
        Logger.logi(`[TOR] ${line}`);
    }

    handleTorStderrLine(line) {
        Logger.logw(`[TOR] ${line}`);
    }

    async onTorProcessError(torProcess, error) {
        if (this.instance !== torProcess) {
            return;
        }

        if (torProcess.stopReason) {
            return;
        }

        Logger.loge('TorManager process error', error);
        this.log({ error });
        await this.handleUnexpectedProcessFailure(torProcess);
    }

    async onTorProcessExit(torProcess, code) {
        if (code) {
            Logger.loge(`TOR exit with code: ${code}`);
        }
        this.flushBufferedLines(torProcess);
        if (this.instance !== torProcess) {
            return;
        }

        this.log({ exit: code });
        if (torProcess.stopReason) {
            await this.completeStoppedProcess(torProcess, torProcess.stopReason);
        } else if (torProcess.isReplacementStart) {
            await this.handleRestartStartFailure(torProcess);
        } else if (code) {
            await this.handleUnexpectedProcessFailure(torProcess);
        } else {
            await this.handleUnexpectedProcessStop(torProcess);
        }
    }

    async changeTorStatus(torProcess) {
        await this.delay(START_TOR_DELAY_MS);

        if (this.isStartCancellationRequested()) {
            return false;
        }

        if (this.isTorProcessAlive(torProcess)) {
            this.markTorRunning();
            return true;
        }

        if (torProcess.failed || this.status === 'failed') {
            return false;
        }

        if (!torProcess.isReplacementStart) {
            if (this.status !== 'stopped') {
                this.setStatus('stopped');
            }
        } else {
            this.markRestartStartFailed();
        }

        if (this.instance === torProcess) {
            this.cancelTorConnectionCheck();
            this.instance = null;
        }

        return false;
    }

    isTorProcessAlive(torProcess) {
        const pid = this.parsePid(torProcess?.pid);
        if (!pid) {
            return false;
        }

        return Boolean(
            torProcess &&
            this.instance === torProcess &&
            !torProcess.killed &&
            torProcess.exitCode === null &&
            torProcess.signalCode === null
        );
    }

    isUsableManagedProcess(torProcess) {
        return Boolean(
            torProcess &&
            !torProcess.stopReason &&
            !torProcess.cleanupTask &&
            this.isTorProcessAlive(torProcess)
        );
    }

    cancelTorConnectionCheck() {
        this.torConnectionCheckerInteractor?.cancelTask?.();
    }

    markTorRunning({ checkConnection = true } = {}) {
        if (this.status !== 'running' && this.status !== 'started') {
            this.setStatus('running');
        } else {
            this.coreStatus.setTorState?.(CoreState.RUNNING);
        }
        this.startListeningNetworkChanges();

        if (checkConnection && !this.markTorStartedIfReady()) {
            this.checkInternetConnectionIfReady();
        }
    }

    checkInternetConnectionIfReady() {
        if (
            this.coreStatus.getTorState?.() === CoreState.RUNNING &&
            this.coreStatus.isTorReady?.()
        ) {
            this.checkInternetConnection();
        }
    }

    markTorStartedIfReady() {
        if (
            this.status === 'started' ||
            this.coreStatus.getTorState?.() !== CoreState.RUNNING ||
            !this.coreStatus.isTorReady?.() ||
            !this.coreStatus.isTorConnectionAvailable?.()
        ) {
            return false;
        }

        this.setStatus('started');
        return true;
    }

    async savepid(pid) {
        const parsedPid = this.parsePid(pid);
        if (!parsedPid) {
            return;
        }

        if (!await this.configuration.saveTorPidAsync(parsedPid.toString())) {
            Logger.loge('TorManager unable to save pid');
        }
    }

    async stopUnmanagedTor(pid) {
        const shutdownPid = await this.torControlClient.signal('SHUTDOWN');
        if (!shutdownPid) {
            return !this.isPidRunning(pid);
        }

        if (!await this.waitForPidExit(shutdownPid)) {
            return false;
        }

        return shutdownPid === pid || await this.waitForPidExit(pid);
    }

    killpid(pid) {
        return new Promise((resolve) => {
            kill(pid, (err) => {
                if (err) {
                    Logger.loge('Unable to kill TOR instance', err);
                    resolve(false);
                    return;
                }

                resolve(true);
            });
        });
    }

    isPidRunning(pid) {
        const parsedPid = this.parsePid(pid);
        if (!parsedPid) {
            return false;
        }

        try {
            process.kill(parsedPid, 0);
            return true;
        } catch (e) {
            return e?.code === 'EPERM';
        }
    }

    parsePid(pid) {
        const parsedPid = Number(pid);
        return Number.isInteger(parsedPid) && parsedPid > 0 ? parsedPid : null;
    }

    async stopTor() {
        this.pendingStopRequests += 1;
        this.clearRestartTimeout();
        this.restartRequested = false;

        const waitForActiveLifecycle = this.locked;
        if (waitForActiveLifecycle) {
            this.stopRequested = true;
        }

        await this.acquireLifecycleLock();
        let stopped = false;

        try {
            if (waitForActiveLifecycle && !this.stopRequested) {
                return true;
            }

            this.clearRestartTimeout();
            stopped = await this.stopCurrentProcess('stop');
            return stopped;
        } finally {
            this.pendingStopRequests -= 1;
            if (stopped || this.pendingStopRequests === 0) {
                this.stopRequested = false;
            }
            this.unlockLifecycle();
        }
    }

    async stopTorForRestart() {
        return this.stopCurrentProcess('restart');
    }

    async stopCurrentProcess(reason, { unmanagedTorPid = null } = {}) {
        try {
            if (reason === 'stop' && this.coreStatus.getTorState?.() === CoreState.STOPPING) {
                return false;
            }

            this.stopListeningNetworkChanges();
            if (reason === 'stop') {
                this.coreStatus.setTorState?.(CoreState.STOPPING);
            }

            const torProcess = this.instance;
            if (!torProcess) {
                const unmanagedPid = unmanagedTorPid || await this.torControlClient.getPid();
                if (unmanagedPid && !await this.stopUnmanagedTor(unmanagedPid)) {
                    this.setStatus('stopped');
                    Logger.loge('Unable to stop existing unmanaged Tor process');
                    return false;
                }

                return await this.completeStoppedProcess(null, reason);
            }

            const pid = torProcess.pid;
            if (pid) {
                torProcess.stopReason = reason;
                let stopped = await this.killpid(pid);
                if (!stopped) {
                    stopped = !this.isPidRunning(pid);
                }
                if (stopped) {
                    stopped = await this.waitForOwnedTorProcessExit(torProcess);
                }

                if (!stopped) {
                    torProcess.stopReason = null;
                    this.restoreRunningStatusAfterStopFailure(torProcess);
                    Logger.loge('Killer cannot stop Tor!');
                    return false;
                }
            }

            return await this.completeStoppedProcess(torProcess, reason);
        } catch (e) {
            if (this.instance) {
                this.restoreRunningStatusAfterStopFailure(this.instance);
            }
            Logger.logw('Tor instance kill error', e);
            return false;
        }
    }

    restoreRunningStatusAfterStopFailure(torProcess) {
        if (torProcess) {
            this.instance = torProcess;
        }

        if (this.status === 'started') {
            this.coreStatus.setTorState?.(CoreState.RUNNING);
        } else {
            this.markTorRunning({ checkConnection: false });
        }
        this.startListeningNetworkChanges();
    }

    async waitForPidExit(pid) {
        const timeoutAt = Date.now() + CONTROL_SHUTDOWN_WAIT_TIMEOUT_MS;

        while (this.isPidRunning(pid)) {
            if (Date.now() >= timeoutAt) {
                return false;
            }

            await this.delay(CONTROL_SHUTDOWN_POLL_INTERVAL_MS);
        }

        return true;
    }

    async waitForOwnedTorProcessExit(torProcess) {
        if (torProcess.exitCode !== null || torProcess.signalCode !== null) {
            return true;
        }

        return new Promise((resolve) => {
            let timeoutId;
            const finish = (exited) => {
                clearTimeout(timeoutId);
                torProcess.removeListener('exit', onExit);
                resolve(exited);
            };
            const onExit = () => finish(true);

            torProcess.once('exit', onExit);
            timeoutId = setTimeout(() => {
                finish(torProcess.exitCode !== null || torProcess.signalCode !== null);
            }, CONTROL_SHUTDOWN_WAIT_TIMEOUT_MS);
        });
    }

    async completeStoppedProcess(torProcess, reason) {
        if (torProcess?.cleanupTask) {
            return torProcess.cleanupTask;
        }
        if (torProcess && this.instance && this.instance !== torProcess) {
            return true;
        }

        const cleanupTask = (async () => {
            this.stopListeningNetworkChanges();
            this.cancelTorConnectionCheck();
            clearInterval(this.timeoutIntervalId);
            this.timeoutIntervalId = null;
            if (!torProcess || this.instance === torProcess) {
                this.instance = null;
            }
            await this.deletePidFile();

            if (reason === 'restart') {
                this.setStatus('running');
                this.coreStatus.setTorReady?.(false);
                this.coreStatus.setTorState?.(CoreState.RESTARTING);
            } else {
                this.getTorRestarterReconnector()?.stopRestarterCounters?.({ stopChecker: true });
                this.setStatus('stopped');
            }
            return true;
        })();

        if (torProcess) {
            torProcess.cleanupTask = cleanupTask;
        }

        return cleanupTask;
    }

    async handleUnexpectedProcessFailure(torProcess) {
        torProcess.failed = true;
        await this.acquireLifecycleLock();

        try {
            return await this.completeFailedProcess(torProcess, torProcess.isReplacementStart);
        } finally {
            this.unlockLifecycle();
        }
    }

    async handleUnexpectedProcessStop(torProcess) {
        await this.acquireLifecycleLock();

        try {
            return await this.completeStoppedProcess(torProcess, 'stop');
        } finally {
            this.unlockLifecycle();
        }
    }

    async handleRestartStartFailure(torProcess) {
        torProcess.failed = true;
        await this.acquireLifecycleLock();

        try {
            return await this.completeFailedProcess(torProcess, true);
        } finally {
            this.unlockLifecycle();
        }
    }

    async completeFailedProcess(torProcess, isReplacementStart) {
        if (torProcess?.cleanupTask) {
            return torProcess.cleanupTask;
        }
        if (this.instance !== torProcess) {
            return false;
        }

        const cleanupTask = (async () => {
            torProcess.failed = true;
            this.stopListeningNetworkChanges();
            this.cancelTorConnectionCheck();
            clearInterval(this.timeoutIntervalId);
            this.timeoutIntervalId = null;
            this.instance = null;
            await this.deletePidFile();
            this.getTorRestarterReconnector()?.stopRestarterCounters?.({ stopChecker: true });

            if (isReplacementStart) {
                this.markRestartStartFailed();
            } else {
                this.setStatus('failed');
            }
            return true;
        })();
        torProcess.cleanupTask = cleanupTask;

        return cleanupTask;
    }

    markRestartStartFailed() {
        this.stopListeningNetworkChanges();
        clearInterval(this.timeoutIntervalId);
        this.timeoutIntervalId = null;
        this.timeoutCounter = null;
        this.setStatus('stopped');
    }

    launchTask(promise, name) {
        Promise.resolve(promise).catch((e) => {
            Logger.loge(`TorManager ${name}`, e);
        });
    }

    async deletePidFile() {
        return this.configuration.deleteTorPidFileAsync();
    }

    restartTor() {
        if (this.destroyRequested) {
            return Promise.resolve(false);
        }

        this.cancelTorConnectionCheck();
        this.restartRequested = true;
        if (!this.restartTask) {
            this.restartTask = this.processRestartRequests();
        }

        return this.restartTask;
    }

    async processRestartRequests() {
        let restarted = false;

        try {
            while (this.restartRequested && !this.destroyRequested) {
                this.restartRequested = false;
                restarted = await this.restartTorWhenIdle();
            }

            return restarted;
        } finally {
            this.restartTask = null;
        }
    }

    async restartTorWhenIdle() {
        await this.acquireLifecycleLock();
        if (this.destroyRequested || this.coreStatus.getTorState?.() !== CoreState.RUNNING) {
            this.unlockLifecycle();
            return false;
        }

        let lockReleasedForStart = false;

        try {
            this.coreStatus.setTorState?.(CoreState.RESTARTING);

            const stopped = await this.stopTorForRestart();
            if (!stopped) {
                const isRunning = this.coreStatus.getTorState?.() === CoreState.RUNNING;
                if (isRunning && !this.destroyRequested) {
                    this.checkInternetConnection();
                }
                return isRunning;
            }
            if (this.stopRequested) {
                return await this.stopRestartWhenRequested();
            }
            await this.delay(RESTART_TOR_DELAY_MS);

            if (this.stopRequested) {
                return await this.stopRestartWhenRequested();
            }
            if (this.coreStatus.getTorState?.() !== CoreState.RUNNING) {
                this.unlockLifecycle();
                lockReleasedForStart = true;
                await this.configuration.deleteBridgesFromStateFileAsync(this.configuration.getTorStateFilePath());
                if (
                    this.destroyRequested ||
                    this.coreStatus.getTorState?.() !== CoreState.RESTARTING
                ) {
                    return false;
                }
                const started = await this.startTorAfterRestart();
                if (started && !this.destroyRequested) {
                    this.checkInternetConnection();
                }
            }

            return true;
        } catch (e) {
            Logger.loge('TorManager restartTor', e);
            return false;
        } finally {
            if (!lockReleasedForStart) {
                this.unlockLifecycle();
            }
        }
    }

    async stopRestartWhenRequested() {
        const stopped = await this.stopCurrentProcess('stop');
        if (stopped) {
            this.stopRequested = false;
        }
        return stopped;
    }

    async restartTorFromFacade() {
        if (this.destroyRequested) {
            return false;
        }

        if (!this.tryAcquireLifecycleLock()) {
            return false;
        }

        try {
            return await this.restartTorFromFacadeLocked();
        } catch (e) {
            Logger.loge('TorManager restartTorFromFacade', e);
            return false;
        } finally {
            this.unlockLifecycle();
        }
    }

    async restartTorFromFacadeLocked() {
        if (this.settings.enabled3 === 'neveruse') {
            return this.stopCurrentProcess('stop');
        }

        const stopped = await this.stopCurrentProcess('restart');
        if (!stopped || this.destroyRequested) {
            return false;
        }

        return this.scheduleFacadeRestartAfterStopLocked();
    }

    async scheduleFacadeRestartAfterStopLocked() {
        await this.updateDefaultBridges();
        if (this.destroyRequested) {
            return false;
        }

        this.scheduleFacadeRestartStart();
        return true;
    }

    scheduleFacadeRestartStart() {
        this.clearRestartTimeout();
        this.restartTimeoutId = setTimeout(() => {
            this.restartTimeoutId = null;
            this.startTorAfterRestart().catch((e) => {
                Logger.loge('TorManager restartTorFromFacade startTorAfterRestart', e);
            });
        }, START_TOR_DELAY_MS);
    }

    clearRestartTimeout() {
        if (this.restartTimeoutId) {
            clearTimeout(this.restartTimeoutId);
            this.restartTimeoutId = null;
        }
    }

    delay(timeoutMs) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeoutMs);
        });
    }

    async reloadTorConfiguration() {
        if (
            this.destroyRequested ||
            !this.instance ||
            this.coreStatus.getTorState?.() !== CoreState.RUNNING
        ) {
            return false;
        }

        if (!this.tryAcquireLifecycleLock()) {
            return false;
        }

        let lockReleasedForRestart = false;

        try {
            const pid = await this.torControlClient.signal('RELOAD');
            if (pid !== this.parsePid(this.instance.pid)) {
                this.unlockLifecycle();
                lockReleasedForRestart = true;
                return await this.restartTor();
            }

            this.checkInternetConnection();
            return true;
        } catch (e) {
            Logger.loge('TorManager reloadTorConfiguration', e);
            this.unlockLifecycle();
            lockReleasedForRestart = true;
            return await this.restartTor();
        } finally {
            if (!lockReleasedForRestart) {
                this.unlockLifecycle();
            }
        }
    }

    tryAcquireLifecycleLock() {
        if (this.locked) {
            return false;
        }

        this.locked = true;
        return true;
    }

    async acquireLifecycleLock() {
        if (this.tryAcquireLifecycleLock()) {
            return;
        }

        await new Promise((resolve) => {
            this.lifecycleLockQueue.push(resolve);
        });
    }

    unlockLifecycle() {
        if (!this.locked) {
            return;
        }

        const nextLockOwner = this.lifecycleLockQueue.shift();
        if (nextLockOwner) {
            nextLockOwner();
            return;
        }

        this.locked = false;
    }

    getTorRestarterReconnector() {
        return typeof this.torRestarterReconnectorProvider === 'function'
            ? this.torRestarterReconnectorProvider()
            : null;
    }

    checkInternetConnection() {
        this.torConnectionCheckerInteractor?.checkInternetConnection?.();
    }

    startListeningNetworkChanges() {
        if (!this.networkRepository || this.unsubscribeNetworkChanges) {
            return;
        }

        this.unsubscribeNetworkChanges = this.networkRepository.networkChanges(() => {
            this.onNetworkChanged();
        });
        this.networkRepository.listenNetworkChanges();
    }

    stopListeningNetworkChanges() {
        if (!this.unsubscribeNetworkChanges) {
            return;
        }

        this.unsubscribeNetworkChanges();
        this.unsubscribeNetworkChanges = null;
        this.networkRepository.unlistenNetworkChanges();
    }

    onNetworkChanged() {
        if (this.coreStatus.getTorState?.() === CoreState.RUNNING) {
            this.checkInternetConnection();
        }
    }

    onConnectionChecked(available) {
        this.applyConnectionCheck(available);
    }

    applyConnectionCheck(available) {
        if (this.coreStatus.getTorState?.() === CoreState.RUNNING) {
            if (available) {
                this.getTorRestarterReconnector()?.stopRestarterCounters?.({ stopChecker: true });
                this.coreStatus.setTorConnectionAvailable?.(true);
                this.markTorStartedIfReady();
                if (this.shouldRequestBridges()) {
                    this.bridgesCustomRepository?.startRequestingBridgesFromTorProjectDb?.();
                }
            } else if (this.isNetworkAvailable()) {
                this.launchTask(
                    this.getTorRestarterReconnector()?.startRestarterCounter?.(),
                    'startRestarterCounter'
                );
                this.coreStatus.setTorConnectionAvailable?.(false);
                if (this.status === 'started' && this.coreStatus.isTorReady?.()) {
                    this.setStatus('running');
                }
                this.launchTask(
                    this.bridgesCustomRepository?.stopRequestingBridgesFromTorProjectDb?.(),
                    'stopRequestingBridgesAfterConnectionCheck'
                );
            }
        }
    }

    isNetworkAvailable() {
        return this.networkChecker.isNetworkAvailable(true);
    }

    info(compact) {
        const info = {
            enabled3: this.settings.enabled3,
            useSnowFlake2: this.settings.useSnowFlake2,
            customObfs4: this.settings.customObfs4,
            state: {
                status: this.status,
                info: this.statusInfo
            }
        };

        if (!compact) {
            info.instance = this.instance ? this.instance.pid : null;
            info.binPath = this.getpath();
            info.dataPath = this.getsettingspath();
        }

        return info;
    }

    async destroy() {
        this.destroyRequested = true;
        this.torConnectionCheckerInteractor?.removeListener?.(this);
        this.stopListeningNetworkChanges();
        this.clearRestartTimeout();
        await this.bridgesCustomRepository?.stopRequestingBridgesFromTorProjectDb?.();
        await this.getTorRestarterReconnector()?.stopAutomationAndChecker?.();

        const stopped = await this.stopTor();
        const preferencesFlushed = await this.preferences?.flush?.() !== false;
        if (!preferencesFlushed) {
            Logger.loge('TorManager destroy unable to flush preferences');
        }
        if (!stopped) {
            Logger.loge('TorManager destroy unable to stop Tor');
        }

        return this.application.destroy?.() || true;
    }
}

module.exports = TorManager;
