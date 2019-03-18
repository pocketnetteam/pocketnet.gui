var open = require("open");
/*const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  
  return;
}*/

let win, nwin, badge;

var willquit = false;

const { app, BrowserWindow, Menu, Tray, ipcMain, Notification, nativeImage, dialog } = require('electron')

const Badge = require('./js/vendor/electron-windows-badge.js');

// AutoUpdate --------------------------------------
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');

var updatesLoading = false;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

function Log(text) {
    log.info(text);
}

autoUpdater.on('checking-for-update', (ev) => {
    win.webContents.send('updater-message', { msg: 'checking-for-update', type : 'info', ev : ev })
})
autoUpdater.on('update-available', (ev) => {

    updatesLoading = true

    win.webContents.send('updater-message', { msg: 'update-available', type : 'info', ev : ev })
})
autoUpdater.on('update-not-available', (ev) => {
    win.webContents.send('updater-message', { msg: 'update-not-available', type : 'info', ev : ev })
})
autoUpdater.on('error', (err) => {
    win.webContents.send('updater-message', { msg: `${err}`, type : 'error' })
})
autoUpdater.on('download-progress', (ev) => {
    win.webContents.send('updater-message', { msg: 'update-available', type : 'info', ev : ev })
})
autoUpdater.on('update-downloaded', (ev) => {

    updatesLoading = false
    
    win.webContents.send('updater-message', { msg : 'update-downloaded', type : 'info', ev : ev })
});
//---------------------------------------------------

let url = require('url')
let path = require('path')

var defaultTrayIcon = require('path').join(__dirname, 'assets/icons/win/icon.ico')

var badgeTrayIcon = require('path').join(__dirname, 'assets/icons/win/iconbadge.ico')

console.log('defaultTrayIcon', defaultTrayIcon)

/*
var defaultIcon = './assets/icons/win/icon.ico';
var badgeIcon = './assets/icons/win/iconbadge.ico';*/

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
        font: '12px Segue',
        color: '#f7244b'
    }

    badge = new Badge(win, bo);
}

function destroyBadge() {

    if (!badge) return

    badge.destroy()
    badge = null;
}

function createTray() {

    const defaultImage = nativeImage.createFromPath(defaultTrayIcon);
    const badgeImage = nativeImage.createFromPath(badgeTrayIcon);


    const tray = new Tray(defaultImage)

    tray.setImage(defaultImage)
    tray.setToolTip('Pocketnet');

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Open Pocketnet',
        click: function() {

            showHideWindow(true)


        }
    }, {
        label: 'Quit',
        click: function() {

            willquit = true

            app.quit()

        }
    }]);

    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        showHideWindow()
    })

    ipcMain.on('update-badge-tray', function(e, c) {
        if (!c) {
            tray.setImage(defaultImage)
        }

        if (c) {
            tray.setImage(badgeImage)
        }
    })

    win.on('show', () => {
        tray.setHighlightMode('always')
    })

    win.on('hide', () => {
        tray.setHighlightMode('never')
    })

   

    autoUpdater.on('before-quit-for-update', (ev) => {

        tray.destroy()
        
    });
}

function initApp() {
    createWindow();

    createBadge();

    createTray();

    log.info('First check updates...');

    autoUpdater.checkForUpdates();
    
    setTimeout(() => {
        autoUpdater.checkForUpdates();
    }, 10*60*1000);
}

function closeNotification() {
    if (nwin) {
        nwin.destroy()

        nwin = null;
    }
}

function notification(nhtml) {
    const screen = require('electron').screen;
    const mainScreen = screen.getPrimaryDisplay();

    if (nwin) {
        nwin.destroy()

        nwin = null;
    }

    var w = Math.min(mainScreen.size.width / 3, 550)
    var h = 140;


    nwin = new BrowserWindow({
        width: w,
        height: h,
        frame: false,
        title: 'New notification',
        x: mainScreen.size.width - w - 20,
        y: 20,
        skipTaskbar: true,
        useContentSize: true,
        resizable: false,
        movable: false,
        backgroundColor: '#020E1B',
        alwaysOnTop: true,
        show: false
    })

    nwin.loadFile('notifications.html', {
        search: encodeURIComponent(nhtml)
    })


    setTimeout(function(){
        nwin.show()
    }, 300)

    //nwin.webContents.openDevTools()
    setTimeout(closeNotification, 15000)
}

function createWindow() {

    const screen = require('electron').screen;
    const mainScreen = screen.getPrimaryDisplay();

    win = new BrowserWindow({
        width: mainScreen.size.width,
        height: mainScreen.size.height,

        /*frame: false, */
        //fullscreen : true,
        
        /*width : 800,
        height : 600,*/
        title: "Pocketnet",
        //show: false,
        webSecurity : false
    });

    win.maximize();
    //win.show();

    Menu.setApplicationMenu(null)

    win.loadFile('index_el.html')

    //win.webContents.openDevTools()

    win.webContents.on('new-window', function(event, url) {
        event.preventDefault();
        open(url);
    });

    win.on('close', function(e) {
        if (!willquit) {
            e.preventDefault();
            win.hide();
            destroyBadge()
        } else {
            win = null
            destroyBadge()
        }


    });

    win.webContents.session.webRequest.onHeadersReceived({}, (detail, callback) => {
        const xFrameOriginKey = Object.keys(detail.responseHeaders).find(header => String(header).match(/^x-frame-options$/i));
        
        if (xFrameOriginKey) {
            delete detail.responseHeaders[xFrameOriginKey];
        }

        callback({ cancel: false, responseHeaders: detail.responseHeaders });
    });

    ipcMain.on('electron-notification', function(e, nhtml) {

        notification(nhtml)

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

        autoUpdater.quitAndInstall(true, true)

    })

    // Вызывается, когда окно будет закрыто.


    return win
}


var r = app.requestSingleInstanceLock()

if (!r) {
    app.quit()
} else {
    app.on('second-instance', function(event, argv, cwd) {
        if (win) {

            if (win.isMinimized()) win.restore();

            win.show()
            win.focus();
        }
    })

    app.setAsDefaultProtocolClient('pocketnet')

    // Этот метод будет вызываться, когда Electron закончит 
    // инициализацию и готов к созданию окон браузера.
    // Некоторые интерфейсы API могут использоваться только после возникновения этого события.
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