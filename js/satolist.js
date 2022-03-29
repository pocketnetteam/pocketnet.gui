var electron = null, fs, url, path, https;
if (typeof _OpenApi == 'undefined') _OpenApi = false;

if (typeof _Electron != 'undefined') {
    electron = require('electron');
    
    bastyonFsFetchFactory = require('./js/peertube/bastyon-fs-fetch').bastyonFsFetchFactory;
    transcodingFactory = require('./js/electron/transcoding').transcodingFactory;
    
    fs = require('fs');
    url = require('url');
    https = require('https');
    path = require('path');

    var storage = electron.OSBrowser; //?

    $('html').addClass('electron')
}


/*

    {
        NOT_SUPPORTED = 0,

        TX_DEFAULT = 1,
        TX_COINBASE = 2,
        TX_COINSTAKE = 3,

        ACCOUNT_USER = 100,
        ACCOUNT_VIDEO_SERVER = 101,
        ACCOUNT_MESSAGE_SERVER = 102,
        ACCOUNT_SETTING = 103,

        CONTENT_POST = 200,
        CONTENT_VIDEO = 201,
        CONTENT_ARTICLE = 202,
        // CONTENT_SERVERPING = 203,

        CONTENT_COMMENT = 204,
        CONTENT_COMMENT_EDIT = 205,
        CONTENT_COMMENT_DELETE = 206,

        CONTENT_DELETE = 207,

        BOOST_CONTENT = 208,

        ACTION_SCORE_CONTENT = 300,
        ACTION_SCORE_COMMENT = 301,

        ACTION_SUBSCRIBE = 302,
        ACTION_SUBSCRIBE_PRIVATE = 303,
        ACTION_SUBSCRIBE_CANCEL = 304,

        ACTION_BLOCKING = 305,
        ACTION_BLOCKING_CANCEL = 306,

        ACTION_COMPLAIN = 307,
    };

*/


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
        'PVJDtKPnxcaRDoQhqQj7FMNu46ZwB4nXVa' : true,
        'PVjvMwapTA29biRTsksXUBuVVf2HVwY7ps' : true,
        'PKSV2KXCdEtTtYb8rF3xMMgiiKe1oDstXR' : true,
        'PUqq6vksrmoMPRrRjZxCVQefqGLpuaqWii' : true,
        'PMtmtctmBD9nHJFzmfXJR1G2busp8CjASs' : true,
        'PNUMTC5CTH3F5LfQpkmj3MXcDnGNKTU4ov' : true,
        'PSWR1jHNocGVVVFE3aoxFh8G85SQK3G9Ta' : true,
        'PJuW8LKT7LZY88fP7WM35NJURh3rAaeU3o' : true,
        'PGCTymXHcEydV8SSmoABTB8YEchJbDoRJn' : true,
        'PDXGoy43t5RSqJY1UJBgswBu6phtW8Knwa' : true,
        'PHqNLuNEwrw8nzj71ELVGp7w1eEp8p2pKA' : true,
        'PR3BcnBziYoDgckdyaARgFayiZUiA7agSx' : true,
        'PEbSS6Fu9fCSEzFcrW5a3ztjx5ekoYvpjx' : true,
        'PKZNLmxpsiW9H77beXt7pNWK7rTbG6Qu5h' : true,
        'PNoR5LNLAZP3VGiNcK2wn4xxAFT6yQAMqj' : true,
        'PL1wziiaQj7FLnoktuQQ1MKweYYbdcekRB' : true,
        'PMVvs8kvbskq6eVV8Q3oyjotbox9tBfvnp' : true,
        'PQ3hdiozrxtTf1UhuVfhUb9bcvrUzbzwRJ' : true,
        'PCSxAFQCRZphi9W6nrV4tSQXKFfsxdxERA' : true,
        'PGFKA1DieVsg9pQK4aBaEp5wpvaXpWtuVJ' : true,
        'PFbq1BkrrVsmEAevMqQ2PV6aFf7QWQP9sB' : true,
        'PXgYFdVs5W831WpksVLA5hNtXa7XSqUzLB' : true,
        'PSBePd5Tx5KG9vxwAzbaDTfjzDbq1GUTYw' : true,
        'PDgbAvsrS4VGKkW5rivcJaiCp7fnBoZRgM' : true,
        'PQt1eggTZKCCbjVsHx6rcMcBMU2p2PNQmt' : true,
        'PPY1UbumjHJaoxsfL7DVTPNLM4g697zdDe' : true,
        'P9nFzh2sSyeTFd1F7fFGByhB6cD886jJi5' : true,
        'PMf2RiHZiZTtQZftkxhRYbN5CgBH6dNh5A' : true,
        'PJg4gur26sCRukHcn5aoDSRZTQF5dxTMUS' : true,
        'PDz71dsW1cPwNewGHVUteFgQx3ZmBf4gaf' : true,
        'PFjWEfsm3jX81MctFU2VSJ17LGVKDc99oH' : true,
        'PBo7zu6xguzzftFE8c3Urgz4D6YVnj8oux' : true,
        'P9KXb7sS2JDjV5jnXu4t2WwwbvzYeu6yds' : true,
        'PUYEkLb6szwxjw3cq6FvLxDPmedbyd3foq' : true,
        'PU6LDxDqNBDipG4usCqhebgJWeA4fQR5R4' : true,
        'P8rnj1gSaAQJ1YkAAthSgmLKiDfspb98GP' : true,
        'PUXG7rfX19Xoco1FXjXBW8qt6NEZpp8maL' : true,
        'PSanUFKb1vd5ua4U3BXMmsSZ2zm3sN2nyj' : true,
        'PERF5kDM32ebkq8SeSj8ZaLqfCoqz8FRgh' : true,
        'PGD5jUBQ7qNnHDuW85RRBxY1msywEdCm7r' : true,
        'PApFYMrbm3kXMV7kjrEG1v6ULv6ZFDHb9j' : true,
        'PUBRMTAUhy51gkbuP1tRJLMMAzEDt9C2X6' : true,
        'P9i55BxFWpjMyqgHyCKtazDN1HDiZxTSzJ' : true,
        'PLLDTFuBhb4FRPt811bTPjgaYgqoj16hVV' : true,
        'PXmw1tQnengAAy9ML8Depr2kANupmadZ7j' : true,
        'PCkbxDvFQbFvEzPWnnrraey1QCUro2kMLU' : true,
        'PBKPEWcsZZHH7LQ7GQCNSMSSEteiJMfoFx' : true,
        'PEWQWe1DQM3uh19vRqtFDkUrPreyM5uJnS' : true,
        'PQ2wxGv2YNbie2BP66aac72Y3UU1uSzxCX' : true,
        'PE6VLUqsPYLJnX2W7qhHX6yb2zLN3H2x25' : true,
        'PEiNYu3dNM4oZDRYvSrsfy51xz7CokPYNV' : true,
        'PQk66yNJS3agLJ2k6A1AN5FmM2TNUwEgbP' : true,
        'PFpBmqET9NyQA2EHp8BPEjjKZobXUBBjjn' : true, //a 
        'PB1EShZbvkTSQgU8NLxEH8MN5UiKw1CBHb' : true,
        'PCeyj5aXETKtCYbXJxmDv3bXGawda1KEHQ' : true,
        'PWAAzRuHNi5iNxQDaJ8ZVpqEJSoPWFFiRN' : true,
        'P9XuLKA5iCiZT6epTuVWzLU23c2gedSDkc' : true,
        'PTNtirNwbe5GfgNod7rwMWLLGhYWhGyLJx' : true,
        'PUaDSBBveSUG9yieuDSYCpgsyE2djYU9N5' : true,
        'P9eLPo3gXUqBr7wgxDSSLNfyNMyeDua7cn' : true,
        'PF57cm7HGsc5djwK556uZ7AZbqk59wXxF2' : true,
        'PQ2W4ispScj349r3Gsqr1PchSVDvU59Ssf' : true,
        'PUBkQATBYhGiCvvdtHCX7GM7fdx23wdaJb' : true,
        'PJzhMENFrkp6Bopfzsf4VR46E3Znd2aoGj' : true,
        'PKp1bjJByqY76XNZNzDFkTAhyfPq4bah5V' : true,
        'PPEWFN5ETvdjc7TKqjxDPEWmZRUyPUYr8z' : true,
        'PH1yzW1qvyeq3thaFhUwv3pTA2VazhtZDT' : true,
        'PCjhy4t6B2b5xeqVoJcN51XkhUqAXBuaq4' : true,
        'PJTNch4or4Zr8cDnF3KA4eAXTqWCxYLSzu' : true
    }

    self.nvadr = {
        'PUy71ntJeRaF1NNNnFGrmC8NzkY6ruEHGK' : true,
        'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd' : true,
        'PJ3nv2jGyW2onqZVDKJf9TmfuLGpmkSK2X' : true,
        'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM' : true,
        'PU7D6X5bNUdEiuUGWGLp8C6TjSsB2hzHxL' : true,
        'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz' : true
    }


    self.testaddresses = [
        'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82',
        'PUy71ntJeRaF1NNNnFGrmC8NzkY6ruEHGK',
        'PU7D6X5bNUdEiuUGWGLp8C6TjSsB2hzHxL',
        'PP6bNhVaXy7YK19UbLHXbQPKa7oV4yx1rr',
        'TSisNge5kisi7cwGRwmUBuZQWZFD8cRoG8'
    ];

    if (window.IpcBridge)
        self.ipcbridge = new window.IpcBridge().listen()

    /*self.testchataddresses = ['PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82', 'PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM', 'PQvcVW7ZV4YPKC1QhxXdT8ppUakCejWYTA']*/
    self.testchataddresses = ['P9EkPPJPPRYxmK541WJkmH8yBM4GuWDn2m', 'PFnN8SExxLsUjMKzs2avdvBdcA3ZKXPPkF', 'PVgqi72Qba4aQETKNURS8Ro7gHUdJvju78', 'P9tRnx73Sw1Ms9XteoxYyYjvqR88Qdb8MK', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz', 'PEHrffuK9Qiqs5ksqeFKHgkk9kwQN2NeuS', 'PP582V47P8vCvXjdV3inwYNgxScZCuTWsq', 'PQxuDLBaetWEq9Wcx33VjhRfqtof1o8hDz','PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM', 'PK6Kydq5prNj13nm5uLqNXNLFuePFGVvzf', 'PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82', 'PCAyKXa52WTBhBaRWZKau9xfn93XrUMW2s', 'PCBpHhZpAUnPNnWsRKxfreumSqG6pn9RPc', 'PEkKrb7WJgfU3rCkkU9JYT8jbGiQsw8Qy8', 'PBHvKTH5TGQYDbRHgQHTTvaBf7tuww6ho7', 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd']

    self.focus = true;
    self.currentBlock = 0 //1165858;
    self.online = undefined;
    self.avblocktime = 45;
    self.repost = true;
    self.videoenabled = true;

    var bastyonhelperOpened = false
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

    // self.network = function(){
    //     if(self.test){
    //         return bitcoin.networks.testnet
    //     }
    //     else{
    //         return bitcoin.networks.bitcoin
    //     }
    // }

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
                android : {
                    appname: app.meta.fullname,
                    id: "android",
                    text: {
                        name: "Android",
                        download: self.app.localization.e('e132221'),
                        label: self.app.localization.e('e132233')
                    },

                    github: {
                        name: 'Bastyon' + ".apk",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
                    },
        
                    icon: '<i class="fab fa-android"></i>',
        
                    modile : true,
                    image : 'applications_android.png',

                    href: 'https://play.google.com/store/apps/details?id=pocketnet.app',
                    hreflabel : 'downloadplaystore',
                    githublabel : 'downloadgithub'
                },

                windows: {

                    appname: app.meta.fullname,
                    id: "windows",
                    text: {
                        name: "Windows",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e13223')
                    },

                    icon: '<i class="fab fa-windows"></i>',

                    github: {
                        name: 'Bastyon' + "Setup.exe",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
                    },
                    image : 'applications_windows.png',
                   

                    node : true
                },

                macos: {
                    appname: app.meta.fullname,
                    id: 'macos',
                    text: {
                        name: "macOS",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e132232')
                    },

                    icon: '<i class="fab fa-apple"></i>',
                    image : 'applications_macos.png',
                    github: {
                        name: 'Bastyon'+ "Setup.dmg", //app.meta.fullname + "Setup.dmg",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
                    },
                },
        
                linux: {
                    appname: app.meta.fullname,
                    id: "linux",
                    text: {
                        name: "Linux",
                        download: self.app.localization.e('e13222'),
                        label: self.app.localization.e('e13224')
                    },
        
                    image : 'applications_linux.png',
                    icon: '<i class="fab fa-linux"></i>',

                    github: {
                        name: 'Bastyon' + "Setup.deb",//  self.app.meta.fullname + "Setup.deb",
                        url: 'https://api.github.com/repos/pocketnetapp/pocketnet.gui/releases/latest',
                        page: 'https://github.com/pocketnetteam/pocketnet.gui/releases/latest'
                    },

                    node : true
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

                                    class: 'zindex one'
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

                                                class: 'zindex one'
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

                                        class: 'zindex one'
                                    })
                                }
                                else {
                                    dialog({
                                        html: self.app.localization.e('waitConf'),
                                        btn1text: self.app.localization.e('daccept'),

                                        class: 'zindex one'
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

        "313" : {
            message: function () {
                return self.app.localization.e('lockedaccount')
            }
        },

        ///// NODE


        "60": {
            message: function () {
                return self.app.localization.e('e13257_1')
            }
        },

        "49": {
            message: function(){
                return self.app.localization.e('saveSettingsLimit')
            }
        },

        "48": {
            message: function(){
                return self.app.localization.e('canSpendError')
            }
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
                return self.app.localization.e('dataenteredincorrectly')
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

                globalpreloader(true)


                self.app.platform.sdk.user.waitActions(function (r) {

                    if (!r) {

                        self.app.platform.sdk.relayTransactions.send(function(action){
                            

                            if(!action){

                                var a = self.app.platform.sdk.address.pnet().address

                                self.sdk.users.getone(a, function(){

                                    globalpreloader(false)

                                    var exist = self.sdk.users.storage[a]

                                    if(!exist){
                                        dialog({
                                            html: self.app.localization.e('checkScoreError'),
                                            btn1text: self.app.localization.e('dyes'),
                                            btn2text: self.app.localization.e('dno'),

                                            success: function () {
                                                self.app.nav.api.load({
                                                    open: true,
                                                    href: 'test',
                                                    inWnd: true
                                                })
                                            },
                                            fail: function () {

                                            },

                                            class : 'zindex'
                                        })
                                    }
                                    else{

                                        dialog({
                                            html: self.app.localization.e('waitConf'),
                                            btn1text: self.app.localization.e('daccept'),

                                            class: 'one'
                                        })



                                    }

                                }, false, true)

                            }
                            else{
                                globalpreloader(false)
                            }

                        })

                    }
                    else {

                        self.sdk.ustate.meUpdate(function(mestate){

                            globalpreloader(false)

                            if(!mestate || _.isEmpty(mestate)){

                                dialog({
                                    html: self.app.localization.e('accountnotfound'),
                                    btn1text: self.app.localization.e('daccept'),

                                    class: 'zindex one'
                                })

                            }
                            else{

                                dialog({
                                    html: self.app.localization.e('waitConf'),
                                    btn1text: self.app.localization.e('daccept'),

                                    class: 'zindex one'
                                })

                            }

                        })



                    }

                })


            },

            relay: true

        },


        "2000": {
            message: function () {
                return  self.app.localization.e('e2000')
            }
        },

        "-26": {
            message: function () {

                return self.app.localization.e('Error code: -26')

            },

            relay: true
        },

        "tosmallamount" : {

            message: function () {

                return 'Too small amount'

            },


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
                                options: graph.options,
                                ini : p
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

                if (state) {

                    self.update();

                    _.each(self.clbks._focus, function (f) {
                        f(time)
                    })

                }

            })

        },

        api: {
            actions: {
                anysubscribe : {},
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

            var tpl = `<div class="horizontalLentaWrapper"><div class="horizontalLentacaption"><span>`+(p.caption || '')+`</span><div class="controlhors"><div class="controlleft controlhor" dir="left"><i class="fas fa-arrow-left"></i></div><div class="controlright controlhor"><i class="fas fa-arrow-right"></i></div></div></div><div class="showmorebywrapper"><div class="showmoreby"></div></div>
            </div>`

            el.html(tpl)

            p.hcnt = el.find('.horizontalLentaWrapper')

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
                    openPostInWindowMobile : p.openPostInWindowMobile,
                    hasshares : function(shares){

                        if (p.hcnt){
                            setTimeout(function(){
                                p.hcnt.addClass('hasitems')
                            }, 300)

                        }

                        if(p.hasshares) p.hasshares(shares)
                    },
                    opensvi : p.opensvi,
                    from : p.from,
                    compact : p.compact,
                    r : p.r,
                    shuffle : p.shuffle,
                    page : p.page,
                    period : p.period,
                    filter : p.filter,
                    ended : p.ended,
                    afterload : p.afterload,
                    count : p.count

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

        editImage : function(src, p, clbk){

            if(!p) p = {}

            var images = [
                {
                    original : src,
                    index : 0
                }
            ]

            return new Promise((resolve, reject) => {

                app.nav.api.load({
                    open : true,
                    id : 'imageGalleryEdit',
                    inWnd : true,

                    essenseData : {
                        edit : true,
                        initialValue : 0,
                        images : images,
                        apply : p.apply,
                        crop : {
                            aspectRatio : p.aspectRatio || null,
                            style : 'apply',
                            autoCropArea : p.autoCropArea || 1,
                        },

                        success : function(i, editclbk){

                            resize(images[0].original, p.w || 1920, p.h || 1080, function(resized){
                                var r = resized.split(',');

                                if (r[1]){

                                    editclbk()

                                    resolve(resized)

                                }
                                else{
                                    reject("error")
                                }

                            })


                        }
                    }

                })
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
                            opensvi : p.opensvi,
                            minimize : p.minimize,
                            postclass : p.postclass,
                            openapi : true
                        }
                    })

                }, true)
            })

        },

        postpreview: function (share, el, clbk, p) {

            if (!p) p = {}

            app.nav.api.load({
                open: true,
                href: 'post',
                inWnd : !el && p.inWnd,
                history : !el && p.inWnd,
                el: el,
                eid: 'postpreview',
                clbk: clbk,

                essenseData: {
                    shareobj: share,
                    nocommentcaption : true,
                    eid: 'postpreview',
                    comments : 'no',
                    video : false,
                    autoplay : false,
                    preview : true,

                }
            })


        },

        connect : function(id, el, clbk, p){
            self.sdk.users.get(id, function () {

                app.nav.api.load({
                    open: true,
                    href: 'channel',
                    el: el,
                    eid: id + (p.eid || ""),
                    clbk: clbk,

                    essenseData: {
                        id : id,
                        connect : true
                    }
                })

            })
        },

        route : function(href, el, clbk, p){
            el.html('<div class="internalpocketnetlink"><a elementsid="https://'+app.options.url+'/'+href+'" href="https://'+app.options.url+'/'+href+'"><i class="fas fa-link"></i> https://'+app.options.url+'/'+href+'</a></div>')

            app.nav.api.links(null, el);

            if(clbk) clbk()
        },

        channel : function(id, el, clbk, p){

            var r = false

            id = id.replace(/[^a-zA-Z_0-9]/g, '')

            try {
                r = bitcoin.address.fromBase58Check(id);
            }
            catch (e) {
            }

            var c = function(){
                self.sdk.users.get(id, function () {

                    app.nav.api.load({
                        open: true,
                        href: 'channel',
                        el: el,
                        eid: id + (p.eid || ""),
                        clbk: clbk,

                        essenseData: {
                            id : id,
                            openapi : true
                        }
                    })

                })
            }


            if(r){ c() }

            else{

                var f = _.find(__map, function(m, i){
                    return m.href && (m.href.toLowerCase() == id.toLowerCase())
                })

                if(f){
                    self.papi.route(f.href, el, clbk, p)
                }
                else{

                    self.sdk.users.addressByName(id, function(_id){
                        id = _id
                        c()
                    })
                }


            }




        },

        transaction : function(txid, el, clbk, p){
            app.nav.api.load({
                open: true,
                href: 'transactionview',
                el: el,
                eid: makeid(),
                clbk: clbk,

                essenseData: {
                    txid : txid
                }
            })
        },

        comment : function(id, el, clbk, p, additional){

            if(!additional) additional = {}


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
                    commentPs : additional.commentPs || p.commentPs,
                    openapi : p.openapi,

                },

                clbk : clbk
            })
        },


    }

    self.ui = {

        pipvideo : function(txid, clbk, d){

            if(!d) d = {}
        
            var p = {
                href : 'post?s=' + txid,
                clbk : clbk,
                essenseData : {
                    share : txid,
                    video : true,
                    autoplay : true,
                    pip : true,
                    startTime : d.startTime || 0
                },

                expand : function(d){

                    if(!d) d = {}


                    setTimeout(function(){
                        self.app.nav.api.load({
                            open : true,
                            href : 'post?s=' + txid,
                            inWnd : true,
                            history : true,
                            essenseData : {
                                share : txid,
                                video : true,
                                autoplay : true,
                                startTime : d.startTime || 0
                            }
                        })
                    }, 100)

                    

                }
            }

            self.app.actions.playingvideo(null)
            self.app.actions.pipwindow(p)
            self.matrixchat.core.backtoapp()
        },

        popup : function(key, always, data){

			var showed = localStorage['popup_' + key] || false;

			if(!showed || always){

				app.nav.api.load({
					open : true,
					id : 'popup',

					key : key,
					inWnd : true,

					essenseData : {
						key : key,
						always : always,
						data : data
					}
				})
			}

        },

        articledecoration : function(wr, share, extend){
            var caption = wr.find('.shareBgCaption')
            var capiontextclass = 'caption_small'

            if(share.caption.length > 10) capiontextclass = 'caption_medium'
            if(share.caption.length > 60) capiontextclass = 'caption_long'

            caption.addClass(capiontextclass)

            if(extend){
                wr.find('.article_carousel').each(function(){
                    self.app.platform.ui.carousel($(this))
                })

                wr.find('.article_this_embed').each(function(){
                    self.app.platform.ui.embeding($(this))
                })
            }

            wr.find('.articleCover').imagesLoadedPN({imageAttr : true}, function (image) {

                var aspectRatio = 0.6
                var small = false

                _.each(image.images, function(img){

                    var _img = img.img;
                    aspectRatio = _img.naturalHeight / _img.naturalWidth

                    if(_img.naturalHeight < 400 || _img.naturalWidth < 400){
                        small = true
                    }

                })

                wr.addClass('ready')

                if(small){
                    caption.addClass('smallimage')
                }

                if(aspectRatio > 1 && !small){
                    caption.addClass('verticalcover')
                }

            }, self.app)
        },

        changeloc : function(_clbk){
            var items = []

            _.each(self.app.localization.available, function(a){
                items.push({
                    text : a.name,
                    action : function (clbk) {

                        var na = app.localization.findByName(a.name);

                        if (na && na.key != self.app.localization.key){

                            self.app.localization.set(na.key);
                        }

                        clbk()

                        if(_clbk) _clbk()

                    }
                })
            })

            menuDialog({
                items: items
            })
        },

        embeding : function(el){

            var h = el.attr('href')
            var w = new window.PNWIDGETS()

            w.makefromurl(el[0], h, true)

        },

        carousel : function(el, clbk){
			var images = el.find('[image]');

            var w = el.width()

            images.imagesLoadedPN({ imageAttr: true}, function (image) {

                var aspectRatio = 0

                _.each(image.images, function(img){
                    var _img = img.img;

                    var _aspectRatio = _img.naturalHeight / _img.naturalWidth

                    if(_aspectRatio > aspectRatio) aspectRatio = _aspectRatio
                })

                if (aspectRatio){

                    if(aspectRatio > 1.66) aspectRatio = 1.66

                    images.height( w * aspectRatio)
                }

                el.addClass('owl-carousel')
                el.owlCarousel({
                    items: 1,
                    dots: true,
                    nav: !self.app.mobileview,
                    navText: [
                        '<i class="fas fa-chevron-left"></i> ',
                        '<i class="fas fa-chevron-right"></i>'
                        ]

                });

                if (clbk)
                    clbk()
                
            }, self.app)


        },

        usertype : function(address){

            var dev = self.sdk.usersl.storage[address] && self.sdk.usersl.storage[address].dev

            if (dev){

                return 'dev';

            } else

            if ( self.real[address]){

                return 'real';

            }

            return ''

        },
        markUser : function(address){

            var t = self.ui.usertype(address)

            if (t == 'dev') return this.markDev();
            if (t == 'real') return this.markReal();

            return ''

        },

        markReal : function(){

            return `<div class="realperson">
                <span class="fa-stack fa-2x real">
                    <i class="fas fa-certificate fa-stack-2x"></i>
                    <i class="fas fa-check fa-stack-1x"></i>
                </span>
            </div>`
        },

        markDev : function(){

            return `<div class="realperson">
                    <span class="fa-stack fa-2x dev">
                        <i class="fas fa-certificate fa-stack-2x"></i>
                        <i class="fas fa-code fa-stack-1x"></i>
                    </span>
                </div>`

        },


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

        socialshare : function(url, p){
            if(!p) p = {}

            url = 'https://'+app.options.url+'/' + url

            app.nav.api.load({
                open : true,
                href : 'socialshare2',
                history : true,
                inWnd : true,

                essenseData : {
                    url : url,
                    caption : app.localization.e('e13133'),
                    sharing : p.sharing || null,
                    embedding : p.embedding || null,
                    notincludedRef : true,
                }
            })
        },

        share : function(p){
            if(!p) p = {}

            globalpreloader(true, true)

            const { name, description, tags } = p;

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
                        repost  : p.repost,
                        videoLink: p.videoLink,
                        name,
                        description,
                        tags,

                        dontsave : (p.repost || p.videoLink) ? true : false
                    }
                })
            }, 50)
        },

        showmykeyfast: function (p) {

            if(!p) p = {}

            app.nav.api.load({

                open: true,
                inWnd: true,
                href: 'pkview',

                essenseData: {
                    dumpkey: true,
                    showsavelabel : p.showsavelabel,
                },

                clbk: function (p, s) {

                }
            })
        },

        showmykey: function (p) {

            if (!p) p = {};

            dialog({
                html: p.text || self.app.localization.e('e13188'),
                btn1text: p.successLabel || self.app.localization.e('e13261'),
                btn2text: p.faillabel || self.app.localization.e('e13262'),

                class: 'zindex accepting accepting2 ',

                success: function () {

             
                    app.nav.api.load({

                        open: true,
                        inWnd: true,
                        history: true,
                        href: 'pkview',

                        essenseData: {
                            dumpkey: true,
                            showsavelabel : p.showsavelabel,
                            afterregistration : p.afterregistration
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


                var es = null

                return new Promise((resolve, reject) => {

                    p.sendclbk = function(d){

                        if (p.roomid && d.txid){
                            self.matrixchat.shareInChat.url(p.roomid, app.meta.protocol + '://i?stx=' + d.txid) /// change protocol
                        }

                        resolve(d)

                        if(es && es.container) es.container.close()
                    }

                    app.nav.api.load({
                        open : true,
                        id : 'wallet',
                        inWnd : el ? false : true,
                        el : el ? el : null,
                        eid : id,
                        
                        mid : id,
                        animation : false,
                        essenseData : p,
                        clbk : function(e, _p){

                            es = _p

                            globalpreloader(false)

                            if(clbk) clbk(e, _p)
                        }
                    })

                })

                
                
            },

            buy : function(p, clbk, el){

                if(!p) p = {}

                var id = 'papiwalletbuy'

                globalpreloader(true, true)

                p.action = p.htls ? 'htls' : 'buy'
                p.class = 'api'
                p.api = true
                

                var es = null

                return new Promise((resolve, reject) => {
                    
                    p.sendclbk = function(d){

                        if (p.roomid && d.txid){
                            self.matrixchat.shareInChat.url(p.roomid, app.meta.protocol + '://i?stx=' + d.txid) /// change protocol
                        }

                        resolve(d)

                        if(es && es.container) es.container.close()
                    }

                    app.nav.api.load({
                        open : true,
                        id : 'wallet',
                        inWnd : el ? false : true,
                        el : el ? el : null,
                        eid : id,
                        mid : id,
                        history : true,
                        animation : false,
                        essenseData : p,
                        clbk : function(e, _p){

                            es = _p
    
                            globalpreloader(false)
    
                            if(clbk) clbk(e, _p)
                        }
                    })

                })

                
                
            }
        },

        saveShare : function(share, clbk, _p){

            if(!_p) _p = {}

            var error = function(e){
                sitemessage(e)

                topPreloader2(100)

                clbk()
            }

            var save = function(p){

                if(!p) p = {}

                p.progress = function(key, percent){
                    topPreloader2(percent, self.app.localization.e('downloadingVideo'))
                }

                p = _.extend(p, _p)

                self.sdk.localshares.saveShare(share, p).then(r => {

                    sitemessage(self.app.localization.e('successdownloaded'))

                    topPreloader2(100)

                    if(clbk) clbk()

                }).catch(error)
            }

            if(self.sdk.localshares.saving[share.txid]) return

            if(self.sdk.localshares.storage[share.txid]){

                menuDialog({
                    items: [{
                        text: self.app.localization.e('deleteVideoDialog'),
                        action: function (_clbk) {

                            self.sdk.localshares.deleteShare(share.txid).then(r => {

                                if(clbk) clbk(share.txid, true)

                            }).catch(error)

                            _clbk()

                        }
                    }]
                })

                return
            }

            menuDialog({
                items: [{
                    text: self.app.localization.e('saveshare'),
                    action: function (_clbk) {

                        if (share.itisvideo()){

                            var info = share.url ? (app.platform.sdk.videos.storage[share.url] || {}).data || null : null

                            console.log(info, share, app.platform.sdk.videos.storage)

                            if (info){

                                var items = _.map(deep(info, 'original.streamingPlaylists.0.files') || [], function(file){
                                    return {
                                        text: file.resolution.label,
                                        action: function (clbk) {

                                            save({resolutionId : file.resolution.id})

                                            clbk()

                                        }
                                    }
                                })

                                if(info && info.original && info.original.isLive){

                                    dialog({
                                        html: "Please wait, you will be able to download the video when the broadcast recording appears",
                                        btn1text: self.app.localization.e('daccept'),
                                        class : 'one',
                                        success: function () {

                                        }
                                    })

                                    return
                                }

                                if(!items.length){

                                    dialog({
                                        html: "Please wait, the video hasn't been transcoded yet",
                                        btn1text: self.app.localization.e('daccept'),
                                        class : 'one',
                                        success: function () {

                                        }
                                    })

                                    return

                                }

                                menuDialog({
                                    header : self.app.localization.e('selectQuality'),
                                    items: items
                                })

                            }
                            else{
                                error('noinfo')
                            }
                        }
                        else{
                            error('todo')
                        }

                        _clbk()

                    }
                }]
            })



        }
    }

    self.api = {

        keypair: function (m) {
            let keyPair;

            if (bitcoin.bip39.validateMnemonic(m)) {
                const seed = bitcoin.bip39.mnemonicToSeedSync(m);

                keyPair = self.sdk.address.dumpKeys(0, seed);
            }
            else {

                try {
                    keyPair = bitcoin.ECPair.fromPrivateKey(Buffer.from(m, 'hex'));
                } catch (e) {
                    try {
                        keyPair = bitcoin.ECPair.fromWIF(m);
                    } catch (e) {
                        // TODO: Do something...
                    }
                }

            }

            return keyPair
        },

        clearname: function (n) {
            return (n || "").replace(/[^a-zA-Z0-9_ ]/g, "")
        },

        name: function (address) {
            var n = deep(self.sdk.usersl.storage, address + '.name') || deep(self.sdk.users.storage, address + '.name');

            if (n) {
                n = this.clearname(n)
            }

            return n;
        },

        authorlink: function (address, namelink) {
            var name = deep(self.sdk.usersl.storage, address + '.name');

            if (name && (!self.app.mobileview || namelink)) return encodeURIComponent(name.toLowerCase());

            else return 'author?address=' + address
        },

        authororexplorerlink: function (address) {
            var name = deep(app, 'platform.sdk.usersl.storage.' + address + '.name');

            if (name) return encodeURIComponent(name.toLowerCase());

            else return app.meta.blockexplorer + 'address/' + address
        },

        upbutton: function (el, p) {

            if (typeof window == 'undefined') return;

            if (!p) p = {};

            var self = this;
            var w = app.el.window;
            var up = null;

            var id = makeid()

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

                    if (app.lastScrollTop >= (typeof p.scrollTop == 'undefined' ? 250 : p.scrollTop)) {
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
                        app.actions.scroll(0)
                        //_scrollTop(0)
                    }


                }
            }

            var initEvents = function () {

                app.events.scroll[id] = events.scroll
                app.events.resize[id] = events.resize

               /**window.addEventListener('scroll', events.scroll)
                window.addEventListener('resize', events.resize)*/

                up.swipe({
                    tap: events.click
                })
            }

            var removeEvents = function () {
                delete app.events.scroll[id]
                delete app.events.resize[id]
                /*window.removeEventListener('scroll', events.scroll)
                window.removeEventListener('resize', events.resize)*/
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

                if(p.text || p.textHover){

               

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

                }

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

            if(p.time){
                setTimeout(self.destroy, p.time)
            }

            return self;

        },

        mobiletooltip : function(_el, content, clbk, p){

            var d = function(){
                var dialog =  tooltipMobileDialog({

                    html : content(),
                    clbk : function(el){
                        if(clbk)

                            clbk(el, null, function(){
                                dialog.destroy()
                            })
                    },

                    app : app

                })
            }

            if(_el.attr('mobiletooltip')) return

            d()

            _el.on('click', function(){
                d()
            })

            _el.attr('mobiletooltip', true)
        },

        tooltip: function (_el, content, clbk, p) {

            if(!p) p = {}

            if (self.app.mobileview || p.dlg){
                return self.api.mobiletooltip(_el, content, clbk, p)
            }

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
                    clbk($(h.tooltip), _el, function(){

                        try{
                            if (_el.tooltipster)
                                _el.tooltipster('hide')

                        }catch(e){

                        }


                    })
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

        relation : function(address, type){

            var me = deep(app, 'platform.sdk.users.storage.' + deep(app, 'user.address.value'))

            if(!me) return

            var r = me.relation(address, type)

            return r
        },

        actions: {

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

            subscribeWithDialog: function (address, clbk) {
                menuDialog({

                    items: [

                        {
                            text: self.app.localization.e('e13263'),
                            class: 'itemmain',
                            action: function (clbk) {

                                self.api.actions.notificationsTurnOn(address, function(tx, error){
                                    if (error) {
                                        self.errorHandler(error, true)
                                    }
                                })

                                clbk()

                            }
                        },

                        {
                            text:  self.app.localization.e('e13264'),
                            action: function (clbk) {

                                self.api.actions.subscribe(address, function(tx, error){
                                    if (error) {
                                        self.errorHandler(error, true)
                                    }
                                })

                                clbk()

                            }
                        }


                    ]
                })

            },

            unsubscribe: function (address, clbk) {
                var unsubscribe = new Unsubscribe();
                    unsubscribe.address.set(address);

                topPreloader(10)

                self.sdk.node.transactions.create.commonFromUnspent(

                    unsubscribe,

                    function (tx, error) {

                        if (tx) {
                            self.api.actions.managesubscribelist(address)
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

                var lr = self.api.relation(address)

                self.api.actions.managesubscribelist(address, true)

                self.sdk.node.transactions.create.commonFromUnspent(

                    subscribe,

                    function (tx, error) {

                        if (!tx) {

                            if(!lr){
                                self.api.actions.managesubscribelist(address)
                            }
                            else{
                                self.api.actions.managesubscribelist(address, true, lt.private)
                            }

                        }

                        topPreloader(100)

                        if (clbk)
                            clbk(tx, error)

                    }
                )
            },

            notificationsTurnOff: function (address, clbk) {
                self.api.actions.subscribe(address, clbk)
            },

            notificationsTurnOn: function (address, clbk) {
                var subscribe = new SubscribePrivate();
                subscribe.address.set(address);

                topPreloader(10)

                self.api.actions.managesubscribelist(address, true, true)

                self.sdk.node.transactions.create.commonFromUnspent(

                    subscribe,

                    function (tx, error) {

                        if(!tx) {
                            self.api.actions.managesubscribelist(address)
                        }

                        topPreloader(100)

                        clbk(tx, error)

                    }
                )
            },

            managesubscribelist : function(address, add, notificationturnon){

                var me = deep(app, 'platform.sdk.users.storage.' + app.user.address.value.toString('hex'))
                var u = self.sdk.users.storage[address];

                if (me) {

                    me.removeRelation({
                        adddress: address
                    })

                    if (add){
                        me.addRelation({
                            adddress: address,
                            private: notificationturnon ? true : false
                        })
                    }

                    me.removeRelation(address, 'recomendedSubscribes')
                }

                if (u) {

                    u.removeRelation(address, 'subscribers')

                    if (add){
                        u.addRelation(address, 'subscribers')
                    }
                }

                if (add){
                    self.sdk.activity.adduser('subscribe', address)
                }

                _.each(deep(self.clbks, 'api.actions.anysubscribe') || {}, function (c) {
                    c(address, add, notificationturnon)
                })

                var cname = 'subscribe'

                if(!add) cname = 'unsubscribe'

                else if(notificationturnon) cname = 'subscribePrivate'

                _.each(deep(self.clbks, 'api.actions.' + cname) || {}, function (c) {
                    c(address, add, notificationturnon)
                })


            },

            htls : function(id){
                self.app.platform.ui.wallet.send({id : id}, function(){

				})
            },

        },

        metmenu: function (_el, id, actions) {
            var share = self.sdk.node.shares.storage.trx[id];

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

                    }, function (el, f, close) {



                        el.find('.opennewwindow').on('click', function(){

                            self.app.mobile.vibration.small()

                            var href = 'https://bastyon.com/' /// domain

                            var path = ''

                            if(d.share.itisvideo() && !window.cordova){
                                path = 'index?video=1&v=' + id
                            }
                            else
                            {
                                path = 'post?s=' + id
                            }

                            href += path


                            if (window.cordova){

                                if(!app.nav.current || app.nav.current.href != 'post'){
                                    app.nav.api.load({
                                        open: true,
                                        href: path,
                                        history: true,
                                    })
                                }
                                else
                                {
                                    cordova.InAppBrowser.open(href, '_system');
                                }


                            }
                            else{
                                window.open(href, '_blank');
                            }

                            close()
                        })

                        var pinPost = function (share, clbk, unpin){

                            var ct = new Settings();
                            ct.pin.set(unpin ? '' : share.txid);

                            if (!self.sdk.accountsettings.storage[share.address]){

                                self.sdk.accountsettings.storage[share.address] = {};
                            }

                            if (unpin){

                                self.sdk.accountsettings.storage[share.address].pin = null;

                            } else {

                                self.sdk.accountsettings.storage[share.address].pin = share.txid;
                            }


                            self.app.platform.sdk.node.account.accSet(ct, function(err, alias){




                                if(!err){



                                    if (clbk){

                                        clbk(null, alias)
                                    }

                                } else {
                                    self.app.platform.errorHandler(err, true)

                                    if (clbk)
                                        clbk(err, null)
                                }

                            })

                        }

                        el.find('.pin').on('click', function () {

                            close()

                            dialog({
                                class : 'zindex',
                                html : self.app.localization.e('pinPostDialog'),
                                btn1text : self.app.localization.e('dyes'),
                                btn2text : self.app.localization.e('dno'),
                                success : function(){

                                    pinPost(d.share, function(err, result){

										if(!err)
										{

                                            var shares = self.sdk.node.shares.storage.trx;
                                            var alreadyPinned = Object.values(shares).find(function(share){
                                                return share.pin
                                            })



                                            if (alreadyPinned && alreadyPinned.txid){

                                                alreadyPinned.pin = false;
                                                var shareslist = $(`[stxid='${alreadyPinned.txid}']`);
                                                var pinnedIcon = shareslist.find('.pinnedIcon');
                                                var pinnedLabel = shareslist.find('.pinnedLabel')
                                                pinnedIcon.children().remove();
                                                pinnedLabel.empty()

                                            }

                                            d.share.pin = true;
                                            var metatable = _el.closest('.metatable');
                                            var sys = metatable.find('.sys');

                                            sys.prepend('<span class="pinnedLabel"><i class="fas fa-thumbtack"></i> ' + self.app.localization.e('pinned').toLowerCase() + ', ' + '</span>');

                                        }

                                    }, false)

                                }
                            })

                        })

                        el.find('.unpin').on('click', function () {

                            close()

                            dialog({
                                class : 'zindex',
                                html : self.app.localization.e('unpinPostDialog'),
                                btn1text : self.app.localization.e('dyes'),
                                btn2text : self.app.localization.e('dno'),
                                success : function(){

                                    pinPost(d.share, function(err, result){

										if(!err)
										{

                                            d.share.pin = false;
                                            var metatable = _el.closest('.metatable');
                                            var pinnedIcon = metatable.find('.pinnedIcon');
                                            var pinnedLabel = metatable.find('.pinnedLabel');
                                            pinnedIcon.children().remove();
                                            pinnedLabel.empty()

                                        }


                                    }, true)

                                }
                            })
                        })

                        el.find('.htls').on('click', function () {

                            actions.htls(id)

                            close()
                        })

                        el.find('.socialshare').on('click', function () {

                            self.app.mobile.vibration.small()
                            actions.sharesocial(id)

                            close()
                        })

                        el.find('.startchat').on('click', function () {

                            self.matrixchat.startchat(address)

                            self.app.mobile.vibration.small()


                            close()
                        })

                        el.find('.subscribe').on('click', function () {
                            self.app.mobile.vibration.small()
                            self.api.actions.subscribe(address, function (tx, error) {

                                if (error) {
                                    self.errorHandler(error, true)
                                }

                            })

                            close()
                        })

                        el.find('.unsubscribe').on('click', function () {
                            self.app.mobile.vibration.small()
                            self.api.actions.unsubscribe(address, function (tx, error) {
                                if (error) {
                                    self.errorHandler(error, true)
                                }
                            })

                            close()
                        })

                        el.find('.complain').on('click', function () {
                            self.app.mobile.vibration.small()
                            actions.complain(id)

                            close()

                        })

                        el.find('.donate').on('click', function () {
                            self.app.mobile.vibration.small()
                            //actions.donate(id)

                            self.ui.wallet.send({
                                address : address
                            })

                            //deep(window, 'POCKETNETINSTANCE.platform.ui.wallet.send')

                            close()

                        })

                        el.find('.remove').on('click', function () {
                            self.app.mobile.vibration.small();

                            close()


                            dialog({
                                class : 'zindex',
                                html : self.app.localization.e('removePostDialog'),
                                btn1text : self.app.localization.e('dyes'),
                                btn2text : self.app.localization.e('dno'),
                                success : function(){

                                    var shareslist = _el.closest(`[stxid='${id}']`);
                                    var authorgroup = shareslist.closest('.sharecnt');

                                    var removePost = function (share, clbk){

                                        share.deleted = true;
                                        var ct = new Remove();
                                        ct.txidEdit = share.txid;


                                        self.app.platform.sdk.node.shares.delete(share.txid, ct, function(err, alias){

                                            if(!err){
                                                if (clbk){

                                                    // var l = share.url;


                                                    // if (self.app.peertubeHandler.checklink(l)) {
                                                    //     share.settings.a = share.default.a

                                                    //     self.app.peertubeHandler.api.videos.remove(l).then(r => {
                                                    //         self.app.platform.sdk.videos.clearstorage(l)
                                                    //     })


                                                    // }

                                                    clbk(null, alias)
                                                }

                                            } else {
                                                self.app.platform.errorHandler(err, true)

                                                if (clbk)
                                                    clbk(err, null)
                                            }

                                        })

                                    }

                                    removePost(d.share, function(err, result){

										if(!err)
										{

                                            authorgroup.addClass('deleted');


                                        }


                                    })

                                }
                            })


                        })

                        el.find('.block').on('click', function () {
                            self.app.mobile.vibration.small()
                            self.api.actions.blocking(address, function (tx, error) {
                                if (!tx) {
                                    self.errorHandler(error, true)
                                }
                            })

                            close()

                        })

                        el.find('.edit').on('click', function () {

                            self.app.mobile.vibration.small()
                            var em = null;
                            var editing = d.share.alias()

                            var hash = editing.shash()

                            if (editing.settings.v == 'a') {

                                if(editing.settings.version >= 2){

                                    app.nav.api.load({
                                        open: true,
                                        href: 'articlev',
                                        history: window.cordova,
                                        inWnd: true,
                                        
                                        essenseData: {

                                            editing,
                                            
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
                                else{
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

                            close()

                        })

                        el.find('.downloadVideo').on('click', function(){

                            self.app.mobile.vibration.small()

                            self.ui.saveShare(share, function(id, deleted){
                                if (actions.changeSavingStatus)
                                    actions.changeSavingStatus(share.txid, deleted)
                            }, {
                                before : actions.changeSavingStatusLight,
                                after : actions.changeSavingStatusLight
                            })

                            close()

                        })

                        el.find('.deleteSavedVideo').on('click', function(){

                            self.ui.saveShare(share, function(id, deleted){
                                if (actions.changeSavingStatus)
                                    actions.changeSavingStatus(id, deleted)
                            })

                            close()

                        })


                        el.find('.videoshare').on('click', function () {
                            self.app.mobile.vibration.small()
                            actions.videoShare(share)

                            close()
                        })
                    })

                }, d, 'components/lenta')
            })
        }
    }

    self.sdk = {

        faqLangs : {
            get : function(){
                return {
                    en : [
                        {
                    
                            name : 'How does '+self.app.meta.fullname+' work?',
                            id : 'how-it-works',
                    
                            group : [
                    
                                {
                                    id : 'what-is',
                                    q : 'What is ' +self.app.meta.fullname+'?',
                                    a : '<div><p>' +self.app.meta.fullname+' is an innovative social network and video sharing platform. Unlike the mainstream social networks, there is no corporation behind it, it is based on the Bitcoin model. Bastyon is an open source project run by a team of developers and experts, and its goal is to provide a community moderated platform where the freedom of speech is seriously respected.</p><p>The project was originally created by Daniel Satchkov, but now encompasses over 25 developers and many volunteers across the globe. Bastyon is more of a protocol than a platform, since any developer can build its own app on it. The platform does not run on a single server but on a network of <em>user nodes</em> that are located all throughout the world.</p><p>This means that users are always able to get information and communicate, see the content and post as long as they have an internet connection and only a handful of nodes somewhere in the world are operational.</p><p>This overcomes the limitations that censors put in place to block or limit communication and spread of information. Information wants to move freely. While, for example, in China some social networks can be used only behind a VPN, there is no need for that with '+self.app.meta.fullname+'.</p><p>In addition,'+self.app.meta.fullname+' does not collect personal information: users register without any email or phone number and no personal data like the IP or MAC address are stored in any way. Note, that while Bastyon does not collect any IPs (as can be seen in open code), it is not possible to hide your IP completely when using the internet, unless you are using a VPN.</p><p>By doing so,'+self.app.meta.fullname+' enables users to discuss issues freely. Today, anonymity is a requirement for security and privacy and '+self.app.meta.fullname+' is able to guarantee it.</p><p>Furthermore, in order to deliver completely private and anonymous communication, '+self.app.meta.fullname+' provides an encrypted chat system, not associated to any phone number or personal data, protected with peer-to-peer encryption model (note, that group chats are not encrypted, only 1-on-1 chats). No one except the two users involved in the chat session can access the messages. All the claims are easy to verify, since Bastyon app and Pocketnet blockchain are both completely open-source, with code visible to everyone. Moreover, all the chat messages are automatically deleted after 7 day.</p><p>'+self.app.meta.fullname+' is a censorship-resistant pseudonymous social platform where people can chat, communicate and share contents with others transparent rules that are the same for every user and developer.</p></div>',
                                    
                                },
                                
                                {
                                    id : 'how-it-words',
                                    q : 'How do I get started?',
                                    a : '<div><p>'+self.app.meta.fullname+" is pretty simple to use: you just have to create an account and you can immediately start posting contents, follow other users and chat.</p><p>During the registration you just need to create a username (it must be unique!) and upload a picture or a photo (not necessarily your own photo!). No email (you can leave an email for the mailing list, but it is not connected to your account on Bastyon), no phone number, no verifications. Not even a password: the system will generate a passphrase that you have to use to login, this passprhase is your private key which replaces both the login and password, it is the only thing you need to login. If you lose the private key, nobody can recover it, even developers don't have access to users' accounts.</p></div>",
                                },
                                    
                                {
                                    id : 'signback',
                                    q : 'What is the difference between the 12-word passphrase and a private key?',
                                    a : '<div><p>The first time you use '+self.app.meta.fullname+' you need to create an account, composed only of your unique username.</p><p><strong>There is no password. </strong></p><p>Instead, you will be given a unique 12-words key (passphrase). Alternatively, you can use a private key, which is a long number (those two are equivalent). <strong>Keep this data safe and NEVER reveal it to anyone.</strong></p><p>Then, when you need to log in, you just need to input your passphrase (or scan the QR from the app).</p><p><strong>Remember</strong>: if you lose your passphrase, your account is locked forever. There is no way to restore the password, there is no way for '+self.app.meta.fullname+' to let you log in again. Your passphrase or private key code are the only ways to access your account, plase write it down on a piece of paper somewhere. You can find it in your profile under Accounts (click the symbol of a key).</p></div>',
                                },
                                
                                
                                {
                                    id : 'behind-scenes',
                                    q : 'How does it work behind the scenes? Where are the servers?',
                                    a : '<div><p>'+self.app.meta.fullname+' is modeled on decentralized a cryptocurrency Bitcoin, because it has no central authority and uses the blockchain to make transactions and ensure security.</p><p>There is no central server: instead, the platform relies on a network of nodes, located all over the world. Every person in the world with a computer can actually run a node (and be rewarded to do so by using coinstaking with Pocketcoin).</p><p>Hash of each post, each comment, each interaction (except chat messages!) is stored on the <a elementsid="https://en.wikipedia.org/wiki/Blockchain" href="https://en.wikipedia.org/wiki/Blockchain">blockchain</a>. The posts and comments themselves are not in the blockchain, but in a companion database tied to a blockchain.</p><p>'+self.app.meta.fullname+' uses a dedicated blockchain, derived directly from the Bitcoin chain.</p></div>',
                                },
                                    
                                {
                                    id : 'blocks',
                                    q : 'What would happen if some country (ies) blocks access to Bastyon.com?',
                                    a : '<div><p>Nothing.</p><p>You would still be able to use Bastyon as if nothing happened if you use a desktop app, because the Bastyon desktop app speaks directly to the nodes and does not use websites.</p><p>This is the power of censorship resistance. <br />You can verify this yourself by simulating a disappearance of the domain name bastyon.com. <br /><br /><strong>On Windows:</strong><br />just open this file:<br />Windows/System32/hosts<br /><br /><strong>On Linux/Ubuntu:</strong><br />Open this file<br />/etc/hosts<br /><br />Then add this row: <br />127.0.0.1 bastyon.com</p><p>This would ensure that bastyon.com is pointing to your local machine, which means that it is not pointing to any outside IP address.<br /><br />Then launch the desktop app and you will be able to continue using Bastyon has if nothing happened. <br />Cool huh?</p></div>',
                                }
                        
                            ]
                    
                        
                        },
            
                        {
                        
                            name : 'Pocketcoin',
                            id : 'pocketcoin',
                        
                            group : [
                        
                                
                        
                                 {
                                    id : 'app-store',
                                    q : 'What can be expected to purchase with PKOIN?',
                                    a : '<div>PKOIN has a multitude of uses on Bastyon. First, 50 PKOIN in your account removes all posting limitations and allows you to load video. PKOIN can be used to boost comments, making your comments visible to everyone. The PKOIN from boosted comments goes to the blogger, and bloggers should reply or feature such comments to encourage such boosts. You can boost a post to move it up in the feed. It is used for staking in nodes, you can run a node and earn more PKOIN by staking PKOIN. It will be used in a Decentralized Ad Marketplace with 100% of proceeds going to bloggers. It will also be used to buy special wallpaper profiles, animated profile images etc. </div>',
                                },
                        
                        
                                {
                                    id : 'pocketcoinstock',
                                    q : 'Is Pocketcoin like a share of stock in '+self.app.meta.fullname+'?',
                                    a : '<div>Definitely no. '+self.app.meta.fullname+' is not even a corporation and does not have any ownership. It is an open source code that anyone can copy and run. Pocketcoin is a token that facilitates value exchange, specifically advertising transactions. In addition, '+self.app.meta.fullname+' will include a marketplace where goods and services will be sold directly for Pocketcoin</div>',
                                },
                        
                                {
                                    id : 'pocketcoinbuy',
                                    q : 'Can I buy additional Pocketcoin?',
                                    a : '<div>Yes, currently you can buy Pocketcoin on the following exchanges: DigiFinex, Bitforex, Mercatox. You can also buy it for 19 different cryptos at <a href="https://pkoin.net/">pkoin.net</a> and there is a Category within Bastyon called PKOIN/Peer-to-Peer where you can buy and sell it with other users. </div>',
                                },
                        
                                {
                                    id : 'pocketcoinbuyfiat',
                                    q : 'Can I buy Pocketcoin for US Dollars or other fiat currency?',
                                    a : '<div>Yes, you can buy it under the category PKOIN/Peer-to-Peer or through a company called Indacoin at <a href="https://buy.pkoin.indacoin.io/">indacoin.io</a>. Indacoin has nothing to do with Bastyon, they are just selling PKOIN for credit cards after buying it on exchanges.</div>',
                                },
                                
                                {
                                    id : 'pocketcoinbuyfiat',
                                    q : 'Why do I need to buy Pocketcoin?',
                                    a : "<div>Bastyon has no backing by bankers or venture capitalists, it is a decentralized social platform that is supported by PKOIN. When you use Bastyon, you are using users' nodes, video nodes, they all have to pay for computers, internet and electricity. Bloggers need to earn for content. The only way Bastyon can function is if users own and support PKOIN. So, buying PKOIN is a way to support decentralization and freedom. However, there is one other important reason to own Pocketcoin. Soon it is very possible that even having a bank account will be tied to submitting your freedom, to some QR code. Pocketcoin is not tied to your name or passport, it is a way to do commerce in a world where financial censorship reigns, it might be the only way to buy food soon without a certain certificate or a QR code. So, buy some PKOIN for freedom. </div>",
                                }
                            ]
                        },
                        {
                        
                            name : 'How can I buy PKOIN?',
                            id : 'buy-pkoin',
                        
                            group : [
                        
                                {
                                    id : 'buy-pkoin1',
                                    q : '  ',
                                    a : 'Select PKOIN/Peer-to-Peer Category on the right and look for ads, then connect in chat <br> ',
                                    img: '<img src="img/per-to-per2.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin2',
                                    q : 'You can buy PKOIN in the following ways:',
                                    a : 'You can buy PKOIN for cryptocurrencies: <br /><a target="_blank" href="https://pkoin.net/">pkoin.net</a><br>	<a target="_blank" href="https://www.bitforex.com/en/spot/pkoin_usdt">www.bitforex.com</a> <br> <a target="_blank" href="www.digifinex.com/en-ww/trade/USDT/PKOIN">www.digifinex.com</a> <br><a target="_blank" href="https://buy.pkoin.indacoin.io/">indacoin.io</a> - you can buy PKOIN for credit cards.',
                                    img: ''
                                },
                                {
                                    id : 'buy-pkoin23',
                                    q : 'Pkoin.net  ',
                                    a : 'Choose a cryptocurrency and enter amount of the crypto into the left field. After that, enter your own PKOIN wallet address.',
                                    img: '<img src="img/buy-pkoin2.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin3',
                                    q : '  ',
                                    a : 'Your PKOIN wallet address is placed in your account. <br>For looking that Click your avatar icon into the right top corner',
                                    img: '<img src="img/Myvideos1.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin4',
                                    q : '  ',
                                    a : 'Then click to PKOIN address for copy',
                                    img: '<img src="img/buy-pkoin4.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin5',
                                    q : '  ',
                                    a : 'Then, you should to enter your PKOIN wallet address in the above field and click “Purchase” button.',
                                    img: '<img src="img/buy-pkoin5.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin6',
                                    q : '  ',
                                    a : 'After that you should to send your BTC (or another crypto which was chosen) to this address',
                                    img: '<img src="img/buy-pkoin6.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin7',
                                    q : ' <a href="Buy.pkoin.indacoin.io">Buy.pkoin.indacoin.io</a>     ',
                                    a : 'First step – choose currency, enter amount, your email address and PKOIN address.  Then click “Buy PKOIN ” button.',
                                    img: '<img src="img/buy-pkoin7.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin8',
                                    q : '  ',
                                    a : 'Then you can see “Buy PKOIN with credit or debit card” window. Click “Continue” button',
                                    img: '<img src="img/buy-pkoin8.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin9',
                                    q : '  ',
                                    a : 'Then, enter your Address, ZIP and your Country',
                                    img: '<img src="img/buy-pkoin9.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin10',
                                    q : '  ',
                                    a : 'Then enter your Full Name, Country, Date of berth',
                                    img: '<img src="img/buy-pkoin10.jpg" alt="" />'
                                },
                                {
                                    id : 'buy-pkoin11',
                                    q : '  ',
                                    a : 'Then, enter your card data and click “Continue” button',
                                    img: '<img src="img/buy-pkoin11.jpg" alt="" />'
                                },
                                
                                
                                
                                
                            ]
                        
                        },
                        {
                        
                            name : 'Earn PKOIN with EasyNode?',
                            id : 'earnbastyonen',
                        
                            group : [
                        
                                {
                                    id : 'earnbastyon1en',
                                    q : '',
                                    a : 'Requirements: <br /> <br />•	Your machine is not running any other Bastyon/Pocketnet node software <br />•	Your hard drive is SSD (not HDD) <br />•	Your computer has at least 50 GB empty space on your SSD<br />•	Your computer has at least 2 GB free RAM <br />•	Your internet speed is at least 10 Mb/sec',
                                    img: ''
                                },
                                {
                                    id : 'earnbastyon2en',
                                    q : '',
                                    a : 'Go to “Node” tab in “Manage” page',
                                    img: '<img src="img/earnbastyon2en.jpg" alt="" />'
                                },
                                {
                                    id : 'earnbastyon3en',
                                    q : '',
                                    a : 'You can change the node and data directory if there is not enough free space on your <b>C drive</b>',
                                    img: '<img src="img/earnbastyon3en.jpg" alt="" />'
                                },
                                {
                                    id : 'earnbastyon4en',
                                    q : '',
                                    a : 'Click “Download and install node”',
                                    img: '<img src="img/earnbastyon4en.jpg" alt="" />'
                                },
                                {
                                    id : 'earnbastyon5en',
                                    q : '',
                                    a : 'You will see the progress bar',
                                    img: '<img src="img/earnbastyon5en.jpg" alt="" />'
                                },	
                                {
                                    id : 'earnbastyon6en',
                                    q : '',
                                    a : 'Wait until the next step and Status Running. First launch of the node can take several hours – DO NOT TURN OFF YOUR COMPUTER',
                                    img: '<img src="img/earnbastyon6en.jpg" alt="" />'
                                },	
                                {
                                    id : 'earnbastyon7en',
                                    q : '',
                                    a : '',
                                    img: '<img src="img/earnbastyon7en.jpg" alt="" />'
                                },	
                                {
                                    id : 'earnbastyon8en',
                                    q : '',
                                    a : '',
                                    img: '<img src="img/earnbastyon8en.jpg" alt="" />'
                                },	
                                {
                                    id : 'earnbastyon9en',
                                    q : '',
                                    a : 'You will need to deposit PKOIN to earn stakes, click Deposit. After clicking Deposit you will see a PKOIN address. You can copy the address and send PKOIN to it. If you did not yet buy PKOIN, you can buy it in the following ways: <br />1.	Buy for cryptocurrency at pkoin.net (or on DigiFinex or Bitforex exchanges) <br />2.	Buy it by selecting PKOIN/Peer-to-Peer tag on the left side of the Bastyon application. Select a seller and write to them in chat (at your own risk)',
                                    img: '<img src="img/per-to-per2.jpg" alt="" />'
                                },	
                                {
                                    id : 'earnbastyon10en',
                                    q : '',
                                    a : 'Other functions are available: <br />– Withdraw  - withdraw PKOIN (reduces your chance of winning coins)<br />– Save Wallet  (backup node wallet, very important, saves your private keys if your node crashes)<br />– Import Wallet  (you can import an outside wallet with private keys)',
                                    img: '<img src="img/earnbastyon10en.jpg" alt="" />'
                                },	
                                {
                                    id : 'earnbastyon11en',
                                    q : '',
                                    a : 'In this example you see that 500 PKOIN was deposited. Note, that your node wallet is separate from your default Bastyon wallet, they are not connected. You need to transfer coins to the node from the wallet to win stakes.',
                                    img: ''
                                },	
                                {
                                    id : 'earnbastyon12en',
                                    q : '',
                                    a : 'After you deposit PKOIN, 60 blocks needs to pass (approx. 60 minutes). Once you see the green checkmark that says Staking, you are now ready to start earning PKOIN. You can periodically go in and see how your balance is changing with winning stakes. For any questions, write to support@bastyon.com',
                                    img: '<img src="img/earnbastyon12ru.jpg" alt="" />'
                                },	
                                
                            ]
                        
                        },
            
                        {
                        
                            name : 'Video',
                            id : 'video',
                        
                            group : [
                                {
                                    id : 'savevideo',
                                    q : 'Where do you save the video content?',
                                    a : '<div>'+self.app.meta.fullname+' uses a modified open source platform called PeerTube, connected to the Pocketnet blockchain and the Bastyon app. PeerTube is fully integrated with '+self.app.meta.fullname+' authorization, each video server is registered on the blockchain.</div>',
                                },
                        
                                {
                                    id : 'permissions',
                                    q : 'Who can load video in Bastyon?',
                                    a : '<div> Bastyon does not have centralized servers or venture capital financing, all video is stored on servers maintained by users. Therefore, we cannot allow everyone to load video, servers will fill up quickly. To load video you need to have 5 PKOIN (500 MB) or 50 PKOIN (4 GB) in your account. You can buy PKOIN from other users if you select a category PKOIN/Peer-to-Peer. </div>',
                                },
                                {
                                    id : 'stats',
                                    q : 'Where can I see my video stats?',
                                    a : '<div> Go to your profile and see My Videos. </div> ',
                                },
                                 {
                                    id : 'technology',
                                    q : 'What player do you use to play the video?',
                                    a : '<div> Bastyon has its own player, which is a significantly modified version of PeerTube. Same as PeerTube it uses WebTorrent technology to reduce the load on the server. This means that users watching the video are sharing it. Note, that in some cases it means users can see IP addresses of each other. Bastyon servers do not have any mechanism to record these IP addresses, however, if you really care about exposing your IP address, you should use a reliable VPN provider. If you want to minimize any peer-to-peer sharing, you can use download video function in Bastyon. </div> ',
                                },
                                {
                                    id : 'taking time',
                                    q : 'Why is the video taking time to upload?',
                                    a : "<div> Again, Bastyon does not have the resources the Google has. Video needs to be loaded to one of the video nodes and it also needs to be transcoded. Remember, YouTube is not free, it extracts value by using your private information and monetizing it. Bastyon is run by the community and a little bit of a delay is a small price to pay for privace and freedom. Besides, Bastyon devs have made the process of loading super-easy and much more robust than other freedom oriented platforms (they frequently don't even do transcoding for different qualities). </div>",
                                },
                        
                        
                            ]
                        
                        },
            
                        
                        
                        
                        
                        {
                        
                            name : 'Uploading videos',
                            id : 'Uploading',
                        
                            group : [
                        
                                {
                                    id : 'Uploading1',
                                    q : '  ',
                                    a : 'Important: The uploading video function is available for users who have at least 5 PKOIN, or high enough rating. If you have 50 PKOIN you can upload 4 Gb video per day, with 50 PKOIN you can upload up to 4 GB. Note, you do not spend PKOIN, it just has to be in your account to verify that you are not a bot.',
                                    img: ''
                                },
                                {
                                    id : 'Uploading2',
                                    q : 'Click to the “What`s new?” section on the “All Posts” tab.',
                                    a : '',
                                    img: '<img src="img/Uploading2.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading3',
                                    q : 'Then, click “Upload Video” button and in the popup click “Select video file” button. After that, choose necessary video file from your PC and wait for uploading to be finished.',
                                    a : '',
                                    img: '<img src="img/Uploading3.jpg" alt="" />',
                                    
                                },
                                {
                                    id : 'Uploading4',
                                    q : '',
                                    a : '',
                                    img: '<img src="img/Uploading4.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading5',
                                    q : 'Click to the “What`s new?” section on the “All Posts” tab.',
                                    a : '',
                                    img: '<img src="img/Uploading5.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading6',
                                    q : 'Then, when uploading ends, add title, description, category and choose visibility for your post: <br>			“Visible for everyone”, <br> “Visible only for subscribers”, <br> “Visible only for Bastyon users”, <br> After that, click “Post” button.',
                                    a : '',
                                    img: '<img src="img/Uploading6.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading7',
                                    q : '',
                                    a : '',
                                    img: '<img src="img/Uploading7.jpg" alt="" />'
                                },
                                
                                
                            ]
                        
                        },
                        
                        {
                        
                            name : 'My Videos',
                            id : 'Myvideos',
                        
                            group : [
                        
                                {
                                    id : 'Myvideos1',
                                    q : '  ',
                                    a : 'Click your avatar icon in the top right corner',
                                    img: '<img src="img/Myvideos1.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos2',
                                    q : ' ',
                                    a : 'Then, click “Manage” button',
                                    img: '<img src="img/Myvideos2.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos3',
                                    q : '  ',
                                    a : 'Then, click “My Videos”',
                                    img: '<img src="img/Myvideos3.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos4',
                                    q : '  ',
                                    a : 'Then, you can see your video cabinet, which contain information about your uploaded videos, average rating, video views and video settings.',
                                    img: '<img src="img/Myvideos4.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos5',
                                    q : '  ',
                                    a : 'If you want to change the video description, name or a preview image, click the three dots and choose necessary action.',
                                    img: '<img src="img/Myvideos5.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos6',
                                    q : '  ',
                                    a : 'On the top of the video cabinet page you can see your Daily Uploading Quota, Total Referral Users, Total Ratings, Total Video Views, Unique Raters, Search Field and also you can sort your videos.',
                                    img: '<img src="img/Myvideos6.jpg" alt="" />'
                                },
            
                                
                                
                            ]
                        
                        },
                        
                        {
                        
                            name : self.app.meta.fullname,
                            id : 'roadmap',
                        
                            group : [
                        
                                {
                                    id : 'walletaddresses',
                                    q : 'I see a PN address and a wallet address... are both these addresses on the PN blockchain?',
                                    a : '<div>PN address is the one used for posting content and using social network in general. It also keeps coins that you win for your highly rated posts.</div><div>Wallet addresses are to keep the rest of coins.</div>',
                                },
                        
                                {
                                    id : 'linktoprofile',
                                    q : 'Can I link to my profile? or my "page"? So that i can post it into my community to bring members over.',
                                    a : '<div>In the browser, go to your profile by clicking on avatar in the upper right and click Share, then select Use Referral Link checkmark, everyone who will sign up from the link that is generated will be offered to follow you automatically when signing up. For every referral that signs up through you link, you will get a bonus equal to 20% of the Pocketcoin (PKOIN) they earn through posting and commenting for the first 6 months. To be clear, your referral does not earn less, you get a bonus.</div>',
                                },
                                {
                                    id : 'starsystem',
                                    q : 'The star system. Is there a limit on how many stars a person has to give people?',
                                    a : '<div>There are some limits. But as your reputation grows you can upvote more and more. This is done, so bots don&rsquo;t break down our blockchain. Initially you get 100 ratings every 24 hours. As your reputation grows (that happens by posting and getting rated), then you do 200 ratings a day.</div>',
                                },
                        
                        
                                {
                                    id : 'updateprofiletime',
                                    q : 'How often can I update my profile? ',
                                    a : '<div>You are able to update your profile once every hour.</div>',
                                },  
                        
                                {
                                    id : 'mobileapp',
                                    q : 'Is there a mobile app?',
                                    a : '<div>There is an Android app, you can download it <a href="https://play.google.com/store/apps/details?id=pocketnet.app">here</a>. iPhone app is not available, because Apple required us to censor any content on 24 hour notice. In Bastyon even developers cannot remove content, it is moderated by the users. Batyon is optimized for mobile browsers like Safari on the iPhone.</div>',
                                },
                        
                                {
                                    id : 'postinglimit',
                                    q : 'Can you tell me what is the limit for posts and ratings each day or hour?',
                                    a : '<div>We do have some limitations, but after testing it we have increased our limits. At the outset you can make 5 posts and issue 15 ratings every 24 hours. Once your reputation grows above 100 and there at least 100 high reputation users who upvoted you (or 30 users after 3 months), you will be able to make up to 30 posts and 200 ratings, plus 300 comments every 24 hours.</div>',
                                },
                        
                                {
                                    id : 'reputation',
                                    q : 'What is reputation and how is it calculated?',
                                    a : "<div>Your reputation is the sum of your ratings calculated in the following way. Note, that users with reputation below 50 do not affect anyone's reputation or coin winnings. They can rate the content, but it does not affect reputation.</div>\
                                    <div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>So, if you have two 5 start ratings and one 1 star rating, the total will be 2+2-2=2</div>",
                                },
                        
                                {
                                    id : 'deletepostoruser',
                                    q : 'Is there a way to delete or edit a post?',
                                    a : '<div>Yes, you can edit and delete posts.</div>',
                                },
                        
                                {
                                    id : 'usersearch',
                                    q : 'Is there a way to search for a user?',
                                    a : '<div>Click the search magnifying glass on the top and search by username or by keywords.</div>',
                                },
                                {
                                    id : 'follow',
                                    q : 'How do you follow someone?',
                                    a : '<div>Next to post author (on top of post) there is a Follow link, you can find his posts in Top posts (red flame on top of the page). You will also soon see My Subscriptions feed, which is going to be different from the main feed. The main feed will be everything that anyone posts, but Subscriptions feed will only contain posts from people you follow. So, you will go into general feed in search of good content, though you may not like everything. Then select those you want to keep. Kind of like fishing :)</div>',
                                },
                        
                        
                                {
                                    id : 'otherbrowsers',
                                    q : 'Can it be used on Brave or Duck Duck go browsers?',
                                    a : '<div>'+self.app.meta.fullname+' should work on those browsers. It is fully functional on Chrome and Firefox. But we strongly encourage everyone to download the desktop app (grab '+self.app.meta.fullname+'Setup.exe <a href="https://bastyon.com/about?id=about-download">here</a>). The desktop app cannot be blocked ever (even if '+ app.meta.url +' is down or blocked for some reason). This is a serious consideration in totalitarian and quasi-totalitarian countries which, if you think about it, is beginning to include more and more of the globe.</div>',
                                },
                        
                                {
                                    id : 'replypost',
                                    q : 'Can we reply to our own/and other&rsquo;s posts?',
                                    a : '<div>Yes, commenting is live below each post..</div>',
                                },
                        
                                {
                                    id : 'addtags',
                                    q : 'How to add a tag to a post?',
                                    a : '<div>Select a category or type in the field tag and press enter. No need to specify #, it will be added automatically.</div>',
                                },
                        
                                {
                                    id : 'usepublicaddress',
                                    q : 'How can I use the public address?',
                                    a : '<div>Your public address is what '+self.app.meta.fullname+' uses to verify your identity. Essentially, your private key is a really large number (that can be represented with a 12 word sequence or a QR code). This number gets multiplied by another that everyone knows (called a base point) and we get a public key. When you enter your private key, we can multiply it by the base point to get your public key and we can match it against public address. If they match, we know it is you. It is impossible to go back i.e. to divide public key by the base point to get your private key. The way multiplication in cryptography works is it is only one way and cannot be reversed, so your key is safe. '+self.app.meta.fullname+' uses the same exact cryptography as Bitcoin.</div>',
                                },
                                {
                                    id : 'desktopmac',
                                    q : 'Will there be a downloadable executable for Mac?',
                                    a : '<div>Yes - you can find it here https://bastyon.com/help?page=applications. </div>',
                                },
                                {
                                    id : 'dark-mode',
                                    q : 'How do I change the theme to Dark Mode?',
                                    a : "<div>If you're on browser click your profile picture > Manage > Settings. If you're on mobile click the three lines on the bottom right > Settings </div>",
                                },
                                {
                                    id : 'banning',
                                    q : 'Can people be banned?',
                                    a : '<div>Yes, Bastyon is a community moderated platform, however, there are only certain topics that community will flag like pornography, narcotics and direct threats of violence. You will never be banned for an opinion or free speech, and even for specific banned topics there has to be a consensus of experienced users without other users defending the content. Currently, users with rep below -30 are losing their account privileges, but this is a temporary system. By the end of 2021, Bastyon is releasing a new moderation system where posts are initially flagged by any high rep user, but account can be blocked only by a certain group of jurors who are selected using a blockchain lottery. Thus, nobody can choose to attack someone for an opinion, jurors will be selected to moderate certain content and they have to all agree. Account cannot be banned until two sets of jurors decided and they cannot be the same. This system protects against any kind of mob rule on Bastyon, while protecting the platform from unsavory content.</div>',
                                },        
                                {
                                    id : 'Apple App',
                                    q : 'When will Bastyon be added to Apple?',
                                    a : '<div>Apple decided not to allow Bastyon due to lack of centralized censorship opportunities by Apples, we wear it as a badge of honor. </div>',
                                },
                                {
                                    id : 'Missing PKCOIN',
                                    q : 'Help! I am missing my PKOIN!',
                                    a : '<div>If for some reason it seems like your PKOIN has gone missing, please first check the blockexplorer via <a href="https://'+self.app.options.url+'/blockexplorer/">BlockExplorer.</a> to that your coins are still there. Just search your wallet address in the search bar and it will show you the balance of your account. </div>',
                                },
                        
                            ]
                        
                        
                        },
                        {
                        
                            name : 'Privacy',
                            id : 'privacy',
                        
                            group : [
                                
                        
                                {
                                    id : 'anonymous',
                                    q : 'Are people who do not enter their real names anonymous?',
                                    a : '<div>Yes - no names, phones, email is NOT connected to your account in any way, it is just optionally entered to receive newsletter updates.</div>',
                                },
                        
                                {
                                    id : 'viewoutside',
                                    q : 'Can someone view a profile (someone&rsquo;s posts) outside the garden? Is it a walled garden?',
                                    a : '<div>Since the whole blockchain and all the posts are in open-source anyone can have access to your posts and profile. They just know that it is linked to your public address. In practice, you can have multiple accounts and switch between them. You can use some with your real name and others anonymously. Anonymity is a great tool to protect free speech from abuse of power.</div>',
                                },
                        
                        
                                {
                                    id : 'walletid',
                                    q : 'Is my public key like a wallet ID that I enter on my profile and people can send points to?',
                                    a : '<div>Exactly. And it is safe to reveal. But not a secret phrase - keep it safe!</div>',
                                },
                        
                                {
                                    id : 'runnode',
                                    q : 'Can I run a node on my headless server?',
                                    a : '<div> Instructions are <a href="https://github.com/pocketnetteam/pocketnet.core/blob/master/README.md">here</a>.</div>',
                                },
                        
                                {
                                    id : 'signback',
                                    q : 'How can I sign back in?',
                                    a : '<div>You can use your private 12-word key or a private key that consists of letters and numbers.</div>',
                                }
                            ]
                        },
                        {
                        
                            name : 'Curation of content',
                            id : 'curation',
                        
                            group : [
                        
                                {
                                    id : 'content',
                                    q : 'Is any content allowed on '+self.app.meta.fullname+'? If some content is not allowed, can the platform still be called free speech?',
                                    a : '<div>This is a very important question. To begin with, not all types of content are allowed. However, and this is crucial, the enforcement is transparent and up to the community in the way we will explain below. Enforcement is done by the community and is in the open with no hidden shadow bans or selective banning practiced by the Silicon Valley.</div>',
                                },
                                {
                                    id : 'specific',
                                    q : 'Specifics of curation on '+self.app.meta.fullname+'.',
                                    a : '<div> Currently the moderation of content is done through 1 star votes by high reputation  users. When reputation reaches -30, the access to the account is restricted. However, there is a completely new moderation algorithm that will be released by the end of 2021. Under the new algorithms, there will be an option to flag a user or a post by any high rep user, but that is not goign to affect the account directly. After certain numbers of flags a lottery on the blockchain will be drawn and a group of juror moderators will be chosen for that account. Jurors have to agree that this user posted pornography, narcotics or a direct threat to violence. Any other opinion or a disagreement is not a grounds for flagging or any sanctions.</div> ',
                                },
                                // {
                                // 	id : 'racism',
                                // 	q : 'Important Note on Racism.',
                                // 	a : '<div>Free thought and free speech is under attack on mainstream social platforms and in the media. We need to speak the truth and this platform is non-corporate and decentralized for that very reason. But we ask everyone make your point without attacking people&rsquo;s nationality or race. You can make your point based on evidence. We cannot afford to turn '+self.app.meta.fullname+' into a marginal platform. Speak the truth, but please avoid racism and attacks against specific nationalities on the whole. We know that Silicon Valley and MSM has turned the issue of racism into their playing card and they constantly cry wolf. Even more the reason for us to be measured and evidence based and not let them smear us with that. If we are not, we are not allowing most of the population to weigh the evidence of MSM corruption presented on '+self.app.meta.fullname+'. Please keep that in mind, so that free speech can thrive and we can beat the facebokks of the world.</div><div>Ultimately, it is the community that will determine the direction of the platform. Having a bunch of snowflakes that complain about stuff that offends them is equally as bad as when people want to voice direct violent threats. However, the first indication is that early users of the platform are generally intelligent and evidence based, so the future looks incredibly bright. '+self.app.meta.fullname+' team has noticed after a few days of the beta test, that we stopped reading even alternative news, because there was so much interesting content on '+self.app.meta.fullname+'. Keep it up!</div><div>Please get involved in the discussion on these topics. This is a community platform. We are always eager to improve transparency of the platform and you should let us know how we can improve our content curation and policing. You can make posts on this topic under the tag Bastyon/Pocketnet.</div>',
                                // },
                        
                        
                            ]
                        
                        },
                        
                        
                        {
                        
                            name : 'How is '+self.app.meta.fullname+' different from...',
                            id : 'differents',
                        
                            group : [
                        
                                {
                                    id : 'differents1',
                                    q : 'Twitter, Facebook, Reddit & other centralized platforms?',
                                    a : '<div>There is no central authority or corporation. Platform is run by equal nodes on a blockchain. All revenue is split between node operators and content creators. Node operators stake Pocketcoin in order to mint blocks with rewards and transactions fees. Half of rewards in each block go to content creators based on ratings their content gathers from users.</div>',
                                },
                                {
                                    id : 'differents2',
                                    q : 'Decentralized platforms like Minds.com and Sola?',
                                    a : '<div>Both of those platforms, while great, are not self-contained. Both are highly dependent on the Ethereum platform, because their tokens are based on ERC-20 Ethereum standard. That means that operations with tokens carry Ether gas fees. Also, those entities have corporations behind them and a corporation will always be a point of centralization due to its economic logic of growing profits. In addition, corporations are exceedingly easy to censor.</div>',
                                },
                                {
                                    id : 'differents3',
                                    q : 'From Steemit?',
                                    a : '<div>Steemit has its own blockchain, but is a corporate entity with all of the centralization that comes from that.</div>',
                                },
                                {
                                    id : 'differents4',
                                    q : 'Decentralized platforms like Mastodon and others?',
                                    a : '<div>While Mastodon is a fully decentralized platform, it requires a great deal of technical knowledge to use. This presents a great hindrance to potential widespread acceptance. '+self.app.meta.fullname+' features a web and desktop applications and users can log in from any device, pull in their personal settings from the blockchain and start using the platform immediately without any technial knowledge.</div>',
                                }
                        
                            ]
                        
                        },
                        
                        {
                        
                            name : ''+self.app.meta.fullname+' ecosystem',
                            id : 'ecosystem',
                        
                            group : [
                        
                                {
                                    id : 'ecosystem1',
                                    q : 'How is '+self.app.meta.fullname+' development funded?',
                                    a : '<div>'+self.app.meta.fullname+' is open sourced and is currently run by the group of volunteers experts in programming and math. After launch '+self.app.meta.fullname+' will attract top programming talent based on its promise of creating a decentralized fair social network. Programmers and marketers working for Pocketcoin donated by large owners of PKOIN.</div>',
                                },
                                {
                                    id : 'ecosystem2',
                                    q : 'What is Pocketcoin?',
                                    a : '<div>Pocketcoin is a network token. It is used exclusively to buy advertising from '+self.app.meta.fullname+' contributors and to pay transaction fees for such payments. It is also used for boosting comments, posts and to buy privileges for your account. In Pocketent all of the revenue is split between content creators and nodes.</div>',
                                },
                                {
                                    id : 'ecosystem3',
                                    q : 'How are content creators and node operators rewarded?',
                                    a : '<div>'+self.app.meta.fullname+' features unique Direct Marketplace where content creators can sell advertising to ad buyers. Content creators set their price and can accept mass-produced ads or can offer highly valued custom placements (creators pitching the product in their own way). Direct Marketplace is essentially an exchange for advertising that allows ad buyers target specific audiences without any intermediaries. All ad buys and ads themselves are linked on the blockchain, therefore ad buying is completely trustless.</div>',
                                },
                                {
                                    id : 'ecosystem4',
                                    q : 'What if users post illegal content, pornography and SPAM?',
                                    a : '<div>'+self.app.meta.fullname+' is not a darknet platform or some sort of pornhub. While it is decentralized and censorship resistant, it is moderated by the users. Any illegal content is flagged and removed from the platform. This means that users with highest reputation can moderate the platform. However, there are safeguards in place (within the open source code) from same or very similar group(s) of people repeatedly voting content off the platform. Moderators for content are chosen randomly using a lottery on the blockchain to avoid any kind of mob rule. Also, users are explicitly encouraged to illicit content, NOT simply the content they find offensive. To make sure that '+self.app.meta.fullname+' is a free speech platform, we encourage you to start participate, grow your reputation and police the platform properly without the censorship currently prevalent in centralized social media.</div>',
                                },
                                {
                                    id : 'ecosystem5',
                                    q : 'Who runs the '+self.app.meta.fullname+'?',
                                    a : '<div>There is no corporate entity or single individual who owns or controls the '+self.app.meta.fullname+'. Pocketnet blockchain and Bastyon are run by a group of programmers, but this group is growing and changing all the time. If any set of programmers takes a wrong turn and violates the principles on which Bastyon is founded, other programmers can simply fork an open-source code and continue the censorship resistant platform. </div></div>',
                                    
                                },
                                
                            ]
                        
                        },
                        {
                        
                            name : 'How do I find the private key?',
                            id : 'privatekey',
                        
                            group : [
                        
                                {
                                    id : 'privatekey1',
                                    q : 'Click your avatar icon in the top right corner',
                                    a : '',
                                    img: '<img src="img/Myvideos1.jpg" alt="" />'
                                },
                                {
                                    id : 'privatekey2',
                                    q : 'Then, click “Manage” button',
                                    a : '',
                                    img: '<img src="img/privatekey2.jpg" alt="" />'
                                },
                                {
                                    id : 'privatekey3',
                                    q : 'Click “private key” button.',
                                    a : '',
                                    img: '<img src="img/privatekey3.jpg" alt="" />'
                                },
                                {
                                    id : 'privatekey4',
                                    q : 'Then, click “Yes”',
                                    a : '',
                                    img: '<img src="img/privatekey4.jpg" alt="" />'
                                },
                                {
                                    id : 'privatekey5',
                                    q : 'Then, you can see your private key. Keep it in a safe place. This key cannot be restored if it’s lost',
                                    a : '',
                                    img: '<img src="img/privatekey5.jpg" alt="" />'
                                },	
                                
                                
                            ]
                        
                        },
                        {
                        
                            name : 'Bastyon Code of Honor',
                            id : 'codex1',
                        
                            group : [
                        
                                {
                                    id : 'honor11',
                                    q : 'Obligations for users:',
                                    a : '<ul><li>Respect differing opinions and attempt to keep the platform friendly to newcomers</li><li>Flag the prohibited content:<ol><li>Any kind of pornography</li><li>Direct threats of violence</li><li>Promotion of illegal narcotics</li></ol></li><li>Give five stars to any post you peruse and find of high quality</li><li>Likewise, give 1 star to poor content, it helps the network</li><li>Use 1 star to enforce the relevance of content to the tags used</li><li>Do not flag or downvote for simple disagreement, only for prohibited content</li><li>Do not engage in reciprocal rating or any rating not based on quality of content</li></ul>',
                                    img: ''
                                },
                                {
                                    id : 'honor22',
                                    q : 'Obligations for developers',
                                    a : '<ul><li>Every line of code must be open sourced, distributed under MIT or Apache license</li><li>No reliance on central servers, any resource in the network is ran by users, the Bitcoin model of equal nodes</li><li>Moderation is done only by the users of the network, currently high rep users. In the new jury system, the moderators will hail equally from the following three groups, each of which has a stake in the success of the network:<ol><li>High reputation users</li><li>Delegated by bloggers with high active audiences</li><li>Delegated by long time PKOIN holders</li></ol></li><li>Developers can only participate in moderation as regular users, no discrimination of any account can take place through the code</li><li>Communicate with users through Bastyon posts and comments and incorporate user input into the code</li></ul>',
                                    img: ''
                                },
                                {
                                    id : 'honor33',
                                    q : 'Node Operator Users:',
                                    a : '<ul><li>Try to improve the network, give feedback to developers</li><li>Make nodes available to support the front-end applications, not just staking</li><li>Explain how to run nodes to other users, increasing the node count and supporting the network</li></ul>',
                                    img: ''
                                },
                                
                                	
                                
                                
                            ]
                        
                        },
                        
                        
                        
                    ],
                    ru : [
                        {
                    
                        name : 'Как '+self.app.meta.fullname+' работает?',
                        id : 'how-it-works',
                    
                        group : [
                    
                        {
                        id : 'what-is',
                        q : 'Что такое ' +self.app.meta.fullname+'?',
                        a : '<div><p>' +self.app.meta.fullname+' это инновационная социальная сеть и платформа для обмена видео. В отличие от обычных социальных сетей, за ' +self.app.meta.fullname+' нет корпорации и он основан на модели Биткойн. Bastyon - это проект с открытым исходным кодом, которым управляет группа разработчиков и экспертов, и его цель - предоставить модерируемую сообществом платформу, в которой серьезно соблюдается свобода слова.  </p> <p>Автором проекта изначально был  Даниэль Сатчков, но сейчас команда ' +self.app.meta.fullname+' - это более 25 разработчиков и множество волонтеров по всему миру. Bastyon - это скорее протокол, чем платформа, поскольку любой разработчик может создать на нем собственное приложение. Платформа работает не на одном сервере, а в сети из <em> пользовательских узлов </em>, расположенных по всему миру.  </p> <p> Это означает, что пользователи всегда могут получать информацию и общаться, просматривать контент и публиковать сообщения, пока у них есть подключение к Интернету и только несколько узлов где-то в мире работают. </p> <p> Это преодолевает ограничения, которые цензоры устанавливают для блокировки или ограничения коммуникация и распространение информации. Информация должна свободно перемещаться. Хотя, например, в Китае некоторые социальные сети можно использовать только через VPN, в этом нет необходимости с '+ self.app.meta.fullname +'. </p> <p> Кроме того, '+ self.app.meta.fullname +' не собирает личную информацию: пользователи регистрируются без какого-либо адреса электронной почты или номера телефона, и никакие личные данные, такие как IP или MAC-адрес, никоим образом не сохраняются. Обратите внимание: хотя Bastyon не собирает никаких IP-адресов (как видно из открытого кода), невозможно полностью скрыть ваш IP-адрес при использовании Интернета, если только вы не используете VPN. </p> <p> Таким образом, '+ self.app.meta.fullname +' позволяет пользователям свободно обсуждать проблемы. Сегодня анонимность является требованием безопасности и конфиденциальности, и '+ self.app.meta.fullname +' может это гарантировать.  </p> <p> Кроме того, чтобы обеспечить полностью конфиденциальное и анонимное общение, '+ self.app.meta.fullname +' обеспечивает зашифрованную систему чата, не связанную с каким-либо номером телефона или личными данными, защищенную сквозным шифрованием  (обратите внимание, что групповые чаты не шифруются. Шифрование обеспечивается только на одноранговых, персональных чатах ( чатах 1-на-1)). Никто, кроме двух пользователей, участвующих в сеансе чата, не может получить доступ к сообщениям. Все утверждения легко проверить, поскольку приложение Bastyon и блокчейн Pocketnet имеют полностью открытый исходный код, а код виден всем. Более того, все сообщения чата автоматически удаляются через 7 дней. </p> <p> '+ self.app.meta.fullname +' - устойчивая к цензуре социальная платформа, где люди могут общаться и делиться контентом с другими пользователями абсолютно прозрачно, где одни правила для всех пользователей и разработчиков. </p> </div> ', 
                        },
                        
                        {
                        id : 'как это-слова',
                        q : 'С чего мне начать?',
                        a : '<div><p>'+self.app.meta.fullname+' прост в использовании: вам нужно создать учетную запись и вы можете сразу же начать публиковать контент, подписываться на других пользователей и общаться в чате. </p> <p> Во время регистрации вам нужно создать уникальное имя и загрузить картинку или фотографию (не обязательно свою фотографию!). Ни электронной почты (вы можете оставить электронное письмо для списка рассылки, но оно не связано с вашей учетной записью на Bastyon), ни номера телефона, ни проверок. Даже пароль: система сгенерирует парольную фразу, которую вы должны использовать для входа в систему, эта парольная фраза - ваш личный ключ, который заменяет логин и пароль, это единственное, что вам нужно для входа в систему. Если вы потеряете личный ключ ключ, никто не может его восстановить, даже разработчики не имеют доступа к учетным записям пользователей.</p></div>',
                        },
                        
                        {
                        id : 'подписаться',
                        q : 'В чем разница между парольной фразой из 12 слов и закрытым ключом?',
                        a : '<div><p>При первом использовании '+ self.app.meta.fullname +' вам необходимо создать учетную запись, состоящую только из вашего уникального имени пользователя. </p> <p> <strong> Нет пароля. </strong> </p> <p> Вместо этого вам будет предоставлен уникальный ключ из 12 слов (кодовая фраза). В качестве альтернативы вы можете использовать закрытый ключ, представляющий собой длинный набор символов. <strong> Храните эти данные в безопасности и НИКОГДА не раскрывайте их никому. </strong> </p> <p> Затем, когда вам нужно войти в систему, вам просто нужно ввести кодовую фразу (или отсканировать QR из приложения). </p> <p> <strong> Помните </strong>: если вы потеряете кодовую фразу, ваша учетная запись будет заблокирована навсегда. Невозможно восстановить пароль, нет возможности для '+ self.app.meta.fullname +' каким-либо способом войти в систему без кодовой фразы или приватного ключа. Ваша кодовая фраза или приватный ключ - единственный способ получить доступ к вашей учетной записи, пожалуйста, запишите его где-нибудь на листке бумаги или сохраните в надежном месте. Вы можете найти его в своем профиле в разделе «Учетные записи» (щелкните символ ключа). </p> </div> ',
                        },
                        
                        
                        {
                        id : 'закулисный',
                        q : 'Как это работает за кадром? Где находятся серверы?',
                        a : '<div><p>'+self.app.meta.fullname+' построен на основе децентрализованной криптовалюты Биткойн, не имеет центрального офиса и использует цепочку блоков для совершения транзакций и обеспечения безопасности.  </p> <p> Центрального сервера нет: вместо этого платформа полагается на сеть узлов, расположены по всему миру. Любой человек, имеющий компьютер, может фактически запустить узел (и получить за это вознаграждение в Pocketcoin). </p> <p> Хеш каждого сообщения, каждого комментария, каждого взаимодействия (кроме чата сообщения!) хранится в <a elementsid="https://en.wikipedia.org/wiki/Blockchain" href="https://en.wikipedia.org/wiki/Blockchain"> блокчейне </a>. Сами сообщения и комментарии находятся не в блокчейне, а в сопутствующей базе данных, привязанной к блокчейну. </p> <p> '+ self.app.meta.fullname +' использует выделенный блокчейн, полученный непосредственно из цепочки биткойнов.  </p> </div> ',
                        },
                        
                        {
                        id : 'блоки',
                        q : 'Что произойдет, если какая-то страна (страны) заблокирует доступ к Bastyon.com?',
                        a : '<div><p>Bastyon.com перестанет работать,  но приложение для компьютера будет работать точно также после любых блокировок сайта.</p><p>Вы сможете использовать Bastyon, как будто ничего не произошло, поскольку настольное приложение Bastyon обращается напрямую к узлам и не использует веб-сайты. </p> <p> В этом сила сопротивления цензуре. <br /> Вы можете убедиться в этом сами, смоделировав исчезновение доменного имени bastyon.com. <br /> <br /> <strong> В Windows: </strong> <br /> просто откройте этот файл: <br /> Windows / System32 / hosts <br /> <br /> <strong> В Linux / Ubuntu: </strong> <br /> Откройте этот файл <br /> / etc / hosts <br /> <br /> Затем добавьте эту строку: <br /> 127.0.0.1 bastyon.com </p> <p > Это гарантирует, что bastyon.com указывает на ваш локальный компьютер, а это означает, что он не указывает ни на какой внешний IP-адрес. <br /> <br /> Затем запустите настольное приложение, и вы сможете продолжить использование Bastyon если ничего не произошло. <br /> Круто, да? </p> </div> <br /> <a href="https://github.com/pocketnetteam/pocketnet.gui/releases/">Скачать Приложение Для Компьютера</a> ',
                        
                        }
                        
                        ]
                    
                        
                        },
            
                        {
                        
                            name : 'Pocketcoin',
                            id : 'pocketcoin',
                            
                            group : [
                            
                            
                            
                            {
                            id : 'магазин приложений',
                            q : 'Как можно использовать PKOIN?',
                            a : '<div>PKOIN имеет множество применений на Bastyon. Во-первых, 50 PKOIN в вашем аккаунте снимают все ограничения на публикацию и позволяют загружать ежедневно до 4ГБ видео. PKOIN можно использовать для того, чтобы сделать ваши комментарии более заметными для всех (Комментарии с донатами будут находиться в самом верху ленты комментариев). PKOIN от таких поднятых комментариев достается блоггеру, и блоггеры должны отвечать или размещать такие комментарии, чтобы поощрять подобные "поднятия" комментариев. Вы можете поднять пост, чтобы продвинуть его вверх в ленте. Он используется для стейкинга в узлах, вы можете запустить узел и заработать больше PKOIN, поставив PKOIN. Он будет использоваться на децентрализованной торговой площадке рекламы, при этом 100% доходов будут поступать блоггерам. Также на него можно будет купить специальные "обои" вашего личного профиля, анимированные изображения профиля и т. д. (Релиз с такими возможностями ожидается в марте) </div>',
                            },
                            
                            
                            {
                            id : 'pocketcoinstock',
                            q : 'Pocketcoin похож на долю акций в '+self.app.meta.fullname+' ?',
                            a : '<div>Нет, это не так. '+self.app.meta.fullname+' даже не корпорация и не имеет никакой собственности. Это открытый код, который может скопировать и запустить каждый. Pocketcoin - это токен, который облегчает обмен ценностями, в частности, рекламные транзакции. Кроме того, '+ self.app.meta.fullname +' будет включать торговую площадку, где товары и услуги будут продаваться напрямую за Pocketcoin.</div>',
                            },
                            
                            // {
                            // id : 'pocketcoinbuy',
                            // q : 'Могу ли я купить дополнительный Pocketcoin?',
                            // a : '<div>Да, в настоящее время вы можете купить Pocketcoin на следующих биржах: DigiFinex, Bitforex, Mercatox. Вы также можете купить его за 19 различных криптовалют на https://pkoin.net/, а в Bastyon есть категория PKOIN / Peer-to-Peer, где вы можете покупать и продавать ее другим пользователям.</div>',
                            // },
                            
                            // {
                            // id : 'pocketcoinbuyfiat',
                            // q : 'Могу ли я купить Pocketcoin за доллары США или другую фиатную валюту? ',
                            // a: '<div> Да, вы можете купить его в категории PKOIN / Peer-to-Peer или через компанию под названием Indacoin по адресу https://buy.pkoin.indacoin.io/ Indacoin не имеет ничего общего с Bastyon, они просто продают PKOIN за кредитные карты после покупки на биржах.</div>',
                            // },
                            
                            {
                            id : 'pocketcoinbuyfiat',
                            q : 'Зачем мне покупать Pocketcoin?',
                            a : '<div>У Bastyon нет поддержки со стороны банкиров или венчурных капиталистов, это децентрализованная социальная платформа, поддерживаемая PKOIN. Когда вы используете Bastyon, вы используете пользовательские узлы, видео узлы, все они должны платить за компьютеры, Интернет и электричество. Блогерам нужно зарабатывать на контенте. Bastyon может работать только в том случае, если пользователи владеют и поддерживают PKOIN. Итак, покупка PKOIN - это способ поддержать децентрализацию и свободу. Однако есть еще одна важная причина для владения Pocketcoin. Вполне возможно, что скоро доступ к вашему банковскому счету будет ограничен без наличия у вас QR-кода.  Pocketcoin не привязан к вашему имени или паспорту и является одним из способ заниматься коммерцией в мире, где царит финансовая цензура. Не исключено, что PKOIN может стать одним из немногих способов покупки еды без определенного сертификата или QR-кода. Покупка PKOIN - отличный способ противостояния цензуре и ограничениям </div>',
                            },
                            ]
                            },
            
                            {
                        
                                name : 'Как я могу купить PKOIN?',
                                id : 'buy-pkoin',
                            
                                group : [
                            
                                    {
                                        id : 'buy-pkoin1',
                                        q : '  ',
                                        a : 'Вы можете купить PKOIN следующими способами: Выберите категорию «PKOIN/Из рук в руки» и посмотрите на предложения о купле/продаже PKOIN, либо сами разместите свое предложение о купле/продаже PKOIN.	',
                                        img: '<img src="img/wn.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin21',
                                        q : '',
                                        a : 'Покупку PKOIN также можно осуществить на следующих сайтах. 	<br> <a target="_blank" href="https://www.bitforex.com/en/spot/pkoin_usdt">https://www.bitforex.com/en/spot/pkoin_usdt</a> <br> <a target="_blank" href="https://www.digifinex.com/en-ww/trade/USDT/PKOIN">https://www.digifinex.com/en-ww/trade/USDT/PKOIN</a>  <br> <a target="_blank" href="https://pkoin.net/">https://pkoin.net/</a> - здесь приобрести  PKOIN можно за другие криптовалюты. <br>		<a target="_blank" href="https://buy.pkoin.indacoin.io/">https://buy.pkoin.indacoin.io/</a> - здесь приобрести PKOIN можно за кредитную карту.',
                                        img: ''
                                    },
                                    {
                                        id : 'buy-pkoin2',
                                        q : 'Pkoin.net - для покупки PKOIN за другие криптовалюты ',
                                        a : 'Выберите криптовалюту, за которую вы хотите приобрести PKOIN, укажите  количество PKOIN, а также введите адрес своего кошелька.',
                                        img: '<img src="img/buy-pkoin2.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin3',
                                        q : '  ',
                                        a : 'Адрес вашего PKOIN-кошелька находится в вашем аккаунте на Бастионе. Чтобы его найти – кликните иконку вашего аватара, которая расположена в правом верхнем углу.',
                                        img: '<img src="img/wn.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin4',
                                        q : '  ',
                                        a : 'Далее кликните по адресу PKOIN, чтобы его скопировать.',
                                        img: '<img src="img/upl7.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin5',
                                        q : '  ',
                                        a : 'Далее, вам нужно ввести адрес вашего PKOIN-кошелька в соответствующее поле и нажать кнопку “Purchase”.',
                                        img: '<img src="img/buy-pkoin5.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin6',
                                        q : '  ',
                                        a : 'После этого вы должны отправить BTC (или другую криптовалюту, которую вы выбрали) на предоставленный вам адрес. ',
                                        img: '<img src="img/buy-pkoin6.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin7',
                                        q : ' Купить PKOIN с помощью кредитной карты на <a href="Buy.pkoin.indacoin.io">indacoin.io</a>     ',
                                        a : 'Для начала, выберите валюту, введите количество, ваш электронный адрес и адрес кошелька PKOIN. Далее, нажмите «Купить PKOIN»',
                                        img: '<img src="img/buy-pkoin7.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin8',
                                        q : '  ',
                                        a : 'Вы увидите окно «Купить PKOIN с кредитной или дебетовой картой», нажмите  «Далее»',
                                        img: '<img src="img/buy-pkoin8.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin9',
                                        q : '  ',
                                        a : 'Далее, введите ваш адрес, почтовый индекс и укажите вашу страну. ',
                                        img: '<img src="img/buy-pkoin9.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin10',
                                        q : '  ',
                                        a : 'Далее, введите ваше имя, страну, номер телефона, дату рождения',
                                        img: '<img src="img/buy-pkoin10.jpg" alt="" />'
                                    },
                                    {
                                        id : 'buy-pkoin11',
                                        q : '  ',
                                        a : 'Введите номер вашей карты и нажмите «Далее».',
                                        img: '<img src="img/buy-pkoin11.jpg" alt="" />'
                                    },
                                    
                                    
                                    
                                    
                                ]
                            
                            },
                            {
                        
                                name : 'Как заработать PKOIN, используя легкую ноду?',
                                id : 'earnbastyon',
                            
                                group : [
                            
                                    {
                                        id : 'earnbastyon1',
                                        q : '',
                                        a : 'Требования: <br />- На вашем компьютере не установлено другое программное обеспечение Bastion/Pocket net node<br />- Ваш жесткий диск - SSD (не жесткий диск)<br />- На твердотельном накопителе вашего компьютера имеется не менее 50 ГБ свободного места<br />- На вашем компьютере имеется не менее 2 ГБ свободной оперативной памяти<br />- Ваша скорость интернета составляет не менее 10 Мбит/сек',
                                        img: ''
                                    },
                                    {
                                        id : 'earnbastyon2',
                                        q : '',
                                        a : 'Перейдите на вкладку “Нода” на странице “Управление”',
                                        img: '<img src="img/earnbastyon2ru.jpg" alt="" />'
                                    },
                                    {
                                        id : 'earnbastyon3',
                                        q : '',
                                        a : 'Вы можете изменить узел и каталог данных, если на вашем диске C недостаточно свободного места',
                                        img: '<img src="img/earnbastyon3ru.jpg" alt="" />'
                                    },
                                    {
                                        id : 'earnbastyon4',
                                        q : '',
                                        a : 'Кликните “Загрузить и установить ноду”',
                                        img: '<img src="img/earnbastyon4ru.jpg" alt="" />'
                                    },
                                    {
                                        id : 'earnbastyon5',
                                        q : '',
                                        a : 'Вы увидите индикатор установки ноды',
                                        img: '<img src="img/earnbastyon5ru.jpg" alt="" />'
                                    },	
                                    {
                                        id : 'earnbastyon6',
                                        q : '',
                                        a : 'Подождите до следующего шага и статуса Запущено. Первый запуск ноды может занять несколько часов – НЕ ВЫКЛЮЧАЙТЕ КОМПЬЮТЕР',
                                        img: '<img src="img/earnbastyon6ru.jpg" alt="" />'
                                    },	
                                    {
                                        id : 'earnbastyon7',
                                        q : '',
                                        a : '',
                                        img: '<img src="img/earnbastyon7ru.jpg" alt="" />'
                                    },	
                                    {
                                        id : 'earnbastyon8',
                                        q : '',
                                        a : '',
                                        img: '<img src="img/earnbastyon8ru.jpg" alt="" />'
                                    },	
                                    {
                                        id : 'earnbastyon9',
                                        q : '',
                                        a : 'Вам нужно будет внести PKOIN, чтобы заработать ставки, нажмите "Внести". После нажатия кнопки Пополнить счет вы увидите адрес пункта. Вы можете скопировать адрес и отправить по нему PKOIN. Если вы еще не купили PKOIN, вы можете купить его следующими способами: <br />1. Покупайте за криптовалюту на pkoin.net (или на биржах DigiFinex Orbit forex)<br />2. Купите его, выбрав тег "PKOIN/Из рук в руки" в левой части приложения Bastyon. Выберите продавца и напишите ему в чат (на свой страх и риск)',
                                        img: '<img src="img/earnbastyon9ru99.jpg" alt="" />'
                                    },	
                                    {
                                        id : 'earnbastyon10',
                                        q : '',
                                        a : 'Доступны и другие функции: <br />– Вывод средств - вывод PKOIN (уменьшает ваши шансы на выигрыш монет)<br />– Сохранить кошелек (кошелек резервного узла, очень важно, сохраняет ваши личные ключи в случае сбоя вашего узла)<br />– Импорт кошелька (вы можете импортировать внешний кошелек с закрытыми ключами)',
                                        img: '<img src="img/earnbastyon10ru.jpg" alt="" />'
                                    },	
                                    {
                                        id : 'earnbastyon11',
                                        q : '',
                                        a : 'В этом примере вы видите, что было внесено 500 PKOIN . Обратите внимание, что ваш кошелек узла отделен от вашего кошелька Бастиона по умолчанию, они не подключены. Вам нужно перевести монеты на узел из кошелька, чтобы выиграть ставки.',
                                        img: ''
                                    },	
                                    {
                                        id : 'earnbastyon12',
                                        q : '',
                                        a : 'После того, как вы внесете PKOIN, необходимо пройти 60 блоков (около 60 минут). Как только вы увидите зеленую галочку с надписью "Стейкинг", вы готовы начать зарабатывать PKOIN. Вы можете периодически заходить и смотреть, как меняется ваш баланс в зависимости от выигрышных ставок. По любым вопросам пишите на support@bastyon.com',
                                        img: '<img src="img/earnbastyon12ru.jpg" alt="" />'
                                    },	
                                    
                                ]
                            
                            },
                            
                        {
                        
                        name: self.app.meta.fullname,
                        id: 'дорожная карта',
                        
                        group : [
                        
                        {
                        id : 'адреса кошельков',
                        q : 'Я вижу адрес аккаунта и адрес кошелька. Связаны ли они между собой?',
                        a: '<div> Адрес аккаунта - это адрес, который используется для публикации контента и использования '+self.app.meta.fullname + ' в целом. В нем также хранятся монеты, которые вы выигрываете за свои публикации с высоким рейтингом. </div> <div> Адреса кошельков предназначены для хранения остальных монет. Эти два адреса не связаны между собой. </div>',
                        },
                        
                        {
                        id : 'ссылка на профиль',
                        q : 'Могу ли я сделать ссылку на свой профиль или на пост, чтобы я мог опубликовать его в других социальных сетях. ',
                        a: '<div>Чтобы поделиться постом, просто щелкните кнопку "поделиться". <br />В браузере перейдите в свой профиль, щелкнув аватар в правом верхнем углу и нажмите «Поделиться», затем установите флажок «Использовать реферальную ссылку», всем, кто зарегистрируется по созданной ссылке, будет предложено подписаться на вас автоматически при регистрации. За каждого реферала, который зарегистрируется по вашей ссылке, вы получите бонус, равный 20% от Pocketcoin (PKOIN), который они зарабатывают, публикуя сообщения и комментируя в течение первых 6 месяцев. Чтобы было понятно, ваш реферал не зарабатывает меньше, вы получаете бонус.</div><div></div>',
                        },
                        // {
                        // id : 'звездная система',
                        // q : 'Система оценок. Есть ли ограничение на количество звезд, которые человек должен дать людям?',
                        // a : '<div>Есть некоторые ограничения. Но по мере роста вашей репутации вы можете голосовать все больше и больше. Это сделано, поэтому боты не ломают нашу цепочку блоков. Первоначально вы получаете 100 оценок каждые 24 часа. По мере роста вашей репутации (это происходит благодаря публикациям и получению оценок) вы делаете 200 оценок в день.</div>',
                        // },
                        
                        
                        {
                        id : 'время обновления профиля',
                        q : 'Как часто я могу обновлять свой профиль? ',
                        a : '<div>Вы можете обновлять свой профиль один раз в час.</div>',
                        },  
                        
                        {
                        id : 'мобильное приложение',
                        q : 'Есть ли мобильное приложение?',
                        a : '<div>Есть приложение для Android, вы можете скачать его <a href="https://play.google.com/store/apps/details?id=pocketnet.app">здесь</a>.<br />Приложение для iPhone недоступно, потому что Apple требовала от нас цензуры любого контента в круглосуточном режиме. В Bastyon даже разработчики не могут удалять контент, он модерируется пользователями. Bastyon оптимизирован для мобильных браузеров, таких как Safari на iPhone.</div>',
                        },
                        
                        {
                        id : 'лимит публикации',
                        q : 'Можете ли вы сказать мне, каков лимит публикаций и оценок каждый день или час?',
                        a : '<div>Да, у нас действительно есть некоторые ограничения публикации материалов, основанные на математическом алгоритме. <br /> Система регистрации нового аккаунта устроена таким образом, что она не требует ни адреса электронной почты, ни номера мобильного телефона при его регистрации, поскольку Bastyon не нуждается в ваших персональных данных. При этом, описанная система регистрации имеет один недостаток – невозможно исключить «Ботов» на этапе регистрации нового аккаунта. <br />Поэтому мы решили, что целесообразно бороться с ботами не в процессе регистрации аккаунта, а после его регистрации, используя систему внутренней модерации Bastyon. Другими словами, борьба с ботами будет настолько эффективна, насколько активно пользователи Bastyon будут оценивать других пользователей Bastyon и насколько активно будут публиковатся интересные материалы.<br />Вот рекомендации, как зарабатывать рейтинги и перейти из категории «аккаунта-новичка» в категорию «аккаунт с высокой репутацией». <br />В целом, залог постоянного роста репутации и получения рейтингов очень прост – публикуйте интересный контент и получайте высокие оценки от других пользователей.<br /> <b> рейтинг 100  + 100 голосов «репутационных» пользователей <br /> или <br /> рейтинг 100 + 30 голосов «репутационных»  пользователей + 6 первых месяцев после регистрации. </b>  <br />В течение первых 6 месяцев после создания нового аккаунта:<br />вы можете размещать 5 постов и выставлять 15 оценок каждые 24 часа. Как только ваша репутация превысит 100 и будет по крайней мере 100 пользователей с высокой репутацией, которые проголосовали за вас, вы сможете делать до 30 постов и 200 оценок, а также 300 комментариев каждые 24 часа.<br /> При этом, если за 6 месяцев ваша репутация составила 100 и вы получили только 30 (и более) оценок от высокорейтинговых пользователей, то ваш аккаунта автоматически перейдет в категорию высокорейтинговых аккаунтов.<br />Примечание: и в одном и во втором случае появляется возможность публикации видео. Если вы не намерены ожидать, когда ваш рейтинг достигнет более 100 пунктов и когда вы получите более 100 (30) голосов от рейтинговых пользователей, вы можете получить доступ к загрузке видео		путем покупки PKOIN. <br />Квоты на загрузку видео составаят: <br />5PKOIN - до 500Мб видео ежедневно;<br />50PKOIN - до 4Гб видео ежедневно, а также 30 постов и 200 оценок, а также 300 комментариев каждые 24 часа.		</div>',
                        },
                        
                        {
                        id : 'репутация',
                        q : 'Что такое репутация и как она рассчитывается?',
                        a : "<div>Ваша репутация - это сумма ваших рейтингов. Обратите внимание, что пользователи с репутацией ниже 50 не влияют на чью-либо репутацию. Они могут оценивать контент, но это не влияет на репутацию. </div> <br /> <div> Итак, 5 звоздочек -> 2 рейтинга <br> 4 звездочки -> 1 <br> 3 звездочки -> 0 <br> 2 звездочки -> -1 рейтинг <br> 1 звездочка -> -2 рейтинга </div> <div> Приведем пример: если при публикации поста рейтинговые пользователи поставили вам две оценки по 5 звездочек и одну оценку в 1 звездочку, то формула рассчета будет выглядеть так:<br> 2 + 2 - 2 = 2. Таким образом ваш рейтинг повысится на 2 пункта. </div> ",
                        },
                        
                        {
                        id : 'удалить сообщение или пользователя',
                        q : 'Есть ли способ удалить или отредактировать сообщение?',
                        a : '<div>Да, вы можете редактировать и удалять сообщения.</div>',
                        },
                        
                        {
                        id : 'поиск пользователей',
                        q : 'Есть ли способ найти пользователя?',
                        a : '<div>Щелкните значок лупы поиска вверху и выполните поиск по имени пользователя или ключевым словам.</div>',
                        },
                        {
                        id : 'следить',
                        q : 'Как подписаться, чтобы отслеживать любимых блогеров?',
                        a : '<div>Чтобы подписаться на автора/блогера (вверху поста) есть ссылка Подписаться, вы можете найти его посты в топ постов (красный огонь вверху страницы). Вы также скоро увидите ленту «Мои подписки», которая будет отличаться от основной ленты. В основной ленте будет все, что кто-либо публикует, но фид подписок будет содержать только сообщения пользователей, на которых вы подписаны. Итак, вы будете заходить в общую ленту в поисках хорошего контента, хотя вам может не все нравиться. Затем выберите те, которые хотите сохранить. </div>',
                        },
                        
                        
                        {
                        id : 'другие браузеры',
                        q : 'Можно ли его использовать в браузерах Brave или Duck Duck go?',
                        a : '<div>'+self.app.meta.fullname + ' должен работать в этих браузерах. Он полностью функционален в Chrome и Firefox. Но мы настоятельно рекомендуем всем загрузить настольное приложение - загрузите '+ self.app.meta.fullname +' Setup.exe <a href="https://github.com/pocketnetteam/pocketnet.gui/releases"> здесь</a>. Настольное приложение невозможно заблокировать, даже если bastyon.com не работает или заблокирован по какой-либо причине. Подобные ограничения являются новым тоталитарным трендом.</div>',
                        },
                        
                        {
                        id : 'ответ на сообщение',
                        q : 'Можем ли мы отвечать на собственные / и другие сообщения?',
                        a : '<div>Да, комментирование доступно под каждым постом.</div>',
                        },
                        
                        {
                        id : 'добавить теги',
                        q : 'Как добавить тег к посту?',
                        a : '<div>Под постом выберите категорию или введите тег  и нажмите клавишу ВВОД. "#" добавлять не нужно - добавление происходит автоматически.</div>',
                        },
                        
                        {
                        id : 'использовать публичный адрес',
                        q : 'Как я могу использовать публичный адрес?',
                        a : '<div>Ваш публичный адрес - это то, что '+ self.app.meta.fullname +' использует для проверки вашей личности. По сути, ваш закрытый ключ - это большое число (которое может быть представлено последовательностью из 12 слов или приватным ключом, которые конвертируются в большое число). Это число умножается на другое, известное всем (называемое базовой точкой эллиптической кривой), и мы получаем открытый ключ. Когда вы вводите свой закрытый ключ, мы можем умножить его на базовую точку, чтобы получить ваш открытый ключ и сопоставить его с общедоступным адресом. Если они совпадают, мы знаем, что это вы. Невозможно вернуться назад, т.е. разделить открытый ключ на базовую точку, чтобы получить свой закрытый ключ. В криптографии умножение работает только в одну сторону и обратное деление невозможно, поэтому ваш ключ в безопасности. '+ self.app.meta.fullname +' использует ту же самую криптографию, что и Биткойн. </div>',
                        },
                        {
                        id : 'настольный Mac',
                        q : 'Будет ли загружаемый исполняемый файл для Mac?',
                        a : '<div>Да, вы можете найти его <a target="_blank" href="https://github.com/pocketnetteam/pocketnet.gui/releases">здесь</a>.</div>',
                        },
                        {
                        id : 'темный режим',
                        q : 'Как изменить тему на темный режим?',
                        a : '<div>Переключение режима можно найти в настройках. Если вы находитесь в браузере, щелкните изображение своего профиля> Управление> Настройки. Если вы используете мобильный телефон, щелкните "бургер-меню" в правом нижнем углу> Настройки. </div>',
                        },
                        {
                        id : 'запрет ',
                        q : 'Можно ли банить людей?',
                        a : '<div>Да, Bastyon - это платформа, модерируемая сообществом, однако есть только определенные темы, которые будут отмечены сообществом, такие как порнография, наркотики и прямые угрозы насилия. Вас никогда не забанят за свое мнение или свободу слова, и даже по конкретным запрещенным темам должен быть консенсус опытных пользователей, при этом другие пользователи не защищают контент. В настоящее время пользователи с репутацией ниже -30 теряют свои привилегии учетной записи, но это временная система. К концу 2021 года Bastyon выпускает новую систему модерации, в которой сообщения изначально помечаются любым пользователем с высоким уровнем репутации, но учетные записи могут быть заблокированы только определенной группой присяжных, выбранных с помощью лотереи блокчейна. Таким образом, никто не может атаковать кого-то за мнение, присяжные будут выбраны для модерации определенного контента, и все они должны согласиться. Аккаунт не может быть заблокирован до тех пор, пока не будет определено два состава присяжных, и они не могут быть одинаковыми. Эта система защищает от любых правил мафии на Bastyon, одновременно защищая платформу от сомнительного контента.</div>',
                        },	
                        {
                        id : 'Приложение Apple',
                        q : 'Когда в Apple добавят Bastyon?',
                        a : '<div>Apple решила не допускать Bastyon из-за отсутствия у Bastyon возможностей централизованной цензуры. Мы гордимся этой оценке Apple.</div>',
                        },
                        {
                        id : 'Отсутствует PKCOIN',
                        q : 'Помощь! Мне не хватает моего PKOIN!',
                        a : '<div>Если по какой-то причине кажется, что ваш PKOIN пропал, сначала проверьте обозреватель блоков через <a href="https://'+self.app.options.url+'/blockexplorer/"> BlockExplorer</a> на предмет того, что ваши монеты все еще там. Просто найдите адрес своего кошелька в строке поиска, и он покажет вам баланс вашей учетной записи. </div>',
                        },
                        
                        ]
                        
                        
                        },
                        {
                        
                        name : 'Видео',
                        id : 'видео',
                        
                        group : [
                        {
                        id : 'сохранить видео',
                        q : 'Где вы сохраняете видеоконтент?',
                        a : '<div>'+self.app.meta.fullname + ' использует модифицированную платформу с открытым исходным кодом под названием PeerTube, подключенную к блокчейну Pocketnet и приложению Bastyon. PeerTube полностью интегрирован с авторизацией '+ self.app.meta.fullname +', каждый видеосервер зарегистрирован в блокчейне.</div>',
                        },
                        
                        {
                        id : 'разрешения',
                        q : 'Кто может загружать видео в Bastyon?',
                        a : '<div> Bastyon не имеет централизованных серверов или венчурного финансирования, все видео хранится на серверах, обслуживаемых пользователями. Поэтому мы не можем позволить всем загружать видео, серверы быстро заполнятся. Для загрузки видео вам необходимо иметь в аккаунте 5 PKOIN (500 МБ) или 50 PKOIN (4 ГБ). Вы можете купить PKOIN у других пользователей, если выберете категорию PKOIN / Peer-to-Peer. </div>',
                        },
                        {
                        id : 'статистика',
                        q : 'Где я могу посмотреть статистику моих видео?',
                        a : '<div> Зайдите в свой профиль и посмотрите Мои видео. </div> ',
                        },
                        {
                        id : 'технологии',
                        q : 'Какой плеер вы используете для воспроизведения видео?',
                    
                        a : '<div> В Бастионе есть собственный плеер, который представляет собой значительно модифицированную версию PeerTube. Как и PeerTube, он использует технологию WebTorrent для снижения нагрузки на сервер. Это означает, что пользователи, просматривающие видео, делятся им. Обратите внимание, что в некоторых случаях это означает, что пользователи могут видеть IP-адреса друг друга. Серверы Bastyon не имеют никакого механизма для записи этих IP-адресов, однако, если вы действительно заботитесь о безопасности своего IP-адреса, вам следует использовать надежного поставщика VPN. Если вы хотите минимизировать одноранговое совместное использование, вы можете использовать функцию загрузки видео в Bastyon.</div> ',
                        },
                        {
                        id : 'время',
                        q : 'Почему для загрузки видео требуется время?',
                        a : '<div> Опять же, у Bastyon нет ресурсов, которые есть у Google. Видео необходимо загрузить в один из видеоузлов, а также его необходимо перекодировать. Помните, что YouTube не является бесплатным, он извлекает ценность, используя вашу ЛИЧНУЮ информацию и монетизируя ее. Bastyon находится в ведении сообщества, и небольшая задержка - небольшая плата за конфиденциальность и свободу. Кроме того, разработчики Bastyon сделали процесс загрузки сверхлегким и гораздо более надежным, чем на других платформах, и ориентированным на свободу (часто они даже не перекодируют файлы различного качества). </div>',
                        },
                        
                        
                        ]
                        
                        },
                        {
                        
                            name : 'Загрузка видео',
                            id : 'Uploading',
                        
                            group : [
                        
                                {
                                    id : 'Uploading1',
                                    q : '  ',
                                    a : 'Важно! Функция загрузки видео доступна для пользователей, которые имеют не менее 5 PKOIN, либо не менее 100 рейтингов. При этом 5 PKOIN позволяют загружать не более 500 Мб в сутки. Если у вас есть 50 PKOIN, ваши лимиты загрузки увеличатся до 4 Гб в сутки. При этом вы должны постоянно иметь не менее 5/50 PKOIN, чтобы вы не были верифицированы как бот.',
                                    img: ''
                                },
                                {
                                    id : 'Uploading2',
                                    q : 'Нажмите «Что нового?» во вкладке «Лента»',
                                    a : '',
                                    img: '<img src="img/videoUpl.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading3',
                                    q : 'Далее, нажмите «Загрузить видео», а затем во всплывающем окне нажмите «Выбрать файл». Выберите на персональном компьютере необходимый файл и ожидайте окончания загрузки и последующего перекодирования видео. ',
                                    a : '',
                                    img: '<img src="img/videoUpl2.jpg" alt="" />',
                                    
                                },
                                {
                                    id : 'Uploading4',
                                    q : '',
                                    a : '',
                                    img: '<img src="img/videoUpl3.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading5',
                                    q : '',
                                    a : '',
                                    img: '<img src="img/videoUpl4.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading6',
                                    q : '',
                                    a : 'Далее, когда загрузка видео будет окончена, добавьте заголовок и описание, категорию, а так же выберите видимость поста: <br />«Видимо для всех»<br />«Видимо только для подписчиков»<br />«Видно только для пользователей Бастиона»',
                                    img: '<img src="img/upl5.jpg" alt="" />'
                                },
                                {
                                    id : 'Uploading7',
                                    q : '',
                                    a : '',
                                    img: '<img src="img/upl6.jpg" alt="" />'
                                },
                                
                                
                                
                            ]
                        
                        },
                        
                        {
                        
                            name : 'Мои видео',
                            id : 'Myvideos',
                        
                            group : [
                        
                                {
                                    id : 'Myvideos1',
                                    q : '  ',
                                    a : 'Нажмите иконку вашего аватара в правом верхнем углу.',
                                    img: '<img src="img/wn.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos2',
                                    q : ' ',
                                    a : 'Далее, нажмите кнопку «управление»',
                                    img: '<img src="img/manage.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos3',
                                    q : '  ',
                                    a : 'Далее, нажмите «Мои видео»',
                                    img: '<img src="img/myvid.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos4',
                                    q : '  ',
                                    a : 'Вы окажетесь в видео кабинете, в котором содержится информация о размещенных вами видео, среднем рейтинге, общем количестве просмотров видео, а также настройки видео.',
                                    img: '<img src="img/Myvideos4.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos5',
                                    q : '  ',
                                    a : 'Если вы хотите изменить описание или заголовок видео, превью видео, нажмите на три точки и выберите необходимое действие.',
                                    img: '<img src="img/chsec.jpg" alt="" />'
                                },
                                {
                                    id : 'Myvideos6',
                                    q : '  ',
                                    a : 'В верхней части видеостраницы вы можете увидеть дневные лимиты на загрузку видео, количество реферальных пользователей, общее количество просмотров видео, количество уникальных посетителей, поле для поиска видео, также вы можете произвести сортировку.',
                                    img: '<img src="img/chsec2.jpg" alt="" />'
                                },
            
                                
                                
                            ]
                        
                        },
                        
                        
                    
                        {
                        
                        name : 'Конфиденциальность',
                        id : 'Конфиденциальность',
                        
                        group : [
                        
                        
                        {
                        id : 'анонимный',
                        q : 'Анонимны ли люди, которые не вводят свои настоящие имена?',
                        a : '<div>Да - ни имена, ни телефоны, ни электронная почта НЕ связаны с вашей учетной записью.  Ввод электронной почты необязателен. Вы можете ввести электронную почту для получения рассылок  от разработчиков.</div>',
                        },
                        
                        {
                        id : 'вид снаружи',
                        q : 'Насколько Bastyon анонимный?',
                        a : '<div>Блокчейн открыт для всех, но там видно лишь действия в соцсети вашего анонимного аккаунта, такие как пост или рейтинг другого поста. Никаких личных данных не видно, и все ваши сообщения зашифрованы сквозным шифрованием. Также вы можете иметь несколько учетных записей в Бастионе и переключаться между ними. Вы можете использовать одни со своим настоящим именем, а другие анонимно. Анонимность - отличный инструмент для защиты свободы слова от злоупотребления властью.</div>',
                        },
                        
                        
                        // {
                        // id : 'walletid',
                        // q : 'Похож ли мой открытый ключ на идентификатор кошелька, который я ввожу в моем профиле и на который люди могут отправлять баллы?',
                        // a : '<div>Exactly. И это безопасно. Но не секретная фраза - береги!</div>',
                        // },
                        
                        {
                        id : 'узел',
                        q : 'Могу ли я запустить узел на моем автономном сервере?',
                        a : '<div> Инструкции <a href="https://github.com/pocketnetteam/pocketnet.core/blob/master/README.md" target="_blank">здесь</a>  </div>',
                        },
                        
                        {
                        id : 'подписка ',
                        q : 'Как я могу войти снова? ',
                        a : '<div>Вы можете использовать свой закрытый ключ из 12 слов или закрытый ключ, состоящий из букв и цифр.</div>',
                        }
                        ]
                        },
                        {
                        
                        name : 'Модерация контента',
                        id : 'курирование',
                        
                        group : [
                        
                        {
                        id : 'содержание',
                        q : 'Есть ли контент, запрещенный к публикации на  '+ self.app.meta.fullname +'? Если какой-то контент запрещен, можно ли назвать платформу свободой слова?',
                        a : '<div>Это очень важный вопрос. Начнем с того, что разрешены не все типы контента. Модерация производится непосредственно сообщенством '+self.app.meta.fullname+', о чем мы поясним ниже. Скрытые теневые запреты или выборочных запреты, практикуемые Кремниевой долиной, отсутствуют на '+self.app.meta.fullname+'.</div>',
                        },
                        {
                        id : 'конкретный',
                        q : 'Особенности модерации на '+self.app.meta.fullname+'.',
                        a : '<div> В настоящее время модерация контента осуществляется с помощью оценок в 1 звезду пользователями с высокой репутацией. Когда репутация достигает -30, доступ к аккаунту ограничивается. Однако существует совершенно новый алгоритм модерации, который будет выпущен к концу 2021 года. Согласно новым алгоритмам, будет возможность пометить пользователя или сообщение любым высокопоставленным пользователем, но это не повлияет на счет напрямую. После того, как будет установлено определенное количество флагов, на блокчейне будет разыграна лотерея, и для этой учетной записи будет выбрана группа модераторов присяжных заседателей. Присяжные должны согласиться с тем, что этот пользователь разместил порнографию, наркотики или прямую угрозу насилия. Любое иное мнение или несогласие не является основанием для пометки или каких-либо санкций.</div> ',
                        },
                        {
                        id : 'взаимный',
                        q : 'Разрешено ли взаимное голосование?',
                        a : '<div> Взаимность - нормальное человеческое поведение, поэтому в этом смысле с этим нет проблем. Однако механизмы курирования во многом зависят от того факта, что как высокие, так и низкие оценки связаны с контентом и не являются взаимными. Таким образом, Бастион ограничит ответные голоса двумя способами. Во-первых, вы не сможете вернуть пять или одну звезду в течение определенного периода времени. Кроме того, те, кто угрожает возмездием за голоса в одну звезду или обещают награду за голоса в пять звезд, считаются участниками запрещенного поведения. Другие пользователи могут отмечать такие случаи, и псевдослучайная лотерея создаст жюри для их рассмотрения. Хотя такое поведение не будет иметь тех же штрафов, что и незаконный контент, пользователям, задействованным в нем, могут быть предоставлены временные блокировки алгоритмом консенсуса узла. </div> ',
                        },
                        // {
                        // id : 'расизм',
                        // q : 'Важное примечание о расизме.',
                        // a : '<div>Свобода мысли и свобода слова подвергаются нападкам со стороны основных социальных платформ и средств массовой информации. Мы должны говорить правду, и именно по этой причине эта платформа не является корпоративной и децентрализованной. Но мы просим всех высказывать свою точку зрения, не нападая на национальность или расу людей. Вы можете обосновать свою точку зрения на доказательствах. Мы не можем позволить себе превратить ' + self.app.meta.fullname + ' в маргинальную платформу. Говорите правду, но, пожалуйста, избегайте расизма и нападок на определенные национальности в целом. Мы знаем, что Кремниевая долина и СМИ превратили проблему расизма в свою игральную карту, которую они разыгрывают в необходимый момент. Одна из задач '+ self.app.meta.fullname +' - стать платформаой альтернативного мнения, создать техническую и социальную возможность обличать ложь СМИ, рассказывать о произволе властей, коррупции, не опасаясь потери опубликованных материалов. Пожалуйста, имейте это в виду и рассказывайте о платформе близким людям, чтобы свобода слова могла процветать. </div> <div> В конечном счете, именно сообщество будет определять направление платформы. Иметь кучу снежинок, которые жалуются на то, что их оскорбляет, так же плохо, как и когда люди хотят озвучить прямые насильственные угрозы. Однако первым признаком является то, что первые пользователи платформы, как правило, умны и основаны на доказательствах, поэтому будущее выглядит невероятно светлым. Команда '+ self.app.meta.fullname +' заметила после нескольких дней бета-тестирования, что мы перестали читать даже альтернативные новости, потому что на '+ self.app.meta.fullname +' было так много интересного контента. Так держать! </div> <div> Пожалуйста, примите участие в обсуждении этих тем. Это платформа сообщества. Мы всегда стремимся повысить прозрачность платформы, и вы должны сообщить нам, как мы можем улучшить контроль и контроль контента. Вы можете публиковать сообщения по этой теме в теге Bastyon / Pocketnet.</div>',
                        // },
                        
                        
                        ]
                        
                        },
                        
                        
                        {
                        
                        name : 'Чем '+self.app.meta.fullname+' отличается от...',
                        id : 'разные',
                        
                        group : [
                        
                        {
                        id : 'разные1',
                        q : 'Twitter, Facebook, Reddit и другие централизованные платформы?',
                        a : '<div>Нет центрального офиса или корпорации. Платформа управляется равными узлами в цепочке блоков. Вся прибыль делится между операторами узлов и создателями контента. Операторы узлов делают ставку на Pocketcoin, чтобы чеканить блоки с вознаграждениями и комиссиями за транзакции. Половина вознаграждений в каждом блоке достается создателям контента на основе оценок, которые их контент собирает от пользователей.</div>',
                        },
                        {
                        id : 'разные2',
                        q : 'Децентрализованные платформы, такие как Minds.com и Sola?',
                        a : '<div>Обе эти платформы, хотя и великолепны, но они не являются самодостаточными. Обе сильно зависят от платформы Ethereum, поскольку их токены основаны на стандарте ERC-20 Ethereum. Это означает, что за операции с токенами взимается довольно большая плата. Кроме того, за этими организациями стоят корпорации, и корпорация всегда будет точкой централизации из-за своей экономической логики роста прибыли. Кроме того, корпорации очень легко подвергнуть цензуре.</div>',
                        },
                        {
                        id : 'разные s3',
                        q : 'От Steemit?',
                        a : '<div>У Steemit есть собственный блокчейн, но это корпоративная структура со всей вытекающей из этого централизацией.</div>',
                        },
                        {
                        id : 'разные ps4',
                        q : 'Децентрализованные платформы, такие как Mastodon и другие?',
                        a : '<div>Хотя Mastodon - полностью децентрализованная платформа, для ее использования требуются большие технические знания. Это является большим препятствием для потенциального широкого признания. '+ self.app.meta.fullname +' включает веб-приложения и настольные приложения, и пользователи могут входить в систему с любого устройства, извлекать свои личные настройки из цепочки блоков и сразу же начинать использовать платформу без каких-либо технических знаний.</div>',
                        }
                        
                        ]
                        
                        },
                        
                        {
                        
                        name : ''+self.app.meta.fullname+' экосистема',
                        id : 'экосистема',
                        
                        group : [
                        
                        {
                        id : 'экосистема 1',
                        q : 'Как финансируется развитие '+self.app.meta.fullname+' ?',
                        a : '<div>'+self.app.meta.fullname+' имеет открытый исходный код и в настоящее время управляется группой добровольцев-экспертов по программированию и математике. После запуска '+self.app.meta.fullname+' привлек талантливых программистов, обещая создать децентрализованную социальную сеть. Программисты и маркетологи, работают за Pocketcoin, пожертвованынный крупными владельцами PKOIN.</div>',
                        },
                        {
                        id : 'экосистема 2',
                        q : 'Что такое Pocketcoin?',
                        a : '<div>Pocketcoin - это сетевой токен. Он используется исключительно для покупки рекламы на '+self.app.meta.fullname+' вкладчиков и платить комиссию за такие платежи. Он также используется для поднятия комментариев, публикаций и покупки привилегий для вашей учетной записи. В '+self.app.meta.fullname+' весь доход делится между создателями контента и узлами.</div>',
                        },
                        {
                        id : 'экосистема 3',
                        q : 'Как вознаграждаются создатели контента и операторы узлов?',
                        a : '<div>'+self.app.meta.fullname+' имеет уникальную прямую торговую площадку, где создатели контента могут продавать рекламу покупателям рекламы. Создатели контента устанавливают свою цену и могут принимать массовую рекламу или могут предлагать высоко ценимые персонализированные места размещения (создатели продвигают продукт по-своему). Прямая торговая площадка - это, по сути, биржа для рекламы, которая позволяет покупателям рекламы нацеливаться на определенную аудиторию без каких-либо посредников. Все покупки рекламы и сама реклама связаны в блокчейне, поэтому покупка рекламы абсолютно надежна.</div>',
                        },
                        {
                        id : 'экосистема 4',
                        q : 'Что, если пользователи размещают незаконный контент, порнографию и СПАМ?',
                        a : '<div>'+self.app.meta.fullname+' это не платформа даркнета или какой-то порнхаб. Хотя '+self.app.meta.fullname+' децентрализован и устойчив к цензуре, он модерируется пользователями. Любой незаконный контент помечается и удаляется с платформы. Это означает, что модерировать платформу могут пользователи с наивысшей репутацией. Однако, не существуют гарантии (в рамках открытого исходного кода), что за деструктивный контент не проголосуют пользователи с высокой репутацией. Модераторы контента выбираются случайным образом с помощью лотереи на блокчейне, чтобы избежать каких-либо подтасовок. Модерируется только запрещённый контент (порнография, педофилия, пропаганда нелегальных нарктотиков и прямые угрозы насилия), а НЕ просто к контенту, который они считают оскорбительным. Bastyon является платформой для свободы слова, мы призываем каждого участвовать в модерации контента путем проставления оценок, публиковать интересный авторский контент, повышая таким образом свою репутацию и привнося вклад в развитие платформы.</div>',
                        },
                        {
                        id : 'экосистема 5',
                        q : 'Кто управляет '+self.app.meta.fullname+'?',
                        a : '<div>Нет юридического лица или отдельного лица, которое владеет или контролирует '+self.app.meta.fullname+'. Блокчейн Pocketnet и Bastyon управляются группой программистов, но эта группа постоянно растет и меняется. Если какая-то группа программистов ошибется и нарушит принципы, на которых основан Bastyon, другие программисты могут просто разветвить открытый исходный код и продолжить платформу, устойчивую к цензуре. </div>',
                        },
                        
                        ]
                        
                        },
                        {
                        
                            name : 'Как мне найти приватный ключ?',
                            id : 'privatekey',
                        
                            group : [
                        
                                {
                                    id : 'privatekey1',
                                    q : 'Кликните по своей иконке, находящейся в правом верхнем углу',
                                    a : '',
                                    img: '<img src="img/wn.jpg" alt="" />'
                                },
                                {
                                    id : 'privatekey2',
                                    q : 'Далее, нажмите кнопку «управление»',
                                    a : '',
                                    img: '<img src="img/manage.jpg" alt="" />'
                                },
                                {
                                    id : 'privatekey3',
                                    q : 'Далее, нажмите кнопку «приватный ключ».',
                                    a : '',
                                    img: '<img src="img/prkey3.jpg" alt="" />'
                                },
                                {
                                    id : 'privatekey4',
                                    q : 'Далее, нажмите «Да»',
                                    a : '',
                                    img: '<img src="img/prkey4.jpgg" alt="" />'
                                },
                                {
                                    id : 'privatekey5',
                                    q : 'Вы можете увидеть ваш приватный ключ. Держите его в сохранности (сохраните в надежном месте, запишите на листок). Приватный ключ не может быть восстановлен в случае его утраты.',
                                    a : '',
                                    img: '<img src="img/prkey5.jpg" alt="" />'
                                },	
                                
                                
                            ]
                        
                        },
                        {
                        
                            name : 'Кодекс чести Бастиона',
                            id : 'codex',
                        
                            group : [
                        
                                {
                                    id : 'honor1',
                                    q : 'Обязанности пользователей:',
                                    a : '<ul><li>Уважайте различные мнения и старайтесь сделать платформу дружелюбной к новичкам</li><li>Отметить запрещенный контент:<ol><li>Любой вид порнографии</li><li>Прямые угрозы насилием</li><li>Продвижение незаконных наркотиков</li></ol></li><li>Дайте пять звезд любой публикации, которую вы просматриваете и считаете высококачественной</li><li>Точно так же ставьте 1 звезду плохому контенту, это помогает сети</li><li>Используйте 1 звезду, чтобы обеспечить соответствие контента используемым тегам</li><li>Не отмечайте и не голосуйте за простое несогласие, а только за запрещенный контент</li><li>Не участвуйте во взаимных оценках или любых рейтингах, не основанных на качестве контента</li></ul>',
                                    img: ''
                                },
                                {
                                    id : 'honor3',
                                    q : 'Обязанности разработчиков:',
                                    a : '<ul><li>Каждая строка кода должна быть с открытым исходным кодом, распространяться по лицензии MIT или Apache</li><li>Отсутствие зависимости от центральных серверов, любой ресурс в сети управляется пользователями, модель равных узлов Биткойн</li> <li>Модерация осуществляется только пользователями сети, имеющими в настоящее время высокую репутацию. В новой системе жюри модераторы будут в равной степени принадлежать к следующим трем группам, каждая из которых заинтересована в успехе сети:<ol><li>Пользователи с высокой репутацией</li><li>Делегаты от блогеров с высокой активной аудиторией</li><li>Делегаты от давних держателей PKOIN</li></ol></li><li>Разработчики могут участвовать в модерации только как обычные пользователи, никакая дискриминация какой-либо учетной записи не может происходить с помощью кода</li><li>Должны общаться с пользователями через комментарии</li></ul>',
                                    img: ''
                                },
                                {
                                    id : 'honor2',
                                    q : 'Пользователи оператора узла:',
                                    a : '<ul><li>Старайтесь улучшать сеть, оставляйте отзывы разработчикам</li><li>Сделайте узлы доступными для поддержки приложения а не только для стейкинга</li><li>Объяснить другим пользователям, как запускать узлы, увеличивать количество узлов и поддерживать сеть</li></ul>',
                                    img: ''
                                },
                                
                                	
                                
                                
                            ]
                        
                        },
                        {
                        
                            name : 'Бонусная Программа Bastyon',
                            id : 'bonus',
                        
                            group : [
                        
                                {
                                    id : 'bonus1',
                                    q : '',
                                    a : 'Критерии для получения бонуса за оригинальный контент:  Каждые 15 тысяч просмотров видео + 1500 пятизвёздочных рейтингов от уникальных пользователей + 1500 реферальных пользователей <br />PKOIN или Bitcoin:  1,000 USDT <br />Как ускорить получение бонуса?<br />Делитесь ссылкой на видео в социальных сетях, с помощью мессенджеров или через почту. Выставляйте эксклюзивные материалы для подписчиков в Бастионе (это делается при создании поста, выбрать Для Подписчиков). Эксклюзивные материалы увеличат количество реферальных подписок.<br />Делитесь ссылкой на ваш профиль.<br />Всегда выбирайте Реферальная Ссылка, когда делитесь ссылкой на Бастион (на видео или профиль).<br />Если вы пригласите блоггера и докажете это, вы получите бонус в размере до 25% от первых 4 бонусов.<br />По вопросам обращайтесь support@bastyon.com.',
                                    img: ''
                                },                                  
                            ]
                        
                        },
                        
                        
            
                        
                        
                    ],
                    fr : [
                        {
                    
                            name : "Comment "+self.app.meta.fullname+" fonctionne-t`il?",
                            id : "how-it-works",
                    
                            group : [
                    
                                {
                                    id : "What is it",
                                    q : "Qu`est-ce que c`est " +self.app.meta.fullname+"?",
                                    a : "<div><p>" +self.app.meta.fullname+" est un réseau social innovant et une plateforme de partage de vidéos. Contrairement aux réseaux sociaux grand public, il n'y a pas de société derrière cela, il est basé sur le modèle Bitcoin. Bastyon est un projet open source géré par une équipe de développeurs et d'experts, et son objectif est de fournir une plate-forme modérée par la communauté où la liberté d'expression est sérieusement respectée.</p><p>Le projet a été créé à l'origine by Daniel Satchkov, mais englobe désormais plus de 25 développeurs et de nombreux bénévoles à travers le monde. Bastyon est plus un protocole qu'une plate-forme, puisque tout développeur peut y créer sa propre application. La plateforme ne fonctionne pas sur un seul serveur mais sur un réseau de <em>user nodes</em> répartis dans le monde entier.</p><p>Cela signifie que les utilisateurs sont toujours en mesure d'obtenir des informations et communiquer, voir le contenu et publier tant qu'ils ont une connexion Internet et que seule une poignée de nœuds quelque part dans le monde sont opérationnels.</p><p>Cela surmonte les limitations que les censeurs ont mises en place pour bloquer ou limiter la communication et la diffusion de l'information. L'information peut circuler librement. Alors qu'en Chine, par exemple, certains réseaux sociaux ne peuvent être utilisés que derrière un VPN, cela n'est pas nécessaire avec "+self.app.meta.fullname+".</p><p>De plus, "+self.app.meta.fullname+" ne collecte pas d'informations personnelles : les utilisateurs s'enregistrent sans e-mail ni numéro de téléphone et aucune donnée personnelle telle que l'adresse IP ou MAC n'est stockée de quelque manière que ce soit. Notez que même si Bastyon ne collecte aucune IP (comme on peut le voir dans le code ouvert), il n'est pas possible de masquer complètement votre IP lorsque vous utilisez Internet, sauf si vous utilisez un VPN. </p><p> Ce faisant,"+self.app.meta.fullname+" permet aux utilisateurs de discuter librement des problèmes. Aujourd'hui, l'anonymat est une exigence de sécurité et de confidentialité et"+self.app.meta.fullname+" est en mesure de le garantir.</p><p>En outre, afin de fournir une communication totalement privée et anonyme,"+self.app.meta.fullname+" fournit un système de discussion crypté, non associé à un numéro de téléphone ou à des données personnelles, protégé par un modèle de cryptage peer-to-peer (notez que les discussions de groupe ne sont pas cryptées, seulement 1-on -1 tchat). Personne, à l'exception des deux utilisateurs impliqués dans la session de discussion, ne peut accéder aux messages. Toutes les affirmations sont faciles à vérifier, car l'application Bastyon et la blockchain Pocketnet sont toutes deux entièrement open source, avec un code visible par tous. De plus, tous les messages de discussion sont automatiquement supprimés après 7 jours.</p><p>"+self.app.meta.fullname+" est une plate-forme sociale pseudonyme résistante à la censure où les gens peuvent discuter, communiquer et partager du contenu avec d'autres de manière transparente; règles qui sont les mêmes pour chaque utilisateur et développeur.</p></div>",
                                },
                                
                                {
                                    id : "How does it work",
                                    q : "Comment puis-je débuter?",
                                    a : "<div><p>"+self.app.meta.fullname+" est facile à utiliser: vous avez seulement qu'à créer un compte et vous pourrez commencer immédiatement à publier du contenu, suivre d'autres utilisateurs et utiliser le chats.</p><p>Pendant l'enregistrement, vous devez créer un nom d'utilisateur (il doit être unique) et télécharger une image ou une photo (il n'est pas nécessaire que ce soit votre photo!). Aucun courriel (Vous pouvez laisser votre courriel sur la liste d'envoi, mais il ne sera pas connecté à votre compte Bastyon), aucun numéro de téléphone, aucunes vérifications. Même pas de mot de passe: le système génèrera une phrase que vous devrez utiliser pour vous connecter, cette phrase est votre clé secrète qui remplecera votre identifiant et votre mot de passe, la seule choose dont vous avez besoin pour vous connecter. Si vous perdez cette clé secrète. Personne ne peut la retrouvée, même les développeurs n'ont pas accès aux comptes d'utilisateurs.</p></div>",
                                },
                                    
                                {
                                    id : "signback",
                                    q : "Quelle est la différence entre une paraphrase de 12 mots et une clé secrète?",
                                    a : "<div><p>La première fois que vous utilisez "+self.app.meta.fullname+" vous devez vous créer un compte, composé seulement de votre identifiant unique.</p><p><strong>Il n'y a pas de mot de passe. </strong></p><p>Au lieu de cela, vous recevrez une phrase de 12 mots (paraphrase). Alternativement, vous pouvez utiliser une clé secrète, qui est un long numéro(les deux sont équivalents). <strong>Gardez cette donnée SURE et ne la révelez jamais à personne.</strong></p><p>Par la suite, lorsque vous devez vous connecter, vous n'avez qu'à entrer la paraphrase(ou scanner le code QR de l'application).</p><p><strong>Remember</strong>: si vous perdez votre phrase, votre compte sera vérouillé à jamais. Il n'existe aucun moyen de restaurer le mot de passe, il n'existe aucun moyen "+self.app.meta.fullname+" de vous connecter. Votre paraphrase ou votre clé secrète sont les seuls moyens d'accèder à votre compte, veuillez l'inscrire sur un morceau de papier quelque part. Vous pouvez le trouver dans votre profil sous l'onglet Comptes (cliquez sur le symbole de clé).</p></div>",
                                },
                                
                                
                                {
                                    id : "behind-scenes",
                                    q : "Comment cela fonctionne en coulisse? Ou sont les serveurs?",
                                    a : '<div><p>'+self.app.meta.fullname+' est calqué sur une crypto-monnaie Bitcoin décentralisée, car elle n`a pas d`autorité centrale et utilise la blockchain pour effectuer des transactions et assurer la sécurité.</p><p>Il n`y a pas de serveur central : à la place, la plateforme s`appuie sur un réseau de nœuds , situé partout dans le monde. Chaque personne dans le monde avec un ordinateur peut réellement exécuter un nœud (et être récompensée pour le faire en utilisant des pièces de monnaie avec Pocketcoin).</p><p>Hash de chaque publication, chaque commentaire, chaque interaction (sauf les messages de chat !) est stocké sur la <a elementsid="https://en.wikipedia.org/wiki/Blockchain" href="https://en.wikipedia.org/wiki/Blockchain">blockchain</a>. Les publications et les commentaires eux-mêmes ne sont pas dans la blockchain, mais dans une base de données associée liée à une blockchain.</p><p>'+ self.app.meta.fullname +' utilise une blockchain dédiée, dérivée directement de la chaîne Bitcoin.</p></div>',
                                },
                                    
                                {
                                    id : "blocks",
                                    q : "Qu'arriverait-il si certains pays bloquent l'accès à Bastyon.com?",
                                    a : "<div><p>Nothing.</p><p>Vous seriez toujours en mesure d'utiliser Bastyon comme si de rien n'était si vous utilisiez une application de bureau, car l'application de bureau Bastyon parle directement aux nœuds et n'utilise pas de sites Web.</p><p>C'est le pouvoir de la résistance à la censure. <br />Vous pouvez le vérifier vous-même en simulant une disparition du nom de domaine bastyon.com. <br /><br /><strong>Under Windows :</strong><br />il suffit d'ouvrir ce fichier :<br />Windows/System32/hosts<br /><br /><strong>Sous Linux/ Ubuntu :</strong><br />Ouvrez ce fichier<br />/etc/hosts<br /><br />Ensuite, ajoutez cette ligne : <br />127.0.0.1 bastyon.com</p><p >Cela garantirait que bastyon.com pointe vers votre machine locale, ce qui signifie qu'il ne pointe vers aucune adresse IP extérieure.<br /><br />Ensuite, lancez l'application de bureau et vous pourrez continuer à utiliser Bastyon a si rien ne s'est passé. <br />Cool hein ?</p></div>",
                                }
                        
                            ]
                    
                        
                        },
            
                        {
                        
                            name : "Pocketcoin",
                            id : "pocketcoin",
                        
                            group : [
                        
                                
                        
                                 {
                                    id : "app-store",
                                    q : "À quoi peut-on s`attendre pour acheter avec PKOIN?",
                                    a : "<div>PKOIN a une multitude d`utilisations sur Bastyon. Tout d`abord, 50 PKOIN dans votre compte supprime toutes les limitations de publication et vous permet de charger la vidéo. PKOIN peut être utilisé pour booster les commentaires, rendant vos commentaires visibles pour tout le monde. Le PKOIN des commentaires boostés va au blogueur, et les blogueurs doivent répondre ou présenter de tels commentaires pour encourager de tels boosts. Vous pouvez booster une publication pour la déplacer vers le haut dans le fil. Il est utilisé pour le jalonnement dans des nœuds, vous pouvez exécuter un nœud et gagner plus de PKOIN en jalonnant PKOIN. Il sera utilisé dans un marché publicitaire décentralisé et 100 % des bénéfices seront reversés aux blogueurs. Il sera également utilisé pour acheter des profils de papier peint spéciaux, des images de profil animées, etc. </div>",
                                },
                        
                        
                                {
                                    id : "pocketcoinstock",
                                    q : "Est-ce que Pocketcoin est comme une action dans "+self.app.meta.fullname+"?",
                                    a : "<div>Définitivement non. "+self.app.meta.fullname+" n`est même pas une société et n`a aucun droit de propriété. C`est un code open source que n`importe qui peut copier et exécuter. Pocketcoin est un jeton qui facilite l`échange de valeur, en particulier les transactions publicitaires. De plus, "+self.app.meta.fullname+" inclura un marché où les biens et services seront vendus directement pour Pocketcoin</div>",
                                },
                        
                                {
                                    id : "pocketcoinbuy",
                                    q : "Est-ce que je peux acheter des Pocketcoin additionnels?",
                                    a : "<div>Oui, actuellement, vous pouvez acheter des Pocketcoin sur les bourses suivantes : DigiFinex, Bitforex, Mercatox. Vous pouvez également l`acheter pour 19 cryptos différents sur https://pkoin.net/ et il existe une catégorie au sein de Bastyon appelée PKOIN/Peer-to-Peer où vous pouvez l`acheter et le vendre avec d`autres utilisateurs. </div>",
                                },
                        
                                {
                                    id : "pocketcoinbuyfiat",
                                    q : "Est-ce que je peux acheter des Pocketcoin pour des Dollars US ou d`autres devises?",
                                    a : "<div>Oui, vous pouvez l`acheter dans la catégorie PKOIN/Peer-to-Peer ou via une société appelée Indacoin à l`adresse https://buy.pkoin.indacoin.io/ Indacoin n`a rien à voir avec Bastyon, ils vendent simplement du PKOIN à crédit cartes après l`avoir acheté sur les échanges.</div>",
                                },
                                
                                {
                                    id : "pocketcoinbuyfiat",
                                    q : "Pourquoi dois-je acheter des Pocketcoin?",
                                    a : "<div>Bastyon n`a aucun soutien de banquiers ou de capital-risqueurs, c`est une plate-forme sociale décentralisée qui est soutenue par PKOIN. Lorsque vous utilisez Bastyon, vous utilisez des nœuds d`utilisateurs, des nœuds vidéo, ils doivent tous payer pour les ordinateurs, Internet et l`électricité. Les blogueurs doivent gagner pour le contenu. Bastyon ne peut fonctionner que si les utilisateurs possèdent et prennent en charge PKOIN. Ainsi, acheter PKOIN est un moyen de soutenir la décentralisation et la liberté. Cependant, il existe une autre raison importante de posséder Pocketcoin. Bientôt, il est très possible que même avoir un compte bancaire soit lié à la soumission de votre liberté, à un code QR. Pocketcoin n`est pas lié à votre nom ou à votre passeport, c`est un moyen de faire du commerce dans un monde où règne la censure financière, c`est peut-être le seul moyen d`acheter de la nourriture bientôt sans un certain certificat ou un code QR. Alors, achetez du PKOIN pour la liberté. </div>",
                                },
                            ]
                        },
                        
                        {
                        
                            name : self.app.meta.fullname,
                            id : "roadmap",
                        
                            group : [
                        
                                {
                                    id : "walletaddresses",
                                    q : "Je vois une adresse PN et une adresse de porte-feuille... est-ce que ces deux adresses sont sur la blockchain PN?",
                                    a : "<div>L'adresse PN est celle utilisée pour publier du contenu et utiliser les réseaux sociaux en général. Elle conserve également les pièces que vous gagnez pour vos publications les mieux notées.</div><div>Les adresses de portefeuille doivent conserver le reste des pièces.</div>",
                                },
                        
                                {
                                    id : "linktoprofile",
                                    q : 'Est-ce que je peux lier mon profile? ou ma "page"? Pour que je puisse publier dans ma communauté pour apporter plus de gens.',
                                    a : "<div>Dans le navigateur, accédez à votre profil en cliquant sur l'avatar en haut à droite et cliquez sur Partager, puis cochez la case Utiliser le lien de parrainage, toutes les personnes qui s'inscriront à partir du lien généré se verront proposer de vous suivre automatiquement lors de l'inscription. Pour chaque parrainage qui s'inscrit via votre lien, vous recevrez un bonus égal à 20% du Pocketcoin (PKOIN) qu'ils gagnent en publiant et en commentant pendant les 6 premiers mois. Pour être clair, votre parrainage ne rapporte pas moins, vous bénéficiez d'un bonus.</div>\
                                        <div>On the desktop, </div>",
                                },
                                {
                                    id : "starsystem",
                                    q : "Le système Star. Est-ce qu'il y a une limite de combien d'étoiles une personne peut donner aux autres?",
                                    a : "<div>Il y a des limites. Mais au fur que votre réputation augmente, vous pouvez voter de plus en plus. Cela est fait, pour que les robots don&rsquo;t brisent la blockchain. Initiallement, vous recevez 100 notes par 24 hours. A mesure que votre réputation augement (ce qui arrive en publiant et en recevant des notes), vous pourrez obtenir 200 notes par jour.</div>",
                                },
                        
                        
                                {
                                    id : "updateprofiletime",
                                    q : "À quelle fréquence puis-je mettre mon profil à jour? ",
                                    a : "<div>Vous êtes en mesure de mettre à jour votre profil à chaque heure.</div>",
                                },  
                        
                                {
                                    id : "mobileapp",
                                    q : "Est-ce qu`il y a une application mobile?",
                                    a : "<div>T=Il y a une application Android, que vous pouvez télécharger ici: https://play.google.com/store/apps/details?id=pocketnet.app  L'application IPhone n'est pas disponible, parce qu'Apple nous demande de censurer du contenu avec un délai de 24 hours. Chez Bastyon, même les développeurs ne peuvent supprimer de contenu, il est modéré par l'utilisateur. Batyon est optimisé pour les navigateurs comme Safari sur le iPhone.</div>",
                                },
                        
                                {
                                    id : "postinglimit",
                                    q : "Pouvez-vous me dire quelle est la limite de publications et de notes par jour et heure?",
                                    a : "<div>Nous avons quelques limitations, mais apres l`avoir testé, nous avons augmenté nos limites. Vous pouvez faire 5 publications et noter 15 fois par 24 heures. Une fois que votre réputation est au-delà de 100, il y a au moins 100 utilisateurs à haute réputation qui peuvent vous notez (or 30 utilisateurs après 3 mois), vous pourrez faire 30 publication et 200 notes, plus 300 commentaires chaque 24 heures.</div>",
                                },
                        
                                {
                                    id : "reputation",
                                    q : "Qu`est-ce que la réputation et comment est-elle calculée?",
                                    a : "<div>Votre réputation est la somme de vos notes calculée de la manière suivante. À noter que les utilisateurs avec une réputation de moins de 50 ne peuvent affecter la réputation des autres ou l'obtention de monnaie. Ils peuvent noter le contenu, mais cela n'affectera pas votre réputation.</div>\
                                    <div>5=2<br>4=1<br>3=0<br>2=-1<br>1=-2</div><div>Donc, si vous avez des notes de 5 étoiles et une note d'une étoile, le total sera de 2+2-2=2</div>",
                                },
                        
                                {
                                    id : "deletepostoruser",
                                    q : "Existe-t`il un moyen de supprimer ou modifier une publication?",
                                    a : "<div>Oui, vous pouvez modifier et supprimer les publications.</div>",
                                },
                        
                                {
                                    id : "usersearch",
                                    q : "Est-ce qu`il existe une manière de rechercher un utilisateur?",
                                    a : "<div>Cliquez sur la loupe dans le coin en haut et recherchez par nom d`utilisateurs ou par mots-clés.</div>",
                                },
                                {
                                    id : "follow",
                                    q : "Comment puis-je suivre quelqu`un?",
                                    a : "<div>À coté de l`auteur de la publication(sur le dessus de la publication) il y a un lieu pour suivre, vous pouvez trouver ses publications sous les publications Hot (flamme rouge en-haut de la page). Vous pouvez aussi voir Mon Fil d'abonnement, qui sera différent du fil principal. Le fil principal sera tout ce que n'importe qui publie, mais le fil d'abbonnement contiendra seulement les publications des personnes que vous suivez. Donc, vous pouvez aller dans le fil général pour trouver du bon contenu, mais vous pourriez ne pas tout aimer. Par la suite, sélectionnez ce que vous aimer. C'est un peu comme la pêche :)</div>",
                                },
                        
                        
                                {
                                    id : "otherbrowsers",
                                    q : "Est-ce que cela fonctionne sur les navigateurs Brave ou Duck Duck?",
                                    a : "<div>"+self.app.meta.fullname+" devrait fonctionner sur ces navigateurs. Il est pleinement fonctionnel sur Chrome et Firefox. Mais nous vous encourageons fortement à télécharger l'application de bureau (prenez "+self.app.meta.fullname+"Setup.exe ici: https://bastyon.com/help?page=applications). L'application de bureau ne pourra jamais être bloquée (même si <%- app.meta.url %> est à l'arrêt ou bloquée). C'est une considération sérieuse dans les pays totalitaires et quasi-totalitaires qui, si on y pense, commencent à inclure de plus en plus le globe.</div>",
                                },
                        
                                {
                                    id : "replypost",
                                    q : "Est-ce que nous pouvons répondre à nos propres/et les autres&rsquo;s publications?",
                                    a : "<div>Oui, vous pouvez commenter sous chaque publication..</div>",
                                },
                        
                                {
                                    id : "addtags",
                                    q : "Comment puis-je identifier une publication?",
                                    a : "<div>Selectionnz une catégorie ou un type dans la barre de recherche et pressez entrer. Pas besoin de spécifier le #, il sera ajouté automatiquement.</div>",
                                },
                        
                                {
                                    id : "usepublicaddress",
                                    q : "Comment puis-je utiliser l`adresse publique?",
                                    a : "<div>Votre adresse publique est ce "+self.app.meta.fullname+" qui est utilisé pour confirmer votre identité. Essentiellement, votre clé privée est un très grand nombre (qui peut être représenté par une séquence de 12 mots ou un code QR). Ce nombre est multiplié par un autre que tout le monde connaît (appelé point de base) et nous obtenons une clé publique. Lorsque vous entrez votre clé privée, nous pouvons la multiplier par le point de base pour obtenir votre clé publique et nous pouvons la comparer à l`adresse publique. S`ils correspondent, nous savons que c`est vous. Il est impossible de revenir en arrière, c`est-à-dire de diviser la clé publique par le point de base pour obtenir votre clé privée. La façon dont la multiplication fonctionne en cryptographie est à sens unique et ne peut pas être inversée, votre clé est donc en sécurité. "+self.app.meta.fullname+" utilise exactement la même cryptographie que Bitcoin.</div>",
                                },
                                {
                                    id : "desktopmac",
                                    q : "Y aura-t-il un exécutable téléchargeable pour Mac?",
                                    a : "<div>Oui, vous pouvez le trouver ici https://bastyon.com/help?page=applications. </div>",
                                },
                                {
                                    id : "dark-mode",
                                    q : "Comment puis-je changer pour le thème sombre?",
                                    a : "<div>Si vous êtes sur un navigateur, cliquez sur votre photo de profil > Gérer > Paramètres. Si vous êtes sur mobile, cliquez sur les trois lignes en bas à droite > Paramètres </div>",
                                },
                                {
                                    id : "banning",
                                    q : "Est-ce que les gens peuvent être bannis?",
                                    a : "<div>Oui, Bastyon est une plate-forme modérée par la communauté, cependant, il n`y a que certains sujets que la communauté signalera comme la pornographie, les stupéfiants et les menaces directes de violence. Vous ne serez jamais banni pour une opinion ou une liberté d`expression, et même pour des sujets interdits spécifiques, il doit y avoir un consensus d`utilisateurs expérimentés sans que d`autres utilisateurs défendent le contenu. Actuellement, les utilisateurs dont la représentation est inférieure à -30 perdent leurs privilèges de compte, mais il s`agit d`un système temporaire. D`ici la fin de 2021, Bastyon lancera un nouveau système de modération dans lequel les publications sont initialement signalées par tout utilisateur de haut niveau, mais le compte ne peut être bloqué que par un certain groupe de jurés sélectionnés à l`aide d`une loterie blockchain. Ainsi, personne ne peut choisir d`attaquer quelqu`un pour un avis, les jurés seront sélectionnés pour modérer certains contenus et ils doivent tous être d`accord. Le compte ne peut pas être interdit jusqu`à ce que deux groupes de jurés aient décidé et ils ne peuvent pas être les mêmes. Ce système protège contre tout type de règle de foule sur Bastyon, tout en protégeant la plate-forme des contenus peu recommandables.</div>",
                                },        
                                {
                                    id : "Apple App",
                                    q : "Est-ce que Bastyon peut être ajouté à Apple?",
                                    a : "<div>Apple a décidé de ne pas autoriser Bastyon en raison du manque d`opportunités de censure centralisée par Apple, nous le portons comme un insigne d`honneur. </div>",
                                },
                                {
                                    id : "Missing PKCOIN",
                                    q : "À L`AIDE! Il me manque des PKOIN!",
                                    a : '<div>Si, pour une raison quelconque, il semble que votre PKOIN a disparu, veuillez d`abord vérifier l`explorateur de blocs via<a href="https://'+self.app.options.url+'/blockexplorer/">BlockExplorer.</a> à ce que vos coins soient encore là. Recherchez simplement l`adresse de votre portefeuille dans la barre de recherche et il vous montrera le solde de votre compte. </div>',
                                },
                        
                            ]
                        
                        
                        },
                        {
                        
                            name : "Vidéo",
                            id : "video",
                        
                            group : [
                                {
                                    id : "savevideo",
                                    q : "Oû puis-je sauvegarder ma vidéo?",
                                    a : "<div>"+self.app.meta.fullname+" utilise une plate-forme open source modifiée appelée PeerTube, connectée à la blockchain Pocketnet et à l`application Bastyon. PeerTube est entièrement intégré avec l`autorisation "+self.app.meta.fullname+", chaque serveur vidéo est enregistré sur la blockchain.</div>",
                                },
                        
                                {
                                    id : "permissions",
                                    q : "Qui peut télécharger un vidéo sur Bastyon?",
                                    a : "<div> Bastyon n`a pas de serveurs centralisés ni de financement par capital-risque, toutes les vidéos sont stockées sur des serveurs gérés par les utilisateurs. Par conséquent, nous ne pouvons pas permettre à tout le monde de charger la vidéo, les serveurs se rempliront rapidement. Pour charger une vidéo, vous devez avoir 5 PKOIN (500 Mo) ou 50 PKOIN (5 Go) sur votre compte. Vous pouvez acheter du PKOIN auprès d`autres utilisateurs si vous sélectionnez une catégorie PKOIN/Peer-to-Peer. </div>",
                                },
                                {
                                    id : "stats",
                                    q : "Oû puis-je voir les statistiques de ma vidéo?",
                                    a : "<div> Allez sur votre profil et voir MES VIDÉOS. </div> ",
                                },
                                 {
                                    id : "technology",
                                    q : "Quel lecteur utilisez-vous pour lire la vidéo?",
                                    a : "<div> Bastyon a son propre lecteur, qui est une version considérablement modifiée de PeerTube. Identique à PeerTube, il utilise la technologie WebTorrent pour réduire la charge sur le serveur. Cela signifie que les utilisateurs qui regardent la vidéo la partagent. Notez que dans certains cas, cela signifie que les utilisateurs peuvent voir les adresses IP les uns des autres. Les serveurs Bastyon ne disposent d`aucun mécanisme pour enregistrer ces adresses IP, cependant, si vous vous souciez vraiment d`exposer votre adresse IP, vous devez utiliser un fournisseur VPN fiable. Si vous souhaitez minimiser tout partage peer-to-peer, vous pouvez utiliser la fonction de téléchargement de vidéo dans Bastyon.</div> ",
                                },
                                {
                                    id : "taking time",
                                    q : "Pourquoi est-ce que la vidéo prend du temps à télécharger?",
                                    a : "<div> Encore une fois, Bastyon n`a pas les ressources dont dispose Google. La vidéo doit être chargée sur l`un des nœuds vidéo et elle doit également être transcodée. N`oubliez pas que YouTube n`est pas gratuit, il extrait de la valeur en utilisant vos informations privées et en les monétisant. Bastyon est géré par la communauté et un petit retard est un petit prix à payer pour la vie privée et la liberté. En outre, les développeurs de Bastyon ont rendu le processus de chargement super facile et beaucoup plus robuste que les autres plates-formes orientées vers la liberté (ils ne font même souvent pas de transcodage pour différentes qualités). </div>",
                                },
                        
                        
                            ]
                        
                        },
                        
                        
                        
                        
                        {
                        
                            name : "Confidentialité",
                            id : "privacy",
                        
                            group : [
                                
                        
                                {
                                    id : "anonymous",
                                    q : "Est-ce que les personnes qui n`entrent pas leurs vrais noms sont anonymes?",
                                    a : "<div>Oui - aucun nom, téléphone, e-mail n`est connecté à votre compte de quelque manière que ce soit, il est simplement entré en option pour recevoir les mises à jour de la newsletter.</div>",
                                },
                        
                                // {
                                // 	id : "viewoutside",
                                // 	q : "Est-ce que quelqu`un peut voir un profil (someone&rsquo;s posts) hors du jardin? Is it a walled garden?",
                                // 	a : "<div>Étant donné que l`ensemble de la blockchain et toutes les publications sont en open source, tout le monde peut avoir accès à vos publications et à votre profil. Ils savent juste qu`il est lié à votre adresse publique. En pratique, vous pouvez avoir plusieurs comptes et basculer entre eux. Vous pouvez en utiliser certains avec votre vrai nom et d`autres de manière anonyme. L`anonymat est un excellent outil pour protéger la liberté d`expression contre les abus de pouvoir.</div>",
                                // },
                        
                        
                                // {
                                // 	id : "walletid",
                                // 	q : "Ma clé publique ressemble-t-elle à un identifiant de portefeuille que j`entre sur mon profil et auquel les gens peuvent envoyer des points ?",
                                // 	a : "<div>Exactement. Et il est sécure de la réveler. Mais pas la phrase secrète -gardez-la pour vous!</div>",
                                // },
                        
                                {
                                    id : "runnode",
                                    q : "Puis-je exécuter un nœud sur mon serveur headless ?",
                                    a : '<div> Les instructions  <a href="https://github.com/pocketnetteam/pocketnet.core/blob/master/README.md" target="_blank">sont ici</a> </div>',
                                },
                        
                                {
                                    id : "signback",
                                    q : "Comment puis-je me reconnecter?",
                                    a : "<div>Vous pouvez utiliser une clée privée de 12 caractères consituées de chiffres et de lettres.</div>",
                                }
                            ]
                        },
                        {
                        
                            name : "Curation du contenu",
                            id : "curation",
                        
                            group : [
                        
                                {
                                    id : "content",
                                    q : "Est-ce qu`il y a du contenu autorisé sur "+self.app.meta.fullname+"? Si du contenu n`est pas autorisé, est-ce que la plate-forme peut être quand même appelé libre d`expression?",
                                    a : "<div>C`est une question très importante. Pour commencer, tous les types de contenu ne sont pas autorisés. Cependant, et cela est crucial, l`application est transparente et relève de la communauté de la manière que nous expliquerons ci-dessous. L`application est effectuée par la communauté et est ouverte, sans interdiction cachée ni interdiction sélective pratiquée par la Silicon Valley.</div>",
                                },
                                {
                                    id : "specific",
                                    q : "Caractéristiques de la curation "+self.app.meta.fullname+".",
                                    a : "<div> Actuellement, la modération du contenu se fait par le biais de votes 1 étoile par des utilisateurs de haute réputation. Lorsque la réputation atteint -30, l`accès au compte est restreint. Cependant, il existe un tout nouvel algorithme de modération qui sera publié d`ici la fin de 2021. Sous les nouveaux algorithmes, il y aura une option pour signaler un utilisateur ou un message par n`importe quel utilisateur de haute réputation, mais cela ne va pas affecter le compte directement. Après un certain nombre de drapeaux, une loterie sur la blockchain sera tirée et un groupe de modérateurs jurés sera choisi pour ce compte. Les jurés doivent convenir que cet utilisateur a publié de la pornographie, des stupéfiants ou une menace directe de violence. Tout autre avis ou désaccord ne constitue pas un motif de signalement ni de sanction.</div> ",
                                },
                                    {
                                    id : "reciprocal",
                                    q : "Est-ce que le vote reciproque est autorisé?",
                                    a : "<div> La réciprocité est un comportement humain normal, donc en ce sens, cela ne pose aucun problème. Cependant, les mécanismes de conservation dépendent fortement du fait que les notes élevées et faibles sont liées au contenu et ne sont pas réciproques. Ainsi, Bastyon limitera les votes réciproques de deux manières. Premièrement, vous ne pourrez pas retourner un vote cinq étoiles ou une étoile dans un certain délai. En outre, ceux qui menacent de se venger d`une étoile ou promettent une récompense pour cinq étoiles sont considérés comme se livrant à un comportement interdit. D`autres utilisateurs peuvent signaler de tels cas et une loterie pseudo-aléatoire créera un jury pour le juger. Bien qu`un tel comportement n`entraîne pas les mêmes sanctions qu`un contenu illicite, les utilisateurs qui l`utilisent peuvent se voir imposer des blocages temporaires par l`algorithme de consensus de nœud. </div> ",
                                },
                                {
                                    id : "racism",
                                    q : "Note importante sur le racisme.",
                                    a : "<div>La liberté de pensée et la liberté d`expression sont attaquées sur les plateformes sociales grand public et dans les médias. Nous devons dire la vérité et cette plate-forme n`est pas une entreprise et est décentralisée pour cette raison même. Mais nous demandons à chacun de faire valoir son point de vue sans attaquer la nationalité ou la race des gens. Vous pouvez faire valoir votre point de vue sur la base de preuves. Nous ne pouvons pas nous permettre de transformer "+self.app.meta.fullname+" en une plate-forme marginale. Dites la vérité, mais évitez s`il vous plaît le racisme et les attaques contre des nationalités spécifiques dans l`ensemble. Nous savons que la Silicon Valley et les MSM ont fait de la question du racisme leur carte à jouer et ils crient constamment au loup. C`est encore plus la raison pour laquelle nous devons être mesurés et fondés sur des preuves et ne pas les laisser nous salir avec cela. Si ce n`est pas le cas, nous ne permettons pas à la plupart de la population d`évaluer les preuves de la corruption des HSH présentées sur "+self.app.meta.fullname+". Veuillez garder cela à l`esprit, afin que la liberté d`expression puisse prospérer et que nous puissions battre les facebokks du monde.</div><div>En fin de compte, c`est la communauté qui déterminera la direction de la plate-forme. Avoir un tas de flocons de neige qui se plaignent de choses qui les offensent est tout aussi mauvais que lorsque les gens veulent exprimer des menaces violentes directes. Cependant, la première indication est que les premiers utilisateurs de la plate-forme sont généralement intelligents et basés sur des preuves, donc l`avenir s`annonce incroyablement brillant. L`équipe "+self.app.meta.fullname+" a remarqué après quelques jours de test bêta, que nous avons arrêté de lire même les nouvelles alternatives, car il y avait tellement de contenu intéressant sur "+self.app.meta.fullname+". Continuez comme ça !</div><div>Veuillez vous impliquer dans la discussion sur ces sujets. Il s`agit d`une plateforme communautaire. Nous sommes toujours désireux d`améliorer la transparence de la plate-forme et vous devez nous faire savoir comment nous pouvons améliorer notre curation de contenu et notre police. Vous pouvez publier des articles sur ce sujet sous le tag Bastyon/Pocketnet.</div>",
                                },
                        
                        
                            ]
                        
                        },
                        
                        
                        {
                        
                            name : "Comment "+self.app.meta.fullname+" est-il différent de...",
                            id : "differents",
                        
                            group : [
                        
                                {
                                    id : "differents1",
                                    q : "Twitter, Facebook, Reddit & d`autres plate-formes centralisées?",
                                    a : "<div>Il n`y a pas d`autorité centrale ou de corporation. La plate-forme est gérée par des nœuds égaux sur une blockchain. Tous les revenus sont répartis entre les opérateurs de nœuds et les créateurs de contenu. Les opérateurs de nœuds misent sur Pocketcoin afin de créer des blocs avec des récompenses et des frais de transaction. La moitié des récompenses de chaque bloc vont aux créateurs de contenu en fonction des évaluations que leur contenu recueille auprès des utilisateurs.</div>",
                                },
                                {
                                    id : "differents2",
                                    q : "Des plate-formes décentralisées comme Minds.com et Sola?",
                                    a : "<div>Ces deux plates-formes, bien qu`excellentes, ne sont pas autonomes. Les deux dépendent fortement de la plate-forme Ethereum, car leurs jetons sont basés sur la norme ERC-20 Ethereum. Cela signifie que les opérations avec des jetons entraînent des frais de gaz Ether. De plus, ces entités ont des sociétés derrière elles et une société sera toujours un point de centralisation en raison de sa logique économique de croissance des profits. De plus, les entreprises sont extrêmement faciles à censurer.</div>",
                                },
                                {
                                    id : "differents3",
                                    q : "De Steemit?",
                                    a : "<div>Steemit a sa propre blockchain, mais est une personne morale avec toute la centralisation qui en découle.</div>",
                                },
                                {
                                    id : "differents4",
                                    q : "Des plate-formes décentralisées comme Mastodon et autres?",
                                    a : "<div>Bien que Mastodon soit une plate-forme entièrement décentralisée, son utilisation nécessite de nombreuses connaissances techniques. Cela présente un grand obstacle à une acceptation généralisée potentielle. "+self.app.meta.fullname+" propose des applications Web et de bureau et les utilisateurs peuvent se connecter à partir de n`importe quel appareil, extraire leurs paramètres personnels de la blockchain et commencer à utiliser la plate-forme immédiatement sans aucune connaissance technique.</div>",
                                }
                        
                            ]
                        
                        },
                        
                        {
                        
                            name : ""+self.app.meta.fullname+" écosysteme",
                            id : "ecosystem",
                        
                            group : [
                        
                                {
                                    id : "ecosystem1",
                                    q : "Comment le développement de "+self.app.meta.fullname+" est-il financé?",
                                    a : "<div>"+self.app.meta.fullname+" est open source et est actuellement géré par le groupe d`experts bénévoles en programmation et en mathématiques. Après le lancement, "+ self.app.meta.fullname +" attirera les meilleurs talents en programmation sur la base de sa promesse de créer un réseau social décentralisé et équitable. Programmeurs et spécialistes du marketing travaillant pour Pocketcoin donnés par de grands propriétaires de PKOIN.</div>",
                                },
                                {
                                    id : "ecosystem2",
                                    q : "Qu`est-ce que Pocketcoin?",
                                    a : "<div>Pocketcoin est un jeton de réseau. Il est utilisé exclusivement pour acheter de la publicité auprès des contributeurs de " +self.app.meta.fullname+ " et pour payer les frais de transaction pour de tels paiements. Il est également utilisé pour booster les commentaires, les publications et pour acheter des privilèges pour votre compte. Dans Pocketent, tous les revenus sont répartis entre les créateurs de contenu et les nœuds.</div>",
                                },
                                {
                                    id : "ecosystem3",
                                    q : "Comment les créateurs de contenu et les opérateurs de nœuds sont-ils récompensés?",
                                    a : "<div>"+self.app.meta.fullname+" propose un marché direct unique où les créateurs de contenu peuvent vendre de la publicité aux acheteurs d`annonces. Les créateurs de contenu fixent leur prix et peuvent accepter des publicités produites en série ou peuvent proposer des emplacements personnalisés de grande valeur (les créateurs présentent le produit à leur manière). Direct Marketplace est essentiellement un échange publicitaire qui permet aux acheteurs d`nnonces de cibler des publics spécifiques sans aucun intermédiaire. Tous les achats d`annonces et les annonces elles-mêmes sont liées sur la blockchain, donc l`achat d`annonces est totalement sans confiance.</div>",
                                },
                                {
                                    id : "ecosystem4",
                                    q : "Et si les utilisateurs publients du contenu illégal, de la pornographie ou des SPAM?",
                                    a : "<div>"+self.app.meta.fullname+" n`est pas une plate-forme darknet ou une sorte de pornhub. Bien qu`il soit décentralisé et résistant à la censure, il est modéré par les utilisateurs. Tout contenu illégal est signalé et supprimé de la plateforme. Cela signifie que les utilisateurs ayant la plus haute réputation peuvent modérer la plate-forme. Cependant, des garanties sont en place (dans le code source ouvert) du même groupe ou de groupes très similaires de personnes votant à plusieurs reprises du contenu hors de la plate-forme. Les modérateurs du contenu sont choisis au hasard à l`aide d`une loterie sur la blockchain pour éviter tout type de règle de foule. De plus, les utilisateurs sont explicitement encouragés à faire du contenu illicite, PAS simplement le contenu qu`ils trouvent offensant. Pour vous assurer que "+self.app.meta.fullname+" est une plate-forme de liberté d`expression, nous vous encourageons à commencer à participer, à développer votre réputation et à contrôler correctement la plate-forme sans la censure actuellement répandue dans les médias sociaux centralisés.</div>",
                                },
                                {
                                    id : "ecosystem5",
                                    q : "Qui gère "+self.app.meta.fullname+"?",
                                    a : "<div>Aucune personne morale ou personne physique ne possède ou ne contrôle le " +self.app.meta.fullname+ ". La blockchain Pocketnet et Bastyon sont gérés par un groupe de programmeurs, mais ce groupe grandit et change tout le temps. Si un groupe de programmeurs prend une mauvaise direction et viole les principes sur lesquels Bastyon est fondé, d`autres programmeurs peuvent simplement forger un code open source et continuer la plate-forme résistante à la censure. </div></div>",
                                },
                                
                            ]
                        
                        }
                        
                        
                    ]
                }
            }
        },

        localshares : {
            storage : {},
            saving : {},
            key : '',

            status : function(id){
                if(self.sdk.localshares.storage[id]) return 'saved'
                if(self.sdk.localshares.saving[id]) return 'saving'

                return 'cansave'
            },

            clearfromstorage : function(shareId){
                delete self.sdk.localshares.storage[shareId]
            },
            addtostorage : function(share){
                self.sdk.localshares.storage[share.id || share.share.txid] = share
            },

            initclbk : function(clbk){
                self.sdk.localshares.init().then(r => {
                    if(clbk) clbk()
                }).catch(e => {
                    console.error(e)
                    if(clbk) clbk()
                })
            },

            init : function(){

                var k = 'localstorage'

                if (window.cordova) k = 'cordova' 
                if (typeof _Electron != 'undefined' && window.electron) k = 'electron'

                self.sdk.localshares.key = k

                if(!window.peertubeglobalcache) window.peertubeglobalcache = {}

                return self.sdk.localshares.getall[self.sdk.localshares.key]().then(r => {

                 
                    _.each(r, function(share){
                        self.sdk.localshares.addtostorage(share)

                        _.each(share.videos, function(v){
                            if(v.infos &&  v.infos.videoDetails) window.peertubeglobalcache[v.infos.videoDetails.uuid] = v.infos.videoDetails
                        })
                    })  

                }).catch(error => {
                })
            },

            ////////////////////

            getShareIds: function() {
                return _.map(self.sdk.localshares.storage, function(v, i){
                    return i
                })
            },

            saveShare : function(share, p){
               // var share = self.app.platform.sdk.node.shares.storage.trx[shareid];

                if(!p) p = {}

                if(self.sdk.localshares.saving[share.txid]) return Promise.reject('saving')

                if(self.sdk.localshares.storage[share.txid]) return Promise.reject('Saved')
                
                if(!share) return Promise.reject('share')

                var user = deep(self.app, 'platform.sdk.usersl.storage.' + share.address);

                if(!user) return Promise.reject('user')

                var shareInfo = {
                    share: {
                        id : share.txid,
                        share: share.export(),
                        user: user.export(),
                        timestamp: new Date()
                    },
                };

                self.sdk.localshares.saving[share.txid] = true

                if (p.before) p.before(share)

                if (share.itisvideo())
                    shareInfo.video = share.url ? (app.platform.sdk.videos.storage[share.url] || {}).data || null : null

                return self.sdk.localshares.write.share[self.sdk.localshares.key](shareInfo.share).then(folder => {
                    return self.sdk.localshares.write.video[self.sdk.localshares.key](folder, shareInfo, p).then(r => {

                        shareInfo.share.videos || (shareInfo.share.videos = {})
                        shareInfo.share.videos[r.id] = r

                        return Promise.resolve()

                    })
                }).then(r => {
                    self.sdk.localshares.storage = {}

                    self.sdk.localshares.saving[share.txid] = false

                    return self.sdk.localshares.init()

                    //self.sdk.localshares.addtostorage(shareInfo.share)

                    //return Promise.resolve()
                }).then(r => {

                    if (p.after) p.after(share)

                }).catch(e => {


                    self.sdk.localshares.saving[share.txid] = false

                    if (p.after) p.after(share)

                    return Promise.reject(e)
                })

            },

            getVideo: function(videoId) {
                var video, shares = self.sdk.localshares.storage;

                try {
                    for (const share in shares) {
                        if (video) break;

                        for (const vidId in shares[share].videos) {
                            if (vidId == videoId) {
                                video = shares[share].videos[vidId];
                                break;
                            }
                        }
                    }

                } catch(err) {

                }

                return video;
            },

            getShare: function(id) {
                return self.sdk.localshares.storage[id]
            },

            deleteShare : function(id){
                return self.sdk.localshares.delete[self.sdk.localshares.key](id)
            },

            deleteAll: function() {
                return Promise.all(_.map(self.sdk.localshares.storage, function(v, id){
                    return self.sdk.localshares.deleteShare(id)
                }))
            },

            getTotalSize : function(){
                var totalSize = 0;

                _.each(self.sdk.localshares.storage, function(share) {

                    if (share.videos) {

                        for (const videoId in share.videos) {
                            if (share.videos[videoId].size)
                                totalSize += share.videos[videoId].size;
                        }

                    }
                });

                return totalSize;
            },

            write : {
                video : {
                    cordova : function(folder, shareInfo, p){

                        if(!shareInfo.video) return Promise.resolve()

                        if(!shareInfo.video || !shareInfo.video.original) return Promise.reject('originalinfo')

                        var id = shareInfo.video.original.uuid
                        var videoDetails = shareInfo.video.original

                        if(!p) p = {} //resolutionid, fileDownloadUrl


                        var fileDownloadUrl = _.find(
                            deep(videoDetails, 'streamingPlaylists.0.files') || [], function(file){
                            return file.resolution.id == p.resolutionId
                        })

                        if(!fileDownloadUrl) return Promise.reject('fileDownloadUrl')

                        return new Promise((resolve, reject) => {
                            folder.getDirectory('videos', { create: true }, function (dirEntry3) {

                                dirEntry3.getDirectory(id, { create: true }, function (dirEntry4) {

                                    var infos = {
                                        thumbnail: 'https://' + videoDetails.from + videoDetails.thumbnailPath,
                                        videoDetails : videoDetails
                                    }

                                    dirEntry4.getFile('info.json', { create: true }, function (infoFile) {
                                        // Write into file
                                        infoFile.createWriter(function (fileWriter) {

                                            fileWriter.write(infos);

                                            dirEntry4.getFile(p.resolutionId + '.mp4', { create: true }, function (targetFile) {

                                                var downloader = new BackgroundTransfer.BackgroundDownloader();
                                                // Create a new download operation.
                                                var download = downloader.createDownload(fileDownloadUrl.fileDownloadUrl, targetFile, "Bastyon: Downloading video");

                                                // Start the download
                                                download.startAsync().then(function(e) {
                                                    // Success
                                                    // Get file size
                                                    targetFile.file(function(fileDetails) {
                                                        // Resolve internal URL
                                                        window.resolveLocalFileSystemURL(targetFile.nativeURL, function(entry) {

                                                            targetFile.internalURL = entry.toInternalURL();

                                                            var result = {
                                                                video: targetFile,
                                                                infos: infos,
                                                                size : fileDetails.size || null,
                                                                id : id
                                                            }

                                                            //self.sdk.local.shares.add(shareId, shareInfos);

                                                            return resolve(result);

                                                        }, reject);

                                                    }, reject);

                                                }, reject, function(pr) {

                                                    if(p.progress) p.progress('video', 100* pr.bytesReceived / pr.totalBytesToReceive)

                                                });

                                            }, reject);

                                        }, reject);

                                    }, reject);

                                }, reject)

                            }, reject)
                        })

                    },

                    electron : async function(folder, shareInfo, p = {}){
                        if(!shareInfo.video || !shareInfo.video.original) {
                            return Promise.reject('originalinfo')
                        }

                        const id = shareInfo.video.original.uuid;
                        const videoResolution = p.resolutionId;
                        const videoDetails = shareInfo.video.original;

                        const videoData = await electron.ipcRenderer
                            .invoke('saveShareVideo', folder, videoDetails, videoResolution);

                        return videoData;
                    },

                    localstorage : function(){
                        return Promise.reject('todo')
                    }
                },
                share : {
                    cordova : function(share){

                        var storage = self.sdk.localshares.helpers.cordovaStorage()

                        if(!storage) return Promise.reject('storage')

                        return new Promise((resolve, reject)=>{

                            // open target file for download
                        window.resolveLocalFileSystemURL(storage, function(dirEntry) {
                            // Create a posts folder
                            dirEntry.getDirectory('posts', { create: true }, function (dirEntry11) {
                                dirEntry11.getDirectory(share.id, { create: true }, function (dirEntry2) {

                                    // Create JSON file for share informations
                                    dirEntry2.getFile('share.json', { create: true }, function (shareFile) {
                                        // Write into file
                                        shareFile.createWriter(function (fileWriter) {
                                            fileWriter.write(share);

                                            resolve(dirEntry2)
                                        });
                                    });


                                }, function(err) {
                                    return reject(err);
                                });
                            }, function(err) {
                                return reject(err);
                            });
                        }, function(err) {
                            return reject(err);
                        });

                        })

                    },

                    electron : async function(share) {
                        const shareDir = await electron.ipcRenderer
                            .invoke('saveShareData', share);

                        return shareDir;
                    },

                    localstorage : function(){
                        return Promise.reject('todo')
                    }
                }
            },

            read : {
                share : {
                    electron : async function(shareId) {
                        console.log('SHARE DIR', shareId);

                        const shareData = await electron.ipcRenderer
                            .invoke('getShareData', shareId);

                        return shareData;
                    },

                    cordova : function(to, from){


                        return new Promise((resolve, reject) => {

                            from.getFile('share.json', { create: false }, function(shareFile) {
                                shareFile.file(function(shareFileDetails) {
                                    // Read info file
                                    var reader = new FileReader();

                                    reader.onloadend = function() {

                                        try {

                                            to.share = JSON.parse(this.result);
                                            resolve()

                                        } catch(err){
                                            reject(err)
                                        }

                                    };

                                    reader.readAsText(shareFileDetails);
                                });
                            });

                        })

                    },

                    localstorage : function(){
                        return Promise.reject('todo')
                    }
                },

                video : {
                    cordova : function(to, from){

                        return new Promise((resolve, reject) => {

                            from.getDirectory('videos', { create: true }, function (videosFolder) {

                                to.videos = {};

                                var videosReader = videosFolder.createReader();

                                videosReader.readEntries(function(videoFolders) {

                                    lazyEach({
                                        array: videoFolders,
                                        action: function (p) {
                                            var videoFolder = p.item;

                                            if (videoFolder.isDirectory) {
                                                to.videos[videoFolder.name] = {};
                                                to.videos[videoFolder.name].id = videoFolder.name

                                                videoFolder.createReader().readEntries(function(files) {
                                                    var videoFile, infoFile;

                                                    lazyEach({
                                                        array: files,
                                                        action: function (_p) {
                                                            var file = _p.item;


                                                            if (file.isFile && file.file) {

                                                                file.file(function(fileDetails) {


                                                                    if (file.name == 'info.json') {

                                                                        infoFile = file;


                                                                        var reader = new FileReader();

                                                                        reader.onloadend = function() {


                                                                            try {
                                                                                to.videos[videoFolder.name].infos = JSON.parse(this.result);

                                                                            } catch(err){

                                                                                console.error('e', err)

                                                                            }

                                                                            _p.success()
                                                                        };

                                                                        reader.readAsText(fileDetails);

                                                                        return
                                                                    }

        
                                                                    if (!videoFile && (!fileDetails.type || fileDetails.type == 'video/mp4')) {
        
                                                                        videoFile = file;

                                                                        if (fileDetails.size)
                                                                            to.videos[videoFolder.name].size = fileDetails.size;
                                                                        // Resolve internal URL

                                                                        window.resolveLocalFileSystemURL(videoFile.nativeURL, function(entry) {
        
                                                                            videoFile.internalURL =  entry.toInternalURL()
                                                                            
                                                                            to.videos[videoFolder.name].video = videoFile;


                                                                            _p.success()
                                                                        });

                                                                        return
                                                                    }

                                                                    


                                                                    _p.success()
                                                                });
                                                            }
                                                            else{
                                                                _p.success()
                                                            }
                                                        },

                                                        all: {
                                                            success: function () {
                                                                p.success()
                                                            }
                                                        }
                                                    })

                                                });

                                            }
                                            else{
                                                p.success()
                                            }
                                        },

                                        all: {
                                            success: function () {
                                                resolve()
                                            }
                                        }
                                    })

                                });
                            });
                        })
                    },

                    electron : async function(videoId, shareId) {
                        console.log('from', videoId);

                        const videosDataList = {};

                        const videoData = await electron.ipcRenderer
                            .invoke('getVideoData', shareId, videoId);

                        videosDataList[videoId] = videoData;

                        return videosDataList;
                    },

                    localstorage : function(to, from){
                        return Promise.reject('todo')
                    }
                }
            },

            get : {
                electron : async function(shareId) {
                    const shareDataList = { id: shareId };

                    console.log('SHARE FOLDER', shareId);

                    shareDataList.share = await self.sdk.localshares.read.share.electron(shareId);

                    const videoId = shareDataList.share.share.u
                        .split('%2F').pop();

                    shareDataList.videos = await self.sdk.localshares.read.video.electron(videoId, shareId);

                    console.log('SHARE DATA VIDEOS', shareDataList.videos);

                    return shareDataList;
                },

                cordova : function(shareFolder){

                    return new Promise((resolve, reject) => {

                        if (shareFolder.isDirectory) {
                            var share = {
                                id : shareFolder.name
                            }

                            self.sdk.localshares.read.share.cordova(share, shareFolder).then(r => {

                                return self.sdk.localshares.read.video.cordova(share, shareFolder)

                            }).then(r => {

                                resolve(share)

                            }).catch(er => {
                                reject(er)
                            })

                        }
                        else{
                            resolve(null)
                            //reject('isDirectory')
                        }

                    })


                },

                localstorage : function(){
                    return Promise.reject('todo')
                }
            },

            getall : {
                electron : async function() {
                    const shareList = await electron.ipcRenderer
                        .invoke('getShareList');

                    const shareDataList = {};

                    console.log('SHARE LIST', shareList);

                    for(const shareIndex in shareList) {
                        const shareId = shareList[shareIndex];

                        shareDataList[shareId] = await self.sdk.localshares.get.electron(shareId);
                    }

                    return shareDataList;
                },

                cordova : function(){

                    var v = {};

                    var storage = self.sdk.localshares.helpers.cordovaStorage()

                    if(!storage) return Promise.reject('storage')

                    return new Promise((resolve, reject) => {
                        // open target file for download
                        window.resolveLocalFileSystemURL(storage, function(dirEntry) {
                            // Create a downloads folder
                            dirEntry.getDirectory('posts', { create: true }, function (dirEntry2) {

                                var shareReader = dirEntry2.createReader();

                                shareReader.readEntries(function(shares) {


                                    Promise.all(_.map(shares, function(shareFolder){

                                        return self.sdk.localshares.get.cordova(shareFolder).then(r => {

                                            if (r)
                                                v[shareFolder.name] = r

                                            return Promise.resolve()

                                        })

                                    })).then(r => {

                                        resolve(v)

                                    }).catch(err => {
                                        reject(err)
                                    })
                                
                                });
                            });
                        });
                    })

                    
                },

                localstorage : function(){
                    return Promise.reject('todo')
                }
            },

            helpers : {
                cordovaStorage : function(){

                    if(!window.cordova.file) return null

                    //return 'file:///storage/emulated/0/'

                    //return window.cordova.file.externalApplicationStorageDirectory

                    return (window.cordova.file.externalDataDirectory) ? window.cordova.file.externalDataDirectory : window.cordova.file.dataDirectory;
                }
            },

            delete : {
                localstorage : function(shareId){
                    self.sdk.localshares.clearfromstorage(shareId)

                    return Promise.resolve();
                },
                cordova : function(shareId){
                    var storage = self.sdk.localshares.helpers.cordovaStorage()

                    if(!storage) return Promise.reject('storage')

                    return new Promise((resolve, reject) => {
                        window.resolveLocalFileSystemURL(storage, function(dirEntry) {
                            // Create a downloads folder
                            dirEntry.getDirectory('posts', { create: true }, function (dirEntry2) {
                                dirEntry2.getDirectory(shareId, { create: false}, function(dirToDelete) {
                                    dirToDelete.removeRecursively(function() {
                                        // Success

                                        self.sdk.localshares.clearfromstorage(shareId)

                                        resolve()
                                        
                                    }, reject);
                                }, reject);
                            }, reject);
                        }, reject);
                    })

                },
                electron : function(shareId){
                    self.sdk.localshares.clearfromstorage(shareId);

                    return electron.ipcRenderer.invoke('deleteShareWithVideo', shareId);
                }
            }

           
        },

        registrations: {
            storage: {},
            clbks: {},

            redirect : null,

            getredirectFromCurrentPage : function(){
                self.sdk.registrations.redirect = self.app.nav.get.pathnameSearch()

            },

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

                return (!self.sdk.registrations.storage[address + 'rm'] && regs > 2 /*&& regs <= 5*/)

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

                var needaction = false
                self.app.user.isState(function (state) {

                    if (state) {
                        var rs = self.sdk.relayTransactions.get();

                        var pn = self.sdk.address.pnet();

                        if (!_.isEmpty(rs)) {

                            self.app.platform.sdk.ustate.me(function (_mestate) {
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
                                                else{

                                                    if(_.isEmpty(_mestate)){

                                                        p.success()

                                                        return
                                                    }

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

                                                                        needaction = true

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
                                                                            clbk(needaction)

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
                                                    clbk(needaction)
                                            }
                                        }
                                    })

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

       
        articles: {

            storage: [],

            findlastdraft : function(){

                return _.find(self.sdk.articles.storage, function(s){
                    return s.version >= 2 && !s.txid
                })
                
            },

            getbyid : function(id){
                return _.find(self.sdk.articles.storage, function(s){
                    return s.id == id
                })
            },

            deletebyid : function(id){
                self.sdk.articles.storage = _.filter(self.sdk.articles.storage, function(s){
                    return s.id != id
                })

                self.sdk.articles.save()
            },

            getlist : function(){
                return _.filter(self.sdk.articles.storage, function(s){
                    return s.version >= 2
                })
            },

            itisdraft(art){

                if(art.editing) return false

                if(

                    art.caption.value &&
                    art.content && art.content.blocks && art.content.blocks.length

                ) return true
            },

            fromshare : function(share){

                var edjs = new edjsHTML(null, app)


                var empty = self.sdk.articles.empty(null, 2)


                    empty.visibility = (share.settings.f || 0) + ''
                    empty.caption.value = share.caption.v
                    empty.content = edjs.apply(JSON.parse(JSON.stringify(share.message.v)), decodeURIComponent)
                    empty.tags = _.clone(share.tags.v)
                    empty.language = share.language.v
                    empty.time = share.time
                    empty.cover = deep(share, 'images.v.0')
                    empty.editing = share.aliasid
                    empty.shash = share.shash()

                return empty
            },

            empty: function (id, version) {
                return {

                    id: id || makeid(),

                    caption: {
                        value: ''
                    },

                    images: [],
                    content: null,
                    tags : [],
                    u: '',
                    version : version || 1,
                    time : null,
                    cover : '',
                    visibility : 0,

                    language : self.app.localization.key
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
                try{
                    localStorage[address + 'articles'] = JSON.stringify(self.sdk.articles.storage || []);
                }   
                catch(e){
                    console.log("e", e)
                }
                

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
            },


            share : function(art){

                var edjs = new edjsHTML(null, app)

                var artcontent = edjs.apply(art.content, encodeURIComponent)
           
                var share = new Share(art.language || self.app.localization.key);

                    share.tags.set(_.clone(art.tags))
                    share.caption.set(art.caption.value)
                    share.message.set({
                        blocks : artcontent.blocks,
                        version : artcontent.version
                    })

                    share.settings.v = 'a'
                    share.settings.version = art.version
                    share.settings.f = (art.visibility || 0) + ''

                    share.images.set([art.cover])

                    share.address = deep(app, 'user.address.value')

                if (art.editing){
                    share.aliasid = art.editing
                }

                return share
            },

            uploadresource : {
                image : function(e){

                    if(!deep(e, 'data.file.url')){
                        return Promise.resolve()
                    }

                    return self.app.imageUploader.upload({ base64: e.data.file.url }).then( url => {
						e.data.file.url = url
                        return Promise.resolve()
					})

                },
                carousel : function(e){

                    return Promise.all(_.map(e.data, (d => {
                        return self.app.imageUploader.upload({base64 : d.url}).then(url => {
                            d.url = url

                            return Promise.resolve()
                        })
                    })))
                },

                content : function(content){
                    var tps = self.sdk.articles.uploadresource

                    var promises = _.map(content.blocks, function(e){

                        if (tps[e.type]){
                            return tps[e.type](e)
                        }

                        return Promise.resolve()

                    })

                    return Promise.all(promises)
                },

                art : function(art){
                    if(!art.cover){
                        return Promise.resolve()
                    }

                    return self.app.imageUploader.upload({base64 : art.cover}).then(r => {
                        art.cover = r

                        return Promise.resolve()
                    })
                }
            },

            uploadresources : function(art){

                return self.sdk.articles.uploadresource.art(art).then(r => {
                    return self.sdk.articles.uploadresource.content(art.content)
                })

            }
        },

        sharesObserver : {
            storage : {
                viewed : {}
            },

            view : function(key, id){

                if(key == 'saved') return

                if(!self.sdk.sharesObserver.storage.viewed[key] || self.sdk.sharesObserver.storage.viewed[key] < id){
                    self.sdk.sharesObserver.storage.viewed[key] = id

                    self.sdk.sharesObserver.save()
                }
                

               
            },

            save: function () {
                if(!self.sdk.address.pnet()) return

                var a = self.sdk.address.pnet().address;

                self.app.settings.set(a, 'sharesObserverViewed', self.sdk.sharesObserver.storage.viewed || '{}')

            },

            load: function (clbk) {

                if(!self.sdk.address.pnet()) return

                var a = self.sdk.address.pnet().address;

                self.sdk.sharesObserver.storage.viewed = self.app.settings.get(a, 'sharesObserverViewed') || {}

                if(clbk) clbk()
            },
        },
        
        lentaMethod: {
            all: {
                hierarchical: 'hierarchical',
                historical: 'historical'
            },
            default: "hierarchical",
            current: null,

            save: function () {

                var c = self.sdk.lentaMethod.current

                localStorage['lentaMethod'] = c;

            },

            load: function (clbk) {

                var t = self.sdk.lentaMethod

                t.current = localStorage['lentaMethod'] || t.default;

                t.set()

                if (clbk) clbk()
            },

            get: function(){
                var t = self.sdk.lentaMethod;

                return t.all[t.current];
            },

            set: function (value) {

                var t = self.sdk.lentaMethod

                if (!value) {
                    value = t.current || t.default
                }

                if (value && t.all[value]) {

                    t.current = value;

                    self.app.platform.sdk.categories.clbks.selected.lenta && self.app.platform.sdk.categories.clbks.selected.lenta();


                    t.save()

                }

            }
        },

        theme: {
            all: {
                white: {
                    name: self.app.localization.e('e13266'), ////ch
                    class: "stwhite",
                    color : "#ffffff",
                    media : '(prefers-color-scheme: light)',
                    rootid : ''
                },

                black: {
                    name: self.app.localization.e('e13267'),
                    class: "stblack",
                    color : "#1e2235",
                    media : '(prefers-color-scheme: dark)',
                    rootid : 'black'
                },

                gray: {
                    name: self.app.localization.e('gray'),
                    class: "stgray",
                    color : "#1e1d1a",
                    media : '(prefers-color-scheme: dark)',
                    rootid : 'gray'
                },
            },
            default: "white",
            current: null,

            currentStyles : {},

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

            setstyles : function(){
                var root = document.querySelector(':root');

                var rootStyles = getComputedStyle(root);
 
                self.sdk.theme.currentStyles = rootStyles

            },

            getstyle : function(v){

                if (self.sdk.theme.currentStyles){
                    return self.sdk.theme.currentStyles.getPropertyValue(v)
                }

                return ''
               
            },

            set: function (value) {

                var t = self.sdk.theme
                var h = $('html')

                if (!value) {
                    value = t.current || t.default
                }

                if (value && t.all[value]) {
                    /*_.each(t.all, function (c) {
                        h.removeClass(c.class)
                    })

                    h.addClass(t.all[value].class)*/

                    t.current = value

                    self.matrixchat.changeTheme()

                    t.save()

                    var cm = deep(app, 'modules.menu.module.restart')
                    
                    if (cm) cm()

                    if (document.documentElement.hasAttribute('theme')){
                        document.documentElement.removeAttribute('theme');
                    }

                    document.documentElement.setAttribute('theme', t.all[value].rootid);

                    self.sdk.theme.setstyles()

                    $('meta[name="theme-color"]').attr('content', t.all[value].color)
                    $('meta[name="msapplication-navbutton-color"]').attr('content', t.all[value].color)
                    $('meta[name="apple-mobile-web-app-status-bar-style"]').attr('content', t.all[value].color)
                }

                app.mobile.statusbar.background()

                

            }
        },

        uiScale: {
            all: {
                small: {
                    name: self.app.localization.e('uiSmallSetting'),
                    scale: 75
                },
                normal: {
                    name: self.app.localization.e('uiNormalSetting'),
                    scale: 100
                },
                large: {
                    name: self.app.localization.e('uiLargeSetting'),
                    scale: 125
                },
                extraLarge: {
                    name: self.app.localization.e('uiXLargeSetting'),
                    scale: 150
                }
            },
            default: 'normal',
            current: null,

            save: function() {
                localStorage['uiscale'] = self.sdk.uiScale.current;
            },

            load: function(clbk) {
                const param = self.sdk.uiScale;

                param.current = localStorage['uiscale'] || self.sdk.uiScale.default;

                param.set();

                if (clbk) {
                    clbk();
                }
            },

            set: function (value) {
                const param = self.sdk.uiScale;

                if (!value) {
                    value = param.current || param.default;
                }

                const selectedValue = param.all[value];

                if (selectedValue) {
                    if (typeof _Electron === 'undefined') {
                        return;
                    }

                    const { webFrame } = require('electron');

                    webFrame.setZoomFactor(selectedValue.scale / 100);

                    param.current = value;

                    param.save();
                }
            },

            listenScalingEvents: function() {
                const zoomArrList = self.app.platform.sdk.uiScale.all;
                const zoomKeys = Object.keys(zoomArrList);

                let wheelLock = false;

                function scaleUi(e, isScroll, calcDelta) {
                    const mainKeyDown = e.metaKey || e.ctrlKey;

                    if(!mainKeyDown) {
                        if (isScroll && wheelLock) {
                            $('html').removeClass('scroll-lock');
                            wheelLock = false;
                        }

                        return;
                    }

                    const zoomDelta = calcDelta(e, mainKeyDown);

                    if (zoomDelta === 0) {
                        return;
                    }

                    const currentZoom = self.app.platform.sdk.uiScale.current;
                    const zoomCurrentIndex = zoomKeys.findIndex(zoom => (zoom === currentZoom));
                    const zoomNewIndex = zoomCurrentIndex + zoomDelta;
                    const zoomNewName = zoomKeys[zoomNewIndex];

                    self.app.platform.sdk.uiScale.set(zoomNewName);
                }

                $(window).on('keydown', (e) => scaleUi(e, false, ({ keyCode }) => {
                    /**
                     * Minus - 189
                     * Minus Numpad - 109
                     *
                     * Plus - 187
                     * Plus Numpad - 107
                     */
                    switch (keyCode) {
                        case 189: case 109:
                            return -1;
                        case 187: case 107:
                            return +1;
                    }

                    return 0;
                }));

                $(window).on('wheel', (e) => scaleUi(e, true, (e) => {
                    if(!wheelLock) {
                        $('html').addClass('scroll-lock');
                        wheelLock = true;
                    }

                    if(e.originalEvent.deltaY < 0) {
                        return +1;
                    } else {
                        return -1;
                    }
                }));
            },
        },

        accountsettings: {
            storage: {}
        },

        usersettings: {

            meta: {

                preview: {
                    name: self.app.localization.e('disablePreview'),
                    id: 'preview',
                    type: "BOOLEAN",
                    value: false
                },

                sound: {
                    name: self.app.localization.e('sound'),
                    id: 'sound',
                    type: "BOOLEAN",
                    value: true
                },

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

                videoautoplay2: {
                    name: self.app.localization.e('e13277'),
                    id: 'videoautoplay2',
                    type: "BOOLEAN",
                    value: false
                },

                videop2p: {
                    name: self.app.localization.e('videop2psettings'),
                    id: 'videop2p',
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

                openlinksinelectron : {
					name: self.app.localization.e('openlinkssettings'),
					id : 'openlinksinelectron',
					type : "BOOLEAN",
					value : false,
				},

                sendUserStatistics : {
                    name: self.app.localization.e('sendUserStatistics'),
					id : 'sendUserStatistics',
					type : "BOOLEAN",
					value : true,
                },

                canuseip: {
                    name: self.app.localization.e('canuseipsetting'),
                    id: 'canuseip',
                    type: "BOOLEAN",
                    value: false
                },

            },

            //self.canuseip

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

                    posts: {
                        class : 'posts',
                        name: self.app.localization.e('posts'),
                        options: {

                            preview: options.preview

                        }
                    },


                    notifications: {
                        class : 'notifications',
                        name: self.app.localization.e('notifications'),
                        options: {

                            sound: options.sound,
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


                    video: {
                        name: self.app.localization.e('video'),
                        options: {
                            embedvideo: options.embedvideo,
                            videoautoplay2: options.videoautoplay2,
                            videop2p: options.videop2p
                        }
                    },


                    stats: {
                        name: self.app.localization.e('captionUserStats'),
                        options: {
                            sendUserStatistics: options.sendUserStatistics,
                        }
                    },

                    system : {
                        name: self.app.localization.e('system'),
                        options : {}
                    }
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
                    c.system.options.autostart = options.autostart
                }
                else{
                    if(!window.cordova){
                        c.system.options.openlinksinelectron = options.openlinksinelectron
                    }
                }

                if (self.app.canuseip()){
                    c.system.options.canuseip = options.canuseip
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

                        }

                        s.save();


                        if (electron && i == 'autostart') {

                            electron.ipcRenderer.send('electron-autoLaunchManage', {
                                enable : m[i].value
                            });

                        }

                        if (i == 'canuseip'){
                            app.peertubeHandler.clear()
                        }


                        if (window.cordova) {

                            if (i == 'win' || i == 'transactions' || i == 'upvotes' || i == 'comments' || i == 'answers' || i == 'followers' || i == 'rescued') {


                                /*if (m[i].value) {
                                    self.firebase.api.subscribe(i)
                                }
                                else {
                                    self.firebase.api.unsubscribe(i)
                                }*/

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

                var meta = self.sdk.usersettings.meta;

                _.each(meta, function (o, i) {

                    if (o.type === "VALUES") {

                        if (i === 'tgto' || i === 'tgfrom'){

                            var tgToken = meta.telegram && meta.telegram.value;

                            if (tgToken){

                                values[i] = {
                                    ...meta[i],
                                    [tgToken] : {
                                        possibleValues : o.possibleValues && o.possibleValues.map(i => String(i)),
                                        possibleValuesLabels : o.possibleValuesLabels,
                                        value : o.value
                                    }
                                }

                            }


                        } else {

                            values[i] = {};
                            values[i].possibleValues = o.possibleValues && o.possibleValues.map(i => String(i));
                            values[i].possibleValuesLabels = o.possibleValuesLabels;
                            values[i].value = o.value;

                        }


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

                if (self.app.platform.sdk.address.pnet() && self.istest()){

                    self.app.user.features.telegram = 1;

                } else {

                    self.app.user.features.telegram = 0;

                }

                _.each(values, function (v, i) {

                    if(!m[i]) return

                    if (typeof v === "object") {

                        if (m && m[i]){


                            if (i === 'tgto' || i === 'tgfrom'){

                                var tgToken = m.telegram && m.telegram.value;

                                if (tgToken){

                                    m[i] = v;
                                    m[i].value = v[tgToken].value;
                                    m[i].possibleValues = v[tgToken].possibleValues && v[tgToken].possibleValues.map(function(i){
                                        return String(i);
                                    })
                                    m[i].possibleValuesLabels = v[tgToken].possibleValuesLabels;

                                }

                            } else {

                                m[i].value = v.value;
                                m[i].possibleValues = v.possibleValues && v.possibleValues.map(function(i){
                                    return String(i);
                                })
                                m[i].possibleValuesLabels = v.possibleValuesLabels;

                            }

                        }


                    } else {
                        m[i].value = v;

                    }


                    if (i === "telegram") {


                        if(self.app.platform.sdk.address.pnet()){

                            if (self.istest()) {

                                var href = location.href;

                                if (href.indexOf('userpage?id=usersettings') === -1){


                                    self.app.platform.sdk.system.get.telegramGetMe(v.value);

                                }


                            }
                        }


                    }
                })

                if (electron) {

                    if (m.autostart.value === undefined) {
                        m.autostart.value = true;

                        electron.ipcRenderer.send('electron-autoLaunchManage', {
                            enable : m.autostart.value
                        });

                        self.sdk.usersettings.save();
                    }

                    self.ipcbridge.request('autoLaunchIsEnabled', {}).then(r => {

                        m.autostart.value = r

                        if (clbk) {
                            clbk()
                        }
                    })
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
                    html: app.meta.fullname + " chat ask you to generate encryption keys. But some error with your profile update was occuried:<br><b>" + text + "</b>",
                    btn1text: 'Edit profile',
                    class : 'one',
                    success: function () {

                        self.app.nav.api.load({
                            open: true,
                            href: 'userpage?id=test&opeanimage=true',
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
						//userInfo.ref.set(me.ref);

                        userInfo.keys.set(_.map(self.app.user.cryptoKeys(), function(k){
                            return k.public
                        }))

                    var err = userInfo.validation()

                    var addr = self.app.platform.sdk.address.pnet()

                    if (addr && self.nvadr[addr.address]){
                        err = null
                    }


                    if (err){

                        var errtext = 'Undefined Error'

						if(err == 'namelength'){
							errtext = "The name length can't be more than 20 symbols"
						}

						if(err == 'pocketnet'){
							errtext = 'To avoid user confusion using '+app.meta.fullname+' in name is reserved'
						}

                        if(err == 'bastyon'){
							errtext = 'To avoid user confusion using Bastyon in name is reserved'
						}

                        self.sdk.keys.error(errtext)

                        return Promise.reject(err)
                    }

                    return new Promise((resolve, reject) => {

                        /*dialog({
                            html: app.meta.fullname + " chat ask you to generate encryption keys. Do you want to proceed?",
                            btn1text: 'Generate Encryption Keys',
                            btn2text: self.app.localization.e('dno'),

                            success: function () {*/

                                self.sdk.node.transactions.create.commonFromUnspent(

                                    userInfo,

                                    function(tx, error){

                                        if(!tx){

                                            self.sdk.keys.error(self.errorHandler(error).text())

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

                            /*},

                            fail: function () {
                                reject('no')
                            },

                            close: function () {
                                reject('close')
                            }
                        })*/

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

                            if(me.temp || me.relay || me.fromstorage){
                                return reject('temprelaystorage')
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
                                u.fromstorage = true

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

                                        var src = r.image;
                                        var name = r.name;
                                        var letter = name ? name[0] : '';

                                        var h = '<div class="refaddWrapper">'

                                        h += '<div class="refaddHeader">'
                                        h +=  self.app.localization.e('e13290') + ' ' + (r.name || adrref) + '?'
                                        h += '</div>'

                                        h += '<div class="refaddTable table">'
                                        h += '<div class="imageCell">'

                                        h += '<div class="usericon" ban=".gif" image="' + (src || '*') + '">'

                                        if (!src && letter) {

                                            h += '<span class="letter">' + letter.toUpperCase() + '</span>';

                                        } else if (!src){

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
            },

            itisme : function(_address){
                var address = self.app.platform.sdk.address.pnet()

                if (address && address.address == _address){
                    return true
                }
            },

            reputationBlockedMe : function(address){

                if(!address) address = (self.app.platform.sdk.address.pnet() || {}).address

                return self.app.platform.sdk.user.itisme(address) && self.app.platform.sdk.user.reputationBlocked(address)

            },

            reputationBlockedNotMe : function(address){

                if(!address) address = (self.app.platform.sdk.address.pnet() || {}).address

                return !self.app.platform.sdk.user.itisme(address) && self.app.platform.sdk.user.reputationBlocked(address)

            },

            reputationBlocked : function(address){
                var ustate = self.sdk.ustate.storage[address] || deep(self, 'sdk.usersl.storage.' + address) || deep(self, 'sdk.users.storage.' + address);

				if (ustate && ustate.reputation <= -30 && !real[address]){
                    return true
                }
            },

            hiddenComment : function(comment){
                var address = comment.address
                var ustate = self.sdk.ustate.storage[address] || deep(self, 'sdk.usersl.storage.' + address) || deep(self, 'sdk.users.storage.' + address);

                if (self.app.platform.sdk.user.itisme(address)) return false
                
                if (ustate && ustate.reputation <= -0.5){
                    if(comment.scoreDown >= 5){
                        return true
                    }
                }
            },

            scamcriteria : function(address){

                if(!address) address = (self.app.platform.sdk.address.pnet() || {}).address

                var info = deep(self, 'sdk.users.storage.' + address);

                if (info.reputation > 100 && info.postcnt < 10) return true

                return false

            },

            upvotevalueblockcriteria : function(value, address){

                if(!address) address = (self.app.platform.sdk.address.pnet() || {}).address

                var info = deep(self, 'sdk.users.storage.' + address);

                if (value <= 3 && info.reputation < 100) return true

                return false

            }, 

            reputationBlockedRedirect : function(address){
                if(self.sdk.user.reputationBlocked(address)){

                    if (self.sdk.user.itisme(address)){
                        self.app.nav.api.load({
                            open : true,
                            href : 'userpage',
                            history : true,
                            replaceState : true
                        })
                    }
                    else{
                        self.app.nav.api.load({
                            open : true,
                            href : 'page404',
                            history : true,
                            replaceState : true
                        })
                    }

                    return true

                }
            },

            mystatisticnov : function(){
                var novblock = 1420300
                var address = self.sdk.address.pnet().address;

                if(window.testpocketnet) novblock = 302900

                return pretry(function(){
                    return self.currentBlock
                }).then(r => {
                    return self.sdk.user.statistic(address, self.currentBlock - novblock)
                })

            },

            statistic : function(address, de){

                return self.app.api.rpc('getuserstatistic', [[address], 0, de]).then(d => {

                    var result = _.find(d, function(p){
                        return p.address == address
                    })

                    return result

                }).catch(e => {
                    if (clbk)
                        clbk([])
                })
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

                        /*if (info.video_unspent <= num) {
                            if (clbk)
                                clbk('videounspent')

                            return
                        }*/



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
                            self.app.settings.set(a, 'last_ustate_2', info)
                        }
                        else {
                            info = self.app.settings.get(a, 'last_ustate_2') || {}

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

                        if(e && e.code == -5){
                            _.each(addresses || [], function (address) {
                                s[address] = {}
                            })
                        }

                        if (clbk)
                            clbk([])
                    })

                }
                else {
                    if (clbk)
                        clbk()
                }
            },

            haslowlimits : function(state){

                state || (state = {})

                var m = self.sdk.ustate.metrics()

                return _.filter(m, function(metrica){

                    var l = Number(state[metrica.key + "_unspent"])

                    return metrica.bad(l)

                })
            },

            haszerolimits : function(state){

                state || (state = {})

                var m = self.sdk.ustate.metrics()

                return _.filter(m, function(metrica){
                    return Number(state[metrica.key + "_unspent"]) === 0
                })
            },

            canincrease : function(p, clbk){

                if(!p) p = {}

                if (p.template == 'trial'){
                    p.balance = 1000000000
                    p.reputation = 100
                    p.trial = true
                }

                if (p.template == 'video'){
                    p.balance = 500000000
                    p.reputation = 50
                }

                var result = {}

                self.sdk.ustate.me(function(info){

                    if(p.balance && info.balance < p.balance) result.balance = true
                    else
                    if(p.reputation && info.reputation < p.reputation) result.reputation = true
                    else
                    if(p.trial && !info.trial) result.trial = true

                    clbk(result)
                })
            },

            metrics : function(){
                return {


                    post : {
                        key : 'post',
                        vis : 'scale',
                        name : self.app.localization.e('spc'),
                        bad : function(v){
                            if(v <= 3) return true
                        }
                    },

                    video : {
                        key : 'video',
                        vis : 'scale',
                        name : self.app.localization.e('spv'),
                        bad : function(v){
                            if(v <= 3) return true
                        }
                    },

                    score : {
                        key : 'score',
                        vis : 'scale',
                        name : self.app.localization.e('ssc'),
                        bad : function(v){
                            if(v <= 7) return true
                        }
                    },

                    comment : {
                        key : 'comment',
                        vis : 'scale',
                        name : self.app.localization.e('ccc'),
                        bad : function(v){
                            if(v <= 7) return true
                        }
                    },

                    comment_score : {
                        key : 'comment_score',
                        vis : 'scale',
                        name : self.app.localization.e('crc'),
                        bad : function(v){
                            if(v <= 10) return true
                        }
                    },

                    complain : {
                        key : 'complain',
                        vis : 'scale',
                        name : self.app.localization.e('ccpl'),
                        bad : function(v){
                            if(v <= 3) return true
                        }
                    }
                }
            }

        },



        notifications: {
            storage: {},

            inited: false,

            clbks: {
                added: {},
                seen: {},
                inited : {}
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

                    e.notifications = _.sortBy(e.notifications, function (n) {
                        return -Number(n.time || n.nTime)
                    })

                    e.notifications = firstEls(e.notifications, 75) 

                    if (self.sdk.address.pnet())
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


                return this.getNotifications().then(r => {

                    _.each(n.clbks.inited, function (f) {
                        f()
                    })

                    return Promise.resolve(r)
                })

            },

            wsBlock: function (block) {

                if (block > this.storage.block) {

                    this.storage.block = block;
                }

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

                notifications = firstEls(notifications, 75)

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
                    return -Number(n.time || n.nTime)
                })

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

            getNotifications: function (blockdif) {
                var n = this;


                if(!n.inited && !n.loading) {
                    return n.init()
                }
                else {

                    return self.sdk.node.get.timepr().then(r => {

                        return self.sdk.missed.get(n.storage.block - (blockdif || 0))

                    }).then(({block, notifications}) => {

                        return new Promise((resolve, reject) => {

                            n.getNotificationsInfo(notifications || [], function () {

                                if (block.block > n.storage.block) {
                                    n.storage.block = block.block
                                }

                                n.inited = true;
                                n.save();

                                resolve();

                            })

                        })



                    }).catch(e => {

                        console.error(e)

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
               // if (self.currentBlock - block > 5000) block = self.currentBlock - 5000
                if (self.currentBlock == block) return Promise.resolve(dummy())


                return self.app.api.rpc('getmissedinfo', [self.sdk.address.pnet().address, block, 30]).then(d => {

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

            nameaddressstorage : {},

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
                    u.temp = true
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
                    if (s[a].temp || s[a].relay || s[a].fromstorage) return true


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

            requestFreeMoney: function (clbk, proxyoptions) {

                var a = self.sdk.address.pnet();

                if (a) {
                    a = a.address;


                    this.checkFreeMoney(a, function (r) {
                        if (!r) {
                            if (clbk)
                                clbk(null)
                        }
                        else {

                            var prms = {
                                address: a,
                                captcha: self.sdk.captcha.done
                            }

                            self.app.api.fetchauth('free/registration', prms, proxyoptions).then(d => {
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

                    name = (name || '').toLowerCase()

                    var lf = _.find(self.sdk.usersl.storage, function (s) {
                        if (s && s.name && s.name.toLowerCase() == name.toLowerCase()) return true
                    })

                    if(!lf){
                        lf = _.find(self.sdk.users.storage, function (s) {
                            if (s && s.name && s.name.toLowerCase() == name.toLowerCase()) return true
                        })
                    }

                    if(self.sdk.users.nameaddressstorage[name]){
                        if (clbk)
                            clbk(self.sdk.users.nameaddressstorage[name])

                        return
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

                var sreg = /(?:^|\s)@([a-zA-Z0-9_]+)/g

                var name = str.match(sreg);

                if (!name) {
                    return str
                }
                else {
                    var cname = h(name, p)

                    return str.replace(sreg, cname)
                }

            },

            getRecommendedAccountsByTags : function(clbk){

                var selectedTags = self.app.platform.sdk.categories.gettags();

                if (selectedTags.length){

                    self.app.api.rpc('getrecomendedaccountsbytags', [selectedTags, 15])
                    .then(function(d){

                        if (clbk){
                            clbk(d)
                        }

                    })


                }
                else{
                    if (clbk){
                        clbk([])
                    }
                }

                
            },

            getBestUsers : function(clbk){

                var my = self.app.user.address.value;

                self.app.api.rpc('getrecomendedaccountsbyscoresfromaddress', [my, ['share', 'video'], 0, 20000, 15])
                .then(function(d){

                    if (clbk){
                        clbk(d)
                    }

                })
                .catch(function(e){

                    if (clbk){
                        clbk(null)
                    }
                })
            },

            commonuserpoint : function(address, me){
                var point = 1;


                if (me.relation(address, 'subscribes')){
                    point += 100
                }

                if (me.relation(address, 'subscribers')){
                    point += 20
                }

                if(self.sdk.usersl.storage[address]) point += 40
                if(self.sdk.users.storage[address]) point += 40


                var activities = self.app.platform.sdk.activity.has('users', address)

				if (activities.point){
					point = point * activities.point / 10
				}




                return point

            }
        },



        posts: {
            
            getRecommendedPosts : function(clbk){

                var my = self.app.user.address.value;

                self.app.api.rpc('getrecomendedcontentsbyscoresfromaddress', [my, ['share', 'video'], 0, 20000, 15])
                .then(function(d){

                    if (clbk){
                        clbk(d)
                    }

                })
                .catch(function(e){

                    if (clbk){
                        clbk(null, e);
                    }
                })
            },

            getRecommendedPostsContents : function(parameters, clbk){

                self.app.api.rpc('getrawtransactionwithmessagebyid', parameters)
                .then(function(d){

                    if (clbk){
                        clbk(d)
                    }
                })
                .catch(function(e){

                    if (clbk){
                        clbk(null)
                    }
                })
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
            get: function (clbk, refresh, proxyoptions) {
                if (refresh) this.current = null;

                self.app.api.fetchauth('captcha', {
                    captcha: this.done || this.current || null
                }, proxyoptions).then(d => {


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
                                clbk(null, err)
                            }
                        }, proxyoptions)
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

            make: function (text, clbk, proxyoptions) {

                self.app.api.fetchauth('makecaptcha', {
                    captcha: this.current || null,
                    text: text
                }, proxyoptions).then(d => {
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

                                console.log('txbaseFeesMeta', tx)

                                self.app.platform.sdk.node.transactions.send(tx, function (d, err) {

                                    if (err) {
                                        if (clbk)
                                            clbk(err)
                                    }

                                    else {
                                        var ids = _.map(inputs, function (i) {
                                            return {
                                                txid: i.txId || i.txid,
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

                        var sline = el.find('.spendLine .line');;

                        if (amount == 0) {
                            sline.addClass('bad')
                        }
                        else {
                            sline.removeClass('bad')
                        }

                        sline.css('width', (100 * amount / total) + "%")


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
                                        txid: i.txId || i.txid,
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
                if (!self.sdk.addresses.storage.addresses) {
                    self.sdk.addresses.storage.addresses = [];
                }

                if (!self.sdk.addresses.storage.addressesobj) {
                    self.sdk.addresses.storage.addressesobj = [];
                }

                const anum = localStorage[self.sdk.address.pnet().address + 'addressesNum'] || 10;

                const walletsItem = self.sdk.address.pnet().address + 'wallets';

                /**
                 * Here we take cached wallet ID's
                 * or generating them dynamically if
                 * not cached.
                 */
                if (walletsItem in localStorage) {
                    // console.time('LOADING CACHED WALLETS');
                    const wallets = JSON.parse(localStorage[walletsItem]);

                    wallets.forEach((walletAddress, walletNum) => {
                        self.sdk.addresses.addCachedWallet(walletNum, walletAddress);
                    });
                    // console.timeEnd('LOADING CACHED WALLETS');
                } else {
                    // console.time('GENERATING WALLETS');
                    const addressesList = [];

                    for (let i = 0; i < anum; i++) {
                        const address = self.sdk.addresses.addWalletAddress(i);

                        addressesList.push(address);
                    }

                    localStorage[walletsItem] = JSON.stringify(addressesList);
                    // console.timeEnd('GENERATING WALLETS');
                }

                self.sdk.addresses.save();

                if (typeof clbk === 'function') {
                    clbk();
                }
            },

            save: function () {
                const countAddresses = self.sdk.addresses.storage.addresses.length;

                if (countAddresses) {
                    const itemName = self.sdk.address.pnet().address + 'addressesNum';
                    localStorage[itemName] = countAddresses;
                }
            },

            addCachedWallet: function(num, address) {
                const proxyData = {
                    getWalletData: self.sdk.address.wallet,
                    walletNum: num,
                    walletAddress: address,
                };

                /**
                 * Proxy object is used here to
                 * give access to wallet credentials
                 * populator, without really instantiating
                 * wallet data. It creates data only when
                 * requested.
                 */
                const proxy = new Proxy(proxyData, {
                    get: (p, num) => {
                        const addressObj = p.getWalletData(p.walletNum);

                        /**
                         * Once wallet credentials populated
                         * replacing Proxy object with
                         * original wallet data.
                         */
                        self.sdk.addresses.storage.addressesobj[p.walletNum] = addressObj;

                        return addressObj[p.walletNum];
                    }
                });

                self.sdk.addresses.storage.addresses[num] = address;
                self.sdk.addresses.storage.addressesobj[num] = proxy;
            },

            addWalletAddress: function (num = self.sdk.addresses.storage.addresses.length) {
                const wallet = self.sdk.address.wallet(num);

                self.sdk.addresses.storage.addresses[num] = wallet.address;
                self.sdk.addresses.storage.addressesobj[num] = wallet;

                return wallet.address;
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
                    a = bitcoin.payments[type]({ pubkey })

                    this.storage[type] = a;

                    return a;
                }

                if (type == 'p2sh') {

                    a = bitcoin.payments['p2wpkh']({ pubkey })

                    var p2sh = bitcoin.payments.p2sh({ redeem: a })

                    this.storage[type] = p2sh;

                    return p2sh;
                }
            },

            wallet: function (n, private) {
                const { publicKey: pubkey } = self.sdk.address.dumpKeys(n, private);

                const a = bitcoin.payments['p2wpkh']({ pubkey });

                const p2sh = bitcoin.payments.p2sh({ redeem: a });

                return p2sh;
            },

            dumpKeys: function (n, private = self.app.user.private.value) {
                const addressPath = app.platform.sdk.address.path(n);
                const d = bitcoin.bip32.fromSeed(private).derivePath(addressPath).toWIF();

                const keyPair = bitcoin.ECPair.fromWIF(d);

                return keyPair;
            },

            dumpPrivKey: function (n) {
                const keyPair = self.sdk.address.dumpKeys(n);

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

            points : {
                users : {
                    like : 50,
                    search : 30,
                    subscribe : 100,
                    visited : 20
                }
            },

            has : function(key, id){

                var sum = 1

                var activities = _.filter(

                    _.map(self.sdk.activity.latest, function(ar, k){


                        if(_.find(ar, function(u, k){
                            return id == u.id
                        })){

                            var p = self.sdk.activity.points[key][k] || 20

                            sum += p

                            return {
                                k : k,
                                p : p
                            }

                        }
                        else{
                            return null
                        }


                    })

                , function(v){ return v })

                return {
                    activities,
                    point : sum
                }
            },

            adduser : function(key, address){

                if(!address) return

                self.sdk.users.get([address], function () {

                    var user = self.sdk.usersl.storage[address] || self.sdk.users.storage[address]

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

                }, true)

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

                l[key] = firstEls(l[key], 300)

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

                self.sdk.activity.filladdressstorage()


                if(clbk) clbk()
            },

            filladdressstorage : function(){

                var stor = self.app.platform.sdk.users.nameaddressstorage

                _.each(self.sdk.activity.latest, function(l){
                    _.each(l, function(a){

                        if (a.type == 'user') stor[a.index] = a.id
                    })
                })

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
                            name : "PKOIN/peer-to-peer",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },

                        {
                            name : "COVID/Lockdowns",
                            tags : ['covid', 'lockdowns'],
                            id : 'c72'
                        },

                        {
                            name : "Auto/Racing",
                            tags : ['auto', 'racing'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
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
                            name : "PKOIN/из рук в руки",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },


                        {
                            name : "COVID/локдаун",
                            tags : ['covid', 'локдаун'],
                            id : 'c72'
                        },
                        {
                            name : "Автомобили/Гонки",
                            tags : ['auto', 'racing'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
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
                            name : "PKOIN/peer-to-peer",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },

                        {
                            name : "冠狀病毒病/封鎖",
                            tags : ['冠狀病毒病', '封鎖'],
                            id : 'c72'
                        },
                        {
                            name : "汽車/賽車",
                            tags : ['汽車', '賽車'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
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
                            name : "PKOIN/peer-to-peer",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },

                        {


                            name : "COVID/Lockdowns",
                            tags : ['코로나', '잠금'],
                            id : 'c72'
                        },
                        {
                            name : "자동차/레이싱 ",
                            tags : ['자동차', '레이싱'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
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
                            name : "PKOIN/peer-to-peer",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },

                        {

                            name : "COVID/Verrouillages",
                            tags : ['covid', 'Verrouillages'],
                            id : 'c72'
                        },
                        {
                            name : "Voitures/Courses",
                            tags : ['voitures', 'courses'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
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
                            name : "PKOIN/peer-to-peer",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },

                        {
                            name : "COVID/Cierres",
                            tags : ['covid', 'сierres'],
                            id : 'c72'
                        },
                        {
                            name : "Coches/Carreras",
                            tags : ['coches', 'carreras'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
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
                            name : "PKOIN/peer-to-peer",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },

                        {
                            name : "COVID/Sperren",
                            tags : ['covid', 'Sperren'],
                            id : 'c72'
                        },
                        {
                            name : "Autos/Rennen ",
                            tags : ['autos', 'rennen'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
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
                    it : [
                        {
                            name : "Meme/divertente",
                            tags : ['divertente', 'meme'],
                            id : 'c2'
                        },
                        {
                            name : "Politica",
                            tags : ['politica'],
                            id : 'c3'
                        },
                        {
                            name : "Cripto",
                            tags : ['cripto'],
                            id : 'c4'
                        },
                        {
                            name : "Tecnologia/Scienza",
                            tags : ['tecnologia', 'scienza'],
                            id : 'c5'
                        },
                        {
                            name : "Fede/Religione",
                            tags : ['fede', 'religione'],
                            id : 'c55'
                        },
                        {
                            name : "Investire/Finanza",
                            tags : ['investire', 'finanza'],
                            id : 'c6'
                        },
                        {
                            name : "PKOIN/peer-to-peer",
                            tags : ['pkoin_commerce'],
                            id : 'c63',
                            new : true
                        },

                        {
                            name : "COVID/Quarantena",
                            tags : ['covid', 'quarantena'],
                            id : 'c72'
                        },

                        {
                            name : "Auto/Da corsa",
                            tags : ['auto', 'dacorsa'],
                            id : 'c7'
                        },
                        {
                            name : "Bastyon/Pocketnet",
                            tags : ['bastyon', 'pocketnet'],
                            id : 'c71'
                        },
                        {
                            name : "Sport",
                            tags : ['sport'],
                            id : 'c8'
                        },
                        {
                            name : "Gioco",
                            tags : ['gioco'],
                            id : 'c9'
                        },


                        {
                            name : "Arte/Musica",
                            tags : ['arte', 'musica'],
                            id : 'c11'
                        },

                        {
                            name : "Notizia/Commento",
                            tags : ['notizia', 'commento'],
                            id : 'c12'
                        },

                        {
                            name : "Storia",
                            tags : ['storia'],
                            id : 'c13'
                        },
                        {
                            name : "Ora della favola",
                            tags : ['oradellafavola'],
                            id : 'c14'
                        },

                        {
                            name : "Film/Animazione",
                            tags : ['film', 'animazione'],
                            id : 'c15'
                        },

                        {
                            name : "Natura/Animali",
                            tags : ['nature', 'animali'],
                            id : 'c16'
                        },

                        {
                            name : "Viaggiare/Architettura",
                            tags : ['viaggiare', 'architettura'],
                            id : 'c17'
                        },

                        {
                            name : "Fai da te",
                            tags : ['faidate'],
                            id : 'c18'
                        }
                    ]
                },

                categoryIcons : [
                    {
                        "id": "c2",
                        "icon": "far fa-smile"
                    },
                    {
                        "id": "c3",
                        "icon": "fas fa-award"
                    },
                    {
                        "id": "c4",
                        "icon": "fab fa-btc"
                    },
                    {
                        "id": "c5",
                        "icon": "fas fa-microscope"
                    },
                    {
                        "id": "c55",
                        "icon": "fas fa-book"
                    },
                    {
                        "id": "c6",
                        "icon": "fas fa-dollar-sign"
                    },
                    {
                        "id": "c73",
                        "icon": "fas fa-fist-raised"
                    },
                    {
                        "id": "c72",
                        "icon": "fas fa-thermometer"
                    },
                    {
                        "id": "c7",
                        "icon": "fas fa-flag-checkered"
                    },
                    {
                        "id": "c8",
                        "icon": "fas fa-running"
                    },
                    {
                        "id": "c9",
                        "icon": "fas fa-gamepad"
                    },
                    {
                        "id": "c10",
                        "icon": "fas fa-space-shuttle"
                    },
                    {
                        "id": "c11",
                        "icon": "fas fa-music"
                    },
                    {
                        "id": "c12",
                        "icon": "fas fa-newspaper"
                    },
                    {
                        "id": "c13",
                        "icon": "fas fa-history"
                    },
                    {
                        "id": "c14",
                        "icon": "fas fa-bookmark"
                    },
                    {
                        "id": "c15",
                        "icon": "fas fa-film"
                    },
                    {
                        "id": "c16",
                        "icon": "fas fa-paw"
                    },
                    {
                        "id": "c17",
                        "icon": "fas fa-route"
                    },
                    {
                        "id": "c18",
                        "icon": "fas fa-pencil-ruler"
                    }
                ]
            },

            settings : {
                tags : {},
                selected : {},
                added : {},
                excluded : {}
            },

            clbks : {
                selected : {},
                added : {},
                tags  : {},
                removed : {},
                excluded : {}
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

            gettagsexcluded : function(_k, onlycategories){
                var tags = []

                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                var excluded = self.sdk.categories.settings.excluded[k] || {};



                var all = self.sdk.categories.get(k)

                _.each(all, function(c){
                    if(excluded[c.id]) tags = tags.concat(c.tags)
                })


                if(onlycategories === 'onlytags') tags = excludedtags

                return tags
            },  

            gettagsexcluded : function(_k, onlycategories){
                var tags = []

                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                var excluded = self.sdk.categories.settings.excluded[k] || {};



                var all = self.sdk.categories.get(k)

                _.each(all, function(c){
                    if(excluded[c.id]) tags = tags.concat(c.tags)
                })


                if(onlycategories === 'onlytags') tags = excludedtags

                return tags
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
                if(!category.name.trim()) return 'name'
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

                self.sdk.categories.save();

                _.each(self.sdk.categories.clbks.selected, function(f){
                    f(id, s.selected[k][id], k)
                })

                return false
            },

            exclude : function(id, _k){

                if(!id) return 'emptyid'

                var allcats = self.sdk.categories.get(_k)

                var cat = _.find(allcats, function(c){
                    return c.id == id
                })

                if(!cat) return 'cantonfound'

                var s = self.sdk.categories.settings
                var k = _k || self.app.localization.key

                if(!self.sdk.categories.data.all[k]) k = 'en'

                s.excluded[k] || (s.excluded[k] = {})


                if (s.excluded[k][id]){

                    delete s.excluded[k][id];

                } else {
                    s.excluded[k][id] = true;
                        
                    s.selected[k] || (s.selected[k] = {})

                    if (s.selected[k][id]){
                        delete s.selected[k][id]


                        _.each(self.sdk.categories.clbks.selected, function(f){
                            f(id, s.selected[k][id], k)
                        })
                    }
                } 


                self.sdk.categories.save()

                _.each(self.sdk.categories.clbks.excluded, function(f){
                    f(id, s.excluded[k][id], k)
                })

                return false
            },

            get : function(_k){
                var k = _k || self.app.localization.key;

                var added = _.map(self.sdk.categories.settings.added[k]|| {}, 
                function(c){
                    var cc = _.clone(c);

                    cc.added = true;

                    
                    return cc
                })

                var categories = self.sdk.categories.data.all[k] || self.sdk.categories.data.all['en'];

                var categoryIcons = self.sdk.categories.data.categoryIcons;

				categories = _.map(categories, function(k){
					var withIcon = categoryIcons.find(function(ki){
						return ki.id === k.id;
					})

					if (withIcon){
						k.icon = withIcon.icon;
					} else {
                        k.icon = 'fa fa-mouse-pointer'
                    }

					return k;
				})

                return (categories).concat(added)
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
                var excluded = self.sdk.categories.settings.excluded[k] || {}

                var all = self.sdk.categories.get()

                return _.map(all, function(c){
                    var cs = _.clone(c)

                    cs.selected = selected[c.id] ? true : false
                    cs.excluded = excluded[c.id] ? true : false

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
                self.sdk.categories.clbks.excluded = {}



                try {
                    p = JSON.parse(localStorage['categoriessettings'] || '{}');
                }
                catch (e) {}


                if(!p.settings) p.settings = {}

                self.sdk.categories.settings = p.settings

                self.sdk.categories.settings.tags || (self.sdk.categories.settings.tags = {})
                self.sdk.categories.settings.selected || (self.sdk.categories.settings.selected = {})
                self.sdk.categories.settings.added || (self.sdk.categories.settings.added = {})
                self.sdk.categories.settings.excluded || (self.sdk.categories.settings.excluded = {})

                if(clbk) clbk()
            }

        },
        tags: {
            storage: {

                cloud: null,

                all: {
                    default : ['love', 'followback', 'instagramers', 'socialsteeze', 'tweegram', 'photooftheday', '20likes', 'amazing', 'smile', 'follow4follow', 'like4like', 'look', 'instalike', 'igers', 'picoftheday', 'food', 'instadaily', 'instafollow', 'followme', 'girl', 'instagood', 'bestoftheday', 'instacool', 'carryme', 'follow', 'colorful', 'style', 'swag', 'fun', 'instagramers', 'model', 'socialsteeze', 'food', 'smile', 'pretty', 'followme', 'nature', 'lol', 'dog', 'hair', 'sunset', 'swag', 'throwbackthursday', 'instagood', 'beach', 'friends', 'hot', 'funny', 'blue', 'life', 'art', 'photo', 'cool', 'carryme', 'bestoftheday', 'clouds', 'amazing', 'socialsteeze', 'fitness', 'followme', 'all_shots', 'textgram', 'family', 'instago', 'igaddict', 'awesome', 'girls', 'instagood', 'my', 'bored', 'baby', 'music', 'red', 'green', 'water', 'bestoftheday', 'black', 'party', 'white', 'yum', 'flower', 'carryme', 'night', 'instalove', 'photo', 'photos', 'pic', 'pics', 'socialsteeze', 'picture', 'pictures', 'snapshot', 'art', 'beautiful', 'instagood', 'picoftheday', 'photooftheday', 'color', 'all_shots', 'exposure', 'composition', 'focus', 'capture', 'moment', 'hdr', 'hdrspotters', 'hdrstyles_gf', 'hdri', 'hdroftheday', 'hdriphonegraphy', 'hdr_lovers', 'awesome_hdr']
                },


            },

            additional : [{
                tag : 'pkoin_commerce',
                new : true,
                class : 'bright',
                info : 'pkoin_commerce_info'
            }],

            findadditional : function(tag){
                return _.find(this.additional, function(v){
                    return v.tag == tag
                })
            },

            ex: {'news': true, 'images': true, 'videos': true, 'politics': true, 'funny': true, 'art': true, 'photo': true },

            search: function (str, clbk) {
                var all = []
                str = clearTagString(str);

                _.each(self.sdk.tags.storage.all, function(st){
                    var s = _.filter(st, function (t) {

                        if (t.indexOf(str) > -1) return true;
    
                    })

                    all = all.concat(s)
                })

                all = _.uniq(all)

                if (clbk)
                    clbk(lastEls(all, 7))

            },

            get: function (address, count, block, localization, clbk) {

                var parameters = [address || ''];

                if (count) parameters.push(count.toString())
                else parameters.push('')

                if (block) parameters.push(block.toString())
                else parameters.push('')


                ///
               // parameters.push(self.app.localization.key)

                parameters.push(localization || self.app.localization.key)

                self.app.api.rpc('gettags', parameters).then(d => {


                    var _d = _.map(d, function(_d){
                        return {
                            count : _d.count,
                            tag : clearTagString(trim(decodeURIComponent(decodeURIComponent(_d.tag))))
                        }
                    })


                    if (clbk) {
                        clbk(_d)
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
                var loc = self.app.localization.key

                if(!s.all) s.all = {}

                retry(function(){
                    return self.currentBlock
                }, function(){

                    var round = (a, b) => a - a % b

                    t.get('', 150, round(self.currentBlock, 1000) - 20000, loc, function (d) {

                        if(!s.all) s.all = {}

                        if (d && d.length) {

                            s.all[loc] = _.map(d, function (t) {
                                return t.tag
                            })

                        }
                        else{
                            s.all[loc] = []
                        }

                        _.each(t.additional, function(at){
                            if (s.all[loc].indexOf(at.tag) == -1){
                                s.all[loc].unshift(at.tag)
                            }
                        })

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

                var t = this
                var s = this.storage;
                var loc = self.app.localization.key

                if(!s.cloud) s.cloud = {}

                if (s.cloud[loc] && !update) {
                    if (clbk) {
                        clbk(s.cloud[loc])
                    }
                }
                else {

                    var round = (a, b) => a - a % b

                    retry(function(){
                        return self.currentBlock
                    }, function(){

                        t.get('', 50, (round(self.currentBlock, 1000) - 23700), loc, function (d, error) {
                            if(!s.cloud) s.cloud = {}

                            if (!error) s.cloud[loc] = d

                            _.each(t.additional, function(at){

                                if (at.positionincloud){

                                    var lt = _.find(s.cloud, function(t){
                                        return t.tag == at.tag
                                    })

                                    if(!lt){
                                        var vs = _.clone(at)
                                            s.cloud.push(vs)
                                    }

                                    if (lt){

                                        lt.positionincloud = at.positionincloud
                                        lt.class = at.class

                                        if (lt.count < 2000){
                                            lt.new = at.new
                                        }
                                    }
                                }

                            })

                            if (clbk) {
                                clbk(s.cloud[loc], error)
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

            getcached : function(value, fixedBlock, type, start, count, address){
                var s = this.storage;
                var result = []

                if(!start) start = 0

                if(!s[type]) s[type] = {}

                if (s[type][value] && s[type][value][address] && s[type][value][address][fixedBlock] && s[type][value][address][fixedBlock].data){

                    for (var i = 0; i < count; i++) {
                        if (s[type][value][address][fixedBlock].data[start + i])
                            result.push(s[type][value][address][fixedBlock].data[start + i])
                    }

                }


                if(result.length) return {
                    data : result
                }

                return null
            },

            add: function (value, fixedBlock, type, result, start, count, address) {
                var s = this.storage;

                if(!start) start = 0

                if(!s[type]) s[type] = {}

                if (!s[type][value]) s[type][value] = {}
                if (!s[type][value][address]) s[type][value][address] = {}

                if (!s[type][value][address][fixedBlock]) {
                     s[type][value][address][fixedBlock] = result;
                }

                else {
                    for (var i = 0; i < count; i++) {

                        if (result.data[i])
                            s[type][value][address][fixedBlock].data[start + i] = result.data[i]
                    }
                }

            },

            preview: function (value, fixedBlock, type, start, count, address) {
                var s = this.storage;

                if(!start) start = 0

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

            get: function (value, type, start, count, fixedBlock, clbk, address, cached) {

                if (!address) address = 'pocketnet'

                var s = self.sdk.search;

                if(typeof fixedBlock == 'undefined') fixedBlock = self.currentBlock

                type || (type = 'fs')

                if(!s[type]) s[type] = {}

                s.preview(fixedBlock, type, start, count, address)

                value = trim(value.replace(/[^а-яА-Яa-zA-Z0-9\# _]+/g, ''))

                if(cached && type && type != 'fs') {

                    var g =  self.sdk.search.getcached(value, fixedBlock, type, start, count, address)

                    if (g){
                        if (clbk)
                            clbk(g, fixedBlock)

                        return
                    }
                }

                var np = [encodeURIComponent(value), type, fixedBlock, (start || 0).toString(), (count || 10).toString()]

                if (address != 'pocketnet') np.push(address)

                if (value.length) {

                    self.app.api.rpc('search', np).then(d => {

                        if (type != 'fs') {

                            if (type == 'all') {
                                _.each(d, function (d, k) {
                                    s.add(value, fixedBlock, k, d, start, count, address)
                                })
                            }
                            else {
                                d = d[type] || {
                                    data: []
                                }

                                s.add(value, fixedBlock, type, d, start, count, address)
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

                ids = _.sortBy(ids, function(id){
                    return id
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

                    commentsid = _.sortBy(commentsid, function(id){
                        return id
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

                                            l.storage[v.cmntid] = Number(v.myscore)

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

            blocked : {
                
            },

            sendclbks: {
            },

            upvoteClbks: {

            },

            saveblocked : function(){

                var a = self.sdk.address.pnet();

                if (a) {
                    self.app.settings.set(self.sdk.address.pnet().address, 'blockedcomments', JSON.stringify(self.sdk.comments.blocked || {}))
                }

            },
            loadblocked : function(clbk){
                var a = self.sdk.address.pnet();

                if (a) {
                    self.sdk.comments.blocked = JSON.parse(self.app.settings.get(self.sdk.address.pnet().address, 'blockedcomments') || "{}")
                }

                if(clbk) clbk()
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
                    myScore: 0,
                    deleted : comment.deleted
                }

                return lc;
            },

            ini: function (d) {

                var s = self.sdk.comments.storage;
                s.all || (s.all = {})

                var relay = self.sdk.relayTransactions.get();
                var newblock = false

                var c = _.map(d || [], function (data) {
                    var comment = new pComment();

                    comment.import(data)
                    comment.setTime(data.time, data.timeUpd)

                    comment.children = Number(data.children)
                    comment.address = data.address;
                    comment.verify = true;

                    comment.rating = data.rating
                    comment.deleted= data.deleted || data.blck

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

                    if (self.sdk.user.hiddenComment(c)) {
                        self.sdk.comments.blocked[c.address] = true
                        newblock = true
                    }
                        
                })

                if(newblock){
                    self.sdk.comments.saveblocked()
                }


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

            getclear: function (txid, pid, clbk, ccha) {

                var s = self.sdk.comments.storage;
                var i = self.sdk.comments.ini;
                var address = ''

                var ao = self.app.platform.sdk.address.pnet();

                if (ao) address = ao.address

                s[txid] || (s[txid] = {})


                if(ccha && s[txid][pid || '0']){

                    if (clbk)
                        clbk(s[txid][pid || '0'])

                    return
                }


                self.app.api.rpc('getcomments', [txid, pid || '', address]).then(d => {

                    self.sdk.comments.temps(d, txid, pid)

                    var c = i(d)

                    s[txid][pid || '0'] = c

                    if (clbk)
                        clbk(c)

                }).catch(e => {
                    if (clbk) {
                        clbk(null, e)
                    }
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

                                comment.myScore = Number(upvote.value.v)

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
                },

                accSet: function (settings, clbk) {

                    self.sdk.node.transactions.create.commonFromUnspent(

                        settings,

                        function (_alias, error) {


                            if (!_alias) {

                                if (clbk) {
                                    clbk(error, null)
                                }

                            }

                            else {

                                if (clbk)
                                    clbk(null, _alias)
                            }

                        }
                    )

                },
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

                checkvisibility : function(share){
                    var v = share.visibility()

                    var a = self.sdk.address.pnet()

                    if(a && a.address == share.address) return false

                    if(!v) return false

                    if (v == 'reg'){

                        if(self.app.user.getstate()) return false

                        return v

                    }

                    if (v == 'sub'){

                        var a = self.sdk.address.pnet()

                        if (a){

                            var me = deep(app, 'platform.sdk.users.storage.' + a.address)

                            if (me && me.relation(share.address, 'subscribes')) {
                                return false
                            }

                        }


                    }

                    return v


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

                        if(!s) return
                        
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


                delete: function (txid, share, clbk) {

                    var s = self.sdk.node.shares.storage;

                    share.txid = txid

                    self.sdk.node.transactions.create.commonFromUnspent(

                        share,

                        function (_alias, error) {


                            if (!_alias) {

                                if (clbk) {
                                    clbk(error, null)
                                }

                            }

                            else {

                                s[txid] || (s[txid] = {})

                                var c = _.find(s[txid][share.parentid || '0'] || [], function (c) {
                                    return c.id == share.id
                                })

                                if (c) c.deleted = true

                                if (clbk)
                                    clbk(null, _alias)
                            }

                        }
                    )

                },

                tempContentDelete: function (shares) {


                    _.each(self.sdk.relayTransactions.withtemp('contentDelete'), function (tempShare) {

                        var txid = tempShare.txidEdit;

                        _.find(shares, function (share) {

                            if (share.txid == txid) {

                                share.deleted = true;

                                return true
                            }


                        })

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
                getsavedbyids: function (p, clbk) {
                    if (!p.txids.length) {
                        if (clbk)
                            clbk([], null, p);
                        return;
                    }
                    var loadedShares = [];
                    _.each(p.txids, function (txid) {

                        var curShare = self.sdk.localshares.getShare(txid);

                        if (curShare) {

                            if (!curShare || !curShare.share || !curShare.share.user || !curShare.share.user.adr || !curShare.share.share)
                                return;

                            // Prepare user
                            var newUser = self.sdk.users.prepareuser(curShare.share.user, curShare.share.user.adr);
                            self.sdk.usersl.storage[newUser.address] = newUser;

                            // Prepare share
                            var newShare = new pShare();
                            newShare._import(curShare.share.share);
                            newShare.txid = txid;
                 
                            newShare.address = newUser.address;

                            if (curShare.share.timestamp)
                                newShare.downloadedDate = new Date(curShare.share.timestamp);


                            newShare.time = new Date();
                            newShare.time.setTime(curShare.share.share.time * 1000);

                            loadedShares.push(newShare);

                            if(!self.sdk.node.shares.storage.trx)
                                self.sdk.node.shares.storage.trx = {};

                            if(!self.sdk.node.shares.storage.trx[txid])
                                self.sdk.node.shares.storage.trx[txid] = newShare;

                        }
                    });

                    // Sort by download date

                    loadedShares = _.sortBy(loadedShares, function(s1){

                        if(!s1.downloadedDate){
                            return 1
                        }

                        return -s1.downloadedDate.getTime()
                    })


                    if (clbk) {
                        clbk(loadedShares, null, {
                            count: p.txids.length
                        });
                    }

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
                                    s.time.setTime(share.time * 1000);

                                    s.address = share.address
                                    s.edit = share.edit


                                    s.score = share.scoreSum;
                                    s.scnt = share.scoreCnt;

                                    storage.trx[s.txid] = s;

                                    if (state && temp['share'] && temp['share'][s.txid]) delete temp['share'][s.txid]

                                    self.sdk.node.shares.takeusers([share], state)

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

                                _.each(txids, function (id) {
                                    delete loading[id];
                                })

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


                        /*if (s.url){
                            s.url = s.url.replace('peertube://pocketnetpeertube8', 'peertube://pocketnetpeertube9')
                        }*/


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

                    self.sdk.node.shares.tempContentDelete(shares)

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

                recommended: function (p, clbk, cache, methodparams) {

                    if(!methodparams) methodparams = {}

                    if (!p) p = {};

                    console.log("P", p)

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

                            var period = p.period || self.sdk.node.shares.parameters.stor.period || self.sdk.node.shares.parameters.defaults.period || '4320' ///self.sdk.node.shares.parameters.defaults.period

                            var page = p.page || 0

                            var parameters = []

                            parameters = [p.count.toString(), period, (period * page) || '', self.app.localization.key]

                            //parameters = ['30', '259200', '', self.app.localization.key];

                            if (p.type){
                                parameters.push(p.type)
                            }

                            self.sdk.node.shares.get(parameters, function (shares, error) {

                                if (shares) {

                                    self.sdk.node.shares.loadvideoinfoifneed(shares, p.type == 'video', function(){

                                        if (state) {
                                            _.each(self.sdk.relayTransactions.withtemp('blocking'), function (block) {
                                                _.each(shares, function (s) {
                                                    if (s.address == block.address) s.blocking = true;
                                                })
                                            })
                                        }



                                        if(p.type == 'video'){
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

                            }, methodparams.method || 'gethotposts')


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

                                                    /// new
                                                    s.txidEdit = s.txid
                                                    s.txid = ps.txidEdit
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
                        console.error(e)
                        if(clbk) clbk()
                    })
                },

                getusercontents : function(p, clbk, cache){

                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method : 'getusercontents'
                    })

                },


                historical : function(p, clbk, cache){

                    self.app.platform.sdk.node.shares.hierarchical(p, clbk, cache, {
                        method : 'gethistoricalstrip'
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
                    p.type

                    */

                    self.app.user.isState(function (state) {

                        if (!p) p = {};

                        p.count || (p.count = 10)
                        p.lang || (p.lang = self.app.localization.key)
                        p.height || (p.height = 0)
                        p.tagsfilter || (p.tagsfilter = [])
                        p.tagsexcluded || (p.tagsexcluded = [])
                        p.begin || (p.begin = '')

                        if (state) {
                            p.address = self.sdk.address.pnet().address;
                        }

                        var key = (methodparams.method || 'gethierarchicalstrip') + p.count + (p.address || "") + "_" + (p.lang || "") + "_" + /*(p.height || "")  +*/ "_" + (p.tagsfilter.join(',')) + "_" + (p.begin || "") + (p.type ? p.type : '')

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

                            p.tagsexcluded = _.map(p.tagsexcluded, function(t){
                                return encodeURIComponent(t)
                            })

                            /////temp

                            

                            ////

                            var parameters = [Number(p.height), p.txid, p.count, p.lang, p.tagsfilter, p.type ? p.type : '', '', '', p.tagsexcluded];

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

                                            if(!storage[key]) storage[key] = []

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

                        if(!chunks.length) return

                        chunks = chunks[0]

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

                    console.log("tx", tx)

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

                    if(self.sdk.node.transactions.findInputInTemp(tx.txid, tx.vout)){
                        return 2
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

                findInputInTemp: function (txid, vout) {

                    return _.find(this.temp, function (ts) {

                        return _.find(ts, function(tx){
                            return _.find(tx.inputs, function(input){
                                return input.txid == txid && input.vout == vout
                            })
                        })

                    })

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

                    var c = self.sdk.node.transactions.checkTemp
                    var t = self.sdk.node.transactions.temp;

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

                    console.log('checktemp, ', alias)

                    if (alias && alias.txid) {

                        self.sdk.node.transactions.get.tx(alias.txid, function (d, _error) {

                            console.log(d)

                            if (clbk) {

                                var errorcode = deep(_error, 'code') || null

                                clbk(
                                    (errorcode == -5) || (errorcode == -8) ||
                                    (deep(d, 'height') > 0)
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

                            total = Number(total.toFixed(8))

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

                                var amount = Number(_.reduce(unspent, function (m, u) {
                                    return m + Number(u.amount)
                                }, 0).toFixed(8))

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

                                    _.each(d, function (u) {
                                        self.sdk.node.transactions.clearTemp(u.txid, u.vout);
                                    })

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

                                if(!d.confirmations) {
                                    if(d.height){
                                        if (self.currentBlock)
                                            d.confirmations = Math.max(self.currentBlock - d.height, 0)
                                    }
                                    else{
                                        d.confirmations = 0
                                    }
                                }

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

                    selectBestInputs : function(unspent){

                        var inputs = []

                        if (unspent.length) {

                            unspent = _.sortBy(unspent, function(u){
                                return -u.amount
                            })

                            var smallamount = _.filter(unspent, function(u){
                                return u.amount < 0.5
                            })

                            if (smallamount.length > 3){
                                unspent = _.shuffle(smallamount)
                            }

                            inputs = [{

                                txId: unspent[unspent.length - 1].txid,
                                vout: unspent[unspent.length - 1].vout,
                                amount: unspent[unspent.length - 1].amount,
                                scriptPubKey: unspent[unspent.length - 1].scriptPubKey,

                            }]

                            if (unspent.length > 60) {

                                inputs.push({
                                    txId: unspent[unspent.length - 2].txid,
                                    vout: unspent[unspent.length - 2].vout,
                                    amount: unspent[unspent.length - 2].amount,
                                    scriptPubKey: unspent[unspent.length - 2].scriptPubKey,
                                })

                            }
                        }

                        return inputs
                    },

                    commonFromUnspent: function (obj, clbk, p, telegram) {

                        if (!p) p = {};

                        if (self.sdk.address.pnet() && !obj.fromrelay) {

                            var addr = self.sdk.address.pnet().address

                            var regs = app.platform.sdk.registrations.storage[addr];

                            if (regs && (regs == 3 || regs == 4)) {

                                p.relay = addr;

                            }

                        }


                        if (obj.checkloaded && obj.checkloaded()){
                            if (clbk) {
                                clbk(null, 'resourses')
                            }

                            return;
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

                            if(!(obj.donate && obj.donate.v.length) && obj.type !== 'contentBoost'){
                                inputs = self.sdk.node.transactions.create.selectBestInputs(unspent)
                            }

                            var totalInputs = _.reduce(inputs, function(m, i){
                                return m + i.amount
                            }, 0)

                            var feerate = TXFEE;

                            if (obj.donate && obj.donate.v.length){

                                feerate = 0.00001;

                                var totalDonate = 0;

                                obj.donate.v.forEach(function(d){

                                    totalDonate += Number(d.amount);

                                })

                                var lastUnspent = _.clone(unspent).reverse();

                                for (var u of lastUnspent){

                                    if (totalDonate + feerate >= totalInputs){

                                        totalInputs += u.amount;

                                        inputs.push({
                                            txId: u.txid,
                                            vout: u.vout,
                                            amount: u.amount,
                                            scriptPubKey: u.scriptPubKey,
                                        })

                                    } else {

                                        break;
                                    }

                                }

                                if (totalDonate >= totalInputs){

                                    sitemessage(self.app.localization.e('e13117'))

                                    if (clbk){
                                        clbk(null, self.app.localization.e('e13117'));
                                    }

                                    return;

                                }

                                feerate = Number((feerate * smulti).toFixed(0));
                            }

                            if (obj.type === 'contentBoost' && obj.amount.v){

                                feerate = 0;

                                var lastUnspent = _.clone(unspent).reverse();

                                for (var u of lastUnspent){

                                    if (obj.amount.v >= totalInputs){

                                        totalInputs += u.amount;

                                        inputs.push({
                                            txId: u.txid,
                                            vout: u.vout,
                                            amount: u.amount,
                                            scriptPubKey: u.scriptPubKey,
                                        })

                                    } else {

                                        break;
                                    }

                                }  

                                if (obj.amount.v > totalInputs){

                                    sitemessage(self.app.localization.e('e13117'))

                                    if (clbk){
                                        clbk(null, self.app.localization.e('e13117'));
                                    }

                                    return;

                                }
                            }

                            self.sdk.node.transactions.create[obj.type](inputs, obj, /*feerate,*/ function (a, er, data) {

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


                                    app.platform.matrixchat.update()

                                    var cm = deep(app, 'modules.menu.module.restart')
                                    if (cm) cm()
                                }

                                if (clbk) {
                                    clbk(a, er, data)
                                }


                            }, p, telegram)

                        }, deep(p, 'address.address'), p.update)
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

                            if (i.address.indexOf("T") == 0 || i.address.indexOf("P") == 0) {
                                txb.sign(inputindex, keyPair);
                                return
                            }

                            if (i.address.indexOf("Z") == 0 || i.address.indexOf("Y") == 0) {

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

                    common: function (inputs, obj, fees, clbk, p) {

                        if (!p) p = {};

                        var temp = self.sdk.node.transactions.temp;
                        var tempOptions = self.sdk.node.transactions.tempOptions;

                        var error = obj.validation();

                        var addr = self.app.platform.sdk.address.pnet()


                        if (addr && self.nvadr[addr.address]){
                            error = null
                        }

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

                            if (obj.type !== 'contentBoost'){


                                outputs.push({
                                    amount : 0,
                                    deleted : true,
                                    address : address.address
                                })
    
                                
                            }

                            txb.addOutput(embed.output, 0);

                            if(self.sdk.user.reputationBlockedMe()){

                                if (clbk) {
                                    clbk(null, 313, {})
                                }

                                return
                            }

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


                                if (
                                    !(obj.donate && obj.donate.v.length) &&


                                    unspents.length < 50 && amount > 0.2 * smulti && obj.type !== 'contentBoost') {

                                    var ds = Number((amount / 2).toFixed(0))

                                    amount = amount - ds


                                    txb.addOutput(address.address, ds);

                                    outputs.push({
                                        address: address.address,
                                        amount: ds
                                    })

                                }


                                ///// add donations


                                totalDonate = 0;

                                if (obj.donate && obj.donate.v.length){

                                    obj.donate.v.forEach(function(d){
                                        var donate = Number(d.amount) * smulti;

                                        totalDonate += donate

                                        txb.addOutput(d.address, donate);
                                        outputs.push({
                                            address: d.address,
                                            amount: donate
                                        });

                                    })
                                }

                                var totalReturn = Number((amount - totalDonate - (fees || 0)).toFixed(0));


                                if (obj.type === 'contentBoost'){

                                    var amountMulti = obj.amount.v * smulti;;
                                    totalReturn -= amountMulti;

                                }

                                if (obj.donate && obj.donate.v.length && (totalReturn < 0 || totalDonate <= fees)){

                                    if (clbk){
                                        clbk(null, 'tosmallamount')
                                    }

                                    return;

                                } else {

                                    txb.addOutput(address.address, totalReturn);
                                    outputs.push({
                                        address: address.address,
                                        amount: totalReturn
                                    })

                                    _.each(inputs, function (input, index) {
                                        txb.sign(index, keyPair);
                                    })

                                    var tx = txb.build()

                                    if (obj.donate && obj.donate.v.length && !obj.fees.v){

                                        var totalFees = Math.min(tx.virtualSize() * fees / smulti, 0.0999);

                                        obj.fees.set(totalFees);

                                        self.sdk.node.transactions.create.common(inputs, obj, totalFees * smulti, clbk, p);

                                    } else {

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


                                                    console.log('outputs', outputs)

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
                                                            txid: i.txId || i.txid,
                                                            vout: i.vout
                                                        }

                                                    })

                                                    self.app.platform.sdk.node.transactions.clearUnspents(ids)

                                                    if (obj.ustate) {

                                                        var ustate = obj.ustate;

                                                        if (typeof obj.ustate == 'function') ustate = obj.ustate();

                                                        if (ustate) {
                                                            var us = self.sdk.ustate.storage;

                                                            if (us[address.address] && !_.isEmpty(us[address.address])) {
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

                                                console.error(e)

                                                if (clbk) {
                                                    clbk(null, e.code, data)
                                                }
                                            })
                                        }
                                    }
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

                            const allowedTags = ['b', 'strong', 'i', 'em', 'u', 'ins', 's', 'strike', 'del', 'code', 'pre'];


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
                            chat_id: channel,
                            parse_mode: 'HTML'
                        }

                        const title = message.caption.v ? '<b>' + message.caption.v + '</b>' : '';

                        let caption = title + '\n ' + message.message.v + '\n ';

                        const images = message.images.v;

                        caption = caption.replace(/<br>|<br\/>/g, '\n');
                        caption = caption.replace(/<\/p>/g, "</p>\n");
                        caption = filterHtml(caption);

                        if (message.url.v && caption.indexOf(message.url.v) === -1){
                            caption += '\n\n' + message.url.v;
                        }

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
                        // const paramStr = $.param(parameters);


                        fetch(query, {
                            method: 'POST',
                            mode: 'cors',
                            cache: 'no-cache',
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            referrerPolicy: 'no-referrer',
                            body: JSON.stringify(parameters)
                        })
                        .then(function(data){
                            return data.json();
                        })
                        .then(function(result){

                            if (!result.ok){

                                sitemessage('Telegram error. ' + result.description)
                            }

                        })
                        .catch(err => sitemessage('Telegram error'))




                    },

                    share: function (inputs, share, /*fees, */clbk, p, fromTG) {

                        var meta = self.sdk.usersettings.meta;

                        var savedShare = JSON.parse(JSON.stringify(share));

                        if (self.app.user.features.telegram && !fromTG && meta.telegram && meta.telegram.value && meta.tgto && meta.tgto.value) {

                          if (!meta.tgtoask.value) {

                            this.telegramSend(share, meta);

                          } else {
                            // this.telegramSend = this.telegramSend.bind(this)
                            dialog({
                              html: "Do you really want send message to Telegram?",
                              btn1text: "Send",
                              btn2text: "Cancel",
                              class: 'zindex',
                              success: () => {
                                this.telegramSend(savedShare, meta);
                              }
                            });
                          }
                        }

                        this.common(inputs, share, TXFEE, clbk, p)
                    },


                    accSet: function (inputs, settings, clbk, p) {
                        this.common(inputs, settings, TXFEE, clbk, p)
                    },

                    userInfo: function (inputs, userInfo, clbk, p) {
                        this.common(inputs, userInfo, TXFEE, clbk, p)
                    },

                    contentDelete: function (inputs, remove, clbk, p) {
                        this.common(inputs, remove, TXFEE, clbk, p)
                    },

                    upvoteShare: function (inputs, upvoteShare, clbk, p) {
                        this.common(inputs, upvoteShare, TXFEE, clbk, p)

                        self.sdk.activity.adduser('like', upvoteShare.address.v)
                    },

                    complainShare: function (inputs, complainShare, clbk, p) {
                        this.common(inputs, complainShare, TXFEE, clbk, p)
                    },

                    comment: function (inputs, comment, /*fees, */clbk, p) {
                        this.common(inputs, comment, TXFEE, clbk, p)
                    },

                    commentShare: function (inputs, commentShare, clbk, p) {
                        this.common(inputs, commentShare, TXFEE, clbk, p)

                    },

                    contentBoost: function (inputs, comment, /*fees, */clbk, p) {
                        this.common(inputs, comment, 0, clbk, p)
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
                            clbk(self.app.localization.e('e13293')+' /ul100')

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
                self.sdk.users.get(pack.addresses, clbk, true)
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

                if (_.indexOf(pack.addresses, address) > -1){
                    if (clbk)
                        clbk(null, 'hasinthispack')

                    return;
                }

                if (pool.map[address]) {

                    var id = pool.map[address];
                    var _pack = pool.packs[id];

                    if (_pack.addresses.length > 1/* || _pack.addresses[0] == address*/) {
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

                    var meta = self.sdk.usersettings.meta;

                    var tgToken = meta.telegram && meta.telegram.value;

                    messages.forEach(messager => {

                        const addValue = (dropdownName, channelName, channelId) => {

                            if (meta[dropdownName].possibleValues.indexOf(String(channelId)) === -1) {

                                meta[dropdownName].possibleValues.push(String(channelId));
                                meta[dropdownName].possibleValuesLabels.push(channelName);

                                if (!meta[dropdownName][tgToken] || !meta[dropdownName][tgToken].possibleValues){

                                    meta[dropdownName][tgToken] = {};
                                    meta[dropdownName][tgToken].possibleValues = [String(channelId)];
                                    meta[dropdownName][tgToken].possibleValuesLabels = [channelName];

                                } else {

                                    meta[dropdownName][tgToken].possibleValues.push(String(channelId));
                                    meta[dropdownName][tgToken].possibleValuesLabels.push(String(channelName));

                                }

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

                                            return `<a elementsid='${ent.url}' href='${ent.url}' target='_blank' rel='noopener noreferrer'>${snippet}</a>`

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


                    const current = document.querySelector("div[parameter='telegram'].iWrapper");

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
            historykey : 'videohistory_v1_',
            historyget : function(txid){

                var h = {
                    time : 0,
                    date : null,
                    percent : 0
                }

                try{
                    var jsn = JSON.parse(localStorage[self.sdk.videos.historykey + txid] || "{}")

                    if(jsn.time) h.time = jsn.time
                    if(jsn.date) h.date = jsn.date
                    if(jsn.percent) h.percent = Number(jsn.percent)

                }
                catch(e){}

                return h
            },
            historyset : function(txid, data){

                if(!data) data = {}

                data.time || (data.time = 0)

                var lasthistory = self.sdk.videos.historyget(txid)


                lasthistory.time = data.time
                lasthistory.date = new Date()
                lasthistory.percent = data.percent

                try{
                    localStorage[self.sdk.videos.historykey + txid] = JSON.stringify(lasthistory)
                }catch(e){}
            },

            infoshares : function(shares){


                var links = _.filter(_.map(shares, function(s){
                    return s ? s.url : null
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

                if(!url){
                    middle(clbk)
                    return
                }

                return self.sdk.videos.info([url]).catch((e)=>{
                    return Promise.resolve()
                }).then(() => {

                    middle(function(p){

                        if(self.sdk.videos.storage[url] && self.sdk.videos.storage[url].data){
                            var info = self.sdk.videos.storage[url].data;

                            var loadingPlayer = elf ? elf() : p.el.find('.jsPlayerLoading-matte');

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
                            thumbnail : 'https://' + linkInfo.from + linkInfo.thumbnailPath,
                            views : linkInfo.views,
                            duration : linkInfo.duration,
                            aspectRatio : linkInfo.aspectRatio || 1,
                            isLive : linkInfo.isLive,

                            original : linkInfo
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
                                timeout : 5000,
                                success : function(response){

                                    if (response.data.video && response.data.video.as) {

                                        return resolve(response.data.video)

                                    } else {
                                        reject()
                                    }

                                },
                                error : function(){
                                    reject()
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

            volume : 0,
            save : function(){
                localStorage['pn_videovolume_2'] = self.sdk.videos.volume || 1
            },
            load : function(){

                var _v = localStorage['pn_videovolume_2']

                if(typeof _v == 'undefined') {
                    if(self.app.mobileview)
                        _v = '0'
                    else
                        _v = '1'
                }


                self.sdk.videos.volume = Number(_v)

            },

            init : function(clbk){
                self.sdk.videos.load()

                if(clbk) clbk()
            }
        }
    }


    var FakeFirebasePlugin = function(){
        var self = this;

        self.unregister = function(){}
        self.hasPermission = function(c){c(true)}
        self.grantPermission = function(c){c(true)}
        self.onMessageReceived = function(){}
        self.getToken = function(c){
            c('ba36b658-f9b7-8850-edc1-e53dcc2ebaf7')
        }

        return self
    }

    self.Firebase = function (platform) {

        var self = this;

        //var FirebasePlugin = new FakeFirebasePlugin()

        var using = typeof window != 'undefined' && window.cordova && typeof FirebasePlugin != 'undefined';

        var currenttoken = null;

        var appid = deep(window, 'BuildInfo.packageName') || window.location.hostname || window.pocketnetdomain
        if (appid == 'localhost') appid = 'pocketnet.app' /// url

        var device = function () {
            var id = platform.app.options.device

            return id;
        }

        var getaddress = function(){
            if (platform.sdk.address.pnet())
                return platform.sdk.address.pnet().address

            return null
        }


        self.storage = {
            data : {},
            key : 'firebasetokens_v1',
            clear : function(){
                self.storage.data = {}
                this.save()
            },
            load: function () {
                var storage = {};

                var local = localStorage[self.storage.key] || "{}";

                if (local) {
                    try {
                        storage = JSON.parse(local)
                    }
                    catch (e) {
                    }
                }

                self.storage.data = storage;
            },
            save: function () {
                localStorage[self.storage.key] = JSON.stringify(self.storage.data);
            },

            get : function(proxy, address, token){

                return deep(self.storage.data, appid + '.' + token + '.' + address + '.' + proxy)
            },

            set : function(proxy, address, token){
                if(!self.storage.data[appid]) self.storage.data[appid] = {}
                if(!self.storage.data[appid][token]) self.storage.data[appid][token] = {}
                if(!self.storage.data[appid][token][address]) self.storage.data[appid][token][address] = {}

                self.storage.data[appid][token][address][proxy] = true

                this.save()
            }

        }

        self.api = {
            revoke: function (token, proxy) {

                var address = getaddress()

                if(!address) return Promise.reject()

            },

            revokeDevice: function (proxy) {

                return self.app.api.fetchauth('firebase/revokedevice', {
                    device : device()
                }, {
                    proxy : proxy
                })

            },

            setToken: function (address, token, proxy) {

                if(!address) return Promise.reject('address')

                if(!proxy) return Promise.reject('proxy')

                //var exist = self.storage.get(proxy, address, token)

                return self.request.setToken(token, proxy).then(r => {

                    self.storage.set(proxy, address, token)

                    return Promise.resolve()

                })

            },

            existanother : function(proxy, address){
                var obj = self.storage.data[appid] || {}

                var nf = function(obj, ii){
                    return _.find(obj || {}, function(v, i){
                        return i != ii
                    })
                }

                obj = nf(obj, proxy)

                if(obj) return true

                obj = nf(obj, address)

                if(obj) return true

                return false
            },

            exist : function(proxy, address, token){
                var exist = self.storage.get(proxy, address, token)

                if (exist){
                    return Promise.resolve(true)
                }

                return self.request.mytokens(proxy).then(r => {

                    var exist = _.find(r.tokens, function(t){
                        return t.token == token && t.id == appid
                    })

                    if (exist){
                        return Promise.resolve(exist)
                    }

                    return Promise.resolve(false)
                })
            },

            checkProxy : function(proxy){
                return self.request.info(proxy).then(r => {

                    var apps = (r.id || "").split(',')

                    if (apps.indexOf(appid) == -1){
                        return Promise.reject('proxyfirebaseid')
                    }


                })
            }
        }

        self.revokeall = function(){
            FirebasePlugin.unregister();

            self.storage.clear();

            return self.request.revokeall()
        }

        self.set = function(proxy){

            if(!currenttoken) return Promise.reject('emptytoken')

            var address = getaddress()
            var token = currenttoken


            return self.api.checkProxy(proxy).then(r => {
                return  self.api.exist(proxy, address, token)
            }).then(exist => {

                if(exist) return Promise.resolve()

                if(self.api.existanother(proxy, address)) return self.request.revokeall()

            }).then(r => {
                return self.api.setToken(address, token, proxy)
            }).catch(e => {
                return Promise.resolve()
            })

        }

        self.request = {

            revokeall : function(){

                return platform.app.api.fetchauthall('firebase/revokedevice', {
                    device : device()
                })

            },

            info : function(proxy){
                return platform.app.api.fetchauth('firebase/info', {}, {
                    proxy : proxy
                })
            },

            mytokens : function(proxy){
                return platform.app.api.fetchauth('firebase/mytokens', {}, {
                    proxy : proxy
                })
            },

            revoke: function (token, proxy) {

                return platform.app.api.fetchauth('firebase/revoke', {
                    token
                }, {
                    proxy : proxy
                })

            },

            revokeDevice: function (proxy) {

                return platform.app.api.fetchauth('firebase/revokedevice', {
                    device : device()
                }, {
                    proxy : proxy
                })


            },

            setToken: function (token, proxy) {


                return platform.app.api.fetchauth('firebase/set', {
                    device : device(),
                    token : token,
                    id : appid
                }, {
                    proxy : proxy
                })

            }
        }


        self.get = function (clbk) {

            if (!using) {
            }
            else {

                FirebasePlugin.getToken(function(token) {

                    currenttoken = token
                    platform.fcmtoken = token

                    platform.matrixchat.changeFcm()

                    self.events()

                    if (clbk)
                        clbk(currenttoken)

                }, function(error) {
                    console.error(error, 'fcmToken not set on server');

                    if (clbk)
                        clbk()
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

                if (data.data)
                    platform.ws.messageHandler(data.data)


                if (data.room_id) {

                    if(data.tap){
                         // Wait until we can navigate Matrix
                        retry(function(){

                            return platform && platform.matrixchat && platform.matrixchat.core;

                        }, function(){

                            setTimeout(function(){

                                platform.matrixchat.core.goto(data.room_id);

                                if (platform.matrixchat.core.apptochat)
                                    platform.matrixchat.core.apptochat();

                            }, 50)



                        });
                    }



                    return;
                }

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


            });


            // When token is refreshed, update the matrix element for the Vue app
            FirebasePlugin.onTokenRefresh(function(token) {

                platform.fcmtoken = token
                currenttoken = token
                platform.matrixchat.changeFcm()

                //prepareclbk(token)

            }, function(error) {
                console.error(error);
            });

        }

        var prepareclbk = function(token){

            if (token){

                var proxy = platform.app.api.get.current()

                if (proxy){
                    self.set(proxy.id).catch(e => {
                        console.log("error", e)
                    })
                }

            }

        }

        self.init = function(clbk){

            self.prepare(function(token){

                prepareclbk(token)

            })

            if(clbk) clbk()
        }

        self.prepare = function(clbk){

            self.storage.load()

			if (using) {

				self.permissions(clbk)
			}
            else{
                if (clbk)
				    clbk()
            }

		}

        self.destroy = function (clbk) {

            currenttoken = null

            if (using){
                self.revokeall().then(clbk).catch(e => {})

                return
            }



            if (clbk)
                clbk()

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
        var slowMadeRelayTransactions = null

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

                var m = share.caption;

                if(!m) m = share.renders.text()

                var symbols = extendedpreview ? 180 : 20;

                var nm = trimHtml(m, symbols)

                var links = _.isObject(share.message) ? [] : linkify.find(share.message);

                var images = _.map(share.images, function (i) {
                    return {
                        i: i,
                        v: false
                    }
                });

                var meta = parseVideo(share.url || "")

                if(app.curation()) return ''

                h = '<div class="sharepreview"><div class="shareprwrapper table">'

                if (images.length && !extendedpreview) {

                    var img = images[0]

                    h += '<div class="tcell forimage">'
                    h += '<div class="img" image="' + img.i + '">'

                    if (img.v) {
                        h += '<div class="vstyle">'
                        h += '<i class="fas fa-play"></i>'
                        h += '</div>'
                    }

                    h += '</div>'
                    h += '</div>'

                }

                h += '<div class="tcell fortext">'

                if(nm.length > 2){
                    h += '<div><span>' + nm + '</span></div>'
                }


                if (images.length && extendedpreview) {


                    h += '<div class="shareimages commentprev">'
                    h += '<div class="imagesContainer">'
                        _.each(images, function (image) {

                            h += '<div class="imagesWrapper">'
                            h += '<div class="image" image="' + image.i + '" i="' + image.i + '">'

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

                if (images.length || links.length || share.tags.length || meta.type) {

                    h += '<div class="additionalcontent">'

                        if (!meta.type){
                            if (images.length) {
                                h +=  flb(self.app.localization.e('timages')) + ' ('+images.length+') '
                            }

                            if (links.length) {
                                h +=  flb(self.app.localization.e('tlinks')) + ' ('+links.length+') '
                            }

                            if (share.tags.length) {
                                h +=  flb(self.app.localization.e('e13280')) + ' ('+share.tags.length+') '
                            }
                        }

                        else
                        {
                            h += '<b>' + flb(self.app.localization.e('video')) + '</b> <i class="fas fa-play"></i> '
                        }

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

                h += "+" + platform.mp.coin(clearStringXss(data.amountall || data.tx.amount));

                
                    h+= " PKOIN"


                h += '</div>'

                h += '</div>'

                h += '</div>'

                return h;
            },

            comment: function (comment, share) {
                var t = comment.renders.previewEmojidis();


                var h = '<div class="commentmessage">'

                h += '<div class="commentmessagewrapper table">'

                h += '<div class="tcell fortext">'


                if (t) {
                    h += '<div class="commenttext commentprev"><span>'
                    h += t
                    h += '</span></div>'
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


                h += '</div>'

                h += '</div>'

                h += '</div>'

                return h;
            },

            commentScore: function (comment, thumbs) {

                var t = comment.renders.previewEmojidis();

                var h = '<div class="commentmessage">'

                h += '<div class="commentmessagewrapper table">'

                h += '<div class="tcell fortext">'

                if (t) {
                    h += '<div class="commenttext commentprev"><span>'
                    h += t
                    h += '</span></div>'
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

            user: function (author, html, gotoprofile, caption, extra, time, donation) {

                if (!author || !author.name) {
                    return html
                }

                var h = '';

                var src = deep(author, 'image');
                var name = deep(author, 'name');
                var letter = name ? name[0] : '';

                var link = '<a elementsid="' + encodeURI(clearStringXss(author.name.toLowerCase())) + '" href="' + encodeURI(clearStringXss(author.name.toLowerCase())) + '">'
                var clink = "</a>"

                /*if (app.curation()) {
                    link = ''
                    clink = ''
                    gotoprofile = false
                }*/


                h += '<div class="cwrapper table">\
                    <div class="cell cellforimage">\
                        <div class="icon">'

                if (gotoprofile) h += link

                h += '<div class="usericon" ban=".gif" image="' + (clearStringXss(src || '') || '*') + '">'

                if (!src && letter){

                    h += '<span class="letter">' + letter.toUpperCase() + '</span>';
                }


                if(self.app.platform.ui.markUser){

                    h += self.app.platform.ui.markUser(author.address);

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

                    if (donation){

                        h += " " + caption;

                    } else {

                        h += " " + clearStringXss(caption)

                    }
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

                var me = deep(app, 'platform.sdk.users.storage.' + platform.sdk.address.pnet().address) || deep(app, 'platform.sdk.usersl.storage.' + platform.sdk.address.pnet().address)

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
                electronSettings : {
                    size : 'medium'
                },
                fastMessageEvents: function (data, message) {

                    message.el.find('.commentprev').on('click', function () {

                        platform.app.nav.api.load({
                            open: true,
                            href: 'post?s=' + data.comment.txid,
                            inWnd: true,
                            history: true,
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

                },

                loadMore: function (data, clbk, wa) {

                    platform.sdk.users.get([data.addrFrom], function () {


                        data.user = platform.sdk.users.storage[data.addrFrom] || platform.sdk.usersl.storage[data.addrFrom] || {}

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

                    }, true)

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

                        data.user = platform.sdk.users.storage[data.addrFrom] ||platform.sdk.usersl.storage[data.addrFrom] || {}

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

                    }, true)

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


                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.txid,
                                inWnd: true,
                                history: true,
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.txid
                                }
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

                            data.user = platform.sdk.users.storage[data.addrFrom] || platform.sdk.usersl.storage[data.addrFrom] || {}

                            data.user.address = data.addrFrom

                            if (data.txids && !data.txid) data.txid = data.txids

                            platform.sdk.node.shares.getbyid(data.txid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()
                            })

                        }, true)

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


                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.txid,
                                inWnd: true,
                                history: true,
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.txid
                                }
                            })


                    })

                },

                clbks: {
                }
            },

            sharepocketnet: {
                loadMore: function (data, clbk, wa) {

                    data.addrFrom || (data.addrFrom = window.testpocketnet ? 'TAqR1ncH95eq9XKSDRR18DtpXqktxh74UU' : 'PEj7QNjKdDPqE9kMDRboKoCtp8V6vZeZPd')

                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.sdk.users.storage[data.addrFrom] || platform.sdk.usersl.storage[data.addrFrom] || {}

                            data.user.address = data.addrFrom

                            if (data.txids && !data.txid) data.txid = data.txids

                            platform.sdk.node.shares.getbyid(data.txid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()
                            })

                        }, true)

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
                            html += self.tempates.user(data.user, text, true, " " + self.app.localization.e('e13332'), null, data.time)
                        }
                    }

                    return html;

                },

                fastMessageEvents: function (data, message) {

                    message.el.find('.sharepreview').on('click', function () {


                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.txid,
                                inWnd: true,
                                history: true,
                                clbk: function (d, p) {
                                    app.nav.wnds['post'] = p
                                },

                                essenseData: {
                                    share: data.txid
                                }
                            })


                    })

                },

                clbks: {
                }
            },

            "transaction": {
                electronSettings : {
                    size : 'small'
                },
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

                        console.log('outs', outs, address, tx)

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

                        var addr = platform.sdk.address.pnet().address

                        if (platform.sdk.address.pnet()) {

                            var regs = platform.sdk.registrations.storage[addr];

                            if (regs && regs == 3) {

                                platform.sdk.registrations.add(addr, 4)

                                platform.sdk.relayTransactions.send()

                            }

                        }

                        //////////////////////

                        data.tx = platform.sdk.node.transactions.toUT(tx, data.addr, data.nout)

                        data.amountall = _.reduce(outs, function (m, v) {

                            var forme = deep(v, 'scriptPubKey.addresses.0') == addr

                            return m + forme ? v.value : 0
                        }, 0)

                        data.address = deep(data.txinfo, 'vin.0.address') || platform.sdk.node.transactions.addressFromScryptSig(deep(data.txinfo, 'vin.0.scriptSig.asm'))

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

                                    platform.sdk.users.storage[platform.sdk.address.pnet().address] || platform.sdk.usersl.storage[platform.sdk.address.pnet().address],

                                    self.tempates.transaction(data,

                                        '<div class="text">' +
                                        platform.app.localization.e(td, platform.mp.coin(clearStringXss(data.amountall || data.tx.amount))) +
                                        '</div>'

                                    ),

                                    false,
                                    platform.app.localization.e('transactionCome'),
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


                    ////////////////

                    if(app.platform.sdk.address.pnet()){
                        var addr = app.platform.sdk.address.pnet().address

                        var regs = app.platform.sdk.registrations.storage[addr];

                        if (regs == 5) {

                            app.platform.sdk.registrations.add(addr, 6)

                            platform.matrixchat.update()
                        }
                    }

                    ////////


                    slowMadeRelayTransactions = slowMade(function(){

                        platform.sdk.relayTransactions.send()
                    }, slowMadeRelayTransactions, 10000)

                    clbk()

                    setTimeout(function(){
                        platform.matrixchat.init()
                    }, 100)
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
                electronSettings : {
                    size : 'medium'
                },
                fastMessageEvents: function (data, message) {

                    message.el.find('.commentprev').on('click', function () {


                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.posttxid,
                                inWnd: true,
                                history: true,
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

                    message.el.find('.reply').on('click', function () {

                        platform.sdk.node.shares.getbyid(data.posttxid, function (s, fromcashe) {

                            platform.app.nav.api.load({
                                open: true,
                                href: 'post?s=' + data.posttxid,
                                inWnd: true,
                                history: true,
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

                       /* if (pid)

                            platform.sdk.node.shares.getbyid(pid, function (s, fromcashe) {

                                s || (s = []);

                                if (s[0]) {
                                    data.share = s[0];
                                }

                                clbk()

                            })

                        else*/

                            clbk()
                    }

                    platform.sdk.users.get([data.addrFrom], function () {

                        data.user = platform.sdk.users.storage[data.addrFrom] || platform.sdk.usersl.storage[data.addrFrom] || {}
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


                    }, true)
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

                    if (data.reason == 'post' && data.comment && data.user &&
                        (!platform.sdk.usersettings.meta.comments || platform.sdk.usersettings.meta.comments.value)) {

                        text = self.tempates.comment(data.comment)

                        var toptext = self.app.localization.e('e13337');

                        if (data.donation && data.amount){

                            var amount = String(Number(data.amount) / smulti || 0);
                            toptext = '<span>' + self.app.localization.e('donated') + '</span>' + ' <span class="donate"> +' + amount + ' PKOIN </span>';
                        }

                        if (text) {
                            var toptext =  self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + toptext, extra, data.time, data.donation);

                            html += toptext
                        }

                    }

                    if (data.reason == 'answer' && data.comment && data.user &&
                        (!platform.sdk.usersettings.meta.answers || platform.sdk.usersettings.meta.answers.value)) {

                        text = self.tempates.comment(data.comment)

                        if (text) {

                            var toptext = self.app.localization.e('e13338')

                            html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + toptext, extra, data.time)
                        }
                    }

                    if (data.reason == 'system') {

                        // text = self.tempates.comment(data.comment/*, self.tempates.share(data.share)*/)

                        // if (text) {

                        //     var toptext = self.app.localization.e('e13337')

                        //     html += self.tempates.user(data.user, '<div class="text">' + text + '</div>', true, ' ' + toptext, extra, data.time)
                        // }

                        html += `<div><b>System notification</b></div><div class="text">${data.text}</div>`;
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
                electronSettings : {
                    size : 'small'
                },
                loadMore: function (data, clbk, wa) {


                    if (data.addrFrom) {

                        platform.sdk.users.get([data.addrFrom], function () {

                            data.user = platform.sdk.users.storage[data.addrFrom] || platform.sdk.usersl.storage[data.addrFrom] || {}

                            data.user.address = data.addrFrom

                            if (data.mesType == 'userInfo' && !wa) {
                                var me = platform.sdk.users.storage[platform.sdk.address.pnet().address];

                                if (me) {

                                    delete me.temp
                                    delete me.relay


                                    var cm = deep(app, 'modules.menu.module.restart')

                                    if (cm) cm()

                                    var c = deep(app, 'nav.clbks.history.navigation')

                                    if (c) c()




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
                                    if(!data.electronSettings) data.electronSettings = {}
                                    data.electronSettings.size = 'medium'

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


                        }, true)

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


                                platform.app.nav.api.load({
                                    open: true,
                                    href: 'post?s=' + data.posttxid,
                                    inWnd: true,
                                    history: true,
                                    clbk: function (d, p) {
                                        app.nav.wnds['post'] = p
                                    },

                                    essenseData: {
                                        share: data.posttxid
                                    }
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


                    if (data.mesType == 'subscribe' || data.mesType == 'subscribePrivate') {
                        if ((!platform.sdk.usersettings.meta.followers || platform.sdk.usersettings.meta.followers.value)) {

                            text = ''
                            caption = platform.app.localization.e('subscribeUserMessage')
                            extra = self.tempates.subscribe(data.user)

                        }
                    }


                    if (data.mesType == 'upvoteShare' && data.share) {

                        var tkey = 'upvoteShareMessage'

                        if (

                            (data.upvoteVal <= 2 && platform.sdk.usersettings.meta.downvotes.value) ||

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

                            data.user = platform.sdk.users.storage[data.address] || platform.sdk.usersl.storage[data.address]

                            if (data.user) {
                                data.user.address = data.address

                                clbk()
                            }
                        }, true)

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

                console.log('wss', wss)

                socket = wss.dummy || (new ReconnectingWebSocket(wss.url));


                socket.onmessage = function (message) {

                    message = message.data ? message.data : message;

                    var jm = message;

                    try { jm = JSON.parse(message || "{}"); } catch (e) {
                        console.log("E", e)
                    }


                    if (jm){


                        if (jm.type == 'proxy-message-tick'){

                            return wss.proxy.system.tick(jm.data)
                            
                        }

                        if (jm.type == 'changenode'){

                            var temp = platform.sdk.node.transactions.temp

                            var t = [];

                            _.each(temp, function(trx, s){
                                _.each(trx, function(tr){
                                    t.push(tr)
                                })
                            })

                            /*if(!temp.length)
                                wss.proxy.changeNode(jm.data.node)*/

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

        var hideallnotifications = function(){
            self.destroyMessages()

        }

        var hideallnotificationselement = function(show){
            if(self.hideallnotificationsel){

                if(show){
                    self.hideallnotificationsel.html('<div class="hidenf">'+platform.app.localization.e('hideallnotifications')+'</div>')
                    self.hideallnotificationsel.find('div').on('click', hideallnotifications)

                }
                else{
                    self.hideallnotificationsel.html('')
                }

            }
        }

        var arrangeMessages = function(){


			var offset = 0;

			var maxCount = 4;
            var showremove = 2;

			var boffset = 0;

            var mtbl = platform.app.mobileview

			if (mtbl){
				maxCount = 1;
                showremove = 0;
			}

			var remove = self.fastMessages.length - maxCount;

			var s = false;

			if(self.fastMessages.length >= maxCount){
				_.each(self.fastMessages, function(m, i){

					if(!mtbl && !m.expanded && !m.el.hasClass('smallsize')){

						m.el.addClass('smallsize');

						s = true
					}

				})
			}

			setTimeout(function(){

                if (showremove && self.fastMessages.length >= showremove){
                    boffset = 50

                    hideallnotificationselement(true)
                }
                else{
                    hideallnotificationselement(false)
                }

                offset = offset + boffset


				_.each(self.fastMessages, function(m, i){

					if(i < remove){
						destroyMessage(m, 1, true)
					}

					else
					{
						if(!mtbl){
							offset += 5;
						}

						if(!mtbl)

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
                destroyMessage(message, 1, true)
            })

            setTimeout(function(){
                arrangeMessages()
            }, 301)
        }

        self.fastMessage = function (html, destroyclbk) {
            var id = makeid(true);

            html = '<div class="fastMessage" elementsid="notificationmessage" id="' + id + '">\
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

            message.el.on('click', function(){

                if (platform.app.mobileview){

                    platform.app.nav.api.go({
                        open : true,
                        href : 'notifications',
                        inWnd : true,
                        history : true,
                        essenseData : {
                        }
                    })

                }
                else{
                    if(!message.expanded){

                        message.el.removeClass('smallsize');

                        message.expanded = true

                        arrangeMessages();

                        setTimeout(function(){
                            arrangeMessages();
                        }, 300)
                    }
                }



			})

            message.el.on('mouseenter', function () {
                clearTimeout(message.timeout);
            })

            message.el.on('mouseleave', function () {
                destroyMessage(message, 5000, false, true);
            })

            message.el.find('.close').on('click', function (e) {
                destroyMessage(message, 1, false, true);
                e.preventDefault()
                return false
            })

            if (isTablet()) {
                var parallax = new SwipeParallaxNew({
                    //prop : 'position',
                    el: message.el,
                    directions: {
                        up : {
                            trueshold: 10,
                            positionclbk: function (px) {

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
                if(!data.electronSettings) data.electronSettings = {}

                if (!m) m = {}


                if (m.checkHandler) {
                    if (!m.checkHandler(data, m)) {
                        return
                    }
                }

                if (data.txid) {

                    if (txidstorage[data.txid] || (data.msg === 'transaction' && data.donation)) return;

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
                        if (audio && !window.cordova && platform.sdk.usersettings.meta.sound.value) {

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

                                var txid = data.txid

                                if(!self.showedIds[txid]) {
                                    self.showedIds[txid] = true


                                    var message = self.fastMessage(html, function () {
                                        //platform.sdk.notifications.seen([data.txid])
                                    });

                                    if (m.fastMessageEvents) {
                                        m.fastMessageEvents(data, message)
                                    }

                                    data.loaded = true

                                    platform.sdk.notifications.addFromWs(data)

                                    if (typeof _Electron != 'undefined' && !platform.focus && message.html) {
                                        electron.ipcRenderer.send('electron-notification', {
                                            html : message.html,
                                            settings : data.electronSettings
                                        });
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


                if(m.electronSettings) data.electronSettings = _.clone(m.electronSettings)

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

        self.subscribe = {
            logs : function(){

                address = platform.sdk.address.pnet(keyPair.publicKey).address

                var message = {
                    signature : platform.app.user.signature(),
                    address: address,
                    action : 'subscribe.logs'
                }

                self.send(JSON.stringify(message))
            }


        }

        self.unsubscribe ={
            logs : function(){

                address = platform.sdk.address.pnet(keyPair.publicKey).address

                var message = {
                    signature : platform.app.user.signature(),
                    address: address,
                    action : 'unsubscribe.logs'
                }

                self.send(JSON.stringify(message))
            }
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

                self.hideallnotificationsel = $('#hideallnotifications')

            }

            if (clbk)
                clbk()

        }

        setTimeout(function(){

            //platform.matrixchat.notify.event()

            // self.messageHandler({
            //     addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
            //     addrFrom: "PKpdrwDVGfuBaSBvboAAMwhovFmGX8qf8S",
            //     mesType: "post",
            //     msg: "comment",
            //     text: "Please, set avatar",
            //     reason: "system",
            //     time: "1619697839",
            // })

            /*self.messageHandler({
                addr: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                amount: "166666",
                msg: "transaction",
                node: "64.235.45.119:38081:8087",
                nout: "7",
                time: 1629883584,
                txid: "4e73740eba080aae73aceb80636dcf8f3fe8aed1a9c8c7de417a59ee2d54d357"
            })*/





            /*self.messageHandler({
                msg: "sharepocketnet",
                nblock: 1115942,
                time: "1617371657",
                txid: "e7a7c9f84794ccac6dead944e4d6fffc06628030b1d5428010d585c8bf7e659c"
            })*/

            // setTimeout(() => {
            //     self.messageHandler({
            //         addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
            //         addrFrom: "PJorG1HMRegp3SiLAFVp8R5Ef6d3nSrNxA",
            //         mesType: "upvoteShare",
            //         msg: "event",
            //         nblock: 1253143,
            //         posttxid: "ea9ea91e8baf69f752470f55d146f4638bab0960ef55753a3c44df02c645798c",
            //         time: "1625662971",
            //         txid: "d2533c04f0ef7ca9ff95cb6746567cdac5e8eaf285a57ed0831e0afdd624ca92",
            //         upvoteVal: 5
            //     })

            // }, 10000)


            /*self.messageHandler({
                addr: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                amount: "500000",
                msg: "transaction",
                node: "216.108.231.40:38081:8087",
                nout: "3",
                time: 1640237360,
                txid: "acbd05c9ac81fe9ca2b12bdb7c2fe1127270a9b94fed872d71c7d079004243e9",
            })*/

            /*self.messageHandler({
                addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                addrFrom: "PMGPzPbZnYEbVtYY4sajELjpWnT71w1cN8",
                mesType: "post",
                msg: "comment",
                nblock: 1154413,
                posttxid: "37348021a565fa549dfae5e9fb855c40dadae4456bda1cb1bfd3d3398081db91",
                reason: "post",
                time: "1619694710",
                txid: "670be9561196c76b68ec81948de2c39e03af0add79df1e236be49f359fd38626"
            })*/

            /*self.messageHandler({
                addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                addrFrom: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                mesType: "subscribe",
                msg: "event",
                node: "135.181.196.243:38081:8087",
                time: 1625762423,
                txid: "6119caaadaef37be8f3716be8280e88206adf043f38fc1665d7e42bdcf90128a"
            })*/

			/*self.messageHandler({
                addr: "PR7srzZt4EfcNb3s27grgmiG8aB9vYNV82",
                addrFrom: "PTcArXMkhsKMUrzQKn2SXmaVZv4Q7sEpBt",
                mesType: "postfromprivate",
                msg: "event",
                node: "51.174.99.18:38081:8087",
                time: 1625723521,
                txid: "b52f38b272b7a18c0947b853ee35fee2aa0e0105aa86daa9cd1efcb35b54f036"
            })*/

            // referral
            /*self.messageHandler({
                addr: "PQ8AiCHJaTZAThr2TnpkQYDyVd1Hidq4PM",
                addrFrom: "PJTjvqynFHqarEKgg6UJMQBSjuDsqn1ztF",
                mesType: "userInfo",
                msg: "event",
                nameFrom: "reftest1011",
                node: "137.135.25.73:38081:8087",
                time: 1636521290,
                txid: "65fee9b1e925833c5ff623178efecc436d3af0c9f6a4baa0b73c52907a9d1d7b"
            })*/



		}, 6000)
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

                    // TODO APPLICATIONS PAGE
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

        self.sdk.sharesObserver.storage = {
            viewed : {}
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
        }, 600000)

        var methods = [
            'ustate.meUpdate',
            'user.meUpdate',
            'node.get.time',
            'node.transactions.checkTemps',
            'node.transactions.get.allBalanceUpdate',
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

    self.updating = makeid()
    setTimeout(function () {
        self.updating = false;
    }, 600000)

    self.appstate = function() {

        if (reload || (self.loadingWithErrors && _.isEmpty(self.app.errors.state))) {

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

        self.nodeControlUpdateNodeLast = new Date()
        self.nodeControlUpdateNodePopup = false
        self.preparing = true;
        self.sdk.registrations.load();
        self.sdk.relayTransactions.load();
        self.applications = self.__applications()
        self.sdk.theme.load()
        self.sdk.lentaMethod.load()

        self.sdk.uiScale.load();
        self.sdk.uiScale.listenScalingEvents();

        self.sdk.system16.init()

        //self.app.platform.sdk.node.sys.load()

        setTimeout(function(){
            self.initSounds();
        }, 35000)

        if (self.app.errors.clbks) {
            self.app.errors.clbks.platform = self.appstate
        }

        ///

        initOnlineListener() // /remove for test

        self.app.api.wait.ready('use', 10000).then(r => {

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


            var directproxy = self.app.api.get.direct()

            if (directproxy){
                directproxy.clbks.tick.globalclbk = function(data) {

                    if (data.nodeControl.state.hasUpdate) {
                        if (!self.nodeControlUpdateNodePopup && (new Date(self.nodeControlUpdateNodeLast)).addSeconds(60 * 60) < new Date())
                        {
                            self.nodeControlUpdateNodeLast = new Date()
                            self.nodeControlUpdateNodePopup = true

                            dialog({
                                html: self.app.localization.e('easyNode_e10062'),
                                btn1text: self.app.localization.e('easyNode_e10015'),
                                btn2text: self.app.localization.e('skip'),
                                class : 'zindex',

                                success: function () {
                                   
                                    directproxy.fetchauth('manage', {
                                        action : 'node.update',
                                        data : {
                                            all : 'all'
                                        }
                                    }).then(r => {
                                        sitemessage(self.app.localization.e('easyNode_e10063'), null, 5000)
                                    }).catch(e => {
                                        sitemessage(JSON.stringify(e), null, 5000)
                                    })

                                },
                                destroy: function() {
                                    self.nodeControlUpdateNodeLast = new Date()
                                    self.nodeControlUpdateNodePopup = false
                                }
                            })
                        }
                    }
                }
            }


            self.ws = new self.WSn(self);

            self.firebase = new self.Firebase(self);

            self.state.load();

            self.focusListener = self.FocusListener(self);
            self.focusListener.init();
            self.titleManager = new self.TitleManager();
            self.sdk.captcha.load()

            setTimeout(function(){
                self.sdk.tags.getfastsearch()
                self.sdk.node.get.time()
            }, 1000)

            self.sdk.videos.init()

            self.preparing = false;

            if (typeof PeerTubePocketnet != 'undefined'){
                self.app.peertubeHandler = new PeerTubePocketnet(self.app);
            }

            if (typeof FrontendLogger !== 'undefined') {
                self.app.Logger = new FrontendLogger(navigator.userAgent, self.app);
            } else {
                self.app.Logger = {}
            }

            self.prepareUser(function() {

                clbk();
            });

            if (typeof _Electron == 'undefined' && !window.cordova && window.pocketnetproject !== 'Bastyon' && !bastyonhelperOpened && !window.testpocketnet){

                bastyonhelperOpened = true

                setTimeout(function(){

                    app.nav.api.load({
                        open : true,
                        id : 'bastyonhelper',
                        inWnd : true,
                    })

                }, 1000)

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
            self.sdk.user.meUpdate,
            self.sdk.categories.load,
            self.sdk.activity.load,
            self.sdk.node.shares.parameters.load,


        ], function () {

            self.loadingWithErrors = !_.isEmpty(self.app.errors.state)

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

    self.acceptterms = function(clbk){

        if(window.cordova){
            var key = 'acceptterms'

            var aterms = localStorage[key]

            if (!aterms){
                app.nav.api.load({
                    open : true,
                    id : 'terms',
                    inWnd : true,
                    essenseData : {
                        success : function(){
    
                            localStorage[key] = new Date();
                            
                            setTimeout(function(){
                                if(clbk) clbk()
                            }, 300)
                            
                        }
                    },
    
                    clbk : function(){
                        
                    }
                })
    
                return
            }
        }

        


        if(clbk) clbk()
        
    }

    self.prepareUser = function (clbk) {

        self.preparingUser = true;

        self.matrixchat.destroy()

        checkfeatures()
        

        app.user.isState(function(state){

            if (state) {


                /*self.ui.popup('test', false, {});*/


                lazyActions([

                    self.sdk.node.transactions.loadTemp,
                    self.sdk.addresses.init,
                    self.sdk.ustate.me,
                    self.sdk.usersettings.init,

                    self.ws.init,
                    self.firebase.init,

                    //self.sdk.exchanges.load,
                    self.sdk.articles.init,
                    self.sdk.categories.load,
                    self.sdk.activity.load,
                    self.sdk.node.shares.parameters.load,
                    self.sdk.sharesObserver.load,
                    self.sdk.user.get,

                    self.sdk.comments.loadblocked

                ], function () {

                    //self.ui.showmykey()


                    self.sdk.node.transactions.checkTemps(function(){
                        self.sdk.relayTransactions.send()
                    })

                    self.sdk.node.transactions.setUnspentoptimizationInterval()

                    //self.sdk.relayTransactions.send()

                    self.preparingUser = false;

                    self.loadingWithErrors = !_.isEmpty(self.app.errors.state)

                    self.app.peertubeHandler.init()

                    console.log("HERE")


                    if (clbk)
                        clbk()

                    setTimeout(function(){
                        self.matrixchat.init()
                    }, 300)

                    setTimeout(self.acceptterms, 5000)

                    setTimeout(function(){

                        lazyActions([
                            self.cryptography.prepare,
                            self.sdk.pool.init,
                            self.sdk.user.subscribeRef
                        ], function(){
                            //app.notifications.subscribe()
                        })

                        if (app.curation()){
                            if(app.user.validate()){
                                if(app.nav.get.href() == 'userpage?pc=1'){
                                    self.matrixchat.core.apptochat()
                                }
                            }
                        }

                        self.sdk.notifications.init().catch(e => {})

                        if (self.sdk.address.pnet()){
                            if(self.nvadr[self.sdk.address.pnet().address]) $('html').addClass('testaddress')
                            else{
                                if($('html').hasClass('testaddress'))
                                $('html').removeClass('testaddress')
                            }
                        }

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
        el : null,
        inited : false,
        initing : false,
        chatparallax : null,

        clbks : {
            ALL_NOTIFICATIONS_COUNT : {},
            NOTIFICATION : {},
            SHOWING : {}
        },

        destroy : function(){


            if (self.matrixchat.chatparallax){


                self.matrixchat.chatparallax.destroy()
                self.matrixchat.chatparallax = null
            }


            if (window.matrixchat){
                window.matrixchat.destroy()
            }


            $('#matrix').html('');


            self.matrixchat.el = null
            self.matrixchat.inited = false


            self.matrixchat.clbks = {
                ALL_NOTIFICATIONS_COUNT : {},
                NOTIFICATION : {},
                SHOWING : {}
            }

        },


        import : function(clbk){


            if (self.matrixchat.imported){
                if(clbk) clbk()
            }
            else{
                self.matrixchat.imported = true;

                if (electron){
                    if(clbk) clbk()
                }
                else{

                    var vs = '10'

                    if (typeof numfromreleasestring != 'undefined'){
                        vs = numfromreleasestring(window.packageversion)
                    }

                    importScript('chat/matrix-element.min.js?v=' + vs, clbk)

                }

            }


        },

        startchat : function(address){

            if (self.matrixchat.core){

                var link = 'contact?id=' + hexEncode(address)

                if (self.app.mobileview){
                    self.matrixchat.core.apptochat(link)
                }
                else{
                    self.matrixchat.core.gotoRoute(link)
                }
            }


        },

        init : function(){

            if(self.matrixchat.inited) return
            if(self.matrixchat.initing) return

            self.matrixchat.initing = true


            app.user.isState(function(state){

                self.matrixchat.initing = false

                if (state) {

                    if(self.sdk.user.reputationBlockedMe()) return

                    var pnet = self.app.platform.sdk.address.pnet()

                    var a = pnet.address;

                    if (state) {

                        self.matrixchat.import(function(){

                            self.matrixchat.inited = true

                            var privatekey = self.app.user.private.value.toString('hex');


                            var matrix = `<div class="wrapper matrixchatwrapper">
                                <matrix-element
                                    address="${a}"
                                    privatekey="${privatekey}"
                                    pocketnet="`+( self.app.mobileview ? '' : 'true')+`"
                                    mobile="`+( self.app.mobileview ? 'true' : '')+`" 
                                    ctheme="`+self.sdk.theme.current+`"
                                    localization="`+self.app.localization.key+`"
                                    fcmtoken="`+(self.fcmtoken || "")+`"
                                >
                                </matrix-element>
                            </div>`

                            $('#matrix').html(matrix);

                            self.matrixchat.el = $('.matrixchatwrapper')
                            self.matrixchat.initevents()
                            self.matrixchat.connect()

                        }, null, app);


                    }
                }
            })
        },

        changeFcm : function(){
            if (self.matrixchat.el){
                self.matrixchat.el.find('matrix-element').attr('fcmtoken', self.fcmtoken)
            }
        },

        changePip : function(){
            if (self.matrixchat.el){
                self.matrixchat.el.find('matrix-element').attr('pip', self.app.mobile.pip.enabled)
            }
        },

        changeTheme : function(){
            if (self.matrixchat.el){
                self.matrixchat.el.find('matrix-element').attr('ctheme', self.sdk.theme.current)
            }
        },

        changeLocalization : function(){
            if (self.matrixchat.el){
                self.matrixchat.el.find('matrix-element').attr('localization', self.app.localization.key)
            }
        },

        initevents : function(){
            if (self.matrixchat.el){

                if(self.app.mobileview){

                    self.matrixchat.chatparallax = new SwipeParallaxNew({

                        el : self.matrixchat.el,
                        transformel : self.matrixchat.el,
    
                        allowPageScroll : 'vertical',
        
                        directions : {
                            left : {
                                cancellable : true,				
                                
                              
    
                                positionclbk : function(px){
                                },
    
                                constraints : function(e){

                                    if(_.find(e.path, function(el){
                                        return el.className && el.className.indexOf('noswipepnt') > -1
                                    })) return false

                                    if (self.matrixchat.core && (!self.matrixchat.core.canback || self.matrixchat.core.canback())) return true
                                },
    
                                restrict : true,
                                trueshold : 30,
                                clbk : function(){

                                    if (self.matrixchat.core && (!self.matrixchat.core.canback || self.matrixchat.core.canback()))
                                        self.matrixchat.core.backtoapp()

                                }
        
                            }
                        }
                        
        
                    }).init()


				}

                self.matrixchat.clbks.NOTIFICATION.global = self.matrixchat.notify.event

            }
        },

        notify : {
            tpl : function(matrixevent){

                if(!self.ws) return


                var wsntemplates = self.ws.tempates

                var html = ''

                var ctypes = {
                    encrypted : 'e13345',
                    message : 'e133452',
                    invite : 'e133451'
                }

                if(!matrixevent.ctype) return

                var ctype = ctypes[matrixevent.ctype]

                if(!ctype) return

                html += wsntemplates.user({

                    image : matrixevent.icon,
                    name : matrixevent.title,
                    address : ''

                }, "", true, self.app.localization.e(ctype), '', dateNow())

                var h = '<div class="fastMessage">\
                <div class="fmCnt">' + html + '</div>\
                <div class="close">\
                    <i class="fa fa-times" aria-hidden="true"></i>\
                </div>\
                </div>'

                return h;
            },
            event : function(matrixevent){


                if(typeof _Electron != 'undefined' && !self.focus){

                    var html = self.matrixchat.notify.tpl(matrixevent)

                    if (html)

                        electron.ipcRenderer.send('electron-notification', {
                            html : html,
                            settings : {
                                size : 'small'
                            }
                        });

                }
            }
        },

        shareInChat : {
            url : function(id, url){
                if (self.matrixchat.core){

                    self.matrixchat.core.apptochat()

                    return self.matrixchat.core.mtrx.shareInChat(id, {
                        urls : [url]
                    }).catch(e => {

                        self.matrixchat.core.backtoapp()

                        return Promise.reject(e)
                    })
                }

                return Promise.reject('matrixchat.core')
            }
        },

        share : {

            object : function(sharing){
                if (self.matrixchat.core){

                    self.matrixchat.core.apptochat()

                    return self.matrixchat.core.share(sharing).catch(e => {

                        self.matrixchat.core.backtoapp()

                        return Promise.reject(e)
                    })
                }

                return Promise.reject('matrixchat.core')
            },

            url : function(url){
                if (self.matrixchat.core){

                    self.matrixchat.core.apptochat()

                    return self.matrixchat.core.share({
                        urls : [url]
                    }).catch(e => {

                        self.matrixchat.core.backtoapp()

                        return Promise.reject(e)
                    })
                }

                return Promise.reject('matrixchat.core')
            }
        },

        backtoapp : function(){

            if (self.matrixchat.core && !self.matrixchat.core.hiddenInParent){
                self.matrixchat.core.backtoapp()

                return true
            }
        },

        wait : function(){
            return pretry(function(){
                return self.matrixchat.core
            })
        },

        showed : function(){
            if(!self.matrixchat.core){ return false }

            if (self.app.mobileview){
                return !self.matrixchat.core.hiddenInParent
            }


            return self.matrixchat.core.isactive()
        },

        link : function(core){

            core.update({
                block : {
                    height : self.currentBlock
                }
            })

            core.backtoapp = function(link){

                if (self.app.mobileview)
                    app.nav.api.history.removeParameters(['pc'], null, {replaceState : true})

                if (link){
                    link = link.replace('https://' + self.app.options.url + '/', '')

                    if(link.indexOf('index') == '0' && link.indexOf('v=') == -1 &&
                        (link.indexOf('s=') > -1 || link.indexOf('i=') > -1 || link.indexOf('p=') > -1))
                        link = link.replace('index', 'post')

                    self.app.nav.api.load({
                        open: true,
                        href: link,
                        history: true,
                        handler : true
                    })
                }

                if (self.matrixchat.el){

                    if(!self.matrixchat.el.hasClass('active')) return
                        self.matrixchat.el.removeClass('active')
                }
                else{
                    return
                }

                if (app.chatposition)
                    app.chatposition(false)


                self.app.actions.playingvideo()

                if (self.app.mobileview) self.app.actions.restore()

                if (document.activeElement) document.activeElement.blur()

                if (self.matrixchat.core){
                    self.matrixchat.core.cancelshare ? self.matrixchat.core.cancelshare() : '' ;

                    self.matrixchat.core.hideInParent(self.app.mobileview ? true : false )
                }

                if (self.app.mobileview){

                    setTimeout(function(){
                        self.app.actions.onScroll()
                    }, 300) 
                    
                }

                _.each(self.matrixchat.clbks.SHOWING, function(c){
                    c(false)
                })

            }

            core.apptochat = function(link){

                if (document.activeElement) document.activeElement.blur()

                if (self.matrixchat.core){
                    if(link){
                        self.matrixchat.core.gotoRoute(link)
                    }
                }

                if (self.matrixchat.el){

                    if (self.matrixchat.el.hasClass('active')) return

                        self.matrixchat.el.addClass('active')
                        

                }
                else{
                    return
                }

                if (app.chatposition)
                    app.chatposition(true)

                self.app.actions.playingvideo()

                if (self.app.mobileview){
                    setTimeout(function(){
                        self.app.actions.offScroll(self.matrixchat.el)
                        self.app.actions.optimize()
                    })
                }

                if (self.app.mobileview)
                    app.nav.api.history.addParameters({
                        'pc' : '1'
                    })

                if (self.matrixchat.core){
                    self.matrixchat.core.hideInParent(false)
                }


                _.each(self.matrixchat.clbks.SHOWING, function(c){
                    c(true)
                })


            }

            self.matrixchat.core = core

            core.hideOptimization(self.app.mobileview ? true : false)
            core.hideInParent(self.app.mobileview ? true : false)
            core.externalLink(self.matrixchat)

            self.app.platform.ws.messages["newblocks"].clbks.newsharesLenta =
            self.app.platform.ws.messages["new block"].clbks.matrixchat = function(){

                core.update({
                    block : {
                        height : self.currentBlock
                    }
                })

            }

            var cm = deep(app, 'modules.menu.module.restart')

            if (cm) cm()

            var c = deep(app, 'nav.clbks.history.navigation')

            if (c) c()

            self.matrixchat.connect()
        },

        unlink : function(){

            if (self.matrixchat.core){
                //self.matrixchat.core.hideInParent(false)
                self.matrixchat.core.destroyExternalLink()
            }


            self.matrixchat.connectWith = null
            self.matrixchat.joinRoom = null

            delete self.app.platform.ws.messages["new block"].clbks.matrixchat
            delete self.matrixchat.core

            if (app.chatposition)
                app.chatposition(false)

            var cm = deep(app, 'modules.menu.module.restart')

            if (cm) cm()

            var c = deep(app, 'nav.clbks.history.navigation')

            if (c) c()
        },

        update : function(){
            if(!self.matrixchat.core) return

            self.matrixchat.core.updateUser()
        },

        transaction : function(id, roomid){

            if(!self.matrixchat.core) return

            if(!roomid){
                /// get roomid
            }

            if(!roomid) return

            self.matrixchat.core.mtrx.transaction(roomid, id)
        },

        connect : function(){
            if(!self.matrixchat.connectWith && !self.matrixchat.joinRoom) return
            if(!self.matrixchat.core) return

            self.matrixchat.core.apptochat()


            if (self.matrixchat.connectWith){
                return self.matrixchat.core.connect(self.matrixchat.connectWith).then(r => {
                    self.matrixchat.connectWith = null
                }).catch(e => {
                    self.matrixchat.connectWith = null
                })


            }

            if (self.matrixchat.joinRoom){
                return self.matrixchat.core.joinRoom(self.matrixchat.joinRoom).then(r => {
                    self.matrixchat.joinRoom = null
                }).catch(e => {
                    self.matrixchat.joinRoom = null
                })


            }
        },

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

            console.log("FOCUS")

            var focustime = platform.currentTime()
            var time = focustime - (unfocustime || focustime)

            self.focus = true;

            if (time > 120 && (window.cordova || electron || isInStandaloneMode())) {
                self.clearStorageLight()

                self.sdk.node.transactions.get.allBalance(null, true)
                self.sdk.notifications.getNotifications().catch(e => {})
            }

            if(time > 120 && window.cordova){

                retry(function(){
                    return platform && platform.matrixchat && platform.matrixchat.core;
                }, function(){

                    setTimeout(function(){
                        platform.matrixchat.core.mtrx.fastsync()
                    }, 500)
                })
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

            setTimeout(function(){

                if (self.focus) return 

                if (self.app.pipwindow && self.app.pipwindow.playerstatus && self.app.pipwindow.playerstatus() == 'playing'){

                    self.app.mobile.pip.enable(self.app.pipwindow.el)
                }
                
            }, 200)
           

            //if (self.app.playingvideo)
            //    self.app.mobile.pip.enable(self.app.playingvideo.el ? self.app.playingvideo.el.find('.video-js') : '');
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

                electron.ipcRenderer.on('win-hide', uf)
                electron.ipcRenderer.on('win-minimize', uf)
                electron.ipcRenderer.on('win-restore', f)

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

                electron.ipcRenderer.off('win-hide', uf)
                electron.ipcRenderer.off('win-minimize', uf)
                electron.ipcRenderer.off('win-restore', f)

                electron.ipcRenderer.off('pause-message', ufel)
                electron.ipcRenderer.off('resume-message', fpauseel)

            }

            $(window).off('focus', f);
            $(window).off('blur', uf);


        }


        return self;
    }

    var initOnlineListener = function () {

        return

        if(onlinetnterval){
            clearInterval(onlinetnterval)
        }

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

        }, 500)

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
                initial = document.title || app.meta.fullname //fullName
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

    self.cordovaSetup = function(){

        function setupOpenwith() {

            if(!cordova.openwith) return

            //cordova.openwith.setVerbosity(cordova.openwith.DEBUG);

            var mime = {

                'image/jpeg' : 'images',
                'image/jpg' : 'images',
                'image/png' : 'images',
                'image/webp' : 'images',
                'application/pdf' : 'files',
                'application/msword' : 'files'

            }

            var utitomime = {
                'public.image' : 'image/jpeg'
            }

            cordova.openwith.init();
            cordova.openwith.addHandler(function(intent){
                var sharing = {}

                if(intent.action == 'VIEW') return



                var promises = _.map(
                    _.filter(intent.items || [], function(i){return i}),
                    (item) => {


                        /*if (item.type == 'text/plain'){
                            delete item.type
                        }*/


                    return new Promise((resolve, reject) => {


                        if(utitomime[item.type]) item.type = utitomime[item.type]

                        if(item.base64 && isios()) item.data = 'data:' + item.type + ';base64,' + item.base64

                        if(!item.type || !mime[item.type] || item.data){
                            resolve()
                        }
                        else{
                            cordova.openwith.load(item, function(data) {

                                item.data = 'data:' + item.type + ';base64,' + data

                                resolve()

                            });
                        }


                    }).then(r => {

                        if (item.text){
                            if(!sharing.messages) sharing.messages = []

                            sharing.messages.push(item.text)
                        }

                        if(item.type && mime[item.type] && item.data){
                            if(!sharing[mime[item.type]]){
                                sharing[mime[item.type]] = []
                            }

                            sharing[mime[item.type]].push(item.data)
                        }

                        return Promise.resolve()
                    })
                })


                Promise.all(promises).then(r => {

                    if (intent.exit) { cordova.openwith.exit(); }

                    if(_.isEmpty(sharing)){
                        sitemessage(self.app.localization.e('e13293')+' /ul101')
                    }
                    else{

                        self.matrixchat.wait().then(r => {
                            return self.matrixchat.share.object(sharing)
                        }).catch(r => {

                            sitemessage(self.app.localization.e('e13293')+' /ul102')

                        })


                    }
                })
            });

        }

       
        self.sdk.localshares.initclbk()

        if(window.cordova){
            setupOpenwith()
        }

        

    }


    self.navManager = function(){

        var routing = function(route){

            pretry(function(){

                return app.appready

            }).then(r => {

                app.user.isState(function (state) {

                    var url = route
    
                    route = (route || '').replace('pocketnet://', '').replace('https://test.pocketnet.app/', '').replace('https://pocketnet.app/', '').replace('bastyon://', '').replace('https://test.bastyon.com/', '').replace('https://bastyon.com/', '')
    
                        if (route){
    
                            if(!state || route.indexOf('welcome?') == -1){
                                self.app.nav.api.load({
                                    open: true,
                                    href: route,
                                    history: true
                                })
                            }
                        }
    
                        /////////////
    
                        var w = parameters(url, true).connect
                        var cr = parameters(url, true).publicroom   
                        var ps =  parameters(url, true).ps
                        var ref =  parameters(url, true).ref
    
                        self.matrixchat.connectWith = w || null
                        self.matrixchat.joinRoom = cr || null
    
    
                        if(!ps && !cr && !w && !app.curation()){
                            self.matrixchat.backtoapp()
                        }
    
                        setTimeout(function(){
                            self.matrixchat.wait().then(r => {
                                self.matrixchat.connect()
                            })
                        }, 500)
    
                        if (ref){
                            self.app.setref(ref)
                        }
    
                })

            })

           

        }

        if(electron && _Electron){

            electron.ipcRenderer.on('nav-message', function (event, data) {
                if (data.type == 'action') {
                    routing(data.msg)
                }
            })

        }

        if (window.cordova && typeof universalLinks != 'undefined'){

            universalLinks.subscribe('nav-message', function (eventData) {

                routing(eventData.url)

            });

        }
    }

    self.navManager()

    self.app = app;

    if (typeof HTLS != 'undefined')
        self.htls = new HTLS()

    self.cryptography = new self.Cryptography();

    self.autoUpdater()
    self.cordovaSetup()

    self.matrixchat.connectWith = parameters().connect

    if(!self.matrixchat.connectWith)
        self.matrixchat.joinRoom = parameters().publicroom

    return self;

}


if (typeof module != "undefined") {
    module.exports = Platform;
}

topPreloader(65);
