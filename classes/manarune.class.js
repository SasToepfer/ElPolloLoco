class Manarune extends Entity {
    x = 200;
    y = 415;
    width = 120;
    height = 50;
    collisionBox = { xOffset: 20, yOffset: 0, width: 80, height: 50 }
    
    constructor() {
        super().loadImage("img/effects/rune.png");
        
    }
}