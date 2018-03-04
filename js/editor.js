const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;
const Slide = require('./model/slide');
const fs = require('fs');
const save_path = process.env.HOMEDRIVE + '\\FlowerFlow_Projects';

var presentationObject;

window.onload = function()
{
    presentationObject = require('electron').remote.getCurrentWindow().presentationObject;
    document.getElementById('p_title').innerHTML = presentationObject.title;

    ipc.send('presentation_saved', presentationObject);

    document.getElementById('addSlide_Btn').addEventListener('click', function(){
        addNewSlide(presentationObject);
    });

    console.log(presentationObject);

    if(presentationObject.slides.length == 0)
    {
        document.getElementById('slides').innerHTML = "<p>No slides created yet</p>";
    }

    else
    {
        for(var i = 0; i < presentationObject.slides.length; i++)
        {
            document.getElementById('slides').innerHTML = document.getElementById('slides').innerHTML + "<button class='btn btn-inverse slidebtn'>"+presentationObject.slides[i].name+"</button>";
        }
    }
}

ipc.on('saveSlideToProject', function(event, slideInfo){
    let slide = new Slide(slideInfo.name);

    presentationObject.addSlide(slide);

    console.log(presentationObject);
    
    saveChanges(presentationObject);
});

function addNewSlide(project)
{
    ipc.send('openSlideSettings');
}

function saveChanges(project)
{
    fs.writeFile(save_path+"/"+project.title+".flower", JSON.stringify(project), function(err) 
    {
		if(err) {
			console.log(err);
		} else {
            console.log('Saved successfully');
            location.reload();
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
    var quill = new Quill('#editor', {
        modules: {
        toolbar: toolbarOptions
        },
        theme: 'snow'
    });
}