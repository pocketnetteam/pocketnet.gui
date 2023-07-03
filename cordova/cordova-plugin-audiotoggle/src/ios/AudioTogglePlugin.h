#import <Cordova/CDVPlugin.h>

@interface AudioTogglePlugin : CDVPlugin
- (void)setAudioMode:(CDVInvokedUrlCommand*)command;
- (void)checkAudioPermission:(CDVInvokedUrlCommand*)command;
- (void)checkVideoPermission:(CDVInvokedUrlCommand*)command;
@end
