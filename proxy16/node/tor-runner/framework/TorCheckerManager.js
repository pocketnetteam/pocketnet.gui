'use strict';

const childProcess = require('child_process');
const kill = require('tree-kill');

const ConfigurationRepositoryImpl = require('../data/configuration/ConfigurationRepositoryImpl');
const BridgesDefaultRepositoryImpl = require('../data/configuration/BridgesDefaultRepositoryImpl');
const BridgesCustomRepositoryImpl = require('../data/configuration/BridgesCustomRepositoryImpl');
const PreferenceRepositoryImpl = require('../data/preferences/PreferenceRepositoryImpl');
const CoreStatus = require('../domain/core/CoreStatus');
const Logger = require('../utils/logger/Logger');

const CHECKER_KILL_DELAY_MS = 5000;
const BOOTSTRAPPED_PATTERN = /Bootstrapped (\d+)%/;
const BRIDGE_FAILED_PATTERN = /Proxy Client: unable to connect OR connection \(handshaking \(proxy\)\) with (.+:\d+) .+ \("general SOCKS server failure"\)/;

class TorCheckerManager {
    configuration = null;
    coreStatus = null;
    bridgesDefaultRepository = null;
    bridgesCustomRepository = null;
    preferences = null;
    instance = null;
    locked = false;
    operationGeneration = 0;
    pendingReportTasks = new Set();
    killProcess = kill;
    spawn = childProcess.spawn;
    killDelayMs = CHECKER_KILL_DELAY_MS;
    delay = (timeoutMs) => new Promise((resolve) => setTimeout(resolve, timeoutMs));

    constructor({
        configuration = new ConfigurationRepositoryImpl(),
        coreStatus = new CoreStatus(),
        bridgesDefaultRepository = new BridgesDefaultRepositoryImpl({ configuration }),
        bridgesCustomRepository = new BridgesCustomRepositoryImpl({ configuration }),
        preferences = new PreferenceRepositoryImpl({ configuration: configuration.configurationManager }),
        killProcess = kill,
        spawn = childProcess.spawn,
        killDelayMs = CHECKER_KILL_DELAY_MS,
        delay = null
    } = {}) {
        this.configuration = configuration;
        this.coreStatus = coreStatus;
        this.bridgesDefaultRepository = bridgesDefaultRepository;
        this.bridgesCustomRepository = bridgesCustomRepository;
        this.preferences = preferences;
        this.killProcess = killProcess;
        this.spawn = spawn;
        this.killDelayMs = killDelayMs;
        if (delay) {
            this.delay = delay;
        }
    }

    async runTorChecker(bridges = []) {
        if (this.locked) {
            return false;
        }

        this.locked = true;
        const operationGeneration = this.operationGeneration;
        try {
            await this.stopPreviouslyRunningTorChecker();
            if (!this.isOperationActive(operationGeneration)) {
                return false;
            }
            const checkedBridges = Array.isArray(bridges) ? [...bridges] : [];
            await this.configuration.deleteBridgesFromStateFileAsync(this.configuration.getTorCheckerStateFilePath());
            if (!this.isOperationActive(operationGeneration)) {
                return false;
            }
            const torConf = await this.configuration.createAndSaveTorCheckerConfigurationAsync(
                checkedBridges
            );
            if (!this.isOperationActive(operationGeneration)) {
                return false;
            }
            if (!torConf) {
                Logger.loge('Tor checker configuration was unable to be saved');
                this.coreStatus.setTorCheckerLoadingPercent(0);
                return false;
            }

            this.coreStatus.setTorCheckerLoadingPercent(0);
            this.startTorCheckerProcess(torConf, checkedBridges);
            return true;
        } catch (e) {
            Logger.loge('Tor checker was unable to start', e);
            this.coreStatus.setTorCheckerLoadingPercent(0);
            return false;
        } finally {
            this.locked = false;
        }
    }

    async stopTorChecker() {
        this.operationGeneration += 1;
        const stopped = await this.killTorCheckerProcess();
        await this.waitForPendingReportTasks();
        this.coreStatus.setTorCheckerLoadingPercent(0);
        return stopped;
    }

    async stopPreviouslyRunningTorChecker() {
        const stopped = await this.killTorCheckerProcess();
        if (stopped) {
            await this.delay(this.killDelayMs);
        }
    }

