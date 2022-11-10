'use strict';

const _request = require("request");
const _axios = require("axios");
const fetch = require("node-fetch");
const { SocksProxyAgent } = require("socks-proxy-agent");
const torHttpsAgent = new SocksProxyAgent("socks5h://127.0.0.1:9050");
const yaping = require("yaping");

module.exports = function (enable = false) {
    const self = {};
    self.proxyHosts = []
    self.lastUpdate = Date.now();

    const isUseProxy = (path)=>{
        const url = new URL(path)
        if((self.lastUpdate + 60*60*1000) < Date.now()){
            self.proxyHosts = [];
            self.lastUpdate = Date.now();
        }
        return self.proxyHosts.some(el=>el===url?.host);
    }

    const proxifyHost = (path) => {
        const url = new URL(path)
        self.proxyHosts.push(url?.host)
    }

    const unproxifyHost = (path) => {
        const url = new URL(path)
        self.proxyHosts = self.proxyHosts.filter(el=>el!==url.host)
    }

    const axiosRequest = async (arg1, arg2)=> {
        let preparedOpts = {};

        if (!arg1) {
            return Promise.reject('AXIOS_INVALID_ARG_TYPE');
        }

        if (typeof arg1 === 'string') {
            preparedOpts.url = arg1;

            if (typeof arg2 === 'object') {
                preparedOpts = { ...preparedOpts, ...arg2 };
            }
        } else if (typeof arg1 === 'object') {
            preparedOpts = arg1;
        }

        const isProxyUsed = isUseProxy(preparedOpts.url);

        if (isProxyUsed && enable) {
            await awaitTor();
            preparedOpts.httpsAgent = torHttpsAgent;
        }

        try {
            return _axios(preparedOpts);
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (!isProxyUsed && isTorEnabled && enable) {
                proxifyHost(preparedOpts.url)
                return axiosRequest(preparedOpts);
            }
            unproxifyHost(preparedOpts.url)
            throw e;
        }
    }

    self.axios = (...args) => axiosRequest(...args);
    self.axios.get = (...args) => axiosRequest(...args);
    self.axios.post = (...args) => axiosRequest(...args);
    self.axios.put = (...args) => axiosRequest(...args);
    self.axios.delete = (...args) => axiosRequest(...args);
    self.axios.patch = (...args) => axiosRequest(...args);

    self.fetch = async (url, opts = {}) => {
        let parentAbortControlSignal = opts?.signal;

        function pingHost(host) {
            return new Promise((resolve) => {
                yaping(host, (err, target) => {
                    if (err) {
                        resolve(false);
                        return;
                    }

                    resolve(true);
                });
            });
        }

        function timeout(time) {
            const abortControl = new AbortController();

            parentAbortControlSignal.addEventListener('abort', () => abortControl.abort());
            setTimeout(() => abortControl.abort(), time * 1000);

            return abortControl.signal;
        }

        if (isUseProxy(url) && enable) {
            opts.agent = torHttpsAgent;
        } else {
            const urlParts = new URL(url);
            const isPingSuccess = await pingHost(urlParts.hostname);

            if (!isPingSuccess) {
                console.log('Proxy16: Proxifing', urlParts.host)

                proxifyHost(url);
                opts.agent = torHttpsAgent;
            }
        }

        try {
            opts.signal = timeout(30);

            console.log('Proxy16: Fetch request arrived for', url, 'tor enabled?', !!opts.agent);
            return await fetch(url, {
                agent: getTransportAgent('https'),
                ...opts,
            }).then(async (res) => {
                console.log('Proxy16: Fetch request received SUCCESS', 'tor enabled?', !!opts.agent);
                return res;
            }).catch((err) => {
                console.log('Proxy16: Fetch request received ERROR', 'tor enabled?', !!opts.agent);
                throw err;
            });
        } catch (e) {
            console.log('Proxy16: Retry with TOR');
            const isTorEnabled = await awaitTor();
            console.log('Proxy16: Is TOR active?', isTorEnabled);

            if (enable && isTorEnabled && !isUseProxy(url)) {
                proxifyHost(url)

                opts.agent = torHttpsAgent;
                opts.signal = timeout(40);

                return await self.fetch(url, opts)
                  .then((res) => {
                      console.log('Proxy16: TOR Fetch request received SUCCESS');
                      return res;
                  })
                  .catch((err) => {
                      console.log('Proxy16: TOR Fetch request received ERROR');
                      if (err.code !== 'FETCH_ABORTED') {
                          // For debugging, don't remove
                          // console.log(err);
                      }
                  });
            }

            unproxifyHost(url)
            throw e;
        }
    }

    self.request = async (options, callBack) => {
        let req = _request;
        if (isUseProxy(options.url) && enable) {
            req = _request.defaults({agent: torHttpsAgent});
        }
        try {
            const data = req(options, (...args)=>{
                    callBack?.(...args)
                })
            return data;
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (enable && isTorEnabled && !isUseProxy(options.url)) {
                proxifyHost(options.url)
                return self.request(options, callBack);
            }

            unproxifyHost(options.url)
            callBack?.(e);
        }
    }

    const awaitTor = async () => {
        const torcontrol = self.torapplications;

        if (!torcontrol || torcontrol?.isStopped()) {
            return Promise.resolve(false);
        }

        if (torcontrol.isStarted()) {
            return Promise.resolve(true);
        }

        return new Promise((resolve, reject) => {
            self.torapplications.onStarted(() => resolve(true));
        });
    };

    return self;
}
