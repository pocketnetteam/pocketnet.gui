'use strict';

const _request = require("request");
const _axios = require("axios");
const _fetch = require("node-fetch")
const path = require("path");
const { SocksProxyAgent } = require('socks-proxy-agent')
const child_process = require("child_process");
const httpsAgent = new SocksProxyAgent('socks5://127.0.0.1:9050')
const fs = require('fs/promises');

const getPathTor = ()=>{
    const  isDevelopment = process.argv.some(function(el) { return el === '--development'; })
    let torPath = {
        path: "",
        binary: "",
    };
    switch (process.platform){
        case 'win32':
            torPath.path = "tor/win/"
            torPath.binary = "tor.exe"
            break;
        case 'linux':
            torPath.path = "tor/linux/"
            torPath.binary = "tor"
            break;
        case 'darwin':
            torPath.binary = "tor"
            if(process.arch === "arm64") {
                torPath.path = "tor/m1/"
            }else {
                torPath.path = "tor/osx/"
            }
            torPath.path = (isDevelopment ? "" : "../") + torPath.path;
            break;
    }
    torPath.path = path.join(isDevelopment ? __dirname : "", torPath.path)
    return torPath;
}

module.exports = function (){
    let enable = false
    const self = {};
    self.tor = {};
    self.proxyHosts = []
    self.lastUpdate = Date.now();
    self.tor.path = getPathTor();
    
    self.runTor = async (eventCallBack)=>{
        enable = true;
        const log = async (data)=>{
            eventCallBack?.(data)
        }
        try {
            const pid = await fs.readFile(path.join(self.tor.path.path, "tor.pid"), {encoding: "utf-8"})
            process.kill(+pid.toString(), 9)
            await fs.unlink(path.join(self.tor.path.path, "tor.pid"))
        }catch (e) {}
        self.tor.instance = child_process.spawn(path.join(self.tor.path.path, self.tor.path.binary), [], { stdio: ['ignore'], detached : false, shell : false})
        self.tor.instance.on("error", (err)=>log({error: err}));
        self.tor.instance.on("exit", async (code) => {
            try {
                await fs.unlink(path.join(self.tor.path.path, "tor.pid"))
            }catch (e) {}
            log({exit: code})
        });
        self.tor.instance.stderr.on("data", (chunk) => log({error: String(chunk)}));
        self.tor.instance.stdout.on("data", (chunk) => log({data: String(chunk)}));
        if (self?.tor?.instance?.pid){
            try {
                await fs.writeFile(path.join(self.tor.path.path, "tor.pid"), self?.tor?.instance?.pid.toString(), { encoding: "utf-8"});
            }catch (e) {
                console.error(e)
                throw "Error write pid file for tor"
            }
        }
    }

    self.stopTor = async ()=>{
        enable = false;
        let pid = ""
        try {
            pid = await fs.readFile(path.join(self.tor.path.path, "tor.pid"), {encoding: "utf-8"})
        }catch (e) {
            if(self.tor?.instance){
                pid = self.tor.instance.pid;
            }else{
                throw "Error read pid file for tor"
            }
        }
        if(pid) {
            process.kill(+pid.toString(), 9)
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
