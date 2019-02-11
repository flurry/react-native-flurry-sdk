# Change Log

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

