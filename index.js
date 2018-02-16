const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = require('electron').ipcMain;

const {app, BrowserWindow, Menu} = electron;

let mainWindow = null;

app.on('ready', function(){
	mainWindow = new BrowserWindow({width: 1280, height: 768, minHeight: 600, minWidth: 600});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.setMenu(null);
});

ipc.on('mainIsOpened', function()
{
	const template = [
		{
		label: 'File',
			submenu:
			[
				{
					label: 'New Project'
				},
				{
					label: 'Open Project'
				}
			]
		},
		{
			label: 'View',
			submenu:
			[
				{
					label: 'Increase View'
				},
				{
					label: 'Decrease View'
				}
			]
		},
		{
			label: 'Help'
		}
	]

	mainWindow.loadURL('file://' + __dirname + '/sections/main.html');
	mainWindow.setMenu(Menu.buildFromTemplate(template));

	mainWindow.toggleDevTools();
});