// Writes SWIFT_VERSION from the UseSwiftLanguageVersion preference into every
// build configuration of the iOS project on each prepare/build.
// cordova-plugin-add-swift-support sets it only on "platform add"/"prepare"
// and only when it is undefined, so Xcode was left with "Unspecified".

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

module.exports = function (context) {
	if ((context.opts.platforms || []).indexOf('ios') == -1) return;

	var projectRoot = context.opts.projectRoot;
	var iosPath = path.join(projectRoot, 'platforms', 'ios');

	if (!fs.existsSync(iosPath)) return;

	var configXml = fs.readFileSync(path.join(projectRoot, 'config.xml'), 'utf8');
	var swiftVersion = getPreference(configXml, 'UseSwiftLanguageVersion');
	var pbxprojPath = findPbxproj(iosPath);

	if (!swiftVersion || !pbxprojPath) return;

	var xcode = require('xcode');
	var project = xcode.project(pbxprojPath);

	project.parseSync();

	var configurations = project.pbxXCBuildConfigurationSection();

	Object.keys(configurations).forEach(function (key) {
		var buildSettings = configurations[key].buildSettings;

		if (!buildSettings) return;

		buildSettings['SWIFT_VERSION'] = swiftVersion;
	});

	fs.writeFileSync(pbxprojPath, project.writeSync());

	console.log('iosBuildSettings: SWIFT_VERSION = ' + swiftVersion);
}
