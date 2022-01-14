const LOGGER_ENDPOINT_ADDRESS = 'https://metrix.pocketnet.app/';
const DEFAULT_CONTENT_TYPE = 'text/plain';

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
  }

  get loggerActive() {
    return this.app.platform.sdk.usersettings.meta.sendUserStatistics.value && !this.app.test;
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
    const { instance, _createErrorBody, guid, userAgent, loggerActive } = this;
    //protection from incorrect error formats or logger is turned off
    if (typeof error !== 'object' || !loggerActive) return;

    const formattedError = _createErrorBody({ ...error, guid, userAgent });

    instance.post('front/add', formattedError);
  }
}
