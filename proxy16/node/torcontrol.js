'use strict';

const path = require('path');

const f = require('../functions');

class TorControl {
    constructor(settings, proxy) {
        this._settings = { ...settings };
        this.proxy = proxy;
        this.torRunner = null;
        this.torRunnerInitTask = null;
        this.torRunnerInitialized = false;
        this.destroyRequested = false;
        this.listeners = [];
        this.localState = {
            status: 'stopped',
            info: ''
        };
    }

    get settings() {
        return this.torRunnerInitialized ? this.torRunner.getSettings() : this._settings;
    }

    get state() {
        return this.torRunnerInitialized ? this.torRunner.getState() : this.localState;
    }

    get instance() {
        return this.torRunnerInitialized ? this.torRunner.getInstance() : null;
    }

    isStarted = () => this.torRunnerInitialized ? this.torRunner.isStarted() : false;
    isStopped = () => this.torRunnerInitialized ? this.torRunner.isStopped() : this.localState.status === 'stopped';
    isRunning = () => this.torRunnerInitialized ? this.torRunner.isRunning() : false;

    onStarted = (listener) => this.addListener('started', listener);
    onStopped = (listener) => this.addListener('stopped', listener);
    onRunning = (listener) => this.addListener('running', listener);
    onAny = (listener) => this.addListener('any', listener);

    init = async () => {
        if (this.destroyRequested) {
            return false;
        }

        if (this.isPureProxyMode()) {
            return true;
        }

        return this.initializeTorRunner()
            .catch((e) => this.handleTorRunnerError('init', e));
    };

    settingChanged = async (settings) => {
        const nextSettings = { ...settings };

        if (this.destroyRequested) {
            this._settings = nextSettings;
            return false;
        }

        if (!this.torRunner && !this.isTorInAlwaysMode(nextSettings)) {
            this._settings = nextSettings;
            return true;
        }

        if (!this.torRunner) {
            this._settings = nextSettings;
            return this.initializeTorRunner()
                .catch((e) => this.handleTorRunnerError('settingChanged', e));
        }

        if (!this.torRunnerInitialized) {
            if (!this.isTorEnabled(nextSettings)) {
                this._settings = nextSettings;
                if (!this.torRunnerInitTask) {
                    return true;
                }

                return this.torRunnerInitTask
                    .then(() => this.destroyRequested ? false : this.torRunner.settingChanged(nextSettings))
                    .catch(() => true);
            }

            return this.initializeTorRunner()
                .then(() => this.destroyRequested ? false : this.torRunner.settingChanged(nextSettings))
                .catch((e) => this.handleTorRunnerError('settingChanged', e));
        }

        return this.torRunner.settingChanged(nextSettings)
            .catch((e) => this.handleTorRunnerError('settingChanged', e));
    };

    autorun = () => {
        if (this.destroyRequested) {
            return Promise.resolve(false);
        }

        if (this.isPureProxyMode()) {
            return Promise.resolve(true);
        }

        return this.initializeTorRunner()
            .then(() => this.destroyRequested ? false : this.torRunner.autorun())
            .catch((e) => this.handleTorRunnerError('autorun', e));
    };

    start = () => {
        if (this.destroyRequested) {
            return Promise.resolve(false);
        }

        return this.initializeTorRunner()
            .then(() => this.destroyRequested ? false : this.torRunner.startTor())
            .catch((e) => this.handleTorRunnerError('start', e));
    };

    stop = () => {
        if (!this.torRunner) {
            this.setLocalStatus('stopped');
            return Promise.resolve(true);
        }

        if (!this.torRunnerInitialized) {
            this.setLocalStatus('stopped');
            if (!this.torRunnerInitTask) {
                return Promise.resolve(true);
            }

            return this.torRunnerInitTask
                .then(() => this.torRunner.stopTor())
                .catch((e) => this.handleTorRunnerError('stop', e));
        }

        return this.torRunner.stopTor()
            .catch((e) => this.handleTorRunnerError('stop', e));
    };

