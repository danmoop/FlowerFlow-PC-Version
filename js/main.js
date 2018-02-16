const BrowserWindow = require('electron').remote.BrowserWindow;
const newWindowBtn = document.getElementById('getstartedbtn')
const ipc = require('electron').ipcRenderer;


newWindowBtn.addEventListener('click', function () {

  ipc.send('mainIsOpened');
});