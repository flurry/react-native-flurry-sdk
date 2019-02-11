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

package com.flurry.android.reactnative;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.flurry.android.Constants;
import com.flurry.android.FlurryAgent;
import com.flurry.android.FlurryAgentListener;

import java.util.HashMap;
import java.util.Map;
import android.util.Log;

public class FlurryModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "ReactNativeFlurry";

    private static final String ORIGIN_NAME = "react-native-flurry-sdk";
    private static final String ORIGIN_VERSION = "2.0.0";

    private FlurryAgent.Builder mFlurryAgentBuilder;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    public FlurryModule(ReactApplicationContext reactContext) {
        super(reactContext);

        // TODO remove this call after non-Builder APIs removed.
        initBuilder();
    }

    @ReactMethod
    public void initBuilder() {
        mFlurryAgentBuilder = new FlurryAgent.Builder();
    }

    @ReactMethod
    public void build(@NonNull String apiKey) {
        FlurryAgent.addOrigin(ORIGIN_NAME, ORIGIN_VERSION);
        mFlurryAgentBuilder
                .withListener(new FlurryAgentListener() {
                    @Override
                    public void onSessionStarted() {
                    }
                })
                .build(getCurrentActivity(), apiKey);
    }

    @ReactMethod
    public void withCrashReporting(boolean crashReporting) {
        mFlurryAgentBuilder.withCaptureUncaughtExceptions(crashReporting);
    }

    @ReactMethod
    public void withContinueSessionMillis(int sessionMillis) {
        mFlurryAgentBuilder.withContinueSessionMillis(sessionMillis);
    }

    @ReactMethod
    public void withIncludeBackgroundSessionsInMetrics(boolean includeBackgroundSessionsInMetrics) {
        mFlurryAgentBuilder.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics);
    }

    @ReactMethod
    public void withLogEnabled(boolean enableLog) {
        mFlurryAgentBuilder.withLogEnabled(enableLog);
    }

    @ReactMethod
    public void withLogLevel(int logLevel) {
        mFlurryAgentBuilder.withLogLevel(logLevel);
    }

    @ReactMethod
    public void setAge(int age) {
        FlurryAgent.setAge(age);
    }

    @ReactMethod
    public void setGender(@NonNull String gender) {
        byte _gender = Constants.UNKNOWN;
        if (gender.equalsIgnoreCase("m")) {
            _gender = Constants.MALE;
        } else if (gender.equalsIgnoreCase("f")) {
            _gender = Constants.FEMALE;
        }
        FlurryAgent.setGender(_gender);
    }

    @ReactMethod
    public void setReportLocation(boolean reportLocation) {
        FlurryAgent.setReportLocation(reportLocation);
    }

    @ReactMethod
    public void setSessionOrigin(@NonNull String originName, @Nullable String deepLink) {
        FlurryAgent.setSessionOrigin(originName, deepLink);
    }

    @ReactMethod
    public void setUserId(@NonNull String userId) {
        FlurryAgent.setUserId(userId);
    }

    @ReactMethod
    public void setVersionName(@NonNull String versionName) {
        FlurryAgent.setVersionName(versionName);
    }

    @ReactMethod
    public void setIAPReportingEnabled(boolean enableIAP) {
        Log.i("FlurryModule", "setIAPReportingEnabled is not supported on Android. Please use logPayment instead.");
    }

    @ReactMethod
    public void addOrigin(@NonNull String originName, @NonNull String originVersion) {
        FlurryAgent.addOrigin(originName, originVersion);
    }

    @ReactMethod
    public void addOriginParams(@NonNull String originName, @NonNull String originVersion,
                                final ReadableMap originParameters) {
        FlurryAgent.addOrigin(originName, originVersion, toMap(originParameters));
    }

    @ReactMethod
    public void addSessionProperty(@NonNull String name, @Nullable String value) {
        FlurryAgent.addSessionProperty(name, value);
    }

    @ReactMethod
    public void getVersions(Callback errorCallback, Callback successCallback) {
        try {
            successCallback.invoke(FlurryAgent.getAgentVersion(), FlurryAgent.getReleaseVersion(),
                    FlurryAgent.getSessionId());
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void logBreadcrumb(@NonNull String crashBreadcrumb) {
        FlurryAgent.logBreadcrumb(crashBreadcrumb);
    }

    @ReactMethod
    public void logEvent(@NonNull String eventId) {
        FlurryAgent.logEvent(eventId);
    }

    @ReactMethod
    public void logEventTimed(@NonNull String eventId, boolean timed) {
        FlurryAgent.logEvent(eventId, timed);
    }

    @ReactMethod
    public void logEventParams(@NonNull String eventId, @NonNull ReadableMap parameters) {
        FlurryAgent.logEvent(eventId, toMap(parameters));
    }

    @ReactMethod
    public void logEventParamsTimed(@NonNull String eventId, @NonNull ReadableMap parameters,
                                    boolean timed) {
        FlurryAgent.logEvent(eventId, toMap(parameters), timed);
    }

    @ReactMethod
    public void logPayment(@NonNull String productName, @NonNull String productId,
                           int quantity, double price, @NonNull String currency,
                           @NonNull String transactionId, @Nullable ReadableMap parameters) {
        FlurryAgent.logPayment(productName, productId, quantity, price, currency, transactionId,
                toMap(parameters));
    }

    @ReactMethod
    public void endTimedEvent(@NonNull String eventId) {
        FlurryAgent.endTimedEvent(eventId);
    }

    @ReactMethod
    public void endTimedEventParams(@NonNull String eventId, @NonNull ReadableMap parameters) {
        FlurryAgent.endTimedEvent(eventId, toMap(parameters));
    }

    @ReactMethod
    public void onError(@NonNull String errorId, @NonNull String message, @NonNull String errorClass) {
        FlurryAgent.onError(errorId, message, errorClass);
    }

    @ReactMethod
    public void onErrorParams(@NonNull String errorId, @NonNull String message, @NonNull String errorClass,
                              @Nullable ReadableMap errorParams) {
        FlurryAgent.onError(errorId, message, errorClass, toMap(errorParams));
    }

    @ReactMethod
    public void onPageView() {
        FlurryAgent.onPageView();
    }

    private static Map<String, String> toMap(final ReadableMap readableMap) {
        if (readableMap == null) {
            return null;
        }

        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        if (!iterator.hasNextKey()) {
            return null;
        }

        Map<String, String> result = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            result.put(key, readableMap.getString(key));
        }

        return result;
    }

}
