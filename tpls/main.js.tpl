global.WRITE_LOGS = process.argv.find(function(el) { return el.startsWith('--log'); })
if (global.WRITE_LOGS) {
    global.LOG_LEVEL = global.WRITE_LOGS.split("=").pop()
}

var open = require("open");

const {protocol, powerMonitor} = require('electron');

const ProxyInterface = require('./proxy16/ipc.js')
const IpcBridge =require('./js/electron/ipcbridge.js')

const { Bridge: TranscoderBridge } = require('./js/electron/transcoding2.js');
const { initFsFetchBridge } = require('./js/transports/fs-fetch.js');
const VideoDownload = require('./js/electron/video-download.js');

const electronLocalshortcut = require('electron-localshortcut');

var win, nwin, badge, tray, proxyInterface, ipcbridge;
var willquit = false;

const { app, BrowserWindow, Menu, MenuItem, Tray, ipcMain, Notification, nativeImage, dialog, globalShortcut, OSBrowser } = require('electron')
app.allowRendererProcessReuse = false

const FetchHandler = require('./js/transports2/fetch/handler.js');

// app.commandLine.appendSwitch('proxy-server', "socks5h://127.0.0.1:9050")

const Badge = require('./js/vendor/electron-windows-badge.js');

// AutoUpdate --------------------------------------
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
const is = require('electron-is');
const fs = require('fs');
const asyncFs = require('fs/promises');
const os = require("os");
const AutoLaunch = require('auto-launch');
const contextMenu = require('electron-context-menu');
const path = require('path');
const url = require('url');
const http = require('http');
const https = require('https');
const mime = require('mime-types');
const notifier = require('node-notifier');

contextMenu({
    showSearchWithGoogle : false,
    showCopyImageAddress : true,
    showSaveImageAs : true,
    showInspectElement : false
})

var updatesLoading = false;

<% if(silentupdate) {%>
    autoUpdater.silentUpdate = true
<% } %>

