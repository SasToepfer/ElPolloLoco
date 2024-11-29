class Spell extends Entity {
    damage = 20;

    constructor(x, y, otherDirection) {
        super().loadImage("img/effects/fireball.png");
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.castFireball();
        this.otherDirection = otherDirection
    }



    castFireball() {
        setInterval(() => {
            this.otherDirection ? this.x -= 2 : this.x += 2;
        }, 1.5);
        setInterval(() => {
            this.y += 0 + Math.random() * 2 - Math.random() * 2;
        }, 40);
    }


}