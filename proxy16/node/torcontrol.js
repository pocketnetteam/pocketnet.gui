const path = require("path");
const child_process = require("child_process");
const Applications = require("./applications");
const f = require('../functions');
const fs = require("fs/promises");
const fssync = require("fs");

class Helpers {
    bin_name = (name)=> {
        const win = `${name}.exe`
        const mac = name
        const linux = name
        return (process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : '')))
    }

    checkPath = (pathname) => {
        try {
            const stat = fssync.lstatSync(pathname)

            return { exists: true, isFolder: stat.isDirectory()};
        }catch (e) {

            console.log(e)

            return { exists: false, isFolder: null };
        }
    }
}

class State {
    instance = null;
    _status = 'stopped';
    constructor(control) {
        this.instance = control
    };

    get status() { return this._status };

    set status(stateValue) {
        this._status = stateValue;

        this.instance.listeners.forEach((listener) => {
            const isAnyListener = (listener.type === 'any');
            const isTargetListenerType = (listener.type === stateValue);

            if (isAnyListener || isTargetListenerType) {
                listener.listener(stateValue);
            }
        });
    };
}

class TorControl {
    helpers = new Helpers();
    state = new State(this);
    instance = null; /// tor instance
    listeners = [];
    settings = {};
    application = null;
    installfailed = null;

    constructor(settings, proxy/*, ipc*/) {
        this.settings = {...settings};

        console.log('settings', settings)
        
        this.application = new Applications(settings, applicationRepository, proxy)

    }

    isStarted = () => (this.state.status === 'started');
    isStopped = () => (this.state.status === 'stopped');
    isInstalling = () => (this.state.status === 'install');
    isRunning = () => (this.state.status === 'running');

    onStarted = (listener) => this.listeners.push({ type: 'started', listener });
    onStopped = (listener) => this.listeners.push({ type: 'stopped', listener });
    onInstalling = (listener) => this.listeners.push({ type: 'install', listener });
    onRunning = (listener) => this.listeners.push({ type: 'running', listener });

    init = async() => {
        try {

            await this.application.init();

            await this.folders();

            this.autorun()
        

        } catch (e) {
            console.log("E", e)
            this.state.status = "stopped";
        }
    }

    settingChanged = async(settings) => {

        var needRestart = false

        if(settings.useSnowflake != this.settings.useSnowflake) needRestart = true
        if(settings.enabled2 != this.settings.enabled2 && settings.enabled2 != 'auto') needRestart = true

        this.settings = {...settings};

        console.log('needRestart', needRestart,  this.settings )

        if (needRestart){
            await this.autorun()
        }
    }

    autorun = async () =>{

        if (this.instance){
            if (this.settings.enabled2 == 'neveruse'){
                this.stop()
            }
            else{
                await this.restart()
            }
        }

        if (!this.instance){

            if (this.settings.enabled2 != 'neveruse'){
                if (this.needinstall()){

                    await this.install()
                }
            }

            if (this.settings.enabled2 == 'always'){
                await this.restart()
            }
        }
    }

    getpath = () => {
        return path.join(this.getsettingspath(), this.helpers.bin_name("tor"))
    }

    getsettingspath = () => {
        return f.path(this.settings.path)
    }

    needinstall = () => {

        var existsBin = this.helpers.checkPath(this.getpath());

        return existsBin.exists ? false : true
    }

    folders = async() => {

        const check = await this.helpers.checkPath(this.getsettingspath())
        
        if(!check.exists){
            try{
                await fs.mkdir(this.getsettingspath(), { recursive: true });
            }catch(e){
                throw 'tordatapath'
            }
        }

        if (check.exists && !check.isFolder){
            await fs.rm(this.getsettingspath(), { recursive: true })
            await this.folders();
        }
    }

