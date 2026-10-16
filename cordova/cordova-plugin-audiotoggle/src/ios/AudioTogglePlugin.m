#import "AudioTogglePlugin.h"
#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>

@implementation AudioTogglePlugin

// UIAlertView is unavailable in UIScene based apps (cordova-ios 8) and throws NSObjectNotAvailableException
- (void)showPermissionAlert:(NSString *)message
{
	dispatch_async(dispatch_get_main_queue(), ^{
		UIViewController *presenter = self.viewController;

		while (presenter.presentedViewController) {
			presenter = presenter.presentedViewController;
		}

		if (!presenter) return;

		UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Error" message:message preferredStyle:UIAlertControllerStyleAlert];
		[alert addAction:[UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil]];
		[presenter presentViewController:alert animated:YES completion:nil];
	});
}

- (void)setAudioMode:(CDVInvokedUrlCommand *)command
{
	NSError* __autoreleasing err = nil;
	NSString* mode = [NSString stringWithFormat:@"%@", [command.arguments objectAtIndex:0]];
	
	UInt32 audioRouteOverride = kAudioSessionOverrideAudioRoute_None;
	AVAudioSession *session = [AVAudioSession sharedInstance];
	
	if ([mode isEqualToString:@"earpiece"]) {
		[session setCategory:AVAudioSessionCategoryPlayAndRecord error:&err];
		audioRouteOverride = kAudioSessionProperty_OverrideCategoryDefaultToSpeaker;
		AudioSessionSetProperty(kAudioSessionProperty_OverrideAudioRoute, sizeof(audioRouteOverride), &audioRouteOverride);
	} else if ([mode isEqualToString:@"speaker"] || [mode isEqualToString:@"ringtone"]) {
		[session setCategory:AVAudioSessionCategoryPlayAndRecord withOptions:AVAudioSessionCategoryOptionDefaultToSpeaker error:&err];
	} else if ([mode isEqualToString:@"normal"]) {
		[session setCategory:AVAudioSessionCategorySoloAmbient error:&err];
	}
}
	
- (void)checkVideoPermission:(CDVInvokedUrlCommand *)command {
	NSString *mediaType = AVMediaTypeVideo;

	AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:mediaType];
	
    if(authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied){

		[AVCaptureDevice requestAccessForMediaType:mediaType completionHandler:^(BOOL granted) {
			if (!granted) {
				//Not granted access to mediaType
				[self showPermissionAlert:@"Camera permission not found. Please, check your privacy settings."];

				
			}

			[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:granted]
																	callbackId:command.callbackId];
		}];

	}
	else{
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:true]
																	callbackId:command.callbackId];
	}

	
}

- (void)checkAudioPermission:(CDVInvokedUrlCommand *)command {
	NSString *mediaType = AVMediaTypeAudio;

	AVAuthorizationStatus authStatus = [AVCaptureDevice authorizationStatusForMediaType:mediaType];

	if (authStatus == AVAuthorizationStatusRestricted || authStatus == AVAuthorizationStatusDenied){

		[AVCaptureDevice requestAccessForMediaType:mediaType completionHandler:^(BOOL granted) {
			if (!granted) {
				//Not granted access to mediaType
				[self showPermissionAlert:@"Microphone permission not found. Please, check your privacy settings."];

				
			}

			[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:granted]
																	callbackId:command.callbackId];
		}];

	}
	else{
		[self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:true]
																	callbackId:command.callbackId];
	}
}

@end
