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

#import "ReactNativeFlurry.h"
#if __has_include(<Flurry-iOS-SDK/Flurry.h>)
#import <Flurry-iOS-SDK/Flurry.h>
#elif __has_include(<Flurry_iOS_SDK/Flurry.h>)
#import <Flurry_iOS_SDK/Flurry.h>
#else
#import "Flurry.h"
#endif

#if __has_include(<Flurry-iOS-SDK/FlurryUserProperties.h>)
#import <Flurry-iOS-SDK/FlurryUserProperties.h>
#elif __has_include(<Flurry_iOS_SDK/FlurryUserProperties.h>)
#import <Flurry_iOS_SDK/FlurryUserProperties.h>
#else
#import "FlurryUserProperties.h"
#endif

#if TARGET_OS_IOS
#ifdef HAS_MESSAGING
#if __has_include(<Flurry-iOS-SDK/FlurryMessaging.h>)
#import <Flurry-iOS-SDK/FlurryMessaging.h>
#elif __has_include(<Flurry_iOS_SDK/FlurryMessaging.h>)
#import <Flurry_iOS_SDK/FlurryMessaging.h>
#else
#import "FlurryMessaging.h"
#endif
#import "ReactNativeFlurryMessagingListener.h"
#endif
#if __has_include(<Flurry-iOS-SDK/FConfig.h>)
#import <Flurry-iOS-SDK/FConfig.h>
#elif __has_include(<Flurry_iOS_SDK/FConfig.h>)
#import <Flurry_iOS_SDK/FConfig.h>
#else
#import "FConfig.h"
#endif
#import "ReactNativeFlurryConfigListener.h"
#endif

#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#else
#import "RCTBridge.h"
#endif

#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#else
#import "RCTEventDispatcher.h"
#endif

static NSString * const originName = @"react-native-flurry-sdk";
static NSString * const originVersion = @"5.6.0";

@interface ReactNativeFlurry ()<RNFlurryEventDispatcherDelegate>

@property (strong, nonatomic) FlurrySessionBuilder *sessionBuilder;
@property (assign, nonatomic) FlurryLogLevel logLevel;
@property (assign, nonatomic) BOOL isActive;

#if TARGET_OS_IOS
#ifdef HAS_MESSAGING
@property (strong, nonatomic) ReactNativeFlurryMessagingListener *messagingListener;
#endif
@property (strong, nonatomic) ReactNativeFlurryConfigListener *configListener;
#endif

@end

@implementation ReactNativeFlurry

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

static ReactNativeFlurry *gInstance;

+ (void)initialize {
    if (self == ReactNativeFlurry.class) {
        gInstance = [[ReactNativeFlurry alloc] init];
    }
}

- (instancetype)init {
    if (gInstance != nil) {
        return gInstance;
    }
    
    self = [super init];
    if (self) {
        _logLevel = FlurryLogLevelCriticalOnly; // default log level
        _sessionBuilder = [FlurrySessionBuilder new];
        _isActive = NO;
        [Flurry addOrigin:originName withVersion:originVersion];
        
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(reactNativeJavaScriptDidFinishLoad)
                                                     name:RCTJavaScriptDidLoadNotification
                                                   object:nil];
    }
    
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

- (void)dealloc {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - Flurry Builder methods

RCT_EXPORT_METHOD(initBuilder) {
    if (self.sessionBuilder == nil) {
        self.sessionBuilder = [FlurrySessionBuilder new];
    }
}

RCT_EXPORT_METHOD(build:(nonnull NSString *)apiKey) {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [Flurry startSession:apiKey withSessionBuilder:self.sessionBuilder];
    });
}

RCT_EXPORT_METHOD(withAppVersion:(NSString *)versionName) {
    [self.sessionBuilder withAppVersion:versionName];
}

RCT_EXPORT_METHOD(withCrashReporting:(BOOL)crashReporting) {
    [self.sessionBuilder withCrashReporting:crashReporting];
}

RCT_EXPORT_METHOD(withContinueSessionMillis:(NSInteger)value) {
    double seconds = (double) value / 1000.0;
    [self.sessionBuilder withSessionContinueSeconds:(NSInteger)(round(seconds))];
}

RCT_EXPORT_METHOD(withDataSaleOptOut:(BOOL)isOptOut) {
    [self.sessionBuilder withDataSaleOptOut:isOptOut];
}

RCT_EXPORT_METHOD(withIAPReportingEnabled:(BOOL)enableIAP) {
    [self.sessionBuilder withIAPReportingEnabled:enableIAP];
}

