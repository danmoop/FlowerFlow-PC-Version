const remote = require('electron').remote;
const dialog = require('electron').remote.dialog;
const fs = require('fs');
const save_path = process.env.HOMEDRIVE + '\\FlowerFlow_Projects';

let slideObject;
let project;
var quill;
let slideContent;

window.onload = function()
{
    slideObject = require('electron').remote.getCurrentWindow().slideObject;
    project = require('electron').remote.getCurrentWindow().presentationObject;

    document.getElementById('slide_name').innerHTML = slideObject.name;

    document.title = "FlowerFlow - " + slideObject.name;

    createEditor();

    /*if(slideObject.content == "")
        document.getElementById('editor').value = "Hello! Start by typing here!";
    else
        document.getElementById('editor').value = slideObject.content;*/

    document.getElementById('editor').nodeValue = "Hello world";

    document.getElementById('slideSaveChanges').addEventListener('click', function(){
        
        slideContent = quill.container.firstChild.innerHTML;

        for(var i = 0; i < project.slides.length; i++)
        {
            if(slideObject.name == project.slides[i].name)
            {
                console.log(project.slides[i]);
                project.slides[i].content = slideContent;
            }
        }

        save();      
    });
}

function save()
{
    fs.writeFile(save_path+"/"+project.title+".flower", JSON.stringify(project), function(err) 
    {
		if(err) {
			console.log(err);
		} else {
			dialog.showMessageBox({
				buttons: ['Ok'],
				message: 'Changes saved'
            });
		}
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
    quill = new Quill('#editor', {
        modules: {
        toolbar: toolbarOptions
        },
        theme: 'snow'
    });
    if(slideObject.content == "")
        quill.setText("Hello! Start by typing here!");
    else
        quill.clipboard.dangerouslyPasteHTML(slideObject.content);
}