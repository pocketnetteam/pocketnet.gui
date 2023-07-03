package com.dooble.audiotoggle;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.media.AudioManager;

public class AudioTogglePlugin extends CordovaPlugin {
	public static final String ACTION_SET_AUDIO_MODE = "setAudioMode";
	public static final String ACTION_SET_CHECK_VIDEO_PERMISSION = "checkVideoPermission";
	public static final String ACTION_SET_CHECK_AUDIO_PERMISSION = "checkAudioPermission";
	
	@Override
	public boolean execute(String action, JSONArray args, 
			CallbackContext callbackContext) throws JSONException {	

		if (action.equals(ACTION_SET_AUDIO_MODE)) {

			String settings = args.getString(0);

			cordova.getThreadPool().execute(new Runnable() {
				@Override
				public void run() {
					setAudioMode(settings);
				}
			});

			return true;
		}

		if (action.equals(ACTION_SET_CHECK_VIDEO_PERMISSION)) {

			callbackContext.error("OnlyIOS");

			return true;
		}

		if (action.equals(ACTION_SET_CHECK_AUDIO_PERMISSION)) {

			callbackContext.error("OnlyIOS");

			return true;
		}
		
		callbackContext.error("Invalid action");
		return false;
	}
	
	public boolean setAudioMode(String mode) {
	    Context context = webView.getContext();
	    AudioManager audioManager = 
	    	(AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
	    
	    if (mode.equals("earpiece")) {
	    	audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
	    	audioManager.setSpeakerphoneOn(false);
	        return true;
	    } else if (mode.equals("speaker")) {        
	    	audioManager.setMode(AudioManager.STREAM_MUSIC);
	    	audioManager.setSpeakerphoneOn(true);
	        return true;
	    } else if (mode.equals("ringtone")) {        
	    	audioManager.setMode(AudioManager.MODE_RINGTONE);
	    	audioManager.setSpeakerphoneOn(false);
	        return true; 
	    } else if (mode.equals("normal")) {        
	    	audioManager.setMode(AudioManager.MODE_NORMAL);
	    	audioManager.setSpeakerphoneOn(false);
	        return true;
	    }
	    
	    return false;
	}

}
