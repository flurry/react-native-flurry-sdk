import {
    DeviceEventEmitter,
    NativeAppEventEmitter,
    NativeModules,
    Platform,
 } from 'react-native';

const { ReactNativeFlurry } = NativeModules;

export default class Flurry {

    /**
     * Android (2:VERBOSE, 3:DEBUG, 4:INFO, 5:WARN, 6:ERROR, 7:ASSERT), iOS (2:All, 3-5:Debug, 6-7:Critical)
     */
    static LogLevel = Object.freeze({
	    VERBOSE: 2,
	    DEBUG:   3,
	    INFO:    4,
	    WARN:    5,
	    ERROR:   6,
	    ASSERT:  7
    });

    static Gender = Object.freeze({
	    MALE:   'm',
	    FEMALE: 'f'
    });

    static ConfigStatus = Object.freeze({
        SUCCESS:   'FetchSuccess',
        UNCHANGED: 'FetchNoChange',
        ERROR:     'FetchError',
        ACTIVATED: 'ActivateComplete'
    });

    static MessageType = Object.freeze({
        RECEIVED:  'NotificationReceived',
        CLICKED:   'NotificationClicked',
        CANCELLED: 'NotificationCancelled',
        REFRESH:   'TokenRefresh'
    });

    static Builder = class {
        constructor() {
            ReactNativeFlurry.initBuilder();
        }

        build(...apiKeys) {
            if (apiKeys.length === 0) {
                console.error('Flurry.Builder.build: apiKey(string) is required');
                return;
            } else if (apiKeys.length === 1) {
                if (typeof apiKeys[0] !== 'string') {
                    console.error('Flurry.Builder.build: apiKey1(string) is required');
                    return;
                }
                ReactNativeFlurry.build(apiKeys[0]);
            } else if (apiKeys.length === 2) {
                if (Platform.OS === 'android') {
                    if (typeof apiKeys[0] !== 'string') {
                        console.error('Flurry.Builder.build: apiKey1(string) is required');
                        return;
                    }
                    ReactNativeFlurry.build(apiKeys[0]);
                } else if (Platform.OS === 'ios') {
                    if (typeof apiKeys[1] !== 'string') {
                        console.error('Flurry.Builder.build: apiKey2(string) is required');
                        return;
                    }
                    ReactNativeFlurry.build(apiKeys[1]);
                }
            }
        }

        withAppVersion(versionName = '1.0') {
            if (Platform.OS === 'ios') {
                if (typeof versionName !== 'string') {
                    console.error(`Flurry.withAppVersion: versionName must be string. Got ${versionName}`);
                    return this;
                }

                ReactNativeFlurry.withAppVersion(versionName);
            }
            return this;
        }

        withCrashReporting(crashReporting = true) {
            if (typeof crashReporting !== 'boolean') {
                console.error(`Flurry.Builder.withCrashReporting: crashReporting must be one of [true, false]. Got ${crashReporting}`);
                return this;
            }

            ReactNativeFlurry.withCrashReporting(crashReporting);
            return this;
        }

        withContinueSessionMillis(sessionMillis = 10000) {
            if (typeof sessionMillis !== 'number' || sessionMillis < 5000) {
                console.error('Flurry.Builder.withContinueSessionMillis: the minimum timeout for a session is 5,000 ms.');
                return this;
            }

            ReactNativeFlurry.withContinueSessionMillis(sessionMillis);
            return this;
        }

        withDataSaleOptOut(isOptOut = false) {
            if (typeof isOptOut !== 'boolean') {
                console.error(`Flurry.Builder.withDataSaleOptOut: isOptOut must be one of [true, false]. Got ${isOptOut}`);
                return this;
            }

            ReactNativeFlurry.withDataSaleOptOut(isOptOut);
            return this;
        }

        withIAPReportingEnabled(enableIAP = true) {
            if (Platform.OS === 'ios') {
                if (typeof enableIAP !== 'boolean') {
                    console.error(`Flurry.Builder.withIAPReportingEnabled: enableIAP must be one of [true, false]. Got ${enableIAP}`);
                    return this;
                }

                ReactNativeFlurry.withIAPReportingEnabled(enableIAP);
            }
            return this;
        }

        withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true) {
            if (typeof includeBackgroundSessionsInMetrics !== 'boolean') {
                console.error(`Flurry.Builder.withIncludeBackgroundSessionsInMetrics: includeBackgroundSessionsInMetrics must be one of [true, false]. Got ${includeBackgroundSessionsInMetrics}`);
                return this;
            }

            ReactNativeFlurry.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics);
            return this;
        }

        withLogEnabled(enableLog = true) {
            if (typeof enableLog !== 'boolean') {
                console.error(`Flurry.Builder.withLogEnabled: enableLog must be one of [true, false]. Got ${enableLog}`);
                return this;
            }

            ReactNativeFlurry.withLogEnabled(enableLog);
            return this;
        }

        withLogLevel(logLevel = Flurry.LogLevel.WARN) {
            ReactNativeFlurry.withLogLevel(logLevel);
            return this;
        }

        withMessaging(enableMessaging = true) {
            if (typeof enableMessaging !== 'boolean') {
                console.error(`Flurry.Builder.withMessaging: enableMessaging must be one of [true, false]. Got ${enableMessaging}`);
                return this;
            }

            ReactNativeFlurry.withMessaging(enableMessaging);
            return this;
        }

        withTVSessionReportingInterval(interval = 5) {
            if (Platform.OS === 'ios' && Platform.isTVOS) {
                ReactNativeFlurry.withTVSessionReportingInterval(interval);
            }
            return this;
        }

        withTVEventCountThreshold(threshold = 10) {
            if (Platform.OS === 'ios' && Platform.isTVOS) {
                ReactNativeFlurry.withTVEventCountThreshold(threshold);
            }
            return this;
        }
    };

    static UserProperties = Object.freeze({
        PROPERTY_CURRENCY_PREFERENCE: 'Flurry.CurrencyPreference',
        PROPERTY_PURCHASER:           'Flurry.Purchaser',
        PROPERTY_REGISTERED_USER:     'Flurry.RegisteredUser',
        PROPERTY_SUBSCRIBER:          'Flurry.Subscriber',

        set(propertyName, propertyValue) {
            if (typeof propertyName !== 'string') {
                console.error(`Flurry.UserProperties.set: propertyName must be string. Got ${propertyName}`);
                return;
            }

            if (typeof propertyValue === 'string') {
                ReactNativeFlurry.UserPropertiesSet(propertyName, propertyValue);
            } else if (Array.isArray(propertyValue)) {
                ReactNativeFlurry.UserPropertiesSetList(propertyName, propertyValue);
            }
        },

        add(propertyName, propertyValue) {
            if (typeof propertyName !== 'string') {
                console.error(`Flurry.UserProperties.add: propertyName must be string. Got ${propertyName}`);
                return;
            }

            if (typeof propertyValue === 'string') {
                ReactNativeFlurry.UserPropertiesAdd(propertyName, propertyValue);
            } else if (Array.isArray(propertyValue)) {
                ReactNativeFlurry.UserPropertiesAddList(propertyName, propertyValue);
            }
        },

        remove(...properties) {
            if (typeof properties[0] !== 'string') {
                console.error(`Flurry.UserProperties.remove: propertyName must be string. Got ${properties[0]}`);
                return;
            }

            if (properties.length === 1) {
                ReactNativeFlurry.UserPropertiesRemoveAll(properties[0]);
            } else if (typeof properties[1] === 'string') {
                ReactNativeFlurry.UserPropertiesRemove(properties[0], properties[1]);
            } else if (Array.isArray(properties[1])) {
                ReactNativeFlurry.UserPropertiesRemoveList(properties[0], properties[1]);
            }
        },

        flag(propertyName) {
            if (typeof propertyName !== 'string') {
                console.error(`Flurry.UserProperties.flag: propertyName must be string. Got ${propertyName}`);
                return;
            }

            ReactNativeFlurry.UserPropertiesFlag(propertyName);
        }
    });

    static setAge(age) {
        if (typeof age !== 'number' || age <= 0 || age >= 110) {
            console.error(`Flurry.setAge: age must be a valid positive number between 0 and 110. Got ${age}`);
            return;
        }

        ReactNativeFlurry.setAge(age);
    }

    static setGender(gender) {
        if (typeof gender !== 'string' || !['m', 'f'].includes(gender)) {
            console.error(`Flurry.setGender: gender must be type of Flurry.Gender. Got ${gender}`);
            return;
        }

        ReactNativeFlurry.setGender(gender);
    }

    static setReportLocation(reportLocation) {
        if (typeof reportLocation !== 'boolean') {
            console.error(`Flurry.setReportLocation: reportLocation must be one of [true, false]. Got ${reportLocation}`);
            return;
        }

        ReactNativeFlurry.setReportLocation(reportLocation);
    }

    static setSessionOrigin(originName, deepLink) {
        if (typeof originName !== 'string') {
            console.error(`Flurry.setSessionOrigin: originName must be string. Got ${originName}`);
            return;
        }

        if (typeof deepLink !== 'string') {
            console.error(`Flurry.setSessionOrigin: deepLink must be string. Got ${deepLink}`);
            return;
        }

        ReactNativeFlurry.setSessionOrigin(originName, deepLink);
    }

    static setUserId(userId) {
        if (typeof userId !== 'string') {
            console.error(`Flurry.setUserId: userId must be a string. Got ${userId}`);
            return;
        }

        ReactNativeFlurry.setUserId(userId);
    }

    static setVersionName(versionName = '1.0') {
        if (typeof versionName !== 'string') {
            console.error(`Flurry.setVersionName: versionName must be a string. Got ${versionName}`);
            return;
        }

        ReactNativeFlurry.setVersionName(versionName);
    }

    static setIAPReportingEnabled(enableIAP = true) {
        if (typeof enableIAP !== 'boolean') {
            console.error(`Flurry.setIAPReportingEnabled: enableIAP must be one of [true, false]. Got ${enableIAP}`);
            return;
        }

        ReactNativeFlurry.setIAPReportingEnabled(enableIAP);
    }

    static setDataSaleOptOut(isOptOut = false) {
        if (typeof isOptOut !== 'boolean') {
            console.error(`Flurry.setDataSaleOptOut: isOptOut must be one of [true, false]. Got ${isOptOut}`);
            return;
        }

        ReactNativeFlurry.setDataSaleOptOut(isOptOut);
    }

    static deleteData() {
        ReactNativeFlurry.deleteData();
    }

    /**
     * There are 2 overloads
     * - addOrigin(originName, originVersion)
     * - addOrigin(originName, originVersion, originParameters)
     */
    static addOrigin(originName, originVersion, originParameters) {
        if (typeof originName !== 'string') {
            console.error(`Flurry.addOrigin: originName must be string. Got ${originName}`);
            return;
        }

        if (typeof originVersion !== 'string') {
            console.error(`Flurry.addOrigin: originVersion must be string. Got ${originVersion}`);
            return;
        }

        if (arguments.length === 2) {
            ReactNativeFlurry.addOrigin(originName, originVersion);
        } else if (arguments.length === 3) {
            ReactNativeFlurry.addOriginParams(originName, originVersion, originParameters);
        }
    }

    static addSessionProperty(name, value) {
        if (typeof name !== 'string') {
            console.error(`Flurry.addSessionProperty: name must be string. Got ${name}`);
            return;
        }

        if (typeof value !== 'string') {
            console.error(`Flurry.addSessionProperty: value must be string. Got ${value}`);
            return;
        }

        ReactNativeFlurry.addSessionProperty(name, value);
    }

    static getVersions(errorCallback, successCallback) {
        if (arguments.length === 0) {
            return ReactNativeFlurry.getVersionsPromise();
        }
        ReactNativeFlurry.getVersions(errorCallback, successCallback);
    }

    static logBreadcrumb(crashBreadcrumb) {
        if (typeof crashBreadcrumb !== 'string') {
            console.error(`Flurry.logBreadcrumb: crashBreadcrumb must be a string. Got ${crashBreadcrumb}`);
            return;
        }

        ReactNativeFlurry.logBreadcrumb(crashBreadcrumb);
    }

    /**
     * There are four overloads
     * - logEvent(eventId)
     * - logEvent(eventId, timed)
     * - logEvent(eventId, parameters)
     * - logEvent(eventId, parameters, timed)
     */
    static logEvent(eventId, timedOrParameters, timed) {
        if (typeof eventId !== 'string') {
            console.error(`Flurry.logEvent: eventId must be a string. Got ${eventId}`);
            return;
        }

        if (arguments.length === 1) {
            ReactNativeFlurry.logEvent(eventId);
        } else if (arguments.length === 2) {
            if (typeof arguments[1] === 'boolean') {
                ReactNativeFlurry.logEventTimed(eventId, arguments[1]);
            } else if (Object.prototype.toString.call(arguments[1]).includes('Object')) {
                ReactNativeFlurry.logEventParams(eventId, arguments[1]);
            }
        } else if (arguments.length === 3) {
            ReactNativeFlurry.logEventParamsTimed(eventId, timedOrParameters, timed);
        }
    }

    static logPayment(productName, productId, quantity, price, currency, transactionId, parameters) {
        if (typeof productName !== 'string') {
            console.error(`Flurry.logPayment: productName must be a string. Got ${productName}`);
            return;
        }

        if (typeof productId !== 'string') {
            console.error(`Flurry.logPayment: productId must be a string. Got ${productId}`);
            return;
        }

        if (typeof quantity !== 'number') {
            console.error(`Flurry.logPayment: quantity must be a number. Got ${quantity}`);
            return;
        }

        if (typeof price !== 'number') {
            console.error(`Flurry.logPayment: price must be a number. Got ${price}`);
            return;
        }

        if (typeof currency !== 'string') {
            console.error(`Flurry.logPayment: currency must be a string. Got ${currency}`);
            return;
        }

        if (typeof transactionId !== 'string') {
            console.error(`Flurry.logPayment: transactionId must be a string. Got ${transactionId}`);
            return;
        }

        ReactNativeFlurry.logPayment(productName, productId, quantity, price, currency, transactionId, parameters);
    }

    /**
     * There are two overloads
     * - endTimedEvent(eventId)
     * - endTimedEvent(eventId, parameters)
     */
    static endTimedEvent(eventId, parameters) {
        if (typeof eventId !== 'string') {
            console.error(`Flurry.logEvent: endTimedEvent must be a string. Got ${eventId}`);
            return;
        }

        if (arguments.length === 1) {
            ReactNativeFlurry.endTimedEvent(eventId);
        } else if (arguments.length === 2) {
            ReactNativeFlurry.endTimedEventParams(eventId, parameters);
        }
    }

    /**
     * There are two overloads
     * - onError(errorId, message, errorClass)
     * - onError(errorId, message, errorClass, errorParams)
     */
    static onError(errorId, message, errorClass, errorParams) {
        if (typeof errorId !== 'string') {
            console.error(`Flurry.onError: errorId must be a string. Got ${errorId}`);
            return;
        }

        if (typeof message !== 'string') {
            console.error(`Flurry.onError: message must be a string. Got ${message}`);
            return;
        }

        if (typeof errorClass !== 'string') {
            console.error(`Flurry.onError: errorClass must be a string. Got ${errorClass}`);
            return;
        }

        if (arguments.length === 3) {
            ReactNativeFlurry.onError(errorId, message, errorClass);
        } else if (arguments.length === 4) {
            ReactNativeFlurry.onErrorParams(errorId, message, errorClass, errorParams);
        }
    }

    static onPageView() {
        console.warn(`Flurry.onPageView method is deprecated. API removed, no longer supported by Flurry.`);

        ReactNativeFlurry.onPageView();
    }

    static addConfigListener(callback) {
        if (typeof callback !== 'function') {
            console.error(`Flurry.addConfigListener: callback must be a function. Got ${callback}`);
            return;
        }

        var Emitter = (Platform.OS === 'android') ? DeviceEventEmitter : NativeAppEventEmitter;
        Emitter.addListener('FlurryConfigEvent', callback);

        ReactNativeFlurry.registerConfigListener();
    }

    static removeConfigListener(callback) {
        if (typeof callback !== 'function') {
            console.error(`Flurry.removeConfigListener: callback must be a function. Got ${callback}`);
            return;
        }

        var Emitter = (Platform.OS === 'android') ? DeviceEventEmitter : NativeAppEventEmitter;
        Emitter.removeListener('FlurryConfigEvent', callback);

        ReactNativeFlurry.unregisterConfigListener();
    }

    static fetchConfig() {
        ReactNativeFlurry.fetchConfig();
    }

    static activateConfig() {
        ReactNativeFlurry.activateConfig();
    }

    static getConfigString(keyOrDefaults, defaultValue) {
        if (arguments.length === 1) {
            return ReactNativeFlurry.getConfigStringMap(keyOrDefaults);
        } else if (arguments.length === 2) {
            if (typeof keyOrDefaults !== 'string') {
                console.error(`Flurry.getConfigString: key must be a string. Got ${keyOrDefaults}`);
                return;
            }

            if (typeof defaultValue !== 'string') {
                console.error(`Flurry.getConfigString: defaultValue must be a string. Got ${defaultValue}`);
                return;
            }

            return ReactNativeFlurry.getConfigString(keyOrDefaults, defaultValue);
        }
    }

    static addMessagingListener(callback) {
        if (typeof callback !== 'function') {
            console.error(`Flurry.addMessagingListener: callback must be a function. Got ${callback}`);
            return;
        }

        var Emitter = (Platform.OS === 'android') ? DeviceEventEmitter : NativeAppEventEmitter;
        Emitter.addListener('FlurryMessagingEvent', callback);

        ReactNativeFlurry.enableMessagingListener(true);
    }

    static removeMessagingListener(callback) {
        if (typeof callback !== 'function') {
            console.error(`Flurry.removeMessagingListener: callback must be a function. Got ${callback}`);
            return;
        }

        var Emitter = (Platform.OS === 'android') ? DeviceEventEmitter : NativeAppEventEmitter;
        Emitter.removeListener('FlurryMessagingEvent', callback);
    }

    static willHandleMessage(handled) {
        ReactNativeFlurry.willHandleMessage(handled);
    }

    static printMessage(message) {
        if (message.Type === Flurry.MessageType.REFRESH) {
            console.log('Flurry Messaging Type: ' + message.Type +
                    '\n    Token: ' + message.Token);
            return;
        }

        var data = '';
        for (var prop in message.Data) {
            data += '\n\t' + prop + ': ' + message.Data[prop];
        }
        console.log('Flurry Messaging Type: ' + message.Type +
            '\n    Title: ' + message.Title +
            '\n    Body: ' + message.Body +
            '\n    ClickAction: ' + message.ClickAction +
            '\n    Data:' + data);
    }

}

