class Spell extends Entity {
    damage = 20;
    baseY;
    baseHeight;
    baseWidth;
    speed = 0;

    /**
     * Creates an instance of a spell.
     * @param {number} x - The x-coordinate of the spell in the world.
     * @param {number} y - The y-coordinate of the spell in the world.
     * @param {boolean} otherDirection - Indicates if the character is looking right (false) or left (true).
     * @param {boolean} [isChar=true] - Indicates if the spell is cast by the character. Defaults to true.
     * @param {number} [width=50] - The width of the spell. Defaults to 50.
     * @param {number} [height=50] - The height of the spell. Defaults to 50.
     * @param {boolean} [isEndboss=false] - Indicates if the spell is cast by an endboss. Defaults to false.
     * @param {boolean} [endbossAttack1=true] - Indicates if this is the first attack of the endboss. Defaults to true.
     */
    constructor(x, y, otherDirection, isChar = true, width = 50, height = 50, isEndboss = false, endbossAttack1 = true) {
        super()
        isChar ? this.loadImage("img/effects/charFBall.png") : this.loadImage("img/effects/enemyFBall.png");
        this.x = x;
        this.y = y;
        this.baseWidth = width;
        this.baseHeight = height;
        this.baseY = y;
        if (isEndboss) {
            endbossAttack1 ? this.castEndbossFireball() : this.castEndbossFireRain();
        } else {
            this.castFireball();
        }
        
        this.otherDirection = otherDirection
        this.updateDimensions();
    }

    /**
     * Updates the dimensions of the spell based on scaling factors.
     */
    updateDimensions() {
        this.width = this.baseWidth * scaleX;
        this.height = this.baseHeight * scaleY;
        this.y = this.baseY;

        this.collisionBox = {
            xOffset: (this.baseCollisionBox?.xOffset || 0) * scaleX,
            yOffset: (this.baseCollisionBox?.yOffset || this.baseHeight / 4) * scaleY,
            width: (this.baseCollisionBox?.width || this.baseWidth) * scaleX,
            height: (this.baseCollisionBox?.height || this.baseHeight / 2) * scaleY,
        };
    }

    /** 
     * Casts a fireball spell with random vertical movement.
     */
    castFireball() {
        setInterval(() => {
            this.otherDirection ? this.x -= 2 * scaleX : this.x += 2 * scaleX;
        }, 1.5);
        setInterval(() => {
            this.y += 0 + Math.random() * 2 - Math.random() * 2;
        }, 40);
    }

    /** 
     * Casts a fireball spell for an endboss with a fixed vertical movement.
     */
    castEndbossFireball(){
        setInterval(() => {
            this.otherDirection ? this.x -= 2 * scaleX : this.x += 2 * scaleX;
        }, 1.5);
        setInterval(() => {
            this.y += 4 * scaleY;
        }, 40);
    }

    /** 
     * Casts a fire rain attack for an endboss, increasing speed over time.
     */
    castEndbossFireRain(){
        this.loadImage("img/effects/meteor.png");
        setInterval(() => {
            this.speed = this.speed + 0.2;
            this.y += this.speed * scaleY;
        }, 40);
    }
}