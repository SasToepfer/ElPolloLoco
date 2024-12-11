class Manarune extends Entity {
    x = 200;
    baseY = 415;
    baseWidth = 120;
    baseHeight = 50;
    baseCollisionBox = { xOffset: 20, yOffset: 0, width: 80, height: 50 }
    
    constructor() {
        super().loadImage("img/effects/rune.png");
        this.updateDimensions();
    }
}