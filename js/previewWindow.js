let slides;
var index;
var quill;

window.onload = function()
{
    createEditor();

    index = 0;
    slides = require('electron').remote.getCurrentWindow().slides;

    quill.clipboard.dangerouslyPasteHTML(slides[index].content);

    document.getElementById('nextSlide').addEventListener('click', function(){

        index++;

        if(index < slides.length)
        {
            quill.clipboard.dangerouslyPasteHTML(slides[index].content);
        }
        else
        {
            require('electron').remote.getCurrentWindow().close();
        }
    });
}

function createEditor()
{
    var options = {
        readOnly: true
    }

    quill = new Quill('#editor', options, {
        theme: 'snow',
    });
}