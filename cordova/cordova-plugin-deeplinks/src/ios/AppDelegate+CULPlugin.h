//
//  AppDelegate+CULPlugin.h
//
//  Created by Nikolay Demyankov on 15.09.15.
//

#import <UIKit/UIKit.h>
#import <Cordova/CDVAppDelegate.h>

/**
 *  Category for the CDVAppDelegate (base class of the app AppDelegate; required since cordova-ios 8) that overrides application:continueUserActivity:restorationHandler method,
 *  so we could handle application launch when user clicks on the link in the browser.
 */
@interface CDVAppDelegate (CULPlugin)

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler;

@end
