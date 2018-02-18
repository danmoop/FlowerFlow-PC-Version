const BrowserWindow = require('electron').remote.BrowserWindow;
const newWindowBtn = document.getElementById('getstartedbtn')
const ipcSender = require('electron').ipcRenderer;
const presentation_btn = document.getElementById('presentationsave');

newWindowBtn.addEventListener('click', function () {
  ipcSender.send('mainIsOpened');
});