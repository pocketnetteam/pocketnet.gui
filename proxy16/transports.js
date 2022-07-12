'use strict';

const _request = require("request");
const _axios = require("axios");
const _fetch = require("node-fetch")
const { SocksProxyAgent } = require('socks-proxy-agent')
const httpsAgent = new SocksProxyAgent('socks5h://127.0.0.1:9050')

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
            preparedOpts.httpsAgent = httpsAgent;
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
        if (isUseProxy(url) && enable) {
            opts.agent = httpsAgent;
        }
        try {
            return await _fetch(url, opts);
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (enable && isTorEnabled && !isUseProxy(url)) {
                proxifyHost(url)
                return await self.fetch(url, opts)
                  .catch((err) => {
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

    self.request = async (uri, options, callback) => {
        let req = _request;
        if (isUseProxy(uri || options.url) && enable) {
            req = _request.defaults({agent: httpsAgent});
        }
        try {
            const data = req(uri, options, callback)
            return data;
        } catch (e) {
            const isTorEnabled = await awaitTor();

            if (enable && isTorEnabled && !isUseProxy(uri || options.url)) {
                proxifyHost(uri || options.url)
                return self.request(uri, options, callback);
            }

            unproxifyHost(uri || options.url)
            callback?.(e);
        }
    }

    const awaitTor = async () => {
        return new Promise(resolve=>{
            if(self.torapplications){
                if(self.torapplications?.state?.status === "started"){
                    resolve(true)
                } else if(self.torapplications?.state?.status === "stopped"){
                    resolve(false)
                } else {
                    self.torapplications.statusListener((status) => {
                        if (status === "started") {
                            resolve(true)
                        }
                    });
                }
            } else {
                resolve (false)
            }
        })
    };

    return self;
}
