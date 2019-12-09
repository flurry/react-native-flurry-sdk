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
         * Constants for setting log level in Flurry Analytics.
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
         * Constants for setting gender in Flurry Analytics.
         */
        static Gender: {
            MALE:   string,
            FEMALE: string
        }

        /**
         * Constants for message types in Flurry Push.
         */
        static MessageType: {
            RECEIVED:  string,
            CLICKED:   string,
            CANCELLED: string,
            REFRESH:   string
        }

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
         * This api allows you to set opt-out/opt-in for data sale
         *
         * e.g. Flurry.setDataSaleOptOut(true);
         *
         * @param isOptOut true to opt-out data sale, false to opt-in
         */
        static setDataSaleOptOut(isOptOut?: boolean): void;

        /**
         * This api allows you to delete data collected by Flurry
         *
         * e.g. Flurry.deleteData();
         */
        static deleteData(): void;

        /**
         * Add origin attribution.
         * 
         * There are two overloads,
         * e.g., Flurry.addOrigin('name', 'version');
         *       Flurry.addOrigin('name', 'version'), {param: 'true'});
         * - addOrigin(originName, originVersion)
         * - addOrigin(originName, originVersion, originParameters)
         * 
         * @param originName    The name/id of the origin you wish to attribute.
         * @param originVersion The version of the origin you wish to attribute.
         */
        static addOrigin(originName: string, originVersion: string, originParameters?: { [key: string]: string; }): void;

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
         * e.g., 3 ways to call
         *
         * Flurry.getVersions(
         *     (msg) => {
         *         console.error(msg);
         *     },
         *     (agentVersion, releaseVersion, sessionId) => {
         *         console.log('Versions: ' + agentVersion + ' : ' + releaseVersion + ' : ' + sessionId);
         *     }
         * );
         *
         * OR
         *
         * (async () => {
         *     var versions = await Flurry.getVersions();
         *     console.log('Versions: ' + versions.agentVersion + ' : ' + versions.releaseVersion + ' : ' + versions.sessionId);
         * })();
         *
         * OR
         *
         * Flurry.getVersions().then(
         *     (versions) => {
         *         console.log('Versions: ' + versions.agentVersion + ' : ' + versions.releaseVersion + ' : ' + versions.sessionId);
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
        static getVersions(errorCallback?: (errorMessage: string) => void,
                           successCallback?: (agentVersion: number, releaseVersion: string, sessionId: string) => void):
                           Promise<{ agentVersion: number; releaseVersion: string; sessionId: string; }>;

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
         * There are two overloads,
         * e.g., Flurry.logEvent('eventId');
         *       Flurry.logEvent('eventId', true);
         * - logEvent(eventId)
         * - logEvent(eventId, timed)
         * 
         * @param eventId       The name/id of the event.
         * @param timed         True if this event is timed, false otherwise.
         */
        static logEvent(eventId: string, timed?: boolean): void;

        /**
         * Log an event with parameters.
         * 
         * There are two overloads,
         * e.g., Flurry.logEvent('eventId', {param: 'true'});
         *       Flurry.logEvent('eventId', {param: 'true'}, true);
         * - logEvent(eventId, parameters)
         * - logEvent(eventId, parameters, timed)
         * 
         * @param eventId       The name/id of the event.
         * @param parameters    A {@code Map<String, String>} of parameters to log with this event.
         * @param timed         True if this event is timed, false otherwise.
         */
        static logEvent(eventId: string, parameters: { [key: string]: string; }, timed?: boolean): void;

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
                   currency: string, transactionId: string, parameters: { [key: string]: string; }): void;

        /**
         * End a timed event.
         * 
         * There are two overloads,
         * e.g., Flurry.endTimedEvent('eventId');
         *       Flurry.endTimedEvent('eventId', {param: 'true'});
         * - endTimedEvent(eventId)
         * - endTimedEvent(eventId, parameters)
         * 
         * @param eventId    The name/id of the event.
         * @param parameters A {@code Map<String, String>} of parameters to log with this event.
         */
        static endTimedEvent(eventId: string, parameters?: { [key: string]: string; }): void;

        /**
         * Report errors that your app catches.
         * 
         * There are two overloads,
         * e.g., Flurry.onError('errorId', 'message', 'errorClass');
         *       Flurry.onError('errorId', 'message', 'errorClass', {param: 'true'});
         * - onError(errorId, message, errorClass)
         * - onError(errorId, message, errorClass, errorParams)
         * 
         * @param errorId     Unique ID for reported error.
         * @param message     Message for the error reported.
         * @param errorClass  Class in which the error is reported.
         * @param errorParams A {@code Map<String, String>} of parameters to log with this report.
         */
        static onError(errorId: string, message: string, errorClass: string, errorParams?: { [key: string]: string; }): void;

        /**
         * Log a page view.
         * 
         * e.g. Flurry.onPageView();
         * @deprecated API removed, no longer supported by Flurry.
         */
        static onPageView(): void;

        /**
         * Register a listener for the state of fetching. Multiple listeners can be passed in and each
         * one will be called in the order they are registered.
         *
         * Event.Type: ConfigStatus.SUCCESS:   Config data is successfully loaded from server.
         *             ConfigStatus.UNCHANGED: Fetch completes but no changes from server.
         *             ConfigStatus.ERROR:     Config data is failed to load from server.
         *                                     Flurry Config will retry if failed in 10 sec., 30 sec., 3 min., then abandon.
         *                                     Event.isRetrying: true if it is still retrying fetching
         *             ConfigStatus.ACTIVATED: Config data is activated.
         *                                     Flurry Config can receive activate notification when cached data is read,
         *                                     and when newly fetched data is been activated.
         *                                     Event.isCache: true if activated from the cached data
         *
         * e.g.
         * Flurry.addConfigListener((event) => {
         *     if (event.Type === Flurry.ConfigStatus.SUCCESS) {
         *         // Data fetched, activate it.
         *         Flurry.activateConfig();
         *     } else if (event.Type === Flurry.ConfigStatus.ACTIVATED) {
         *         // Received cached data, or newly activated data.
         *         Flurry.getConfigString('welcome_message', 'Welcome!').then((value) => {
         *             console.log((event.isCache ? 'Received cached data: ' : 'Received newly activated data: ') + value.welcome_message);
         *         });
         *     } else if (event.Type === Flurry.ConfigStatus.UNCHANGED) {
         *         // Fetch finished, but data unchanged.
         *         Flurry.getConfigString('welcome_message', 'Welcome!').then((value) => {
         *             console.log('Received unchanged data: ' + value.welcome_message);
         *         });
         *     } else if (event.Type === Flurry.ConfigStatus.ERROR) {
         *         // Fetch failed.
         *         console.log('Fetch error! Retrying: ' + event.isRetrying);
         *     }
         * });
         * 
         * Flurry.fetchConfig();
         *
         * @param callback Callback listener to be registered.
         */
        static addConfigListener(
            callback: (event: { Type: string; isCache?: boolean; isRetrying?: boolean; }) => void): void;

        /**
         * Unregister a callback listener
         *
         * @param callback Callback listener to be removed.
         */
        static removeConfigListener(
            callback: (event: { Type: string; isCache?: boolean; isRetrying?: boolean; }) => void): void;

        /**
         * Fetch Config will trigger an async call to the server. Server has a throttle where when
         * the user calls fetchConfig many times in a row, it will basically do a no-op.
         * If we do go out to server, once we return we should store this value onto disk,
         * to be picked up during initialization the next time around.
         */
        static fetchConfig(): void;
    
        /**
         * Activate Config attempts to apply the most recent config.
         */
        static activateConfig(): void;
    
        /**
         * Retrieves a String value, or a Map of String values from the configuration.
         *
         * e.g.
         * Flurry.getConfigString('welcome_message', 'Welcome!').then((value) => {
         *     console.log('Received data: ' + value.welcome_message);
         * });
         *
         * @param key           The name of the configuration to retrieve.
         * @param defaultValue  Value to return if this configuration does not exist.
         * @returns The configuration value if it exists, or defaultValue.
         */
        static getConfigString(key: string, defaultValue: string):
                               Promise<{ [key: string]: string; }>;
        
        /**
         * Retrieves a Map of String values from the configuration.
         * 
         * e.g.
         * let keysAndDefaults = {
         *         welcome_message:    'Welcome!',
         *         welcome_font_size:  '12',
         *         welcome_font_color: '#990066'
         *     };
         * 
         * Flurry.getConfigString(keysAndDefaults).then((value) => {
         *     console.log('Received map of data: ' +
         *                 value.welcome_message + ":" + value.welcome_font_size + ":" + value.welcome_font_color);
         * });
         * 
         * @param keysAndDefaults A Map of names and the default values.
         * @returns Map of configuration values if exist, or default values.
         */
        static getConfigString(keysAndDefaults: { [key: string]: string; }): 
                               Promise<{ [key: string]: string; }>;

        /**
         * Add a listener to receive messaging events, and handle the notification.
         * Message.Type: RECEIVED:  a notification has been received.
         *               CLICKED:   a notification has been clicked.
         *               CANCELLED: a notification has been cancelled. (Android only)
         *               REFRESH: push notification token has been changed. (Android only)
         * Message.Title:       message title
         * Message.Body:        message body
         * Message.Data:        message data (Map)
         * Message.ClickAction: click action (Android only)
         * Message.Token:       refreshed token
         *
         * Please call required Flurry.willHandleMessage(boolean) when received event types of
         * MessageType.RECEIVED or MessageType.CLICKED as soon as possible to avoid delay.
         * (Android only) If you would like to handle the notification yourself, return true to notify Flurry
         * you've handled it, and Flurry will not show the notification (MessageType.RECEIVED),
         * or Flurry will not launch the app or 'click_action' activity (MessageType.CLICKED).
         *
         * e.g.
         * Flurry.addMessagingListener((message) => {
         *     if (message.Type === Flurry.MessageType.RECEIVED) {
         *         Flurry.willHandleMessage(false);
         *     } else if (message.Type === Flurry.MessageType.CLICKED) {
         *         Flurry.willHandleMessage(false);
         *     }
         *
         *     Flurry.printMessage(message);
         * });
         *
         * @param callback messaging event callback.
         */
        static addMessagingListener(callback: (message: { Type: string;
                    Title?: string; Body?: string; Data?: { [key: string]: string; }; ClickAction?: string;
                    Token?: string; }) => void): void;

        /**
         * Remove a messaging events listener.
         *
         * @param callback messaging event callback.
         */
        static removeMessagingListener(callback: (message: { Type: string;
                    Title?: string; Body?: string; Data?: { [key: string]: string; }; ClickAction?: string;
                    Token?: string; }) => void): void;

        /**
         * If you would like to handle the notification yourself, return true to notify Flurry
         * you've handled it, and Flurry will not show the notification (MessageType.RECEIVED),
         * or Flurry will not launch the app or 'click_action' activity (MessageType.CLICKED).
         *
         * Required: Even it is supported by Android only, it is required to notify Flurry
         *           when received event types of MessageType.RECEIVED or MessageType.CLICKED.
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
        static printMessage(message: { Type: string;
                    Title?: string; Body?: string; Data?: { [key: string]: string; }; ClickAction?: string;
                    Token?: string; }): void;

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
             * e.g., build('FLURRY_API_KEY');
             *       build('FLURRY_ANDROID_API_KEY', 'FLURRY_IOS_API_KEY');
             * - build(apikey)
             * - build(apikeyAndroid, apikeyIos)
             * 
             * @param apiKey1 Android User API Key.
             * @param apiKey2 iOS User API Key.
             */
            build(apiKey1: string, apiKey2?: string): void;

            /**
             * Set the version name of the app.
             * 
             * @param versionName The version of the app.
             */
            withAppVersion(versionName?: string): Flurry.Builder;

            /**
             * True to enable or false to disable the ability to catch all uncaught exceptions
             * and have them reported back to Flurry.
             * 
             * @param crashReporting true to enable, false to disable.
             */
            withCrashReporting(crashReporting?: boolean): Flurry.Builder;
    
            /**
             * Set the timeout for expiring a Flurry session.
             * 
             * @param sessionMillis The time in milliseconds to set the session timeout to. Minimum value of 5000.
             */
            withContinueSessionMillis(sessionMillis?: number): Flurry.Builder;

            /**
             * True to opt-out data sale or false to opt-in data sale
             *
             * @param isOptOut true to opt-out data sale, false to opt-in
             */
            withDataSaleOptOut(isOptOut?: boolean): Flurry.Builder;

            /**
             * Set the iOS In-App Purchase reporting enabled.
             * 
             * @param enableIAP True to enable iOS In-App Purchase reporting, false otherwise.
             */
            withIAPReportingEnabled(enableIAP?: boolean): Flurry.Builder;
    
            /**
             * True if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
             * 
             * @param includeBackgroundSessionsInMetrics if background and inactive session should be counted toward dau
             */
            withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): Flurry.Builder;
    
            /**
             * True to enable or false to disable the internal logging for the Flurry SDK.
             * 
             * @param enableLog true to enable logging, false to disable it.
             */
            withLogEnabled(enableLog?: boolean): Flurry.Builder;
    
            /**
             * Set the log level of the internal Flurry SDK logging.
             * 
             * @param logLevel The level to set it to { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }.
             */
            withLogLevel(logLevel?: number): Flurry.Builder;
    
            /**
             * True to enable or false to disable the Flurry Push for messaging.
             * 
             * @param enableMessaging true to enable messaging, false to disable it.
             */
            withMessaging(enableMessaging?: boolean): Flurry.Builder;

            /**
             * Set the minimum duration (in minutes) before a partial session report is sent to Flurry. The acceptable values are between 5 and 60 minutes. tvOS only.
             * 
             * @param interval The period after which a partial session report is sent to Flurry.
             */
            withTVSessionReportingInterval(interval?: number): Flurry.Builder;

            /**
             * Sets the minimum number of events before a partial session report is sent to Flurry. The acceptable values are between 5 and 50. tvOS only.
             * 
             * @param threshold The number of events after which partial session report is sent to Flurry.
             */
            withTVEventCountThreshold(threshold?: number): Flurry.Builder;
        }
    }

    export default Flurry;
}
