# Cordova Permit iOS getUserMedia Plugin

A Cordova plugin allowing the embedded web app (loaded from a file inside the
app bundle) to call
[`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
(part of browser WebRTC support) and show a camera view without triggering a new
iOS permission dialog every time.

The plugin does nothing on Android, has no JavaScript interface, and no
configuration options.

## Requirements

- iOS 15.0 or later is required
- Tested with `cordova-ios` v6.2.0

## How it works

During application load, the plugin creates and installs a custom `WKUIDelegate`
on the `WKWebView`. Whenever the JS code in the web view calls
`navigator.mediaDevices.getUserMedia`, the web view asks the delegate for a
“permission decision” by sending it a
[`webView:requestMediaCapturePermissionForOrigin:initiatedByFrame:type:decisionHandler:`](https://developer.apple.com/documentation/webkit/wkuidelegate/3763087-webview?language=objc)
message. The plugin checks the protocol of the origin, and if it’s `file` then
it makes an “allow” decision, which suppresses the permission dialog. For all
other origins it makes the default “prompt” decision, so if you’re running
`getUserMedia` from web pages loaded from outside the app, they will continue to
prompt for permission. If you need to allow that, feel free to fork this plugin.

Note that all other `WKUIDelegate` messages are forwarded to the original
delegate that was in place when this plugin is loaded, so the other functions of
`CDVWebViewUIDelegate` should continue to work. Be aware this might not work
properly if you’re using another plugin that tries to do something similar.

Note that the app itself needs permission to access the camera through the
normal iOS mechanism. That permission dialog will be triggered by the first call
you make to `getUserMedia`. You can (and should, because it’s an App Store
review failure if you don’t) customize the text of that popup to explain exactly
what your app needs the camera for. Do that in your Cordova `config.xml`
something like this:

```xml
<config-file overwrite="true" parent="NSCameraUsageDescription" platform="ios" target="*-Info.plist">
    <string>The app uses the camera to scan QR codes</string>
</config-file>
```

## License

The project is MIT licensed: [MIT](https://opensource.org/licenses/MIT).
