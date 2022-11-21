const path = require("path");
const child_process = require("child_process");
const Applications = require("./applications");
const f = require('../functions');
const fs = require("fs/promises");
const {settings} = require("express/lib/application");

class Helpers {
    bin_name = (name)=> {
        const win = `${name}.exe`
        const mac = name
        const linux = name
        return (process.platform == 'win32' ? win : (process.platform == 'darwin' ? mac : (process.platform == 'linux' ? linux : '')))
    }

    checkPath = async (pathname)=>{
        try {
            const stat = await fs.lstat(pathname)
            return { exists: true, isFolder: stat.isDirectory()};
        }catch (e) {
            return { exists: false, isFolder: null };
        }
    }
}

class TorControl {
    helpers = new Helpers();
    state = {
        instance: this,
        _status: 'stopped',
        get status() { return this._status },
        set status(stateValue) {
            this._status = stateValue;

            this.instance.statusListeners.forEach((statusListener) => {
                const isAnyListener = (statusListener.type === 'any');
                const isTargetListenerType = (statusListener.type === stateValue);

                if (isAnyListener || isTargetListenerType) {
                    statusListener.listener(stateValue);
                }
            });
        },
    };
    statusListeners = [];

    constructor(settings, proxy) {
        this.settings = {};
        this.settings.path = f.path(settings?.dbpath || "data/tor");
        this.settings.enable = settings?.enabled || false;
        this.application = new Applications(settings,applicationRepository, proxy)
    }

    onStatusChange = (listener) => {
        this.statusListeners.push({
            type: 'any',
            listener,
        });
    };

    offStatusChange = (listener) => {
        const listenerId = this.statusListeners.findIndex(l => (
          l.toString() === listener.toString()
        ));

        if (listenerId) {
            delete this.statusListeners[listenerId];
            this.statusListeners = this.statusListeners.flat();
        }
    };

    isStarted = () => (this.state.status === 'started');
    isStopped = () => (this.state.status === 'stopped');
    isInstalling = () => (this.state.status === 'install');
    isRunning = () => (this.state.status === 'running');

    onStarted = (listener) => this.statusListeners.push({ type: 'started', listener });
    onStopped = (listener) => this.statusListeners.push({ type: 'stopped', listener });
    onInstalling = (listener) => this.statusListeners.push({ type: 'install', listener });
    onRunning = (listener) => this.statusListeners.push({ type: 'running', listener });

    init = async ()=>{
        try {
            await this.folders();
            const checkRunning = await this.checkRunning(this.settings.path)
            if (checkRunning) {
                await this.stop();
            }

            const checkBin = await this.helpers.checkPath(path.join(this.settings.path, this.helpers.bin_name("tor")));
            if (!checkBin.exists) {
                await this.install()
            }

            if (this.settings.enable)
                return this.start();
        } catch (e) {
            this.state.status = "stopped";
        }
    }

    folders = async ()=>{
        const check = await this.helpers.checkPath(this.settings.path)
        if(!check.exists){
            try{
                await fs.mkdir(this.settings.path, { recursive: true });
            }catch(e){
                throw 'tordatapath'
            }
        }

        if(check.exists && !check.isFolder){
            await fs.rm(this.settings.path, { recursive: true })
            await this.folders();
        }
    }

    makeConfig = async ()=>{
        const check = await this.helpers.checkPath(this.settings.path)
        if(!check.exists){
            return
        }
        try {
            await fs.unlink(path.join(this.settings.path, "torrc"))
        }catch (e) {}
        await fs.writeFile(path.join(this.settings.path, "torrc"), `CookieAuthentication 1\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `DormantCanceledByStartup 1\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `DataDirectory ${path.join(this.settings.path, "data")}\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `Log notice stdout\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `AvoidDiskWrites 1\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `GeoIPFile ${path.join(this.settings.path, "geoip")}\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `GeoIPv6File ${path.join(this.settings.path, "geoip6")}\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `UseBridges 1\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `ClientTransportPlugin snowflake exec ${path.join(this.settings.path, "PluggableTransports", this.helpers.bin_name("snowflake-client"))}\n`, {flag: "a+"})
        await fs.writeFile(path.join(this.settings.path, "torrc"), `Bridge snowflake 192.0.2.3:1 url=https://snowflake-broker.torproject.net.global.prod.fastly.net/ front=cdn.sstatic.net ice=stun:stun.voip.blackberry.com:3478,stun:stun.altar.com.pl:3478,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.com:3478,stun:stun.sonetel.net:3478,stun:stun.stunprotocol.org:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478`, {flag: "a+"})
    }

