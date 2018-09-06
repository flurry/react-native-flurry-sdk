import {
    NativeModules,
 } from 'react-native';

const { ReactNativeFlurry } = NativeModules;

let initFlurryCalled = false;

function priorInit(wrapped) {
    return function() {
        if (initFlurryCalled) {
            console.error(`Flurry.${arguments.callee.caller.name} method must be called prior to invoking "init"`);
            return;
        }
        wrapped.apply(this, arguments);
    }
}

export default class Flurry {
    static init(apiKey) {
        if (initFlurryCalled) {
            console.error('Flurry.init: already called');
            return;
        }

        if (!apiKey) {
            console.error('Flurry.init: apiKey(string) is required');
            return;
        }

        ReactNativeFlurry.init(apiKey);

        initFlurryCalled = true;
    }

    static withCrashReporting(crashReporting = true) {
        priorInit(ReactNativeFlurry.withCrashReporting)(crashReporting);
    }

    static withContinueSessionMillis(sessionMillis = 10000) {
        if (sessionMillis < 5000) {
            console.error('Flurry.withContinueSessionMillis: the minimum timeout for a session is 5,000 ms.');
        }

        priorInit(ReactNativeFlurry.withContinueSessionMillis)(sessionMillis);
    }

    static withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics = true) {
        priorInit(ReactNativeFlurry.withIncludeBackgroundSessionsInMetrics)(includeBackgroundSessionsInMetrics);
    }

    static withLogEnabled(enableLog = true) {
        priorInit(ReactNativeFlurry.withLogEnabled)(enableLog);
    }

    static withLogLevel(logLevel = 5) {
        priorInit(ReactNativeFlurry.withLogLevel)(logLevel);
    }

    static setAge(age) {
        if (!age || typeof age !== 'number' || age <= 0 || age >= 110) {
            console.error(`Flurry.setAge: age must be a valid positive number between 0 and 110. Got ${age}`);
            return;
        }

        ReactNativeFlurry.setAge(age);
    }

    static setGender(gender) {
        if (!gender || typeof gender !== 'string' || !['m', 'f'].includes(gender)) {
            console.error(`Flurry.setGender: gender must be one of ['m', 'f']. Got ${gender}`);
            return;
        }

        ReactNativeFlurry.setGender(gender);
    }

    static setReportLocation(reportLocation) {
        if (!reportLocation || typeof reportLocation !== 'boolean') {
            console.error(`Flurry.setReportLocation: reportLocation must be one of [true, false]. Got ${reportLocation}`);
            return;
        }

        ReactNativeFlurry.setReportLocation(reportLocation);
    }

    static setSessionOrigin(originName, deepLink) {
        if (!originName || typeof originName !== 'string') {
            console.error(`Flurry.setSessionOrigin: originName must be string. Got ${originName}`);
            return;
        }

        if (!deepLink || typeof deepLink !== 'string') {
            console.error(`Flurry.setSessionOrigin: deepLink must be string. Got ${deepLink}`);
            return;
        }

        ReactNativeFlurry.setSessionOrigin(originName, deepLink);
    }

    static setUserId(userId) {
        if (!userId || typeof userId !== 'string') {
            console.error(`Flurry.setUserId: userId must be a string. Got ${userId}`);
            return;
        }

        ReactNativeFlurry.setUserId(userId);
    }

    static setVersionName(versionName = '1.0') {
        if (!versionName || typeof versionName !== 'string') {
            console.error(`Flurry.setVersionName: versionName must be a string. Got ${versionName}`);
            return;
        }

        ReactNativeFlurry.setVersionName(versionName);
    }

    static setIAPReportingEnabled(enableIAP = true) {
        if (!enableIAP || typeof enableIAP !== 'boolean') {
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
        if (!originName || typeof originName !== 'string') {
            console.error(`Flurry.addOrigin: originName must be string. Got ${originName}`);
            return;
        }

        if (!originVersion || typeof originVersion !== 'string') {
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
        if (!name || typeof name !== 'string') {
            console.error(`Flurry.addSessionProperty: name must be string. Got ${name}`);
            return;
        }

        if (!value || typeof value !== 'string') {
            console.error(`Flurry.addSessionProperty: value must be string. Got ${value}`);
            return;
        }

        ReactNativeFlurry.addSessionProperty(name, value);
    }

    static getVersions(errorCallback, successCallback) {
        ReactNativeFlurry.getVersions(errorCallback, successCallback);
    }

    static logBreadcrumb(crashBreadcrumb) {
        if (!crashBreadcrumb || typeof crashBreadcrumb !== 'string') {
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
        if (!eventId || typeof eventId !== 'string') {
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
        if (!productName || typeof productName !== 'string') {
            console.error(`Flurry.logPayment: productName must be a string. Got ${productName}`);
            return;
        }

        if (!productId || typeof productId !== 'string') {
            console.error(`Flurry.logPayment: productId must be a string. Got ${productId}`);
            return;
        }

        if (!quantity || typeof quantity !== 'number') {
            console.error(`Flurry.logPayment: quantity must be a number. Got ${quantity}`);
            return;
        }

        if (!price || typeof price !== 'number') {
            console.error(`Flurry.logPayment: price must be a number. Got ${price}`);
            return;
        }

        if (!currency || typeof currency !== 'string') {
            console.error(`Flurry.logPayment: currency must be a string. Got ${currency}`);
            return;
        }

        if (!transactionId || typeof transactionId !== 'string') {
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
        if (!eventId || typeof eventId !== 'string') {
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
        if (!errorId || typeof errorId !== 'string') {
            console.error(`Flurry.onError: errorId must be a string. Got ${errorId}`);
            return;
        }

        if (!message || typeof message !== 'string') {
            console.error(`Flurry.onError: message must be a string. Got ${message}`);
            return;
        }

        if (!errorClass || typeof errorClass !== 'string') {
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

}
