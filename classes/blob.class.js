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

    animate() {
        this.movement();
        setInterval(() => {
            if (this.blockAnimation || this.isDead()) {
                return
            } else if (this.animState == "walk") {
                this.playAnimationWithArgs(this.IMAGES_WALKING, 30, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => {(setTimeout(() => {this.audioManager.playAudio("slimeWalk"), this.speed = 0}, 800)) ,this.speed = 0.5}, 10);
            } else {
                this.playAnimationWithArgs(this.IMAGES_ATTACK, 50, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => this.speed = 6, 16);
            }
        }, 1000 / 30);
    }

    takeDamage(damage) {
        if (this.health - damage > 0) {
            this.health -= damage;
        } else {
            this.health = 0;
        }
        this.blockAnimation = false;
        this.playAnimationWithArgs(this.IMAGES_HURT, 70, true, () => this.world.checkEnemyDead(), () => this.audioManager.playAudio("slimeDead"), 1);
    }

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

    movement() {
        setInterval(() => {
            if (!this.fixedMovement) {this.moveLeft();}
         }, 1000 / 100);
    }
}