    makeConfig = async() => {
        const useSnowflake = this.settings.useSnowflake || false;
        const isOverwrite = true; //config.overwrite || false;

        const torrcConfig = await this.helpers.checkPath(path.join(this.getsettingspath(), 'torrc'));

        if (torrcConfig.exists && !isOverwrite) {
            return true;
        }

        try {
            await fs.unlink(path.join(this.getsettingspath(), "torrc"))
        }catch (e) {}

        const getSettingsPath = (...parts) => path.join(this.getsettingspath(), ...parts);

        const snowflakeStuns = [
            "stun.voip.blackberry.com:3478",
            "stun.altar.com.pl:3478",
            "stun.antisip.com:3478",
            "stun.bluesip.net:3478",
            "stun.dus.net:3478",
            "stun.epygi.com:3478",
            "stun.sonetel.com:3478",
            "stun.sonetel.net:3478",
            "stun.stunprotocol.org:3478",
            "stun.uls.co.za:3478",
            "stun.voipgate.com:3478",
            "stun.voys.nl:3478",
        ].map(s => `stun:${s}`).join(',');

        let torConfig = [
            "# This configuration was generated automatically.\n" +
            "# The user is free to edit this config if he know\n" +
            "# how to do that. Read TOR documentation before...\n",

            "SocksPort 0.0.0.0:9151",
            "CookieAuthentication 1",
            "DormantCanceledByStartup 1",
            `DataDirectory ${getSettingsPath("data")}`,
            "Log notice stdout",
            "AvoidDiskWrites 1",
            `GeoIPFile ${getSettingsPath("geoip")}`,
            `GeoIPv6File ${getSettingsPath("geoip6")}`,
            "KeepalivePeriod 10",
        ];

        if (useSnowflake) {
            torConfig.push(
                "# Bridges configurations\n",

                "UseBridges 1",
                "UpdateBridgesFromAuthority 1",
                `ClientTransportPlugin snowflake exec ${getSettingsPath("PluggableTransports", this.helpers.bin_name("snowflake-client"))}`,
                `Bridge snowflake 192.0.2.3:1 url=https://snowflake-broker.torproject.net.global.prod.fastly.net/ front=cdn.sstatic.net ice=${snowflakeStuns}`
            )
        }

        torConfig = torConfig.join('\n');

        try{
            await fs.writeFile(path.join(this.getsettingspath(), "torrc"), torConfig, {flag: "a+"})

        }catch(e) {
            return false

        }

        return true

        
    }

    installManual = async() => {
        
        this.installfailed = null

        return await this.install()
    }

    install = async() => {

        if (this.installfailed){
            throw this.installfailed
        }

        try{

            this.state.status = "install";

            const download = await this.application.download('bin', {user: "cenitelas", name: "tor"});
            await this.application.decompress(download.path, this.getsettingspath())
            await fs.unlink(download.path)
            await fs.chmod(this.getsettingspath(), 0o755)
            await fs.chmod(this.getpath(), 0o755)

            this.state.status = "stopped";

            return true;

        }catch (e) {

            this.installfailed = {
                code : 500,
                error : 'cantcopy'
            }

            this.state.status = "stopped";

            throw this.installfailed
        }
    }

    remove = () => {

        this.stop()

        if(!this.needinstall()){

            try{
                fssync.rmdirSync(this.getsettingspath(), { recursive: true });
            }catch(e){

                console.log(e)

                return Promise.reject('path')
            }
            
        }

        return this.application.removeAll()
    }

    reinstall = () => {
        return this.remove().then(() => {
            return this.installManual()
        }).catch(e => {
            console.log(e)

            return Promise.reject(e)
        })
    }

