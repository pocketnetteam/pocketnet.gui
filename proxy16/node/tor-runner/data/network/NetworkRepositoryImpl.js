'use strict';

const EventEmitter = require('events');

const NetworkRepository = require('../../domain/network/NetworkRepository');
const NetworkObserver = require('../../framework/NetworkObserver');
const Logger = require('../../utils/logger/Logger');

const NETWORK_CHANGED = 'networkChanged';
const DEBOUNCE_INTERVAL_MS = 3000;

class NetworkRepositoryImpl extends NetworkRepository {
    networkChangesEmitter = new EventEmitter();
    unsubscribeObserver = null;
    debounceTimer = null;
    pendingSnapshot = null;

    constructor({
        networkObserver = new NetworkObserver(),
        debounceIntervalMs = DEBOUNCE_INTERVAL_MS,
        setTimeoutFn = setTimeout,
        clearTimeoutFn = clearTimeout
    } = {}) {
        super();
        this.networkObserver = networkObserver;
        this.debounceIntervalMs = debounceIntervalMs;
        this.setTimeoutFn = setTimeoutFn;
        this.clearTimeoutFn = clearTimeoutFn;
    }

    listenNetworkChanges() {
        if (this.unsubscribeObserver) {
            return;
        }

        this.unsubscribeObserver = this.networkObserver.onNetworkChanged((snapshot) => {
            this.emitNetworkChangeDebounced(snapshot);
        });
        this.networkObserver.listenNetworkChanges();
        Logger.logi('Listen network changes');
    }

    unlistenNetworkChanges() {
        if (!this.unsubscribeObserver && !this.debounceTimer) {
            return;
        }

        if (this.unsubscribeObserver) {
            this.unsubscribeObserver();
            this.unsubscribeObserver = null;
        }

        if (this.debounceTimer) {
            this.clearTimeoutFn(this.debounceTimer);
            this.debounceTimer = null;
        }

        this.pendingSnapshot = null;
        this.networkObserver.unlistenNetworkChanges();
        Logger.logi('Unlisten network changes');
    }

    networkChanges(listener) {
        this.networkChangesEmitter.on(NETWORK_CHANGED, listener);
        return () => this.networkChangesEmitter.off(NETWORK_CHANGED, listener);
    }

    emitNetworkChangeDebounced(snapshot) {
        this.pendingSnapshot = snapshot;

        if (this.debounceTimer) {
            return;
        }

        this.debounceTimer = this.setTimeoutFn(() => {
            this.debounceTimer = null;
            const snapshotToEmit = this.pendingSnapshot;
            this.pendingSnapshot = null;
            this.networkChangesEmitter.emit(NETWORK_CHANGED, snapshotToEmit);
        }, this.debounceIntervalMs);
        this.debounceTimer?.unref?.();
    }
}

NetworkRepositoryImpl.NETWORK_CHANGED = NETWORK_CHANGED;
NetworkRepositoryImpl.DEBOUNCE_INTERVAL_MS = DEBOUNCE_INTERVAL_MS;

module.exports = NetworkRepositoryImpl;
