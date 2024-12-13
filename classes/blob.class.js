class Blob extends Entity {
    baseWidth = 100;
    baseHeight = 100;
    baseY = 360;
    damage = 40;
    health = 20;
    baseCollisionBox = { xOffset: 30, yOffset: 50, width: 40, height: 40 }
    animState = "idle";
    IMAGES_ATTACK = [];
    IMAGES_WALKING = [];
    IMAGES_HURT = [];
    world;
    otherDirection = false;

    /**
     * Creates an instance of the Blob.
     * @param {World} world - The world instance that the Blob belongs to.
     */
    constructor(world) {
        super().loadImage("img/Enemy/Blob/Blob_Walk/Poring_Walk0000.png");
        this.createImageArray(this.IMAGES_ATTACK, "img/Enemy/Blob/Blob_Attack/Poring_Attack", 78);
        this.loadImages(this.IMAGES_ATTACK);
        this.createImageArray(this.IMAGES_WALKING, "img/Enemy/Blob/Blob_Walk/Poring_Walk", 51);
        this.loadImages(this.IMAGES_WALKING);
        this.createImageArray(this.IMAGES_HURT, "img/Enemy/Blob/Blob_Dead/Blob_Dead", 6);
        this.loadImages(this.IMAGES_HURT);
        this.x = world.character.x + world.canvas.width;
        this.speed = 0.5 * scaleX;
        this.world = world;
        this.animate();
        this.nextAction();
        this.updateDimensions();
    }

    /**
     * Handles the animation and state updates for the Blob.
     */
    animate() {
        this.movement();
        animinterwal = setInterval(() => {
            if (this.blockAnimation || this.isDead()) {
                return
            } else if (this.animState == "walk") {
                this.playAnimationWithArgs(this.IMAGES_WALKING, 30, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => {(setTimeout(() => {this.audioManager.playAudio("slimeWalk"), this.speed = 0}, 800)) ,this.speed = 0.5}, 10);
            } else {
                this.playAnimationWithArgs(this.IMAGES_ATTACK, 50, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => this.speed = 6, 16);
            }
            if (this.world.isGameOver) {clearInterval(animInterwal)}
        }, 1000 / 30);
    }

    /**
     * Handles damage taken by the Blob and updates health accordingly.
     * @param {number} damage - The amount of damage to take.
     */
    takeDamage(damage) {
        if (this.health - damage > 0) {
            this.health -= damage;
        } else {
            this.health = 0;
        }
        this.blockAnimation = false;
        this.playAnimationWithArgs(this.IMAGES_HURT, 70, true, () => this.world.checkEnemyDead(), () => this.audioManager.playAudio("slimeDead"), 1);
    }

    /**
     * Determines the next action of the Blob based on its position relative to the character.
     */
    nextAction() {
        if (this.isDead()) {return}
        if (this.x - this.world.character.x <= 400 * scaleX) {
            this.speed = 0;
            this.animState = "attack"
        } else {
            this.speed = 0;
            this.animState = "walk"
        }
    }

    /**
     * Handles the movement of the Blob when it is not fixed in place.
     */
    movement() {
        let movementInterwal = setInterval(() => {
            if (!this.fixedMovement) {this.moveLeft();}
         }, 1000 / 100);
         if (this.world.isGameOver) {clearInterval(movementInterwal);}
    }
}