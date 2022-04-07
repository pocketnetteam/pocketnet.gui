---
Title: Information Installed Applications
description: Returns a custom list of applications installed on the system.
---
<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->


# cordova-plugin-android-packagemanager

A Cordova plugin that exposes a small subset of the fuctions from the Android Package Manager. Currently:

* `PackageManager.getInstalledPackages(PackageManager.GET_META_DATA | PackageManager.GET_GIDS)`
* `PackageManager.getInstallApplications(PackageManager.GET_META_DATA)`
* `PackageManager.getPackageInfo(..) /* some flags supported, see usage */`
* `PackageManager.queryIntentActivities(..) /* see usage for details */`

Note that each of the functions also only returns a subset of the total data provided by the Package Manager classes.

Forked from a package by Fernando Arce ([here](https://github.com/fbsanches/cordova-plugin-packagemanager)).

## Installation

There is currently no NPM package available for this fork, and no current current plans to make this available via a NPM repo.

    cordova plugin add https://github.com/citadelgroup/cordova-plugin-android-packagemanager

### Usage

In all cases the first two parameters to each function call are the `success` and `error` callbacks.

    //Success Callback Receive
    function successCallback(data) {
        console.log(data); 
    }

    //Error Callback Receive
    function errorCallback(error) {
        console.log(error);
    }

#### `getInstalledPackages`

The `getInstalledPackages` function calls the equivalently named function on the Android Package Manager class, see [here](https://developer.android.com/reference/android/content/pm/PackageManager.html#getInstalledPackages(int)). The flags parameter to this function is _always_ `PackageManager.GET_META_DATA | PackageManager.GET_GIDS`.

    window.plugins.packagemanager.getInstalledPackages(successCallback, errorCallback);

The function will always return an array (empty if no results). The array will be of the form:

```json
[
    {
        applicationInfo: {
            dataDir: "/data/user/0/com.google.android.carriersetup"
            deviceProtectedDataDir: "/data/user_de/0/com.google.android.carriersetup"
            minSdkVersion: 28
            packageName: "com.google.android.carriersetup"
            processName: "com.google.android.carriersetup"
            targetSdkVersion: 28
            uid: 10146
            _extendedInfo: {
                applicationLabel: "Carrier Setup"
            }
        }
        firstInstallTime: 1230796800000
        gids: [ 3003 ]
        length: 1
        lastUpdateTime: 1230796800000
        packageName: "com.google.android.carriersetup"
        versionCode: 28
        versionName: "9"
    },
    ...
]
```

Note the  `_extendedInfo` element in the results with the Application Label. This is not part of the standard results from Package Manager in the Application Info object and is provided for convenience.

#### `getInstalledApplications`

The `getInstalledApplications` function calls the equivalently named function on the Android Package Manager class, see [here](https://developer.android.com/reference/android/content/pm/PackageManager.html#getInstalledApplications(int)). The flags parameter to this function is _always_ `PackageManager.GET_META_DATA`. 

Unlike `getInstalledPackages` (above), `getInstalledApplications` does not return the package information, and therefore does not provide any package version information.

```javascript
window.plugins.packagemanager.getInstalledApplications(
    successCallback,
    errorCallback
);
```

The function will always return an array (empty if no results). The array will be of the form:

```json
[
    {
        dataDir: "/data/user/0/com.google.android.carriersetup"
        deviceProtectedDataDir: "/data/user_de/0/com.google.android.carriersetup"
        minSdkVersion: 28
        packageName: "com.google.android.carriersetup"
        processName: "com.google.android.carriersetup"
        targetSdkVersion: 28
        uid: 10146
        _extendedInfo: {
            applicationLabel: "Carrier Setup"
        }
    },
    ...
]
```
Note the  `_extendedInfo` element in the results with the Application Label. This is not part of the standard results from Package Manager in the Application Info object and is provided for convenience.

#### `getPackageInfo`

The `getPackageInfo` function calls the equivalently named function on the Android Package Manager class, see [here](https://developer.android.com/reference/android/content/pm/PackageManager.html#getPackageInfo(java.lang.String,%20int)). This function allows a package to be queried by name (e.g. `com.google.android.carriersetup`), and may be supplied any, all or none of the flags `PackageManager.GET_META_DATA`, `PackageManager.MATCH_SYSTEM_ONLY`, `PackageManager.GET_GIDS`. If these values are supplied, they must be provided in a string array with only the constant value name (e.g. `'GET_META_DATA'`). If the flags array is omittied this is equivalent to calling the function with `flags = 0`.

```javascript
window.plugins.packagemanager.getPackageInfo(
    successCallback, 
    errorCallback, 
    'com.google.android.carriersetup', 
    ['GET_META_DATA', 'MATCH_SYSTEM_ONLY', 'GET_GIDS']
);
```

The function will always return an array (empty if no results). The array will be of the form:

```json
[
    {
        applicationInfo: {
            dataDir: "/data/user/0/com.google.android.carriersetup"
            deviceProtectedDataDir: "/data/user_de/0/com.google.android.carriersetup"
            minSdkVersion: 28
            packageName: "com.google.android.carriersetup"
            processName: "com.google.android.carriersetup"
            targetSdkVersion: 28
            uid: 10146
            _extendedInfo: {
                applicationLabel: "Carrier Setup"
            }
        }
        firstInstallTime: 1230796800000
        gids: [ 3003 ]
        length: 1
        lastUpdateTime: 1230796800000
        packageName: "com.google.android.carriersetup"
        versionCode: 28
        versionName: "9"
    },
    ...
]
```
Note the  `_extendedInfo` element in the results with the Application Label. This is not part of the standard results from Package Manager in the Application Info object and is provided for convenience.

#### `queryIntentActivities`

This intent query is intended to discover the 'runnable' activities on the device. The `queryIntentActivities` function calls the equivalently named function on the Android Package Manager class, see [here](https://developer.android.com/reference/android/content/pm/PackageManager.html#queryIntentActivities(android.content.Intent,%20int)). 

The `Intent` parameter to this function is constructed as follows.

```Java
Intent intent = new Intent(Intent.ACTION_MAIN, null);
intent.addCategory(Intent.CATEGORY_LAUNCHER);
```

The flags parameter to this function is _always_ `PackageManager.GET_META_DATA`.

```javascript
window.plugins.packagemanager.queryIntentActivities(
    successCallback,
    errorCallback
);
```

The function will always return an array (empty if no results). The array will be of the form:

```json
[
    {
        className: "org.chromium.chrome.browser.MonochromeApplication"
        dataDir: "/data/user/0/com.android.chrome"
        deviceProtectedDataDir: "/data/user_de/0/com.android.chrome"
        minSdkVersion: 24
        name: "org.chromium.chrome.browser.MonochromeApplication"
        packageName: "com.android.chrome"
        processName: "com.android.chrome"
        targetSdkVersion: 28
        uid: 10061
        _extendedInfo: {
            applicationLabel: "Chrome"
        }
    },
    ...
]
```
Note the  `_extendedInfo` element in the results with the Application Label. This is not part of the standard results from Package Manager in the Application Info object and is provided for convenience.

##### Supported Platforms

- Android
