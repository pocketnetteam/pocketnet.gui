#import <Cordova/CDVPlugin.h>

@interface AudioTogglePlugin : CDVPlugin
- (void)setAudioMode:(CDVInvokedUrlCommand*)command;
@end
