<?xml version='1.0' encoding='utf-8'?>
<widget android-versionCode="__PACKAGE-CORDOVAVERSIONCODE__" id="pocketnet.app" version="__PACKAGE-CORDOVAVERSION__" xmlns="http://www.w3.org/ns/widgets" xmlns:android="http://schemas.android.com/apk/res/android" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>__VAR__.project</name>
    <description>
        __VAR__.project Application
    </description>
    <author email="maxgrishkov@gmail.com" href="https://__VAR__.domain">
        Pocketnet Team
    </author>
    <content src="indexcordova.html" />
    <preference name="DisallowOverscroll" value="true" />
    <preference name="android-minSdkVersion" value="24" />
    <preference name="android-targetSdkVersion" value="30" />
    <preference name="loadUrlTimeoutValue" value="700000" />
    <preference name="SplashScreen" value="screen" />
    <preference name="SplashShowOnlyFirstTime" value="true" />
    <preference name="AutoHideSplashScreen" value="false" />
    <preference name="FadeSplashScreen" value="false" />
    <preference name="SplashMaintainAspectRatio" value="true" />
    <preference name="ShowSplashScreenSpinner" value="false" />
    <preference name="StatusBarOverlaysWebView" value="false" />
    <preference name="StatusBarBackgroundColor" value="#000000" />
    <preference name="StatusBarStyle" value="lightcontent" />
    <preference name="AndroidLaunchMode" value="singleTask" />
    <preference name="Fullscreen" value="false" />
    <preference name="AllowInlineMediaPlayback" value="true"/>
    <preference name="AndroidExtraFilesystems" value="files-external,documents,sdcard,cache,cache-external,assets,root" />
   

    <platform name="android">
        <icon density="ldpi" src="www/res/icon/android/drawable-ldpi-icon.png" />
        <icon density="mdpi" src="www/res/icon/android/drawable-mdpi-icon.png" />
        <icon density="hdpi" src="www/res/icon/android/drawable-hdpi-icon.png" />
        <icon density="xhdpi" src="www/res/icon/android/drawable-xhdpi-icon.png" />
        <icon density="xxhdpi" src="www/res/icon/android/drawable-xxhdpi-icon.png" />
        <icon density="xxxhdpi" src="www/res/icon/android/drawable-xxxhdpi-icon.png" />
        <splash density="land-ldpi" src="www/res/screen/android/drawable-land-ldpi-screen.png" />
        <splash density="land-mdpi" src="www/res/screen/android/drawable-land-mdpi-screen.png" />
        <splash density="land-hdpi" src="www/res/screen/android/drawable-land-hdpi-screen.png" />
        <splash density="land-xhdpi" src="www/res/screen/android/drawable-land-xhdpi-screen.png" />
        <splash density="land-xxhdpi" src="www/res/screen/android/drawable-land-xxhdpi-screen.png" />
        <splash density="land-xxxhdpi" src="www/res/screen/android/drawable-land-xxxhdpi-screen.png" />
        <splash density="port-ldpi" src="www/res/screen/android/drawable-port-ldpi-screen.png" />
        <splash density="port-mdpi" src="www/res/screen/android/drawable-port-mdpi-screen.png" />
        <splash density="port-hdpi" src="www/res/screen/android/drawable-port-hdpi-screen.png" />
        <splash density="port-xhdpi" src="www/res/screen/android/drawable-port-xhdpi-screen.png" />
        <splash density="port-xxhdpi" src="www/res/screen/android/drawable-port-xxhdpi-screen.png" />
        <splash density="port-xxxhdpi" src="www/res/screen/android/drawable-port-xxxhdpi-screen.png" />
        <resource-file src="www/res/notification/android/drawable-mdpi/notification_icon.png" target="app/src/main/res/drawable-mdpi/notification_icon.png" />
        <resource-file src="www/res/notification/android/drawable-hdpi/notification_icon.png" target="app/src/main/res/drawable-hdpi/notification_icon.png" />
        <resource-file src="www/res/notification/android/drawable-xhdpi/notification_icon.png" target="app/src/main/res/drawable-xhdpi/notification_icon.png" />
        <resource-file src="www/res/notification/android/drawable-xxhdpi/notification_icon.png" target="app/src/main/res/drawable-xxhdpi/notification_icon.png" />
        <resource-file src="www/res/notification/android/drawable-xxxhdpi/notification_icon.png" target="app/src/main/res/drawable-xxxhdpi/notification_icon.png" />
    </platform>
    <platform name="ios">
        <icon height="57" platform="ios" src="www/res/icon/ios/icon.png" width="57" />
        <icon height="20" platform="ios" src="www/res/icon/ios/icon-20.png" width="20" />
        <icon height="88" platform="ios" src="www/res/icon/ios/icon-44@2x.png" width="88" />
        <icon height="48" platform="ios" src="www/res/icon/ios/icon-24@2x.png" width="48" />
        <icon height="172" platform="ios" src="www/res/icon/ios/icon-86@2x.png" width="172" />
        <icon height="196" platform="ios" src="www/res/icon/ios/icon-98@2x.png" width="196" />
        <icon height="216" platform="ios" src="www/res/icon/ios/icon-108@2x.png" width="216" />
        <icon height="55" platform="ios" src="www/res/icon/ios/icon-27.5@2x.png" width="55" />
        <icon height="114" platform="ios" src="www/res/icon/ios/icon@2x.png" width="114" />
        <icon height="40" platform="ios" src="www/res/icon/ios/icon-small-40.png" width="40" />
        <icon height="80" platform="ios" src="www/res/icon/ios/icon-small-40@2x.png" width="80" />
        <icon height="120" platform="ios" src="www/res/icon/ios/icon-small-40@3x.png" width="120" />
        <icon height="50" platform="ios" src="www/res/icon/ios/icon-small-50.png" width="50" />
        <icon height="100" platform="ios" src="www/res/icon/ios/icon-small-50@2x.png" width="100" />
        <icon height="60" platform="ios" src="www/res/icon/ios/icon-60.png" width="60" />
        <icon height="120" platform="ios" src="www/res/icon/ios/icon-60@2x.png" width="120" />
        <icon height="180" platform="ios" src="www/res/icon/ios/icon-60@3x.png" width="180" />
        <icon height="72" platform="ios" src="www/res/icon/ios/icon-72.png" width="72" />
        <icon height="144" platform="ios" src="www/res/icon/ios/icon-72@2x.png" width="144" />
        <icon height="76" platform="ios" src="www/res/icon/ios/icon-76.png" width="76" />
        <icon height="152" platform="ios" src="www/res/icon/ios/icon-76@2x.png" width="152" />
        <icon height="29" platform="ios" src="www/res/icon/ios/icon-small.png" width="29" />
        <icon height="58" platform="ios" src="www/res/icon/ios/icon-small@2x.png" width="58" />
        <icon height="87" platform="ios" src="www/res/icon/ios/icon-small@3x.png" width="87" />
        <icon height="167" platform="ios" src="www/res/icon/ios/icon-167.png" width="167" />
        <icon height="1024" platform="ios" src="www/res/icon/ios/icon-1024.png" width="1024" />
        <splash src="www/res/screen/ios/Default@2x~universal~anyany.png" />
    </platform>
    <platform name="wp8">
        <icon height="99" platform="wp8" src="www/res/icon/wp8/ApplicationIcon.png" width="99" />
        <icon height="159" platform="wp8" src="www/res/icon/wp8/Background.png" width="159" />
        <splash height="1280" platform="wp8" src="www/res/screen/wp8/screen-portrait.jpg" width="768" />
    </platform>
    <platform name="windows">
        <icon height="150" platform="windows" src="www/res/icon/windows/Square150x150Logo.scale-100.png" width="150" />
        <icon height="30" platform="windows" src="www/res/icon/windows/Square30x30Logo.scale-100.png" width="30" />
        <icon height="50" platform="windows" src="www/res/icon/windows/StoreLogo.scale-100.png" width="50" />
        <splash height="300" platform="windows" src="www/res/screen/windows/SplashScreen.scale-100.png" width="620" />
        <icon height="120" platform="windows" src="www/res/icon/windows/StoreLogo.scale-240.png" width="120" />
        <icon height="44" platform="windows" src="www/res/icon/windows/Square44x44Logo.scale-100.png" width="44" />
        <icon height="106" platform="windows" src="www/res/icon/windows/Square44x44Logo.scale-240.png" width="106" />
        <icon height="70" platform="windows" src="www/res/icon/windows/Square70x70Logo.scale-100.png" width="70" />
        <icon height="71" platform="windows" src="www/res/icon/windows/Square71x71Logo.scale-100.png" width="71" />
        <icon height="170" platform="windows" src="www/res/icon/windows/Square71x71Logo.scale-240.png" width="170" />
        <icon height="360" platform="windows" src="www/res/icon/windows/Square150x150Logo.scale-240.png" width="360" />
        <icon height="310" platform="windows" src="www/res/icon/windows/Square310x310Logo.scale-100.png" width="310" />
        <icon height="150" platform="windows" src="www/res/icon/windows/Wide310x150Logo.scale-100.png" width="310" />
        <icon height="360" platform="windows" src="www/res/icon/windows/Wide310x150Logo.scale-240.png" width="744" />
        <splash height="1920" platform="windows" src="www/res/screen/windows/SplashScreenPhone.scale-240.png" width="1152" />
    </platform>

    <allow-navigation href="*" />
    <allow-intent href="*" />
    
    <access origin="cdvfile://*" />

    <access allows-arbitrary-loads-for-media="true" allows-arbitrary-loads-in-web-content="true" allows-local-networking="true" minimum-tls-version="TLSv1.1" origin="*" requires-certificate-transparency="true" requires-forward-secrecy="false" />
    <plugin name="cordova-plugin-device" spec="~1.1.1" />
    <plugin name="cordova-plugin-fullscreen" spec="^1.3.0" />
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
        <config-file parent="NSCameraUsageDescription" target="*-Info.plist">
            <string>This Application can allow your camera to make avatar or post photo, if you want.</string>
        </config-file>
        <preference name="NativeXHRLogging" value="full" />
        <preference name="AllowUntrustedCerts"  value="true" />
        <preference name="InterceptRemoteRequests" value="all" />
        <preference name="allowFileAccessFromFileURLs" value="true" />
        <preference name="allowUniversalAccessFromFileURLs" value="true" />

        <config-file target="*-Info.plist" parent="CFBundleURLTypes">
        <array>
            <dict>
                <key>CFBundleTypeRole</key>
                <string>Editor</string>
                <key>CFBundleURLName</key>
                <string>REVERSED_CLIENT_ID</string>
                <key>CFBundleURLSchemes</key>
                <array>
                    <string>com.googleusercontent.apps.1020521924918-0he8n2cuadpvdm9mi2dv9vj8llr8pgr1</string>
                </array>
            </dict>
        </array>
        </config-file>

    </platform>
    <platform name="android">

        <preference name="AndroidXEnabled" value="true" />

        <edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application">
            <application android:usesCleartextTraffic="true" android:requestLegacyExternalStorage="true"/>
        </edit-config>

        <config-file target="AndroidManifest.xml" parent="/manifest">
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
            <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
        </config-file>

        <preference name="AndroidPersistentFileLocation" value="Compatibility" />

    </platform>

    <universal-links>
        <ios-team-id value="Y5JW9JU787"/>

        <host name="pocketnet.app" scheme="https">
            <path url="*" event="nav-message" />
        </host>

        <host name="test.pocketnet.app" scheme="https">
            <path url="*" event="nav-message" />
        </host>

        <host name="bastyon.com" scheme="https">
            <path url="*" event="nav-message" />
        </host>

        <host name="test.bastyon.com" scheme="https">
            <path url="*" event="nav-message" />
        </host>

    </universal-links>
</widget>
