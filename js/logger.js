const LOGGER_ENDPOINT_ADDRESS = 'https://metrix.pocketnet.app/';
const DEFAULT_CONTENT_TYPE = 'text/plain';
const SENDING_INTERVAL = 30000;

class FrontendLogger {
  constructor(userAgent = '', app = {}) {
    this.userAgent = userAgent;
    this.app = app;

    this.guid = makeid();

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

  static logCodes = {
    SELECT_FEED_CATEGORY: {
      id: 'SELECT_FEED_CATEGORY',
      description: 'User clicked on the feed category button',
    },

    SELECT_FEED_SECTION: {
      id: 'CLICK_FEED_SECTION',
      description: 'User clicked on the feed category button',
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
  };

  static _logsCache = [];

  sendLogsBatch() {
    const { _logsCache, instance } = this;

    const logsBatch = _logsCache.splice(0, 10);

    if (logsBatch.length) {
      instance.post('front/add', logsBatch.join(','));
    }
  }

  _createLogBody({
    level = 'error',
    date = moment().format('YYYY-MM-DD hh:mm:ss'),
    moduleVersion = '',
    code = 400,
    payload = '',
    err = '',
    guid = '',
    userAgent = '',
  }) {
    const parametersOrder = [
      level,
      date,
      moduleVersion,
      code,
      payload,
      err,
      userAgent,
      guid,
    ].map((element) =>
      typeof element !== 'number' ? `'${element}'` : element,
    );

    return `(${parametersOrder.join(',')})`;
  }

  error(error = {}) {
    const { _logsCache, _createLogBody, guid, userAgent, loggerActive } = this;
    //protection from incorrect error formats or logger is turned off
    if (typeof error !== 'object' || !loggerActive) return;

    const formattedError = _createLogBody({ ...error, guid, userAgent });

    _logsCache.push(formattedError);
  }

  info(info = {}) {
    const { _logsCache, _createLogBody, guid, userAgent, loggerActive } = this;

    if (typeof info !== 'object' || !loggerActive) return;

    const fullInfo = {
      code: 211,
      level: 'info',
      ...info,
    };

    const formattedInfo = _createLogBody({ ...fullInfo, guid, userAgent });

    _logsCache.push(formattedInfo);
  }
}