    install = async ()=>{
        try{
            this.state.status = "install";
            const download = await this.application.download('bin', {user: "cenitelas", name: "tor"});
            await this.application.decompress(download.path, this.settings.path)
            await fs.unlink(download.path)
            await fs.chmod(this.settings.path, 0o755)
            await fs.chmod(path.join(this.settings.path, this.helpers.bin_name("tor")), 0o755)
            await this.makeConfig()
            //return this.application.save(download.asset)
            return true;
        }catch (e) {
            console.error(e)
            throw {
                code : 500,
                error : 'cantcopy'
            }
        }
    }

    start = async ()=>{
        const existsBin = await this.helpers.checkPath(path.join(this.settings.path,this.helpers.bin_name("tor")))
        if(!existsBin.exists){
            console.log("NO BIN")
            await this.install();
        }

        const checkRunning = await this.checkRunning()
        if(checkRunning){
            return true;
        }

        const log = (data)=>{
            console.log('data', data.data)
            if(data?.data?.indexOf("100%") >= 0){
                console.log("TOR started")
                this.state.status = "started"
            }
            // console.log(data)
        }

        this.state.status = "running"
        this.instance = child_process.spawn(path.join(this.settings.path, this.helpers.bin_name("tor")), [
            "-f",`${path.join(this.settings.path,"torrc")}`,
        ], { stdio: ['ignore'], detached : false, shell : false, env: {'LD_LIBRARY_PATH': this.settings.path}})
        this.instance.on("error", (err)=>log({error: err}));
        this.instance.on("exit", async (code) => {
            this.state.status = "stopped"
            try {
                await this.stop()
            }catch (e) {}
            if(code){
                console.error(`TOR exit with code: ${code}`)
            }
            log({exit: code})
        });
        this.instance.stderr.on("data", (chunk) => log({error: String(chunk)}));
        this.instance.stdout.on("data", (chunk) => log({data: String(chunk)}));
        if (this.instance?.pid){
            try {
                await fs.writeFile(path.join(this.settings.path, "tor.pid"), this.instance.pid.toString(), { encoding: "utf-8"});
            }catch (e) {
                console.error(e)
            }
        }
        console.log("TOR running with pid: ", this.instance?.pid)
        this.settings.enable = true;
        return true;
    }

    stop = async ()=>{
        const existsBin = await this.helpers.checkPath(path.join(this.settings.path,this.helpers.bin_name("tor")))
        if(!existsBin.exists){
            return true;
        }

        let pid = this.instance?.pid
        try {
            if(!pid || this.state.status === "stopped") {
                pid = await fs.readFile(path.join(this.settings.path, "tor.pid"), {encoding: "utf-8"})
            }
        }catch (e) {}
        if(pid) {
            try {
                process.kill(+pid.toString(), 9)
            }catch (e) {
                try {
                    this.instance?.kill(9)
                }catch (e) {}
            }finally {
                try{
                    await fs.unlink(path.join(this.settings.path, "tor.pid"))
                }catch (e) {}
            }
        }
        console.log("TOR stop")
        this.settings.enable = false;
        return true;
    }

    info = (compact)=>{
        const stateNormalized = { ...this.state };
        delete stateNormalized.instance;

        return {
            enabled : this.settings.enable,
            instance : !!this.instance,
            state : stateNormalized,
            binPath : path.join(this.settings.path, this.helpers.bin_name("tor")),
            dataPath : this.settings.path,
        }
    }

    checkRunning = async ()=> {
        try {
            const pid = await fs.readFile(path.join(this.settings.path, "tor.pid"), {encoding: "utf-8"})
            return process.kill(+pid, 0);
        } catch (error) {
            return false;
        }
    }

    destroy = async ()=>{
        await this.stop();
        return this.application?.destroy()
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
