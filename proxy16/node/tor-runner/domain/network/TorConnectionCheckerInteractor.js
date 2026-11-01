'use strict';

const CoreState = require('../core/CoreState');
const CoreStatus = require('../core/CoreStatus');
const NetworkChecker = require('../../utils/network/NetworkChecker');
const Logger = require('../../utils/logger/Logger');

const CHECK_INTERVAL_SEC = 10;
const ADDITIONAL_DELAY_SEC = 30;
const CHECKING_LOOP_TIMEOUT_MIN = 20;
const CHECKING_TIMEOUT_SEC = 120;

class TorConnectionCheckerInteractor {
    listenersMap = new Map();
    listenerIds = new WeakMap();
    nextListenerId = 0;
    checking = false;
    checkingTorConnection = false;
    torConnectionCheckId = 0;
    torConnectionAbortController = null;
    task = null;

    constructor({
        networkChecker = new NetworkChecker(),
        torConnectionChecker,
        coreStatus = new CoreStatus(),
        setTimeoutFn = setTimeout,
        clearTimeoutFn = clearTimeout,
        createAbortController = () => typeof AbortController === 'function' ? new AbortController() : null
    } = {}) {
        if (!torConnectionChecker?.isTorConnected) {
            throw new TypeError('TorConnectionCheckerInteractor requires torConnectionChecker');
        }

        this.networkChecker = networkChecker;
        this.torConnectionChecker = torConnectionChecker;
        this.coreStatus = coreStatus;
        this.setTimeoutFn = setTimeoutFn;
        this.clearTimeoutFn = clearTimeoutFn;
        this.createAbortController = createAbortController;
    }

    addListener(listener) {
        if (!listener?.onConnectionChecked) {
            return;
        }

        this.listenersMap.set(this.getListenerKey(listener), this.createListenerReference(listener));
    }

    removeListener(listener) {
        if (!listener) {
            return;
        }

        this.listenersMap.delete(this.getListenerKey(listener));
        if (this.listenersMap.size === 0) {
            this.cancelTask();
        }
    }

    checkInternetConnection() {
        if (!this.checking) {
            this.checkConnection();
        }
    }

    checkConnection() {
        this.cancelTask();
        this.checking = true;

        const token = { cancelled: false };
        const promise = this.tryCheckConnection(token);
        this.task = { token, promise };
        promise.finally(() => {
            if (this.task?.token === token) {
                this.task = null;
            }
        });
    }

    async tryCheckConnection(token) {
        try {
            await this.withTimeout(
                this.checkConnectionLoop(token),
                CHECKING_LOOP_TIMEOUT_MIN * 60 * 1000,
                token,
                () => {
                    this.cancelToken(token);
                    this.cancelCurrentTorConnectionCheck();
                    throw this.createCancellationError();
                }
            );
        } catch (e) {
            if (!this.isCancellationError(e)) {
                Logger.loge('TorConnectionCheckerInteractor tryCheckConnection', e);
            }
        } finally {
            if (this.task?.token === token) {
                this.checking = false;
            }
        }
    }

    async checkConnectionLoop(token) {
        let internetAvailable = false;
        while (!token.cancelled && !internetAvailable) {
            if (
                this.getTorState() !== CoreState.RUNNING ||
                !this.networkChecker.isNetworkAvailable(true)
            ) {
                await this.makeDelay(CHECK_INTERVAL_SEC, token);
                continue;
            }

            const available = await this.checkAvailability(token);
            this.ensureActive(token);

            Logger.logi(`Internet is ${available ? 'available' : 'not available'}`);

            internetAvailable = available;
            this.informListeners(available);

            if (!available) {
                await this.makeDelay(CHECK_INTERVAL_SEC, token);
            }
        }
    }

    async checkAvailability(token) {
        if (this.checkingTorConnection) {
            return false;
        }

        try {
            return await this.withTimeout(
                this.check(),
                CHECKING_TIMEOUT_SEC * 1000,
                token,
                () => this.cancelCurrentTorConnectionCheck()
            );
        } catch (e) {
            if (this.isCancellationError(e)) {
                throw e;
            }

            this.logException(e);
            if (this.isIoError(e)) {
                await this.makeDelay(ADDITIONAL_DELAY_SEC, token);
            }

            return false;
        }
    }

