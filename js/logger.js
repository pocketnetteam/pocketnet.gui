const LOGGER_ENDPOINT_ADDRESS = 'https://metrix.pocketnet.app/';
const DEFAULT_CONTENT_TYPE = 'text/plain';

class FrontendLogger {
  constructor(userAgent = '') {
    this.userAgent = userAgent;
    this.guid = this._createGUID();

    //configuration of the axios instance
    this.instance = axios.create({
      baseURL: LOGGER_ENDPOINT_ADDRESS,
    });
    this.instance.defaults.headers.common['Content-Type'] =
      DEFAULT_CONTENT_TYPE;
  }

  _createGUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
  }

  _createErrorBody({
    level = '',
    date = '',
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
      typeof element === 'string' ? `'${element}'` : element,
    );

    return `(${parametersOrder.join(',')})`;
  }

  error(error = {}) {
    const { instance, _createErrorBody, guid, userAgent } = this;

    //protection from incorrect error formats
    if (typeof error !== 'object') return;

    const formattedError = _createErrorBody({ ...error, guid, userAgent });

    instance
      .post('front/add', formattedError)
      .then((data) => {
        debugger;
      })
      .catch((err) => {
        debugger;
      });
  }
}
