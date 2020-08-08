
var Path = require('path');
const fs = require('fs');
const child_process = require('child_process');



var NodeControl = function (p) {
    if (!p) p = {};

    var self = this;

    self.ini = {

        node: {
            active: false,
            instance: null
        },

        settings: {
            base_join_path: function (path) {
                return Path.join(this.base_dir, 'nodeserver', path)
            },
            get base_dir() {
                return process.env.INIT_CWD
            },
            get bin_path() { return this.base_join_path('pocketcoind.exe') },
            get config_path() { return Path.join(this.data_dir, 'pocketcoin.conf') },
            get data_dir() { return this.base_join_path('data') },
        },

        config: {
            rpchost: '127.0.0.1',
            rpcport: 38081,
            rpcuser: 'test',
            rpcpass: 'test'
        },

    }

    self.kit = {

        init: function () {

            if (!fs.existsSync(self.ini.settings.base_dir))
                fs.mkdirSync(self.ini.settings.base_dir);

            if (!fs.existsSync(self.ini.settings.data_dir))
                fs.mkdirSync(self.ini.settings.data_dir);

            // определить текущий статус ноды - вызов по RPC ?

        },

        get state() {

            this.rpc('getblockchaininfo', [], function (data, err) {
                console.log('>>>>>>>>>>> ', data, err)
            })
            /*- start / stop / worked / shutdown*/
            /* RPC вызов проверка запуска */
            
        },

        running: function (clbk) {
            const win = 'pocketcoind.exe'
            const mac = 'pocketcoind'
            const linux = 'pocketcoind'

            const cmd = process.platform == 'win32' ? 'tasklist' : (process.platform == 'darwin' ? 'ps -ax | grep ' + mac : (process.platform == 'linux' ? 'ps -A' : ''))
            const proc = process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : ''))
            if (cmd === '' || proc === '') {
                resolve(false)
            }

            child_process.exec(cmd, function (err, stdout, stderr) {
                if (clbk) clbk(stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1)
            })
        },

        start: function (clbk) {
            self.ini.node.active = true

            this.running(function (result) {

                if (result) {
                    console.log('node is running - skip start')
                    return
                }

                // запустить pocketnetd как процесс start /path/pocketnetd -- args
                console.log('exec > ', `${self.ini.settings.bin_path} -conf=${self.ini.settings.config_path} -datadir=${self.ini.settings.data_dir}`)
                self.ini.node.instance = child_process.exec(
                    `${self.ini.settings.bin_path} -conf=${self.ini.settings.config_path} -datadir=${self.ini.settings.data_dir}`,
                    {
                        windowsHide: false
                    },
                    function (err, stdout, stderr) {
                        self.ini.node.active = (err === undefined)
                    }
                );

                self.ini.node.instance.on('error', (err) => {
                    self.ini.node.active = false
                    console.error('Failed to start subprocess.');
                });

                self.ini.node.instance.stdout.on('data', function (data) {
                    //console.log('stdout: ' + data);
                });

                self.ini.node.instance.stderr.on('data', function (data) {
                    console.log('stderr: ' + data);
                });

                self.ini.node.instance.on('close', function (code) {
                    console.log('child process exited with code ' + code);
                });

                self.ini.node.instance.on('exit', (code) => {
                    self.ini.node.active = false
                    console.log(`child process exited with code ${code}`);
                });

            })
        },

        stop: function () {
            // TODO (brangr): РПЦ вызов `bc stop`
            // TODO (brangr): уничтожить события
            self.ini.node.instance = null
        },

        rpc: function (method, prms, clbk) {
            p.handles.rpc.action({
                parameters: {
                    method: method,
                    parameters: prms || [],
                    nodelocally: JSON.stringify({
                        protocol: 'http',
                        host: self.ini.config.rpchost,
                        port: self.ini.config.rpcport,
                        rpcuser: self.ini.config.rpcuser,
                        rpcpass: self.ini.config.rpcpass,
                    })
                },

                nodeManager: p.nodeManager,

                responseSuccess: function (_p) {
                    var data = _p.data

                    if (clbk)
                        clbk(data)
                },
                responseFail: function (err, d) {
                    if (clbk)
                        clbk(d, err)
                }
            })
        }




    }

    return self;
}

module.exports = NodeControl