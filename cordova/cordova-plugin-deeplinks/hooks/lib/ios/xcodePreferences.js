/*
Script activates support for Universal Links in the application by setting proper preferences in the xcode project file.
Which is:
- deployment target set to iOS 9.0
- .entitlements file added to project PBXGroup and PBXFileReferences section
- path to .entitlements file added to Code Sign Entitlements preference

cordova-ios 6+ signs the app with its own Entitlements-Debug/Release.plist (domains are written there
by projectEntitlements.js), so Code Sign Entitlements is not overridden: otherwise the entitlements of
other plugins (aps-environment, app groups) and of the share extension target are lost.
*/

var path = require('path');
var compare = require('node-version-compare');
var projectPaths = require('./projectPaths.js');
var IOS_DEPLOYMENT_TARGET = '13.0';
var COMMENT_KEY = /_comment$/;
var context;

module.exports = {
  enableAssociativeDomainsCapability: enableAssociativeDomainsCapability
}

// region Public API

/**
 * Activate associated domains capability for the application.
 *
 * @param {Object} cordovaContext - cordova context object
 */
function enableAssociativeDomainsCapability(cordovaContext) {
  context = cordovaContext;

  var projectFile = loadProjectFile();
  var useCordovaEntitlements = projectPaths.getCordovaEntitlementsFiles(context).length > 0;

  // adjust preferences
  activateAssociativeDomains(projectFile.xcode, useCordovaEntitlements);

  // add entitlements file to pbxfilereference
  if (!useCordovaEntitlements) {
    addPbxReference(projectFile.xcode);
  }

  // save changes
  projectFile.write();
}

// endregion

// region Alter project file preferences

/**
 * Activate associated domains support in the xcode project file:
 * - set deployment target to ios 9;
 * - add .entitlements file to Code Sign Entitlements preference.
 *
 * @param {Object} xcodeProject - xcode project preferences; all changes are made in that instance
 */
function activateAssociativeDomains(xcodeProject, useCordovaEntitlements) {
  var configurations = nonComments(xcodeProject.pbxXCBuildConfigurationSection());
  var entitlementsFilePath = pathToEntitlementsFile();
  var legacyCodeSignEntitlements = '"' + entitlementsFilePath + '"';
  var config;
  var buildSettings;
  var deploymentTargetIsUpdated;

  for (config in configurations) {
    buildSettings = configurations[config].buildSettings;

    if (!useCordovaEntitlements) {
      buildSettings['CODE_SIGN_ENTITLEMENTS'] = legacyCodeSignEntitlements;
    } else if (buildSettings['CODE_SIGN_ENTITLEMENTS'] === legacyCodeSignEntitlements) {
      // set by the previous version of this hook: return the cordova default for the app,
      // the share extension (cc.fovea.cordova.openwith) sets its own value on prepare
      if (String(buildSettings['PRODUCT_NAME'] || '').indexOf('ShareExt') >= 0) {
        delete buildSettings['CODE_SIGN_ENTITLEMENTS'];
      } else {
        buildSettings['CODE_SIGN_ENTITLEMENTS'] = projectPaths.CORDOVA_CODE_SIGN_ENTITLEMENTS;
      }
    }

    // if deployment target is less then the required one - increase it
    if (buildSettings['IPHONEOS_DEPLOYMENT_TARGET']) {
      if (compare(buildSettings['IPHONEOS_DEPLOYMENT_TARGET'], IOS_DEPLOYMENT_TARGET) == -1) {
        buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = IOS_DEPLOYMENT_TARGET;
        deploymentTargetIsUpdated = true;
      }
    } else {
      buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = IOS_DEPLOYMENT_TARGET;
      deploymentTargetIsUpdated = true;
    }
  }

  if (deploymentTargetIsUpdated) {
    console.log('IOS project now has deployment target set as: ' + IOS_DEPLOYMENT_TARGET);
  }

  if (!useCordovaEntitlements) {
    console.log('IOS project Code Sign Entitlements now set to: ' + entitlementsFilePath);
  }
}

// endregion

// region PBXReference methods

/**
 * Add .entitlemets file into the project.
 *
 * @param {Object} xcodeProject - xcode project preferences; all changes are made in that instance
 */
function addPbxReference(xcodeProject) {
  var fileReferenceSection = nonComments(xcodeProject.pbxFileReferenceSection());
  var entitlementsFileName = path.basename(pathToEntitlementsFile());

  if (isPbxReferenceAlreadySet(fileReferenceSection, entitlementsFileName)) {
    console.log('Entitlements file is in reference section.');
    return;
  }

  console.log('Entitlements file is not in references section, adding it');
  xcodeProject.addResourceFile(entitlementsFileName);
}

