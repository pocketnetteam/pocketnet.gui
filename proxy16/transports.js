'use strict';

const _request = require("request");
const _axios = require("axios");
const _fetch = require("node-fetch")
const { SocksProxyAgent } = require('socks-proxy-agent')
const httpsAgent = new SocksProxyAgent('socks5h://127.0.0.1:9050')

module.exports = function (enable = false){
    const self = {};
    self.tor = {};
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

    const proxifyHost = (path)=>{
        const url = new URL(path)
        self.proxyHosts.push(url?.host)
    }

    const unproxifyHost = (path)=>{
        const url = new URL(path)
        self.proxyHosts = self.proxyHosts.filter(el=>el!==url.host)
    }

    const axiosRequest = (arg1, arg2)=> {
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

        if(isProxyUsed && enable) {
            preparedOpts.httpsAgent = httpsAgent;
        }

        try {
            return _axios(preparedOpts);
        } catch (e) {
            if(!isProxyUsed && enable){
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
        if(isUseProxy(url) && enable) {
            opts.agent = httpsAgent;
        }
        try {
            return await _fetch(url, opts);
        }catch (e) {
            if(enable && !isUseProxy(url)){
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

    self.request = (options, callBack)=>{
        let req = _request;
        if(isUseProxy(options.url) && enable) {
            req = _request.defaults({agent: httpsAgent});
        }
        try {
            const data = req(options, (...args)=>{
                    callBack?.(...args)
                })
            return data;
        }catch (e) {
            if(enable && !isUseProxy(options.url)){
                proxifyHost(options.url)
                return self.request(options, callBack);
            }
            unproxifyHost(options.url)
            callBack(e);
        }
    }

    return self;
}
