# Change Log

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