    restart = () => {
        if (this.destroyRequested) {
            return Promise.resolve(false);
        }

        return this.initializeTorRunner()
            .then(() => this.destroyRequested ? false : this.torRunner.restartTorFromFacade())
            .catch((e) => this.handleTorRunnerError('restart', e));
    };

    getsettingspath = () => {
        if (this.torRunnerInitialized) {
            return this.torRunner.getsettingspath();
        }

        const settingsPath = this.settings.path || 'tor';

        if (this.proxy?.userDataPath) {
            return path.join(this.proxy.userDataPath, settingsPath);
        }

        return f.path(settingsPath);
    };

    getpath = () => this.torRunnerInitialized ? this.torRunner.getpath() : null;
    gettordirpath = () => this.torRunnerInitialized ? this.torRunner.gettordirpath() : null;
    resetTimer = () => this.torRunner?.resetTimer?.();

    info = (compact) => {
        if (this.torRunnerInitialized) {
            return this.torRunner.info(compact);
        }

        const info = {
            enabled3: this.settings.enabled3,
            useSnowFlake2: this.settings.useSnowFlake2,
            customObfs4: this.settings.customObfs4,
            state: {
                status: this.localState.status,
                info: this.localState.info
            }
        };

        if (!compact) {
            info.instance = null;
            info.binPath = null;
            info.dataPath = this.getsettingspath();
        }

        return info;
    };

    destroy = async () => {
        this.destroyRequested = true;

        if (!this.torRunner) {
            this.setLocalStatus('stopped');
            return true;
        }

        if (!this.torRunnerInitialized && this.torRunnerInitTask) {
            await this.torRunnerInitTask.catch(() => {});
        }

        return this.torRunner.destroy()
            .catch((e) => this.handleTorRunnerError('destroy', e));
    };

    isPureProxyMode() {
        return !this.torRunner && !this.isTorInAlwaysMode(this.settings);
    }

    isTorInAlwaysMode(settings) {
        return settings.enabled3 === 'always';
    }

    isTorEnabled(settings) {
        return settings.enabled3 === 'auto' || settings.enabled3 === 'always';
    }

    provideTorRunner() {
        if (this.torRunner) {
            return this.torRunner;
        }

        const createTorRunner = require('./tor-runner');

        this.torRunner = createTorRunner({
            settings: this._settings,
            proxy: this.proxy
        });

        this.listeners.forEach(({ type, listener }) => {
            this.attachListenerToRunner(type, listener);
        });

        return this.torRunner;
    }

    initializeTorRunner() {
        this.provideTorRunner();

        if (!this.torRunnerInitTask) {
            this.torRunnerInitTask = this.torRunner.init()
                .then((result) => {
                    this.torRunnerInitialized = true;
                    return result;
                })
                .catch((e) => {
                    this.torRunnerInitTask = null;
                    this.torRunnerInitialized = false;
                    throw e;
                });
        }

        return this.torRunnerInitTask;
    }

    handleTorRunnerError(action, error) {
        console.error(`Tor control ${action} failed:`, error);
        return false;
    }

    addListener(type, listener) {
        this.listeners.push({ type, listener });

        if (this.torRunner) {
            this.attachListenerToRunner(type, listener);
        }
    }

    attachListenerToRunner(type, listener) {
        if (type === 'started') {
            this.torRunner.onStarted(listener);
        } else if (type === 'stopped') {
            this.torRunner.onStopped(listener);
        } else if (type === 'running') {
            this.torRunner.onRunning(listener);
        } else if (type === 'any') {
            this.torRunner.onAny(listener);
        }
    }

    setLocalStatus(status) {
        if (this.localState.status === status) {
            return;
        }

        this.localState.status = status;

        this.listeners.forEach((listener) => {
            const isAnyListener = listener.type === 'any';
            const isTargetListenerType = listener.type === status;

            if (isAnyListener || isTargetListenerType) {
                listener.listener(status);
            }
        });

        if (status !== 'running' && status !== 'started') {
            this.localState.info = '';
        }
    }
}

module.exports = TorControl;