RCT_EXPORT_METHOD(withIncludeBackgroundSessionsInMetrics:(BOOL)value) {
    [self.sessionBuilder withIncludeBackgroundSessionsInMetrics:value];
}

RCT_EXPORT_METHOD(withLogEnabled:(BOOL)enabled) {
    if (enabled) {
        [self.sessionBuilder withLogLevel:self.logLevel];
    } else {
        [self.sessionBuilder withLogLevel:FlurryLogLevelNone];
    }
}

RCT_EXPORT_METHOD(withLogLevel:(NSInteger)value) {
    if (value < 2 || value > 7) {
        NSLog(@"Flurry: Invalid log level %ld.", (long)value);
        return;
    }
    
    if (value == 2) {
        self.logLevel = FlurryLogLevelAll;
    } else if (value <= 5) {
        self.logLevel = FlurryLogLevelDebug;
    } else {
        self.logLevel = FlurryLogLevelCriticalOnly;
    }
    
    [self.sessionBuilder withLogLevel:self.logLevel];
}

RCT_EXPORT_METHOD(withMessaging:(BOOL)enableMessaging) {
#if TARGET_OS_IOS
    if (enableMessaging) {
        [self.class enableMessaging];
    }
#endif
}

RCT_EXPORT_METHOD(withTVSessionReportingInterval:(NSInteger)value) {
#if TARGET_OS_TV
    [self.sessionBuilder withTVSessionReportingInterval:value];
#endif
}

RCT_EXPORT_METHOD(withTVEventCountThreshold:(NSInteger)value) {
#if TARGET_OS_TV
    [self.sessionBuilder withTVEventCountThreshold:value];
#endif
}

#pragma mark - React Native API methods

RCT_EXPORT_METHOD(setAge:(int)age) {
    [Flurry setAge:age];
}

RCT_EXPORT_METHOD(setGender:(nonnull NSString *)gender) {
    [Flurry setGender:[gender lowercaseString]];
}

RCT_EXPORT_METHOD(setReportLocation:(BOOL)location) {
    [Flurry trackPreciseLocation:location];
}

RCT_EXPORT_METHOD(setSessionOrigin:(nonnull NSString *)sessionOrigin deepLink:(nonnull NSString *)deepLink) {
    [Flurry addSessionOrigin:sessionOrigin withDeepLink:deepLink];
}

RCT_EXPORT_METHOD(setUserId:(nullable NSString *)userId) {
    [Flurry setUserID:userId];
}

RCT_EXPORT_METHOD(setVersionName:(nonnull NSString *)version) {
    NSLog(@"Flurry API Removal: [Flurry setAppVersion:] was deprecated and is removed from this version.");
}

RCT_EXPORT_METHOD(setIAPReportingEnabled:(BOOL)enableIAP) {
    [Flurry setIAPReportingEnabled:enableIAP];
}

RCT_EXPORT_METHOD(setDataSaleOptOut:(BOOL)isOptOut) {
    [FlurryCCPA setDataSaleOptOut:isOptOut];
}

RCT_EXPORT_METHOD(deleteData) {
    [FlurryCCPA setDelete];
}

RCT_EXPORT_METHOD(UserPropertiesSet:(nonnull NSString *)propertyName propertyValue:(nonnull NSString *)propertyValue) {
    [FlurryUserProperties set:propertyName value:propertyValue];
}

RCT_EXPORT_METHOD(UserPropertiesSetList:(nonnull NSString *)propertyName propertyValues:(nonnull NSArray *)propertyValues) {
    [FlurryUserProperties set:propertyName values:propertyValues];
}

RCT_EXPORT_METHOD(UserPropertiesAdd:(nonnull NSString *)propertyName propertyValue:(nonnull NSString *)propertyValue) {
    [FlurryUserProperties add:propertyName value:propertyValue];
}

RCT_EXPORT_METHOD(UserPropertiesAddList:(nonnull NSString *)propertyName propertyValues:(nonnull NSArray *)propertyValues) {
    [FlurryUserProperties add:propertyName values:propertyValues];
}

RCT_EXPORT_METHOD(UserPropertiesRemove:(nonnull NSString *)propertyName propertyValue:(nonnull NSString *)propertyValue) {
    [FlurryUserProperties remove:propertyName value:propertyValue];
}

RCT_EXPORT_METHOD(UserPropertiesRemoveList:(nonnull NSString *)propertyName propertyValues:(nonnull NSArray *)propertyValues) {
    [FlurryUserProperties remove:propertyName values:propertyValues];
}

