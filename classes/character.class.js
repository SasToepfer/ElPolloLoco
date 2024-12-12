class Character extends Entity {
    baseWidth = 150;
    baseHeight = 200;
    speed = 3;
    baseY = 60;
    mana = 100;
    damage = 20;

    isInvincible = false;
    hurtTimeout = null;
    baseCollisionBox = { xOffset: 60, yOffset: 10, width: 30, height: 170 };
    deflectBox = { xOffset: this.collisionBox.xOffset + this.collisionBox.width + 20, yOffset: 10, width: 20, height: 170 };

    IMAGES_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_JUMPING = [];
    IMAGES_CASTFIREBALL = [];
    IMAGES_DEFLECT = [];
    IMAGES_GETMANA = [];
    IMAGES_DEAD = [];
    IMAGES_HURT = [];

    constructor() {
        super().loadImage("img/Char/Idle/0042.png");
        this.createImageArray(this.IMAGES_IDLE, "img/Char/Idle/", 46);
        this.loadImages(this.IMAGES_IDLE);
        this.createImageArray(this.IMAGES_JUMPING, "img/Char/Jump/CatniJump", 21);
        this.loadImages(this.IMAGES_JUMPING);
        this.createImageArray(this.IMAGES_WALKING, "img/Char/WalkAnim/CatniWalk", 30);
        this.loadImages(this.IMAGES_WALKING);
        this.createImageArray(this.IMAGES_DEAD, "img/Char/Dead/isDead", 20);
        this.loadImages(this.IMAGES_DEAD);
        this.createImageArray(this.IMAGES_HURT, "img/Char/Hurt/Hurt", 21);
        this.loadImages(this.IMAGES_HURT);
        this.createImageArray(this.IMAGES_CASTFIREBALL, "img/Char/CastFireball/CastFireball", 18);
        this.loadImages(this.IMAGES_CASTFIREBALL);
        this.createImageArray(this.IMAGES_DEFLECT, "img/Char/Deflect/deflect", 31);
        this.loadImages(this.IMAGES_DEFLECT);
        this.createImageArray(this.IMAGES_GETMANA, "img/Char/GetMana/GetMana", 21);
        this.loadImages(this.IMAGES_GETMANA);
        this.updateFullscreen();
        this.applyGravity();
        this.animate();
    }


    /**
     * Movement Direction and Speed
     * Sprite Animations for Movement
     */
    updateFullscreen() {
        this.updateDimensions();
        this.deflectBox = {
            xOffset: (this.collisionBox.xOffset + this.collisionBox.width + (20 * scaleX)),
            yOffset: 10 * scaleY,
            width: 20 * scaleX,
            height: 170 * scaleY
        }
    }

    animate() {
        this.movement();
        setInterval(() => {
            if (this.blockAnimation) {
                return
            } else if (this.world.checkSpells("deflect") && this.world.keyboard.Q) {
                this.playAnimationWithArgs(this.IMAGES_DEFLECT, 30, true, () => { this.fixedMovement = false, this.blockAnimation = false }, () => {this.world.checkDeflect(), this.audioManager.playAudio("charDeflect")}, 8);
            } else if (this.world.checkSpells("fireball") && this.world.keyboard.E) {
                this.playAnimationWithArgs(this.IMAGES_CASTFIREBALL, 40, true, () => { this.fixedMovement = false, this.blockAnimation = false }, () => { this.world.castFireball(), this.audioManager.playAudio("charFireball") }, 12);
            } else if (this.isAboveGround()) {
                this.playJumpAnimation();
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 30);
    }

    takeDamage(damage) {
        if (!this.isInvincible) {
            this.isInvincible = true;
            this.audioManager.playAudio("charHurt");
            if (this.health - damage > 0) {
                this.health -= damage;
                this.playAnimationWithArgs(this.IMAGES_HURT, this.IMAGES_HURT.length, false, () => { this.blockAnimation = false });
            } else {
                this.health = 0;
                this.playAnimationWithArgs(this.IMAGES_DEAD, this.IMAGES_DEAD.length, true, () => { this.world.gameOver() });
            }
            this.hurtTimeout = setTimeout(() => {
                this.isInvincible = false;
            }, 2000);
        }
    }

    playJumpAnimation() {
        let frame;
        let arr = this.IMAGES_JUMPING;
        const jumpHeight = 260 - this.y;
        const maxJumpHeight = 170;
        const jumpProgress = Math.min(1, Math.max(0, jumpHeight / maxJumpHeight));
        if (jumpProgress < 0.2) {
            frame = Math.floor(jumpProgress * 15);
        } else if (jumpProgress < 0.8) {
            const flightFramesStart = 3;
            const flightFramesCount = 16 - flightFramesStart + 1;
            const flightProgress = (jumpProgress - 0.2) / 0.6;
            frame = flightFramesStart + Math.floor(flightProgress * flightFramesCount);
        } else {
            const landingFramesStart = 17;
            const landingProgress = (jumpProgress - 0.8) / 0.2;
            frame = landingFramesStart + Math.floor(landingProgress * (arr.length - landingFramesStart));
        }
        frame = Math.min(frame, arr.length - 1);
        this.img = this.imageCache[arr[frame]];
    }

    fillMana() {
        this.world.fillCharMana();
    }

    isMovingAllowed() {
        return this.fixedMovement ? false : true;
    }

    /** Movement */
    movement() {
        setInterval(() => {
            if (this.isMovingAllowed()) {
                /** Move Right */
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.audioManager.playAudio("charWalk");
                }
                /** Move Left */
                if (this.world.keyboard.LEFT && this.x >= 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.audioManager.playAudio("charWalk");
                }
                /** Jump */
                if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
                    this.jump();
                    this.audioManager.playAudio("charJump");
                }
                this.world.camera_x = -this.x + 100;
            }

        }, 1000 / 40)
    }
}

