'use strict';

const path = require('path');

const f = require('../functions');

class TorControl {
    constructor(settings, proxy) {
        this._settings = { ...settings };
        this.proxy = proxy;
        this.torRunner = null;
        this.listeners = [];
        this.localState = {
            status: 'stopped',
            info: ''
        };
    }

    get settings() {
        return this.torRunner?.getSettings() || this._settings;
    }

    get state() {
        return this.torRunner?.getState() || this.localState;
    }

    get instance() {
        return this.torRunner?.getInstance() || null;
    }

    isStarted = () => this.torRunner?.isStarted() || false;
    isStopped = () => this.torRunner?.isStopped() ?? this.localState.status === 'stopped';
    isRunning = () => this.torRunner?.isRunning() || false;

    onStarted = (listener) => this.addListener('started', listener);
    onStopped = (listener) => this.addListener('stopped', listener);
    onRunning = (listener) => this.addListener('running', listener);
    onAny = (listener) => this.addListener('any', listener);

    init = async () => {
        if (this.isPureProxyMode()) {
            return true;
        }

        return this.provideTorRunner().init();
    };

    settingChanged = async (settings) => {
        const nextSettings = { ...settings };

        if (!this.torRunner && !this.isTorInAlwaysMode(nextSettings)) {
            this._settings = nextSettings;
            return true;
        }

        if (!this.torRunner) {
            this._settings = nextSettings;
            return this.provideTorRunner().init();
        }

        return this.torRunner.settingChanged(nextSettings);
    };

    autorun = () => {
        if (this.isPureProxyMode()) {
            return Promise.resolve(true);
        }

        return this.provideTorRunner().autorun();
    };

    start = () => this.provideTorRunner().startTor();

    stop = () => {
        if (!this.torRunner) {
            this.setLocalStatus('stopped');
            return Promise.resolve(true);
        }

        return this.torRunner.stopTor();
    };

    restart = () => this.provideTorRunner().restartTorFromFacade();

    getsettingspath = () => {
        if (this.torRunner) {
            return this.torRunner.getsettingspath();
        }

        const settingsPath = this.settings.path || 'tor';

        if (this.proxy?.userDataPath) {
            return path.join(this.proxy.userDataPath, settingsPath);
        }

        return f.path(settingsPath);
    };

    getpath = () => this.torRunner?.getpath() || null;
    gettordirpath = () => this.torRunner?.gettordirpath() || null;
    resetTimer = () => this.torRunner?.resetTimer?.();

    info = (compact) => {
        if (this.torRunner) {
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
        if (!this.torRunner) {
            this.setLocalStatus('stopped');
            return true;
        }

        return this.torRunner.destroy();
    };

    isPureProxyMode() {
        return !this.torRunner && !this.isTorInAlwaysMode(this.settings);
    }

    isTorInAlwaysMode(settings) {
        return settings.enabled3 === 'always';
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
