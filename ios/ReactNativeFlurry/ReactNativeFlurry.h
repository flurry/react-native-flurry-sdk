/*
 * Copyright 2018, Oath Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface ReactNativeFlurry : NSObject <RCTBridgeModule>

/*
 *  Call this API if you want enable Push Notificaions for React Native Flurry SDK.
 *  This must be called right after application:didFinishLaunchingWithOptions:
 *
 *  This method takes care of all the setup for Push Notifications.
 *  1) Registers for Notifications
 *  2) Handles device tokens
 *  3) Listens for callbacks from UIApplication and UNUserNotificationCenter
 *  4) Send notification events to React Native
 */
+ (void)enableMessaging;

@end
