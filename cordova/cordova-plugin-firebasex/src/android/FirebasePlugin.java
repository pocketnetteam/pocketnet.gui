package org.apache.cordova.firebase;

import android.app.Activity;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.content.ContentResolver;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.media.RingtoneManager;
import android.net.Uri;
import android.media.AudioAttributes;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import android.util.Base64;
import android.util.Log;

import com.google.android.gms.tasks.TaskCompletionSource;
import com.google.firebase.auth.ActionCodeSettings;
import com.google.firebase.auth.EmailAuthCredential;
import com.google.firebase.auth.EmailAuthProvider;
import com.google.firebase.auth.FirebaseAuthMultiFactorException;
import com.google.firebase.auth.FirebaseUserMetadata;
import com.google.firebase.auth.MultiFactorAssertion;
import com.google.firebase.auth.MultiFactorInfo;
import com.google.firebase.auth.MultiFactorResolver;
import com.google.firebase.auth.MultiFactorSession;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneMultiFactorGenerator;
import com.google.firebase.auth.PhoneMultiFactorInfo;
import com.google.firebase.auth.UserInfo;
import com.google.firebase.crashlytics.FirebaseCrashlytics;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseApp;
import com.google.firebase.Timestamp;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.analytics.FirebaseAnalytics.ConsentType;
import com.google.firebase.analytics.FirebaseAnalytics.ConsentStatus;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.OAuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GetTokenResult;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.auth.OAuthProvider;
import com.google.firebase.auth.UserProfileChangeRequest;
import com.google.firebase.crashlytics.internal.metadata.UserMetadata;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.ListenerRegistration;
import com.google.firebase.firestore.MetadataChanges;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.firestore.Query.Direction;
import com.google.firebase.functions.FirebaseFunctions;
import com.google.firebase.functions.FirebaseFunctionsException;
import com.google.firebase.functions.HttpsCallableResult;
import com.google.firebase.installations.FirebaseInstallations;
import com.google.firebase.installations.InstallationTokenResult;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.remoteconfig.FirebaseRemoteConfig;
import com.google.firebase.remoteconfig.FirebaseRemoteConfigInfo;
import com.google.firebase.remoteconfig.FirebaseRemoteConfigSettings;
import com.google.firebase.remoteconfig.FirebaseRemoteConfigValue;
import com.google.firebase.perf.FirebasePerformance;
import com.google.firebase.perf.metrics.Trace;


import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Random;
import java.util.Set;
import java.util.List;
import java.util.Date;
import java.util.EnumMap;

// Firebase PhoneAuth
import java.util.concurrent.TimeUnit;

import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.FirebaseTooManyRequestsException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.reflect.TypeToken;


import static android.content.Context.MODE_PRIVATE;

public class FirebasePlugin extends CordovaPlugin {

    protected static FirebasePlugin instance = null;
    private FirebaseAnalytics mFirebaseAnalytics;
    private FirebaseCrashlytics firebaseCrashlytics;
    private FirebaseFirestore firestore;
    private FirebaseFunctions functions;
    private Gson gson;
    private FirebaseAuth.AuthStateListener authStateListener;
    private FirebaseAuth.IdTokenListener idTokenListener;
    private boolean authStateChangeListenerInitialized = false;
    private String currentIdToken;
    private static CordovaInterface cordovaInterface = null;
    protected static Context applicationContext = null;
    private static Activity cordovaActivity = null;

    protected static final String TAG = "FirebasePlugin";
    protected static final String JS_GLOBAL_NAMESPACE = "FirebasePlugin.";
    protected static final String KEY = "badge";
    protected static final int GOOGLE_SIGN_IN = 0x1;
    protected static final String SETTINGS_NAME = "settings";
    private static final String CRASHLYTICS_COLLECTION_ENABLED = "firebase_crashlytics_collection_enabled";
    private static final String ANALYTICS_COLLECTION_ENABLED = "firebase_analytics_collection_enabled";
    private static final String PERFORMANCE_COLLECTION_ENABLED = "firebase_performance_collection_enabled";

    private static final String GOOGLE_ANALYTICS_ADID_COLLECTION_ENABLED = "google_analytics_adid_collection_enabled";
    private static final String GOOGLE_ANALYTICS_DEFAULT_ALLOW_ANALYTICS_STORAGE = "google_analytics_default_allow_analytics_storage";
    private static final String GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_STORAGE = "firebase_performance_collectigoogle_analytics_default_allow_ad_storageon_enabled";
    private static final String GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_USER_DATA = "google_analytics_default_allow_ad_user_data";
    private static final String GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_PERSONALIZATION_SIGNALS = "google_analytics_default_allow_ad_personalization_signals";


    protected static final String POST_NOTIFICATIONS = "POST_NOTIFICATIONS";
    protected static final int POST_NOTIFICATIONS_PERMISSION_REQUEST_ID = 1;

    private static boolean inBackground = true;
    private static ArrayList<Bundle> notificationStack = null;
    private static CallbackContext notificationCallbackContext;
    private static CallbackContext tokenRefreshCallbackContext;
    private static CallbackContext activityResultCallbackContext;
    private static CallbackContext authResultCallbackContext;
    private static CallbackContext postNotificationPermissionRequestCallbackContext;

    private static NotificationChannel defaultNotificationChannel = null;
    public static String defaultChannelId = null;
    public static String defaultChannelName = null;

    private Map<String, AuthCredential> authCredentials = new HashMap<String, AuthCredential>();
    private Map<String, OAuthProvider> authProviders = new HashMap<String, OAuthProvider>();

    private Map<String, ListenerRegistration> firestoreListeners = new HashMap<String, ListenerRegistration>();

    private MultiFactorResolver multiFactorResolver = null;

