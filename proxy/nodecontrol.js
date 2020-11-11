var Path = require('path');
const electron = require('electron')
const { dialog } = require('electron')
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
            binPath: '',
            confPath: '',
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
            self.ini.node.binPath = Path.join(self.kit.bin_path(), self.kit.bin_name('pocketcoind'))
            if (!p.settings.node.DataPath) p.settings.node.DataPath = Path.join(electron.app.getPath('userData'), 'pocketcoin')

            // create catalogs if not exists
            if (!fs.existsSync(p.settings.node.DataPath))
                fs.mkdirSync(p.settings.node.DataPath, { recursive: true });

            // create pocketcoin.conf
            self.ini.node.confPath = Path.join(p.settings.node.DataPath, self.kit.conf_name())
            if (!fs.existsSync(self.ini.node.confPath)) {
                let data = 'server=1' + EOL +
                    'port=36060' + EOL +
                    'rpcport=36061' + EOL +
                    'wsport=36062' + EOL +
                    'rpcallowip=0.0.0.0/0' + EOL +
                    'rpchost=localhost' + EOL +
                    'rpcuser=' + randomString(10) + EOL +
                    'rpcpassword=' + randomString(16) + EOL +
                    'wsuse=1' + EOL

                fs.writeFileSync(self.ini.node.confPath, data)
            }

            // read pocketcoin.conf
            let _config = fs.readFileSync(self.ini.node.confPath, 'utf8');
            var _config_data = _config.split('\n').filter(function(it) { return it });
            _config_data.forEach(function(it) {
                let _it = it.split('=')
                if (_it.length == 2) {
                    self.ini.config[_it[0]] = _it[1].replace('\r', '').replace('\n', '')
                }
            })

            if (!self.kit.nodeStateInterval) {
                p.settings.node.control.state = "node state init"
                self.kit.nodeStateInterval = setInterval(self.kit.nodeState, 5000)
            }
        },

        bin_name: function(name) {
            const win = `${name}.exe`
            const mac = name
            const linux = name
            return (process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : '')))
        },

        bin_path: function() {
            return Path.join(Path.dirname(process.execPath), 'pocketcoind')
        },

        conf_name: function() {
            return 'pocketcoin.conf'
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
                        p.settings.node.control.state = data.data.message || `Err: ${err}`
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
                        p.settings.node.control.addresses = data.join('<br/>')
                    self.ini.listaddressgroupings = false
                })
            }
        },

        running: function(clbk) {
            let _running = self.ini.node.instance != null
            if (!_running) {
                if (!p.settings.node.control.startError)
                    p.settings.node.control.state = 'Stopped'
                    
                p.settings.node.control.lastBlock = '-'
                p.settings.node.control.addresses = '-'
            }

            console.log('running:', _running, 'enable:', p.settings.node.Enable)
            if (clbk) clbk(_running)
        },

        start: function(clbk) {
            if (self.ini.node.instance == null) {
                p.settings.node.control.state = 'Starting..'
                
                let binPath = self.ini.node.binPath
                if (process.platform == 'darwin' || process.platform == 'linux') {
                    binPath = `LD_LIBRARY_PATH=${self.kit.bin_path()} ${self.ini.node.binPath}`
                }

                self.ini.node.instance = child_process.spawn(binPath, [
                    `-conf=${self.ini.node.confPath}`,
                    `-datadir=${p.settings.node.DataPath}`,
                    `-silent`,
                    `-blocksonly=1`,
                    `-dbcache=50`,
                    `-maxorphantx=10`,
                    `-maxmempool=100`
                ], { stdio: 'ignore', shell : true })

                self.ini.node.instance.on('close', function(code) {
                    self.ini.node.instance = null
                    p.settings.node.control.state = 'Stopped'
                    if (code !== 0) {
                        console.log(`grep process exited with code ${code}`);

                        p.settings.node.control.startError = true
                        p.settings.node.control.state = `Error starting the node. Code ${code}`
                        p.settings.node.Enable = false
                        p.settings.node.Timestamp = new Date()
                    }
                });

                p.settings.node.Timestamp = new Date()
            }

            if (clbk) clbk()
        },

        stop: function(clbk) {
            console.log('node signal stop..')
            p.settings.node.control.state = 'Stopping..'
            p.settings.node.control.lastBlock = '-'
            p.settings.node.control.addresses = '-'

            self.kit.rpc('stop', [],
                function(data) {
                    setTimeout(function() {
                        self.kit.stop(clbk)
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
                    parameters: hexEncode(JSON.stringify(prms || [])),
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

            self.kit.rpc('importprivkey', [prms.private],
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

        setBinPath: function(prms, clbk) {
            let options = {
                filters: [
                    { name: 'Pocketcoin Executable', extensions: ['exe'] },
                    { name: 'All Files', extensions: ['*'] }
                ]
            }

            dialog.showOpenDialog(options, function(res) {
                if (!res.canceled && res.length > 0) {
                    self.ini.node.binPath = res[0]
                    p.settings.node.Timestamp = new Date()

                    if (clbk) clbk(null, self.ini.node.binPath)
                }
            })
        },

        setDataPath: function(prms, clbk) {
            let options = {
                properties: ['openDirectory']
            }

            dialog.showOpenDialog(options, function(res) {
                if (!res.canceled && res.length > 0) {
                    p.settings.node.DataPath = res[0]
                    p.settings.node.Timestamp = new Date()
                    self.kit.init()

                    if (clbk) clbk(null, p.settings.node.DataPath)
                }
            })
        },

        setConfPath: function(prms, clbk) {
            let options = {
                filters: [
                    { name: 'Pocketcoin Config Files', extensions: ['conf'] },
                    { name: 'All Files', extensions: ['*'] }
                ]
            }

            dialog.showOpenDialog(options, function(res) {
                if (!res.canceled && res.length > 0) {
                    self.ini.node.confPath = res[0]
                    p.settings.node.Timestamp = new Date()

                    if (clbk) clbk(null, self.ini.node.confPath)
                }
            })
        }


    }

    return self;
}

module.exports = NodeControl