
var Path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const { EOL } = require('os');
const { start } = require('repl');



var NodeControl = function (p) {
    if (!p) p = {};

    var self = this;

    self.ini = {

        node : {
            instance: null,
        },

        settings: {
            
        },

    }

    self.kit = {

        init: function () {

            // change global settings
            if (!p.settings.node.BinPath) p.settings.node.BinPath = Path.join(process.env.INIT_CWD, 'nodeserver', this.bin_name)
            if (!p.settings.node.DataPath) p.settings.node.DataPath = Path.join(process.env.INIT_CWD, 'nodeserver', 'data')
            if (!p.settings.node.ConfigPath) p.settings.node.ConfigPath = Path.join(process.env.INIT_CWD, 'nodeserver', 'data', 'pocketcoin.conf')
            // TODO (brangr): save settings
            
            // create catalogs if not exists
            if (!fs.existsSync(p.settings.node.DataPath))
                fs.mkdirSync(p.settings.node.DataPath, { recursive : true });

            if (!fs.existsSync(p.settings.node.ConfigPath)) {
                let data = 'server=1' + EOL
                    + 'rpcallowip=0.0.0.0/0' + EOL
                    + 'rpcuser=' + randomString(10) + EOL
                    + 'rpcpassword=' + randomString(16) + EOL
                    + 'wsuse=1' + EOL

                fs.writeFileSync(p.settings.node.ConfigPath, data)
            }

                
            // определить текущий статус ноды - вызов по RPC ?

        },

        get bin_name() {
            const win = 'pocketcoind.exe'
            const mac = 'pocketcoind'
            const linux = 'pocketcoind'
            console.log('platform', process.platform)
            return ( process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : '') ) )
        },

        get state() {

            this.rpc('getblockchaininfo', [], function (data, err) {
                console.log('>>>>>>>>>>> ', data, err)
            })
            /*- start / stop / worked / shutdown*/
            /* RPC вызов проверка запуска */
            
        },

        running: function (clbk) {

            const proc = this.bin_name
            const cmd = process.platform == 'win32' ? 'tasklist' : (process.platform == 'darwin' ? 'ps -ax | grep ' + proc : (process.platform == 'linux' ? 'ps -A' : ''))
            if (cmd === '' || proc === '') {
                resolve(false)
            }

            child_process.exec(cmd, function (err, stdout, stderr) {
                let _running = stdout.toLowerCase().indexOf(proc.toLowerCase()) > -1
                if (p.settings.node.Enable === true && _running === false) start()
                if (clbk) clbk(_running)
            })
        },

        start: function (clbk) {
            console.log('node signal start..')

            // запустить pocketnetd как процесс start /path/pocketnetd -- args
            console.log('exec > ', `${p.settings.node.BinPath} -conf=${p.settings.node.ConfigPath} -datadir=${p.settings.node.DataPath}`)
            self.ini.node.instance = child_process.exec(
                `${p.settings.node.BinPath} -conf=${p.settings.node.ConfigPath} -datadir=${p.settings.node.DataPath}`,
                {
                    windowsHide: false
                },
                function (err, stdout, stderr) {
                    console.log('Node launch', err, (err === undefined))
                    p.settings.node.Enable = (err === undefined)
                    if (clbk) clbk(true)
                }
            );

            self.ini.node.instance.on('error', (err) => {
                // p.settings.node.Enable = false
                console.error('Failed to start subprocess.');
            });

            self.ini.node.instance.stdout.on('data', function (data) {
                //console.log('stdout: ' + data);
            });

            self.ini.node.instance.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
            });

            // self.ini.node.instance.on('close', function (code) {
            //     console.log('child process exited with code ' + code);
            // });

            self.ini.node.instance.on('exit', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        },

        stop: function () {
            console.log('node signal stop..')
            // TODO (brangr): РПЦ вызов `bc stop`
            // TODO (brangr): уничтожить события
            self.ini.node.instance = null
        },

        enable: function (data, clbk) {
            p.settings.node.Enable = data.v
            if (clbk) clbk()
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