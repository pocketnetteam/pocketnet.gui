const LOGGER_ENDPOINT_ADDRESS = 'https://metrix.pocketnet.app/';
const DEFAULT_CONTENT_TYPE = 'text/plain';
const SENDING_INTERVAL = 30000;

class FrontendLogger {
  constructor(
    userAgent = '',
    userData = '',
    uri = '',
    timezone = '',
    app = {},
  ) {
    this.userAgent = userAgent;
    this.userData = userData;
    this.uri = uri;
    this.timezone = timezone;
    this.app = app;

    this.guid = makeid();
    this._logsCache = [];
    this._errorsCache = [];

    //configuration of the axios instance
    this.instance = axios.create({
      baseURL: LOGGER_ENDPOINT_ADDRESS,
    });
    this.instance.defaults.headers.common['Content-Type'] =
      DEFAULT_CONTENT_TYPE;

    const bindedLogSender = this.sendLogsBatch.bind(this);

    this.sendLogsInterval = setInterval(() => {
      bindedLogSender();
    }, SENDING_INTERVAL);
  }

  get loggerActive() {
    return (
      this.app.platform.sdk.usersettings.meta.sendUserStatistics.value &&
      !this.app.test
    );
  }

  logCodes = {
    SELECT_FEED_CATEGORY: {
      id: 'SELECT_FEED_CATEGORY',
      description: 'User clicked on the feed category button',
    },

    SELECT_FEED_SECTION: {
      id: 'SELECT_FEED_SECTION',
      description: 'User clicked on the feed section button',
    },

    SELECT_FEED_TAG: {
      id: 'SELECT_FEED_TAG',
      description: 'User clicked on the feed tag button',
    },

    POST_CREATING_STARTED: {
      id: 'POST_CREATING_STARTED',
      description: 'User clicked clicked on post creating window',
    },

    POST_CREATED: {
      id: 'POST_CREATED',
      description: 'User created post',
    },

    CHAT_OPENED: {
      id: 'CHAT_OPENED',
      description: 'Chat window is opened',
    },

    RECOMMENDATION_SELECTED: {
      id: 'RECOMMENDATION_SELECTED',
      description: 'One of the recomendations is selected',
    },

    BEST_VIDEO_CLICKED: {
      id: 'BEST_VIDEO_CLICKED',
      description: 'One of the best videos selected',
    },

    USER_COMPLAIN: {
      id: 'USER_COMPLAIN',
      description: 'user send complain',
    },

    SESSION_STARTED: {
      id: 'SESSION_STARTED',
      description: 'User session has started',
    },

    VIDEO_LOADED_WITH_RECOMMENDATIONS: {
      id: 'VIDEO_LOADED_WITH_RECOMMENDATIONS',
      description: 'User opened video with recommendations',
    },

    USER_STARTED_REGISTRATION: {
      id: 'USER_STARTED_REGISTRATION',
      description: 'Userhas started a registration process',
    },

    USER_REGISTRATION_PROCESS: {
      id: 'USER_REGISTRATION_PROCESS',
      description: 'USER_REGISTRATION_PROCESS',
    },

    APP_LOADED_FROM_EXTERNAL_LINK: {
      id: 'APP_LOADED_FROM_EXTERNAL_LINK',
      description: 'User opened Bastyon via an external link',
    },
  };

  errorCounters = {};

  sendLogsBatch() {
    const {
      _logsCache,
      _errorsCache,
      instance,
      _createErrorBody,
      _createLogBody,
    } = this;

    const logsBatch = _logsCache
      .splice(0, 10)
      .map((log) => _createLogBody(log));
    const errorsBatch = _errorsCache
      .splice(0, 10)
      .map((err) => _createErrorBody(err));

    if (logsBatch.length) {
      instance.post('front/action/v2', logsBatch.join(','));
    }

    if (errorsBatch.length) {
      instance.post('front/add', errorsBatch.join(','));
    }
  }

  _createErrorBody({
    level = 'error',
    date = moment().format('YYYY-MM-DD hh:mm:ss'),
    moduleVersion = '',
    code = 400,
    payload = '',
    err = '',
    guid = '',
    userAgent = '',
    // userData = '',
    // uri = '',
    // timezone = '',
  }) {
    const parametersOrder = [
      level,
      date,
      moduleVersion,
      code,
      payload,
      err,
      userAgent,
      userData,
      uri,
      timezone,
      guid,
    ].map((element) =>
      typeof element !== 'number' ? `'${element}'` : element,
    );

    return `(${parametersOrder.join(',')})`;
  }

