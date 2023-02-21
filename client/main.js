const { app, BrowserWindow } = require('electron') 
const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

const createMainWindow =() =>{

    const window = new BrowserWindow({
        title:'Soccer News',
        width:isDev?1000:500,
        height:600
    });

    //open dev tools in dev environment
    if(isDev){
        window.webContents.openDevTools()
    }
    window.loadFile(path.join(__dirname , "./src/index.html"))

}

app.whenReady().then(() => {
    createMainWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })