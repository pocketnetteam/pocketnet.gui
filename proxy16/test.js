process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.setMaxListeners(0);
var f = require('./functions');
const request = require('request-promise');
const urls = ["https://127.0.0.1:8887/ping", "https://127.0.0.1:8887/rpc/gettags?method=gettags", "https://127.0.0.1:8887/rpc/getlastcomments?method=getlastcomments"];
const { performance } = require('perf_hooks');
var _ = require('underscore')
var count = 1000
var time = 60000

var results = {}

var exe = function(){

    var all = []

    console.log('exe')

    for(var i = 0; i < count / urls.length; i++){

        all.push(new Promise((resolve, reject) => {

           

            const promises = urls.map((url) => {

                

                if(!results[url]) 
                    results[url] = {
                        time : [],
                        dt : [],
                        success : 0,
                        error : 0
                    }

                return new Promise((resolve, reject) => {

                    setTimeout(function(){

                        var start = performance.now()

                        return request(url).then(r => {

                            results[url].time.push(performance.now() - start)

                            var _r = JSON.parse(r)

                            if (_r.time){
                                results[url].dt.push(_r.time)
                            }
                                

                            results[url].success++
    
                            resolve()
        
                        }).catch(e => {
                            results[url].error++
    
                            resolve()
                        })

                    }, f.rand(0, 1000))

                   

                })
                    
               
            });

            Promise.all(promises).then((data) => {
                return resolve()
            }).catch(resolve);

        }))

    }

    return Promise.all(all)
    
}

var result = function(){
    var agr = {}
    
    console.log("RESULT")

    _.each(results, function(r, url){

        if(r.time.length && (r.success + r.error)){

            var l = r.dt.length

            agr[url] = {
                time : _.reduce(r.time, function(m, v){
                    return m + v
                }, 0) / r.time.length,


                dt : _.reduce(r.dt, function(m, v){

                    m.cache += v.cache / l
                    m.preparing += v.preparing / l
                    m.ready += v.ready / l
                    m.start += v.start / l

                    return m

                }, {
                    cache : 0,
                    preparing : 0,
                    ready : 0,
                    start : 0
                })
            } 


        
            console.log(url)
            console.log(agr[url].time)
            console.log(agr[url].dt)
            console.log('percent = ', r.success / (r.success + r.error))
            console.log('___')

        }

        
    })

   
}

var interval = setInterval(function(){
    result()
    if(time <= 0) {
        clearInterval(interval)
        console.log("FINISH")
        return
    }


    exe().catch(e => {
        console.log(e)
    })

    time = time - 1000
    
}, 1000)