'use strict';
const ProxyList =  require("free-proxy");
const proxy = new ProxyList();

module.exports = ()=>({
    listHttp: async ()=>{
        const data = await proxy.get();
        return data.sort((a,b)=>
            +a.speed_download > +b.speed_download ? -1 : +a.speed_download < +b.speed_download ? 1 : 0
        )
    }
})