'use strict';

const AddressCheckerRepository = require('../../domain/addresschecker/AddressCheckerRepository');
const TimeToReachable = require('../../domain/addresschecker/TimeToReachable');
const CoreState = require('../../domain/core/CoreState');
const CoreStatus = require('../../domain/core/CoreStatus');
const TorMode = require('../../domain/core/TorMode');
const PreferenceRepositoryImpl = require('../preferences/PreferenceRepositoryImpl');
const { LOOPBACK_ADDRESS } = require('../../utils/Constants');
const HttpAddressChecker = require('../../utils/addresschecker/HttpAddressChecker');
const IpAddressChecker = require('../../utils/addresschecker/IpAddressChecker');
const Logger = require('../../utils/logger/Logger');
const NetworkChecker = require('../../utils/network/NetworkChecker');

const CHECK_ADDRESS_TIMEOUT_SEC = 1;
const REACHABLE_ADDRESS_CHECK_INTERVAL_MS = 3 * 60 * 1000;
const UNREACHABLE_ADDRESS_CHECK_INTERVAL_MS = 2 * 60 * 1000;
const TIME_TO_STOP_TOR_MS = 5 * 60 * 1000;
const MAX_SIMULTANEOUS_REACHABILITY_TESTS = 10;

class AddressCheckerRepositoryImpl extends AddressCheckerRepository {
    constructor({
        httpAddressChecker = new HttpAddressChecker(),
        ipAddressChecker = new IpAddressChecker(),
        preferences = new PreferenceRepositoryImpl(),
        networkChecker = new NetworkChecker(),
        coreStatus = new CoreStatus(),
        stopTor = null,
        now = () => Date.now(),
        delay = (timeoutMs) => new Promise((resolve) => setTimeout(resolve, timeoutMs))
    } = {}) {
        super();
        this.httpAddressChecker = httpAddressChecker;
        this.ipAddressChecker = ipAddressChecker;
        this.preferences = preferences;
        this.networkChecker = networkChecker;
        this.coreStatus = coreStatus;
        this.stopTor = stopTor;
        this.now = now;
        this.delay = delay;
        this.checkResults = new Map();
        this.timeLastUnreachableAddress = 0;
    }

    async isAddressReachable(address, timeoutSec = CHECK_ADDRESS_TIMEOUT_SEC) {
        if (address?.domain) {
            return this.isDomainReachable(address);
        }

        if (address?.ip) {
            return this.isIpReachable(address, timeoutSec);
        }

        return false;
    }

    async isDomainReachable(address) {
        if (address.domain === 'localhost' || address.domain === LOOPBACK_ADDRESS) {
            return true;
        }

        const cacheKey = this.getDomainCacheKey(address);
        const previousResult = this.checkResults.get(cacheKey);
        const currentTime = this.now();
        let reachable;

        if (this.shouldCheckAddress(previousResult, currentTime)) {
            reachable = await this.checkHttpsAddress(address);
            this.checkResults.set(cacheKey, new TimeToReachable({
                time: currentTime,
                reachable
            }));
        } else {
            reachable = previousResult.reachable;
        }

        this.handleAutoModeTorStop(reachable, currentTime);

        return reachable;
    }

    async checkHttpsAddress(address) {
        const timeoutMs = this.networkChecker.isVpnActive() ? 8000 : 3000;

        return this.httpAddressChecker.isHttpsAddressReachable({
            domain: address.domain,
            port: address.port,
            timeoutMs
        });
    }

    shouldCheckAddress(previousResult, currentTime) {
        return !previousResult ||
            previousResult.reachable && currentTime - previousResult.time > REACHABLE_ADDRESS_CHECK_INTERVAL_MS ||
            !previousResult.reachable && currentTime - previousResult.time > UNREACHABLE_ADDRESS_CHECK_INTERVAL_MS;
    }

    handleAutoModeTorStop(reachable, currentTime) {
        if (
            reachable &&
            this.preferences.getTorMode() === TorMode.AUTO &&
            this.timeLastUnreachableAddress !== 0 &&
            currentTime - this.timeLastUnreachableAddress > TIME_TO_STOP_TOR_MS
        ) {
            const containsFreshUnreachableAddress = [...this.checkResults.values()].some((result) => {
                return !result.reachable && currentTime - result.time < TIME_TO_STOP_TOR_MS;
            });

            if (
                this.checkResults.size > 0 &&
                !containsFreshUnreachableAddress &&
                this.coreStatus.getTorState() === CoreState.RUNNING
            ) {
                Logger.logi('Stop Tor because of long inactivity');
                this.stopTor?.();
            }
        } else if (!reachable && this.preferences.getTorMode() === TorMode.AUTO) {
            this.timeLastUnreachableAddress = this.now();
        }
    }

    async getReachableDomains(domains, timeoutSec = CHECK_ADDRESS_TIMEOUT_SEC) {
        try {
            return await this.getReachableItems({
                items: domains,
                timeoutSec,
                checkItem: async (domain) => {
                    const reachable = await this.httpAddressChecker.isHttpsAddressReachable({
                        domain,
                        port: 443,
                        timeoutMs: timeoutSec * 1000
                    });

                    return reachable ? domain : null;
                }
            });
        } catch (e) {
            return [];
        }
    }

    async isIpReachable(address, timeoutSec) {
        return this.ipAddressChecker.isIpAddressReachable({
            ip: address.ip,
            port: address.port,
            connectTimeoutSec: timeoutSec,
            readTimeoutSec: timeoutSec
        });
    }

    async getReachableIps(ips, timeoutSec = CHECK_ADDRESS_TIMEOUT_SEC) {
        try {
            return await this.getReachableItems({
                items: ips,
                timeoutSec,
                checkItem: async (ip) => {
                    const reachable = await this.ipAddressChecker.isIpAddressReachable({
                        ip: ip.ip,
                        port: ip.port
                    });

                    return reachable ? ip : null;
                }
            });
        } catch (e) {
            return [];
        }
    }

    async getReachableItems({ items, timeoutSec, checkItem }) {
        const result = [];
        const runningChecks = new Set();
        let failure = null;

        for (const item of items) {
            if (failure) {
                break;
            }

            while (runningChecks.size >= MAX_SIMULTANEOUS_REACHABILITY_TESTS) {
                await Promise.race(runningChecks);
                if (failure) {
                    break;
                }
            }

            if (failure) {
                break;
            }

            const check = Promise.resolve()
                .then(() => checkItem(item))
                .then((reachableItem) => {
                    if (reachableItem) {
                        result.push(reachableItem);
                    }
                })
                .catch((e) => {
                    failure = e;
                })
                .finally(() => {
                    runningChecks.delete(check);
                });

            runningChecks.add(check);
            await this.delay(timeoutSec * 1000);
        }

        await Promise.all(runningChecks);
        if (failure) {
            throw failure;
        }

        return result;
    }

    getDomainCacheKey(address) {
        return `${address.domain}:${address.port}`;
    }
}

module.exports = AddressCheckerRepositoryImpl;
