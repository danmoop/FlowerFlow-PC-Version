const {app, BrowserWindow} = require('electron');

app.on('ready', function()
{
	var mainWindow = new BrowserWindow({width: 900, height:600, title: "appname"});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.webContents.openDevTools();
});