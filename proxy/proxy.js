/**
 * GLOBAL
 */

_Node = true;
_SEO = false;

var path = require("path");

fs = require('fs');
request = require('request');
jsonrpc = require('node-json-rpc2');
_crypto = require('crypto');


RpcClient = require('./rpc');

var Remote = require('./remote');

var Firebase = require('./firebase');
var NodeManager = require('./nodemanager');
var NodeControl = require('./nodecontrol');
var DB = require('./db');

filterXSS = require("xss").filterXSS;

bitcoin = require('./btc')


chrsz = 8

/*________________________*/

var Server = require("./server");
var WSN = require("./wsserver");
var Router = require("./router");
var Handles = require("./handles");
var Application = require("./app");
var Processes = require("./processes");
var Iplimiter = require("./iplimiter");
var Cache = require("./cache")

var Proxy = function (settings) {

    var self = this;
    var db = null;
    var firebase = null;
    var processes = null;
    var handles = null;
    var h = null;
    var nodeManager = null;
    var nodeControl = null;
    var iplimiter = null;
    var router = null;
    var ws = null;
    var firebase = null;
    var cache = null;
    var server = null;

    var status = null;

    var appmeta = {
        apiproxy: 'https://localhost:' + settings.ports.https,
        ws: 'wss://localhost:' + settings.ports.ws,
    };

    var app = new Application(appmeta);

    var ini = {

        ssl: function () {

            var options = {};

            try {
                options = {
                    key: fs.readFileSync(path.resolve(__dirname, settings.ssl.key)),
                    cert: fs.readFileSync(path.resolve(__dirname, settings.ssl.cert)),
                    passphrase: settings.ssl.passphrase
                }
            }
            catch (e) {
                options = null
            }



            return options;

        },

        settings: function (clbk) {

            if (settings.dbEnable) {

                fs.readFile(settings.dbp, { encoding: 'utf-8' }, function read(err, data) {

                    if (!err) {

                        var dbex = {};

                        try {
                            dbex = JSON.parse(data || "{}");
                        }

                        catch (e) {
                            console.log(e)
                        }

                        settings.db = _.extend(settings.db, dbex)

                    }

                    if (clbk)
                        clbk()

                })

            }
            else {
                if (clbk)
                    clbk()
            }


        },
    }

    self.app = {
        init: function (clbk) {
            app.init({
                clbk: function (app) {

                    if (clbk) clbk(app)

                }
            })
        }
    }

    self.db = {
        init: function (clbk) {

            if (settings.db) {

                //ini.settings(function(){

                if (settings.dbEnable && settings.db.user && settings.db.database && settings.db.password) {

                    db = new DB(settings);
                    db.init();

                    if (clbk)
                        clbk(db)
                }
                else {
                    if (clbk)
                        clbk()
                }
                //})

            }
            else {
                if (clbk)
                    clbk()
            }
        },

        destroy: function () {
            if (db) {
                return db.destroy()
            }

            return Promise.resolve()
        }
    }

    self.firebase = {
        init: function (clbk) {

            firebase = null;

            if (typeof Firebase != 'undefined' && db) {
                firebase = new Firebase({
                    db: db,
                    app: app
                })

                if (!firebase.prepare(settings.fbk)) {
                    firebase = null;

                    return Promise.resolve(firebase)
                }
            }

            return Promise.reject()

        },

        link: function (clbk) {
            if (firebase) {

                if (ws)
                    firebase.ws = ws;

                firebase.init()

                firebase.getUsers(function (users) {

                    if (clbk) clbk()

                })
            }

            else {

                if (clbk) clbk()

            }

        }
    }

    self.processes = {
        init: function () {
            processes = new Processes({
                app: app,
                db: db,
                kran: settings.kran,
                refkey: settings.refkey,
            })
        },
        destroy: function () {

            if (processes)

                processes.destroy()

        }
    }

    self.handles = {
        init: function () {
            h = new Handles({
                processes: processes,
                firebase: firebase,
                db: db,
                captcha: settings.captcha
            })

            handles = h.handles

            app.handles = handles;
        }
    }

    self.nodeManager = {
        init: function (clbk) {
            nodeManager = new NodeManager({
                db: db,
                app: app,
                rpcuser: settings.nodes.defaults.rpcuser,
                rpcpass: settings.nodes.defaults.rpcpass,
                stable: settings.nodes.stable,
                handles: handles,
                defaults: settings.nodes.defaults
            })

            nodeManager.init(function (err) {
                if (clbk) clbk(err)
            })
        },

        get: function () {
            return nodeManager
        }
    }

    self.nodeControl = {
        init: function (clbk) {
            nodeControl = new NodeControl({
                app: app,
                settings: settings,
                handles: handles,
                nodeManager: nodeManager
            })

            nodeControl.kit.init(function (err) {
                if (clbk) clbk(err)
            })
        },
        get instance() {
            return nodeControl
        }
    }

    self.iplimiter = {
        init: function () {

            if (settings.iplimiter) {
                iplimiter = new Iplimiter({
                    db: db
                })
            }

        }
    }

    self.router = {
        init: function () {
            router = new Router({
                db: db,
                handles: handles,
                iplimiter: iplimiter
            })

            if (h)
                h.router = router
        }
    }

    self.server = {
        init: function () {

            if (settings.server) {

                var ssl = ini.ssl()

                if (ssl) {
                    server = new Server({
                        route: router.route,
                        handles: handles,
                        settings: settings,
                        app: app,
                        remote: new Remote(app),
                        https_options: ssl,
                        firebase: firebase,
                        db: db,
                        nodeManager: nodeManager,
                        port: settings.ports.https,
                        processes: processes,
                        kran: settings.kran,
                        refkey: settings.refkey,
                        iplimiter: iplimiter

                    })

                    server.start();
                }



            }

        },

        destroy: function () {

            if (server) {
                server.stop()
                server = null;
            }

        }
    }

    self.ws = {
        init: function () {

            var ssl = ini.ssl()

            if (ssl) {

                ws = new WSN({
                    app: app,
                    https_options: ssl,
                    firebase: firebase,
                    db: db,
                    port: settings.ports.wss,
                    nodeManager: nodeManager
                })

                if (router)
                    router.ws = ws

                if (h)
                    h.ws = ws

            }



        },

        start: function () {
            if (ws !== null) ws.start();
        },

        destroy: function () {
            if (ws !== null) ws.destroy()
        }
    }

    self.cache = {
        init: function () {
            cache = new Cache()

            if (h)
                h.cache = cache

            if (ws)
                ws.cache = cache
        }
    }


    self.kit = {

        status: function () {
            return {
                status: status,
                db: db ? true : false,
                processes: processes ? processes.info() : null,
                handles: h ? h.info() : null,
                nodeManager: nodeManager ? nodeManager.statistic() : null,
                nodeControl: nodeControl ? nodeControl.state : null,
                iplimiter: iplimiter ? iplimiter.info() : null,
                server: server ? server.info() : null,
                ws: ws ? ws.info() : null,
                firebase: firebase ? true : null

            }
        },

        start: function (clbk) {

            status = 1

            self.db.init(function () {

                self.firebase.init()
                self.processes.init()
                self.handles.init()                

                self.nodeManager.init(function () {

                    self.iplimiter.init()
                    self.router.init()
                    self.server.init()

                    self.app.init(function () {
                        self.ws.init()
                        self.cache.init()
                        self.nodeControl.init()

                        self.firebase.link(function () {

                            self.ws.start()

                            status = 2

                            if (clbk)
                                clbk()

                        })


                    })

                })

            })

        },

        stop: function () {
            self.db.destroy()
            self.processes.destroy()
            self.ws.destroy()

            status = 0
        },

        settings: function () {

            return settings

        }
    }

    return self
}

module.exports = Proxy






