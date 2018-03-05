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
    document.getElementById('p_desc').innerHTML = presentationObject.description;

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
            document.getElementById('slides').innerHTML = document.getElementById('slides').innerHTML + "<button class='btn btn-inverse slidebtn' id='"+presentationObject.slides[i].name+"'>"+presentationObject.slides[i].name+"</button>";
        }
    }

    document.querySelector('#slides').addEventListener('click', function(e){
		
		var project_btn = e.target;

        for(var i = 0; i < presentationObject.slides.length; i++)
        {
            if(e.target.id == presentationObject.slides[i].name)
            {
                ipc.send('openSlideEditor', presentationObject.slides[i]);
            }
        }

	});
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