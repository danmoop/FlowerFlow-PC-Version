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

ipc.on('displayFiles', function(event, data)
{
	for(let projectFile of data)
	{
		fs.readFile(save_path+"\\"+projectFile, function(err, data)
		{			
			if(data != null)
			{
                let presentation_Object = JSON.parse(data.toString());
                 
                document.getElementById('allProjects').innerHTML = document.getElementById('allProjects').innerHTML + "<button class='b wh project-box-danger btn' id='fl-prsnt_"+presentation_Object.title+"'>"+presentation_Object.title+"<a id='"+presentation_Object.title+"'"+" href='#/'><i class='far fa-trash-alt pull-right' style='margin-top: 20px;'></i></a><p class='wh' style='font-size: 15px;'>"+presentation_Object.description+"</p></button>";
			}
		 });
	}
	
	if(data.length == 0)
	{
		document.getElementById('allProjects').innerHTML = "<p class='b wh'>Oops, there is nothing here yet</p>";
	}
	
	document.querySelector('#allProjects').addEventListener('click', function(e){
		
		
		var project_btn = e.target;

		if(project_btn.id.includes("fl-prsnt"))
		{
			buttonObject = {
				id: project_btn.id
			}

			ipc.send('openProject', buttonObject);
		}
		
		var delete_btn = e.target.closest("a"); 
		if(!delete_btn.id.includes("fl-prsnt"))
		{
			dialog.showMessageBox({
				buttons: ['Yes', 'No'],
				message: 'Do you really want to delete this project?'
			}, function (response) {
				if (response === 0) { 
					fs.unlink(save_path+"\\"+delete_btn.id+'.flower');
					location.reload();
				}
			});
		}

		console.log(e.target);

	});

});

document.getElementById('createProjectBtn').addEventListener('click', function(){
	ipc.send('openEditorSettings');
});