'use strict';

var http = require('http');
var https = require('https');

function RpcClient(opts) {
    opts = opts || {};
    this.host = opts.host || '127.0.0.1';
    this.port = opts.port || 38081;
    this.portPrivate = opts.portPrivate || 37071;
    this.user = opts.user || '';
    this.pass = opts.pass || '';
    this.protocol = opts.protocol === 'http' ? http : https;
    this.batchedCalls = null;
    this.disableAgent = opts.disableAgent || false;

    var isRejectUnauthorized = typeof opts.rejectUnauthorized !== 'undefined';
    this.rejectUnauthorized = isRejectUnauthorized ? opts.rejectUnauthorized : true;

    if (RpcClient.config.log) {
        this.log = RpcClient.config.log;
    } else {
        this.log = RpcClient.loggers[RpcClient.config.logger || 'normal'];
    }

}

var cl = console.log.bind(console);

var noop = function() {};

RpcClient.loggers = {
    none: { info: noop, warn: noop, err: noop, debug: noop },
    normal: { info: cl, warn: cl, err: cl, debug: noop },
    debug: { info: cl, warn: cl, err: cl, debug: cl }
};

RpcClient.config = {
    logger: 'normal' // none, normal, debug
};


const privates = {
    stop: true,
    listaddressgroupings: true,
    listaddresses: true,
    importprivkey: true,
    getbalance: true,
    getstakinginfo: true,
    getnewaddress: true,
    dumpwallet: true,
    importwallet: true,
    sendtoaddress: true,
}

const posts = {
    sendrawtransaction : true,
    sendrawtransactionwithmessage : true
}

const publics = {
    getcontents: true,
    getlastcomments: true,
    gettags: true,
    getrawtransactionwithmessagebyid: true,
    getrawtransactionwithmessage: true,
    getrawtransaction: true,
    getuserprofile:true,
    getuserstate: true,
    getaccountsetting: true,
    getaddressregistration: true,
    
    signrawtransactionwithkey: true,
    getrecommendedposts: true,
    gettime: true,
    getmissedinfo: true,
    gethotposts: true,
    getuseraddress: true,
    search: true,
    searchlinks: true,
    getcomments: true,
    sendcomment: true,
    getnodeinfo: true,
    getaddressscores: true,
    getaccountsetting : true,
    getpostscores:true,
    getpagescores:true,
    getrandomcontents : true,
    getrecomendedaccountsbysubscriptions : true,
    getrecomendedaccountsbyscoresonsimilaraccounts : true,
    getrecomendedaccountsbyscoresfromaddress : true,
    getrecomendedcontentsbyscoresfromaddress : true,
    getrecomendedaccountsbytags : true,
    getboostfeed : true,
    getprofilefeed : true,

    // BlockExplorer
    getblocktransactions: true,
    getaddressinfo: true,
    getaddresstransactions: true,
    gettransactions: true,
    getblock: true,
    getblocks: true,
    getlastblocks: true,
    getcompactblock: true,
    checkstringtype: true,
    getstatistic: true,
    getinfo : true,
    getpeerinfo : true,
    txunspent: true,
    estimatefee: true,
    estimatesmartfee: true,
    gettransaction : true,
    gethierarchicalstrip : true,
    gethistoricalstrip : true,
    getusercontents : true,
    getcontentstatistic : true,
    getuserstatistic : true,
    searchbyhash: true,
    getstatisticbyhours: true,
    getstatisticbydays: true,
    getstatisticcontentbyhours: true,
    getstatisticcontentbydays: true,
    getrecomendedcontentsbyscoresonsimilarcontents : true,
    getrecomendedcontentsbyscoresfromaddress : true,
}

const keepAliveAgent = new http.Agent({ keepAlive: true });

function rpca(request, obj){
    return new Promise(function(resolve, reject){

        try{
            rpc(request, function(err, res){

                if(err) return reject(err)
    
                resolve(res)
    
            }, obj)
        }
        catch(e) {

            reject({
                code : 500
            })

        }

    })
}

