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

    const addToPoxy = (path)=>{
        const url = new URL(path)
        self.proxyHosts.push(url?.host)
    }

    const removeToPoxy = (path)=>{
        const url = new URL(path)
        self.proxyHosts = self.proxyHosts.filter(el=>el!==url.host)
    }
    
    const axiosRequest =  async (method, ...args)=> {
        if(isUseProxy(args[0]) && enable) {
            args.push({httpsAgent: httpsAgent})
        }
        try {
            return await _axios[method]?.(...args)
        }catch (e) {
            if(enable && !isUseProxy(args[0])){
                addToPoxy(args[0])
                return await axiosRequest(method, ...args);
            }
            removeToPoxy(args[0])
            throw e;
        }
    }
    
    self.axios ={
        get : async (...args)=>{
            return await axiosRequest('get', ...args)
        },
        post: async (...args)=>{
            return await axiosRequest('post', ...args)
        },
        put: async (...args)=>{
            return await axiosRequest('put', ...args)
        },
        delete: async (...args)=>{
            return await axiosRequest('delete', ...args)
        },
        patch: async (...args)=>{
            return await axiosRequest('patch', ...args)
        }
    }
    
    self.fetch = async (url, opts) => {
        if(isUseProxy(url) && enable) {
            opts.agent = httpsAgent;
        }
        try {
            return await _fetch(url, opts);
        }catch (e) {
            if(enable && !isUseProxy(url)){
                addToPoxy(url)
                return await self.fetch(url, opts);
            }
            removeToPoxy(url)
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
                addToPoxy(options.url)
                return self.request(options, callBack);
            }
            removeToPoxy(options.url)
            callBack?.(e);
        }
    }

    self.proxyUrl = async (url)=>{
        const res = await self.axios.get(url, {responseType: "arraybuffer"})
        return {data: Buffer.from(res?.data || [], 'binary').toString('base64'), type: res?.headers?.['content-type']}
    }
    
    
    return self;
}
