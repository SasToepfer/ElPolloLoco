class Manaflame extends Entity {
    charRef;
    percentage = 100;
    maxWidth = 30;
    maxHeight = 50;
    baseWidth = 30;
    baseHeight = 50;
    IMAGES = [
        "img/effects/flamme0.png",
        "img/effects/flamme1.png",
        "img/effects/flamme2.png",
        "img/effects/flamme3.png",
        "img/effects/flamme4.png",
        "img/effects/flamme5.png",
    ]

    /**
     * Creates an instance of the Manaflame.
     * @param {Character} characterRef - The reference to the character associated with the mana flame.
     */
    constructor(characterRef) {
        super().loadImage("img/effects/flamme0.png");
        this.loadImages(this.IMAGES);
        this.charRef = characterRef;
        this.updatePos();
        this.updateSize();
    }

    /**
     * Updates the position of the mana flame based on the character's position and direction.
     */
    updatePos(){
        setInterval(() => {
            if (this.charRef.otherDirection) {
                this.x = this.charRef.x + this.charRef.width / 3 - this.width / 2;
            } else {
                this.x = this.charRef.x + this.charRef.width / 1.5 - this.width /2 ;
            }
            this.y = (this.charRef.y + (this.maxHeight / 3 * scaleY) + this.height / -1.25);
        }, 5);
    }
    
    /**
     * Updates the size of the mana flame based on the current percentage.
     */
    updateSize(){
        setInterval(() => {
            this.width = (this.maxWidth * this.percentage / 100) * scaleX;
            this.height = (this.maxHeight * this.percentage / 100) * scaleY;
            this.playAnimation(this.IMAGES);
        }, 100);
    }

    
}