if (autoUpdater.silentUpdate || is.linux()) {
    autoUpdater.autoDownload = false;
    autoUpdater.autoInstallOnAppQuit = false;
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.on('checking-for-update', (ev) => {
    win.webContents.send('updater-message', { msg: 'checking-for-update', type: 'info', ev: ev })
})

autoUpdater.on('update-available', (ev) => {
    if (!is.linux()) updatesLoading = true
    win.webContents.send('updater-message', { msg: 'update-available', type: 'info', ev: ev, linux: is.linux(), macos: is.macOS(), silent: autoUpdater.silentUpdate })
})

autoUpdater.on('update-not-available', (ev) => {
    win.webContents.send('updater-message', { msg: 'update-not-available', type: 'info', ev: ev })
})

autoUpdater.on('error', (err) => {
    win.webContents.send('updater-message', { msg: `${err}`, type: 'error' })
})

autoUpdater.on('download-progress', (ev) => {
    win.webContents.send('updater-message', { msg: 'update-available', type: 'info', ev: ev })
})

autoUpdater.on('update-downloaded', (ev) => {
    updatesLoading = false
    win.webContents.send('updater-message', { msg: 'update-downloaded', type: 'info', ev: ev })
});
//---------------------------------------------------

var appName = global.TESTPOCKETNET ? 'BastyonTest' : 'Bastyon';

var defaultIcon = require('path').join(__dirname, 'res/electron/icons/win/icon.ico')
var defaultTrayIcon = require('path').join(__dirname, 'res/electron/icons/win/icon.ico')
var badgeTrayIcon = require('path').join(__dirname, 'res/electron/icons/win/iconbadge.ico')
if (global.TESTPOCKETNET) {
    defaultIcon = require('path').join(__dirname, 'res/electron/icons/win/test_icon.ico')
    defaultTrayIcon = require('path').join(__dirname, 'res/electron/icons/win/test_icon.ico')
    badgeTrayIcon = require('path').join(__dirname, 'res/electron/icons/win/test_iconbadge.ico')
}

if (is.linux()) {
    defaultIcon = require('path').join(__dirname, 'res/electron/icons/png/64x64.png')
    defaultTrayIcon = require('path').join(__dirname, 'res/electron/icons/png/32x32.png')
    badgeTrayIcon = require('path').join(__dirname, 'res/electron/icons/png/iconbadge.png')
}

if (is.macOS()) {
    defaultIcon = require('path').join(__dirname, 'res/electron/icons/mac/trayTemplate.png')
    defaultTrayIcon = require('path').join(__dirname, 'res/electron/icons/mac/trayTemplate.png')
    badgeTrayIcon = require('path').join(__dirname, 'res/electron/icons/mac/traybadgeTemplate.png')
}

var protocols = ['pocketnet', 'bastyon']
var currenturl = ''

function showHideWindow(show) {

    if (win === null) {

        createWindow()
        createBadge()

    } else {
        if (win.isVisible() && !show) {

            win.hide();
            destroyBadge();

        } else {

            win.show()
            createBadge()

        }
    }
}

function autoLaunchManage(enable){

    if (!is.macOS()){
        let autoLaunch = new AutoLaunch({
            name: appName,
            path: app.getPath('exe'),
            isHidden: true
        });

        if (enable)
            autoLaunch.enable();

        else
            autoLaunch.disable();
    }

}


function createBadge() {

    if (badge) return

    const bo = {
        font: '10px arial',
        color: '#f7244b'
    }

    badge = new Badge(win, bo);
}

function destroyBadge() {

    if (!badge) return

    badge.destroy()
    badge = null;
}

function quit(){
    willquit = true
    app.quit()
}

function destroyAppSafe(){
    if (ipcbridge)
        ipcbridge.destroy()

    // Check safe destroy
    if (proxyInterface){
        proxyInterface.candestroy().then(e => {
            if (!e.includes('nodeControl')) { // Destroy all
                destroyApp()
            } else { // Need first stop node
                dialog.showMessageBox(null, {
                    type: 'question',
                    buttons: ['Cancel', 'Yes, close'],
                    defaultId: 1,
                    title: 'Warning',
                    message: 'Your node is running. Close the app anyway?',
                }).then(r => {
                    if (r.response == 1) {
                        proxyInterface.nodeStop().then(e => {
                            destroyApp()
                        })
                    }
                })
            }

        })
    }
}

function destroyApp() {
    proxyInterface.destroy().then(r => {
        quit()
    }).catch(e => {
        quit()
    })
}

function createTray() {

    if (app && app.dock && app.dock.getMenu && app.dock.getMenu()){
        return;
    }

    var defaultImage = nativeImage.createFromPath(defaultTrayIcon);
    var badgeImage = nativeImage.createFromPath(badgeTrayIcon);

    tray = new Tray(defaultImage)

    tray.setImage(defaultImage)
    tray.setToolTip(appName);

    var contextMenu = Menu.buildFromTemplate([{
        label: 'Open',
        click: function() {
            if(is.macOS()){
                if(win.isDestroyed())
                    initApp()
                else
                    showHideWindow(true)
            }else {
                showHideWindow(true)
            }
        }
    }, {
        label: 'Quit',
        click: function() {

            destroyAppSafe()
                
        }
    }]);

    tray.setContextMenu(contextMenu);

    if (is.macOS()) {
        app.dock.setMenu(contextMenu)
        app.on('activate', () => {
            if(win.isDestroyed()) {
                initApp()
            }
        })
    }

    tray.on('click', () => {
        if (!is.macOS())
            showHideWindow()
    })

    ipcMain.on('update-badge-tray', function(e, c) {
        if (!tray) return;

        if (!c) {
            tray.setImage(defaultImage)
        }

        if (c) {
            tray.setImage(badgeImage)
        }
    })

    /*win.on('show', () => {
        if (!tray) return;
        try {
            tray.setHighlightMode('always')
        } catch {}
    })

    win.on('hide', () => {
        if (!tray) return;
        try {
            tray.setHighlightMode('never')
        } catch {}
    })*/
}

function destroyTray() {

    if (!tray) return

    tray.destroy()
    tray = null;

}

function createBadgeOS() {
    if (is.linux() || is.macOS()) {

        // Linux or macOS
        ipcMain.removeAllListeners('update-badge');
        ipcMain.on('update-badge', (event, badgeNumber) => {
                if (badgeNumber) {
                    app.setBadgeCount(badgeNumber);
                    if (is.macOS())
                        app.dock.setBadge(badgeNumber.toString())
                } else {
                    app.setBadgeCount(0);
                    if (is.macOS())
                        app.dock.setBadge('')
                }

                event.returnValue = 'success';
        });
    }

    if (is.windows()) {
        // Windows use plugin electron-windows-badge
        createBadge();
    }
}

function initApp() {

    app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

    createWindow();

    createBadgeOS();

    createTray();

    var isDevelopment = process.argv.find(function(el) { return el == '--development'; })

    if (isDevelopment) {
        //win.toggleDevTools();
    }

    autoUpdater.checkForUpdates();
    setInterval(() => {
        autoUpdater.checkForUpdates();
    }, 60 * 60 * 1000); // Every 1 hour  

    powerMonitor.on('suspend', () => {

        win.webContents.send('pause-message', { msg: 'pause', type: 'info' })

    })

    powerMonitor.on('resume', () => {

        win.webContents.send('resume-message', { msg: 'resume', type: 'info' })

    })

    powerMonitor.on('shutdown', () => {
        destroyAppSafe();
    });

}

function createWindow() {
    const screen = require('electron').screen;
    const mainScreen = screen.getPrimaryDisplay();

    win = new BrowserWindow({
        width: mainScreen.size.width,
        height: mainScreen.size.height,
        // electronnav

        /*titleBarStyle: 'hidden',
        titleBarOverlay: {
            color : "#FFFFFF",
            symbolColor : "#333333"
        },*/
        title: appName,
        webSecurity: false,
        

        icon: defaultIcon,

        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            allowRendererProcessReuse: false,
            spellcheck: true
        }
    });

    // win.webContents.session.setSpellCheckerLanguages(['en-US'])
    // const possibleLanguages = win.webContents.session.availableSpellCheckerLanguages


    win.webContents.session.setSpellCheckerLanguages(['en-US', 'ru'])

    electronLocalshortcut.register(win, 'f5', function() {
		refresh()
	})


	electronLocalshortcut.register(win, 'CommandOrControl+R', function() {
		refresh()
	})

  electronLocalshortcut.register(win, 'f5', function() {
		refresh()
	})


	electronLocalshortcut.register(win, 'CommandOrControl+R', function() {
		refresh()
	})

    var refresh = function(){
        win.reload()

        var ps = {}

        if (currenturl){
            ps.search = 'path=' + hexEncode(currenturl)
        }


        win.loadFile('index_el.html', ps).then(r => {
            win.webContents.clearHistory()
        })

    }

    ipcMain.on('electron-refresh', function(e, p) {
        refresh()
    })


    ipcMain.on('electron-url-changed', function(e, url) {

        currenturl = url

        win.setTitle('Bastyon')

    })

    win.webContents.on('context-menu', (event, params) => {
        const menu = new Menu()

        // Add each spelling suggestion
        for (const suggestion of params.dictionarySuggestions) {

          menu.append(new MenuItem({
            label: suggestion,
            click: () => win.webContents.replaceMisspelling(suggestion)
          }))
        }

        // Allow users to add the misspelled word to the dictionary
        if (params.misspelledWord) {
          menu.append(
            new MenuItem({
              label: 'Add to dictionary',
              click: () => win.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
            })
          )
        }

        //menu.popup()
    })

    let isHidden = process.argv.find(function(el) { return el == '--hidden'; })
    if (isHidden) {
        win.hide();
    } else {
        win.maximize();
    }

    if(is.macOS()){

        var isMac = true

        const template = [
            // { role: 'appMenu' }
            ...(isMac ? [{
              label: app.name,
              submenu: [

                { type: 'separator' },
                { role: 'hide', accelerator: 'Cmd+W', },
                { role: 'unhide' },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Cmd+Q',
                    click: async () => {
                      destroyAppSafe()
                    }
                }
              ]
            }] : []),
            // { role: 'fileMenu' }

            {
              label: 'Edit',
              submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                  { role: 'pasteAndMatchStyle' },
                  { role: 'delete' },
                  { role: 'selectAll' },
                  { type: 'separator' },
                  {
                    label: 'Speech',
                    submenu: [
                      { role: 'startSpeaking' },
                      { role: 'stopSpeaking' }
                    ]
                  }
                ] : [
                  { role: 'delete' },
                  { type: 'separator' },
                  { role: 'selectAll' }
                ])
              ]
            },
            // { role: 'viewMenu' }
            {
              label: 'View',
              submenu: [

                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
              ]
            },
            // { role: 'windowMenu' }
            {
              label: 'Window',
              submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac ? [
                  { type: 'separator' },
                  { role: 'front' },
                  { type: 'separator' },
                  { role: 'window' }
                ] : [
                  { role: 'close' }
                ])
              ]
            },
            {
              role: 'help',
              submenu: [
                {
                  label: 'Help center',
                  accelerator: 'Cmd+H',
                  click: async () => {
                    win.webContents.send('nav-message', { msg: 'help', type: 'action'})
                    }
                }
              ]
            }
          ]

          const menu = Menu.buildFromTemplate(template)
          Menu.setApplicationMenu(menu)
    }
    else{
        Menu.setApplicationMenu(null)
    }


    win.loadFile('index_el.html')

    electronLocalshortcut.register(win, 'CommandOrControl+Shift+I', () => {
        win.webContents.toggleDevTools()
    });

    win.webContents.on('new-window', function(event, url) {
        event.preventDefault();
        open(url);
    });

    win.on('close', function(e) {
        if (!willquit) {
            e.preventDefault();

            if (is.macOS()){
                if (win.isFullScreen()){
                    win.setFullScreen(false)
                    return
                }
            }

            

            win.webContents.send('win-cross')
            
            win.hide();
            destroyBadge()
            
        } else {
            destroyBadge()
            destroyTray()
            win = null
        }
    });

    win.webContents.session.webRequest.onHeadersReceived({ urls: [] }, (detail, callback) => {
        const xFrameOriginKey = Object.keys(detail.responseHeaders).find(header => String(header).match(/^x-frame-options$/i));

        if (xFrameOriginKey) {
            delete detail.responseHeaders[xFrameOriginKey];
        }

        callback({ cancel: false, responseHeaders: detail.responseHeaders });
    });



    ipcMain.on('electron-notification-small', async (e, p) => {
        let pathImage = defaultIcon;
        if(p.image){
            pathImage= await saveBlobToFile(p.image)
        }
        if (!is.windows()) {
            const n = new Notification({ title : p.title, body: p.body, silent :true, icon: pathImage})
            n.onclick = function(){

                if (win) {
                    win.show();
                    win.webContents.send('nav-message', { msg: 'userpage?id=notifications&report=notifications', type: 'action'})
                }
            }

            n.show()
        }
        else {

            notifier.notify(
                {
                    appID : 'app.pocketnet.gui',
                    title: p.title,
                    message: p.body,
                    icon: pathImage, // Absolute path (doesn't work on balloons)
                    wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
                },
                function (err, response, metadata) {

                    if (response != 'timeout' && !_.isEmpty(metadata))

                        if (win) {
                            win.show();
                            win.webContents.send('nav-message', { msg: 'userpage?id=notifications&report=notifications', type: 'action'})
                        }
                }
            );

        }

    })

    ipcMain.on('quitAndInstall', function(e) {

        willquit = true

        if (proxyInterface)
            proxyInterface.destroy().catch(e => {}).then(r => {
                autoUpdater.quitAndInstall(true, true)
            })

        if (ipcbridge)
            ipcbridge.destroy()

    })

    ipcMain.on('electron-checkForUpdates', function(e) {
        autoUpdater.checkForUpdates();
    })

    ipcMain.on('electron-autoLaunchManage', function(e, p) {

        console.log('autoLaunchManage', p)

        autoLaunchManage(p.enable)
    })

    const Storage = app.getPath('userData');

    /**
     * Video downloader handlers
     */
    VideoDownload.initHandlers(ipcMain, Storage);

    /**
     * Local files requestor bridge
     */
    initFsFetchBridge(ipcMain, Storage);

    /**
     * Video transcoding handler
     */
    new TranscoderBridge(ipcMain, Storage);

    class ProxyCommunicationLayer {
        constructor(ipc, functions) {
          this.ipc = ipc;
          this.functions = functions;
        }

        init() {
            FetchHandler.init(ipcMain, {
                fetchFunction: (...args) => this.functions.fetch(...args),
            });

          this.ipc.handle('AltTransportActive', async (event, url) => {
                return await this.functions.isAltTransportSet(url);
          });
        }

        destroy() {
          this.ipc.removeHandler('AltTransportActive');

          delete this.functions;
          delete this.ipc;
        }
      }

    proxyInterface = new ProxyInterface(ipcMain, win.webContents, ProxyCommunicationLayer);

    proxyInterface.init()


    ipcbridge = new IpcBridge(ipcMain, win.webContents)

    ipcbridge.actions.autoLaunchIsEnabled = function(d){

        console.log('autoLaunchIsEnabled', d)

        if (is.macOS()){
            return Promise.resolve(false)
        }

        let autoLaunch = new AutoLaunch({
            name: appName,
            path: app.getPath('exe'),
            isHidden: true
        });

        return autoLaunch.isEnabled().catch(e =>{
            return Promise.resolve(false)
        })
    }

    ipcbridge.init()

    // Вызывается, когда окно будет закрыто.
    return win
}

