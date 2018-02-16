const BrowserWindow = require('electron').remote.BrowserWindow;

const newWindowBtn = document.getElementById('getstartedbtn')

newWindowBtn.addEventListener('click', function (event) {
  let win = new BrowserWindow({ width: 1280, height: 768 });
  win.loadURL('https://www.google.ru');
});