function rpc(request, callback, obj) {

    var m = request.method

    var prv = privates[request.method]
    var pbl = publics[request.method]
    var pst = posts[request.method]
    var timeout = 45000
    var self = obj;

    try{
        request = JSON.stringify(request);
    }
    catch(e){

        callback({
            code : 499
        });

        return
    }
    
    var signal = null

    ///need to test
    if (typeof AbortController != 'undefined'){

        var ac = new AbortController();
            signal = ac.signal

        setTimeout(function(){

            if(!called){
                ac.abort();
            }

            ac = null

        }, timeout)
    }

    var options = {
        host: self.host,
        path: pst ? '/post/' : (pbl ? '/public/' : '/'),
        method: 'POST',
        port: prv ? self.portPrivate : self.port,
        agent: keepAliveAgent,
        signal : signal,
    };

    var lg = false //self.host == '135.181.196.243' || self.host == '65.21.56.203' || self.host == '51.174.99.18'

    if (self.httpOptions) {
        for (var k in self.httpOptions) {
            options[k] = self.httpOptions[k];
        }
    }

    var called = false;
    var errorMessage = 'Bitcoin JSON-RPC: ';

    
   
    var req = self.protocol.request(options, function(res) {

        var buf = '';
        var parsedBuf = null;
        var exceededError = null

        res.on('data', function(data) {
            buf += data;

        });

        res.on('end', function() {

            if (called) {
                return;
            }

            if (res.statusCode === 401) {

                exceededError = {
                    error : errorMessage + 'Connection Rejected: 401 Unnauthorized',
                    code : 401
                } 

            }

            if (res.statusCode === 403) {

                exceededError = {
                    error : errorMessage + 'Connection Rejected: 403 Forbidden',
                    code : 403
                } 

            }

            if (res.statusCode === 500 && buf.toString('utf8') === 'Work queue depth exceeded') {

                exceededError = {
                    error : 'Bitcoin JSON-RPC: ' + buf.toString('utf8'),
                    code : 429
                } 

            }

            if(!exceededError){

                try {
                    parsedBuf = JSON.parse(buf);
                } 
                catch (e) {
                    exceededError = {
                        error : 'Error Parsing JSON: ' + e.message,
                        code : res.statusCode || 500
                    }   
                }

            }

            if (exceededError){

                if(lg) console.log("exceededError", self.host, m, exceededError, buf)

                res.resume()

                callback(exceededError);
            }
            else{
                callback(parsedBuf.error, parsedBuf);
            }
            
            buf = '';
            parsedBuf = null;
            exceededError = null;

            called = true;

        });

    }).on('error', function(e) {

        if(!called) {

            if(lg) console.log("requesterror", self.host, m, e)
            

            callback({
                code : 408,
                error : 'requesterror'
            });

            called = true;
        }
        
    }).setTimeout(timeout, function(){

        if(!called) {

            if(lg) console.log("timeout", self.host, m)

            callback({
                code : 408,
                error : 'timeout'
            });

            called = true;
        }

        req.destroy()
    })

    req.setHeader('Content-Length', request.length);
    req.setHeader('Content-Type', 'application/json');

    if (prv) {
        req.setHeader('Authorization', 'Basic ' + Base64Helper.encode(self.user + ':' + self.pass));
    }

    req.write(request);
    req.end();
}

RpcClient.prototype.batch = function(batchCallback, resultCallback) {
    this.batchedCalls = [];
    batchCallback();
    rpc.call(this, this.batchedCalls, resultCallback);
    this.batchedCalls = null;
};

RpcClient.callspec = {
    createMultiSig: '',
    createRawTransaction: 'obj obj',
    decodeRawTransaction: '',
    estimateFee: 'int',
    estimateSmartFee: 'int str',
    estimatePriority: 'int',
    generate: 'int',
    getAccountAddress: 'str',
    getAddedNodeInfo: '',
    getAddressMempool: 'obj',
    getAddressUtxos: 'obj',
    getAddressBalance: 'obj',
    getAddressDeltas: 'obj',
    getAddressTxids: 'obj',
    getBalance: 'str int',
    getstakinginfo: '',
    getBestBlockHash: '',
    getBlockDeltas: 'str',
    getBlock: 'str bool',
    getBlockchainInfo: '',
    getBlockCount: '',
    getBlockHashes: 'int int obj',
    getBlockHash: 'int',
    getBlockHeader: 'str',
    getBlockNumber: '',
    getBlockTemplate: '',
    getConnectionCount: '',
    getChainTips: '',
    getDifficulty: '',
    getGenerate: '',
    getHashesPerSec: '',
    getInfo: '',
    getMemoryPool: '',
    getMemPoolEntry: 'str',
    getMemPoolInfo: '',
    getMiningInfo: '',
    getNetworkInfo: '',
    getPeerInfo: '',
    getRawMemPool: 'bool',
    getRawTransaction: 'str int',
    getSpentInfo: 'obj',
    getTransaction: '',
    getTxOut: 'str int bool',
    getTxOutSetInfo: '',
    //getWalletInfo: '',
    getWork: '',
    help: '',
    //importAddress: 'str str bool',
    importPrivKey: 'str str bool',
    invalidateBlock: 'str',
    keyPoolRefill: '',
    //listAccounts: 'int',
    listaddressgroupings: '',
    getnewaddress: '',
    listaddresses: '',
    listReceivedByAccount: 'int bool',
    listReceivedByAddress: 'int bool',
    listSinceBlock: 'str int',
    listTransactions: 'str int int',
    listUnspent: 'int int',
    txunspent: 'obj int int',
    listLockUnspent: 'bool',
    lockUnspent: '',
    move: 'str str float int str',
    prioritiseTransaction: 'str float int',
    //sendFrom: 'str str float int str str',
    //sendMany: 'str obj int str',
    sendRawTransaction: 'str',
    sendrawtransactionwithmessage: 'str obj str',
    sendtoaddress: 'str float str str',
    //setAccount: '',
    setGenerate: 'bool int',
    getreputations: '',
    getrandomcontents : 'str',
    getrecomendedcontentsbyscoresfromaddress : 'str obj int int int',
    getrecomendedaccountsbytags : 'obj int',
    getcontents: 'str',
    getlastcomments: 'str str str',
    gettags: 'str',
    getrawtransactionwithmessagebyid: 'obj',
    getrawtransactionwithmessage: 'str',
    getuserprofile: 'obj',
    getuserstate: 'str',
    getaccountsetting: 'str',
    getaddressregistration: 'obj',
    signrawtransactionwithkey: 'str obj',
    getrecommendedposts: 'str',
    gettime: '',
    getmissedinfo: 'str int',
    gethotposts: 'str str str str',
    getuseraddress: 'str int',
    search: 'str str str',
    searchlinks: 'obj str int int',
    getcomments: 'str',
    sendcomment: 'str str str str str',
    getnodeinfo: '',
    getaddressscores: 'str',
    getaccountsetting : 'str',
    getpostscores: 'str',
    getpagescores: 'obj str',

    getboostfeed : 'int str int str obj str str str obj',
    getprofilefeed : 'int str int str obj str str str obj',
    gethierarchicalstrip : 'int str int str obj str str str obj',
    gethistoricalstrip : 'int str int str obj str str str str obj',
    getusercontents : 'str int str int obj str',
    getcontentsstatistic : 'obj str int int',
    // BlockExplorer
    getblocktransactions: 'str int int',
    getaddressinfo: 'str',
    getaddresstransactions: 'str int int int',
    gettransactions: 'obj',
    getblocks: 'int int int',
    getlastblocks: 'int int',
    checkstringtype: 'str',
    getstatistic: 'int int',
    getuserstatistic : 'obj int int',

    getrecomendedaccountsbysubscriptions : 'str',
    getrecomendedaccountsbyscoresonsimilaraccounts : 'str',
    getrecomendedaccountsbyscoresfromaddress : 'str',
    getrecomendedcontentsbyscoresonsimilarcontents : 'str obj int int',
    getrecomendedcontentsbyscoresfromaddress : 'str obj int int int',
    
    getcompactblock: "str int",
    searchbyhash: "str",
    getstatisticbyhours: 'int int',
    getstatisticbydays: 'int int',
    getstatisticcontentbyhours : 'int int',
    getstatisticcontentbydays : 'int int',
    
    // Control
    stop: '',
    dumpwallet: 'str',
    importwallet: 'str',
};

var slice = function(arr, start, end) {
    return Array.prototype.slice.call(arr, start, end);
};

function generateRPCMethods(constructor, apiCalls, rpc) {

    function createRPCMethod(methodName, argMap) {
        return function(parameters) {

            if(!parameters) parameters = []

            var limit = parameters.length;

            if (this.batchedCalls) {
                limit = parameters.length;
            }

            for (var i = 0; i < limit; i++) {
                if (argMap[i]) {
                    parameters[i] = argMap[i](parameters[i]);
                }
            }

            if (this.batchedCalls) {
                this.batchedCalls.push({
                    jsonrpc: '2.0',
                    method: methodName,
                    params: slice(parameters),
                    id: getRandomId()
                });

                return Promise.resolve()
                
            } else {

                return rpca({
                    method: methodName,
                    params: slice(parameters, 0, parameters.length),
                    id: getRandomId()
                }, this);
            }

        };
    };

    var types = {
        str: function(arg) {
            return (arg || "").toString();
        },
        int: function(arg) {
            return parseFloat(arg || "0");
        },
        float: function(arg) {
            return parseFloat(arg || "0");
        },
        bool: function(arg) {
            return (arg === true || arg == '1' || arg == 'true' || arg.toString().toLowerCase() == 'true');
        },
        obj: function(arg) {
            if (typeof arg === 'string') {
                var r = ''

                try {

                    r = JSON.parse(arg);
                } catch (e) {}

                return r
            }
            return arg || ""
        }
    };

    for (var k in apiCalls) {
        var spec = apiCalls[k].split(' ');
        for (var i = 0; i < spec.length; i++) {
            if (types[spec[i]]) {
                spec[i] = types[spec[i]];
            } else {
                spec[i] = types.str;
            }
        }
        var methodName = k.toLowerCase();
        constructor.prototype[k] = createRPCMethod(methodName, spec);
        constructor.prototype[methodName] = constructor.prototype[k];
    }

}

function getRandomId() {
    return parseInt(Math.random() * 1000000000);
}

generateRPCMethods(RpcClient, RpcClient.callspec, rpc);

module.exports = RpcClient;