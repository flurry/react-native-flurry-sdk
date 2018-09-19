# React Native Flurry SDK (react-native-flurry-sdk)

[![npm](https://img.shields.io/npm/v/react-native-flurry-sdk.svg?colorB=blue&)](https://www.npmjs.com/package/react-native-flurry-sdk)

A React Native wrapper for Flurry SDK

## Table of contents
- [Installation](#installation)
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
### iOS

1. Initialize Podfile under `ios` folder. Please have [CocoaPods](https://cocoapods.org) installed.
   ```
   cd ios
   pod init
   ```
2. Open the Podfile and add Flurry dependency under your target.
   ```
   pod 'Flurry-iOS-SDK/FlurrySDK'
   ```
3. Install the Flurry SDK by running the following command in the directory containing the Podfile.
   ```
   pod install
   ```
## Example
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
    
    // Called prior to invoking init.
    Flurry.withCrashReporting(true);
    Flurry.withLogEnabled(true);
    Flurry.withLogLevel(2);
    
    // Init once in the main constructor.
    Flurry.init(FLURRY_ANDROID_API_KEY, FLURRY_IOS_API_KEY);
    
    // Example to get Flurry versions.
    Flurry.getVersions(
        (msg) => {
            console.log(msg);
        },
        (agentVersion, releaseVersion, sessionId) => {
            console.log("Versions: " + agentVersion + " : " + releaseVersion + " : " + sessionId);
        }
    );
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
## API Reference

See [Android](http://flurry.github.io/flurry-android-sdk/)-[(FlurryAgent)](http://flurry.github.io/flurry-android-sdk/com/flurry/android/FlurryAgent.html) /
[iOS](http://flurry.github.io/flurry-ios-sdk/)-[(Flurry)](http://flurry.github.io/flurry-ios-sdk/interface_flurry.html) for
the Flurry references.

- **Methods must be called prior to invoking init**
  ```javascript
  Flurry.withCrashReporting(crashReporting = true);
  Flurry.withContinueSessionMillis(sessionMillis = 10000);
  Flurry.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true);
  Flurry.withLogEnabled(enableLog = true);
  Flurry.withLogLevel(logLevel = 5);
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
     
  Flurry.addOrigin(originName: string, originVersion: string, originParameters: {});
  Flurry.addSessionProperty(name: string, value: string);
  ```
- **Methods to get Flurry versions**
  ```javascript
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
  Flurry.logPayment(productName: string, productId: string, quantity: number, price: number, currency: string, transactionId: string, parameters: {});  // Android, see setIAPReportingEnabled for iOS
  ```

- **Methods to enable IAP reporting (iOS)**
  ```javascript
  Flurry.setIAPReportingEnabled(enableIAP: boolean);
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
