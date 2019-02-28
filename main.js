var open = require("open");
/*const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  
  return;
}*/

let win, nwin, badge;

var willquit = false;

const { app, BrowserWindow, Menu, Tray, ipcMain, Notification, nativeImage} = require('electron')

const Badge = require('./js/vendor/electron-windows-badge.js');


let url = require('url')

var defaultTrayIcon = require('path').join(__dirname, 'assets/icons/win/icon.ico')

var badgeTrayIcon = require('path').join(__dirname, 'assets/icons/win/iconbadge.ico')

console.log('defaultTrayIcon', defaultTrayIcon)

/*
var defaultIcon = './assets/icons/win/icon.ico';
var badgeIcon = './assets/icons/win/iconbadge.ico';*/

  function showHideWindow(show){

    if (win === null) {
      createWindow()
      createBadge()
    }
    else
    {
      if (win.isVisible() && !show){

          win.hide(); 
          destroyBadge();

      }
      else
      {

        win.show()
        createBadge()

      }
    }
  }
  function createBadge(){

    if(badge) return

    const bo = {
      font : '12px Segue',
      color : '#f7244b'
    }

    badge = new Badge(win, bo);
  }
  function destroyBadge(){

    if(!badge) return

    badge.destroy()
    badge = null;
  }

  function createTray(){

    const defaultImage =  nativeImage.createFromPath(defaultTrayIcon);
    const badgeImage =  nativeImage.createFromPath(badgeTrayIcon);


    const tray = new Tray(defaultImage)

    tray.setImage(defaultImage)
    tray.setToolTip('Pocketnet');

    const contextMenu = Menu.buildFromTemplate([{
        label: 'Open Pocketnet',
        click: function(){

          showHideWindow(true)

          
        }
    },{
        label: 'Quit',
        click: function(){

          willquit = true

          app.quit()

        }
    }]);

    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        showHideWindow()
    })

    ipcMain.on('update-badge-tray', function(e, c){
      if(!c){
        tray.setImage(defaultImage)
      }

      if(c){
        tray.setImage(badgeImage)
      }
    })

    win.on('show', () => {
        tray.setHighlightMode('always')
    })

    win.on('hide', () => {
        tray.setHighlightMode('never')
    })
  }

  function initApp(){
    createWindow();

    createBadge()

    createTray()
  }

  function closeNotification(){
    if(nwin){
      nwin.destroy()

      nwin = null;
    }
  }

  function notification(nhtml){
    const screen = require('electron').screen;
    const mainScreen = screen.getPrimaryDisplay();

    if (nwin) {
          nwin.destroy()

          nwin = null;
      }

      var w = Math.min(mainScreen.size.width / 3, 550)
      var h = 140;


      nwin  = new BrowserWindow({ 
        width: w, 
        height : h, 
        frame: false,
        title : 'New notification',
        x : mainScreen.size.width - w - 20,
        y : 20,
        //opacity  : 0,
        skipTaskbar  : true,
        useContentSize  : true,
        resizable : false,
        movable : false
      })

     /* var html = function(ht){

        var h = '<!DOCTYPE html>\
          <html>\
              <head>\
                  <meta charset="utf-8">\
                  <link rel="stylesheet" href="css/normalize.css?v=136">\
                  <link rel="stylesheet" href="css/elnotifications.css">\
                  <script src="js/jquery.min.js"></script>\
              </head>\
              <body id="application" class="menu-hide">'+ht+'\
              <script src="js/elnotifications.js"></script>\
              </body>\
          </html>'

          return h
      }

      var file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(html(nhtml));*/

      nwin.loadFile('notifications.html', {
        search : encodeURIComponent(nhtml)
      })
      //nwin.webContents.openDevTools()
      setTimeout(closeNotification, 15000)
  }

  function createWindow() {

    const screen = require('electron').screen;
    const mainScreen = screen.getPrimaryDisplay();

    win = new BrowserWindow({ 
      width: mainScreen.size.width, 
      height: mainScreen.size.height, /*frame: false, */ 
      //fullscreen : true,
      title : "Pocketnet"
    })
   
    Menu.setApplicationMenu(null)
  
    win.loadFile('index_el.html')
  
   // win.webContents.openDevTools()

    win.webContents.on('new-window', function(event, url){
      event.preventDefault();
      open(url);
    });
  
    win.on('close', function(e){
      if(!willquit){
          e.preventDefault();
          win.hide();
          destroyBadge()
      }
      else
      {          
        win = null
        destroyBadge()
      }

      
    });

    ipcMain.on('electron-notification', function(e, nhtml){
      
      notification(nhtml)
      
    })

    ipcMain.on('electron-notification-close', function(e){
      
      closeNotification()
      
    })

    ipcMain.on('electron-notification-click', function(e){

      if(win){
        win.show();
      }
      
      closeNotification()
      
    })

    // Вызывается, когда окно будет закрыто.
    

    return win
  }
  
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

  /*app.on('before-quit', (e) => {
    if(!willquit){
      e.preventDefault();

      win.hide()
      badge.destroy()
    }
  })*/

 