    startTorCheckerProcess(torConf = [], checkedBridges = []) {
        const args = [
            '-f', this.configuration.getTorCheckerConfPath(),
            '-pidfile', this.configuration.getTorCheckerPidPath()
        ];
        const fakeHosts = this.getFakeHosts(torConf);

        if (fakeHosts.length > 0) {
            args.push('--fake-hosts', fakeHosts.join(','));
        }

        const torCheckerProcess = this.spawn(this.configuration.getTorPath(), args, {
            stdio: ['ignore', 'pipe', 'pipe'],
            detached: false,
            shell: false,
            cwd: this.configuration.getTorResourcesDir(),
            env: {
                ...process.env,
                LD_LIBRARY_PATH: this.configuration.getTorConfigurationDir()
            }
        });

        torCheckerProcess.stdoutBuffer = '';
        torCheckerProcess.stderrBuffer = '';
        torCheckerProcess.processClosed = false;
        torCheckerProcess.processFailed = false;
        torCheckerProcess.stopRequested = false;
        torCheckerProcess.bootstrapPercent = 0;
        torCheckerProcess.checkedBridges = [...checkedBridges];
        this.instance = torCheckerProcess;

        torCheckerProcess.stdout?.on('data', (chunk) => this.onCheckerStdOutput(torCheckerProcess, String(chunk)));
        torCheckerProcess.stderr?.on('data', (chunk) => this.onCheckerStdError(torCheckerProcess, String(chunk)));
        torCheckerProcess.on('error', (error) => this.onCheckerError(torCheckerProcess, error));
        torCheckerProcess.on('close', (code) => this.onCheckerClose(torCheckerProcess, code));
    }

    async killTorCheckerProcess() {
        const torCheckerProcess = this.instance;
        const pid = torCheckerProcess?.pid ? Number(torCheckerProcess.pid) : null;
        if (!pid) {
            return false;
        }

        torCheckerProcess.stopRequested = true;
        return new Promise((resolve) => {
            this.killProcess(pid, (err) => {
                if (err) {
                    Logger.loge('Unable to kill Tor checker instance', err);
                    resolve(false);
                    return;
                }

                if (this.instance === torCheckerProcess) {
                    this.instance = null;
                }
                resolve(true);
            });
        });
    }

    getTorCheckerPid() {
        if (this.instance?.pid) {
            return Number(this.instance.pid);
        }

        return null;
    }

    isOperationActive(operationGeneration) {
        return operationGeneration === this.operationGeneration;
    }

    getFakeHosts(torConf = []) {
        if (!this.isVanillaBridgesUsed(torConf)) {
            return [];
        }

        const fakeHosts = this.preferences?.getLastSni?.();
        return Array.isArray(fakeHosts)
            ? fakeHosts.map((host) => typeof host === 'string' ? host.trim() : '').filter(Boolean)
            : [];
    }

