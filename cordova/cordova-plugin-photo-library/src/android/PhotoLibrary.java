package com.terikon.cordova.photolibrary;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Base64;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

// Authorization statuses returned to JavaScript:
// "full"          - access to all photos
// "limited"       - access to photos selected by the user (Android 14+)
// "notDetermined" - the user has not been asked yet
// "denied"        - denied, the system dialog can be shown again
// "blocked"       - denied permanently, can be changed only in Settings

public class PhotoLibrary extends CordovaPlugin {
  private static final String TAG = "PhotoLibrary";

  public static final String STATUS_FULL = "full";
  public static final String STATUS_LIMITED = "limited";
  public static final String STATUS_NOT_DETERMINED = "notDetermined";
  public static final String STATUS_DENIED = "denied";
  public static final String STATUS_BLOCKED = "blocked";

  private static final String READ_EXTERNAL_STORAGE = "android.permission.READ_EXTERNAL_STORAGE";
  private static final String WRITE_EXTERNAL_STORAGE = "android.permission.WRITE_EXTERNAL_STORAGE";
  private static final String READ_MEDIA_IMAGES = "android.permission.READ_MEDIA_IMAGES";
  private static final String READ_MEDIA_VISUAL_USER_SELECTED = "android.permission.READ_MEDIA_VISUAL_USER_SELECTED";

  private static final String PREFERENCES = "cordova-plugin-photo-library";
  private static final String PREFERENCE_ASKED = "asked";

  private static final int REQUEST_AUTHORIZATION = 1;

  private PhotoLibraryService service;
  private CallbackContext authorizationCallback;

  @Override
  protected void pluginInitialize() {
    super.pluginInitialize();

    service = PhotoLibraryService.getInstance();
  }

  @Override
  public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {

    switch (action) {
      case "getAuthorizationStatus":
        callbackContext.success(getStatus());
        return true;

      case "requestAuthorization":
        requestAuthorization(callbackContext);
        return true;

      case "manageLimitedAccess":
        manageLimitedAccess(callbackContext);
        return true;

      case "openSettings":
        openSettings(callbackContext);
        return true;

      case "getLibrary":
        runInBackground(callbackContext, new BackgroundTask() {
          public void run() throws Exception {
            getLibrary(args, callbackContext);
          }
        });
        return true;

      case "getThumbnail":
        runInBackground(callbackContext, new BackgroundTask() {
          public void run() throws Exception {
            getThumbnail(args, callbackContext);
          }
        });
        return true;

      case "getPhoto":
        runInBackground(callbackContext, new BackgroundTask() {
          public void run() throws Exception {
            getPhoto(args, callbackContext);
          }
        });
        return true;

      case "saveImage":
        runInBackground(callbackContext, new BackgroundTask() {
          public void run() throws Exception {
            saveImage(args, callbackContext);
          }
        });
        return true;

      default:
        return false;
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    if (requestCode != REQUEST_AUTHORIZATION) {
      return;
    }

    getPreferences().edit().putBoolean(PREFERENCE_ASKED, true).apply();

    CallbackContext callbackContext = authorizationCallback;
    authorizationCallback = null;

    if (callbackContext != null) {
      sendAuthorizationResult(callbackContext);
    }
  }

  // Authorization

  private void requestAuthorization(CallbackContext callbackContext) {
    if (canRead() && canWrite()) {
      callbackContext.success(getStatus());
      return;
    }

    askPermissions(callbackContext);
  }

  // On Android 14+ asking again in limited mode shows the system dialog to select more photos
  private void manageLimitedAccess(CallbackContext callbackContext) {
    if (Build.VERSION.SDK_INT >= 34 && STATUS_LIMITED.equals(getStatus())) {
      askPermissions(callbackContext);
      return;
    }

    sendAuthorizationResult(callbackContext);
  }

  private void askPermissions(CallbackContext callbackContext) {
    if (authorizationCallback != null) {
      authorizationCallback.error(getStatus());
    }

    authorizationCallback = callbackContext;
    cordova.requestPermissions(this, REQUEST_AUTHORIZATION, getRequiredPermissions());
  }

  private void openSettings(CallbackContext callbackContext) {
    Activity activity = cordova.getActivity();
    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", activity.getPackageName(), null));

    try {
      activity.startActivity(intent);
      callbackContext.success("opened");
    } catch (Exception e) {
      LOG.e(TAG, "Could not open settings", e);
      callbackContext.error("Could not open settings");
    }
  }

  private void sendAuthorizationResult(CallbackContext callbackContext) {
    String status = getStatus();

    if (canRead()) {
      callbackContext.success(status);
    } else {
      callbackContext.error(status);
    }
  }

  private String getStatus() {
    if (Build.VERSION.SDK_INT >= 33 && hasPermission(READ_MEDIA_IMAGES)) {
      return STATUS_FULL;
    }

    if (Build.VERSION.SDK_INT >= 34 && hasPermission(READ_MEDIA_VISUAL_USER_SELECTED)) {
      return STATUS_LIMITED;
    }

    if (Build.VERSION.SDK_INT < 33 && hasPermission(READ_EXTERNAL_STORAGE)) {
      return STATUS_FULL;
    }

    if (!getPreferences().getBoolean(PREFERENCE_ASKED, false)) {
      return STATUS_NOT_DETERMINED;
    }

    String permission = Build.VERSION.SDK_INT >= 33 ? READ_MEDIA_IMAGES : READ_EXTERNAL_STORAGE;

    return cordova.getActivity().shouldShowRequestPermissionRationale(permission) ? STATUS_DENIED : STATUS_BLOCKED;
  }

  private String[] getRequiredPermissions() {
    if (Build.VERSION.SDK_INT >= 34) {
      return new String[] { READ_MEDIA_IMAGES, READ_MEDIA_VISUAL_USER_SELECTED };
    }

    if (Build.VERSION.SDK_INT == 33) {
      return new String[] { READ_MEDIA_IMAGES };
    }

    if (Build.VERSION.SDK_INT >= 29) {
      return new String[] { READ_EXTERNAL_STORAGE };
    }

    return new String[] { READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE };
  }

  private boolean canRead() {
    String status = getStatus();
    return STATUS_FULL.equals(status) || STATUS_LIMITED.equals(status);
  }

  // Since Android 10 images are saved through MediaStore without permissions
  private boolean canWrite() {
    return Build.VERSION.SDK_INT >= 29 || hasPermission(WRITE_EXTERNAL_STORAGE);
  }

  private boolean hasPermission(String permission) {
    return cordova.getActivity().checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED;
  }

  private SharedPreferences getPreferences() {
    return getContext().getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE);
  }

