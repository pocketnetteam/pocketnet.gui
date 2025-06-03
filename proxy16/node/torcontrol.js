const path = require("path");
const child_process = require("child_process");
const Applications = require("./applications");
const f = require('../functions');
const fs = require("fs/promises");
const fssync = require("fs");
var kill = require('tree-kill');

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
            console.warn("Tor file was not found", pathname, e.message);

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
    timeoutIntervalId = null;
    timeoutCounter = null;

    constructor(settings, proxy) {
        this.settings = {...settings};

        this.application = new Applications(settings, applicationRepository, proxy, true)

        this.needinstall();
    }

    isStarted = () => (this.state.status === 'started');
    isStopped = () => (this.state.status === 'stopped');
    isInstalling = () => (this.state.status === 'install');
    isRunning = () => (this.state.status === 'running');

    onStarted = (listener) => this.listeners.push({ type: 'started', listener });
    onStopped = (listener) => this.listeners.push({ type: 'stopped', listener });
    onInstalling = (listener) => this.listeners.push({ type: 'install', listener });
    onRunning = (listener) => this.listeners.push({ type: 'running', listener });
    onAny = (listener) => this.listeners.push({ type: 'any', listener });

    init = async() => {
        try {

            await this.application.init();

            await this.folders();

            this.autorun().catch(e => {
                this.startFailed(e);
            });


        } catch (e) {
            this.startFailed(e);
        }
    }

    settingChanged = async(settings) => {
        var needRestart = false

        const isSnowflakeChanged = (settings.useSnowFlake !== this.settings.useSnowFlake);
        const isTorStateChanged = (settings.enabled2 !== this.settings.enabled2);

        const keepInstanceAlive = (
            settings.enabled2 === 'auto' && this.settings.enabled2 === 'always' ||
            settings.enabled2 === 'always' && this.settings.enabled2 === 'auto'
        );

        const isCustomObfs4Changed = (settings.customObfs4 !== this.settings.customObfs4);

        if(isSnowflakeChanged || isCustomObfs4Changed || (isTorStateChanged && !keepInstanceAlive)) {
            needRestart = true;
        }

        this.settings = {...settings};

        if (needRestart){
            try {
                await this.autorun()
            } catch (e) {
                this.startFailed(e);
            }
        }
    }

    startFailed = (err) => {
        console.log("Tor control failed to start:", err);
        this.state.status = "failed";
    }

    autorun = async () =>{

        if (this.instance || this.state.status !== 'stopped'){
            if (this.settings.enabled2 === 'neveruse'){
                await this.stop()
            } else {
                await this.restart()
            }
        } else {
            if (this.settings.enabled2 !== 'neveruse'){
                if (this.needinstall()){
                    await this.install();
                }
            }

            if (this.settings.enabled2 === 'always'){
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

        this.isInstalled = existsBin.exists;

        return !existsBin.exists;
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
        const useSnowFlake = this.settings.useSnowFlake || false;
        const customObfs4 = this.settings.customObfs4 || null;
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
            "stun.l.google.com:19302",
            "stun.antisip.com:3478",
            "stun.bluesip.net:3478",
            "stun.dus.net:3478",
            "stun.epygi.com:3478",
            "stun.sonetel.com:3478",
            "stun.sonetel.net:3478",
            "stun.uls.co.za:3478",
            "stun.voipgate.com:3478",
            "stun.voys.nl:3478",
            "relay1.expressturn.com:443",
            "relay2.expressturn.com:443",
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

        if (useSnowFlake) {
            torConfig.push(
                "# Bridges configurations\n",

                "UseBridges 1",
                `ClientTransportPlugin snowflake exec ${getSettingsPath("pluggable_transports", this.helpers.bin_name("snowflake-client"))}`,
                `Bridge snowflake 192.0.2.4:80 8838024498816A039FCBBAB14E6F40A0843051FA fingerprint=8838024498816A039FCBBAB14E6F40A0843051FA url=https://snowflake-broker.torproject.net/ ampcache=https://cdn.ampproject.org/ fronts=www.google.com,cdn.ampproject.org utls-imitate=hellorandomizedalpn ice=stun:stun.nextcloud.com:443,stun:stun.sipgate.net:10000,stun:stun.epygi.com:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.bethesda.net:3478,stun:stun.mixvoip.com:3478,stun:stun.voipia.net:3478`,
                `Bridge snowflake 192.0.2.3:80 2B280B23E1107BB62ABFC40DDCC8824814F80A72 fingerprint=2B280B23E1107BB62ABFC40DDCC8824814F80A72 url=https://snowflake-broker.torproject.net/ ampcache=https://cdn.ampproject.org/ fronts=www.google.com,cdn.ampproject.org utls-imitate=hellorandomizedalpn ice=stun:stun.nextcloud.com:443,stun:stun.sipgate.net:10000,stun:stun.epygi.com:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.bethesda.net:3478,stun:stun.mixvoip.com:3478,stun:stun.voipia.net:3478`
            )


            

            /*

            https://forum.torproject.org/t/fix-problems-with-snowflake-since-2024-03-01-broker-failure-unexpected-error-no-answer/11755

            option 1 Azure

            Bridge snowflake 192.0.2.3:80 2B280B23E1107BB62ABFC40DDCC8824814F80A72 fingerprint=2B280B23E1107BB62ABFC40DDCC8824814F80A72 url=https://snowflake-broker.azureedge.net/ fronts=ajax.aspnetcdn.com ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.com:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn

            Bridge snowflake 192.0.2.4:80 8838024498816A039FCBBAB14E6F40A0843051FA fingerprint=8838024498816A039FCBBAB14E6F40A0843051FA url=https://snowflake-broker.azureedge.net/ fronts=ajax.aspnetcdn.com ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.net:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn

            option 2 CDN77
            
            Bridge snowflake 192.0.2.3:80 2B280B23E1107BB62ABFC40DDCC8824814F80A72 fingerprint=2B280B23E1107BB62ABFC40DDCC8824814F80A72 url=https://1098762253.rsc.cdn77.org/ fronts=docs.plesk.com,www.phpmyadmin.net ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.com:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn

            Bridge snowflake 192.0.2.4:80 8838024498816A039FCBBAB14E6F40A0843051FA fingerprint=8838024498816A039FCBBAB14E6F40A0843051FA url=https://1098762253.rsc.cdn77.org/ fronts=docs.plesk.com,www.phpmyadmin.net ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.net:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn
            
            option 3 AMP cache

            Bridge snowflake 192.0.2.3:80 2B280B23E1107BB62ABFC40DDCC8824814F80A72 fingerprint=2B280B23E1107BB62ABFC40DDCC8824814F80A72 url=https://snowflake-broker.torproject.net/ ampcache=https://cdn.ampproject.org/ front=www.google.com ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.com:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn

            Bridge snowflake 192.0.2.4:80 8838024498816A039FCBBAB14E6F40A0843051FA fingerprint=8838024498816A039FCBBAB14E6F40A0843051FA url=https://snowflake-broker.torproject.net/ ampcache=https://cdn.ampproject.org/ front=www.google.com ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.com:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn
            
            option 4 Fastly

            Bridge snowflake 192.0.2.3:80 2B280B23E1107BB62ABFC40DDCC8824814F80A72 fingerprint=2B280B23E1107BB62ABFC40DDCC8824814F80A72 url=https://snowflake-broker.torproject.net.global.prod.fastly.net/ fronts=www.shazam.com,www.cosmopolitan.com,www.esquire.com ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.com:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn

            Bridge snowflake 192.0.2.4:80 8838024498816A039FCBBAB14E6F40A0843051FA fingerprint=8838024498816A039FCBBAB14E6F40A0843051FA url=https://snowflake-broker.torproject.net.global.prod.fastly.net/ fronts=www.shazam.com,www.cosmopolitan.com,www.esquire.com ice=stun:stun.l.google.com:19302,stun:stun.antisip.com:3478,stun:stun.bluesip.net:3478,stun:stun.dus.net:3478,stun:stun.epygi.com:3478,stun:stun.sonetel.net:3478,stun:stun.uls.co.za:3478,stun:stun.voipgate.com:3478,stun:stun.voys.nl:3478 utls-imitate=hellorandomizedalpn


            
            */
        } else if (customObfs4) {
            torConfig.push(
                "# Custom OBFS4 bridges configurations\n",

                "UseBridges 1",
                `ClientTransportPlugin obfs4 exec ${getSettingsPath("pluggable_transports", this.helpers.bin_name("obfs4proxy"))} managed`,

                customObfs4.map(b => `Bridge ${b}`).join('\n'),
            )
        }

        torConfig = torConfig.join('\n');

        try{
            await fs.writeFile(path.join(this.getsettingspath(), "torrc"), torConfig, {flag: "a+"})

            console.log("Tor config successfully created");
        }catch(e) {
            console.error("Tor config was not created:", e.message);
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

        try {

            this.state.status = "install";

            const download = await this.application.download('bin', {user: "shpingalet007", name: "tor-builds"});
            await this.application.decompress(download.path, this.getsettingspath())
            await fs.unlink(download.path)
            await fs.chmod(this.getsettingspath(), 0o755)
            await fs.chmod(this.getpath(), 0o755)

            this.state.status = "stopped";

            this.needinstall();

            return true;

        } catch (e) {

            this.installfailed = {
                code : 500,
                error : 'cantcopy'
            };

            this.state.status = "failed";

            throw this.installfailed;
        }
    }

    remove = () => {
        this.stop()

        if(!this.needinstall()){

            try{
                fssync.rmdirSync(this.getsettingspath(), { recursive: true });
            }catch(e){
                console.log("Failed to delete Tor folder:", e.message)

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

            //console.log("Tor:", data)

            if (isBrokerFailure(data) || isConnectionFailure(data)) {
                console.warn("Tor connection lost")
                return
            } else if (isBootstrapped100(data)) {
                console.log("Tor instance started again")
                this.state.status = "started"
                return
            } else if (isRetryingConnection(data)) {
                console.warn("Tor retrying circuit")
                return
                //this.state.status = "running"
            }

            
        }
        catch(e){
            console.error(e)
        }
    }

    startTimer = () => {
        const minutes5 = 5 * 60 * 1000;
        this.timeoutCounter = minutes5;

        this.timeoutIntervalId = setInterval(() => {
            this.timeoutCounter -= 5000;

            if (this.timeoutCounter <= 0) {
                console.log("Tor was idle for 5 minutes, switching it off");

                this.stop();
                this.timeoutCounter = null;
                clearInterval(this.timeoutIntervalId);
            }
        }, 5000);
    }

    resetTimer = () => {
        const minutes5 = 5 * 60 * 1000;
        this.timeoutCounter = minutes5;
    }

    start = async ()=>{
        console.log("Tor start triggered");

        if (this.needinstall()) {
            if (this.state.status === 'install') {
                return false;
            } if (this.settings.enabled2 === 'neveruse') {
                this.state.status = "stopped";
                return false;
            } else {
                try {
                    await this.install();
                } catch (e) {
                    console.log("Tor failed to install:", e);
                    this.state.status = "failed";
                }
            }
        }

        if (this.settings.enabled2 === 'neveruse') return false;

        if (this.state.status !== "stopped") return true;

        this.state.status = "running"

        if (this.settings.enabled2 === 'auto') {
            this.startTimer()
        }

        var configCreated = await this.makeConfig();

        if(!configCreated){
            console.log("Tor config creation failed")
        }

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

        console.log('this.getpath()', this.getpath(), this.getsettingspath())

        this.instance.on("error", (error) => {

            this.stop()

            this.log({ error })
        });

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

        console.log("Tor running with pid:", this.instance.pid)

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
        let pid;

        if (this.instance) {
            pid = +this.instance.pid.toString();
        } else {
            const torPidFile = path.join(this.getsettingspath(), 'tor.pid');

            try {
                pid = await fs.readFile(torPidFile, { encoding: 'utf-8' });
            } catch (err) {
                return Promise.resolve(false);
            }
        }

        return new Promise((resolve) => {
            kill(+pid.toString(), (err) => {
                if (err) {
                    console.error('Unable to kill TOR instance', err);
                    resolve(false);
                    return;
                }

                resolve(true);
            });
        });
    }

    stop = async ()=>{

        if (this.instance){
            try{
                await this.getpidandkill()
            }
            catch(e){
                console.warn('Tor instance kill error:', e.message)
            }
        }

        this.state.status = "stopped"

        this.instance = null
        this.installfailed = null

        clearInterval(this.timeoutIntervalId);
        this.timeoutIntervalId = null;

        return true
    }

    restart = async() => {
        try{
            await this.stop()
            setTimeout(() => this.start(), 2000);
        }catch(e){
            console.error(e)
        }

    }

    info = (compact)=>{
        const stateNormalized = { ...this.state };
        delete stateNormalized.instance;

        var info = {
            enabled : this.settings.enabled2,
            useSnowFlake : this.settings.useSnowFlake,
            customObfs4 : this.settings.customObfs4,
            installed : this.isInstalled
        }

        info.state = {
            status : this.state.status
        }

        if(!compact){
            info.instance = this.instance ? this.instance.pid : null
            info.binPath = path.join(this.getpath())
            info.dataPath = this.getsettingspath()
        }

        return info
    }

    destroy = async ()=>{

        this.stop();

        return this.application.destroy()
    }
}

const applicationRepository = {
    darwin_x64:{
        bin: {
            name: "macos-x86_64.tar.gz",
            page: 'https://github.com/shpingalet007/tor-builds/releases/latest',
            url: 'https://api.github.com/repos/shpingalet007/tor-builds/releases/latest'
        },
    },
    win32_x86:{
        bin: {
            name: "windows-i686.tar.gz",
            page: 'https://github.com/shpingalet007/tor-builds/releases/latest',
            url: 'https://api.github.com/repos/shpingalet007/tor-builds/releases/latest'
        },
    },
    win32_x64:{
        bin: {
            name: "windows-x86_64.tar.gz",
            page: 'https://github.com/shpingalet007/tor-builds/releases/latest',
            url: 'https://api.github.com/repos/shpingalet007/tor-builds/releases/latest'
        },
    },
    linux_x86:{
        bin: {
            name: "linux-i686.tar.gz",
            page: 'https://github.com/shpingalet007/tor-builds/releases/latest',
            url: 'https://api.github.com/repos/shpingalet007/tor-builds/releases/latest'
        },
    },
    linux_x64:{
        bin: {
            name: "linux-x86_64.tar.gz",
            page: 'https://github.com/shpingalet007/tor-builds/releases/latest',
            url: 'https://api.github.com/repos/shpingalet007/tor-builds/releases/latest'
        },
    }
}

module.exports = TorControl
