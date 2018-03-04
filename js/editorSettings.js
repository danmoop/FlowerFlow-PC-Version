const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;

var presentationObject;

document.getElementById('createPresentation').addEventListener('click', function(){

    presentationObject = {
        title: document.getElementById('p_title').value,
        description: document.getElementById('p_description').value
    }

    if(presentationObject.title && presentationObject.description) // I check in input form is not empty
    {
        ipc.send('openEditor', presentationObject);
    }

    else
    {
        dialog.showErrorBox("Error", "Presentation title or description can't be empty");
    }
});