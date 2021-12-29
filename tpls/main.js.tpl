var open = require("open");
/*const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  
  return;
}*/

const {protocol} = require('electron');
//const ProxyInterface = require('./proxy/mainserver.js')

const ProxyInterface = require('./proxy16/ipc.js')

const electronLocalshortcut = require('electron-localshortcut');

var win, nwin, badge, tray, proxyInterface;
var willquit = false;

const { app, BrowserWindow, Menu, MenuItem, Tray, ipcMain, Notification, nativeImage, dialog, globalShortcut, OSBrowser } = require('electron')
app.allowRendererProcessReuse = false

const Badge = require('./js/vendor/electron-windows-badge.js');

// AutoUpdate --------------------------------------
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
const is = require('electron-is');
const os = require('os');
const fs = require('fs');
const checkDiskSpace = require('check-disk-space').default;
const ffmpeg = require('fluent-ffmpeg');
const ffprobe = require('ffprobe-static');

ffmpeg.setFfprobePath(ffprobe.path);

var updatesLoading = false;

if (is.linux()) {
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
    win.webContents.send('updater-message', { msg: 'update-available', type: 'info', ev: ev, linux: is.linux(), macos: is.macOS() })
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

let url = require('url')
let path = require('path')

var defaultIcon = require('path').join(__dirname, 'res/electron/icons/win/icon.ico')
var defaultTrayIcon = require('path').join(__dirname, 'res/electron/icons/win/icon.ico')
var badgeTrayIcon = require('path').join(__dirname, 'res/electron/icons/win/iconbadge.ico')

if (is.linux()) {
    defaultIcon = require('path').join(__dirname, 'res/electron/icons/png/64x64.png')
    defaultTrayIcon = require('path').join(__dirname, 'res/electron/icons/png/32x32.png')
    badgeTrayIcon = require('path').join(__dirname, 'res/electron/icons/png/iconbadge.png')
}

if (is.macOS()) {
    defaultIcon = require('path').join(__dirname, 'assets/icons/mac/trayTemplate.png')
    defaultTrayIcon = require('path').join(__dirname, 'assets/icons/mac/trayTemplate.png')
    badgeTrayIcon = require('path').join(__dirname, 'assets/icons/mac/traybadgeTemplate.png')
}

var protocols = ['pocketnet', 'bastyon']

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

function createTray() {

    var defaultImage = nativeImage.createFromPath(defaultTrayIcon);
    var badgeImage = nativeImage.createFromPath(badgeTrayIcon);

    tray = new Tray(defaultImage)

    tray.setImage(defaultImage)
    tray.setToolTip('__VAR__.project'); ///

    var contextMenu = Menu.buildFromTemplate([{
        label: 'Open',
        click: function() {
            showHideWindow(true)
        }
    }, {
        label: 'Quit',
        click: function() {

            proxyInterface.destroy().then(r => {

                quit()

            }).catch(e => {

                quit()

            })

        }
    }]);

    tray.setContextMenu(contextMenu);

    if (is.macOS()) {
        app.dock.setMenu(contextMenu)
        app.on('activate', () => {
            showHideWindow(true)
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
    } else {

        log.info('First check updates...');

        autoUpdater.checkForUpdates();

        setInterval(() => {
            autoUpdater.checkForUpdates();
        }, 10 * 60 * 1000);
    }

    const { powerMonitor } = require('electron')

    powerMonitor.on('suspend', () => {

        win.webContents.send('pause-message', { msg: 'pause', type: 'info' })

    })

    powerMonitor.on('resume', () => {

        win.webContents.send('resume-message', { msg: 'resume', type: 'info' })

    })

}

function closeNotification() {
    if (nwin) {
        nwin.destroy()

        nwin = null;
    }
}

function notification(nhtml, p) {

    if (is.macOS()) {
        return
    }

    const screen = require('electron').screen;
    const mainScreen = screen.getPrimaryDisplay();

    if (nwin) {
        nwin.destroy()

        nwin = null;
    }

    var w =  Math.min(mainScreen.size.width / 3, 510)
    var h = 135;

    if(!p) p = {}
    if (p.size == 'medium') h = 110
    if (p.size == 'small') h = 90

    nwin = new BrowserWindow({
        width: w,
        height: h,
        frame: false,
        title: 'New notification',
        x: mainScreen.size.width - w - 5,
        y: 5,
        skipTaskbar: true,
        useContentSize: true,
        resizable: false,
        movable: false,
        backgroundColor: '#020E1B',
        alwaysOnTop: true,
        show: false,
        focusable: false,
        parent : win,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    nwin.loadFile('notifications.html', {
        search: encodeURIComponent(nhtml)
    })


    setTimeout(function() {
        if (nwin)
            nwin.show()

       // nwin.webContents.toggleDevTools()
    }, 300)

    setTimeout(closeNotification, 15000)
}

function createWindow() {
    const screen = require('electron').screen;
    const mainScreen = screen.getPrimaryDisplay();

    win = new BrowserWindow({
        width: mainScreen.size.width,
        height: mainScreen.size.height,

        title: "__VAR__.project", ///
        webSecurity: false,

        icon: defaultIcon,

        webPreferences: {
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
		win.reload()
        win.loadFile('index_el.html')
	})
    
	electronLocalshortcut.register(win, 'CommandOrControl+R', function() {
		win.reload()
        win.loadFile('index_el.html')
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
                      quit()
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




    ipcMain.on('electron-notification', function(e, p) {

        notification(p.html, p.settings || {})

    })

    ipcMain.on('electron-notification-close', function(e) {

        closeNotification()

    })

    ipcMain.on('electron-notification-click', function(e) {

        if (win) {
            win.show();
        }

        closeNotification()

    })

    ipcMain.on('quitAndInstall', function(e) {

        willquit = true

        proxyInterface.destroy().then(r => {
            autoUpdater.quitAndInstall(true, true)
        })

    })

    ipcMain.on('electron-checkForUpdates', function(e) {

        autoUpdater.checkForUpdates();

    })

    ipcMain.on('transcode-video-request', async function(e, filePath) {
        const tempDir = os.tmpdir();

        /**
         * Enumeration for Resolutions of videos
         * @type {Object.<string, [string, string]>}
         */
        const Resolution = {
            p240: [352, 240],
            p360: [640, 360],
            p480: [854, 480],
            p720: [1280, 720],
        };

        /**
         * Transcoding progress data
         * @type {Object.<string, number>}
         */
        let progressKeeper = {
            //p240: 0,
            //p360: 0,
            //p480: 0,
            p720: 0,
        };

        /**
         * Overall transcoding progress calculation function
         * @param {string} key - Transcoding key in object
         * @param {number} value - Percents to add in processKeeper
         *
         * @returns {number} percents
         */
        function calcProgress(key, value) {
            progressKeeper[key] = value;

            const videosElems = Object.values(progressKeeper);
            const countVideos = videosElems.length;

            const fullPercent = countVideos * 100;
            const sumPercent = videosElems.reduce((partial_sum, a) => partial_sum + a, 0);

            return 100 / fullPercent * sumPercent;
        }

        /**
         * Video transcoder function
         *
         * @param {string} filePath
         * @param {[string, string]} resolution
         *
         * @returns {Promise<Buffer>} result
         */
        function transcodeVideo(filePath, resolution) {
            function randomId(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return result;
            }

            async function executor(resolve, reject) {
                let triesCount = 0;

                /**
                 * @typedef {Object} ResolutionObject
                 * @property {number} width - Video width
                 * @property {number} height - Video height
                 */

                /**
                 * @returns {Promise<ResolutionObject>}
                 */
                function getVideoResolution() {
                    return new Promise((resolve, reject) => {
                        ffmpeg.ffprobe(filePath, (err, meta) => {
                            if (err) {
                                reject('Error accessing video file');
                            }

                            const { width, height } = meta.streams[0];

                            resolve({ width, height });
                        });
                    });
                }

                function startTranscoding() {
                    try {
                        const fileName = `transvideo-${randomId(6)}.temp.mp4`;
                        const fileLocation = path.join(tempDir, fileName);

                        console.log('Created temporary file', fileLocation);
                        fs.writeFileSync(fileLocation);

                        ffmpeg(filePath)
                            .withVideoCodec('libx264')
                            .withAudioCodec('libmp3lame')
                            .withSize(resolution.join('x'))
                            .format('mp4')
                            .on('progress', (progress) => {
                                console.log('Processing: ' + progress.percent + '% done');
                                e.reply('transcode-video-progress', calcProgress(`p${resolution[1]}`, progress.percent));
                            })
                            .on('error', (err) => {
                                console.error('FFmpeg error occurred:', err);
                                e.reply('transcode-video-progress', calcProgress(`p${resolution[1]}`, 100));
                                reject(err);
                            })
                            .on('end', () => {
                                resolve(fs.readFileSync(fileLocation));
                                fs.unlink(fileLocation, () => {
                                    console.log('Purged temporary file');
                                });
                            })
                            .saveToFile(fileLocation);
                    } catch (err) {
                        console.error('Error occurred:', err);

                        if (triesCount <= 3) {
                            triesCount++;
                            startTranscoding();
                        } else {
                            reject(err);
                        }
                    }
                }

                const originalResolution = await getVideoResolution(filePath);
                const isWidthUpscaling = (originalResolution.width < resolution[0]);
                const isHeightUpscaling = (originalResolution.height < resolution[1]);

                const isUpscaling = (isWidthUpscaling || isHeightUpscaling);

                if (isUpscaling) {
                    reject('Upscaling is disabled');
                    return;
                }

                startTranscoding();
            }

            return new Promise(executor);
        }

        const spaceCalc = await checkDiskSpace(tempDir);
        const fileSize = fs.statSync(filePath).size;

        const isEnoughSpace = (spaceCalc.free > fileSize * 1.5);

        if (!isEnoughSpace) {
            const err = 'NO_DISK_SPACE';
            e.reply('transcode-video-response', null, err);
            return;
        }

        /** Writing transcoded alternatives to target object */
        let videos = {
            //p240: transcodeVideo(filePath, Resolution.p240),
            //p360: transcodeVideo(filePath, Resolution.p360),
            //p480: transcodeVideo(filePath, Resolution.p480),
            p720: transcodeVideo(filePath, Resolution.p720),
        };

        /** While all aren't fulfilled, waiting... */
        await Promise.allSettled(Object.values(videos));

        const resolutions = Object.keys(videos);

        const transcodedResults = {};

        /**
         * Extracting values of promises as e.reply doesn't
         * support this type of objects.
         */
        for (const size of resolutions) {
            const promise = videos[size];

            let buffer;

            try {
                buffer = await promise;
            } catch (e) {
                console.log('Rejected promise');
            }

            if (buffer) {
                transcodedResults[size] = buffer;
            }
        }

        /**
         * Return error if no transcoding made.
         * In this case client must use original.
         */
        if (!Object.keys(transcodedResults).length) {
            /** Responding with error if the is one */
            const err = 'NO_TRANSCODED';
            e.reply('transcode-video-response', null, err);
            return;
        }

        e.reply('transcode-video-response', transcodedResults);
    })

    proxyInterface = new ProxyInterface(ipcMain, win.webContents)
    proxyInterface.init()

    // Вызывается, когда окно будет закрыто.
    return win
}


var openlink = function(argv, ini){

    var l = null

    if (argv && argv.length && argv[argv.length - 1] && argv[argv.length - 1]){
        l = argv && argv.length && argv[argv.length - 1] && argv[argv.length - 1]
    }


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

        console.log("href", href)

        setTimeout(function(){

            win.webContents.send('nav-message', { msg: href, type: 'action'})

        }, ini ? 3000 : 5)
    }
    
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
    })




}
