'use strict';

const os = require('os');

const Logger = require('../logger/Logger');

const CHECK_AVAILABLE_NETWORK_INTERVAL_SEC = 10;
const CHECK_AVAILABLE_NETWORK_MIN_INTERVAL_SEC = 1;
const CHECK_VPN_NETWORK_INTERVAL_SEC = 20;

class NetworkChecker {
    checkingNetworkAvailable = false;
    networkAvailable = false;
    lastNetworkAvailableCheck = 0;
    checkingVpnNetwork = false;
    vpnNetwork = true;
    lastVpnNetworkCheck = 0;

    constructor({ networkInterfaces = () => os.networkInterfaces() } = {}) {
        this.networkInterfaces = networkInterfaces;
    }

    isNetworkAvailable(forceCheck = false) {
        try {
            const now = Date.now();
            const timeSinceLastCheck = now - this.lastNetworkAvailableCheck;
            const isForcedCheckAllowed = forceCheck &&
                timeSinceLastCheck > CHECK_AVAILABLE_NETWORK_MIN_INTERVAL_SEC * 1000;
            const isRegularCheckAllowed =
                timeSinceLastCheck > CHECK_AVAILABLE_NETWORK_INTERVAL_SEC * 1000;
            const shouldCheck = !this.checkingNetworkAvailable &&
                (isForcedCheckAllowed || isRegularCheckAllowed);

            if (shouldCheck) {
                this.checkingNetworkAvailable = true;
                this.lastNetworkAvailableCheck = now;
                this.networkAvailable = this.hasActiveNetworkInterface();
            }

            return this.networkAvailable;
        } catch (e) {
            Logger.loge('NetworkChecker isNetworkAvailable', e);
            this.networkAvailable = false;
            return false;
        } finally {
            this.checkingNetworkAvailable = false;
        }
    }

    isVpnActive() {
        try {
            const now = Date.now();
            const shouldCheck = !this.checkingVpnNetwork &&
                now - this.lastVpnNetworkCheck > CHECK_VPN_NETWORK_INTERVAL_SEC * 1000;

            if (shouldCheck) {
                this.checkingVpnNetwork = true;
                this.lastVpnNetworkCheck = now;
                this.vpnNetwork = this.hasVpnNetworkInterface();
            }

            return this.vpnNetwork;
        } catch (e) {
            Logger.loge('NetworkChecker isVpnActive', e);
            this.vpnNetwork = false;
            return false;
        } finally {
            this.checkingVpnNetwork = false;
        }
    }

    hasActiveNetworkInterface() {
        return this.getNetworkEntries().some(({ address }) => {
            return !address.internal && (address.family === 'IPv4' || address.family === 'IPv6');
        });
    }

    hasVpnNetworkInterface() {
        return this.getNetworkEntries().some(({ name, address }) => {
            return !address.internal &&
                (address.family === 'IPv4' || address.family === 'IPv6') &&
                this.isVpnInterfaceName(name);
        });
    }

    getNetworkEntries() {
        return Object.entries(this.networkInterfaces() || {}).flatMap(([name, addresses]) => {
            return (addresses || []).map((address) => ({ name, address }));
        });
    }

    isVpnInterfaceName(name = '') {
        return /^(tun|tap|utun|ppp|wg|tailscale|zt|zerotier|ipsec|vpn)/i.test(name);
    }
}

module.exports = NetworkChecker;
