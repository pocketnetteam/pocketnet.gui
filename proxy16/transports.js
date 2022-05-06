'use strict';

const _request = require("request");
const _axios = require("axios");
const _fetch = require("node-fetch")
const path = require("path");
const { SocksProxyAgent } = require('socks-proxy-agent')
const child_process = require("child_process");
const httpsAgent = new SocksProxyAgent('socks5://127.0.0.1:9050')

const getPathTor = ()=>{
    const  isDevelopment = process.argv.some(function(el) { return el === '--development'; })
    let pathTor = "";
    switch (process.platform){
        case 'win32':
            pathTor = "tor/win/tor.exe"
            break;
        case 'linux':
            pathTor = "tor/linux/tor"
            break;
        case 'darwin':
            if(process.arch === "arm64") {
                pathTor = "tor/m1/tor"
            }else {
                pathTor = "tor/osx/tor"
            }
            pathTor = (isDevelopment ? "" : "../") + pathTor;
            break;
    }
    return path.join(isDevelopment ? __dirname : "", pathTor)
}

global.USE_PROXY_NODE = true

module.exports = function (){
    const enable = global.USE_PROXY_NODE;
    const self = {};
    self.tor = {};
    self.proxyHosts = []
    self.lastUpdate = Date.now();
    self.tor.path = getPathTor();
    
    self.runTor = async (eventCallBack)=>{
        const log = async (data)=>{
            eventCallBack?.(data)
        }
        self.tor.instance = child_process.spawn(self.tor.path, [], { stdio: ['ignore'], detached : false, shell : false})
        self.tor.instance.on("error", (err)=>log({error: err}));
        self.tor.instance.on("exit", (code) => log({exit: code}));
        self.tor.instance.stderr.on("data", (chunk) => log({error: String(chunk)}));
        self.tor.instance.stdout.on("data", (chunk) => log({data: String(chunk)}));
    }

    self.stopTor = async ()=>{
        if(self.tor?.instance?.pid){
            self.tor?.instance.kill(9)
        }
    }
    
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

    self.request = async (options, callBack)=>{
        let req = _request;
        if(isUseProxy(options.url) && enable) {
            req = _request.defaults({agent: httpsAgent});
        }
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
        }catch (e) {
            if(enable && !isUseProxy(options.url)){
                addToPoxy(options.url)
                return await self.request(options, callBack);
            }
            removeToPoxy(options.url)
            callBack(e);
        }
    }

    self.proxyUrl = async (url)=>{
        const res = await self.axios.get(url, {responseType: "arraybuffer"})
        return {data: Buffer.from(res?.data || [], 'binary').toString('base64'), type: res?.headers?.['content-type']}
    }
    
    
    return self;
}
