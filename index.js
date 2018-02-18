const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = require('electron').ipcMain;
const {app, BrowserWindow, Menu} = electron;
const Tray = require('electron').Tray;
const remote = require('electron').remote;
const fs = require('fs');
const save_path = process.env.HOMEDRIVE + '\\FlowerFlow_Projects';
const Presentation = require('./js/model/presentation');
const dialog = require('electron').dialog;

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
						helpWindow = new BrowserWindow({width: 600, height: 600, resizable: false});
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

	/*
	* If I start application for the first time, 
	there is no folder for projects, so it creates it
	*/
	if(!fs.existsSync(save_path))
	{
		fs.mkdir(save_path);
	}


	/*
	* I get all the presentations from folder, then they should be displayed in html page
	*/
	fs.readdir(save_path, function(err, files) {
		if (err) {
			
		} else {
		   for(let projectFile of files)
		   {
			   fs.readFile(save_path+"\\"+projectFile, function(err, data)
			   {
					if(data != null)
					{
						console.log(projectFile);
					}
				});
		   }
		}
	});

});


/*
* This function saves presentation file to presentation folder on HOMEDRIVE
* File has the same name as the presentation
*/
ipc.on('presentation_saved', function()
{
	var presentation = new Presentation("title", "desc12312312");

	fs.writeFile(save_path+"/"+presentation.title+".flower", JSON.stringify(presentation), function(err) {
		if(err) {
			console.log(err);
		} else {
			dialog.showMessageBox({ message: "Presentation has been saved to " + save_path,
			buttons: ["OK"] })
		}
	});
});