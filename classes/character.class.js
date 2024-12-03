class Character extends Entity {
    width = 150;
    height = 150;
    speed = 3;
    y = 10;
    mana = 100;
    fixedMovement = false;
    isPlayingHurtAnimation = false;
    isPlayingCastAnimation = false;
    blockAnimation = false;
    isInvincible = false;
    hurtTimeout = null;

    IMAGES_IDLE = [
        'img/Char/Idle/1.png',
        'img/Char/Idle/2.png',
        'img/Char/Idle/3.png',
        'img/Char/Idle/4.png',
        'img/Char/Idle/5.png',
        'img/Char/Idle/6.png',
        'img/Char/Idle/7.png',
        'img/Char/Idle/8.png',
        'img/Char/Idle/9.png',
        'img/Char/Idle/10.png',
        'img/Char/Idle/11.png',
        'img/Char/Idle/12.png',
        'img/Char/Idle/13.png',
        'img/Char/Idle/14.png',
        'img/Char/Idle/15.png',
        'img/Char/Idle/16.png',
        'img/Char/Idle/17.png',
        'img/Char/Idle/18.png',
        'img/Char/Idle/19.png',
        'img/Char/Idle/20.png',
        'img/Char/Idle/21.png',
        'img/Char/Idle/22.png',
        'img/Char/Idle/23.png',
        'img/Char/Idle/24.png',
        'img/Char/Idle/25.png',
        'img/Char/Idle/26.png',
        'img/Char/Idle/27.png',
        'img/Char/Idle/28.png',
        'img/Char/Idle/29.png',
        'img/Char/Idle/30.png',
        'img/Char/Idle/31.png',
        'img/Char/Idle/32.png',
        'img/Char/Idle/33.png',
        'img/Char/Idle/34.png',
        'img/Char/Idle/35.png',
        'img/Char/Idle/36.png',
        'img/Char/Idle/37.png',
        'img/Char/Idle/38.png',
        'img/Char/Idle/39.png',
        'img/Char/Idle/40.png',
        'img/Char/Idle/41.png',
        'img/Char/Idle/42.png',
        'img/Char/Idle/43.png',
        'img/Char/Idle/44.png',
        'img/Char/Idle/45.png',
        'img/Char/Idle/46.png'
    ];
    IMAGES_WALKING = [
        "img/Char/WalkAnim/CatniWalk0000.png",
        "img/Char/WalkAnim/CatniWalk0001.png",
        "img/Char/WalkAnim/CatniWalk0002.png",
        "img/Char/WalkAnim/CatniWalk0003.png",
        "img/Char/WalkAnim/CatniWalk0004.png",
        "img/Char/WalkAnim/CatniWalk0005.png",
        "img/Char/WalkAnim/CatniWalk0006.png",
        "img/Char/WalkAnim/CatniWalk0007.png",
        "img/Char/WalkAnim/CatniWalk0008.png",
        "img/Char/WalkAnim/CatniWalk0009.png",
        "img/Char/WalkAnim/CatniWalk0010.png",
        "img/Char/WalkAnim/CatniWalk0011.png",
        "img/Char/WalkAnim/CatniWalk0012.png",
        "img/Char/WalkAnim/CatniWalk0013.png",
        "img/Char/WalkAnim/CatniWalk0014.png",
        "img/Char/WalkAnim/CatniWalk0015.png",
        "img/Char/WalkAnim/CatniWalk0016.png",
        "img/Char/WalkAnim/CatniWalk0017.png",
        "img/Char/WalkAnim/CatniWalk0018.png",
        "img/Char/WalkAnim/CatniWalk0019.png",
        "img/Char/WalkAnim/CatniWalk0020.png",
        "img/Char/WalkAnim/CatniWalk0021.png",
        "img/Char/WalkAnim/CatniWalk0022.png",
        "img/Char/WalkAnim/CatniWalk0023.png",
        "img/Char/WalkAnim/CatniWalk0024.png",
        "img/Char/WalkAnim/CatniWalk0025.png",
        "img/Char/WalkAnim/CatniWalk0026.png",
        "img/Char/WalkAnim/CatniWalk0027.png",
        "img/Char/WalkAnim/CatniWalk0028.png",
        "img/Char/WalkAnim/CatniWalk0029.png",
    ];
    IMAGES_JUMPING = [
        "img/Char/Jump/CatniJump0000.png",
        "img/Char/Jump/CatniJump0001.png",
        "img/Char/Jump/CatniJump0002.png",
        "img/Char/Jump/CatniJump0003.png",
        "img/Char/Jump/CatniJump0004.png",
        "img/Char/Jump/CatniJump0005.png",
        "img/Char/Jump/CatniJump0006.png",
        "img/Char/Jump/CatniJump0007.png",
        "img/Char/Jump/CatniJump0008.png",
        "img/Char/Jump/CatniJump0009.png",
        "img/Char/Jump/CatniJump0010.png",
        "img/Char/Jump/CatniJump0011.png",
        "img/Char/Jump/CatniJump0012.png",
        "img/Char/Jump/CatniJump0013.png",
        "img/Char/Jump/CatniJump0014.png",
        "img/Char/Jump/CatniJump0015.png",
        "img/Char/Jump/CatniJump0016.png",
        "img/Char/Jump/CatniJump0017.png",
        "img/Char/Jump/CatniJump0018.png",
        "img/Char/Jump/CatniJump0019.png",
        "img/Char/Jump/CatniJump0020.png",
    ];
    IMAGES_CASTFIREBALL = [
        "img/Char/CastFireball/CastFireball0000.png",
        "img/Char/CastFireball/CastFireball0001.png",
        "img/Char/CastFireball/CastFireball0002.png",
        "img/Char/CastFireball/CastFireball0003.png",
        "img/Char/CastFireball/CastFireball0004.png",
        "img/Char/CastFireball/CastFireball0005.png",
        "img/Char/CastFireball/CastFireball0006.png",
        "img/Char/CastFireball/CastFireball0007.png",
        "img/Char/CastFireball/CastFireball0008.png",
        "img/Char/CastFireball/CastFireball0009.png",
        "img/Char/CastFireball/CastFireball0010.png",
        "img/Char/CastFireball/CastFireball0011.png",
        "img/Char/CastFireball/CastFireball0012.png",
        "img/Char/CastFireball/CastFireball0013.png",
        "img/Char/CastFireball/CastFireball0014.png",
        "img/Char/CastFireball/CastFireball0015.png",
        "img/Char/CastFireball/CastFireball0016.png",
        "img/Char/CastFireball/CastFireball0017.png"
    ];
    IMAGES_GETMANA = [
        "img/Char/GetMana/GetMana0000.png",
        "img/Char/GetMana/GetMana0001.png",
        "img/Char/GetMana/GetMana0002.png",
        "img/Char/GetMana/GetMana0003.png",
        "img/Char/GetMana/GetMana0004.png",
        "img/Char/GetMana/GetMana0005.png",
        "img/Char/GetMana/GetMana0006.png",
        "img/Char/GetMana/GetMana0007.png",
        "img/Char/GetMana/GetMana0008.png",
        "img/Char/GetMana/GetMana0009.png",
        "img/Char/GetMana/GetMana0010.png",
        "img/Char/GetMana/GetMana0011.png",
        "img/Char/GetMana/GetMana0012.png",
        "img/Char/GetMana/GetMana0013.png",
        "img/Char/GetMana/GetMana0014.png",
        "img/Char/GetMana/GetMana0015.png",
        "img/Char/GetMana/GetMana0016.png",
        "img/Char/GetMana/GetMana0017.png",
        "img/Char/GetMana/GetMana0018.png",
        "img/Char/GetMana/GetMana0019.png",
        "img/Char/GetMana/GetMana0020.png"
    ];
    IMAGES_DEAD = [
        "img/Char/Dead/isDead0000.png",
        "img/Char/Dead/isDead0001.png",
        "img/Char/Dead/isDead0002.png",
        "img/Char/Dead/isDead0003.png",
        "img/Char/Dead/isDead0004.png",
        "img/Char/Dead/isDead0005.png",
        "img/Char/Dead/isDead0006.png",
        "img/Char/Dead/isDead0007.png",
        "img/Char/Dead/isDead0008.png",
        "img/Char/Dead/isDead0009.png",
        "img/Char/Dead/isDead0010.png",
        "img/Char/Dead/isDead0011.png",
        "img/Char/Dead/isDead0012.png",
        "img/Char/Dead/isDead0013.png",
        "img/Char/Dead/isDead0014.png",
        "img/Char/Dead/isDead0015.png",
        "img/Char/Dead/isDead0016.png",
        "img/Char/Dead/isDead0017.png",
        "img/Char/Dead/isDead0018.png",
        "img/Char/Dead/isDead0019.png"
    ];
    IMAGES_HURT = [
        "img/Char/Hurt/Hurt0000.png",
        "img/Char/Hurt/Hurt0001.png",
        "img/Char/Hurt/Hurt0002.png",
        "img/Char/Hurt/Hurt0003.png",
        "img/Char/Hurt/Hurt0004.png",
        "img/Char/Hurt/Hurt0005.png",
        "img/Char/Hurt/Hurt0006.png",
        "img/Char/Hurt/Hurt0007.png",
        "img/Char/Hurt/Hurt0008.png",
        "img/Char/Hurt/Hurt0009.png",
        "img/Char/Hurt/Hurt0010.png",
        "img/Char/Hurt/Hurt0011.png",
        "img/Char/Hurt/Hurt0012.png",
        "img/Char/Hurt/Hurt0013.png",
        "img/Char/Hurt/Hurt0014.png",
        "img/Char/Hurt/Hurt0015.png",
        "img/Char/Hurt/Hurt0016.png",
        "img/Char/Hurt/Hurt0017.png",
        "img/Char/Hurt/Hurt0018.png",
        "img/Char/Hurt/Hurt0019.png",
        "img/Char/Hurt/Hurt0020.png"
    ];

    world;
    walking_sound = new Audio("audio/Player_Walk_Wood_3.wav");


    constructor() {
        super().loadImage("img/Char/Idle/42.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_CASTFIREBALL);
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
            if (this.isDead()) {
                this.playDeadAnimation();
            } else if (this.isPlayingHurtAnimation) {
                return;
            } else if (this.isPlayingCastAnimation) {
                return;
            } else if (this.blockAnimation) {
                return;
            } else if (this.world.checkSpells() && this.world.keyboard.E && this.isMovingAllowed()) {
                this.playCastAnimation();
            } else if (this.isAboveGround() && this.isMovingAllowed()) {
                this.playJumpAnimation();
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.isMovingAllowed()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 30);
    }



    playDeadAnimation() {
        this.blockAnimation = true;
        this.fixedMovement = true;
        let currentFrame = 0;
        const animationFrames = this.IMAGES_DEAD;
        const frameInterval = 1000 / 19;

        const animationInterval = setInterval(() => {
            this.img = this.imageCache[animationFrames[currentFrame]];
            currentFrame++;
            if (currentFrame >= animationFrames.length) {
                clearInterval(animationInterval);
                this.world.gameOver();
            }
        }, frameInterval);
    }

    takeDamage() {
        if (!this.isInvincible) {
            this.isInvincible = true; 
            this.blockAnimation = true; 
            this.playHurtAnimation();
            this.hurtTimeout = setTimeout(() => {
                this.isInvincible = false; 
            }, 3000); 
        }
    }

    playHurtAnimation() {

        this.isPlayingHurtAnimation = true; 
        let currentFrame = 0;
        const animationFrames = this.IMAGES_HURT;
        const frameInterval = 1000 / 40; 
        const animationInterval = setInterval(() => {
            this.img = this.imageCache[animationFrames[currentFrame]];
            currentFrame++;
            if (currentFrame >= animationFrames.length) {
                clearInterval(animationInterval); 
            }
        }, frameInterval);
        setTimeout(() => {
            this.isPlayingHurtAnimation = false;
        }, 600);
    }

    playJumpAnimation() {
        let frame;
        let arr = this.IMAGES_JUMPING;
        const jumpHeight = 310 - this.y;
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

    playCastAnimation() {
        this.blockAnimation = true;
        this.fixedMovement = true;
        let currentFrame = 0;
        const animationFrames = this.IMAGES_CASTFIREBALL;
        const frameInterval = 1000 / animationFrames.length; 
        const animationInterval = setInterval(() => {
            this.img = this.imageCache[animationFrames[currentFrame]]; 
            if (currentFrame == 12) {
                this.world.castFireball();
            }
            currentFrame++; 
            if (currentFrame >= animationFrames.length) {
                clearInterval(animationInterval); 
                this.fixedMovement = false; 
                this.blockAnimation = false;
            }
        }, frameInterval);
    }

    playAnimationWithEndExecute(arr, executeFunction) {
        this.blockAnimation = true;
        this.fixedMovement = true;
        let currentFrame = 0;
        const animationFrames = arr;
        const frameInterval = 1000 / animationFrames.length * 2;
        const animationInterval = setInterval(() => {
            this.img = this.imageCache[animationFrames[currentFrame]];
            currentFrame++;
            if (currentFrame >= animationFrames.length) {
                clearInterval(animationInterval);
                this.blockAnimation = false;
                executeFunction;
            }
        }, frameInterval);
    }

    fillMana() {
        console.log('mana up');
        
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

