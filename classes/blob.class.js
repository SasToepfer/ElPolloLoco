class Blob extends Entity {
    width = 100;
    height = 100;
    y = 360;
    damage = 40;
    health = 20;
    collisionBox = { xOffset: 30, yOffset: 50, width: 40, height: 40 }
    animState = "idle";
    IMAGES_ATTACK = [];
    IMAGES_WALKING = [];
    world;
    otherDirection = false;

    constructor(world) {
        super().loadImage("img/Enemy/Blob/Blob_Walk/Poring_Walk0000.png");
        this.createImageArray(this.IMAGES_ATTACK, "img/Enemy/Blob/Blob_Attack/Poring_Attack", 78);
        this.loadImages(this.IMAGES_ATTACK);
        this.createImageArray(this.IMAGES_WALKING, "img/Enemy/Blob/Blob_Walk/Poring_Walk", 51);
        this.loadImages(this.IMAGES_WALKING);
        this.x = world.character.x + world.canvas.width;
        this.speed = 0.5;
        this.world = world;
        this.animate();
        this.nextAction();
    }

    animate() {
        this.movement();
        setInterval(() => {
            if (this.blockAnimation) {
                return
            } else if (this.animState == "walk") {
                this.playAnimationWithArgs(this.IMAGES_WALKING, 30, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => this.speed = 0.5, 10);
            } else {
                this.playAnimationWithArgs(this.IMAGES_ATTACK, 50, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => this.speed = 6, 16);
            }
        }, 1000 / 30);
    }

    nextAction() {
        if (this.x - this.world.character.x <= 400) {
            this.speed = 0;
            this.animState = "attack"
        } else {
            this.speed = 0;
            this.animState = "walk"
        }
    }

    movement() {
        setInterval(() => {
            if (this.animState == "attack") {
                this.moveLeft();
            }else {
                this.moveLeft();
            }
         }, 1000 / 100);
    }
}