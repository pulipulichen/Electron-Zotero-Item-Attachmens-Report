/* global __dirname, process */

const {
  app,
  BrowserWindow,
  globalShortcut 
} = require('electron')

const path = require('path')
const url = require('url')

const config = require('./config.js')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // darwin = MacOS
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    //width: 400,
    //height: 400,
    //maximizable: false,
    icon: path.join(__dirname, './client/img/icon/favicon.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.removeMenu()

  win.maximize()

  win.loadURL(url.format({
    pathname: path.join(__dirname, './client/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open DevTools.
  if (config.debug.openDevTools === true) {
    win.webContents.openDevTools()
  }

  // When Window Close.
  win.on('closed', () => {
    win = null
  })

  globalShortcut.register('Ctrl+W', () => {
    win.close()
  })
  
  let escPressed = false
  globalShortcut.register('ESC', () => {
    if (escPressed === true) {
      win.close()
      return false
    }
    
    escPressed = true
    setTimeout(() => {
      escPressed = false
    }, 500)
  })
}

var ipc_main = require('./server/electron-server.js');
ipc_main.setup();