import {
    DeviceEventEmitter,
    NativeAppEventEmitter,
    NativeModules,
    Platform,
 } from 'react-native';

const { ReactNativeFlurry } = NativeModules;

let initFlurryCalled = false;

function priorInit(wrapped) {
    console.warn(`Flurry.${arguments.callee.caller.name} method is deprecated, please use Flurry.Builder instead.`);
    return function() {
        if (initFlurryCalled) {
            console.error(`Flurry.${arguments.callee.caller.name} method must be called prior to invoking "init"`);
            return;
        }
        wrapped.apply(this, arguments);
    }
}

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

        withCrashReporting(crashReporting = true) {
            ReactNativeFlurry.withCrashReporting(crashReporting);
            return this;
        }

        withContinueSessionMillis(sessionMillis = 10000) {
            if (sessionMillis < 5000) {
                console.error('Flurry.Builder.withContinueSessionMillis: the minimum timeout for a session is 5,000 ms.');
            }
            ReactNativeFlurry.withContinueSessionMillis(sessionMillis);
            return this;
        }

        withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true) {
            ReactNativeFlurry.withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics);
            return this;
        }

        withLogEnabled(enableLog = true) {
            ReactNativeFlurry.withLogEnabled(enableLog);
            return this;
        }

        withLogLevel(logLevel = LogLevel.WARN) {
            ReactNativeFlurry.withLogLevel(logLevel);
            return this;
        }

        withMessaging(enableMessaging = true) {
            ReactNativeFlurry.withMessaging(enableMessaging);
            return this;
        }
    };

    /**
     * @deprecated Please use Flurry.Builder instead.
     */
    static init(...apiKeys) {
        console.warn(`Flurry.init method is deprecated, please use Flurry.Builder instead.`);
        if (initFlurryCalled) {
            console.error('Flurry.init: already called');
            return;
        }

        if (apiKeys.length === 0) {
            console.error('Flurry.init: apiKey(string) is required');
            return;
        } else if (apiKeys.length === 1) {
            if (typeof apiKeys[0] !== 'string') {
                console.error('Flurry.init: apiKey1(string) is required');
                return;
            }
            ReactNativeFlurry.build(apiKeys[0]);
        } else if (apiKeys.length === 2) {
            if (Platform.OS === 'android') {
                if (typeof apiKeys[0] !== 'string') {
                    console.error('Flurry.init: apiKey1(string) is required');
                    return;
                }
                ReactNativeFlurry.build(apiKeys[0]);
            } else if (Platform.OS === 'ios') {
                if (typeof apiKeys[1] !== 'string') {
                    console.error('Flurry.init: apiKey2(string) is required');
                    return;
                }
                ReactNativeFlurry.build(apiKeys[1]);
            }
        }

        initFlurryCalled = true;
    }

    /**
     * @deprecated Please use Flurry.Builder instead.
     */
    static withCrashReporting(crashReporting = true) {
        priorInit(ReactNativeFlurry.withCrashReporting)(crashReporting);
    }

    /**
     * @deprecated Please use Flurry.Builder instead.
     */
    static withContinueSessionMillis(sessionMillis = 10000) {
        if (sessionMillis < 5000) {
            console.error('Flurry.withContinueSessionMillis: the minimum timeout for a session is 5,000 ms.');
        }

        priorInit(ReactNativeFlurry.withContinueSessionMillis)(sessionMillis);
    }

    /**
     * @deprecated Please use Flurry.Builder instead.
     */
    static withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true) {
        priorInit(ReactNativeFlurry.withIncludeBackgroundSessionsInMetrics)(includeBackgroundSessionsInMetrics);
    }

    /**
     * @deprecated Please use Flurry.Builder instead.
     */
    static withLogEnabled(enableLog = true) {
        priorInit(ReactNativeFlurry.withLogEnabled)(enableLog);
    }

    /**
     * @deprecated Please use Flurry.Builder instead.
     */
    static withLogLevel(logLevel = LogLevel.WARN) {
        priorInit(ReactNativeFlurry.withLogLevel)(logLevel);
    }

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
    static logEvent(eventId, parameters, timed) {
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
            ReactNativeFlurry.logEventParamsTimed(eventId, parameters, timed);
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
        ReactNativeFlurry.onPageView();
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
        if (message.hasOwnProperty('Token')) {
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

