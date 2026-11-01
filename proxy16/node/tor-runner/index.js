'use strict';

const TorManager = require('./framework/TorManager');
const TorCheckerManager = require('./framework/TorCheckerManager');
const TorControlClient = require('./framework/TorControlClient');
const TorRestarterReconnector = require('./domain/core/TorRestarterReconnector');
const CoreStatus = require('./domain/core/CoreStatus');
const ConfigurationManager = require('./framework/ConfigurationManager');
const ConfigurationRepositoryImpl = require('./data/configuration/ConfigurationRepositoryImpl');
const BridgesDefaultRepositoryImpl = require('./data/configuration/BridgesDefaultRepositoryImpl');
const BridgesCustomRepositoryImpl = require('./data/configuration/BridgesCustomRepositoryImpl');
const PreferenceRepositoryImpl = require('./data/preferences/PreferenceRepositoryImpl');
const NetworkObserver = require('./framework/NetworkObserver');
const NetworkRepositoryImpl = require('./data/network/NetworkRepositoryImpl');
const NetworkChecker = require('./utils/network/NetworkChecker');
const TorConnectionCheckerInteractor = require('./domain/network/TorConnectionCheckerInteractor');
const TorConnectionCheckerRepositoryImpl = require('./data/network/TorConnectionCheckerRepositoryImpl');
const Installer = require('./domain/installer/Installer');

function getSystemLocales() {
    try {
        const locale = Intl.DateTimeFormat().resolvedOptions().locale;
        return locale ? Intl.getCanonicalLocales(locale) : [];
    } catch (e) {
        return [];
    }
}

function createTorRunner({ settings = {}, proxy = null } = {}) {
    const configurationManager = new ConfigurationManager({ settings, proxy });
    let torManager = null;
    const torManagerProvider = () => torManager;
    let torRestarterReconnector = null;
    const torRestarterReconnectorProvider = () => torRestarterReconnector;
    const configurationRepository = new ConfigurationRepositoryImpl({
        configurationManager,
        torManagerProvider
    });
    const coreStatus = new CoreStatus();
    const preferences = new PreferenceRepositoryImpl({
        configuration: configurationManager
    });
    const networkObserver = new NetworkObserver({
        preferenceRepository: preferences
    });
    const networkRepository = new NetworkRepositoryImpl({
        networkObserver
    });
    const networkChecker = new NetworkChecker();
    const torConnectionChecker = new TorConnectionCheckerRepositoryImpl({
        configurationRepository
    });
    const torConnectionCheckerInteractor = new TorConnectionCheckerInteractor({
        networkChecker,
        torConnectionChecker,
        coreStatus
    });
    const bridgesCustomRepository = new BridgesCustomRepositoryImpl({
        configuration: configurationRepository,
        preferences
    });
    preferences.setBridgesCustomRepository(bridgesCustomRepository);
    const bridgesDefaultRepository = new BridgesDefaultRepositoryImpl({
        configuration: configurationRepository,
        preferences
    });
    const installer = new Installer({
        configurationRepository
    });
    const torControlClient = new TorControlClient({
        configuration: configurationRepository
    });
    const torCheckerManager = new TorCheckerManager({
        configuration: configurationRepository,
        coreStatus,
        bridgesDefaultRepository,
        bridgesCustomRepository,
        preferences
    });
    torManager = new TorManager({
        settings,
        proxy,
        coreStatus,
        networkChecker,
        networkRepository,
        configuration: configurationRepository,
        torConnectionCheckerInteractor,
        bridgesCustomRepository,
        bridgesDefaultRepository,
        installer,
        preferences,
        torControlClient,
        torRestarterReconnectorProvider
    });
    torRestarterReconnector = new TorRestarterReconnector({
        coreStatus,
        configuration: configurationRepository,
        networkChecker,
        torManager,
        bridgesDefaultRepository,
        bridgesCustomRepository,
        torCheckerManager
    });
    const init = async () => {
        await preferences.setLocales(getSystemLocales());
        return torManager.init();
    };

    return {
        init,
        settingChanged: (newSettings) => torManager.settingChanged(newSettings),
        autorun: () => torManager.autorun(),
        startTor: () => torManager.startTor(),
        stopTor: () => torManager.stopTor(),
        restartTor: () => torManager.restartTor(),
        restartTorFromFacade: () => torManager.restartTorFromFacade(),
        destroy: () => torManager.destroy(),
        isStarted: () => torManager.isStarted(),
        isStopped: () => torManager.isStopped(),
        isRunning: () => torManager.isRunning(),
        info: (compact) => torManager.info(compact),
        getSettings: () => torManager.settings,
        getState: () => torManager.state,
        getInstance: () => torManager.instance,
        getsettingspath: () => torManager.getsettingspath(),
        getpath: () => torManager.getpath(),
        gettordirpath: () => torManager.gettordirpath(),
        resetTimer: () => torManager.resetTimer(),
        onStarted: (listener) => torManager.onStarted(listener),
        onStopped: (listener) => torManager.onStopped(listener),
        onRunning: (listener) => torManager.onRunning(listener),
        onAny: (listener) => torManager.onAny(listener)
    };
}

module.exports = createTorRunner;
