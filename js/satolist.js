var electron = null
if (typeof _OpenApi == 'undefined') _OpenApi = false;

if (typeof _Electron != 'undefined') {
    electron = require('electron');

    var storage = electron.OSBrowser; //?

    $('html').addClass('electron')
}


Platform = function (app, listofnodes) {

    var self = this;

    self.app = app;
    
    self.lasttimecheck = null
    self.real = {
        'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd' : true,
        'PLJvEixJkj85C4jHM3mt5u1ATwZE9zgFaA' : true,
        'PRTugzBefzB1AA2Rw8VTBKf3BBPDjQND8y' : true,
        'PCVt7H4vgjBDxifLz3uokbc1tD3MZwWwQh' : true,
        'PJ3nv2jGyW2onqZVDKJf9TmfuLGpmkSK2X' : true,
        'PLH8biT5rMdvE1zXFhsvNkzphVRK6cNM7p' : true,
        'P92gc46iqLhCswPsbLxH7wjTfh9rhhNSux' : true,
        'PXUYsENSv6QkQZEdiJTsfJmu3XxZvVmVfQ' : true,
        'PXXaSczoZcuJEwxYKhaC9pV1JBvwi6UjSw' : true,
        'PFV4UT9fhHsqkmCGsWsSCr55Pr1SMX6NL2' : true,
        'PTcArXMkhsKMUrzQKn2SXmaVZv4Q7sEpBt' : true,
        'PL9U1q1JmJezPh8GQb5dj5h5GavuCGcjYk' : true,
        'PS4pYW4tpu6fwviz63CHLMxPA37fJ3GLvn' : true,
        'PHmvLy9b5m2b7fvU7MSTw4mAkdshhdY4Nt' : true,
        'PVpSK2qQXmG1SjAMJVMAMRLUkrzMjsJouL' : true,
        'P8boyun9yF6QYn1fjGC1WABt4BQUL4STeh' : true,
        'PA6biduJbWcQ97n5jz2jUqWHtenLpWTH7s' : true,
        'P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m' : true,
        'PUYo1a6LxjnnBVi6uBjHUsZQS4FnbUwdAN' : true,
        'PLFtS8H7ATooK53xRTw7YHsuK7jsn5tHgi' : true,
        'PVJDtKPnxcaRDoQhqQj7FMNu46ZwB4nXVa' : true
        //'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82' : true // test
    }
    

    self.testaddresses = ['PAdUsDtP9onjpwHHxhbxxRcjtxD9fsW9Su', 'PRaYPD2NAVMcEXcUu2GsEQwqsG8md8H2dr', 'PHr8g7b4gJdSkiJFmQeoND2X8tRUKvB2An', 'PEwL86dE6MuKKaGPxooGyFCKocUP8B6jw8', 'PFV4UT9fhHsqkmCGsWsSCr55Pr1SMX6NL2', 'PRTugzBefzB1AA2Rw8VTBKf3BBPDjQND8y', 'P92gc46iqLhCswPsbLxH7wjTfh9rhhNSux', 'PSWxzYS4Y37tmnZ9oxKfm9ffVqLRBbFbjH', 'PHvQEGtYYpDpmHYuUwA4gF4ey1YitF2NRW', 'PA6biduJbWcQ97n5jz2jUqWHtenLpWTH7s', 'PKpdrwDVGfuBaSBvboAAMwhovFmGX8qf8S', 'PKerxto9tFT8dZJrNWFsimA3sBdBAkXsrE', 'PQsvaeBWB5WX3BsdWcNFmP1wy61P3gpRKf', 'PKerxto9tFT8dZJrNWFsimA3sBdBAkXsrE', 'PHNKYionoaBRVudUhqWzNrJyqxVxaDYqT7', 'PVCUYATJxi4yNM2sqThPxd3P6jJDrvuWJs', 'PLJvEixJkj85C4jHM3mt5u1ATwZE9zgFaA', 'PShAyCoM32HEEHqrdEYvQ1wRjeqZsmWqDa', 'PKLWLXN6kwmdkbYG981gyPj5jb7bgzhstj', 'PHdW4pwWbFdoofVhSEfPSHgradmrvZdbE5', 'P9jDYvkXHw4FtRZof661ddzmMyFRqGUjwN', 'P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m', 'PFnN8SExxLsUjMKzs2avdvBdcA3ZKXPPkF', 'PSRFH9Ctq4wV1THes39izo3J4dHybLyT32', 'PVgqi72Qba4aQETKNURS8Ro7gHUdJvju78', 'P9tRnx73Sw1Ms9XteoxYyYjvqR88Qdb8MK', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz', 'PEHrffuK9Qiqs5ksqeFKHgkk9kwQN2NeuS', 'PP582V47P8vCvXjdV3inwYNgxScZCuTWsq', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz','PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM', 'PK6Kydq5prNj13nm5uLqNXNLFuePFGVvzf', 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82', 'PCAyKXa52WTBhBaRWZKau9xfn93XrUMW2s', 'PCBpHhZpAUnPNnWsRKxfreumSqG6pn9RPc', 'PEkKrb7WJgfU3rCkkU9JYT8jbGiQsw8Qy8', 'PBHvKTH5TGQYDbRHgQHTTvaBf7tuww6ho7', 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd']

    self.testchataddresses = ['P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m', 'PFnN8SExxLsUjMKzs2avdvBdcA3ZKXPPkF', 'PVgqi72Qba4aQETKNURS8Ro7gHUdJvju78', 'P9tRnx73Sw1Ms9XteoxYyYjvqR88Qdb8MK', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz', 'PEHrffuK9Qiqs5ksqeFKHgkk9kwQN2NeuS', 'PP582V47P8vCvXjdV3inwYNgxScZCuTWsq', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz','PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM', 'PK6Kydq5prNj13nm5uLqNXNLFuePFGVvzf', 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82', 'PCAyKXa52WTBhBaRWZKau9xfn93XrUMW2s', 'PCBpHhZpAUnPNnWsRKxfreumSqG6pn9RPc', 'PEkKrb7WJgfU3rCkkU9JYT8jbGiQsw8Qy8', 'PBHvKTH5TGQYDbRHgQHTTvaBf7tuww6ho7', 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd']

    self.focus = true;
    self.currentBlock = 0 //1165858;
    self.online = undefined;
    self.avblocktime = 45;
    self.repost = true;
    self.videoenabled = true;


    //////////////
    self.test = false;
    //////////////

    var onlinetnterval;
    var unspentoptimizationInterval = null;
   // var blockps = self.currentBlock - 30000;
    var nshowed = false;
    var TXFEE = 1;

    var smulti = 100000000

    var sm = new nModule();
        sm.ajax = app.ajax;
        sm.app = app;
        sm.user = app.user;

    self.released = {
        vidgets : {
            staking : true
        }
    }

    /*self.network = function(){
        if(self.test){
            return bitcoin.networks.testnet
        }
        else{
            return bitcoin.networks.bitcoin
        }
    }*/

    self.mp = {
        dollars: function (value, p) {
            if (!p) p = {};

            if (typeof p.precision == 'undefined')
                p.precision = 2;

            p.allowNegative = false;

            if (typeof p.prefix == 'undefined')
                p.prefix = "$&nbsp;";

            p.value = Number(value).toFixed(p.precision);

            return maskValue(p)
        },

        coin: function (value, p) {
            if (!p) p = {};

            if (typeof p.precision == 'undefined') {

                p.precision = 2;

                if (value >= 1) {
                    p.precision = 2;
                }

                if (value > 1000000) {
                    p.precision = 0;
                }

                if (value < 0.1) {
                    p.precision = 4;
                }

                if (value < 0.001) {
                    p.precision = 8;
                }
            }

            p.allowNegative = false;

            p.value = Number(value).toFixed(p.precision);

            return maskValue(p)
        },

        acoin: function (value, p) {
            if (!p) p = {};

            if (typeof p.precision == 'undefined') {

                p.precision = 2;

                if (value >= 1) {
                    p.precision = 2;
                }

                if (value < 0.001) {
                    p.precision = 8;
                }

                if (value > 1000000) {
                    p.precision = 0;
                }
            }

            p.allowNegative = false;

            p.value = Number(value).toFixed(p.precision);

            return maskValue(p)
        },

        coinwithsmall: function (value, p) {

            if (!p) p = {}

            if (typeof p.precision == 'undefined')
                p.precision = 2;

            if (typeof p.dprecision == 'undefined')
                p.dprecision = 6;

            if (typeof p.suffix == 'undefined')
                p.suffix = "PKOIN";

            var suffix = p.suffix;

            delete p.suffix

            value = Number(Number(value).toFixed(p.dprecision));

            var s = Math.pow(10, p.precision)

            p.allowNegative = false;

            p.value = ((Math.floor(value * s)) / s).toFixed(p.precision);


            value = (value - p.value).toFixed(p.dprecision).substr(2 + p.precision);

            var fp = maskValue(p)

            var html = '<div class="table coinwithsmall"><div class="bignum">' + fp +
                '</div><div class="svlwr"><div><div div class="smallvalue">' + value + '</div><div class="suffix">' + suffix + '</div></div></div></div>'

            return html;
        }
    }

    self.istest = function(){
        var addresses = self.testaddresses;
        if (self.sdk.address.pnet()&& addresses.indexOf(self.sdk.address.pnet().address) > -1) {

            return true
        }
    }

    self.values = {
        alph: [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g',
            'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u',
            'v', 'w', 'x', 'y', 'z'
        ],
    }

    //var sm = {};


    self.__applications = function(){
        return {

            ui: {
                windows: {
    
                    appname: "Pocketnet",
                    id: "#windows",
                    text: {
                        name: "Windows",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e13223')
                    },
        
                    icon: '<i class="fab fa-windows"></i>',
        
                    github: {
                        name: "PocketnetSetup.exe",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
                    },
                    
                },

                macos: {
                    appname: "Pocketnet",
                    id: '#macos',
                    text: {
                        name: "macOS",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e132232')
                    },
        
                    icon: '<i class="fab fa-apple"></i>',
        
                    github: {
                        name: "PocketnetSetup.dmg",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
                    },
                },
        
                currentos: {
                    appname: "Pocketnet",
                    id: "#linux",
                    text: {
                        name: "Linux",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e13224')
                    },
        
                    icon: '<i class="fab fa-linux"></i>',
        
                    github: {
                        name: "PocketnetSetup.deb",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
                    }
                }
            },
    
            node: {
                windows: {
                    appname: self.app.localization.e('e13225'),
                    text: {
                        name: "Windows",
                        download: self.app.localization.e('e13226'),
                        label: self.app.localization.e('e13227')
                    },
    
                    icon: '<i class="fab fa-windows"></i>',
    
                    github: {
                        name: "pocketnetcore_0.18.13_win_x64_setup.exe",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.core/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.core/releases/latest'
                    }
                },
    
                linux: {
                    appname: self.app.localization.e('e13225'),
    
                    text: {
                        name: "Linux",
                        download: self.app.localization.e('e13226'),
                        label: self.app.localization.e('e13228')
                    },
    
                    icon: '<i class="fab fa-linux"></i>',
    
                    github: {
                        name: "Pocketnet_linux_x64.AppImage",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.core/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.core/releases/latest'
                    }
                }
            }
        }
    }


    self.errorHandler = function (key, action, akey) {

        var eobj = self.errors[key] || self.errors['network'];

        if (!eobj) {
            return false;
        }
        else {
            var m = eobj.message;

            if (m) {
                if (typeof m == 'function') m = m(akey);

                if (!m) return

                sitemessage(m)
            }

            var a = eobj.action

            if (action && a) {
                a(key, action, akey)
            }

            return (eobj.text || function () { return '' })()
        }



    }

    self.errors = {

        'money': {

            action: function (key, action, akey) {

                var adr = self.app.platform.sdk.address.pnet().address;

                topPreloader(10);

                self.sdk.node.transactions.get.balance(function (a, d, e) {
                    topPreloader(30);

                    if (e) {

                        self.errorHandler(e, action, akey)

                        return
                    }

                    if (a > 0) {

                        self.sdk.node.transactions.get.canSpend([adr], function (cs) {

                            topPreloader(100);

                            if (!cs) {
                                dialog({
                                    html: self.app.localization.e('canSpendError'),
                                    btn1text: self.app.localization.e('daccept'),

                                    class: 'one'
                                })
                            }
                            else {
                                sitemessage(self.errors["network"].message())
                            }

                        })

                    }
                    else {
                        if (!self.app.user.validate()) {

                            self.app.platform.sdk.ustate.me(function (_mestate) {

                                topPreloader(40);


                                if (_mestate) {
                                    self.app.platform.sdk.users.checkFreeMoney(adr, function (res) {

                                        topPreloader(100);

                                        if (res) {
                                            self.errors["1"].action()
                                        }
                                        else {
                                            dialog({
                                                html: self.app.localization.e('noMoneyError'),
                                                btn1text: self.app.localization.e('daccept'),

                                                class: 'one'
                                            })
                                        }
                                    })
                                }
                                else {
                                    topPreloader(100);
                                    sitemessage(self.errors["network"].message())
                                }



                            })

                        }
                        else {
                            topPreloader(100);


                            self.app.platform.sdk.user.waitActions(function (r) {

                                if (!r) {
                                    dialog({
                                        html: self.app.localization.e('noMoneyError'),
                                        btn1text: self.app.localization.e('daccept'),

                                        class: 'one'
                                    })
                                }
                                else {
                                    dialog({
                                        html: self.app.localization.e('waitConf'),
                                        btn1text: self.app.localization.e('daccept'),

                                        class: 'one'
                                    })
                                }

                            })


                        }
                    }

                }, adr, true)

            },

            relay: true
        },

        'privatekey': {
            message: function () {
                return self.app.localization.e('e13229')
            },

            relay: true
        },
        'network': {
            message: function () {
                return self.app.localization.e('e13230')
            },

            relay: true
        },

        'proxy': {
            message: function () {
                return self.app.localization.e('e13231') + " / 1"
            },

            relay: true
        },

        'proxymain': {
            message: function () {
                return self.app.localization.e('e13231') + " / 2"
            },

            relay: true
        },

        'node': {
            message: function () {
                return self.app.localization.e('e13232')
            },

            relay: true
        },

        'offline': {
            message: function () {
                return self.app.localization.e('e13231')
            },

            relay: true
        },

        "42": {
            message: function () {
                return self.app.localization.e('e13233')
            }
        },

        "41": {
            message: function () {
                return self.app.localization.e('e13234')
            },

            relay: true
        },

        "40": {
            message: function () {
                return self.app.localization.e('e13235')
            }
        },

        "39": {
            message: function () {
                return self.app.localization.e('e13236')
            }
        },

        "38": {
            message: function () {
                return self.app.localization.e('e13237')
            }
        },

        "37": {
            message: function () {
                return self.app.localization.e('e13238')
            }
        },

        "35": {
            message: function () {
                return self.app.localization.e('e13239')
            }
        },

        "34": {
            message: function () {
                return self.app.localization.e('e13240')
            }
        },

        "33": {
            message: function () {
                return self.app.localization.e('e13241')
            }
        },

        "32": {
            message: function () {
                return self.app.localization.e('e13242')
            }
        },

        "31": {
            message: function () {
                return self.app.localization.e('e13243')
            }
        },

        "30": {
            message: function () {
                return  self.app.localization.e('e13244')
            }
        },

        "29": {
            message: function () {
                return self.app.localization.e('e13245')
            }
        },

        "28": {
            message: function () {
                return "Wait a bit before taking action"
            }
        },

        "27": {
            message: function () {
                return self.app.localization.e('e13246')
            }
        },
        "26": {
            message: function () {
                return self.app.localization.e('e13247')
            }
        },

        "25": {
            message: function () {
                return self.app.localization.e('e13248')
            }
        },
        "24": {
            message: function () {
                return self.app.localization.e('e13249')
            }
        },
        "23": {
            message: function () {
                return self.app.localization.e('e13250')
            }
        },
        "22": {
            message: function () {
                return self.app.localization.e('e13251')
            }
        },
        "21": {
            message: function () {
                return self.app.localization.e('e13252')
            }
        },
        "20": {
            message: function () {
                return  self.app.localization.e('e13253')
            }
        },
        "19": {
            message: function () {
                return self.app.localization.e('e13254')
            }
        },

        "18": {
            message: function () {
                return self.app.localization.e('e13255')
            }
        },

        "17": {
            message: function () {
                return self.app.localization.e('e13256')
            }
        },

        "16": {
            message: function () {
                return self.app.localization.e('e13257')
            }
        },

        "15": {
            message: function () {
                return self.app.localization.e('e13258')
            }
        },

        "14": {
            message: function () {
                return self.app.localization.e('e13259')
            }
        },

        "13": {
            message: function () {
                return self.app.localization.e('e13260')
            }
        },

        "12": {
            message: function () {
                return self.app.localization.e('unexperror12')
            }
        },

        "11": {
            message: function () {
                return self.app.localization.e('unexperror11')
            }
        },

        "10": {
            message: function () {
                return self.app.localization.e('unexperror10')
            }
        },

        "9": {
            message: function () {
                return self.app.localization.e('SelfSubscribeError')
            }
        },

        "8": {
            message: function () {
                return self.app.localization.e('DoubleSubscribeError')
            }
        },

        "7": {
            message: function () {
                return self.app.localization.e('InvalideSubscribeError')
            }
        },

        "6": {
            message: function () {
                return self.app.localization.e('ChangeInfoLimitError')
            }
        },

        "5": {
            message: function () {
                return self.app.localization.e('SelfScoreError')
            }
        },

        "4": {
            message: function () {
                return self.app.localization.e('doubleLimitLight')
            }
        },

        "3": {
            message: function () {
                var us = self.sdk.ustate.storage[self.sdk.address.pnet().address] || {}

                return self.app.localization.e('scoreLimitLight', (us.score_unspent || 0) + (us.score_spent || 0))
            }
        },

        "2": {
            text: function () {

                var us = self.sdk.ustate.storage[self.sdk.address.pnet().address] || {}

                return self.app.localization.e('postLimitLight', (us.post_unspent || 0) + (us.post_spent || 0))

            }
        },

        "1": {
            text: function () {
                return self.app.localization.e('checkScoreErrorLight')
            },
            action: function () {

                self.app.platform.sdk.user.waitActions(function (r) {

                    if (!r) {
                        dialog({
                            html: self.app.localization.e('checkScoreError'),
                            btn1text: self.app.localization.e('dyes'),
                            btn2text: self.app.localization.e('dno'),

                            success: function () {

                                self.app.nav.api.load({
                                    open: true,
                                    href: 'filluser',
                                    history: true
                                })

                            },

                            fail: function () {


                            }
                        })

                    }
                    else {
                        dialog({
                            html: self.app.localization.e('waitConf'),
                            btn1text: self.app.localization.e('daccept'),

                            class: 'one'
                        })
                    }

                })


            }

        },

        "-26": {
            message: function () {

                return self.app.localization.e('Error code: -26')

            },

            relay: true
        },

        "imageerror" : {

            message: function () {

                return 'An error occurred while loading images. Please try again'

            },

            
        }
    }

    self.parseUrl = function (url) {

        
        url = url.replace("http:", "https:").replace("http//", "https://")
        
        var meta = parseVideo(url);

        var _url = null;

        if (meta.type) {

            _url = url;

            if (meta.type == 'peertube') {
                //_url = `https://${meta.host_name}/videos/embed/${meta.id}`

                _url = `peertube://${meta.host_name}/${meta.id}`
            }

            if (meta.type == 'youtube') {

                if (url.indexOf("watch") > -1) {

                    var s = url.split("?");

                    if (s[1]) {


                        var v = parameters(s[1]);

                        if (v.v) {
                            _url = 'https://youtu.be/' + v.v //'https://www.youtube.com/embed/' + v.v;

                            meta.id = v.v
                        }

                    }
                }
            }

            if (meta.type == 'vimeo' && url.indexOf("player") == -1) {

                var s = url.split("/");

                s = s[s.length - 1];

                if (/[0-9]+/.test(s)) {

                    _url = 'https://player.vimeo.com/video/' + s + '?portrait=0';

                    meta.id = s
                }

            }

            if (meta.type == 'bitchute' && url.indexOf("player") == -1) {

                var _url = url;

                if (_url.endsWith('/')) 
                    _url = _url.substr(0, _url.length - 1)

                var s = _url.split("/");

                s = s[s.length - 1];

                if (s[1] && url.indexOf('?') == -1) {

                    _url = `https://www.bitchute.com/video/${s}/`;

                    meta.id = s
                }

            }

            meta.url = _url;
        }

        else {

        }
        return meta;
    }

    self.objects = {
        graph: function (p) {

            var graph = this;

            graph.el = p.el;

            graph.series = [];

            graph.id = makeid();

            graph.options = p.chart || {};

            graph.shell = p.shell;

            graph.stock = p.stock;


            graph.unit = p.unit || 'number';

            var helpers = {
                minMax: function (series) {

                    var max = null;
                    var min = null;

                    _.each(series, function (serie) {
                        _.each(serie.data, function (point) {

                            if (max === null || max < point.y) max = point.y

                            if (min === null || min > point.y) min = point.y


                        })
                    })

                    return {
                        min: min,
                        max: max
                    }
                }
            }

            var defaulOptions = function (p) {

                if (!p) p = {};

                p.sizeRatio || (p.sizeRatio = 1)

                var options = {
                    colors: [

                    ],
                    chart: {
                        style: {
                            fontFamily: "'Segoe UI', SegoeUI, 'Helvetica Neue', Helvetica, Arial, sans-serif"
                        },
                        backgroundColor: 'transparent',
                        spacing: [8 * p.sizeRatio, 8 * p.sizeRatio, 8 * p.sizeRatio, 8 * p.sizeRatio],
                        type: 'spline'
                        //
                    },

                    rangeSelector: {
                        inputEnabled: false,
                        selected: 3 // all
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        labels: {
                            enabled: true,
                            distance: 15 * p.sizeRatio,
                            padding: 5 * p.sizeRatio,
                            //step : 1 * p.sizeRatio,
                            style: {
                                'fontSize': 11 * p.sizeRatio + 'px',
                                'color': "#27a9e6"
                            }
                        },
                        lineWidth: 0,
                        minorGridLineColor: 'transparent',
                        minorGridLineWidth: 0,
                        gridLineColor: "rgb(228, 221, 222)",
                        gridLineWidth: 0,
                        minorTickLength: 2 * p.sizeRatio,
                        tickWidth: 1 * p.sizeRatio,
                        tickColor: 'transparent',
                        title: {
                            enabled: false,
                            text: 'Date',
                            y: 10 * p.sizeRatio,
                            style: {

                                'fontSize': 10 * p.sizeRatio + 'px',
                                "color": "rgb(30, 35, 40)"
                            }
                        },
                        minPadding: 0.04,
                        maxPadding: 0.04,
                        offset: 20 * p.sizeRatio,
                        tickPixelInterval: 100 * p.sizeRatio,

                    },
                    yAxis: [{
                        minPadding: 0,
                        maxPadding: 0,
                        offset: 10,
                        //floor: true,
                        title: {
                            enabled: false,
                            text: '',
                            style: {
                                'fontSize': 10 * p.sizeRatio + 'px',
                                "color": "rgb(30, 35, 40)"
                            }
                        },
                        startOfWeek: 0,
                        lineWidth: 0,
                        lineColor: 'transparent',
                        minorTickLength: 0,
                        minorGridLineWidth: 1,
                        gridLineColor: "rgb(228, 221, 222)",
                        gridLineWidth: 1,
                        //tickInterval: 5,
                        tickLength: 0,
                        tickPixelInterval: 100 * p.sizeRatio,
                        opposite: true,

                        labels: {
                            enabled: true,
                            style: {
                                'fontSize': 11 * p.sizeRatio + 'px',
                                'color': "#27a9e6"
                            },

                            padding: 5 * p.sizeRatio,
                            distance: -25 * p.sizeRatio,
                            y: 3 * p.sizeRatio,

                        },

                        tickColor: 'rgb(228, 221, 222)',
                    }],

                    tooltip: {
                        backgroundColor: "rgba(247,247,247,1)",
                        crosshairs: true,
                        formatter: function (c) {

                            var convertX = function (x) {

                                if (graph.options.xtype == 'datetime')

                                    return convertDate(dateToStr(x));

                                else
                                    return x;
                            }

                            var suffix = deep(c.chart, 'xAxis.0.userOptions.title.text') || deep(this, 'points.0.series.name');

                            var s;

                            if (suffix) {
                                s = convertX(this.x) + ' - <b>' + suffix + '</b><br/>';
                            }

                            else {
                                s = '<b>' + convertX(this.x) + '</b><br/>';
                            }

                            var series = c.chart.series;

                            var x = this.x;

                            var points = _.clone(this.points) || [];

                            /*_.each(series, function(s){

                                if(s.name.indexOf("Navigator") > -1) return;

                                var p = _.find(s.data || s, function(p){

                                    if (p)

                                        if(convertX(p.x) === convertX(x)) return true;
                                })

                                if (p)

                                    points.push(p);

                            })*/

                            _.each(points, function (p) {

                                var sname = p.series.name;

                                var y = p.y;


                                var view = deep(p, 'point.__view') || graph.unit || 'number'

                                if (view == 'dollars') {
                                    y = Number(p.y).toFixed(0);

                                    y = self.mp.dollars(y, {
                                        precision: 0
                                    })

                                }

                                if (view == 'percent') {
                                    y = Number(p.y).toFixed(2);

                                    y = y + " %"
                                }

                                if (view == 'number') {
                                    y = Number(y).toFixed(2);
                                }

                                var objSuffix = '';

                                if (graph.options.displayType == 'points') {

                                    if (p.to_objectGl)
                                        objSuffix = p.to_objectGl.name

                                }
                                else {
                                    if (p.to_object)
                                        objSuffix = '(' + p.to_object.Ticker + ')';
                                }



                                s += '<span style="color:' + p.series.color + '">\u25CF</span> ' + sname + ' ' + objSuffix + ': <b>' + y + '</b><br/>';
                            });


                            return s;
                        },
                        shared: true,
                        useHTML: true,
                        style: {
                            "zIndex": '500',
                        }
                    },
                    legend: {

                        enabled: true,

                        itemStyle: {
                            'fontSize': 10 * p.sizeRatio + 'px',
                            'font-weight': '500',
                            "padding": 10 * p.sizeRatio

                        },
                        symbolHeight: 14 * p.sizeRatio,
                        symbolWidth: 14 * p.sizeRatio,
                        padding: 8 * p.sizeRatio,
                        lineHeight: 16 * p.sizeRatio,
                        margin: 24 * p.sizeRatio,
                        symbolPadding: 2 * p.sizeRatio,
                        itemDistance: 50 * p.sizeRatio,
                        align: 'center',
                        labelFormatter: function () {

                            return this.name;

                        }
                        //enabled : false,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            },
                            pointPadding: 0.1,
                            groupPadding: 0.1,
                            animation: false,

                            borderColor: "rgba(52, 100, 166, 0.8)",
                            color: "rgba(52, 100, 166, 0.3)",
                        },
                        pie: {
                            size: '65%',
                            dataLabels: {
                                connectorWidth: 1 * p.sizeRatio,
                                distance: 30 * p.sizeRatio,
                                connectorPadding: 5 * p.sizeRatio,
                                padding: 5 * p.sizeRatio,
                                style: {
                                    fontSize: 16 * p.sizeRatio + 'px'
                                }
                            }
                        },
                        column: {
                            animation: false,
                        },
                        bubble: {
                            animation: false,
                            lineWidth: 0,
                            minSize: '4%',
                            maxSize: '10%',
                            //softThreshold : true
                        },
                        columnrange: {
                            animation: false,
                            color: 'rgba(33,33,33, 0.3)',
                            borderColor: 'transparent'
                        },
                        spline: {
                            animation: false,
                            lineWidth: 1 * p.sizeRatio,
                            marker: {
                                enabled: true,
                                lineColor: 'transparent',
                                radius: 2 * p.sizeRatio,
                                //symbol: "circle",
                                states: {
                                    hover: {
                                        lineWidthPlus: 0
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    lineWidth: 1 * p.sizeRatio,

                                    lineWidthPlus: 0,
                                    marker: {
                                        fillColor: "#000",
                                        lineColor: "#000"
                                    },
                                    halo: {
                                        opacity: 0
                                    }
                                },

                            }
                        },
                        areaspline: {
                            animation: false,
                            lineWidth: 1 * p.sizeRatio,
                            fillOpacity: 0.2,
                            marker: {
                                enabled: false,
                                lineColor: 'transparent',
                                radius: 4 * p.sizeRatio,
                                symbol: "circle",
                                states: {
                                    hover: {
                                        lineWidthPlus: 0
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    lineWidth: 1 * p.sizeRatio,

                                    lineWidthPlus: 0,
                                    marker: {
                                        fillColor: "#000",
                                        lineColor: "#000"
                                    },
                                    halo: {
                                        opacity: 0
                                    }
                                },
                            }
                        },
                        areasplinerange: {
                            animation: false,
                            fillOpacity: 0.2,
                            dashStyle: 'dot'

                        }

                    },
                    labels: {
                        style: {
                            fontSize: 8 * p.sizeRatio + 'px'
                        }
                    },
                    credits: {
                        enabled: false
                    },
                }

                if (!p.pdf) {
                    /*    options.xAxis.title.style['font-weight'] = "700";
                        options.yAxis[0].title.style['font-weight'] = "700";
                        options.legend.itemStyle['font-weight'] = "700";*/
                }
                else {
                    options.plotOptions.pie.size = '85%';
                    options.legend.enabled = true;
                    options.chart.backgroundColor = "#fff";
                }

                return options;
            }

            graph.chartOptions = function (p) {
                var options = defaulOptions(p);

                options.series = graph.series;

                if (typeof graph.options.xAxis != 'undefined') {
                    options.xAxis.labels.enabled = graph.options.xAxis
                }

                if (graph.options.bubbleSize)
                    options.plotOptions.bubble.maxSize = graph.options.bubbleSize;

                if (graph.options.plotOptionsSeries)
                    options.plotOptions.series = graph.options.plotOptionsSeries

                if (graph.options.xAxisOpposite)
                    options.xAxis.opposite = true;

                if (graph.options.yAxis) {
                    options.yAxis = options.yAxis.concat(graph.options.yAxis)
                }

                if (graph.options.secondYAxis) {

                    options.yAxis.push({
                        minPadding: 0,
                        maxPadding: 0,
                        offset: 10,
                        //floor: true,
                        title: {
                            enabled: false,
                            text: '',
                            style: {
                                'fontSize': 10 * p.sizeRatio + 'px',
                                "color": "rgb(30, 35, 40)"
                            }
                        },
                        startOfWeek: 0,
                        lineWidth: 0,
                        lineColor: 'transparent',
                        minorTickLength: 0,
                        minorGridLineWidth: 1,
                        gridLineColor: "rgb(228, 221, 222)",
                        gridLineWidth: 1,
                        //tickInterval: 5,
                        tickLength: 0,
                        tickPixelInterval: 100 * p.sizeRatio,

                        labels: {
                            enabled: true,
                            style: {
                                'fontSize': 11 * p.sizeRatio + 'px',
                                'color': "#27a9e6"
                            },

                            padding: 5 * p.sizeRatio,
                            distance: -25 * p.sizeRatio,
                            y: 3 * p.sizeRatio,

                        },

                        tickColor: 'rgb(228, 221, 222)',
                    })
                }

                _.each(options.yAxis, function (yAxis) {


                    if (typeof graph.options.ypadding != 'undefined') {
                        yAxis.minPadding = graph.options.ypadding;
                        yAxis.maxPadding = graph.options.ypadding;
                    }

                    if (typeof graph.options.ytickAmount != 'undefined') {
                        yAxis.tickAmount = graph.options.ytickAmount;
                    }

                })


                if (typeof graph.options.xtype != 'undefined') {
                    options.xAxis.type = graph.options.xtype
                }


                if (typeof graph.options.categories != 'undefined') {
                    options.xAxis.categories = graph.options.categories();

                }

                if (typeof graph.options.reversed != 'undefined') {
                    options.xAxis.reversed = graph.options.reversed;
                }

                if (typeof graph.options.disableXLabels != 'undefined') {
                    options.xAxis.labels.enabled = false;
                }

                if (typeof graph.options.disableYLabels != 'undefined') {
                    options.yAxis[0].labels.enabled = false;
                    options.yAxis[0].offset =  0
                }

                if (typeof graph.options.yGridLineWidth != 'undefined') {
                    options.yAxis[0].gridLineWidth = graph.options.yGridLineWidth;
                }

                if (typeof graph.options.disableTooltip != 'undefined') {
                    options.tooltip.enabled = false;
                }



                if (typeof graph.options.xtitle != 'undefined') {

                    options.xAxis.title.enabled = true;
                    options.xAxis.title.text = graph.options.xtitle;
                }

                if (typeof graph.options.ytitle != 'undefined') {
                    options.yAxis[0].title.enabled = true;
                    options.yAxis[0].title.text = graph.options.ytitle;
                }


                if (graph.options.defaultTooltip) {
                    delete options.tooltip.formatter
                }

                if (graph.options.addLegend) {
                    options.legend.enabled = true;
                }

                if (graph.options.removeLegend) {
                    options.legend.enabled = false;
                }

                if (graph.options.tooltipFormatter) {

                    options.tooltip.formatter = graph.options.tooltipFormatter
                }

                options.chart.type = graph.options.type;
                options.chart.height = graph.options.height || 400;

                if (graph.options.width)
                    options.chart.width = graph.options.width;

                options.yAxis[0].floor = graph.options.floor;


                _.each(options.yAxis, function (yAxis, index) {



                    yAxis.labels.formatter = function () {

                        var view = graph.unit || 'number';

                        if (graph.options.views && graph.options.views[yAxis.index]) {
                            view = graph.options.views[yAxis.index].v
                        }

                        var value = this.value;

                        var label = this.axis.defaultLabelFormatter.call(this);


                        if (view == 'number' || view == 'dollars') {
                            value = compressedNumber(value, 2)
                            label = value
                        }

                        if (view == 'number') {
                            return label
                        }

                        if (view == 'percent') {
                            return label + " %"
                        }

                        if (view == 'dollars') {
                            return "$ " + label
                        }
                    }

                })



                if (typeof graph.options.ymax != 'undefined')
                    options.yAxis[0].max = graph.options.ymax;

                if (typeof graph.options.ymin != 'undefined')
                    options.yAxis[0].min = graph.options.ymin;



                return options;
            }

            graph.rarefied = function (series, count) {
                _.each(series, function (serie) {

                    var l = serie.data.length;

                    if (l > count * 3) {

                        var c = l / count;
                        var newData = [serie.data[0]];

                        for (var i = 1; i < l - 1; i++) {

                            if (i % Number(c.toFixed(0))) {

                            }
                            else {
                                newData.push(serie.data[i])
                            }
                        }

                        newData.push(serie.data[l - 1]);

                        serie.data = newData;
                    }

                })

                return series;
            }

            graph.exportToPdf = function (p, clbk, _p) {

                if (!_p) _p = {};

                p.el.html("<div class='chart'></div>");

                p.pdf = true;

                var options = graph.chartOptions(p);

                if (_p.prepareOptions) {
                    _p.prepareOptions(options)
                }

                if (!options) {
                    if (clbk)
                        clbk(null);
                }
                else {
                    if (p.maxPointsCount) {
                        graph.rarefied(options.series, p.maxPointsCount)
                    }


                    var height = (deep(options, "chart.height") || 400) * p.sizeRatio;
                    var width = (deep(options, "chart.width") || 700) * p.sizeRatio;

                    var to = p.el.find('.chart');

                    to.height(height);
                    to.width(width);

                    options.chart.height = height;
                    options.chart.width = width;

                    options.chart.renderTo = to[0];

                    var chart = {};

                    chart.chart = new Highcharts.Chart(options);
                    chart.ratio = width / height;
                    chart.series = options.series;
                    chart.caption = graph.options.caption;

                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    var svg = chart.chart.getSVG()

                    var img = new Image();

                    img.onload = function () {
                        canvas.getContext("2d").drawImage(img, 0, 0, width, height);

                        try {
                            chart.img = canvas.toDataURL('image/jpeg');

                        }
                        catch (e) {

                            var vgcanvas = document.createElement('canvas');
                            vgcanvas.width = width;
                            vgcanvas.height = height;


                            canvg(vgcanvas, svg, {
                                ignoreDimensions: true,
                                ignoreMouse: true,
                                ignoreAnimation: true,
                                scaleWidth: vgcanvas.width,
                                scaleHeight: vgcanvas.height
                            });

                            chart.img = vgcanvas.toDataURL('image/png');

                            $(vgcanvas).remove();

                        }



                        $(canvas).remove();

                        clbk(chart);
                    }

                    img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg)));


                }
            }

            graph.render = function (p, clbk) {

                if (!p) p = {};

                var _el = p.el || graph.el;

                if (_el) {

                    var options = graph.chartOptions(p);

                    if (p.prepareOptions) {
                        p.prepareOptions(options)
                    }

                    if (!options) {
                        if (clbk)
                            clbk(null);
                    }
                    else {
                        if (p.maxPointsCount) {
                            graph.rarefied(options.series, p.maxPointsCount)
                        }

                        graph.shell({
                            name: "graph",
                            el: _el,
                            animation: 'fadeIn',
                            data: {
                                me: graph,
                                id: graph.id,
                                options: graph.options
                            }
                        }, function (_p) {

                            options.chart.renderTo = _p.el.find('.chart[id="' + graph.id + '"]')[0];

                            if (graph.stock)

                                graph.chart = new Highcharts.stockChart(options);

                            else

                                graph.chart = new Highcharts.Chart(options);

                            if (clbk)
                                clbk(_p.el);

                        })
                    }



                }
            }

            graph.destroy = function () {

                graph.chart.destroy();

                graph.el.html('')
            }

            return graph;
        }
    }

    self.clbks = {

        online: {

            _app: function () {
                self.app.options.successHandler({
                    online: true
                })
            }

        },
        offline: {},

        _focus: {},

        focus: function (time) {

            app.user.isState(function (state) {

                if (state /*&& !self.app.errors._autocheck*/) {

                    self.update();

                    _.each(self.clbks._focus, function (f) {
                        f(time)
                    })

                }

            })

        },

        api: {
            actions: {
                subscribe: {},
                unsubscribe: {},
                subscribePrivate: {},

                blocking: {},
                unblocking: {}
            }
        },
    }

    self.papi = {
        horizontalLenta : function(el, clbk, p){

            if(!p) p = {}

            p.horizontal = true

            var tpl = `<div class="horizontalLentaWrapper"><div class="horizontalLentacaption"><span>`+(p.caption || '')+`</span></div><div class="showmorebywrapper"><div class="showmoreby"></div></div>
            <div class="controlleft controlhor" dir="left"><i class="fas fa-chevron-left"></i></div><div class="controlright controlhor"><i class="fas fa-chevron-right"></i></div>
            </div>`

            el.html(tpl)

            p.window = el.find('.showmorebywrapper')

            var _el = el.find('.showmoreby')

            self.papi.clenta(_el, clbk, p)

            el.find('.controlhor').on('click', function(){
                var dir = $(this).attr('dir') || 'right'

                var curscroll = p.window.scrollLeft()
                var width = p.window.width()

                var to = width * 0.9

                if(dir == 'left') to = -to

                to = curscroll + to

                p.window.animate({ scrollLeft: to }, 100);
            })
        },
        clenta : function(el, clbk, p){

            if(!p) p = {}

            var id = p.id || makeid()

            app.nav.api.load({

                open : true,
                id : 'lenta',
                el : el,
                eid : id,
                mid : id,
                animation : false,
                essenseData : {

                    author : p.author,
                    video : p.video,
                    comments : p.comments,
                    enterFullScreenVideo : p.fullscreenvideo,
                    openapi : p.openapi,
                    renderclbk : p.renderclbk,
                    ready : p.ready,
                    window : p.window,
                    horizontal : p.horizontal,
                    second : true,
                    loaderkey : p.loaderkey,
                    hasshares : p.hasshares,
                    opensvi : p.opensvi,
                    from : p.from,
                    compact : p.compact,
                    r : p.r,
                    shuffle : p.shuffle,
                    page : p.page,
                    period : p.period,
                    filter : p.filter,
                    ended : p.ended,
                    afterload : p.afterload

                },
                
                clbk : clbk
            })
        },
        lenta : function(ids, el, clbk, p){

            if(!p) p = {}
            var id = makeid()

            if(!_.isArray(ids)) ids = [ids]

            app.nav.api.load({

                open : true,
                id : 'lenta',
                el : el,
                eid : id,
                mid : id,
                animation : false,
                essenseData : {
                    
                    notscrollloading : true,
                    txids : ids,
                    comments : p.comments,
                    enterFullScreenVideo : p.fullscreenvideo,
                    openapi : p.openapi,
                    renderclbk : p.renderclbk,
                    ready : p.ready,
                    second : true
                },
                
                clbk : clbk
            })
        },

        post: function (id, el, clbk, p) {

            if (!p) p = {}

            self.sdk.node.shares.getbyid(id, function (shares) {

                self.sdk.node.shares.users(shares, function () {

                    app.nav.api.load({
                        open: true,
                        href: 'post',
                        el: el,
                        eid: id + (p.eid || ""),
                        clbk: clbk,

                        essenseData: {
                            hr: p.hr,
                            share: id,
                            removemargin: true,
                            repost: p.repost,
                            level: p.level,
                            fromempty: p.fromempty,
                            nocommentcaption : p.nocommentcaption,
                            eid: id + (p.eid || ""),
                            comments : p.comments,
                            video : p.video,
                            autoplay : p.autoplay,
                            opensvi : p.opensvi
                        }
                    })

                })
            })

        },

        channel : function(id, el, clbk, p){
            self.sdk.users.get(id, function () {

                app.nav.api.load({
                    open: true,
                    href: 'channel',
                    el: el,
                    eid: id + (p.eid || ""),
                    clbk: clbk,

                    essenseData: {
                        id : id
                    }
                })

            })
        },

        comment : function(id, el, clbk, p){

            app.nav.api.load({
                open : true,
                id : 'comments',
                el : el,
                eid : id + 'post',

                essenseData : {
                    txid : id,
                    showall : true,
                    init : true,
                    preview : false,
                    fromtop : true,
                    commentPs : p.commentPs,
                    openapi : p.openapi
                },

                clbk : clbk
            })
        },

        
    }

    self.ui = {


        images : function(allimages, initialValue, clbk){

            if(!_.isArray(allimages)) allimages = [allimages]

            if(!initialValue) initialValue = allimages[0]

            if(!initialValue) return false

            var gid = 'uiimages'

            var images = _.map(allimages, function(i){
                return {
                    src : i
                }
            })

            /*var num = findIndex(images, function(image){

                if (image.src == initialValue) return true;						

            })*/

            self.app.nav.api.load({
                open : true,
                href : 'imagegallery',
                inWnd : true,
                history : true,

                essenseData : {
                    initialValue : initialValue,
                    idName : 'src',
                    images : images,

                    gid : gid
                },

                clbk : function(){
                    if (clbk)
                        clbk()
                }
            })


            return true

        },

        share : function(p){
            if(!p) p = {}

            globalpreloader(true, true)

            setTimeout(function(){
                app.nav.api.load({
                    open : true,
                    id : 'share',
                    inWnd : true,
                    eid : 'postin',
                    
                    clbk : function(e, p){
                        globalpreloader(false)
                    },

                    essenseData : {
                        close : function(){
                        },
                        post : function(){
                        },	
                        absolute : true,
                        repost  : p.repost
                    }
                })
            }, 50)
        },

        showmykeyfast: function () {
            app.nav.api.load({

                open: true,
                inWnd: true,
                href: 'pkview',

                essenseData: {
                    dumpkey: true
                },

                clbk: function (p, s) {

                }
            })
        },
        showmykey: function (p) {

            if (!p) p = {};

            dialog({
                html: p.text || self.app.localization.e('e13188'),
                btn1text: self.app.localization.e('e13261'),
                btn2text: p.faillabel || self.app.localization.e('e13262'),

                class: 'zindex accepting accepting2 ',

                success: function () {

                    if (!isMobile()) {

                        app.nav.api.load({

                            open: true,
                            href: 'userpage?id=accounts',
                            history: true,
                            handler: true,

                            essenseData: {
                                dumpkey: !isMobile()
                            },

                            clbk: function (p, s) {

                            }
                        })

                    }

                    app.nav.api.load({

                        open: true,
                        inWnd: !isMobile(),
                        history: isMobile(),
                        href: 'pkview',

                        essenseData: {
                            dumpkey: true
                        },

                        clbk: function (p, s) {

                        }
                    })

                },

                fail: function () {
                    if (p.fail) p.fail()
                }
            })



            /*var interactive = new Interactive({
                app : app,
                platfrom : self
            })*/

        },

        wallet : {
            send : function(p, clbk, el){

                if(!p) p = {}

                var id = 'papiwalletsend'

                globalpreloader(true, true)

                p.action = p.htls ? 'htls' : 'send'
                p.class = 'api'
                p.api = true

                app.nav.api.load({
                    open : true,
                    id : 'wallet',
                    inWnd : el ? false : true,
                    el : el ? el : null,
                    eid : id,
                    mid : id,
                    animation : false,
                    essenseData : p,
                    clbk : function(e, p){

                        globalpreloader(false)

                        if(clbk) clbk(e, p)
                    }
                })
                
            }
        }
    }

    self.api = {

        keypair: function (m) {

            var keyPair = null;

            if (bitcoin.bip39.validateMnemonic(m)) {
                var seed = bitcoin.bip39.mnemonicToSeedSync(m)

                var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF()

                keyPair = bitcoin.ECPair.fromWIF(d)
            }
            else {

                try { keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(m, 'hex')) }

                catch (e) {
                    try {keyPair = bitcoin.ECPair.fromWIF(m) }
                    catch (e) {}
                }

            }

            return keyPair
        },

        clearname: function (n) {
            return (n || "").replace(/[^a-zA-Z0-9_ ]/g, "")
        },

        name: function (address) {
            var n = deep(app, 'platform.sdk.usersl.storage.' + address + '.name') || deep(app, 'platform.sdk.users.storage.' + address + '.name');

            if (n) {
                n = this.clearname(n)
            }

            return n;
        },

        authorlink: function (address) {
            var name = deep(app, 'platform.sdk.usersl.storage.' + address + '.name');

            if (name) return encodeURIComponent(name.toLowerCase());

            else return 'author?address=' + address
        },

        upbutton: function (el, p) {

            if (typeof window == 'undefined') return;

            if (!p) p = {};

            var self = this;
            var w = $(window);
            var up = null;

            var currentmode = null;

            var render = function () {
                var h = '';

                h += '<div class="upbutton ' + (p.class || "") + '">'

                h += '<div class="full">'

                h += '<div class="fulltable table">'
                h += '<div class="fullcell icon">'
                h +=  (p.icon || '<i class="fas fa-chevron-up"></i>')
                h += '</div>'

                h += '<div class="fullcell label">'
                h +=  (p.text || 'To the top') 
                h += '</div>'

                h += '<div class="fullcell label likeicon">'
                h += '</div>'

                h += '</div>'

                h += '</div>'

                h += '<div class="mini">'
                h += (p.icon || '<i class="fas fa-chevron-up"></i>')
                h += '</div>'

                h += '</div>'

                el.html(h)
                up = el.find('.upbutton')
            }

            var getmode = function () {
                if (w.width() > 1280) {
                    return 'full'
                }
                else {
                    return 'mini'
                }
            }

            var actions = {
                clear: function () {
                    up.css('right', '')
                    up.css('top', '')
                    up.css('bottom', '')
                    up.css('width', '')
                }
            }

            var events = {
                resize: function () {
                    var mode = getmode();

                    if (mode != currentmode) {
                        actions.clear();
                    }

                    currentmode = mode

                    if (mode == 'full') {
                        if (p.rightEl) {
                            up.css('width', p.rightEl.offset().left + "px")
                        }

                        if (p.top) {
                            up.css('top', p.top())
                        }
                    }
                    else {

                    }
                },
                scroll: function () {



                    if (w.scrollTop() >= (typeof p.scrollTop == 'undefined' ? 250 : p.scrollTop)) {
                        up.addClass('active')
                    }
                    else {
                        up.removeClass('active')
                    }
                },

                click: function () {

                    if (p.click){
                        p.click(up.hasClass('active'))
                    }
                    else{
                        _scrollTop(0)
                    }

                   
                }
            }

            var initEvents = function () {

                window.addEventListener('scroll', events.scroll)
                window.addEventListener('resize', events.resize)

                up.swipe({
                    tap: events.click
                })
            }

            var removeEvents = function () {
                window.removeEventListener('scroll', events.scroll)
                window.removeEventListener('resize', events.resize)
            }

            self.init = function () {
                currentmode = getmode()

                render();

                initEvents();

                events.resize();
                events.scroll();
            }

            self.apply = function(){
                events.resize();
                events.scroll();
            }

            self.destroy = function () {
                removeEvents()

                el.html('')
            }

            self.init()

            return self;
        },

        plissing: function (p) {

            var self = this;

            var render = function () {

                var rt = p.el.find('.plissingCnt');
                var rtclass = []

                if (p.left) {
                    rtclass.push('left')
                }

                if (p.white) {
                    rtclass.push('white')
                }

                if (rt.length) render.remove()

                p.el.append('<div class="plissingCnt"></div>')

                rt = p.el.find('.plissingCnt');

                rt.addClass(rtclass.join(' '))

                var h = ''


                var ball = function () {
                    h += '            <div class="plissingWrapperCell">'
                    h += '                <div class="pilsing">'
                    h += '                    <div></div>'
                    h += '                    <div></div>'
                    h += '                </div>'
                    h += '            </div>'
                }


                h += '<div class="plissingWrapper">'
                h += '<div class="plissingWrapperTable table">'


                if (!p.left) {
                    ball()
                }


                h += '            <div class="plissingTipCell">'
                h += '                <div class="plissingTip all">'
                h += (p.text || '')
                h += '                </div>'

                if (p.textHover) {
                    h += '                <div class="plissingTip hover">'
                    h += (p.textHover || '')
                    h += '                </div>'
                }

                h += '            </div>'

                if (p.left) {
                    ball()
                }

                h += '    </div>'
                h += '</div>'


                rt.html(h);

                setTimeout(function () {
                    rt.addClass('active')
                }, 200)

            }

            self.init = function () {
                render()
            }

            self.destroy = function () {

                var e = p.el.find('.plissingCnt');

                e.removeClass('active')

                setTimeout(function () {
                    e.remove()
                }, 300)

            }

            self.init()

            return self;

        },

        tooltip: function (_el, content, clbk, p) {
            if (_el.hasClass('tooltipstered')) return;

            if (!p) p = {};

            var options = {};

            options.debug = false;
            options.contentAsHTML = true;
            options.interactive = true;
            options.interactiveTolerance = 400;
            options.onlyOne = true;
            options.delay = 100;
            options.trigger = 'click'
            //options.autoClose = false;

            options.theme = p.theme || "lighttooltip";
            options.position || (options.position = "left");
            options.height || (options.height = 420);
            options.maxWidth || (options.maxWidth = 270);


            options.content = content

            options.functionReady = function (instance, h) {

                if (clbk) {
                    clbk($(h.tooltip), _el)
                }
            }

            options.functionInit = function (i, h) {

            }

            _el.tooltipster(options)

            _el.tooltipster('show')

            return _el
        },

        electron: {
            storage: {},

            notifications: function (count, marker) {
                if (typeof _Electron != 'undefined') {


                    this.storage[marker] = count

                    var _count = _.reduce(this.storage, function (m, c) {
                        return m + c
                    }, 0)

                    electron.ipcRenderer.send('update-badge', _count || null);
                    electron.ipcRenderer.send('update-badge-tray', _count || null);


                }
            }
        },

        inputs: {
            user: function (parameter) {

                var render = function (info) {

                    if (parameter.el) {

                        if (!info) {

                        }
                        else {

                        }
                    }
                }

                var change = function (v) {

                    if (parameter._onChange)
                        parameter._onChange(v)

                    var r = false;

                    try {
                        r = bitcoin.address.fromBase58Check(v);
                    }
                    catch (e) {

                    }


                    if (r) {

                        self.sdk.users.get(v, function () {

                            var info = self.sdk.users.storage[v] || null;

                            render(info)

                        })

                        return

                    }

                    render(null)

                }

                parameter.onChange = change;

                return parameter
            }
        },

        actions: {
            unsubscribe: function (address, clbk) {
                var unsubscribe = new Unsubscribe();
                unsubscribe.address.set(address);

                topPreloader(10)

                self.sdk.node.transactions.create.commonFromUnspent(

                    unsubscribe,

                    function (tx, error) {

                        if (tx) {
                            var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

                            var u = self.sdk.users.storage[address];

                            if (me) {

                                me.removeRelation({
                                    adddress: address
                                })

                            }


                            if (u) {
                                u.removeRelation(address, 'subscribers')
                            }

                            var clbks = deep(self.clbks, 'api.actions.unsubscribe') || {}

                            _.each(clbks, function (c) {
                                c(address)
                            })

                        }

                        topPreloader(100)

                        clbk(tx, error)

                    }
                )
            },

            subscribe: function (address, clbk) {
                var subscribe = new Subscribe();
                subscribe.address.set(address);

                topPreloader(10)

                self.sdk.node.transactions.create.commonFromUnspent(

                    subscribe,

                    function (tx, error) {

                        if (tx) {
                            var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

                            var u = self.sdk.users.storage[address];

                            if (me) {

                                me.removeRelation({
                                    adddress: address
                                })

                                me.addRelation({
                                    adddress: address,
                                    private: false
                                })

                                me.removeRelation(address, 'recomendedSubscribes')
                            }

                            if (u) {
                                u.removeRelation(address, 'subscribers')
                                u.addRelation(address, 'subscribers')
                            }

                            var clbks = deep(self.clbks, 'api.actions.subscribe') || {}

                            _.each(clbks, function (c) {
                                c(address)
                            })


                            self.sdk.activity.adduser('subscribe', address)
                        }

                        topPreloader(100)

                        clbk(tx, error)

                    }
                )
            },

            blocking: function (address, clbk) {
                var blocking = new Blocking();
                blocking.address.set(address);

                topPreloader(10)

                self.sdk.node.transactions.create.commonFromUnspent(

                    blocking,

                    function (tx, error) {

                        if (tx) {
                            var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

                            if (me) me.addRelation(address, 'blocking')

                            var clbks = deep(self.clbks, 'api.actions.blocking') || {}

                            _.each(clbks, function (c) {
                                c(address)
                            })
                        }

                        topPreloader(100)

                        clbk(tx, error)

                    }
                )
            },

            unblocking: function (address, clbk) {
                var unblocking = new Unblocking();
                unblocking.address.set(address);

                topPreloader(10)

                self.sdk.node.transactions.create.commonFromUnspent(

                    unblocking,

                    function (tx, error) {

                        if (tx) {
                            var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

                            var u = self.sdk.users.storage[address];

                            if (me) me.removeRelation(address, 'blocking')

                            var clbks = deep(self.clbks, 'api.actions.unblocking') || {}

                            _.each(clbks, function (c) {
                                c(address)
                            })
                        }

                        topPreloader(100)

                        clbk(tx, error)

                    }
                )
            },

            notificationsTurnOff: function (address, clbk) {
                self.api.actions.subscribe(address, clbk)
            },

            subscribeWithDialog: function (address, clbk) {
                menuDialog({

                    items: [

                        {
                            text: self.app.localization.e('e13263'),
                            class: 'itemmain',
                            action: function (clbk) {

                                self.api.actions.notificationsTurnOn(address, clbk)

                            }
                        },

                        {
                            text:  self.app.localization.e('e13264'),
                            action: function (clbk) {

                                self.api.actions.subscribe(address, clbk)

                            }
                        }


                    ]
                })

            },

            notificationsTurnOn: function (address, clbk) {
                var subscribe = new SubscribePrivate();
                subscribe.address.set(address);

                topPreloader(10)

                self.sdk.node.transactions.create.commonFromUnspent(

                    subscribe,

                    function (tx, error) {

                        if (tx) {
                            var me = deep(app, 'platform.sdk.users.storage.' + self.app.user.address.value.toString('hex'))

                            var u = self.sdk.users.storage[address];

                            if (me) {

                                me.removeRelation({
                                    adddress: address
                                })

                                me.addRelation({
                                    adddress: address,
                                    private: true
                                })

                                me.removeRelation(address, 'recomendedSubscribes')
                            }

                            if (u) {
                                u.removeRelation(address, 'subscribers')
                                u.addRelation(address, 'subscribers')
                            }

                            var clbks = deep(self.clbks, 'api.actions.subscribePrivate') || {}

                            self.sdk.activity.adduser('subscribe', address)

                            _.each(clbks, function (c) {
                                c(address)
                            })
                        }

                        topPreloader(100)

                        clbk(tx, error)

                    }
                )
            },

            htls : function(id){
                self.app.platform.ui.wallet.send({id : id}, function(){
					
				})
            }
        },

        metmenu: function (_el, id, actions) {
            var share = self.sdk.node.shares.storage.trx[id]

            if (!share) {
                var temp = _.find(self.sdk.node.transactions.temp.share, function (s) {
                    return s.txid == id
                })
                
                if (temp){
                    share = new pShare();
                    share._import(temp);
                    share.temp = true;
                    share.address = self.app.platform.sdk.address.pnet().address
                }
                
            }

  
            var address = share.address

            var d = {};

            d.share = share

           

            self.app.platform.sdk.ustate.me(function (_mestate) {

                sm.fastTemplate('metmenu', function (rendered, template) {

                    var t = self.api.tooltip(_el, function () {

                        d.share = self.sdk.node.shares.storage.trx[id]
                        d.mestate = _mestate

                        return template(d);

                    }, function (el) {

                        el.find('.opennewwindow').on('click', function(){

                            var href = 'https://pocketnet.app/'

                            if(d.share.itisvideo()){
                                href += 'index?video=1&v=' + id
                            }
                            else
                            {
                                href += 'index?post?s=' + id
                            }

                            if(window.cordova){
                                cordova.InAppBrowser.open(href, '_blank');
                            }
                            else{
                                window.open(href, '_blank');
                            }
                        })

                        el.find('.htls').on('click', function () {

                            actions.htls(id)

                            _el.tooltipster('hide')
                        })

                        el.find('.socialshare').on('click', function () {


                            actions.sharesocial(id)

                            _el.tooltipster('hide')
                        })

                        el.find('.subscribe').on('click', function () {

                            self.api.actions.subscribe(address, function (tx, error) {
                                if (!tx) {
                                    self.errorHandler(error, true)
                                }
                            })

                            _el.tooltipster('hide')
                        })

                        el.find('.unsubscribe').on('click', function () {

                            self.api.actions.unsubscribe(address, function (tx, error) {
                                if (!tx) {
                                    self.errorHandler(error, true)
                                }
                            })

                            _el.tooltipster('hide')
                        })

                        el.find('.complain').on('click', function () {

                            actions.complain(id)

                            _el.tooltipster('hide')

                        })

                        el.find('.donate').on('click', function () {

                            actions.donate(id)

                            _el.tooltipster('hide')

                        })

                        el.find('.block').on('click', function () {

                            self.api.actions.blocking(address, function (tx, error) {
                                if (!tx) {
                                    self.errorHandler(error, true)
                                }
                            })

                            _el.tooltipster('hide')

                        })

                        el.find('.edit').on('click', function () {


                            var em = null;
                            var editing = d.share.alias()

                            var hash = editing.shash()

                            if (editing.settings.v == 'a') {

                                app.nav.api.load({
                                    open: true,
                                    href: 'article',
                                    inWnd: true,
                                    history: true,
                                    
                                    essenseData: {
                                        share: editing,
                                        hash: hash,
                                        
                                        save: function (art) {

                                        },
                                        close: function () {

                                        },
                                        complete: function () {

                                        },
                                        closeContainer: function () {

                                        }
                                    }
                                })

                            }
                            else {

                                app.nav.api.load({

                                    open: true,
                                    id: 'share',
                                    animation: false,
                                    inWnd: true,
                                    _id: d.share.txid,
                                    
                                    essenseData: {
                                        share: editing,
                                        notClear: true,
                                        hash: hash,
                                        absolute : true,
                                        cancel: function () {

                                            var close = deep(em, 'container.close')

                                            if (close)
                                                close()
                                        },

                                        post: function () {

                                            var close = deep(em, 'container.close')

                                            if (close)
                                                close()
                                        }
                                    },

                                    clbk: function (e, p) {
                                        em = p;
                                    }

                                })
                            }

                            _el.tooltipster('hide')

                        })

                        el.find('.videoshare').on('click', function () {
                            actions.videoShare(share)

                            _el.tooltipster('hide')
                        })
                    })

                }, d, 'components/lenta')
            })
        }
    }


    self.sdk = {

        registrations: {
            storage: {},
            clbks: {},

            remove: function (address) {

                if (!address && self.sdk.address.pnet()) address = self.sdk.address.pnet().address


                if (address) {

                    var ex = self.sdk.registrations.storage[address];

                    delete self.sdk.registrations.storage[address];

                    if (ex) {

                        self.sdk.registrations.save()

                        _.each(this.clbks, function (c) { c(address) })
                    }

                }


            },

            add: function (address, value) {

                /*if(self.sdk.registrations.storage[address] && self.sdk.registrations.storage[address] > value) return*/

                self.sdk.registrations.storage[address] = value || true;
                self.sdk.registrations.save()

                _.each(this.clbks, function (c) { c(address) })
            },

            showprivate : function(address){
                if (!address && self.sdk.address.pnet()) address = self.sdk.address.pnet().address

                var regs = self.sdk.registrations.storage[address];

                return (!self.sdk.registrations.storage[address + 'rm'] && regs && regs <= 5)
             
            },

            donotshowprivate : function(address){
                if (!address && self.sdk.address.pnet()) address = self.sdk.address.pnet().address

                self.sdk.registrations.storage[address + 'rm'] = true;
                self.sdk.registrations.save()

                _.each(this.clbks, function (c) { c(address) })
            },

            load: function () {
                var storage = {};

                var local = localStorage['registrations'] || "{}";

                if (local) {
                    try {
                        storage = JSON.parse(local)
                    }
                    catch (e) {
                    }
                }

                self.sdk.registrations.storage = storage;
            },
            save: function () {
                localStorage['registrations'] = JSON.stringify(self.sdk.registrations.storage || {});
            }
        },
        relayTransactions: {
            storage: {},

            arranges: ['userInfo'],

            send: function (clbk) {

                self.app.user.isState(function (state) {

                    if (state) {
                        var rs = self.sdk.relayTransactions.get();

                        var pn = self.sdk.address.pnet();

                        if (!_.isEmpty(rs)) {

                            self.sdk.node.transactions.get.balance(function (a) {

                                var arranges = _.clone(self.sdk.relayTransactions.arranges)

                                _.each(rs, function (tr, cat) {
                                    if (_.indexOf(arranges, cat) == -1) {
                                        arranges.push(cat)
                                    }
                                })

                                lazyEach({
                                    array: arranges,
                                    sync: true,
                                    action: function (p) {
                                        var key = p.item;

                                        var objects = rs[key]

                                        if (!objects || !objects.length) {
                                            p.success()
                                        }
                                        else {
                                            if (key == 'userInfo') {
                                                objects = [objects[objects.length - 1]]
                                            }

                                            lazyEach({
                                                sync: true,
                                                array: objects,
                                                action: function (p) {
                                                    var object = p.item;

                                                    if (object.sending) {

                                                        p.success()

                                                        return
                                                    }

                                                    var c = kits.c[object.type]

                                                    var trobj = new c();

                                                    trobj.import(object);

                                                    trobj.fromrelay = true;

                                                    object.sending = true;

                                                    self.sdk.node.transactions.create.commonFromUnspent(

                                                        trobj,

                                                        function (_alias, error) {

                                                            var eh = self.errors[error] || {}

                                                            delete object.sending;

                                                            if (error) {
                                                                if (key == 'userInfo') {

                                                                    var _nsh = bitcoin.crypto.hash256(JSON.stringify(object))

                                                                    if (error == '18' && _nsh != nshowed) {

                                                                        nshowed = _nsh

                                                                        app.nav.api.load({
                                                                            open: true,
                                                                            href: 'test',
                                                                            inWnd: true,

                                                                            essenseData: {
                                                                                caption: self.app.localization.e('e13265'),
                                                                                failedrelay : trobj
                                                                            }
                                                                        })

                                                                    }

                                                                    if (clbk)
                                                                        clbk()

                                                                    return


                                                                }
                                                            }

                                                            if (!error || (eh && !eh.relay)) {

                                                                if (key == 'userInfo') {

                                                                    delete rs[key]

                                                                }
                                                                else {
                                                                    rs[key] = _.filter(rs[key], function (t) {
                                                                        return t.txid != object.txid
                                                                    })
                                                                }

                                                                self.sdk.relayTransactions.save()

                                                            }
                                                            else {

                                                            }

                                                            p.success()

                                                        }
                                                    )



                                                },

                                                all: {
                                                    success: p.success
                                                }
                                            })
                                        }



                                    },

                                    all: {
                                        success: function () {
                                            if (clbk)
                                                clbk()
                                        }
                                    }
                                })

                            })

                        }
                        else {
                            if (clbk) clbk()
                        }
                    }

                })
            },

            withtemp: function (key) {

                var a1 = self.sdk.relayTransactions.get()[key] || []

                /*a1 = _.filter(a1, function(o){
                    return !o.sending
                })*/

                var a2 = _.toArray(self.sdk.node.transactions.temp[key] || {})

                return a1.concat(a2);

            },

            get: function () {
                var pn = self.sdk.address.pnet();
                var s = self.sdk.relayTransactions


                if (pn) {
                    var address = self.sdk.address.pnet().address;

                    return s.storage[address] || {};
                }

                return {}

            },

            add: function (address, alias) {

                var s = self.sdk.relayTransactions

                s.storage[address] || (s.storage[address] = {})
                s.storage[address][alias.type] || (s.storage[address][alias.type] = []);

                s.storage[address][alias.type].push(alias)

                s.save()
            },

            load: function () {
                var storage = {};

                var local = localStorage['relayTransactions'] || "{}";

                if (local) {
                    try {
                        storage = JSON.parse(local)
                    }
                    catch (e) {
                    }
                }

                self.sdk.relayTransactions.storage = storage;


            },
            save: function () {
                localStorage['relayTransactions'] = JSON.stringify(self.sdk.relayTransactions.storage || {});
            }
        },

        experiment: {
            pfa: function () {

                return

                var a = 'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM'

                var h = self.app.platform.sdk.address.pnet().hash;

                var p = "m/22'/";

                var a = []

                h.forEach(function (d) {
                    if (d) {
                        a.push(d)
                    }
                })

                p = p + a.join("'/")
                p = p + "/0"

                var chaincode = new Buffer('00000000000000000000000000000000')


                var k = self.app.user.keys()


                var d = bitcoin.bip32.fromPrivateKey(self.app.user.private.value, chaincode).derivePath(p).toWIF()

                var keyPair = bitcoin.ECPair.fromWIF(d)

                var pubkey = keyPair.publicKey;

                var a = bitcoin.payments['p2wpkh']({ pubkey: pubkey })

                var p2sh = bitcoin.payments.p2sh({ redeem: a })


                var d2 = bitcoin.bip32.fromPublicKey(self.app.user.key.value, chaincode).derivePath(p)



            }
        },

        imagesH: {
            storage: {},

            add: function (src, h) {
                var t = self.sdk.imagesH;

                t.storage[src] = h

                t.save()
            },

            delete: function (src, clbk) {

                var t = self.sdk.imagesH;

                if (t.storage[src]) {

                    self.app.ajax.run({
                        type: "DEL",
                        imgur: true,
                        data: {
                            Action: "image/" + t.storage[src],
                        },

                        success: function (data) {

                            delete t.storage[src]

                            if (clbk)
                                clbk()

                        },

                        fail: function () {

                            if (clbk)
                                clbk()
                        }
                    })

                }
                else {
                    if (clbk)
                        clbk()
                }
            },

            save: function () {
                localStorage['imagesH'] = JSON.stringify(self.sdk.imagesH.storage || {});
            },

            load: function (clbk) {
                var s = {};

                try {
                    s = JSON.parse(localStorage['imagesH'] || "{}")
                } catch (e) {

                }

                self.sdk.imagesH.storage = s;

                if (clbk)
                    clbk()

            }
        },
        articles: {

            storage: [],


            empty: function (id) {
                return {

                    id: id || makeid(),
                    caption: {
                        value: ''
                    },
                    images: [],
                    content: null,
                    tags : [],
                    u: ''
                    
                }
            },

            copy: function (art) {
                var _art = this.empty();

                _art.id = art.id;
                _art.u = art.u;
                _art.caption.value = art.caption.value;

                _art.images = _.clone(art.images);

                _.each(art.content, function (c, i) {
                    _art.content[i] = _.clone(c);
                })

                return _art;
            },

            getImages: function (cnt) {
                var h = $('<div>')

                h.html(cnt)

                var img = h.find('.medium-insert-images img');

                var _img = [];

                $.each(img, function () {

                    var src = $(this).attr('src');

                    if (src && src.length < 1000) {
                        _img.push(src)
                    }

                })

                return _img
            },

            getVideos: function (cnt) {
                var h = $('<div>')

                h.html(cnt)

                var videos = h.find('.js-player');

                var _videos = [];

                $.each(videos, function () {

                    var v = {
                        type: $(this).attr('data-plyr-provider'),
                        id: $(this).attr('data-plyr-embed-id')
                    }

                    if (v.type && v.id) {

                        _videos.push(v)

                    }

                })

                return _videos
            },

            getVideos: function (cnt) {
                var h = $('<div>')

                h.html(cnt)

                var videos = h.find('.js-player');

                var _videos = [];

                $.each(videos, function () {

                    var v = {
                        type: $(this).attr('data-plyr-provider'),
                        id: $(this).attr('data-plyr-embed-id')
                    }

                    if (v.type && v.id) {

                        _videos.push(v)

                    }

                })

                return _videos
            },

            lightVideo: function (content) {

                _.each(content, function (c, i) {
                    var html = c.value

                    var h = $('<div>')

                    h.html(html)

                    var v = h.find('.plyrvideo')

                    $.each(v, function () {

                        var cnt = $(this);

                        cnt.html('<div class="js-player" data-plyr-provider="' + cnt.attr('provider') + '" data-plyr-embed-id="' + cnt.attr('eid') + '"></div>')

                    })

                    c.value = h.html()
                })

                return content
            },

            echo: function (art) {
                var h = _.reduce(art.content || {}, function (m, el) {

                    return m + el.value

                }, '')

                return h
            },

            save: function () {


                var address = self.sdk.address.pnet().address;

                localStorage[address + 'articles'] = JSON.stringify(self.sdk.articles.storage || []);

            },

            load: function () {

                var articles = {};

                var address = self.sdk.address.pnet().address;

                var local = localStorage[address + 'articles'] || "[]";

                if (local) {
                    try {
                        articles = JSON.parse(local)
                    }
                    catch (e) {
                    }
                }

                return articles;

            },

            init: function (clbk) {
                var articles = self.sdk.articles.load();

                self.sdk.articles.storage = articles;

                if (clbk)
                    clbk()
            }
        },

        theme: {
            all: {
                white: {
                    name: self.app.localization.e('e13266'), ////ch
                    class: "stwhite"
                },

                black: {
                    name: self.app.localization.e('e13267'),
                    class: "stblack"
                }
            },
            default: "white",
            current: null,

            save: function () {

                var c = self.sdk.theme.current

                localStorage['usertheme'] = c;

            },

            load: function (clbk) {

                var t = self.sdk.theme

                t.current = localStorage['usertheme'] || t.default;

                t.set()

                if (clbk) clbk()
            },

            set: function (value) {

                var t = self.sdk.theme
                var h = $('html')

                if (!value) {
                    value = t.current || t.default
                }

                if (value && t.all[value]) {
                    _.each(t.all, function (c) {

                        h.removeClass(c.class)

                    })

                    h.addClass(t.all[value].class)

                    t.current = value

                    t.save()
                }
            }
        },

        usersettings: {

            meta: {

                win: {
                    name: self.app.localization.e('e13268'),
                    id: 'win',
                    type: "BOOLEAN",
                    value: true
                },

                transactions: {
                    name: self.app.localization.e('e13269'),
                    id: 'transactions',
                    type: "BOOLEAN",
                    value: true
                },

                upvotes: {
                    name: self.app.localization.e('e13270'),
                    id: 'upvotes',
                    type: "BOOLEAN",
                    value: true
                },

                downvotes: {
                    name: 'Downvotes receive',
                    id: 'downvotes',
                    type: "BOOLEAN",
                    value: false
                },

                comments: {
                    name: self.app.localization.e('e13271'),
                    id: 'comments',
                    type: "BOOLEAN",
                    value: true
                },

                answers: {
                    name: self.app.localization.e('e13272'),
                    id: 'answers',
                    type: "BOOLEAN",
                    value: true
                },

                followers: {
                    name: self.app.localization.e('e13273'),
                    id: 'followers',
                    type: "BOOLEAN",
                    value: true
                },

                rescued: {
                    name: self.app.localization.e('e13274'),
                    id: 'rescued',
                    type: "BOOLEAN",
                    value: true
                },

                commentScore: {
                    name: self.app.localization.e('e13275'),
                    id: 'commentScore',
                    type: "BOOLEAN",
                    value: true
                },

                embedvideo: {
                    name: self.app.localization.e('e13276'),
                    id: 'embedvideo',
                    type: "BOOLEAN",
                    value: true
                },

                videoautoplay: {
                    name: self.app.localization.e('e13277'),
                    id: 'videoautoplay',
                    type: "BOOLEAN",
                    value: true
                },

                autostart: {
                    name: self.app.localization.e('e13278'),
                    id: 'autostart',
                    type: "BOOLEAN",
                    value: undefined
                },

                vidgetchat: {
                    name: self.app.localization.e('e13279'),
                    id: 'vidgetchat',
                    type: "BOOLEAN",
                    value: true
                },

                vidgettags: {
                    name: self.app.localization.e('e13280'),
                    id: 'vidgettags',
                    type: "BOOLEAN",
                    value: true
                },

                vidgetlastcomments: {
                    name: self.app.localization.e('e13281'),
                    id: 'vidgetlastcomments',
                    type: "BOOLEAN",
                    value: true
                },
    
                vidgetstaking: {
                    name: 'Staking Pocketcoin vidget',
                    id: 'vidgetstaking',
                    type: "BOOLEAN",
                    value: true
                },

                telegram: {
                    type: "STRINGANY",
                    name: self.app.localization.e('e13282'),
                    id: 'telegram',
                    placeholder: self.app.localization.e('e13282'),
                    value: (JSON.parse(localStorage.getItem('telegrambot')) && JSON.parse(localStorage.getItem('telegrambot')).token) || "",
                    _onChange: function (value) {

                        if (value && self.app.user.features.telegram && value){


                            self.app.platform.sdk.system.get.telegramGetMe(value, true);
                            
                        }
                    }
                },

                tgfrom: {
                    type: "VALUES",
                    name: self.app.localization.e('e13283'),
                    id: 'tgfrom',
                    placeholder: self.app.localization.e('e13284'),
                    possibleValues: [],
                    possibleValuesLabels: [],
                    value: "",
                },
                tgto: {
                    type: "VALUES",
                    name: self.app.localization.e('e13287'),
                    id: 'tgto',
                    placeholder: self.app.localization.e('e13284'),
                    defaultValue: "",
                    value: "",
                    possibleValues: [],
                    possibleValuesLabels: [],

                },
                tgfromask: {
                    name: self.app.localization.e('e13285'),
                    id: 'tgfromask',
                    type: "BOOLEAN",
                    value: false
                },
                tgtoask: {
                    name: self.app.localization.e('e13286'),
                    id: 'tgtoask',
                    type: "BOOLEAN",
                    value: false
                },
                enablePeertube : {
					name: 'Use PeerTube for uploading videos',
					id : 'enablePeertube',
					type : "BOOLEAN",
					value : false,
				},

                hierarchicalShares : {
					name: 'Hierarchical Post Feed',
					id : 'hierarchicalShares',
					type : "BOOLEAN",
					value : false,
				},

                historicalShares : {
					name: 'Historical Post Feed',
					id : 'historicalShares',
					type : "BOOLEAN",
					value : false,
				},
            },

            create: function (id) {
                var m = self.sdk.usersettings.meta;

                var p = new Parameter(m[id])

                return p;
            },

            createall: function () {
                var create = self.sdk.usersettings.create
                var m = self.sdk.usersettings.meta;

                var options = {};

                _.each(m, function (p, id) {

                    options[id] = create(id)
                })

                return options
            },

            compose: function (make) {
                var s = self.sdk.usersettings;

                var options = s.createall()

                var m = s.meta;

                var c = {



                    notifications: {
                        class : 'notifications',
                        name: self.app.localization.e('notifications'),
                        options: {

                            win: options.win,
                            transactions: options.transactions,
                            upvotes: options.upvotes,
                            downvotes: options.downvotes,
                            comments: options.comments,
                            answers: options.answers,
                            followers: options.followers,
                            rescued: options.rescued,
                            commentScore: options.commentScore

                        }
                    },

                   /* postfeed : {
                        name: 'Post Feed',
                        options: {

                            historicalShares: options.historicalShares

                        }
                    },*/

                    video: {
                        name: self.app.localization.e('video'),
                        options: {
                            embedvideo: options.embedvideo,
                            videoautoplay: options.videoautoplay

                        }
                    },

                    /* vidgets: {
                        name: self.app.localization.e('e13288'),
                        options: {

                            vidgetchat: options.vidgetchat,
                           // vidgettags: options.vidgettags,
                            vidgetlastcomments: options.vidgetlastcomments,
                            vidgetstaking : options.vidgetstaking

                        }
                    },*/

                }


                if(!self.released.vidgets.staking){
                    delete c.vidgets.options.vidgetstaking
                }

                if (self.app.user.features.telegram) {

                    c.integrations = {
                        name: self.app.localization.e('e13289'),
                        options: {

                            telegram: options.telegram,
                            // tgfrom: options.tgfrom,
                            tgto: options.tgto,
                            // tgfromask: options.tgfromask,
                            tgtoask: options.tgtoask


                        }
                    }

                }


               

                if (electron) {
                    c.system = {
                        name: self.app.localization.e('system'),
                        options: {
                            autostart: options.autostart
                        }
                    }
                }

                _.each(options, function (o, i) {
                    o.onChange = function (v) {

                        if (m[i].type === "BOOLEAN") {

                            m[i].value = boolnum(v);

                        }

                        if (m[i].type === "STRINGANY") {

                            m[i].value = v;

                        }

                        if (m[i].type === "VALUES") {


                            const idx = m[i].possibleValues.indexOf(String(v));
                            m[i].value = m[i].possibleValuesLabels[idx];
                            m[i].valueId = Number(v);
                            // setTimeout(() => {$(`div[pid=${i}] input`).val(m[i].possibleValuesLabels[idx])}, 0)

                        }

                        s.save();


                        if (electron && i == 'autostart') {

                            const is = require('electron-is')

                            if(!is.macOS()){

                                const AutoLaunch = require('auto-launch');
                                let autoLaunch = new AutoLaunch({
                                    name: 'Pocketnet',
                                    path: electron.remote.app.getPath('exe'),
                                    isHidden: true
                                });
    
                                if (m[i].value) autoLaunch.enable();
                                else autoLaunch.disable();
                            }

                            
                        }


                        if (window.cordova) {

                            if (i == 'win' || i == 'transactions' || i == 'upvotes' || i == 'comments' || i == 'answers' || i == 'followers' || i == 'rescued') {


                                if (m[i].value) {
                                    self.firebase.api.subscribe(i)
                                }
                                else {
                                    self.firebase.api.unsubscribe(i)
                                }

                            }
                        }
                    }
                })

                return {
                    c: c,
                    o: options
                }

            },

            save: function () {

                var values = {};

                _.each(self.sdk.usersettings.meta, function (o, i) {

                    if (o.type === "VALUES") {

                        values[i] = {};
                        values[i].possibleValues = o.possibleValues && o.possibleValues.map(i => String(i));
                        values[i].possibleValuesLabels = o.possibleValuesLabels;
                        values[i].value = o.value;

                    } else {

                        values[i] = o;
                    }

                })

                localStorage['usersettings'] = JSON.stringify(values);
            },

            load: function () {

                var values = {};

                var local = localStorage['usersettings'];

                if (local) {
                    try {
                        values = JSON.parse(local)
                    }
                    catch (e) {

                    }
                }

                return values;

            },

            init: function (clbk) {
                var values = self.sdk.usersettings.load();
                var m = self.sdk.usersettings.meta;


                _.each(values, function (v, i) {

                    if(!m[i]) return

                    if (typeof v === "object") {

                        if (m && m[i]){

                            m[i].value = v.value;
                            m[i].possibleValues = v.possibleValues && v.possibleValues.map(i => String(i));
                            m[i].possibleValuesLabels = v.possibleValuesLabels;
                        }


                    } else {
                        m[i].value = v;

                    }

                    if (i === "telegram") {


                        if(self.app.platform.sdk.address.pnet()){
                            var a = self.app.platform.sdk.address.pnet().address

                            if (self.istest() || (a == 'PCAyKXa52WTBhBaRWZKau9xfn93XrUMW2s') || (a == 'PCBpHhZpAUnPNnWsRKxfreumSqG6pn9RPc') || (a == 'PJJbtb1AEcRopQuuBiRbQbiec7WHNtAEsF') || (a == 'PVCUYATJxi4yNM2sqThPxd3P6jJDrvuWJs')) {

                                self.app.user.features.telegram = 1;

                                var href = location.href;

                                if (href.indexOf('userpage?id=usersettings') === -1){


                                    self.app.platform.sdk.system.get.telegramGetMe(v.value);

                                }


                            } else {


                                self.app.user.features.telegram = 0;


                            }
                        }

                        
                    }
                })

                if (electron) {

                    const is = require('electron-is')

                    if(!is.macOS()){

                        const AutoLaunch = require('auto-launch');
                        let autoLaunch = new AutoLaunch({
                            name: 'Pocketnet',
                            path: electron.remote.app.getPath('exe'),
                            isHidden: true
                        });

                        // First launch
                        if (m.autostart.value === undefined) {
                            autoLaunch.enable();
                            m.autostart.value = true;
                            self.sdk.usersettings.save();
                        }

                        // Check autostart
                        autoLaunch.isEnabled().then((isEnabled) => {
                            m.autostart.value = isEnabled;

                            if (clbk) {
                                clbk()
                            }
                        }).catch(e =>{
                            m.autostart.value = isEnabled;
                            if (clbk) {
                                clbk()
                            }
                        });

                    }
                    else
                    {
                        if (clbk) {
                            clbk()
                        }
                    }
                }
                else {
                    if (clbk) {
                        clbk()
                    }
                }
            }
        },


        keys : {
            clbks : {

            },


            haskeys : function(){
                self.sdk.keys.need().then(r => {
                    return Promise.reject('empty')
                }).catch(err => {

                    if(err == 'exist'){
                        return Promise.resolve()
                    }

                    return Promise.reject(err)

                })
            },

            error : function(text){
                dialog({
                    html: "Pocketnet chat ask you to generate encryption keys. But some error with your profile update was occuried:<br><b>" + text + "</b>",
                    btn1text: 'Edit profile',
                    class : 'one',
                    success: function () {

                        self.app.nav.api.load({
                            open: true,
                            href: 'userpage?id=test',
                            history: true
                        })

                    }
                })
            },

            init : function(){

                return self.sdk.keys.need().then(me => {

                    if(self.loadingWithErrors){
                        return Promise.reject('loadingWithErrors')
                    }

                    var userInfo = new UserInfo();

						userInfo.name.set(me.name);
						userInfo.language.set(me.language);
						userInfo.about.set(me.about);
						userInfo.site.set(me.site);
						userInfo.image.set(me.image);
						userInfo.addresses.set(me.addresses);
						userInfo.ref.set(me.ref);

                        userInfo.keys.set(_.map(self.app.user.cryptoKeys(), function(k){
                            return k.public
                        }))

                    var err = userInfo.validation()

                    if (err){

                        var errtext = 'Undefined Error'
                        
						if(err == 'namelength'){
							errtext = 'The name length can be more than 20 symbols'
						}

						if(err == 'pocketnet'){
							errtext = 'To avoid user confusion using Pocketnet in name is reserved'
						}

                        self.sdk.keys.error(errtext)

                        return Promise.reject(err)
                    }

                    return new Promise((resolve, reject) => {

                        dialog({
                            html: "Pocketnet chat ask you to generate encryption keys. Do you want to proceed?",
                            btn1text: 'Generate Encryption Keys',
                            btn2text: self.app.localization.e('dno'),

                            success: function () {

                                self.sdk.node.transactions.create.commonFromUnspent(

                                    userInfo,
            
                                    function(tx, error){
            
                                        if(!tx){

                                            self.sdk.keys.error(self.sdk.errorHandler(error).text())
            
                                            reject(error)
            
                                        }
                                        else
                                        {
                                            self.sdk.users.getone(self.app.platform.sdk.address.pnet().address, function(){
                                                resolve('processing')
                                            })
                                        }
            
                                        
                                    }
                                )

                            },

                            fail: function () {
                                reject('no')
                            },

                            close: function () {
                                reject('close')
                            }
                        })

                    })

                    ///return Promise.resolve('processing')

                    

                }).catch(r => {

                    return Promise.resolve(r)

                })
            },
            need : function(){

                return new Promise((resolve, reject) => {
                    self.app.user.isState(function (state) {

                        if (state) {

                            var processing = _.toArray((self.sdk.node.transactions.temp.userInfo || {})).length > 0 || 
				
                            (self.sdk.address.pnet() && deep(self.sdk.relayTransactions.storage, self.sdk.address.pnet().address + '.userInfo.length') > 0 )

                            if (processing) {
                                return reject('processing')
                            }

                            var me = self.sdk.user.storage.me

                            if(!me || _.isEmpty(me)){
                                return reject('me')
                            }   
                            
                            if(me.keys && me.keys.length){
                                return reject('exist')
                            }

                            return resolve(me)
                        }
                        else
                        {
                            reject('state')
                        }
    
                    })
                })
            }
        },

        user: {

            storage: {
            },

            extendMe: function (me) {
                var subscribe = deep(self, 'sdk.node.transactions.temp.subscribe')
            },

            meUpdate: function (clbk) {
                self.sdk.user.get(clbk, true)
            },

            get: function (clbk, update) {
                var storage = self.sdk.user.storage

                self.sdk.user._get(function (info, temp) {


                    if (!temp && self.sdk.address.pnet()) {

                        var a = self.sdk.address.pnet().address;


                        if (!_.isEmpty(info)) {
                            self.app.settings.set(a, 'last_user', JSON.stringify(info))
                        }
                        else {
                            info = JSON.parse(self.app.settings.get(a, 'last_user') || "{}")

                            if (!_.isEmpty(info)) {

                                var u = new pUserInfo();

                                u._import(info)
                                u.address = a
                                u.regdate = new Date();
                                u.regdate.setTime(info.regdate * 1000);


                                info = u
                                self.sdk.usersl.storage[a] = u
                                self.sdk.users.storage[a] = u
                                storage.me = u



                            }
                        }

                    }

                    if (clbk)
                        clbk(info, temp)

                }, update)

                app.settings.set()

            },

            _get: function (clbk, update) {

                var storage = self.sdk.user.storage


                if (!storage.me || update) {

                    storage.me = {};

                    var temp = false;

                    var ui = deep(self, 'sdk.node.transactions.temp.userInfo')

                    if (ui && !_.isEmpty(ui)) {

                        temp = true;

                        var u = new pUserInfo();

                        u._import(_.toArray(ui)[0])

                        storage.me = u

                        u.temp = true

                        if (clbk)
                            clbk(storage.me, temp)
                    } else {

                        if (self.sdk.address.pnet()) {

                            

                            var a = self.sdk.address.pnet().address;


                            var relays = deep(self.sdk.relayTransactions.storage, a + '.userInfo');



                            if (relays && relays.length) {
                                temp = true;

                                ui = relays[relays.length - 1]

                                var u = new pUserInfo();


                                u._import(ui)

                                storage.me = u

                                u.relay = true

                                if (clbk)
                                    clbk(storage.me, temp)
                            }
                            else {
                                self.sdk.users.get(a, function () {


                                    storage.me = self.sdk.users.storage[a] || {};

                                    if (clbk)
                                        clbk(storage.me, temp)

                                })
                            }

                        }

                        else {
                            if (clbk)
                                clbk(storage.me)
                        }



                    }


                }
                else {
                    if (clbk)
                        clbk(storage.me)
                }
            },

            waitActions: function (clbk) {


                self.sdk.node.transactions.get.unspent(function (utxo) {

                    var wait = 'inf';

                    _.each(utxo, function (tx) {
                        var _w = self.sdk.node.transactions.waitSpend(tx)


                        if (wait == 'inf' || wait > _w) {
                            wait = _w;
                        }
                    })

                    if (self.sdk.node.transactions.haveTemp()) {

                        if (wait == 'inf' || wait > 10)
                            wait = 10;

                    }

                    if (clbk)
                        clbk(wait)

                })
            },

            subscribeRef: function (clbk) {

                var adr = self.app.platform.sdk.address.pnet().address;

                var adrref = localStorage[adr + 'subscribeRef'];

                

                if (adrref) {

                    delete localStorage['ref'];
                    
                    self.sdk.users.get(adrref, function () {

                        var r = self.sdk.usersl.storage[adrref]

                        if (r) {



                            self.sdk.node.transactions.get.unspents(function (unspents) {

                                self.sdk.node.transactions.get.canSpend([adr], function (cs) {

                                    if (cs) {

                                        delete localStorage[adr + 'subscribeRef'];

                                        var src = r.image

                                        var h = '<div class="refaddWrapper">'

                                        h += '<div class="refaddHeader">'
                                        h +=  self.app.localization.e('e13290') + ' ' + (r.name || adrref) + '?'
                                        h += '</div>'

                                        h += '<div class="refaddTable table">'
                                        h += '<div class="imageCell">'

                                        h += '<div class="usericon" image="' + (src || '') + '">'

                                        if (!src) {
                                            h += '<svg width="40" height="40" data-jdenticon-value="' + adrref + '"></svg>'
                                        }

                                        h += '</div>'

                                        h += '</div>'

                                        h += '<div class="nameCell">'

                                        h += (r.name || adrref)

                                        h += '</div>'

                                        h += '</div>'
                                        h += '</div>'

                                        dialog({
                                            html: h,
                                            btn1text: self.app.localization.e('dyes'),
                                            btn2text: self.app.localization.e('dno'),

                                            class: 'refadd',

                                            success: function () {

                                                topPreloader(10)

                                                self.api.actions.notificationsTurnOn(adrref, function (tx, error) {

                                                    if (!error) {

                                                        delete localStorage[adr + 'subscribeRef'];

                                                    }

                                                    topPreloader(100)


                                                })

                                            },

                                            fail: function () {
                                                delete localStorage[adr + 'subscribeRef'];
                                            },

                                            close: function () {
                                                delete localStorage[adr + 'subscribeRef'];
                                            }
                                        })
                                    }




                                })
                            })
                        }


                    }, true)
                }

                if (clbk) {
                    clbk()
                }


            },

            me: function () {
                var me = null;
                var address = self.app.platform.sdk.address.pnet()

                if (address) {
                    me = self.app.platform.sdk.users.storage[address.address];

                    return me
                }
            }
        },

        processes: {
            storage: {},

            level: function (reputation) {
                if (this.storage.p && typeof reputation != 'undefined') {

                    var lvl = _.find(this.storage.p, function (c) {
                        return c.reputation > reputation && c.prev <= reputation
                    })

                    if (lvl) {
                        var lobj = {

                            perc: (reputation - lvl.prev) / (lvl.reputation - lvl.prev),
                            level: lvl.level,
                            reputation: lvl.reputation,
                            bonus: lvl.bonus

                        }

                        return lobj
                    }

                    else {
                        return {
                            level: 999,
                            max: true
                        }
                    }
                }

                return null
            },

            get: function (clbk) {

                var s = this.storage;

                if (clbk)
                    clbk(null)


                return

                if (s.p) {
                    if (clbk)
                        clbk(s.p)
                }

                else {

                    self.app.api.fetch('processes').then(d => {
                        var inited = deep(d, 'data.info.inited');

                        if (!inited) {
                            if (clbk)
                                clbk(null)
                        }
                        else {
                            var fill = deep(d, 'data.info.fill');

                            s.p = fill

                            _.each(s.p, function (c, i) {
                                if (i) c.prev = s.p[i - 1].reputation
                            })

                            if (clbk)
                                clbk(s.p)
                        }

                    }).catch(e => {
                        if (clbk)
                            clbk(null, e)
                    })

                }

            },

            gifts: function (clbk) {

                if (clbk)
                    clbk(null)

                return

                self.app.api.fetch('checkgift', {
                    address: self.sdk.address.pnet().address
                }).then(d => {
                    if (clbk)
                        clbk(deep(d, 'data.gifts') || [])

                }).catch(e => {
                    if (clbk)
                        clbk([])
                })

              
            }
        },

        ustate: {
            storage: {},

            clbks: {},

            validationcurrent: function (address, parameter, clbk) {
                var s = self.sdk.ustate.storage;


                if (!address && state) address = self.sdk.address.pnet().address;

                var info = s[address];
                var result = true;
                var error = false;

                if (!info) {
                    result = false;
                    error = 'info';
                }
                else {

                    if (!info.trial) {
                        if (parameter == 'postunspent' && info.post_unspent <= 0) {
                            result = false;
                        }

                        if (parameter == 'scoreunspent' && info.score_unspent <= 0) {
                            result = false;
                        }
                    }
                    else {
                        result = false;
                        error = 'trial';
                    }

                    if (!result) {
                        error = parameter
                    }

                }

                return result, error

            },

            attention: function (num, clbk) {

                var s = self.sdk.ustate.storage;
                var address = self.sdk.address.pnet().address;

                self.app.user.isState(function (state) {

                    if (state) {
                        var info = s[address];

                        var me = self.sdk.user.storage.me

                        if (!me || !me.image || !me.name) {
                            if (clbk)
                                clbk('notuserinfo')

                            return
                        }

                        if (!info) {
                            if (clbk)
                                clbk('notinfo')

                            return
                        }

                        if (info.post_unspent <= num) {
                            if (clbk)
                                clbk('postunspent')

                            return
                        }

                        if (info.score_unspent <= num) {
                            if (clbk)
                                clbk('scoreunspent')

                            return
                        }

                        /*if (info.trial){
                            if (clbk)
                                clbk('trial')

                            return
                        }*/
                    }



                    if (clbk)
                        clbk(false)

                })

            },

            meUpdate: function (clbk) {
                self.sdk.ustate.me(clbk, true)
            },

            me: function (clbk, update) {

                var s = self.sdk.ustate.storage;

                self.sdk.ustate._me(function (info) {

                    if (self.sdk.address.pnet()) {
                        var a = self.sdk.address.pnet().address;

                        if (!_.isEmpty(info)) {
                            self.app.settings.set(a, 'last_ustate', JSON.stringify(info))
                        }
                        else {
                            info = JSON.parse(self.app.settings.get(a, 'last_ustate') || "{}")

                            if (!_.isEmpty(info)) {

                                s[a] = info;

                            }
                        }
                    }



                    if (clbk)
                        clbk(info)

                }, update)

                app.settings.set()

            },

            _me: function (clbk, update) {
                var s = self.sdk.ustate.storage;

                self.app.user.isState(function (state) {

                    if (state) {
                        var address = self.sdk.address.pnet().address;

                        self.sdk.ustate.get(address, function () {


                            if (clbk)
                                clbk(s[address])

                        }, update)
                    }
                    else {
                        if (clbk)
                            clbk({})
                    }


                })


            },
            get: function (addresses, clbk, update) {
                if (!_.isArray(addresses)) addresses = [addresses]

                var s = this.storage;
                var temp = self.sdk.node.transactions.temp;

                if (!update)

                    addresses = _.filter(addresses, function (a) {
                        if (!s[a]) return true
                    })

                addresses = _.uniq(addresses)


                if (addresses.length) {
        
                    self.app.api.rpc('getuserstate', [(addresses || []).join(',')]).then(d => {

                        if (d && !_.isArray(d)) d = [d]

                        _.each(d || [], function (info) {
                            s[info.address] = info
                        })


                        if (clbk)
                            clbk(d)


                    }).catch(e => {
                        if (clbk)
                            clbk([])
                    })

                    /*self.app.ajax.rpc({
                        method: 'getuserstate',
                        parameters: [(addresses || []).join(',')],
                        success: function (d) {

                            

                        },

                        fail: function () {

                            if (clbk)
                                clbk([])
                        }
                    })*/

                }
                else {
                    if (clbk)
                        clbk()
                }
            }

        },

        notifications: {
            storage: {},

            inited: false,

            clbks: {
                added: {},
                seen: {}
            },
            clearlocalstorage : function(){

                var values = {},
                    keys = Object.keys(localStorage),
                    i = keys.length;
            
                while ( i-- ) {

                    if(keys[i] && keys[i].indexOf('notificationsv') > -1){

                        if(keys[i].indexOf('notificationsv14') == -1){
                            localStorage.removeItem(keys[i]);
                        }

                        
                    }

                }
            
            },
            load: function () {

                var old = {}

                try { old = JSON.parse(localStorage[self.sdk.address.pnet().address + 'notificationsv14'] || "{}") } catch (e){}

                this.import(old)

            },
            save: function () {
                this.clearlocalstorage()
                var e = this.export();
                
                if (self.currentBlock && this.inited == true) {

                    e.notifications = _.uniq(e.notifications, function (n) {

                        if (n.txid) return n.txid

                        return makeid()

                    })
                    
                    e.notifications = firstEls(e.notifications, 50)

                    localStorage[self.sdk.address.pnet().address + 'notificationsv14'] = JSON.stringify(e)
                }


            },

            seenall: function () {
                var n = this

                _.each(n.storage.notifications, function (notification) {
                    if(!notification.seen)
                        notification.seen = self.app.platform.currentTime()
                })

                n.save()

                _.each(n.clbks.seen, function (f) {
                    f()
                })
            },

            seen: function (ids) {
                var n = this

                _.each(ids, function (id) {

                    var notification = _.find(n.storage.notifications, function (n) {
                        return n.txid == id
                    })

                    if (notification)
                        notification.seen = self.currentTime()
                })

                n.save()

                _.each(n.clbks.seen, function (f) {
                    f()
                })
            },

            import: function (exported) {
                var imported = [];

                _.each(exported.notifications, function (l) {
                    var imp = {};

                    _.each(l, function (attr, i) {
                        if (attr.exported) {
                            var alias = new kits.alias[attr.type]()

                            alias._import(attr.exported)

                            imp[i] = alias
                        }
                        else {
                            imp[i] = attr
                        }

                    })

                    imported.push(imp)
                })

                if (imported.length)
                    this.storage.notifications = imported

                if (exported.block)
                    this.storage.block = exported.block

            },

            export: function () {
                var exported = [];


                _.each(this.storage.notifications, function (n) {

                    var l = {};

                    _.each(n, function (attr, i) {

                        if (!attr) return;

                        if (attr.export) {
                            l[i] = {
                                exported: attr.export(),
                                type: attr.type
                            }
                        }
                        else {
                            l[i] = attr
                        }

                    })

                    exported.push(l)

                })

                return {
                    block: this.storage.block,
                    notifications: exported
                }
            },

            init: function () {

                if(_OpenApi){
                    return Promise.reject('openapi')
                }

                this.inited = false;
                this.loading = true;

                this.load();

                this.storage.block || (this.storage.block = self.currentBlock)
                this.storage.notifications || (this.storage.notifications = [])

                
                    return this.getNotifications()
    

                

            },

            wsBlock: function (block) {

                this.storage.block = block;

                this.save()
            },

            addFromWs: function (data) {

                data.nblock || (data.nblock = self.currentBlock);

                if (data.msg == 'transaction' && data.address == self.sdk.address.pnet().address && !deep(data, 'tx.coinbase')) {
                    return
                }

                if (this.storage.notifications) {
                    this.storage.notifications.unshift(data)

                    _.each(this.clbks.added, function (f) {
                        f([data], true)
                    })

                    this.save()
                }

            },

            getNotificationsInfo: function (notifications, clbk) {
                var n = this;

                n.loading = true

                notifications = _.filter(notifications, function (ns) {
                    if (ns.loading || ns.loaded || !self.ws.messages[ns.msg]) return false;

                    if (ns.commentid && _.find(n.storage.notifications, function (n) {
                        return n.commentid == ns.commentid
                    })) return false

                    if (ns.msg == "transaction" && ns.txinfo && ns.txinfo.pockettx) {
                        return false
                    }

                    return true
                })

                notifications = _.sortBy(notifications, function (n) {
                    return -Number(n.nblock)
                })

                notifications = firstEls(notifications, 50)

                lazyEach({
                    array: notifications,
                    action: function (p) {


                        var ns = p.item;
                        var m = null;

                        ns.loading = true;

                        if (ns.mesType) m = self.ws.messages[ns.mesType]
                        if (ns.msg && !m) m = self.ws.messages[ns.msg]


                        if (m) {
                            m.loadMore(ns, function () {
                                ns.loaded = true;

                                ns.loading = false;

                                p.success()

                            }, true)
                        }
                        else {
                            p.success()
                        }

                    },
                    sync: true,
                    all: {
                        success: function () {

                            n.loading = false

                            var ns = _.filter(notifications, function (no) {
                                if (no.msg == 'transaction' && no.address == self.sdk.address.pnet().address) {
                                    return
                                }
                                return true
                            })

                            var added = [];

                            _.each(ns, function (no) {

                                var f = _.find(n.storage.notifications, function (n) {
                                    if (no.txid && n.txid == no.txid) return true
                                })

                                if (!f) {
                                    added.push(no)

                                    if (n.storage.notifications)
                                        n.storage.notifications.push(no)
                                }


                            })

                            _.each(n.clbks.added, function (f) {
                                f(added)
                            })

                            if (clbk)
                                clbk()
                        }
                    }
                })
            },

            getNotifications: function () {
                var n = this;

                if(!n.inited && !n.loading) {
                    return n.init()
                }
                else {

                    return self.sdk.node.get.timepr().then(r => {

                        return self.sdk.missed.get(n.storage.block)
                        
                    })

                    .then(({block, notifications}) => {

                        n.storage.block = block.block

                        return new Promise((resolve, reject) => {

                            n.getNotificationsInfo(notifications, function () {

                                n.inited = true;
    
                                n.save()
    
                                resolve()
    
                            })

                        })

                        

                    }).catch(e => {
                        n.inited = false;
                        n.loading = false;


                        return Promise.reject(e)
                    })

                }


            },

            find: function (txid) {
                return _.find(this.storage.notifications, function (n) {
                    return n.txid == txid
                })
            }
        },

        missed : {
            get : function(block){

                var dummy = function(){
                    return {
                        block : {
                            block : self.currentBlock,
                            contentsLang : {},
                            msg : 'newblocks'
                        }
                    }
                }

                if(!self.sdk.address.pnet()) return Promise.reject('address')
                if(!self.currentBlock) return Promise.reject('currentblock')
                if(!block) return Promise.reject('block')
                if (self.currentBlock - block > 5000) block = self.currentBlock - 5000
                if (self.currentBlock == block) return Promise.resolve(dummy())


                return self.app.api.rpc('getmissedinfo', [self.sdk.address.pnet().address, block]).then(d => {

                    if(!d || !d.length){
                        return Promise.resolve(dummy())
                    }

                    var notifications = d.slice(1) || []

                        notifications = _.sortBy(notifications, function (n) {
                            return -n.nblock
                        })

                    d[0].msg = 'newblocks'

                    return Promise.resolve({
                        block : d[0],
                        notifications : notifications
                    })
    
                })
            }
        },

        contents: {
            storage: {},
            loading : {},

            groups: [{
                key: 'art',
                caption: "Articles"
            }, {
                key: 'post',
                caption: "Posts"
            }],

            gets: function (contents, sort) {

                if (!sort) sort = 'popularity'

                var groups = group(contents, function (c) {
                    if (c.settings.v == 'a') return 'art'

                    return 'post'
                })

                var f = _.filter(this.groups, function (g) {
                    if (groups[g.key]) {
                        return true;
                    }
                })

                f = _.map(f, function (f) {

                    var items = groups[f.key];

                    if (sort) items = _.sortBy(items, function (i) {

                        if (sort == 'popularity') return -Number(i.scoreSum)

                    })

                    return {
                        g: f,
                        items: items
                    }
                })

                return f;
            },

            getsorteditems: function (contents, sort) {
                var g = this.gets(contents, sort)
                var items = []


                _.each(g, function (g) {
                    _.each(g.items, function (item) {
                        items.push(item)
                    })
                })

                return items
            },

            get: function (address, clbk) {

                var st = self.sdk.contents.storage
                var ld = self.sdk.contents.loading
                var gt = self.sdk.contents.get

                var timecache = deep(st, address + ".time")

                if (timecache && timecache.addMinutes(100) > (new Date())) {

                    if (clbk)
                        clbk(deep(this, 'storage.' + address + ".data"))

                    return
                }

                if (ld[address]){
                    retry(function(){
                        return !ld[address]
                    }, function(){
                        gt(address, clbk)
                    })

                    return
                }

                ld[address] = true

                self.app.api.rpc('getcontents', [address]).then(d => {

                    var list = [];

                    _.each(d || [], function (d) {

                        if (!d.content) return

                        try {

                            var c = {
                                caption: filterXSS(decodeURIComponent(d.content), {
                                    whiteList: [],
                                    stripIgnoreTag: true
                                }),
                                time: new Date(d.time),
                                txid: d.txid,
                                settings: JSON.parse(d.settings),
                                scoreCnt: Number(d.scoreCnt),
                                scoreSum: Number(d.scoreSum),
                            }

                            c.score = 0;

                            if (c.scoreCnt) c.score = Number(c.scoreSum) / Number(c.scoreCnt)

                            list.push(c)
                        }
                        catch (e) {

                        }


                    })

                    st[address] = {
                        data: list,
                        time: new Date()
                    }

                    ld[address] = false

                    if (clbk)
                        clbk(list)
        
                }).catch(e => {
                    
                })


            }
        },

        usersl: {
            storage: {},
        },

        users: {
            loading: {},
            storage: {},


            extend: function (u, state) {

                var ext = function (temp) {
                    _.each(temp.blocking, function (block) {
                        u.addRelation(block.vsaddress, 'blocking')
                    })

                    _.each(temp.unblocking, function (block) {
                        u.removeRelation(block.vsaddress, 'blocking')
                    })

                    _.each(temp.subscribe, function (s) {

                        u.removeRelation({
                            adddress: s.vsaddress
                        })

                        u.addRelation({
                            adddress: s.vsaddress,
                            private: false
                        })
                    })

                    _.each(temp.subscribePrivate, function (s) {

                        u.removeRelation({
                            adddress: s.vsaddress
                        })

                        u.addRelation({
                            adddress: s.vsaddress,
                            private: true
                        })
                    })

                    _.each(temp.unsubscribe, function (s) {

                        u.removeRelation({
                            adddress: s.vsaddress
                        })

                    })
                }

                if (state && self.sdk.address.pnet() && u.address == self.sdk.address.pnet().address) {

                    var temp = self.sdk.node.transactions.temp || {};
                    var relay = self.sdk.relayTransactions.get();

                    ext(temp)
                    ext(relay)


                }


            },

            prepareuser: function (data, a, state) {

                var temp = self.sdk.node.transactions.temp;
                var relay = self.sdk.relayTransactions.storage;

                var u = new pUserInfo();
                u.regdate = new Date();

                if (state && temp['userInfo'] && !_.isEmpty(temp['userInfo']) && a == self.sdk.address.pnet().address) {

                    u._import(_.toArray(temp['userInfo'])[0])
                    u.regdate.setTime(self.currentTime() * 1000);

                }
                else {

                    if (state && a == self.sdk.address.pnet().address && relay[a] && relay[a]['userInfo'] && relay[a]['userInfo'].length) {

                        var uin = relay[a]['userInfo']

                        u._import(uin[uin.length - 1])
                        u.regdate.setTime(self.currentTime() * 1000);
                        u.relay = true

                    }
                    else {
                        if (!data) return

                        u._import(data)
                        u.regdate.setTime(data.regdate * 1000);

                    }

                }

                u.address = a


                if(self.real[a]) u.real = true

                self.sdk.users.extend(u, state)

                return u
            },

            getone: function (address, clbk, light, reload) {
                var s = self.sdk.users.storage;
                var l = self.sdk.users.loading;

                if ((!address || s[address]) && !reload) {
                    if (clbk)
                        clbk()
                }

                else {

                    if (l[address]) {
                        retry(function () {

                            return !l[address]

                        }, function () {

                            if (clbk)
                                clbk()

                        })

                        return
                    }

                    l[address] = true;

                    var params = [[address]];

                    if (light) {
                        params.push('1')
                    }

                    self.app.user.isState(function (state) {

                        self.app.api.rpc('getuserprofile', params).then(d => {

                            l[address] = false;

                            if (typeof pUserInfo != 'undefined') {

                                var data = d[0];

                                var u = self.sdk.users.prepareuser(data, address, state)


                                s[address] = u;

                                self.sdk.usersl.storage[address] = u;


                            }

                            if (clbk)
                                clbk()
        
                        }).catch(e => {
                            l[address] = false;

                            if (clbk)
                                clbk(null, e)
                        })

                        

                    })
                }
            },
            get: function (addresses, clbk, light) {
                if (!_.isArray(addresses)) addresses = [addresses]

                var ia = addresses

                var s = self.sdk.users.storage;

                if (light) {
                    s = self.sdk.usersl.storage
                }

                addresses = _.filter(addresses, function (a) {

                    if (!a) return false

                    if (!s[a]) return true
                })

                addresses = _.uniq(addresses)

                if (addresses.length) {

                    self.app.user.isState(function (state) {

                        var params = [(addresses || [])];

                        if (light) {
                            params.push('1')
                        }

                        self.app.api.rpc('getuserprofile', params).then(d => {

                            _.each(addresses || [], function (a) {

                                var data = _.find(d, function (d) {
                                    if (d.address == a) return true
                                })

                                var u = self.sdk.users.prepareuser(data, a, state)

                                s[a] = u;
                                self.sdk.usersl.storage[a] = u;

                            })


                            if (clbk)
                                clbk()
        
                        }).catch(e => {
                            if (clbk)
                                clbk(null, e)
                        })

                       /* self.app.ajax.rpc({
                            method: 'getuserprofile',
                            parameters: params,
                            success: function (d) {

                                

                            },

                            fail: function (d, e) {
                                if (clbk)
                                    clbk(null, e)
                            }
                        })*/
                    })
                }
                else {
                    if (clbk)
                        clbk()
                }


            },


            /////////////// REGISTRATION

            requestFreeMoney: function (clbk) {

                var a = self.sdk.address.pnet();

                if (a) {
                    a = a.address;


                    this.checkFreeMoney(a, function (r) {
                        if (!r) {
                            if (clbk)
                                clbk(null)
                        }
                        else {

                            /*if (!self.sdk.captcha.done && !_Node){
                                if (clbk)
                                    clbk(null, 'captcha')
                            }
                            else{*/

                            var prms = {
                                address: a,
                                emailVerification: self.app.platform.sdk.user.storage.emailVerification,
                                captcha: self.sdk.captcha.done
                            }

                            self.app.platform.sdk.user.storage.emailVerification = '';

                            self.app.api.fetchauth('free/registration', prms).then(d => {

                                console.log('then!!', d);
                                if (clbk)
                                        clbk(true)

                            }).catch(e => {
                                if (clbk)
                                    clbk(null, e)
                            })
                        }
                    })
                }
                else {
                    if (clbk)
                        clbk(null)
                }


            },

            giveFreeMoney: function (toAddress, mnemonic, clbk, amount, update) {

                this.checkFreeMoney(toAddress, function (r) {

                    if (!r) {
                        if (clbk)
                            clbk('nofree')
                    }
                    else {
                        var feerate = 0.000001;

                        amount || (amount = 0.00002);

                        var outputs = [{
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }, {
                            address: toAddress,
                            amount: amount
                        }]

                        var seed = bitcoin.bip39.mnemonicToSeedSync(mnemonic);
                        var hash = bitcoin.crypto.sha256(Buffer.from(seed));
                        var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();
                        var keyPair = bitcoin.ECPair.fromWIF(d);
                        var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;

                        self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function (err, inputs, _outputs) {

                            if (err) {
                                if (clbk)
                                    clbk(err)
                            }

                            else {
                                var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
                                var totalFees = Math.min(tx.virtualSize() * feerate, 0.000006);



                                self.app.platform.sdk.wallet.txbase([address], _.clone(outputs), totalFees, null, function (err, inputs, _outputs) {

                                    if (err) {

                                        

                                        self.sdk.node.transactions.releaseCS(inputs)

                                        if (clbk)
                                            clbk(err)
                                    }
                                    else {
                                        var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

                                        self.app.platform.sdk.node.transactions.send(tx, function (d, err) {

                                            if (err) {

                                                self.sdk.node.transactions.releaseCS(inputs)

                                                if ((err == -26 || err == -25 || err == 16) && !update) {
    
                                                    self.sdk.users.giveFreeMoney(toAddress, mnemonic, clbk, amount, true)
            
                                                    return
                                                }
                                                

                                                if (clbk)
                                                    clbk(err)
                                            }

                                            else {
                                                var ids = _.map(inputs, function (i) {
                                                    return {
                                                        txid: i.txId,
                                                        vout: i.vout
                                                    }
                                                })

                                                self.app.platform.sdk.node.transactions.clearUnspents(ids)

                                                if (clbk)
                                                    clbk(null, d, amount * outputs.length)
                                            }
                                        })
                                    }
                                })
                            }
                        }, update)
                    }

                })
            },

            checkFreeMoney: function (address, clbk) {
                self.sdk.users.get(address, function () {

                    var name = deep(self, 'sdk.users.storage2.' + address + '.name');


                    if (name) {

                        if (clbk)
                            clbk(false)
                    }

                    else {
                        self.sdk.address.registration(address, function (r) {

                            if (!r) {

                                self.sdk.node.transactions.get.balance(function (a) {

                                    if (a > 0) {
                                        if (clbk)
                                            clbk(false)
                                    }
                                    else {
                                        if (clbk)
                                            clbk(true)
                                    }

                                }, address, true)

                            }
                            else {
                                if (clbk)
                                    clbk(false)
                            }
                        })
                    }

                })
            },

            /////////////// REFERALS
            giveFreeRef: function (refferal, toAddress, mnemonic, clbk, amount) {

                this.checkFreeRef(refferal, function (r) {

                    if (!r) {
                        if (clbk)
                            clbk('nofree')
                    }
                    else {
                        var feerate = 0.000001;

                        amount || (amount = 0.005);

                        var outputs = [{
                            address: toAddress,
                            amount: amount
                        }]

                        var seed = bitcoin.bip39.mnemonicToSeedSync(mnemonic);
                        var hash = bitcoin.crypto.sha256(Buffer.from(seed));
                        var d = bitcoin.bip32.fromSeed(seed).derivePath(app.platform.sdk.address.path(0)).toWIF();
                        var keyPair = bitcoin.ECPair.fromWIF(d);
                        var address = self.sdk.address.pnet(keyPair.publicKey, 'p2pkh').address;

                        self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function (err, inputs, _outputs) {

                            if (err) {
                                if (clbk)
                                    clbk(err)
                            }

                            else {
                                var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
                                var totalFees = Math.min(tx.virtualSize() * feerate, 0.0005);



                                self.app.platform.sdk.wallet.txbase([address], _.clone(outputs), totalFees, null, function (err, inputs, _outputs) {

                                    if (err) {

                                        self.sdk.node.transactions.releaseCS(inputs)

                                        if (clbk)
                                            clbk(err)
                                    }
                                    else {
                                        var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

                                        self.app.platform.sdk.node.transactions.send(tx, function (d, err) {

                                            if (err) {
                                                self.sdk.node.transactions.releaseCS(inputs)

                                                if (clbk)
                                                    clbk(err)
                                            }

                                            else {
                                                var ids = _.map(inputs, function (i) {
                                                    return {
                                                        txid: i.txId,
                                                        vout: i.vout
                                                    }
                                                })

                                                self.app.platform.sdk.node.transactions.clearUnspents(ids)

                                                if (clbk)
                                                    clbk(null, d, amount)
                                            }
                                        })
                                    }
                                })
                            }
                        }, true)
                    }

                })
            },
            requestFreeRef: function (address, clbk) {

                var a = self.sdk.address.pnet();

                if (a) {
                    a = a.address;

                    this.checkFreeRef(a, function (r) {
                        if (!r) {
                            if (clbk)
                                clbk(null)
                        }
                        else {

                            self.app.api.fetch('freeRef', {
                                referal: a,
                                referrer: address
                            }).then(d => {
                                if (clbk)
                                    clbk(true)

                            }).catch(e => {
                                if (clbk)
                                    clbk(null, deep(d, 'data') || {})
                            })
                            
                            
                        }
                    })
                }
                else {
                    if (clbk)
                        clbk(null)
                }


            },

            checkFreeRef: function (address, clbk) {

                if (!address) {
                    if (clbk)
                        clbk(true)

                    return
                }


                self.sdk.users.get(address, function () {

                    var name = deep(self, 'sdk.users.storage2.' + address + '.name');

                    if (name) {

                        if (clbk)
                            clbk(false)
                    }

                    else {

                        if (clbk)
                            clbk(true)

                    }
                })


            },

            //////////////// ANOTHER

            addressByName: function (name, clbk) {


                var valid = true;

                try {
                    bitcoin.address.fromBase58Check(name)
                }

                catch (e) {
                    valid = false;
                }

                if (valid) {
                    if (clbk)
                        clbk(name)
                }
                else {

                    var lf = _.find(self.sdk.usersl.storage, function (s) {
                        if (s.name == name) return true
                    })

                    if(!lf){
                        lf = _.find(self.sdk.users.storage, function (s) {
                            if (s.name == name) return true
                        })
                    }

                    if (lf) {
                        if (clbk)
                            clbk(lf.address)

                    }
                    else {

                        self.app.api.rpc('getuseraddress', [name]).then(d => {

                            var r = deep(d, '0.address');

                            if (clbk)
                                clbk(r || null)
        
                        }).catch(e => {
                            if (clbk) {
                                clbk(null, e)
                            }
                        })
                        
                    }

                }

            },

            nameExist: function (name, clbk) {

                var map = self.app.map;

                if (map[name] || _.find(map, function (m, i) {
                    if (m.uri == name) return true;
                    if (m.href == name) return true;
                })) {



                    if (clbk)
                        clbk('pnetsystem')

                    return
                }

                self.app.api.rpc('getuseraddress', [encodeURIComponent(name)]).then(d => {
                    var r = deep(d, '0.address');

                    if (clbk)
                        clbk(r || false)
   
        
                }).catch(e => {
                    if (clbk) {
                        clbk(false)
                    }
                })

            },

            replacePattern: function (str, h, p) {

                var sreg = /@([^,]+),/g

                var name = str.match(sreg);

                if (!name) {
                    return str
                }
                else {
                    var cname = h(name, p)

                    return str.replace(sreg, cname)
                }

            }
        },

        newmaterials : {
            storage : {},

            clbks : {
                update : {}
            },

            update : function(data){

                var counts = {
                    sub : data['sharesSubscr'] || 0,
                    video : deep(data, 'contentsLang.video.' + self.app.localization.key)|| 0,
                    common : deep(data, 'sharesLang.' + self.app.localization.key) || ( (deep(data, 'contentsLang.share.' + self.app.localization.key) || 0) + (deep(data, 'contentsLang.video.' + self.app.localization.key)|| 0))
                }

                _.each(counts, function(c, i){
                    // c = rand(1,3)
                    self.sdk.newmaterials.storage[i] = (self.sdk.newmaterials.storage[i] || 0) + c
                })

                _.each(self.sdk.newmaterials.clbks.update, function(u){
                    u(self.sdk.newmaterials.storage)
                })


            },

            clear : function(){

                self.sdk.newmaterials.storage = {}

                _.each(self.sdk.newmaterials.clbks.update, function(u){
                    u(self.sdk.newmaterials.storage)
                })
            },

            see : function(key){

                self.sdk.newmaterials.storage[key] = 0

                _.each(self.sdk.newmaterials.clbks.update, function(u){
                    u(self.sdk.newmaterials.storage)
                })
            }
        },

        captcha: {
            storage: {},
            current: null,
            done: null,
            load: function (clbk) {
                self.sdk.captcha.done = localStorage['capcha'] || null;

                if (clbk) clbk()
            },
            save: function () {

                if (self.sdk.captcha.done) {
                    localStorage['capcha'] = self.sdk.captcha.done
                }
                else {
                    delete localStorage['capcha']
                }

            },
            get: function (clbk, refresh) {
                if (refresh) this.current = null;

                self.app.api.fetch('captcha', {
                    captcha: this.done || this.current || null
                }).then(d => {


                    self.sdk.captcha.current = d.id

                    if (d.id != self.sdk.captcha.done) {
                        self.sdk.captcha.done = null
                    }

                    self.sdk.captcha.save()

                    if (d.result && !d.done) {
                        self.sdk.captcha.make(d.result, function (err) {

                            if (!err) {

                                d.done = true

                                if (clbk)
                                    clbk(d)

                            }
                            else {
                                if (clbk)
                                    lbk(null, err)
                            }
                        })
                    }
                    else {
                        if (clbk)
                            clbk(d)
                    }

                }).catch(e => {
                    if (clbk)
                        clbk(null, e)
                })

               
            },

            make: function (text, clbk) {

                self.app.api.fetchauth('makecaptcha', {
                    captcha: this.current || null,
                    text: text
                }).then(d => {
                    self.sdk.captcha.done = d.id

                    self.sdk.captcha.save()

                    if (clbk)
                        clbk(null, d)

                }).catch(e => {
                    if (clbk)
                        clbk(e)
                })

                
            }
        },

        exchanges: {
            storage: {},

            info: {},

            find: function (address) {
                var ar = self.sdk.exchanges.get();

                return _.find(ar, function (ao) {
                    return ao.info.address == address
                })
            },

            get: function () {
                var all = []

                _.each(self.sdk.exchanges.storage, function (addresses, cur) {
                    _.each(addresses, function (i, pocaddress) {

                        _.each(i, function (i) {


                            all.push({

                                pocaddress: pocaddress,
                                currency: cur,
                                info: i,

                            })
                        })

                    })
                })



                all = _.filter(all, function (a) {
                    if (a.info) return true
                })

                all = _.sortBy(all, function (a) {
                    return Number(a.info.time)
                })

                return all;
            },

            load: function (clbk) {
                self.sdk.exchanges.storage = JSON.parse(localStorage[self.sdk.address.pnet().address + 'exchanges2'] || "{}");

                if (clbk)
                    clbk()
            },

            save: function (clbk) {
                localStorage[self.sdk.address.pnet().address + 'exchanges2'] = JSON.stringify(self.sdk.exchanges.storage || {})

                if (clbk)
                    clbk()
            },

            remove: function (currency, address) {

                var storage = self.sdk.exchanges.storage;

                storage[currency] || (storage[currency] = {})

                _.each(storage[currency], function (a) {

                    delete a[address]

                })

                _.each(storage[currency], function (a, address) {
                    if (_.isEmpty(a)) delete storage[currency][address]
                })



                if (_.isEmpty(storage[currency]))

                    delete storage[currency]


                this.save()
            },

            reactivate: function (p, clbk) {

                self.app.ajax.run({
                    data: {
                        Action: 'REACTIVATEPOCDEAL',
                        Currency: p.currency.toUpperCase(),
                        Address: p.address
                    },
                    success: function (d) {
                        self.sdk.exchanges.status(p.currency, p.address, clbk)
                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })
            },

            address: function (p, clbk) {
                var storage = self.sdk.exchanges.storage

                var t = this

                storage[p.currency] || (storage[p.currency] = {})
                storage[p.currency][p.address] || (storage[p.currency][p.address] = {})

                self.app.ajax.run({
                    data: {
                        Action: 'GETADDRESSFORPOC',
                        Currency: p.currency,
                        address: p.address
                    },
                    success: function (d) {

                        if (d.Address) {

                            storage[p.currency][p.address][d.Address.Address] = {
                                address: d.Address.Address,

                                amount: p.amount,
                                currencyAmount: p.currencyAmount,

                                time: self.currentTime()
                            };

                            t.save()

                            self.sdk.exchanges.info[d.Address.Address] = d.Address




                            if (clbk)
                                clbk(null, {

                                    pocaddress: p.address,
                                    currency: p.currency,
                                    info: storage[p.currency][p.address]

                                }, d.Address)
                        }

                        else {
                            if (clbk)
                                clbk('error', null)
                        }




                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })



            },
            statuses: function (clbk, list) {

                if (!list) {
                    list = [];

                    _.each(self.sdk.exchanges.storage, function (addresses, cur) {
                        _.each(addresses, function (i, pocaddress) {

                            _.each(i, function (i) {
                                list.push({
                                    Currency: cur.toUpperCase(),
                                    Address: i.address
                                })
                            })

                        })
                    })
                }


                self.app.ajax.run({
                    data: {
                        Action: 'GETPOCDEALSTATUS',
                        List: JSON.stringify(list)
                    },
                    success: function (d) {

                        if (d.Deal) {

                            if (!_.isArray(d.Deal)) d.Deal = [d.Deal]

                            _.each(d.Deal, function (i) {
                                self.sdk.exchanges.info[i.Address] = i
                            })

                            if (clbk)
                                clbk(null, d.Deal)
                        }
                        else {
                            if (clbk)
                                clbk('empty', null)
                        }
                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })

            },
            status: function (currency, address, clbk) {


                self.app.ajax.run({
                    data: {
                        Action: 'GETPOCDEALSTATUS',
                        Currency: currency,
                        Address: address
                    },
                    success: function (d) {


                        if (d.Deal) {
                            if (clbk)
                                clbk(null, d.Deal)
                        }
                        else {
                            if (clbk)
                                clbk('empty', null)
                        }
                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })

            },

            rates: function (clbk) {

                self.app.ajax.run({
                    data: {
                        Action: 'GETPOCRATES',
                    },
                    success: function (d) {

                        var rates = {}

                        d.Rate || (d.Rate = [])

                        _.each(d.Rate, function (r, i) {
                            rates[r.Currency.toLowerCase()] = Number(r.Rate) / smulti
                        })

                        if (clbk)
                            clbk(rates)
                    },

                    fail: function () {
                        if (clbk) {
                            clbk('server')
                        }
                    }
                })

            }
        },

        wallet: {

            txbaseFeesMeta: function (address, outputs, keyPair, feerate, create, clbk) {
                self.sdk.wallet.txbase([address], _.clone(outputs), null, null, function (err, inputs, _outputs) {

                    if (err) {
                        if (clbk)
                            clbk(err)
                    }

                    else {
                        var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)
                        var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

                        create([address], _.clone(outputs), totalFees, null, function (err, inputs, _outputs) {


                            if (err) {
                                if (clbk)
                                    clbk(err)
                            }
                            else {
                                var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, _outputs, keyPair)

                                self.app.platform.sdk.node.transactions.send(tx, function (d, err) {

                                    if (err) {
                                        if (clbk)
                                            clbk(err)
                                    }

                                    else {
                                        var ids = _.map(inputs, function (i) {
                                            return {
                                                txid: i.txId,
                                                vout: i.vout
                                            }
                                        })

                                        self.app.platform.sdk.node.transactions.clearUnspents(ids)

                                        if (clbk)
                                            clbk(null, d, inputs, _outputs)
                                    }
                                })
                            }
                        })
                    }
                }, true)
            },

            txbase: function (adresses, outputs, fee, feeMode, clbk, update) {


                if (!fee) fee = 0;

                if (!feeMode) feeMode = 'include'

                var total = _.reduce(outputs, function (m, o) {
                    return m + Number(o.amount)
                }, 0)

                if (feeMode != 'include') {
                    total = total + fee;
                }

                if (total <= 0) {
                    if (clbk)
                        clbk('total')

                    return
                }

                self.sdk.node.transactions.get.unspents(function (unspents) {
                    var allunspents = [];
                    _.each(unspents, function (ua, i) {

                        ua = _.filter(ua, self.sdk.node.transactions.canSpend)

                        _.each(ua, function (unspent) {
                            if (unspent.amount)
                                allunspents.push(unspent)
                        })
                    })


                    var totalInWallet = _.reduce(allunspents, function (m, u) {
                        return m + Number(u.amount)
                    }, 0)

                    if (!allunspents.length) {
                        if (clbk)
                            clbk('unspents')

                        return
                    }

                    if (totalInWallet < total) {
                        if (clbk)
                            clbk('money')

                        return
                    }

                    var _allunspents = _.sortBy(allunspents, function (u) {
                        return Math.abs(u.amount - total)
                    })

                    var inputs = [];
                    var _total = 0;

                    _.each(_allunspents, function (unspent) {

                        if (_total < total) {

                            inputs.push(unspent)

                            _total = _total + unspent.amount;

                        }

                    })

                    if (_total > total && (_total.toFixed(8) - total.toFixed(8)) > 0) {

                        outputs.push({
                            address: inputs[0].address,
                            amount: _total - total
                        })

                    }

                    if (feeMode == 'include') {
                        outputs[0].amount = outputs[0].amount - fee;

                        if (outputs[0].amount <= 0) {
                            if (clbk)
                                clbk('fee')

                            return
                        }
                    }

                    if (clbk)
                        clbk(null, inputs, outputs)

                }, adresses, update)

            },

            drawSpendLine: function (el, clbk, addresses) {
                self.app.platform.sdk.node.transactions.get.canSpend(addresses || null, function (amount, total) {


                    if (total > 0 && amount < total) {

                        el.css('position', 'relative')

                        if (!el.find('.spendLine').length) {
                            el.append('<div class="spendLine"><div class="line"></div></div>')
                        }

                        var line = el.find('.spendLine .line');
                        var sline = el.find('.spendLine .line');;

                        if (amount == 0) {
                            sline.addClass('bad')
                        }
                        else {
                            sline.removeClass('bad')
                        }


                        line.animate({
                            width: (100 * amount / total) + "%",
                        }, 140)

                    }
                    else {
                        el.find('.spendLine').remove()
                    }

                    if (clbk)
                        clbk()
                })
            },

            saveTempInfoWallet : function(txid, inputs, outputs){

                if(!txid) return

                var temp = self.sdk.node.transactions.temp;
                var tempOptions = self.sdk.node.transactions.tempOptions;
                var obj = {
                    type : 'wallet',
                    txid : txid
                }

                var count = deep(tempOptions, obj.type + ".count") || 'many'

                if(!temp[obj.type] || count == 'one') {
                    temp[obj.type] = {};
                }   


                temp[obj.type][txid] = obj;

                obj.inputs = inputs
                obj.outputs = outputs

                self.sdk.node.transactions.saveTemp()
            },

            txBaseFeesWithCache : function(address, outputs, keyPair, feerate, clbk){
                self.sdk.wallet.txbaseFees(address, outputs, keyPair, feerate, function(err, txid, inputs, outputs){
                    if(err){
                        if(clbk) clbk(err)
                    }

                    else{
                        if (clbk)
                            clbk(null, txid)
                    }
                })  
            },  

            txbaseFees: function (address, outputs, keyPair, feerate, clbk) {

                self.sdk.wallet.txbaseFeesMeta(
                    address, outputs, keyPair, feerate, 
                    self.sdk.wallet.txbase, 
                clbk)
               
            },

            embed: function (outputs, embdedtext) {
                if (embdedtext) {

                    var opreturnData = [Buffer.from(embdedtext, 'utf8')];

                    var embed = bitcoin.payments.embed({ data: opreturnData });


                    outputs.push({
                        address: embed.output,
                        amount: 0
                    })

                }
            },

            send: function (toAddress, mnemonic, amount, clbk, embdedtext) {

                var feerate = 0.000001;

                var outputs = [{
                    address: toAddress,
                    amount: amount
                }]

                var keyPair = self.api.keypair(mnemonic.replace(/\+/g, ' '))

                if (!keyPair) {
                    if (clbk)
                        clbk('privatekey')
                }
                else {
                    var address = self.sdk.address.pnetsimple(keyPair.publicKey, 'p2pkh').address;

                    this.embed(outputs, embdedtext)


                    self.sdk.wallet.txBaseFeesWithCache(address, outputs, keyPair, feerate, function (err, d) {

                        if (err) {
                            if (clbk)
                                clbk(err)
                        }

                        else {
                            if (clbk)
                                clbk(null, d)
                        }
                    }, true)
                }



            },

            sendFromInputs: function (address, inputs, keyPair, amount, clbk) {

                var feerate = 0.000001;

                if(!amount){
                    amount = _.reduce(inputs, function(sum, input){
                        return sum + input.amount
                    }, 0)
                }

                var outputs = [{
                    address: address,
                    amount: amount
                }]

                if (!keyPair) {
                    if (clbk)
                        clbk('privatekey')
                }
                else {


                    var tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, outputs, keyPair)
                    var totalFees = Math.min(tx.virtualSize() * feerate, 0.0999);

                    outputs[0].amount = outputs[0].amount - totalFees

                    if(outputs[0].amount < 0){
                        if (clbk)
                            clbk('dust')
                    }

                    else{
                        tx = self.app.platform.sdk.node.transactions.create.wallet(inputs, outputs, keyPair)

                        _.each(inputs, function(t){
                            t.cantspend = true
                        })

                        self.app.platform.sdk.node.transactions.send(tx, function (d, err) {

                            if (err) {

                                self.sdk.node.transactions.releaseCS(inputs)

                                if (clbk)
                                    clbk(err)
                            }

                            else {


                                var ids = _.map(inputs, function (i) {
                                    return {
                                        txid: i.txid,
                                        vout: i.vout
                                    }
                                })

                                self.app.platform.sdk.wallet.saveTempInfoWallet(d, inputs, outputs)

                                self.app.platform.sdk.node.transactions.clearUnspents(ids)

                                if (clbk)
                                    clbk(null, d, amount * outputs.length)
                            }
                        })
                    }

                }

            },

            sendmany: function (mnemonic, outputs, clbk, embdedtext) {

                var feerate = 0.000001;

                var keyPair = self.api.keypair(mnemonic.replace(/\+/g, ' '))

                if (!keyPair) {
                    if (clbk)
                        clbk('privatekey')
                }
                else {

                    var address = self.sdk.address.pnetsimple(keyPair.publicKey, 'p2pkh').address;

                    this.embed(outputs, embdedtext)

                    self.sdk.wallet.txBaseFeesWithCache(address, outputs, keyPair, feerate, function (err, d) {

                        if (err) {
                            if (clbk)
                                clbk(err)
                        }

                        else {
                            if (clbk)
                                clbk(null, d)
                        }
                    }, true)
                }

            },

            sendmanyoutputs: function (mnemonic, address, amount, count, clbk, embdedtext) {

                var outputs = []

                for (var i = 0; i < count; i++) {
                    outputs.push({
                        address: address,
                        amount: amount / count
                    })
                }


                this.sendmany(mnemonic, outputs, clbk, embdedtext)

            },
        },
        addresses: {
            storage: {

            },

            init: function (clbk) {

                if (!self.sdk.addresses.storage.addresses) self.sdk.addresses.storage.addresses = [];
                if (!self.sdk.addresses.storage.addressesobj) self.sdk.addresses.storage.addressesobj = [];

                var anum = localStorage[self.sdk.address.pnet().address + 'addressesNum'] || 1;

                if (anum < 10) anum = 10

                for (var i = 0; i < anum; i++) {

                    self.sdk.addresses.addWalletAddress(i)

                }

                self.sdk.addresses.save()

                if (clbk)
                    clbk()
            },

            save: function () {

                if (self.sdk.addresses.storage.addresses.length) {
                    localStorage[self.sdk.address.pnet().address + 'addressesNum'] = self.sdk.addresses.storage.addresses.length
                }
            },

            addWalletAddress: function (num) {

                if (typeof num == 'undefined') num = self.sdk.addresses.storage.addresses.length;

                var address = self.sdk.address.wallet(num)

                self.sdk.addresses.storage.addresses[num] = address.address;
                self.sdk.addresses.storage.addressesobj[num] = address;

                return address.address;
            },

            getFirstRandomAddress : function(clbk){
                if (self.sdk.addresses.storage.addresses.length) {
                    
                    var ar = _.toArray(self.sdk.addresses.storage.addresses)

                    ar = _.first(ar, 10)

                    var address = ar[rand(0, ar.length - 1)]


                    if (clbk)
                        clbk(address)
                }
                else{
                    var address = self.sdk.addresses.addWalletAddress()

                    if (clbk)
                        clbk(address)
                }
            },

            addNewWalletAddress: function (clbk) {
                if (self.sdk.addresses.storage.addresses.length) {

                    var finded = null;

                    lazyEach({
                        array: self.sdk.addresses.storage.addresses,
                        action: function (p) {

                            if (finded) {
                                p.success();

                                return
                            }

                            var address = p.item;

                            self.sdk.node.transactions.get.unspent(function (u) {

                                if (!u.length) {
                                    finded = address;
                                }

                                p.success()

                            }, address)
                        },

                        all: {
                            success: function () {

                                if (!finded) {
                                    finded = self.sdk.addresses.addWalletAddress()
                                }

                                if (clbk)
                                    clbk(finded)

                            }
                        }
                    })

                }

                else {
                    var address = self.sdk.addresses.addWalletAddress()

                    if (clbk)
                        clbk(address)
                }
            }
        },


        address: {
            storage: {

            },
            path: function (n) {
                return "m/44'/0'/0'/" + n + "'"
            },
            path33: function (n) {
                return "m/33'/0'/0'/" + n + "'"
            },
            pnetsimple: function (pubkey) {

                var type = 'p2pkh';
                var a;

                if (type == 'p2pkh' || type == 'p2wpkh') {
                    a = bitcoin.payments[type]({ pubkey: pubkey })

                    return a;
                }

            },
            pnet: function (pubkey, type) {

                type || (type = 'p2pkh')


                var pubkeyRefresh = false;

                if (!pubkey) pubkey = self.app.user.key.value;

                else {
                    pubkeyRefresh = true;
                }

                if (!pubkey) {


                    return null
                }

                var _a = this.storage[type],
                    a;

                if (_a && !pubkeyRefresh) {
                    return _a
                }

                if (type == 'p2pkh' || type == 'p2wpkh') {
                    a = bitcoin.payments[type]({ pubkey: pubkey })

                    this.storage[type] = a;

                    return a;
                }

                if (type == 'p2sh') {

                    a = bitcoin.payments['p2wpkh']({ pubkey: pubkey })

                    var p2sh = bitcoin.payments.p2sh({ redeem: a })

                    this.storage[type] = p2sh;

                    return p2sh;
                }
            },

            wallet: function (n, private) {

                var d = bitcoin.bip32.fromSeed(private || self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF()

                var keyPair = bitcoin.ECPair.fromWIF(d)

                var pubkey = keyPair.publicKey;

                var a = bitcoin.payments['p2wpkh']({ pubkey: pubkey })


                var p2sh = bitcoin.payments.p2sh({ redeem: a })

                return p2sh;

            },

            dumpKeys: function (n) {
                var d = bitcoin.bip32.fromSeed(self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF()

                var keyPair = bitcoin.ECPair.fromWIF(d)

                return keyPair;
            },

            dumpPrivKey: function (n) {


                var d = bitcoin.bip32.fromSeed(self.app.user.private.value).derivePath(app.platform.sdk.address.path(n)).toWIF()

                var keyPair = bitcoin.ECPair.fromWIF(d)

                return keyPair.privateKey;
            },

            registration: function (address, clbk) {

                self.app.api.rpc('getaddressregistration', [[address]]).then(d => {

                    var r = deep(d, '0.date') || 0;

                    if (clbk)
                        clbk(r > 0)
        
                }).catch(e => {
                    if (clbk) {
                        clbk(null, e)
                    }
                })

                /*self.app.ajax.rpc({
                    method: 'getaddressregistration',
                    parameters: [[address]],
                    success: function (d) {

                        var r = deep(d, '0.date') || 0;

                        if (clbk)
                            clbk(r > 0)
                    },
                    fail: function (d, e) {

                        if (clbk) {
                            clbk(null, e)
                        }

                    }
                })*/

            }
        },
        remote: {
            storage: {},
            failed: {},

            get: function (url, clbk, action) {

                var s = this.storage;
                var f = this.failed;

                if (f[url]) {

                    if (clbk)
                        clbk(null)

                    return
                }

                if (s[url]) {
                    if (clbk)
                        clbk(s[url])
                }

                else {

                    s[url] = {};


                    self.app.api.fetch(action || 'urlPreview', {url}).then(d => {

                        var og = deep(d, 'og');

                        s[url] = og

                        if (!s[url])
                            f[url] = true

                        if (clbk)
                            clbk(s[url])
        
                    }).catch(e => {
                        f[url] = true

                        if (clbk)
                            clbk(null)
                    })

                    /*self.app.ajax.api({
                        action: action || 'urlPreview',
                        errorHandler: false,
                        data: {
                            url: hexEncode(url)
                        },
                        success: function (d) {
                            
                        },
                        fail: function () {
                            
                        }
                    })*/
                }


            }
        },
        activity : {
            latest : {},
            clear : function(){
                self.sdk.activity.latest = {}
                self.sdk.activity.save()
            },

            addtagsearch : function(value){

                var hash = bitcoin.crypto.hash256(value).toString('hex')

                var info = {
                    id : hash,
                    index : value.toLowerCase(),
                    value : value
                }


                self.sdk.activity.add('search', 'tags', info)

            },

            addsearch : function(value){

                var hash = bitcoin.crypto.hash256(value).toString('hex')

                var info = {
                    id : hash,
                    index : value.toLowerCase(),
                    value : value
                }

                self.sdk.activity.add('search', 'str', info)

            },

            adduser : function(key, address){
                if(!address) return

                self.sdk.users.get([address], function () {

                    var user =  self.sdk.users.storage[address]

                    if (user){
                        var info = {
                            id : address,
                            index : user.name.toLowerCase(),
                            name : user.name,
                            image : user.image,
                            address : address
                        }

                        var error = self.sdk.activity.add(key, 'user', info)

                    }

                })

            },

            add : function(key, type, info){

                var l = self.sdk.activity.latest

                if(!info.index) return 'index'
                if(!info.id) return 'id'

                var obj = {
                    index : info.index,
                    id : info.id,
                    type : type,
                }

                if(type == 'user'){
                    if(!info.name || !info.address || !info.image){
                        return 'validation'
                    }

                    obj.data = {
                        name : info.name,
                        address : info.address,
                        image : info.image
                    }
                }


                if(type == 'str' || type == 'tags'){
                    if(!info.value){
                        return 'validation'
                    }

                    obj.data = {
                        value : info.value
                    }
                }

                obj.date = self.currentTime()

                l[key] || (l[key] = [])

                l[key] = _.filter(l[key], function(objects){
                    return objects.id != info.id && objects.index != info.index
                })

                l[key].unshift(obj)

                l[key] = firstEls(l[key], 50)

                self.sdk.activity.save()
            },
            save: function () {
                localStorage['latestactivity'] = JSON.stringify({
                    activity : self.sdk.activity.latest
                })
            },

            load: function (clbk) {
                var p = {};

                try {
                    p = JSON.parse(localStorage['latestactivity'] || '{}');
                }
                catch (e) {}


                if(!p.activity) p.activity = {}

                self.sdk.activity.latest = p.activity

                if(clbk) clbk()
            }
        },
        categories : {
            data : {
                all : {
                    en : [
                        {
                            name : "Memes/Funny",
                            tags : ['funny', 'memes'],
                            id : 'c2'
                        },
                        {
                            name : "Politics",
                            tags : ['politics'],
                            id : 'c3'
                        },
                        {
                            name : "Crypto",
                            tags : ['crypto'],
                            id : 'c4'
                        },
                        {
                            name : "Technology/Science",
                            tags : ['technology', 'science'],
                            id : 'c5'
                        },
                        {
                            name : "Faith/Religion",
                            tags : ['faith', 'religion'],
                            id : 'c55'
                        },
                        {
                            name : "Investing/Finance",
                            tags : ['investing', 'finance'],
                            id : 'c6'
                        },
                        {
                            name : "Auto/Racing",
                            tags : ['auto', 'racing'],
                            id : 'c7'
                        },
                        {
                            name : "Sports",
                            tags : ['sports'],
                            id : 'c8'
                        },
                        {
                            name : "Gaming",
                            tags : ['gaming'],
                            id : 'c9'
                        },
                        {
                            name : "Space",
                            tags : ['space'],
                            id : 'c10'
                        },
                        
                        {
                            name : "Art/Music",
                            tags : ['art', 'music'],
                            id : 'c11'
                        },
                        
                        {
                            name : "News/Commentary",
                            tags : ['news', 'commentary'],
                            id : 'c12'
                        },
                        
                        {
                            name : "History",
                            tags : ['history'],
                            id : 'c13'
                        },
                        {
                            name : "Story time",
                            tags : ['storytime'],
                            id : 'c14'
                        },
                        
                        {
                            name : "Film/Animation",
                            tags : ['film', 'animation'],
                            id : 'c15'
                        },
                        
                        {
                            name : "Nature/Animals",
                            tags : ['nature', 'animals'],
                            id : 'c16'
                        },
                        
                        {
                            name : "Travel/Architecture",
                            tags : ['travel', 'architecture'],
                            id : 'c17'
                        },
                        
                        {
                            name : "DIY",
                            tags : ['diy'],
                            id : 'c18'
                        }
                    ],
                    ru : [
                        {
                            name : "Мемы/Юмор",
                            tags : ['мемы', 'юмор'],
                            id : 'c2'
                        },
                        {
                            name : "Политика",
                            tags : ['политика'],
                            id : 'c3'
                        },
                        {
                            name : "Криптовалюта",
                            tags : ['Криптовалюта'],
                            id : 'c4'
                        },
                        {
                            name : "Наука/Технологии",
                            tags : ['технологии', 'наука'],
                            id : 'c5'
                        },
                        {
                            name : "Вера/Религия",
                            tags : ['вера', 'религия'],
                            id : 'c55'
                        },
                        {
                            name : "Финансы/Инвестиции",
                            tags : ['финансы', 'инвестиции'],
                            id : 'c6'
                        },
                        {
                            name : "Автомобили/Гонки",
                            tags : ['auto', 'racing'],
                            id : 'c7'
                        },
                        {
                            name : "Спорт",
                            tags : ['спорт'],
                            id : 'c8'
                        },
                        {
                            name : "Игры",
                            tags : ['игры'],
                            id : 'c9'
                        },
                        {
                            name : "Космос",
                            tags : ['космос'],
                            id : 'c10'
                        },
                        
                        {
                            name : "Искусство/Музыка",
                            tags : ['искусство', 'музыка'],
                            id : 'c11'
                        },
                        
                        {
                            name : "Новости/Комментарии",
                            tags : ['новости', 'комментарии'],
                            id : 'c12'
                        },
                        
                        {
                            name : "История",
                            tags : ['история'],
                            id : 'c13'
                        },
                        {
                            name : "Время историй",
                            tags : ['истории'],
                            id : 'c14'
                        },
                        
                        {
                            name : "Кино/Анимация",
                            tags : ['кино', 'анимация'],
                            id : 'c15'
                        },
                        
                        {
                            name : "Природа/Животные",
                            tags : ['Природа', 'животные'],
                            id : 'c16'
                        },
                        
                        {
                            name : "Путешествия/Архитектура",
                            tags : ['путешествия', 'архитектура'],
                            id : 'c17'
                        },
                        
                        {
                            name : "Сделай сам",
                            tags : ['сделайсам'],
                            id : 'c18'
                        }
                    ],
                    cmn : [
                        {
                            name : "模因/幽默",
                            tags : ['模因', '幽默'],
                            id : 'c2'
                        },
                        {
                            name : "政治",
                            tags : ['政治'],
                            id : 'c3'
                        },
                        {
                            name : "加密貨幣",
                            tags : ['加密貨幣'],
                            id : 'c4'
                        },
                        {
                            name : "科學/技術",
                            tags : ['技術', '科學'],
                            id : 'c5'
                        },
                        {
                            name : "信仰/宗教",
                            tags : ['信仰', '宗教'],
                            id : 'c55'
                        },
                        {
                            name : "金融/投資",
                            tags : ['金融', '投資'],
                            id : 'c6'
                        },
                        {
                            name : "汽車/賽車",
                            tags : ['汽車', '賽車'],
                            id : 'c7'
                        },
                        {
                            name : "運動",
                            tags : ['運動'],
                            id : 'c8'
                        },
                        {
                            name : "遊戲",
                            tags : ['遊戲'],
                            id : 'c9'
                        },
                        {
                            name : "空間",
                            tags : ['空間'],
                            id : 'c10'
                        },
                        
                        {
                            name : "藝術/音樂",
                            tags : ['藝術', '音樂'],
                            id : 'c11'
                        },
                        
                        {
                            name : "新聞/評論",
                            tags : ['新聞', '評論'],
                            id : 'c12'
                        },
                        
                        {
                            name : "歷史",
                            tags : ['歷史'],
                            id : 'c13'
                        },
                        {
                            name : "故事時間",
                            tags : ['故事時間'],
                            id : 'c14'
                        },
                        
                        {
                            name : "電影/動畫",
                            tags : ['電影', '動畫'],
                            id : 'c15'
                        },
                        
                        {
                            name : "自然/動物",
                            tags : ['自然', '動物'],
                            id : 'c16'
                        },
                        
                        {
                            name : "旅遊/建築",
                            tags : ['旅遊', '建築'],
                            id : 'c17'
                        },
                        
                        {
                            name : "自己做",
                            tags : ['自己做'],
                            id : 'c18'
                        }
                    ],
                    kr : [
                        {
                            name : "밈/유머",
                            tags : ['밈', '유머'],
                            id : 'c2'
                        },
                        {
                            name : "정치",
                            tags : ['정치'],
                            id : 'c3'
                        },
                        {
                            name : "암호 화폐",
                            tags : ['암호 화폐'],
                            id : 'c4'
                        },
                        {
                            name : "과학/기술",
                            tags : ['기술', '과학'],
                            id : 'c5'
                        },
                        {
                            name : "신앙/종교",
                            tags : ['신앙', '종교'],
                            id : 'c55'
                        },
                        {
                            name : "금융/투자",
                            tags : ['금융', '투자'],
                            id : 'c6'
                        },
                        {
                            name : "자동차/레이싱 ",
                            tags : ['자동차', '레이싱'],
                            id : 'c7'
                        },
                        {
                            name : "스포츠",
                            tags : ['스포츠'],
                            id : 'c8'
                        },
                        {
                            name : "계략",
                            tags : ['계략'],
                            id : 'c9'
                        },
                        {
                            name : "우주",
                            tags : ['우주'],
                            id : 'c10'
                        },
                        
                        {
                            name : "예술/음악",
                            tags : ['예술', '음악'],
                            id : 'c11'
                        },
                        
                        {
                            name : "뉴스/댓글",
                            tags : ['뉴스', '댓글'],
                            id : 'c12'
                        },
                        
                        {
                            name : "역사",
                            tags : ['역사'],
                            id : 'c13'
                        },
                        {
                            name : "이야기의 시간",
                            tags : ['이야기의시간'],
                            id : 'c14'
                        },
                        
                        {
                            name : "영화/애니메이션",
                            tags : ['영화', '애니메이션'],
                            id : 'c15'
                        },
                        
                        {
                            name : "자연/동물",
                            tags : ['자연', '동물'],
                            id : 'c16'
                        },
                        
                        {
                            name : "여행/건축",
                            tags : ['여행', '건축'],
                            id : 'c17'
                        },
                        
                        {
                            name : "너 스스로해라",
                            tags : ['너스스로해라'],
                            id : 'c18'
                        }
                    ],
                    fr : [
                        {
                            name : "Mèmes/Humour",
                            tags : ['mèmes', 'humour'],
                            id : 'c2'
                        },
                        {
                            name : "Politique",
                            tags : ['politique'],
                            id : 'c3'
                        },
                        {
                            name : "Crypto-monnaie",
                            tags : ['Crypto-monnaie'],
                            id : 'c4'
                        },
                        {
                            name : "Technologie/Scientifique",
                            tags : ['technologie', 'scientifique'],
                            id : 'c5'
                        },
                        {
                            name : "Foi/Religion ",
                            tags : ['foi', 'religion'],
                            id : 'c55'
                        },
                        {
                            name : "Finances/Investissements",
                            tags : ['finances', 'investissements'],
                            id : 'c6'
                        },
                        {
                            name : "Voitures/Courses",
                            tags : ['voitures', 'courses'],
                            id : 'c7'
                        },
                        {
                            name : "Sport",
                            tags : ['Sport'],
                            id : 'c8'
                        },
                        {
                            name : "Jeux",
                            tags : ['jeux'],
                            id : 'c9'
                        },
                        {
                            name : "Espace",
                            tags : ['espace'],
                            id : 'c10'
                        },
                        
                        {
                            name : "Art/Musique",
                            tags : ['art', 'musique'],
                            id : 'c11'
                        },
                        
                        {
                            name : "Nouvelles/Commentaires",
                            tags : ['nouvelles', 'commentaires'],
                            id : 'c12'
                        },
                        
                        {
                            name : "histoire",
                            tags : ['histoire'],
                            id : 'c13'
                        },
                        {
                            name : "Le temps des histoires",
                            tags : ['Letempsdeshistoires'],
                            id : 'c14'
                        },
                        
                        {
                            name : "Cinéma/Animation",
                            tags : ['cinéma', 'animation'],
                            id : 'c15'
                        },
                        
                        {
                            name : "Nature/Animaux",
                            tags : ['nature', 'animaux'],
                            id : 'c16'
                        },
                        
                        {
                            name : "Voyage/Architecture",
                            tags : ['voyage', 'architecture'],
                            id : 'c17'
                        },
                        
                        {
                            name : "Fais le toi-même",
                            tags : ['faisletoi-même'],
                            id : 'c18'
                        }
                    ],
                    es : [
                        {
                            name : "Memes/Humor ",
                            tags : ['мемы', 'юмор'],
                            id : 'c2'
                        },
                        {
                            name : "Política",
                            tags : ['política'],
                            id : 'c3'
                        },
                        {
                            name : "Criptomoneda",
                            tags : ['criptomoneda'],
                            id : 'c4'
                        },
                        {
                            name : "Tecnología/Сientífica ",
                            tags : ['tecnología', 'científica'],
                            id : 'c5'
                        },
                        {
                            name : "Fe/Religión ",
                            tags : ['fe', 'religión'],
                            id : 'c55'
                        },
                        {
                            name : "Finanzas/Inversiones",
                            tags : ['finanzas', 'inversiones'],
                            id : 'c6'
                        },
                        {
                            name : "Coches/Carreras",
                            tags : ['coches', 'carreras'],
                            id : 'c7'
                        },
                        {
                            name : "Deporte",
                            tags : ['deporte'],
                            id : 'c8'
                        },
                        {
                            name : "Juegos",
                            tags : ['juegos'],
                            id : 'c9'
                        },
                        {
                            name : "Espacio",
                            tags : ['espacio'],
                            id : 'c10'
                        },
                        
                        {
                            name : "Arte/Musical ",
                            tags : ['arte', 'musical'],
                            id : 'c11'
                        },
                        
                        {
                            name : "Noticias/Comentarios",
                            tags : ['noticias', 'comentarios'],
                            id : 'c12'
                        },
                        
                        {
                            name : "Historia",
                            tags : ['historia'],
                            id : 'c13'
                        },
                        {
                            name : "Tiempo de historias",
                            tags : ['Tiempo de historias'],
                            id : 'c14'
                        },
                        
                        {
                            name : "Cine/Animación",
                            tags : ['cine', 'animación'],
                            id : 'c15'
                        },
                        
                        {
                            name : "Naturaleza/Animales",
                            tags : ['naturaleza', 'animales'],
                            id : 'c16'
                        },
                        
                        {
                            name : "Viajes/Arquitectura",
                            tags : ['viajes', 'arquitectura'],
                            id : 'c17'
                        },
                        
                        {
                            name : "Hazlo tu mismo",
                            tags : ['hazlotumismo'],
                            id : 'c18'
                        }
                    ],
                    de : [
                        {
                            name : "Meme/Humor ",
                            tags : ['meme', 'hunor'],
                            id : 'c2'
                        },
                        {
                            name : "Politik",
                            tags : ['politik'],
                            id : 'c3'
                        },
                        {
                            name : "Kryptowährung",
                            tags : ['Kryptowährung'],
                            id : 'c4'
                        },
                        {
                            name : "Wissenschaft/Technologie ",
                            tags : ['technologie', 'wissenschaft'],
                            id : 'c5'
                        },
                        {
                            name : "Glaube/Religion",
                            tags : ['glaube', 'religion'],
                            id : 'c55'
                        },
                        {
                            name : "Finanzen/Investitionen ",
                            tags : ['finanzen', 'investitionen'],
                            id : 'c6'
                        },
                        {
                            name : "Autos/Rennen ",
                            tags : ['autos', 'rennen'],
                            id : 'c7'
                        },
                        {
                            name : "Sport",
                            tags : ['sport'],
                            id : 'c8'
                        },
                        {
                            name : "Spielen",
                            tags : ['spielen'],
                            id : 'c9'
                        },
                        {
                            name : "Weltraum",
                            tags : ['weltraum'],
                            id : 'c10'
                        },
                        
                        {
                            name : "Kunst/Musik ",
                            tags : ['kunst', 'music'],
                            id : 'c11'
                        },
                        
                        {
                            name : "Neuigkeiten/Kommentare",
                            tags : ['neuigkeiten', 'kommentare'],
                            id : 'c12'
                        },
                        
                        {
                            name : "Geschichte",
                            tags : ['geschichte'],
                            id : 'c13'
                        },
                        {
                            name : "Zeit der Geschichten",
                            tags : ['zeit der geschichten '],
                            id : 'c14'
                        },
                        
                        {
                            name : "Film/Animation ",
                            tags : ['film', 'animation'],
                            id : 'c15'
                        },
                        
                        {
                            name : "Natur/Tiere ",
                            tags : ['natur', 'tiere'],
                            id : 'c16'
                        },
                        
                        {
                            name : "Reisen/Architektur ",
                            tags : ['reisen', 'architektur'],
                            id : 'c17'
                        },
                        
                        {
                            name : "Mach es selbst",
                            tags : ['machesselbst'],
                            id : 'c18'
                        }
                    ],
                },
            },

            settings : {
                tags : {},
                selected : {},
                added : {}
            },

            clbks : {
                selected : {},
                added : {},
                tags  :{},
                removed : {}
            },

            fromTags : function(tags, _k){
                var result = { 
                    categories : [],
                    tags : []
                }

                var usedtags = {}

                var all = self.sdk.categories.get()

                _.each(all, function(ca){
                    var addedtags = _.filter(tags, function(tag){
                        return _.indexOf(ca.tags, tag.toLowerCase()) > -1
                    })

                    if(addedtags.length == ca.tags.length){
                        result.categories.push(ca)

                        _.each(ca.tags, function(t){
                            usedtags[t] = true
                        })
                    }
                })

                _.each(tags, function(tag){
                    if(!usedtags[tag]) result.tags.push(tag)
                })

                return result
            },

            getaddedtags : function(_k){

                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                var selected = self.sdk.categories.settings.selected[k] || {}
                var addedtags = _.map(self.sdk.categories.settings.tags[k] || {}, function(v, i){
                    return i
                })

                return addedtags
            },

            gettags : function(_k, onlycategories){
                var tags = []

                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                var selected = self.sdk.categories.settings.selected[k] || {}
                var addedtags = _.map(self.sdk.categories.settings.tags[k] || {}, function(v, i){
                    return i
                })

                var all = self.sdk.categories.get(k)

                _.each(all, function(c){
                    if(selected[c.id]) tags = tags.concat(c.tags)
                })

                if(!onlycategories)
                    tags = tags.concat(addedtags)

                if(onlycategories === 'onlytags') tags = addedtags

                return tags
            },  

            gettagsmap : function(_k){
                var ctags = self.sdk.categories.gettags(_k, true)
                var alltags = self.sdk.categories.gettags(_k)

                var mp = {}

                _.each(alltags, function(tag){
                    mp[tag] = {
                        selected : true,
                        fixed : _.indexOf(ctags, tag) > -1
                    }

                })

                return mp
            },

            remove : function(id, _k){
                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                delete s.added[k][id]

                var selected = self.sdk.categories.settings.selected[k] || {}

                var changeselected = selected[id]

                delete selected[id]

                self.sdk.categories.save()

                if(changeselected){
                    _.each(self.sdk.categories.clbks.selected, function(f){
                        f(id, false, k)
                    })
                }

                _.each(self.sdk.categories.clbks.removed, function(f){
                    f(id, k)
                })
            },

            add : function(category, _k){

                if(!category.id) return 'id'
                if(!category.name) return 'name'
                if(!category.tags) return 'tags'
                if(!category.tags.length) return 'tags'

                category.tags = _.map(category.tags, function(t){
                    return t.replace("#", '').toLowerCase()
                })

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                var exist = _.find(s.added[k], function(ca){
                    if(ca.name == category.name) return true
                })

                if(exist){
                    if(exist.id != category.id){
                        return 'doublename'
                    }
                }

                s.added[k] || (s.added[k] = {})
                s.added[k][category.id] = {
                    name : category.name,
                    id : category.id,
                    tags : category.tags
                }

                _.each(self.sdk.categories.clbks.added, function(f){
                    f(id, k)
                })

                self.sdk.categories.save()

                return false
            },

            tag : function(tag, _k){

                if(!tag) return 'emptyid'


                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                s.tags[k] || (s.tags[k] = {})


                if (s.tags[k][tag]) 
                    delete s.tags[k][tag]

                else s.tags[k][tag] = true

                self.sdk.categories.save()

                _.each(self.sdk.categories.clbks.tags, function(f){
                    f(tag, s.tags[k][tag], k)
                })
                

                return false
            },

            geteslected : function(_k){
                var allcats = self.sdk.categories.get()

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                s.selected[k] || (s.selected[k] = {})

                return _.filter(allcats, function(c){
                    return s.selected[k][c.id]
                })

            },

            clear : function(_k, onlytags){
                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                if(!onlytags)
                    s.selected[k] = {}
                    
                s.tags[k] = {}

                self.sdk.categories.save()

                _.each(self.sdk.categories.clbks.selected, function(f){
                    f(null, false, k)
                })
            },

            select : function(id, _k){

                if(!id) return 'emptyid'

                var allcats = self.sdk.categories.get(_k)

                var cat = _.find(allcats, function(c){
                    return c.id == id
                })

                if(!cat) return 'cantonfound'

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                s.selected[k] || (s.selected[k] = {})


                if (s.selected[k][id]) 
                    delete s.selected[k][id]

                else s.selected[k][id] = true

                self.sdk.categories.save()

                _.each(self.sdk.categories.clbks.selected, function(f){
                    f(id, s.selected[k][id], k)
                })

                return false
            },

            get : function(_k){
                var k = _k || self.app.localization.key

                var added = _.map(self.sdk.categories.settings.added[k]|| {}, 
                function(c){
                    var cc = _.clone(c)

                    cc.added = true

                    return cc
                })

                return (self.sdk.categories.data.all[k] || self.sdk.categories.data.all['en']).concat(added)
            },

            getbyid : function(id, _k){
                var allcats = self.sdk.categories.get(_k)

                var cat = _.find(allcats, function(c){
                    return c.id == id
                })

                return cat || null

            },

            search : function(name){

                return _.filter(self.sdk.categories.get(), function(c){

                    if(c.name.toLowerCase().indexOf(name) > -1) return true

                    return stringEqTrig(c.name, name) > 0.7
                })
                
            },

            getwithselected : function(_k){
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                var selected = self.sdk.categories.settings.selected[k] || {}

                var all = self.sdk.categories.get()


                return _.map(all, function(c){
                    var cs = _.clone(c)

                    cs.selected = selected[c.id] ? true : false

                    return cs
                })
            },

            save: function () {
                localStorage['categoriessettings'] = JSON.stringify({
                    settings : self.sdk.categories.settings
                })
            },

            load: function (clbk) {
                var p = {};

                self.sdk.categories.clbks.selected = {}
                self.sdk.categories.clbks.removed = {}
                self.sdk.categories.clbks.added = {}
                self.sdk.categories.clbks.tags = {}

                

                try {
                    p = JSON.parse(localStorage['categoriessettings'] || '{}');
                }
                catch (e) {}


                if(!p.settings) p.settings = {}

                self.sdk.categories.settings = p.settings

                self.sdk.categories.settings.tags || (self.sdk.categories.settings.tags = {})
                self.sdk.categories.settings.selected || (self.sdk.categories.settings.selected = {})
                self.sdk.categories.settings.added || (self.sdk.categories.settings.added = {})

                if(clbk) clbk()
            }

        },
        tags: {
            storage: {

                cloud: null,

                all: ['love', 'followback', 'instagramers', 'socialsteeze', 'tweegram', 'photooftheday', '20likes', 'amazing', 'smile', 'follow4follow', 'like4like', 'look', 'instalike', 'igers', 'picoftheday', 'food', 'instadaily', 'instafollow', 'followme', 'girl', 'instagood', 'bestoftheday', 'instacool', 'carryme', 'follow', 'colorful', 'style', 'swag', 'fun', 'instagramers', 'model', 'socialsteeze', 'food', 'smile', 'pretty', 'followme', 'nature', 'lol', 'dog', 'hair', 'sunset', 'swag', 'throwbackthursday', 'instagood', 'beach', 'friends', 'hot', 'funny', 'blue', 'life', 'art', 'photo', 'cool', 'carryme', 'bestoftheday', 'clouds', 'amazing', 'socialsteeze', 'fitness', 'followme', 'all_shots', 'textgram', 'family', 'instago', 'igaddict', 'awesome', 'girls', 'instagood', 'my', 'bored', 'baby', 'music', 'red', 'green', 'water', 'bestoftheday', 'black', 'party', 'white', 'yum', 'flower', 'carryme', 'night', 'instalove', 'photo', 'photos', 'pic', 'pics', 'socialsteeze', 'picture', 'pictures', 'snapshot', 'art', 'beautiful', 'instagood', 'picoftheday', 'photooftheday', 'color', 'all_shots', 'exposure', 'composition', 'focus', 'capture', 'moment', 'hdr', 'hdrspotters', 'hdrstyles_gf', 'hdri', 'hdroftheday', 'hdriphonegraphy', 'hdr_lovers', 'awesome_hdr']
            },

            ex: { 'news': true, 'images': true, 'videos': true, 'politics': true, 'funny': true, 'art': true, 'photo': true },

            search: function (str, clbk) {

                str = str.toLowerCase().replace(/[^a-z0-9_]/g, '');

                var s = _.filter(this.storage.all, function (t) {

                    if (t.indexOf(str) > -1) return true;

                })

                s = _.uniq(s)

                if (clbk)
                    clbk(lastEls(s, 7))

            },

            get: function (address, count, block, clbk) {

                var parameters = [address || ''];

                if (count) parameters.push(count.toString())
                else parameters.push('')
                if (block) parameters.push(block.toString())
                else parameters.push('')

                parameters.push(self.app.localization.key)

                self.app.api.rpc('gettags', parameters).then(d => {

                    if (clbk) {
                        clbk(d)
                    }
        
                }).catch(e => {
                    if (clbk) {
                        clbk([], e)
                    }
                })

            },

            filterEx: function (tags) {

                var ex = this.ex

                return _.filter(tags, function (t) {

                    if (!ex[t.tag]) return true

                })
            },

            getfastsearch: function (clbk) {
                var s = this.storage;

                var t = this

                retry(function(){
                    return self.currentBlock
                }, function(){

                    var round = (a, b) => a - a % b

                    t.get('', 150, round(self.currentBlock, 1000) - 20000, function (d) {

                        if (d && d.length) {
                            s.all = _.map(d, function (t) {
                                return t.tag
                            })
                        }
    
                        if (clbk) {
                            clbk()
                        }
                    })

                })

                
            },

            cloudUpdate: function (clbk) {
                self.app.platform.sdk.tags.cloud(clbk, true)
            },

            cloud: function (clbk, update) {

                var s = this.storage;
                var t = this
                if (s.cloud && !update) {
                    if (clbk) {

                        clbk(s.cloud)

                    }
                }
                else {

                    var round = (a, b) => a - a % b

                    retry(function(){
                        return self.currentBlock
                    }, function(){

                        t.get('', 50, (round(self.currentBlock, 1000) - 23700), function (d, error) {

                            if (!error)
                                s.cloud = d

                            if (clbk) {
                                clbk(s.cloud, error)
                            }

                        })
                    })

                }



            }
        },

        search: {
            storage: {
                all: {},
                fs: {},
                posts: {},
                users: {},
                tags : {}
            },

            clear: function () {
                this.storage = {
                    all: {},
                    fs: {},
                    posts: {},
                    users: {},
                    tags : {}
                }
            },

            add: function (fixedBlock, type, result, start, count, address) {
                var s = this.storage;

                if (!s[type][address]) s[type][address] = {}

                if (!s[type][address][fixedBlock]) {
                    s[type][address][fixedBlock] = result;
                }

                else {
                    for (var i = 0; i < count; i++) {

                        if (result.data[i])

                            s[type][address][fixedBlock].data[start + i] = result.data[i]
                    }
                }

            },

            preview: function (fixedBlock, type, start, count, address) {
                var s = this.storage;

                if (type != 'fs' && type != 'all') {

                    if(!s[type]) s[type] = {}

                    if(!s[type][address])
                        s[type][address] = {}

                    if (!s[type][address][fixedBlock]) return

                    for (var i = 0; i < count; i++) {

                        if (!s[type][address][fixedBlock].data[start + i])

                            s[type][address][fixedBlock].data[start + i] = {
                                preview: true,
                                index: start + i
                            }
                    }

                }
            },

            get: function (value, type, start, count, fixedBlock, clbk, address) {

                if (!address) address = 'pocketnet'

                var s = self.sdk.search;


                fixedBlock || (fixedBlock = self.currentBlock);

                type || (type = 'fs')

                s.preview(fixedBlock, type, start, count, address)

                value = trim(value.replace(/[^а-яА-Яa-zA-Z0-9\# _]+/g, ''))

                var np = [encodeURIComponent(value), type, fixedBlock, (start || 0).toString(), (count || 10).toString()]

                if (address != 'pocketnet') np.push(address)

                if (value.length) {

                    self.app.api.rpc('search', np).then(d => {

                        if (type != 'fs') {

                            if (type == 'all') {
                                _.each(d, function (d, k) {
                                    s.add(fixedBlock, k, d, start, count, address)
                                })
                            }
                            else {
                                d = d[type] || {
                                    data: []
                                }

                                s.add(fixedBlock, type, d, start, count, address)
                            }

                        }

                        if (clbk)
                            clbk(d, fixedBlock)
        
                    }).catch(e => {
                        if (clbk) {
                            clbk({})
                        }
                    })

                    
                }
                else {
                    if (clbk) {
                        clbk({})
                    }
                }



            }
        },

        postscores: {
            storage: {},
            get: function (id, clbk, update) {

                var l = self.sdk.postscores

                if (!l.storage[id] || update) {

                    self.app.api.rpc('getpostscores', [id]).then(d => {

                        _.each(d, function (d) {

                            l.storage[d.posttxid] || (l.storage[d.posttxid] = [])

                            l.storage[d.posttxid].push({
                                address: d.address,
                                value: d.value
                            })
                        })

                        if (clbk)
                            clbk(null)
        
                    }).catch(e => {
                        if (clbk) {
                            clbk(e, null)
                        }
                    })

                    /*self.app.ajax.rpc({
                        method: 'getpostscores',
                        parameters: [id],
                        success: function (d) {

                            

                        },
                        fail: function (d, e) {

                            
                        }

                    })*/

                }
                else {
                    if (clbk)
                        clbk()
                }
            }
        },

        likes: {
            storage: {},
            who: {},

            extendshares: function (ids, commentsid) {

                commentsid || (commentsid = [])

                var s = self.sdk.likes.storage

                _.each(ids, function (txid) {
                    var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid);


                    if (share && s[txid]) {

                        if (typeof share.myVal == 'undefined') {
                            share.myVal = Number(s[txid])
                        }



                    }

                    if (share) {
                        var lastcomment = share.lastComment;

                        if (lastcomment) {
                            var cid = _.find(commentsid, function (r) {
                                return r == lastcomment.id
                            })


                            if (cid && s[cid]) {


                                if (lastcomment && !lastcomment.myscore && self.sdk.address.pnet()) {
                                    lastcomment.myScore = Number(s[cid])


                                    _.each(self.sdk.comments.upvoteClbks, function (c) {

                                        c(null, lastcomment, lastcomment.myscore, self.sdk.address.pnet().address)

                                    })
                                }
                            }
                        }
                    }





                    if (share)
                        share.who = self.sdk.likes.who[txid]
                })

                _.each(commentsid, function (txid) {

                })


            },

            get: function (ids, clbk) {

                var l = self.sdk.likes

                ids = _.filter(ids, function (id) {
                    if (!l.storage[id]) return true
                })

                if (ids.length) {

                    var commentsid = [];

                    _.each(ids, function (id) {

                        var share = deep(self, 'sdk.node.shares.storage.trx.' + id);

                        var lastcomment = deep(share, 'lastComment.id');

                        if (lastcomment) {
                            commentsid.push(lastcomment)
                        }

                    })

                    self.app.user.isState(function (state) {

                        if (state) {
                            var ao = self.app.platform.sdk.address.pnet();

                            var address = ''

                            if (ao) address = ao.address

                            self.app.api.rpc('getpagescores', [ids, address, commentsid]).then(d => {

                                _.each(d, function (v) {

                                    if (v.posttxid) {
                                        if (v.value)
                                            l.storage[v.posttxid] = v.value

                                        l.who[v.posttxid] = v.postlikers
                                    }

                                    if (v.cmntid) {
                                        if (v.myscore) {

                                            l.storage[v.cmntid] = v.myscore

                                        }
                                    }
                                })



                                _.each(ids, function (id) {
                                    if (!l.storage)
                                        l.storage[id] = '0'
                                })

                                l.extendshares(ids, commentsid)



                                if (clbk)
                                    clbk(null)
        
                            }).catch(e => {
                                if (clbk) {
                                    clbk(e, null)
                                }
                            })

                            /*self.app.ajax.rpc({
                                method: 'getpagescores',
                                parameters: [ids, address, commentsid],
                                success: function (d) {


                                    

                                },
                                fail: function (d, e) {

                                    if (clbk) {
                                        clbk(e, d)
                                    }
                                }
                            })*/
                        }
                        else {
                            _.each(ids, function (id) {
                                l.storage[id] = '0'
                            })

                            l.extendshares(ids)

                            if (clbk)
                                clbk(null)
                        }

                    })


                }
                else {
                    if (clbk)
                        clbk()
                }
            }
        },

        comments: {
            storage: {},

            sendclbks: {
            },

            upvoteClbks: {

            },

            find: function (txid, id, pid) {
                var s = self.sdk.comments.storage;

                var comments = deep(s, txid + '.' + (pid || '0')) || [];

                var comment = _.find(comments, function (c) {
                    return c.id == id
                })

                return comment
            },

            address: function (txid, id, pid) {

                var comment = self.sdk.comments.find(txid, id, pid);

                if (comment) return comment.address

                return ''
            },

            users: function (comments, clbk) {
                var addresses = _.map(comments, function (r) {
                    return r.address
                })

                self.sdk.users.get(addresses, function (n, e) {
                    if (clbk)
                        clbk(n, e)
                }, true)
            },

            info: function (ids, clbk) {
                var s = self.sdk.comments.storage;
                var i = self.sdk.comments.ini;

                self.app.api.rpc('getcomments', ['', '', ids]).then(d => {

                    var m = i(d);

                    if (clbk)
                        clbk(null, m)
        
                }).catch(e => {
                    if (clbk) {
                        clbk(e)
                    }
                })

                /*self.app.ajax.rpc({
                    method: 'getcomments',
                    parameters: ['', '', ids],
                    success: function (d) {

                        

                    },
                    fail: function (d, e) {
                        if (clbk) {
                            clbk(e, d)
                        }
                    }
                })*/
            },

            checkSign: function (comment, signature, pubkey) {

                var verify = false

                return true

            },

            toLastComment: function (comment) {

                var lc = {
                    address: comment.address,
                    answerid: comment.answerid,
                    parentid: comment.parentid,
                    id: comment.id,
                    children: comment.children || 0,
                    postid: comment.txid,
                    block: self.currentBlock,
                    msg: JSON.stringify({
                        message: comment.message,
                        images: comment.images
                    }),
                    time: comment.time,
                    timeUpd: comment.timeUpd,
                    scoreDown: 0,
                    scoreUp: 0,
                    myScore: 0
                }

                return lc;
            },

            ini: function (d) {

                var s = self.sdk.comments.storage;
                s.all || (s.all = {})

                var relay = self.sdk.relayTransactions.get();

                var c = _.map(d || [], function (data) {
                    var comment = new pComment();

                    comment.import(data)
                    comment.setTime(data.time, data.timeUpd)

                    comment.children = data.children
                    comment.address = data.address;
                    comment.verify = true;



                    _.each(self.sdk.relayTransactions.withtemp('comment'), function (c) {
                        if (c.optype == 'comment' || !c.optype) {
                            if (c.parentid == comment.id) {
                                comment.children++
                            }
                        }
                    })

                    return comment;
                })

                _.each(self.sdk.relayTransactions.withtemp('cScore'), function (score) {

                    var comment = _.find(c, function (comment) {
                        return comment.id == score.commentid
                    })

                    if (comment && !comment.myScore) {
                        comment.myScore = Number(score.value)

                        if (score.value > 0) comment.scoreUp++
                        else comment.scoreDown++
                    }

                })



                _.each(c, function (c) {
                    s.all[c.id] = c
                })
                return c
            },

            getbyid: function (ids, clbk) {

                var s = self.sdk.comments.storage;
                var i = self.sdk.comments.ini;
                var address = ''

                var ao = self.sdk.address.pnet();

                if (ao) address = ao.address

                if (!_.isArray(ids)) ids = [ids]

                s.all || (s.all = {})

                ids = _.filter(ids, function (id) {
                    if (id && !s.all[id]) return true
                })


                if (!ids.length) {
                    if (clbk)
                        clbk('tmp')
                }
                else {

                    self.app.api.rpc('getcomments', ['', '', address, ids]).then(d => {

                        var arrange = ['commentEdit', 'commentDelete'];
                        var tc = group(self.sdk.relayTransactions.withtemp('comment'), function (tempComment) {
                            return tempComment.optype || 'comment'
                        })

                        _.each(arrange, function (i) {

                            _.each(tc[i], function (tempComment) {

                                var i = tempComment.optype

                                var f = _.find(d, function (c) {
                                    if (c.id == (tempComment.id || tempComment.txid)) return true
                                })

                                if (i == 'commentEdit') {
                                    if (f && f.id == tempComment.id) {
                                        f.msg = tempComment.msg
                                        f.timeUpd = tempComment.timeUpd
                                    }
                                }

                                if (i == 'commentDelete') {
                                    if (f && f.id == tempComment.id) {
                                        f.deleted = true
                                    }
                                }

                            })
                        })

                        var c = i(d)

                        self.sdk.comments.users(c, function (d, e) {

                            if (clbk)
                                clbk(d, e)

                        })
        
                    }).catch(e => {
                        if (clbk)
                            clbk(e)
                    })
                   
                }

            },

            temps: function (d, txid, pid) {
                var tc = group(self.sdk.relayTransactions.withtemp('comment'), function (tempComment) {
                    return tempComment.optype || 'comment'
                })

                var arrange = ['comment', 'commentEdit', 'commentDelete'];
                var del = [];

                _.each(arrange, function (i) {

                    _.each(tc[i], function (tempComment) {

                        var _txid = tempComment.postid

                        if (_txid == txid && (pid || '') == (tempComment.parentid || '')) {

                            var i = tempComment.optype || 'comment'

                            var f = _.find(d, function (c) {
                                if (c.id == (tempComment.id || tempComment.txid)) return true
                            })

                            if (i == 'comment') {
                                if (!f)
                                    d.push(tempComment)
                            }

                            if (i == 'commentEdit') {
                                if (f && f.id == tempComment.id) {
                                    f.msg = tempComment.msg
                                    f.timeUpd = tempComment.timeUpd
                                }
                            }

                            if (i == 'commentDelete') {
                                if (f && f.id == tempComment.id) {

                                    f.deleted = true
                                    del.push(f.id)
                                }
                            }

                        }


                    })
                })
            },

            get: function (txid, pid, clbk, ccha) {

                var s = self.sdk.comments.storage;
                var i = self.sdk.comments.ini;
                var address = ''

                var ao = self.app.platform.sdk.address.pnet();

                if (ao) address = ao.address

                s[txid] || (s[txid] = {})


                self.app.api.rpc('getcomments', [txid, pid || '', address]).then(d => {

                    self.sdk.comments.temps(d, txid, pid)

                    var c = i(d)

                    s[txid][pid || '0'] = c

                    self.sdk.comments.users(c, function (i, e) {

                        if (clbk)
                            clbk(c, e)

                    })
        
                }).catch(e => {
                    if (clbk) {
                        clbk(null, e)
                    }
                })
            },

            last: function (clbk) {

                var ini = this.ini

                var address = ''

                var ao = self.app.platform.sdk.address.pnet();

                if (ao) address = ao.address

                self.app.api.rpc('getlastcomments', ['7', '', self.app.localization.key]).then(d => {

                    d = _.filter(d, function (d) {
                        return !d.deleted
                    })

                    if (clbk)
                        clbk(ini(d))
        
                }).catch(e => {
                    if (clbk)
                        clbk([], e)
                })

                
            },

            upvote: function (upvote, clbk) {

                var comment = deep(self.sdk, 'comments.storage.all.' + upvote.comment.v)

                var ma = self.app.platform.sdk.address.pnet().address

                _.each(self.sdk.comments.upvoteClbks, function (c) {
                    c(null, comment, upvote.value.v, ma, true)
                })

                self.sdk.node.transactions.create.commonFromUnspent(

                    upvote,

                    function (_alias, error) {

                        if (!_alias) {
                            if (clbk) {
                                clbk(error, null)
                            }

                            _.each(self.sdk.comments.upvoteClbks, function (c) {
                                c(error, comment, null, ma)
                            })
                        }
                        else {

                            if (comment) {

                                comment.myScore = upvote.value.v

                                if (upvote.value.v > 0) {
                                    comment.scoreUp++
                                }
                                if (upvote.value.v < 0) {
                                    comment.scoreDown++
                                }

                            }


                            if (clbk) {
                                clbk(null, comment, upvote.value.v)
                            }

                            _.each(self.sdk.comments.upvoteClbks, function (c) {
                                c(null, comment, upvote.value.v, ma)
                            })

                        }

                    }
                )


            },

            delete: function (txid, comment, clbk) {

                var s = self.sdk.comments.storage;

                comment.txid = txid

                self.sdk.node.transactions.create.commonFromUnspent(

                    comment,

                    function (_alias, error) {


                        if (!_alias) {

                            if (clbk) {
                                clbk(error, null)
                            }

                        }

                        else {

                            s[txid] || (s[txid] = {})

                            var c = _.find(s[txid][comment.parentid || '0'] || [], function (c) {
                                return c.id == comment.id
                            })

                            if (c) c.deleted = true

                            if (clbk)
                                clbk(null, _alias)
                        }

                    }
                )

            },

            send: function (txid, comment, pid, aid, clbk, editid, fid) {

                var s = self.sdk.comments.storage;

                comment.answerid = aid;
                comment.parentid = pid;

                if (editid) {
                    comment.id = editid
                }

                comment.uploadImages(self.app, function () {

                    if (comment.checkloaded()){
                        

                        if (clbk) {
                            clbk('imageerror', null)
                        }

                        _.each(self.sdk.comments.sendclbks, function (c) {
                            c('imageerror')
                        })

                        return
                    }

                    self.sdk.node.transactions.create.commonFromUnspent(

                        comment,

                        function (_alias, error) {

                            if (!_alias) {
                                if (clbk) {
                                    clbk(error, null)
                                }

                                _.each(self.sdk.comments.sendclbks, function (c) {
                                    c(error)
                                })
                            }
                            else {

                                var alias = new pComment();
                                alias.import(_alias)
                                alias.temp = true;
                                alias.address = _alias.address;

                                var temptime = self.currentTime()

                                alias.children = 0;
                                alias.setTime(temptime, temptime);

                                var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + txid);

                                if (share && (!pid || pid == '0'))
                                    share.comments++

                                s[txid] || (s[txid] = {})

                                s[txid][pid || '0'] || (s[txid][pid || '0'] = [])

                                var i = findIndex(s[txid][pid || '0'], function (c) {
                                    if (c.id == editid) return true;
                                })

                                if (!editid || i == -1) {
                                    s[txid][pid || '0'].push(alias)
                                }
                                else {

                                    alias.children = s[txid][pid || '0'][i].children
                                    alias.id = editid

                                    s[txid][pid || '0'][i] = alias

                                    s.all || (s.all = {})

                                    s.all[alias.id] = alias

                                }


                                if (clbk)
                                    clbk(null, alias)

                                _.each(self.sdk.comments.sendclbks, function (c) {
                                    c(null, alias, txid, pid, aid, editid, fid, true)
                                })

                            }

                        }
                    )
                })


            }
        },

        node: {
            storage: {
                balance: {

                }
            },
            loading: {

            },
            updating: null,

            update: function () {
                var a = ['get.lastBlockHeader']

                var update = function () {
                    self.sdk.node.loading.update = true;

                    lazyEach({
                        array: a,
                        action: function (p) {
                            var a = deep(self.sdk.node, p.item)

                            if (!a) {
                                p.success()
                            }
                            else {
                                a(p.success)
                            }

                        },

                        all: {
                            success: function () {
                                self.sdk.node.loading.update = false;
                            }
                        }
                    })
                }

                update();

                this.updating = retry(function () {

                    return !self.sdk.node.loading.update

                }, function () {

                    update();

                }, 40000, true)
            },

            get: {

                info: function (clbk) {

                    self.app.api.rpc('getnodeinfo').then(d => {
                        if (clbk)
                            clbk(d)
        
                    }).catch(e => {
                        if (clbk) {
                            clbk(null, e)
                        }
                    })

                },

                timepr : function(){

                    if (self.lasttimecheck){

                        var d = new Date()

                        if(self.lasttimecheck.addSeconds(10) > d){
                            return Promise.resolve()
                        }
                    }

                    return self.app.api.rpc('getnodeinfo').then(d => {

                        var t = deep(d, 'time') || 0

                        self.currentBlock = deep(d, 'lastblock.height') || localStorage['lastblock'] || 0
                        self.timeDifference = 0;
                        

                        localStorage['lastblock'] = self.currentBlock

                        if (t) {

                            var d = new Date()

                            self.lasttimecheck = d

                            self.timeDifference = t - Math.floor((d.getTime()) / 1000)
                            self.timeDifferenceTimeZone = t - Math.floor((d.getTime() + (d.getTimezoneOffset() * 60000)) / 1000);

                        }

                        return Promise.resolve()
        
                    })
                },

                time: function (clbk) {

                    self.sdk.node.get.timepr().then(() => {
                        if (clbk)
                            clbk()
                    }).catch(e => {
                        if (clbk) {
                            clbk(null, e)
                        }
                    })

                },

                address: function () {

                    if (typeof _Test != 'undefined' && _Test) {
                        return self.nodes_test[0]
                    }

                    return self.nodes[1]
                },
           

                balance: function (address, clbk) {

                    var s = self.sdk.node.storage.balance;

                    self.app.api.rpc('getBalance', ["*", 6]).then(d => {

                        s[address] = d.result;

                        if (clbk)
                            clbk(s[email])
        
                    }).catch(e => {
                        if (clbk) {
                            clbk(s[email], e)
                        }
                    })

                    
                }
            },

            account: {
                import: function (address, clbk) {

                    self.app.api.rpc('importAddress', [address, address, 1]).then(d => {

                        if (clbk)
                            clbk()
        
                    }).catch(e => {
                        if (clbk) {
                            clbk()
                        }
                    })

                    
                },

                get: function (address, clbk) {

                    self.app.api.rpc('getAccount', [address, 1]).then(d => {

                        if (clbk)
                                clbk(d.result)
        
                    }).catch(e => {
                        if (clbk) {
                            clbk()
                        }
                    })

                   
                },

                getset: function (email, address, clbk) {
                    self.sdk.node.account.get(address, function (r) {
                        if (r) {
                            if (clbk) {
                                clbk()
                            }
                        }
                        else {
                            self.sdk.node.account.import(email, address, clbk)
                        }
                    })
                }
            },

            shares: {
                storage: {

                },
                loading: {

                },
                parameters : {
                    stor : {},
                    defaults : {
                        period : '4320'
                    },
                    get : function(){
                        var meta = self.sdk.node.shares.parameters.meta
                        var e = {}
                        _.each(meta, function(p, i){
                            e[i] = new Parameter(p())

                            e[i]._onChange = function(v){
                                self.sdk.node.shares.parameters.stor[i] = e[i].value
                                self.sdk.node.shares.parameters.save()
                            }
                        })


                        return e
                    },
                    meta : {
                        period: function(){

                            var v = self.sdk.node.shares.parameters.stor.period || self.sdk.node.shares.parameters.defaults.period

                            return {
                                type: "VALUES",
                                name: self.app.localization.e('period'),
                                id: 'period',
                                placeholder: self.app.localization.e('period'),
                                possibleValues: ['1440', '4320', '10080', '43200', '262080'],
                                possibleValuesLabels: [
                                    self.app.localization.e('periodday'), 
                                    self.app.localization.e('period3day'), 
                                    self.app.localization.e('period7day'), 
                                    self.app.localization.e('period31day'), 
                                    self.app.localization.e('period182day')
                                ],
                                value: v,
                                defaultValue : v,

                              
                            }

                        },
                    },
                    load : function(clbk){
                        var p = {};
        
                        try {
                            p = JSON.parse(localStorage['sharessettings'] || '{}');
                        }
                        catch (e) {
    
                        }
    
                        self.sdk.node.shares.parameters.stor = p.stor || {}

                        if(clbk) clbk()
                    },
                    save : function(){

                        localStorage['sharessettings'] = JSON.stringify({
                            stor: self.sdk.node.shares.parameters.stor
                        })
                    }
                },
                clbks: {
                    added: {

                    }
                },

                default: function (clbk) {
                    var address = deep(app, 'user.address.value')

                    if (address) {
                        var author = deep(self, 'sdk.users.storage.' + address)

                        var u = _.map(deep(author, 'subscribes') || [], function (a) {
                            return a.adddress
                        })

                        if (u.length >= 30) {

                            return 'sub'
                        }
                    }

                    return 'common'
                },

                getWithTemp: function (id) {

                    var share = deep(self.app.platform, 'sdk.node.shares.storage.trx.' + id)

                    if (!share) {
                        var temp = _.find(self.sdk.relayTransactions.withtemp('share'), function (s) {
                            return s.txid == id
                        })


                        share = new pShare();
                        share._import(temp, true);
                        share.temp = true;

                        if (s.relay) share.relay = true;

                        share.address = self.app.platform.sdk.address.pnet().address
                    }

                    return share
                },

                users: function (shares, clbk) {
                    var users = [];

                    _.each(shares || [], function (s) {

                        users.push(s.address)

                        var cuser = deep(s, 'lastComment.address')

                        if (cuser)
                            users.push(cuser)
                    })

                    self.sdk.users.get(users, clbk, true)
                },
                add: function (share) {

                    ////todo

                    this.storage[share.txid] = share;

                    _.each(this.clbks.added, function (a) {
                        a(share)
                    })

                },

                tempLikes: function (shares) {

                    _.each(self.sdk.relayTransactions.withtemp('upvoteShare'), function (tempShare) {

                        var txid = tempShare.share;

                        _.find(shares, function (share) {

                            if (share.txid == txid) {

                                share.upvote(tempShare.value)

                                share.scnt || (share.scnt = 0)
                                share.score || (share.score = 0)

                                share.scnt++;
                                share.score = Number(share.score || 0) + Number(tempShare.value);

                                return true
                            }


                        })

                    })

                    var tc = group(self.sdk.relayTransactions.withtemp('comment'), function (tempComment) {
                        return tempComment.optype || 'comment'
                    })

                    var arrange = ['comment', 'commentEdit', 'commentDelete']

                    _.each(arrange, function (t) {

                        var comments = tc[t]

                        _.each(comments, function (tempComment) {

                            if (tempComment.parentid) return

                            var txid = tempComment.postid;

                            _.find(shares, function (share) {


                                if (share.txid == txid) {

                                    var t = tempComment.optype || 'comment'

                                    var last = share.lastComment


                                    if (t == 'comment') {

                                        share.comments++

                                        if (!last || Number(last.timeUpd) < Number(tempComment.timeUpd)) {
                                            share.lastComment = tempComment
                                            tempComment.id = tempComment.txid
                                        }
                                    }

                                    if (t == 'commentEdit') {
                                        if (last && last.id == tempComment.id) {
                                            var t = share.lastComment.time

                                            share.lastComment = tempComment
                                            share.lastComment.time = t;
                                        }
                                    }

                                    if (t == 'commentDelete') {
                                        if (last && last.id == tempComment.id) {

                                            share.lastComment.deleted = true
                                            share.comments--
                                        }
                                    }

                                    return true
                                }


                            })

                        })

                    })



                },

                txids: function (p, clbk, refresh) {
                    this.getbyid(p.txids, clbk, refresh)
                },
                getbyidsp: function (p, clbk, refresh) {
                    this.getbyids(p.txids, p.begin, 10, clbk, refresh)
                },
                getbyids: function (txids, begin, cnt, clbk, refresh) {

                    var s = this.storage;
                    var key = bitcoin.crypto.hash256(JSON.stringify('txids'), 'utf8');

                    var p = {}

                    cnt || (cnt = 10)
                    p.count = cnt

                    if (!s.ids) s.ids = {};
                    if (!s.ids[key] || refresh) s.ids[key] = [];


                    if (!txids.length) {

                        if (clbk)
                            clbk([], null, p)

                        return
                    }

                    if (!s.ids[key].length) {
                        begin || (begin = txids[0])

                    }

                    else {

                        if (!begin) {
                            var l = s.ids[key][s.ids[key].length - 1]

                            if (l == txids[txids.length - 1]) {
                                if (clbk)
                                    clbk([], null, p)

                                return
                            }

                            begin = l;
                        }


                    }

                    var index = _.indexOf(txids, begin);

                    var _txids = _.clone(txids).splice(index, cnt);


                    this.getbyid(_txids, function (shares) {

                        s.ids[key] = [];

                        _.each(txids, function (txid) {

                            if (s.trx[txid])
                                s.ids[key].push(s.trx[txid])

                        })


                        if (clbk)
                            clbk(shares, null, p)

                    }, refresh)
                },

                getbyid: function (txids, clbk, refresh) {

                    var storage = this.storage;
                    storage.trx || (storage.trx = {})

                 

                    var loading = this.loading;

                    var loaded = [];

                    var anotherloading = [];
                    var anotherloadinglength = 0;

                    if (!_.isArray(txids)) txids = [txids];

                    var originaltxids = _.filter(txids, function(id){return id})

                    var waianother = function (clbk) {

                        retry(function () {

                            anotherloading = _.filter(anotherloading, function (id) {
                                if (loading[id]) return true;
                            })


                            console.log('anotherloading', anotherloading)

                            if (!anotherloading.length) return true;

                        }, function () {

                            clbk()

                        }, 20)

                    }

                    if (!refresh) {
                        txids = _.filter(txids, function (id) {

                            if(!id) return false

                            if (!storage.trx[id]) {
                                return true;
                            }
                            else {
                                loaded.push(storage.trx[id])
                            }
                        })
                    }

                    txids = _.filter(txids, function (id) {

                        if(!id) return false
 
                        if (!loading[id]) {

                            return true
                        }
                        else {
                            anotherloading.push(id)
                        }

                    })

                    anotherloadinglength = anotherloading.length

                    if (txids.length) {

                        var parameters = [txids]

                        var temp = self.sdk.node.transactions.temp;

                        var a = self.sdk.address.pnet()

                        /*if (a){
                            parameters.push(a.address)
                        }*/

                        _.each(txids, function (id) {
                            loading[id] = true;
                        })

                        self.app.user.isState(function (state) {

                            self.app.api.rpc('getrawtransactionwithmessagebyid', parameters).then(d => {

                                if (d && !_.isArray(d)) d = [d];

                                d = _.sortBy(d, function (share) {
                                    return _.indexOf(txids, share.txid)
                                })

                                d = _.filter(d || [], function (s) {
                                    if (s.address) return true
                                })

                                _.each(txids, function (id) {
                                    delete loading[id];
                                })

                                var shares = _.map(d || [], function (share) {

                                    var s = new pShare();

                                    s._import(share);

                                    s.txid = share.txid;

                                    s.time = new Date();

                                    s.address = share.address

                                    s.time.setTime(share.time * 1000);

                                    s.score = share.scoreSum;
                                    s.scnt = share.scoreCnt;

                                    storage.trx[s.txid] = s;

                                    if (state && temp['share'] && temp['share'][s.txid]) delete temp['share'][s.txid]

                                    self.sdk.node.shares.takeusers(share, state)


                                    return s

                                })

                                loaded = loaded.concat(shares)

                                self.sdk.node.shares.tempLikes(loaded)

                                waianother(function () {
                                    if (clbk)

                                        clbk(loaded, null, {
                                            count: txids.length
                                        })
                                })
        
                            }).catch(e => {
                                if (clbk) {
                                    clbk(null, e, {})
                                }
                            })

                            
                        })

                    }
                    else {
                        waianother(function () {

                            var loaded = _.map(originaltxids, function(id){
                                return storage.trx[id]
                            })

                            console.log("loaded", loaded)
                         
                            if (clbk)
                                clbk(loaded, null, {
                                    count: loaded.length
                                }, true)
                        })
                    }


                },

                transform: function (d, state) {

                    var storage = this.storage;

                    storage.trx || (storage.trx = {})

                    var temp = self.sdk.node.transactions.temp;

                    d = _.filter(d || [], function (s) {
                        if (s.address) return true
                    })

                    var shares = _.map(d || [], function (share) {

                        var s = new pShare();

                        s._import(share);

                        s.txid = share.txid;

                        s.time = new Date();

                        s.address = share.address

                        s.time.setTime(share.time * 1000);

                        s.score = share.scoreSum;
                        s.scnt = share.scoreCnt;

                        s.edit = share.edit || false
                        s.info = null

                        if (share.ranks){
                            s.info = share.ranks
                        }
                        else
                        {

                            if(
                                share.BOOST || share.DPOST ||
                                share.DREP || share.LAST5 ||
                                share.LAST5 || share.LAST5R ||
                                share.POSTRF || share.PREP ||
                                share.PREPR || share.UREP
                            )
                                s.info = {
                                    BOOST : share.BOOST,
                                    DPOST : share.DPOST,
                                    DREP : share.DREP,
                                    LAST5 : share.LAST5,
                                    LAST5R : share.LAST5R,
                                    POSTRF : share.POSTRF,
                                    PREP : share.PREP,
                                    PREPR : share.PREPR,
                                    UREP : share.UREP,
                                    UREPR : share.UREPR,
                                }
                        }

                        if (state && temp['share'] && temp['share'][s.txid]) delete temp['share'][s.txid]


                        storage.trx[s.txid] = s;

                        return s

                    })

                    self.sdk.node.shares.tempLikes(shares)

                    return shares
                },


                takeusers: function (d, state) {

                    _.each(d, function (data) {

                        var _u = data.userprofile

                        if (_u) {
                            var u = self.sdk.users.prepareuser(_u, _u.address, state)

                            //self.sdk.users.storage[data.address] = u;

                            self.sdk.usersl.storage[_u.address] = u;

                        }

                    })


                },

                get: function (parameters, clbk, method) {

                    method || (method = 'getrawtransactionwithmessage')

                    var storage = this.storage;



                    self.app.user.isState(function (state) {

                        self.app.api.rpc(method, parameters).then(d => {

                            var shares = self.sdk.node.shares.transform(d, state)

                            
                            self.sdk.node.shares.takeusers(d, state)

                            if (clbk)
                                clbk(shares)
        
                        }).catch(e => {
                            if (clbk) {
                                clbk([], e)
                            }
                        })

                        
                    })
                },

                getex: function (parameters, clbk, method) {

                    method || (method = 'getrawtransactionwithmessage')

                    var storage = this.storage;

                    self.app.user.isState(function (state) {

                        self.app.api.rpc(method, parameters, {
                            rpc : {
                                ex : true
                            }
                        }).then(d => {

                            d.contents || (d.contents = [])

                            var clear = d.contents

                            d.contents = self.sdk.node.shares.transform(d.contents, state)

                            self.sdk.node.shares.takeusers(clear, state)

                            if (d.users)
                                self.sdk.node.shares.takeusers(_.map(d.users, function(u){
                                    return {
                                        userprofile : u
                                    }
                                }), state)

                            if(d.videos){

                                var s = self.sdk.videos.storage
                
                                var lmap = _.map(d.videos, function(i, l){

                                    var meta = parseVideo(l)

                                    return {
                                        meta : meta,
                                        link : l
                                    }
                                })

                                self.sdk.videos.catchPeertubeLinks(d.videos, lmap)

                                _.each(lmap, function(l){
                                    s[l.link] = s[l.meta.id] = l
                                })

                            }

                            if (clbk)
                                clbk(d)
        
                        }).catch(e => {
                            if (clbk) {
                                clbk([], e)
                            }
                        })

                        
                    })
                },

                recommended: function (p, clbk, cache) {


                    if (!p) p = {};

                    self.app.user.isState(function (state) {

                        p.count || (p.count = '30')

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var storage = self.sdk.node.shares.storage
                        var key = 'recommended'

                        if (cache == 'cache' && storage[key]) {

                            if (clbk)
                                clbk(storage[key], null, p)

                        }
                        else {
                            //var parameters = ['30', '259200', 600000, self.app.localization.key];

                            console.log(p.period, self.sdk.node.shares.parameters.defaults.period, self.sdk.node.shares.parameters.stor.period)

                            var period = p.period || self.sdk.node.shares.parameters.stor.period || self.sdk.node.shares.parameters.defaults.period || '4320' ///self.sdk.node.shares.parameters.defaults.period 

                            var page = p.page || 0
                            
                            var parameters = []
                            
                            parameters = ['30', period, (period * page) || '', self.app.localization.key]
                            
                            //parameters = ['30', '259200', '', self.app.localization.key];

                            if(p.video){
                                parameters.push('video')
                            }

                            self.sdk.node.shares.get(parameters, function (shares, error) {

                                if (shares) {

                                    self.sdk.node.shares.loadvideoinfoifneed(shares, p.video, function(){

                                        if (state) {
                                            _.each(self.sdk.relayTransactions.withtemp('blocking'), function (block) {
                                                _.each(shares, function (s) {
                                                    if (s.address == block.address) s.blocking = true;
                                                })
                                            })
                                        }



                                        if(p.video){
                                            shares = _.filter(shares, function(share){

                                                if(!share.url) return

                                                var meta = app.platform.parseUrl(share.url);

                                                if((meta.type == 'youtube') || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube'){ 

                                                    if (self.sdk.videos.storage[share.url] && self.sdk.videos.storage[share.url].data)
                                                        return true
                                                }
                                            })
                                        }

                                        storage[key] = shares;

                                        if (clbk)
                                            clbk(storage[key], error, p)

                                    })

                                    
                                }

                                else {
                                    if (clbk)
                                        clbk(shares, error, p)
                                }

                            }, 'gethotposts')
                        }

                    })
                },

                common: function (p, clbk, cache) {

                    self.app.user.isState(function (state) {

                        if (!p) p = {};

                        p.count || (p.count = 10)

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var key = (p.address || "") + "_" + (p.author || "") + "_" + (p.begin || "") + "_" + self.app.localization.key

                        var temp = self.sdk.node.transactions.temp;

                        var storage = self.sdk.node.shares.storage;

                        var s = self.sdk.node.shares;

                        if (cache == 'cache' && storage[key]) {

                            var tfinded = null;
                            var added = 0;

                            if (!p.txid) tfinded = true;

                            var shares = _.filter(storage[key], function (s, i) {
                                storage.trx[s.txid] = s;

                                if (tfinded && added < p.count) {

                                    added++;

                                    return true;
                                }

                                if (s.txid == p.txid) {
                                    tfinded = true;
                                }
                            })


                            if (clbk)
                                clbk(storage[key], null, p)

                        }
                        else {

                            storage[key] || (storage[key] = [])

                            if (cache == 'clear') storage[key] = [];

                            if (!p.txid) {
                                if (storage[key].length) {

                                    if (p.count > 0) {
                                        var st = storage[key][storage[key].length - 1]

                                        p.txid = st.txid
                                    }
                                    else {
                                        var st = storage[key][0]

                                        p.txid = st.txid
                                    }

                                }
                            }

                            if (!p.txid) p.txid = p.begin || ''

                            var adr = ''

                            if (p.author == '1') adr = p.address

                            var parameters = [adr, p.author || "", p.txid || "", p.count, p.author ? "" : self.app.localization.key];

                            s.get(parameters, function (shares, error) {

                                if (shares) {
                                    if (state) {

                                        if (!p.author || p.author == p.address) {
                                            _.each(self.sdk.relayTransactions.withtemp('share'), function (ps) {


                                                var s = new pShare();
                                                s._import(ps, true);
                                                s.temp = true;

                                                if (ps.relay) s.relay = true

                                                s.address = ps.address

                                                if (ps.txidEdit) {

                                                    replaceEqual(shares, {
                                                        txid: ps.txidEdit
                                                    }, s)
                                                }

                                                else {
                                                    shares.unshift(s)
                                                }


                                            })
                                        }

                                        _.each(self.sdk.relayTransactions.withtemp('blocking'), function (block) {
                                            _.each(shares, function (s) {
                                                if (s.address == block.address) s.blocking = true;
                                            })
                                        })
                                    }

                                    _.each(shares || [], function (s) {

                                        if (p.count > 0) {
                                            storage[key].push(s)
                                        }
                                        else {
                                            storage[key].unshift(s)
                                        }

                                    })

                                    self.sdk.node.transactions.saveTemp()

                                    if (clbk)
                                        clbk(shares, error, p)
                                }

                                else {
                                    if (clbk)
                                        clbk(shares, error, p)
                                }

                            })


                        }
                    })
                },

                loadvideoinfoifneed : function(shares, need, clbk){
                    self.sdk.videos.infoshares(shares).then(r => {
                        if(clbk) clbk()
                    }).catch(e => {
                        if(clbk) clbk()
                    })
                },

                getusercontents : function(p, clbk, cache){

                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method : 'getusercontents'
                    })
                },

                hierarchical: function (p, clbk, cache, methodparams) {

                    if(!methodparams) methodparams = {}

                    /*

                    p.height
                    p.start_txid
                    p.count 10
                    p.lang lang 
                    p.tagsfilter tagsfilter
                    p.video

                    */

                    self.app.user.isState(function (state) {

                        if (!p) p = {};

                        p.count || (p.count = 10)
                        p.lang || (p.lang = self.app.localization.key)
                        p.height || (p.height = 0)
                        p.tagsfilter || (p.tagsfilter = [])
                        p.begin || (p.begin = '')

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var key = p.count + (p.address || "") + "_" + (p.lang || "") + "_" + /*(p.height || "")  +*/ "_" + (p.tagsfilter.join(',')) + "_" + (p.begin || "") + (p.video ? "video" : '')

                        if(p.author) key = key + p.author

                        var storage = self.sdk.node.shares.storage;
                        var s = self.sdk.node.shares;

                        if (cache == 'cache' && storage[key]) {

                            var tfinded = null;
                            var added = 0;

                            if (!p.txid) tfinded = true;

                            _.each(storage[key], function (s, i) {
                                storage.trx[s.txid] = s;
                                if (tfinded && added < p.count) {
                                    added++;
                                    return true;
                                }
                                if (s.txid == p.txid) {
                                    tfinded = true;
                                }
                            })

                            if (clbk)
                                clbk(storage[key], null, p)

                        }
                        else {
                            if (!storage[key] || cache == 'clear') storage[key] = [];

          

                            if (!p.txid) {
                                if (storage[key].length) {

                                    if (p.count > 0) {
                                        var st = storage[key][storage[key].length - 1]

                                        p.txid = st.txid
                                    }
                                    else {
                                        var st = storage[key][0]

                                        p.txid = st.txid
                                    }

                                }
                            }

                            if (!p.txid) p.txid = p.begin || ''

                            p.tagsfilter = _.map(p.tagsfilter, function(t){
                                return encodeURIComponent(t)
                            })

                            /////temp

                            if (p.video && !self.videoenabled){
                                p.tagsfilter = ['video']
                            }


                            ////

                            var parameters = [Number(p.height), p.txid, p.count, p.lang, p.tagsfilter, p.video && self.videoenabled ? 'video' : ''];

                            if(p.author) parameters.unshift(p.author)


                            s.getex(parameters, function (data, error) {

                                var shares = data.contents || []
                                var blocknumber = data.height

                                _.each(shares, function(s){
                                    if (s.info){
                                        s.info.BLOCK = blocknumber
                                    }
                                })

                                p.blocknumber = blocknumber


                                if (shares) {


                                    self.sdk.node.shares.loadvideoinfoifneed(shares, p.video, function(){

                                        if (state) {
                                            _.each(self.sdk.relayTransactions.withtemp('blocking'), function (block) {
                                                _.each(shares, function (s) {
                                                    if (s.address == block.address) s.blocking = true;
                                                })
                                            })
                                        }



                                        if(p.video){
                                            shares = _.filter(shares, function(share){

                                                if(!share.url) return

                                                var meta = app.platform.parseUrl(share.url);

                                                if((meta.type == 'youtube') || meta.type == 'vimeo' || meta.type == 'bitchute' || meta.type == 'peertube'){ 

                                                    if (self.sdk.videos.storage[share.url] && self.sdk.videos.storage[share.url].data)
                                                        return true
                                                }
                                            })
                                        }



                                        _.each(shares || [], function (s) {
                                            if (p.count > 0) {
                                                storage[key].push(s)
                                            }
                                            else {
                                                storage[key].unshift(s)
                                            }
                                        })

                                        self.sdk.node.transactions.saveTemp()

                                        if (clbk)
                                            clbk(shares, error, p)

                                    })
                                }

                                else {
                                    if (clbk)
                                        clbk(shares, error, p)
                                }

                            }, methodparams.method || 'gethierarchicalstrip')


                        }
                    })
                }
            },

            transactions: {

                unspent: null,

                storage: {},

                loading: {},

                unspentLoading: {},

                temp: {},

                clbks: {

                },

                tempOptions: {
                    userInfo: {
                        count: 'one'
                    }
                },

                getCoibaseTypeN : function (tx, address) {
                
                    var type = null;
                    
                    if(!tx.vout || !tx.vout.length || !address) return null

                    var firstout = tx.vout[0]
                    var l = tx.vout.length

                    if(!firstout || l <= 1) return null

                    try {
                        var chunks = bitcoin.script.decompile(Buffer.from(firstout.scriptPubKey.hex, 'hex'))

                        var cl = chunks.length

                        if(!cl) return null

                        var n = 0;

                        for(var i = l - 1; i > 0; i--){

                            n++

                            var v = tx.vout[i]

                            var _address = deep(v, 'scriptPubKey.addresses.0')

                            if (_address == address && chunks[cl - n]) {
                                var ch = chunks[cl - n]


                                if (ch == bitcoin.opcodes.OP_WINNER_POST) {
                                    type = 'post'
                                }

                                if (ch == bitcoin.opcodes.OP_WINNER_COMMENT) {
                                    type = 'comment'
                                }

                                if (ch == bitcoin.opcodes.OP_WINNER_POST_REFERRAL) {
                                    type = 'postref'
                                }

                                if (ch == bitcoin.opcodes.OP_WINNER_COMMENT_REFERRAL) {
                                    type = 'commentref'
                                }
                            }
                        }

                    }
                    catch(e){
                        console.log("E", e)
                    }

                 
                    return type
                },

                getCoibaseType: function (tx, address) {

                    var type = null;


                    _.each(tx.vout, function (v) {

                        var _address = deep(v, 'scriptPubKey.addresses.0')

                        if (_address == address) {


                            try {
                                var chunks = bitcoin.script.decompile(Buffer.from(v.scriptPubKey.hex, 'hex'))


                                var ch = _.find(chunks, function (c) {
                                    return c == bitcoin.opcodes.OP_WINNER_POST || c == bitcoin.opcodes.OP_WINNER_COMMENT|| c == bitcoin.opcodes.OP_WINNER_POST_REFERRAL|| c == bitcoin.opcodes.OP_WINNER_COMMENT_REFERRAL
                                })

                                type = ch;


                                if (type == bitcoin.opcodes.OP_WINNER_POST) {
                                    type = 'post'
                                }

                                if (type == bitcoin.opcodes.OP_WINNER_COMMENT) {
                                    type = 'comment'
                                }

                                if (type == bitcoin.opcodes.OP_WINNER_POST_REFERRAL) {
                                    type = 'postref'
                                }

                                if (type == bitcoin.opcodes.OP_WINNER_COMMENT_REFERRAL) {
                                    type = 'commentref'
                                }

               

                            }
                            catch (e) {

                                console.log("ERR", e)

                            }
                        }


                    })

                    return type
                },

                getOpreturn: function (tx) {

                    var opreturnData = [];

                    _.each(tx.vout, function (v) {

                        try {
                            var chunks = bitcoin.script.decompile(Buffer.from(v.scriptPubKey.hex, 'hex'))

                            if (chunks[0] == bitcoin.opcodes.OP_RETURN) {

                                opreturnData.push(chunks[1].toString())

                            }


                        }
                        catch (e) {

                        }
                    })

                    return opreturnData.join('')
                },

                addressFromScryptSig: function (asm) {

                    if (!asm) return ''

                    var pub = asm.split(" ")[1];

                    if (!pub) return ''

                    var keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(pub, 'hex'))

                    var a = self.sdk.address.pnetsimple(keyPair.publicKey).address

                    return a
                },

                toUT: function (tx, address, n) {

                    var vout = _.find(tx.vout, function (v) {
                        return _.find(v.scriptPubKey.addresses, function (a) {
                            return a == address && (typeof n == 'undefined' || n == v.n)
                        })
                    })

                    var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false


                    var t = {
                        txid: tx.txid,
                        vout: vout.n,
                        address: address,
                        confirmations: tx.confirmations || 0,
                        coinbase: coinbase || tx.coinstake,
                        amount: vout.value,
                        scriptPubKey: vout.scriptPubKey.hex,
                        pockettx: tx.pockettx
                    }

                    return t

                },

                toUTs: function (tx, address) {

                    var outs = [];

                    _.each(tx.vout, function (vout) {
                        var a = _.find(vout.scriptPubKey.addresses, function (a) {
                            return a == address
                        })

                        if (a) {
                            var coinbase = deep(tx, 'vin.0.coinbase') || (deep(tx, 'vout.0.scriptPubKey.type') == 'nonstandard') || false

                            var t = {
                                txid: tx.txid,
                                vout: Number(vout.n),
                                address: address,
                                confirmations: tx.confirmations,
                                coinbase: coinbase || tx.coinstake,
                                amount: vout.value,
                                scriptPubKey: vout.scriptPubKey.hex,
                                pockettx: tx.pockettx
                            }

                            outs.push(t)

                        }
                    })



                    return outs

                },

                waitSpend: function (tx) {


                    if (tx.confirmations <= 11 && tx.pockettx) {

                        return 11 - tx.confirmations

                    }

                    if (tx.confirmations == 0 && !tx.coinbase && !tx.coinstake) {

                        return 1

                    }

                    if (tx.confirmations < 100 && (tx.coinbase || tx.coinstake)) {

                        return 100 - tx.confirmations

                    }

                    return 0
                },


                releaseCS: function (inputs) {
                    _.each(inputs, function (t) {
                        delete t.cantspend
                    })
                },


                canSpend: function (tx) {
                    if (tx.cantspend) return false;
                    if (tx.block) return false;

                    var wait = self.sdk.node.transactions.waitSpend(tx)

                    if (!wait) return true
                },

                sign: function (tx, clbk) {
                    var hex = tx.toHex();

                    self.app.api.rpc('signrawtransactionwithkey', [hex, []]).then(d => {

                        if (clbk)
                                clbk(d)
        
                    }).catch(e => {
                        if (clbk) {
                            clbk(null, e)
                        }
                    })

                    
                },

                send: function (tx, clbk) {
                    var hex = tx.toHex();

                    ///02000000c461916001a051befc35b2b9e291351daf25d9cfe0a69804d04609f929b24715ffe8aaac72010000006a47304402201eaea2d4c04c416f7dbdd3745b29fc1d49eeb7c826cfddf249065193897e22a402205372a4be6a6c0b4a4f74ba86b2fe62c7895d83ab7c17049cc6d764f03d5cf4e0012102e854216811757649179139c8136c8d2e0bfadf92e71f8840752ba6e526e568e1ffffffff0280969800000000005e76a914aa66691afeeb4399803dcfb1ef47ed1024e1f9928763ad75a8207ca94ddc1031a8ce4fac4e3b8d61fd232b491a19d08e4b51f51d89f70a9eccf7886776a914b55078daf7f7b3311237309ddb1ba6af6d4ad4a888ad0311ba11b168bb750600000000001976a914b55078daf7f7b3311237309ddb1ba6af6d4ad4a888ac00000000

                    self.app.api.rpc('sendrawtransaction', [hex]).then(d => {

                        if (clbk)
                                clbk(d)
        
                    }).catch(e => {
                        if (clbk) {
                            clbk(null, e)
                        }
                    })

                },

                saveTemp: function (clbk) {
                    var a = self.sdk.address.pnet();

                    if (a) {
                        self.app.settings.set(self.sdk.address.pnet().address, 'temp2', JSON.stringify(self.sdk.node.transactions.temp))
                    }

                    if (clbk)
                        clbk()

                },

                loadTemp: function (clbk) {

                    var a = self.sdk.address.pnet();

                    if (a) {
                        self.sdk.node.transactions.temp = JSON.parse(self.app.settings.get(self.sdk.address.pnet().address, 'temp2') || "{}")
                    }
                    else {
                        self.sdk.node.transactions.temp = {};
                    }

                    if (clbk)
                        clbk()


                },

                findTemp: function (txid) {
                    var t = this.temp;

                    var finded = null;

                    _.each(t, function (ts) {

                        if (ts[txid]) {

                            finded = ts[txid]
                        }


                    })


                    return finded
                },

                clearTempHard: function(){

                    self.sdk.node.transactions.temp = {};
                    self.sdk.node.transactions.saveTemp();

                    _.each(self.sdk.node.transactions.clbks, function (c) {
                        c();
                    })
                },

                clearTemp: function (txid, vout, dbg) {
                    var t = this.temp;

                    var finded = null;

                    /*return*/

                    _.each(t, function (ts, w) {
                        

                        var _finded = ts[txid]

                        if (_finded) {


                            if (!_finded.outputs) {

                                delete ts[txid]

                                finded = _finded
                            }

                            else {

                                if (_finded.outputs[vout]) {
                                    _finded.outputs[vout].deleted = true;
                                }

                                var outs = _.filter(_finded.outputs, function (o) {
                                    return !o.deleted
                                })


                                if (!outs.length) {

                                    delete ts[txid]

                                    finded = _finded

                                }
                            }

                            //
                        }


                    })


                    return finded
                },

                checkTemps: function (clbk) {

                    /*if (clbk)
                        clbk()
                    return*/

                    var c = this.checkTemp
                    var t = this.temp;

                    var temps = [];

                    var deleted = false;

                    _.each(t, function (ts) {
                        _.each(ts, function (alias) {
                            temps.push(alias)
                        })
                    })

                    lazyEach({
                        array: temps,
                        action: function (p) {
                            c(p.item, function (result) {

                                if (result) {
                                    _.each(t, function (ts) {

                                        if (ts[p.item.txid]) {
                                            deleted = true
                                            delete ts[p.item.txid]
                                        }


                                    })
                                }

                                self.sdk.node.transactions.saveTemp()

                                p.success()
                            })
                        },

                        all: {
                            success: function () {

                                if (deleted) {
                                    _.each(self.sdk.node.transactions.clbks, function (c) {
                                        c();
                                    })
                                }

                                if (clbk)
                                    clbk()
                            }
                        }
                    })

                },
                checkTemp: function (alias, clbk) {
                    if (alias && alias.txid) {

                        self.sdk.node.transactions.get.tx(alias.txid, function (d, _error) {


                            if (clbk) {

                                var errorcode = deep(_error, 'code') || null

                                clbk( 
                                    (errorcode == -5) || (errorcode == -8) || 
                                    (deep(d, 'confirmations') > 0)
                                )
                            }
                        })


                    }
                    else {
                        if (clbk) {
                            clbk(null)
                        }
                    }
                },

                tempInputs: function () {
                    var t = this.temp;

                    var inputs = [];

                    _.each(t, function (ts) {

                        _.each(ts, function (alias) {

                            if (alias.inputs) {

                                _.each(alias.inputs, function (i) {
                                    inputs.push(i)
                                })

                            }
                        })
                    })

                    return inputs

                },

                tempOutputs: function () {

                    if(!self.sdk.address.pnet()) return []

                    var t = this.temp;

                    var outputs = [];
                    var myaddresses = [self.sdk.address.pnet().address].concat(self.sdk.addresses.storage.addresses || [])



                    _.each(t, function (ts) {

                        _.each(ts, function (alias) {

                            if (alias.outputs) {

                                _.each(alias.outputs, function (i) {


                                    var f = _.find(myaddresses, function(a){
                                        if(a == i.address) return true
                                    })

                                    if (f)
                                        outputs.push(i)
                                })

                            }
                        })
                    })

                    return outputs

                },

                tempBalanceOutputs: function () {
                    var outputs = this.tempOutputs()
                   

                    return _.reduce(outputs, function (m, i) {
                        if(i.deleted) return m

                        return m + i.amount

                    }, 0)
                },

                tempBalance: function () {

                    return this.tempBalanceOutputs()

                    var inputs = this.tempInputs()
                    var outputs = this.tempOutputs()

                    

                    return _.reduce(inputs, function (m, i) {

                        return m + i.amount / smulti

                    }, 0)
                },

                haveTemp: function () {
                    var t = this.temp;

                    var temps = 0;

                    _.each(t, function (ts) {

                        _.each(ts, function (alias) {
                            temps++
                        })
                    })

                    return temps
                },

                blockUnspents: function (txids) {

                    var s = self.sdk.node.transactions;

                    _.each(txids, function (id) {

                        _.each(s.unspent, function (unspents) {

                            var r = _.find(unspents, function (u) {
                                return u.txid == id.txid && u.vout == id.vout
                            })

                            if (r) {

                                r.block = true

                            }

                        })



                    })
                },

                unblockUnspents: function (txids) {

                    var s = self.sdk.node.transactions;

                    _.each(txids, function (id) {

                        _.each(s.unspent, function (unspents) {

                            var r = _.find(unspents, function (u) {
                                return u.txid == id.txid && u.vout == id.vout
                            })

                            if (r) {

                                delete r.block

                            }

                        })


                    })
                },

                setUnspentoptimizationInterval : function(){

                    if(!unspentoptimizationInterval){

                        self.sdk.node.transactions.unspentOptimization()
                        
                        unspentoptimizationInterval = setInterval(function(){
                            self.sdk.node.transactions.unspentOptimization()
                        }, 300000)
                    }

                    
                },

                clearUnspentoptimizationInterval : function(){

                    if (unspentoptimizationInterval){
                        clearInterval(unspentoptimizationInterval)
                        unspentoptimizationInterval = null
                    }
                    
                },

                unspentOptimization : function(){

                    var s = self.sdk.node.transactions;
                    var pnet = self.sdk.address.pnet();

                    if (pnet && s.unspent){
                       
                        var unspents = _.filter(s.unspent[pnet.address] || [], function(u){
                            return self.sdk.node.transactions.canSpend(u) && u.amount
                        })
                        

                        if (unspents.length > 200){
                            unspents = _.filter(unspents, function(u, i){
                                return i < 180
                            })

                            var keyPair = self.app.user.keys()

                            self.sdk.wallet.sendFromInputs(pnet.address, unspents, keyPair, 0, function(err, tx){
                            })
                            
                        }
                    }
                   
                },

                clearUnspents: function (txids) {

                    var cleared = false;
                    var s = self.sdk.node.transactions;
                    var amount = 0;
                    var pnet = self.sdk.address.pnet();



                    _.each(txids, function (id) {

                        _.each(s.unspent, function (unspents, address) {

                            var r = removeEqual(unspents, {
                                txid: id.txid,
                                vout: id.vout
                            })

                            if (r) {
                                cleared = true;


                                if (pnet && address == pnet.address) {
                                    amount = amount + Number(r.amount)
                                }

                            }

                        })

                    })

                    if (cleared) {
                        _.each(s.clbks, function (c) {
                            c(-amount);
                        })
                    }
                },

                get: {

                    lenta: {
                        common: function () {

                        }
                    },

                    balanceAr: function (clbk, addresses, update, canSpend) {
                        this.unspents(function (us, e) {

                            var total = 0;

                            var allunspents = [];

                            _.each(us, function (unspent) {

                                if (canSpend) {
                                    unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)

                                }

                                var amount = _.reduce(unspent, function (m, u) {
                                    return m + Number(u.amount)
                                }, 0)

                                allunspents = allunspents.concat(unspent)

                                total += amount
                            })

                            if (clbk)
                                clbk(total, allunspents, e)

                        }, addresses, update)
                    },

                    allBalanceUpdate: function (clbk) {
                        self.sdk.node.transactions.get.allBalance(clbk, true)
                    },

                    allBalance: function (clbk, update) {
                        var addresses = [self.sdk.address.pnet().address].concat(self.sdk.addresses.storage.addresses || [])

                        this.balanceAr(clbk, addresses, update)
                    },

                    canSpend: function (addresses, clbk) {

                        addresses || (addresses = [self.sdk.address.pnet().address].concat(self.sdk.addresses.storage.addresses || []))

                        if (!_.isArray(addresses)) addresses = [addresses];

                        this.balance(function (total, us) {

                            var usCanSpend = _.filter(us, self.sdk.node.transactions.canSpend);


                            var amount = _.reduce(usCanSpend, function (m, u) {
                                return m + Number(u.amount)
                            }, 0)

                            if (clbk) {
                                clbk(amount, total)
                            }


                        }, addresses)
                    },

                    balance: function (clbk, address, update, canSpend) {

                        if (_.isArray(address)) {
                            this.balanceAr(clbk, address, update, canSpend)

                        }
                        else {
                            this.unspent(function (unspent, e) {

                                if (canSpend) {
                                    unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)
                                }

                                var amount = _.reduce(unspent, function (m, u) {
                                    return m + Number(u.amount)
                                }, 0)

                                if (clbk)
                                    clbk(amount, unspent, e)

                            }, address, update)
                        }


                    },



                    _unspent: function (clbk) {

                        var s = self.sdk.node.transactions;

                        var p2pkh = self.sdk.address.pnet();

                        self.app.api.rpc('listUnspent', [1, 9999999, [p2pkh.address]]).then(d => {

                            if (clbk)
                                    clbk(d || [])
        
                        }).catch(e => {
                            if (clbk) {
                                clbk([])
                            }
                        })

                       
                    },

                    _unspents: function (clbk, addresses, update) {

                        var a = {};


                        lazyEach({
                            array: addresses,

                            action: function (p) {
                                var address = p.item;

                                self.sdk.node.transactions.get.unspent(function (u) {

                                    a[address] = u

                                    p.success()

                                }, address, update)
                            },

                            all: {
                                success: function () {


                                    if (clbk)
                                        clbk(a)
                                }
                            }
                        })
                    },

                    unspents: function (clbk, addresses, update) {


                        var loadingAddressesClbk = function () {
                            addresses = _.filter(addresses, function (address) {
                                if (s.unspent[address] && !update) {

                                    a[address] = s.unspent[address]

                                    return false;
                                }
                                else {
                                    s.unspentLoading[address] = true;

                                    return true;
                                }
                            })

                            if (!addresses.length) {
                                if (clbk)
                                    clbk(a)
                            }

                            else {

                                self.app.api.rpc('txunspent', [addresses, 1, 9999999]).then(d => {

                                    if (!s.unspent)
                                        s.unspent = {};


                                    _.each(d, function (u) {
                                        self.sdk.node.transactions.clearTemp(u.txid, u.vout);
                                    })

                                    _.each(addresses, function (address) {
                                        s.unspentLoading[address] = false;
                                        s.unspent[address] = []

                                        a[address] = [];
                                    })

                                    _.each(d || [], function (tr) {

                                        var address = tr.address


                                        removeEqual(s.unspent[address], {
                                            txid: tr.txid,
                                            vout: tr.vout
                                        })

                                        s.unspent[address].push(tr)
                                        a[address].push(tr)
                                    })

                                    _.each(self.sdk.node.transactions.clbks, function (c) {
                                        c()
                                    })

                                    if (clbk)
                                        clbk(a)
        
                                }).catch(e => {

                                    if (!s.unspent)
                                        s.unspent = {};

                                    _.each(addresses, function (address) {

                                        s.unspent[address] = [];
                                        s.unspentLoading[address] = false;

                                        a[address] = [];
                                    })

                                    if (clbk) {
                                        clbk(null, e)
                                    }
                                })

                              
                            }
                        }

                        var s = self.sdk.node.transactions;

                        if (!s.unspent)
                            s.unspent = {};

                        var a = {};

                        var loadingAddresses = _.filter(addresses, function (address) {
                            if (s.unspentLoading[address])

                                return true;
                        })

                        if (loadingAddresses.length) {

                            retry(function () {

                                var _loadingAddresses = _.filter(addresses, function (address) {
                                    if (s.unspentLoading[address])

                                        return true;
                                })

                                if (!_loadingAddresses.length) return true;

                            }, function () {

                                loadingAddressesClbk()

                            }, 10)

                        }
                        else {
                            loadingAddressesClbk()
                        }



                    },

                    unspent: function (clbk, address, update) {

                        var s = self.sdk.node.transactions;

                        if (!s.unspent)
                            s.unspent = {};

                        if (self.sdk.address.pnet()) {
                            address || (address = self.sdk.address.pnet().address);
                        }

                        if (!address) {

                            if (clbk)
                                clbk()

                            return

                        }


                        if (s.unspentLoading[address]) {

                            retry(function () {

                                if (!s.unspentLoading[address]) return true;

                            }, function () {

                                if (clbk) {
                                    clbk(s.unspent[address])
                                }

                            }, 10)

                            return
                        }


                        if (s.unspent[address] && !update) {
                            if (clbk)
                                clbk(s.unspent[address])
                        }
                        else {
                            s.unspentLoading[address] = true;

                            self.app.api.rpc('txunspent', [[address], 1, 9999999]).then(d => {

                                if(!s.unspent)
                                    s.unspent = {};


                                    s.unspent[address] = d || [];

                                    if (s.unspentLoading)
                                        s.unspentLoading[address] = false;

                                    if (clbk)
                                        clbk(s.unspent[address])
        
                            }).catch(e => {
                                if (!s.unspent)
                                    s.unspent = {};

                                s.unspent[address] = [];

                                if (s.unspentLoading)
                                    s.unspentLoading[address] = false;

                                if (clbk) {
                                    clbk(s.unspent[address], e)
                                }
                            })

                        }


                    },

                    tx: function (id, clbk) {

                        if (self.sdk.node.transactions.loading[id]) {

                            retry(function () {

                                if (!self.sdk.node.transactions.loading[id]) return true;

                            }, function () {

                                if (clbk) {
                                    clbk(self.sdk.node.transactions.storage[id])
                                }

                            }, 40)


                            return
                        }

                        if (self.sdk.node.transactions.storage[id]) {
                            if (clbk)
                                clbk(self.sdk.node.transactions.storage[id])
                        }

                        else {
                            self.sdk.node.transactions.loading[id] = true;

                            self.app.api.rpc('getrawtransaction', [id, 1]).then(d => {

                                self.sdk.node.transactions.loading[id] = false;

                                self.sdk.node.transactions.storage[id] = d

                                if (clbk)
                                    clbk(d)
        
                            }).catch(e => {
                                self.sdk.node.transactions.loading[id] = false;

                                if (clbk) {
                                    clbk(null, e)
                                }
                            })

                            
                        }



                    }
                },

                htls : {
                    plcreate : function(id, amount, inputs, dummyoutputs, clbk){

                        var lock = 0
                        
                        self.sdk.node.shares.getbyid(id, function() {
                            var item = self.sdk.node.shares.storage.trx[id];

                            if(!item) return clbk('item')

                            //lock = 10

                            var time = 965504 + 200 //item.time  self.currentBlock + lock

                            var address = item.address

                            var {txb, payment} = self.sdk.node.transactions.htls.create(inputs, dummyoutputs, id, address, amount, time)

                            if (clbk) clbk(txb, {
                                address,
                                time,
                                //lock,
                                payment,
                                htlc : payment.htlc,
                                //hash,
                                tdif : time - self.currentBlock
                            })

                        })
                    },

                    create : function(inputs, dummyoutputs, id, reciever, amount, time){

                        var multisha = function(str, count){

                            if(!count) count = 100
                    
                            var h = Buffer.from(str)
                    
                            for (var i = 0; i < count; i++){
                                h = bitcoin.crypto.sha256(h)
                            }
                    
                            return h.toString('hex')
                        }
                    
                        var createhash = function(key, seed){
                    
                            var str = multisha(multisha(key) + '_' + seed, 10)
                    
                            return str
                        }
                    
                        var crrc = function(key, txid){
                            return createhash(key, txid)
                        }

                        var keyPair = self.app.user.keys()
                        var privatekey = keyPair.privateKey
                        var secret = crrc(privatekey.toString('hex'), id)

                        var payment = bitcoin.payments.htlc({
                            htlc : {
                                secret,
                                lock : time,
                                reciever,
                                sender : self.sdk.address.pnetsimple(keyPair.publicKey).address
                            }
                        });

                        var htlcout = _.find(dummyoutputs, function(dout){
                            return dout.key == 'htlc'
                        })

                        if(!htlcout){
                            return Promise.reject('htlcout')
                        }
                        
                        var outputs = [{ 
                            scriptPubKey : payment.output, 
                            amount : htlcout.amount
                        }]

                        var indexes = {}

                        _.each(dummyoutputs, function(dop){
                            if(dop.address) {
                                indexes[outputs.push(dop) - 1] = true

                                //dop.amount = dop.amount - 0.02
                            }
                        })

                        console.log("htlc",{
                            secret,
                            lock : time,
                            reciever,
                            sender : self.sdk.address.pnetsimple(keyPair.publicKey).address
                        })
                        

                        var txb = self.sdk.node.transactions.create.wallet(inputs, outputs, null, true)

                        return {txb, payment, secret}
                    },

                    withdrawal : function(prevoutputs, destination, fees, htlc){
                        if(!htlc) htlc = {}

                        var total = 0

                        if(!fees) fees = 0

                        var inputs = _.map(prevoutputs, function(output){

                            total += output.value

                            return {
                                vout : output.n,
                                scriptPubKey : output.scriptPubKey.hex,
                                amount : output.value,
                                type : output.scriptPubKey.type,
                                txid : output.txid
                            }
                        })

                        var outputs = [{
                            address : destination,
                            amount : total - fees
                        }]

                        var tx = self.sdk.node.transactions.create.wallet(inputs, outputs, null, false, htlc)


                        self.sdk.node.transactions.send(tx, function(d, err){


                            if(err){
                                sitemessage(err)
                            }

                        })


                    }
                },

                create: {

                    commonFromUnspent: function (obj, clbk, p, telegram) {

                        if (!p) p = {};

                        if (self.sdk.address.pnet() && !obj.fromrelay) {

                            var addr = self.sdk.address.pnet().address

                            var regs = app.platform.sdk.registrations.storage[addr];

                            if (regs && (regs == 3 || regs == 4)) {

                                p.relay = addr;

                            }

                        }



                        self.sdk.node.transactions.get.unspent(function (unspent) {

                            unspent = _.filter(unspent, self.sdk.node.transactions.canSpend)

                            if (!unspent.length && !p.relay) {

                                if (!p.update) {
                                    p.update = true;

                                    self.sdk.node.transactions.create.commonFromUnspent(obj, clbk, p, telegram)

                                    return
                                }

                                if (clbk) {
                                    clbk(null, 'money')
                                }

                                return;
                            }

                            var inputs = [];

                            if (unspent.length) {
                                inputs = [{

                                    txId: unspent[unspent.length - 1].txid,
                                    vout: unspent[unspent.length - 1].vout,
                                    amount: unspent[unspent.length - 1].amount,
                                    scriptPubKey: unspent[unspent.length - 1].scriptPubKey,

                                }]
                            }

                            if (unspent.length > 60) {
                                inputs.push({
                                    txId: unspent[unspent.length - 2].txid,
                                    vout: unspent[unspent.length - 2].vout,
                                    amount: unspent[unspent.length - 2].amount,
                                    scriptPubKey: unspent[unspent.length - 2].scriptPubKey,
                                })

                            }


                            self.sdk.node.transactions.create[obj.type](inputs, obj, function (a, er, data) {

                                if (!a) {
                                    if ((er == -26 || er == -25 || er == 16) && !p.update) {

                                        p.update = true;

                                        self.sdk.node.transactions.create.commonFromUnspent(obj, clbk, p, telegram)

                                        return
                                    }
                                }


                                var regs = app.platform.sdk.registrations.storage[addr];

                                if (regs && (regs == 4)) {
                                    self.sdk.registrations.add(addr, 5)
                                }

                                if (clbk) {
                                    clbk(a, er, data)
                                }


                            }, p, telegram)

                        }, deep(p, 'address.address'), p.update, telegram)
                    },

                    wallet: function (inputs, outputs, _kp, unfinalize, htlc) {

                        if(!htlc) htlc = {}

                        var keyPair = _kp || self.app.user.keys()
                        var txb = new bitcoin.TransactionBuilder();
                            txb.addNTime(self.timeDifference || 0)
                        var k = smulti;


                        _.each(inputs, function (i) {

                            if (i.type == 'htlc'){
                                txb.addInput(i.txid, i.vout, null, Buffer.from(i.scriptPubKey, 'hex'), htlc)
                            }
                            else{
                                txb.addInput(i.txid, i.vout, null, Buffer.from(i.scriptPubKey, 'hex'))
                            }

                            
                        })

                        _.each(outputs, function (o) {
                            txb.addOutput(o.scriptPubKey || o.address, Number((k * o.amount).toFixed(0)));
                        })

                        _.each(inputs, function (i, inputindex) {

                            if (i.type == 'htlc'){


                                txb.sign({
                                    prevOutScript: Buffer.from(i.scriptPubKey, 'hex'),
                                    prevOutScriptType: 'htlc',
                                    vin: inputindex,
                                    keyPair
                                });


                                return
                            }

                            if (i.address.indexOf("P") == 0) {
                                txb.sign(inputindex, keyPair);
                                return
                            }

                            if (i.address.indexOf("Z") == 0) {
                                
                                var index = _.indexOf(self.sdk.addresses.storage.addresses, i.address);

                                if (index > -1) {
                                    var p2sh = self.sdk.addresses.storage.addressesobj[index];
                                    var dumped = self.sdk.address.dumpKeys(index)
                                    txb.sign({
                                        prevOutScriptType: 'p2sh-p2wpkh',
                                        redeemScript : p2sh.redeem.output,
                                        vin: inputindex,
                                        keyPair : dumped,
                                        witnessValue : Number((k * i.amount).toFixed(0))
                                    });
                                }
                                return
                            }

                                

                        })


                        if(unfinalize) return txb

                        var tx = txb.build()

                        return tx;

                    },

                    common: function (inputs, obj, fees, clbk, p, fromTG) {

                        const savedObj = JSON.parse(JSON.stringify(obj));

                        if (!fromTG && self.app.user.features.telegram) {

                            const {
                                meta
                            } = self.sdk.usersettings;

                            if (obj.caption){

                                if (!meta.tgtoask.value) {

                                    this.telegramSend(obj, meta)
    
                                } else {
    
                                    // this.telegramSend = this.telegramSend.bind(this)
    
                                    dialog({
                                        html: self.app.localization.e('e13291'),
                                        btn1text: self.app.localization.e('send'),
                                        btn2text:self.app.localization.e('ucancel'),
    
                                        class: 'zindex',
    
                                        success: () => {
    
                                            this.telegramSend(savedObj, meta)
    
                                        }
                                    })
    
                                }
                            }


                        }


                        if (!p) p = {};

                        var temp = self.sdk.node.transactions.temp;
                        var tempOptions = self.sdk.node.transactions.tempOptions;

                        var error = obj.validation();


                        if (error) {

                            if (clbk)
                                clbk(null, error);

                        }

                        else {
                            var keyPair = p.keys || self.app.user.keys()

                            //var p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey});


                            var address = p.address || self.sdk.address.pnet()

                            var txb = new bitcoin.TransactionBuilder();

                            txb.addNTime(self.timeDifference || 0)

                            var amount = 0;

                            _.each(inputs, function (i, index) {

                                txb.addInput(i.txId, i.vout, null, Buffer.from(i.scriptPubKey, 'hex'))

                                amount = amount + Number(i.amount);
                            })

                            amount = amount * smulti;

                            var data = Buffer.from(bitcoin.crypto.hash256(obj.serialize()), 'utf8');
                            var optype = obj.typeop ? obj.typeop(self) : obj.type
                            var optstype = optype

                            if (obj.optstype && obj.optstype(self)) optstype = obj.optstype(self)

                            var opreturnData = [Buffer.from(optype, 'utf8'), data];

                            var outputs = [];

                            if (obj.opreturn) {
                                opreturnData.push(Buffer.from(obj.opreturn()))
                            }

                            var embed = bitcoin.payments.embed({ data: opreturnData });
                            var i = 0;

                            txb.addOutput(embed.output, 0);

                            outputs.push({
                                amount : 0,
                                deleted : true,
                                address : address.address
                            })

                            self.sdk.node.transactions.get.unspent(function (unspents) {



                                if (p.relay) {

                                    var alias = obj.export(true);
                                    alias.txid = makeid();
                                    alias.address = p.relay;
                                    alias.type = obj.type
                                    alias.time = self.currentTime()
                                    alias.timeUpd = alias.time
                                    alias.optype = optype

                                    alias.relay = true;

                                    self.sdk.relayTransactions.add(p.relay, alias)

                                    if (clbk)
                                        clbk(alias)

                                    return
                                }


                                if (unspents.length < 50 && amount > 2 * 10000000) {

                                    var ds = Number((amount / 2).toFixed(0))

                                    amount = amount - ds


                                    txb.addOutput(address.address, ds);

                                    outputs.push({
                                        address: address.address,
                                        amount: ds
                                    })

                                }


                                txb.addOutput(address.address, Number((amount - (fees || 0)).toFixed(0)));

                                outputs.push({
                                    address: address.address,
                                    amount: Number((amount - (fees || 0)).toFixed(0))
                                })

                                _.each(inputs, function (input, index) {
                                    txb.sign(index, keyPair);
                                })

                                var tx = txb.build()

                                var hex = tx.toHex();



                                if (p.pseudo) {
                                    var alias = obj.export(true);
                                    alias.txid = makeid();

                                    if (clbk)
                                        clbk(alias, null)
                                }
                                else {

                                    var bids = _.map(inputs, function (i) {
                                        return {
                                            txid : i.txId,
                                            vout : i.vout
                                        }
                                    })

                                    self.app.platform.sdk.node.transactions.blockUnspents(bids)

                                    self.app.api.rpc('sendrawtransactionwithmessage', [hex, obj.export(), optstype]).then(d => {

                                        var alias = obj.export(true);
                                            alias.txid = d;
                                            alias.address = address.address;
                                            alias.type = obj.type
                                            alias.time = self.currentTime()
                                            alias.timeUpd = alias.time
                                            alias.optype = optype

                                            var count = deep(tempOptions, obj.type + ".count") || 'many'


                                            if (!temp[obj.type] || count == 'one') {
                                                temp[obj.type] = {};
                                            }

                                            temp[obj.type][d] = alias;

                                            alias.inputs = inputs
                                            alias.outputs = _.map(outputs, function(output){
                                                return {
                                                    address : output.address,
                                                    amount : output.amount / smulti,
                                                    deleted : output.deleted
                                                }
                                            })

                                            self.sdk.node.transactions.saveTemp()

                                            var ids = _.map(inputs, function (i) {

                                                return {
                                                    txid: i.txId,
                                                    vout: i.vout
                                                }

                                            })

                                            self.app.platform.sdk.node.transactions.clearUnspents(ids)

                                            if (obj.ustate) {

                                                var ustate = obj.ustate;

                                                if (typeof obj.ustate == 'function') ustate = obj.ustate();

                                                if (ustate) {
                                                    var us = self.sdk.ustate.storage;

                                                    if (us[address.address]) {
                                                        us[address.address][obj.ustate + "_spent"]++
                                                        us[address.address][obj.ustate + "_unspent"]--
                                                    }

                                                    _.each(self.sdk.ustate.clbks, function (c) {
                                                        c()
                                                    })
                                                }




                                            }


                                            if (clbk)
                                                clbk(alias)
        
                                    }).catch(e => {
                                        self.app.platform.sdk.node.transactions.unblockUnspents(bids)


                                        if (clbk) {
                                            clbk(null, e.code, data)
                                        }
                                    })

                                    
                                }

                            }, address.address)


                        }

                    },

                    telegramSend: function (message, meta) {

                        const filterHtml = (input) => {

                            const removeEmptyHref = (html) => {

                                const newHtml = html.replace(/<a href>(.*)<\/a>/g, '$1').replace(/<a>(.*)<\/a>/g, '$1');

                                return newHtml;
                            }

                            const allowedTags = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'strike', 'del', 'a', 'code', 'pre'];


                            const options = {
                                stripIgnoreTag : true,
                                whiteList: {
                                    a: ["href"]
                                }
                            }

                            allowedTags.forEach(tag => {

                                options.whiteList[tag] = [];

                            })

                            const sanitizedHtml = filterXSS(input, options);


                            return removeEmptyHref(sanitizedHtml);
                        }

                        const token = meta.telegram.value;

                        const channelIdx = meta.tgto.possibleValuesLabels.indexOf(meta.tgto.value);
                        const channel = Number(meta.tgto.possibleValues[channelIdx]);

                        const parameters = {
                            method: 'POST',
                            chat_id: channel,
                            parse_mode: 'HTML'
                        }

                        const title = message.caption.v ? '<b>' + message.caption.v + '</b>' : '';

                        let caption = title + '\n ' + message.message.v + '\n ';

                        const images = message.images.v;

                        caption = caption.replace(/<br>|<br\/>/g, '\n');
                        caption = caption.replace(/<\/p>/g, "</p>\n");
                        caption = filterHtml(caption);

                        let action = 'sendMessage';
                        let captionName = 'text';

                        if (images.length === 1) {

                            action = 'sendPhoto';
                            captionName = 'caption';
                            parameters.photo = images[0];

                        } else if (images.length > 1) {

                            action = 'sendMediaGroup';
                            captionName = 'caption';
                            const imagesGroup = images.map((file, idx) => {

                                const newFile = {
                                    type: 'photo',
                                    media: file
                                };

                                if (idx === 1) {

                                    newFile.parse_mode = "HTML";
                                    newFile.caption = caption;

                                }

                                return newFile;

                            })

                            parameters.media = JSON.stringify(imagesGroup);
                        }

                        parameters[captionName] = caption;

                        // const parameters = `?chat_id=${channel}${media}&${captionName}=${caption}&parse_mode=HTML`

                        let query = `https://api.telegram.org/bot${token}/${action}`;
                        const paramStr = $.param(parameters);


                        fetch(query + '?' + paramStr)
                            .then(data => data.json())
                            .then(result => {
                            })

                    },

                    share: function (inputs, share, clbk, p, fromTG) {

                        this.common(inputs, share, TXFEE, clbk, p, fromTG)
                    },

                    userInfo: function (inputs, userInfo, clbk, p) {
                        this.common(inputs, userInfo, TXFEE, clbk, p)
                    },

                    upvoteShare: function (inputs, upvoteShare, clbk, p) {
                        this.common(inputs, upvoteShare, TXFEE, clbk, p)

                        self.sdk.activity.adduser('like', upvoteShare.address.v)
                    },

                    complainShare: function (inputs, complainShare, clbk, p) {
                        this.common(inputs, complainShare, TXFEE, clbk, p)
                    },

                    comment: function (inputs, comment, clbk, p) {
                        this.common(inputs, comment, TXFEE, clbk, p)
                    },

                    commentShare: function (inputs, commentShare, clbk, p) {
                        this.common(inputs, commentShare, TXFEE, clbk, p)
                    },

                    cScore: function (inputs, cScore, clbk, p) {
                        this.common(inputs, cScore, TXFEE, clbk, p)
                        
                        self.sdk.activity.adduser('like', cScore.address.v)
                    },

                    unsubscribe: function (inputs, unsubscribe, clbk, p) {
                        this.common(inputs, unsubscribe, TXFEE, clbk, p)
                    },

                    subscribe: function (inputs, subscribe, clbk, p) {
                        this.common(inputs, subscribe, TXFEE, clbk, p)
                    },

                    blocking: function (inputs, blocking, clbk, p) {
                        this.common(inputs, blocking, TXFEE, clbk, p)
                    },
                    unblocking: function (inputs, unblocking, clbk, p) {
                        this.common(inputs, unblocking, TXFEE, clbk, p)
                    },

                    subscribePrivate: function (inputs, subscribe, clbk, p) {

                        this.common(inputs, subscribe, TXFEE, clbk, p)

                    }
                }

            },

            fee: {
                estimate: function (clbk) {

                    self.app.api.rpc('estimateSmartFee', [1]).then(d => {

                        d.feerate = 0.00001

                        if (clbk)
                            clbk(d)
        
                    }).catch(e => {
                        var d = {}
                        d.feerate = 0.00001

                        if (clbk) {
                            clbk(d)
                        }
                    })

                    

                }
            },

            sys: {

                revokeproxy: function (node, clbk) {

                    self.app.ajax.api({
                        action: 'nodes.revoke',

                        data: node,
                        signature: true,

                        success: function (d) {

                            removeEqual(self.app.platform.nodes, {
                                host: node.host
                            })

                            if (clbk)
                                clbk(false, d.data)
                        },
                        fail: function (d) {

                            if (clbk)
                                clbk(deep(d, 'error') || deep(d, 'data') || 'Undefined Error')
                        }
                    })

                },

                createproxy: function (node, clbk) {

                    self.app.ajax.api({
                        action: 'nodes.create',

                        data: node,
                        signature: true,

                        success: function (d) {

                            if (clbk)
                                clbk(false, d.data)
                        },
                        fail: function (d) {

                            if (clbk)
                                clbk(deep(d, 'data') || deep(d, 'error') || 'Undefined Error')
                        }
                    })

                },

                updateproxy: function (node, clbk) {

                    var udata = _.clone(node)

                    delete udata.stable;
                    delete udata.statistic

                    self.app.ajax.api({
                        action: 'nodes.update',
                        data: udata,
                        signature: true,

                        success: function (d) {

                            if (clbk)
                                clbk(false, d.data)
                        },
                        fail: function (d) {

                            if (clbk)
                                clbk(deep(d, 'data') || deep(d, 'error') || 'Undefined Error')
                        }
                    })

                },

                createlocally: function (node, clbk) {
                    var f = _.find(this.userlist, function (n) {

                        if (n.host == node.host) {
                            return true;
                        }


                    })

                    if (f) {
                        if (clbk)
                            clbk(self.app.localization.e('e13292'))

                        return
                    }

                    node.addedby = self.sdk.address.pnet().address
                    node.date = new Date()

                    this.userlist.unshift(node)

                    this.save()

                    if (clbk)
                        clbk(null, node)


                },
                updatelocally: function (node, clbk) {

                    var f = _.find(this.userlist, function (n) {

                        if (n.host == node.host) {
                            return true;
                        }

                    })

                    if (!f) {
                        if (clbk)
                            clbk(self.app.localization.e('e13293'))

                        return
                    }
                    else {
                        f.ws = node.ws,
                            f.port = node.port,
                            f.name = node.name;

                        this.save()


                        if (clbk)
                            clbk(null, f)
                    }

                },

                revokelocally: function (node, clbk) {

                    removeEqual(this.userlist, {
                        host: node.host
                    })

                    this.save()

                    if (clbk)
                        clbk(null)
                },

                userlist: [],

                save: function () {
                    localStorage['usernodes'] = JSON.stringify({
                        list: this.userlist
                    })
                },

                load: function () {
                    var p = {};

                    try {
                        p = JSON.parse(localStorage['usernodes'] || '{}');
                    }
                    catch (e) {

                    }


                    this.userlist = p.list || []
                }
            }



        },

        pool: {
            current: null,

            info: function (pack, clbk) {
                self.sdk.users.get(pack.addresses, clbk)
            },

            dumpKey: function (pack, address, clbk) {
                this.expand(pack, function (pa) {

                    var i = _.indexOf(pa.addresses, address)

                    if (i == -1) {
                        if (clbk)
                            clbk(null)
                    }
                    else

                        if (clbk)
                            clbk(pa.private[i])



                })
            },

            expand: function (exportedPack, clbk) {

                self.app.user.isState(function (state) {

                    if (!state) {
                        if (clbk)
                            clbk(null, 'state')
                    }
                    else {
                        var address = self.sdk.address.pnet().address;

                        var i = _.indexOf(exportedPack.addresses, address);

                        if (i > -1) {
                            var _key = null;
                            var aeskey = exportedPack.aes[i];

                            var mk = self.app.user.private.value.toString('hex');

                            if(self.cryptography.disabled){
                                if (clbk)
                                    clbk(null, 'disabledcryptography')
                            }

                            self.cryptography.api.aeswc.decryption(aeskey, mk, {}, function (decrypted) {


                                _key = decrypted;

                                var pack = {
                                    addresses: exportedPack.addresses,

                                    private: [],

                                    aes: exportedPack.aes,

                                    _key: _key
                                }


                                lazyEach({
                                    array: exportedPack.keys,
                                    action: function (p, index) {
                                        var privatemk = p.item;


                                        self.cryptography.api.aeswc.decryption(privatemk, _key, {}, function (mk) {

                                            if (mk) {
                                                pack.private[index] = mk;

                                                p.success()
                                            }

                                        })
                                    },

                                    sync: true,

                                    all: {
                                        success: function () {


                                            if (clbk)
                                                clbk(pack)

                                        }
                                    }
                                })
                            })
                        }
                        else {
                            if (clbk)
                                clbk(null, 'address')
                        }
                    }



                })
            },

            export: function (pack, clbk) {

                var exported = {
                    addresses: pack.addresses,
                    keys: [],
                    aes: pack.aes
                }


                lazyEach({
                    array: pack.private,
                    action: function (p, index) {
                        var private = p.item;

                        self.cryptography.api.aeswc.encryption(private, pack._key, {}, function (encrypted) {
                            exported.keys[index] = encrypted;

                            p.success()
                        })
                    },

                    sync: true,

                    all: {
                        success: function () {

                            if (clbk)
                                clbk(exported)

                        }
                    }
                })
            },

            push: function (pack, address, mk, _key, clbk) {

                pack.addresses.push(address)
                pack.private.push(mk)



                self.cryptography.api.aeswc.encryption(_key, mk, {}, function (encrypted) {

                    pack.aes.push(encrypted)

                    if (clbk)
                        clbk(pack)

                })
            },

            remove: function (pack, address) {
                var s = self.sdk.pool;
                var pool = s.get();

                var i = _.indexOf(pack.addresses, address);

                if (i > -1) {

                    pack.addresses.splice(i, 1)

                    if (pack.private) {
                        pack.private.splice(i, 1)
                    }

                    if (pack.keys) {
                        pack.keys.splice(i, 1)
                    }

                    if (pack.aes) {
                        pack.aes.splice(i, 1)
                    }

                    delete pool.map[address]

                    return true
                }

                return false
            },

            add: function (pack, mnemonic, clbk) {
                var s = self.sdk.pool;
                var pool = s.get();


                var keyPair = self.app.user.keysPairFromPrivate(mnemonic)


                if(!keyPair){

                    if (clbk)
                        clbk(null, 'failedkeypair')

                    return
                }

                var address = self.sdk.address.pnetsimple(keyPair.publicKey).address;

                var mk = keyPair.privateKey.toString('hex');

                if (pool.map[address]) {

                    var id = pool.map[address];
                    var _pack = pool.packs[id];

                    if (_pack.addresses.length > 1) {
                        if (clbk)
                            clbk(null, 'hasinanotherpack')

                        return;
                    }
                    else {
                        delete pool.map[address]
                        delete pool.packs[id]
                    }

                }

                this.push(pack, address, mk, pack._key, function () {

                    s.currentMap();

                    if (clbk)
                        clbk(pack)

                })

            },

            new: function (clbk) {

                var s = self.sdk.pool

                var pack = {
                    addresses: [],

                    private: [],

                    aes: [],

                    _key: null
                }

                var ps = [null, null]

                self.app.user.isState(function (state) {

                    if (!state) {

                        ps[1] = 'state'

                    }

                    else {
                        var key = app.user.private.value;

                        if (key) {

                            var mk = key.toString('hex');

                            var address = self.sdk.address.pnet().address;

                            pack._key = self.cryptography.api.random.crypto();

                            s.push(pack, address, mk, pack._key, function (pack) {

                                s.export(pack, function (exported) {

                                    ps[0] = exported

                                    if (clbk)
                                        clbk(ps[0], ps[1])
                                })


                            })



                            return

                        }

                        else {

                            ps[1] = 'key'
                        }
                    }

                    if (clbk)
                        clbk(ps[0], ps[1])

                })
            },

            init: function (clbk) {

                var s = self.sdk.pool

                self.app.user.isState(function (state) {

                    if (state && !_Node) {
                        var pool = s.get();

                        var address = self.sdk.address.pnet().address;

                        var packid = pool.map[address];

                        s.current = pool;

                        if (!packid) {
                            s.new(function (exportedpack, error) {
                                if (!exportedpack) {
                                    sitemessage(error);
                                }
                                else {
                                    var id = makeid();

                                    pool.map[address] = id;
                                    pool.packs[id] = exportedpack;

                                    s.save();
                                }

                                if (clbk)
                                    clbk(exportedpack, id)
                            })
                        }
                        else {
                            if (clbk)
                                clbk(pool.packs[packid], packid)

                        }
                    }

                    else {
                        if (clbk)
                            clbk()
                    }

                })
            },

            get: function () {

                var s = self.sdk.pool

                var pool = s.current;

                if (!pool) {
                    pool = localStorage['pool'];

                    if (pool) pool = JSON.parse(pool)
                }

                if (!pool) {
                    pool = {
                        map: {},
                        packs: {}
                    };
                }

                return pool;
            },

            getPack: function (address) {
                var s = self.sdk.pool;

                var pool = s.get();

                var id = pool.map[address]

                if (id) {
                    return [pool.packs[id], id]
                }
            },

            currentMap: function () {

                var c = self.sdk.pool.current;

                c.map = {};

                _.each(c.packs, function (pack, packid) {
                    _.each(pack.addresses, function (address) {
                        c.map[address] = packid
                    })
                })

            },

            save: function (pool) {

                var s = self.sdk.pool;

                self.app.user.isState(function (state) {

                    if (state && s.current) {

                        s.currentMap();

                        localStorage['pool'] = JSON.stringify(s.current)

                    }

                })

            }
        },

        discussions: {
            fromChatId: function (id) {
                var chat = self.sdk.chats.storage[id]

                if (chat) {
                    var discussion = self.sdk.discussions.fromChats([chat])[id];


                    return discussion
                }
                else {
                    return null;
                }
            },
            fromChats: function (chats, author) {
                var d = {};

                _.each(chats || self.sdk.chats.storage, function (chat) {

                    var id = chat.id;

                    var _d = {
                        chat: chat
                    }

                    if (chat.type == 'share') {

                        var chatAuthor = id.split("_")[1];
                        var shareId = id.split("_")[0];

                        _d.author = chatAuthor

                        if (self.sdk.node.shares.storage.trx) {
                            _d.share = self.sdk.node.shares.storage.trx[shareId]
                        }

                        if (author) {

                            if (chatAuthor != author) return;

                        }

                    }

                    d[id] = _d
                })

                return d
            },

            info: function (discussions, clbk) {
                var chats = _.map(discussions, function (d) {
                    return d.chat
                })

                self.sdk.chats.info(chats, function () {

                    var dss = self.sdk.discussions.fromChats(chats);

                    if (clbk)
                        clbk(dss)

                })
            }
        },

        tempmessenger: {
            clbks: {},
            init: function (clbk) {
                var address = self.sdk.address.pnet().address
                var id = bitcoin.crypto.hash256(address + self.app.options.fingerPrint).toString('hex')

                var keyPair = self.app.user.keys();

                var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(id), 'utf8'));

                var user = {
                    device: id,
                    address: address,
                    signature: signature.toString('hex'),
                    publicKey: keyPair.publicKey.toString('hex'),
                }

                self.clientrtctemp = new platformRTC({
                    user: user,
                    platform: self
                })

                self.clientrtctemp.init(function () {


                    /*self.clientrtctemp.clbks.message.messenger = function(p, rtc){

                        _.each(self.sdk.tempmessenger.clbks || {}, function(c){
                            c('message', rtc)
                        })
                        
                    }*/


                })

                if (clbk)
                    clbk()
            },

            getChat: function (chat) {

                chat.rtc = self.clientrtctemp.api.getChat(chat.id, chat.users);
            },

            getChats: function (clbk) {
                if (self.clientrtctemp)
                    self.clientrtctemp.getchats(clbk)
            }
        },


        messenger: {
            clbks: {},
            load: {
                messages: function (messages, clbk) {

                    if (!_.isArray(messages)) messages = [messages]

                    var users = _.map(messages, function (m) {
                        return m.f
                    })

                    self.sdk.users.get(users, clbk, true)


                },
            },

            getChat: function (chat) {
                chat.rtc = self.clientrtc.api.getChat(chat.id, chat.users);
            },

            connectToChat: function (chat, clbk) {
                self.clientrtc.api.connectToChat({

                    id: chat.id,
                    addresses: chat.addresses

                }, function (id, chat) {

                    if (clbk)
                        clbk(id, chat)

                })
            },
            init: function (clbk) {

                var address = self.sdk.address.pnet().address
                var id = bitcoin.crypto.hash256(address + self.app.options.fingerPrint).toString('hex')

                var keyPair = self.app.user.keys();

                var signature = keyPair.sign(Buffer.from(bitcoin.crypto.hash256(id), 'utf8'));

                var user = {
                    device: id,
                    address: address,
                    signature: signature.toString('hex'),
                    publicKey: keyPair.publicKey.toString('hex'),
                }

                self.clientrtc = new platformRTC({
                    user: user,
                    platform: self
                })

                var chats = self.app.platform.sdk.chats.get('messenger');

                self.clientrtc.initChats(chats)
                self.clientrtc.init(function () {
                    self.clientrtc.api.login(function () {


                        self.clientrtc.clbks.chat.messenger = function (p, rtc) {


                            if (self.sdk.chats.storage[rtc.id]) return

                            p || (p = {})

                            var chat = self.sdk.chats.empty(rtc.id, 'messenger');
                            chat.rtc = rtc;


                            if (p.addresses) chat.users = p.addresses

                            self.sdk.chats.storage[rtc.id] = chat
                            self.sdk.chats.info([chat], function () {

                                _.each(self.sdk.messenger.clbks || {}, function (c) {
                                    c('chat', chat)
                                })

                            })

                            self.sdk.chats.save()


                        }

                        self.clientrtc.clbks.message.messenger = function (p, rtc) {

                            _.each(self.sdk.messenger.clbks || {}, function (c) {
                                c('message', rtc)
                            })

                        }

                        self.clientrtc.api.getRelayed()

                    })
                })

                if (clbk)
                    clbk()
            }
        },

        chats: {
            clbks: {

            },
            storage: {

            },

            _info: {
                shares: function (chats, clbk) {
                    var shares = _.filter(chats, function (c) {
                        if (c.type == 'share') return true;
                    })

                    var sharesIds = _.map(shares, function (c) {
                        return c.id.split("_")[0]
                    })

                    self.sdk.node.shares.getbyid(sharesIds, function () {

                        var shares = _.map(sharesIds, function (id) {
                            return self.sdk.node.shares.storage.trx[id] || null;
                        })

                        shares = _.filter(shares, function (s) {
                            return s
                        })

                        self.app.platform.sdk.node.shares.users(shares, function () {
                            if (clbk)
                                clbk()
                        })

                    })
                },

                messenger: function (chats, clbk) {
                    var users = [];


                    _.each(chats, function (c) {

                        _.each(c.users, function (u) {
                            users.push(u)
                        })

                        self.app.platform.sdk.users.get(users, function () {
                            if (clbk)
                                clbk()
                        })

                    })
                }
            },

            info: function (chats, clbk) {

                var s = this;

                s._info.shares(chats, function () {
                    s._info.messenger(chats, function () {

                        if (clbk)
                            clbk()

                    })
                })

            },

            empty: function (id, type) {

                var ec = {
                    id: id || makeid(),
                    type: type || 'sys',

                    time: self.currentTime()
                }

                if (type == 'messenger') {
                    ec.users = []
                }

                return ec
            },

            remove: function (id) {

                _.each(self.sdk.chats.clbks, function (c) {

                    c(self.sdk.chats.storage[id], 'remove')

                })

                delete self.sdk.chats.storage[id]

                self.sdk.chats.save()
            },

            removeTemp: function () {
                _.each(self.sdk.chats.clbks, function (c) {

                    c(null, 'removeTemp')

                })
            },

            addTemp: function (id, type, count) {

                var e = self.sdk.chats.empty(id, type)

                _.each(self.sdk.chats.clbks, function (c) {

                    c(e, 'addTemp', count)

                })

            },
            add: function (id, type) {

                if (self.sdk.chats.storage[id]) {

                    self.sdk.chats.storage[id].time = self.currentTime()

                    self.sdk.chats.save()

                    _.each(self.sdk.chats.clbks, function (c) {

                        c(self.sdk.chats.storage[id], 'addtwice')

                    })

                    return self.sdk.chats.storage[id]

                }
                else {
                    var e = self.sdk.chats.empty(id, type)

                    self.sdk.chats.storage[e.id] = e;

                    _.each(self.sdk.chats.clbks, function (c) {

                        c(e, 'add')

                    })

                    self.sdk.chats.save()

                    return e
                }



            },

            light: function () {
                var s = {};

                _.each(self.sdk.chats.storage, function (chat, id) {
                    s[id] = {
                        id: chat.id,
                        type: chat.type,
                        time: chat.time,
                        users: chat.users
                    }
                })

                return s
            },


            save: function () {

                var address = self.sdk.address.pnet().address;

                localStorage[address + 'chats_4'] = JSON.stringify(self.sdk.chats.light());

            },

            load: function (clbk) {

                var chats = {};

                var address = self.sdk.address.pnet().address;

                var local = localStorage[address + 'chats_4'] || "{}";

                if (local) {
                    try {
                        chats = JSON.parse(local)
                    }
                    catch (e) {
                        console.log("ERR", e)
                    }
                }

                self.sdk.chats.storage = chats;

                if (clbk)
                    clbk()
            },

            get: function (type) {
                return _.filter(self.sdk.chats.storage, function (c) {

                    if (type == 'share') {
                        if (c.id == '6768de97ad495c0110a9e09d43825ef24f1055449a5d368225ac102804397dc1_PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd') return true

                        //if(c.id == '9560e4555f644956ed40a420f0a327e9b18fb450508108a5a806e74ebe9b011c_PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM') return true

                        return
                    }

                    return c.type == type
                })
            }
        },

        esystem: {
            requestes: {},

            clbks: {
                tick: {

                }
            },

            tickstate: {},
            tickstatehash: [],
            inited: false,

            proxy: {
                settings: {
                    meta: {

                        dbEnable: {
                            name: self.app.localization.e('e13294'),
                            id: 'dbEnable',
                            type: "BOOLEAN",
                            value: false,

                            dbId: 'dbEnable'
                        },

                        dbHost: {
                            name: self.app.localization.e('e13295'),
                            id: 'dbHost',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'db.host'
                        },

                        dbPort: {
                            name: self.app.localization.e('e13296'),
                            id: 'dbPort',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'db.port'
                        },

                        dbMax: {
                            name: self.app.localization.e('e13297'),
                            id: 'dbMax',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'db.max'
                        },

                        dbIdleTimeoutMillis: {
                            name: self.app.localization.e('e13298'),
                            id: 'dbIdleTimeoutMillis',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'db.idleTimeoutMillis'
                        },

                        dbName: {
                            name: self.app.localization.e('e13299'),
                            id: 'dbName',
                            type: "STRING",
                            value: '',

                            dbId: 'db.name'
                        },

                        dbUser: {
                            name: self.app.localization.e('e13300'),
                            id: 'dbUser',
                            type: "STRING",
                            value: '',

                            dbId: 'db.user'
                        },

                        dbPassword: {
                            name: self.app.localization.e('e13301'),
                            id: 'dbPassword',
                            type: "password",
                            value: '',

                            dbId: 'db.password'
                        },


                        server: {
                            name: self.app.localization.e('e13302'),
                            id: 'server',
                            type: "BOOLEAN",
                            value: false,

                            dbId: 'server'
                        },

                        serverPortHttps: {
                            name: self.app.localization.e('e13303'),
                            id: 'serverPortHttps',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'ports.https'
                        },

                        serverPortWss: {
                            name: self.app.localization.e('e13304'),
                            id: 'serverPortWss',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'ports.wss'
                        },

                        serverSslKeyUpload: {
                            name: self.app.localization.e('e13305'),
                            id: 'serverSslKeyUpload',
                            type: "file",
                            value: '',

                            upload: {

                            },

                            dbId: 'ssl.key'
                        },

                        serverSslCertUpload: {
                            name: self.app.localization.e('e13306'),
                            id: 'serverSslCertUpload',
                            type: "file",
                            value: '',
                            upload: {

                            },
                            dbId: 'ssl.cert'
                        },

                        serverSslPassphrase: {
                            name: self.app.localization.e('e13307'),
                            id: 'serverSslPassphrase',
                            type: "password",
                            value: '',

                            dbId: 'ssl.passphrase'
                        },

                        serverFirebaseAdminSDK: {
                            name: self.app.localization.e('e13308'),
                            id: 'serverFirebaseAdminSDK',
                            type: "file",
                            value: '',
                            upload: {

                            },
                            dbId: 'fbk'
                        },

                        pocketNetAuthTransactionCrane: {
                            name: self.app.localization.e('e13309'),
                            id: 'pocketNetAuthTransactionCrane',
                            type: "STRING",
                            value: '',

                            dbId: 'refkey'
                        },

                        captchaEnable: {
                            name: self.app.localization.e('e13310'),
                            id: 'captchaEnable',
                            type: "BOOLEAN",
                            value: true,

                            dbId: 'captcha'
                        },

                        iplimiterEnable: {
                            name: self.app.localization.e('e13311'),
                            id: 'iplimiterEnable',
                            type: "BOOLEAN",
                            value: true,

                            dbId: 'iplimiter'
                        }
                    },

                    create: function (id) {

                        var t = self.sdk.esystem.proxy.settings

                        var m = t.meta;

                        var p = new Parameter(m[id])

                        return p;
                    },

                    createall: function () {
                        var t = self.sdk.esystem.proxy.settings

                        var create = t.create
                        var m = t.meta;

                        var options = {};

                        _.each(m, function (p, id) {
                            options[id] = create(id)
                        })

                        return options
                    },

                    compose: function (values) {

                        if (!values) values = {}

                        var s = self.sdk.esystem.proxy.settings;

                        var options = s.createall()

                        var m = s.meta;

                        var c = {


                            server: {
                                name: self.app.localization.e('e13312'),
                                options: {

                                    server: options.server,
                                    serverPortHttps: options.serverPortHttps,
                                    serverPortWss: options.serverPortWss,
                                    serverSslKeyUpload: options.serverSslKeyUpload,
                                    serverSslCertUpload: options.serverSslCertUpload,
                                    serverSslPassphrase: options.serverSslPassphrase

                                }
                            },



                            db: {
                                name: self.app.localization.e('e13313'),
                                options: {
                                    dbEnable: options.dbEnable,
                                    dbHost: options.dbHost,
                                    dbMax: options.dbMax,
                                    dbIdleTimeoutMillis: options.dbIdleTimeoutMillis,
                                    dbName: options.dbName,
                                    dbUser: options.dbUser,
                                    dbPassword: options.dbPassword


                                }
                            },

                            firebase: {
                                name: self.app.localization.e('e13314'),
                                options: {

                                    serverFirebaseAdminSDK: options.serverFirebaseAdminSDK

                                }
                            },

                            other: {
                                name: self.app.localization.e('e13315'),
                                options: {

                                    pocketNetAuthTransactionCrane: options.pocketNetAuthTransactionCrane,
                                    captchaEnable: options.captchaEnable,
                                    iplimiterEnable: options.iplimiterEnable

                                }
                            },


                        }

                        _.each(options, function (o) {
                            if (deep(values, o.dbId)) o.value = deep(values, o.dbId)
                        })

                        return {
                            c: c,
                            o: options
                        }

                    },
                }
            },

            // node control settings
            node: {
                settings: {
                    meta: {

                        Enable: {
                            name: self.app.localization.e('e13316'),
                            id: 'Enable',
                            type: "BOOLEAN",
                            value: false,
                            dbId: 'Enable'
                        },
                        BinPath: {
                            name:  self.app.localization.e('e13317'),
                            id: 'binPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'BinPath'
                        },
                        ConfPath: {
                            name: self.app.localization.e('e13318'),
                            id: 'confPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'ConfPath'
                        },
                        DataPath: {
                            name: self.app.localization.e('e13319'),
                            id: 'dataPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'DataPath'
                        },
                        SetPrivateKey: {
                            name: self.app.localization.e('e13320'),
                            id: 'setPrivateKey',
                            type: "BUTTON",
                            value: '#link_to_wallets',
                            text: self.app.localization.e('e13321'),
                            dbId: 'SetPrivateKey'
                        },

                        state: {
                            name: self.app.localization.e('e13322'),
                            id: 'state',
                            type: "LABEL",
                            value: '',
                            dbId: 'control.state'
                        },

                        addresses: {
                            name: self.app.localization.e('e13323'),
                            id: 'addresses',
                            type: "LABEL",
                            value: '',
                            dbId: 'control.addresses'
                        },

                        lastBlock: {
                            name: self.app.localization.e('e13324'),
                            id: 'lastBlock',
                            type: "LABEL",
                            value: '-',
                            dbId: 'control.lastBlock'
                        }
                    },

                    create: function (id) {

                        var t = self.sdk.esystem.node.settings

                        var m = t.meta;

                        var p = new Parameter(m[id])

                        return p;
                    },

                    createall: function () {
                        var t = self.sdk.esystem.node.settings

                        var create = t.create
                        var m = t.meta;

                        var options = {};

                        _.each(m, function (p, id) {
                            options[id] = create(id)
                        })

                        return options
                    },

                    compose: function (values) {

                        if (!values) values = {}

                        var s = self.sdk.esystem.node.settings;

                        var options = s.createall()

                        var m = s.meta;

                        var c = {

                            control: {
                                name: self.app.localization.e('control'),
                                options: {

                                    state: options.state,
                                    lastBlock: options.lastBlock,
                                    addresses: options.addresses,

                                }
                            },

                            setup: {
                                name: self.app.localization.e('setup'),
                                options: {

                                    Enable: options.Enable,
                                    DataPath: options.DataPath,
                                    SetPrivateKey: options.SetPrivateKey,

                                }
                            },

                        }

                        _.each(options, function (o) {
                            if (deep(values, o.dbId)) o.value = deep(values, o.dbId)
                        })

                        return {
                            c: c,
                            o: options
                        }

                    },
                }
            },

            destroy: function () {
                if (electron) {

                    electron.ipcRenderer.off('proxy-message', this.response)

                    this.inited = false

                }
            },

            request: function (action, data, clbk) {

                var rdata = {
                    action: action,
                    id: makeid(),
                    data: data
                }

                self.sdk.esystem.requestes[rdata.id] = {
                    id: rdata.id,
                    clbk: function (error, data) {
                        if (clbk) clbk(error, data)
                    }
                }

                electron.ipcRenderer.send('proxy-message', rdata);

            },

            tick: function (e, message) {

                var t = self.sdk.esystem
                var hash = bitcoin.crypto.hash256(JSON.stringify(message))

                var change = (hash.join('') !== t.tickstatehash.join(''))

                t.tickstatehash = hash
                t.tickstate = message.data || {}

                _.each(t.clbks.tick, function (c) {

                    if (c)
                        c(t.tickstate, change)
                })
            },

            response: function (e, message) {
                var request = self.sdk.esystem.requestes[message.id]

                if (request) {

                    if (request.clbk) request.clbk(message.error, message.data)

                    delete self.sdk.esystem.requestes[message.id]

                }

                else {

                    /// another messages/ system

                }
            },

            init: function () {


                if (electron) {

                    this.clbks.tick = {}
                    this.tickstate = {}
                    this.tickstatehash = []
        
                    this.tickstate = {
                        settings:
                        {
                            nedbkey: 'settings',
                            nedbpath: { settings: './data/settings' },
                            nodes: { defaults: [Object], stable: [Array] },
                            server: true,
                            ports: { https: 8888, wss: 8088 },
                            ssl:
                            {
                                key: './cert/key.pem',
                                cert: './cert/cert.pem',
                                passphrase: 'password'
                            },
                            dbEnable: true,
                            db:
                            {
                                host: 'localhost',
                                port: 5432,
                                max: 10,
                                idleTimeoutMillis: 30000,
                                user: 'postgres',
                                database: 'login',
                                password: 'password'
                            },
                            refkey: '',
                            captcha: true,
                            iplimiter: true
                        },
                        state: {},
                        proxyReady: true
                    }

                    electron.ipcRenderer.on('proxy-message', this.response)
                    electron.ipcRenderer.on('proxy-message-tick', this.tick)

                    this.inited = true
                }
            }
        },

        system16: {
            requestes: {},

            clbks: {
                tick: {

                }
            },

            tickstate: {},
            tickstatehash: [],
            inited: false,

            proxy: {
                settings: {
                    meta: {

                        server: {
                            name: self.app.localization.e('e13302'),
                            id: 'server',
                            type: "BOOLEAN",
                            value: false,

                            dbId: 'server'
                        },

                        serverPortHttps: {
                            name: self.app.localization.e('e13303'),
                            id: 'serverPortHttps',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'ports.https'
                        },

                        serverPortWss: {
                            name: self.app.localization.e('e13304'),
                            id: 'serverPortWss',
                            type: "NUMBER",
                            value: '',
                            format: {
                                Precision: 0,
                                groupSeparator: ''
                            },
                            dbId: 'ports.wss'
                        },

                        serverSslKeyUpload: {
                            name: self.app.localization.e('e13305'),
                            id: 'serverSslKeyUpload',
                            type: "file",
                            value: '',

                            upload: {

                            },

                            dbId: 'ssl.key'
                        },

                        serverSslCertUpload: {
                            name: self.app.localization.e('e13306'),
                            id: 'serverSslCertUpload',
                            type: "file",
                            value: '',
                            upload: {

                            },
                            dbId: 'ssl.cert'
                        },

                        serverSslPassphrase: {
                            name: self.app.localization.e('e13307'),
                            id: 'serverSslPassphrase',
                            type: "password",
                            value: '',

                            dbId: 'ssl.passphrase'
                        },

                        serverFirebaseAdminSDK: {
                            name: self.app.localization.e('e13308'),
                            id: 'serverFirebaseAdminSDK',
                            type: "file",
                            value: '',
                            upload: {

                            },
                            dbId: 'fbk'
                        },

                        pocketNetAuthTransactionCrane: {
                            name: self.app.localization.e('e13309'),
                            id: 'pocketNetAuthTransactionCrane',
                            type: "STRING",
                            value: '',

                            dbId: 'refkey'
                        },

                        captchaEnable: {
                            name: self.app.localization.e('e13310'),
                            id: 'captchaEnable',
                            type: "BOOLEAN",
                            value: true,

                            dbId: 'captcha'
                        },

                        iplimiterEnable: {
                            name: self.app.localization.e('e13311'),
                            id: 'iplimiterEnable',
                            type: "BOOLEAN",
                            value: true,

                            dbId: 'iplimiter'
                        }
                    },

                    create: function (id) {

                        var t = self.sdk.system16.proxy.settings

                        var m = t.meta;

                        var p = new Parameter(m[id])

                        return p;
                    },

                    createall: function () {
                        var t = self.sdk.system16.proxy.settings

                        var create = t.create
                        var m = t.meta;

                        var options = {};

                        _.each(m, function (p, id) {
                            options[id] = create(id)
                        })

                        return options
                    },

                    compose: function (values) {

                        if (!values) values = {}

                        var s = self.sdk.system16.proxy.settings;

                        var options = s.createall()

                        var m = s.meta;

                        var c = {


                            server: {
                                name: self.app.localization.e('e13312'),
                                options: {

                                    server: options.server,
                                    serverPortHttps: options.serverPortHttps,
                                    serverPortWss: options.serverPortWss,
                                    serverSslKeyUpload: options.serverSslKeyUpload,
                                    serverSslCertUpload: options.serverSslCertUpload,
                                    serverSslPassphrase: options.serverSslPassphrase

                                }
                            },

                            firebase: {
                                name: self.app.localization.e('e13314'),
                                options: {

                                    serverFirebaseAdminSDK: options.serverFirebaseAdminSDK

                                }
                            },

                            other: {
                                name: self.app.localization.e('e13315'),
                                options: {

                                    pocketNetAuthTransactionCrane: options.pocketNetAuthTransactionCrane,
                                    captchaEnable: options.captchaEnable,
                                    iplimiterEnable: options.iplimiterEnable

                                }
                            },


                        }

                        _.each(options, function (o) {
                            if (deep(values, o.dbId)) o.value = deep(values, o.dbId)
                        })

                        return {
                            c: c,
                            o: options
                        }

                    },
                }
            },

            // node control settings
            node: {
                settings: {
                    meta: {

                        Enable: {
                            name: self.app.localization.e('e13316'),
                            id: 'Enable',
                            type: "BOOLEAN",
                            value: false,
                            dbId: 'Enable'
                        },
                        BinPath: {
                            name:  self.app.localization.e('e13317'),
                            id: 'binPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'BinPath'
                        },
                        ConfPath: {
                            name: self.app.localization.e('e13318'),
                            id: 'confPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'ConfPath'
                        },
                        DataPath: {
                            name: self.app.localization.e('e13319'),
                            id: 'dataPath',
                            type: "FILE_SELECT",
                            upload: {},
                            value: '',
                            dbId: 'DataPath'
                        },
                        SetPrivateKey: {
                            name: self.app.localization.e('e13320'),
                            id: 'setPrivateKey',
                            type: "BUTTON",
                            value: '#link_to_wallets',
                            text: self.app.localization.e('e13321'),
                            dbId: 'SetPrivateKey'
                        },

                        state: {
                            name: self.app.localization.e('e13322'),
                            id: 'state',
                            type: "LABEL",
                            value: '',
                            dbId: 'control.state'
                        },

                        addresses: {
                            name: self.app.localization.e('e13323'),
                            id: 'addresses',
                            type: "LABEL",
                            value: '',
                            dbId: 'control.addresses'
                        },

                        lastBlock: {
                            name: self.app.localization.e('e13324'),
                            id: 'lastBlock',
                            type: "LABEL",
                            value: '-',
                            dbId: 'control.lastBlock'
                        }
                    },

                    create: function (id) {

                        var t = self.sdk.system16.node.settings

                        var m = t.meta;

                        var p = new Parameter(m[id])

                        return p;
                    },

                    createall: function () {
                        var t = self.sdk.system16.node.settings

                        var create = t.create
                        var m = t.meta;

                        var options = {};

                        _.each(m, function (p, id) {
                            options[id] = create(id)
                        })

                        return options
                    },

                    compose: function (values) {

                        if (!values) values = {}

                        var s = self.sdk.system16.node.settings;

                        var options = s.createall()

                        var m = s.meta;

                        var c = {

                            control: {
                                name: self.app.localization.e('control'),
                                options: {

                                    state: options.state,
                                    lastBlock: options.lastBlock,
                                    addresses: options.addresses,

                                }
                            },

                            setup: {
                                name: self.app.localization.e('setup'),
                                options: {

                                    Enable: options.Enable,
                                    DataPath: options.DataPath,
                                    SetPrivateKey: options.SetPrivateKey,

                                }
                            },

                        }

                        _.each(options, function (o) {
                            if (deep(values, o.dbId)) o.value = deep(values, o.dbId)
                        })

                        return {
                            c: c,
                            o: options
                        }

                    },
                }
            },

            destroy: function () {
                if (electron) {
                    electron.ipcRenderer.off('proxy-message', this.response)
                    this.inited = false
                }
            },

            request: function (action, data, clbk) {

                var rdata = {
                    action: action,
                    id: makeid(),
                    data: data
                }

                self.sdk.system16.requestes[rdata.id] = {
                    id: rdata.id,
                    clbk: function (error, data) {
                        if (clbk) clbk(error, data)
                    }
                    
                }

                electron.ipcRenderer.send('proxy-message', rdata);

            },

            tick: function (e, message) {

                var t = self.sdk.system16
                var hash = bitcoin.crypto.hash256(JSON.stringify(message))

                var change = (hash.join('') !== t.tickstatehash.join(''))

                t.tickstatehash = hash
                t.tickstate = message.data || {}

                _.each(t.clbks.tick, function (c) {
                    if (c)
                        c(t.tickstate, change)
                })
            },

            response: function (e, message) {
                var request = self.sdk.system16.requestes[message.id]

                if (request) {

                    if (request.clbk) 
                        request.clbk(message.error, message.data)

                    delete self.sdk.system16.requestes[message.id]
                }

                else {

                    /// another messages/ system

                }
            },

            init: function () {

                this.clbks.tick = {}
                this.tickstate = {}
                this.tickstatehash = []

                if (electron) {
                    electron.ipcRenderer.on('proxy-message', this.response)
                    electron.ipcRenderer.on('proxy-message-tick', this.tick)
                }

                this.inited = true
            }
        },

        system: {

            refreshNodes: function (clbk) {
                self.sdk.system.get.nodes(true, clbk)
            },

            nodeexdirect: function (anonim) {
                if (self.nodeid) {

                    var nodefull = ''

                    if (anonim) {
                        return "http://" + self.nodeid.host + ':' + self.nodeid.port
                    }
                    else {
                        if (self.nodeid.rpcuser && self.nodeid.rpcpwd) {
                            return "http://" + self.nodeid.rpcuser + ":" + self.nodeid.rpcpwd + "@" + self.nodeid.host + ':' + self.nodeid.port
                        }

                        else {
                            return null
                        }
                    }



                }
                else {
                    return null
                }
            },

            nodeex: function (data) {

                if (self.nodeid) {

                    if (self.nodeid.locally) {
                        data.nodelocally = JSON.stringify({
                            host: self.nodeid.host,
                            port: self.nodeid.port,
                            ws: self.nodeid.ws,

                            rpcuser: self.nodeid.rpcuser,
                            rpcpass: self.nodeid.rpcpwd
                        })
                    }
                    else {
                        data.node = self.nodeid.host

                    }
                }
            },

            get: {
                nodes: function (refresh, clbk) {

                    if (self.nodes && self.nodes.length && !refresh) {

                        if (clbk)
                            clbk()

                    }

                    else {
                        self.app.ajax.api({
                            action: 'nodes.get',

                            success: function (d) {

                                self.nodes = [];

                                d = d.data;

                                if (d.nodes && d.nodes.length) {
                                    self.nodes = d.nodes;

                                    _.each(self.nodes, function (n) {
                                        n.locally = false;
                                    })
                                }

                                self.nodes = self.nodes.concat(self.app.platform.sdk.node.sys.userlist)


                                self.nodes = _.filter(self.nodes, function(n){
                                    return n.nodename != 'Unknown peer'
                                })

                                if (self.nodes && self.nodes.length) {
                                    self.nodeid || (self.nodeid = self.nodes[0])
                                    //self.nodeid || (self.nodeid = self.nodes[rand(0, self.nodes.length - 1)])


                                }

                                if (clbk)
                                    clbk(true)
                            },

                            fail: function (d) {

                                self.nodes = _.clone(self.app.platform.sdk.node.sys.userlist)

                                if (self.nodes && self.nodes.length) {
                                    self.nodeid || (self.nodeid = self.nodes[0])
                                }

                                if (clbk)
                                    clbk(false)
                            }
                        })
                    }



                },

                info: function (clbk) {
                    self.app.ajax.api({
                        action: 'logs',
                        signature: true,

                        success: function (d) {


                            if (clbk)
                                clbk(null, d.data)
                        },
                        fail: function (d, err) {

                            if (clbk)
                                clbk(deep(d, 'statusCode') || err)
                        }
                    })
                },

                stats: function (clbk) {
                    self.app.ajax.api({
                        action: 'stats',
                        signature: true,

                        success: function (d) {
                            if (clbk)
                                clbk(null, deep(d, 'data.stats'))
                        },
                        fail: function (d, err) {

                            if (clbk)
                                clbk(deep(d, 'statusCode') || err)
                        }
                    })
                },

                applyMessagesFromTG: function (messages, acceptPosting, currentChannelId, renderClbk) {

                    let {
                        meta
                    } = self.sdk.usersettings;

                    messages.forEach(messager => {

                        const addValue = (dropdownName, channelName, channelId) => {


                            if (meta[dropdownName].possibleValues.indexOf(String(channelId)) === -1) {

                                meta[dropdownName].possibleValues.push(String(channelId));
                                meta[dropdownName].possibleValuesLabels.push(channelName);

                                const $tgDropdown = $(`div[parameter='${dropdownName}'] .vc_selectInput`);

                                const newValue = `<div class="vc_value" value=${channelId}>${channelName}</div>`;
                                const newValueHTML = $.parseHTML(newValue);
                                $tgDropdown.append(newValueHTML);


                            }


                        }

                        const stringToHtml = (initStr, entities) => {

                            let str = "";
                            let prevOffset = 0;
                            let curOffset = 0;

                            for (ent of entities) {

                                curOffset = ent.offset;
                                let simple = initStr.slice(prevOffset, curOffset);
                                str += simple;

                                const snippetToHtml = (snippet, ent) => {

                                    switch (ent.type) {

                                        case "italic":

                                            return "<i>" + snippet + "</i>";

                                        case "bold":

                                            return "<b>" + snippet + "</b>";

                                        case "underline":

                                            return "<u>" + snippet + "</u>";

                                        // case "strikethrough":

                                        //     return "<strike>" + snippet + "</strike>";

                                        case "text_link":

                                            return `<a href='${ent.url}' target='_blank' rel='noopener noreferrer'>${snippet}</a>`

                                        default:

                                            return snippet;

                                    }

                                }


                                const html = snippetToHtml(initStr.substr(ent.offset, ent.length), ent);

                                str += html;

                                prevOffset = curOffset + ent.length;


                            }

                            str += initStr.slice(prevOffset)

                            return str;
                        }

                        const addImages = (html, images, clbk) => {

                            const getImagePathPromise = (token, id) => {

                                return new Promise((resolve) => {

                                    const getImagePathResolve = data => {

                                        if (data.ok && data.result) {

                                            app.ajax.run({
                                                type: "POST",
                                                imgur: true,
                                                data: {
                                                    Action: "image",
                                                    image: `https://api.telegram.org/file/bot${token}/${data.result.file_path}`
                                                },

                                                success: function (result) {

                                                    if (result.success) {

                                                        const path = result.data && result.data.link;
                                                        resolve(String(path));

                                                    } else {

                                                        resolve("")
                                                    }

                                                }
                                            })

                                        } else {

                                            resolve("");

                                        }

                                    }


                                    if (token && id) {

                                        fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${id}`)
                                            .then(res => res.json())
                                            .then(getImagePathResolve)
                                            .catch(() => resolve(""));

                                    } else {

                                        resolve("");
                                    }

                                })

                            }

                            const postMessage = (html) => {


                                clbk(html);


                            }

                            withImages = (html, pathes) => {

                                let newHtml = '<p>' + html + '</p>';

                                for (path of pathes) {

                                    if (path) {

                                        newHtml += `<div class="medium-insert-images"><figure><img src=${path}></figure></div>`;

                                    }
                                }


                                postMessage(newHtml)

                            }

                            if (!images) {

                                postMessage(html)

                            }

                            const promises = [];


                            if (Array.isArray(images)) {

                                const ids = [];

                                for (const image of images) {

                                    ids.push(image.file_id);
                                }

                                const uniqueIds = [...new Set(ids)];

                                const token = (JSON.parse(localStorage.getItem('telegrambot')) && JSON.parse(localStorage.getItem('telegrambot')).token) || ""


                                for (const id of uniqueIds) {

                                    const path = getImagePathPromise(token, id);

                                    if (path) {

                                        promises.push(path);

                                    }

                                }

                            } else if (typeof images === "object") {

                                const path = getImagePathPromise(token, images.file_id)

                                if (path) {

                                    promises.push(path)

                                }

                            }

                            Promise.all(promises)
                                .then(pathes => withImages(html, pathes))

                        }

                        const clbk = (html) => {

                            const share = new Share();

                            function tagsFromText(text) {
                                var words = text.split(/[,.!?;:()<> \n\r]/g);

                                var tags = _.filter(words, function (w) {
                                    if (w[0] == '#') {

                                        w = w.replace(/#/g, '')

                                        if (!w) return false

                                        return true

                                    }
                                })

                                _.each(tags, function (tag, i) {

                                    tags[i] = tag.replace(/\#/g, '')

                                })

                                return tags;

                            }

                            function extractCaption(html) {

                                if (html.slice(3, 6) === "<b>") {

                                    const reg1 = new RegExp("</b>.*");
                                    const reg2 = new RegExp("<b>.*<\/b>")

                                    title = html.replace(reg1, "</b>");
                                    html = html.replace(reg2, "");

                                    return [html, title];

                                } else {

                                    return [html];
                                }
                            }


                            const textAndCaption = extractCaption(html);

                            if (textAndCaption[1]) {

                                share.caption.set(textAndCaption[1]);

                            }

                            share.message.set(textAndCaption[0]);


                            share.images.set(self.app.platform.sdk.articles.getImages(html))
                            var tags = tagsFromText(html);
                            share.tags.set(tags);
                            share.settings.videos = self.app.platform.sdk.articles.getVideos(html);
                            // if (caption){
                            //     share.caption.set()
                            // }


                            share.settings.v = 'a'
                            // share.settings.videos = self.app.platform.sdk.articles.getVideos(text)

                            self.sdk.node.transactions.create.commonFromUnspent(share, function (_alias, error) {

                                topPreloader(100)

                                // if (el.c){
                                //     el.c.removeClass('loading')
                                // }

                                if (!_alias) {


                                    if (clbk) {
                                        clbk(false, errors[error])
                                    } else {


                                        var t = self.app.platform.errorHandler(error, true);

                                        if (t) {
                                            sitemessage(t)
                                        }
                                    }
                                } else {

                                    try {

                                        var alias = new pShare();
                                        alias._import(_alias, true)
                                        alias.temp = true;
                                        alias.address = _alias.address

                                        if (share.aliasid) alias.edit = "true"

                                        self.app.platform.sdk.node.shares.add(alias)



                                        // art.txid = alias.txid;
                                        // art.ptime = Math.floor((new Date().getTime()) / 1000)

                                        self.app.platform.sdk.user.survey()

                                        // actions.complete();
                                    } catch (e) {
                                        console.log(e)
                                    }
                                }

                            }, null, true);


                        }

                        const replaceSpaces = (html) => {

                            const parse = s => s.replace(/[␤␍␊↵⏎]+/g, '\n');
                            const nl2br = s => s.replace(/\n/g, '<br>');

                            return nl2br(parse(html));

                        }
                        let {
                            chat
                        } = messager;

                        const channelId = chat.username ? (" (@" + chat.username + ")") : "";

                        const channelName = chat.title + channelId;
             
                        addValue("tgto", channelName, chat.id);
                        addValue("tgfrom", channelName, chat.id);

                        if (renderClbk){

                            renderClbk();
                        }



                        // meta.tgfrom.possibleValues = [...new Set(meta.tgfrom.possibleValues)];
                        // meta.tgfrom.possibleValuesLabels = [...new Set(meta.tgfrom.possibleValuesLabels)];
                        // meta.tgto.possibleValues = [...new Set(meta.tgto.possibleValues)];
                        // meta.tgto.possibleValuesLabels = [...new Set(meta.tgto.possibleValuesLabels)];


                        if (acceptPosting && chat.id === Number(currentChannelId)) {

                            const entities = messager.entities || messager.caption_entities || [];

                            const str = messager.text || messager.caption || "";

                            const text = stringToHtml(str, entities);

                            const html = replaceSpaces(text);

                            addImages(html, messager.photo, clbk);

                        } 

                    })

                },

                dialogOfTG: function (messages, currentChannelId, clbk) {

                    if (messages.length && currentChannelId) {

                        this.openedDialog = true;

                        dialog({
                            html: self.app.localization.e('e13325'),
                            btn1text: self.app.localization.e('e13326'),
                            btn2text: self.app.localization.e('ucancel'),

                            class: 'zindex',

                            success: () => {

                                const messages = JSON.parse(localStorage.getItem('telegramMessages') || "[]");

                                this.applyMessagesFromTG(messages, true, currentChannelId, clbk);
                                localStorage.setItem("telegramMessages", "[]");
                                this.openedDialog = false;



                            },

                            fail: () => {

                                this.applyMessagesFromTG(messages, false, currentChannelId, clbk);
                                localStorage.setItem("telegramMessages", "[]");
                                this.openedDialog = false;

                            }
                        })
                    }

                },

                telegramUpdateAbort: typeof AbortController != 'undefined' ? new AbortController() : null,

                telegramUpdates: function (offset = 0, clbk) {

                    if (!offset){

                        offset = 0;
                    }

                    const telegrambot = localStorage.getItem('telegrambot');
                    const token =  (telegrambot && JSON.parse(telegrambot) && JSON.parse(telegrambot).token) || "";
                    this.telegramUpdates = this.telegramUpdates.bind(this);

                    const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}&timeout=100`;


                    const settings = {
                        method: 'GET',
                        signal: this.telegramUpdateAbort.signal
                    }

                    const telegramData = data => {
  
                        if (data.ok) {

                            const {
                                result
                            } = data;

                            let {
                                meta
                            } = self.sdk.usersettings;

                            const resultWithSortedMedia = [];

                            result.forEach(messager => {

                                const {
                                    channel_post
                                } = messager;

                                const siblingIdx = resultWithSortedMedia.findIndex(uniqueMessager => {

                                    return channel_post && (channel_post.media_group_id === uniqueMessager.media_group_id);
                                })

                                if (siblingIdx > -1) {

                                    const uniquePost = resultWithSortedMedia[siblingIdx];

                                    if ((uniquePost && !uniquePost.capiton) && (channel_post && channel_post.caption)) {

                                        uniquePost.caption = channel_post.caption;
                                    }

                                    if ((uniquePost && !uniquePost.caption_entities) && (channel_post && channel_post.caption_entities)) {

                                        uniquePost.caption_entities = channel_post.caption_entities;

                                    }

                                    let photo = (channel_post.photo && channel_post.photo.length > 1) ?
                                        channel_post.photo[1] :
                                        (channel_post.photo && channel_post.photo.length) ?
                                            channel_post.photo[0] :
                                            "";


                                    if (!uniquePost.photo && channel_post.photo) {

                                        uniquePost.photo = [photo];

                                    } else if (uniquePost.photo && channel_post.photo) {

                                        uniquePost.photo = [...uniquePost.photo, photo];

                                    }


                                } else if (channel_post) {

                                    channel_post.photo = [
                                        (channel_post.photo && channel_post.photo.length > 1) ?
                                            channel_post.photo[1] :
                                            channel_post.length ?
                                                channel_post.photo[0] :
                                                ""
                                    ];

                                    resultWithSortedMedia.push(channel_post);

                                }

                            })

                            const {tgfrom} = meta;
                            const currentChannelIdx = tgfrom.possibleValuesLabels.indexOf(tgfrom.value);

                            const currentChannelId = tgfrom.possibleValues[currentChannelIdx];

                            //two flows: first: for posting, second: for new telegramUpdate

                            const prevTelegramMessages = JSON.parse(localStorage.getItem('telegramMessages') || "[]");

                            const tgfromCheck = resultWithSortedMedia.findIndex(message => String(message.chat.id) === String(currentChannelId));

                            const messagesFromChannel = resultWithSortedMedia.filter(message => String(message.chat.id) === String(currentChannelId));

                            let allTelegramMessages = [];

           
                            if (messagesFromChannel.length) {

                                
                                allTelegramMessages = [...prevTelegramMessages, ...messagesFromChannel];

                            } else {

                                allTelegramMessages = prevTelegramMessages;
                            }

                            localStorage.setItem("telegramMessages", JSON.stringify(allTelegramMessages));

                            const messagesFromOthers = resultWithSortedMedia.filter(message => String(message.chat.id) !== String(currentChannelId));

                            if (meta.tgfromask.value && messagesFromChannel.length && !this.openedDialog) {

                                const currentMessages = JSON.parse(localStorage.getItem("telegramMessages"));
                   
                                this.dialogOfTG(currentMessages, currentChannelId, clbk)

                            } else if (meta.tgfromask.value && this.openedDialog){


                                this.applyMessagesFromTG(messagesFromOthers, true, currentChannelId, clbk);


                            } else if (!meta.tgfromask.value){

                                this.applyMessagesFromTG(resultWithSortedMedia, true, currentChannelId, clbk);

                                
                            } else {
                                
                                this.applyMessagesFromTG(messagesFromOthers, null, null, clbk);

                            }{


                                if (!this.openedDialog) {

                                    localStorage.setItem("telegramMessages", "[]");

                                }


                            }

                            self.sdk.usersettings.save();

                            offset = result.length ? result[result.length - 1].update_id : 0
                            this.telegramUpdates(offset + 1, clbk);


                            // if (clbk) {

                            //     clbk();
                            // }

                        }

                    }

     
                    fetch(url, settings)
                    .then(data => data.json())
                    .then(data => telegramData(data))

                },


                telegramGetMe: function (token, abort, make, add) {


                    if (abort) {
                        this.telegramUpdateAbort.abort()
                        this.telegramUpdateAbort = new AbortController();
                    }


                    const current = document.querySelector("div[parameter='telegram'] .iWrapper");
          

                    if (current) {
                        current.remove();
                    }

                    if (token) {

                        fetch(`https://api.telegram.org/bot${token}/getMe`)
                            .then(data => data.json())
                            .then(json => {

                                if (add){

                                    add(json.ok)
                                }

                                if (json.ok) {

                                    localStorage.setItem("telegrambot", JSON.stringify({...json.result, token}));

                                    const {
                                        tgfrom
                                    } = self.sdk.usersettings.meta;
                                    const currentChannelIdx = tgfrom.possibleValuesLabels.indexOf(tgfrom.value);

                                    const currentChannelId = tgfrom.possibleValues[currentChannelIdx];
                                    
                                    this.dialogOfTG(JSON.parse(localStorage.getItem("telegramMessages") || "[]"), currentChannelId);
                                    this.telegramUpdates(null, make);

  

                                } 


                            })
                            .catch(err => {
                                if (err)
                                    console.log(err, 'error after try telegram update')
                            })
                    }


                },

                openedDialog: false


            },

        },


        videos : {
            storage : {},
            infoshares : function(shares){


                var links = _.filter(_.map(shares, function(s){
                    return s.url
                }), function(l){
                    return l ? true : false
                })


                return self.sdk.videos.info(links)

            },
            clearstorage : function(link){

                if(!link) return

                delete this.storage[link]

                var meta = parseVideo(link)

                if (meta.type == 'peertube'){
                    delete window.peertubeglobalcache[meta.id]
                }

                
            },
            info : function(links){

                var s = self.sdk.videos.storage

                
                var lmap = _.map(links, function(l){

                    var meta = parseVideo(l)

                    return {
                        meta : meta,
                        link : l
                    }
                })

                lmap = _.filter(lmap, function(l){

                    if(!l.meta.type) return false

                    if(s[l.link] && !s[l.link].waitTranscoding) return false

                    return true
                })

                if(!lmap.length) return Promise.resolve()

                var groups = group(lmap, function(l){
                    return l.meta.type
                })


                var promisesmap = _.map(groups, function(links, type){

                    if(!self.sdk.videos.types[type]){
                        return Promise.reject('typehandler')
                    }

                    return self.sdk.videos.types[type](links).then(r => {

                        _.each(r, function(l){
                            s[l.link] = s[l.meta.id] = l
                        })

                        return Promise.resolve()
                    }).catch(e => {
                        return Promise.resolve()
                    })

                })

                return Promise.all(promisesmap).catch(e => {
                    return Promise.resolve()
                })
            },

            paddingplaceholder : function(url, middle, clbk, elf){
                return self.sdk.videos.info([url]).catch((e)=>{
                    return Promise.resolve()
                }).then(() => {

                    middle(function(p){

                        if(self.sdk.videos.storage[url] && self.sdk.videos.storage[url].data){
                            var info = self.sdk.videos.storage[url].data;
        
                            var loadingPlayer = elf ? elf() : p.el.find('.jsPlayerLoading');
        
                            var width = loadingPlayer.width();
                            
                            loadingPlayer.css('padding-top', `${width / (2 * info.aspectRatio)}px`);
                            loadingPlayer.css('padding-bottom', `${width / (2 * info.aspectRatio)}px`);
                        }

                        if(clbk) clbk(p)
                    })

                })
            },

            catchPeertubeLinks : function(linksInfo, links){
                if(!window.peertubeglobalcache)
                    window.peertubeglobalcache = {}

                links.forEach(link => {
                    
                    const linkInfo = linksInfo[link.link];

                    if (linkInfo){

                        if((new Date(linkInfo.createdAt)).getTime() < (new Date(2021, 4, 19)).getTime()){
                            linkInfo.aspectRatio = 1.78
                        }

                        linkInfo ? link.data = {
                            image : 'https://' + linkInfo.from + linkInfo.previewPath,
                            views : linkInfo.views,
                            duration : linkInfo.duration,
                            aspectRatio : linkInfo.aspectRatio || 1,
                            isLive : linkInfo.isLive,
                        } : '';

                        window.peertubeglobalcache[link.meta.id] = linkInfo
                    }

                    
                });
            },

            types : {
                youtube : function(links){
                    var result = _.map(links, function(l){

                        l.data = {
                            image : videoImage(l.link),
                            views : 0
                        }

                        return l

                    })

                    return Promise.resolve(result)
                },

                vimeo : function(links){
                    return self.sdk.videos.types.youtube(links)
                },

                

                peertube : async function(links){


                    return self.app.api.fetch('peertube/videos', {
                        urls: links.map(link => link.link),
                    }).then(linksInfo => {

                        self.sdk.videos.catchPeertubeLinks(linksInfo, links)

                        return Promise.resolve(links);
                    })


                  
                },

                bitchute : function(links){

                    var promises = _.map(links, function(l){
                        return new Promise((resolve, reject) => {

                            var link = l.link.replace('/embed/', '/video/');

                            $.ajax({
                                url : 'https://pocketnet.app:8888/bitchute',
                                data : {
                                    url : hexEncode(link)
                                },
                                type : 'POST',
                                success : function(response){

                                    if (response.data.video && response.data.video.as) {

                                        return resolve(response.data.video)

                                    } else {
                                        reject()
                                    }

                                }
                            });

                        }).then(r => {

                            l.data = {
                                views : 0,
                                image : r.preview
                            }

                            return Promise.resolve(l)
                        })
                    })

                    return Promise.all(promises)

                }
            },

            volume : 0.5,
            save : function(){
                localStorage['videovolume'] = self.sdk.videos.volume || 0.5
            },
            load : function(){

                var _v = localStorage['videovolume']

                if(typeof _v == 'undefined') _v = '0.5'


                console.log("_v", _v)

                self.sdk.videos.volume = Number(_v)
            },
            init : function(clbk){
                console.log("LOADVIDEOS")
                self.sdk.videos.load()

                if(clbk) clbk()
            }
        }
    }


    self.Firebase = function (platform) {

        var self = this;

        var using = typeof window != 'undefined' && window.cordova && typeof FirebasePlugin != 'undefined';

        var currenttoken = null;

        var device = function () {
            var id = platform.app.options.device

            return id;
        }

        self.api = {

            revoke: function (token, clbk) {
                platform.app.ajax.fb({
                    action: 'firebase.revoke',

                    data: {
                        device: device(),
                        address: platform.sdk.address.pnet().address
                    },

                    success: function () {
                        if (clbk)
                            clbk()
                    }
                })
            },

            revokeDevice: function (clbk) {
                platform.app.ajax.fb({
                    action: 'firebase.revokedevice',

                    data: {
                        device: device()
                    },

                    success: function () {
                        if (clbk)
                            clbk()
                    }
                })
            },

            setToken: function (token, clbk) {
                platform.app.ajax.fb({
                    action: 'firebase.set',

                    data: {
                        token: token,
                        device: device(),
                        address: platform.sdk.address.pnet().address
                    },

                    success: function () {
                        if (clbk)
                            clbk()
                    }
                })
            },


            subscribe: function (topic) {
                if (using)
                    FirebasePlugin.subscribe("latest_news");
            },

            unsubscribe: function (topic) {
                if (using)
                    FirebasePlugin.unsubscribe(topic);
            },
        }

        self.get = function (clbk) {

            if (!using) {
            }
            else {

                FirebasePlugin.getToken(function(token) {

                    if (currenttoken == token) return

                        currenttoken = token

                        self.api.setToken(token, function () {

                    })
    
                }, function(error) {
                    console.error(error, 'fcmToken not set on server');
                });


            }

            if (clbk)
                clbk()
        }

        self.permissions = function(clbk){
			FirebasePlugin.hasPermission(function(hasPermission){

                if(!hasPermission){
                    FirebasePlugin.grantPermission(function(hasPermission){
    
                        if(hasPermission){
                            self.get(clbk)
                        }
        
                    });
                }
                else{
                    self.get(clbk)
                }

            });
		}

        self.events = function () {

            FirebasePlugin.onMessageReceived((data) => {

                if(!data) data = {}

                if (data.tap) {

                    platform.ws.destroyMessages()

                    platform.app.nav.api.load({
                        open: true,
                        href: 'notifications',
                        history: true
                    })

                    return
                }
                else {

                    if (typeof cordova != 'undefined') {

                        var cordovabadge = deep(cordova, 'plugins.notification.badge')

                        if (cordovabadge)
                            cordovabadge.increase(1, function (badge) { });
                    }

                }

                platform.ws.messageHandler(data)
            });

        }

        self.init = function(clbk){


			if(using) {
				self.events()

				self.permissions()
			}

			if (clbk)
				clbk()


		}

        self.destroy = function (clbk) {
            if (!using) {
                if (clbk)
                    clbk()
            }
            else {
                self.api.revokeDevice(clbk)
            }
        }

        return self;

    }

    self.WSn = function (platform) {

        var self = this;
        var app = platform.app;

        var socket;
        var opened = false;
        var closing = false;
        var lost = 0;
        var wait = null;

        self.connected = {};
        self.online = false;
        self.onlineCheck = false;
        self.fastMessages = [];
        self.app = app

        var txidstorage = {};

        self.loadingMissed = false;


        self.tempates = {

            _share: function (share, c) {
                var m = share.caption || share.message;
                var nm = ''

                if (typeof joypixels != 'undefined') {
                    nm = joypixels.toImage(filterXSS(trimHtml(m, c || 20)));
                }
                else {
                    nm = filterXSS(trimHtml(m, c || 20));
                }



                return nm
            },

            share: function (share, extra, extendedpreview) {
                var h = '';

                var m = share.caption || share.message;

                var symbols = 20;

                if (extendedpreview) {
                    m = '';

                    if (share.caption) m = m + '' + share.caption + ' '

                    if (share.message) m = m + '' + share.message + ''

                    symbols = 180;
                }

                var nm = filterXSS(trimHtml(m, symbols), {
                    stripIgnoreTag: true,
                    whiteList: {
                        b: ["style"]
                    }
                });

                //nm = share.renders.xssmessage(nm)


                var images = _.map(share.images, function (i) {
                    return {
                        i: i,
                        v: false
                    }
                });

                if (share.url) {

                    var video = videoImage(share.url)

                    if (video) {
                        images.push({
                            i: video,
                            v: true
                        })
                    }
                }

                if(app.curation()) return ''

                h = '<div class="sharepreview"><div class="shareprwrapper table">'

                if (!extendedpreview && images.length) {

                    var img = images[0]

                    h += '<div class="tcell forimage">'
                    h += '<div class="img" image="' + clearStringXss(img.i) + '">'

                    if (img.v) {
                        h += '<div class="vstyle">'
                        h += '<i class="fas fa-play"></i>'
                        h += '</div>'
                    }

                    h += '</div>'
                    h += '</div>'

                }

                h += '<div class="tcell fortext">'

                h += '<span>' + nm + '</span>'
                if (images.length && extendedpreview) {


                    h += '<div class="shareimages commentprev">'
                    h += '<div class="imagesContainer">'
                    _.each(images, function (image) {

                        h += '<div class="imagesWrapper">'
                        h += '<div class="image" image="' + clearStringXss(image.i) + '" i="' + clearStringXss(image.i) + '">'

                        if (image.v) {
                            h += '<div class="vstyle">'
                            h += '<i class="fas fa-play"></i>'
                            h += '</div>'
                        }

                        h += '</div>'
                        h += '</div>'

                    })

                    h += '</div>'
                    h += '</div>'

                }

                h += '</div>'

                if (extra) {
                    h += '<div class="tcell extra">'
                    h += extra
                    h += '</div>'
                }


                h += '</div>\
                    </div>'


                return h;
            },

            transaction: function (data, message) {
                var h = '<div class="transactionmessage">'

                h += '<div class="transactionmessagewrapper table">'

                if (message) {
                    h += '<div class="tcell formessage">'

                    h += clearStringXss(message)

                    h += '</div>'
                }

                h += '<div class="tcell foramount">'

                h += "+" + platform.mp.coin(clearStringXss(data.amountall || data.tx.amount)) + " PKOIN"

                h += '</div>'

                h += '</div>'

                h += '</div>'

                return h;
            },

            comment: function (comment, share) {
                var t = comment.renders.preview();


                var h = '<div class="commentmessage">'

                h += '<div class="commentmessagewrapper table">'

                h += '<div class="tcell fortext">'


                if (t) {
                    h += '<div class="commenttext commentprev"><span>&ldquo;'
                    h += t
                    h += '&rdquo;</span></div>'
                }

                if (comment.images.length) {

                    h += '<div class="commentimages commentprev">'
                    h += '<div class="imagesContainer">'
                    _.each(comment.images, function (image) {

                        h += '<div class="imagesWrapper">'
                        h += '<div class="image imageCommentOpen" image="' + image + '" i="' + image + '">'
                        h += '</div>'
                        h += '</div>'

                    })

                    h += '</div>'
                    h += '</div>'

                }

                if (share) {
                    h += '<div class="commentshare">'
                    h += share
                    h += '</div>'
                }

                h += '</div>'

                h += '</div>'

                h += '</div>'

                return h;
            },

            commentScore: function (comment, thumbs) {

                var t = comment.renders.preview();

                var h = '<div class="commentmessage">'

                h += '<div class="commentmessagewrapper table">'

                h += '<div class="tcell fortext">'

                if (t) {
                    h += '<div class="commenttext commentprev"><span>&ldquo;'
                    h += t
                    h += '&rdquo;</span></div>'
                }

                if (comment.images.length) {


                    h += '<div class="commentimages commentprev">'
                    h += '<div class="imagesContainer">'
                    _.each(comment.images, function (image) {

                        h += '<div class="imagesWrapper">'
                        h += '<div class="image imageCommentOpen" image="' + clearStringXss(image) + '" i="' + clearStringXss(image) + '">'
                        h += '</div>'
                        h += '</div>'

                    })

                    h += '</div>'
                    h += '</div>'

                }

                h += '</div>'

                if (thumbs) {
                    h += '<div class="tcell forthumbs">'
                    h += thumbs
                    h += '</div>'
                }


                h += '</div>'

                h += '</div>'

                return h;
            },

            star: function (count) {

                var _star = '<i class="fas fa-star"></i>';
                if (electron) _star = '★';
                return '<div class="messagestar" count="' + count + '">' + count + '' + _star + '</div>'
            },

            thumbs: function (value) {

                var t = '';

                if (electron) {
                    t = '👍';

                    if (value < 0) t = '👎';
                }
                else {
                    t = '<i class="fas fa-thumbs-up"></i>';

                    if (value < 0) t = '<i class="fas fa-thumbs-down fa-flip-horizontal"></i>';
                }

                return '<div class="messagethumbs" value="' + clearStringXss(value) + '">' + t + '</div>'
            },

            _user: function (author) {
                return filterXSS(deep(author, 'name') || author.address)
            },

            user: function (author, html, gotoprofile, caption, extra, time) {

                if (!author || !author.name) {
                    return html
                }

                var h = '';

                var src = deep(author, 'image')


                var link = '<a href="' + encodeURI(clearStringXss(author.name.toLowerCase())) + '">'
                var clink = "</a>"

                if (app.curation()) {
                    link = ''
                    clink = ''
                    gotoprofile = false
                }


                h += '<div class="cwrapper table">\
                    <div class="cell cellforimage">\
                        <div class="icon">'

                if (gotoprofile) h += link

                h += '<div class="usericon" image="' + clearStringXss(src || '') + '">'


                if(deep(platform, 'real.'+author.address)) {
                    h += '<div class="realperson">'

                    h += '<span class="fa-stack fa-2x">'
                    h += '<i class="fas fa-certificate fa-stack-2x"></i>'
                    h += '<i class="fas fa-check fa-stack-1x"></i>'
                    h += '</span>'
                    h += '</div>'
                }


                h += '</div>'

                if (gotoprofile) h += clink

                h += '</div>\
                    </div>\
                    <div class="ccell">\
                        <div class="infomain">\
                            <div class="caption">'

                if (author.address != platform.sdk.address.pnet().address) {

                    if (gotoprofile) h += link
                    h += '<b class="adr">' + filterXSS(deep(author, 'name') || author.address) + '</b>'
                    if (gotoprofile) h += clink

                }

                if (caption) {
                    h += " " + clearStringXss(caption)
                }

                h += '</div>\
                            <div class="tips">' + (html) + '\
                            </div>\
                        </div>'

                h += self.tempates.time(time)

                h += '</div>'

                if (extra) {
                    h += '<div class="ccell extra">'
                    h += extra
                    h += '</div>'
                }


                h += '</div>'



                return h;
            },

            time: function (time) {

                var t = '';
                var h = '';

                if (time) {

                    t = new Date()
                    t.setTime(clearStringXss(time) * 1000);

                    h += '<div class="time">'
                    h += '<span class="realtime" time="' + t + '">' + app.reltime(t) + '</span>'
                    h += '</div>'
                }

                return h
            },

            subscribe: function (author) {

                var me = deep(app, 'platform.sdk.users.storage.' + platform.sdk.address.pnet().address)

                var d = ''

                if (me && me.relation(author.address, 'subscribes')) {
                    d = 'disabled'
                }

                var h = '<div class="subscribeWrapper table">'

                h += '<div class="scell forsubscribe">'
                h += '<button class="subscribe ghost + ' + d + '">'
                h += '<i class="far fa-check-circle"></i> '
                h += 'Follow</button>'
                h += '</div>'

                h += '</div>'

                return h
            },


        }

        self.showedIds = {}

        self.messages = {

            registered: {
                loadMore: function (data, clbk) {

                    self.connected[data.addr] = true


                }
            },
            connectionfailed: {
                loadMore: function (data) {
                }
            },

            ///

            cScore: {
                fastMessageEvents: function (data, message) {

                    message.el.find('.commentprev').on('click', function () {


                        platform.sdk.node.shares.getbyid(data.comment.txid, function (s, err, p, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.comment.txid,
                                inWnd: !isMobile(),
                                history: isMobile(),
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.comment.txid,

                                    reply: {
                                        answerid: data.comment.id,
                                        parentid: data.comment.parentid || "",
                                        noaction: true
                                    }
                                }
                            })

                        })

                    })

                },

                loadMore: function (data, clbk, wa) {


                    platform.sdk.users.get([data.addrFrom], function () {


                        data.user = platform.sdk.users.storage[data.addrFrom] || {}

                        data.user.address = data.addrFrom;

                        data.i = '👍';

                        if (data.value < 0) data.i = '👎';

                        platform.sdk.comments.getbyid(data.commentid, function (t) {

                            data.comment = deep(platform.sdk.comments, 'storage.all.' + data.commentid)

                            if (t) {
                                if (data.upvoteVal > 0) data.comment.scoreUp++
                                else data.comment.scoreDown++
                            }

                            if (data.comment && !data.comment.deleted) {

                            }

                            clbk()
                        })

                    })

                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.user && data.comment && platform.sdk.usersettings.meta.commentScore.value) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.comment && !data.comment.deleted && data.upvoteVal > 0) {
                        n.text = self.tempates._user(data.user) + " " + self.app.localization.e('e13328')
                        n.caption = self.app.localization.e('e13329')
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if(data.user && data.user.address){

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }
                        
                    }

                    if (data.comment && !data.comment.deleted && data.upvoteVal > 0) {

                        if (platform.sdk.usersettings.meta.commentScore.value) {
                            text = self.tempates.commentScore(data.comment)
                        }

                        if (text) {
                            html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, platform.app.localization.e('upvoteCommentMessage') + ':', self.tempates.thumbs(data.upvoteVal), data.time)
                        }

                    }



                    return html;

                },

                clbks: {
                }
            },

            reshare: {
                loadMore: function (data, clbk, wa) {

                    platform.sdk.users.get([data.addrFrom], function () {

                        data.user = platform.sdk.users.storage[data.addrFrom] || {}

                        data.user.address = data.addrFrom

                        platform.sdk.node.shares.getbyid([data.txid, data.txidRepost], function (s, fromcashe) {


                            s || (s = []);

                            if (s[0]) {
                                data.share = s[0];
                            }

                            if (s[1]) {
                                data.shareReposted = s[1];
                            }

                            clbk()
                        })

                    })

                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.share) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.share) {
                        n.caption = self.tempates._user(data.user) + ' ' + self.app.localization.e('e13330')
                        n.text = self.tempates._share(data.shareReposted, 100)
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';


                    if (data.user && data.user.address){

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }
                        
                    }

                    if(data.share && data.shareReposted){
                        text = self.tempates.share(data.share, null, true) + '<div class="sharedivide">&middot;&middot;&middot;</div>' + self.tempates.share(data.shareReposted, null, true)
                    }   

                    

                    if (text) {
                        html += self.tempates.user(data.user, text, true, " " + self.app.localization.e('e13331'), '<div class="repostshare"><i class="fas fa-share"></i></div>', data.time)
                    }


                    return html;

                },

                fastMessageEvents: function (data, message) {

                    message.el.find('.sharepreview').on('click', function () {

                        platform.sdk.node.shares.getbyid(data.txid, function (s, err, p, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.txid,
                                inWnd: !isMobile(),
                                history: isMobile(),
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.txid
                                }
                            })

                        })

                    })

                },

                clbks: {
                }
            },

            postfromprivate: {
                loadMore: function (data, clbk, wa) {

                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.sdk.users.storage[data.addrFrom] || {}

                            data.user.address = data.addrFrom

                            if (data.txids && !data.txid) data.txid = data.txids

                            platform.sdk.node.shares.getbyid(data.txid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()
                            })

                        })

                        return
                    }

                    clbk()
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.share) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.share) {
                        n.caption = self.tempates._user(data.user) + " " + self.app.localization.e('e13332')
                        n.text = self.tempates._share(data.share, 100)
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if(data.share){
                        text = self.tempates.share(data.share, null, true)
                    }
                    
                    if (text) {


                        if (data.postsCnt > 1) {

                            var c = data.postsCnt - 1

                            //text = text + '<div class="moreshares">And more ' + c + " " + pluralform(c, ['post', 'posts']) + '</div>'

                        }



                        html += self.tempates.user(data.user, text, true, " " + self.app.localization.e('e13332'), null, data.time)
                    }


                    return html;

                },

                fastMessageEvents: function (data, message) {

                    message.el.find('.sharepreview').on('click', function () {

                        platform.sdk.node.shares.getbyid(data.txid, function (s, err, p, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.txid,
                                inWnd: !isMobile(),
                                history: isMobile(),
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.txid
                                }
                            })

                        })

                    })

                },

                clbks: {
                }
            },

            sharepocketnet: {
                loadMore: function (data, clbk, wa) {

                    data.addrFrom = 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd'

                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.sdk.users.storage[data.addrFrom] || {}

                            data.user.address = data.addrFrom

                            if (data.txids && !data.txid) data.txid = data.txids

                            platform.sdk.node.shares.getbyid(data.txid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()
                            })

                        })

                        return
                    }

                    clbk()
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.share) {
                            return true
                        }

                        return false;
                    }
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.user && data.share) {
                        n.caption = self.tempates._user(data.user)
                        n.text = self.tempates._share(data.share, 100)
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if (data.share) {
                        text = self.tempates.share(data.share, null, true)

                        if (text) {
                            html += self.tempates.user(data.user, text, true, null, null, data.time)
                        }
                    }

                    return html;

                },

                fastMessageEvents: function (data, message) {

                    message.el.find('.sharepreview').on('click', function () {

                        platform.sdk.node.shares.getbyid(data.txid, function (s, err, p, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.txid,
                                inWnd: !isMobile(),
                                history: isMobile(),
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.txid
                                }
                            })

                        })

                    })

                },

                clbks: {
                }
            },

            "transaction": {
                loadMore: function (data, clbk, wa) {

                    var _dataclbk = function (tx, err) {

                        if (err || !tx) {

                            if (clbk) clbk()

                            return

                        }

                        data.txinfo = tx;

                        var address = data.addr;

                        platform.sdk.node.transactions.unspent || (platform.sdk.node.transactions.unspent = {})

                        var s = platform.sdk.node.transactions.unspent;
                        s[address] || (s[address] = []);


                        ////////////

                        var temp = deep(platform.sdk.node.transactions.temp, 'share.' + data.txid)


                        if (temp && !wa) {


                            data.temp = temp;
                            data.temp.temp = false;

                            if (data.temp.type == 'share') {
                                var share = new pShare();
                                share._import(data.temp, true);
                                share.address = platform.sdk.address.pnet().address

                                share.scnt = '0'
                                share.score = "0"
                                share.myVal = 0


                                if (!platform.sdk.node.shares.storage.trx)
                                    platform.sdk.node.shares.storage.trx = {}


                                platform.sdk.node.shares.storage.trx[data.txid] = share

                            }

                            delete platform.sdk.node.transactions.temp.share[data.txid]
                        }


                        var uitemp = deep(platform.sdk.node.transactions.temp, 'userInfo.0')

                        if (uitemp && data.type == 'userInfo') {
                            platform.sdk.node.transactions.temp.userInfo = {};
                        }

                        var outs = platform.sdk.node.transactions.toUTs(tx, address);

                        _.each(outs, function (o) {


                            platform.sdk.node.transactions.clearTemp(data.txid, o.vout, true);

                            if (!wa) {

                                removeEqual(s[address], {
                                    txid: data.txid,
                                    vout: o.vout
                                })

                                s[address].push(o)

                            }


                        })

                        ////////////

                        if (platform.sdk.address.pnet()) {

                            var addr = platform.sdk.address.pnet().address

                            var regs = platform.sdk.registrations.storage[addr];

                            if (regs && regs == 3) {

                                platform.sdk.registrations.add(addr, 4)

                                platform.sdk.relayTransactions.send()

                            }

                        }

                        //////////////////////

                        data.tx = platform.sdk.node.transactions.toUT(tx, data.addr, data.nout)

                        data.amountall = _.reduce(outs, function (m, v) {
                            return m + v.amount
                        }, 0)

                        data.address = platform.sdk.node.transactions.addressFromScryptSig(deep(data.txinfo, 'vin.0.scriptSig.asm'))

                        data.opmessage = platform.sdk.node.transactions.getOpreturn(data.txinfo)

                        data.cointype = platform.sdk.node.transactions.getCoibaseTypeN(data.txinfo, platform.sdk.address.pnet().address) 




                        platform.sdk.users.getone(data.address || '', function () {

                            if (data.address) {
                                data.user = platform.sdk.usersl.storage[data.address] || {
                                    address: data.address
                                }
                            }

                            _.each(platform.sdk.node.transactions.clbks, function (c) {
                                c(data.amountall)
                            })



                            if (clbk)
                                clbk(data)


                        }, data.type != "userInfo", data.type == "userInfo")


                    }

                    if (data.txinfo) {
                        _dataclbk(data.txinfo)
                    }
                    else {
                        platform.sdk.node.transactions.get.tx(data.txid, _dataclbk)
                    }


                },

                refs: {

                },

                notificationData: function (data, user) {
                    var n = {};


                    if (data.tx) {


                        if (data.tx.coinbase) {

                            var a = 'activity'

                            n.caption = self.app.localization.e('e13333')
                            n.text = self.app.localization.e('e13334') + " " + platform.mp.coin(data.tx.amount) + " "+self.app.localization.e('e13335')+" '" + a + "'!"
                            n.topic = 'pos'


                        }

                        else {


                            if (data.address != user.address && data.user) {

                                if (data.amountall >= 0.05 || data.tx.amount >= 0.05) {
                                    n.text = self.tempates._user(data.user) + " sent " + platform.mp.coin(data.tx.amount) + " PKOIN to you"

                                    if (data.opmessage) {
                                        n.text = n.text + ' '+self.app.localization.e('e13336')+' "' + data.opmessage + '"'
                                    }
                                    else {
                                        n.text = n.text + "!"
                                    }

                                    n.caption = self.app.localization.e('e13333') + ": " + self.tempates._user(data.user)
                                    n.topic = 'transactions'
                                }

                            }

                        }
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data, ld) {

                    var html = '';


                    if (data.tx) {


                        if (data.tx.coinbase) {

                            if (platform.sdk.usersettings.meta.win.value) {

                                var td = 'coinbaseSuccess'

                                if (data.cointype) {
                                    td = td + data.cointype
                                }

                                html += self.tempates.user(

                                    platform.sdk.users.storage[platform.sdk.address.pnet().address],

                                    self.tempates.transaction(data,

                                        '<div class="text">' +
                                        platform.app.localization.e(td, platform.mp.coin(clearStringXss(data.amountall || data.tx.amount))) +
                                        '</div>'

                                    ),

                                    false,
                                    null,
                                    null,

                                    data.time

                                )



                            }

                        }

                        else {

                            if (!platform.sdk.address.pnet() || data.address != platform.sdk.address.pnet().address) {


                                if (data.address){

                                    var me = platform.sdk.user.me()
                                    if (me && me.relation(data.address, 'blocking')) {
                                        return html
                                    }
                                    
                                }

                                if (platform.sdk.usersettings.meta.transactions.value && data.user && data.user.name) {

                                    if (data.amountall >= 0.05 || data.tx.amount >= 0.05) {

                                        var txt = platform.app.localization.e('userSent', platform.mp.coin(data.amountall || data.tx.amount))

                                        if (data.opmessage) {
                                            txt += ' '+self.app.localization.e('e13336')+' <span>&ldquo;' + data.opmessage + '&rdquo;</span>'
                                        }

                                        html += self.tempates.user(data.user, '', true, txt, self.tempates.transaction(data), data.time)

                                    }

                                }
                            }

                        }
                    }


                    return html;

                },
                audio: {
                    unfocus: 'water_droplet',

                    if: function (data) {

                        if (data.temp) {
                            return false;
                        }

                        if (data.tx) {
                            if (data.tx.coinbase) {
                                if (!platform.sdk.usersettings.meta.win.value) {

                                    return false;
                                }
                            }
                            else {
                                if (data.address != platform.sdk.address.pnet().address) {
                                    if (!platform.sdk.usersettings.meta.transactions.value) {
                                        return false;
                                    }
                                }
                                else {
                                    return false;
                                }
                            }
                        }
                        else {
                            return false;
                        }

                        return true;
                    }
                },
                clbks: {
                    /*transactions : function(data){

                        _.each(platform.sdk.node.transactions.clbks, function(c){
                            c(data.tx.amount)
                        })

                    }*/
                }
            },

            'newblocks': {
                loadMore: function (data, clbk) {

                    if (data.block <= platform.currentBlock) {

                        if(clbk) clbk(0)

                        return

                    }

                        var s = platform.sdk.node.transactions;

                        var dif = platform.currentBlock - data.block

                        platform.currentBlock = data.block;
                        platform.lasttimecheck = new Date()

                        lost = data.block;

                    localStorage['lastblock'] = platform.currentBlock

                    if (dif)
                        platform.sdk.newmaterials.update(data)

                    //self.reconnected = platform.currentBlock;

                    platform.sdk.notifications.wsBlock(data.height)

                    _.each(s.unspent, function (unspents) {
                        _.each(unspents, function (txu) {
                            txu.confirmations = (txu.confirmations || 0) + (dif || 0)
                        })
                    })

                    platform.sdk.user.subscribeRef()

                    clbk(dif)
                },

                refs: {

                },
                fastMessage: function (data) {

                    var html = '';

                    return html;

                },

                clbks: {
                    transactions: function () {
                        _.each(platform.sdk.node.transactions.clbks, function (c) {
                            c()
                        })
                    }
                }
            },

            "new block": {

                loadMore: function (data, clbk) {

                    if (data.height <= platform.currentBlock) return

                    var s = platform.sdk.node.transactions;

                    platform.currentBlock = data.height;

                    platform.lasttimecheck = new Date()

                    localStorage['lastblock'] = platform.currentBlock

                    lost = platform.currentBlock;

                    platform.sdk.notifications.wsBlock(data.height)

                    _.each(s.unspent, function (unspents, address) {
                        _.each(unspents, function (txu) {

                            txu.confirmations || (txu.confirmations = 0)

                            txu.confirmations++

                        })
                    })

                    platform.sdk.newmaterials.update(data)

                    platform.sdk.user.subscribeRef()

                    platform.matrixchat.init()

                    setTimeout(function () {
                        platform.sdk.relayTransactions.send()
                    }, 30000)


                    clbk()
                },

                refs: {

                },
                fastMessage: function (data) {

                    var html = '';

                    return html;

                },

                clbks: {
                    transactions: function () {
                        _.each(platform.sdk.node.transactions.clbks, function (c) {
                            c()
                        })
                    },

                    interface: function () {

                        if (typeof $ != 'undefined') {
                            $('.temptransaction').removeClass('temptransaction')
                        }

                    }
                }
            },

            comment: {

                fastMessageEvents: function (data, message) {

                    message.el.find('.commentprev').on('click', function () {

                        platform.sdk.node.shares.getbyid(data.posttxid, function (s, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.posttxid,
                                inWnd: !isMobile(),
                                history: isMobile(),
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.posttxid,

                                    reply: {
                                        answerid: data.commentid,
                                        parentid: data.parentid || "",
                                        noaction: true
                                    }
                                }
                            })

                        })

                    })

                    message.el.find('.reply').on('click', function () {

                        platform.sdk.node.shares.getbyid(data.posttxid, function (s, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.posttxid,
                                inWnd: !isMobile(),
                                history: isMobile(),
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.posttxid,

                                    reply: {
                                        answerid: data.commentid,
                                        parentid: data.parentid || ""
                                    }
                                }
                            })

                        })

                    })

                },

                loadMore: function (data, clbk, wa) {

                    var getpost = function (pid, clbk) {

                        if (pid)

                            platform.sdk.node.shares.getbyid(pid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()

                            })

                        else

                            clbk()
                    }

                    platform.sdk.users.get([data.addrFrom], function () {

                        data.user = platform.sdk.users.storage[data.addrFrom] || {}
                        data.user.address = data.addrFrom

                        if (!data.commentid && data.txid)
                            data.commentid = data.txid

                        getpost(data.posttxid, function () {

                            var ids = [data.commentid]

                            data.txid = data.commentid

                            platform.sdk.comments.getbyid(ids, function () {


                                data.comment = deep(platform.sdk.comments, 'storage.all.' + data.commentid)

                                if (data.comment) {
                                    platform.sdk.comments.storage[data.comment.txid] ||
                                        (platform.sdk.comments.storage[data.comment.txid] = {})

                                    var pid = data.comment.parentid || '0';

                                    if (platform.sdk.comments.storage[data.comment.txid][pid]) {
                                        platform.sdk.comments.storage[data.comment.txid][pid].push(data.comment)
                                    }
                                }


                                clbk()
                            })
                        })


                    })
                },

                notificationData: function (data) {
                    var n = {};

                    if (data.reason == 'post' && data.comment && data.share && data.user) {
                        n.text = data.comment.renders.previewEmojidis()
                        n.topic = 'comments'

                        n.caption = self.tempates._user(data.user) + " "+self.app.localization.e('e13337')+""
                    }

                    if (data.reason == 'answer' && data.comment && data.share && data.user) {
                        n.text = data.comment.renders.previewEmojidis()
                        n.topic = 'answers'
                        n.caption = self.tempates._user(data.user) + ' '+self.app.localization.e('e13338')+''
                    }

                    if (_.isEmpty(n))
                        return null;

                    return n
                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    var extra = ''
                    extra += '<div class="tcell foranswer">'
                    extra += '<button class="reply ghost">'+self.app.localization.e('reply')+'</button>'
                    extra += '</div>'

                    if (data.user && data.user.address){

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }
                        
                    }

                    if (data.reason == 'post' && data.comment && data.share && data.user &&
                        (!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)) {

                        text = self.tempates.comment(data.comment, self.tempates.share(data.share))

                        if (text) {
                            html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + self.app.localization.e('e13337'), extra, data.time)
                        }
                    }

                    if (data.reason == 'answer' && data.comment && data.share && data.user &&
                        (!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)) {

                        text = self.tempates.comment(data.comment/*, self.tempates.share(data.share)*/)



                        if (text) {
                            html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + self.app.localization.e('e13338'), extra, data.time)
                        }
                    }


                    return html;

                },
                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.mesType == 'post' && data.comment && data.share && data.user &&
                            (!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)) {

                            return true
                        }

                        if (data.mesType == 'answer' && data.comment && data.share && data.user &&
                            (!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)) {

                            return true
                        }
                    }
                },

                clbks: {
                }
            },

            event: {
                loadMore: function (data, clbk, wa) {


                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.sdk.users.storage[data.addrFrom] || {}

                            data.user.address = data.addrFrom

                            if (data.mesType == 'userInfo' && !wa) {
                                var me = platform.sdk.users.storage[platform.sdk.address.pnet().address];

                                if (me) {

                                    delete me.temp
                                    delete me.relay

                                    me.rc++
                                }
                            }

                            if (data.mesType == 'upvoteShare') {

                                platform.sdk.node.shares.getbyid(data.posttxid, function (s, fromcashe) {

                                    s || (s = []);

                                    if (s[0]) {
                                        data.share = s[0];

                                        if (fromcashe && !wa) {

                                            data.share.score = Number(data.share.score) + Number(data.upvoteVal)
                                            data.share.scnt = Number(data.share.scnt) + 1
                                        }
                                    }

                                    clbk()
                                })
                            }
                            else {

                                if ((data.mesType == 'subscribe' || data.mesType == 'unsubscribe') && !wa) {
                                    var u = platform.sdk.users.storage[data.addrFrom];

                                    var me = platform.sdk.users.storage[platform.sdk.address.pnet().address];


                                    if (me) {

                                        if (data.mesType == 'subscribe') {
                                            me.addRelation(data.addrFrom, 'subscribers')
                                        }

                                        if (data.mesType == 'unsubscribe') {
                                            me.removeRelation(data.addrFrom, 'subscribers')
                                        }
                                    }

                                    if (u) {

                                        if (data.mesType == 'subscribe') {

                                            u.addRelation({
                                                adddress: platform.sdk.address.pnet().address,
                                                private: false
                                            })
                                        }

                                        if (data.mesType == 'unsubscribe') {

                                            u.removeRelation({
                                                adddress: platform.sdk.address.pnet().address,
                                                private: false
                                            })
                                        }

                                    }
                                }

                                clbk()
                            }


                        })

                        return
                    }

                    clbk()
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet',
                    if: function (data) {

                        if (data.mesType == 'upvoteShare' && data.share) {

                            if (data.upvoteVal > 2 && (!platform.sdk.usersettings.meta.upvotes || platform.sdk.usersettings.meta.upvotes.value)) {

                                return true

                            }
                        }

                        if (data.mesType == 'subscribe') {
                            if ((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.upvotes.followers)) {
                                return true
                            }
                        }

                        if (data.mesType == 'userInfo') {

                            if ((!platform.sdk.usersettings.meta.rescued || platform.sdk.usersettings.meta.rescued.value)) {

                                return true

                            }


                        }



                        return false;
                    }
                },

                fastMessageEvents: function (data, message) {

                    if (data.mesType == 'subscribe' && data.user) {

                        message.el.find('.subscribe').on('click', function () {


                            var be = $(this)

                            if (be.hasClass('disabled')) return;

                            be.addClass('disabled');

                            platform.api.actions.subscribe(data.user.address, function (tx, error) {
                                if (tx) {
                                }
                                else {
                                    self.app.platform.errorHandler(error, true)

                                    be.removeClass('disabled');
                                }
                            })
                        })

                    }


                    if (data.mesType == 'upvoteShare' && data.share) {
                        message.el.find('.sharepreview').on('click', function () {

                            platform.sdk.node.shares.getbyid(data.posttxid, function (s, err, p, fromcashe) {

                                platform.app.nav.api.load({
                                    open: true,
                                    href: 'post?s=' + data.posttxid,
                                    inWnd: !isMobile(),
                                    history: isMobile(),
                                    clbk: function (d, p) {
                                        app.nav.wnds['post'] = p
                                    },

                                    essenseData: {
                                        share: data.posttxid
                                    }
                                })

                            })

                        })

                    }
                },
                notificationData: function (data) {
                    var n = {};

                    

                    if (data.mesType == 'userInfo') {
                        n.text = self.app.localization.e('e13339')
                        n.topic = 'rescued'

                        n.caption = self.app.localization.e('e13340')
                    }

                    if (data.mesType == 'subscribe' && data.user) {
                        n.text = self.tempates._user(data.user) + ' ' + self.app.localization.e('e13341')
                        n.topic = 'followers'
                        n.caption = self.app.localization.e('e13342')
                    }


                    if (data.mesType == 'upvoteShare' && data.share && data.user) {

                        if (data.upvoteVal > 2) {

                            n.text = self.tempates._user(data.user) + " "+self.app.localization.e('e13343')+", " + data.upvoteVal + ' ★'
                            n.topic = 'upvotes'
                            n.caption = self.app.localization.e('e13344')
                        }
                    }



                    if (_.isEmpty(n))
                        return null;

                    return n
                },
                fastMessage: function (data) {

                    var text = '';
                    var html = '';
                    var caption = '';
                    var extra = '';

                    if (data.user && data.user.address){

                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }
                        
                    }

                    if (data.mesType == 'userInfo') {

                        if ((!platform.sdk.usersettings.meta.rescued || platform.sdk.usersettings.meta.rescued.value)) {

                            //text = platform.app.localization.e('refferalUserMessage')

                            /*text = ''
                            caption = platform.app.localization.e('refferalUserMessage')
                            extra = self.tempates.subscribe(data.user)*/

                        }
                    }


                    if (data.mesType == 'subscribe') {
                        if ((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.followers.value)) {

                            text = ''
                            caption = platform.app.localization.e('subscribeUserMessage')
                            extra = self.tempates.subscribe(data.user)

                        }
                    }


                    if (data.mesType == 'upvoteShare' && data.share) {

                        var tkey = 'upvoteShareMessage'

                        if (

                            (data.upvoteVal <= 2 && platform.sdk.usersettings.meta.downvotes.value && 2 == 1) ||
                            
                            (data.upvoteVal > 2 &&  platform.sdk.usersettings.meta.upvotes.value) 
                            
                        )
                            {

                                if(data.upvoteVal <= 2){
                                    tkey = 'downvoteShareMessage'
                                }

                            var star = self.tempates.star(data.upvoteVal)

                            text = '<div class="text">' + self.tempates.share(data.share) + '</div>'
                            caption = platform.app.localization.e(tkey)
                            extra = star


                        }
                    }



                    if (caption || text) {
                        html += self.tempates.user(data.user, text || "", true, caption, extra, data.time)
                    }


                    return html;

                },

                clbks: {
                }
            },

            message: {
                loadMore: function (data, clbk, wa) {


                    if (data.address) {

                        platform.sdk.users.get([data.address], function () {

                            data.user = platform.sdk.users.storage[data.address]

                            if (data.user) {
                                data.user.address = data.address

                                clbk()
                            }
                        })

                    }
                },

                refs: {

                },
                audio: {
                    unfocus: 'water_droplet'
                },

                fastMessageEvents: function (data, message) {

                    message.el.find('.tochat').on('click', function () {

                    })

                },

                fastMessage: function (data) {

                    var text = '';
                    var html = '';

                    if (data.user && data.user.address){
                        var me = platform.sdk.user.me()
                        if (me && me.relation(data.user.address, 'blocking')) {
                            return html
                        }
                        
                    }

                    text = self.tempates.subscribe(data.user, self.app.localization.e('e13345'))

                    html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true)


                    return html;

                },

                clbks: {
                }
            }
        }

        var auth = function (clbk, proxy) {

            app.user.isState(function (state) {

                if (state) {

                    self.addAccount(null, clbk, proxy)

                }
                else {
                    if (clbk)
                        clbk(false)
                }


            })
        }

        var reconnect = function () {


            if (closing) {
                return;
            }

            closing = false;
            //lost = platform.currentBlock;

            self.close();

            initconnection();
        }

        self.reconnect = reconnect

        var initconnection = function (clbk) {

            platform.app.api.get.currentwss().then(wss => {

                socket = wss.dummy || (new ReconnectingWebSocket(wss.url));

                socket.onmessage = function (message) {

                    message = message.data;

                    var jm = message;

                    try { jm = JSON.parse(message || "{}"); } catch (e) {}
                    
                    if (jm){

                        if (jm.type == 'proxy-message-tick'){

                            return wss.proxy.system.tick(jm.data)
                        }

                        if (jm.type == 'changenode'){

                            //wss.proxy.changeNode(jm.data.node)

                            return

                        }

                        if (jm.type == 'proxy-settings-changed'){

                            return wss.proxy.changed(jm.data)
                            
                        }


                        self.messageHandler(jm);

                    }

                        

                };

                socket.onopen = function () {

                    self.connected = {};

                    self.getMissed()

                    lost = platform.currentBlock || 0;

                    opened = true;

                    auth(null, wss.proxy)

                    if (clbk)
                        clbk()
                }

                wss.proxy.clbks.changed.wss = function(){

                    reconnect()
                }

                socket.onclose = function(){
                    delete wss.proxy.clbks.changed.wss
                }

                if(socket.init) socket.init()
                
            }).catch(e => {

                if (clbk)
                    clbk(e)

            })


            
        }

        var destroyMessage = function (message, time, noarrange, destroyUser) {

            if (message.timeout)
                clearTimeout(message.timeout);

            if (platform.focus) {

                message.timeout = setTimeout(function () {

                    message.el.fadeOut(300)

                    setTimeout(function () {

                        message.el.remove();

                        removeEqual(self.fastMessages, {
                            id: message.id
                        })

                        if (message.destroyclbk && destroyUser) {
                            message.destroyclbk()
                        }

                        if (!noarrange)
                            arrangeMessages()

                    }, 300)

                }, time)
            }

            else {
                setTimeout(function () {
                    destroyMessage(message, time, noarrange)
                }, 100)

            }

        }

        var arrangeMessages = function(){

			var offset = 0;

			var maxCount = 4;

			var boffset = 0;

			if(isMobile()){
				maxCount = 1;
			}
			else
			{
				/*if (typeof _Electron == 'undefined') {
                    boffset = 60;
                }*/
			}

			offset = offset + boffset

			var remove = self.fastMessages.length - maxCount;

			var s = false;

			if(self.fastMessages.length >= maxCount){
				_.each(self.fastMessages, function(m, i){

					if(!isMobile() && !m.expanded && !m.el.hasClass('smallsize')){

						m.el.addClass('smallsize');

						s = true
					}

				})
			}

			setTimeout(function(){
				_.each(self.fastMessages, function(m, i){

					if(i < remove){
						destroyMessage(m, 1, true)
					}

					else
					{
						if(!isMobile()){
							offset += 10;
						}

						if(!isMobile())

							m.el.css('bottom', offset + 'px');

						offset += m.el.outerHeight();
					}

				})
			}, s ? 300 : 3)


		}

        self.getMissed = function () {

            if (lost < 1 || self.loadingMissed) return Promise.resolve()

            self.loadingMissed = true;

            return platform.sdk.node.get.timepr().then(r => {


                return platform.sdk.missed.get(lost)

            }).then(({block, notifications}) => {

                self.messageHandler(block, function () {
                    self.loadingMissed = false;

                    lost = 0;

                    if(!notifications) return
                    
                    lazyEach({
                        array: notifications,
                        action: function (p) {
                            self.messageHandler(p.item, p.success)
                        },

                        all: {
                            success: function () {
                            }
                        }
                    })

                })
                
            }).catch(e => {

                self.loadingMissed = false;

                return Promise.reject(e)
            })

            
        }

        self.destroyMessages = function () {
            _.each(self.fastMessages, function (message, i) {
                destroyMessage(message, 1)
            })
        }

        self.fastMessage = function (html, destroyclbk) {
            var id = makeid(true);

            html = '<div class="fastMessage" id="' + id + '">\
            <div class="fmCnt">' + html + '</div>\
            <div class="close">\
                <i class="fa fa-times" aria-hidden="true"></i>\
            </div>\
            </div>';

            $('body').append(html);

            var el = $('#' + id);

            var message = {
                id: id,
                el: el,
                html: html,
                destroyclbk: destroyclbk
            }

            bgImages(el)


            self.fastMessages.push(message);

            platform.app.nav.api.links(null, el, function () {
                destroyMessage(message, 1)
            });

            destroyMessage(message, 5000, false, true);

            message.el.on('mouseenter', function () {
                clearTimeout(message.timeout);
            })

            message.el.on('click', function(){

				if(!message.expanded){

					message.el.removeClass('smallsize');

					message.expanded = true

					arrangeMessages();

					setTimeout(function(){
						arrangeMessages();
					}, 300)
				}

			})

            message.el.on('mouseleave', function () {
                destroyMessage(message, 5000, false, true);
            })

            message.el.find('.close').on('click', function () {
                destroyMessage(message, 1, false, true);
            })

            if (isMobile()) {
                var parallax = new SwipeParallax({
                    //prop : 'position',
                    el: message.el,
                    directions: {
                        up: {
                            trueshold: 50,
                            positionclbk: function (px) {
                                var percent = Math.abs((70 + px) / 70);

                                if (percent > 0) {

                                    //progress.update(percent * 100);

                                    message.el.css('opacity', percent)
                                }

                            },

                            clbk: function () {

                                message.el.remove()

                                destroyMessage(message, 1, false, true);

                            }

                        }
                    }

                }).init()
            }

            arrangeMessages();



            return message
        }

        self.messageHandler = function (data, clbk) {

            data || (data = {})

            if (data.msg || data.mesType) {

                var m = null;

                if (data.msg == 'transaction' && data.mesType) {
                    data.type = data.mesType
                    delete data.mesType
                }

                if (data.mesType) m = self.messages[data.mesType]
                if (data.msg && !m) m = self.messages[data.msg]

                if (!m) m = {}

                if (m.checkHandler) {
                    if (!m.checkHandler(data, m)) {
                        return
                    }
                }

                if (data.txid) {

                    if (txidstorage[data.txid]) return;

                    txidstorage[data.txid] = true


                    if (platform.sdk.notifications.find(data.txid)) return
                }



                var clbks = function (loadedData) {

                    data.loadedData = true;

                    var audio = deep(m, 'audio')

                    _.each(m.clbks, function (clbk) {
                        clbk(data, loadedData);
                    })

                    if (!_Node) {
                        if (audio && !window.cordova) {

                            if (!audio.if || audio.if(data, loadedData)) {

                                if (audio.focus && platform.focus) {

                                    ion.sound.play(audio.focus);
                                }


                                if (audio.unfocus && !platform.focus) {

                                    ion.sound.play(audio.unfocus);
                                }

                            }


                        }

                        if (m.fastMessage && !m.refs.all && !m.refs[data.RefID]) {

                            var html = m.fastMessage(data, loadedData);


                            if (html) {

                                if(!self.showedIds[data.txid]) {
                                    self.showedIds[data.txid] = true


                                    var message = self.fastMessage(html, function () {
                                        platform.sdk.notifications.seen([data.txid])
                                    });

                                    if (m.fastMessageEvents) {
                                        m.fastMessageEvents(data, message)
                                    }

                                    data.loaded = true

                                    platform.sdk.notifications.addFromWs(data)

                                    if (typeof _Electron != 'undefined' && !platform.focus && message.html) {
                                        electron.ipcRenderer.send('electron-notification', message.html);
                                    }

                                }
                                else {
                                    return
                                }




                            }


                        }

                        if (m.header && !platform.focus && platform.titleManager) {

                            var t = m.header(data);

                            if (t)

                                platform.titleManager.add(t)

                        }
                    }



                    if (clbk)
                        clbk()

                }

                if (m.loadMore) {
                    m.loadMore(data, clbks);
                }

                else {
                    clbks();
                }

            }
        }

        self.send = function (message) {

            if (socket) {
                try {
                    socket.send(message);
                }
                catch (e) {

                }
            }

        }

        self.close = function () {

            if (closing) return

            closing = true;
            opened = false;
            wait = null;


            self.connected = {};

            if (socket) {
                socket.close()
            }

            socket = null;

            closing = false;

        }

        self.destroy = function () {
            self.close()

            self.loadingMissed = false;
            lost = 0;
        }


        /////////

        self.wait = function (address, clbk) {
            retry(function () {
                if (!wait || !wait[address]) {
                    return true
                }

                if (Math.floor((new Date().getTime()) / 1000) > wait[address] + 1) {
                    return true
                }

                if (self.connected[address]) return true;
            }, clbk)
        }

        self.addAccount = function (keyPair, clbk, proxy) {

            if (!keyPair) {
                keyPair = platform.app.user.keys();
            }

            var key = platform.sdk.address.pnet(keyPair.publicKey).address + 'addressesNum'

            var num = localStorage[key] || 1;

            var keyPairs = [{
                kp: keyPair,
                n: 0
            }];


            self.addAddresses(keyPairs, clbk, proxy)

        }

        self.addAddresses = function (keyPairs, clbk, proxy) {

            var success = 0;

            lazyEach({
                array: keyPairs,
                sync: true,
                action: function (p) {
                    self.addAddress(p.item.kp, p.item.n, function (r) {

                        if (r)
                            success++;

                        p.success()
                    }, proxy)
                },

                all: {
                    success: function () {
                        if (clbk)
                            clbk(success != 0)

                    }
                }
            })
        }

        self.addAddress = function (keyPair, n, clbk, proxy) {

            /*if(!keyPair){
                keyPair = platform.app.user.keys();
            }*/

            var address = '';

            if (!n) {
                address = platform.sdk.address.pnet(keyPair.publicKey).address
            }
            else {
                address = platform.sdk.address.wallet(n, keyPair.privateKey).address
            }

            if (self.connected[address]) {

                if (clbk)
                    clbk(true)

                return
            }

           

            var message = {

                signature : platform.app.user.signature(),
                address: address,
                device: platform.app.options.device,
                block: platform.currentBlock || 0,
                node : proxy.current ? proxy.current.key : null
            }

            platform.sdk.system.nodeex(message)

            if (!wait)
                wait = {};

            wait[address] = Math.floor((new Date().getTime()) / 1000);

            self.wait(address, function () {
                if (self.connected[address]) {

                    if (clbk)
                        clbk(true)
                }
                else {
                    if (clbk)
                        clbk(false)
                }
            })

            self.send(JSON.stringify(message))
        }

        self.removeAddresses = function (addresses) {

            _.each(addresses, function (i, a) {
                self.removeAddress(a)
            })
        }

        self.removeAccount = function () {
            self.destroy()
        }

        self.removeAddress = function (address) {

            var message = {
                msg: "unsubscribe",
                addr: address
            }

            delete self.connected[address]
            delete wait[address]

            self.send(JSON.stringify(message))
        }

        /////////

        self.init = function (clbk) {

            if(!_OpenApi){

                closing = false;
                self.onlineCheck = true;

                if (!_Node)

                    self.onlineCheck = deep(window, 'navigator.onLine') || false;

                self.online = self.onlineCheck;
                self.connected = {};

        
                initconnection();

            }

            if (clbk)
                clbk()

        }

        /*setTimeout(function(){

			self.messageHandler(
				{"addr":"PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82","msg":"event","txid":"87973d606381aa8d11dfd45b089ad441c0f9546ec16d58a413252c62ce603235","time":1613218605,"addrFrom":"PP582V47P8vCvXjdV3inwYNgxScZCuTWsq","mesType":"upvoteShare","posttxid":"f2c6f75ba47c6da07d375dc2d7e81f4ae57b63c9796adea027730bd9e694dd91","upvoteVal":"5","node":"185.148.147.15:38081:8087"}
			)

		}, 4000)*/
    }

    self.convertUTCSS = function (str) {

        var d = utcStrToDate(str);

        if (self.timeDifference) {

            d.addSeconds(- self.timeDifference)
        }

        return convertDate(dateToStr(d))
    }

    self.convertUTCSSrel = function (str) {

        var d = utcStrToDate(str);

        if (self.timeDifference) {

            d.addSeconds(- self.timeDifference)
        }

        return app.reltime(d)
    }

    self.currentTimeSS = function () {
        var created = new Date()

        if (self.timeDifference) {

            created.addSeconds(self.timeDifference)
        }

        return dateToStrUTCSS(created)
    }

    self.currentTime = function () {
        var created = Math.floor((new Date().getTime()) / 1000)

        if (self.timeDifference) {
            created += self.timeDifference
        }

        return created;
    }

    self.Cryptography = function (platform) {

        var self = this;
        var mk;
        var mk256;
        var iv = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
        var crypto;
        var currentRsaKeys = null;

        var check = '0101010101010101'

        if (typeof window != 'undefined') {
            crypto = window.crypto || window.msCrypto;
        }
        else {
            crypto = _crypto
        }

        self.helpers = {
            keyFromString: function (key, l, clbk) {

                if (_Node) {
                    var derivedKey = PBKDF2.pbkdf2Sync(key, 'helper', 1, 32, 'sha512')

                    clbk(key)

                }
                else {
                    var mypbkdf2 = new PBKDF2(key, 'helper', 1, l);

                    mypbkdf2.deriveKey(null, function (key) {
                        clbk(key)
                    });
                }

            },

            keyForAes: function (key, clbk) {

                var _clbk = function (key) {

                    if(!crypto.subtle){
                        if (clbk)
                            clbk('')
                        return  
                    }

                    crypto.subtle.importKey(
                        "raw",
                        aesjs.utils.utf8.toBytes(key),
                        {   //this is the algorithm options
                        name: "AES-CBC",
                    },
                        false,
                        ["encrypt", "decrypt"]
                    )
                        .then(function (key) {

                            if (clbk)
                                clbk(key)

                        })
                        .catch(function (err) {
                            console.log(err)
                        });
                }

                if (key.length >= 128) {
                    _clbk(key)
                }
                else {
                    self.helpers.keyFromString(key, 16, function (key) {

                        _clbk(key)

                    })
                }


            }
        }

        self.api = {
            random: {
                crypto: function (clbk, bits) {

                    bits || (bits = 256)

                    var random_num = new Uint8Array(bits / 8);

                    if (crypto.getRandomValues) {

                        crypto.getRandomValues(random_num);
                    }

                    else {
                        getRandomValues(random_num);
                    }



                    var str = aesjs.utils.hex.fromBytes(random_num)

                    if (clbk) {
                        clbk(str)
                    }

                    return str;
                }
            },


            rsa: {

                settings: {
                    hashL: "256",
                    name: "RSA-OAEP",
                    length: 4096
                },
                createKeys: function (clbk) {
                    var settings = this.settings;

                    crypto.subtle.generateKey(
                        {
                        name: settings.name,
                        modulusLength: settings.length, //can be 1024, 2048, or 4096
                        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                            hash: { name: "SHA-" + settings.hashL }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                    },
                        true, //whether the key is extractable (i.e. can be used in exportKey)
                        ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
                    )
                        .then(function (keys) {

                            if (clbk)
                                clbk(keys)
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                exportKeys: function (keys, clbk) {
                    var k = ['public', 'private'];
                    var exporting = {};
                    var m = this.exportKey;

                    lazyEach({
                        array: k,
                        synk: true,
                        action: function (p) {

                            m(keys[p.item + 'Key'], p.item, function (keydata) {

                                exporting[p.item] = keydata;

                                p.success();
                            })
                        },

                        all: {
                            success: function () {
                                if (clbk)
                                    clbk(exporting)
                            }
                        }
                    })
                },
                exportKey: function (key, pp, clbk) {

                    var m = 'jwk'

                    if (pp == 'public') { m = 'spki' }
                    if (pp == 'private') { m = 'pkcs8' }

                    crypto.subtle.exportKey(
                        m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
                        key //can be a publicKey or privateKey, as long as extractable was true
                    )
                        .then(function (keydata) {
                            //returns the exported key data

                            if (clbk)
                                clbk(convertArrayBufferToString(keydata))

                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                importKeys: function (importing, clbk) {
                    var k = ['public', 'private'];

                    var m = this.importKey;
                    var keys = {}

                    lazyEach({
                        array: k,
                        action: function (p) {

                            m(importing[p.item], p.item, function (key) {

                                keys[p.item + 'Key'] = key

                                p.success();
                            })
                        },

                        all: {
                            success: function () {
                                if (clbk)
                                    clbk(keys)
                            }
                        }
                    })
                },
                importKey: function (keyH, pp, clbk) {
                    var settings = self.api.rsa.settings;

                    var _pp = [];
                    var m = 'jwk';

                    if (pp == 'public') { _pp = ["encrypt"]; m = 'spki' }
                    if (pp == 'private') { _pp = ["decrypt"]; m = 'pkcs8' }

                    crypto.subtle.importKey(
                        m, //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
                        convertStringToArrayBuffer(keyH),
                        /*{   //this is an example jwk key, other key types are Uint8Array objects
                            kty: "RSA",
                            e: "AQAB",
                            n: keyH,
                            alg: settings.name + "-" + settings.hashL,
                            ext: true,
                        },*/
                        { //these are the algorithm options
                            name: settings.name,
                            hash: { name: "SHA-" + settings.hashL }, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                        },
                        true,
                        _pp
                    )
                        .then(function (key) {

                            if (clbk)
                                clbk(key)

                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                encrypt: function (publicKey, text, clbk) {

                    //var data = aesjs.utils.utf8.toBytes(text);
                    //
                    var data = convertStringToArrayBuffer(text);

                    crypto.subtle.encrypt(
                        {
                        name: "RSA-OAEP",
                    },
                        publicKey,
                        data
                    )
                        .then(function (encrypted) {

                            if (clbk)
                                clbk(convertArrayBufferToString(encrypted))
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                },
                decrypt: function (privateKey, text, clbk) {
                    var data = convertStringToArrayBuffer(text);

                    crypto.subtle.decrypt(
                        {
                        name: "RSA-OAEP",

                    },
                        privateKey,
                        data
                    )
                        .then(function (decrypted) {


                            //returns an ArrayBuffer containing the decrypted data
                            if (clbk)
                                clbk(convertArrayBufferToString(decrypted))
                        })
                        .catch(function (err) {

                            console.error(err);

                            if (clbk)
                                clbk('')

                            //
                        });
                }
            },

            aeswc: {
                pwd: {
                    encryption: function (str, p, clbk) {

                        self.api.aeswc.encryption(str, mk, p, clbk);
                    },

                    decryption: function (str, p, clbk) {

                        self.api.aeswc.decryption(str, mk, p, clbk);

                    }
                },

                cryptoPair: function (pair, clbk) {

                    if (!pair.privateEncrypted)

                        self.api.aeswc.pwd.encryption(pair.private, {}, function (privateEncrypted) {
                            pair.privateEncrypted = privateEncrypted

                            if (clbk)
                                clbk(pair)
                        })

                    else {
                        if (clbk)
                            clbk(pair)
                    }
                },

                uncryptoPair: function (pair, clbk) {

                    if (!pair.private)

                        self.api.aeswc.pwd.decryption(pair.privateEncrypted, {}, function (private) {
                            pair.private = private

                            if (clbk)
                                clbk(pair)
                        })

                    else {
                        if (clbk)
                            clbk(pair)
                    }

                    return pair;
                },
                encryption: function (str, key, p, clbk) {

                    if (!p) p = {};

                    p.charsetEnc = (p.charsetEnc || 'utf8')
                    p.charsetDec = (p.charsetDec || 'hex')

                    var strBytes = aesjs.utils[p.charsetEnc].toBytes(str);

                    self.helpers.keyForAes(key, function (akey) {
                        crypto.subtle.encrypt(
                            {
                            name: "AES-CBC",
                                iv: new Uint8Array(iv)/*window.crypto.getRandomValues(new Uint8Array(16)),*/
                        },
                            akey, //from generateKey or importKey above
                            strBytes //ArrayBuffer of data you want to encrypt
                        )
                            .then(function (encrypted) {

                                var _encrypted = aesjs.utils[p.charsetDec].fromBytes(new Uint8Array(encrypted));

                                if (clbk)
                                    clbk(_encrypted)
                            })
                            .catch(function (err) {
                                console.error(err);
                            });
                    })
                },

                decryption: function (str, key, p, clbk) {
                    if (!p) p = {};

                    p.charsetEnc = (p.charsetEnc || 'utf8')
                    p.charsetDec = (p.charsetDec || 'hex')

                    var encryptedBytes = new Uint8Array(aesjs.utils[p.charsetDec].toBytes(str));

                    self.helpers.keyForAes(key, function (akey) {

                        if(!crypto.subtle){
                            if (clbk)
                                clbk('')

                            return 
                        }


                        crypto.subtle.decrypt(
                            {
                            name: "AES-CBC",
                            iv: new Uint8Array(iv), //The initialization vector you used to encrypt
                        },
                            akey, //from generateKey or importKey above
                            encryptedBytes //ArrayBuffer of the data
                        )
                            .then(function (decrypted) {


                                var _decrypted = aesjs.utils[p.charsetEnc].fromBytes(new Uint8Array(decrypted));

                                if (clbk)
                                    clbk(_decrypted)
                            })

                            .catch(function (err) {

                                if (clbk)
                                    clbk('')
                            });

                    })

                }
            },


        }

        self.messages = {
            chat: {
                encryptions: function (publicKeys, messages, clbk) {

                    if (!currentRsaKeys) {
                        if (clbk)
                            clbk()

                        return
                    }

                    var _ar = [];
                    var keys = _.map(messages, function (m, k) {
                        _ar.push(m)
                        return k
                    })

                    var skey = self.api.random.crypto();

                    var encryptedMessages = {};
                    var encryptedKeys = null;

                    lazyEach({
                        array: _ar,
                        action: function (p, index) {
                            var message = p.item;
                            var key = keys[index];

                            if (message) {

                                self.messages.chat.encryption(publicKeys, message, function (em) {

                                    if (em) {
                                        encryptedMessages[key] = em.message;
                                        encryptedKeys = em.keys;

                                        p.success()
                                    }

                                    else {
                                        p.fail()
                                    }



                                }, skey)
                            }
                            else {
                                encryptedMessages[key] = message;

                                p.success()
                            }

                        },
                        all: {
                            success: function () {

                                if (clbk)
                                    clbk(encryptedMessages, encryptedKeys)
                            },
                            fail: function () {

                                if (clbk)
                                    clbk()
                            }
                        }
                    })
                },
                encryption: function (publicKeys, message, clbk, skey) {

                    if (currentRsaKeys) {
                        publicKeys || (publicKeys = [])

                        publicKeys.push({
                            key: currentRsaKeys.publicKey,
                            user: platform.app.user.data.id
                        })


                        self.messages.encryption(publicKeys, check + message, clbk, skey)
                    }
                    else {
                        if (clbk)
                            clbk()
                    }



                },
                decryptions: function (skey, messages, clbk) {

                    var _ar = [];

                    var keys = _.map(messages, function (m, k) {
                        _ar.push(m)

                        return k
                    })

                    var decryptedMessages = {};

                    lazyEach({
                        array: _ar,
                        synk: true,
                        action: function (p, index) {

                            var message = p.item;
                            var key = keys[index];

                            if (message) {

                                self.messages.chat.decryption(skey, message, function (message) {

                                    decryptedMessages[key] = message;

                                    p.success()

                                })
                            }
                            else {
                                decryptedMessages[key] = message;

                                p.success()
                            }

                        },
                        all: {
                            success: function () {

                                clbk(decryptedMessages)
                            }
                        }
                    })
                },
                decryption: function (skey, encryptedMessage, clbk) {

                    if (currentRsaKeys) {
                        self.messages.decryption(currentRsaKeys.privateKey, skey, encryptedMessage, function (message) {
                            if (message.indexOf(check) === 0) {

                                message = message.substr(check.length)

                            }

                            else {
                                message = ''
                                //message = "Can't decrypt message"
                            }

                            if (clbk)
                                clbk(message)
                        })
                    }
                    else {
                        if (clbk)
                            clbk('')
                    }


                }
            },
            decryption: function (privateKey, encryptedKey, encryptedMessage, clbk) {

                var decryption = function (privateKey) {
                    self.api.rsa.decrypt(privateKey, encryptedKey, function (skey) {

                        var decryptedMessage = self.api.aeswc.decryption(encryptedMessage, skey, {}, clbk);

                    })
                }

                if (!_.isObject(privateKey)) {
                    self.api.rsa.importKey(privateKey, 'private', function (privateKey) {
                        decryption(privateKey)
                    })
                }
                else {
                    decryption(privateKey)
                }

            },
            encryption: function (publicKeys, message, clbk, skey) {
                skey || (skey = self.api.random.crypto());

                var encryptedKeys = [];

                lazyEach({
                    array: publicKeys,
                    action: function (p, index) {
                        var key = p.item.key;

                        var encryption = function (key) {

                            self.api.rsa.encrypt(key, skey, function (encryptedKey) {
                                encryptedKeys[index] = {
                                    key: encryptedKey,
                                    user: p.item.user
                                }

                                p.success();
                            })
                        }

                        if (!_.isObject(key)) {
                            self.api.rsa.importKey(key, 'public', function (key) {
                                encryption(key)
                            })
                        }
                        else {
                            encryption(key)
                        }
                    },

                    all: {
                        success: function () {

                            self.api.aeswc.encryption(message, skey, {}, function (encryptedMessage) {

                                if (clbk)
                                    clbk({
                                        keys: encryptedKeys,
                                        message: encryptedMessage
                                    })

                            });


                        }
                    }
                })
            }
        }

        self.prepare = function (clbk) {

            if(!crypto.subtle) self.disabled = true

            app.user.isState(function (state) {
                if (state) {

                    var key = app.user.private.value;

                    if (key) {

                        mk = key.toString('hex');

                        if (clbk)
                            clbk(false)

                    }

                    else {
                        if (clbk)
                            clbk('key')
                    }
                }

                else {
                    if (clbk)
                        clbk('state')
                }
            })
        }

        

        return self;
    }

    self.autoUpdater = function () {

        if (!electron) return

        var d = null;

        var updateReady = function () {

            if (!d) {
                d = dialog({
                    html: self.app.localization.e('e13347'),
                    btn1text: self.app.localization.e('dyes'),
                    btn2text: self.app.localization.e('e13348'),

                    success: function () {


                        globalpreloader(true)
                        electron.ipcRenderer.send('quitAndInstall');
                        d = null;

                        

                    },

                    fail: function () {
                        d = null;
                        setTimeout(updateReady, 86400000)
                    }
                })
            }
        }

        var updateAvailable = function () {
            if (!d) {
                if (self.app.platform.applications.ui[os()]) {
                    var _os = self.app.platform.applications.ui[os()]
                    if (_os.github && _os.github.url) {
                        d = dialog({
                            html:  self.app.localization.e('e13349'),
                            btn1text: self.app.localization.e('dyes'),
                            btn2text: self.app.localization.e('e13348'),

                            success: function () {
                                require("electron").shell.openExternal(_os.github.page);
                                d = null;
                            },

                            fail: function () {
                                d = null;
                                setTimeout(updateReady, 86400000)
                            }
                        })
                    }
                }
            }
        }

        electron.ipcRenderer.on('updater-message', function (event, data) {
            if (data.type == 'info') {
                if (data.msg == 'update-downloaded') {
                    updateReady()
                }

                if (data.msg == 'download-progress') {
                }

                if (data.msg == 'update-available' && (data.linux || data.macos)) {
                    updateAvailable()
                }
            }

            if (data.type == 'error') {
            }
        })

    }

   

    self.nodes = listofnodes || null

    self.clearStorageFast = function () {
        _.each(self.sdk, function (c, id) {

            if (id == 'users' || id == 'usersl') return;

            if (c.storage) {
                c.storage = {}
            }
        })

        self.sdk.likes.who = {};

        self.sdk.node.transactions.storage = {}
    }

    self.clearStorage = function () {
        _.each(self.sdk, function (c, id) {

            if (c.storage) {
                c.storage = {}
            }

        })

        self.sdk.search.storage = {
            all: {},
            fs: {},
            posts: {},
            users: {},
            tags : {}
        }

        self.sdk.node.shares.storage = {
            trx: {}
        }

        self.sdk.likes.who = {};

        self.sdk.node.transactions.storage = {}

        delete self.sdk.node.transactions.unspent
    }

    self.clearStorageLight = function () {

        app.platform.sdk.node.transactions.storage = {}

        _.each(app.platform.sdk.node.shares.storage, function (s, id) {
            if (id != 'trx')
                delete app.platform.sdk.node.shares.storage[id]
        })

    }

    self.clearlocal = function(){
        self.sdk.tags.storage.cloud = null

        self.sdk.newmaterials.clear()
    }

    self.clear = function (fast) {
        self.app.nav.addParameters = null;

        self.sdk.articles.storage = []

        self.sdk.notifications.clbks.seen = {};
        self.sdk.notifications.clbks.added = {};
        self.sdk.notifications.inited = false;
        self.sdk.notifications.loading = false;

        self.sdk.ustate.clbks = {};
        self.sdk.registrations.clbks = {};

        self.sdk.node.storage = { balance: {} }

        fast ? self.clearStorageFast() : self.clearStorage()

        if(app.peertubeHandler) app.peertubeHandler.clear()

        self.sdk.node.transactions.clearUnspentoptimizationInterval()

        self.sdk.node.transactions.unspentLoading = {}

        if (electron) {
            electron.ipcRenderer.send('update-badge', null);
            electron.ipcRenderer.send('update-badge-tray', null);
        }

        if (self.ws)
            self.ws.destroy()

        if (self.clientrtctemp) {
            self.clientrtctemp.destroy()
        }

        if (self.focusListener) {
            self.focusListener.destroy()
        }

        if (onlinetnterval)
            clearInterval(onlinetnterval)

        checkfeatures()

    }

    self.restart = function (clbk) {

        app.errors.clear();

        self.clear();

        app.user.isState(function (state) {
            self.prepare(clbk, state)
        })
    }

    self.update = function (clbk) {

        if (self.updating || self.preparingUser || self.preparing) return;

        self.updating = makeid()

        //// ?
        setTimeout(function () {
            self.updating = false;
        }, 90000)

        var methods = [
            'ustate.meUpdate',
            'user.meUpdate',
            'node.get.time',
            'node.transactions.checkTemps',
            'node.transactions.get.allBalanceUpdate',
            'tempmessenger.getChats'
        ]

        var progress = 10;

        lazyEach({
            array: methods,
            action: function (p) {
                var m = p.item;

                deep(self.sdk, m)(function () {
                    progress = progress + 15;
                    p.success();
                })
            },

            all: {
                success: function () {
                    if (clbk)
                        clbk();
                }
            }
        })
    }

    self.appstate = function () {

        if (self.loadingWithErrors && _.isEmpty(self.app.errors.state)) {

            self.loadingWithErrors = false;
            self.restart(function () {
                self.prepareUserData(function(){
                    self.app.reload(function () {
                    })
                })
               
            })
        }
    }

    self.directdialog = function(proxy){

        return new Promise((resolve, reject) => {

            var d = dialog({
                html:  self.app.localization.e('pdirectdialog'),
                btn1text: self.app.localization.e('dyes'),
                btn2text: self.app.localization.e('dno'),
    
                success: function () {
                    self.app.api.set.current(proxy.id).then(r => {

                        resolve()
                    }).catch(resolve)
                },
    
                fail: function () {
                    resolve()
                },

                class : 'zindex'
            })

            self.app.api.wait.ready('useexternal').then(r => {
                d.destroy()

                resolve()
            })

        })

       
    }

    self.prepare = function (clbk) {

        self.preparing = true;
        self.sdk.registrations.load();
        self.sdk.relayTransactions.load();
        self.applications = self.__applications()
        self.sdk.theme.load()
        self.sdk.system16.init()

        //self.app.platform.sdk.node.sys.load()

        setTimeout(function(){
            self.initSounds();
        }, 3000)
        
        if (self.app.errors.clbks) {
            self.app.errors.clbks.platform = self.appstate
        }

        initOnlineListener()

        self.app.api.wait.ready('use', 3000).then(r => {

            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    self.app.api.changeProxyIfNeed().then(l => {


                        if(!l){
                            var d = self.app.api.get.direct() 

                            if (d){

                                self.directdialog(d).then(resolve)

                                return
                            }
                        }

                        resolve()

                    }).catch(reject)
                }, 50)
            })

        }).then(r => {


            self.ws = new self.WSn(self);

            self.firebase = new self.Firebase(self);

            self.state.load();

            self.focusListener = self.FocusListener(self);
            self.focusListener.init();
            self.titleManager = new self.TitleManager();
            self.sdk.captcha.load()
            self.sdk.tags.getfastsearch()
            self.sdk.node.get.time()
            self.sdk.videos.init()

            self.preparing = false;

            self.prepareUser(clbk);

            if (typeof PeerTubePocketnet != 'undefined'){
                self.app.peertubeHandler = new PeerTubePocketnet(self.app);
                self.app.peertubeHandler.init()
            }

        }).catch(e => {
            console.log("ERROR", e)
        })

    }

    self.prepareUserData = function(clbk){



        lazyActions([

            self.sdk.node.transactions.loadTemp,
            self.sdk.ustate.meUpdate,
            self.firebase.init,
            self.sdk.tempmessenger.init,
            self.sdk.user.meUpdate,
            self.sdk.categories.load,
            self.sdk.activity.load,
            self.sdk.node.shares.parameters.load,
            

        ], function () {

            self.loadingWithErrors = !_.isEmpty(self.app.errors.state)

           

            if (self.loadingWithErrors)
                self.sdk.notifications.init().catch(e => {})

            if(clbk) clbk()
        })
    }

    var checkfeatures = function(){
        var pnet = self.app.platform.sdk.address.pnet()

        self.app.user.features.telegram = 0;
        self.enablePeertube = false

        if (pnet){

            var a = pnet.address;

            var addresses = self.testchataddresses;

            var peertubeAddresses = self.testaddresses;

            if (peertubeAddresses.indexOf(self.sdk.address.pnet().address) > -1) {

                self.enablePeertube = true
            }

            if (addresses.indexOf(a) > -1) {
                self.app.user.features.telegram = 1;
            } else {
                self.app.user.features.telegram = 0;
            }
        }
    }

    self.prepareUser = function (clbk) {

        self.preparingUser = true;

        self.matrixchat.destroy()

        checkfeatures()

        app.user.isState(function(state){

            if (state) {

                lazyActions([

                    self.sdk.node.transactions.loadTemp,
                    self.sdk.addresses.init,
                    
                    self.sdk.ustate.me,
                    self.sdk.usersettings.init,
                    self.sdk.imagesH.load,
                    
                    self.ws.init,
                    self.firebase.init,
                    
                    //self.sdk.exchanges.load,
                    self.sdk.categories.load,
                    self.sdk.activity.load,
                    self.sdk.node.shares.parameters.load,
                    self.sdk.node.transactions.checkTemps,
                    self.sdk.user.get
                ], function () {

                    self.sdk.node.transactions.setUnspentoptimizationInterval()

                    self.sdk.relayTransactions.send()

                    self.matrixchat.init()

                    self.preparingUser = false;

                    self.loadingWithErrors = !_.isEmpty(self.app.errors.state)

                    if (clbk)
                        clbk()

                    setTimeout(function(){

                        lazyActions([
                            self.cryptography.prepare,
                            self.sdk.pool.init,
                            self.sdk.articles.init,
                            self.sdk.tempmessenger.init,
                            self.sdk.chats.load,
                            self.sdk.user.subscribeRef
                        ], function(){
            
                        })


                        console.log("INITKEYS")

                        /*self.sdk.keys.init().then(r => {
                            console.log("RSUCCESS", r)
                        }).catch(r => {
                            console.log("RFAIL", r)
                        })*/
                        
                    

                        if (self.loadingWithErrors)
                            self.sdk.notifications.init().catch(e => {})
                        
                    }, 2000)
                    

                })
            }
            else {

                self.preparingUser = false;

                if (clbk)
                    clbk()
            }

        })

        
        
    }

    self.matrixchat = {
        inited : false,
        initing : false,
        destroy : function(){
            if (window.matrixchat){
                window.matrixchat.destroy()
            }
    
            $('#matrix').empty();

            self.matrixchat.inited = false
        },


        import : function(clbk){

            if (self.matrixchat.imported){
                if(clbk) clbk()
            }
            else{
                self.matrixchat.imported = true;

                importScript('chat/matrix-element.min.js', clbk)
            }

            
        },

       

        init : function(){

            if(self.matrixchat.inited) return
            if(self.matrixchat.initing) return

            self.matrixchat.initing = true
            
            app.user.isState(function(state){

                self.matrixchat.initing = false

                if (state) {

                    var pnet = self.app.platform.sdk.address.pnet()

                    var a = pnet.address;

                    var addresses = self.testchataddresses;

                    if (addresses.indexOf(a) > -1 || window.testpocketnet) {

                        if (!isMobile()){


                            self.matrixchat.import(function(){

                                self.matrixchat.inited = true
        
                                var privatekey = self.app.user.private.value.toString('hex');
                    
                                var matrix = `<div class="wrapper">
                                    <matrix-element
                                        address="${a}"
                                        privatekey="${privatekey}"
                                        pocketnet="true"   
                                    >
                                    </matrix-element>
                                </div>`
            
                                $('#matrix').append(matrix);   
                                
                            }, null, app);

                                  
                            
                        }
        
                    }
                }
            })
        },

        link : function(core){


            core.update({
                block : self.currentBlock
            })


            self.app.platform.ws.messages["newblocks"].clbks.newsharesLenta = 
            self.app.platform.ws.messages["new block"].clbks.matrixchat = function(){

                core.update({
                    block : self.currentBlock
                })

            }
        },

        unlink : function(){
            delete self.app.platform.ws.messages["new block"].clbks.matrixchat
        }
    }

    self.initSounds = function () {

        if (typeof ion != 'undefined'){
            ion.prepare()
            ion.sound({
                sounds: [ { name: "water_droplet"}, { name: "glass" } ],
                volume: 0.5,
                path: "js/vendor/ion.sound/sounds/",
                preload: true
            });

        }

           
    }

    self.FocusListener = function (platform) {

        var self = this;

        var unfocustime = null;

        var fpauseel = function (e) {
            fpause(e)
        }

        var fpause = function (e) {
            f(e, true)
        }

        var f = function (e, resume) {

            var focustime = platform.currentTime()
            var time = focustime - (unfocustime || focustime)

            self.focus = true;

            if (time > 120 && (window.cordova || electron || isInStandaloneMode())) {
                self.clearStorageLight()

                self.sdk.node.transactions.get.allBalance(null, true)
                self.sdk.notifications.getNotifications().catch(e => {})
            }

            self.clbks.focus(time);

            if (self.titleManager) {
                self.titleManager.clear();
            }

        }

        var ufel = function () {

            uf()
        }

        var uf = function () {
            self.focus = false;

            unfocustime = platform.currentTime()
        }

     

        window.focus();

        self.focus = true;

        var inited = false;


        self.init = function () {
            inited = true;

            if (window.cordova) {

                document.addEventListener("pause", uf, false);
                document.addEventListener("resume", f, false);

                return
            }


            if (electron) {

                var w = electron.remote.getCurrentWindow();

                w.on('hide', uf)
                w.on('minimize', uf)
                w.on('restore', f)

                electron.ipcRenderer.on('pause-message', ufel)
                electron.ipcRenderer.on('resume-message', f)

            }

            $(window).on('focus', f);
            $(window).on('blur', uf);

        }

        self.destroy = function () {
            if (!inited) return

            inited = false;

            if (window.cordova) {

                document.removeEventListener("pause", uf, false);
                document.removeEventListener("resume", f, false);

                return
            }


            if (electron) {

                var w = electron.remote.getCurrentWindow();

                w.off('hide', uf)
                w.off('minimize', uf)
                w.off('restore', f)

                electron.ipcRenderer.off('pause-message', ufel)
                electron.ipcRenderer.off('resume-message', fpauseel)

            }

            $(window).off('focus', f);
            $(window).off('blur', uf);


        }


        return self;
    }

    var initOnlineListener = function () {

        onlinetnterval = retry(function () {

            var online = deep(window, 'navigator.onLine');

            if (self.online != online) {

                self.online = online;

                return true;

            }


        }, function () {

            if (!self.online) {
                _.each(self.clbks.online, function (c) {
                    c(false)
                })
            }
            else {
                _.each(self.clbks.online, function (c) {
                    c(true)
                })
            }

            initOnlineListener();

        }, 50)

    }

    self.TitleManager = function () {
        var self = this;

        var initial = '';
        var interval = null;

        self.add = function (text) {

            text = $('<div>').html(text).text()

            if (interval)
                clearInterval(interval);

            if(!initial) {
                initial = document.title || "Pocketnet"
            }

            var i = 0;

            interval = setInterval(function () {

                i++;

                if (i % 2) {
                    document.title = text;
                }
                else {
                    document.title = initial;
                }

            }, 700)
        }

        self.clear = function () {

            if (interval)
                clearInterval(interval);

            interval = null;

            if (initial) {
                document.title = initial;
            }

            initial = '';
        }


        return self;
    }

    self.state = {
        save: function () {
            if (self.nodeid)
                localStorage['nodeid2'] = JSON.stringify(self.nodeid);

            else
                delete localStorage['nodeid2']

        },
        load: function () {

            if (self.nodes && self.nodes.length) {

                try {
                    self.nodeid = JSON.parse(localStorage['nodeid2'])
                }
                catch (e) { }


                if (!self.nodeid) {
                    self.nodeid = self.nodes[0]
                }

            }

        }
    }


    self.navManager = function(){

        if(electron && _Electron){

            electron.ipcRenderer.on('nav-message', function (event, data) {
                if (data.type == 'action') {
                    var route = data.msg


                    self.app.nav.api.load({
                        open: true,
                        href: route,
                        history: true
                    })
                }
    
            
            })

        }
       

    }

    self.navManager()

    self.app = app;

    if (typeof HTLS != 'undefined')
        self.htls = new HTLS()

    self.cryptography = new self.Cryptography();

    self.autoUpdater()

   

    return self;

}


if (typeof module != "undefined") {
    module.exports = Platform;
}

topPreloader(65);