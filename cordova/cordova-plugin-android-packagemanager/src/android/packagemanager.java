package au.com.citadelgroup.android;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageInfo;
import android.content.pm.ResolveInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.os.Build;
import android.util.Log;

import org.apache.cordova.PluginResult;

import java.util.ArrayList;
import java.util.List;

public class packagemanager extends CordovaPlugin {

    private static final boolean IS_AT_LEAST_LOLLIPOP = Build.VERSION.SDK_INT >= 21;
    private static final String LOGTAG = "cordovaPluginAndroidPackageManager";
    public boolean instApp = false;

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

        final Context context = IS_AT_LEAST_LOLLIPOP ? cordova.getActivity().getWindow().getContext() : cordova.getActivity().getApplicationContext();
        final PackageManager pm = context.getPackageManager();

        ArrayList<JSONObject> resultList = new ArrayList<JSONObject>();

        if("getInstallerPackageName".equals(action)){

            PluginResult pr = new PluginResult(PluginResult.Status.OK, getInstallerPackageName(pm, context));
            callbackContext.sendPluginResult(pr);
            return true;
            
        }
        
        switch (action) {

            case "getInstalledPackages":
                resultList.addAll(getInstalledPackages(pm));
                break;
            
            case "getInstalledApplications":
                resultList.addAll(getInstalledApplications(pm));
                break;

            case "getPackageInfo":
                resultList.addAll(getPackageInfo(pm, args));
                break;

            case "queryIntentActivities":
                resultList.addAll(queryIntentActivities(pm, args));
                break;

            case "finishAndRemoveTask":
                this.cordova.getActivity().finishAndRemoveTask();
                break;

            default:
                callbackContext.error("PackageManager " + action + " is not a supported function.");
                return false;
        }

        JSONArray jResult = new JSONArray(resultList);
        PluginResult pr = new PluginResult(PluginResult.Status.OK, jResult);
        callbackContext.sendPluginResult(pr);
        return true;
    }

    

    private static String getInstallerPackageName(PackageManager pm, Context context) throws JSONException {

        String packageName = "";

        try {
            packageName = pm.getInstallerPackageName(context.getPackageName());
        } catch (Throwable e) {          
        }
       
        return packageName;
    }

    private static List<JSONObject> getInstalledPackages(PackageManager pm) throws JSONException {
        ArrayList<JSONObject> pkgList = new ArrayList<JSONObject>();
        /* see https://developer.android.com/reference/android/content/pm/PackageManager.html#getInstalledPackages(int) */
        final int packageOptions = PackageManager.GET_META_DATA | PackageManager.GET_GIDS;

        List<PackageInfo> installedPackages = pm.getInstalledPackages(packageOptions);
        for (PackageInfo packageInfo : installedPackages) {
            JSONObject jsonPkgInfo = packageInfoToJson(pm, packageInfo);
            
            
            pkgList.add(jsonPkgInfo);
        }

        return pkgList;
    }

    private static List<JSONObject> getInstalledApplications(PackageManager pm) throws JSONException {
        ArrayList<JSONObject> appList = new ArrayList<JSONObject>();
        List<ApplicationInfo> installedAppsList = pm.getInstalledApplications(PackageManager.GET_META_DATA);
        for (ApplicationInfo appInfo : installedAppsList) {
            JSONObject jsonAppInfo = applicationInfoToJson(pm, appInfo);
            appList.add(jsonAppInfo);
        }

        return appList;
    }

    private static List<JSONObject> getPackageInfo(PackageManager pm, JSONArray args) throws JSONException {
        ArrayList<JSONObject> pkgList = new ArrayList<JSONObject>();

        int flags = 0;
        if (args != null && args.length() == 2) {
            JSONArray flagsArr = args.getJSONArray(1);
            for (int ii = 0; ii < flagsArr.length(); ii++) {
                switch(flagsArr.getString(ii)) {
                    case "GET_META_DATA":
                        flags = flags | PackageManager.GET_META_DATA;
                        break;
                    
                    case "MATCH_SYSTEM_ONLY":
                        flags = flags | PackageManager.MATCH_SYSTEM_ONLY;
                        break;

                    case "GET_GIDS":
                        flags = flags | PackageManager.GET_GIDS;
                        break;
                }
            }
        }

        try {
            PackageInfo pi = pm.getPackageInfo(args.getString(0), flags);
            JSONObject jo = packageInfoToJson(pm, pi);
            pkgList.add(jo);
        } catch (NameNotFoundException ex) {
            Log.e(LOGTAG, ex.toString());
        }

        return pkgList;
    }

    private static List<JSONObject> queryIntentActivities(PackageManager pm, JSONArray args) throws JSONException {
        ArrayList<JSONObject> pkgList = new ArrayList<JSONObject>();
        Intent intent = new Intent(Intent.ACTION_MAIN, null);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);

        List<ResolveInfo> apps = pm.queryIntentActivities(intent, PackageManager.GET_META_DATA);
        for (ResolveInfo resolveInfo : apps) {
            JSONObject jsonAppInfo = applicationInfoToJson(pm, resolveInfo.activityInfo.applicationInfo);
            pkgList.add(jsonAppInfo);
        }

        return pkgList;
    }

    private static JSONObject packageInfoToJson(PackageManager pm, PackageInfo packageInfo) throws JSONException {
        JSONObject jsonPkgInfo = new JSONObject();
        jsonPkgInfo.put("firstInstallTime", packageInfo.firstInstallTime);
        jsonPkgInfo.put("lastUpdateTime", packageInfo.lastUpdateTime);
        jsonPkgInfo.put("packageName", packageInfo.packageName);
        jsonPkgInfo.put("versionCode", packageInfo.versionCode);
        jsonPkgInfo.put("versionName", packageInfo.versionName);

        if (packageInfo.gids != null && packageInfo.gids.length > 0) {
            jsonPkgInfo.put("gids", new JSONArray(packageInfo.gids));
        }

        if (Build.VERSION.SDK_INT >=21 &&
                packageInfo.splitNames != null && 
                packageInfo.splitNames.length > 0) {
            jsonPkgInfo.put("splitNames", new JSONArray(packageInfo.splitNames));
        }

        
        JSONObject jsonAppInfo = applicationInfoToJson(pm, packageInfo.applicationInfo);
        jsonPkgInfo.put("applicationInfo", jsonAppInfo);

        return jsonPkgInfo;
    }

    private static JSONObject applicationInfoToJson(PackageManager pm, ApplicationInfo appInfo) throws JSONException {
        JSONObject jsonAppInfo = new JSONObject();
        if (appInfo == null) return null;

        jsonAppInfo.put("processName", appInfo.processName);
        jsonAppInfo.put("className", appInfo.className);
        jsonAppInfo.put("dataDir", appInfo.dataDir);
        jsonAppInfo.put("targetSdkVersion", appInfo.targetSdkVersion);
        jsonAppInfo.put("name", appInfo.name);
        jsonAppInfo.put("packageName", appInfo.packageName);
        jsonAppInfo.put("uid", appInfo.uid);

        if (Build.VERSION.SDK_INT >= 24) {
            jsonAppInfo.put("deviceProtectedDataDir", appInfo.deviceProtectedDataDir);
            jsonAppInfo.put("minSdkVersion", appInfo.minSdkVersion);
        }


        JSONObject extendedInfo = new JSONObject();
        extendedInfo.put("applicationLabel", pm.getApplicationLabel(appInfo).toString());
        jsonAppInfo.put("_extendedInfo", extendedInfo);

        return jsonAppInfo;
    }
}