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
         * Constants for logging post install events using Flurry's FlurrySKAdNetwork class.
         */
        static SKAdNetworkEvent: {
            NO_EVENT:        number,
            REGISTRATION:    number,
            LOGIN:           number,
            SUBSCRIPTION:    number,
            IN_APP_PURCHASE: number
        }

        /**
         * Constants for status in Flurry Config.
         */
        static ConfigStatus: {
            SUCCESS:   string,
            UNCHANGED: string,
            ERROR:     string,
            ACTIVATED: string
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
         * Set the timeout for expiring a Flurry session.
         * 
         * @param sessionMillis The time in milliseconds to set the session timeout to. Minimum value of 5000.
         */
         static setContinueSessionMillis(sessionMillis?: number): void;
 
         /**
         * True to enable or false to disable the ability to catch all uncaught exceptions
         * and have them reported back to Flurry.
         * 
         * @param crashReporting true to enable, false to disable.
         */
        static setCrashReporting(crashReporting?: boolean): void;

        /**
         * True if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
         * 
         * @param includeBackgroundSessionsInMetrics if background and inactive session should be counted toward dau
         */
        static setIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): void;
 
        /**
         * True to enable or false to disable the internal logging for the Flurry SDK.
         * 
         * @param enableLog true to enable logging, false to disable it.
         */
        static setLogEnabled(enableLog?: boolean): void;
 
        /**
         * Set the log level of the internal Flurry SDK logging.
         * 
         * @param logLevel The level to set it to { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }.
         */
        static setLogLevel(logLevel?: number): void;
 
        /**
         * True to enable or  false to disable SSL Pinning for Flurry Analytics connection. Defaults to false.
         *
         * Turn on to add SSL Pinning protection for the Flurry Analytics connections. Disable it
         * if your app is using proxy or any services that are not compliant with SSL Pinning.
         *
         * @param sslPinningEnabled true to enable SSL Pinning for Flurry Analytics connection, false to disable it.
         */
        static setSslPinningEnabled(sslPinningEnabled?: boolean): void;
  
        /**
         * Sets the age of the user at the time of this session.
         * 
         * ```javascript
         * e.g., Flurry.setAge(36);
         * ```
         * 
         * @param age valid values are 0-110 
         */
        static setAge(age: number): void;

        /**
         * Sets the gender of the user.
         * 
         * ```javascript
         * e.g., Flurry.setGender(Flurry.Gender.FEMALE);
         * ```
         * 
         * @param gender type of Flurry.Gender
         */
        static setGender(gender: string): void;

        /**
         * Set whether Flurry should record location via GPS.
         * 
         * ```javascript
         * e.g., Flurry.setReportLocation('reportLocation');
         * ```
         * 
         * @param reportLocation True to allow Flurry to record location via GPS, false otherwise
         */
        static setReportLocation(reportLocation: boolean): void;

        /**
         * This method allows you to specify session origin and deep link for each session.
         * 
         * ```javascript
         * e.g., Flurry.setSessionOrigin('originName', 'deepLink');
         * ```
         * 
         * @param originName Name of the origin.
         * @param deepLink   Url of the deep Link.
         */
        static setSessionOrigin(originName: string, deepLink: string): void;

        /**
         * Sets the Flurry userId for this session.
         * 
         * ```javascript
         * e.g., Flurry.setUserId(userId);
         * ```
         * 
         * @param userId Unique user id for session.
         */
        static setUserId(userId: string): void;

        /**
         * Set the version name of the app.
         * 
         * ```javascript
         * e.g., Flurry.setVersionName('versionName');
         * ```
         * 
         * @param versionName The version of the app.
         */
        static setVersionName(versionName?: string): void;

        /**
         * Sets the iOS In-App Purchase reporting enabled.
         * 
         * ```javascript
         * e.g., Flurry.setIAPReportingEnabled(true);
         * ```
         * 
         * @param enableIAP True to enable iOS In-App Purchase reporting, false otherwise
         */
        static setIAPReportingEnabled(enableIAP?: boolean): void;

        /**
         * This api allows you to set opt-out/opt-in for data sale
         *
         * ```javascript
         * e.g., Flurry.setDataSaleOptOut(true);
         * ```
         *
         * @param isOptOut true to opt-out data sale, false to opt-in
         */
        static setDataSaleOptOut(isOptOut?: boolean): void;

        /**
         * This api allows you to delete data collected by Flurry
         *
         * ```javascript
         * e.g., Flurry.deleteData();
         * ```
         */
        static deleteData(): void;

        /**
         * This api opens privacy dashboard in Chrome CustomTab
         * (if its dependency's been included in the gradle and device support it as well)
         * otherwise will open it in the external browser.
         *
         * ```javascript
         * e.g., Flurry.openPrivacyDashboard();
         * ```
         */
        static openPrivacyDashboard(): void;

        /**
         * Add origin attribution.
         * 
         * There are two overloads,
         * ```javascript
         * e.g., Flurry.addOrigin('name', 'version');
         *       Flurry.addOrigin('name', 'version'), {param: 'true'});
         * ```
         * - addOrigin(originName, originVersion)
         * - addOrigin(originName, originVersion, originParameters)
         * 
         * @param originName    The name/id of the origin you wish to attribute.
         * @param originVersion The version of the origin you wish to attribute.
         */
        static addOrigin(originName: string, originVersion: string, originParameters?: { [key: string]: string; }): void;
        static addOrigin(originName: string, originVersion: string, originParameters?: Map<string, string>       ): void;

        /**
         * This method allows you to associate parameters with an session.
         * 
         * ```javascript
         * e.g., Flurry.addSessionProperty('name', 'value');
         * ```
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
         * ```javascript
         * Flurry.getVersions(
         *     (msg) => {
         *         console.error(msg);
         *     },
         *     (agentVersion, releaseVersion, sessionId) => {
         *         console.log('Versions: ' + agentVersion + ' : ' + releaseVersion + ' : ' + sessionId);
         *     }
         * );
         * ```
         *
         * OR
         *
         * ```javascript
         * (async () => {
         *     var versions = await Flurry.getVersions();
         *     console.log('Versions: ' + versions.agentVersion + ' : ' + versions.releaseVersion + ' : ' + versions.sessionId);
         * })();
         * ```
         *
         * OR
         *
         * ```javascript
         * Flurry.getVersions().then(
         *     (versions) => {
         *         console.log('Versions: ' + versions.agentVersion + ' : ' + versions.releaseVersion + ' : ' + versions.sessionId);
         *     },
         *     (msg) => {
         *         console.error(msg);
         *     }
         * );
         * ```
         * 
         * @param errorCallback   error callback.
         * @param successCallback success callback.
         * @return the Promise object if called without callbacks specified.
         */
        static getVersions(errorCallback?: (errorMessage: string) => void,
                           successCallback?: (agentVersion: number, releaseVersion: string, sessionId: string) => void):
                           Promise<{ agentVersion: number; releaseVersion: string; sessionId: string; }>;

        /**
         * Get the Publisher Segmentation data.
         *
         * e.g., 2 ways to call
         *
         * ```javascript
         * (async () => {
         *     var segmentations = await Flurry.getPublisherSegmentation();
         *     console.log('Publisher Segmentation: ' + segmentations.segments);
         * })()
         * ```
         *
         * OR
         *
         * ```javascript
         * Flurry.getPublisherSegmentation().then(
         *     (segmentations) => {
         *         console.log('Publisher Segmentation: ' + segmentations.segments);
         *     },
         *     (msg) => {
         *         console.error(msg);
         *     }
         * );
         * ```
         *
         * @param refresh false to get cached data if available, otherwise fetch and wait.
         * @return the Promise object.
         */
        static getPublisherSegmentation(refresh?: boolean):
                                        Promise<{ [key: string]: string; }>;

        /**
         * Fetch the Publisher Segmentation.
         * 
         * ```javascript
         * e.g., Flurry.fetchPublisherSegmentation();
         * ```
         */
         static fetchPublisherSegmentation(): void;

         /**
         * Logs the breadcrumb.
         * 
         * ```javascript
         * e.g., Flurry.logBreadcrumb('crashBreadcrumb');
         * ```
         * 
         * @param crashBreadcrumb crash breadcrumb
         */
        static logBreadcrumb(crashBreadcrumb: string): void;

        /**
         * Log an event.
         * 
         * There are two overloads,
         * ```javascript
         * e.g., Flurry.logEvent('eventId');
         *       Flurry.logEvent('eventId', true);
         * ```
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
         * ```javascript
         * e.g., Flurry.logEvent('eventId', {param: 'true'});
         *       Flurry.logEvent('eventId', {param: 'true'}, true);
         * ```
         * - logEvent(eventId, parameters)
         * - logEvent(eventId, parameters, timed)
         * 
         * @param eventId       The name/id of the event.
         * @param parameters    A {@code Map<String, String>} of parameters to log with this event.
         * @param timed         True if this event is timed, false otherwise.
         */
        static logEvent(eventId: string, parameters: { [key: string]: string; }, timed?: boolean): void;
        static logEvent(eventId: string, parameters: Map<string, string>,        timed?: boolean): void;

        /**
         * Log a standard event with parameters.
         *
         * e.g.,
         * ```javascript
         * var params = new Map([
         *    [Flurry.EventParam.TOTAL_AMOUNT, 34.99],
         *    [Flurry.EventParam.SUCCESS, true],
         *    [Flurry.EventParam.ITEM_NAME, 'book 1'],
         *    ['note', 'This is an awesome book to purchase !!!']
         * ]);
         * Flurry.logStandardEvent(Flurry.Event.PURCHASED, params);
         * ```
         *
         * @param eventId       The id {@code Flurry.Event} of the event.
         * @param parameters    A {@code Map<string|Flurry.EventParam, string|number|boolean>} of parameters to log with this event.
         */
        static logStandardEvent(eventId: number, parameters?: { [key: string]: string|number|boolean; }): void;
        static logStandardEvent(eventId: number, parameters?: Map<string, string|number|boolean>       ): void;

        /**
         * Log a payment.
         * 
         * ```javascript
         * e.g., Flurry.logPayment('productName', 'productId', 6, 36, 'currency', 'transactionId', {param: 'true'});
         * ```
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
        static logPayment(productName: string, productId: string, quantity: number, price: number,
                    currency: string, transactionId: string, parameters: Map<string, string>      ): void;
 
        /**
         * End a timed event.
         * 
         * There are two overloads,
         * ```javascript
         * e.g., Flurry.endTimedEvent('eventId');
         *       Flurry.endTimedEvent('eventId', {param: 'true'});
         * ```
         * - endTimedEvent(eventId)
         * - endTimedEvent(eventId, parameters)
         * 
         * @param eventId    The name/id of the event.
         * @param parameters A {@code Map<String, String>} of parameters to log with this event.
         */
        static endTimedEvent(eventId: string, parameters?: { [key: string]: string; }): void;
        static endTimedEvent(eventId: string, parameters?: Map<string, string>       ): void;

        /**
         * Report errors that your app catches.
         * 
         * There are two overloads,
         * ```javascript
         * e.g., Flurry.onError('errorId', 'message', 'errorClass');
         *       Flurry.onError('errorId', 'message', 'errorClass', {param: 'true'});
         * ```
         * - onError(errorId, message, errorClass)
         * - onError(errorId, message, errorClass, errorParams)
         * 
         * @param errorId     Unique ID for reported error.
         * @param message     Message for the error reported.
         * @param errorClass  Class in which the error is reported.
         * @param errorParams A {@code Map<String, String>} of parameters to log with this report.
         */
        static onError(errorId: string, message: string, errorClass: string, errorParams?: { [key: string]: string; }): void;
        static onError(errorId: string, message: string, errorClass: string, errorParams?: Map<string, string>       ): void;

        /**
         * Log a page view.
         * 
         * ```javascript
         * e.g., Flurry.onPageView();
         * ```
         * @deprecated API removed, no longer supported by Flurry.
         */
        static onPageView(): void;

        /**
         * Sets the iOS conversion value sent to Apple through SKAdNetwork.
         *
         * ```javascript
         * e.g., Flurry.updateConversionValue(conversionValue);
         * ```
         *
         * @param conversionValue An integer value between 0-63. The conversion values meaning is determined by the developer.
         */
        static updateConversionValue(conversionValue: number): void;

        /**
         * Allows Flurry to set the SKAdNetwork conversion value for you.
         *   The final conversion value is a decimal number between 0-63.
         *   The conversion value is calculated from a 6 bit binary number.
         *   The first two bits represent days of user retention from 0-3 days
         *   The last four bits represent a true false state indicating if the user has completed the post install event.
         *
         * ```javascript
         * e.g., Flurry.updateConversionValueWithEvent(flurryEvent);
         * ```
         *
         * @param flurryEvent Valid events are { NO_EVENT, REGISTRATION, LOGIN, SUBSCRIPTION, IN_APP_PURCHASE }.
         */
        static updateConversionValueWithEvent(flurryEvent: number): void;

        /**
         * Constants and Methods for User Properties.
         *
         * ```javascript
         * e.g., Flurry.UserProperties.set   (Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');
         *       Flurry.UserProperties.add   (Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');
         *       Flurry.UserProperties.remove(Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');
         *       Flurry.UserProperties.flag  (Flurry.UserProperties.PROPERTY_PURCHASER);
         * ```
         */
        static UserProperties: {
            PROPERTY_CURRENCY_PREFERENCE: string,
            PROPERTY_PURCHASER:           string,
            PROPERTY_REGISTERED_USER:     string,
            PROPERTY_SUBSCRIBER:          string,

            /**
             * Exactly set, or replace if any previously exists, any state for the property.
             * null clears the property state.
             *
             * ```javascript
             * e.g., Flurry.UserProperties.set(Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');
             * ```
             * @param propertyName  property name
             * @param propertyValue single property value
             */
            set(propertyName: string, propertyValue: string): void,

            /**
             * Exactly set, or replace if any previously exists, any state for the property.
             * Empty list or null clears the property state.
             *
             * ```javascript
             * e.g., Flurry.UserProperties.set(Flurry.UserProperties.PROPERTY_CURRENCY_PREFERENCE, ['USD', 'EUR']);
             * ```
             * @param propertyName   property name
             * @param propertyValues list of property values
             */
            set(propertyName: string, propertyValue: string[]): void,

            /**
             * Extend any property, even no previous property.
             * Adding values already included in the state has no effect and does not error.
             *
             * ```javascript
             * e.g., Flurry.UserProperties.add(Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');
             * ```
             * @param propertyName  property name
             * @param propertyValue single property value
             */
            add(propertyName: string, propertyValue: string): void,

            /**
             * Extend any property, even no previous property.
             * Adding values already included in the state has no effect and does not error.
             *
             * ```javascript
             * e.g., Flurry.UserProperties.add(Flurry.UserProperties.PROPERTY_CURRENCY_PREFERENCE, ['USD', 'EUR']);
             * ```
             * @param propertyName   property name
             * @param propertyValues list of property values
             */
            add(propertyName: string, propertyValue: string[]): void,

            /**
             * Reduce any property.
             * Removing values not already included in the state has no effect and does not error
             * Called with only the property name argument will clear the property to be empty.
             *
             * ```javascript
             * e.g., Flurry.UserProperties.remove(Flurry.UserProperties.PROPERTY_REGISTERED_USER, 'True');
             *       Flurry.UserProperties.remove(Flurry.UserProperties.PROPERTY_CURRENCY_PREFERENCE);
             * ```
             * @param propertyName  roperty name
             * @param propertyValue single property value
             */
            remove(propertyName: string, propertyValue?: string): void,

            /**
             * Reduce any property.
             * Removing values not already included in the state has no effect and does not error
             *
             * ```javascript
             * e.g., Flurry.UserProperties.remove(Flurry.UserProperties.PROPERTY_CURRENCY_PREFERENCE, ['USD', 'EUR']);
             * ```
             * @param propertyName   property name
             * @param propertyValues list of property values
             */
            remove(propertyName: string, propertyValue:  string[]): void,

            /**
             * Exactly set, or replace if any previously exists, any state for the property to a single true state.
             * Implies that value is boolean and should only be flagged and cleared.
             *
             * ```javascript
             * e.g., Flurry.UserProperties.flag(Flurry.UserProperties.PROPERTY_PURCHASER);
             * ```
             * @param propertyName property name
             */
            flag(propertyName: string): void
        }

        /**
         * Constants and Methods for Performance Metrics.
         */
        static Performance: {
        	NONE:        0,
        	COLD_START:  1,
        	SCREEN_TIME: 2,
        	ALL:         1 | 2,

            /**
             * Report to the Flurry Cold Start metrics that your app is now fully drawn.
             * This is only used to help measuring application launch times, so that the
             * app can report when it is fully in a usable state similar to
             * {@link android.app.Activity#reportFullyDrawn}.
             */
            reportFullyDrawn(): void,

            /**
             * Provide a Resource logger that users can start before profiled codes start,
             * then log event after finished. Flurry will compute the time.
             *
             * e.g.,
             * ```javascript
             * Flurry.Performance.startResourceLogger;
             * {
             *     // profiled codes ...
             * }
             * Flurry.Performance.logResourceLogger;
             * ```
             */
            startResourceLogger(): void,

            /**
             * Log Flurry Resources Consuming events.
             *
             * e.g.,
             * ```javascript
             * Flurry.Performance.startResourceLogger;
             * {
             *     // profiled codes ...
             * }
             * Flurry.Performance.logResourceLogger;
             * ```
             * @param id The group ID
             */
            logResourceLogger(id: string): void
        }

        /**
         * Register a listener for the state of fetching. Multiple listeners can be passed in and each
         * one will be called in the order they are registered.
         *
         * ```
         * Event.Type: ConfigStatus.SUCCESS:   Config data is successfully loaded from server.
         *             ConfigStatus.UNCHANGED: Fetch completes but no changes from server.
         *             ConfigStatus.ERROR:     Config data is failed to load from server.
         *                                     Flurry Config will retry if failed in 10 sec., 30 sec., 3 min., then abandon.
         *                                     Event.isRetrying: true if it is still retrying fetching
         *             ConfigStatus.ACTIVATED: Config data is activated.
         *                                     Flurry Config can receive activate notification when cached data is read,
         *                                     and when newly fetched data is been activated.
         *                                     Event.isCache: true if activated from the cached data
         * ```
         *
         * e.g.,
         * ```javascript
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
         * ```
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
         * e.g.,
         * ```javascript
         * Flurry.getConfigString('welcome_message', 'Welcome!').then((value) => {
         *     console.log('Received data: ' + value.welcome_message);
         * });
         * ```
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
         * e.g.,
         * ```javascript
         * let keysAndDefaults = {
         *         welcome_message:    'Welcome!',
         *         welcome_font_size:  '12',
         *         welcome_font_color: '#990066'
         *     };
         * 
         * Flurry.getConfigString(keysAndDefaults).then((value) => {
         *     console.log('Received map of data: ' +
         *                 value.welcome_message + ':' + value.welcome_font_size + ':' + value.welcome_font_color);
         * });
         * ```
         * 
         * @param keysAndDefaults A Map of names and the default values.
         * @returns Map of configuration values if exist, or default values.
         */
        static getConfigString(keysAndDefaults: { [key: string]: string; }): 
                               Promise<{ [key: string]: string; }>;

        /**
         * Add a listener to receive messaging events, and handle the notification.
         * ```
         * Message.Type: RECEIVED:  a notification has been received.
         *               CLICKED:   a notification has been clicked.
         *               CANCELLED: a notification has been cancelled. (Android only)
         *               REFRESH:   push notification token has been changed. (Android only)
         * Message.Title:       message title
         * Message.Body:        message body
         * Message.Data:        message data (Map)
         * Message.ClickAction: click action (Android only)
         * Message.Token:       refreshed token
         * ```
         *
         * Please call required Flurry.willHandleMessage(boolean) when received event types of
         * MessageType.RECEIVED or MessageType.CLICKED as soon as possible to avoid delay.
         * (Android only) If you would like to handle the notification yourself, return true to notify Flurry
         * you've handled it, and Flurry will not show the notification (MessageType.RECEIVED),
         * or Flurry will not launch the app or 'click_action' activity (MessageType.CLICKED).
         *
         * e.g.,
         * ```javascript
         * Flurry.addMessagingListener((message) => {
         *     if (message.Type === Flurry.MessageType.RECEIVED) {
         *         Flurry.willHandleMessage(false);
         *     } else if (message.Type === Flurry.MessageType.CLICKED) {
         *         Flurry.willHandleMessage(false);
         *     }
         *
         *     Flurry.printMessage(message);
         * });
         * ```
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
         * ```javascript
         * e.g., Flurry.willHandleMessage(true);
         * ```
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

        /**
         * Constants for Standard Event Types.
         */
        static Event: {
            /**
             * Log this event when a user clicks on an Ad.
             * @param mandatory_parameters none
             * @param recommended_parameters Param.AD_TYPE
             */
             AD_CLICK: number,
        
             /**
              * Log this event when a user views an Ad impression.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.AD_TYPE
              */
             AD_IMPRESSION: number,
         
             /**
              * Log this event when a user is granted a reward for viewing a rewarded Ad.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.AD_TYPE
              */
             AD_REWARDED: number,
         
             /**
              * Log this event when a user skips an Ad.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.AD_TYPE
              */
             AD_SKIPPED: number,
         
             /**
              * Log this event when a user spends credit in the app.
              * @param mandatory_parameters Param.TOTAL_AMOUNT
              * @param recommended_parameters Param.LEVEL_NUMBER, Param.IS_CURRENCY_SOFT, Param.CREDIT_TYPE, Param.CREDIT_ID, Param.CREDIT_NAME, Param.CURRENCY_TYPE
              */
             CREDITS_SPENT: number,
         
             /**
              * Log this event when a user purchases credit in the app.
              * @param mandatory_parameters Param.TOTAL_AMOUNT
              * @param recommended_parameters Param.LEVEL_NUMBER, Param.IS_CURRENCY_SOFT, Param.CREDIT_TYPE, Param.CREDIT_ID, Param.CREDIT_NAME, Param.CURRENCY_TYPE
              */
             CREDITS_PURCHASED: number,
         
             /**
              * Log this event when a user earns credit in the app.
              * @param mandatory_parameters Param.TOTAL_AMOUNT
              * @param recommended_parameters Param.LEVEL_NUMBER, Param.IS_CURRENCY_SOFT, Param.CREDIT_TYPE, Param.CREDIT_ID, Param.CREDIT_NAME, Param.CURRENCY_TYPE
              */
             CREDITS_EARNED: number,
         
             /**
              * Log this event when a user unlocks an achievement in the app.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.ACHIEVEMENT_ID
              */
             ACHIEVEMENT_UNLOCKED: number,
         
             /**
              * Log this event when an App user completes a level.
              * @param mandatory_parameters Param.LEVEL_NUMBEER
              * @param recommended_parameters Param.LEVEL_NAME
              */
             LEVEL_COMPLETED: number,
         
             /**
              * Log this event when an App user fails a level.
              * @param mandatory_parameters Param.LEVEL_NUMBEER
              * @param recommended_parameters Param.LEVEL_NAME
              */
             LEVEL_FAILED: number,
         
             /**
              * Log this event when an App user levels up.
              * @param mandatory_parameters Param.LEVEL_NUMBEER
              * @param recommended_parameters Param.LEVEL_NAME
              */
             LEVEL_UP: number,
         
             /**
              * Log this event when an App user starts a level.
              * @param mandatory_parameters Param.LEVEL_NUMBEER
              * @param recommended_parameters Param.LEVEL_NAME
              */
             LEVEL_STARTED: number,
         
             /**
              * Log this event when an App user skips a level.
              * @param mandatory_parameters Param.LEVEL_NUMBEER
              * @param recommended_parameters Param.LEVEL_NAME
              */
             LEVEL_SKIP: number,
         
             /**
              * Log this event when an App user posts his score.
              * @param mandatory_parameters Param.SCORE
              * @param recommended_parameters Param.LEVEL_NUMBEER
              */
             SCORE_POSTED: number,
         
             /**
              * Log this event when a user rates a content in the App.
              * @param mandatory_parameters Param.CONTENT_ID, Param.RATING
              * @param recommended_parameters Param.CONTENT_TYPE, Param.CONTENT_NAME
              */
             CONTENT_RATED: number,
         
             /**
              * Log this event when a specific content is viewed by a user.
              * @param mandatory_parameters Param.CONTENT_ID
              * @param recommended_parameters Param.CONTENT_TYPE, Param.CONTENT_NAME
              */
             CONTENT_VIEWED: number,
         
             /**
              * Log this event when a user saves the content in the App.
              * @param mandatory_parameters Param.CONTENT_ID
              * @param recommended_parameters Param.CONTENT_TYPE, Param.CONTENT_NAME
              */
             CONTENT_SAVED: number,
         
             /**
              * Log this event when a user customizes the App/product.
              * @param mandatory_parameters none
              * @param recommended_parameters none
              */
             PRODUCT_CUSTOMIZED: number,
         
             /**
              * Log this event when the App is activated.
              * @param mandatory_parameters none
              * @param recommended_parameters none
              */
             APP_ACTIVATED: number,
         
             /**
              * Log this event when a user submits an application through the App.
              * @param mandatory_parameters none
              * @param recommended_parameters none
              */
             APPLICATION_SUBMITTED: number,
         
             /**
              * Log this event when an item is added to the cart.
              * @param mandatory_parameters Param.ITEM_COUNT, Param.PRICE
              * @param recommended_parameters Param.ITEM_ID, Param.ITEM_NAME, Param.ITEM_TYPE
              */
             ADD_ITEM_TO_CART: number,
         
             /**
              * Log this event when an item is added to the wish list.
              * @param mandatory_parameters Param.ITEM_COUNT, Param.PRICE
              * @param recommended_parameters Param.ITEM_ID, Param.ITEM_NAME, Param.ITEM_TYPE
              */
             ADD_ITEM_TO_WISH_LIST: number,
         
             /**
              * Log this event when checkout is completed or transaction is successfully completed.
              * @param mandatory_parameters Param.ITEM_COUNT, Param.TOTAL_AMOUNT
              * @param recommended_parameters Param.CURRENCY_TYPE, Param.TRANSACTION_ID
              */
             COMPLETED_CHECKOUT: number,
         
             /**
              * Log this event when payment information is added during a checkout process.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.SUCCESS, Param.PAYMENT_TYPE
              */
             PAYMENT_INFO_ADDED: number,
         
             /**
              * Log this event when an item is viewed.
              * @param mandatory_parameters Param.ITEM_ID
              * @param recommended_parameters Param.ITEM_NAME, Param.ITEM_TYPE, Param.PRICE
              */
             ITEM_VIEWED: number,
         
             /**
              * Log this event when a list of items is viewed.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.ITEM_LIST_TYPE
              */
             ITEM_LIST_VIEWED: number,
         
             /**
              * Log this event when a user does a purchase in the App.
              * @param mandatory_parameters Param.TOTAL_AMOUNT
              * @param recommended_parameters Param.ITEM_COUNT, Param.ITEM_ID, Param.SUCCESS, Param.ITEM_NAME, Param.ITEM_TYPE,
              *                       Param.CURRENCY_TYPE, Param.TRANSACTION_ID
              */
             PURCHASED: number,
         
             /**
              * Log this event at refund.
              * @param mandatory_parameters Param.PRICE
              * @param recommended_parameters Param.CURRENCY_TYPE
              */
             PURCHASE_REFUNDED: number,
         
             /**
              * Log this event when a user removes an item from the cart.
              * @param mandatory_parameters Param.ITEM_ID
              * @param recommended_parameters Param.PRICE, Param.ITEM_NAME, Param.ITEM_TYPE
              */
             REMOVE_ITEM_FROM_CART: number,
         
             /**
              * Log this event when a user starts checkout.
              * @param mandatory_parameters Param.ITEM_COUNT, Param.TOTAL_AMOUNT
              * @param recommended_parameters none
              */
             CHECKOUT_INITIATED: number,
         
             /**
              * Log this event when a user donates fund to your App or through the App.
              * @param mandatory_parameters Param.PRICE
              * @param recommended_parameters Param.CURRENCY_TYPE
              */
             FUNDS_DONATED: number,
         
             /**
              * Log this event when user schedules an appointment using the App.
              * @param mandatory_parameters none
              * @param recommended_parameters none
              */
             USER_SCHEDULED: number,
         
             /**
              * Log this event when an offer is presented to the user.
              * @param mandatory_parameters Param.ITEM_ID, Param.PRICE
              * @param recommended_parameters Param.ITEM_NAME, Param.ITEM_CATEGORY
              */
             OFFER_PRESENTED: number,
         
             /**
              * Log this event at the start of a paid subscription for a service or product.
              * @param mandatory_parameters Param.PRICE, Param.IS_ANNUAL_SUBSCRIPTION
              * @param recommended_parameters Param.TRIAL_DAYS, Param.PREDICTED_LTV, Param.CURRENCY_TYPE, Params.SUBSCRIPTION_COUNTRY
              */
             SUBSCRIPTION_STARTED: number,
         
             /**
              * Log this event when a user unsubscribes from a paid subscription for a service or product.
              * @param mandatory_parameters Param.IS_ANNUAL_SUBSCRIPTION
              * @param recommended_parameters Param.CURRENCY_TYPE, Params.SUBSCRIPTION_COUNTRY
              */
             SUBSCRIPTION_ENDED: number,
         
             /**
              * Log this event when user joins a group.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.GROUP_NAME
              */
             GROUP_JOINED: number,
         
             /**
              * Log this event when user leaves a group.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.GROUP_NAME
              */
             GROUP_LEFT: number,
         
             /**
              * Log this event when a user starts a tutorial.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.TUTORIAL_NAME
              */
             TUTORIAL_STARTED: number,
         
             /**
              * Log this event when a user completes a tutorial.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.TUTORIAL_NAME
              */
             TUTORIAL_COMPLETED: number,
         
             /**
              * Log this event when a specific tutorial step is completed.
              * @param mandatory_parameters Param.STEP_NUMBER
              * @param recommended_parameters Param.TUTORIAL_NAME
              */
             TUTORIAL_STEP_COMPLETED: number,
         
             /**
              * Log this event when user skips the tutorial.
              * @param mandatory_parameters Param.STEP_NUMBER
              * @param recommended_parameters Param.TUTORIAL_NAME
              */
             TUTORIAL_SKIPPED: number,
         
             /**
              * Log this event when a user login on the App.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.USER_ID, Param.METHOD
              */
             LOGIN: number,
         
             /**
              * Log this event when a user logout of the App.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.USER_ID, Param.METHOD
              */
             LOGOUT: number,
         
             /**
              * Log the event when a user registers (signup). Helps capture the method used to sign-up (sign up with google/apple or emailaddress) .
              * @param mandatory_parameters none
              * @param recommended_parameters Param.USER_ID, Param.METHOD
              */
             USER_REGISTERED: number,
         
             /**
              * Log this event when user views search results.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.QUERY, Param.SEARCH_TYPE
              */
             SEARCH_RESULT_VIEWED: number,
         
             /**
              * Log this event when a user searches for a keyword using Search.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.QUERY, Param.SEARCH_TYPE
              */
             KEYWORD_SEARCHED: number,
         
             /**
              * Log this event when a user searches for a location using Search.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.QUERY
              */
             LOCATION_SEARCHED: number,
         
             /**
              * Log this event when a user invites another user.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.USER_ID, Param.METHOD
              */
             INVITE: number,
         
             /**
              * Log this event when a user shares content with another user in the App.
              * @param mandatory_parameters Param.SOCIAL_CONTENT_ID
              * @param recommended_parameters Param.SOCIAL_CONTENT_NAME, Param.METHOD
              */
             SHARE: number,
         
             /**
              * Log this event when a user likes a social content. e.g. likeType captures what kind of like is logged: number,
              * @param mandatory_parameters Param.SOCIAL_CONTENT_ID
              * @param recommended_parameters Param.SOCIAL_CONTENT_NAME, Param.LIKE_TYPE
              */
             LIKE: number,
         
             /**
              * Log this event when a user comments or replies on a social post.
              * @param mandatory_parameters Param.SOCIAL_CONTENT_ID
              * @param recommended_parameters Param.SOCIAL_CONTENT_NAME
              */
             COMMENT: number,
         
             /**
              * Log this event when an image, audio or a video is captured.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.MEDIA_ID, Param.MEDIA_NAME, Param.MEDIA_TYPE
              */
             MEDIA_CAPTURED: number,
         
             /**
              * Log this event when an audio or video starts.
              * @param mandatory_parameters none
              * @param recommended_parameters Param.MEDIA_ID, Param.MEDIA_NAME, Param.MEDIA_TYPE
              */
             MEDIA_STARTED: number,
         
             /**
              * Log this event when an audio or video is stopped.
              * @param mandatory_parameters Param.DURATION
              * @param recommended_parameters Param.MEDIA_ID, Param.MEDIA_NAME, Param.MEDIA_TYPE
              */
             MEDIA_STOPPED: number,
         
             /**
              * Log this event when an audio or video is paused.
              * @param mandatory_parameters Param.DURATION
              * @param recommended_parameters Param.MEDIA_ID, Param.MEDIA_NAME, Param.MEDIA_TYPE
              */
             MEDIA_PAUSED: number,
         
             /**
              * Log this event when a privacy prompt is displayed.
              * @param mandatory_parameters none
              * @param recommended_parameters none
              */
             PRIVACY_PROMPT_DISPLAYED: number,
         
             /**
              * Log this event when a user opts in (on the privacy prompt).
              * @param mandatory_parameters none
              * @param recommended_parameters none
              */
             PRIVACY_OPT_IN: number,
         
             /**
              * Log this event when a user opts out (on the privacy prompt).
              * @param mandatory_parameters none
              * @param recommended_parameters none
              */
             PRIVACY_OPT_OUT: number,
         }

        /**
         * Constants for Standard Event Parameter Types.
         */
        static EventParam: {
            /**
             * AD type - value type: string.
             */
             AD_TYPE: string,
    
             /**
              * Level name - value type: string.
              */
             LEVEL_NAME: string,
     
             /**
              * Level number - value type: number.
              */
             LEVEL_NUMBER: string,
     
             /**
              * Content name - value type: string.
              */
             CONTENT_NAME: string,
     
             /**
              * Content type - value type: string.
              */
             CONTENT_TYPE: string,
     
             /**
              * Content ID - value type: string.
              */
             CONTENT_ID: string,
     
             /**
              * Credit name - value type: string.
              */
             CREDIT_NAME: string,
     
             /**
              * Credit type - value type: string.
              */
             CREDIT_TYPE: string,
     
             /**
              * Credit ID - value type: string.
              */
             CREDIT_ID: string,
     
             /**
              * Is Currency soft - value type: boolean.
              */
             IS_CURRENCY_SOFT: string,
     
             /**
              * Currency type - value type: string.
              */
             CURRENCY_TYPE: string,
     
             /**
              * Payment type - value type: string.
              */
             PAYMENT_TYPE: string,
     
             /**
              * Item name - value type: string.
              */
             ITEM_NAME: string,
     
             /**
              * Item type - value type: string.
              */
             ITEM_TYPE: string,
     
             /**
              * Item ID - value type: string.
              */
             ITEM_ID: string,
     
             /**
              * Item count - value type: number.
              */
             ITEM_COUNT: string,
     
             /**
              * Item category - value type: string.
              */
             ITEM_CATEGORY: string,
     
             /**
              * Item list type - value type: string.
              */
             ITEM_LIST_TYPE: string,
     
             /**
              * Price - value type: number.
              */
             PRICE: string,
     
             /**
              * Total amount - value type: number.
              */
             TOTAL_AMOUNT: string,
     
             /**
              * Achievement ID - value type: string.
              */
             ACHIEVEMENT_ID: string,
     
             /**
              * Score - value type: number.
              */
             SCORE: string,
     
             /**
              * Rating - value type: string.
              */
             RATING: string,
     
             /**
              * Transaction ID - value type: string.
              */
             TRANSACTION_ID: string,
     
             /**
              * Success - value type: boolean.
              */
             SUCCESS: string,
     
             /**
              * Is annual subscription - value type: boolean.
              */
             IS_ANNUAL_SUBSCRIPTION: string,
     
             /**
              * Subscription country - value type: string.
              */
             SUBSCRIPTION_COUNTRY: string,
     
             /**
              * Trial days - value type: number.
              */
             TRIAL_DAYS: string,
     
             /**
              * Predicted LTV - value type: string.
              */
             PREDICTED_LTV: string,
     
             /**
              * Group name - value type: string.
              */
             GROUP_NAME: string,
     
             /**
              * Tutorial name - value type: string.
              */
             TUTORIAL_NAME: string,
     
             /**
              * Step number - value type: number.
              */
             STEP_NUMBER: string,
     
             /**
              * User ID - value type: string.
              */
             USER_ID: string,
     
             /**
              * Method - value type: string.
              */
             METHOD: string,
     
             /**
              * Query - value type: string.
              */
             QUERY: string,
     
             /**
              * Search type - value type: string.
              */
             SEARCH_TYPE: string,
     
             /**
              * Social content name - value type: string.
              */
             SOCIAL_CONTENT_NAME: string,
     
             /**
              * Social content ID - value type: string.
              */
             SOCIAL_CONTENT_ID: string,
     
             /**
              * Like type - value type: string.
              */
             LIKE_TYPE: string,
     
             /**
              * Media name - value type: string.
              */
             MEDIA_NAME: string,
     
             /**
              * Media type - value type: string.
              */
             MEDIA_TYPE: string,
     
             /**
              * Media ID - value type: string.
              */
             MEDIA_ID: string,
     
             /**
              * Duration - value type: number.
              */
             DURATION: string,
        }

    }

    export module Flurry {

        /**
         * Builder pattern for Flurry.
         *
         * ```
         * Initialize the Flurry SDK.
         *   build(apiKey1: string, apiKey2?: string): void;
         *
         * Enable the ability to catch all uncaught exceptions and have them reported back to Flurry.
         *   withCrashReporting(crashReporting?: boolean): Builder;
         *
         * Set the timeout for expiring a Flurry session.
         *   withContinueSessionMillis(sessionMillis?: number): Builder;
         *
         * Enable if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
         *   withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): Builder;
         *
         * Enable the internal logging for the Flurry SDK.
         *   withLogEnabled(enableLog?: boolean): Builder;
         *
         * Set the log level of the internal Flurry SDK logging.
         *   withLogLevel(logLevel?: number): Builder;
         *
         * Enable the Flurry Push for messaging.
         *   withMessaging(enableMessaging?: boolean): Builder;
         * ```
         */       
        class Builder {

            /**
             * Initialize the Flurry SDK.
             * 
             * There are two overloads,
             * ```javascript
             * e.g., build('FLURRY_API_KEY');
             *       build('FLURRY_ANDROID_API_KEY', 'FLURRY_IOS_API_KEY');
             * ```
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
            withAppVersion(versionName?: string): Builder;

            /**
             * True to enable or false to disable the ability to catch all uncaught exceptions
             * and have them reported back to Flurry.
             * 
             * @param crashReporting true to enable, false to disable.
             */
            withCrashReporting(crashReporting?: boolean): Builder;
    
            /**
             * Set the timeout for expiring a Flurry session.
             * 
             * @param sessionMillis The time in milliseconds to set the session timeout to. Minimum value of 5000.
             */
            withContinueSessionMillis(sessionMillis?: number): Builder;

            /**
             * True to opt-out data sale or false to opt-in data sale
             *
             * @param isOptOut true to opt-out data sale, false to opt-in
             */
            withDataSaleOptOut(isOptOut?: boolean): Builder;

            /**
             * Set the iOS In-App Purchase reporting enabled.
             * 
             * @param enableIAP True to enable iOS In-App Purchase reporting, false otherwise.
             */
            withIAPReportingEnabled(enableIAP?: boolean): Builder;
    
            /**
             * True if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
             * 
             * @param includeBackgroundSessionsInMetrics if background and inactive session should be counted toward dau
             */
            withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): Builder;
    
            /**
             * True to enable or false to disable the internal logging for the Flurry SDK.
             * 
             * @param enableLog true to enable logging, false to disable it.
             */
            withLogEnabled(enableLog?: boolean): Builder;
    
            /**
             * Set the log level of the internal Flurry SDK logging.
             * 
             * @param logLevel The level to set it to { VERBOSE, DEBUG, INFO, WARN, ERROR, ASSERT }.
             */
            withLogLevel(logLevel?: number): Builder;

            /**
             * True to enable or false to disable Location report. Defaults to false.
             *
             * @param reportLocation true to enable Location report, false to disable it.
             */
             withReportLocation(reportLocation?: boolean): Builder;
    
            /**
             * Set flags for performance metrics.
             *
             * @param performanceMetrics Flags for performance metrics.
             *                           E.g., Flurry.PerformanceMetrics.COLD_START | Flurry.PerformanceMetrics.SCREEN_TIME.
             */
            withPerformanceMetrics(performanceMetrics?: number): Builder;

            /**
             * True to enable or  false to disable SSL Pinning for Flurry Analytics connection. Defaults to false.
             *
             * Turn on to add SSL Pinning protection for the Flurry Analytics connections. Disable it
             * if your app is using proxy or any services that are not compliant with SSL Pinning.
             *
             * @param sslPinningEnabled true to enable SSL Pinning for Flurry Analytics connection, false to disable it.
             */
             withSslPinningEnabled(sslPinningEnabled?: boolean): Builder;

            /**
             * True to enable or false to disable the Flurry Push for messaging.
             * 
             * @param enableMessaging true to enable messaging, false to disable it.
             */
            withMessaging(enableMessaging?: boolean): Builder;

            /**
             * Set the minimum duration (in minutes) before a partial session report is sent to Flurry. The acceptable values are between 5 and 60 minutes. tvOS only.
             * 
             * @param interval The period after which a partial session report is sent to Flurry.
             */
            withTVSessionReportingInterval(interval?: number): Builder;

            /**
             * Sets the minimum number of events before a partial session report is sent to Flurry. The acceptable values are between 5 and 50. tvOS only.
             * 
             * @param threshold The number of events after which partial session report is sent to Flurry.
             */
            withTVEventCountThreshold(threshold?: number): Builder;
        }
    }

    export default Flurry;
}
