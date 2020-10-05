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
            // TODO (brangr): save settings

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
            var _config_data = _config.split('\n').filter(function (it) { return it });
            _config_data.forEach(function(it) {
                let _it = it.split('=')
                if (_it.length == 2) {
                    self.ini.config[_it[0]] = _it[1].replace('\r', '').replace('\n', '')
                }
            })
        },

        get bin_name() {
            const win = 'pocketcoind.exe'
            const mac = 'pocketcoind'
            const linux = 'pocketcoind'
            return (process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : '')))
        },

        // get state() {

        //     this.rpc('getblockchaininfo', [], function (data, err) {
        //         console.log('>>>>>>>>>>> ', data, err)
        //     })
        //     /*- start / stop / worked / shutdown*/
        //     /* RPC вызов проверка запуска */

        // },

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

        running: function(clbk) {
            const proc = this.bin_name
            const cmd = process.platform == 'win32' ? 'tasklist' : (process.platform == 'darwin' ? 'ps -ax | grep ' + proc : (process.platform == 'linux' ? 'ps -A' : ''))
            if (cmd === '' || proc === '') {
                resolve(false)
            }

            child_process.exec(cmd, function(err, stdout, stderr) {
                let _running = stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1
                console.log('running:', _running, 'enable:', p.settings.node.Enable)
                if (clbk) clbk(_running)                
            })
        },

        start: function(clbk) {
            console.log('node signal start..')

            self.ini.node.instance = child_process.spawn(
                p.settings.node.BinPath,
                [
                    `-conf=${p.settings.node.ConfigPath}`,
                    `-datadir=${p.settings.node.DataPath}`
                ]
            );

            self.ini.node.instance.on('error', function(err) {
                self.ini.node.instance = null
                p.settings.node.Enable = false
                p.settings.node.control.state = err
            });

            self.ini.node.instance.on('close', function(code) {
                p.settings.node.control.state = ''
            });

            p.settings.node.Timestamp = new Date()
        },

        stop: function(clbk) {
            console.log('node signal stop..')

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
                    console.log(err)
                    p.settings.node.Enable = true
                    p.settings.node.Timestamp = new Date()
                    if (clbk) clbk()
                }
            )
        },

        enable: function(data, clbk) {
            p.settings.node.Enable = data.v
            p.settings.node.Timestamp = new Date()
        },

        rpc: function(method, prms, success, failed) {
            p.handles.rpc.action({
                parameters: {
                    method: method,
                    parameters: prms || [],
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
        }




    }

    return self;
}

module.exports = NodeControl