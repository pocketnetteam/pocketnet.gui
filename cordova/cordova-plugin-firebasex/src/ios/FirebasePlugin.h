#import <Cordova/CDV.h>
#import "AppDelegate.h"
#import "FirebaseWrapper.h"
@import FirebaseFirestore;

@interface FirebasePlugin : CDVPlugin

- (void)setAutoInitEnabled:(CDVInvokedUrlCommand*)command;
- (void)isAutoInitEnabled:(CDVInvokedUrlCommand*)command;

// Authentication
- (void)verifyPhoneNumber:(CDVInvokedUrlCommand*)command;
- (void)setLanguageCode:(CDVInvokedUrlCommand*)command;
- (void)createUserWithEmailAndPassword:(CDVInvokedUrlCommand*)command;
- (void)signInUserWithEmailAndPassword:(CDVInvokedUrlCommand*)command;
- (void)authenticateUserWithEmailAndPassword:(CDVInvokedUrlCommand*)command;
- (void)signInUserWithCustomToken:(CDVInvokedUrlCommand*)command;
- (void)signInUserAnonymously:(CDVInvokedUrlCommand*)command;
- (void)authenticateUserWithGoogle:(CDVInvokedUrlCommand*)command;
- (void)authenticateUserWithApple:(CDVInvokedUrlCommand*)command;
- (void)authenticateUserWithMicrosoft:(CDVInvokedUrlCommand*)command;
- (void)authenticateUserWithFacebook:(CDVInvokedUrlCommand*)command;
- (void)authenticateUserWithOAuth:(CDVInvokedUrlCommand*)command;
- (void)signInWithCredential:(CDVInvokedUrlCommand*)command;
- (void)linkUserWithCredential:(CDVInvokedUrlCommand*)command;
- (void)unlinkUserWithProvider:(CDVInvokedUrlCommand*)command;
- (void)reauthenticateWithCredential:(CDVInvokedUrlCommand*)command;
- (void)isUserSignedIn:(CDVInvokedUrlCommand*)command;
- (void)signOutUser:(CDVInvokedUrlCommand*)command;
- (void)getCurrentUser:(CDVInvokedUrlCommand*)command;
- (void)reloadCurrentUser:(CDVInvokedUrlCommand*)command;
- (void)updateUserProfile:(CDVInvokedUrlCommand*)command;
- (void)updateUserEmail:(CDVInvokedUrlCommand*)command;
- (void)verifyBeforeUpdateEmail:(CDVInvokedUrlCommand*)command;
- (void)sendUserEmailVerification:(CDVInvokedUrlCommand*)command;
- (void)updateUserPassword:(CDVInvokedUrlCommand*)command;
- (void)sendUserPasswordResetEmail:(CDVInvokedUrlCommand*)command;
- (void)deleteUser:(CDVInvokedUrlCommand*)command;
- (void)useAuthEmulator:(CDVInvokedUrlCommand*)command;
- (void)getClaims:(CDVInvokedUrlCommand*)command;
- (void)enrollSecondAuthFactor:(CDVInvokedUrlCommand*)command;
- (void)verifySecondAuthFactor:(CDVInvokedUrlCommand*)command;
- (void)listEnrolledSecondAuthFactors:(CDVInvokedUrlCommand*)command;
- (void)unenrollSecondAuthFactor:(CDVInvokedUrlCommand*)command;

// Remote notifications
- (void)getId:(CDVInvokedUrlCommand*)command;
- (void)getToken:(CDVInvokedUrlCommand*)command;
- (void)getAPNSToken:(CDVInvokedUrlCommand*)command;
- (NSString *)hexadecimalStringFromData:(NSData *)data;
- (void)grantPermission:(CDVInvokedUrlCommand*)command;
- (void)hasPermission:(CDVInvokedUrlCommand*)command;
- (void)grantCriticalPermission:(CDVInvokedUrlCommand*)command;
- (void)hasCriticalPermission:(CDVInvokedUrlCommand*)command;
- (void)setBadgeNumber:(CDVInvokedUrlCommand*)command;
- (void)getBadgeNumber:(CDVInvokedUrlCommand*)command;
- (void)subscribe:(CDVInvokedUrlCommand*)command;
- (void)unsubscribe:(CDVInvokedUrlCommand*)command;
- (void)unregister:(CDVInvokedUrlCommand*)command;
- (void)onOpenSettings:(CDVInvokedUrlCommand*)command;
- (void)onMessageReceived:(CDVInvokedUrlCommand*)command;
- (void)onTokenRefresh:(CDVInvokedUrlCommand*)command;
- (void)onApnsTokenReceived:(CDVInvokedUrlCommand *)command;
- (void)sendOpenNotificationSettings;
- (void)sendNotification:(NSDictionary*)userInfo;
- (void)sendToken:(NSString*)token;
- (void)sendApnsToken:(NSString*)token;
- (void)clearAllNotifications:(CDVInvokedUrlCommand *)command;

