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

#import "ReactNativeFlurryMessagingListener.h"

static NSString * const kMessagingEvent = @"FlurryMessagingEvent";
static NSString * const kNotificationReceived = @"NotificationReceived";
static NSString * const kNotificationClicked = @"NotificationClicked";

@interface ReactNativeFlurryMessagingListener ()

@property (strong, nonatomic) NSMutableArray<NSDictionary *> *pendingMessages;

@end

@implementation ReactNativeFlurryMessagingListener

- (instancetype)init {
    self = [super init];
    if (self) {
        _messagingListenerEnabled = YES;
        _pendingMessages = [NSMutableArray array];
    }
    return self;
}

+ (instancetype)messagingListener {
    static ReactNativeFlurryMessagingListener *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[ReactNativeFlurryMessagingListener alloc] init];
    });
    return instance;
}

- (void)sendPendingEvents {
    if (self.pendingMessages.count > 0) {
        if (self.messagingListenerEnabled && [self.delegate canAcceptEvents]) {
            for (NSDictionary *msg in self.pendingMessages) {
                [self.delegate sendEvent:kMessagingEvent params:msg];
            }
            [self.pendingMessages removeAllObjects];
        }
    }
}

#pragma mark - Flurry Messaging Delegate

- (void)didReceiveMessage:(FlurryMessage *)message {
    NSDictionary *msgDict = @{@"Type": kNotificationReceived,
                              @"Title": message.title,
                              @"Body": message.body,
                              @"Data": message.appData,
                              };
    if (![self.delegate canAcceptEvents]) {
        [self.pendingMessages addObject:msgDict];
        return;
    }
    if (self.messagingListenerEnabled && [self.delegate canAcceptEvents]) {
        [self.delegate sendEvent:kMessagingEvent params:msgDict];
    }
}

- (void)didReceiveActionWithIdentifier:(NSString *)identifier message:(FlurryMessage *)message {
    NSDictionary *msgDict = @{@"Type": kNotificationClicked,
                              @"Title": message.title,
                              @"Body": message.body,
                              @"Data": message.appData,
                              };
    if (![self.delegate canAcceptEvents]) {
        [self.pendingMessages addObject:msgDict];
        return;
    }
    if (self.messagingListenerEnabled && [self.delegate canAcceptEvents]) {
        [self.delegate sendEvent:kMessagingEvent params:msgDict];
    }
}

@end