/**
 * Check if .entitlemets file reference already set.
 *
 * @param {Object} fileReferenceSection - PBXFileReference section
 * @param {String} entitlementsRelativeFilePath - relative path to entitlements file
 * @return true - if reference is set; otherwise - false
 */
function isPbxReferenceAlreadySet(fileReferenceSection, entitlementsRelativeFilePath) {
  var isAlreadyInReferencesSection = false;
  var uuid;
  var fileRefEntry;

  for (uuid in fileReferenceSection) {
    fileRefEntry = fileReferenceSection[uuid];
    if (fileRefEntry.path && fileRefEntry.path.indexOf(entitlementsRelativeFilePath) > -1) {
      isAlreadyInReferencesSection = true;
      break;
    }
  }

  return isAlreadyInReferencesSection;
}

// region Xcode project file helpers

/**
 * Load iOS project file from platform specific folder.
 *
 * @return {Object} projectFile - project file information
 */
function loadProjectFile() {
  var platform_ios;
  var projectFile;
  
  try {
      // try pre-5.0 cordova structure
      platform_ios = context.requireCordovaModule('cordova-lib/src/plugman/platforms')['ios'];
      projectFile = platform_ios.parseProjectFile(iosPlatformPath());
  } catch (e) {
      try {
          // let's try cordova 5.0 structure
          platform_ios = context.requireCordovaModule('cordova-lib/src/plugman/platforms/ios');
          projectFile = platform_ios.parseProjectFile(iosPlatformPath());
      } catch (e) {
          // Then cordova 7.0
          var project_files = findPbxprojFiles(iosPlatformPath());
          
          if (project_files.length === 0) {
              throw new Error('does not appear to be an xcode project (no xcode project file)');
          }
          
          var pbxPath = project_files[0];
          
          var xcodeproj = requireXcode().project(pbxPath);
          xcodeproj.parseSync();
          
          projectFile = {
              'xcode': xcodeproj,
              write: function () {
                  var fs = require('fs');
                  
              var frameworks_file = path.join(iosPlatformPath(), 'frameworks.json');
              var frameworks = {};
              try {
                  frameworks = context.requireCordovaModule(frameworks_file);
              } catch (e) { }
              
              fs.writeFileSync(pbxPath, xcodeproj.writeSync());
                  if (Object.keys(frameworks).length === 0){
                      // If there is no framework references remain in the project, just remove this file
                      fs.rmSync(frameworks_file, { force: true });
                      return;
                  }
                  fs.writeFileSync(frameworks_file, JSON.stringify(frameworks, null, 4));
              }
          };
      }
  }
  
  return projectFile;
  }

// glob, xcode and shelljs are not dependencies of this plugin:
// use fs and the xcode module that comes with cordova-ios
function findPbxprojFiles(platformPath) {
  var fs = require('fs');

  return fs.readdirSync(platformPath).filter(function (name) {
    return /\.xcodeproj$/.test(name);
  }).map(function (name) {
    return path.join(platformPath, name, 'project.pbxproj');
  }).filter(function (file) {
    return fs.existsSync(file);
  });
}

function requireXcode() {
  var root = context.opts.projectRoot;
  var places = [
    'xcode',
    path.join(root, 'node_modules', 'xcode'),
    path.join(root, 'node_modules', 'cordova-ios', 'node_modules', 'xcode')
  ];

  for (var i = 0; i < places.length; i++) {
    try {
      return require(places[i]);
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') throw e;
    }
  }

  throw new Error('cordova-plugin-deeplinks: module "xcode" not found');
}

/**
 * Remove comments from the file.
 *
 * @param {Object} obj - file object
 * @return {Object} file object without comments
 */
function nonComments(obj) {
  var keys = Object.keys(obj);
  var newObj = {};

  for (var i = 0, len = keys.length; i < len; i++) {
    if (!COMMENT_KEY.test(keys[i])) {
      newObj[keys[i]] = obj[keys[i]];
    }
  }

  return newObj;
}

// endregion

// region Path helpers

function iosPlatformPath() {
  return path.join(projectRoot(), 'platforms', 'ios');
}

function projectRoot() {
  return context.opts.projectRoot;
}

function pathToEntitlementsFile() {
  var projectName = projectPaths.getProjectName(context),
    fileName = projectName + '.entitlements';

  return path.join(projectName, 'Resources', fileName);
}

// endregion
