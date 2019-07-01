# React Native Flurry SDK (react-native-flurry-sdk)

[![npm](https://img.shields.io/npm/v/react-native-flurry-sdk.svg?colorB=blue&)](https://www.npmjs.com/package/react-native-flurry-sdk)

A React Native plugin for Flurry SDK

**Flurry Push** for messaging is now supported by our plugin!

## Table of contents

- [Installation](#installation)
  - [Android](#android)
  - [iOS](#ios)
  - [tvOS](#tvos)
- [Example](#example)
- [API Reference](#api-reference)
- [Support](#support)
- [License](#license)

## Installation

1. Install Flurry SDK module by `npm`

   ```bash
   npm install react-native-flurry-sdk --save
   ```

2. Link React Native dependency

   ```bash
   react-native link react-native-flurry-sdk
   ```

3. Add Flurry JS code

   ```javascript
   import Flurry from 'react-native-flurry-sdk';
   ```

### Android

- By default, Flurry adds `INTERNET` and `ACCESS_NETWORK_STATE` permissions to optimize analytics data. Please see [Manual Flurry Android SDK Integration](https://developer.yahoo.com/flurry/docs/integrateflurry/android-manual/) for the other recommended options.
- To improve analytics identities, please see [Manual Flurry Android SDK Integration](https://developer.yahoo.com/flurry/docs/integrateflurry/android-manual/) for adding Google Play Services library in your app by including the following in your `build.gradle` file:

  ```groovy
  dependencies {
      // Recommended to add Google Play Services
      implementation 'com.google.android.gms:play-services-base:15.0.1'
      implementation 'com.google.android.gms:play-services-ads:15.0.1'
  }
  ```

- **Flurry Push**</br>
  In order to use [Flurry Push](https://developer.yahoo.com/flurry/docs/push/) for [Android](https://developer.yahoo.com/flurry/docs/push/integration/android/), please follow the additional steps below:
  1. Flurry Push requires your projects to initialize Flurry from your Application class. Please do the Flurry setup in `MainApplication.onCreate()`. With the same APIs as the JavaScript version.

     ```java
       new FlurryModule.Builder()
            .withCrashReporting(true)
            .withLogEnabled(true)
            .withLogLevel(Log.VERBOSE)
            .withMessaging(true, options_or_listener) // optional user's native `FlurryMarketingOptions` or `FlurryMessagingListener`.
            .build(this, FLURRY_ANDROID_API_KEY);
     ```

  2. Follow [Set up a Firebase Cloud Messaging client app on Android](https://firebase.google.com/docs/cloud-messaging/android/client). Complete "Set up Firebase and the FCM SDK" step for adding Firebase to your Android project. There should be a file `google-services.json` in your project's `android/app` folder now. You do not need to provide any setup codes here. Your `build.gradle` will look like:

     ```groovy
        // android/build.gradle (project-level)
        buildscript {
            dependencies {
                classpath 'com.google.gms:google-services:4.0.1'
            }
        }
     ```

     ```groovy
        // android/app/build.gradle
        apply plugin: 'com.google.gms.google-services'

        dependencies {
            implementation 'com.google.firebase:firebase-core:16.0.3'
            implementation 'com.google.firebase:firebase-messaging:17.3.2'
        }
     ```

  3. Set up "Android Authorization" in Flurry [Push Authorization](https://developer.yahoo.com/flurry/docs/push/authorization/).

### iOS

- Please note that Flurry Push is now included in a separate target. If you are using Flurry Push, please relink react-native-flurry-sdk

  ```bash
  react-native unlink react-native-flurry-sdk && react-native link react-native-flurry-sdk
  ```

  and type Y or press return while being asked if you need to integrate Flurry Push.

- Please note that react-native link may add react-native-flurry-sdk podspec to your Podfile. If you are not using [CocoaPods](https://cocoapods.org) or your Podfile looks roughly like the one described [here](http://facebook.github.io/react-native/docs/integration-with-existing-apps#configuring-cocoapods-dependencies), no further action is needed.

  If you are migrating from version<3.0.0 and your Podfile does **NOT** have any other dependency than Flurry, please deintegrate CocoaPods from your project. You may also need to manually remove Podfile and xcworkspace files.

  ```bash
  cd ios
  pod deintegrate
  ```

  If you have a Podfile only for native dependencies, please remove `pod 'Flurry-iOS-SDK/FlurrySDK'` from your Podfile, re-run `pod install`, remove `react-native-flurry-sdk.podspec`, and execute `react-native link` again.

  ```bash
  rm node_modules/react-native-flurry-sdk/react-native-flurry-sdk.podspec
  react-native unlink react-native-flurry-sdk && react-native link react-native-flurry-sdk
  ```

- **Flurry Push**</br>
  To set up Flurry Push, please take the following steps.
  1. When executing `react-native link react-native-flurry-sdk`, please type Y while being asked if you need to integrate Flurry Push.
  2. Open your `.xcodeproj` file using Xcode. It is usually located under the `ios` directory of your React Native app.
  3. Select your iOS app target and go to "General" tab. In "Linked Frameworks and Libraries" section, please make sure `libReactNativeFlurryWithMessaging.a` is present.
     ![push_ios_4](images/push_ios_1.png)
  4. Go to "Capabilities" tab and enable Push Notifications.
     ![push_ios_1](images/push_ios_2.png)
  5. Enable Background Modes (Background Fetch and Remote Notifications turned on).
     ![push_ios_2](images/push_ios_3.png)
     Now your `Info.plist` should contain the following items. For more information, please see [Push Setup](https://developer.yahoo.com/flurry/docs/push/integration/ios/).
     ![push_ios_3](images/push_ios_4.png)
  6. Set up "iOS Authorization" in Flurry [Push Authorization](https://developer.yahoo.com/flurry/docs/push/authorization/).
  7. In order to handle notifications from a cold start, Flurry Push requires to be initialized from AppDelegate as early as possible. Please open `AppDelegate.m`, import the header file

     ```objc
     #import "ReactNativeFlurry.h"
     ```

     And add this line right after `- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`

     ```objc
     [ReactNativeFlurry enableMessaging];
     ```

### tvOS

- Please note that Flurry Messaging and Flurry Config are currently not available on tvOS. For the detailed list of unavailable APIs, please see API reference below.
- CocoaPods integration is not supported on tvOS. Please consider using `react-native link` or manually link the library as described [here](https://facebook.github.io/react-native/docs/linking-libraries-ios).

## Example

- `index.js`

   ```javascript
   import { AppRegistry } from 'react-native';
   import { name as appName } from './app.json';
   import App from './App';
   import Flurry from 'react-native-flurry-sdk';
  
   // Init Flurry once as early as possible recommended in index.js.
   // For each platfrom (Android, iOS) where the app runs you need to acquire a unique Flurry API Key.
   // i.e., you need two API keys if you are going to release the app on both Android and iOS platforms.
   // If you are building for TV platforms, you will need two API keys for Android TV and tvOS.
   new Flurry.Builder()
     .withCrashReporting(true)
     .withLogEnabled(true)
     .withLogLevel(Flurry.LogLevel.DEBUG)
     .build(FLURRY_ANDROID_API_KEY, FLURRY_IOS_API_KEY);
  
   AppRegistry.registerComponent(appName, () => App);
   ```

- `App.js`

   ```javascript
   import React, { Component } from 'react';
   import {
     Platform,
     StyleSheet,
     Text,
     View
   } from 'react-native';
   import Flurry from 'react-native-flurry-sdk';
  
   type Props = {};
   export default class App extends Component<Props> {
     constructor(props) {
       super(props);
  
       // Example to get Flurry versions.
       Flurry.getVersions().then((versions) => {
         console.log('Versions: ' + versions.agentVersion + ' : ' + versions.releaseVersion + ' : ' + versions.sessionId);
       });
     }
  
     render() {
       // Set users preferences.
       Flurry.setAge(36);
       Flurry.setGender(Flurry.Gender.FEMALE);
       Flurry.setReportLocation(true);
  
       // Log Flurry events.
       Flurry.logEvent('React Native Event');
       Flurry.logEvent('React Native Timed Event', {param: 'true'}, true);
       ...
       Flurry.endTimedEvent('React Native Timed Event');
  
       Flurry.onPageView();
  
       return (
         <View style={styles.container}>
           ...
         </View>
       );
     }
   }
   ...
   ```

- `index.js / Config.js`

   ```javascript
   Flurry.addConfigListener((event) => {
     if (event.Type === Flurry.ConfigStatus.SUCCESS) {
       // Data fetched, activate it.
       Flurry.activateConfig();
     } else if (event.Type === Flurry.ConfigStatus.ACTIVATED) {
       // Received cached data, or newly activated data.
       Flurry.getConfigString('welcome_message', 'Welcome!').then((value) => {
         console.log((event.isCache ? 'Received cached data: ' : 'Received newly activated data: ') + value.welcome_message);
       });
     } else if (event.Type === Flurry.ConfigStatus.UNCHANGED) {
       // Fetch finished, but data unchanged.
       Flurry.getConfigString('welcome_message', 'Welcome!').then((value) => {
         console.log('Received unchanged data: ' + value.welcome_message);
       });
     } else if (event.Type === Flurry.ConfigStatus.ERROR) {
       // Fetch failed.
       console.log('Fetch error! Retrying: ' + event.isRetrying);
     }
   });

   Flurry.fetchConfig();
   ```

- `index.js / Messaging.js`

   ```javascript
   // To enable Flurry Push for Android, please duplicate Builder setup in your MainApplication.java.
   new Flurry.Builder()
     .withMessaging(true)
     ...
  
   // Optionally add a listener to receive messaging events, and handle the notification.
   // Please call required Flurry.willHandleMessage(boolean) when received event types of
   // MessageType.RECEIVED or MessageType.CLICKED as soon as possible to avoid delay.
   Flurry.addMessagingListener((message) => {
     if (message.Type === Flurry.MessageType.RECEIVED) {
       Flurry.willHandleMessage(false);
     } else if (message.Type === Flurry.MessageType.CLICKED) {
       Flurry.willHandleMessage(false);
     }
  
     Flurry.printMessage(message);
   });
   ```

## API Reference

See [Android](http://flurry.github.io/flurry-android-sdk/)-[(FlurryAgent)](http://flurry.github.io/flurry-android-sdk/com/flurry/android/FlurryAgent.html) /
[iOS](http://flurry.github.io/flurry-ios-sdk/)-[(Flurry)](http://flurry.github.io/flurry-ios-sdk/interface_flurry.html) for the Flurry references.

- **Methods to initialize Flurry**

  ```javascript
  Flurry.Builder.withCrashReporting(crashReporting = true);
  Flurry.Builder.withContinueSessionMillis(sessionMillis = 10000);
  Flurry.Builder.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true);
  Flurry.Builder.withLogEnabled(enableLog = true);
  Flurry.Builder.withLogLevel(logLevel = Flurry.LogLevel.WARN); // LogLevel = { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }
  Flurry.Builder.withMessaging(enableMessaging = true); // not available on tvOS
  
  Flurry.Builder.build(apiKeyAndroid: string, apiKeyIos: string);  // preferred; passing null if not available
  Flurry.Builder.build(apiKey: string);  // use when only single platform is supported, or shared (not recommended)
  
  // tvOS only
  Flurry.Builder.withTVSessionReportingInterval(interval = 5);
  Flurry.Builder.withTVEventCountThreshold(threshold = 10);
  ```

- **Methods must be called prior to invoking init** *(Deprecated, please use Flurry.Builder instead)*

  ```javascript
  Flurry.withCrashReporting(crashReporting = true);
  Flurry.withContinueSessionMillis(sessionMillis = 10000);
  Flurry.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true);
  Flurry.withLogEnabled(enableLog = true);
  Flurry.withLogLevel(logLevel = Flurry.LogLevel.WARN); // LogLevel = { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }
  ```

  ```javascript
  Flurry.init(apiKeyAndroid: string, apiKeyIos: string);  // preferred; passing null if not available
  Flurry.init(apiKey: string);  // use when only single platform is supported, or shared (not recommended)
  ```

- **Methods to set users preferences**

  ```javascript
  Flurry.setAge(age: number);
  Flurry.setGender(gender: Flurry.Gender); // Gender = { MALE, FEMALE }
  Flurry.setReportLocation(reportLocation: boolean);
  Flurry.setSessionOrigin(originName: string, deepLink: string);
  Flurry.setUserId(userId: string);
  Flurry.setVersionName(versionName: string);
  
  Flurry.addOrigin(originName: string, originVersion: string);
  Flurry.addOrigin(originName: string, originVersion: string, originParameters: { [key: string]: string; });
  Flurry.addSessionProperty(name: string, value: string);
  ```

- **Methods to get Flurry versions**

  ```javascript
  Flurry.getVersions(): Promise<{ agentVersion: number; releaseVersion: string; sessionId: string; }>;
  Flurry.getVersions(errorCallback: (errorMessage: string) => void,
                     successCallback: (agentVersion: number, releaseVersion: string, sessionId: string) => void);
  ```

- **Methods to log Flurry events**

  ```javascript
  Flurry.logEvent(eventId: string);
  Flurry.logEvent(eventId: string, timed: boolean);
  Flurry.logEvent(eventId: string, parameters: { [key: string]: string; });
  Flurry.logEvent(eventId: string, parameters: { [key: string]: string; }, timed: boolean);
  
  Flurry.endTimedEvent(eventId: string);
  Flurry.endTimedEvent(eventId: string, parameters: { [key: string]: string; });
  
  Flurry.onPageView(); // not available on tvOS
  
  Flurry.onError(errorId: string, message: string, errorClass: string);
  Flurry.onError(errorId: string, message: string, errorClass: string, errorParams: { [key: string]: string; });
  
  Flurry.logBreadcrumb(crashBreadcrumb: string);
  Flurry.logPayment(productName: string, productId: string, quantity: number, price: number,
                    currency: string, transactionId: string, parameters: { [key: string]: string; });  // Android, see setIAPReportingEnabled for iOS and tvOS
  ```

- **Methods to enable IAP reporting (iOS and tvOS)**

  ```javascript
  Flurry.setIAPReportingEnabled(enableIAP: boolean);
  ```

- **Methods for Flurry Config**

  ```javascript
  // Event.Type:       Flurry.ConfigStatus = { SUCCESS, UNCHANGED, ERROR, ACTIVATED }
  // Event.isRetrying: true if it is still retrying fetching, for ERROR type
  // Event.isCache:    true if activated from the cached data, for ACTIVATED type
  Flurry.addConfigListener   (callback: (event: { Type: string; isCache?: boolean; isRetrying?: boolean; }) => void);
  Flurry.removeConfigListener(callback: (event: { Type: string; isCache?: boolean; isRetrying?: boolean; }) => void);
  Flurry.fetchConfig();
  Flurry.activateConfig():
  Flurry.getConfigString(key: string, defaultValue: string):         Promise<{ [key: string]: string; }>;
  Flurry.getConfigString(keyAndDefault: { [key: string]: string; }): Promise<{ [key: string]: string; }>;
  ```

- **Methods for Messaging (Flurry Push)**

  ```javascript
  // Message.Type: Flurry.MessageType = { RECEIVED,  CLICKED,
  //                                      CANCELLED, REFRESH } (Android only)
  // Message.Title:       message title
  // Message.Body:        message body
  // Message.Data:        message data (Map)
  // Message.ClickAction: click action (Android only)
  // Message.Token:       refreshed token
  Flurry.addMessagingListener(callback: (message: { Type: string;
                    Title?: string; Body?: string; Data?: { [key: string]: string; }; ClickAction?: string;
                    Token?: string; }) => void);
  Flurry.removeMessagingListener(callback: (message: { Type: string;
                    Title?: string; Body?: string; Data?: { [key: string]: string; }; ClickAction?: string;
                    Token?: string; }) => void);
  Flurry.willHandleMessage(handled: boolean);
  Flurry.printMessage(message: { Type: string;
                    Title?: string; Body?: string; Data?: { [key: string]: string; }; ClickAction?: string;
                    Token?: string; });
  ```

## Support

- [Flurry Developer Support Site](https://developer.yahoo.com/flurry/docs/)

## License

Copyright 2018 Oath Inc.

This project is licensed under the terms of the [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0) open source license. Please refer to [LICENSE](LICENSE) for the full terms.
