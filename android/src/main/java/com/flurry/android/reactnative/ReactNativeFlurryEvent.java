/*
 * Copyright 2021, Yahoo Inc.
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

package com.flurry.android.reactnative;

import com.flurry.android.FlurryEvent;

public class ReactNativeFlurryEvent {
    final static FlurryEvent[] EVENTS = new FlurryEvent[] {
            FlurryEvent.AD_CLICK,
            FlurryEvent.AD_IMPRESSION,
            FlurryEvent.AD_REWARDED,
            FlurryEvent.AD_SKIPPED,
            FlurryEvent.CREDITS_SPENT,
            FlurryEvent.CREDITS_PURCHASED,
            FlurryEvent.CREDITS_EARNED,
            FlurryEvent.ACHIEVEMENT_UNLOCKED,
            FlurryEvent.LEVEL_COMPLETED,
            FlurryEvent.LEVEL_FAILED,
            FlurryEvent.LEVEL_UP,
            FlurryEvent.LEVEL_STARTED,
            FlurryEvent.LEVEL_SKIP,
            FlurryEvent.SCORE_POSTED,
            FlurryEvent.CONTENT_RATED,
            FlurryEvent.CONTENT_VIEWED,
            FlurryEvent.CONTENT_SAVED,
            FlurryEvent.PRODUCT_CUSTOMIZED,
            FlurryEvent.APP_ACTIVATED,
            FlurryEvent.APPLICATION_SUBMITTED,
            FlurryEvent.ADD_ITEM_TO_CART,
            FlurryEvent.ADD_ITEM_TO_WISH_LIST,
            FlurryEvent.COMPLETED_CHECKOUT,
            FlurryEvent.PAYMENT_INFO_ADDED,
            FlurryEvent.ITEM_VIEWED,
            FlurryEvent.ITEM_LIST_VIEWED,
            FlurryEvent.PURCHASED,
            FlurryEvent.PURCHASE_REFUNDED,
            FlurryEvent.REMOVE_ITEM_FROM_CART,
            FlurryEvent.CHECKOUT_INITIATED,
            FlurryEvent.FUNDS_DONATED,
            FlurryEvent.USER_SCHEDULED,
            FlurryEvent.OFFER_PRESENTED,
            FlurryEvent.SUBSCRIPTION_STARTED,
            FlurryEvent.SUBSCRIPTION_ENDED,
            FlurryEvent.GROUP_JOINED,
            FlurryEvent.GROUP_LEFT,
            FlurryEvent.TUTORIAL_STARTED,
            FlurryEvent.TUTORIAL_COMPLETED,
            FlurryEvent.TUTORIAL_STEP_COMPLETED,
            FlurryEvent.TUTORIAL_SKIPPED,
            FlurryEvent.LOGIN,
            FlurryEvent.LOGOUT,
            FlurryEvent.USER_REGISTERED,
            FlurryEvent.SEARCH_RESULT_VIEWED,
            FlurryEvent.KEYWORD_SEARCHED,
            FlurryEvent.LOCATION_SEARCHED,
            FlurryEvent.INVITE,
            FlurryEvent.SHARE,
            FlurryEvent.LIKE,
            FlurryEvent.COMMENT,
            FlurryEvent.MEDIA_CAPTURED,
            FlurryEvent.MEDIA_STARTED,
            FlurryEvent.MEDIA_STOPPED,
            FlurryEvent.MEDIA_PAUSED,
            FlurryEvent.PRIVACY_PROMPT_DISPLAYED,
            FlurryEvent.PRIVACY_OPT_IN,
            FlurryEvent.PRIVACY_OPT_OUT
    };

    final static Object[] PARAMS = new Object[] {
            FlurryEvent.Param.AD_TYPE,
            FlurryEvent.Param.LEVEL_NAME,
            FlurryEvent.Param.LEVEL_NUMBER,
            FlurryEvent.Param.CONTENT_NAME,
            FlurryEvent.Param.CONTENT_TYPE,
            FlurryEvent.Param.CONTENT_ID,
            FlurryEvent.Param.CREDIT_NAME,
            FlurryEvent.Param.CREDIT_TYPE,
            FlurryEvent.Param.CREDIT_ID,
            FlurryEvent.Param.IS_CURRENCY_SOFT,
            FlurryEvent.Param.CURRENCY_TYPE,
            FlurryEvent.Param.PAYMENT_TYPE,
            FlurryEvent.Param.ITEM_NAME,
            FlurryEvent.Param.ITEM_TYPE,
            FlurryEvent.Param.ITEM_ID,
            FlurryEvent.Param.ITEM_COUNT,
            FlurryEvent.Param.ITEM_CATEGORY,
            FlurryEvent.Param.ITEM_LIST_TYPE,
            FlurryEvent.Param.PRICE,
            FlurryEvent.Param.TOTAL_AMOUNT,
            FlurryEvent.Param.ACHIEVEMENT_ID,
            FlurryEvent.Param.SCORE,
            FlurryEvent.Param.RATING,
            FlurryEvent.Param.TRANSACTION_ID,
            FlurryEvent.Param.SUCCESS,
            FlurryEvent.Param.IS_ANNUAL_SUBSCRIPTION,
            FlurryEvent.Param.SUBSCRIPTION_COUNTRY,
            FlurryEvent.Param.TRIAL_DAYS,
            FlurryEvent.Param.PREDICTED_LTV,
            FlurryEvent.Param.GROUP_NAME,
            FlurryEvent.Param.TUTORIAL_NAME,
            FlurryEvent.Param.STEP_NUMBER,
            FlurryEvent.Param.USER_ID,
            FlurryEvent.Param.METHOD,
            FlurryEvent.Param.QUERY,
            FlurryEvent.Param.SEARCH_TYPE,
            FlurryEvent.Param.SOCIAL_CONTENT_NAME,
            FlurryEvent.Param.SOCIAL_CONTENT_ID,
            FlurryEvent.Param.LIKE_TYPE,
            FlurryEvent.Param.MEDIA_NAME,
            FlurryEvent.Param.MEDIA_TYPE,
            FlurryEvent.Param.MEDIA_ID,
            FlurryEvent.Param.DURATION
    };

}
