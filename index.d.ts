declare module 'react-native-flurry-sdk' {

    /**
     * A React Native plugin for Flurry SDK.
     * The Flurry agent allows you to track the usage and behavior of your application
     * on users' devices for viewing in the Flurry Analytics system.
     * Set of methods that allow developers to capture detailed, aggregate information
     * regarding the use of their app by end users.
     */
    interface FlurryStatic {

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
        init(apiKey1: string, apiKey2?: string): void;

        /**
         * True to enable or false to disable the ability to catch all uncaught exceptions
         * and have them reported back to Flurry.
         * 
         * @param crashReporting true to enable, false to disable.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withCrashReporting(true);
         * @deprecated Please use Flurry.Builder instead.
         */
        withCrashReporting(crashReporting?: boolean): void;

        /**
         * Set the timeout for expiring a Flurry session.
         * 
         * @param sessionMillis The time in milliseconds to set the session timeout to. Minimum value of 5000.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withContinueSessionMillis(6000);
         * @deprecated Please use Flurry.Builder instead.
         */
        withContinueSessionMillis(sessionMillis?: number): void;

        /**
         * True if this session should be added to total sessions/DAUs when applicationstate is inactive or background.
         * 
         * @param includeBackgroundSessionsInMetrics if background and inactive session should be counted toward dau
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withIncludeBackgroundSessionsInMetrics(true);
         * @deprecated Please use Flurry.Builder instead.
         */
        withIncludeBackgroundSessionsInMetrics(includeBackgroundSessionsInMetrics?: boolean): void;

        /**
         * True to enable or false to disable the internal logging for the Flurry SDK.
         * 
         * @param enableLog true to enable logging,  false to disable it.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withLogEnabled(true);
         * @deprecated Please use Flurry.Builder instead.
         */
        withLogEnabled(enableLog?: boolean): void;

        /**
         * Set the log level of the internal Flurry SDK logging.
         * Android (2:VERBOSE, 3:DEBUG, 4:INFO, 5:WARN, 6:ERROR, 7:ASSERT), iOS (2:All, 3-5:Debug, 6-7:Critical)
         * 
         * @param logLevel The level to set it to.
         * 
         * Method must be called prior to invoking init, e.g. Flurry.withLogLevel(5);
         * @deprecated Please use Flurry.Builder instead.
         */
        withLogLevel(logLevel?: number): void;

        /**
         * Sets the age of the user at the time of this session.
         * 
         * e.g. Flurry.setAge(36);
         * 
         * @param age valid values are 0-110 
         */
        setAge(age: number): void;

        /**
         * Sets the gender of the user.
         * 
         * e.g. Flurry.setGender('f');
         * 
         * @param gender one of 'f' or 'm'
         */
        setGender(gender: string): void;

        /**
         * Set whether Flurry should record location via GPS.
         * 
         * e.g. Flurry.setReportLocation('reportLocation');
         * 
         * @param reportLocation True to allow Flurry to record location via GPS, false otherwise
         */
        setReportLocation(reportLocation: boolean): void;

        /**
         * This method allows you to specify session origin and deep link for each session.
         * 
         * e.g. Flurry.setSessionOrigin('originName', 'deepLink');
         * 
         * @param originName Name of the origin.
         * @param deepLink   Url of the deep Link.
         */
        setSessionOrigin(originName: string, deepLink: string): void;

        /**
         * Sets the Flurry userId for this session.
         * 
         * e.g. Flurry.setUserId(userId);
         * 
         * @param userId Unique user id for session.
         */
        setUserId(userId: string): void;

        /**
         * Set the version name of the app.
         * 
         * e.g. Flurry.setVersionName('versionName');
         * 
         * @param versionName The version of the app.
         */
        setVersionName(versionName?: string): void;

        /**
         * Sets the iOS In-App Purchase reporting enabled.
         * 
         * e.g. Flurry.setIAPReportingEnabled(true);
         * 
         * @param enableIAP True to enable iOS In-App Purchase reporting, false otherwise
         */
        setIAPReportingEnabled(enableIAP?: boolean): void;

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
        addOrigin(originName: string, originVersion: string, originParameters?: any): void;

        /**
         * This method allows you to associate parameters with an session.
         * 
         * e.g. Flurry.addSessionProperty('name', 'value');
         * 
         * @param name  Property name.
         * @param value Property value.
         */
        addSessionProperty(name: string, value: string): void;

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
        getVersions(errorCallback?: any, successCallback?: any): Promise;

        /**
         * Logs the breadcrumb.
         * 
         * e.g. Flurry.logBreadcrumb('crashBreadcrumb');
         * 
         * @param crashBreadcrumb crash breadcrumb
         */
        logBreadcrumb(crashBreadcrumb: string): void;

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
        logEvent(eventId: string, parameters?: any, timed?: boolean): void;

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
        logPayment(productName: string, productId: string, quantity: number, price: number,
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
        endTimedEvent(eventId: string, parameters?: any): void;

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
        onError(errorId: string, message: string, errorClass: string, errorParams?: any): void;

        /**
         * Log a page view.
         * 
         * e.g. Flurry.onPageView();
         */
        onPageView(): void;
    }

    const Flurry: FlurryStatic;
    export default Flurry;
}
