/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

/**
 * This class contains information about the current the package manager.
 */

var exec = require('cordova/exec');

module.exports = {
  getInstalledApplications: function (successCallback, errorCallback) {
    var services = "packagemanager";
    var action = "getInstalledApplications";
    exec(successCallback, errorCallback, services, action, [{}]);
  },
  getInstalledPackages: function (successCallback, errorCallback) {
    var services = "packagemanager";
    var action = "getInstalledPackages";
    exec(successCallback, errorCallback, services, action, [{}]);
  },
  getInstallerPackageName: function (successCallback, errorCallback) {
    var services = "packagemanager";
    var action = "getInstallerPackageName";
    exec(successCallback, errorCallback, services, action, [{}]);
  },
  
  queryIntentActivities: function (successCallback, errorCallback) {
    var services = "packagemanager";
    var action = "queryIntentActivities";
    exec(successCallback, errorCallback, services, action, [{}]);
  },
  getPackageInfo: function (successCallback, errorCallback) {
    var services = "packagemanager";
    var action = "getPackageInfo";
    var argsArr = [].slice.call(arguments, 2, arguments.length)
    exec(successCallback, errorCallback, services, action, argsArr);
  },
  finishAndRemoveTask: function (successCallback, errorCallback) {
    var services = "packagemanager";
    var action = "finishAndRemoveTask";
    exec(successCallback, errorCallback, services, action, [{}]);
  }
}