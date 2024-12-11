class Manaflame extends Entity {
    charRef;
    percentage = 100;
    maxWidth = 30;
    maxHeight = 50;
    baseWidth = 30;
    baseHeight = 50;
    IMAGES = [
        "img/effects/flamme-0.png",
        "img/effects/flamme-1.png",
        "img/effects/flamme-2.png",
        "img/effects/flamme-3.png",
        "img/effects/flamme-4.png",
        "img/effects/flamme-5.png",
    ]

    constructor(characterRef) {
        super().loadImage("img/effects/flamme.gif");
        this.loadImages(this.IMAGES);
        this.charRef = characterRef;
        this.updatePos();
        this.updateSize();
    }


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
    
    updateSize(){
        setInterval(() => {
            this.width = (this.maxWidth * this.percentage / 100) * scaleX;
            this.height = (this.maxHeight * this.percentage / 100) * scaleY;
            this.playAnimation(this.IMAGES);
        }, 100);
    }

    
}