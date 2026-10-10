'use strict';

const dns = require('dns');
const EventEmitter = require('events');
const os = require('os');

const NetworkType = require('../domain/network/NetworkType');
const Logger = require('../utils/logger/Logger');

const NETWORK_CHANGED = 'networkChanged';
const DEFAULT_POLL_INTERVAL_MS = 30000;

class NetworkObserver {
    lastNetworkType = NetworkType.UNKNOWN_NETWORK;
    lastSnapshot = null;
    pollTimer = null;
    networkChanges = new EventEmitter();

    constructor({
        networkInterfaces = () => os.networkInterfaces(),
        dnsServers = () => dns.getServers(),
        platform = () => process.platform,
        preferenceRepository = null,
        pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
        setIntervalFn = setInterval,
        clearIntervalFn = clearInterval
    } = {}) {
        this.networkInterfaces = networkInterfaces;
        this.dnsServers = dnsServers;
        this.platform = platform;
        this.preferenceRepository = preferenceRepository;
        this.pollIntervalMs = pollIntervalMs;
        this.setIntervalFn = setIntervalFn;
        this.clearIntervalFn = clearIntervalFn;
    }

    listenNetworkChanges() {
        try {
            if (this.pollTimer) {
                return;
            }

            this.lastNetworkType = this.getLastNetworkType();
            this.lastSnapshot = this.createSnapshot();
            this.saveLastActiveNetwork(this.lastSnapshot, false);

            this.pollTimer = this.setIntervalFn(() => this.checkNetworkChanges(), this.pollIntervalMs);
            this.pollTimer?.unref?.();
        } catch (e) {
            Logger.loge('NetworkObserver listenNetworkChanges', e);
        }
    }

    unlistenNetworkChanges() {
        try {
            this.setLastNetworkType(this.lastNetworkType);

            if (this.pollTimer) {
                this.clearIntervalFn(this.pollTimer);
                this.pollTimer = null;
            }
        } catch (e) {
            Logger.loge('NetworkObserver unlistenNetworkChanges', e);
        }
    }

    checkNetworkChanges() {
        try {
            const snapshot = this.createSnapshot();

            if (!this.lastSnapshot || snapshot.signature !== this.lastSnapshot.signature) {
                this.lastSnapshot = snapshot;
                this.saveLastActiveNetwork(snapshot, false);
                this.networkChanges.emit(NETWORK_CHANGED, snapshot);
                Logger.logi(`Network changed ${snapshot.networkType}`);
            }
        } catch (e) {
            Logger.loge('NetworkObserver checkNetworkChanges', e);
        }
    }

    onNetworkChanged(listener) {
        this.networkChanges.on(NETWORK_CHANGED, listener);
        return () => this.networkChanges.off(NETWORK_CHANGED, listener);
    }

    createSnapshot() {
        const entries = this.getActiveNetworkEntries();
        const activeInterfaceNames = this.getUniqueSorted(entries.map(({ name }) => name));
        const activeNetworkAddresses = this.getUniqueSorted(entries
            .filter(({ address }) => !this.isLinkLocalIpv6Address(address))
            .map(({ name, address }) => `${name}:${this.getNetworkAddress(address)}`));
        const dnsServers = this.getUniqueSorted(this.dnsServers() || []);
        const networkType = this.getNetworkType(activeInterfaceNames);
        const vpnActive = activeInterfaceNames.some((name) => this.isVpnInterfaceName(name));
        const signaturePayload = {
            activeInterfaceNames,
            activeNetworkAddresses,
            dnsServers,
            networkType,
            vpnActive
        };

        return {
            ...signaturePayload,
            signature: JSON.stringify(signaturePayload)
        };
    }

    getActiveNetworkEntries() {
        return Object.entries(this.networkInterfaces() || {}).flatMap(([name, addresses]) => {
            return (addresses || [])
                .filter((address) => !address.internal && this.isIpAddressFamily(address.family))
                .map((address) => ({ name, address }));
        });
    }

    isIpAddressFamily(family) {
        return family === 'IPv4' || family === 'IPv6' || family === 4 || family === 6;
    }

    isLinkLocalIpv6Address(address) {
        return (address.family === 'IPv6' || address.family === 6) &&
            /^fe[89ab][0-9a-f]:/i.test(address.address);
    }

    getNetworkAddress(address) {
        const bytes = this.toAddressBytes(address.address);
        const prefixLength = this.getNetworkPrefixLength(address);

        if (prefixLength === null) {
            return address.address;
        }

        if (!bytes || !Number.isInteger(prefixLength) || prefixLength < 0 || prefixLength > bytes.length * 8) {
            return address.address;
        }

        const networkBytes = bytes.map((byte, index) => {
            const remainingBits = prefixLength - index * 8;
            if (remainingBits >= 8) {
                return byte;
            }
            if (remainingBits <= 0) {
                return 0;
            }

            return byte & (0xff << (8 - remainingBits));
        });

        return `${this.formatAddressBytes(networkBytes)}/${prefixLength}`;
    }

    getNetworkPrefixLength(address) {
        if (address.cidr) {
            return Number(address.cidr.substring(address.cidr.lastIndexOf('/') + 1));
        }

        if (address.family !== 'IPv6' && address.family !== 6) {
            return null;
        }

        return this.hasEmbeddedIpv4Address(address.address) ? 128 : 64;
    }

