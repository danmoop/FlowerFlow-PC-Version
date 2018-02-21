const ipc = require('electron').ipcRenderer;

var presentationObject;

document.getElementById('createPresentation').addEventListener('click', function(){

    presentationObject = {
        title: document.getElementById('p_title').value,
        description: document.getElementById('p_description').value
    }

    ipc.send('openEditor', presentationObject);
});