class Statusbar extends Actor {
    percentage = 100;
    maxWidth = 180;

    constructor(isFrame, x, y, width, height) {
        isFrame ? super().loadImage("img/stats/HP_Bar_Frame.png") : super().loadImage("img/stats/HP_Bar_Background.png");
        this.x = x;
        this.y = y;
        this.width = width;
        this.maxWidth = width;
        this.height = height;
        
    }
    
    setPercentage(percentage) {
        this.width = this.maxWidth * (percentage / 100);
    }

}