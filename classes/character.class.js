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
        this.fillAnimArrays();
        this.updateFullscreen();
        this.applyGravity();
        this.animate();
    }

    /** fill animation arrays and loads into query */
    fillAnimArrays() {
        this.createImageArray(this.IMAGES_IDLE, "img/Char/Idle/", 46);
        this.createImageArray(this.IMAGES_JUMPING, "img/Char/Jump/CatniJump", 21);
        this.createImageArray(this.IMAGES_WALKING, "img/Char/WalkAnim/CatniWalk", 30);
        this.createImageArray(this.IMAGES_DEAD, "img/Char/Dead/isDead", 20);
        this.createImageArray(this.IMAGES_HURT, "img/Char/Hurt/Hurt", 21);
        this.createImageArray(this.IMAGES_CASTFIREBALL, "img/Char/CastFireball/CastFireball", 18);
        this.createImageArray(this.IMAGES_DEFLECT, "img/Char/Deflect/deflect", 31);
        this.createImageArray(this.IMAGES_GETMANA, "img/Char/GetMana/GetMana", 21);
    }

    /**
     * Updates the character's dimensions and the deflect box based on the current scale.
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

    /**
     * Handles the animation and state updates for the character.
     */
    animate() {
        this.movement();
        this.animInterval = setInterval(() => {
            if (this.blockAnimation) {
                return;
            } else if (this.world.checkSpells("deflect") && this.world.keyboard.Q) {
                this.deflectAnim();
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

    deflectAnim() {
        this.playAnimationWithArgs(this.IMAGES_DEFLECT, 45, true, () => { this.fixedMovement = false, this.blockAnimation = false }, () => {
            this.isInvincible = true;
            setTimeout(() => { this.world.checkDeflect(), this.audioManager.playAudio("charDeflect") }, 100);
            setTimeout(() => { this.isInvincible = false }, 150)
        }, 4);
    }

    /**
     * Handles damage taken by the character and updates health accordingly.
     * @param {number} damage - The amount of damage to take.
     */
    takeDamage(damage) {
        if (!this.isInvincible) {
            this.isInvincible = true;
            this.audioManager.playAudio("charHurt");
            if (this.health - damage > 0) {
                this.health -= damage;
                this.playAnimationWithArgs(this.IMAGES_HURT, this.IMAGES_HURT.length, false, () => { this.blockAnimation = false });
            } else {
                this.healthZero();
            }
            this.hurtTimeout = setTimeout(() => {
                this.isInvincible = false;
            }, 2000);
        }
    }

    healthZero() {
        this.health = 0;
        this.blockAnimation = false;
        clearInterval(this.animInterval);
        clearInterval(this.moveInterval);
        this.playAnimationWithArgs(this.IMAGES_DEAD, this.IMAGES_DEAD.length, true, () => { this.world.gameOver("lose") });
    }

    /**
     * Plays the jump animation based on the character's jump height.
     */
    playJumpAnimation() {
        if (this.isDead()) { return; }
        let frame;
        let arr = this.IMAGES_JUMPING;
        const jumpHeight = 260 - this.y;
        const maxJumpHeight = 170;
        const jumpProgress = Math.min(1, Math.max(0, jumpHeight / maxJumpHeight));
        frame = this.jumpLogic(jumpProgress, arr)
        frame = Math.min(frame, arr.length - 1);
        this.img = this.imageCache[arr[frame]];
    }

    /** statements based on jumping progess */
    jumpLogic(jumpProgress, arr) {
        if (jumpProgress < 0.2) {
            return Math.floor(jumpProgress * 15);
        } else if (jumpProgress < 0.8) {
            return this.midJump(jumpProgress);
        } else {
            return this.endJump(jumpProgress, arr);
        }
    }

    /**
     * middle of jump animation
     * @param {integer} jumpProgress current progress on jump
     * @returns current frame in jump animation
     */
    midJump(jumpProgress) {
        const flightFramesStart = 3;
        const flightFramesCount = 16 - flightFramesStart + 1;
        const flightProgress = (jumpProgress - 0.2) / 0.6;
        return flightFramesStart + Math.floor(flightProgress * flightFramesCount);
    }

    /**
     * ending of jump animation
     * @param {*} jumpProgress current progress on jump
     * @param {*} arr array to register end of animation
     * @returns current frame in jump animation
     */
    endJump(jumpProgress, arr) {
        const landingFramesStart = 17;
        const landingProgress = (jumpProgress - 0.8) / 0.2;
        return landingFramesStart + Math.floor(landingProgress * (arr.length - landingFramesStart));
    }

    /**
     * Fills the character's mana by interacting with the world.
     */
    fillMana() {
        this.world.fillCharMana();
    }

    /**
     * Checks if movement is allowed for the character.
     * @returns {boolean} - True if movement is allowed, false otherwise.
     */
    isMovingAllowed() {
        return this.fixedMovement ? false : true;
    }

    /**
     * Handles the character's movement based on keyboard input.
     */
    movement() {
        this.moveInterval = setInterval(() => {
            if (this.isMovingAllowed()) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { this.rightMovement(); }
                if (this.world.keyboard.LEFT && this.x >= 0) { this.leftMovement() }
                if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
                    this.jump();
                    this.audioManager.playAudio("charJump");
                }
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 40)
    }

    /** Move Left */
    leftMovement() {
        this.moveLeft();
        this.otherDirection = true;
        this.audioManager.playAudio("charWalk");
    }

    /** Move Right */
    rightMovement() {
        this.moveRight();
        this.otherDirection = false;
        this.audioManager.playAudio("charWalk");
    }
}