  // Library

  private void getLibrary(JSONArray args, final CallbackContext callbackContext) throws Exception {
    if (!canRead()) {
      callbackContext.error(PhotoLibraryService.PERMISSION_ERROR);
      return;
    }

    JSONObject options = args.optJSONObject(0);
    int itemsInChunk = options != null ? options.optInt("itemsInChunk", 0) : 0;
    int maxItems = options != null ? options.optInt("maxItems", 0) : 0;

    service.getLibrary(getContext(), itemsInChunk, maxItems, new PhotoLibraryService.ChunkCallback() {
      public void run(JSONArray chunk, int chunkNum, boolean isLastChunk) throws JSONException {
        JSONObject result = new JSONObject();
        result.put("chunkNum", chunkNum);
        result.put("isLastChunk", isLastChunk);
        result.put("library", chunk);

        PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, result);
        pluginResult.setKeepCallback(!isLastChunk);
        callbackContext.sendPluginResult(pluginResult);
      }
    });
  }

  private void getThumbnail(JSONArray args, CallbackContext callbackContext) throws Exception {
    if (!canRead()) {
      callbackContext.error(PhotoLibraryService.PERMISSION_ERROR);
      return;
    }

    String photoId = args.getString(0);
    JSONObject options = args.optJSONObject(1);
    int width = options != null ? options.optInt("thumbnailWidth", 256) : 256;
    int height = options != null ? options.optInt("thumbnailHeight", 256) : 256;
    double quality = options != null ? options.optDouble("quality", 0.7) : 0.7;

    sendPicture(callbackContext, service.getThumbnail(getContext(), photoId, width, height, quality), "Could not fetch the thumbnail");
  }

  private void getPhoto(JSONArray args, CallbackContext callbackContext) throws Exception {
    if (!canRead()) {
      callbackContext.error(PhotoLibraryService.PERMISSION_ERROR);
      return;
    }

    String photoId = args.getString(0);
    JSONObject options = args.optJSONObject(1);
    int maxWidth = options != null ? options.optInt("maxWidth", 2048) : 2048;
    int maxHeight = options != null ? options.optInt("maxHeight", 2048) : 2048;
    double quality = options != null ? options.optDouble("quality", 0.9) : 0.9;

    sendPicture(callbackContext, service.getPhoto(getContext(), photoId, maxWidth, maxHeight, quality), "Could not fetch the image");
  }

  private void saveImage(JSONArray args, CallbackContext callbackContext) throws Exception {
    if (!canWrite()) {
      callbackContext.error(PhotoLibraryService.PERMISSION_ERROR);
      return;
    }

    callbackContext.success(service.saveImage(getContext(), args.getString(0)));
  }

  // Helpers

  private interface BackgroundTask {
    void run() throws Exception;
  }

  private void runInBackground(final CallbackContext callbackContext, final BackgroundTask task) {
    cordova.getThreadPool().execute(new Runnable() {
      public void run() {
        try {
          task.run();
        } catch (Exception e) {
          LOG.e(TAG, "Photo library error", e);
          callbackContext.error(e.getMessage() != null ? e.getMessage() : "Photo library error");
        }
      }
    });
  }

  // cordova-android does not support multipart results, so data is sent as base64 in JSON
  private void sendPicture(CallbackContext callbackContext, PhotoLibraryService.PictureData picture, String errorMessage) throws JSONException {
    if (picture == null) {
      callbackContext.error(errorMessage);
      return;
    }

    JSONObject result = new JSONObject();
    result.put("data", Base64.encodeToString(picture.bytes, Base64.NO_WRAP));
    result.put("mimeType", picture.mimeType);

    callbackContext.success(result);
  }

  private Context getContext() {
    return cordova.getActivity().getApplicationContext();
  }
}
