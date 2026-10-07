// Patches native sources of npm plugins in platforms/ios that have no fixed release.
// - cordova-plugin-x-socialsharing 6.0.4: UIApplication openURL: without options always
//   returns NO since iOS 18, so sharing text to WhatsApp did nothing (apache/cordova-ios#1511)
// Patches are idempotent. Never fails the build: problems are only logged.

var fs = require('fs');
var path = require('path');

var patches = [
	{
		plugin: 'cordova-plugin-x-socialsharing',
		file: 'SocialSharing.m',
		from: '[[UIApplication sharedApplication] openURL: whatsappURL];',
		to: '[[UIApplication sharedApplication] openURL: whatsappURL options:@{} completionHandler:nil];'
	}
]

var findProjectFolder = function (iosPath) {
	var project = fs.readdirSync(iosPath).find(function (name) {
		return /\.xcodeproj$/.test(name);
	});

	return project ? path.join(iosPath, path.basename(project, '.xcodeproj')) : null;
}

var applyPatch = function (projectFolder, patch) {
	var filePath = path.join(projectFolder, 'Plugins', patch.plugin, patch.file);

	if (!fs.existsSync(filePath)) return;

	var content = fs.readFileSync(filePath, 'utf8');

	if (content.indexOf(patch.from) == -1) return;

	fs.writeFileSync(filePath, content.split(patch.from).join(patch.to));

	console.log('iosPluginPatches: patched ' + patch.plugin + '/' + patch.file);
}

module.exports = function (context) {
	if ((context.opts.platforms || []).indexOf('ios') == -1) return;

	try {
		var iosPath = path.join(context.opts.projectRoot, 'platforms', 'ios');

		if (!fs.existsSync(iosPath)) return;

		var projectFolder = findProjectFolder(iosPath);

		if (!projectFolder) return;

		patches.forEach(function (patch) {
			applyPatch(projectFolder, patch);
		});
	} catch (e) {
		console.warn('iosPluginPatches: skipped, ' + (e && e.message ? e.message : e));
	}
}
