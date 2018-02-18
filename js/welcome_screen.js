const BrowserWindow = require('electron').remote.BrowserWindow;
const newWindowBtn = document.getElementById('getstartedbtn')
const ipc = require('electron').ipcRenderer;
const presentation_btn = document.getElementById('presentationsave');

newWindowBtn.addEventListener('click', function () {
  ipc.send('mainIsOpened');
});