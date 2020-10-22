var Path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const { EOL } = require('os');
const { start } = require('repl');



var NodeControl = function(p) {
    if (!p) p = {};

    var self = this;

    self.ini = {

        node: {
            instance: null,
            state: '',
            getnodeinfo: false,
        },

        config: {
            rpchost: '127.0.0.1',
            rpcport: 38081,
            rpcuser: '',
            rpcpassword: '',
        },

    }

    self.kit = {

        init: function() {

            // change global settings
            if (!p.settings.node.BinPath) p.settings.node.BinPath = Path.join(process.env.INIT_CWD, 'nodeserver', this.bin_name)
            if (!p.settings.node.DataPath) p.settings.node.DataPath = Path.join(process.env.INIT_CWD, 'nodeserver', 'data')
            if (!p.settings.node.ConfigPath) p.settings.node.ConfigPath = Path.join(process.env.INIT_CWD, 'nodeserver', 'data', 'pocketcoin.conf')

            // create catalogs if not exists
            if (!fs.existsSync(p.settings.node.DataPath))
                fs.mkdirSync(p.settings.node.DataPath, { recursive: true });

            if (!fs.existsSync(p.settings.node.ConfigPath)) {
                let data = 'server=1' + EOL +
                    'rpcallowip=0.0.0.0/0' + EOL +
                    'rpchost=localhost' + EOL +
                    'rpcport=38081' + EOL +
                    'rpcuser=' + randomString(10) + EOL +
                    'rpcpassword=' + randomString(16) + EOL +
                    'wsuse=1' + EOL

                fs.writeFileSync(p.settings.node.ConfigPath, data)
            }

            // read pocketcoin.conf
            let _config = fs.readFileSync(p.settings.node.ConfigPath, 'utf8');
            var _config_data = _config.split('\n').filter(function(it) { return it });
            _config_data.forEach(function(it) {
                let _it = it.split('=')
                if (_it.length == 2) {
                    self.ini.config[_it[0]] = _it[1].replace('\r', '').replace('\n', '')
                }
            })

            p.settings.node.control.state = "node state init"
            setInterval(self.kit.nodeState, 15000)
        },

        bin_name: function(name) {
            const win = `${name}.exe`
            const mac = name
            const linux = name
            return (process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : '')))
        },

        state: function(clbk) {
            self.kit.running(function(running) {
                if (p.settings.node.control.running !== running) {
                    p.settings.node.control.running = running
                    p.settings.node.Timestamp = new Date()
                }

                if (p.settings.node.Enable === true && running === false) self.kit.start()
                if (p.settings.node.Enable === false && running === true) self.kit.stop()

                if (clbk) clbk()
            })
        },

        nodeState: function() {
            console.log('pre getnodeinfo', self.ini.getnodeinfo)

            self.kit.getNodeInfo();
            self.kit.getNodeAddresses();
        },

        getNodeInfo: function() {
            if (p.settings.node.Enable && !self.ini.getnodeinfo) {
                self.ini.getnodeinfo = true
                self.kit.rpc('getnodeinfo', [], 
                    function(data) {
                        p.settings.node.control.state = 'Running'
                        var lastBlockDate = new Date(data.result.lastblock.time * 1000);
                        p.settings.node.control.lastBlock = `${data.result.lastblock.height} (${lastBlockDate.toLocaleString()})`
                        self.ini.getnodeinfo = false
                    },
                    function(err, data) {
                        p.settings.node.control.state = data.data.message ?? `Err: ${err}`
                        console.log('getnodeinfo', err)
                        console.log('getnodeinfo', data)
                        self.ini.getnodeinfo = false
                    }
                )
            }
        },

        getNodeAddresses: function() {
            if (p.settings.node.Enable && !self.ini.listaddressgroupings) {
                self.ini.listaddressgroupings = true
                self.kit.getWallet(function(data) {
                    if (data.length <= 0)
                        p.settings.node.control.addresses = '-'
                    else
                        p.settings.node.control.addresses = data.join(EOL)
                    self.ini.listaddressgroupings = false
                })
            }
        },

        running: function(clbk) {
            const proc = this.bin_name('pocketcoind')
            const procQt = this.bin_name('pocketcoin-qt')
            const cmd = process.platform == 'win32' ? 'tasklist' : (process.platform == 'darwin' ? 'ps -ax | grep ' + proc : (process.platform == 'linux' ? 'ps -A' : ''))
            if (cmd === '' || proc === '') {
                resolve(false)
            }

            child_process.exec(cmd, function(err, stdout, stderr) {
                let _running = stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1
                if (!_running) _running = stdout.toLowerCase().indexOf(procQt.toLowerCase()) > -1

                if (!_running) {
                    p.settings.node.control.state = 'Stopped'
                    p.settings.node.control.lastBlock = '-'
                    p.settings.node.control.addresses = '-'
                }

                console.log('running:', _running, 'enable:', p.settings.node.Enable)
                if (clbk) clbk(_running)
            })
        },

        start: function(clbk) {
            console.log('node signal start..')
            p.settings.node.control.state = 'Starting..'

            self.ini.node.instance = child_process.exec(
                `${p.settings.node.BinPath} -conf=${p.settings.node.ConfigPath} -datadir=${p.settings.node.DataPath} -silent`,
                function(error, stdout, stderr) {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        self.ini.node.instance = null
                        p.settings.node.Enable = false
                        p.settings.node.control.state = error
                        return;
                    }
                }
            );

            self.ini.node.instance.on('exit', function(code) {
                p.settings.node.control.state = 'Stopped'
            });

            p.settings.node.Timestamp = new Date()
        },

        stop: function(clbk) {
            console.log('node signal stop..')
            p.settings.node.control.state = 'Stopping..'
            p.settings.node.control.lastBlock = '-'
            p.settings.node.control.addresses = '-'

            self.kit.rpc('stop', [],
                function(data) {
                    self.ini.node.instance = null
                    let interval = setInterval(function() {
                        self.kit.running(function(runned) {
                            console.log('stop interval', runned)
                            if (!runned) {
                                clearInterval(interval)
                                if (clbk) clbk()
                            }
                        })
                    }, 500)
                },
                function(err, data) {
                    console.log('stop', err)
                    if (clbk) clbk()
                }
            )
        },

        enable: function(data, clbk) {
            p.settings.node.Enable = data.v
            p.settings.node.Timestamp = new Date()
            if (clbk) clbk()
        },

        rpc: function(method, prms, success, failed) {
            p.handles.rpc.action({
                parameters: {
                    method: method,
                    parameters: hexEncode( JSON.stringify( prms || [] ) ),
                    nodelocally: JSON.stringify({
                        protocol: 'http',
                        host: self.ini.config.rpchost,
                        port: self.ini.config.rpcport,
                        rpcuser: self.ini.config.rpcuser,
                        rpcpass: self.ini.config.rpcpassword,
                    })
                },

                nodeManager: p.nodeManager,

                responseSuccess: function(_p) {
                    var data = _p.data
                    if (success) success(data)
                },

                responseFail: function(err, data) {
                    if (failed) failed(err, data)
                }
            })
        },

        getWallet: function(clbk) {
            self.kit.rpc('listaddressgroupings', [], 
                function(data) {
                    let addresses = data.result.flat(Infinity).filter(function(el) { return el.length == 34; });
                    if (clbk) clbk(addresses)
                },
                function(err, data) {
                    if (clbk) clbk([])
                }
            )
        },

        setWallet: function(prms, clbk) {
            self.kit.rpc('importprivkey', [ prms.private ], 
                function(data) {
                    console.log('importprivkey', data)
                    if (clbk) clbk(null, data)
                },
                function(err, data) {
                    console.log('importprivkey', err, data)
                    if (clbk) clbk(err, data.data.message)
                }
            )
        },


    }

    return self;
}

module.exports = NodeControl