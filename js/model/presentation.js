class Presentation
{
    constructor(title, description)
    {
        this.title = title;
        this.description = description;
        this.slides = [];
    }

    getTitle()
    {
        return this.title;
    }

    getDescription()
    {
        return this.description;
    }

    getSlides()
    {
        return this.slides;
    }

    setTitle(title)
    {
        this.title = title;
    }

    setDescription(description)
    {
        this.description = description;
    }

    addSlide(slide)
    {
        this.slides.push(slide);
    }
}

module.exports = Presentation;