    log = (data) => {

        try{
            const isBootstrapped100 = ({ data }) => data?.includes('Bootstrapped 100%');
            const isConnected = ({ data }) => (/Managed proxy .*: connected/g).test(data);
            const isBrokerFailure = ({ data }) => (/Managed proxy .*: broker failure/g).test(data);
            const isConnectionFailure = ({ data }) => (/Managed proxy .*: connection failed/g).test(data);
            const isRetryingConnection = ({ data }) => (/Retrying on a new circuit/g).test(data)

            console.log(data)
    
            if (isBrokerFailure(data) || isConnectionFailure(data)) {
                console.log("TOR connection lost")
                this.state.status = "failure"
            } else if (isBootstrapped100(data) || isConnected(data)) {
                console.log("TOR started")
                this.state.status = "started"
            } else if (isRetryingConnection(data)) {
                console.log("TOR retrying circuit")
                this.state.status = "running"
            }
        }
        catch(e){
            console.error(e)
        }
        
        // console.log(data)
    }

    start = async ()=>{

        console.log("START")

        if(this.instance) return true

        if(this.needinstall()) return false

        var configCreated = await this.makeConfig();

        if(!configCreated){
            console.log("tor config fail")
        }

        this.state.status = "running"

        await this.getpidandkill()

        this.instance = child_process.spawn(this.getpath(), [
            "-f",`${path.join(this.getsettingspath(), "torrc")}`,
        ], { 
            stdio: ['ignore'], 
            detached : false, 
            shell : false,
            env: {
                'LD_LIBRARY_PATH': this.getsettingspath()
            }
        })

        this.instance.on("error", (error) => this.log({ error }));

        this.instance.on("exit", async (code) => {

            this.stop()

            if(code){
                console.error(`TOR exit with code: ${code}`)
            }

            this.log({exit: code})
        });

        this.instance.stderr.on("data", (chunk) => this.log({error: String(chunk)}));
        this.instance.stdout.on("data", (chunk) => this.log({data: String(chunk)}));

        this.savepid(this.instance.pid)

        console.log("TOR running with pid: ", this.instance.pid)

        return true;
    }

    savepid = async (pid) => {
        try {
            await fs.writeFile(path.join(this.getsettingspath(), "tor.pid"), pid.toString(), { encoding: "utf-8"});
        }catch (e) {
            console.error(e)
        }
    }

    getpidandkill = async () => {

        try{

        var pid = await fs.readFile(path.join(this.getsettingspath(), "tor.pid"), {encoding: "utf-8"})

            if (pid){
                process.kill(+pid.toString(), 9)
            }
                
                
        }

        catch(e){

        }
    }

    stop = async ()=>{

        if (this.instance){
            try{
                process.kill(+pid.toString(), 9)
            }
            catch(e){

            }
        }

        this.state.status = "stopped"

        this.instance = null

        return true
    }

    restart = async() => {
        try{
            await this.stop()
            await this.start()
        }catch(e){
            console.error(e)
        }
        
    }

    info = (compact)=>{
        const stateNormalized = { ...this.state };
        delete stateNormalized.instance;

        return {
            enabled : this.settings.enabled2,
            useSnowflake : this.settings.useSnowflake,
            instance : this.instance ? this.instance.pid : null,
            state : {
                status : this.state.status
            },
            binPath : path.join(this.getpath()),
            dataPath : this.getsettingspath(),
            installed : !this.needinstall()
        }
    }

    destroy = async ()=>{
        
        this.stop();

        return this.application.destroy()
    }
}

const applicationRepository = {
    darwin:{
        bin: {
            name: "osx-latest.tgz",
            page: 'https://github.com/cenitelas/tor/releases/latest',
            url: 'https://api.github.com/repos/cenitelas/tor/releases/latest'
        },
    },
    win32:{
        bin: {
            name: "win-latest.tgz",
            page: 'https://github.com/cenitelas/tor/releases/latest',
            url: 'https://api.github.com/repos/cenitelas/tor/releases/latest'
        },
    },
    linux:{
        bin: {
            name: "linux-latest.tgz",
            page: 'https://github.com/cenitelas/tor/releases/latest',
            url: 'https://api.github.com/repos/cenitelas/tor/releases/latest'
        },
    }
}

module.exports = TorControl
