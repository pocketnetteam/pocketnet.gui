'use strict';
const ProxyList =  require("free-proxy");
const _request = require("request");
const _axios = require("axios");
const proxyList = require('get-free-https-proxy');

module.exports = function (enable){
    const apiKey = "NDYzNg.YmmzPw.239Is-uAjA5q63f70JxxK1AwdOQ";
    const self = {};

    self.proxyServers = []
    self.proxyHosts = []
    self.disabledHost = []
    self.lastUpdate = Date.now();

    self.listProxy = async ()=>{

        const res = await _axios.get(`https://www.proxyscan.io/api/proxy?limit=20&type=http,https`)
        const data = res.data.sort((a,b)=>
            +a.Ping > +b.Ping ? 1 : +a.Ping < +b.Ping ? -1 : 0
        ).map(el=>({host: el.Ip, port:el.Port}))
        console.log(data)
        return data?.slice(0, 3) ?? [];
    }

    const requestQueue = async (host)=>{
        if((self.lastUpdate + 60*60*1000) < Date.now()){
            self.proxyServers = [];
            self.disabledHost = [];
            self.lastUpdate = Date.now();
            self.proxyServers = await self.listProxy();
        }
        if(self.disabledHost.some(el=>el===host)){
            return [{proxy: null}]
        }

        if(!self.proxyServers?.length){
            self.proxyServers = await self.listProxy();
        }

        if(self.proxyHosts.some(el=>el===host)){
            return self.proxyServers?.map(el=>({proxy: el})) ?? []
        }
        
        let queue =  Array(3).fill({proxy: null})
        if(self.proxyServers?.length) {
            queue.push(...self.proxyServers?.map(el=>({proxy: el}) ?? []))
        }
        return queue;
    }
    
    const axiosRequest =  async (method, ...args)=> {
        if(!enable){
            return await _axios[method]?.(...args)
        }
        const url = new URL(args?.[0])
        const queues = await requestQueue(url.host);
        let error = {};
        for (const queue of queues) {
            if(queue.proxy){
                pushHost('proxy', url.host)
            }
            const axi = queue.proxy ?
                require('axios').create({
                    proxy: {
                        host: queue.proxy?.host,
                        port: +queue.proxy?.port
                    }
                }) : _axios;
            try {
                return await axi[method]?.(...args)
            } catch (e) {
                error = e;
            }
        }
        pushHost('disable', url.host)
        throw error
    }
    
    const pushHost = (type, host)=>{
        self.proxyHosts = self.proxyHosts.filter(el=>el !== host)
        self.disabledHost = self.disabledHost.filter(el=>el !== host)
        switch (type){
            case 'proxy':
                self.proxyHosts.push(host)
                break;
            default :
                self.disabledHost.push(host)
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
    
    self.request = enable ? async (options, callBack)=>{
        const url = new URL(options?.url)
        const queues = await requestQueue(url?.host);
        let error = "";
        for(const queue of queues){
            if(queue.proxy){
                pushHost('proxy', url?.host)
            }
            const req = queue.proxy ? require('request').defaults({ proxy: `https://${queue?.proxy?.host}:${queue?.proxy?.port}`}) : _request;
            try {
                const data = await new Promise((resolve, reject) => {
                    req(options, (...args)=>{
                        if(args[0]){
                            reject(args[0])
                        }else {
                            resolve(args)
                        }
                    })
                })
                callBack(...data)
                return;
            }catch (e){
                error = e;
            }
        }
        pushHost('disable', url?.host)
        callBack(error)
    } : _request
    
    return self;
}