    hasEmbeddedIpv4Address(address) {
        const addressWithoutScope = address.split('%')[0];
        const finalGroup = addressWithoutScope.substring(addressWithoutScope.lastIndexOf(':') + 1);
        return finalGroup.includes('.');
    }

    toAddressBytes(address) {
        if (address.includes(':')) {
            return this.toIpv6Bytes(address);
        }

        const bytes = address.split('.').map(Number);
        return bytes.length === 4 && bytes.every((byte) => Number.isInteger(byte) && byte >= 0 && byte <= 255)
            ? bytes
            : null;
    }

    toIpv6Bytes(address) {
        const normalizedAddress = this.expandEmbeddedIpv4Address(address.split('%')[0]);
        if (!normalizedAddress) {
            return null;
        }

        const groups = normalizedAddress.split('::');
        if (groups.length > 2) {
            return null;
        }

        const parseGroups = (value) => value ? value.split(':').filter(Boolean) : [];
        const start = parseGroups(groups[0]);
        const end = parseGroups(groups[1]);
        const missingGroups = 8 - start.length - end.length;
        if ((groups.length === 1 && missingGroups !== 0) || missingGroups < 0) {
            return null;
        }

        const fullGroups = groups.length === 2
            ? [...start, ...Array(missingGroups).fill('0'), ...end]
            : start;
        const values = fullGroups.map((group) => Number.parseInt(group, 16));
        if (values.length !== 8 || values.some((value) => !Number.isInteger(value) || value < 0 || value > 0xffff)) {
            return null;
        }

        return values.flatMap((value) => [value >> 8, value & 0xff]);
    }

    expandEmbeddedIpv4Address(address) {
        const lastSeparatorIndex = address.lastIndexOf(':');
        const finalGroup = address.substring(lastSeparatorIndex + 1);
        if (!finalGroup.includes('.')) {
            return address;
        }

        const ipv4Bytes = this.toAddressBytes(finalGroup);
        if (!ipv4Bytes || ipv4Bytes.length !== 4) {
            return null;
        }

        const upperGroup = ((ipv4Bytes[0] << 8) | ipv4Bytes[1]).toString(16);
        const lowerGroup = ((ipv4Bytes[2] << 8) | ipv4Bytes[3]).toString(16);
        return `${address.substring(0, lastSeparatorIndex + 1)}${upperGroup}:${lowerGroup}`;
    }

    formatAddressBytes(bytes) {
        if (bytes.length === 4) {
            return bytes.join('.');
        }

        const groups = [];
        for (let index = 0; index < bytes.length; index += 2) {
            groups.push(((bytes[index] << 8) | bytes[index + 1]).toString(16));
        }
        return groups.join(':');
    }

    getNetworkType(interfaceNames) {
        const identifiedNetworkTypes = new Set();

        for (const name of interfaceNames) {
            if (this.isVpnInterfaceName(name)) {
                continue;
            }
            if (this.isEthernetInterfaceName(name)) {
                identifiedNetworkTypes.add(NetworkType.ETHERNET_NETWORK);
            } else if (this.isWifiInterfaceName(name)) {
                identifiedNetworkTypes.add(NetworkType.WIFI_NETWORK);
            } else if (this.isCellularInterfaceName(name)) {
                identifiedNetworkTypes.add(NetworkType.CELLULAR_NETWORK);
            }
        }

        return identifiedNetworkTypes.size === 1
            ? [...identifiedNetworkTypes][0]
            : NetworkType.UNKNOWN_NETWORK;
    }

    saveLastActiveNetwork(snapshot = this.createSnapshot(), emitChange = true) {
        if (this.lastNetworkType !== snapshot.networkType) {
            this.lastNetworkType = snapshot.networkType;
            if (emitChange) {
                this.networkChanges.emit(NETWORK_CHANGED, snapshot);
            }
        }
    }

    getLastNetworkType() {
        try {
            return this.preferenceRepository?.getLastNetwork?.() || NetworkType.UNKNOWN_NETWORK;
        } catch (e) {
            Logger.loge('NetworkObserver getLastNetworkType', e);
            return NetworkType.UNKNOWN_NETWORK;
        }
    }

    setLastNetworkType(networkType) {
        try {
            Promise.resolve(this.preferenceRepository?.setLastNetwork?.(networkType)).catch((e) => {
                Logger.loge('NetworkObserver setLastNetworkType', e);
            });
        } catch (e) {
            Logger.loge('NetworkObserver setLastNetworkType', e);
        }
    }

    getUniqueSorted(items) {
        return [...new Set(items)].sort();
    }

    isEthernetInterfaceName(name = '') {
        return /^(eth|ethernet)/i.test(name) ||
            (this.platform() === 'linux' && /^en/i.test(name));
    }

    isWifiInterfaceName(name = '') {
        return /^(wl|wifi|wlan|wi-fi|airport)/i.test(name);
    }

    isCellularInterfaceName(name = '') {
        return /^(wwan|cell|cellular|rmnet|pdp_ip|usbmodem)/i.test(name);
    }

    isVpnInterfaceName(name = '') {
        return /^(tun|tap|utun|ppp|wg|tailscale|zt|zerotier|ipsec|vpn)/i.test(name);
    }
}

NetworkObserver.NETWORK_CHANGED = NETWORK_CHANGED;

module.exports = NetworkObserver;
