/*
Paths of the generated iOS project.

The project name is taken from the .xcodeproj folder, the same way cordova-ios does it:
cordova-ios 8 always names the project "App", so the name from config.xml can't be used.

Cordova (cordova-ios 6+) signs the app with Entitlements-Debug.plist / Entitlements-Release.plist
from the project folder. Other plugins (firebasex: aps-environment, openwith: app groups) write there too.
*/

var path = require('path');
var fs = require('fs');
var ConfigXmlHelper = require('../configXmlHelper.js');
var CORDOVA_ENTITLEMENTS_FILES = ['Entitlements-Debug.plist', 'Entitlements-Release.plist'];

module.exports = {
  iosPlatformPath: iosPlatformPath,
  getProjectName: getProjectName,
  getCordovaEntitlementsFiles: getCordovaEntitlementsFiles,
  CORDOVA_CODE_SIGN_ENTITLEMENTS: '"$(PROJECT_DIR)/$(PROJECT_NAME)/Entitlements-$(CONFIGURATION).plist"'
};

function iosPlatformPath(cordovaContext) {
  return path.join(cordovaContext.opts.projectRoot, 'platforms', 'ios');
}

/**
 * Name of the Xcode project. Falls back to the name from config.xml when the platform is not added yet.
 */
function getProjectName(cordovaContext) {
  var files = [];

  try {
    files = fs.readdirSync(iosPlatformPath(cordovaContext));
  } catch (err) {}

  var xcodeproj = files.filter(function(name) {
    return /\.xcodeproj$/i.test(name) && name.indexOf('._') !== 0;
  })[0];

  if (xcodeproj) {
    return path.basename(xcodeproj, path.extname(xcodeproj));
  }

  return new ConfigXmlHelper(cordovaContext).getProjectName();
}

/**
 * Absolute paths of the entitlements files managed by cordova-ios; empty for old platform versions.
 */
function getCordovaEntitlementsFiles(cordovaContext) {
  var projectFolder = path.join(iosPlatformPath(cordovaContext), getProjectName(cordovaContext));

  return CORDOVA_ENTITLEMENTS_FILES.map(function(name) {
    return path.join(projectFolder, name);
  }).filter(function(filePath) {
    return fs.existsSync(filePath);
  });
}