    informListeners(available) {
        for (const [key, reference] of this.listenersMap.entries()) {
            const listener = this.getListener(reference);
            if (!listener) {
                this.listenersMap.delete(key);
                continue;
            }

            if (typeof listener.onConnectionChecked === 'function') {
                listener.onConnectionChecked(available);
            }
        }
    }

    makeDelay(delaySec, token = { cancelled: false }) {
        return new Promise((resolve) => {
            if (token.cancelled) {
                resolve();
                return;
            }

            const timeout = this.setTimeoutFn(() => {
                token.delayTimeout = null;
                token.delayResolve = null;
                resolve();
            }, delaySec * 1000);
            token.delayTimeout = timeout;
            token.delayResolve = resolve;
            timeout?.unref?.();
        });
    }

    logException(e) {
        Logger.loge('TorCheckConnectionInteractor checkConnection', e);
    }

    async check() {
        const checkId = ++this.torConnectionCheckId;
        const abortController = this.createAbortController();

        try {
            this.checkingTorConnection = true;
            this.torConnectionAbortController = abortController;
            Logger.logi('Checking connection via Tor');
            return await this.torConnectionChecker.isTorConnected(abortController?.signal);
        } finally {
            if (this.torConnectionCheckId === checkId) {
                this.checkingTorConnection = false;
                this.torConnectionAbortController = null;
            }
        }
    }

    withTimeout(promise, timeoutMs, token, onTimeout = null) {
        return new Promise((resolve, reject) => {
            const timeout = this.setTimeoutFn(() => {
                try {
                    onTimeout?.();
                    reject(this.createTimeoutError());
                } catch (e) {
                    reject(e);
                }
            }, timeoutMs);
            timeout?.unref?.();

            Promise.resolve(promise)
                .then(resolve, reject)
                .finally(() => this.clearTimeoutFn(timeout));
        }).then((result) => {
            this.ensureActive(token);
            return result;
        });
    }

    ensureActive(token) {
        if (token?.cancelled) {
            throw new Error('TorConnectionCheckerInteractor cancelled');
        }
    }

    cancelTask() {
        if (this.task) {
            this.cancelToken(this.task.token);
            this.cancelCurrentTorConnectionCheck();
            this.task = null;
        }

        this.checking = false;
    }

    cancelToken(token) {
        token.cancelled = true;
        if (token.delayTimeout) {
            this.clearTimeoutFn(token.delayTimeout);
            token.delayTimeout = null;
            token.delayResolve?.();
            token.delayResolve = null;
        }
    }

    cancelCurrentTorConnectionCheck() {
        this.torConnectionCheckId += 1;
        this.checkingTorConnection = false;
        this.torConnectionAbortController?.abort?.();
        this.torConnectionAbortController = null;
    }

    getTorState() {
        return this.coreStatus.getTorState?.();
    }

    getListenerKey(listener) {
        const listenerClassName = listener?.constructor?.name;
        if (listenerClassName && listenerClassName !== 'Object') {
            return listenerClassName;
        }

        if (!this.listenerIds.has(listener)) {
            this.nextListenerId += 1;
            this.listenerIds.set(listener, `listener-${this.nextListenerId}`);
        }

        return this.listenerIds.get(listener);
    }

    createListenerReference(listener) {
        return typeof WeakRef === 'function' && typeof listener === 'object'
            ? new WeakRef(listener)
            : listener;
    }

    getListener(reference) {
        return typeof reference?.deref === 'function' ? reference.deref() : reference;
    }

    isCancellationError(e) {
        return e?.message === 'TorConnectionCheckerInteractor cancelled' || e?.code === 'ECANCELLED';
    }

    isIoError(e) {
        return ['EADDRNOTAVAIL', 'ECONNREFUSED', 'ECONNRESET', 'EHOSTUNREACH', 'ENETUNREACH', 'EPIPE'].includes(e?.code);
    }

    createTimeoutError() {
        const error = new Error('TorConnectionCheckerInteractor timeout');
        error.code = 'ETIMEDOUT';
        return error;
    }

    createCancellationError() {
        const error = new Error('TorConnectionCheckerInteractor cancelled');
        error.code = 'ECANCELLED';
        return error;
    }
}

module.exports = TorConnectionCheckerInteractor;
