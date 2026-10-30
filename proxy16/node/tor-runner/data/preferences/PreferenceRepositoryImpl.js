'use strict';

const TorMode = require('../../domain/core/TorMode');
const BridgeUnreachableData = require('../../domain/configuration/BridgeUnreachableData');
const NetworkType = require('../../domain/network/NetworkType');
const PreferenceKeys = require('../../domain/preferences/PreferenceKeys');
const PreferenceRepository = require('../../domain/preferences/PreferenceRepository');
const ConfigurationManager = require('../../framework/ConfigurationManager');
const JsonPreferenceStorage = require('../../framework/JsonPreferenceStorage');
const Logger = require('../../utils/logger/Logger');
const TorSettingsAdapter = require('./TorSettingsAdapter');

const BRIDGE_UNREACHABLE_COOLDOWN_TIME_HOURS = 24;
const BRIDGE_UNREACHABLE_TIME_TO_DELETE_DAYS = 30;
const BRIDGE_UNREACHABLE_COUNT_TO_DELETE = 3;
const NUMBER_REGEX = /^\d+$/;

class PreferenceRepositoryImpl extends PreferenceRepository {
    ipv4BridgeAddressRegex = /^(\d{1,3}\.){3}\d{1,3}:\d+$/;
    ipv6BridgeAddressRegex = /^\[[0-9a-fA-F:]+]:\d+$/;
    unreachableBridgeOperationQueue = Promise.resolve();

    constructor({
        storage = null,
        torSettingsAdapter = null,
        bridgesCustomRepository = null,
        configuration = new ConfigurationManager(),
        now = () => Date.now()
    } = {}) {
        super();
        this.storage = storage || new JsonPreferenceStorage({
            filePath: () => configuration.preferencesPath
        });
        this.torSettingsAdapter = torSettingsAdapter || new TorSettingsAdapter({ settings: configuration.settings });
        this.bridgesCustomRepository = bridgesCustomRepository;
        this.now = now;
    }

    getTorMode() {
        return this.torSettingsAdapter?.getTorMode?.() || TorMode.UNDEFINED;
    }

    setTorMode(mode) {
        return this.torSettingsAdapter?.setTorMode?.(mode);
    }

    getLastNetwork() {
        return this.enumValue(
            NetworkType,
            this.storage.getString(PreferenceKeys.LAST_NETWORK, NetworkType.UNKNOWN_NETWORK),
            NetworkType.UNKNOWN_NETWORK
        );
    }

    async setLastNetwork(networkType) {
        return this.storage.putString(PreferenceKeys.LAST_NETWORK, networkType);
    }

    getLocales() {
        return this.getStringList(PreferenceKeys.LOCALES);
    }

    async setLocales(locales) {
        return this.setStringList(PreferenceKeys.LOCALES, locales);
    }

    getLastSni() {
        return this.getStringList(PreferenceKeys.LAST_SNI);
    }

    async setLastSni(sni) {
        return this.setStringList(PreferenceKeys.LAST_SNI, sni);
    }

    getNextTimeForBridgesRequest() {
        return this.storage.getLong(PreferenceKeys.NEXT_TIME_FOR_BRIDGES_REQUEST, 0);
    }

    async setNextTimeForBridgesRequest(time) {
        return this.storage.putLong(PreferenceKeys.NEXT_TIME_FOR_BRIDGES_REQUEST, time);
    }

    getLastDefaultBridges() {
        return this.storage.getStringSet(PreferenceKeys.LAST_DEFAULT_BRIDGES, new Set());
    }

    async setLastDefaultBridges(bridges) {
        return this.storage.putStringSet(PreferenceKeys.LAST_DEFAULT_BRIDGES, bridges);
    }

    getLastCustomBridges() {
        return this.storage.getStringSet(PreferenceKeys.LAST_CUSTOM_BRIDGES, new Set());
    }

    async setLastCustomBridges(bridges) {
        return this.storage.putStringSet(PreferenceKeys.LAST_CUSTOM_BRIDGES, bridges);
    }

    async flush() {
        return typeof this.storage.flush === 'function'
            ? await this.storage.flush()
            : true;
    }

