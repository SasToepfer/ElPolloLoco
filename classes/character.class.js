class Character extends Entity {
    width = 150;
    height = 200;
    speed = 3;
    y = 60;
    mana = 100;
    fixedMovement = false;
    blockAnimation = false;
    isInvincible = false;
    hurtTimeout = null;

    IMAGES_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_JUMPING = [];
    IMAGES_CASTFIREBALL = [];
    IMAGES_GETMANA = [];
    IMAGES_DEAD = [];
    IMAGES_HURT = [];

    world;
    walking_sound = new Audio("audio/Player_Walk_Wood_3.wav");


    constructor() {
        super().loadImage("img/Char/Idle/42.png");
        this.createImageArray(this.IMAGES_IDLE, "img/Char/Idle/" ,46);
        this.loadImages(this.IMAGES_IDLE);
        this.createImageArray(this.IMAGES_JUMPING, "img/Char/Jump/CatniJump" ,21);
        this.loadImages(this.IMAGES_JUMPING);
        this.createImageArray(this.IMAGES_WALKING, "img/Char/WalkAnim/CatniWalk" ,30);
        this.loadImages(this.IMAGES_WALKING);
        this.createImageArray(this.IMAGES_DEAD, "img/Char/Dead/isDead" ,20);
        this.loadImages(this.IMAGES_DEAD);
        this.createImageArray(this.IMAGES_HURT, "img/Char/Hurt/Hurt" ,21);
        this.loadImages(this.IMAGES_HURT);
        this.createImageArray(this.IMAGES_CASTFIREBALL, "img/Char/CastFireball/CastFireball" ,18);
        this.loadImages(this.IMAGES_CASTFIREBALL);
        this.createImageArray(this.IMAGES_GETMANA, "img/Char/GetMana/GetMana" ,21);
        this.loadImages(this.IMAGES_GETMANA);
        this.applyGravity();
        this.animate();
    }
    /**
     * Movement Direction and Speed
     * Sprite Animations for Movement
     */
    animate() {
        this.movement();

        setInterval(() => {
            if (this.blockAnimation) {
                return
            } else if (this.world.checkSpells() && this.world.keyboard.E) {
                this.playAnimationWithArgs(this.IMAGES_CASTFIREBALL, 30, true, () => {this.fixedMovement = false, this.blockAnimation = false}, () => this.world.castFireball(),12);
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
            if (this.health - damage > 0) {
                this.health -= damage;
                this.playAnimationWithArgs(this.IMAGES_HURT, this.IMAGES_HURT.length, false, () => {this.blockAnimation = false});
            } else {
                this.health = 0;
                this.playAnimationWithArgs(this.IMAGES_DEAD, this.IMAGES_DEAD.length, true, () => {this.world.gameOver()});
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

    playAnimationWithArgs(arr, animationSpeed, isMovementBlocked, endFunction, frameCallback = null, frameCallbackFrame = -1, ...args) {
        if (this.blockAnimation) {return}
        this.blockAnimation = true;
        this.fixedMovement = isMovementBlocked;
        let currentFrame = 0;
        const animationFrames = arr;
        const frameInterval = 1000 / animationSpeed;
        const animationInterval = setInterval(() => {
            this.img = this.imageCache[animationFrames[currentFrame]];
            if (frameCallback && currentFrame == frameCallbackFrame){
                frameCallback();
            }
            currentFrame++;
            if (currentFrame >= animationFrames.length) {
                clearInterval(animationInterval);
                if(typeof endFunction === 'function') {
                    endFunction(...args);
                }
            }
        }, frameInterval);
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
                this.walking_sound.pause();
                /** Move Right */
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.walking_sound.play();
                }
                /** Move Left */
                if (this.world.keyboard.LEFT && this.x >= 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.walking_sound.play();
                }
                /** Jump */
                if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
                    this.jump();
                }
                this.world.camera_x = -this.x + 100;
            }

        }, 1000 / 40)
    }
}

