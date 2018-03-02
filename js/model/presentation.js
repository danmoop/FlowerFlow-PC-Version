class Presentation
{
    constructor(title, description, slides)
    {
        this.title = title;
        this.description = description;
        this.slides = slides;
    }

    addSlide(slide)
    {
        this.slides.push(slide);
    }
}

module.exports = Presentation;