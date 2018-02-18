class Slide
{
    constructor(text)
    {
        this.text = text;
    }

    getText()
    {
        return this.text;
    }

    setText(text)
    {
        this.text = text;
    }
}

module.exports = Slide;