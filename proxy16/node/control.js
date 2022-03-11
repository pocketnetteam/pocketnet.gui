var Path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const { EOL } = require('os');
var Applications = require('./applications');
var f = require('../functions');
const { clearTimeout } = require('timers');
const { auth } = require('firebase-admin');

var Control = function(settings) {
    if (!settings) settings = {};

    var isDevelopment = process.argv.find(function(el) { return el == '--development'; })

    var self = this;
    var applications = new Applications(settings)
    
    var nodeStateTimer = null
    var nodeStateInterval = 15000
    var nodeAutorunTimer = null
    var nodeAutorunInterval = 5000
    var checkUpdatesInterval = null

    var lock = ''

    var state = {
        status: 'stopped',
        info: {},
        sync: {
            left: 0,
            chunks: []
        },
        staking: {},
        wallet: {},
        install: {
            title: '',
            progress: {
                percent: 0
            },
            break: false,
        },
        hasUpdate: false
    }

    var node = {
        instance: null,
        binPath: '',
        confPath: '',
        dataPath: '',
        proxy : null
    }

    var config = {}
    var enabled = false 

    self.helpers = {

        bin_name: function(name) {
            const win = `${name}.exe`
            const mac = name
            const linux = name
            return (process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : '')))
        },

        conf_name: function() {
            return 'pocketcoin.conf'
        },

        complete_bin_path : function(){
            var binPath = Path.join( node.binPath, self.helpers.bin_name('pocketcoind'))

            if (process.platform == 'darwin' || process.platform == 'linux') {
                binPath = `LD_LIBRARY_PATH=${node.binPath} ${self.helpers.bin_name('pocketcoind')}`
            }

            return binPath
        },

        data_checkpoints_path : function(withFile = false) {
            // TODO (brangr): add check test network
            // if ('main')
                return Path.join( node.dataPath, 'checkpoints', (withFile ? 'main.sqlite3' : '') );

            // if ('test')
            //     return Path.join( node.dataPath, 'checkpoints' );
            
            return '';
        },

        defaults : {
            dataPath : function(){

                if (self.proxy.userDataPath){

                    if (isDevelopment){
                        return f.path('pocketcoin')
                    }

                    return Path.join(self.proxy.userDataPath, 'pocketcoin')
                }

                return f.path('pocketcoin')

            },
            binPath : function(){
                return f.path('pocketcoind')
            }
        }
    }

    var removeAll = function(removedata){
        if(!node.dataPath) {
            return Promise.reject('nodedatapath')
        }

        if(removedata && fs.existsSync(node.dataPath)){
            try{
                fs.rmdirSync(node.dataPath, { recursive: true });
            }catch(e){
                return Promise.reject('nodedatapath')
            }
            
        }

        if(fs.existsSync(node.binPath)){
            try{
                fs.rmdirSync(node.binPath, { recursive: true });
            }catch(e){
                return Promise.reject('binpath')
            }
            
        }

        return applications.removeAll()
    }

    var folders = function(){

        if(!node.dataPath) {
            return Promise.reject('nodedatapath')
        }

        // create catalogs if not exists
        if(!fs.existsSync(node.dataPath)){
            try{
                fs.mkdirSync(node.dataPath, { recursive: true });
            }catch(e){
                return Promise.reject('nodedatapath')
            }
        }

        if(!fs.existsSync(self.helpers.data_checkpoints_path())){
            try{
                fs.mkdirSync(self.helpers.data_checkpoints_path(), { recursive: true });
            }catch(e){
                return Promise.reject('chkpPath')
            }
        }

        if(!fs.existsSync(node.binPath)){
            try{
                fs.mkdirSync(node.binPath, { recursive: true });
            }catch(e){
                return Promise.reject('binpath')
            }
        }

        return Promise.resolve()
    }

    var makeconfig = function(){

        try{
            if (!fs.existsSync(node.confPath)) {
                let data =
                    'server=1' + EOL +
                    'port=37070' + EOL +
                    'rpcport=37071' + EOL +
                    'publicrpcport=38081' + EOL +
                    'staticrpcport=38082' + EOL +
                    'restrpcport=38083' + EOL +
                    'wsport=8087' + EOL +
                    'rpcallowip=127.0.0.1' + EOL +
                    'rpchost=localhost' + EOL +
                    'rpcuser=' + f.randomString(10) + EOL +
                    'rpcpassword=' + f.randomString(256) + EOL +
                    'api=1' + EOL +
                    'wsuse=1' + EOL +
                    'rest=0' + EOL
    
                fs.writeFileSync(node.confPath, data)
            }
    
            var _config = fs.readFileSync(node.confPath, 'utf8');
            var _config_data = _config.split('\n').filter(function(it) { return it });
            
            _config_data.forEach(function(it) {
                var _it = it.split('=')
                if (_it.length == 2) {
                    config[_it[0]] = _it[1].replace('\r', '').replace('\n', '')
                }
            })

        }

        catch(e){
            return Promise.reject(e)
        }
    }

    self.checkUpdates = function(){

        if(!self.kit.hasbin()){
            return Promise.resolve()
        }

        return applications.checkupdate().then(r => {
            state.hasUpdate = r
            return Promise.resolve()
        })
    }

    self.init = function(){

        if (self.proxy.test){
            return Promise.resolve()
        } 

        // change global settings

        node.proxy = null

        node.binPath = settings.binPath || self.helpers.defaults.binPath()

        node.dataPath = settings.ndataPath || self.helpers.defaults.dataPath()

        node.confPath = Path.join(node.dataPath, self.helpers.conf_name())

        enabled = settings.enabled

        return folders().then(r => {
            return makeconfig()
        }).then(r => {
            return applications.init()
        }).then(r => {
            return self.checkUpdates()
        }).then(r => {
            self.autorun.init()
            self.updates.init()
            self.state.init()
        })
    }

    self.updates = {
        init : function(){
            if(!checkUpdatesInterval){
                checkUpdatesInterval = setInterval(function(){
                    self.checkUpdates().catch(e => {})
                }, 360000)
            }
        },
        destroy : function(){
            if (!checkUpdatesInterval){
                clearInterval(checkUpdatesInterval)
                checkUpdatesInterval = null
            }
        }
    }

    self.autorun = {
        init : function(){
            if(!nodeAutorunTimer){
                (function me() {
                    
                    self.kit.autorun().catch(e => {})
                
                    nodeAutorunTimer = setTimeout(me, nodeAutorunInterval);
                })()
            }
        },

        destroy : function(){
            if (nodeAutorunTimer){
                clearInterval(nodeAutorunTimer)
                nodeAutorunTimer = null
            }
        }
    }

    self.state = {
        init : function(){
            if(!nodeStateTimer){
                (function me() {

                    self.kit.stakingState().catch(e => {})
                    self.kit.walletState().catch(e => {})
                
                    nodeStateTimer = setTimeout(me, nodeStateInterval);
                })()
            }
        },

        destroy : function(){
            if (nodeStateTimer){
                clearTimeout(nodeStateTimer)
                nodeStateTimer = null
            }
        }
    }

    self.destroy = function(){

        self.autorun.destroy()
        self.updates.destroy()

        return Promise.resolve()
    }

    self.info = function(){
        return {
            enabled : enabled,
            instance : node.instance ? true : false,
            hasbin : self.kit.hasbin(),

            
            state : state,
            node : {
                binPath : node.binPath,
                dataPath : node.dataPath
            },
            lock : lock,
            other : node.other,
            hasapplication : applications.hasapplication()
        }
    }

    self.request = {
        getNodeInfo : function(){
            return self.kit.rpc('getnodeinfo')
        },

        getNetworkInfo : function(){
            return self.kit.rpc('getnodeinfo')
        },

        getStakingInfo: function() {
            return self.kit.rpc('getstakinginfo').then(result => {
                return Promise.resolve(result)
            })
        },

        listAddresses: function() {
            return self.kit.rpc('listaddresses').then(result => {
                return Promise.resolve(result)
            })
        },

        getnewaddress: function() {
            return self.kit.rpc('getnewaddress').then(result => {
                return Promise.resolve(result)
            })
        },

        sendtoaddress: function(address, amount) {
            return self.kit.rpc('sendtoaddress', [address, amount]).then(result => {
                return Promise.resolve(result)
            })
        },

        importPrivKey: function(private) {
            return self.kit.rpc('importprivkey', private)
        },

        dumpwallet: function(filePath) {
            return self.kit.rpc('dumpwallet', filePath).then(result => {
                return Promise.resolve(result)
            })
        },

        importwallet: function(filePath) {
            return self.kit.rpc('importwallet', filePath).then(result => {
                return Promise.resolve(result)
            })
        },
    }

    self.kit = {

        checkupdate : function() {
            return applications.checkupdate()
        },

        install : function() {

            if(lock) return Promise.resolve(false)

            self.autorun.destroy()

            state.install.break = false
            lock = 'installing'
            let snapshotFile = Path.resolve(node.dataPath, applications.getMeta()['snapshot_latest'].name)

            return self.kit.stop().then(r => {
                
                return folders()

            }).then(r => {
                
                return makeconfig()

            }).then(r => {
                
                state.install.progress = { percent: 0 }
                state.install.title = ''
                state.install.status = ''

                if (fs.existsSync(Path.resolve(node.dataPath, 'pocketdb')))
                    return Promise.resolve()

                return applications.downloadPermanent('snapshot_latest', node.dataPath, function(st) {
                    state.install.progress = st
                    state.install.title = `Downloading snapshot database`
                        + ` - ${f.unitFormatter(st.size.transferred, 2)} / ${f.unitFormatter(st.size.total, 2)}`
                        + ` - ${f.unitFormatter(st.speed, 2)}/s`
                        + ` - ${Math.round(st.time.remaining / 60)} min. remaining`
                    
                    return { break : state.install.break }
                })
            }).then(() => {

                if (state.install.break)
                    Promise.reject();

                state.install.break = -1

                if (!fs.existsSync(snapshotFile))
                    return Promise.resolve()

                state.install.progress = { percent: 1 }
                state.install.title = 'Decompressing snapshot database...'

                return applications.decompress(snapshotFile, node.dataPath)

            }).then(() => {
                
                if (!fs.existsSync(snapshotFile))
                    return Promise.resolve()

                fs.unlinkSync(snapshotFile)
                return Promise.resolve()

            }).then(() => {
                
                state.install.progress = { percent: 1 }
                state.install.title = 'Installing binary files...'
                return applications.install('bin', self.helpers.complete_bin_path(), true)
                
                // return applications.downloadPermanent('bin_permanent', node.binPath, function(st) {
                //     state.install.progress = st
                //     state.install.title = `Installing binary files...`
                // })

            }).then(() => {
                
                state.install.progress = { percent: 1 }
                state.install.title = 'Installing checkpoints database...'
                return applications.install('checkpoint_main', self.helpers.data_checkpoints_path(true), false)

                // return applications.downloadPermanent('checkpoint_main_permanent', self.helpers.data_checkpoints_path(false), function(st) {
                //     state.install.progress = st
                //     state.install.title = `Installing checkpoints database...`
                // })

            }).then(() => {

                state.install.progress = null
                state.install.title = ''
                return Promise.resolve()

            }).then(() => {

                lock = ''
                self.autorun.init()
                return Promise.resolve()

            }).catch(e => {

                lock = ''
                return Promise.reject(e)
            })
           
        },

        breakInstall : function() {
            state.install.break = true;
        },

        delete : function(all) {

            if(lock) return Promise.resolve(false)

            self.autorun.destroy()

            lock = 'deleting'

            return self.kit.stop().then(r => {
                return removeAll(all)
            }).then(r => {

                lock = ''
                self.autorun.init()

                return self.kit.check()
            }).catch(e => {
                lock = ''

                return Promise.reject(e)
            })
        },

        update : function(){

            if(lock) return Promise.resolve(false)

            self.autorun.destroy()

            return self.kit.safeStop().then(r => {

                return f.pretry(function() {
                    return false
                }, 5, 1000).then(e => {
                    return self.kit.install()
                })

            }).then(r => {

                state.hasUpdate = false
                self.autorun.init()

                return self.kit.check()

            }).catch(e => { 

                self.logger.w('nodecontrol', 'error', 'Node Update', e)

                lock = ''

                return Promise.reject(e)
            })
        },

        hasbin : function(){
            return fs.existsSync(self.helpers.complete_bin_path())
        },

        check : function(){
            node.hasbin = self.kit.hasbin();
            node.other = false

            if(lock) return Promise.resolve(false)

            return self.request.getNodeInfo().then(data => {

                if (state.info.lastblock) {
                    let chunk = data.lastblock.height - state.info.lastblock.height
                    state.sync.chunks.push(chunk)

                    if (state.sync.chunks.length > 10) {
                        let avg = (state.sync.chunks.reduce((a, b) => a + b, 0) / state.sync.chunks.length)
                        state.sync.chunks = []
                        state.sync.chunks.push(avg)
                    }
                }

                state.info = data
                state.status = 'launched'    
                delete state.error

                // Calculate elapsed time
                // (total - current) / avg(chunk) * (nodeAutorunInterval / 1000)
                state.sync.left = Math.round(
                    (self.proxy.nodeManager.chain().commonHeight - state.info.lastblock.height) /
                    (state.sync.chunks.reduce((a, b) => a + b, 0) / state.sync.chunks.length) *
                    (nodeAutorunInterval / 1000) /
                    3600
                );

                return Promise.resolve(true)

            }).catch(e => {

                if(e.code == 401 && !node.hasbin){
                    node.other = true
                    return Promise.resolve(true)
                }

                if(e.code == -28){
                    state.status = 'running'

                    state.error = {
                        code : e.code,
                        message : e.message
                    }

                    return Promise.resolve(true)
                }
                
                if (!node.instance) {

                    if (!enabled)
                        state.status = 'stopped'
                        
                    delete state.error
                    return Promise.resolve(false)

                } else {

                    state.status = 'checking'

                    return Promise.resolve(true)

                }
            })
        
        },
      
        autorun: function() {

            if(!self.kit.hasbin())
                return Promise.resolve()
            
            return self.kit.check()
                .then(running => {
                    
                    if (enabled === true && running === false) return self.kit.start()
                    if (enabled === false && running === true) return self.kit.stop()
        
                    return Promise.resolve()
                })
                .catch(e => {

                })
        
        },

        stakingState: function() {
            if (state.status != 'launched')
                return Promise.resolve()
                
            return self.request.getStakingInfo()
                .then(data => {
                    state.staking = data
                    return Promise.resolve()
                })
                .catch(e => {
                    Promise.resolve()
                })
        },
        
        walletState: function() {
            if (state.status != 'launched')
                return Promise.resolve()
                
            return self.request.listAddresses()
                .then(data => {
                    state.wallet = data
                    
                    let total = 0;
                    for (let key in state.wallet)
                        total += state.wallet[key].balance
                        state.wallet.total = total;

                    return Promise.resolve()
                })
                .catch(e => {
                    Promise.resolve()
                })
        },

        detach : function(){
            node.instance = null
            return Promise.resolve()
        },

        start: function() {

            if(lock) return Promise.resolve(false)

            return self.kit.check().then(r => {

                if(!r && !node.instance){
                    

                    state.status = 'starting'
                
                    var binPath = self.helpers.complete_bin_path()

                    node.instance = child_process.spawn(binPath, [
                        `-conf=${node.confPath}`,
                        `-datadir=${node.dataPath}`,
                        `-silent`,
                        `-blocksonly=0`,
                    ], { stdio: ['ignore'], detached : false, shell : false})



                    node.instance.unref()

                    node.instance.on('close', function(code) {
                    
                        node.instance = null
                        state.status = 'stopped'

                        if (code !== 0) {


                            state.error = {
                                code : code,
                                message : "Instance closed"
                            }

                            state.status = 'error'
                            state.timestamp = new Date()

                            self.kit.enable(false)
                        }

                        self.logger.w('nodecontrol', 'error', 'on.close', state)

                    });

                    node.instance.on('error', function(code) {

                        node.instance = null
                        state.status = 'error'
                        state.error = {
                            code : code
                        }

                        self.logger.w('nodecontrol', 'error', 'on.error', state)

                    });

                    
                }

                state.timestamp = new Date()
            })


        },

        canstop : function(){
            return self.kit.check().then(r => {

                if (r && node.instance){
                    return Promise.reject('noderunning')
                }

                return Promise.resolve()

            })
        },
        
        stop: function() {
            state.status = 'stopping'
            state.info = {}

            if(lock) return Promise.resolve(false)

            return self.kit.rpc('stop').then(r => {
                state.timestamp = new Date()
                return Promise.resolve()

            }).catch(e => {
                if (node.instance) {
                    state.status = 'stopping'
                } else {
                    state.status = 'stopped'
                }

                state.timestamp = new Date()

                return Promise.resolve()
            })
            .then(r => {
                return Promise.resolve()
            })
               
        },

        safeStop: function() {
            return self.destroy().then(e => {
                return self.kit.stop().then(e => {
                    return f.pretry(function() {
                        return !node.instance && (state.status == 'stopped' || state.status == 'error')
                    }, 60, 1000).then(e => {
                        return Promise.resolve()
                    })
                })
            })
        },

        restart : function(){

            return this.stop().then(r => {
                return this.start()
            })
        },

        enable: function(v) {

            enabled = v;

            _.each(self.clbks.enabled, function(c){
                c(enabled, state)
            })

            state.status = v ? 'starting' : 'stopping'
            state.timestamp = new Date()

            if (enabled)
                self.autorun.init()

        },

        rpc : function(method, parameters){

            if(!node.proxy) 
                node.proxy = self.nodeManager.temp({
                    host : '127.0.0.1',
                    port : config.publicrpcport,
                    portPrivate : config.rpcport,
                    ws : config.wsport,
                    rpcuser : config.rpcuser,
                    rpcpass : config.rpcpassword
                })

            return node.proxy.rpcs(method, parameters)
        }
     
    }

    self.clbks = {
        enabled : {}
    }


    return self;
}

module.exports = Control