    isVanillaBridgesUsed(torConf = []) {
        let bridgesUsed = false;

        for (const line of torConf) {
            if (line.includes('UseBridges 1')) {
                bridgesUsed = true;
            } else if (bridgesUsed && line.startsWith('Bridge')) {
                return /^Bridge ([\d\[])/.test(line);
            }
        }

        return false;
    }

    onCheckerStdOutput(torCheckerProcess, output) {
        torCheckerProcess.stdoutBuffer = this.processBufferedLines(
            torCheckerProcess.stdoutBuffer,
            output,
            (line) => this.handleCheckerStdoutLine(torCheckerProcess, line)
        );
    }

    onCheckerStdError(torCheckerProcess, output) {
        torCheckerProcess.stderrBuffer = this.processBufferedLines(
            torCheckerProcess.stderrBuffer,
            output,
            (line) => this.handleCheckerStderrLine(line)
        );
    }

    onCheckerError(torCheckerProcess, error) {
        Logger.loge('Tor checker fault', error);
        torCheckerProcess.processFailed = true;
        if (this.instance === torCheckerProcess) {
            this.coreStatus.setTorCheckerLoadingPercent(0);
            this.instance = null;
        }
    }

    onCheckerClose(torCheckerProcess, code) {
        if (torCheckerProcess.processClosed) {
            return;
        }
        torCheckerProcess.processClosed = true;
        this.flushBufferedLines(torCheckerProcess);

        if (!torCheckerProcess.processFailed && code === 0) {
            Logger.logi('Tor checker is stopped successfully');
        } else if (!torCheckerProcess.processFailed && code !== null) {
            Logger.loge(`Tor checker fault: ${code}`);
        }

        if (
            !torCheckerProcess.processFailed &&
            !torCheckerProcess.stopRequested &&
            torCheckerProcess.bootstrapPercent === 0 &&
            Number.isInteger(code) &&
            code !== 0
        ) {
            this.launchReportTask(
                this.reportCheckedBridgesUnreachable(torCheckerProcess.checkedBridges),
                'reportCheckedBridgesUnreachable'
            );
        }

        if (this.instance === torCheckerProcess) {
            this.coreStatus.setTorCheckerLoadingPercent(0);
            this.instance = null;
        }
    }

    flushBufferedLines(torCheckerProcess) {
        const stdoutLine = torCheckerProcess.stdoutBuffer.trim();
        if (stdoutLine) {
            torCheckerProcess.stdoutBuffer = '';
            this.handleCheckerStdoutLine(torCheckerProcess, stdoutLine);
        } else {
            torCheckerProcess.stdoutBuffer = '';
        }

        const stderrLine = torCheckerProcess.stderrBuffer.trim();
        if (stderrLine) {
            torCheckerProcess.stderrBuffer = '';
            this.handleCheckerStderrLine(stderrLine);
        } else {
            torCheckerProcess.stderrBuffer = '';
        }
    }

    processBufferedLines(buffer, output, lineHandler) {
        const content = `${buffer}${output}`;
        const lines = content.split(/\r?\n/);
        const remainder = lines.pop() || '';

        lines.map((line) => line.trim()).filter(Boolean).forEach(lineHandler);

        return remainder;
    }

    handleCheckerStdoutLine(torCheckerProcess, line) {
        this.updateCheckerLoadingPercent(torCheckerProcess, line);
        if (this.instance === torCheckerProcess) {
            this.reportFailedBridge(line);
        }
        Logger.logi(`[TOR:CHECKER] ${line}`);
    }

    handleCheckerStderrLine(line) {
        Logger.logw(`[TOR:CHECKER] ${line}`);
    }

    updateCheckerLoadingPercent(torCheckerProcess, line) {
        const match = line.match(BOOTSTRAPPED_PATTERN);
        if (!match) {
            return;
        }

        const percent = Number(match[1]);
        torCheckerProcess.bootstrapPercent = percent;
        if (this.instance === torCheckerProcess) {
            this.coreStatus.setTorCheckerLoadingPercent(percent);
        }
    }

    reportFailedBridge(line) {
        const match = line.match(BRIDGE_FAILED_PATTERN);
        const bridgeAddress = match?.[1];
        if (!bridgeAddress) {
            return;
        }

        this.bridgesDefaultRepository.addCheckFailedBridge(bridgeAddress);
        this.launchReportTask(
            this.bridgesCustomRepository.reportBridgeAddressUnreachableAsync(bridgeAddress),
            'reportBridgeAddressUnreachable'
        );
    }

    async reportCheckedBridgesUnreachable(checkedBridges = []) {
        for (const bridge of checkedBridges) {
            const bridgeAddress = this.getBridgeAddress(bridge);
            if (bridgeAddress) {
                await this.bridgesCustomRepository.reportBridgeAddressUnreachableAsync(bridgeAddress);
            }
        }
    }

    launchReportTask(promise, name) {
        const task = Promise.resolve(promise)
            .catch((e) => {
                Logger.loge(`TorCheckerManager ${name}`, e);
            })
            .finally(() => {
                this.pendingReportTasks.delete(task);
            });
        this.pendingReportTasks.add(task);
    }

    async waitForPendingReportTasks() {
        while (this.pendingReportTasks.size > 0) {
            await Promise.all([...this.pendingReportTasks]);
        }
    }

    getBridgeAddress(bridge) {
        const parts = String(bridge).trim().split(/\s+/);
        return parts.find((part) => part.includes(':')) || '';
    }
}

module.exports = TorCheckerManager;
