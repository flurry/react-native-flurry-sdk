# Change Log

* [Flurry Android SDK Release Notes](https://developer.yahoo.com/flurry/docs/releasenotes/android/)
* [Flurry iOS SDK Release Notes](https://developer.yahoo.com/flurry/docs/releasenotes/ios/)

## v8.1.0 (2023-02-02)

#### Features

* Upgrade Flurry Android SDK version to 14.1.0
* Upgrade Flurry iOS SDK version to 12.2.0
* Support GPP Consents APIs

# v8.0.0 (2022-10-24)

#### Features

* Upgrade Flurry Android SDK version to 14.0.0
* Support Report Location APIs

#### Bug Fixes

* Fix iOS CocoaPods build Autolinking failures

## v7.3.0 (2022-07-12)

#### Features

* Upgrade Flurry iOS SDK version to 12.1.1

#### Bug Fixes

* Fix iOS CocoaPods build failures

## v7.2.0 (2022-05-26)

#### Features

* Upgrade Flurry Android SDK version to 13.3.0
* Upgrade Flurry iOS SDK version to 12.0.0
* Support initializing Flurry Push from the JavaScript for Android
* Apply safeExtGet for Android build.gradle to sync with the root project
* Use mavenCentral instead of the deprecated jcenter
* Support Android 12

### v7.1.1 (2021-12-08)

#### Bug Fixes

* Fix parameter typo

## v7.1.0 (2021-12-06)

#### Features

* Upgrade Flurry Android SDK version to 13.1.0
* Upgrade Flurry iOS SDK version to 11.4.0
* Support Agent setters APIs
* Improve TypeScript support

# v7.0.0 (2021-08-28)

#### Features

* Upgrade Flurry Android SDK version to 13.0.0
* Upgrade Flurry iOS SDK version to 11.3.0
* Support Standard Event API
* Support Publisher Segmentation API
* Support both JavaScript Object and Map types for parameters

#### Bug Fixes

* Fix the messaging callback onTokenRefresh been called before the React Native listener been registered

## v6.4.0 (2021-05-12)

#### Features

* Upgrade Flurry Android SDK version to 12.13.0
* Upgrade Flurry iOS SDK version to 11.2.1

## v6.3.0 (2021-02-22)

#### Features

* Upgrade Flurry Android SDK version to 12.11.0

### v6.2.9 (2021-02-22)

#### Features

* Support Apple Xcode 12, based on v6.3.0

## v6.2.0 (2020-12-09)

#### Features

* Upgrade Flurry Android SDK version to 12.9.0
* Upgrade Flurry iOS SDK version to 11.2.0
* Provide an API to get the default Flurry Android Messaging listener; for constructing the optional FlurryMarketingOptions

### v6.1.9 (2020-12-09)

#### Features

* Support Apple Xcode 12, based on v6.2.0

## v6.1.0 (2020-09-22)

#### Features

* Upgrade Flurry Android SDK version to 12.7.0
* Upgrade Flurry iOS SDK version to 11.1.0

### v6.0.9 (2020-09-22)

#### Features

* Support React Native < 0.60, based on v6.1.0

#### Bug Fixes

* Fix iOS header files link error

# v6.0.0 (2020-08-30)

#### Features

* Upgrade Flurry iOS SDK version to 11.0.0
* Support iOS 14 Compliant
* Support the iOS SKAdNetwork conversion
* Support opening Privacy Dashboard

#### Bug Fixes

* Fix iOS Performance Metrics API not available error

### v5.9.9 (2020-08-30)

#### Features

* Support React Native < 0.60, based on v6.0.0

## v5.7.0 (2020-07-28)

#### Features

* Upgrade Flurry Android SDK version to 12.5.0
* Upgrade Flurry iOS SDK version to 10.3.4
* Support Performance Metrics API for Android

### v5.6.9 (2020-07-28)

#### Features

* Support React Native < 0.60, based on v5.7.0

## v5.6.0 (2020-06-24)

#### Features

* Upgrade Flurry Android SDK version to 12.4.0
* Upgrade Flurry iOS SDK version to 10.3.3

### v5.5.9 (2020-06-24)

#### Features

* Support React Native < 0.60, based on v5.6.0

## v5.5.0 (2020-04-28)

#### Features

* Upgrade Flurry iOS SDK version to 10.3.1

### v5.4.9 (2020-04-28)

#### Features

* Support React Native < 0.60, based on v5.5.0

## v5.4.0 (2020-04-14)

#### Features

* Upgrade Flurry Android SDK version to 12.3.0
* Upgrade Flurry iOS SDK version to 10.3.0

### v5.3.9 (2020-04-14)

#### Features

* Support React Native < 0.60, based on v5.4.0

## v5.3.0 (2020-01-13)

#### Features

* Upgrade Flurry Android SDK version to 12.2.0
* Upgrade Flurry iOS SDK version to 10.2.0
* Support User Properties API

#### Bug Fixes

* Fix Android Flurry session creation delay

## v5.2.0 (2019-12-10)

#### Features

* Upgrade Flurry Android SDK version to 12.1.0
* Upgrade Flurry iOS SDK version to 10.1.0
* Support Privacy Regulations API

## v5.1.0 (2019-10-22)

#### Features

* Upgrade Flurry Android SDK version to 12.0.1
* Remove deprecated Flurry.init/with methods

#### Bug Fixes

* Improve TypeScript overloading

# v5.0.0 (2019-10-08)

#### Features

* Upgrade Flurry Android SDK version to 12.0.0
* Upgrade Flurry iOS SDK version to 10.0.2
* Mark onPageView API as deprecated

#### Bug Fixes

* Improve Android Flurry Messaging payload when app is closed

## v4.1.0 (2019-08-05)

#### Bug Fixes

* Improve iOS podspec build, header macros

# v4.0.0 (2019-07-16)

#### Features

* Support React Native >= 0.60

## v3.7.0 (2019-07-01)

#### Bug Fixes

* For iOS, provide a separate target for Flurry Push to avoid Apple Push Notification service conflict

## v3.6.0 (2019-05-28)

#### Features

* Support Analytics features on the tvOS platform

# v3.5.0 (2019-05-06)

#### Features

* Support Flurry Config for remote config setup features

## v3.2.0 (2019-04-08)

#### Features

* Provide Enum for MessageType
* Improve and support more JSDoc for code completion
* Support optional user's native `FlurryMarketingOptions` / `FlurryMessagingListener` for Android Push
* Support iOS Cold start notification

#### Bug Fixes

* Fix undefined variable errors for default withLogLevel call

## v3.1.0 (2019-03-25)

#### Features

* Provide Enum for LogLevel and Gender
* Improve and support more JSDoc for code completion
* Upgrade Flurry Android SDK version to 11.6.0

#### Bug Fixes

* Do not include Firebase libraries for Android platform

# v3.0.0 (2019-03-11)

#### Features

* Support Flurry Push for messaging features

#### Bug Fixes

* Fix TypeScript index.d.ts warning
* Match iOS versioning with Android

## v2.1.0 (2019-02-27)

#### Features

* Add getVersions overload method that returns Promise
* Provide more JSDoc for code completion

#### Bug Fixes

* Use Activity context to init Flurry if available, otherwise use Application context (Android)

# v2.0.0 (2019-02-12)

#### Features

* Implement Flurry.Builder to replace init()
* Mark init() and all Flurry.with* methods deprecated

#### Bug Fixes

* Revert "Use Application context to initialize Flurry Agent (Android)";
  should use Activity context to init Flurry from Activity to avoid session delay

## v1.5.0 (2019-01-30)

#### Bug Fixes

* Use Application context to initialize Flurry Agent (Android)
* Make iOS log level consistent with Android

## v1.4.0 (2019-01-23)

#### Features

* Upgrade Flurry Android SDK version to 11.5.0
* Use post link scripts to automatically install iOS dependencies

## v1.3.0 (2018-11-26)

#### Bug Fixes

* Fix iOS build error and ignore xcuserdata

## v1.2.0 (2018-11-12)

#### Features

* Upgrade Flurry Android SDK version to 11.4.0
* Add Android permission ACCESS_NETWORK_STATE to optimize analytics data
* README to add Google Play Services library to improve analytics identities
* Add CHANGELOG
* Remove redundant null checks

## v1.1.0 (2018-09-19)

#### Features

* Update init method to support multiple platforms API-Key

### v1.0.2 (2018-09-06)
### v1.0.1 (2018-09-06)

#### Bug Fixes

* Fix README items numbering format

# v1.0.0 (2018-09-06)

#### Features

* Add iOS support
* Update README install steps, sample codes, API references

## v0.3.0 (2018-08-15)

#### Features

* Add sample codes in README
* Update README

## v0.2.0 (2018-08-14)

#### Bug Fixes

* Fix README links
* Make Android gradle build backward compatible

## v0.1.0 (2018-08-14)

#### Features

* Create react-native-flurry-sdk module

