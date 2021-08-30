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

#import "ReactNativeFlurryEvent.h"

NSMutableDictionary<NSString *, NSNumber *> *_paramTypeMap;

@implementation ReactNativeFlurryEvent

+ (NSMutableDictionary<NSString *, NSNumber *> *)typeMap{
    if(!_paramTypeMap){
        _paramTypeMap = [NSMutableDictionary new];
        // construct the map
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_AD_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_LEVEL_NAME] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_LEVEL_NUMBER] = @(PT_Integer);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_CONTENT_NAME] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_CONTENT_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_CONTENT_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_CREDIT_NAME] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_CREDIT_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_CREDIT_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_CURRENCY_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_IS_CURRENCY_SOFT] = @(PT_Boolean);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_ITEM_NAME] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_ITEM_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_ITEM_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_ITEM_COUNT] = @(PT_Integer);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_ITEM_CATEGORY] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_ITEM_LIST_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_PRICE] = @(PT_Double);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_TOTAL_AMOUNT] = @(PT_Double);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_ACHIEVEMENT_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_SCORE] = @(PT_Integer);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_RATING] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_TRANSACTION_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_SUCCESS] = @(PT_Boolean);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_PAYMENT_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_IS_ANNUAL_SUBSCRIPTION] = @(PT_Boolean);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_SUBSCRIPTION_COUNTRY] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_TRIAL_DAYS] = @(PT_Integer);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_PREDICTED_LTV] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_GROUP_NAME] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_STEP_NUMBER] = @(PT_Integer);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_USER_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_METHOD] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_QUERY] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_SEARCH_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_SOCIAL_CONTENT_NAME] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_SOCIAL_CONTENT_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_LIKE_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_MEDIA_NAME] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_MEDIA_TYPE] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_MEDIA_ID] = @(PT_String);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_DURATION] = @(PT_Integer);
        _paramTypeMap[KRNFLURRY_EVENT_PARAM_TUTORIAL_NAME] = @(PT_String);
    }
    return _paramTypeMap;
}
@end

