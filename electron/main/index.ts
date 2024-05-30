import { BrowserWindow, Menu, Notification, Tray, app, ipcMain, nativeImage, screen, shell } from 'electron'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
// @ts-ignore
import { ENearTheScreenEdgeType } from '../../src/hooks/useDrag'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
let tray: Tray | null = null;
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')
const iconPath = path.join(process.env.VITE_PUBLIC, "logo.png")
const logoPath = path.join(process.env.VITE_PUBLIC, "logo.ico")

const createTray = () => {
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', type: 'normal', click: () => app.quit() },
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('芒果钟')
  tray.setTitle('芒果钟')
}

async function createWindow() {
  win = new BrowserWindow({
    title: '芒果钟',
    icon: nativeImage.createFromPath(logoPath),
    width: 80,
    height: 40,
    type: "toolbar",
    frame: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  const winBounds = win.getBounds();
  const winScreen = screen.getDisplayNearestPoint({ x: winBounds.x, y: winBounds.y });

  // 鼠标抬起后，进行边缘检测
  ipcMain.on('onMouseUp', (channel, args) => {
    const { width: screenWidth, height: screenHeight } = winScreen.bounds
    if (args.x + 80 >= screenWidth) {
      win.webContents.send('testWindowOnScreenEdge', { edge: ENearTheScreenEdgeType.RIGHT })
      win.setBounds({ x: screenWidth - 20, y: args.y })
    } else if (args.x <= 0) {
      win.webContents.send('testWindowOnScreenEdge', { edge: ENearTheScreenEdgeType.LEFT })
      win.setBounds({ x: -60, y: args.y })
    } else if (args.y + 40 >= screenHeight) {
      win.webContents.send('testWindowOnScreenEdge', { edge: ENearTheScreenEdgeType.BOTTOM })
      win.setBounds({ x: args.x, y: screenHeight - 20 })
    } else if (args.y <= 0) {
      win.webContents.send('testWindowOnScreenEdge', { edge: ENearTheScreenEdgeType.TOP })
      win.setBounds({ x: args.x, y: -20 })
    } else {
      win.webContents.send('testWindowOnScreenEdge', { edge: undefined })
    }
  })

  // 鼠标悬浮后，显示时钟
  ipcMain.on('onMouseEnter', (channel, args) => {
    const { width: screenWidth, height: screenHeight } = winScreen.bounds
    const { edge } = args
    switch (edge) {
      case ENearTheScreenEdgeType.TOP:
        win.setBounds({ y: 0 })
        break;
      case ENearTheScreenEdgeType.BOTTOM:
        win.setBounds({ y: screenHeight })
        break;
      case ENearTheScreenEdgeType.LEFT:
        win.setBounds({ x: 0 });
        break;
      case ENearTheScreenEdgeType.RIGHT:
        win.setBounds({ x: screenWidth })
        break;
    }
  })

  // 鼠标拖拽
  ipcMain.on("suspensionWindowMove", (channel, args) => {
    win.setBounds({ x: args.x, y: args.y, width: 80, height: 40 })
  });

  // 番茄完成后显示通知
  ipcMain.on('showNotification', (channel, args) => {
    new Notification({
      title: args.title || "番茄钟",
      body: args.body || "您完成了一个番茄"
    }).show()
  })

  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    // win.webContents.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(indexHtml)
  }

  win.setAlwaysOnTop(true, 'screen-saver')

  // Test actively push message to the Electron-Renderer测
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(() => {
  createWindow()
  createTray()
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
