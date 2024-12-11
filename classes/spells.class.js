class Spell extends Entity {
    damage = 20;
    baseY;
    baseHeight;
    baseWidth;

    constructor(x, y, otherDirection) {
        super().loadImage("img/effects/fireball.png");
        this.x = x;
        this.y = y;
        this.baseWidth = 50; // Spezifische Werte für Spell
        this.baseHeight = 50;
        this.baseY = y;
        this.castFireball();
        this.otherDirection = otherDirection
        this.updateDimensions();
    }

    updateDimensions() {
        this.width = this.baseWidth * scaleX;
        this.height = this.baseHeight * scaleY;
        this.y = this.baseY;

        this.collisionBox = {
            xOffset: (this.baseCollisionBox?.xOffset || 0) * scaleX,
            yOffset: (this.baseCollisionBox?.yOffset || 0) * scaleY,
            width: (this.baseCollisionBox?.width || this.baseWidth) * scaleX,
            height: (this.baseCollisionBox?.height || this.baseHeight) * scaleY,
        };
    }

    castFireball() {
        setInterval(() => {
            this.otherDirection ? this.x -= 2 * scaleX : this.x += 2 * scaleX;
        }, 1.5);
        setInterval(() => {
            this.y += 0 + Math.random() * 2 - Math.random() * 2;
        }, 40);
    }
}