    @Override
    protected void pluginInitialize() {
        instance = this;
        cordovaActivity = this.cordova.getActivity();
        applicationContext = cordovaActivity.getApplicationContext();
        final Bundle extras = cordovaActivity.getIntent().getExtras();
        FirebasePlugin.cordovaInterface = this.cordova;
        firebaseCrashlytics = FirebaseCrashlytics.getInstance();
        this.cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    Log.d(TAG, "Starting Firebase plugin");

                    if (getMetaDataFromManifest(CRASHLYTICS_COLLECTION_ENABLED)) {
                        setPreference(CRASHLYTICS_COLLECTION_ENABLED, true);
                    }

                    if (getMetaDataFromManifest(ANALYTICS_COLLECTION_ENABLED)) {
                        setPreference(ANALYTICS_COLLECTION_ENABLED, true);
                    }

                    if (getMetaDataFromManifest(PERFORMANCE_COLLECTION_ENABLED)) {
                        setPreference(PERFORMANCE_COLLECTION_ENABLED, true);
                    }

                    if (getMetaDataFromManifest(GOOGLE_ANALYTICS_ADID_COLLECTION_ENABLED)) {
                        setPreference(GOOGLE_ANALYTICS_ADID_COLLECTION_ENABLED, true);
                    }

                    if (getMetaDataFromManifest(GOOGLE_ANALYTICS_DEFAULT_ALLOW_ANALYTICS_STORAGE)) {
                        setPreference(GOOGLE_ANALYTICS_DEFAULT_ALLOW_ANALYTICS_STORAGE, true);
                    }

                    if (getMetaDataFromManifest(GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_STORAGE)) {
                        setPreference(GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_STORAGE, true);
                    }

                    if (getMetaDataFromManifest(GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_USER_DATA)) {
                        setPreference(GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_USER_DATA, true);
                    }

                    if (getMetaDataFromManifest(GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_PERSONALIZATION_SIGNALS)) {
                        setPreference(GOOGLE_ANALYTICS_DEFAULT_ALLOW_AD_PERSONALIZATION_SIGNALS, true);
                    }

                    FirebaseApp.initializeApp(applicationContext);
                    mFirebaseAnalytics = FirebaseAnalytics.getInstance(applicationContext);

                    authStateListener = new AuthStateListener();
                    FirebaseAuth.getInstance().addAuthStateListener(authStateListener);

                    idTokenListener = new IdTokenListener();
                    FirebaseAuth.getInstance().addIdTokenListener(idTokenListener);

                    firestore = FirebaseFirestore.getInstance();
                    functions = FirebaseFunctions.getInstance();

                    gson = new GsonBuilder()
                            .registerTypeAdapter(Double.class, new JsonSerializer<Double>() {
                                public JsonElement serialize(Double src, Type typeOfSrc, JsonSerializationContext context) {
                                    if (src.isNaN() || src.isInfinite())
                                        return new JsonPrimitive(src.toString());
                                    return new JsonPrimitive(src);
                                }
                            })
                            .create();

                    if (extras != null && extras.size() > 1) {
                        if (FirebasePlugin.notificationStack == null) {
                            FirebasePlugin.notificationStack = new ArrayList<Bundle>();
                        }
                        if (extras.containsKey("google.message_id")) {
                            extras.putString("messageType", "notification");
                            extras.putString("tap", "background");
                            notificationStack.add(extras);
                            Log.d(TAG, "Notification message found on init: " + extras.toString());
                        }
                    }
                    defaultChannelId = getStringResource("default_notification_channel_id");
                    defaultChannelName = getStringResource("default_notification_channel_name");
                    createDefaultChannel();
                } catch (Exception e) {
                    handleExceptionWithoutContext(e);
                }
            }
        });
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            switch (action) {
                case "getId":
                    this.getInstallationId(args, callbackContext);
                    break;
                case "getToken":
                    this.getToken(args, callbackContext);
                    break;
                case "hasPermission":
                    this.hasPermission(callbackContext);
                    break;
                case "grantPermission":
                    this.grantPermission(callbackContext);
                    break;
                case "subscribe":
                    this.subscribe(callbackContext, args.getString(0));
                    break;
                case "unsubscribe":
                    this.unsubscribe(callbackContext, args.getString(0));
                    break;
                case "isAutoInitEnabled":
                    this.isAutoInitEnabled(callbackContext);
                    break;
                case "setAutoInitEnabled":
                    this.setAutoInitEnabled(callbackContext, args.getBoolean(0));
                    break;
                case "unregister":
                    this.unregister(callbackContext);
                    break;
                case "onMessageReceived":
                    this.onMessageReceived(callbackContext);
                    break;
                case "onTokenRefresh":
                    this.onTokenRefresh(callbackContext);
                    break;
                case "logEvent":
                    this.logEvent(callbackContext, args.getString(0), args.getJSONObject(1));
                    break;
                case "logError":
                    this.logError(callbackContext, args);
                    break;
                case "setCrashlyticsUserId":
                    this.setCrashlyticsUserId(callbackContext, args.getString(0));
                    break;
                case "setScreenName":
                    this.setScreenName(callbackContext, args.getString(0));
                    break;
                case "setUserId":
                    this.setUserId(callbackContext, args.getString(0));
                    break;
                case "setUserProperty":
                    this.setUserProperty(callbackContext, args.getString(0), args.getString(1));
                    break;
                case "activateFetched":
                    this.activateFetched(callbackContext);
                    break;
                case "fetchAndActivate":
                    this.fetchAndActivate(callbackContext);
                    break;
                case "fetch":
                    if (args.length() > 0) {
                        this.fetch(callbackContext, args.getLong(0));
                    } else {
                        this.fetch(callbackContext);
                    }
                    break;
                case "resetRemoteConfig":
                    this.resetRemoteConfig(callbackContext);
                    break;
                case "getValue":
                    this.getValue(callbackContext, args.getString(0));
                    break;
                case "getInfo":
                    this.getInfo(callbackContext);
                    break;
                case "getAll":
                    this.getAll(callbackContext);
                    break;
                case "didCrashOnPreviousExecution":
                    this.didCrashOnPreviousExecution(callbackContext);
                    break;
                case "setConfigSettings":
                    this.setConfigSettings(callbackContext, args);
                    break;
                case "setDefaults":
                    this.setDefaults(callbackContext, args.getJSONObject(0));
                    break;
                case "verifyPhoneNumber":
                    this.verifyPhoneNumber(callbackContext, args);
                    break;
                case "enrollSecondAuthFactor":
                    this.enrollSecondAuthFactor(callbackContext, args);
                    break;
                case "verifySecondAuthFactor":
                    this.verifySecondAuthFactor(callbackContext, args);
                    break;
                case "listEnrolledSecondAuthFactors":
                    this.listEnrolledSecondAuthFactors(callbackContext, args);
                    break;
                case "unenrollSecondAuthFactor":
                    this.unenrollSecondAuthFactor(callbackContext, args);
                    break;
                case "setLanguageCode":
                    this.setLanguageCode(callbackContext, args);
                    break;
                case "authenticateUserWithGoogle":
                    this.authenticateUserWithGoogle(callbackContext, args);
                    break;
                case "authenticateUserWithApple":
                    this.authenticateUserWithApple(callbackContext, args);
                    break;
                case "authenticateUserWithMicrosoft":
                    this.authenticateUserWithMicrosoft(callbackContext, args);
                    break;
                case "authenticateUserWithFacebook":
                    this.authenticateUserWithFacebook(callbackContext, args);
                    break;
                case "authenticateUserWithOAuth":
                    this.authenticateUserWithOAuth(callbackContext, args);
                    break;
                case "createUserWithEmailAndPassword":
                    this.createUserWithEmailAndPassword(callbackContext, args);
                    break;
                case "signInUserWithEmailAndPassword":
                    this.signInUserWithEmailAndPassword(callbackContext, args);
                    break;
                case "authenticateUserWithEmailAndPassword":
                    this.authenticateUserWithEmailAndPassword(callbackContext, args);
                    break;
                case "signInUserWithCustomToken":
                    this.signInUserWithCustomToken(callbackContext, args);
                    break;
                case "signInUserAnonymously":
                    this.signInUserAnonymously(callbackContext);
                    break;
                case "signInWithCredential":
                    this.signInWithCredential(callbackContext, args);
                    break;
                case "linkUserWithCredential":
                    this.linkUserWithCredential(callbackContext, args);
                    break;
                case "unlinkUserWithProvider":
                    this.unlinkUserWithProvider(callbackContext, args);
                    break;
                case "reauthenticateWithCredential":
                    this.reauthenticateWithCredential(callbackContext, args);
                    break;
                case "isUserSignedIn":
                    this.isUserSignedIn(callbackContext, args);
                    break;
                case "signOutUser":
                    this.signOutUser(callbackContext, args);
                    break;
                case "getCurrentUser":
                    this.getCurrentUser(callbackContext, args);
                    break;
                case "reloadCurrentUser":
                    this.reloadCurrentUser(callbackContext, args);
                    break;
                case "updateUserProfile":
                    this.updateUserProfile(callbackContext, args);
                    break;
                case "updateUserEmail":
                    this.updateUserEmail(callbackContext, args);
                    break;
                case "sendUserEmailVerification":
                    this.sendUserEmailVerification(callbackContext, args);
                    break;
                case "verifyBeforeUpdateEmail":
                    this.verifyBeforeUpdateEmail(callbackContext, args);
                    break;
                case "updateUserPassword":
                    this.updateUserPassword(callbackContext, args);
                    break;
                case "sendUserPasswordResetEmail":
                    this.sendUserPasswordResetEmail(callbackContext, args);
                    break;
                case "deleteUser":
                    this.deleteUser(callbackContext, args);
                    break;
                case "useAuthEmulator":
                    this.useAuthEmulator(callbackContext, args);
                    break;
                case "getClaims":
                    this.getClaims(callbackContext, args);
                    break;
                case "startTrace":
                    this.startTrace(callbackContext, args.getString(0));
                    break;
                case "incrementCounter":
                    this.incrementCounter(callbackContext, args.getString(0), args.getString(1));
                    break;
                case "stopTrace":
                    this.stopTrace(callbackContext, args.getString(0));
                    break;
                case "setAnalyticsCollectionEnabled":
                    this.setAnalyticsCollectionEnabled(callbackContext, args.getBoolean(0));
                    break;
                case "isAnalyticsCollectionEnabled":
                    this.isAnalyticsCollectionEnabled(callbackContext);
                    break;
                case "setPerformanceCollectionEnabled":
                    this.setPerformanceCollectionEnabled(callbackContext, args.getBoolean(0));
                    break;
                case "isPerformanceCollectionEnabled":
                    this.isPerformanceCollectionEnabled(callbackContext);
                    break;
                case "setCrashlyticsCollectionEnabled":
                    this.setCrashlyticsCollectionEnabled(callbackContext, args.getBoolean(0));
                    break;
                case "isCrashlyticsCollectionEnabled":
                    this.isCrashlyticsCollectionEnabled(callbackContext);
                    break;
                case "setAnalyticsConsentMode":
                    this.setAnalyticsConsentMode(callbackContext, args.getJSONObject(0));
                    break;
                case "clearAllNotifications":
                    this.clearAllNotifications(callbackContext);
                    break;
                case "setCrashlyticsCustomKey":
                    this.setCrashlyticsCustomKey(callbackContext, args);
                    break;
                case "logMessage":
                    logMessage(args, callbackContext);
                    break;
                case "sendCrash":
                    sendCrash(args, callbackContext);
                    break;
                case "createChannel":
                    this.createChannel(callbackContext, args.getJSONObject(0));
                    break;
                case "deleteChannel":
                    this.deleteChannel(callbackContext, args.getString(0));
                    break;
                case "listChannels":
                    this.listChannels(callbackContext);
                    break;
                case "setDefaultChannel":
                    this.setDefaultChannel(callbackContext, args.getJSONObject(0));
                    break;
                case "addDocumentToFirestoreCollection":
                    this.addDocumentToFirestoreCollection(args, callbackContext);
                    break;
                case "setDocumentInFirestoreCollection":
                    this.setDocumentInFirestoreCollection(args, callbackContext);
                    break;
                case "updateDocumentInFirestoreCollection":
                    this.updateDocumentInFirestoreCollection(args, callbackContext);
                    break;
                case "deleteDocumentFromFirestoreCollection":
                    this.deleteDocumentFromFirestoreCollection(args, callbackContext);
                    break;
                case "documentExistsInFirestoreCollection":
                    this.documentExistsInFirestoreCollection(args, callbackContext);
                    break;
                case "fetchDocumentInFirestoreCollection":
                    this.fetchDocumentInFirestoreCollection(args, callbackContext);
                    break;
                case "fetchFirestoreCollection":
                    this.fetchFirestoreCollection(args, callbackContext);
                    break;
                case "listenToDocumentInFirestoreCollection":
                    this.listenToDocumentInFirestoreCollection(args, callbackContext);
                    break;
                case "listenToFirestoreCollection":
                    this.listenToFirestoreCollection(args, callbackContext);
                    break;
                case "removeFirestoreListener":
                    this.removeFirestoreListener(args, callbackContext);
                    break;
                case "functionsHttpsCallable":
                    this.functionsHttpsCallable(args, callbackContext);
                    break;
                case "grantCriticalPermission":
                case "hasCriticalPermission":
                case "setBadgeNumber":
                case "getBadgeNumber":
                    // Stubs for other platform methods
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, true));
                    break;
                case "deleteInstallationId":
                    this.deleteInstallationId(args, callbackContext);
                    break;
                case "getInstallationId":
                    this.getInstallationId(args, callbackContext);
                    break;
                case "getInstallationToken":
                    this.getInstallationToken(args, callbackContext);
                    break;
                default:
                    callbackContext.error("Invalid action: " + action);
                    return false;
            }
        } catch (Exception e) {
            handleExceptionWithContext(e, callbackContext);
            return false;
        }
        return true;
    }

    @Override
    public void onPause(boolean multitasking) {
        FirebasePlugin.inBackground = true;
    }

    @Override
    public void onResume(boolean multitasking) {
        FirebasePlugin.inBackground = false;
    }

    @Override
    public void onReset() {
        FirebasePlugin.notificationCallbackContext = null;
        FirebasePlugin.tokenRefreshCallbackContext = null;
        FirebasePlugin.activityResultCallbackContext = null;
        FirebasePlugin.authResultCallbackContext = null;
    }

    @Override
    public void onDestroy() {
        FirebaseAuth.getInstance().removeAuthStateListener(authStateListener);
        instance = null;
        cordovaActivity = null;
        cordovaInterface = null;
        applicationContext = null;
        super.onDestroy();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        try {
            switch (requestCode) {
                case GOOGLE_SIGN_IN:

                    FirebasePlugin.activityResultCallbackContext.error("deprecated");
                   
                    break;
            }
        } catch (Exception e) {
            handleExceptionWithContext(e, FirebasePlugin.activityResultCallbackContext);
        }
    }

    /**
     * Get a string from resources without importing the .R package
     *
     * @param name Resource Name
     * @return Resource
     */
    private String getStringResource(String name) {
        return applicationContext.getString(
                applicationContext.getResources().getIdentifier(
                        name, "string", applicationContext.getPackageName()
                )
        );
    }

    private void onMessageReceived(final CallbackContext callbackContext) {
        FirebasePlugin.notificationCallbackContext = callbackContext;
        if (FirebasePlugin.notificationStack != null) {
            for (Bundle bundle : FirebasePlugin.notificationStack) {
                FirebasePlugin.sendMessage(bundle, applicationContext);
            }
            FirebasePlugin.notificationStack.clear();
        }
    }

    private void onTokenRefresh(final CallbackContext callbackContext) {
        FirebasePlugin.tokenRefreshCallbackContext = callbackContext;

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseMessaging.getInstance().getToken().addOnCompleteListener(new OnCompleteListener<String>() {
                        @Override
                        public void onComplete(@NonNull Task<String> task) {
                            try {
                                if (task.isSuccessful() || task.getException() == null) {
                                    String currentToken = task.getResult();
                                    if (currentToken != null) {
                                        FirebasePlugin.sendToken(currentToken);
                                    }
                                } else if (task.getException() != null) {
                                    callbackContext.error(task.getException().getMessage());
                                } else {
                                    callbackContext.error("Task failed for unknown reason");
                                }
                            } catch (Exception e) {
                                handleExceptionWithContext(e, callbackContext);
                            }
                        }

                        ;
                    });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public static void sendMessage(Bundle bundle, Context context) {
        if (!FirebasePlugin.hasNotificationsCallback()) {
            String packageName = context.getPackageName();
            if (FirebasePlugin.notificationStack == null) {
                FirebasePlugin.notificationStack = new ArrayList<Bundle>();
            }
            notificationStack.add(bundle);

            return;
        }

        final CallbackContext callbackContext = FirebasePlugin.notificationCallbackContext;
        if (bundle != null) {
            // Pass the message bundle to the receiver manager so any registered receivers can decide to handle it
            boolean wasHandled = FirebasePluginMessageReceiverManager.sendMessage(bundle);
            if (wasHandled) {
                Log.d(TAG, "Message bundle was handled by a registered receiver");
            } else if (callbackContext != null) {
                JSONObject json = new JSONObject();
                Set<String> keys = bundle.keySet();
                for (String key : keys) {
                    try {
                        json.put(key, bundle.get(key));
                    } catch (JSONException e) {
                        handleExceptionWithContext(e, callbackContext);
                        return;
                    }
                }
                FirebasePlugin.instance.sendPluginResultAndKeepCallback(json, callbackContext);
            }
        }
    }

    public static void sendToken(String token) {
        if (FirebasePlugin.tokenRefreshCallbackContext == null) {
            return;
        }

        final CallbackContext callbackContext = FirebasePlugin.tokenRefreshCallbackContext;
        if (callbackContext != null && token != null) {
            FirebasePlugin.instance.sendPluginResultAndKeepCallback(token, callbackContext);
        }
    }

    public static boolean inBackground() {
        return FirebasePlugin.inBackground;
    }

    public static boolean hasNotificationsCallback() {
        return FirebasePlugin.notificationCallbackContext != null;
    }

    @Override
    public void onNewIntent(Intent intent) {
        try {
            super.onNewIntent(intent);
            final Bundle data = intent.getExtras();
            if (data != null && data.containsKey("google.message_id")) {
                data.putString("messageType", "notification");
                data.putString("tap", "background");
                Log.d(TAG, "Notification message on new intent: " + data.toString());
                FirebasePlugin.sendMessage(data, applicationContext);
            }
        } catch (Exception e) {
            handleExceptionWithoutContext(e);
        }
    }


    private void getToken(JSONArray args, final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseMessaging.getInstance().getToken().addOnCompleteListener(new OnCompleteListener<String>() {
                        @Override
                        public void onComplete(@NonNull Task<String> task) {
                            try {
                                if (task.isSuccessful() || task.getException() == null) {
                                    String currentToken = task.getResult();
                                    callbackContext.success(currentToken);
                                } else if (task.getException() != null) {
                                    callbackContext.error(task.getException().getMessage());
                                } else {
                                    callbackContext.error("Task failed for unknown reason");
                                }
                            } catch (Exception e) {
                                handleExceptionWithContext(e, callbackContext);
                            }
                        }

                        ;
                    });

                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void hasPermission(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    NotificationManagerCompat notificationManagerCompat = NotificationManagerCompat.from(cordovaActivity);
                    boolean areNotificationsEnabled = notificationManagerCompat.areNotificationsEnabled();

                    boolean hasRuntimePermission = true;
                    if (Build.VERSION.SDK_INT >= 33) { // Android 13+
                        hasRuntimePermission = hasRuntimePermission(POST_NOTIFICATIONS);
                    }

                    callbackContext.success(conformBooleanForPluginResult(areNotificationsEnabled && hasRuntimePermission));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void grantPermission(final CallbackContext callbackContext) {
        CordovaPlugin plugin = this;
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (Build.VERSION.SDK_INT >= 33) { // Android 13+
                        boolean hasRuntimePermission = hasRuntimePermission(POST_NOTIFICATIONS);
                        if (!hasRuntimePermission) {
                            String[] permissions = new String[]{qualifyPermission(POST_NOTIFICATIONS)};
                            postNotificationPermissionRequestCallbackContext = callbackContext;
                            requestPermissions(plugin, POST_NOTIFICATIONS_PERMISSION_REQUEST_ID, permissions);
                            sendEmptyPluginResultAndKeepCallback(callbackContext);
                        }
                    } else {
                        // No runtime permission required on Android 12 and below
                        callbackContext.success(1);
                    }

                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void subscribe(final CallbackContext callbackContext, final String topic) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcome(FirebaseMessaging.getInstance().subscribeToTopic(topic), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void unsubscribe(final CallbackContext callbackContext, final String topic) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcome(FirebaseMessaging.getInstance().unsubscribeFromTopic(topic), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void unregister(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcome(FirebaseMessaging.getInstance().deleteToken(), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void isAutoInitEnabled(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    boolean isEnabled = FirebaseMessaging.getInstance().isAutoInitEnabled();
                    callbackContext.success(conformBooleanForPluginResult(isEnabled));
                } catch (Exception e) {
                    logExceptionToCrashlytics(e);
                    callbackContext.error(e.getMessage());
                }
            }
        });
    }

    private void setAutoInitEnabled(final CallbackContext callbackContext, final boolean enabled) {
        final FirebasePlugin self = this;
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseMessaging.getInstance().setAutoInitEnabled(enabled);
                    callbackContext.success();
                } catch (Exception e) {
                    logExceptionToCrashlytics(e);
                    e.printStackTrace();
                    callbackContext.error(e.getMessage());
                }
            }
        });
    }

    private Bundle createBundleFromJSONObject(final JSONObject params) throws JSONException {
        final Bundle bundle = new Bundle();
        Iterator<String> iter = params.keys();
        while (iter.hasNext()) {
            String key = iter.next();
            Object obj = params.get(key);
            if (obj instanceof Integer) {
                bundle.putInt(key, (Integer) obj);
            } else if (obj instanceof Double) {
                bundle.putDouble(key, (Double) obj);
            } else if (obj instanceof Float) {
                bundle.putFloat(key, (Float) obj);
            } else if (obj instanceof JSONObject) {
                Bundle item = this.createBundleFromJSONObject((JSONObject) obj);
                bundle.putBundle(key, item);
            } else if (obj instanceof JSONArray) {
                JSONArray objArr = (JSONArray) obj;
                ArrayList<Bundle> bundleArray = new ArrayList<Bundle>(objArr.length());
                for (int idx = 0; idx < objArr.length(); idx++) {
                    Object tmp = objArr.get(idx);
                    if (tmp instanceof JSONObject) {
                        Bundle item = createBundleFromJSONObject(objArr.getJSONObject(idx));
                        bundleArray.add(item);
                    }
                }
                bundle.putParcelableArrayList(key, bundleArray);
            } else {
                bundle.putString(key, obj.toString());
            }
        }
        return bundle;
    }

    private void logEvent(final CallbackContext callbackContext, final String name, final JSONObject params)
            throws JSONException {
        final Bundle bundle = this.createBundleFromJSONObject(params);

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    mFirebaseAnalytics.logEvent(name, bundle);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void logError(final CallbackContext callbackContext, final JSONArray args) throws JSONException {
        final String message = args.getString(0);

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (isCrashlyticsEnabled()) {
                        // We can optionally be passed a stack trace generated by stacktrace.js.
                        if (args.length() == 2) {
                            JSONArray stackTrace = args.getJSONArray(1);
                            StackTraceElement[] trace = new StackTraceElement[stackTrace.length()];
                            for (int i = 0; i < stackTrace.length(); i++) {
                                JSONObject elem = stackTrace.getJSONObject(i);
                                trace[i] = new StackTraceElement(
                                        "",
                                        elem.optString("functionName", "(anonymous function)"),
                                        elem.optString("fileName", "(unknown file)"),
                                        elem.optInt("lineNumber", -1)
                                );
                            }

                            Exception e = new JavaScriptException(message);
                            e.setStackTrace(trace);
                            logExceptionToCrashlytics(e);
                        } else {
                            logExceptionToCrashlytics(new JavaScriptException(message));
                        }

                        Log.e(TAG, message);
                        callbackContext.success(1);
                    } else {
                        callbackContext.error("Cannot log error - Crashlytics collection is disabled");
                    }
                } catch (Exception e) {
                    logExceptionToCrashlytics(e);
                    callbackContext.error(e.getMessage());
                }
            }
        });
    }

    private void setCrashlyticsCustomKey(final CallbackContext callbackContext, final JSONArray data) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                if (isCrashlyticsEnabled()) {
                    try {
                        Object value = data.get(1);
                        // Floats can be omitted since they're not passed through JSONArray
                        if (value instanceof Integer) {
                            firebaseCrashlytics.setCustomKey(data.getString(0), data.getInt(1));
                            callbackContext.success();
                        } else if (value instanceof Double) {
                            firebaseCrashlytics.setCustomKey(data.getString(0), data.getDouble(1));
                            callbackContext.success();
                        } else if (value instanceof Long) {
                            firebaseCrashlytics.setCustomKey(data.getString(0), data.getLong(1));
                            callbackContext.success();
                        } else if (value instanceof String) {
                            firebaseCrashlytics.setCustomKey(data.getString(0), data.getString(1));
                            callbackContext.success();
                        } else if (value instanceof Boolean) {
                            firebaseCrashlytics.setCustomKey(data.getString(0), data.getBoolean(1));
                            callbackContext.success();
                        } else {
                            callbackContext.error("Cannot set custom key - Value is not an acceptable type");
                        }
                    } catch (Exception e) {
                        handleExceptionWithContext(e, callbackContext);
                    }
                } else {
                    callbackContext.error("Cannot set custom key - Crashlytics collection is disabled");
                }
            }
        });
    }

    private void logMessage(final JSONArray data,
                            final CallbackContext callbackContext) {

        if (isCrashlyticsEnabled()) {
            String message = data.optString(0);
            logMessageToCrashlytics(message);
            callbackContext.success();
        } else {
            callbackContext.error("Cannot log message - Crashlytics collection is disabled");
        }
    }

    private void sendCrash(final JSONArray data,
                           final CallbackContext callbackContext) {

        cordovaActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                throw new RuntimeException("This is a crash");
            }
        });
    }


    private void setCrashlyticsUserId(final CallbackContext callbackContext, final String userId) {
        cordovaActivity.runOnUiThread(new Runnable() {
            public void run() {
                try {
                    if (isCrashlyticsEnabled()) {
                        firebaseCrashlytics.setUserId(userId);
                        callbackContext.success();
                    } else {
                        callbackContext.error("Cannot set Crashlytics user ID - Crashlytics collection is disabled");
                    }
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void setScreenName(final CallbackContext callbackContext, final String name) {
        // This must be called on the main thread
        cordovaActivity.runOnUiThread(new Runnable() {
            public void run() {
                try {
                    Bundle bundle = new Bundle();
                    bundle.putString(FirebaseAnalytics.Param.SCREEN_NAME, name);
                    mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW, bundle);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void setUserId(final CallbackContext callbackContext, final String id) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    mFirebaseAnalytics.setUserId(id);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void setUserProperty(final CallbackContext callbackContext, final String name, final String value) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    mFirebaseAnalytics.setUserProperty(name, value);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void fetch(CallbackContext callbackContext) {
        fetch(callbackContext, FirebaseRemoteConfig.getInstance().fetch());
    }

    private void fetch(CallbackContext callbackContext, long cacheExpirationSeconds) {
        fetch(callbackContext, FirebaseRemoteConfig.getInstance().fetch(cacheExpirationSeconds));
    }

    private void fetch(final CallbackContext callbackContext, final Task<Void> task) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcome(task, callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void activateFetched(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcomeWithBooleanResult(FirebaseRemoteConfig.getInstance().activate(), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void fetchAndActivate(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcomeWithBooleanResult(FirebaseRemoteConfig.getInstance().fetchAndActivate(), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void resetRemoteConfig(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcome(FirebaseRemoteConfig.getInstance().reset(), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void getValue(final CallbackContext callbackContext, final String key) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseRemoteConfigValue value = FirebaseRemoteConfig.getInstance().getValue(key);
                    callbackContext.success(value.asString());
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void getInfo(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseRemoteConfigInfo remoteConfigInfo = FirebaseRemoteConfig.getInstance().getInfo();
                    JSONObject info = new JSONObject();

                    JSONObject settings = new JSONObject();
                    info.put("configSettings", settings);

                    info.put("fetchTimeMillis", remoteConfigInfo.getFetchTimeMillis());
                    info.put("lastFetchStatus", remoteConfigInfo.getLastFetchStatus());

                    callbackContext.success(info);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void getAll(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    Map<String, FirebaseRemoteConfigValue> nativeValues = FirebaseRemoteConfig.getInstance().getAll();
                    JSONObject jsonValues = new JSONObject();

                    for (Map.Entry<String, FirebaseRemoteConfigValue> entry : nativeValues.entrySet()) {
                        String key = entry.getKey();
                        FirebaseRemoteConfigValue value = entry.getValue();
                        jsonValues.put(key, value.asString());
                    }
                    callbackContext.success(jsonValues);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void setConfigSettings(final CallbackContext callbackContext, final JSONArray args) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseRemoteConfigSettings.Builder settings = new FirebaseRemoteConfigSettings.Builder();

                    if (args.get(0) != null) {
                        settings.setFetchTimeoutInSeconds(args.getLong(0));
                    }

                    if (args.get(1) != null) {
                        settings.setMinimumFetchIntervalInSeconds(args.getLong(1));
                    }

                    handleTaskOutcome(FirebaseRemoteConfig.getInstance().setConfigSettingsAsync(settings.build()), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void setDefaults(final CallbackContext callbackContext, final JSONObject defaults) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcome(FirebaseRemoteConfig.getInstance().setDefaultsAsync(defaultsToMap(defaults)), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void didCrashOnPreviousExecution(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                if (isCrashlyticsEnabled()) {
                    try {
                        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, firebaseCrashlytics.didCrashOnPreviousExecution()));
                    } catch (Exception e) {
                        handleExceptionWithContext(e, callbackContext);
                    }
                } else {
                    callbackContext.error("Cannot query didCrashOnPreviousExecution - Crashlytics collection is disabled");
                }
            }
        });
    }

    private static Map<String, Object> defaultsToMap(JSONObject object) throws JSONException {
        final Map<String, Object> map = new HashMap<String, Object>();

        for (Iterator<String> keys = object.keys(); keys.hasNext(); ) {
            String key = keys.next();
            Object value = object.get(key);

            if (value instanceof Integer) {
                //setDefaults() should take Longs
                value = new Long((Integer) value);
            } else if (value instanceof JSONArray) {
                JSONArray array = (JSONArray) value;
                if (array.length() == 1 && array.get(0) instanceof String) {
                    //parse byte[] as Base64 String
                    value = Base64.decode(array.getString(0), Base64.DEFAULT);
                } else {
                    //parse byte[] as numeric array
                    byte[] bytes = new byte[array.length()];
                    for (int i = 0; i < array.length(); i++)
                        bytes[i] = (byte) array.getInt(i);
                    value = bytes;
                }
            }

            map.put(key, value);
        }
        return map;
    }


    public void isUserSignedIn(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    boolean isSignedIn = FirebaseAuth.getInstance().getCurrentUser() != null;
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, isSignedIn));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void signOutUser(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {

                callbackContext.error("deprecated");

                
            }
        });
    }

    public void getCurrentUser(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    extractAndReturnUserInfo(callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void reloadCurrentUser(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    user.reload()
                            .addOnSuccessListener(new OnSuccessListener<Void>() {
                                @Override
                                public void onSuccess(Void aVoid) {
                                    try {
                                        extractAndReturnUserInfo(callbackContext);
                                    } catch (Exception e) {
                                        handleExceptionWithContext(e, callbackContext);
                                    }
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void extractAndReturnUserInfo(final CallbackContext callbackContext) throws Exception {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        JSONObject returnResults = new JSONObject();
        returnResults.put("name", user.getDisplayName());
        returnResults.put("email", user.getEmail());
        returnResults.put("emailIsVerified", user.isEmailVerified());
        returnResults.put("phoneNumber", user.getPhoneNumber());
        returnResults.put("photoUrl", user.getPhotoUrl() == null ? null : user.getPhotoUrl().toString());
        returnResults.put("uid", user.getUid());
        returnResults.put("isAnonymous", user.isAnonymous());

        FirebaseUserMetadata metadata = user.getMetadata();
        if (metadata != null) {
            returnResults.put("creationTimestamp", metadata.getCreationTimestamp());
            returnResults.put("lastSignInTimestamp", metadata.getLastSignInTimestamp());
        }

        List<? extends UserInfo> providerData = user.getProviderData();
        JSONArray providersJson = new JSONArray();
        for (UserInfo userInfo : providerData) {
            JSONObject userInfoJson = new JSONObject();
            userInfoJson.put("providerId", userInfo.getProviderId());
            userInfoJson.put("uid", userInfo.getUid());
            userInfoJson.put("displayName", userInfo.getDisplayName());
            userInfoJson.put("email", userInfo.getEmail());
            userInfoJson.put("phoneNumber", userInfo.getPhoneNumber());
            userInfoJson.put("photoUrl", userInfo.getPhotoUrl());
            providersJson.put(userInfoJson);
        }
        returnResults.put("providers", providersJson);

        user.getIdToken(true).addOnSuccessListener(new OnSuccessListener<GetTokenResult>() {
            @Override
            public void onSuccess(GetTokenResult result) {
                try {
                    String idToken = result.getToken();
                    returnResults.put("idToken", idToken);
                    returnResults.put("providerId", result.getSignInProvider());
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, returnResults));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }

        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                // Something went wrong getting ID and provider ID token so return other user data
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, returnResults));
                handleExceptionWithoutContext(e);
            }
        });
    }

    public void updateUserProfile(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    JSONObject profile = args.getJSONObject(0);
                    UserProfileChangeRequest profileUpdates;
                    if (profile.has("name") && profile.has("photoUri")) {
                        profileUpdates = new UserProfileChangeRequest.Builder()
                                .setDisplayName(profile.getString("name"))
                                .setPhotoUri(Uri.parse(profile.getString("photoUri")))
                                .build();
                    } else if (profile.has("name")) {
                        profileUpdates = new UserProfileChangeRequest.Builder()
                                .setDisplayName(profile.getString("name"))
                                .build();
                    } else if (profile.has("photoUri")) {
                        profileUpdates = new UserProfileChangeRequest.Builder()
                                .setPhotoUri(Uri.parse(profile.getString("photoUri")))
                                .build();
                    } else {
                        callbackContext.error("'name' and/or 'photoUri' keys must be specified in the profile object");
                        return;
                    }

                    handleTaskOutcome(user.updateProfile(profileUpdates), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void updateUserEmail(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

                    String email = args.getString(0);
                    handleTaskOutcome(user.updateEmail(email), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void sendUserEmailVerification(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

                    if (!args.isNull(0)) {
                        JSONObject actionCodeSettingsParams = args.getJSONObject(0);
                        ActionCodeSettings actionCodeSettings = ActionCodeSettings.newBuilder()
                                .setUrl(actionCodeSettingsParams.getString("url"))
                                .setDynamicLinkDomain(actionCodeSettingsParams.optString("dynamicLinkDomain"))
                                .setHandleCodeInApp(actionCodeSettingsParams.optBoolean("handleCodeInApp"))
                                .setIOSBundleId(actionCodeSettingsParams.optString("iosBundleId"))
                                .setAndroidPackageName(actionCodeSettingsParams.optString("androidPackageName"),
                                        actionCodeSettingsParams.optBoolean("installIfNotAvailable"),
                                        actionCodeSettingsParams.optString("minimumVersion"))
                                .build();
                        handleTaskOutcome(user.sendEmailVerification(actionCodeSettings), callbackContext);
                    } else {
                        handleTaskOutcome(user.sendEmailVerification(), callbackContext);
                    }

                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void verifyBeforeUpdateEmail(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

                    String email = args.getString(0);
                    handleTaskOutcome(user.verifyBeforeUpdateEmail(email), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void updateUserPassword(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

                    String password = args.getString(0);
                    handleTaskOutcome(user.updatePassword(password), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void sendUserPasswordResetEmail(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseAuth auth = FirebaseAuth.getInstance();
                    String email = args.getString(0);
                    handleTaskOutcome(auth.sendPasswordResetEmail(email), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void deleteUser(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    handleTaskOutcome(user.delete(), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void reauthenticateWithCredential(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    JSONObject jsonCredential = args.getJSONObject(0);
                    if (!FirebasePlugin.instance.isValidJsonCredential(jsonCredential)) {
                        callbackContext.error("No auth credentials specified");
                        return;
                    }

                    AuthCredential authCredential = FirebasePlugin.instance.obtainAuthCredential(jsonCredential);
                    if (authCredential != null) {
                        handleAuthTaskOutcome(user.reauthenticateAndRetrieveData(authCredential), callbackContext);
                        return;
                    }

                    OAuthProvider authProvider = FirebasePlugin.instance.obtainAuthProvider(jsonCredential);
                    if (authProvider != null) {
                        FirebasePlugin.instance.authResultCallbackContext = callbackContext;
                        user.startActivityForReauthenticateWithProvider(FirebasePlugin.cordovaActivity, authProvider)
                                .addOnSuccessListener(new AuthResultOnSuccessListener())
                                .addOnFailureListener(new AuthResultOnFailureListener());
                        return;
                    }

                    //ELSE
                    callbackContext.error("Specified native auth credential id does not exist");

                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }


    public void signInWithCredential(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    JSONObject jsonCredential = args.getJSONObject(0);
                    if (!FirebasePlugin.instance.isValidJsonCredential(jsonCredential)) {
                        callbackContext.error("No auth credentials specified");
                        return;
                    }

                    AuthCredential authCredential = FirebasePlugin.instance.obtainAuthCredential(jsonCredential);
                    if (authCredential != null) {
                        FirebaseAuth.getInstance().signInWithCredential(authCredential).addOnCompleteListener(cordova.getActivity(), new AuthResultOnCompleteListener(callbackContext));
                        return;
                    }

                    OAuthProvider authProvider = FirebasePlugin.instance.obtainAuthProvider(jsonCredential);
                    if (authProvider != null) {
                        FirebasePlugin.instance.authResultCallbackContext = callbackContext;
                        FirebaseAuth.getInstance().startActivityForSignInWithProvider(FirebasePlugin.cordovaActivity, authProvider)
                                .addOnSuccessListener(new AuthResultOnSuccessListener())
                                .addOnFailureListener(new AuthResultOnFailureListener());
                        return;
                    }

                    //ELSE
                    callbackContext.error("Specified native auth credential id does not exist");
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void linkUserWithCredential(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    JSONObject jsonCredential = args.getJSONObject(0);
                    if (!FirebasePlugin.instance.isValidJsonCredential(jsonCredential)) {
                        callbackContext.error("No auth credentials specified");
                        return;
                    }

                    AuthCredential authCredential = FirebasePlugin.instance.obtainAuthCredential(jsonCredential);
                    if (authCredential != null) {
                        FirebaseAuth.getInstance().getCurrentUser().linkWithCredential(authCredential).addOnCompleteListener(cordova.getActivity(), new AuthResultOnCompleteListener(callbackContext));
                        return;
                    }

                    OAuthProvider authProvider = FirebasePlugin.instance.obtainAuthProvider(jsonCredential);
                    if (authProvider != null) {
                        FirebasePlugin.instance.authResultCallbackContext = callbackContext;
                        FirebaseAuth.getInstance().getCurrentUser().startActivityForLinkWithProvider(FirebasePlugin.cordovaActivity, authProvider)
                                .addOnSuccessListener(new AuthResultOnSuccessListener())
                                .addOnFailureListener(new AuthResultOnFailureListener());
                        return;
                    }

                    //ELSE
                    callbackContext.error("Specified native auth credential id does not exist");

                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void unlinkUserWithProvider(final CallbackContext callbackContext, final JSONArray args){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    if(user == null){
                        callbackContext.error("No user is currently signed in");
                        return;
                    }

                    String providerId = args.getString(0);
                    user.unlink(providerId).addOnCompleteListener(cordova.getActivity(), new AuthResultOnCompleteListener(callbackContext));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private boolean isValidJsonCredential(JSONObject jsonCredential) throws JSONException {
        return jsonCredential.has("id") || (jsonCredential.has("verificationId") && jsonCredential.has("code"));
    }

    private PhoneAuthProvider.OnVerificationStateChangedCallbacks phoneAuthVerificationCallbacks;

    public void verifyPhoneNumber(
            final CallbackContext callbackContext,
            final JSONArray args
    ) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    phoneAuthVerificationCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
                        @Override
                        public void onVerificationCompleted(PhoneAuthCredential credential) {
                            try {
                                // This callback will be invoked in two situations:
                                // 1 - Instant verification. In some cases the phone number can be instantly
                                //     verified without needing to send or enter a verification code.
                                // 2 - Auto-retrieval. On some devices Google Play services can automatically
                                //     detect the incoming verification SMS and perform verification without
                                //     user action.
                                Log.d(TAG, "success: verifyPhoneNumber.onVerificationCompleted");

                                String id = FirebasePlugin.instance.saveAuthCredential((AuthCredential) credential);

                                JSONObject returnResults = new JSONObject();
                                returnResults.put("instantVerification", true);
                                returnResults.put("id", id);

                                sendPluginResultAndKeepCallback(returnResults, callbackContext);
                            } catch (Exception ex) {
                                handleExceptionWithContext(ex, callbackContext);
                            }
                        }

                        @Override
                        public void onVerificationFailed(FirebaseException e) {
                            try {
                                // This callback is invoked in an invalid request for verification is made,
                                // for instance if the the phone number format is not valid.
                                Log.w(TAG, "failed: verifyPhoneNumber.onVerificationFailed ", e);

                                String errorMsg;
                                if (e instanceof FirebaseAuthInvalidCredentialsException) {
                                    // Invalid request
                                    errorMsg = "Invalid phone number";
                                } else if (e instanceof FirebaseTooManyRequestsException) {
                                    // The SMS quota for the project has been exceeded
                                    errorMsg = "The SMS quota for the project has been exceeded";
                                } else {
                                    errorMsg = e.getMessage();
                                }
                                callbackContext.error(errorMsg);
                            } catch (Exception ex) {
                                handleExceptionWithContext(ex, callbackContext);
                            }
                        }

                        @Override
                        public void onCodeSent(String verificationId, PhoneAuthProvider.ForceResendingToken token) {
                            try {
                                // The SMS verification code has been sent to the provided phone number, we
                                // now need to ask the user to enter the code and then construct a credential
                                // by combining the code with a verification ID [(in app)].
                                Log.d(TAG, "success: verifyPhoneNumber.onCodeSent");

                                JSONObject returnResults = new JSONObject();
                                try {
                                    returnResults.put("verificationId", verificationId);
                                    returnResults.put("instantVerification", false);
                                } catch (JSONException e) {
                                    handleExceptionWithContext(e, callbackContext);
                                    return;
                                }
                                sendPluginResultAndKeepCallback(returnResults, callbackContext);
                            } catch (Exception ex) {
                                handleExceptionWithContext(ex, callbackContext);
                            }
                        }
                    };

                    // Extract plugin inputs
                    String number = args.getString(0);
                    JSONObject opts = args.getJSONObject(1);

                    int timeOutDuration = 30;
                    if (opts.has("timeOutDuration")) {
                        timeOutDuration = opts.getInt("timeOutDuration");
                    }

                    String fakeVerificationCode = null;
                    if (opts.has("fakeVerificationCode")) {
                        fakeVerificationCode = opts.getString("fakeVerificationCode");
                    }
                    boolean requireSmsValidation = false;
                    if (opts.has("requireSmsValidation")) {
                        requireSmsValidation = opts.getBoolean("requireSmsValidation");
                    }

                    if (fakeVerificationCode != null && !fakeVerificationCode.equals("null")) {
                        Log.d(TAG, "verifyPhoneNumber: using mock instant verification for test phone number");
                        FirebaseAuth.getInstance().getFirebaseAuthSettings().setAutoRetrievedSmsCodeForPhoneNumber(number, fakeVerificationCode);
                    }

                    PhoneAuthOptions phoneAuthOptions =
                            PhoneAuthOptions.newBuilder()
                                    .setPhoneNumber(number)
                                    .setTimeout((long) timeOutDuration, TimeUnit.SECONDS)
                                    .setCallbacks(phoneAuthVerificationCallbacks)
                                    .setActivity(cordovaActivity)
                                    .requireSmsValidation(requireSmsValidation)
                                    .build();
                    PhoneAuthProvider.verifyPhoneNumber(phoneAuthOptions);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    interface OnReceivePhoneAuthCredential {
        public void onCredential(PhoneAuthCredential credential);
    }

    public void enrollSecondAuthFactor(
            final CallbackContext callbackContext,
            final JSONArray args
    ) {

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;

                    // Extract plugin inputs
                    String phoneNumber = args.getString(0);
                    JSONObject opts = args.getJSONObject(1);

                    int timeOutDuration = 30;
                    if (opts.has("timeOutDuration")) {
                        timeOutDuration = opts.getInt("timeOutDuration");
                    }

                    String fakeVerificationCode = null;
                    if (opts.has("fakeVerificationCode")) {
                        fakeVerificationCode = opts.getString("fakeVerificationCode");
                    }
                    boolean requireSmsValidation = false;
                    if (opts.has("requireSmsValidation")) {
                        requireSmsValidation = opts.getBoolean("requireSmsValidation");
                    }

                    String displayName = opts.getString("displayName");

                    String verificationId = null;
                    String verificationCode = null;
                    if (opts.has("credential")) {
                        JSONObject jsonCredential = opts.getJSONObject("credential");
                        if (jsonCredential.has("verificationId") && jsonCredential.has("code")) {
                            verificationId = jsonCredential.getString("verificationId");
                            verificationCode = jsonCredential.getString("code");
                        } else {
                            callbackContext.error("'verificationId' and/or 'code' properties not found on 'credential' object");
                            return;
                        }
                    }

                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

                    // Handler for credential enrollment
                    String finalDisplayName = displayName;
                    OnReceivePhoneAuthCredential credentialReceiver = (PhoneAuthCredential credential) -> {
                        try {
                            // Complete enrollment. This will update the underlying tokens
                            // and trigger ID token change listener.
                            MultiFactorAssertion multiFactorAssertion = PhoneMultiFactorGenerator.getAssertion(credential);
                            user.getMultiFactor()
                                    .enroll(multiFactorAssertion, finalDisplayName)
                                    .addOnCompleteListener(
                                            task -> {
                                                try {
                                                    handleTaskOutcome(task, callbackContext);
                                                } catch (Exception e) {
                                                    handleExceptionWithContext(e, callbackContext);
                                                }
                                            }
                                    );
                        } catch (Exception e) {
                            handleExceptionWithContext(e, callbackContext);
                        }
                    };

                    // Arguments contain ID & code from manual SMS verification, so use this for enrollment
                    if (verificationId != null) {
                        PhoneAuthCredential credential = PhoneAuthProvider.getCredential(verificationId, verificationCode);
                        credentialReceiver.onCredential(credential);
                        return;
                    }

                    /*
                     * Phone verification flow
                     */
                    // Create phone verification callbacks
                    phoneAuthVerificationCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
                        @Override
                        public void onVerificationCompleted(PhoneAuthCredential credential) {
                            try {
                                // This callback will be invoked in two situations:
                                // 1 - Instant verification. In some cases the phone number can be instantly
                                //     verified without needing to send or enter a verification code.
                                // 2 - Auto-retrieval. On some devices Google Play services can automatically
                                //     detect the incoming verification SMS and perform verification without
                                //     user action.
                                Log.d(TAG, "success: enrollSecondAuthFactor.onVerificationCompleted");
                                credentialReceiver.onCredential(credential);

                            } catch (Exception e) {
                                handleExceptionWithContext(e, callbackContext);
                            }
                        }

                        @Override
                        public void onVerificationFailed(FirebaseException e) {
                            try {
                                // This callback is invoked in an invalid request for verification is made,
                                // for instance if the the phone number format is not valid.
                                Log.w(TAG, "failed: enrollSecondAuthFactor.onVerificationFailed ", e);

                                String errorMsg;
                                if (e instanceof FirebaseAuthInvalidCredentialsException) {
                                    // Invalid request
                                    errorMsg = "Invalid phone number";
                                } else if (e instanceof FirebaseTooManyRequestsException) {
                                    // The SMS quota for the project has been exceeded
                                    errorMsg = "The SMS quota for the project has been exceeded";
                                } else {
                                    errorMsg = e.getMessage();
                                }
                                callbackContext.error(errorMsg);
                            } catch (Exception ex) {
                                handleExceptionWithContext(ex, callbackContext);
                            }
                        }

                        @Override
                        public void onCodeSent(String verificationId, PhoneAuthProvider.ForceResendingToken token) {
                            try {
                                // The SMS verification code has been sent to the provided phone number, we
                                // now need to ask the user to enter the code and then construct a credential
                                // by combining the code with a verification ID [(in app)].
                                Log.d(TAG, "success: enrollSecondAuthFactor.onCodeSent");

                                JSONObject returnResults = new JSONObject();
                                try {
                                    returnResults.put("verificationId", verificationId);
                                } catch (JSONException e) {
                                    handleExceptionWithContext(e, callbackContext);
                                    return;
                                }
                                sendPluginResultAndKeepCallback(returnResults, callbackContext);
                            } catch (Exception ex) {
                                handleExceptionWithContext(ex, callbackContext);
                            }
                        }
                    };

                    // Rescope variables locally to lambda
                    String finalFakeVerificationCode = fakeVerificationCode;
                    int finalTimeOutDuration = timeOutDuration;
                    boolean finalRequireSmsValidation = requireSmsValidation;

                    // Get multi-factor session
                    user.getMultiFactor().getSession().addOnCompleteListener(
                            task -> {
                                try {
                                    if (task.isSuccessful()) {
                                        MultiFactorSession multiFactorSession = task.getResult();

                                        if (finalFakeVerificationCode != null && !finalFakeVerificationCode.equals("null")) {
                                            Log.d(TAG, "enrollSecondAuthFactor: using mock instant verification for test phone number");
                                            FirebaseAuth.getInstance().getFirebaseAuthSettings().setAutoRetrievedSmsCodeForPhoneNumber(phoneNumber, finalFakeVerificationCode);
                                        }

                                        PhoneAuthOptions phoneAuthOptions =
                                                PhoneAuthOptions.newBuilder()
                                                        .setPhoneNumber(phoneNumber)
                                                        .setTimeout((long) finalTimeOutDuration, TimeUnit.SECONDS)
                                                        .setCallbacks(phoneAuthVerificationCallbacks)
                                                        .setActivity(cordovaActivity)
                                                        .requireSmsValidation(finalRequireSmsValidation)
                                                        .setMultiFactorSession(multiFactorSession)
                                                        .build();
                                        PhoneAuthProvider.verifyPhoneNumber(phoneAuthOptions); // invokes phoneAuthVerificationCallbacks
                                    } else {
                                        handleTaskOutcome(task, callbackContext);
                                    }
                                } catch (Exception e) {
                                    handleExceptionWithContext(e, callbackContext);
                                }
                            }
                    );
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void verifySecondAuthFactor(
            final CallbackContext callbackContext,
            final JSONArray args
    ) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (multiFactorResolver == null) {
                        callbackContext.error("No multi-factor challenge exists to resolve");
                        return;
                    }
                    // Required params
                    JSONObject params = args.getJSONObject(0);
                    int selectedIndex = -1;
                    if (params.has("selectedIndex")) {
                        selectedIndex = params.getInt("selectedIndex");
                        if (selectedIndex < 0) {
                            callbackContext.error("Selected index value (" + selectedIndex + ") must be a positive integer");
                            return;
                        } else if (selectedIndex + 1 > multiFactorResolver.getHints().size()) {
                            callbackContext.error("Selected index value (" + selectedIndex + ") exceeds the number of enrolled factors (" + multiFactorResolver.getHints().size() + ")");
                            return;
                        }
                    }

                    String verificationId = null;
                    String verificationCode = null;
                    if (params.has("credential")) {
                        JSONObject jsonCredential = params.getJSONObject("credential");
                        if (jsonCredential.has("verificationId") && jsonCredential.has("code")) {
                            verificationId = jsonCredential.getString("verificationId");
                            verificationCode = jsonCredential.getString("code");
                        } else {
                            callbackContext.error("'verificationId' and/or 'code' properties not found on 'credential' object");
                            return;
                        }
                    }

                    if (selectedIndex == -1 && verificationId == null) {
                        callbackContext.error("Neither 'selectedIndex' or 'credential' properties found on 'params' object - either one must be specified");
                        return;
                    }

                    // Extract optional params
                    JSONObject opts = args.getJSONObject(1);

                    int timeOutDuration = 30;
                    if (opts.has("timeOutDuration")) {
                        timeOutDuration = opts.getInt("timeOutDuration");
                    }

                    String fakeVerificationCode = null;
                    String phoneNumber = null;
                    if (opts.has("fakeVerificationCode")) {
                        fakeVerificationCode = opts.getString("fakeVerificationCode");
                        if (opts.has("phoneNumber")) {
                            phoneNumber = opts.getString("phoneNumber");
                        } else {
                            callbackContext.error("'phoneNumber' property must also be specified on 'opts' object when 'fakeVerificationCode' is specified");
                            return;
                        }
                    }

                    boolean requireSmsValidation = false;
                    if (opts.has("requireSmsValidation")) {
                        requireSmsValidation = opts.getBoolean("requireSmsValidation");
                    }

                    // Handler for credential enrollment
                    OnReceivePhoneAuthCredential credentialReceiver = (PhoneAuthCredential credential) -> {
                        try {
                            // Complete enrollment. This will update the underlying tokens
                            // and trigger ID token change listener.
                            MultiFactorAssertion multiFactorAssertion = PhoneMultiFactorGenerator.getAssertion(credential);
                            // Complete sign-in.
                            multiFactorResolver
                                    .resolveSignIn(multiFactorAssertion)
                                    .addOnCompleteListener(
                                            task -> {
                                                try {
                                                    TaskCompletionSource<String> taskCompletionSource = new TaskCompletionSource<>();
                                                    taskCompletionSource.getTask().addOnCompleteListener(additionalTask -> {
                                                        if (additionalTask.getResult().equals("success")) {
                                                            multiFactorResolver = null;
                                                        }
                                                    });
                                                    handleTaskOutcomeWithAdditionalTask(task, callbackContext, taskCompletionSource);
                                                } catch (Exception e) {
                                                    handleExceptionWithContext(e, callbackContext);
                                                }
                                            }
                                    );
                        } catch (Exception e) {
                            handleExceptionWithContext(e, callbackContext);
                        }
                    };

                    // Arguments contain ID & code from manual SMS verification, so use this for verification
                    if (verificationId != null) {
                        PhoneAuthCredential credential = PhoneAuthProvider.getCredential(verificationId, verificationCode);
                        credentialReceiver.onCredential(credential);
                        return;
                    }

                    /*
                     * Phone verification flow
                     */
                    // Create phone verification callbacks
                    phoneAuthVerificationCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
                        @Override
                        public void onVerificationCompleted(PhoneAuthCredential credential) {
                            try {
                                // This callback will be invoked in two situations:
                                // 1 - Instant verification. In some cases the phone number can be instantly
                                //     verified without needing to send or enter a verification code.
                                // 2 - Auto-retrieval. On some devices Google Play services can automatically
                                //     detect the incoming verification SMS and perform verification without
                                //     user action.
                                Log.d(TAG, "success: verifySecondAuthFactor.onVerificationCompleted");
                                credentialReceiver.onCredential(credential);

                            } catch (Exception e) {
                                handleExceptionWithContext(e, callbackContext);
                            }
                        }

                        @Override
                        public void onVerificationFailed(FirebaseException e) {
                            try {
                                // This callback is invoked in an invalid request for verification is made,
                                // for instance if the the phone number format is not valid.
                                Log.w(TAG, "failed: verifySecondAuthFactor.onVerificationFailed ", e);

                                String errorMsg;
                                if (e instanceof FirebaseTooManyRequestsException) {
                                    // The SMS quota for the project has been exceeded
                                    errorMsg = "The SMS quota for the project has been exceeded";
                                } else {
                                    errorMsg = e.getMessage();
                                }
                                callbackContext.error(errorMsg);
                            } catch (Exception ex) {
                                handleExceptionWithContext(ex, callbackContext);
                            }
                        }

                        @Override
                        public void onCodeSent(String verificationId, PhoneAuthProvider.ForceResendingToken token) {
                            try {
                                // The SMS verification code has been sent to the provided phone number, we
                                // now need to ask the user to enter the code and then construct a credential
                                // by combining the code with a verification ID [(in app)].
                                Log.d(TAG, "success: verifySecondAuthFactor.onCodeSent");

                                JSONObject returnResults = new JSONObject();
                                try {
                                    returnResults.put("verificationId", verificationId);
                                } catch (JSONException e) {
                                    handleExceptionWithContext(e, callbackContext);
                                    return;
                                }
                                sendPluginResultAndKeepCallback(returnResults, callbackContext);
                            } catch (Exception ex) {
                                handleExceptionWithContext(ex, callbackContext);
                            }
                        }
                    };

                    // Rescope variables locally to lambda
                    int finalSelectedIndex = selectedIndex;
                    String finalFakeVerificationCode = fakeVerificationCode;
                    String finalPhoneNumber = phoneNumber;
                    int finalTimeOutDuration = timeOutDuration;
                    boolean finalRequireSmsValidation = requireSmsValidation;

                    if (finalFakeVerificationCode != null && !finalFakeVerificationCode.equals("null")) {
                        Log.d(TAG, "verifySecondAuthFactor: using mock instant verification for test phone number");
                        FirebaseAuth.getInstance().getFirebaseAuthSettings().setAutoRetrievedSmsCodeForPhoneNumber(finalPhoneNumber, finalFakeVerificationCode);
                    }

                    PhoneMultiFactorInfo selectedHint = (PhoneMultiFactorInfo) multiFactorResolver.getHints().get(finalSelectedIndex);

                    PhoneAuthOptions phoneAuthOptions =
                            PhoneAuthOptions.newBuilder()
                                    .setMultiFactorSession(multiFactorResolver.getSession())
                                    .setMultiFactorHint(selectedHint)
                                    .setTimeout((long) finalTimeOutDuration, TimeUnit.SECONDS)
                                    .setCallbacks(phoneAuthVerificationCallbacks)
                                    .setActivity(cordovaActivity)
                                    .requireSmsValidation(finalRequireSmsValidation)
                                    .build();
                    PhoneAuthProvider.verifyPhoneNumber(phoneAuthOptions); // invokes phoneAuthVerificationCallbacks
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void listEnrolledSecondAuthFactors(
            final CallbackContext callbackContext,
            final JSONArray args
    ) {

        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

                    JSONArray secondFactors = parseEnrolledSecondFactorsToJson(user.getMultiFactor().getEnrolledFactors());
                    callbackContext.success(secondFactors);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private JSONArray parseEnrolledSecondFactorsToJson(List<MultiFactorInfo> multiFactorInfoList) throws JSONException {
        JSONArray secondFactors = new JSONArray();
        for (int i = 0; i < multiFactorInfoList.size(); i++) {
            JSONObject secondFactor = new JSONObject();
            secondFactor.put("index", i);

            PhoneMultiFactorInfo phoneMultiFactorInfo = (PhoneMultiFactorInfo) multiFactorInfoList.get(i);
            secondFactor.put("phoneNumber", phoneMultiFactorInfo.getPhoneNumber());

            String displayName = phoneMultiFactorInfo.getDisplayName();
            if (displayName != null) {
                secondFactor.put("displayName", displayName);
            }
            secondFactors.put(secondFactor);
        }
        return secondFactors;
    }

    public void unenrollSecondAuthFactor(
            final CallbackContext callbackContext,
            final JSONArray args
    ) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    if (!userNotSignedInError(callbackContext)) return;
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

                    int selectedIndex = args.getInt(0);

                    if (selectedIndex < 0) {
                        callbackContext.error("Selected index value (" + selectedIndex + ") must be a positive integer");
                        return;
                    }

                    List<MultiFactorInfo> multiFactorInfos = user.getMultiFactor().getEnrolledFactors();
                    if (selectedIndex + 1 > multiFactorInfos.size()) {
                        callbackContext.error("Selected index value (" + selectedIndex + ") exceeds the number of enrolled factors (" + multiFactorInfos.size() + ")");
                        return;
                    }

                    user.getMultiFactor().unenroll(multiFactorInfos.get(selectedIndex)).addOnCompleteListener(task -> {
                        try {
                            handleTaskOutcome(task, callbackContext);
                        } catch (Exception e) {
                            handleExceptionWithContext(e, callbackContext);
                        }
                    });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void setLanguageCode(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String lang = args.getString(0);

                    if (lang == null || lang.equals("")) {
                        callbackContext.error("Lang must be specified");
                        return;
                    }

                    FirebaseAuth.getInstance().setLanguageCode(lang);

                    Log.d(TAG, "Language code setted to " + lang);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void createUserWithEmailAndPassword(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String email = args.getString(0);
                    String password = args.getString(1);

                    if (email == null || email.equals("")) {
                        callbackContext.error("User email address must be specified");
                        return;
                    }

                    if (password == null || password.equals("")) {
                        callbackContext.error("User password must be specified");
                        return;
                    }

                    FirebaseAuth.getInstance().createUserWithEmailAndPassword(email, password).addOnCompleteListener(cordova.getActivity(), new AuthResultOnCompleteListener(callbackContext));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void signInUserWithEmailAndPassword(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String email = args.getString(0);
                    String password = args.getString(1);

                    if (email == null || email.equals("")) {
                        callbackContext.error("User email address must be specified");
                        return;
                    }

                    if (password == null || password.equals("")) {
                        callbackContext.error("User password must be specified");
                        return;
                    }

                    FirebaseAuth.getInstance().signInWithEmailAndPassword(email, password).addOnCompleteListener(cordova.getActivity(), new AuthResultOnCompleteListener(callbackContext));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void authenticateUserWithEmailAndPassword(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String email = args.getString(0);
                    String password = args.getString(1);

                    if (email == null || email.equals("")) {
                        callbackContext.error("User email address must be specified");
                        return;
                    }

                    if (password == null || password.equals("")) {
                        callbackContext.error("User password must be specified");
                        return;
                    }

                    AuthCredential authCredential = EmailAuthProvider.getCredential(email, password);
                    String id = FirebasePlugin.instance.saveAuthCredential(authCredential);

                    JSONObject returnResults = new JSONObject();
                    returnResults.put("instantVerification", true);
                    returnResults.put("id", id);
                    callbackContext.success(returnResults);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }


    public void authenticateUserWithGoogle(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {

                callbackContext.error("deprecated");

            }
        });
    }

    public void authenticateUserWithApple(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String locale = args.getString(0);
                    Map<String, String> customParameters = new HashMap<>();
                    if (locale != null) {
                        customParameters.put("locale", locale);
                    }
                    authenticateUserWithOAuth(callbackContext, "apple.com", customParameters, null);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void authenticateUserWithMicrosoft(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String locale = args.getString(0);

                    Map<String, String> customParameters = new HashMap<>();
                    customParameters.put("prompt", "consent");

                    if (locale != null) {
                        customParameters.put("locale", locale);
                    }

                    authenticateUserWithOAuth(callbackContext, "microsoft.com", customParameters, null);

                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void authenticateUserWithOAuth(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String providerId = args.getString(0);
                    JSONObject customParametersJson = args.getJSONObject(1);
                    JSONArray scopesJson = args.getJSONArray(2);

                    Map<String, String> customParameters = null;
                    List<String> scopes = null;

                    if(customParametersJson != null){
                        Iterator<String> keys = customParametersJson.keys();
                        customParameters = new HashMap<>();
                        while(keys.hasNext()) {
                            String key = keys.next();
                            String value = customParametersJson.getString(key);
                            customParameters.put(key, value);
                        }
                    }

                    if(scopesJson != null){
                        scopes = new ArrayList<>();
                        for (int i = 0; i < scopesJson.length(); i++) {
                            scopes.add(scopesJson.getString(i));
                        }
                    }

                    authenticateUserWithOAuth(callbackContext, providerId, customParameters, scopes);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void authenticateUserWithOAuth(final CallbackContext callbackContext, final String providerId, final Map<String, String> customParameters, final List<String> scopes){
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    OAuthProvider.Builder provider = OAuthProvider.newBuilder(providerId);
                    if (customParameters != null) {
                        for (Map.Entry<String, String> entry : customParameters.entrySet()) {
                            provider.addCustomParameter(entry.getKey(), entry.getValue());
                        }
                    }
                    if (scopes != null) {
                        provider.setScopes(scopes);
                    }

                    Task<AuthResult> pending = FirebaseAuth.getInstance().getPendingAuthResult();
                    if (pending != null) {
                        callbackContext.error("Auth result is already pending");
                        pending
                                .addOnSuccessListener(new AuthResultOnSuccessListener())
                                .addOnFailureListener(new AuthResultOnFailureListener());
                    } else {
                        String id = FirebasePlugin.instance.saveAuthProvider(provider.build());
                        JSONObject returnResults = new JSONObject();
                        returnResults.put("instantVerification", true);
                        returnResults.put("id", id);
                        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, returnResults));
                    }
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void authenticateUserWithFacebook(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {

                callbackContext.error("deprecated");

                
            }
        });
    }

    public void signInUserWithCustomToken(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String customToken = args.getString(0);

                    if (customToken == null || customToken.equals("")) {
                        callbackContext.error("Custom token must be specified");
                        return;
                    }

                    FirebaseAuth.getInstance().signInWithCustomToken(customToken).addOnCompleteListener(cordova.getActivity(), new AuthResultOnCompleteListener(callbackContext));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void signInUserAnonymously(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseAuth.getInstance().signInAnonymously().addOnCompleteListener(cordova.getActivity(), new AuthResultOnCompleteListener(callbackContext));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void useAuthEmulator(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String host = args.getString(0);
                    Integer port = args.getInt(1);

                    if (host == null || host.equals("")) {
                        callbackContext.error("host must be specified");
                        return;
                    }

                    if (port == null) {
                        callbackContext.error("port must be specified");
                        return;
                    }

                    FirebaseAuth.getInstance().useEmulator(host, port);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void getClaims(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    if (!userNotSignedInError(callbackContext)) return;

                    user.getIdToken(true).addOnSuccessListener(new OnSuccessListener<GetTokenResult>() {
                        @Override
                        public void onSuccess(GetTokenResult result) {
                            try {
                                Map<String, Object> claims = result.getClaims();
                                JSONObject returnResults = new JSONObject(claims);
                                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, returnResults));
                            } catch (Exception e) {
                                handleExceptionWithContext(e, callbackContext);
                            }
                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            handleExceptionWithContext(e, callbackContext);
                        }
                    });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void getProviderData(final CallbackContext callbackContext, final JSONArray args) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
                    if (!userNotSignedInError(callbackContext)) return;

                    List<? extends UserInfo> providerData = user.getProviderData();
                    JSONArray returnResults = new JSONArray();
                    for (UserInfo userInfo : providerData) {
                        JSONObject userInfoJson = new JSONObject();
                        userInfoJson.put("providerId", userInfo.getProviderId());
                        userInfoJson.put("uid", userInfo.getUid());
                        userInfoJson.put("displayName", userInfo.getDisplayName());
                        userInfoJson.put("email", userInfo.getEmail());
                        userInfoJson.put("phoneNumber", userInfo.getPhoneNumber());
                        userInfoJson.put("photoUrl", userInfo.getPhotoUrl());
                        returnResults.put(userInfoJson);
                    }
                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, returnResults));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    //
    // Firebase Performace
    //

    private HashMap<String, Trace> traces = new HashMap<String, Trace>();

    private void startTrace(final CallbackContext callbackContext, final String name) {
        final FirebasePlugin self = this;
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {

                    Trace myTrace = null;
                    if (self.traces.containsKey(name)) {
                        myTrace = self.traces.get(name);
                    }

                    if (myTrace == null) {
                        myTrace = FirebasePerformance.getInstance().newTrace(name);
                        myTrace.start();
                        self.traces.put(name, myTrace);
                    }

                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void incrementCounter(final CallbackContext callbackContext, final String name, final String counterNamed) {
        final FirebasePlugin self = this;
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {

                    Trace myTrace = null;
                    if (self.traces.containsKey(name)) {
                        myTrace = self.traces.get(name);
                    }

                    if (myTrace != null && myTrace instanceof Trace) {
                        myTrace.incrementMetric(counterNamed, 1);
                        callbackContext.success();
                    } else {
                        callbackContext.error("Trace not found");
                    }
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void stopTrace(final CallbackContext callbackContext, final String name) {
        final FirebasePlugin self = this;
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {

                    Trace myTrace = null;
                    if (self.traces.containsKey(name)) {
                        myTrace = self.traces.get(name);
                    }

                    if (myTrace != null && myTrace instanceof Trace) { //
                        myTrace.stop();
                        self.traces.remove(name);
                        callbackContext.success();
                    } else {
                        callbackContext.error("Trace not found");
                    }
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void setAnalyticsCollectionEnabled(final CallbackContext callbackContext, final boolean enabled) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    mFirebaseAnalytics.setAnalyticsCollectionEnabled(enabled);
                    setPreference(ANALYTICS_COLLECTION_ENABLED, enabled);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void isAnalyticsCollectionEnabled(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    callbackContext.success(conformBooleanForPluginResult(getPreference(ANALYTICS_COLLECTION_ENABLED)));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void setPerformanceCollectionEnabled(final CallbackContext callbackContext, final boolean enabled) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebasePerformance.getInstance().setPerformanceCollectionEnabled(enabled);
                    setPreference(PERFORMANCE_COLLECTION_ENABLED, enabled);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void isPerformanceCollectionEnabled(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    callbackContext.success(conformBooleanForPluginResult(getPreference(PERFORMANCE_COLLECTION_ENABLED)));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void setCrashlyticsCollectionEnabled(final CallbackContext callbackContext, final boolean enabled) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    firebaseCrashlytics.setCrashlyticsCollectionEnabled(enabled);
                    setPreference(CRASHLYTICS_COLLECTION_ENABLED, enabled);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private void isCrashlyticsCollectionEnabled(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    callbackContext.success(conformBooleanForPluginResult(isCrashlyticsEnabled()));
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    private boolean isCrashlyticsEnabled() {
        return getPreference(CRASHLYTICS_COLLECTION_ENABLED);
    }

    private void setAnalyticsConsentMode(final CallbackContext callbackContext, final JSONObject consent) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    Map<ConsentType, ConsentStatus> consentMap = new EnumMap<>(ConsentType.class);
                    Iterator<String> keys = consent.keys();

                    while(keys.hasNext()) {
                        String key = keys.next();
                        ConsentType consentType = ConsentType.valueOf(key);
                        ConsentStatus consentStatus = ConsentStatus.valueOf(consent.getString(key));
                        consentMap.put(consentType, consentStatus);
                    }

                    mFirebaseAnalytics.setConsent(consentMap);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                    e.printStackTrace();
                }
            }
        });
    }

    public void clearAllNotifications(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    NotificationManager nm = (NotificationManager) applicationContext.getSystemService(Context.NOTIFICATION_SERVICE);
                    nm.cancelAll();
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void createChannel(final CallbackContext callbackContext, final JSONObject options) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    createChannel(options);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    protected static NotificationChannel createChannel(final JSONObject options) throws JSONException {
        NotificationChannel channel = null;
        // only call on Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String id = options.getString("id");
            Log.i(TAG, "Creating channel id=" + id);

            if (channelExists(id)) {
                deleteChannel(id);
            }

            NotificationManager nm = (NotificationManager) applicationContext.getSystemService(Context.NOTIFICATION_SERVICE);
            String packageName = cordovaActivity.getPackageName();

            String name = options.optString("name", "");
            Log.d(TAG, "Channel " + id + " - name=" + name);

            int importance = options.optInt("importance", NotificationManager.IMPORTANCE_HIGH);
            Log.d(TAG, "Channel " + id + " - importance=" + importance);

            channel = new NotificationChannel(id,
                    name,
                    importance);

            // Description
            String description = options.optString("description", "");
            Log.d(TAG, "Channel " + id + " - description=" + description);
            channel.setDescription(description);

            // Light
            boolean light = options.optBoolean("light", true);
            Log.d(TAG, "Channel " + id + " - light=" + light);
            channel.enableLights(light);

            int lightColor = options.optInt("lightColor", -1);
            if (lightColor != -1) {
                Log.d(TAG, "Channel " + id + " - lightColor=" + lightColor);
                channel.setLightColor(lightColor);
            }

            // Visibility
            int visibility = options.optInt("visibility", NotificationCompat.VISIBILITY_PUBLIC);
            Log.d(TAG, "Channel " + id + " - visibility=" + visibility);
            channel.setLockscreenVisibility(visibility);

            // Badge
            boolean badge = options.optBoolean("badge", true);
            Log.d(TAG, "Channel " + id + " - badge=" + badge);
            channel.setShowBadge(badge);

            int usage = options.optInt("usage", AudioAttributes.USAGE_NOTIFICATION_RINGTONE);
            Log.d(TAG, "Channel " + id + " - usage=" + usage);

            int streamType = options.optInt("streamType", -1);
            Log.d(TAG, "Channel " + id + " - streamType=" + streamType);

            // Sound
            String sound = options.optString("sound", "default");
            AudioAttributes.Builder audioAttributesBuilder = new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .setUsage(usage);

            if (streamType != -1) {
                audioAttributesBuilder.setLegacyStreamType(streamType);
            }

            AudioAttributes audioAttributes = audioAttributesBuilder.build();
            if ("ringtone".equals(sound)) {
                channel.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE), audioAttributes);
                Log.d(TAG, "Channel " + id + " - sound=ringtone");
            } else if (!sound.contentEquals("false")) {
                if (!sound.contentEquals("default")) {
                    Uri soundUri = Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + packageName + "/raw/" + sound);
                    channel.setSound(soundUri, audioAttributes);
                    Log.d(TAG, "Channel " + id + " - sound=" + sound);
                } else {
                    channel.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION), audioAttributes);
                    Log.d(TAG, "Channel " + id + " - sound=default");
                }
            } else {
                channel.setSound(null, null);
                Log.d(TAG, "Channel " + id + " - sound=none");
            }

            // Vibration: if vibration setting is an array set vibration pattern, else set enable vibration.
            JSONArray pattern = options.optJSONArray("vibration");
            if (pattern != null) {
                int patternLength = pattern.length();
                long[] patternArray = new long[patternLength];
                for (int i = 0; i < patternLength; i++) {
                    patternArray[i] = pattern.optLong(i);
                }
                channel.enableVibration(true);
                channel.setVibrationPattern(patternArray);
                Log.d(TAG, "Channel " + id + " - vibrate=" + pattern);
            } else {
                boolean vibrate = options.optBoolean("vibration", true);
                channel.enableVibration(vibrate);
                Log.d(TAG, "Channel " + id + " - vibrate=" + vibrate);
            }

            // Create channel
            nm.createNotificationChannel(channel);
        }
        return channel;
    }

    protected static void createDefaultChannel() throws JSONException {
        JSONObject options = new JSONObject();
        options.put("id", defaultChannelId);
        options.put("name", defaultChannelName);
        createDefaultChannel(options);
    }

    protected static void createDefaultChannel(final JSONObject options) throws JSONException {
        defaultNotificationChannel = createChannel(options);
    }

    public void setDefaultChannel(final CallbackContext callbackContext, final JSONObject options) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    deleteChannel(defaultChannelId);

                    String id = options.optString("id", null);
                    if (id != null) {
                        defaultChannelId = id;
                    }

                    String name = options.optString("name", null);
                    if (name != null) {
                        defaultChannelName = name;
                    }
                    createDefaultChannel(options);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public void deleteChannel(final CallbackContext callbackContext, final String channelID) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    deleteChannel(channelID);
                    callbackContext.success();
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    protected static void deleteChannel(final String channelID) {
        // only call on Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager nm = (NotificationManager) applicationContext.getSystemService(Context.NOTIFICATION_SERVICE);
            nm.deleteNotificationChannel(channelID);
        }
    }

    public void listChannels(final CallbackContext callbackContext) {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    List<NotificationChannel> notificationChannels = listChannels();
                    JSONArray channels = new JSONArray();
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        for (NotificationChannel notificationChannel : notificationChannels) {
                            JSONObject channel = new JSONObject();
                            channel.put("id", notificationChannel.getId());
                            channel.put("name", notificationChannel.getName());
                            channels.put(channel);
                        }
                    }
                    callbackContext.success(channels);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    public static List<NotificationChannel> listChannels() {
        List<NotificationChannel> notificationChannels = null;
        // only call on Android O and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager nm = (NotificationManager) applicationContext.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationChannels = nm.getNotificationChannels();
        }
        return notificationChannels;
    }

    public static boolean channelExists(String channelId) {
        boolean exists = false;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            List<NotificationChannel> notificationChannels = FirebasePlugin.listChannels();
            if (notificationChannels != null) {
                for (NotificationChannel notificationChannel : notificationChannels) {
                    if (notificationChannel.getId().equals(channelId)) {
                        exists = true;
                    }
                }
            }
        }
        return exists;
    }

    //
    // Firestore
    //
    private void addDocumentToFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String jsonDoc = args.getString(0);
                    String collection = args.getString(1);
                    boolean timestamp = args.getBoolean(2);

                    Map<String, Object> docData = jsonStringToMap(jsonDoc);

                    if (timestamp) {
                        docData.put("created", new Timestamp(new Date()));
                        docData.put("lastUpdate", new Timestamp(new Date()));
                    }

                    firestore.collection(collection)
                            .add(docData)
                            .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                                @Override
                                public void onSuccess(DocumentReference documentReference) {
                                    callbackContext.success(documentReference.getId());
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    handleExceptionWithContext(e, callbackContext);
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void setDocumentInFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String documentId = args.getString(0);
                    String jsonDoc = args.getString(1);
                    String collection = args.getString(2);
                    boolean timestamp = args.getBoolean(3);

                    Map<String, Object> docData = jsonStringToMap(jsonDoc);

                    if (timestamp) {
                        docData.put("lastUpdate", new Timestamp(new Date()));
                    }

                    firestore.collection(collection).document(documentId)
                            .set(docData)
                            .addOnSuccessListener(new OnSuccessListener<Void>() {
                                @Override
                                public void onSuccess(Void aVoid) {
                                    callbackContext.success();
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    handleExceptionWithContext(e, callbackContext);
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void updateDocumentInFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String documentId = args.getString(0);
                    String jsonDoc = args.getString(1);
                    String collection = args.getString(2);
                    boolean timestamp = args.getBoolean(3);

                    Map<String, Object> docData = jsonStringToMap(jsonDoc);

                    if (timestamp) {
                        docData.put("lastUpdate", new Timestamp(new Date()));
                    }

                    firestore.collection(collection).document(documentId)
                            .update(docData)
                            .addOnSuccessListener(new OnSuccessListener<Void>() {
                                @Override
                                public void onSuccess(Void aVoid) {
                                    callbackContext.success();
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    handleExceptionWithContext(e, callbackContext);
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void deleteDocumentFromFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String documentId = args.getString(0);
                    String collection = args.getString(1);

                    firestore.collection(collection).document(documentId)
                            .delete()
                            .addOnSuccessListener(new OnSuccessListener<Void>() {
                                @Override
                                public void onSuccess(Void aVoid) {
                                    callbackContext.success();
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    handleExceptionWithContext(e, callbackContext);
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void documentExistsInFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String documentId = args.getString(0);
                    String collection = args.getString(1);

                    firestore.collection(collection).document(documentId)
                            .get()
                            .addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                                @Override
                                public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                                    try {
                                        if (task.isSuccessful()) {
                                            DocumentSnapshot document = task.getResult();
                                            callbackContext.success(conformBooleanForPluginResult(document != null && document.getData() != null));
                                        } else {
                                            Exception e = task.getException();
                                            if (e != null) {
                                                handleExceptionWithContext(e, callbackContext);
                                            }
                                        }
                                    } catch (Exception e) {
                                        handleExceptionWithContext(e, callbackContext);
                                    }
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    handleExceptionWithContext(e, callbackContext);
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void fetchDocumentInFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String documentId = args.getString(0);
                    String collection = args.getString(1);

                    firestore.collection(collection).document(documentId)
                            .get()
                            .addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                                @Override
                                public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                                    try {
                                        if (task.isSuccessful()) {
                                            DocumentSnapshot document = task.getResult();
                                            if (document != null && document.getData() != null) {
                                                JSONObject jsonDoc = mapFirestoreDataToJsonObject(document.getData());
                                                callbackContext.success(jsonDoc);
                                            } else {
                                                callbackContext.error("No document found in collection");
                                            }
                                        } else {
                                            Exception e = task.getException();
                                            if (e != null) {
                                                handleExceptionWithContext(e, callbackContext);
                                            }
                                        }
                                    } catch (Exception e) {
                                        handleExceptionWithContext(e, callbackContext);
                                    }
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    handleExceptionWithContext(e, callbackContext);
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void listenToDocumentInFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String documentId = args.getString(0);
                    String collection = args.getString(1);
                    boolean includeMetadata = args.getBoolean(2);

                    ListenerRegistration registration = firestore.collection(collection).document(documentId)
                            .addSnapshotListener(includeMetadata ? MetadataChanges.INCLUDE : MetadataChanges.EXCLUDE, new EventListener<DocumentSnapshot>() {
                                @Override
                                public void onEvent(@Nullable DocumentSnapshot snapshot,
                                                    @Nullable FirebaseFirestoreException e3) {
                                    try {
                                        if (e3 == null) {
                                            JSONObject document = new JSONObject();
                                            document.put("eventType", "change");

                                            String source = snapshot != null && snapshot.getMetadata().hasPendingWrites() ? "local" : "remote";
                                            document.put("source", source);

                                            document.put("fromCache", snapshot.getMetadata().isFromCache());

                                            if (snapshot != null && snapshot.exists()) {
                                                JSONObject jsonDoc = mapFirestoreDataToJsonObject(snapshot.getData());
                                                document.put("snapshot", jsonDoc);
                                            }
                                            sendPluginResultAndKeepCallback(document, callbackContext);
                                        } else {
                                            handleExceptionWithContext(e3, callbackContext);
                                        }
                                    } catch (Exception e2) {
                                        handleExceptionWithContext(e2, callbackContext);
                                    }
                                }
                            });

                    String id = saveFirestoreListener(registration);
                    JSONObject jsResult = new JSONObject();
                    jsResult.put("eventType", "id");
                    jsResult.put("id", id);
                    sendPluginResultAndKeepCallback(jsResult, callbackContext);
                } catch (Exception e1) {
                    handleExceptionWithContext(e1, callbackContext);
                }
            }
        });
    }

    private void fetchFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String collection = args.getString(0);
                    JSONArray filters = args.getJSONArray(1);
                    Query query = firestore.collection(collection);

                    if (filters != null) {
                        query = applyFiltersToFirestoreCollectionQuery(filters, query);
                    }

                    query.get()
                            .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                @Override
                                public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                    try {
                                        if (task.isSuccessful()) {
                                            JSONObject jsonDocs = new JSONObject();
                                            for (QueryDocumentSnapshot document : task.getResult()) {
                                                jsonDocs.put(document.getId(), mapFirestoreDataToJsonObject(document.getData()));
                                            }
                                            callbackContext.success(jsonDocs);
                                        } else {
                                            handleExceptionWithContext(task.getException(), callbackContext);
                                        }
                                    } catch (Exception e) {
                                        handleExceptionWithContext(e, callbackContext);
                                    }
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void listenToFirestoreCollection(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String collection = args.getString(0);
                    JSONArray filters = null;
                    if (!args.isNull(1)) {
                        filters = args.getJSONArray(1);
                    }
                    boolean includeMetadata = args.getBoolean(2);

                    Query query = firestore.collection(collection);

                    if (filters != null) {
                        query = applyFiltersToFirestoreCollectionQuery(filters, query);
                    }

                    ListenerRegistration registration = query
                            .addSnapshotListener(includeMetadata ? MetadataChanges.INCLUDE : MetadataChanges.EXCLUDE, new EventListener<QuerySnapshot>() {
                                @Override
                                public void onEvent(@Nullable QuerySnapshot snapshots,
                                                    @Nullable FirebaseFirestoreException e3) {
                                    try {
                                        if (e3 == null) {
                                            JSONObject jsResult = new JSONObject();
                                            jsResult.put("eventType", "change");

                                            JSONObject documents = new JSONObject();
                                            boolean hasDocuments = false;
                                            for (DocumentChange dc : snapshots.getDocumentChanges()) {
                                                hasDocuments = true;
                                                JSONObject document = new JSONObject();

                                                switch (dc.getType()) {
                                                    case ADDED:
                                                        document.put("type", "new");
                                                        break;
                                                    case MODIFIED:
                                                        document.put("type", "modified");
                                                        break;
                                                    case REMOVED:
                                                        document.put("type", "removed");
                                                        break;
                                                    default:
                                                        document.put("type", "metadata");
                                                }

                                                QueryDocumentSnapshot documentSnapshot = dc.getDocument();
                                                document.put("snapshot", mapFirestoreDataToJsonObject(documentSnapshot.getData()));
                                                document.put("source", documentSnapshot.getMetadata().hasPendingWrites() ? "local" : "remote");
                                                document.put("fromCache", documentSnapshot.getMetadata().isFromCache());

                                                documents.put(documentSnapshot.getId(), document);
                                            }
                                            if (hasDocuments) {
                                                jsResult.put("documents", documents);
                                            }
                                            sendPluginResultAndKeepCallback(jsResult, callbackContext);
                                        } else {
                                            handleExceptionWithContext(e3, callbackContext);
                                        }
                                    } catch (Exception e2) {
                                        handleExceptionWithContext(e2, callbackContext);
                                    }
                                }
                            });

                    String id = saveFirestoreListener(registration);
                    JSONObject jsResult = new JSONObject();
                    jsResult.put("eventType", "id");
                    jsResult.put("id", id);
                    sendPluginResultAndKeepCallback(jsResult, callbackContext);

                } catch (Exception e1) {
                    handleExceptionWithContext(e1, callbackContext);
                }
            }
        });
    }

    private Query applyFiltersToFirestoreCollectionQuery(JSONArray filters, Query query) throws JSONException {
        for (int i = 0; i < filters.length(); i++) {
            JSONArray filter = filters.getJSONArray(i);
            switch (filter.getString(0)) {
                case "where":
                    String fieldName = filter.getString(1);
                    String operator = filter.getString(2);
                    switch (operator) {
                        case "<":
                            query = query.whereLessThan(fieldName, getFilterValueAsType(filter, 3, 4));
                            break;
                        case ">":
                            query = query.whereGreaterThan(fieldName, getFilterValueAsType(filter, 3, 4));
                            break;
                        case "<=":
                            query = query.whereLessThanOrEqualTo(fieldName, getFilterValueAsType(filter, 3, 4));
                            break;
                        case ">=":
                            query = query.whereGreaterThanOrEqualTo(fieldName, getFilterValueAsType(filter, 3, 4));
                            break;
                        case "array-contains":
                            query = query.whereArrayContains(fieldName, getFilterValueAsType(filter, 3, 4));
                            break;
                        default:
                            query = query.whereEqualTo(fieldName, getFilterValueAsType(filter, 3, 4));
                    }
                    break;
                case "orderBy":
                    Direction direction = Direction.ASCENDING;
                    if (Objects.equals(filter.getString(2), new String("desc"))) {
                        direction = Direction.DESCENDING;
                    }
                    query = query.orderBy(filter.getString(1), direction);
                    break;
                case "startAt":
                    query = query.startAt(getFilterValueAsType(filter, 1, 2));
                    break;
                case "endAt":
                    query = query.endAt(getFilterValueAsType(filter, 1, 2));
                    break;
                case "limit":
                    query = query.limit(filter.getLong(1));
                    break;
            }
        }
        return query;
    }

    private Object getFilterValueAsType(JSONArray filter, int valueIndex, int typeIndex) throws JSONException {
        Object typedValue;
        String type = "string";
        if (!filter.isNull(typeIndex)) {
            type = filter.getString(typeIndex);
        }

        switch (type) {
            case "boolean":
                typedValue = filter.getBoolean(valueIndex);
                break;
            case "integer":
                typedValue = filter.getInt(valueIndex);
                break;
            case "double":
                typedValue = filter.getDouble(valueIndex);
                break;
            case "long":
                typedValue = filter.getLong(valueIndex);
                break;
            default:
                typedValue = filter.getString(valueIndex);
        }

        return typedValue;
    }


    private void removeFirestoreListener(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String id = args.getString(0);
                    boolean removed = removeFirestoreListener(id);
                    if (removed) {
                        callbackContext.success();
                    } else {
                        callbackContext.error("Listener ID not found");
                    }
                } catch (Exception e1) {
                    handleExceptionWithContext(e1, callbackContext);
                }
            }
        });
    }

    private String saveFirestoreListener(ListenerRegistration listenerRegistration) {
        String id = this.generateId();
        this.firestoreListeners.put(id, listenerRegistration);
        return id;
    }

    private boolean removeFirestoreListener(String id) {
        boolean removed = false;
        if (this.firestoreListeners.containsKey(id)) {
            ListenerRegistration listenerRegistration = this.firestoreListeners.get(id);
            if (listenerRegistration != null) {
                listenerRegistration.remove();
            }
            this.firestoreListeners.remove(id);
            removed = true;
        }
        return removed;
    }

    //
    // Functions
    //
    private void functionsHttpsCallable(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    String name = args.getString(0);
                    functions.getHttpsCallable(name)
                            .call(args.get(1))
                            .addOnSuccessListener(new OnSuccessListener<HttpsCallableResult>() {
                                @Override
                                public void onSuccess(HttpsCallableResult httpsCallableResult) {
                                    try {
                                        if (httpsCallableResult.getData() instanceof Map) {
                                            callbackContext.success(mapToJsonObject((Map<String, Object>) httpsCallableResult.getData()));
                                        } else if (httpsCallableResult.getData() instanceof ArrayList) {
                                            callbackContext.success(objectToJsonArray(httpsCallableResult.getData()));
                                        } else if (httpsCallableResult.getData() instanceof Integer) {
                                            callbackContext.success((int) httpsCallableResult.getData());
                                        } else if (httpsCallableResult.getData() instanceof String) {
                                            callbackContext.success((String) httpsCallableResult.getData());
                                        } else {
                                            callbackContext.success((byte[]) httpsCallableResult.getData());
                                        }
                                    } catch (Exception e) {
                                        handleExceptionWithContext(e, callbackContext);
                                    }
                                }
                            })
                            .addOnFailureListener(new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    if (e instanceof FirebaseFunctionsException) {
                                        this.onFailure((FirebaseFunctionsException) e);
                                        return;
                                    }
                                    handleExceptionWithContext(e, callbackContext);
                                }

                                void onFailure(@NonNull FirebaseFunctionsException e) {
                                    if (e.getDetails() == null) {
                                        handleExceptionWithContext(e, callbackContext);
                                        return;
                                    }
                                    if (e.getDetails() instanceof String) {
                                        callbackContext.error(e.getDetails().toString());
                                    } else {
                                        try {
                                            callbackContext.error(mapToJsonObject((Map<String, Object>) e.getDetails()));
                                        } catch (JSONException ex) {
                                            handleExceptionWithContext(ex, callbackContext);
                                        }
                                    }
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    //
    // Installations
    //
    private void deleteInstallationId(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcome(FirebaseInstallations.getInstance().delete(), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void getInstallationId(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    handleTaskOutcomeWithStringResult(FirebaseInstallations.getInstance().getId(), callbackContext);
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }

    private void getInstallationToken(JSONArray args, CallbackContext callbackContext) throws JSONException {
        cordova.getThreadPool().execute(new Runnable() {
            public void run() {
                try {
                    FirebaseInstallations.getInstance().getToken(/* forceRefresh */true)
                            .addOnCompleteListener(new OnCompleteListener<InstallationTokenResult>() {
                                @Override
                                public void onComplete(@NonNull Task<InstallationTokenResult> task) {
                                    if (task.isSuccessful() || task.getException() == null) {
                                        callbackContext.success(task.getResult().getToken());
                                    } else if (task.getException() != null) {
                                        callbackContext.error(task.getException().getMessage());
                                    } else {
                                        callbackContext.error("Task failed for unknown reason");
                                    }
                                }
                            });
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            }
        });
    }


    /*
     * Helper methods
     */
    protected static void handleExceptionWithContext(Exception e, CallbackContext context) {
        String msg = e.toString();
        Log.e(TAG, msg);
        if (instance != null) {
            instance.logExceptionToCrashlytics(e);
        }
        context.error(msg);
    }

    protected static void handleExceptionWithoutContext(Exception e) {
        String msg = e.toString();
        Log.e(TAG, msg);
        if (instance != null) {
            instance.logExceptionToCrashlytics(e);
            instance.logErrorToWebview(msg);
        }
    }

    protected void sendPluginResultAndKeepCallback(String result, CallbackContext callbackContext) {
        PluginResult pluginresult = new PluginResult(PluginResult.Status.OK, result);
        sendPluginResultAndKeepCallback(pluginresult, callbackContext);
    }

    protected void sendPluginResultAndKeepCallback(boolean result, CallbackContext callbackContext) {
        PluginResult pluginresult = new PluginResult(PluginResult.Status.OK, result);
        sendPluginResultAndKeepCallback(pluginresult, callbackContext);
    }

    protected void sendPluginResultAndKeepCallback(int result, CallbackContext callbackContext) {
        PluginResult pluginresult = new PluginResult(PluginResult.Status.OK, result);
        sendPluginResultAndKeepCallback(pluginresult, callbackContext);
    }

    protected void sendPluginResultAndKeepCallback(JSONArray result, CallbackContext callbackContext) {
        PluginResult pluginresult = new PluginResult(PluginResult.Status.OK, result);
        sendPluginResultAndKeepCallback(pluginresult, callbackContext);
    }

    protected void sendPluginResultAndKeepCallback(JSONObject result, CallbackContext callbackContext) {
        PluginResult pluginresult = new PluginResult(PluginResult.Status.OK, result);
        sendPluginResultAndKeepCallback(pluginresult, callbackContext);
    }

    protected void sendEmptyPluginResultAndKeepCallback(CallbackContext callbackContext) {
        PluginResult pluginresult = new PluginResult(PluginResult.Status.NO_RESULT);
        pluginresult.setKeepCallback(true);
        callbackContext.sendPluginResult(pluginresult);
    }

    protected void sendPluginResultAndKeepCallback(PluginResult pluginresult, CallbackContext callbackContext) {
        pluginresult.setKeepCallback(true);
        callbackContext.sendPluginResult(pluginresult);
    }

    protected void logErrorToWebview(String msg) {
        Log.e(TAG, msg);
        executeGlobalJavascript("console.error(\"" + TAG + "[native]: " + escapeDoubleQuotes(msg) + "\")");
    }

    private String escapeDoubleQuotes(String string) {
        String escapedString = string.replace("\"", "\\\"");
        escapedString = escapedString.replace("%22", "\\%22");
        return escapedString;
    }

    private void executeGlobalJavascript(final String jsString) {
        if (cordovaActivity == null) return;
        cordovaActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:" + jsString);
            }
        });
    }

    private String saveAuthCredential(AuthCredential authCredential) {
        String id = this.generateId();
        this.authCredentials.put(id, authCredential);
        return id;
    }

    private String saveAuthProvider(OAuthProvider authProvider) {
        String id = this.generateId();
        this.authProviders.put(id, authProvider);
        return id;
    }

    private String generateId() {
        Random r = new Random();
        return Integer.toString(r.nextInt(1000 + 1));
    }

    private boolean getMetaDataFromManifest(String name) throws Exception {
        return applicationContext.getPackageManager().getApplicationInfo(applicationContext.getPackageName(), PackageManager.GET_META_DATA).metaData.getBoolean(name);
    }

    private void setPreference(String name, boolean value) {
        SharedPreferences settings = cordovaActivity.getSharedPreferences(SETTINGS_NAME, MODE_PRIVATE);
        SharedPreferences.Editor editor = settings.edit();
        editor.putBoolean(name, value);
        editor.apply();
    }

    private boolean getPreference(String name) {
        boolean result;
        try {
            SharedPreferences settings = cordovaActivity.getSharedPreferences(SETTINGS_NAME, MODE_PRIVATE);
            result = settings.getBoolean(name, false);
        } catch (Exception e) {
            try {
                result = getMetaDataFromManifest(name);
            } catch (Exception e2) {
                result = false;
            }
        }
        return result;
    }

    private void handleTaskOutcome(@NonNull Task task, CallbackContext callbackContext) {
        try {
            task.addOnCompleteListener((OnCompleteListener<Void>) task1 -> {
                try {
                    if (task1.isSuccessful() || task1.getException() == null) {
                        callbackContext.success();
                    } else if (task1.getException() != null) {
                        callbackContext.error(task1.getException().getMessage());
                    } else {
                        callbackContext.error("Task failed for unknown reason");
                    }
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            });
        } catch (Exception e) {
            handleExceptionWithContext(e, callbackContext);
        }
    }


    private void handleTaskOutcomeWithAdditionalTask(@NonNull Task task, CallbackContext callbackContext, @NonNull TaskCompletionSource taskCompletionSource) {
        try {
            task.addOnCompleteListener((OnCompleteListener<Void>) task1 -> {
                try {
                    if (task1.isSuccessful() || task1.getException() == null) {
                        callbackContext.success();
                        taskCompletionSource.setResult("success");
                    } else if (task1.getException() != null) {
                        String errorMessage = task1.getException().getMessage();
                        callbackContext.error(errorMessage);
                        taskCompletionSource.setResult(errorMessage);
                    } else {
                        String errorMessage = "Task failed for unknown reason";
                        callbackContext.error(errorMessage);
                        taskCompletionSource.setResult(errorMessage);
                    }
                } catch (Exception e) {
                    handleExceptionWithContext(e, callbackContext);
                }
            });
        } catch (Exception e) {
            handleExceptionWithContext(e, callbackContext);
        }
    }

    private void handleTaskOutcomeWithBooleanResult(@NonNull Task<Boolean> task, CallbackContext callbackContext) {
        try {
            task.addOnCompleteListener(new OnCompleteListener<Boolean>() {
                @Override
                public void onComplete(@NonNull Task<Boolean> task) {
                    try {
                        if (task.isSuccessful() || task.getException() == null) {
                            callbackContext.success(conformBooleanForPluginResult(task.getResult()));
                        } else if (task.getException() != null) {
                            callbackContext.error(task.getException().getMessage());
                        } else {
                            callbackContext.error("Task failed for unknown reason");
                        }
                    } catch (Exception e) {
                        handleExceptionWithContext(e, callbackContext);
                    }
                }

                ;
            });
        } catch (Exception e) {
            handleExceptionWithContext(e, callbackContext);
        }
    }

    private void handleTaskOutcomeWithStringResult(@NonNull Task<String> task, CallbackContext callbackContext) {
        try {
            task.addOnCompleteListener(new OnCompleteListener<String>() {
                @Override
                public void onComplete(@NonNull Task<String> task) {
                    try {
                        if (task.isSuccessful() || task.getException() == null) {
                            callbackContext.success(task.getResult());
                        } else if (task.getException() != null) {
                            callbackContext.error(task.getException().getMessage());
                        } else {
                            callbackContext.error("Task failed for unknown reason");
                        }
                    } catch (Exception e) {
                        handleExceptionWithContext(e, callbackContext);
                    }
                }

                ;
            });
        } catch (Exception e) {
            handleExceptionWithContext(e, callbackContext);
        }
    }

    private void handleAuthTaskOutcome(@NonNull Task<AuthResult> task, CallbackContext callbackContext) {
        try {
            if (task.isSuccessful() || task.getException() == null) {
                handleAuthResultSuccess(callbackContext);
            } else {
                handleAuthResultFailure(callbackContext, task.getException());
            }
        } catch (Exception e) {
            handleExceptionWithContext(e, callbackContext);
        }
    }

    private void handleAuthResultSuccess(CallbackContext callbackContext){
        callbackContext.success();
    }

    private void handleAuthResultFailure(CallbackContext callbackContext, Exception authException){
        try {
            if (authException instanceof FirebaseAuthInvalidCredentialsException) {
                callbackContext.error("Invalid verification code");
            } else if (authException instanceof FirebaseAuthMultiFactorException) {
                // The user is a multi-factor user. Second factor challenge is required.
                multiFactorResolver = ((FirebaseAuthMultiFactorException) authException).getResolver();
                String errMessage = "Second factor required";
                JSONArray secondFactors = parseEnrolledSecondFactorsToJson(multiFactorResolver.getHints());

                // Invoke error callback with second factors
                // App should ask user to choose if more than one
                JSONObject result = new JSONObject();
                result.put("errorMessage", errMessage);
                result.put("secondFactors", secondFactors);
                callbackContext.error(result);
            } else {
                callbackContext.error(authException.getMessage());
            }
        } catch (Exception e) {
            handleExceptionWithContext(e, callbackContext);
        }
    }

    private AuthCredential obtainAuthCredential(JSONObject jsonCredential) throws JSONException {
        AuthCredential authCredential = null;
        if (jsonCredential.has("verificationId") && jsonCredential.has("code")) {
            Log.d(TAG, "Using specified verificationId and code to authenticate");
            authCredential = (AuthCredential) PhoneAuthProvider.getCredential(jsonCredential.getString("verificationId"), jsonCredential.getString("code"));
        } else if (jsonCredential.has("id") && FirebasePlugin.instance.authCredentials.containsKey(jsonCredential.getString("id"))) {
            Log.d(TAG, "Using native auth credential to authenticate");
            authCredential = FirebasePlugin.instance.authCredentials.get(jsonCredential.getString("id"));
            FirebasePlugin.instance.authCredentials.remove(jsonCredential.getString("id")); // remove from persistent list
        }
        return authCredential;
    }

    private OAuthProvider obtainAuthProvider(JSONObject jsonCredential) throws JSONException {
        OAuthProvider authProvider = null;
        if (jsonCredential.has("id") && FirebasePlugin.instance.authProviders.containsKey(jsonCredential.getString("id"))) {
            Log.d(TAG, "Using native auth provider to authenticate");
            authProvider = FirebasePlugin.instance.authProviders.get(jsonCredential.getString("id"));
        }
        return authProvider;
    }


    private static class AuthResultOnSuccessListener implements OnSuccessListener<AuthResult> {
        @Override
        public void onSuccess(AuthResult authResult) {
            Log.d(TAG, "AuthResult:onSuccess:" + authResult);
            if (FirebasePlugin.instance.authResultCallbackContext != null) {
                FirebasePlugin.instance.handleAuthResultSuccess(FirebasePlugin.instance.authResultCallbackContext);
            }
        }
    }

    private static class AuthResultOnFailureListener implements OnFailureListener {
        @Override
        public void onFailure(@NonNull Exception e) {
            Log.w(TAG, "AuthResult:onFailure", e);
            if (FirebasePlugin.instance.authResultCallbackContext != null) {
                FirebasePlugin.instance.handleAuthResultFailure(FirebasePlugin.instance.authResultCallbackContext, e);
            }
        }
    }

    private static class AuthResultOnCompleteListener implements OnCompleteListener<AuthResult> {
        private final CallbackContext callbackContext;

        public AuthResultOnCompleteListener(CallbackContext callbackContext) {
            this.callbackContext = callbackContext;
        }

        @Override
        public void onComplete(@NonNull Task<AuthResult> task) {
            FirebasePlugin.instance.handleAuthTaskOutcome(task, callbackContext);
        }
    }

    private static class AuthStateListener implements FirebaseAuth.AuthStateListener {
        @Override
        public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
            try {
                if (!FirebasePlugin.instance.authStateChangeListenerInitialized) {
                    FirebasePlugin.instance.authStateChangeListenerInitialized = true;
                } else {
                    FirebaseUser user = firebaseAuth.getCurrentUser();
                    FirebasePlugin.instance.executeGlobalJavascript(JS_GLOBAL_NAMESPACE + "_onAuthStateChange(" + (user != null ? "true" : "false") + ")");
                }
            } catch (Exception e) {
                handleExceptionWithoutContext(e);
            }
        }
    }

    private static class IdTokenListener implements FirebaseAuth.IdTokenListener {
        @Override
        public void onIdTokenChanged(@NonNull FirebaseAuth firebaseAuth) {
            try {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                user.getIdToken(true).addOnSuccessListener(new OnSuccessListener<GetTokenResult>() {
                    @Override
                    public void onSuccess(GetTokenResult result) {
                        try {
                            String idToken = result.getToken();
                            if (idToken != null && idToken.equals(instance.currentIdToken)) {
                                return;
                            }
                            instance.currentIdToken = idToken;
                            String providerId = result.getSignInProvider();
                            FirebasePlugin.instance.executeGlobalJavascript(JS_GLOBAL_NAMESPACE + "_onAuthIdTokenChange({\"idToken\":\"" + idToken + "\",\"providerId\":\"" + providerId + "\"})");
                        } catch (Exception e) {
                            FirebasePlugin.instance.executeGlobalJavascript(JS_GLOBAL_NAMESPACE + "_onAuthIdTokenChange()");
                        }
                    }

                }).addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        FirebasePlugin.instance.executeGlobalJavascript(JS_GLOBAL_NAMESPACE + "_onAuthIdTokenChange()");
                    }
                });
            } catch (Exception e) {
                FirebasePlugin.instance.executeGlobalJavascript(JS_GLOBAL_NAMESPACE + "_onAuthIdTokenChange()");
            }
        }
    }

    private Map<String, Object> jsonStringToMap(String jsonString) throws JSONException {
        Type type = new TypeToken<Map<String, Object>>() {
        }.getType();
        return gson.fromJson(jsonString, type);
    }

    private JSONObject mapFirestoreDataToJsonObject(Map<String, Object> map) throws JSONException {
        map = sanitiseFirestoreHashMap(map);
        return mapToJsonObject(map);
    }

    private Map<String, Object> sanitiseFirestoreHashMap(Map<String, Object> map) {
        Set<String> keys = map.keySet();
        for (String key : keys) {
            Object value = map.get(key);
            if (value instanceof DocumentReference) {
                map.put(key, ((DocumentReference) value).getPath());
            } else if (value instanceof HashMap) {
                map.put(key, sanitiseFirestoreHashMap((Map<String, Object>) value));
            }
        }
        return map;
    }

    private JSONObject mapToJsonObject(Map<String, Object> map) throws JSONException {
        String jsonString = gson.toJson(map);
        return new JSONObject(jsonString);
    }

    private JSONObject objectToJsonObject(Object object) throws JSONException {
        String jsonString = gson.toJson(object);
        return new JSONObject(jsonString);
    }

    private JSONArray objectToJsonArray(Object object) throws JSONException {
        String jsonString = gson.toJson(object);
        return new JSONArray(jsonString);
    }

    private void logMessageToCrashlytics(String message) {
        if (isCrashlyticsEnabled()) {
            try {
                firebaseCrashlytics.log(message);
            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
            }
        } else {
            Log.e(TAG, "Cannot log message - Crashlytics collection is disabled");
        }
    }

    private void logExceptionToCrashlytics(Exception exception) {
        if (isCrashlyticsEnabled()) {
            try {
                firebaseCrashlytics.recordException(exception);
            } catch (Exception e) {
                Log.e(TAG, e.getMessage());
            }
        } else {
            Log.e(TAG, "Cannot log exception - Crashlytics collection is disabled");
        }
    }

    private int conformBooleanForPluginResult(boolean result) {
        return result ? 1 : 0;
    }

    protected String qualifyPermission(String permission) {
        if (permission.startsWith("android.permission.")) {
            return permission;
        } else {
            return "android.permission." + permission;
        }
    }

    protected boolean hasRuntimePermission(String permission) throws Exception {
        boolean hasRuntimePermission = true;
        String qualifiedPermission = qualifyPermission(permission);
        Method method = null;
        try {
            method = cordova.getClass().getMethod("hasPermission", qualifiedPermission.getClass());
            Boolean bool = (Boolean) method.invoke(cordova, qualifiedPermission);
            hasRuntimePermission = bool.booleanValue();
        } catch (NoSuchMethodException e) {
            Log.w(TAG, "Cordova v" + CordovaWebView.CORDOVA_VERSION + " does not support runtime permissions so defaulting to GRANTED for " + permission);
        }
        return hasRuntimePermission;
    }

    protected void requestPermissions(CordovaPlugin plugin, int requestCode, String[] permissions) throws Exception {
        try {
            java.lang.reflect.Method method = cordova.getClass().getMethod("requestPermissions", org.apache.cordova.CordovaPlugin.class, int.class, java.lang.String[].class);
            method.invoke(cordova, plugin, requestCode, permissions);
        } catch (NoSuchMethodException e) {
            throw new Exception("requestPermissions() method not found in CordovaInterface implementation of Cordova v" + CordovaWebView.CORDOVA_VERSION);
        }
    }

    /************
     * Overrides
     ***********/

    /**
     * then updates the list of status based on the grantResults before passing the result back via the context.
     *
     * @param requestCode  - ID that was used when requesting permissions
     * @param permissions  - list of permissions that were requested
     * @param grantResults - list of flags indicating if above permissions were granted or denied
     */
    public void onRequestPermissionResult(int requestCode, String[] permissions, int[] grantResults) throws JSONException {
        String sRequestId = String.valueOf(requestCode);
        Log.v(TAG, "Received result for permissions request id=" + sRequestId);
        try {
            if (postNotificationPermissionRequestCallbackContext == null) {
                Log.e(TAG, "No callback context found for permissions request id=" + sRequestId);
                return;
            }

            boolean postNotificationPermissionGranted = false;
            for (int i = 0, len = permissions.length; i < len; i++) {
                String androidPermission = permissions[i];

                if (androidPermission.equals(qualifyPermission(POST_NOTIFICATIONS))) {
                    postNotificationPermissionGranted = grantResults[i] == PackageManager.PERMISSION_GRANTED;
                }
            }

            postNotificationPermissionRequestCallbackContext.success(postNotificationPermissionGranted ? 1 : 0);
            postNotificationPermissionRequestCallbackContext = null;

        } catch (Exception e) {
            if (postNotificationPermissionRequestCallbackContext != null) {
                handleExceptionWithContext(e, postNotificationPermissionRequestCallbackContext);
            } else {
                handleExceptionWithoutContext(e);
            }
        }
    }

    private boolean isUserSignedIn() {
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        return user != null;
    }

    private boolean userNotSignedInError(CallbackContext callbackContext) {
        boolean signedIn = isUserSignedIn();
        if (!signedIn) {
            callbackContext.error("No user is currently signed");
        }
        return signedIn;
    }
}