var geturlfromm3u8 = function(path){

    try{
        const playlistinfo = fs.readFileSync(path, { encoding:'utf8', flag:'r' });

        var iarray = playlistinfo.split(/\r\n|\n/)

        var str = _.find(iarray, (s) => {
            return s.indexOf('#EXT-X-MAP:URI') > -1
        })

        console.log('str', str)

        if (str){
            return str.split('",')[0].replace('#EXT-X-MAP:URI="', '')
        }
    }   
    catch(e){
        return null
    }
}

var _openlink = function(l, ini){
    if(_.find(protocols, function(p){
        if(l && l.indexOf(p + "://") > -1) return true
    })){
        var href = l

        _.each(protocols, function(p){
            href = href.replace(p + "://electron/",'').replace(p + "://",'')

            if(l.indexOf(p + "://") > -1) return true
        })

        if (href && href[href.length - 1] == '/') href = href.substr(0, href.length - 1)

        if(!href) href = 'index'

        setTimeout(function(){

            win.webContents.send('nav-message', { msg: href, type: 'action'})

        }, ini ? 3000 : 5)
    }
}

var openlink = function(argv, ini){

    var l = null

    if (argv && argv.length && argv[argv.length - 1] && argv[argv.length - 1]){
        l = argv && argv.length && argv[argv.length - 1] && argv[argv.length - 1]
    }


    _openlink(l, ini)

}

