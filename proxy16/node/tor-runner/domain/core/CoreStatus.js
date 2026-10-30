'use strict';

const CoreState = require('./CoreState');
const Logger = require('../../utils/logger/Logger');
class CoreStatus {
    _torState = CoreState.STOPPED;
    _torReady = false;
    _torConnectionAvailable = false;
    _torLoadingPercent = 0;
    _torCheckerLoadingPercent = 0;

    getTorState() {
        return this._torState;
    }

    setTorState(torState) {
        if (this._torState === torState) {
            return;
        }

        Logger.logi(`Tor State ${torState}`);
        this._torState = torState;

        if (torState !== CoreState.RUNNING) {
            this._torLoadingPercent = 0;
        }
    }

    isTorReady() {
        return this._torReady;
    }

    setTorReady(torReady) {
        this._torReady = torReady;

        if (!torReady) {
            this._torLoadingPercent = 0;
            this.setTorConnectionAvailable(false);
        }
    }

    isTorConnectionAvailable() {
        return this._torConnectionAvailable;
    }

    setTorConnectionAvailable(torConnectionAvailable) {
        this._torConnectionAvailable = torConnectionAvailable;
    }

    getTorLoadingPercent() {
        return this._torLoadingPercent;
    }

    setTorLoadingPercent(torLoadingPercent) {
        this._torLoadingPercent = torLoadingPercent;
    }

    getTorCheckerLoadingPercent() {
        return this._torCheckerLoadingPercent;
    }

    setTorCheckerLoadingPercent(torCheckerLoadingPercent) {
        this._torCheckerLoadingPercent = torCheckerLoadingPercent;
    }
}

module.exports = CoreStatus;
