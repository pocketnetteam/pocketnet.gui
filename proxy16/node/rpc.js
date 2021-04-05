'use strict';

var http = require('http');
var https = require('https');

function RpcClient(opts) {
    opts = opts || {};
    this.host = opts.host || '127.0.0.1';
    this.port = opts.port || 8332;
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

function rpca(request, obj){
    return new Promise(function(resolve, reject){
        
        rpc(request, function(err, res){

            if(err) return reject(err)

            resolve(res)
        }, obj)
    })
}

var posts = {
    sendrawtransaction : true,
    sendrawtransactionwithmessage : true
}

var publics = {
    getcontents: true,
    getlastcomments: true,
    gettags: true,
    getrawtransactionwithmessagebyid: true,
    getrawtransactionwithmessage: true,
    getrawtransaction: true,
    getuserprofile:true,
    getuserstate: true,
    getaddressregistration: true,
    
    signrawtransactionwithkey: true,
    getrecommendedposts: true,
    gettime: true,
    getmissedinfo: true,
    gethotposts: true,
    getuseraddress: true,
    search: true,
    getcomments: true,
    sendcomment: true,
    getnodeinfo: true,
    getaddressscores: true,
    getpostscores:true,
    getpagescores:true,

    // BlockExplorer
    getblocktransactions: true,
    getaddressinfo: true,
    getaddresstransactions: true,
    gettransactions: true,
    getblocks: true,
    getlastblocks: true,
    checkstringtype: true,
    getstatistic: true,
    getinfo : true,
    getpeerinfo : true,
    txunspent: true,
    estimatefee: true,
    estimatesmartfee: true,
    gettransaction : true,
    gethierarchicalstrip : true
}

function rpc(request, callback, obj) {

    var m = request.method

    var pbl = publics[request.method]
    var pst = posts[request.method]

    var self = obj;
    request = JSON.stringify(request);
    var auth = new Buffer(self.user + ':' + self.pass).toString('base64');


    var options = {
        host: self.host,
        path: pst ? '/post/' : (pbl ? '/public/' : '/'),
        method: 'POST',
        port: self.port,
        //rejectUnauthorized: self.rejectUnauthorized,
        agent: self.disableAgent ? false : undefined,
        timeout: 5000
    };

    if (self.httpOptions) {
        for (var k in self.httpOptions) {
            options[k] = self.httpOptions[k];
        }
    }

    var called = false;

    var errorMessage = 'Bitcoin JSON-RPC: ';

    var req = self.protocol.request(options, function(res) {

        var buf = '';
        res.on('data', function(data) {
            buf += data;
        });

        res.on('end', function() {

            if (called) {
                return;
            }
            called = true;


            if (res.statusCode === 401) {

                var exceededError = new Error(errorMessage + 'Connection Rejected: 401 Unnauthorized');
                    exceededError.code = 401;

                callback(exceededError);
                return;
            }
            if (res.statusCode === 403) {
                var exceededError = new Error(errorMessage + 'Connection Rejected: 403 Forbidden');
                    exceededError.code = 403;

                callback(exceededError);

                return;
            }
            if (res.statusCode === 500 && buf.toString('utf8') === 'Work queue depth exceeded') {

                var exceededError = new Error('Bitcoin JSON-RPC: ' + buf.toString('utf8'));

                exceededError.code = 429;

                callback(exceededError);
                return;
            }

            var parsedBuf;
            try {
                parsedBuf = JSON.parse(buf);
            } catch (e) {

                var exceededError = new Error(errorMessage + 'Error Parsing JSON: ' + e.message);
                    exceededError.code = res.statusCode

                callback(exceededError);

                return;
            }

            callback(parsedBuf.error, parsedBuf);

        });
    });

    req.on('error', function(e) {
        var err = new Error(errorMessage + 'Request Error: ' + e.message);

        if (!called) {

            err.code = /*e.code ||*/ 408

            called = true;
            callback(err);
        }
    });

    req.setHeader('Content-Length', request.length);
    req.setHeader('Content-Type', 'application/json');

    if(!pbl)
        req.setHeader('Authorization', 'Basic ' + auth);

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
    listAddressGroupings: '',
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
    //sendToAddress: 'str float str str',
    //setAccount: '',
    setGenerate: 'bool int',
    getreputations: '',


    getcontents: 'str',
    getlastcomments: 'str str str',
    gettags: 'str',
    getrawtransactionwithmessagebyid: 'obj',
    getrawtransactionwithmessage: 'str',
    getuserprofile: 'obj',
    getuserstate: 'str',
    getaddressregistration: 'obj',
    signrawtransactionwithkey: 'str obj',
    getrecommendedposts: 'str',
    gettime: '',
    getmissedinfo: 'str int',
    gethotposts: 'str str str',
    getuseraddress: 'str int',
    search: 'str str str',
    getcomments: 'str',
    sendcomment: 'str str str str str',
    getnodeinfo: '',
    getaddressscores: 'str',
    getpostscores: 'str',
    getpagescores: 'obj str',
    gethierarchicalstrip : 'int str int str obj',

    // BlockExplorer
    getblocktransactions: 'str int int',
    getaddressinfo: 'str',
    getaddresstransactions: 'str int int int',
    gettransactions: 'obj',
    getblocks: 'int int int',
    getlastblocks: 'int int',
    checkstringtype: 'str',
    getstatistic: 'int int',
    
    // Control
    stop: '',

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
    return parseInt(Math.random() * 100000);
}

generateRPCMethods(RpcClient, RpcClient.callspec, rpc);

module.exports = RpcClient;