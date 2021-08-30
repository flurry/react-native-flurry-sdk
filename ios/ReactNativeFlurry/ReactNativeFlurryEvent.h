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

#import <Foundation/Foundation.h>

static NSString * const KRNFLURRY_EVENT_PARAM_AD_TYPE = @"fl.ad.type";
static NSString * const KRNFLURRY_EVENT_PARAM_LEVEL_NAME = @"fl.level.name";
static NSString * const KRNFLURRY_EVENT_PARAM_LEVEL_NUMBER = @"fl.level.number";
static NSString * const KRNFLURRY_EVENT_PARAM_CONTENT_NAME = @"fl.content.name";
static NSString * const KRNFLURRY_EVENT_PARAM_CONTENT_TYPE = @"fl.content.type";
static NSString * const KRNFLURRY_EVENT_PARAM_CONTENT_ID = @"fl.content.id";
static NSString * const KRNFLURRY_EVENT_PARAM_CREDIT_NAME = @"fl.credit.name";
static NSString * const KRNFLURRY_EVENT_PARAM_CREDIT_TYPE = @"fl.credit.type";
static NSString * const KRNFLURRY_EVENT_PARAM_CREDIT_ID = @"fl.credit.id";
static NSString * const KRNFLURRY_EVENT_PARAM_CURRENCY_TYPE = @"fl.currency.type";
static NSString * const KRNFLURRY_EVENT_PARAM_IS_CURRENCY_SOFT = @"fl.is.currency.soft";
static NSString * const KRNFLURRY_EVENT_PARAM_ITEM_NAME = @"fl.item.name";
static NSString * const KRNFLURRY_EVENT_PARAM_ITEM_TYPE = @"fl.item.type";
static NSString * const KRNFLURRY_EVENT_PARAM_ITEM_ID = @"fl.item.id";
static NSString * const KRNFLURRY_EVENT_PARAM_ITEM_COUNT = @"fl.item.count";
static NSString * const KRNFLURRY_EVENT_PARAM_ITEM_CATEGORY = @"fl.item.category";
static NSString * const KRNFLURRY_EVENT_PARAM_ITEM_LIST_TYPE = @"fl.item.list.type";
static NSString * const KRNFLURRY_EVENT_PARAM_PRICE = @"fl.price";
static NSString * const KRNFLURRY_EVENT_PARAM_TOTAL_AMOUNT = @"fl.total.amount";
static NSString * const KRNFLURRY_EVENT_PARAM_ACHIEVEMENT_ID = @"fl.achievement.id";
static NSString * const KRNFLURRY_EVENT_PARAM_SCORE = @"fl.score";
static NSString * const KRNFLURRY_EVENT_PARAM_RATING = @"fl.rating";
static NSString * const KRNFLURRY_EVENT_PARAM_TRANSACTION_ID = @"fl.transaction.id";
static NSString * const KRNFLURRY_EVENT_PARAM_SUCCESS = @"fl.success";
static NSString * const KRNFLURRY_EVENT_PARAM_PAYMENT_TYPE = @"fl.payment.type";
static NSString * const KRNFLURRY_EVENT_PARAM_IS_ANNUAL_SUBSCRIPTION = @"fl.is.annual.subscription";
static NSString * const KRNFLURRY_EVENT_PARAM_SUBSCRIPTION_COUNTRY = @"fl.subscription.country";
static NSString * const KRNFLURRY_EVENT_PARAM_TRIAL_DAYS = @"fl.trial.days";
static NSString * const KRNFLURRY_EVENT_PARAM_PREDICTED_LTV = @"fl.predicted.ltv";
static NSString * const KRNFLURRY_EVENT_PARAM_GROUP_NAME = @"fl.group.name";
static NSString * const KRNFLURRY_EVENT_PARAM_STEP_NUMBER = @"fl.step.number";
static NSString * const KRNFLURRY_EVENT_PARAM_USER_ID = @"fl.user.id";
static NSString * const KRNFLURRY_EVENT_PARAM_METHOD = @"fl.method";
static NSString * const KRNFLURRY_EVENT_PARAM_QUERY = @"fl.query";
static NSString * const KRNFLURRY_EVENT_PARAM_SEARCH_TYPE = @"fl.search.type";
static NSString * const KRNFLURRY_EVENT_PARAM_SOCIAL_CONTENT_NAME = @"fl.social.content.name";
static NSString * const KRNFLURRY_EVENT_PARAM_SOCIAL_CONTENT_ID = @"fl.social.content.id";
static NSString * const KRNFLURRY_EVENT_PARAM_LIKE_TYPE = @"fl.like.type";
static NSString * const KRNFLURRY_EVENT_PARAM_MEDIA_NAME = @"fl.media.name";
static NSString * const KRNFLURRY_EVENT_PARAM_MEDIA_TYPE = @"fl.media.type";
static NSString * const KRNFLURRY_EVENT_PARAM_MEDIA_ID = @"fl.media.id";
static NSString * const KRNFLURRY_EVENT_PARAM_DURATION = @"fl.duration";
static NSString * const KRNFLURRY_EVENT_PARAM_TUTORIAL_NAME = @"fl.tutorial.name";


typedef NS_ENUM (NSUInteger, RNParamType) {
    PT_String = 0,
    PT_Integer,
    PT_Double,
    PT_Boolean,
    PT_Long,
};

@interface ReactNativeFlurryEvent : NSObject

+ (NSMutableDictionary<NSString *, NSNumber *> *)typeMap;

@end

