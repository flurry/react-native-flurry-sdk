/*
 * Copyright 2019, Oath Inc.
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

#import "ReactNativeFlurryConfigListener.h"

static NSString * const kConfigEvent = @"FlurryConfigEvent";
static NSString * const kFetchSuccess = @"FetchSuccess";
static NSString * const kFetchNoChange = @"FetchNoChange";
static NSString * const kFetchError = @"FetchError";
static NSString * const kActivateComplete = @"ActivateComplete";

@interface ReactNativeFlurryConfigListener ()

// number of JS callbacks added to config listener
@property (assign, nonatomic) NSUInteger callbacks;

@end

@implementation ReactNativeFlurryConfigListener

- (instancetype)init {
    self = [super init];
    if (self) {
        _callbacks = 0;
        _queue = dispatch_queue_create("com.flurry.reactnative.config.queue", 0);
    }
    return self;
}

+ (instancetype)configListener {
    static ReactNativeFlurryConfigListener *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[ReactNativeFlurryConfigListener alloc] init];
    });
    return instance;
}

- (void)addCallback {
    self.callbacks ++;
}

- (void)removeCallback {
    if (self.callbacks > 0) {
        self.callbacks --;
    }
}

#pragma mark - FConfigObserver

- (void)fetchComplete {
    if (self.callbacks > 0) {
        NSDictionary *event = @{@"Type": kFetchSuccess};
        [self.delegate sendEvent:kConfigEvent params:event];
    }
}

- (void)fetchFail {
    if (self.callbacks > 0) {
        NSDictionary *event = @{@"Type": kFetchError};
        [self.delegate sendEvent:kConfigEvent params:event];
    }
}

- (void)fetchCompleteNoChange {
    if (self.callbacks > 0) {
        NSDictionary *event = @{@"Type": kFetchNoChange};
        [self.delegate sendEvent:kConfigEvent params:event];
    }
}

- (void)activationComplete {
    if (self.callbacks > 0) {
        NSDictionary *event = @{@"Type": kActivateComplete};
        [self.delegate sendEvent:kConfigEvent params:event];
    }
}

@end
