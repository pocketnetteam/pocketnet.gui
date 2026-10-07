// Writes iOS build settings into the Xcode project on each prepare/build:
// - SWIFT_VERSION from the UseSwiftLanguageVersion preference (add-swift-support
//   sets it only on "platform add"/"prepare", so Xcode showed "Unspecified")
// - IPHONEOS_DEPLOYMENT_TARGET from the deployment-target preference for every
//   target, including the share extension that cordova-ios does not manage.
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

var apply = function (projectRoot) {
	var iosPath = path.join(projectRoot, 'platforms', 'ios');

	if (!fs.existsSync(iosPath)) return;

	var configXml = fs.readFileSync(path.join(projectRoot, 'config.xml'), 'utf8');
	var swiftVersion = getPreference(configXml, 'UseSwiftLanguageVersion');
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

	fs.writeFileSync(pbxprojPath, project.writeSync());

	console.log('iosBuildSettings: SWIFT_VERSION = ' + swiftVersion + ', IPHONEOS_DEPLOYMENT_TARGET >= ' + deploymentTarget);
}

module.exports = function (context) {
	if ((context.opts.platforms || []).indexOf('ios') == -1) return;

	try {
		apply(context.opts.projectRoot);
	} catch (e) {
		console.warn('iosBuildSettings: skipped, ' + (e && e.message ? e.message : e));
	}
}
