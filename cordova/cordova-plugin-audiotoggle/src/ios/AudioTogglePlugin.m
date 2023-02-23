#import "AudioTogglePlugin.h"
#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>

@implementation AudioTogglePlugin

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

@end
