class Mage extends Entity {
    baseWidth = 150;
    baseHeight = 250;
    baseY = 220;
    damage = 50;
    health = 10;
    baseCollisionBox = { xOffset: 60, yOffset: 50, width: 20, height: 180 }
    animState = "idle";
    IMAGES_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_CAST = [];
    IMAGES_HURT = [];
    world;
    otherDirection = false;

    /**
     * Creates an instance of the Mage.
     * @param {World} world - The world instance that the Mage belongs to.
     */
    constructor(world) {
        super().loadImage("img/Enemy/Mage/Mage_Idle/Mage_Idle0000.png");
        this.createImageArray(this.IMAGES_IDLE, "img/Enemy/Mage/Mage_Idle/Mage_Idle", 120);
        this.createImageArray(this.IMAGES_WALKING, "img/Enemy/Mage/Mage_Walk/Mage_Walk", 46);
        this.createImageArray(this.IMAGES_HURT, "img/Enemy/Mage/Mage_Hurt/", 30, 10);
        this.createImageArray(this.IMAGES_CAST, "img/Enemy/Mage/Mage_Attack/Mage_Attack", 80);
        this.audioManager.isSoundMute = world.audioManager.isSoundMute;
        this.x = world.character.x + world.canvas.width;
        this.speed = 0.4;
        this.world = world;
        this.updateDimensions();
        this.animate();
        this.nextAction();
    }

    /**
     * Handles the Mage's animation and state updates.
     */
    animate() {
        this.movement();
        this.animInterval = setInterval(() => {
            if (this.isDead()) 
                {
                    clearInterval();
                    return;
                }
            if (this.blockAnimation) {
                return
            } else if (this.animState == "cast") {
                this.playAnimationWithArgs(this.IMAGES_CAST, 30, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => {this.world.castEnemyFireball(this), this.audioManager.playAudio("mageCast")},35);
            } else if (this.animState == "walk") {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 30);
    }

    /**
     * Handles damage taken by the Mage and updates health accordingly.
     * @param {number} damage - The amount of damage to take.
     */
    takeDamage(damage) {
        if (this.health - damage > 0) {
            this.health -= damage;
        } else {
            clearInterval(this.animInterval);
            clearInterval(this.moveInterval);
            this.health = 0;
        }
        this.blockAnimation = false;
        this.audioManager.playAudio("mageDead");
        this.playAnimationWithArgs(this.IMAGES_HURT, 100, true, () => this.world.checkEnemyDead());
    }

    /**
     * Determines the next action of the Mage based on a random probability.
     */
    nextAction() {
        if (this.isDead())  {return;}
        let randomAction = Math.random() * 100;
        if (randomAction <= 50) {
            this.animState = "walk"
        } else if ( randomAction <= 80) {
            this.animState = "cast"
        } else {
            this.animState = "idle"
        }
        if (this.animState != "cast") {
            setTimeout(() => {
                this.nextAction();
            }, 6000); 
        }
    }

    /**
     * Handles the movement of the Mage.
     */
    movement() {
        this.moveInterval = setInterval(() => {
            if (this.animState != "walk" || this.fixedMovement) {
                return;
            }else {
                this.moveLeft();
            }
         }, 1000 / 100);
         
    }
}