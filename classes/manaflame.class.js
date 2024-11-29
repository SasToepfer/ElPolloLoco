class Manaflame extends Entity {
    charRef;
    percentage = 100;
    maxWidth = 60;
    maxHeight = 100;
    width = 60;
    height = 100;

    constructor(characterRef) {
        super().loadImage("img/effects/fireball.png");
        this.charRef = characterRef;
        this.updatePos();
        this.updateSize();

    }

    updatePos(){
        setInterval(() => {
            if (this.charRef.otherDirection) {
                this.x = this.charRef.x + this.charRef.width / 3 - this.width / 2;
                this.y = this.charRef.y + this.maxHeight / 3 + this.height / -1.25;
            } else {
                this.x = this.charRef.x + this.charRef.width / 1.5 - this.width /2 ;
                this.y = this.charRef.y + this.maxHeight / 3 + this.height / -1.25;
            }
            
        }, 5);
    }
    
    updateSize(){
        setInterval(() => {
            this.width = this.maxWidth * this.percentage / 100;
            this.height = this.maxHeight * this.percentage / 100;
        }, 100);
    }

    
}