const BrowserWindow = require('electron').remote.BrowserWindow;
const newWindowBtn = document.getElementById('getstartedbtn')
const ipc = require('electron').ipcRenderer;
const save_button = document.getElementById('presentationsave');
const fs = require('fs');
const save_path = process.env.HOMEDRIVE + '\\FlowerFlow_Projects';

save_button.addEventListener('click', function(){
    ipc.send('presentation_saved');
});