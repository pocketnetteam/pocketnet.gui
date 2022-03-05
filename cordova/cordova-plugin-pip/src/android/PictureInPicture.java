package cordova.plugin.pip;

import android.content.Context;
import android.content.Intent;
import android.app.PictureInPictureParams;
import android.util.Rational;
import android.util.Log;
import android.os.Bundle;
import android.os.Build;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import android.content.res.Configuration;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class PictureInPicture extends CordovaPlugin {
    private final PictureInPictureParams.Builder pictureInPictureParamsBuilder = new PictureInPictureParams.Builder();
    private CallbackContext callback = null;

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(action.equals("enter")){
            Double width = args.getDouble(0);
            Double height = args.getDouble(1);
            this.enterPip(width, height, callbackContext);
            return true;
        } else if(action.equals("isPip")){
            this.isPip(callbackContext);
            return true;
        } 

        else if(action.equals("leavePip")){
            this.leavePip(callbackContext);
            return true;
        } 
        
        else if(action.equals("onPipModeChanged")){
            if(callback == null){
                callback = callbackContext; //save global callback for later callbacks
                PluginResult pluginResult = new PluginResult(PluginResult.Status.NO_RESULT); //send no result to execute the callbacks later
                pluginResult.setKeepCallback(true); // Keep callback
            }
            return true;
        } else if(action.equals("isPipModeSupported")){
            this.isPipModeSupported(callbackContext);
            return true;
        } 
        return false;
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig){
        if(callback != null){
            try{
                if(this.cordova.getActivity().isInPictureInPictureMode()){
                    this.callbackFunction(true, "true");
                } else {
                    this.callbackFunction(true, "false");
                }
            } catch(Exception e){
                String stackTrace = Log.getStackTraceString(e);
                this.callbackFunction(false, stackTrace);
            }
        }
    }

    public void callbackFunction(boolean op, String str){
        if(op){
            PluginResult result = new PluginResult(PluginResult.Status.OK, str);
            result.setKeepCallback(true);
            callback.sendPluginResult(result);
        } else {
            PluginResult result = new PluginResult(PluginResult.Status.ERROR, str);
            result.setKeepCallback(true);
            callback.sendPluginResult(result);
        }
    }

    private void enterPip(Double width, Double height, CallbackContext callbackContext) {
        try{
            if(width != null && width > 0 && height != null && height > 0){
                Rational aspectRatio = new Rational(Integer.valueOf(width.intValue()), Integer.valueOf(height.intValue()));
                pictureInPictureParamsBuilder.setAspectRatio(aspectRatio).build();
                this.cordova.getActivity().enterPictureInPictureMode(pictureInPictureParamsBuilder.build());

                callbackContext.success("Scaled picture-in-picture mode started.");
            } else {
                this.cordova.getActivity().enterPictureInPictureMode();

                callbackContext.success("Default picture-in-picture mode started.");
            }
        } catch(Exception e){
            String stackTrace = Log.getStackTraceString(e);
            callbackContext.error(stackTrace);
        }             
    }

    private void leavePip(CallbackContext callbackContext) {
        try{

            this.cordova.getActivity().moveTaskToBack(false);

            callbackContext.success("Picture-in-picture mode exit.");

        } catch(Exception e){
            String stackTrace = Log.getStackTraceString(e);
            callbackContext.error(stackTrace);
        }             
    }

    public void isPip(CallbackContext callbackContext) {
        try{
            if(this.cordova.getActivity().isInPictureInPictureMode()){
                callbackContext.success("true");
            } else {
                callbackContext.success("false");
            }
        } catch(Exception e){
            String stackTrace = Log.getStackTraceString(e);
            callbackContext.error(stackTrace);
        }
    }

    private void isPipModeSupported(CallbackContext callbackContext) {
        try{
            boolean supported = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O; //>= SDK 26 //Oreo

            if(supported){
                callbackContext.success("true");
            } else {
                callbackContext.success("false");
            }
        } catch(Exception e){
            String stackTrace = Log.getStackTraceString(e);
            callbackContext.error(stackTrace);
        }
    }
}