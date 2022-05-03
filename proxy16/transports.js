'use strict';

const _request = require("request");
const _axios = require("axios");
const path = require("path");
const fs = require("fs");
const { SocksProxyAgent } = require('socks-proxy-agent')
const child_process = require("child_process");
const {Notification} = require("electron");
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

module.exports = function (enable){
    const self = {};
    self.tor = {};
   
    self.tor.path = getPathTor();
    self.runTor = async (eventCallBack)=>{
        const log = async (data)=>{
            eventCallBack?.(data)
        }
        self.tor.instance = child_process.spawn(self.tor.path, [], { stdio: ['ignore'], detached : false, shell : false})
        self.tor.instance.on("error", (err)=>log(err));
        self.tor.instance.on("exit", (code) => log(code));
        self.tor.instance.stderr.on("data", (chunk) => log(String(chunk)));
        self.tor.instance.stdout.on("data", (chunk) => log(String(chunk)));
    }

    // TODO: Remove from here
    self.runTor();


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