var r = app.requestSingleInstanceLock()

if(!r) {
    app.quit()
} else {

    openlink(process.argv, true)

    app.on('second-instance', function(event, argv, cwd) {

        openlink(argv)

        if (win) {

            if (win.isMinimized()) win.restore();

            win.show()
            win.focus();
        }
    })

    // If we are running a non-packaged version of the app && on windows

    _.each(protocols, function(protocol){
        app.setAsDefaultProtocolClient(protocol, process.execPath, [path.resolve(process.argv[1] || '.') ]);
    })


    app.on('ready', initApp)

    // Выйти, когда все окна будут закрыты.
    app.on('window-all-closed', () => {
        // Оставаться активным до тех пор, пока пользователь не выйдет полностью с помощью Cmd + Q,
        // это обычное дело для приложений и их строки меню на macOS
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })


    app.on('activate', () => {
        // На MacOS обычно пересоздают окно в приложении,
        // после того, как на иконку в доке нажали, и других открытых окон нету.
        if (win === null) {
            createWindow()
        }

        else{
            win.restore();
        }
    })

    if (is.macOS()){
        app.on('open-url', (event, url) => {

            _openlink(url, false)

            if (win) {

                if (win.isMinimized()) win.restore();

                win.show()
                win.focus();
            }
        })
    }
}

const saveBlobToFile = async (blob)=>{
    return new Promise((resolve, reject) => {
        if(!fs.existsSync(path.join(os.tmpdir(), "bastyon"))){
            fs.mkdirSync(path.join(os.tmpdir(), "bastyon"))
        }
        var base64Data = blob.replace(/^data:image\/png;base64,/, "");
        const pathImage = path.join(os.tmpdir(), "bastyon", `${Math.floor(Math.random() * 1000000000)}.png`);
        fs.writeFile(pathImage, base64Data, 'base64', function(err) {
            if(err){
                reject(err);
            }else{
                resolve(pathImage)
            }
        });
    });
};

var hexEncode= function(text){
    var ch = 0;
    var result = "";
    for (var i = 0; i < text.length; i++)
    {
        ch = text.charCodeAt(i);
        if (ch > 0xFF) ch -= 0x350;
        ch = ch.toString(16);
        while (ch.length < 2) ch = "0" + ch;
        result += ch;
    }
    return result;
}
