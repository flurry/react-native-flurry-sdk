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

    static SKAdNetworkEvent = Object.freeze({
        NO_EVENT:        0,
        REGISTRATION:    1,
        LOGIN:           2,
        SUBSCRIPTION:    3,
        IN_APP_PURCHASE: 4
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
                    console.error(`Flurry.Builder.withAppVersion: versionName must be string. Got ${versionName}`);
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
            if (typeof logLevel !== 'number') {
                console.error(`Flurry.Builder.withLogLevel: logLevel must be number. Got ${logLevel}`);
                return this;
            }

            ReactNativeFlurry.withLogLevel(logLevel);
            return this;
        }

        withPerformanceMetrics(performanceMetrics = Flurry.PerformanceMetrics.ALL) {
            if (Platform.OS === 'android') {
                if (typeof performanceMetrics !== 'number') {
                    console.error(`Flurry.Builder.withPerformanceMetrics: performanceMetrics must be number. Got ${performanceMetrics}`);
                    return this;
                }

                ReactNativeFlurry.withPerformanceMetrics(performanceMetrics);
            }
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
                if (typeof interval !== 'number') {
                    console.error(`Flurry.Builder.withTVSessionReportingInterval: interval must be number. Got ${interval}`);
                    return this;
                }

                ReactNativeFlurry.withTVSessionReportingInterval(interval);
            }
            return this;
        }

        withTVEventCountThreshold(threshold = 10) {
            if (Platform.OS === 'ios' && Platform.isTVOS) {
                if (typeof threshold !== 'number') {
                    console.error(`Flurry.Builder.withTVEventCountThreshold: threshold must be number. Got ${threshold}`);
                    return this;
                }

                ReactNativeFlurry.withTVEventCountThreshold(threshold);
            }
            return this;
        }
    };

    static Event = Object.freeze({
        AD_CLICK:                 0,
        AD_IMPRESSION:            1,
        AD_REWARDED:              2,
        AD_SKIPPED:               3,
        CREDITS_SPENT:            4,
        CREDITS_PURCHASED:        5,
        CREDITS_EARNED:           6,
        ACHIEVEMENT_UNLOCKED:     7,
        LEVEL_COMPLETED:          8,
        LEVEL_FAILED:             9,
        LEVEL_UP:                 10,
        LEVEL_STARTED:            11,
        LEVEL_SKIP:               12,
        SCORE_POSTED:             13,
        CONTENT_RATED:            14,
        CONTENT_VIEWED:           15,
        CONTENT_SAVED:            16,
        PRODUCT_CUSTOMIZED:       17,
        APP_ACTIVATED:            18,
        APPLICATION_SUBMITTED:    19,
        ADD_ITEM_TO_CART:         20,
        ADD_ITEM_TO_WISH_LIST:    21,
        COMPLETED_CHECKOUT:       22,
        PAYMENT_INFO_ADDED:       23,
        ITEM_VIEWED:              24,
        ITEM_LIST_VIEWED:         25,
        PURCHASED:                26,
        PURCHASE_REFUNDED:        27,
        REMOVE_ITEM_FROM_CART:    28,
        CHECKOUT_INITIATED:       29,
        FUNDS_DONATED:            30,
        USER_SCHEDULED:           31,
        OFFER_PRESENTED:          32,
        SUBSCRIPTION_STARTED:     33,
        SUBSCRIPTION_ENDED:       34,
        GROUP_JOINED:             35,
        GROUP_LEFT:               36,
        TUTORIAL_STARTED:         37,
        TUTORIAL_COMPLETED:       38,
        TUTORIAL_STEP_COMPLETED:  39,
        TUTORIAL_SKIPPED:         40,
        LOGIN:                    41,
        LOGOUT:                   42,
        USER_REGISTERED:          43,
        SEARCH_RESULT_VIEWED:     44,
        KEYWORD_SEARCHED:         45,
        LOCATION_SEARCHED:        46,
        INVITE:                   47,
        SHARE:                    48,
        LIKE:                     49,
        COMMENT:                  50,
        MEDIA_CAPTURED:           51,
        MEDIA_STARTED:            52,
        MEDIA_STOPPED:            53,
        MEDIA_PAUSED:             54,
        PRIVACY_PROMPT_DISPLAYED: 55,
        PRIVACY_OPT_IN:           56,
        PRIVACY_OPT_OUT:          57,

        _LAST:                    57
    });

    static EventParam = Object.freeze({
        AD_TYPE:                'fl.ad.type',
        LEVEL_NAME:             'fl.level.name',
        LEVEL_NUMBER:           'fl.level.number',
        CONTENT_NAME:           'fl.content.name',
        CONTENT_TYPE:           'fl.content.type',
        CONTENT_ID:             'fl.content.id',
        CREDIT_NAME:            'fl.credit.name',
        CREDIT_TYPE:            'fl.credit.type',
        CREDIT_ID:              'fl.credit.id',
        IS_CURRENCY_SOFT:       'fl.is.currency.soft',
        CURRENCY_TYPE:          'fl.currency.type',
        PAYMENT_TYPE:           'fl.payment.type',
        ITEM_NAME:              'fl.item.name',
        ITEM_TYPE:              'fl.item.type',
        ITEM_ID:                'fl.item.id',
        ITEM_COUNT:             'fl.item.count',
        ITEM_CATEGORY:          'fl.item.category',
        ITEM_LIST_TYPE:         'fl.item.list.type',
        PRICE:                  'fl.price',
        TOTAL_AMOUNT:           'fl.total.amount',
        ACHIEVEMENT_ID:         'fl.achievement.id',
        SCORE:                  'fl.score',
        RATING:                 'fl.rating',
        TRANSACTION_ID:         'fl.transaction.id',
        SUCCESS:                'fl.success',
        IS_ANNUAL_SUBSCRIPTION: 'fl.is.annual.subscription',
        SUBSCRIPTION_COUNTRY:   'fl.subscription.country',
        TRIAL_DAYS:             'fl.trial.days',
        PREDICTED_LTV:          'fl.predicted.ltv',
        GROUP_NAME:             'fl.group.name',
        TUTORIAL_NAME:          'fl.tutorial.name',
        STEP_NUMBER:            'fl.step.number',
        USER_ID:                'fl.user.id',
        METHOD:                 'fl.method',
        QUERY:                  'fl.query',
        SEARCH_TYPE:            'fl.search.type',
        SOCIAL_CONTENT_NAME:    'fl.social.content.name',
        SOCIAL_CONTENT_ID:      'fl.social.content.id',
        LIKE_TYPE:              'fl.like.type',
        MEDIA_NAME:             'fl.media.name',
        MEDIA_TYPE:             'fl.media.type',
        MEDIA_ID:               'fl.media.id',
        DURATION:               'fl.duration'
    });

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

    static Performance = Object.freeze({
	    NONE:        0,
	    COLD_START:  1,
	    SCREEN_TIME: 2,
	    ALL:         3, // 1 | 2

        reportFullyDrawn() {
            if (Platform.OS === 'android') {
                ReactNativeFlurry.reportFullyDrawn();
            }
        },

        startResourceLogger() {
            if (Platform.OS === 'android') {
                ReactNativeFlurry.startPerformanceResourceLogger();
            }
        },

        logResourceLogger(id) {
            if (Platform.OS === 'android') {
                if (typeof id !== 'string') {
                    console.error(`Flurry.Performance.logResourceLogger: id must be string. Got ${id}`);
                    return;
                }

                ReactNativeFlurry.logPerformanceResourceLogger(id);
            }
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

    static openPrivacyDashboard() {
        ReactNativeFlurry.openPrivacyDashboard();
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
            if (Object.prototype.toString.call(originParameters).includes('Object')) {
                ReactNativeFlurry.addOriginParams(originName, originVersion, originParameters);
            } else if (Object.prototype.toString.call(originParameters).includes('Map')) {
                ReactNativeFlurry.addOriginParams(originName, originVersion, Object.fromEntries(originParameters));
            }
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

    static getPublisherSegmentation(refresh) {
        if (arguments.length === 0) {
            return ReactNativeFlurry.getPublisherSegmentation(false);
        } else {
            if (typeof refresh !== 'boolean') {
                console.error(`Flurry.getPublisherSegmentation: refresh must be one of [true, false]. Got ${refresh}`);
                return ReactNativeFlurry.getPublisherSegmentation(false);
            }
            return ReactNativeFlurry.getPublisherSegmentation(refresh);
        }
    }

    static fetchPublisherSegmentation() {
        ReactNativeFlurry.fetchPublisherSegmentation();
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
            if (typeof timedOrParameters === 'boolean') {
                ReactNativeFlurry.logEventTimed(eventId, timedOrParameters);
            } else if (Object.prototype.toString.call(timedOrParameters).includes('Object')) {
                ReactNativeFlurry.logEventParams(eventId, timedOrParameters);
            } else if (Object.prototype.toString.call(timedOrParameters).includes('Map')) {
                ReactNativeFlurry.logEventParams(eventId, Object.fromEntries(timedOrParameters));
            }
        } else if (arguments.length === 3) {
            if (Object.prototype.toString.call(timedOrParameters).includes('Object')) {
                ReactNativeFlurry.logEventParamsTimed(eventId, timedOrParameters, timed);
            } else if (Object.prototype.toString.call(timedOrParameters).includes('Map')) {
                ReactNativeFlurry.logEventParamsTimed(eventId, Object.fromEntries(timedOrParameters), timed);
            }
        }
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
            if (Object.prototype.toString.call(parameters).includes('Object')) {
                ReactNativeFlurry.endTimedEventParams(eventId, parameters);
            } else if (Object.prototype.toString.call(parameters).includes('Map')) {
                ReactNativeFlurry.endTimedEventParams(eventId, Object.fromEntries(parameters));
            }
        }
    }

    static logStandardEvent(eventId, parameters) {
        if (typeof eventId !== 'number') {
            console.error(`Flurry.logStandardEvent: eventId must be a number. Got ${eventId}`);
            return;
        }
        if (eventId < 0 || eventId > Flurry.Event._LAST) {
            console.error(`Flurry.logStandardEvent: eventId is out of range. Got ${eventId}`);
            return;
        }

        if (arguments.length === 1) {
            ReactNativeFlurry.logStandardEvent(eventId, null);
        } else if (arguments.length === 2) {
            if (Object.prototype.toString.call(parameters).includes('Object')) {
                ReactNativeFlurry.logStandardEvent(eventId, parameters);
            } else if (Object.prototype.toString.call(parameters).includes('Map')) {
                ReactNativeFlurry.logStandardEvent(eventId, Object.fromEntries(parameters));
            }
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

        if (Object.prototype.toString.call(parameters).includes('Object')) {
            ReactNativeFlurry.logPayment(productName, productId, quantity, price, currency, transactionId, parameters);
        } else if (Object.prototype.toString.call(parameters).includes('Map')) {
            ReactNativeFlurry.logPayment(productName, productId, quantity, price, currency, transactionId, Object.fromEntries(parameters));
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
            if (Object.prototype.toString.call(errorParams).includes('Object')) {
                ReactNativeFlurry.onErrorParams(errorId, message, errorClass, errorParams);
            } else if (Object.prototype.toString.call(errorParams).includes('Map')) {
                ReactNativeFlurry.onErrorParams(errorId, message, errorClass, Object.fromEntries(errorParams));
            }
        }
    }

    static onPageView() {
        console.warn(`Flurry.onPageView method is deprecated. API removed, no longer supported by Flurry.`);

        ReactNativeFlurry.onPageView();
    }

    static updateConversionValue(conversionValue) {
        if (Platform.OS === 'ios') {
            if (typeof conversionValue !== 'number') {
                console.error(`Flurry.updateConversionValue: conversionValue must be a number. Got ${conversionValue}`);
                return;
            }

            ReactNativeFlurry.updateConversionValue(conversionValue);
        }
    }

    static updateConversionValueWithEvent(flurryEvent) {
        if (Platform.OS === 'ios') {
            if (typeof flurryEvent !== 'number') {
                console.error(`Flurry.updateConversionValueWithEvent: flurryEvent must be a number. Got ${flurryEvent}`);
                return;
            }

            ReactNativeFlurry.updateConversionValueWithEvent(flurryEvent);
        }
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