  _createLogBody({
    type = 'DEFAULT_LOG',
    subType = 'DEFAULT_SUBTYPE',
    value = 'NO_VALUE',
    date = moment().format('YYYY-MM-DD hh:mm:ss'),
    moduleVersion = '0.0.1',
    userAgent = '',
    // userData = '',
    // uri = '',
    // timezone = '',
    guid = '',
    language = 'no',
  }) {
    const parametersOrder = [
      type,
      subType,
      value,
      date,
      moduleVersion,
      userAgent,
      // userData,
      // uri,
      // timezone,
      guid,
      language,
    ].map((element) =>
      typeof element !== 'number' ? `'${element}'` : element,
    );

    return `(${parametersOrder.join(',')})`;
  }

  error(error = {}) {
    const {
      _errorsCache,
      guid,
      userAgent,
      userData,
      uri,
      timezone,
      _addLogWithAggregation,
      errorCounters,
      loggerActive,
    } = this;
    //protection from incorrect error formats or logger is turned off
    // if (typeof error !== 'object' || !loggerActive) return;
    let errorBody;

    try {
      const serverResponse =
        deep(error, 'payload.response.data') || error.payload;
      errorBody = JSON.stringify(
        serverResponse,
        Object.getOwnPropertyNames(serverResponse),
      );
    } catch (errorFormat) {
      errorBody = `{ "error": "Unable to stringify received error. Report: ${errorFormat}", "type": "ERROR_PROCESSING_FAILED"}`;
    }

    const formattedError = {
      ...error,
      guid,
      userAgent,
      // userData,
      // uri,
      // timezone,
      payload: errorBody,
    };

    if (error.level) formattedError.level = error.level;

    if (_addLogWithAggregation[error.err]) {
      _addLogWithAggregation[error.err](
        formattedError,
        _errorsCache,
        errorCounters,
      );
    } else {
      _addLogWithAggregation.default(formattedError, _errorsCache);
    }
  }

  _addLogWithAggregation = {
    default: (info, arr) => arr.push(info),

    SELECT_FEED_CATEGORY(info, array) {
      const existingLog = array.find(
        (element) =>
          element.type === info.type && element.subType === info.subType,
      );

      if (!existingLog) return array.push(info);

      const valueArray = existingLog.value.split(',');

      if (!valueArray.includes(info.value)) valueArray.push(info.value);

      existingLog.value = valueArray.join(',');

      return;
    },

    SELECT_FEED_SECTION(info, array) {
      const existingLog = array.find(
        (element) => element.type === info.type && element.value === info.value,
      );

      if (!existingLog) return array.push(info);

      return;
    },

    SELECT_FEED_TAG(info, array) {
      const existingLog = array.find(
        (element) =>
          element.type === info.type && element.subType === info.subType,
      );

      if (!existingLog) return array.push(info);

      const valueArray = existingLog.value.split(',');

      if (!valueArray.includes(info.value)) valueArray.push(info.value);

      existingLog.value = valueArray.join(',');

      return;
    },

    VIDEO_LOADING_ERROR(info, array, errorCounters) {
      const existingLog = array.find(
        (element) =>
          element.videoErrorId === info.videoErrorId &&
          element.videoErrorType === info.videoErrorType,
      );

      if (
        info.videoErrorType === 'bufferStalledError' ||
        info.videoErrorType === 'bufferNudgeOnStall'
      ) {
        if (!errorCounters[info.videoErrorType])
          errorCounters[info.videoErrorType] = {};
        if (!errorCounters[info.videoErrorType][info.videoErrorId])
          errorCounters[info.videoErrorType][info.videoErrorId] = {
            counter: 0,
            performance: performance.now(),
          };

        const logContainer =
          errorCounters[info.videoErrorType][info.videoErrorId];

        logContainer.counter += 1;
        const timePassed = performance.now() - logContainer.performance;

        if (logContainer.counter > 3 && timePassed > 60000) {
          logContainer.counter = 0;
          logContainer.performance = performance.now();

          if (!existingLog) return array.push(info);

          existingLog.counter
            ? (existingLog.counter += 1)
            : (existingLog.counter = 1);

          return;
        }

        return;
      }

      if (!existingLog) return array.push(info);

      existingLog.counter
        ? (existingLog.counter += 1)
        : (existingLog.counter = 1);

      return;
    },
  };

  info({ actionId = '', actionSubType = '', actionValue = '' }) {
    const {
      _logsCache,
      guid,
      userAgent,
      userData,
      uri,
      timezone,
      loggerActive,
      logCodes,
      _addLogWithAggregation,
      app,
    } = this;

    if (!loggerActive) return;

    const infoType = logCodes[actionId] ? logCodes[actionId].id : actionId;
    const language = (app.localization || {}).key || 'no';

    const info = {
      type: infoType,
      subType: actionSubType,
      value: actionValue,
      guid,
      userAgent,
      // userData,
      // uri,
      // timezone,
      language,
    };

    if (_addLogWithAggregation[infoType]) {
      _addLogWithAggregation[infoType](info, _logsCache);
    } else {
      _addLogWithAggregation.default(info, _logsCache);
    }
  }
}
