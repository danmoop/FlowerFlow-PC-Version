const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;

document.getElementById('createSlide').addEventListener('click', function(){

    if(document.getElementById('slide_name').value) // I check if input form is not empty
    {
        slideInfo = {
            name: document.getElementById('slide_name').value
        }
    
        ipc.send('createSlide', slideInfo);
    }

    else
    {
        dialog.showErrorBox("Error", "Slide name can't be empty");
    }
});