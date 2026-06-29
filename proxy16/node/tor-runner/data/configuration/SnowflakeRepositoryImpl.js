'use strict';

const SnowflakeRepository = require('../../domain/configuration/SnowflakeRepository');
const RendezvousType = require('../../domain/configuration/RendezvousType');
const ConfigurationManager = require('../../framework/ConfigurationManager');
const BridgeChecker = require('../../utils/bridges/BridgeChecker');
const FileManager = require('../../utils/file/FileManager');

const SOCKS_ARGUMENT_MAX_LENGTH = 510;
const AMAZON_ID = '893902434899';

class DefaultSnowflakeBridgeSource {
    constructor({
        configuration = new ConfigurationManager(),
        bridgeChecker = new BridgeChecker(),
        fileManager = new FileManager()
    } = {}) {
        this.configuration = configuration;
        this.bridgeChecker = bridgeChecker;
        this.fileManager = fileManager;
    }

    getDefaultSnowflakeBridges() {
        const bridges = this.fileManager.readFile(this.configuration.torDefaultBridgesPath)
            .filter((bridge) => bridge.startsWith('snowflake'));

        if (bridges.length === 0) {
            return [];
        }

        const check = this.bridgeChecker.getSnowFlakeBridgeChecker(bridges[0]);
        return bridges.filter((bridge) => check(bridge));
    }
}

class SnowflakeRepositoryImpl extends SnowflakeRepository {
    constructor({
        bridgesDefaultRepository = null,
        defaultSnowflakeBridgeSource = new DefaultSnowflakeBridgeSource()
    } = {}) {
        super();
        this.bridgesDefaultRepository = bridgesDefaultRepository;
        this.defaultSnowflakeBridgeSource = defaultSnowflakeBridgeSource;
    }

    getBridgeLines(rendezvousType, bases = this.getBases()) {
        return bases.map((base) => {
            const bridgeWithoutIce = this.getBridgeWithoutIce(base, rendezvousType);
            const stuns = this.getSnowflakeStunServers().map((stunServer) => `stun:${stunServer}`);
            let bridge = `${bridgeWithoutIce} ice=`;
            let counter = 0;

            do {
                bridge += `${stuns[counter]},`;
                counter += 1;
            } while (
                counter < stuns.length &&
                bridge.length + stuns[counter].length < SOCKS_ARGUMENT_MAX_LENGTH
            );

            return bridge.endsWith(',') ? bridge.slice(0, -1) : bridge;
        });
    }

    getBridgeWithoutIce(base, rendezvousType) {
        if (rendezvousType === RendezvousType.AMAZON_SQS) {
            return `${base} sqsqueue=${this.getUrl(rendezvousType)} sqscreds=${this.getFronts(rendezvousType).join('')} utls-imitate=${this.getUtlsClientID()} covertdtls-config=${this.getCovertDtls()}`;
        }

        return `${base} url=${this.getUrl(rendezvousType)} fronts=${this.getFronts(rendezvousType).join(',')} utls-imitate=${this.getUtlsClientID()} covertdtls-config=${this.getCovertDtls()}`;
    }

    getBases() {
        return this.bridgesDefaultRepository?.getDefaultSnowflakeBridges?.() ||
            this.defaultSnowflakeBridgeSource.getDefaultSnowflakeBridges();
    }

    getUrl(rendezvousType) {
        switch (rendezvousType) {
        case RendezvousType.AMP_CACHE:
            return 'https://snowflake-broker.torproject.net/ ampcache=https://cdn.ampproject.org/';
        case RendezvousType.AMAZON_SQS:
            return `https://sqs.us-east-1.amazonaws.com/${AMAZON_ID}/snowflake-broker`;
        case RendezvousType.CDN77:
            return 'https://1098762253.rsc.cdn77.org/';
        default:
            return 'https://snowflake-broker.torproject.net/ ampcache=https://cdn.ampproject.org/';
        }
    }

    getFronts(rendezvousType) {
        switch (rendezvousType) {
        case RendezvousType.AMP_CACHE:
            return ['www.google.com', 'cdn.ampproject.org'];
        case RendezvousType.AMAZON_SQS:
            return [
                'eyJhd3MtYWNjZXNzLWtleS1pZCI6IkFL',
                'SUE1QUlGNFdKSlhTN1lIRUczIiwiYXdzLXNlY3',
                'JldC1rZXkiOiI3U0RNc0pB',
                'NHM1RitXZWJ1L3pMOHZrMFFXV0lsa1c2Y1dOZlVsQ0tRIn0='
            ];
        case RendezvousType.CDN77:
            return ['docs.plesk.com', 'maxst.icons8.com', 'app.datapacket.com'];
        default:
            return ['www.google.com', 'cdn.ampproject.org'];
        }
    }

    getSnowflakeStunServers() {
        return [
            'stun.nextcloud.com:443',
            'stun.sipgate.net:10000',
            'stun.epygi.com:3478',
            'stun.uls.co.za:3478',
            'stun.voipgate.com:3478',
            'stun.bethesda.net:3478',
            'stun.mixvoip.com:3478',
            'stun.voipia.net:3478',
            'stun.antisip.com:3478'
        ];
    }

    getUtlsClientID() {
        return 'hellorandomizedalpn';
    }

    getCovertDtls() {
        return 'randomizemimic';
    }
}

module.exports = SnowflakeRepositoryImpl;
