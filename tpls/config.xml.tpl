<?xml version='1.0' encoding='utf-8'?>
<widget id="pocketnet.app" android-versionCode="__PACKAGE-CORDOVAVERSIONCODE__" android-packageName="pocketnet.app" ios-CFBundleIdentifier="app.pocketnet" version="__PACKAGE-CORDOVAVERSION__" xmlns="http://www.w3.org/ns/widgets" xmlns:android="http://schemas.android.com/apk/res/android" xmlns:cdv="http://cordova.apache.org/ns/1.0" xmlns:tools="http://schemas.android.com/tools">
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
    <preference name="android-targetSdkVersion" value="32" />
    <preference name="loadUrlTimeoutValue" value="700000" />
    <preference name="SplashScreen" value="screen" />
    <preference name="SplashShowOnlyFirstTime" value="true" />
    <preference name="AutoHideSplashScreen" value="false" />
    <preference name="FadeSplashScreen" value="false" />
    <preference name="SplashMaintainAspectRatio" value="true" />
    <preference name="ShowSplashScreenSpinner" value="false" />
    <preference name="StatusBarOverlaysWebView" value="true" />
    <preference name="StatusBarBackgroundColor" value="#000000" />
    <preference name="AndroidWindowSplashScreenBackground" value="#011621" />
    <preference name="AndroidWindowSplashScreenIconBackgroundColor" value="#011621" />
    <preference name="BackgroundColor" value="#011621" />
    <preference name="StatusBarStyle" value="lightcontent" />
    <preference name="AndroidLaunchMode" value="singleTask" />
    <preference name="Fullscreen" value="false" />
    <preference name="AllowInlineMediaPlayback" value="true"/>
    <preference name="AndroidExtraFilesystems" value="files-external,documents,sdcard,cache,cache-external,assets,root" />
    <preference name="AndroidWindowSplashScreenAnimatedIcon" value="resources/android/splash/splash-screen-logo.xml" />
   
    <preference name="KeyboardResize" value="false" />

    <platform name="android">
        <icon density="ldpi" src="resources/android/icon/drawable-ldpi-icon.png" />
        <icon density="mdpi" src="resources/android/icon/drawable-mdpi-icon.png" />
        <icon density="hdpi" src="resources/android/icon/drawable-hdpi-icon.png" />
        <icon density="xhdpi" src="resources/android/icon/drawable-xhdpi-icon.png" />
        <icon density="xxhdpi" src="resources/android/icon/drawable-xxhdpi-icon.png" />
        <icon density="xxxhdpi" src="resources/android/icon/drawable-xxxhdpi-icon.png" />

        <resource-file src="resources/android/colors.xml" target="app/src/main/res/values/colors.xml" />
        
        <!--<splash density="land-ldpi" src="resources/android/splash/drawable-land-ldpi-screen.png" />
        <splash density="land-mdpi" src="resources/android/splash/drawable-land-mdpi-screen.png" />
        <splash density="land-hdpi" src="resources/android/splash/drawable-land-hdpi-screen.png" />
        <splash density="land-xhdpi" src="resources/android/splash/drawable-land-xhdpi-screen.png" />
        <splash density="land-xxhdpi" src="resources/android/splash/drawable-land-xxhdpi-screen.png" />
        <splash density="land-xxxhdpi" src="resources/android/splash/drawable-land-xxxhdpi-screen.png" />
        <splash density="port-ldpi" src="resources/android/splash/drawable-port-ldpi-screen.png" />
        <splash density="port-mdpi" src="resources/android/splash/drawable-port-mdpi-screen.png" />
        <splash density="port-hdpi" src="resources/android/splash/drawable-port-hdpi-screen.png" />
        <splash density="port-xhdpi" src="resources/android/splash/drawable-port-xhdpi-screen.png" />
        <splash density="port-xxhdpi" src="resources/android/splash/drawable-port-xxhdpi-screen.png" />
        <splash density="port-xxxhdpi" src="resources/android/splash/drawable-port-xxxhdpi-screen.png" />-->
      
    </platform>
    <platform name="ios">
        <icon height="57" src="resources/ios/icon/icon.png" width="57" />
        <icon height="114" src="resources/ios/icon/icon@2x.png" width="114" />
        <icon height="20" src="resources/ios/icon/icon-20.png" width="20" />
        <icon height="40" src="resources/ios/icon/icon-20@2x.png" width="40" />
        <icon height="60" src="resources/ios/icon/icon-20@3x.png" width="60" />
        <icon height="29" src="resources/ios/icon/icon-29.png" width="29" />
        <icon height="58" src="resources/ios/icon/icon-29@2x.png" width="58" />
        <icon height="87" src="resources/ios/icon/icon-29@3x.png" width="87" />
        <icon height="48" src="resources/ios/icon/icon-24@2x.png" width="48" />
        <icon height="55" src="resources/ios/icon/icon-27.5@2x.png" width="55" />
        <icon height="88" src="resources/ios/icon/icon-44@2x.png" width="88" />
        <icon height="172" src="resources/ios/icon/icon-86@2x.png" width="172" />
        <icon height="196" src="resources/ios/icon/icon-98@2x.png" width="196" />
        <icon height="216" src="resources/ios/icon/icon-108@2x.png" width="216" />
        <icon height="40" src="resources/ios/icon/icon-40.png" width="40" />
        <icon height="80" src="resources/ios/icon/icon-40@2x.png" width="80" />
        <icon height="120" src="resources/ios/icon/icon-40@3x.png" width="120" />
        <icon height="50" src="resources/ios/icon/icon-50.png" width="50" />
        <icon height="100" src="resources/ios/icon/icon-50@2x.png" width="100" />
        <icon height="60" src="resources/ios/icon/icon-60.png" width="60" />
        <icon height="120" src="resources/ios/icon/icon-60@2x.png" width="120" />
        <icon height="180" src="resources/ios/icon/icon-60@3x.png" width="180" />
        <icon height="72" src="resources/ios/icon/icon-72.png" width="72" />
        <icon height="144" src="resources/ios/icon/icon-72@2x.png" width="144" />
        <icon height="76" src="resources/ios/icon/icon-76.png" width="76" />
        <icon height="152" src="resources/ios/icon/icon-76@2x.png" width="152" />
        <icon height="167" src="resources/ios/icon/icon-83.5@2x.png" width="167" />
        <icon height="1024" src="resources/ios/icon/icon-1024.png" width="1024" />
        <splash height="1136" src="resources/ios/splash/Default-568h@2x~iphone.png" width="640" />
        <splash height="1334" src="resources/ios/splash/Default-667h.png" width="750" />
        <splash height="2688" src="resources/ios/splash/Default-2688h~iphone.png" width="1242" />
        <splash height="1242" src="resources/ios/splash/Default-Landscape-2688h~iphone.png" width="2688" />
        <splash height="1792" src="resources/ios/splash/Default-1792h~iphone.png" width="828" />
        <splash height="828" src="resources/ios/splash/Default-Landscape-1792h~iphone.png" width="1792" />
        <splash height="2436" src="resources/ios/splash/Default-2436h.png" width="1125" />
        <splash height="1125" src="resources/ios/splash/Default-Landscape-2436h.png" width="2436" />
        <splash height="2208" src="resources/ios/splash/Default-736h.png" width="1242" />
        <splash height="1242" src="resources/ios/splash/Default-Landscape-736h.png" width="2208" />
        <splash height="1536" src="resources/ios/splash/Default-Landscape@2x~ipad.png" width="2048" />
        <splash height="2048" src="resources/ios/splash/Default-Landscape@~ipadpro.png" width="2732" />
        <splash height="768" src="resources/ios/splash/Default-Landscape~ipad.png" width="1024" />
        <splash height="2048" src="resources/ios/splash/Default-Portrait@2x~ipad.png" width="1536" />
        <splash height="2732" src="resources/ios/splash/Default-Portrait@~ipadpro.png" width="2048" />
        <splash height="1024" src="resources/ios/splash/Default-Portrait~ipad.png" width="768" />
        <splash height="960" src="resources/ios/splash/Default@2x~iphone.png" width="640" />
        <splash height="480" src="resources/ios/splash/Default~iphone.png" width="320" />
        <splash height="2732" src="resources/ios/splash/Default@2x~universal~anyany.png" width="2732" />
    </platform>
    

    <allow-navigation href="*" />
    <allow-intent href="*" />
    
    <access origin="cdvfile://*" />

    <access allows-arbitrary-loads-for-media="true" allows-arbitrary-loads-in-web-content="true" allows-local-networking="true" minimum-tls-version="TLSv1.1" origin="*" requires-certificate-transparency="true" requires-forward-secrecy="false" />
    <plugin name="cordova-plugin-device" spec="~1.1.1" />
    

    <% if(!store) {%>

        <plugin name="cordova-plugin-apkupdater" spec="~4.0.0" />

    <% } %>

    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />

        <config-file parent="NSMicrophoneUsageDescription" target="*-Info.plist">
            <string>This Application uses your microphone to make voice messages</string>
        </config-file>

        <config-file parent="NSCameraUsageDescription" target="*-Info.plist">
            <string>Allow the application access to the camera to select photos for publication.</string>
        </config-file>
   
        <config-file overwrite="true" parent="NSPhotoLibraryUsageDescription" target="*-Info.plist">
            <string>Allow the application access to the photo gallery to select photos for publication.</string>
        </config-file>

        <resource-file src="configs/de.lproj" />
        <resource-file src="configs/es.lproj" />
        <resource-file src="configs/fr.lproj" />
        <resource-file src="configs/it.lproj" />
        <resource-file src="configs/kr.lproj" />
        <resource-file src="configs/ru.lproj" />
        <resource-file src="configs/zh.lproj" />
       
        <preference name="UseSwiftLanguageVersion" value="4.2" />
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

        <!--<preference name="AndroidXEnabled" value="true" />-->

        <edit-config file="AndroidManifest.xml" target="/manifest" mode="merge">
            <manifest xmlns:tools="http://schemas.android.com/tools" />
        </edit-config>

        <edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application">
            <application android:hardwareAccelerated="true" android:largeHeap="true" android:usesCleartextTraffic="true" android:requestLegacyExternalStorage="true"/>
        </edit-config>

        <edit-config file="AndroidManifest.xml" target="/manifest" mode="merge">
            <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
            <uses-permission android:name="android.permission.RECORD_AUDIO" />
            <uses-permission android:name="android.permission.CAPTURE_AUDIO_OUTPUT" />
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
            <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
            <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
        </edit-config>

        

        <edit-config file="AndroidManifest.xml" target="/manifest/application/activity[@android:name='MainActivity']" mode="merge">
            <activity android:windowSoftInputMode="adjustPan" android:supportsPictureInPicture="true" android:configChanges="screenSize|smallestScreenSize|screenLayout|orientation"/>
        </edit-config>
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
