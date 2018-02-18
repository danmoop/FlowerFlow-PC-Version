const BrowserWindow = require('electron').remote.BrowserWindow;
const newWindowBtn = document.getElementById('getstartedbtn')
const ipc = require('electron').ipcRenderer;
const save_button = document.getElementById('presentationsave');
const fs = require('fs');
const save_path = process.env.HOMEDRIVE + '\\FlowerFlow_Projects';

save_button.addEventListener('click', function(){
    ipc.send('presentation_saved');
});

window.onload = function()
{
    ipc.send('request_file_list');
}

ipc.on('refreshPage', function(event){
    location.reload();
});

ipc.on('displayFiles', function(event, data){
    console.log(data);

	for(let projectFile of data)
	{
		fs.readFile(save_path+"\\"+projectFile, function(err, data)
		{
			 if(data != null)
			 {
                 let presentation_Object = JSON.parse(data.toString());
                 
                 document.getElementById('allProjects').innerHTML = document.getElementById('allProjects').innerHTML + "<button class='b wh project-box-danger btn'>"+presentation_Object.title+"</button>";
			 }
		 });
	}
});