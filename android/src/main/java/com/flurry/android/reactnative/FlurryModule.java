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

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.flurry.android.Constants;
import com.flurry.android.FlurryAgent;
import com.flurry.android.FlurryAgentListener;
import com.flurry.android.FlurryConfig;
import com.flurry.android.FlurryConfigListener;
import com.flurry.android.FlurryPerformance;
import com.flurry.android.FlurryPrivacySession;
import com.flurry.android.marketing.FlurryMarketingModule;
import com.flurry.android.marketing.FlurryMarketingOptions;
import com.flurry.android.marketing.messaging.FlurryMessagingListener;
import com.flurry.android.marketing.messaging.notification.FlurryMessage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FlurryModule extends ReactContextBaseJavaModule {
    private static final String TAG = "FlurryModule";

    private static final String REACT_CLASS = "ReactNativeFlurry";
    private static final String FLURRY_CONFIG_EVENT = "FlurryConfigEvent";
    private static final String FLURRY_MESSAGING_EVENT = "FlurryMessagingEvent";

    private static final String ORIGIN_NAME = "react-native-flurry-sdk";
    private static final String ORIGIN_VERSION = "6.1.0";

    private FlurryAgent.Builder mFlurryAgentBuilder;

    private static FlurryPerformance.ResourceLogger sFlurryPerformanceResourceLogger = null;

    private static ReactApplicationContext sReactApplicationContext = null;
    private static boolean sEnableMessagingListener = false;
    private static FlurryMessage sFlurryMessage = null;

    private static RNFlurryConfigListener sRNFlurryConfigListener = null;
    private static int sRequestConfigListener = 0;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    public FlurryModule(ReactApplicationContext reactContext) {
        super(reactContext);

        sReactApplicationContext = reactContext;
    }

    @Override
    public void initialize() {
        super.initialize();

        if ((sFlurryMessage != null) && (sReactApplicationContext != null)) {
            RNFlurryMessagingListener.sendEvent(RNFlurryMessagingListener.EventType.NotificationClicked, sFlurryMessage, false);
            sFlurryMessage = null;
        }
    }

    @ReactMethod
    public void initBuilder() {
        mFlurryAgentBuilder = new FlurryAgent.Builder();
    }

    @ReactMethod
    public void build(String apiKey) {
        FlurryAgent.addOrigin(ORIGIN_NAME, ORIGIN_VERSION);

        Context context = getCurrentActivity();
        if (context == null) {
            context = getReactApplicationContext();
        }
        mFlurryAgentBuilder
                .withListener(new FlurryAgentListener() {
                    @Override
                    public void onSessionStarted() {
                    }
                })
                .withSessionForceStart(true)
                .build(context, apiKey);
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
    public void withDataSaleOptOut(boolean isOptOut) {
        mFlurryAgentBuilder.withDataSaleOptOut(isOptOut);
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
    public void withPerformanceMetrics(int performanceMetrics) {
        mFlurryAgentBuilder.withPerformanceMetrics(performanceMetrics);
    }

    @ReactMethod
    public void withMessaging(boolean enableMessaging) {
        Log.i(TAG, "To enable Flurry Push for Android, please duplicate Builder setup in your MainApplication.java.");
    }

    @ReactMethod
    public void setAge(int age) {
        FlurryAgent.setAge(age);
    }

    @ReactMethod
    public void setGender(String gender) {
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
    public void setSessionOrigin(String originName, String deepLink) {
        FlurryAgent.setSessionOrigin(originName, deepLink);
    }

    @ReactMethod
    public void setUserId(String userId) {
        FlurryAgent.setUserId(userId);
    }

    @ReactMethod
    public void setVersionName(String versionName) {
        FlurryAgent.setVersionName(versionName);
    }

    @ReactMethod
    public void setIAPReportingEnabled(boolean enableIAP) {
        Log.i(TAG, "setIAPReportingEnabled is not supported on Android. Please use logPayment instead.");
    }

    @ReactMethod
    public void setDataSaleOptOut(boolean isOptOut) {
        FlurryAgent.setDataSaleOptOut(isOptOut);
    }

    @ReactMethod
    public void deleteData() {
        FlurryAgent.deleteData();
    }

    @ReactMethod
    public void openPrivacyDashboard() {
        if (sReactApplicationContext == null) {
            Log.w(TAG, "Application Context is not available to open Privacy Dashboard.");
            return;
        }

        FlurryPrivacySession.Callback callback = new FlurryPrivacySession.Callback() {
            @Override
            public void success() {
                Log.d(TAG, "Privacy Dashboard opened successfully.");
            }

            @Override
            public void failure() {
                Log.d(TAG, "Opening Privacy Dashboard failed.");
            }
        };

        FlurryPrivacySession.Request request = new FlurryPrivacySession.Request(
                sReactApplicationContext, callback);
        FlurryAgent.openPrivacyDashboard(request);
    }

    @ReactMethod
    public void addOrigin(String originName, String originVersion) {
        FlurryAgent.addOrigin(originName, originVersion);
    }

    @ReactMethod
    public void addOriginParams(String originName, String originVersion,
                                final ReadableMap originParameters) {
        FlurryAgent.addOrigin(originName, originVersion, toMap(originParameters));
    }

    @ReactMethod
    public void addSessionProperty(String name, String value) {
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
    public void getVersionsPromise(Promise promise) {
        try {
            WritableMap map = Arguments.createMap();
            map.putInt("agentVersion", FlurryAgent.getAgentVersion());
            map.putString("releaseVersion", FlurryAgent.getReleaseVersion());
            map.putString("sessionId", FlurryAgent.getSessionId());
            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject("Flurry.getVersionsPromise", e);
        }
    }

    @ReactMethod
    public void logBreadcrumb(String crashBreadcrumb) {
        FlurryAgent.logBreadcrumb(crashBreadcrumb);
    }

    @ReactMethod
    public void logEvent(String eventId) {
        FlurryAgent.logEvent(eventId);
    }

    @ReactMethod
    public void logEventTimed(String eventId, boolean timed) {
        FlurryAgent.logEvent(eventId, timed);
    }

    @ReactMethod
    public void logEventParams(String eventId, ReadableMap parameters) {
        FlurryAgent.logEvent(eventId, toMap(parameters));
    }

    @ReactMethod
    public void logEventParamsTimed(String eventId, ReadableMap parameters,
                                    boolean timed) {
        FlurryAgent.logEvent(eventId, toMap(parameters), timed);
    }

    @ReactMethod
    public void logPayment(String productName, String productId, int quantity, double price,
                           String currency, String transactionId, ReadableMap parameters) {
        FlurryAgent.logPayment(productName, productId, quantity, price, currency, transactionId,
                toMap(parameters));
    }

    @ReactMethod
    public void endTimedEvent(String eventId) {
        FlurryAgent.endTimedEvent(eventId);
    }

    @ReactMethod
    public void endTimedEventParams(String eventId, ReadableMap parameters) {
        FlurryAgent.endTimedEvent(eventId, toMap(parameters));
    }

    @ReactMethod
    public void onError(String errorId, String message, String errorClass) {
        FlurryAgent.onError(errorId, message, errorClass);
    }

    @ReactMethod
    public void onErrorParams(String errorId, String message, String errorClass,
                              ReadableMap errorParams) {
        FlurryAgent.onError(errorId, message, errorClass, toMap(errorParams));
    }

    @ReactMethod
    public void onPageView() {
        // Deprecated API removed
        // FlurryAgent.onPageView();
    }

    @ReactMethod
    public void UserPropertiesSet(String propertyName, String propertyValue) {
        FlurryAgent.UserProperties.set(propertyName, propertyValue);
    }

    @ReactMethod
    public void UserPropertiesSetList(String propertyName, ReadableArray propertyValues) {
        FlurryAgent.UserProperties.set(propertyName, toList(propertyValues));
    }

    @ReactMethod
    public void UserPropertiesAdd(String propertyName, String propertyValue) {
        FlurryAgent.UserProperties.add(propertyName, propertyValue);
    }

    @ReactMethod
    public void UserPropertiesAddList(String propertyName, ReadableArray propertyValues) {
        FlurryAgent.UserProperties.add(propertyName, toList(propertyValues));
    }

    @ReactMethod
    public void UserPropertiesRemove(String propertyName, String propertyValue) {
        FlurryAgent.UserProperties.remove(propertyName, propertyValue);
    }

    @ReactMethod
    public void UserPropertiesRemoveList(String propertyName, ReadableArray propertyValues) {
        FlurryAgent.UserProperties.remove(propertyName, toList(propertyValues));
    }

    @ReactMethod
    public void UserPropertiesRemoveAll(String propertyName) {
        FlurryAgent.UserProperties.remove(propertyName);
    }

    @ReactMethod
    public void UserPropertiesFlag(String propertyName) {
        FlurryAgent.UserProperties.flag(propertyName);
    }

    @ReactMethod
    public void reportFullyDrawn() {
        FlurryPerformance.reportFullyDrawn();
    }

    @ReactMethod
    public void startPerformanceResourceLogger() {
        sFlurryPerformanceResourceLogger = new FlurryPerformance.ResourceLogger();
    }

    @ReactMethod
    public void logPerformanceResourceLogger(String id) {
        if (sFlurryPerformanceResourceLogger != null) {
            sFlurryPerformanceResourceLogger.logEvent(id);
        }
    }

    @ReactMethod
    public void updateConversionValue(int conversionValue) {
        Log.i(TAG, "UpdateConversionValue is for iOS only.");
    }

    @ReactMethod
    public void updateConversionValueWithEvent(int flurryEvent) {
        Log.i(TAG, "UpdateConversionValueWithEvent is for iOS only.");
    }

    @ReactMethod
    public void enableMessagingListener(boolean enable) {
        sEnableMessagingListener = enable;
    }

    @ReactMethod
    public void willHandleMessage(boolean handled) {
        RNFlurryMessagingListener.notifyCallbackReturn(handled);
    }

    @ReactMethod
    public void registerConfigListener() {
        sRequestConfigListener++;
        if (sRNFlurryConfigListener == null) {
            sRNFlurryConfigListener = new RNFlurryConfigListener();
            FlurryConfig.getInstance().registerListener(sRNFlurryConfigListener);
        }
    }

    @ReactMethod
    public void unregisterConfigListener() {
        sRequestConfigListener--;
    }

    @ReactMethod
    public void fetchConfig() {
        FlurryConfig.getInstance().fetchConfig();
    }

    @ReactMethod
    public void activateConfig() {
        FlurryConfig.getInstance().activateConfig();
    }

    @ReactMethod
    public void getConfigString(String key, String defaultValue, Promise promise) {
        try {
            WritableMap map = Arguments.createMap();
            map.putString(key, FlurryConfig.getInstance().getString(key, defaultValue));
            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject("Flurry.getConfigString", e);
        }
    }

    @ReactMethod
    public void getConfigStringMap(ReadableMap keyAndDefault, Promise promise) {
        try {
            WritableMap map = Arguments.createMap();
            if (keyAndDefault != null) {
                ReadableMapKeySetIterator iterator = keyAndDefault.keySetIterator();
                while (iterator.hasNextKey()) {
                    String key = iterator.nextKey();
                    String defaultValue = keyAndDefault.getString(key);
                    map.putString(key, FlurryConfig.getInstance().getString(key, defaultValue));
                }
            }
            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject("Flurry.getConfigString", e);
        }
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

    private static List<String> toList(final ReadableArray readableArray) {
        if ((readableArray == null) || (readableArray.size() == 0)) {
            return null;
        }

        List<String> result = new ArrayList<>();
        for (int i = 0; i < readableArray.size(); i++) {
            if (readableArray.getType(i) == ReadableType.String) {
                result.add(readableArray.getString(i));
            }
        }

        return result;
    }

    /**
     * Builder Pattern class for Flurry. Used by MainApplication to initialize Flurry Push for messaging.
     */
    public static class Builder {
        private FlurryAgent.Builder mFlurryAgentBuilder;

        public Builder() {
            mFlurryAgentBuilder = new FlurryAgent.Builder();
        }

        /**
         * True to enable or  false to disable the ability to catch all uncaught exceptions
         * and have them reported back to Flurry.
         *
         * @param captureExceptions true to enable, false to disable.
         * @return The Builder instance.
         */
        public Builder withCrashReporting(final boolean captureExceptions) {
            mFlurryAgentBuilder.withCaptureUncaughtExceptions(captureExceptions);
            return this;
        }

        /**
         * Set the timeout for expiring a Flurry session.
         *
         * @param sessionMillis The time in milliseconds to set the session timeout to. Minimum value of 5000.
         * @return The Builder instance.
         */
        public Builder withContinueSessionMillis(final long sessionMillis) {
            mFlurryAgentBuilder.withContinueSessionMillis(sessionMillis);
            return this;
        }

        /**
         * True if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
         * Default is set to true.
         *
         * @param includeBackgroundSessionsInMetrics if background and inactive session should be counted toward dau
         */
        public Builder withIncludeBackgroundSessionsInMetrics(final boolean includeBackgroundSessionsInMetrics) {
            mFlurryAgentBuilder.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics);
            return this;
        }

        /**
         * True to enable or false to disable the internal logging for the Flurry SDK.
         *
         * @param enableLog true to enable logging, false to disable it.
         * @return The Builder instance.
         */
        public Builder withLogEnabled(final boolean enableLog) {
            mFlurryAgentBuilder.withLogEnabled(enableLog);
            return this;
        }

        /**
         * Set the log level of the internal Flurry SDK logging.
         *
         * @param logLevel The level to set it to.
         * @return The Builder instance.
         */
        public Builder withLogLevel(final int logLevel) {
            mFlurryAgentBuilder.withLogLevel(logLevel);
            return this;
        }

        /**
         * Set flags for performance metrics.
         *
         * @param performanceMetrics Flags for performance metrics.
         * @return The Builder instance.
         */
        public Builder withPerformanceMetrics(final int performanceMetrics) {
            mFlurryAgentBuilder.withPerformanceMetrics(performanceMetrics);
            return this;
        }

        /**
         * Enable Flurry add-on Messaging.
         *
         * @param enableMessaging true to enable messaging,
         *                        currently support only auto integration.
         * @return The Builder instance.
         */
        public Builder withMessaging(final boolean enableMessaging) {
            withMessaging(enableMessaging, (FlurryMessagingListener) null);

            return this;
        }

        /**
         * Enable Flurry add-on Messaging with listener.
         *
         * @param enableMessaging   true to enable messaging,
         *                          currently support only auto integration.
         * @param messagingListener user's messaging listener.
         * @return The Builder instance.
         */
        public Builder withMessaging(final boolean enableMessaging, FlurryMessagingListener messagingListener) {
            if (!enableMessaging) {
                return this;
            }

            if (messagingListener == null) {
                messagingListener = new RNFlurryMessagingListener();
            }

            FlurryMarketingOptions messagingOptions = new FlurryMarketingOptions.Builder()
                    .setupMessagingWithAutoIntegration()
                    .withFlurryMessagingListener(messagingListener)
                    // Define yours if needed
                    // .withDefaultNotificationChannelId(NOTIFICATION_CHANNEL_ID)
                    // .withDefaultNotificationIconResourceId(R.mipmap.ic_launcher_round)
                    // .withDefaultNotificationIconAccentColor(getResources().getColor(R.color.colorPrimary))
                    .build();

            FlurryMarketingModule marketingModule = new FlurryMarketingModule(messagingOptions);
            mFlurryAgentBuilder.withModule(marketingModule);

            return this;
        }

        /**
         * Enable Flurry add-on Messaging with options.
         *
         * @param enableMessaging  true to enable messaging.
         * @param messagingOptions user's messaging options.
         * @return The Builder instance.
         */
        public Builder withMessaging(final boolean enableMessaging, final FlurryMarketingOptions messagingOptions) {
            if (!enableMessaging) {
                return this;
            }

            FlurryMarketingModule marketingModule = new FlurryMarketingModule(messagingOptions);
            mFlurryAgentBuilder.withModule(marketingModule);

            return this;
        }

        public void build(final Context context, final String apiKey) {
            mFlurryAgentBuilder
                    .withSessionForceStart(true)
                    .build(context, apiKey);
        }
    }

    /**
     * Wrapper Flurry Config listenet.
     */
    static class RNFlurryConfigListener implements FlurryConfigListener {

        enum EventType {
            FetchSuccess("FetchSuccess"),
            FetchNoChange("FetchNoChange"),
            FetchError("FetchError"),
            ActivateComplete("ActivateComplete");

            private final String name;

            EventType(String name) {
                this.name = name;
            }

            public String getName() {
                return name;
            }
        }

        @Override
        public void onFetchSuccess() {
            if ((sRequestConfigListener > 0) && (sReactApplicationContext != null)) {
                sendEvent(EventType.FetchSuccess);
            }
        }

        @Override
        public void onFetchNoChange() {
            if ((sRequestConfigListener > 0) && (sReactApplicationContext != null)) {
                sendEvent(EventType.FetchNoChange);
            }
        }

        @Override
        public void onFetchError(boolean value) {
            if ((sRequestConfigListener > 0) && (sReactApplicationContext != null)) {
                sendEvent(EventType.FetchError, "isRetrying", value);
            }
        }

        @Override
        public void onActivateComplete(boolean value) {
            if ((sRequestConfigListener > 0) && (sReactApplicationContext != null)) {
                sendEvent(EventType.ActivateComplete, "isCache", value);
            }
        }

        private void sendEvent(EventType type) {
            sendEvent(type, null, false);
        }

        private void sendEvent(EventType type, String key, boolean value) {
            WritableMap params = Arguments.createMap();
            params.putString("Type", type.getName());
            if (key != null) {
                params.putBoolean(key, value);
            }

            sReactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(FLURRY_CONFIG_EVENT, params);
        }

    }

    /**
     * Wrapper Flurry Messaging listenet.
     */
    static class RNFlurryMessagingListener implements FlurryMessagingListener {
        private volatile static boolean sCallbackReturnValue = false;
        private volatile static boolean sIsCallbackReturn = false;

        enum EventType {
            NotificationReceived("NotificationReceived"),
            NotificationClicked("NotificationClicked"),
            NotificationCancelled("NotificationCancelled"),
            TokenRefresh("TokenRefresh"),
            NonFlurryNotificationReceived("NonFlurryNotificationReceived");

            private final String name;

            EventType(String name) {
                this.name = name;
            }

            public String getName() {
                return name;
            }
        }

        @Override
        public boolean onNotificationReceived(FlurryMessage flurryMessage) {
            if (sEnableMessagingListener && (sReactApplicationContext != null)) {
                return sendEvent(EventType.NotificationReceived, flurryMessage, true);
            }
            return false;
        }

        @Override
        public boolean onNotificationClicked(FlurryMessage flurryMessage) {
            if (sReactApplicationContext == null) {
                // React Native platform is inactive, cache for later.
                sFlurryMessage = flurryMessage;
            } else if (sEnableMessagingListener) {
                return sendEvent(EventType.NotificationClicked, flurryMessage, true);
            }
            return false;
        }

        @Override
        public void onNotificationCancelled(FlurryMessage flurryMessage) {
            if (sEnableMessagingListener && (sReactApplicationContext != null)) {
                sendEvent(EventType.NotificationCancelled, flurryMessage, false);
            }
        }

        @Override
        public void onTokenRefresh(String token) {
            if (sEnableMessagingListener && (sReactApplicationContext != null)) {
                sendEvent(EventType.TokenRefresh, token);
            }
        }

        @Override
        public void onNonFlurryNotificationReceived(Object message) {
            // no-op
        }

        private static boolean sendEvent(EventType type, FlurryMessage flurryMessage, boolean waitReturn) {
            WritableMap params = Arguments.createMap();
            params.putString("Type", type.getName());
            params.putString("Title", flurryMessage.getTitle());
            params.putString("Body", flurryMessage.getBody());
            params.putString("ClickAction", flurryMessage.getClickAction());

            Map<String, String> appData = flurryMessage.getAppData();
            WritableMap data = Arguments.createMap();
            for (String key : appData.keySet()) {
                data.putString(key, appData.get(key));
            }
            params.putMap("Data", data);

            sCallbackReturnValue = false;
            sIsCallbackReturn = !waitReturn;
            sReactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(FLURRY_MESSAGING_EVENT, params);
            waitCallbackReturn();
            return sCallbackReturnValue;
        }

        private static void sendEvent(EventType type, String token) {
            WritableMap params = Arguments.createMap();
            params.putString("Type", type.getName());
            params.putString("Token", token);

            sReactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(FLURRY_MESSAGING_EVENT, params);
        }

        private static void waitCallbackReturn() {
            synchronized (sReactApplicationContext) {
                if (!sIsCallbackReturn) {
                    try {
                        sReactApplicationContext.wait(300);
                    } catch (InterruptedException e) {
                        Log.e(TAG, "Interrupted Exception!", e);
                    }
                }
            }
        }

        private static void notifyCallbackReturn(boolean returnValue) {
            synchronized (sReactApplicationContext) {
                sCallbackReturnValue = returnValue;
                sIsCallbackReturn = true;
                sReactApplicationContext.notifyAll();
            }
        }
    }

}