    async addUnreachableBridgeRecord(bridge) {
        return this.runUnreachableBridgeOperation(() => this.addUnreachableBridgeRecordInternal(bridge));
    }

    async addUnreachableBridgeRecordInternal(bridge) {
        try {
            const bridgeAddress = this.extractBridgeAddress(bridge);
            let unreachableBridges = this.storage.getStringSet(PreferenceKeys.UNREACHABLE_BRIDGES, new Set());
            const {
                bridgeUnreachableData,
                cleanedUnreachableBridges,
                malformedRecordsRemoved
            } = this.cleanMalformedUnreachableBridgeRecords(unreachableBridges, bridgeAddress);
            unreachableBridges = cleanedUnreachableBridges;
            const currentTime = this.now();

            if (
                bridgeAddress &&
                bridgeUnreachableData &&
                bridgeUnreachableData.checkCount > BRIDGE_UNREACHABLE_COUNT_TO_DELETE &&
                currentTime - bridgeUnreachableData.lastCheckTime > BRIDGE_UNREACHABLE_COOLDOWN_TIME_HOURS * 1000 * 60 * 60 &&
                currentTime - bridgeUnreachableData.firstCheckTime > BRIDGE_UNREACHABLE_TIME_TO_DELETE_DAYS * 1000 * 60 * 60 * 24
            ) {
                const deleteBridgeByAddress = this.bridgesCustomRepository?.deleteBridgeByAddressAsync ||
                    this.bridgesCustomRepository?.deleteBridgeByAddress;
                if (!deleteBridgeByAddress) {
                    Logger.logw(`PreferenceRepository cannot delete unreachable bridge ${bridgeAddress}`);
                    return false;
                }

                if (!await deleteBridgeByAddress.call(this.bridgesCustomRepository, bridgeAddress)) {
                    Logger.logw(`PreferenceRepository unreachable bridge was not deleted ${bridgeAddress}`);
                }

                return this.removeUnreachableBridgeRecordInternal(bridge);
            } else if (bridgeAddress && bridgeUnreachableData) {
                if (currentTime - bridgeUnreachableData.lastCheckTime > BRIDGE_UNREACHABLE_COOLDOWN_TIME_HOURS * 1000 * 60 * 60) {
                    const updatedUnreachableBridges = this.removeUnreachableBridgeData(unreachableBridges, bridgeAddress);
                    updatedUnreachableBridges.add(`${bridgeAddress};${bridgeUnreachableData.firstCheckTime};${currentTime};${bridgeUnreachableData.checkCount + 1}`);
                    return await this.storage.putStringSet(PreferenceKeys.UNREACHABLE_BRIDGES, updatedUnreachableBridges);
                } else if (malformedRecordsRemoved) {
                    return await this.storage.putStringSet(PreferenceKeys.UNREACHABLE_BRIDGES, unreachableBridges);
                }
            } else if (bridgeAddress) {
                const updatedUnreachableBridges = this.removeUnreachableBridgeData(unreachableBridges, bridgeAddress);
                updatedUnreachableBridges.add(`${bridgeAddress};${currentTime};${currentTime};1`);
                return await this.storage.putStringSet(PreferenceKeys.UNREACHABLE_BRIDGES, updatedUnreachableBridges);
            }

            return true;
        } catch (e) {
            Logger.loge('PreferenceRepository addUnreachableBridge', e);
            return false;
        }
    }

    async removeUnreachableBridgeRecord(bridge) {
        return this.runUnreachableBridgeOperation(() => this.removeUnreachableBridgeRecordInternal(bridge));
    }

    async removeUnreachableBridgeRecordInternal(bridge) {
        try {
            const bridgeAddress = this.extractBridgeAddress(bridge);
            if (!bridgeAddress) {
                return false;
            }

            const unreachableBridges = this.storage.getStringSet(PreferenceKeys.UNREACHABLE_BRIDGES, new Set());
            return await this.storage.putStringSet(
                PreferenceKeys.UNREACHABLE_BRIDGES,
                this.removeUnreachableBridgeData(unreachableBridges, bridgeAddress)
            );
        } catch (e) {
            Logger.loge('PreferenceRepository removeUnreachableBridge', e);
            return false;
        }
    }

