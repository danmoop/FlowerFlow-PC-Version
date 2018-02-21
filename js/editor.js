const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;

var presentationObject;

window.onload = function()
{
    presentationObject = require('electron').remote.getCurrentWindow().presentationObject;

    document.getElementById('p_title').innerHTML = presentationObject.title;

    ipc.send('presentation_saved', presentationObject);
}