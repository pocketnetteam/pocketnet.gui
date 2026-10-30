'use strict';

const { domainToASCII } = require('url');

const SniRepository = require('../../domain/sni/SniRepository');
const AddressCheckerRepositoryImpl = require('../addresschecker/AddressCheckerRepositoryImpl');
const ConfigurationRepositoryImpl = require('../configuration/ConfigurationRepositoryImpl');
const PreferenceRepositoryImpl = require('../preferences/PreferenceRepositoryImpl');
const { SNI_HOST_NAME_REGEX } = require('../../utils/Constants');
const FileManager = require('../../utils/file/FileManager');

const SNI_COUNT_TO_CHECK = 5;
const SNI_COUNT_TO_GET = 3;
const LOCALE_RU_RU = 'ru-RU';
const LOCALE_RU_BY = 'ru-BY';
const COUNTRY_CODE_RU = 'ru';

class SniRepositoryImpl extends SniRepository {
    whiteListSuspected = false;

    constructor({
        configuration = new ConfigurationRepositoryImpl(),
        preferences = new PreferenceRepositoryImpl({ configuration: configuration.configurationManager }),
        addressCheckerRepository = new AddressCheckerRepositoryImpl({ preferences }),
        fileManager = new FileManager(),
        random = Math.random
    } = {}) {
        super();
        this.configuration = configuration;
        this.addressCheckerRepository = addressCheckerRepository;
        this.preferences = preferences;
        this.fileManager = fileManager;
        this.random = random;
        this.hostNameRegex = SNI_HOST_NAME_REGEX;
    }

    async getFakeSniHosts() {
        const fakeSni = [];
        const locales = this.preferences.getLocales();
        const defaultBridges = await this.getDefaultBridgesAsync();
        const universalSni = this.getDefaultSni('', defaultBridges);
        const reachableUniversalSni = (await this.addressCheckerRepository.getReachableDomains(
            this.shuffle(universalSni).slice(0, SNI_COUNT_TO_CHECK)
        )).slice(0, SNI_COUNT_TO_GET);

        if (reachableUniversalSni.length > 0) {
            this.whiteListSuspected = false;
            fakeSni.push(...reachableUniversalSni);
        } else if (locales.includes(LOCALE_RU_RU) || locales.includes(LOCALE_RU_BY)) {
            this.whiteListSuspected = true;
            const ruSni = this.shuffle(this.getDefaultSni(COUNTRY_CODE_RU, defaultBridges));

            while (ruSni.length > 0) {
                const sniToCheck = ruSni.splice(0, SNI_COUNT_TO_CHECK);
                const reachableRuSni = (await this.addressCheckerRepository.getReachableDomains(sniToCheck))
                    .slice(0, SNI_COUNT_TO_GET);

                if (reachableRuSni.length > 0) {
                    fakeSni.push(...reachableRuSni);
                    break;
                }
            }

            if (fakeSni.length === 0) {
                fakeSni.push(...this.shuffle(this.getDefaultSni(COUNTRY_CODE_RU, defaultBridges)).slice(0, SNI_COUNT_TO_GET));
            }
        } else {
            this.whiteListSuspected = false;
            fakeSni.push(...this.shuffle(universalSni).slice(0, SNI_COUNT_TO_GET));
        }

        return fakeSni;
    }

    isWhiteListSuspected() {
        return this.whiteListSuspected;
    }

    getDefaultSni(countryCode, defaultBridges = this.getDefaultBridges()) {
        const prefix = countryCode ? `sni${countryCode}` : 'sniall';
        const line = defaultBridges.find((bridge) => bridge.startsWith(prefix));
        if (!line) {
            return [];
        }

        return line
            .substring(line.indexOf(' ') + 1)
            .split(/, ?/)
            .map((host) => this.normalizeSniHost(host))
            .filter((host) => this.hostNameRegex.test(host));
    }

    getDefaultBridges() {
        if (this.configuration.isTorAssetAvailable?.() === false) {
            return [];
        }

        return this.fileManager.readFile(this.configuration.getTorDefaultBridgesPath());
    }

    async getDefaultBridgesAsync() {
        if (!await this.configuration.isTorAssetAvailableAsync()) {
            return [];
        }

        return this.fileManager.readFileAsync(this.configuration.getTorDefaultBridgesPath());
    }

    normalizeSniHost(host) {
        return domainToASCII(host.trim());
    }

    shuffle(items) {
        const result = [...items];

        for (let index = result.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(this.random() * (index + 1));
            [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
        }

        return result;
    }
}

module.exports = SniRepositoryImpl;
