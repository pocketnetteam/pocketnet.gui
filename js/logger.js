const LOGGER_ENDPOINT_ADDRESS =
  'http://clickhouse.clickhouse.metrix.pocketnet.app:8123?query=INSERT INTO FrontendMetrics VALUES';
const DEFAULT_CONTENT_TYPE = 'text/plain';

class FrontendLogger {
  constructor(userAgent = '') {
    this.userAgent = userAgent;

    //configuration of the axios instance
    this.instance = axios.create({
        baseURL: LOGGER_ENDPOINT_ADDRESS,
    });
    this.instance.defaults.headers.common['Content-Type'] =
      DEFAULT_CONTENT_TYPE;
  }

  error(error = '', type = 'default') {
    const { userAgent, instance } = this;

    instance
      .post('', {
        userAgent,
        error,
        type,
      })
    //   .then(() => {
    //     debugger;
    //   })
    //   .catch(() => {
    //     debugger;
    //   });
  }
}
