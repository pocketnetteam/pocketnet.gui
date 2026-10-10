'use strict';

const {
    HOST_NAME_REGEX,
    IPv4_REGEX,
    IPv6_REGEX,
    URL_REGEX
} = require('../Constants');

const ipv4BridgeBase = String.raw`(\d{1,3}\.){3}\d{1,3}:\d+( +\w{40})?`;
const ipv6BridgeBase = String.raw`\[${IPv6_REGEX}]:\d+( +\w{40})?`;

class BridgeChecker {
    urlRegex = new RegExp(`url=${URL_REGEX}`);
    frontsRegex = new RegExp(`fronts=(${HOST_NAME_REGEX},)*${HOST_NAME_REGEX}`);
    frontRegex = new RegExp(`front=${HOST_NAME_REGEX}`);
    ampCacheRegex = new RegExp(`ampcache=${URL_REGEX}`);
    conjureTransportRegex = /transport=(min|prefix|dtls)/;
    conjureRegistrarRegex = /registrar=(dns|ampcache)/;
    webTunnelServerNameRegex = new RegExp(`servername=${HOST_NAME_REGEX}`);
    webTunnelAddrRegex = new RegExp(`addr=(${IPv4_REGEX}:\\d+)|${IPv6_REGEX}:\\d+`);
    webTunnelVersionRegex = /ver=[0-9.]+/;
    snowflakeIceRegex = new RegExp(`ice=(stun:${HOST_NAME_REGEX}:\\d+,?)+`);
    snowflakeCovertDtlsRegex = /covertdtls-config=\w+/;
    snowflakeSqsQueueRegex = new RegExp(`sqsqueue=${URL_REGEX}`);
    snowflakeSqsCredsRegex = /sqscreds=[-A-Za-z0-9+/=]+/;
    snowflakeFingerprintRegex = /fingerprint=\w+/;

    getObfs4BridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^obfs4 +${bridgeBase} +cert=.+ +iat-mode=\\d$`);
        return (bridge) => pattern.test(bridge);
    }

    getObfs3BridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^obfs3 +${bridgeBase}$`);
        return (bridge) => pattern.test(bridge);
    }

    getScrambleSuitBridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^scramblesuit +${bridgeBase}( +password=\\w+)?$`);
        return (bridge) => pattern.test(bridge);
    }

    getMeekLiteBridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^meek_lite +${bridgeBase} +url=https://[\\w.+/-]+ +front=[\\w./-]+( +utls=\\w+)?$`);
        return (bridge) => pattern.test(bridge);
    }

    getSnowFlakeBridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^snowflake +${bridgeBase}(?: +.+)?`);
        return (bridge) => (
            pattern.test(bridge)
            && (!bridge.includes('fingerprint=') || this.snowflakeFingerprintRegex.test(bridge))
            && (!bridge.includes('url=') || this.urlRegex.test(bridge))
            && (!bridge.includes('ampcache=') || this.ampCacheRegex.test(bridge))
            && (!bridge.includes('fronts=') || this.frontsRegex.test(bridge))
            && (!bridge.includes('ice=') || this.snowflakeIceRegex.test(bridge))
            && (!bridge.includes('covertdtls-config=') || this.snowflakeCovertDtlsRegex.test(bridge))
            && (!bridge.includes('sqsqueue=') || this.snowflakeSqsQueueRegex.test(bridge))
            && (!bridge.includes('sqscreds=') || this.snowflakeSqsCredsRegex.test(bridge))
        );
    }

    getConjureBridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^conjure +${bridgeBase} .+`);
        return (bridge) => (
            pattern.test(bridge)
            && this.urlRegex.test(bridge)
            && (!bridge.includes('front=') || this.frontRegex.test(bridge))
            && (!bridge.includes('fronts=') || this.frontsRegex.test(bridge))
            && (!bridge.includes('transport=') || this.conjureTransportRegex.test(bridge))
            && (!bridge.includes('registrar=') || this.conjureRegistrarRegex.test(bridge))
            && (!bridge.includes('registrar=ampcache') || this.ampCacheRegex.test(bridge))
        );
    }

    getWebTunnelBridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^webtunnel +${bridgeBase} `);
        return (bridge) => {
            const match = bridge.match(pattern);
            return Boolean(
                match
                && this.urlRegex.test(bridge)
                && (!bridge.includes('servername=') || this.webTunnelServerNameRegex.test(bridge))
                && (!bridge.includes('addr=') || this.webTunnelAddrRegex.test(bridge))
                && (!bridge.includes('ver=') || this.webTunnelVersionRegex.test(bridge))
                && !bridge.replace(match[0], '').split(' ').some((part) => !part.includes('='))
            );
        };
    }

    getOtherBridgeChecker(input) {
        const bridgeBase = this.getBridgeBase(input);
        const pattern = new RegExp(`^${bridgeBase}$`);
        return (bridge) => pattern.test(bridge);
    }

    getBridgeBase(input) {
        return this.isIPv6Bridge(input) ? ipv6BridgeBase : ipv4BridgeBase;
    }

    isIPv6Bridge(input) {
        return String(input).includes('[') && String(input).includes(']');
    }
}

module.exports = BridgeChecker;