    runUnreachableBridgeOperation(operation) {
        const task = this.unreachableBridgeOperationQueue
            .catch(() => {})
            .then(operation);
        this.unreachableBridgeOperationQueue = task.catch(() => {});
        return task;
    }

    setBridgesCustomRepository(bridgesCustomRepository) {
        this.bridgesCustomRepository = bridgesCustomRepository;
        return true;
    }

    getStringList(key) {
        const value = this.storage.getString(key, '');
        if (!value) {
            return [];
        }

        return value.split(',');
    }

    async setStringList(key, values) {
        return this.storage.putString(key, values.join(','));
    }

    enumValue(enumObject, value, defaultValue) {
        return Object.values(enumObject).includes(value) ? value : defaultValue;
    }

    cleanMalformedUnreachableBridgeRecords(unreachableBridges, bridgeAddress) {
        const recordPrefix = `${bridgeAddress};`;
        const matchingRecords = bridgeAddress
            ? [...unreachableBridges].filter((record) => record.startsWith(recordPrefix))
            : [];
        const parsedRecords = matchingRecords.map((record) => ({
            record,
            bridgeUnreachableData: this.parseUnreachableBridgeData(record, bridgeAddress)
        }));
        const validRecords = parsedRecords
            .map(({ bridgeUnreachableData }) => bridgeUnreachableData)
            .filter(Boolean);
        const malformedRecords = parsedRecords
            .filter(({ bridgeUnreachableData }) => !bridgeUnreachableData)
            .map(({ record }) => record);

        return {
            bridgeUnreachableData: validRecords[0] || null,
            cleanedUnreachableBridges: this.removeMalformedUnreachableBridgeRecords(unreachableBridges, malformedRecords),
            malformedRecordsRemoved: malformedRecords.length > 0
        };
    }

    removeMalformedUnreachableBridgeRecords(unreachableBridges, malformedRecords) {
        if (malformedRecords.length === 0) {
            return new Set(unreachableBridges);
        }

        const cleanedUnreachableBridges = new Set(unreachableBridges);
        for (const record of malformedRecords) {
            cleanedUnreachableBridges.delete(record);
            Logger.logw(`PreferenceRepository remove malformed unreachable bridge record ${record}`);
        }

        return cleanedUnreachableBridges;
    }

    parseUnreachableBridgeData(record, bridgeAddress) {
        const parts = record.split(';');
        if (parts.length !== 4) {
            return null;
        }

        if (!NUMBER_REGEX.test(parts[1]) || !NUMBER_REGEX.test(parts[2]) || !NUMBER_REGEX.test(parts[3])) {
            return null;
        }

        const bridgeUnreachableData = new BridgeUnreachableData({
            bridgeAddress,
            firstCheckTime: Number(parts[1]),
            lastCheckTime: Number(parts[2]),
            checkCount: Number(parts[3])
        });

        if (
            !Number.isSafeInteger(bridgeUnreachableData.firstCheckTime) ||
            !Number.isSafeInteger(bridgeUnreachableData.lastCheckTime) ||
            !Number.isSafeInteger(bridgeUnreachableData.checkCount)
        ) {
            return null;
        }

        return bridgeUnreachableData;
    }

    removeUnreachableBridgeData(unreachableBridges, bridgeAddress) {
        const recordPrefix = `${bridgeAddress};`;
        return new Set([...unreachableBridges].filter((item) => !item.startsWith(recordPrefix)));
    }

    extractBridgeAddress(bridge) {
        const parts = bridge.trim().split(/\s+/);
        if (parts.length === 0) {
            return '';
        }

        if (this.isBridgeAddress(parts[0])) {
            return parts[0];
        }

        if (parts.length > 1 && this.isBridgeAddress(parts[1])) {
            return parts[1];
        }

        return '';
    }

    isBridgeAddress(value) {
        return this.ipv4BridgeAddressRegex.test(value) || this.ipv6BridgeAddressRegex.test(value);
    }
}

module.exports = PreferenceRepositoryImpl;
