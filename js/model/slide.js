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

    getNumber()
    {
        return this.number;
    }

    setNumber(number)
    {
        this.number = number;
    }
}

module.exports = Slide;