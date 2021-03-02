var Path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const { EOL } = require('os');
var Applications = require('./applications');
var f = require('../functions');

var Control = function(settings) {
    if (!settings) settings = {};

    var isDevelopment = process.argv.find(function(el) { return el == '--development'; })

    var self = this;
    var applications = new Applications(settings)
    
    var nodeStateInterval = null
    var nodeAutorunInterval = null
    var checkUpdatesInterval = null

    var lock = ''

    var state = {
        info : {}
    }

    var node = {
        instance: null,
        binPath: '',
        confPath: '',
        proxy : null
    }

    var hasupdates = false

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
                let data = 'server=1' + EOL +
                    'port=38080' + EOL +
                    'rpcport=38081' + EOL +
                    'wsport=8087' + EOL +
                    'rpcallowip=0.0.0.0/0' + EOL +
                    'rpchost=localhost' + EOL +
                    'rpcuser=' + f.randomString(10) + EOL +
                    'rpcpassword=' + f.randomString(16) + EOL +
                    'wsuse=1' + EOL
    
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
            hasupdates = r

            return Promise.resolve()
        })
    }

    self.init = function(){
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

            // create pocketcoin.conf
           
        
            self.autorun.init()

            return self.kit.autorun().then(r => {

                self.kit.nodeState()

                return Promise.resolve()
            })
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
            if (checkUpdatesInterval){
                clearInterval(checkUpdatesInterval)
                checkUpdatesInterval = null
            }
        }
    }

    self.autorun = {
        init : function(){
            if(!nodeAutorunInterval){
                nodeAutorunInterval = setInterval(function(){
                    self.kit.autorun().catch(e => {
                    })
                }, 500)
            }
        },

        destroy : function(){
            if (nodeAutorunInterval){
                clearInterval(nodeAutorunInterval)
                nodeAutorunInterval = null
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
            hasupdates : hasupdates,
            lock : lock
        }
    }

    self.request = {
        getNodeInfo : function(){
            return self.kit.rpc('getnodeinfo')
        },

        getNetworkInfo : function(){
            return self.kit.rpc('getnodeinfo')
        },

        getNodeAddresses: function() {
            return self.kit.rpc('listaddressgroupings').then(result => {


                var addresses = []

                _.each(result, function(rs){
                    _.each(rs, function(au){
                        addresses.push(au)
                    })
                })

                addresses = _.map(addresses, function(a){
                    return {
                        address : a[0],
                        balance : a[1] || 0
                    }
                })

                return Promise.resolve(addresses)
            })
        },

        importPrivKey: function(private) {
            return self.kit.rpc('importprivkey', private)
        },
    }

    self.kit = {

        checkupdate : function(){
            return applications.checkupdate()
        },

        install : function(){

            if(lock) return Promise.resolve(false)

            self.autorun.destroy()

            lock = 'installing'

            return self.kit.stop().then(r => {
                return folders()
            }).then(r => {
                return makeconfig()
            }).then(r => {
                return applications.install(self.helpers.complete_bin_path())
            }).then(r => {
                lock = ''
                self.autorun.init()
                return self.kit.check()
            }).catch(e => {

                console.log("ERR", e)

                lock = ''

                return Promise.reject(e)
            })
           
        },

        delete : function(all){

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

            lock = 'updating'

            return this.stop().then(r => {

                return self.kit.install()
            }).then(r => {

                lock = ''

                self.autorun.init()

                return self.kit.check()
            }).catch(e => {
                lock = ''

                return Promise.reject(e)
            })
        },

        hasbin : function(){
            return fs.existsSync(self.helpers.complete_bin_path())
        },

        check : function(){
            //return Promise.resolve({})

            node.hasbin = self.kit.hasbin();

            if(lock) return Promise.resolve(false)

            return self.request.getNodeInfo().then(data => {

                state.info = data
                state.status = 'launched'    
                delete state.error

                return Promise.resolve(true)

            }).catch(e => {

                var stopped = e.code == 408

                if (stopped){
                    state.status = 'stopped'

                    return Promise.resolve(false)
                }

                if(e.code == -28){
                    state.status = 'running'

                    state.error = {
                        code : e.code,
                        message : e.message
                    }

                    return Promise.resolve(true)
                }

        
                state.status = 'error'
                state.error = {
                    code : e.code,
                    message : e.message
                }
        
                return Promise.resolve(true)

            })
        
        },
      
        autorun: function() {

            if(!self.kit.hasbin()) {
                return Promise.resolve()
            }
            
            return self.kit.check().then(running => {
                
                if (enabled === true && running === false) return self.kit.start()
                if (enabled === false && running === true) return self.kit.stop()
    
                return Promise.resolve()
            })
        
        },

        nodeState: function() {

            return self.kit.check()
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
                        `-blocksonly=1`,
                        `-dbcache=50`,
                        `-maxorphantx=10`,
                        `-maxmempool=100`
                    ], { stdio: ['ignore'], detached : true, shell : true })

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
                            state.timestamp = f.now()

                            self.kit.enable(false)
                        }

                    });

                    node.instance.on('error', function(code) {


                        state.status = 'error'
                        state.error = {
                            code : code
                        }

                    });

                    
                }

                state.timestamp = f.now()
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

            //self.nodeManager.remove(self.config)

            if(lock) return Promise.resolve(false)

            return self.kit.rpc('stop').then(r => {

                state.status = 'stopped'
                state.timestamp = f.now()

                return Promise.resolve()

            }).catch(e => {
                return Promise.resolve()
            })
            
            .then(r => {

                if (node.instance){
                    node.instance = null
                }

                return Promise.resolve()
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

            state.timestamp = f.now()

        },

        rpc : function(method, parameters){

            if(!node.proxy) 
                node.proxy = self.nodeManager.temp({
                    host : '127.0.0.1',
                    port : config.rpcport,
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