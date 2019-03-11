# React Native Flurry SDK (react-native-flurry-sdk)

[![npm](https://img.shields.io/npm/v/react-native-flurry-sdk.svg?colorB=blue&)](https://www.npmjs.com/package/react-native-flurry-sdk)

A React Native plugin for Flurry SDK

**Flurry Push** for messaging is now supported by our plugin!

## Table of contents

- [Installation](#installation)
  - [Android](#android)
  - [iOS](#ios)
- [Example](#example)
- [API Reference](#api-reference)
- [Support](#support)
- [License](#license)

## Installation

1. Install Flurry SDK module by `npm`

   ```
   npm install react-native-flurry-sdk --save
   ```
2. Link React Native dependency

   ```
   react-native link react-native-flurry-sdk
   ```
3. Add Flurry JS code

   ```javascript
   import Flurry from 'react-native-flurry-sdk';
   ```

### Android

- By default, Flurry adds `INTERNET` and `ACCESS_NETWORK_STATE` permissions to optimize analytics data. Please see [Manual Flurry Android SDK Integration](https://developer.yahoo.com/flurry/docs/integrateflurry/android-manual/) for the other recommended options.
- To improve analytics identities, please see [Manual Flurry Android SDK Integration](https://developer.yahoo.com/flurry/docs/integrateflurry/android-manual/) for adding Google Play Services library in your app by including the following in your `build.gradle` file:

  ```
  dependencies {
      // Recommended to add Google Play Services
      implementation 'com.google.android.gms:play-services-base:15.0.1'
      implementation 'com.google.android.gms:play-services-ads:15.0.1' 
      ...
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
            .withMessaging(true)
            .build(this, FLURRY_ANDROID_API_KEY);
     ```
  2. Follow [Set up a Firebase Cloud Messaging client app on Android](https://firebase.google.com/docs/cloud-messaging/android/client). Complete "Set up Firebase and the FCM SDK" step for adding Firebase to your Android project. There should be a file `google-services.json` in your project's `android/app` folder now. You do not need to provide any setup codes here. Your `build.gradle` will look like:

     ```
        // android/build.gradle (project-level)
        buildscript {
            dependencies {
                classpath 'com.google.gms:google-services:4.0.1'
            }
        }
     ```
     
     ```
        // android/app/build.gradle
        apply plugin: 'com.google.gms.google-services'
     ```
  3. Set up "Android Authorization" in Flurry [Push Authorization](https://developer.yahoo.com/flurry/docs/push/authorization/).

### iOS

- Please note that react-native link may add react-native-flurry-sdk podspec to your Podfile. If you are not using [CocoaPods](https://cocoapods.org) or your Podfile looks roughly like the one described [here](http://facebook.github.io/react-native/docs/integration-with-existing-apps#configuring-cocoapods-dependencies), no further action is needed.

  If you are migrating from version<3.0.0 and your Podfile does **NOT** have any other dependency than Flurry, please deintegrate CocoaPods from your project. You may also need to manually remove Podfile and xcworkspace files.

  ```
  cd ios
  pod deintegrate
  ```

  If you have a Podfile only for native dependencies, please remove `pod 'Flurry-iOS-SDK/FlurrySDK'` from your Podfile, re-run `pod install`, remove `react-native-flurry-sdk.podspec`, and execute `react-native link` again.

  ```
  rm node_modules/react-native-flurry-sdk/react-native-flurry-sdk.podspec
  react-native unlink react-native-flurry-sdk && react-native link react-native-flurry-sdk
  ```
- **Flurry Push**</br>
  To set up Flurry Push, please take the following steps.
  1. Open your `.xcodeproj` file using Xcode. It is usually located under the `ios` directory of your React Native app.
  2. Go to "Capabilities" tab and enable Push Notifications.
     ![push_ios_1](images/push_ios_1.png)
  3. Enable Background Modes (Background Fetch and Remote Notifications turned on).
     ![push_ios_2](images/push_ios_2.png)
     Now your `Info.plist` should contain the following items. For more information, please see [Push Setup](https://developer.yahoo.com/flurry/docs/push/integration/ios/).
     ![push_ios_3](images/push_ios_3.png)
  4. Set up "iOS Authorization" in Flurry [Push Authorization](https://developer.yahoo.com/flurry/docs/push/authorization/).

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
new Flurry.Builder()
  .withCrashReporting(true)
  .withLogEnabled(true)
  .withLogLevel(2)
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
      console.log("Versions: " + versions.agentVersion + " : " + versions.releaseVersion + " : " + versions.sessionId);
    });
  }
 
  render() {
    // Set users preferences.
    Flurry.setAge(36);
    Flurry.setGender('m');
    Flurry.setReportLocation(true);
    
    // Log Flurry events.
    Flurry.logEvent("React Native Event");
    Flurry.logEvent("React Native Timed Event", {param: 'true'}, true);
    ...
    Flurry.endTimedEvent("React Native Timed Event");
    
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

- `index.js / Messaging.js`

```javascript
// To enable Flurry Push for Android, please duplicate Builder setup in your MainApplication.java.
new Flurry.Builder()
  .withMessaging(true)
  ...

// Optionally add a listener to receive messaging events, and handle the notification.
// Please call required Flurry.willHandleMessage(boolean) when received event types of
// 'NotificationReceived' or 'NotificationClicked' as soon as possible to avoid delay.
Flurry.addMessagingListener((message) => {
  if (message.Type === 'NotificationReceived') {
    Flurry.willHandleMessage(false);
  } else if (message.Type === 'NotificationClicked') {
    Flurry.willHandleMessage(false);
  }

  Flurry.printMessage(message);
});
```

## API Reference

See [Android](http://flurry.github.io/flurry-android-sdk/)-[(FlurryAgent)](http://flurry.github.io/flurry-android-sdk/com/flurry/android/FlurryAgent.html) /
[iOS](http://flurry.github.io/flurry-ios-sdk/)-[(Flurry)](http://flurry.github.io/flurry-ios-sdk/interface_flurry.html) for
the Flurry references.

- **Methods to initialize Flurry**

  ```javascript
  Flurry.Builder.withCrashReporting(crashReporting = true);
  Flurry.Builder.withContinueSessionMillis(sessionMillis = 10000);
  Flurry.Builder.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true);
  Flurry.Builder.withLogEnabled(enableLog = true);
  Flurry.Builder.withLogLevel(logLevel = 5); // Android (2:VERBOSE, 3:DEBUG, 4:INFO, 5:WARN, 6:ERROR, 7:ASSERT), iOS (2:All, 3-5:Debug, 6-7:Critical)
  Flurry.Builder.withMessaging(enableMessaging = true);
  
  Flurry.Builder.build(apiKeyAndroid: string, apiKeyIos: string);  // preferred; passing null if not available
  Flurry.Builder.build(apiKey: string);  // use when only single platform is supported, or shared (not recommended)
  ```
- **Methods must be called prior to invoking init** *(Deprecated, please use Flurry.Builder instead)*

  ```javascript
  Flurry.withCrashReporting(crashReporting = true);
  Flurry.withContinueSessionMillis(sessionMillis = 10000);
  Flurry.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true);
  Flurry.withLogEnabled(enableLog = true);
  Flurry.withLogLevel(logLevel = 5); // Android (2:VERBOSE, 3:DEBUG, 4:INFO, 5:WARN, 6:ERROR, 7:ASSERT), iOS (2:All, 3-5:Debug, 6-7:Critical)
  ```
  
  ```javascript
  Flurry.init(apiKeyAndroid: string, apiKeyIos: string);  // preferred; passing null if not available
  Flurry.init(apiKey: string);  // use when only single platform is supported, or shared (not recommended)
  ```
- **Methods to set users preferences**

  ```javascript
  Flurry.setAge(age: number);
  Flurry.setGender(gender = ['m', 'f']);
  Flurry.setReportLocation(reportLocation: boolean);
  Flurry.setSessionOrigin(originName: string, deepLink: string);
  Flurry.setUserId(userId: string);
  Flurry.setVersionName(versionName: string);
     
  Flurry.addOrigin(originName: string, originVersion: string);
  Flurry.addOrigin(originName: string, originVersion: string, originParameters: {});
  Flurry.addSessionProperty(name: string, value: string);
  ```
- **Methods to get Flurry versions**

  ```javascript
  Flurry.getVersions(): Promise<object>;
  Flurry.getVersions((msg) => errorCallback,
                     (agentVersion, releaseVersion, sessionId) => successCallback);
  ```
- **Methods to log Flurry events**

  ```javascript
  Flurry.logEvent(eventId: string);
  Flurry.logEvent(eventId: string, timed: boolean);
  Flurry.logEvent(eventId: string, parameters: {});
  Flurry.logEvent(eventId: string, parameters: {}, timed: boolean);
     
  Flurry.endTimedEvent(eventId: string);
  Flurry.endTimedEvent(eventId: string, parameters: {});
     
  Flurry.onPageView();
     
  Flurry.onError(errorId: string, message: string, errorClass: string);
  Flurry.onError(errorId: string, message: string, errorClass: string, errorParams: {});
     
  Flurry.logBreadcrumb(crashBreadcrumb: string);
  Flurry.logPayment(productName: string, productId: string, quantity: number, price: number,
                    currency: string, transactionId: string, parameters: {});  // Android, see setIAPReportingEnabled for iOS
  ```
- **Methods to enable IAP reporting (iOS)**

  ```javascript
  Flurry.setIAPReportingEnabled(enableIAP: boolean);
  ```
- **Methods for Messaging (Flurry Push)**

  ```javascript
  // message.Type: { 'NotificationReceived', 'NotificationClicked',
  //                 'NotificationCancelled', 'TokenRefresh' } (Android only)
  // message.Title:       message title
  // message.Body:        message body
  // message.Data:        message data (Map)
  // message.ClickAction: click action (Android only)
  Flurry.addMessagingListener((message) => callback);
  Flurry.removeMessagingListener((message) => callback);
  Flurry.willHandleMessage(handled: boolean); // Android only
  Flurry.printMessage(message: object);
  ```
  
## Support

- [Flurry Developer Support Site](https://developer.yahoo.com/flurry/docs/)

## License

Copyright 2018 Oath Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
