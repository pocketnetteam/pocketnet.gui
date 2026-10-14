// Writes iOS build settings into the Xcode project on each prepare/build:
// - SWIFT_VERSION from the SwiftVersion preference (UseSwiftLanguageVersion of the
//   removed add-swift-support plugin is still read) for every target, including the share extension
// - IPHONEOS_DEPLOYMENT_TARGET from the deployment-target preference for every
//   target, including the share extension that cordova-ios does not manage.
// - the Crashlytics run script of firebasex is moved to the end of build phases (Release build cycle).
// Never fails the build: problems are only logged.

var fs = require('fs');
var path = require('path');

var getPreference = function (configXml, name) {
	var match = configXml.match(new RegExp('<preference\\s+name="' + name + '"\\s+value="([^"]*)"'));

	return match ? match[1] : null;
}

var findPbxproj = function (iosPath) {
	var project = fs.readdirSync(iosPath).find(function (name) {
		return /\.xcodeproj$/.test(name);
	});

	return project ? path.join(iosPath, project, 'project.pbxproj') : null;
}

// xcode is a cordova-ios dependency and may be not hoisted to node_modules
var requireXcode = function (projectRoot) {
	var places = [
		'xcode',
		path.join(projectRoot, 'node_modules', 'xcode'),
		path.join(projectRoot, 'node_modules', 'cordova-ios', 'node_modules', 'xcode')
	];

	for (var i = 0; i < places.length; i++) {
		try {
			return require(places[i]);
		} catch (e) {}
	}

	return null;
}

var lowerVersion = function (current, target) {
	if (!current) return true;

	return parseFloat(String(current).replace(/"/g, '')) < parseFloat(target);
}

var isCrashlyticsPhase = function (scripts, phase) {
	var script = scripts[phase.value];

	return !!(script && script.shellScript && String(script.shellScript).indexOf('FirebaseCrashlytics/run') != -1);
}

// firebasex appends the Crashlytics run script when the plugin is installed, so the
// share extension embed phase (Copy Files) ends up after it. The script needs the finished
// bundle and dSYM, which makes a build cycle in Release. The script has to be the last phase.
var moveCrashlyticsLast = function (project) {
	var objects = project.hash.project.objects;
	var scripts = objects.PBXShellScriptBuildPhase || {};
	var targets = objects.PBXNativeTarget || {};
	var moved = 0;

	Object.keys(targets).forEach(function (key) {
		var phases = targets[key].buildPhases;

		if (key.indexOf('_comment') != -1 || !phases || !phases.length) return;

		var crashlytics = phases.filter(function (phase) {
			return isCrashlyticsPhase(scripts, phase);
		});

		if (!crashlytics.length) return;

		var rest = phases.filter(function (phase) {
			return !isCrashlyticsPhase(scripts, phase);
		});

		if (phases.length - crashlytics.length == phases.indexOf(crashlytics[0])) return;

		targets[key].buildPhases = rest.concat(crashlytics);

		moved++;
	});

	return moved;
}

var apply = function (projectRoot) {
	var iosPath = path.join(projectRoot, 'platforms', 'ios');

	if (!fs.existsSync(iosPath)) return;

	var configXml = fs.readFileSync(path.join(projectRoot, 'config.xml'), 'utf8');
	var swiftVersion = getPreference(configXml, 'SwiftVersion') || getPreference(configXml, 'UseSwiftLanguageVersion');
	var deploymentTarget = getPreference(configXml, 'deployment-target');
	var pbxprojPath = findPbxproj(iosPath);

	if (!pbxprojPath) return;

	var xcode = requireXcode(projectRoot);

	if (!xcode) {
		console.warn('iosBuildSettings: xcode module not found, skipped');
		return;
	}

	var project = xcode.project(pbxprojPath);

	project.parseSync();

	var configurations = project.pbxXCBuildConfigurationSection();

	Object.keys(configurations).forEach(function (key) {
		var buildSettings = configurations[key].buildSettings;

		if (!buildSettings) return;

		if (swiftVersion) buildSettings['SWIFT_VERSION'] = swiftVersion;

		if (deploymentTarget && lowerVersion(buildSettings['IPHONEOS_DEPLOYMENT_TARGET'], deploymentTarget)) {
			buildSettings['IPHONEOS_DEPLOYMENT_TARGET'] = deploymentTarget;
		}
	});

	var movedCrashlytics = moveCrashlyticsLast(project);

	fs.writeFileSync(pbxprojPath, project.writeSync());

	console.log('iosBuildSettings: SWIFT_VERSION = ' + swiftVersion + ', IPHONEOS_DEPLOYMENT_TARGET >= ' + deploymentTarget);

	if (movedCrashlytics) console.log('iosBuildSettings: Crashlytics build phase moved to the end in ' + movedCrashlytics + ' target(s)');
}

module.exports = function (context) {
	if ((context.opts.platforms || []).indexOf('ios') == -1) return;

	try {
		apply(context.opts.projectRoot);
	} catch (e) {
		console.warn('iosBuildSettings: skipped, ' + (e && e.message ? e.message : e));
	}
}
