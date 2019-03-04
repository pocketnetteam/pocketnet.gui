const electron = require('electron')
const os = require('os')
const autoUpdater = electron.autoUpdater
const appVersion = require('./package.json').version

let updateFeed = ''
let initialized = false
let loading = false;
const platform = `${os.platform()}_${os.arch()}`
const nutsURL = 'https://electron-autoupdater-starter-server.now.sh'

if (os.platform() === 'darwin') {
  updateFeed = `${nutsURL}/update/${platform}/${appVersion}`
} else if (os.platform() === 'win32') {
  updateFeed = `${nutsURL}/update/win32/${appVersion}`
}

function init(mainWindow) {
  mainWindow.webContents.send('console', `App version: ${appVersion}`)

  if (initialized || !updateFeed || process.env.NODE_ENV === 'development') { return }


  autoUpdater.setFeedURL(updateFeed)

  autoUpdater.on('error', (ev, err) => {
    mainWindow.webContents.send('updater-message', { msg: `${err}`, type : 'error' })
  })

  autoUpdater.once('checking-for-update', (ev, err) => {
    mainWindow.webContents.send('updater-message', { msg: 'checking-for-update', type : 'info', ev : ev })
  })

  autoUpdater.once('update-available', (ev, err) => {

    loading = true

    mainWindow.webContents.send('updater-message', { msg: 'update-available', type : 'info', ev : ev })
  })

  autoUpdater.once('download-progress', (ev, err) => {
    mainWindow.webContents.send('updater-message', { msg: 'update-available', type : 'info', ev : ev })
  })

  autoUpdater.once('update-not-available', (ev, err) => {
    mainWindow.webContents.send('updater-message', { msg: 'update-not-available', type : 'info', ev : ev })
  })

  autoUpdater.once('update-downloaded', (ev, err) => {
    mainWindow.webContents.send('updater-message', { msg : 'update-downloaded', type : 'info', ev : ev })
  })

  
}

var check = function(){
  if(!loading)

      autoUpdater.checkForUpdates()
}

module.exports = {
  init : init,
  check : check
}