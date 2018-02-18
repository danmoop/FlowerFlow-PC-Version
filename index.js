const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = require('electron').ipcMain;
const {app, BrowserWindow, Menu} = electron;
const Tray = require('electron').Tray;
const {dialog} = require('electron').dialog;
const remote = require('electron').remote;
const fs = require('fs');
const save_path = process.env.HOMEDRIVE + '\\FlowerFlow_Projects';

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
			label: 'Help',
			submenu:
			[
				{
					label: 'Reference',
					click() {
						let helpWindow;
						helpWindow = new BrowserWindow({width: 600, height: 600});
						helpWindow.loadURL('file://' + __dirname + '/sections/help.html');
						helpWindow.setMenu(null);
						//helpWindow.toggleDevTools();
					}
				}
			]
		}
	]

	mainWindow.loadURL('file://' + __dirname + '/sections/main.html');
	mainWindow.setMenu(Menu.buildFromTemplate(template));
	//mainWindow.toggleDevTools();

	if(!fs.existsSync(save_path))
	{
		fs.mkdir(save_path);
	}

});

ipc.on('presentation_saved', function(){
});