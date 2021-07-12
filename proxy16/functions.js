var https = require('https');                                                
var Stream = require('stream').Transform;
var fs = require('fs');
var path = require('path');
var downloadRelease = require('download-github-release');
var md5 = require('md5');
var _ = require("underscore");
const random = require('random')
var f = {}

f.mix = function(array){
    _.each(array, function(vi, i){
        _.each(array, function(vj, j){
            if(i != j){
                vi[j] = vj
            }
        })
    })
}

f.esc = function(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
            default:
                return char;
        }
    });
}

f.path = function(_path){

    var iscli = process.argv.find(function(el) { return el == '--cli'; })

    if (iscli){
        return path.resolve('./', _path)
    }
    
    
    ////electron
    var isDevelopment = process.argv.find(function(el) { return el == '--development'; })

    if (isDevelopment){
        return path.resolve('./proxy16/', _path)
    }
    else{
        return path.join(path.dirname(process.execPath), _path)
    }

    
}

f.saveFile = function(filepath, buffer){
        
    return new Promise((resolve, reject) => {

        fs.unlink(f.path(filepath), function(err){

            console.log("ERR", err)

            fs.writeFile(f.path(filepath), buffer, (err) => {

                console.log("ERR2", err)
           
                if(err){
                    reject(err)
                }
                else{
                    resolve(filepath)
                }
            });

        })
        
    })

}

f.downloadgitrelease = function(name, p){
    var dest = p.dest || f.path('downloads')
    var fullname = path.resolve(dest, name)

    try{
        var stats = fs.statSync(fullname)

        if (p.check && !p.check(stats)){
            return Promise.resolve(fullname)
        }
    } 
    catch(e){ 
    }

   
    if(!fs.existsSync(dest)){
        try{
            fs.mkdirSync(dest, { recursive: true });
        }catch(e){
            return Promise.reject('downloadfoldererror')
        }
    }

    var filterAsset = function(asset) {
        return asset.name == name;
    }

    var filterRelease = function(release) {
        return release.prerelease === false
    }


    return downloadRelease('pocketnetteam', 'pocketnet.core', dest, filterRelease, filterAsset, false).then(function() {


        return Promise.resolve(fullname)
    })
}

f.download = function(url, filepath, p){

    return new Promise((resolve, reject) => {

        var dest = path.resolve('./downloads/',  filepath)
        var file = fs.createWriteStream(dest);

        /*fs.unlink(dest, function(e){

            if (e){
                reject(e)
                return
            }*/

            var request = https.get(url, function(response) {

                var len = parseInt(response.headers['content-length'], 10);
                var cur = 0;

                var obj = {
                    path : dest,
                    file : file,
                    progress : 0
                }

                response.pipe(file);

                response.on("data", function(chunk) {

                    cur += chunk.length;

                    obj.progress = (100.0 * cur / len)

                    if (p.progress) 
                        p.progress(obj.progress)

                });

                file.on('finish', function() {
                    file.close(function(){
                        if (p.finish) p.finish(obj)
                    });
                });

                resolve(obj)
            })
            
            request.on('error', function(e) {
                
                fs.unlink(dest); // Delete the file async. (But we don't check the result)

                reject(e)
            });

        //})

    })
    
}

f.downloadImage = function(url){

    return new Promise((resolve, reject) => {
        https.request(url, function(response) {                                        
            var data = new Stream();                                                    
        
            response.on('data', function(chunk) {                                       
                data.push(chunk);                                                         
            });                                                                         
        
            response.on('end', function() {    
                resolve(data.read())                            
            }); 

            response.on('error', function(e) { 
                reject(e)                        
            }); 
    
        }).end();
    })
}

f.deep = function(obj, key){
    var  _key = key.split(".");

    var tkey = _key[0];

    if(typeof obj == 'undefined' || !obj) return undefined;

    if(typeof obj[tkey] != 'undefined')
    {
        _key.splice(0, 1);

        if(_key.length == 0)
        {
            return obj[tkey];
        }
        else
        {
            return f.deep(obj[tkey], _key.join("."))
        }
    }
    else
    {
        return undefined;
    }
}

f.nowrev = function(date){
    var now = date ||(new Date);
    var UTCseconds = (now.getTime() - now.getTimezoneOffset()*60*1000);
    var d = new Date(UTCseconds);
        d.toString();	

    return d
}

f.time = function(){
    return Math.floor(Date.now() / 1000)
}

f.now = function(date){
    var now = date ||(new Date);
    var UTCseconds = (now.getTime() + now.getTimezoneOffset()*60*1000);
    var d = new Date(UTCseconds);
        d.toString();	

    return d
}

