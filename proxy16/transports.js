'use strict';

const _request = require("request");
const _axios = require("axios");
const { SocksProxyAgent } = require('socks-proxy-agent')
const httpsAgent = new SocksProxyAgent('socks5://127.0.0.1:9050')

module.exports = function (enable){
    const self = {};
    
    const axiosRequest =  async (method, ...args)=> {
        return enable ? await _axios[method]?.(...args) : await _axios[method]?.({...{httpsAgent: httpsAgent}, ...args})
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
    
    self.request = !enable ? _request : _request.defaults({agent: httpsAgent})
    
    return self;
}