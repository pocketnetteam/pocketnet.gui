package org.apache.cordova.statusbar;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;

/**
 * Replaces cordova-android's core SystemBarPlugin (registered under the same service name in plugin.xml).
 *
 * The core plugin repaints the status bar, the navigation bar and their icon appearance with the
 * config.xml colors on every onResume and onConfigurationChanged: after share sheets, file pickers,
 * permission dialogs and app switching. The app manages the system bars itself through the StatusBar
 * and NavigationBar plugins, so the core behavior is disabled here.
 */
public class SystemBarOverride extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        // Core JS API (window.statusbar) is not used by the app, keep the calls harmless
        if ("setStatusBarVisible".equals(action) || "setStatusBarBackgroundColor".equals(action)) {
            callbackContext.success();
            return true;
        }

        return false;
    }
}
