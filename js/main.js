const BrowserWindow = require('electron').remote.BrowserWindow;
const newWindowBtn = document.getElementById('getstartedbtn')
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const remote = require('electron').remote;
const save_path = process.env.HOMEDRIVE + '\\FlowerFlow_Projects';
const dialog = require('electron').remote.dialog;

window.onload = function()
{
    ipc.send('request_file_list');
}

ipc.on('refreshPage', function(event){
    location.reload();
});

ipc.on('displayFiles', function(event, data){
	for(let projectFile of data)
	{
		fs.readFile(save_path+"\\"+projectFile, function(err, data)
		{			
			if(data != null)
			{
                let presentation_Object = JSON.parse(data.toString());
                 
                document.getElementById('allProjects').innerHTML = document.getElementById('allProjects').innerHTML + "<button class='b wh project-box-danger btn'>"+presentation_Object.title+"<a id='"+presentation_Object.title+"'"+" href='#/'><i class='far fa-trash-alt pull-right'></i></a></button>";
			}
		 });
	}

	
	document.querySelector('#allProjects').addEventListener('click', function(e){
		var p = e.target.closest('a'); 
		console.log(p.id + ' is deleted');

		dialog.showMessageBox({
            buttons: ['Yes', 'No'],
            message: 'Do you really want to delete this project?'
        }, function (response) {
            if (response === 0) { 
				fs.unlink(save_path+"\\"+p.id+'.flower');
				location.reload();
            }
        });
	});

});

document.getElementById('createProjectBtn').addEventListener('click', function(){
	ipc.send('openEditorSettings');
});