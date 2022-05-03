'use strict';

const _request = require("request");
const _axios = require("axios");
const _fetch = require("make-fetch-happen");
const path = require("path");
const { SocksProxyAgent } = require('socks-proxy-agent')
const child_process = require("child_process");
const httpsAgent = new SocksProxyAgent('socks5://127.0.0.1:9050')
const { Blob } = require('buffer');
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

    const axiosRequest =  async (method, ...args)=> {
        if(enable) {
            args.push({httpsAgent: httpsAgent})
        }
        return await _axios[method]?.(...args)
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

    const fetchRequest = async (url, opts) => {
        const optsPrepared = { ...opts };

        if (enable) {
            optsPrepared.agent = httpsAgent;
        }

        return await _fetch(url, optsPrepared);
    };

    self.fetch = fetchRequest;

    self.request = !enable ? _request : _request.defaults({agent: httpsAgent})

    self.proxyUrl = async (url)=>{
        const res = await _axios.get(url, {httpsAgent: enable ? httpsAgent : null, responseType: "arraybuffer"})
        return {data: Buffer.from(res.data, 'binary').toString('base64'), type: res?.headers?.['content-type']}
    }
    
    return self;
}