RCT_EXPORT_METHOD(UserPropertiesRemoveAll:(nonnull NSString *)propertyName) {
    [FlurryUserProperties remove:propertyName];
}

RCT_EXPORT_METHOD(UserPropertiesFlag:(nonnull NSString *)propertyName) {
    [FlurryUserProperties flag:propertyName];
}

RCT_EXPORT_METHOD(addOrigin:(nonnull NSString *)originName originVersion:(nonnull NSString *)originVersion) {
    [Flurry addOrigin:originName withVersion:originVersion];
}

RCT_EXPORT_METHOD(addOriginParams:(nonnull NSString *)originName originVersion:(nonnull NSString *)originVersion originParameters:(nullable NSDictionary *)originParameters) {
    [Flurry addOrigin:originName withVersion:originVersion withParameters:originParameters];
}

RCT_EXPORT_METHOD(addSessionProperty:(nonnull NSString *)name value:(nonnull NSString *)value) {
    NSDictionary *sessionProperties = @{name: value};
    [Flurry sessionProperties:sessionProperties];
}

RCT_EXPORT_METHOD(getVersions:(RCTResponseSenderBlock)errorCallback successCallback:(RCTResponseSenderBlock)successCallback) {
    NSString *agentVersion = [Flurry getFlurryAgentVersion];
    NSString *sessionId = [Flurry getSessionID];
    successCallback(@[agentVersion, [NSNull null], sessionId]);
}

RCT_REMAP_METHOD(getVersionsPromise, getVersionsPromiseWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    @try {
        // Please note that AgentVersion on iOS platform is equivalent to ReleaseVersion on Android platform.
        NSString *releaseVersion = [Flurry getFlurryAgentVersion];
        NSString *sessionId = [Flurry getSessionID];
        NSDictionary *map = @{@"agentVersion": [NSNull null],
                              @"releaseVersion": releaseVersion,
                              @"sessionId": sessionId};
        resolve(map);
    } @catch (NSException *exception) {
        reject([exception description], [exception reason], nil);
    }
}

RCT_EXPORT_METHOD(logEvent:(nonnull NSString *)eventId) {
    [Flurry logEvent:eventId];
}

RCT_EXPORT_METHOD(logEventTimed:(nonnull NSString *)eventId timed:(BOOL)timed) {
    [Flurry logEvent:eventId timed:timed];
}

RCT_EXPORT_METHOD(logEventParams:(nonnull NSString *)eventId parameters:(nullable NSDictionary *)params) {
    [Flurry logEvent:eventId withParameters:params];
}

RCT_EXPORT_METHOD(logEventParamsTimed:(nonnull NSString *)eventId parameters:(nullable NSDictionary *)params timed:(BOOL)timed) {
    [Flurry logEvent:eventId withParameters:params timed:timed];
}

RCT_EXPORT_METHOD(endTimedEvent:(nonnull NSString *)eventId) {
    [Flurry endTimedEvent:eventId withParameters:nil];
}

RCT_EXPORT_METHOD(endTimedEventParams:(nonnull NSString *)eventId params:(nullable NSDictionary *)params) {
    [Flurry endTimedEvent:eventId withParameters:params];
}

RCT_EXPORT_METHOD(logBreadcrumb:(nonnull NSString *)breadcrumb) {
    [Flurry leaveBreadcrumb:breadcrumb];
}

RCT_EXPORT_METHOD(logPayment:(NSString *)productName productId:(NSString *)productId quantity:(NSInteger)quantity price:(double)price currency:(NSString *)currency transactionId:(NSString *)transactionId parameters:(NSDictionary *)parameters) {
    [Flurry logPaymentTransactionParamsWithTransactionId:transactionId
                                               productId:productId
                                                quantity:[NSString stringWithFormat:@"%ld", quantity]
                                                   price:[NSString stringWithFormat:@"%f", price]
                                                currency:currency
                                             productName:productName
                                        transactionState:@"0"
                                       userDefinedParams:parameters
                                          statusCallback:nil];
}

RCT_EXPORT_METHOD(onPageView) {
#if TARGET_OS_IOS
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    [Flurry logPageView];
#pragma clang diagnostic pop
#endif
}

RCT_EXPORT_METHOD(onError:(nonnull NSString *)errorId message:(nullable NSString *)message errorClass:(nullable NSString *)errorClass) {
    NSError *error = nil;
    if (errorClass != nil) {
        error = [NSError errorWithDomain:errorClass code:0 userInfo:nil];
    }
    [Flurry logError:errorId message:message error:error];
}

