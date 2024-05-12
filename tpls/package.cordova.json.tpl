{
    "name": "<%-config.cordova.name%>",
    "displayName": "<%-config.cordova.displayName%>",
    "version": "1.0.0",
    "description": "A Revolutionary anti-censorship decentralized publishing and social platform. Based on the blockchain technology, it runs on a set of computers around the world, not controlled by any single entity. Self-policed by users with good reputation where nobody records your keystrokes, viewing habits or searches.",
    "main": "index.js",
    "scripts": {
        "android-add": "cordova platform add android@12.0.1",
        "ios-add": "cordova platform add ios@6.3.0",
        "ios-run": "cordova run ios --buildConfig build.json",
        "ios-build-debug": "cordova build ios --buildConfig build.json",
        "android-build": "cordova build android --prod --release --buildConfig build.json --verbose",
        "android-build-gfree": "cordova build android --prod --release --buildConfig buildgfree.json --verbose",
        "android-build-debug": "cordova build android --buildConfig build.json --verbose",
        "android-run": "cordova run android --prod --buildConfig build.json    --packageType=bundle",
        "test": "echo \"Error: no test specified\" && exit 1",
        "resourses": "cordova-res"
    },
    "keywords": [
        "ecosystem:cordova"
    ],
    "author": "Pocketnet Team",
    "license": "Apache-2.0",
    "dependencies": {
        "cordova-plugin-android-permissions": "1.1.5",
        "cordova-plugin-android-window-background": "1.0.2",
        "cordova-plugin-camera": "6.0.0",
        "cordova-plugin-fullscreen": "^1.3.0",
        "cordova-plugin-gallery-refresh": "1.0.61",
        "cordova-plugin-inappbrowser": "4.0.0",
        "cordova-plugin-network-information": "3.0.0",
        "cordova-plugin-screen-orientation": "^3.0.1",
        "cordova-plugin-vibration": "3.1.1",
        "cordova-support-android-plugin": "1.0.1",
        "es6-promise-plugin": "^4.2.2",
        "html-minifier": "^4.0.0",
        "mkpath": "^1.0.0",
        "node-version-compare": "^1.0.3",
        "xml2js": "^0.4.23"
    },
    "devDependencies": {
        "@ahovakimyan/cordova-plugin-wkwebviewxhrfix": "^1.0.1",
        "@cordova/eslint-config": "^4.0.0",
        "@globules-io/cordova-plugin-ios-xhr": "^1.2.1",
        "cc.fovea.cordova.openwith": "file:cc.fovea.cordova.openwith",
        "cordova-android": "^11.0.0",
        "cordova-androidx-build": "^1.0.4",
        "cordova-ios": "^6.3.0",
        "cordova-plugin-actionsheet": "^2.3.3",
        "cordova-plugin-navigationbar-color": "file:cordova-plugin-navigationbar-color",
        "cordova-plugin-add-swift-support": "^2.0.2",
        "cordova-plugin-android-enumeratedevices": "file:cordova-plugin-android-enumeratedevices",
        "cordova-plugin-android-packagemanager": "file:cordova-plugin-android-packagemanager",
        "cordova-plugin-audioinput": "^1.0.2",
        "cordova-plugin-audiotoggle": "file:cordova-plugin-audiotoggle",
        "cordova-plugin-background-download": "0.0.2",
        "cordova-plugin-background-mode": "file:cordova-plugin-run-in-background",
        "cordova-plugin-badge": "file:cordova-plugin-badge",
        "cordova-plugin-buildinfo": "^4.0.0",
        "cordova-plugin-camera-preview": "^0.12.3",
        "cordova-plugin-contacts-x": "file:cordova-plugin-contacts-x",
        "cordova-plugin-device": "^1.1.7",
        "cordova-plugin-file": "git+https://github.com/apache/cordova-plugin-file.git",
        "cordova-plugin-file-transfer": "file:cordova-plugin-file-transfer",
        "cordova-plugin-insomnia": "file:cordova-plugin-insomnia",
        "cordova-plugin-ionic-keyboard": "file:cordova-plugin-ionic-keyboard",
        "cordova-plugin-media": "^7.0.0",
        "cordova-plugin-photo-library": "file:cordova-plugin-photo-library",
        "cordova-plugin-pip": "file:cordova-plugin-pip",
        "cordova-plugin-statusbar": "file:cordova-plugin-statusbar",
        "cordova-plugin-taptic-engine": "^2.2.0",
        "cordova-plugin-webview-checker": "^1.0.1",
        "cordova-plugin-x-socialsharing": "^6.0.4",
        "cordova-plugin-file-opener2":"^4.0.0",
        "cordova-plugin-deeplinks": "file:cordova-plugin-deeplinks",

        <% if(!store) {%>
            "cordova-plugin-apkupdater": "~4.0.0",
        <% } %>
        
        "cordova-plugin-firebasex": "file:cordova-plugin-firebasex",
        "np": "^5.0.3",
        "sync-cordova-xml": "^0.4.0"
    },
    "cordova": {
        "plugins": {
            "cordova-plugin-android-enumeratedevices": {},
            "cordova-plugin-device": {},
            "cordova-plugin-screen-orientation": {},
            "cordova-plugin-badge": {},
            "cordova-plugin-statusbar": {},
            "cordova-plugin-x-socialsharing": {
                "ANDROID_SUPPORT_V4_VERSION": "24.1.1+",
                "PHOTO_LIBRARY_ADD_USAGE_DESCRIPTION": "Allow the application access to the photo gallery to select photos for publication.",
                "PHOTO_LIBRARY_USAGE_DESCRIPTION": "Allow the application access to the photo gallery to select photos for publication."
            },
            "cordova-plugin-buildinfo": {},
            "cordova-plugin-inappbrowser": {},
            "@globules-io/cordova-plugin-ios-xhr": {},
            "cordova-plugin-file": {
                "ANDROIDX_WEBKIT_VERSION": "1.4.0"
            },
            "cordova-plugin-contacts-x": {},
            "cordova-plugin-ionic-keyboard": {},
            "cordova-plugin-deeplinks": {},
            "cordova-plugin-file-opener2" : {},
            "cc.fovea.cordova.openwith": {
                "ANDROID_MIME_TYPE": "*",
                "IOS_UNIFORM_TYPE_IDENTIFIER": "public.item",
                "ANDROID_EXTRA_ACTIONS": " "

                <% if(config.cordova.iosUrlScheme) {%>,"IOS_URL_SCHEME": "<%-config.cordova.iosUrlScheme%>"<% } %>
                <% if(config.cordova.groupIdentifier) {%>,"IOS_GROUP_IDENTIFIER": "<%-config.cordova.groupIdentifier%>"<% } %>
                <% if(config.cordova.iosTeamId) {%>,"SHAREEXT_DEVELOPMENT_TEAM": "<%-config.cordova.iosTeamId%>"<% } %>
                
            },
            "cordova-plugin-insomnia": {},
            "cordova-plugin-taptic-engine": {},
            "cordova-plugin-background-download": {},
            "cordova-plugin-background-mode" : {},
            "cordova-plugin-camera": {
                "ANDROIDX_CORE_VERSION": "1.6.+",
                "PHOTO_LIBRARY_ADD_USAGE_DESCRIPTION": "Allow the application access to the photo gallery to select photos for publication.",
                "PHOTO_LIBRARY_USAGE_DESCRIPTION": "Allow the application access to the photo gallery to select photos for publication.",
                "CAMERA_USAGE_DESCRIPTION": "Allow the application access to the camera to select photos for publication.",
                "PHOTOLIBRARY_USAGE_DESCRIPTION": "Allow the application access to the photo gallery to select photos for publication."
            },
            "cordova-plugin-photo-library": {
                "PHOTO_LIBRARY_USAGE_DESCRIPTION": " "
            },
            "cordova-plugin-network-information": {},
            "cordova-plugin-vibration": {},
            "cordova-plugin-file-transfer": {},
            "cordova-plugin-actionsheet": {},
            "cordova-plugin-media": {
                "KEEP_AVAUDIOSESSION_ALWAYS_ACTIVE": "NO"
            },
            "cordova-plugin-camera-preview": {},
            "cordova-plugin-webview-checker": {},
            "cordova-plugin-pip": {},
            "cordova-plugin-android-packagemanager": {},
            "cordova-plugin-android-permissions": {},
            "cordova-plugin-navigationbar-color": {},
            "cordova-plugin-gallery-refresh": {
                "CAMERA_USAGE_DESCRIPTION": "",
                "PHOTOLIBRARY_USAGE_DESCRIPTION": ""
            },
        
        <% if(!store) {%>
            "cordova-plugin-apkupdater": {},
        <% } %>
            

        <% if(!gfree) {%>
			"cordova-plugin-firebasex": {
				"FIREBASE_ANALYTICS_COLLECTION_ENABLED": "false",
				"FIREBASE_PERFORMANCE_COLLECTION_ENABLED": "false",
				"FIREBASE_CRASHLYTICS_COLLECTION_ENABLED": "true",
				"FIREBASE_FCM_AUTOINIT_ENABLED": "true",
				"IOS_USE_PRECOMPILED_FIRESTORE_POD": "false",
				"ANDROID_ICON_ACCENT": "#FF00FFFF",
				"ANDROID_FIREBASE_PERFORMANCE_MONITORING": "false",
				"ANDROID_PLAY_SERVICES_TAGMANAGER_VERSION": "18.0.1",
				"ANDROID_PLAY_SERVICES_AUTH_VERSION": "20.2.0",
				"ANDROID_FIREBASE_ANALYTICS_VERSION": "21.0.0",
				"ANDROID_FIREBASE_MESSAGING_VERSION": "23.0.5",
				"ANDROID_FIREBASE_CONFIG_VERSION": "21.1.0",
				"ANDROID_FIREBASE_PERF_VERSION": "20.0.6",
				"ANDROID_FIREBASE_AUTH_VERSION": "21.0.4",
				"ANDROID_FIREBASE_INAPPMESSAGING_VERSION": "20.1.2",
				"ANDROID_FIREBASE_FIRESTORE_VERSION": "24.1.2",
				"ANDROID_FIREBASE_FUNCTIONS_VERSION": "20.1.0",
				"ANDROID_FIREBASE_IID_VERSION": "21.1.0",
				"ANDROID_FIREBASE_INSTALLATIONS_VERSION": "17.0.1",
				"ANDROID_FIREBASE_CRASHLYTICS_VERSION": "18.2.10",
				"ANDROID_FIREBASE_CRASHLYTICS_NDK_VERSION": "18.2.10",
				"ANDROID_GSON_VERSION": "2.9.0",
				"ANDROID_FIREBASE_PERF_GRADLE_PLUGIN_VERSION": "1.4.1",
				"ANDROID_GRPC_OKHTTP": "1.46.0"
			},
        <% } else { %> 
        
            "cordova-plugin-firebasex": {
				"FIREBASE_ANALYTICS_COLLECTION_ENABLED": "false",
				"FIREBASE_PERFORMANCE_COLLECTION_ENABLED": "false",
				"FIREBASE_CRASHLYTICS_COLLECTION_ENABLED": "false",
				"FIREBASE_FCM_AUTOINIT_ENABLED": "true",
				"IOS_USE_PRECOMPILED_FIRESTORE_POD": "false",
				"ANDROID_ICON_ACCENT": "#FF00FFFF",
				"ANDROID_FIREBASE_PERFORMANCE_MONITORING": "false",
				"ANDROID_PLAY_SERVICES_TAGMANAGER_VERSION": "18.0.1",
				"ANDROID_PLAY_SERVICES_AUTH_VERSION": "20.2.0",
				"ANDROID_FIREBASE_ANALYTICS_VERSION": "21.0.0",
				"ANDROID_FIREBASE_MESSAGING_VERSION": "23.0.5",
				"ANDROID_FIREBASE_CONFIG_VERSION": "21.1.0",
				"ANDROID_FIREBASE_PERF_VERSION": "20.0.6",
				"ANDROID_FIREBASE_AUTH_VERSION": "21.0.4",
				"ANDROID_FIREBASE_INAPPMESSAGING_VERSION": "20.1.2",
				"ANDROID_FIREBASE_FIRESTORE_VERSION": "24.1.2",
				"ANDROID_FIREBASE_FUNCTIONS_VERSION": "20.1.0",
				"ANDROID_FIREBASE_IID_VERSION": "21.1.0",
				"ANDROID_FIREBASE_INSTALLATIONS_VERSION": "17.0.1",
				"ANDROID_FIREBASE_CRASHLYTICS_VERSION": "18.2.10",
				"ANDROID_FIREBASE_CRASHLYTICS_NDK_VERSION": "18.2.10",
				"ANDROID_GSON_VERSION": "2.9.0",
				"ANDROID_FIREBASE_PERF_GRADLE_PLUGIN_VERSION": "1.4.1",
				"ANDROID_GRPC_OKHTTP": "1.46.0"
			},
        <% } %>

            "cordova-plugin-audiotoggle": {},
            "@ahovakimyan/cordova-plugin-wkwebviewxhrfix": {}

            
        },
        "platforms": [
            "ios",
            "android"
        ]
    }
}