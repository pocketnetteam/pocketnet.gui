'use strict';
const ProxyList =  require("free-proxy");
const _request = require("request");
const _axios = require("axios");
const proxy = new ProxyList();

module.exports = function (){
    const self = {};

    self.proxies = []

    const listProxy = async ()=>{
        const data = await proxy.get();
        return data?.sort((a,b)=>
            +a.speed_download > +b.speed_download ? -1 : +a.speed_download < +b.speed_download ? 1 : 0
        )?.slice(0, 10) ?? [];
    }

    const requestQueue = async ()=>{
        if(self.proxies?.length < 3){
            self.proxies = await listProxy();
        }
        const queue =  Array(3).fill({proxy: null})
        if(self.proxies?.length) {
            queue.concat(Array(3).fill({proxy: self.proxies?.shift?.()}))
        }
        return queue;
    }
    
    const axiosRequest =  async (method, ...args)=> {
        const queues = await requestQueue();
        let error = {};
        for (const queue of queues) {
            const axi = queue.proxy ?
                require('axios').create({
                    proxy: {
                        host: queue.proxy?.ip,
                        port: +queue.proxy?.port
                    }
                }) : _axios;
            try {
                return await axi[method]?.(...args)
            } catch (e) {
                error = e;
            }
        }
        throw error
    }
    
    self.axios = {
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
    
    self.request = async (options, callBack)=>{
        const queues = await requestQueue();
        let error = "";
        for(const queue of queues){
            const req = queue.proxy ? require('request').defaults({ proxy: queue.proxy?.url}) : _request;
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
        callBack(error)
    }
    
    return self;
}