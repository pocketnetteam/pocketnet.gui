'use strict';

const createTorRunner = require('./tor-runner');

class TorControl {
    constructor(settings, proxy) {
        this.torRunner = createTorRunner({ settings, proxy });
    }

    get settings() {
        return this.torRunner.getSettings();
    }

    get state() {
        return this.torRunner.getState();
    }

    get instance() {
        return this.torRunner.getInstance();
    }

    isStarted = () => this.torRunner.isStarted();
    isStopped = () => this.torRunner.isStopped();
    isRunning = () => this.torRunner.isRunning();

    onStarted = (listener) => this.torRunner.onStarted(listener);
    onStopped = (listener) => this.torRunner.onStopped(listener);
    onRunning = (listener) => this.torRunner.onRunning(listener);
    onAny = (listener) => this.torRunner.onAny(listener);

    init = () => this.torRunner.init();
    settingChanged = (settings) => this.torRunner.settingChanged(settings);
    autorun = () => this.torRunner.autorun();
    start = () => this.torRunner.startTor();
    stop = () => this.torRunner.stopTor();
    restart = () => this.torRunner.restartTorFromFacade();
    getsettingspath = () => this.torRunner.getsettingspath();
    getpath = () => this.torRunner.getpath();
    gettordirpath = () => this.torRunner.gettordirpath();
    resetTimer = () => this.torRunner.resetTimer();
    info = (compact) => this.torRunner.info(compact);
    destroy = () => this.torRunner.destroy();
}

module.exports = TorControl;
