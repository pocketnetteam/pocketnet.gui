export interface IChannelOptions {
    id: string
    name?: string
    description?: string
    sound?: string
    vibration?: boolean | number[]
    light?: boolean
    lightColor?: string
    importance?: 0 | 1 | 2 | 3 | 4
    badge?: boolean
    visibility?: -1 | 0 | 1
    usage?: number
    streamType?: number
}

interface User {
    name: string;
    email: string;
    emailIsVerified: boolean;
    phoneNumber: string;
    photoUrl: string;
    uid: string;
    providerId: string;
    idToken: string;
}

export interface FirebasePlugin {
    getId(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    getToken(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    onTokenRefresh(
        success: (value: string) => void,
        error: (err: string) => void): void
    getAPNSToken(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    onApnsTokenReceived(
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    onMessageReceived(
        success: (value: object) => void,
        error: (err: string) => void
    ): void
    onOpenSettings(
        success: () => void,
        error: (err: string) => void
    ): void
    grantPermission(
        success: (value: boolean) => void,
        error: (err: string) => void,
        requestWithProvidesAppNotificationSettings?: boolean
    ): void
    hasPermission(
        success: (value: boolean) => void,
        error: (err: string) => void
    ): void
    grantCriticalPermission(
        success: (value: boolean) => void,
        error: (err: string) => void
    ): void
    hasCriticalPermission(
        success: (value: boolean) => void,
        error: (err: string) => void
    ): void
    unregister(): void
    setBadgeNumber(
        badgeNumber: number
    ): void
    getBadgeNumber(
        success: (badgeNumber: number) => void,
        error: (err: string) => void
    ): void
    clearAllNotifications(): void
    subscribe(
        topic: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    unsubscribe(
        topic: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    isAutoInitEnabled(
        success: (enabled: boolean) => void,
        error?: (err: string) => void
    ): void
    setAutoInitEnabled(
        enabled: boolean,
        success?: () => void,
        error?: (err: string) => void
    ): void
    createChannel(
        channel: IChannelOptions,
        success: () => void,
        error: (err: string) => void
    ): void
    setDefaultChannel(
        channel: IChannelOptions,
        success: () => void,
        error: (err: string) => void
    ): void
    deleteChannel(
        channel: string,
        success: () => void,
        error: (err: string) => void
    ): void
    listChannels(
        success: (list: { id: string; name: string }[]) => void,
        error: (err: string) => void
    ): void
    setAnalyticsCollectionEnabled(
        setEnabled: boolean
    ): void
    AnalyticsConsentMode: {
        ANALYTICS_STORAGE: string,
        AD_STORAGE: string,
        AD_USER_DATA: string,
        AD_PERSONALIZATION: string
    }
    AnalyticsConsentStatus: {
        GRANTED: string,
        DENIED: string
    }
    setAnalyticsConsentMode(
        consent: object,
        success: (info: object) => void,
        error: (err: string) => void
    ): void
    logEvent(
        eventName: string,
        eventProperties: object
    ): void
    setScreenName(
        screenName: string
    ): void
    setUserId(
        userId: string
    ): void
    setUserProperty(
        userName: string,
        userValue: string
    ): void
    initiateOnDeviceConversionMeasurement(
        userIdentifier: { emailAddress?:string, phoneNumber?: string },
        success?: () => void,
        error?: (err: string) => void
    ): void
    setCrashlyticsCollectionEnabled(): void
    didCrashOnPreviousExecution(
        success?: (didCrashOnPreviousExecution: boolean) => void,
        error?: (err: string) => void
    ): void
    setCrashlyticsUserId(
        userId: string
    ): void
    setCrashlyticsCustomKey(
        key: string,
        value: string | number | boolean,
        success?: () => void,
        error?: (err: string) => void
    ): void
    sendCrash(): void
    logMessage(
        message: string
    ): void
    logError(
        errorMessage: string,
        stackTrace?: object,
        success?: () => void,
        error?: (err: string) => void
    ): void
    verifyPhoneNumber(
        success: (value: object | boolean) => void,
        error: (err: string) => void,
        phoneNumber: string,
        opts?: {
            timeOutDuration: number,
            fakeVerificationCode: string,
            requireSmsValidation: boolean
        },
    ): void
    enrollSecondAuthFactor(
        success: (value: object | boolean) => void,
        error: (err: string) => void,
        phoneNumber: string,
        opts?: {
            displayName: string,
            credential: {
                verificationId: string,
                code: string
            },
            timeOutDuration: number,
            fakeVerificationCode: string,
            requireSmsValidation: boolean
        },
    ): void
    verifySecondAuthFactor(
        success: (value: object | boolean) => void,
        error: (err: string) => void,
        params: {
            selectedIndex?: number,
            credential?: {
                verificationId: string,
                code: string
            },
        },
        opts?: {
            timeOutDuration: number,
            fakeVerificationCode: string,
            phoneNumber: string,
            requireSmsValidation: boolean
        },
    ): void
    unenrollSecondAuthFactor(
        success: () => void,
        error: (err: string) => void,
        selectedIndex: number
    ): void
    listEnrolledSecondAuthFactors(
        success: (secondFactors: [object]) => void,
        error: (err: string) => void
    ): void
    setLanguageCode(
        lang: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    createUserWithEmailAndPassword(
        email: string,
        password: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    signInUserWithEmailAndPassword(
        email: string,
        password: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    authenticateUserWithEmailAndPassword(
        email: string,
        password: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    signInUserWithCustomToken(
        customToken: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    signInUserAnonymously(
        success?: () => void,
        error?: (err: string) => void
    ): void
    authenticateUserWithGoogle(
        clientId: string,
        success?: (credential:object) => void,
        error?: (err: string) => void
    ): void
    authenticateUserWithApple(
        success?: (credential:object) => void,
        error?: (err: string) => void,
        locale?: string,
    ): void
    authenticateUserWithMicrosoft(
        success?: (credential:object) => void,
        error?: (err: string) => void,
        locale?: string,
    ): void
    authenticateUserWithFacebook(
        accessToken: string,
        success?: (credential:object) => void,
        error?: (err: string) => void,
    ): void
    authenticateUserWithOAuth(
        success: (credential:object) => void,
        error: (err: string) => void,
        providerId: string,
        customParameters?: object,
        scopes?: [string],
    ): void
    signInWithCredential(
        credential: object,
        success?: () => void,
        error?: (err: string) => void
    ): void
    linkUserWithCredential(
        credential: object,
        success?: () => void,
        error?: (err: string) => void
    ): void
    reauthenticateWithCredential(
        credential: object,
        success?: () => void,
        error?: (err: string) => void
    ): void
    unlinkUserWithProvider(
        providerId: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    isUserSignedIn(
        success: (isSignedIn: boolean) => void,
        error?: (err: string) => void
    ): void
    signOutUser(
        success?: () => void,
        error?: (err: string) => void
    ): void
    getCurrentUser(
        success: (user: User) => void,
        error?: (err: string) => void
    ): void
    reloadCurrentUser(
        success: (user: User) => void,
        error?: (err: string) => void
    ): void
    updateUserProfile(
        profile: {
            name: string,
            photoUri: string
        },
        success?: () => void,
        error?: (err: string) => void
    ): void
    updateUserEmail(
        email: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    verifyBeforeUpdateEmail(
        email: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    sendUserEmailVerification(
        actionCodeSettings?: {
            handleCodeInApp?: boolean,
            url: string,
            dynamicLinkDomain?: string,
            iosBundleId?: string,
            androidPackageName?: string,
            installIfNotAvailable?: boolean,
            minimumVersion?: string,
        },
        success?: () => void,
        error?: (err: string) => void
    ): void
    updateUserPassword(
        password: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    sendUserPasswordResetEmail(
        email: string,
        success?: () => void,
        error?: (err: string) => void
    ): void
    deleteUser(
        success?: () => void,
        error?: (err: string) => void
    ): void
    registerAuthStateChangeListener(
        fn: (userSignedIn: boolean) => void,
    ): void
    registerAuthIdTokenChangeListener(
        fn: (result: undefined|{idToken: string, providerId: string}) => void,
    ): void
    useAuthEmulator(
        host: string,
        port: number,
        success?: () => void,
        error?: (err: string) => void
    ): void
    getClaims(
        success: (claims: object) => void,
        error?: (err: string) => void
    ): void
    fetch(
        cacheExpirationSeconds: number,
        success: () => void,
        error: (err: string) => void
    ): void
    fetch(
        success: () => void,
        error: (err: string) => void
    ): void
    activateFetched(
        success: (activated: boolean) => void,
        error: (err: string) => void
    ): void
    fetchAndActivate(
        success: (activated: boolean) => void,
        error: (err: string) => void
    ): void
    resetRemoteConfig(
        success: () => void,
        error: (err: string) => void
    ): void
    getValue(
        key: string,
        success: (value: string) => void,
        error: (err: string) => void
    ): void
    getAll(
        success: (values: object) => void,
        error: (err: string) => void
    ): void
    getInfo(
        success: (info: object) => void,
        error: (err: string) => void
    ): void
    setConfigSettings(
        configSettings: object,
        success: (info: object) => void,
        error: (err: string) => void
    ): void
    setDefaults(
        defaultSettings: object,
        success: (info: object) => void,
        error: (err: string) => void
    ): void
    setPerformanceCollectionEnabled(
        setEnabled: boolean
    ): void
    startTrace(
        name: string,
        success: () => void,
        error: (err: string) => void
    ): void
    incrementCounter(
        name: string,
        counterName: string,
        success: () => void,
        error: (err: string) => void
    ): void
    stopTrace(
        name: string
    ): void
    addDocumentToFirestoreCollection(
        document: object,
        collection: string,
        timestamp: boolean,
        success: () => void,
        error: (err: string) => void
    ): void
    setDocumentInFirestoreCollection(
        documentId: string,
        document: object,
        collection: string,
        timestamp: boolean,
        success: () => void,
        error: (err: string) => void
    ): void
    updateDocumentInFirestoreCollection(
        documentId: string,
        document: object,
        collection: string,
        timestamp: boolean,
        success: () => void,
        error: (err: string) => void
    ): void
    deleteDocumentFromFirestoreCollection(
        documentId: string,
        collection: string,
        success: () => void,
        error: (err: string) => void
    ): void
    fetchDocumentInFirestoreCollection(
        documentId: string,
        collection: string,
        success: (document: object) => void,
        error: (err: string) => void
    ): void
    fetchFirestoreCollection(
        collection: string,
        filters?: [object],
        success?: (collection: object) => void,
        error?: (err: string) => void
    ): void
    listenToDocumentInFirestoreCollection(
        success: (event: object) => void,
        error: (err: string) => void,
        documentId: string,
        collection: string,
        includeMetadata?: boolean
    ): void
    listenToFirestoreCollection(
        success: (event: object) => void,
        error: (err: string) => void,
        collection: string,
        filters?: [object],
        includeMetadata?: boolean
    ): void
    removeFirestoreListener(
        success: () => void,
        error: (err: string) => void,
        listenerId: string
    ): void
    registerApplicationDidBecomeActiveListener(
        fn: () => void,
    ): void
    registerApplicationDidEnterBackgroundListener(
        fn: () => void,
    ): void
}

declare global {
    const FirebasePlugin: FirebasePlugin;
}