f.rand = function(min, max){
    min = parseInt(min);
    max = parseInt(max);
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

f.randmap = function(ar){

    if(!ar) return null
    
    ar = _.sortBy(ar, (r) => {return r.probability})

    var total = _.reduce(ar, function(sum, r){ return sum + r.probability }, 0)


    if(total <= 0) return ar[0]

    var seed = random.float(0, total)

    var counter = 0


    return _.find(ar, function(a){

        if(counter + a.probability > seed && counter <= seed){
            return true
        }

        counter = counter + a.probability
    })

}

f.makeid = function(){

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
  
    return  s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();

}

f.randomString = function (l) {
    if (!l) l = 8;

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < l; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

f.group = function(array, _function){
    var group = {};

    _.each(array, function(el, i){

        var index = _function(el, i);

        if(!index) return;

        if(!group[index])
            group[index] = [];

        group[index].push(el);

    })

    return group;
}

f.delay = function(time){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}


f.loop = function(obj, action){
    const isObject = val =>
        typeof val === 'object' && !Array.isArray(val);

    const paths = (obj = {}) => {

        _.each(obj, function(value, key)  {

            isObject(value) ? f.loop(value, action) : action(obj, key)

        });

    }

    return paths(obj);     
}

f.processArrayWithDelay = function(array, t, fn) {
    var results = [];
    return array.reduce(function(p, item) {
        return p.then(function() {
            return fn(item).then(function(data) {
                results.push(data);
                return f.delay(t, results);
            });
        });
    }, Promise.resolve());
 }

f.roughSizeOfObject = function(object){

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

f.retry = function(_function, clbk, time, totaltime){
    if(!time) time = 20;

    var totalTimeCounter = 0 

    var interval = setInterval(function(){

        if(_function() || (totaltime && totaltime >= totalTimeCounter)){

            clearInterval(interval);

            if(clbk) clbk();

        }

        totalTimeCounter += time

    }, time);
}

f.pretry = function(_function, time, totaltime){
    return new Promise((resolve, reject) => {

        f.retry(_function, resolve, time, totaltime)

    })
}

f.retryLazy = function(_function, clbk, time){
    if(!time) time = 200;

    var f = function(){
        _function(function(result){

            if(result){

                if(clbk) clbk();

            }

            else

            {
                setTimeout(f, time)
            }

        })
    }

    f();
}

f.slow = function(_function, timer, time){

    if (!time) time = 20

    if (timer)
        clearTimeout(timer);

        timer = setTimeout(_function, time);

    return timer;
}

f.lastelements = function(arr, length, eq){

    if(!length) length = 100
    if(!eq) eq = 0

    var d = arr.length - length

    if (d > eq){
        arr.splice(0, d)
    }
    return arr
}

f.validateHost = function(str){

    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str);

}


f.rot13 = function(str){
    var re = new RegExp("[a-z]", "i");
    var min = 'A'.charCodeAt(0);
    var max = 'Z'.charCodeAt(0);
    var factor = 13;
    var result = "";
    str = str.toUpperCase();
    
    for (var i=0; i<str.length; i++) {
        result += (re.test(str[i]) ?
        String.fromCharCode((str.charCodeAt(i) - min + factor) % (max-min+1) + min) : str[i]);
    }
    
    return result;
}

f.hash = function(str){
    return md5(str)
}

f.date = {
    addseconds : function(now, seconds){
        if(!now) now = new Date
     
        var ntime = now.getTime() + seconds * 1000
        var d = new Date(ntime);

        return d
    }
}

f.hexEncode= function(text){
    var ch = 0;
    var result = "";
    for (var i = 0; i < text.length; i++)
    {
        ch = text.charCodeAt(i);
        if (ch > 0xFF) ch -= 0x350;
        ch = ch.toString(16);
        while (ch.length < 2) ch = "0" + ch;
        result += ch;
    }
    return result;
}
f.hexDecode= function(hex){
    var ch = 0;
    var result = "";
    for (var i = 2; i <= hex.length; i += 2)
    {
        ch = parseInt(hex.substring(i - 2, i), 16);
        if (ch >= 128) ch += 0x350;
        ch = String.fromCharCode("0x" + ch.toString(16));
        result += ch;
    }
    return result;
} 


f.formatExchageKeys = function(obj) {
    const obj_keys = Object.keys(obj)
    let new_object = {}

    for(item of obj_keys) {
        const new_key = item.toUpperCase().replace('COIN-', '').replace('-', '_')

        new_object[new_key] = obj[item]
    }

    return new_object
}

f.getPkoinPrice = function(array, arrkey) {
    var response_keys = Object.keys(array)

    var pkoin_pairs = response_keys.filter(item => {
        return item.includes('PKOIN_') && !item.includes('_USDT') && !item.includes('_BTC')
    })

    var btc_usd_price = array['BTC_USDT'] ? array['BTC_USDT'][arrkey] : 0

    var pkoin_usd_price = array['PKOIN_USDT'] ? array['PKOIN_USDT'][arrkey] : 0
    var pkoin_btc_price = array['PKOIN_BTC'] ? array['PKOIN_BTC'][arrkey] * btc_usd_price : 0

    var highest_price = pkoin_usd_price > pkoin_btc_price ? pkoin_usd_price : pkoin_btc_price

    //Берем пары с PKOIN, переводим цену за них из других валют в доллары
    if(pkoin_pairs.length !== 0) {
        pkoin_pairs.forEach(item => {
            var currency = item.split('_')[1]
            var pair = array[item][arrkey]  // наивысшая цена в паре валют
            var price

            if (array[currency + '_USDT']) {
                price = array[currency + '_USDT'][arrkey] * pair

            } else if(array[currency + '_BTC']) {
                price = array[currency + '_BTC'] * btc_price * pair

            } else {
                price = 0
            }
             
            if(price) highest_price = highest_price < price ? price : highest_price
        })
    }

    var d = array
    var slice = {
        prices : {},
        date : f.now()
    }


    _.each(d, function(pair, i){

        if(i.indexOf("PKOIN_") > -1){

            var currency = i.split("_")[1]

            slice.prices[currency] = {
                currency : currency,
                data : pair
            }
        }

    })
    
    //делаем объект для USD на основе USDT
    var usd = _.clone(array['PKOIN_USDT'])

    if (typeof highest_price !== Number) {
        highest_price = parseFloat(highest_price, 10).toFixed(2)
    } 

    usd[arrkey] = highest_price

    slice.prices['USD'] = {
        currency : 'USD',
        data : usd
    }

    if(!_.isEmpty(slice.prices)) return Promise.resolve(slice)

    return Promise.reject('notfound')
}

module.exports = f