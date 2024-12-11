class Statusbar extends Actor {
    percentage = 100;
    maxWidth;
    baseWidth;
    baseHeight;
    baseY;

    constructor(isFrame, x, y, width, height) {
        super();
        this.x = x;
        this.baseY = y;
        this.baseWidth = width;
        this.baseHeight = height;
        this.maxWidth = this.baseWidth;

        isFrame 
            ? this.loadImage("img/stats/HP_Bar_Frame.png") 
            : this.loadImage("img/stats/HP_Bar_Background.png");
        this.setPercentage(100);
        this.updateDimensions();
    }

    setPercentage(percentage) {
        this.width = this.baseWidth * (percentage / 100); 
    }

    updateDimensions() {
        this.height = this.baseHeight * scaleY; 
        this.y = this.baseY * scaleY;
    }
}
