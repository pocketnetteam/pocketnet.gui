// Patches native sources of npm plugins in platforms/ios that have no fixed release.
// - cordova-plugin-x-socialsharing 6.0.4: UIApplication openURL: without options always
//   returns NO since iOS 18, so sharing text to WhatsApp did nothing (apache/cordova-ios#1511)
// - cordova-plugin-camera-preview 0.12.3 (same in 0.14.0 and master): CameraSessionManager uses UIKit
//   without importing it; cordova-ios 8 removed the prefix header that imported UIKit everywhere.
//   checkDeviceAuthorizationStatus shows UIAlertView when camera access is denied; it is unavailable
//   in UIScene based apps (cordova-ios 8) and crashes with NSObjectNotAvailableException
// Patches are idempotent. Never fails the build: problems are only logged.

var fs = require('fs');
var path = require('path');

var patches = [
	{
		plugin: 'cordova-plugin-x-socialsharing',
		file: 'SocialSharing.m',
		from: '[[UIApplication sharedApplication] openURL: whatsappURL];',
		to: '[[UIApplication sharedApplication] openURL: whatsappURL options:@{} completionHandler:nil];'
	},
	{
		plugin: 'cordova-plugin-camera-preview',
		file: 'CameraSessionManager.h',
		from: '#import <CoreImage/CoreImage.h>',
		to: '#import <UIKit/UIKit.h>\n#import <CoreImage/CoreImage.h>'
	},
	{
		plugin: 'cordova-plugin-camera-preview',
		file: 'CameraSessionManager.m',
		from: [
			'      dispatch_async(dispatch_get_main_queue(), ^{',
			'          [[[UIAlertView alloc] initWithTitle:@"Error"',
			'                                      message:@"Camera permission not found. Please, check your privacy settings."',
			'                                     delegate:self',
			'                            cancelButtonTitle:@"OK"',
			'                            otherButtonTitles:nil] show];',
			'      });'
		].join('\n'),
		to: '      NSLog(@"CameraPreview: camera permission not granted");'
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

	if (content.indexOf(patch.to) != -1 || content.indexOf(patch.from) == -1) return;

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
