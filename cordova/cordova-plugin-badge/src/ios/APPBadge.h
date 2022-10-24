/*
 * This file contains Original Code and/or Modifications of Original Code
 * as defined in and that are subject to the Apache License
 * Version 2.0 (the 'License'). You may not use this file except in
 * compliance with the License. Please obtain a copy of the License at
 * http://opensource.org/licenses/Apache-2.0/ and read it before using this
 * file.
 *
 * The Original Code and all software distributed under the License are
 * distributed on an 'AS IS' basis, WITHOUT WARRANTY OF ANY KIND, EITHER
 * EXPRESS OR IMPLIED, AND APPLE HEREBY DISCLAIMS ALL SUCH WARRANTIES,
 * INCLUDING WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
 * Please see the License for the specific language governing rights and
 * limitations under the License.
 */

#import <Cordova/CDVPlugin.h>

@interface APPBadge : CDVPlugin

// Load the badge config
- (void) load:(CDVInvokedUrlCommand *)command;
// Save the badge config
- (void) save:(CDVInvokedUrlCommand *)command;
// Clear the badge number
- (void) clear:(CDVInvokedUrlCommand *)command;
// Set the badge number
- (void) set:(CDVInvokedUrlCommand *)command;
// Get the badge number
- (void) get:(CDVInvokedUrlCommand *)command;
// Check permission to show badges
- (void) check:(CDVInvokedUrlCommand *)command;
// Request permission to show badges
- (void) request:(CDVInvokedUrlCommand *)command;

@end
