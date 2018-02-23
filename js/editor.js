const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const Slide = require('./model/slide');

var presentationObject;

window.onload = function()
{
    presentationObject = require('electron').remote.getCurrentWindow().presentationObject;
    document.getElementById('p_title').innerHTML = presentationObject.title;

    ipc.send('presentation_saved', presentationObject);

    /*
    Editor html:

    <div id="editor">
        <p>Welcome to editor!</p>
    </div>

    */
    document.getElementById('addSlide_Btn').addEventListener('click', function(){
        console.log('slide added');
    });
}

function createEditor()
{
         
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],             
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],     
        [{ 'indent': '-1'}, { 'indent': '+1' }],        
        [{ 'direction': 'rtl' }],                         
        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ];
    var quill = new Quill('#editor', {
        modules: {
        toolbar: toolbarOptions
        },
        theme: 'snow'
    });
}