RCT_EXPORT_METHOD(onErrorParams:(nonnull NSString *)errorId message:(nullable NSString *)message errorClass:(nullable NSString *)errorClass parameters:(nullable NSDictionary *)parameters) {
    NSError *error = nil;
    if (errorClass != nil) {
        error = [NSError errorWithDomain:errorClass code:0 userInfo:nil];
    }
    [Flurry logError:errorId message:message error:error withParameters:parameters];
}

#pragma mark - Flurry Messaging

RCT_EXPORT_METHOD(enableMessagingListener:(BOOL)enabled) {
#if TARGET_OS_IOS
#ifdef HAS_MESSAGING
    [ReactNativeFlurryMessagingListener messagingListener].messagingListenerEnabled = enabled;
#else
    [self handleMessagingNotFound];
#endif
#endif
}

RCT_EXPORT_METHOD(willHandleMessage:(BOOL)handled) {
    NSLog(@"Flurry.willHandleMessage is not supported on iOS and tvOS.");
}

#pragma mark - Flurry Config

RCT_EXPORT_METHOD(registerConfigListener) {
#if TARGET_OS_IOS
    if (!self.configListener) {
        self.configListener = [ReactNativeFlurryConfigListener configListener];
        self.configListener.delegate = self;
        [[FConfig sharedInstance] registerObserver:self.configListener withExecutionQueue:self.configListener.queue];
    }
    [self.configListener addCallback];
#endif
}

RCT_EXPORT_METHOD(unregisterConfigListener) {
#if TARGET_OS_IOS
    [self.configListener removeCallback];
#endif
}

RCT_EXPORT_METHOD(fetchConfig) {
#if TARGET_OS_IOS
    [[FConfig sharedInstance] fetchConfig];
#endif
}

RCT_EXPORT_METHOD(activateConfig) {
#if TARGET_OS_IOS
    [[FConfig sharedInstance] activateConfig];
#endif
}

RCT_REMAP_METHOD(getConfigString, getConfigString:(nonnull NSString *)key defaultValue:(nonnull NSString *)defaultValue resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
#if TARGET_OS_IOS
    @try {
        NSString *value = [[FConfig sharedInstance] getStringForKey:key withDefault:defaultValue];
        NSDictionary *map = @{key: value};
        resolve(map);
    } @catch (NSException *exception) {
        reject([exception description], [exception reason], nil);
    }
#endif
}

RCT_REMAP_METHOD(getConfigStringMap, getConfigStringMap:(nonnull NSDictionary *)defaultMap resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
#if TARGET_OS_IOS
    @try {
        NSMutableDictionary<NSString *, NSString *> *map = [NSMutableDictionary dictionary];
        for (NSString *key in defaultMap) {
            NSString *val = [[FConfig sharedInstance] getStringForKey:key withDefault:defaultMap[key]];
            map[key] = val;
        }
        resolve(map);
    } @catch (NSException *exception) {
        reject([exception description], [exception reason], nil);
    }
#endif
}

#pragma mark - Flurry Event Dispatcher delegate

- (void)sendEvent:(NSString *)event params:(NSDictionary *)params {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    [self.bridge.eventDispatcher sendAppEventWithName:event body:params];
#pragma clang diagnostic pop
}

- (BOOL)canAcceptEvents {
    return self.isActive;
}

#pragma mark - Notification listener

- (void)reactNativeJavaScriptDidFinishLoad {
    self.isActive = YES;
#if TARGET_OS_IOS
#ifdef HAS_MESSAGING
    [[ReactNativeFlurryMessagingListener messagingListener] sendPendingEvents];
#endif
#endif
}

#pragma mark - Native API

+ (void)enableMessaging {
#ifdef HAS_MESSAGING
    static dispatch_once_t messagingToken;
    dispatch_once(&messagingToken, ^{
        [FlurryMessaging setAutoIntegrationForMessaging];
        gInstance.messagingListener = [ReactNativeFlurryMessagingListener messagingListener];
        [FlurryMessaging setMessagingDelegate:gInstance.messagingListener];
        gInstance.messagingListener.delegate = gInstance;
    });
#else
    [gInstance handleMessagingNotFound];
#endif
}

#pragma mark - Private helpers

- (void)handleMessagingNotFound {
    NSLog(@"Flurry: You are using Flurry SDK without Flurry Push. If you want to integrate Flurry Push, please open your Podfile, add the following line in your target section before 'use_native_modules!'\n\n  pod 'react-native-flurry-sdk', :path => '../node_modules/react-native-flurry-sdk/ios', :subspecs => ['FlurrySDK-Push']\n\n and execute 'pod install' under your 'ios' folder.");
}

@end