// Analytics
- (void)setAnalyticsCollectionEnabled:(CDVInvokedUrlCommand*)command;
- (void)isAnalyticsCollectionEnabled:(CDVInvokedUrlCommand*)command;
- (void)setAnalyticsConsentMode:(CDVInvokedUrlCommand*)command;
- (void)logEvent:(CDVInvokedUrlCommand*)command;
- (void)setScreenName:(CDVInvokedUrlCommand*)command;
- (void)setUserId:(CDVInvokedUrlCommand*)command;
- (void)setUserProperty:(CDVInvokedUrlCommand*)command;
- (void)initiateOnDeviceConversionMeasurement:(CDVInvokedUrlCommand*)command;

// Crashlytics
- (void)setCrashlyticsCollectionEnabled:(CDVInvokedUrlCommand*)command;
- (void)isCrashlyticsCollectionEnabled:(CDVInvokedUrlCommand*)command;
- (void)didCrashOnPreviousExecution:(CDVInvokedUrlCommand *)command;
- (void)setCrashlyticsCustomKey:(CDVInvokedUrlCommand *)command;
- (void)logError:(CDVInvokedUrlCommand*)command;
- (void)logMessage:(CDVInvokedUrlCommand*)command;
- (void)sendCrash:(CDVInvokedUrlCommand*)command;
- (void)setCrashlyticsUserId:(CDVInvokedUrlCommand*)command;

// Remote config
- (void)fetch:(CDVInvokedUrlCommand*)command;
- (void)activateFetched:(CDVInvokedUrlCommand*)command;
- (void)getValue:(CDVInvokedUrlCommand*)command;
- (void)getInfo:(CDVInvokedUrlCommand*)command;
- (void)fetchAndActivate:(CDVInvokedUrlCommand*)command;
- (void)getAll:(CDVInvokedUrlCommand*)command;
- (void)resetRemoteConfig:(CDVInvokedUrlCommand*)command;
- (void)setConfigSettings:(CDVInvokedUrlCommand*)command;
- (void)setDefaults:(CDVInvokedUrlCommand*)command;


// Performance
- (void)setPerformanceCollectionEnabled:(CDVInvokedUrlCommand*)command;
- (void)isPerformanceCollectionEnabled:(CDVInvokedUrlCommand*)command;
- (void)startTrace:(CDVInvokedUrlCommand*)command;
- (void)incrementCounter:(CDVInvokedUrlCommand*)command;
- (void)stopTrace:(CDVInvokedUrlCommand*)command;

// Firestore
- (void)addDocumentToFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)setDocumentInFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)updateDocumentInFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)deleteDocumentFromFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)documentExistsInFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)fetchDocumentInFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)fetchFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)listenToDocumentInFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)listenToFirestoreCollection:(CDVInvokedUrlCommand*)command;
- (void)removeFirestoreListener:(CDVInvokedUrlCommand*)command;

// Functions
- (void)functionsHttpsCallable:(CDVInvokedUrlCommand*)command;

// Installations
- (void) getInstallationId:(CDVInvokedUrlCommand*)command;
- (void) getInstallationToken:(CDVInvokedUrlCommand*)command;
- (void) deleteInstallationId:(CDVInvokedUrlCommand*)command;



// Internals
+ (FirebasePlugin *) firebasePlugin;
+ (NSString*) appleSignInNonce;
+ (void) setFirestore:(FIRFirestore*) firestoreInstance;
- (void) handlePluginExceptionWithContext: (NSException*) exception :(CDVInvokedUrlCommand*)command;
- (void) handlePluginExceptionWithoutContext: (NSException*) exception;
- (void) _logError: (NSString*)msg;
- (void) _logInfo: (NSString*)msg;
- (void) _logMessage: (NSString*)msg;
- (BOOL) _shouldEnableCrashlytics;
- (NSNumber*) saveAuthCredential: (FIRAuthCredential *) authCredential;
- (void)executeGlobalJavascript: (NSString*)jsString;

- (void)createChannel:(CDVInvokedUrlCommand *)command;
- (void)setDefaultChannel:(CDVInvokedUrlCommand *)command;
- (void)deleteChannel:(CDVInvokedUrlCommand *)command;
- (void)listChannels:(CDVInvokedUrlCommand *)command;

@property (nonatomic, readonly) BOOL isFCMEnabled;

@property (nonatomic, copy) NSString *notificationCallbackId;
@property (nonatomic, copy) NSString *openSettingsCallbackId;
@property (nonatomic, copy) NSString *tokenRefreshCallbackId;
@property (nonatomic, copy) NSString *apnsTokenRefreshCallbackId;
@property (nonatomic, copy) NSString *appleSignInCallbackId;

@property (nonatomic, retain) NSMutableArray *notificationStack;
@property(nonatomic, nullable) id<NSObject> installationIDObserver;

@end
