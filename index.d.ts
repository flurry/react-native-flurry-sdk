declare module 'react-native-flurry-sdk' {

    /**
     * A React Native plugin for Flurry SDK.
     * The Flurry agent allows you to track the usage and behavior of your application
     * on users' devices for viewing in the Flurry Analytics system.
     * Set of methods that allow developers to capture detailed, aggregate information
     * regarding the use of their app by end users.
     */
    export class Flurry {

        /**
         * Constants for setting log level in analytics SDK.
         */ 
        static LogLevel: {
            VERBOSE: number,
            DEBUG:   number,
            INFO:    number,
            WARN:    number,
            ERROR:   number,
            ASSERT:  number
        }

        /**
         * Constants for setting gender in analytics SDK.
         */
        static Gender: {
            MALE:   string,
            FEMALE: string
        }

        /**
         * Initialize the Flurry SDK.
         * 
         * There are two overloads,
         * e.g. Flurry.init('FLURRY_API_KEY'); Flurry.init('FLURRY_ANDROID_API_KEY', 'FLURRY_IOS_API_KEY');
         * - init(apikey)
         * - init(apikeyAndroid, apikeyIos)
         * 
         * @param apiKey1 Android User API Key.
         * @param apiKey2 iOS User API Key.
         * @deprecated Please use Flurry.Builder instead.
         */
        static init(apiKey1: string, apiKey2?: string): void;

        /**
         * True to enable or false to disable the ability to catch all uncaught exceptions
         * and have them reported back to Flurry.
         * 
         * @param crashReporting true to enable, false to disable.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withCrashReporting(true);
         * @deprecated Please use Flurry.Builder instead.
         */
        static withCrashReporting(crashReporting?: boolean): void;

        /**
         * Set the timeout for expiring a Flurry session.
         * 
         * @param sessionMillis The time in milliseconds to set the session timeout to. Minimum value of 5000.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withContinueSessionMillis(6000);
         * @deprecated Please use Flurry.Builder instead.
         */
        static withContinueSessionMillis(sessionMillis?: number): void;

        /**
         * True if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
         * 
         * @param includeBackgroundSessionsInMetrics if background and inactive session should be counted toward dau
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withIncludeBackgroundSessionsInMetrics(true);
         * @deprecated Please use Flurry.Builder instead.
         */
        static withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): void;

        /**
         * True to enable or false to disable the internal logging for the Flurry SDK.
         * 
         * @param enableLog true to enable logging, false to disable it.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withLogEnabled(true);
         * @deprecated Please use Flurry.Builder instead.
         */
        static withLogEnabled(enableLog?: boolean): void;

        /**
         * Set the log level of the internal Flurry SDK logging.
         * 
         * @param logLevel The level to set it to { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withLogLevel(Flurry.LogLevel.WARN);
         * @deprecated Please use Flurry.Builder instead.
         */
        static withLogLevel(logLevel?: number): void;

        /**
         * Sets the age of the user at the time of this session.
         * 
         * e.g. Flurry.setAge(36);
         * 
         * @param age valid values are 0-110 
         */
        static setAge(age: number): void;

        /**
         * Sets the gender of the user.
         * 
         * e.g. Flurry.setGender(Flurry.Gender.FEMALE);
         * 
         * @param gender type of Flurry.Gender
         */
        static setGender(gender: string): void;

        /**
         * Set whether Flurry should record location via GPS.
         * 
         * e.g. Flurry.setReportLocation('reportLocation');
         * 
         * @param reportLocation True to allow Flurry to record location via GPS, false otherwise
         */
        static setReportLocation(reportLocation: boolean): void;

        /**
         * This method allows you to specify session origin and deep link for each session.
         * 
         * e.g. Flurry.setSessionOrigin('originName', 'deepLink');
         * 
         * @param originName Name of the origin.
         * @param deepLink   Url of the deep Link.
         */
        static setSessionOrigin(originName: string, deepLink: string): void;

        /**
         * Sets the Flurry userId for this session.
         * 
         * e.g. Flurry.setUserId(userId);
         * 
         * @param userId Unique user id for session.
         */
        static setUserId(userId: string): void;

        /**
         * Set the version name of the app.
         * 
         * e.g. Flurry.setVersionName('versionName');
         * 
         * @param versionName The version of the app.
         */
        static setVersionName(versionName?: string): void;

        /**
         * Sets the iOS In-App Purchase reporting enabled.
         * 
         * e.g. Flurry.setIAPReportingEnabled(true);
         * 
         * @param enableIAP True to enable iOS In-App Purchase reporting, false otherwise
         */
        static setIAPReportingEnabled(enableIAP?: boolean): void;

        /**
         * Add origin attribution.
         * 
         * There are two overloads,
         * e.g. Flurry.addOrigin('name', 'version'); Flurry.addOrigin('name', 'version'), {param: 'true'});
         * - addOrigin(originName, originVersion)
         * - addOrigin(originName, originVersion, originParameters)
         * 
         * @param originName    The name/id of the origin you wish to attribute.
         * @param originVersion The version of the origin you wish to attribute.
         */
        static addOrigin(originName: string, originVersion: string, originParameters?: any): void;

        /**
         * This method allows you to associate parameters with an session.
         * 
         * e.g. Flurry.addSessionProperty('name', 'value');
         * 
         * @param name  Property name.
         * @param value Property value.
         */
        static addSessionProperty(name: string, value: string): void;

        /**
         * Get the version of the Flurry SDK.
         * 
         * There are two overloads,
         * e.g. 3 ways to call
         *
         * Flurry.getVersions(
         *     (msg) => {
         *         console.error(msg);
         *     },
         *     (agentVersion, releaseVersion, sessionId) => {
         *         console.log("Versions: " + agentVersion + " : " + releaseVersion + " : " + sessionId);
         *     }
         * );
         *
         * OR
         *
         * (async () => {
         *     var versions = await Flurry.getVersions();
         *     console.log("Versions: " + versions.agentVersion + " : " + versions.releaseVersion + " : " + versions.sessionId);
         * })();
         *
         * OR
         *
         * Flurry.getVersions().then(
         *     (versions) => {
         *         console.log("Versions: " + versions.agentVersion + " : " + versions.releaseVersion + " : " + versions.sessionId);
         *     },
         *     (msg) => {
         *         console.error(msg);
         *     }
         * );
         * 
         * @param errorCallback   error callback.
         * @param successCallback success callback.
         * @return the Promise object if called without callbacks specified.
         */
        static getVersions(errorCallback?: any, successCallback?: any): Promise<{agentVersion: number, releaseVersion: string, sessionId: string}>;

        /**
         * Logs the breadcrumb.
         * 
         * e.g. Flurry.logBreadcrumb('crashBreadcrumb');
         * 
         * @param crashBreadcrumb crash breadcrumb
         */
        static logBreadcrumb(crashBreadcrumb: string): void;

        /**
         * Log an event.
         * 
         * There are four overloads,
         * e.g. Flurry.logEvent('eventId'); Flurry.logEvent('eventId', {param: 'true'}, true);
         * - logEvent(eventId)
         * - logEvent(eventId, timed)
         * - logEvent(eventId, parameters)
         * - logEvent(eventId, parameters, timed)
         * 
         * @param eventId    The name/id of the event.
         * @param parameters A {@code Map<String, String>} of parameters to log with this event.
         * @param timed      True if this event is timed, false otherwise.
         */
        static logEvent(eventId: string, parameters?: any, timed?: boolean): void;

        /**
         * Log a payment.
         * 
         * e.g. Flurry.logPayment('productName', 'productId', 6, 36, 'currency', 'transactionId', {param: 'true'});
         * 
         * @param productName   The name of the product purchased.
         * @param productId     The id of the product purchased.
         * @param quantity      The number of products purchased.
         * @param price         The price of the the products purchased in the given currency.
         * @param currency      The currency for the price argument.
         * @param transactionId A unique identifier for the transaction used to make the purchase.
         * @param parameters    A {@code Map<String, String>} of the parameters which should be submitted
         *                      with this event.
         */
        static logPayment(productName: string, productId: string, quantity: number, price: number,
                   currency: string, transactionId: string, parameters: any): void;

        /**
         * End a timed event.
         * 
         * There are two overloads,
         * e.g. Flurry.endTimedEvent('eventId'); Flurry.endTimedEvent('eventId', {param: 'true'});
         * - endTimedEvent(eventId)
         * - endTimedEvent(eventId, parameters)
         * 
         * @param eventId    The name/id of the event.
         * @param parameters A {@code Map<String, String>} of parameters to log with this event.
         */
        static endTimedEvent(eventId: string, parameters?: any): void;

        /**
         * Report errors that your app catches.
         * 
         * There are two overloads,
         * e.g. Flurry.onError('errorId', 'message', 'errorClass', {param: 'true'});
         * - onError(errorId, message, errorClass)
         * - onError(errorId, message, errorClass, errorParams)
         * 
         * @param errorId     Unique ID for reported error.
         * @param message     Message for the error reported.
         * @param errorClass  Class in which the error is reported.
         * @param errorParams A {@code Map<String, String>} of parameters to log with this report.
         */
        static onError(errorId: string, message: string, errorClass: string, errorParams?: any): void;

        /**
         * Log a page view.
         * 
         * e.g. Flurry.onPageView();
         */
        static onPageView(): void;

        /**
         * Add a listener to receive messaging events, and handle the notification.
         * Message type: 'NotificationReceived':  a notification has been received.
         *               'NotificationClicked':   a notification has been clicked.
         *               'NotificationCancelled': a notification has been cancelled. (Android only)
         *               'TokenRefresh': push notification token has been changed. (Android only)
         * Message.Title:       message title
         * Message.Body:        message body
         * Message.Data:        message data (Map)
         * Message.ClickAction: click action (Android only)
         *
         * Please call required Flurry.willHandleMessage(boolean) when received event types of
         * 'NotificationReceived' or 'NotificationClicked' as soon as possible to avoid delay.
         * (Android only) If you would like to handle the notification yourself, return true to notify Flurry
         * you've handled it, and Flurry will not show the notification ('NotificationReceived'),
         * or Flurry will not launch the app or "click_action" activity ('NotificationClicked').
         *
         * e.g.
         * Flurry.addMessagingListener((message) => {
         *     if (message.Type === 'NotificationReceived') {
         *         Flurry.willHandleMessage(false);
         *     } else if (message.Type === 'NotificationClicked') {
         *         Flurry.willHandleMessage(false);
         *     }
         *
         *     Flurry.printMessage(message);
         * });
         *
         * @param callback messaging event callback.
         */
        static addMessagingListener(callback: any):void;

        /**
         * Remove a messaging events listener.
         *
         * @param callback messaging event callback.
         */
        static removeMessagingListener(callback: any): void;

        /**
         * If you would like to handle the notification yourself, return true to notify Flurry
         * you've handled it, and Flurry will not show the notification ('NotificationReceived'),
         * or Flurry will not launch the app or "click_action" activity ('NotificationClicked').
         *
         * Required: Even it is supported by Android only, it is required to notify Flurry
         *           when received event types of 'NotificationReceived' or 'NotificationClicked'.
         *
         * e.g. Flurry.willHandleMessage(true);
         *
         * @param handled True if you've handled the notification.
         *                False if you haven't and want Flurry to handle it.
         */
        static willHandleMessage(handled: boolean): void;

        /**
         * A helper function to print the message.
         *
         * @param message the message received.
         */
        static printMessage(message: any): void;

    }

    export module Flurry {

        /**
         * Builder pattern for Flurry.
         *
         * Initialize the Flurry SDK.
         *   build(apiKey1: string, apiKey2?: string): void;
         *
         * Enable the ability to catch all uncaught exceptions and have them reported back to Flurry.
         *   withCrashReporting(crashReporting?: boolean): object;
         *
         * Set the timeout for expiring a Flurry session.
         *   withContinueSessionMillis(sessionMillis?: number): object;
         *
         * Enable if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
         *   withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): object;
         *
         * Enable the internal logging for the Flurry SDK.
         *   withLogEnabled(enableLog?: boolean): object;
         *
         * Set the log level of the internal Flurry SDK logging.
         *   withLogLevel(logLevel?: number): object;
         *
         * Enable the Flurry Push for messaging.
         *   withMessaging(enableMessaging?: boolean): object;
         */       
        class Builder {

            /**
             * Initialize the Flurry SDK.
             * 
             * There are two overloads,
             * e.g. build('FLURRY_API_KEY'); build('FLURRY_ANDROID_API_KEY', 'FLURRY_IOS_API_KEY');
             * - build(apikey)
             * - build(apikeyAndroid, apikeyIos)
             * 
             * @param apiKey1 Android User API Key.
             * @param apiKey2 iOS User API Key.
             */
            build(apiKey1: string, apiKey2?: string): void;

            /**
             * True to enable or false to disable the ability to catch all uncaught exceptions
             * and have them reported back to Flurry.
             * 
             * @param crashReporting true to enable, false to disable.
             */
            withCrashReporting(crashReporting?: boolean): object;
    
            /**
             * Set the timeout for expiring a Flurry session.
             * 
             * @param sessionMillis The time in milliseconds to set the session timeout to. Minimum value of 5000.
             */
            withContinueSessionMillis(sessionMillis?: number): object;
    
            /**
             * True if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
             * 
             * @param includeBackgroundSessionsInMetrics if background and inactive session should be counted toward dau
             */
            withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): object;
    
            /**
             * True to enable or false to disable the internal logging for the Flurry SDK.
             * 
             * @param enableLog true to enable logging, false to disable it.
             */
            withLogEnabled(enableLog?: boolean): object;
    
            /**
             * Set the log level of the internal Flurry SDK logging.
             * 
             * @param logLevel The level to set it to { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }.
             */
            withLogLevel(logLevel?: number): object;
    
            /**
             * True to enable or false to disable the Flurry Push for messaging.
             * 
             * @param enableMessaging true to enable messaging, false to disable it.
             */
            withMessaging(enableMessaging?: boolean): object;
        }
    }

    export default Flurry;
}
