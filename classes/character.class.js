class Character extends Entity {
    width = 150;
    height = 150;
    speed = 3;
    y = 10;
    mana = 100;
    
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
    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png"
    ];
    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png"
    ]

    world;
    walking_sound = new Audio("audio/Player_Walk_Wood_3.wav");


    constructor() {
        super().loadImage("img/Char/Idle/42.png");
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }
    /**
     * Movement Direction and Speed
     * Sprite Animations for Movement
     */
    animate() {
        this.movement();
        /** Sprite Animation */
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                // Berechne den Sprungfortschritt
                const totalJumpHeight = 310; // Maximale Y-Position des Bodens
                const jumpHeight = totalJumpHeight - this.y;
                const maxJumpHeight = 170; // Höhe des Sprungs
                const jumpProgress = Math.min(1, Math.max(0, jumpHeight / maxJumpHeight)); // 0 bis 1
    
                // Sprunganimation
                this.playJumpAnimation(this.IMAGES_JUMPING, jumpProgress);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
                if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 1000 / 30);
    }

    playJumpAnimation(arr, jumpProgress) {
        let frame;
        if (jumpProgress < 0.2) {
            // Absprungphase: Frames 0 bis 2
            frame = Math.floor(jumpProgress * 15); // Schnelle Abfolge
        } else if (jumpProgress < 0.8) {
            // Flugphase: Frames 3 bis 16
            const flightFramesStart = 3;
            const flightFramesEnd = 16;
            const flightFramesCount = flightFramesEnd - flightFramesStart + 1;
            const flightProgress = (jumpProgress - 0.2) / 0.6; // Skaliere auf Bereich 0–1
            frame = flightFramesStart + Math.floor(flightProgress * flightFramesCount);
        } else {
            // Landephase: Frames 17 bis Ende
            const landingFramesStart = 17;
            const landingProgress = (jumpProgress - 0.8) / 0.2; // Skaliere auf Bereich 0–1
            frame = landingFramesStart + Math.floor(landingProgress * (arr.length - landingFramesStart));
        }
    
        frame = Math.min(frame, arr.length - 1); // Begrenze den Frame-Index
        this.img = this.imageCache[arr[frame]];
    }

    /** Movement */
    movement() {
        setInterval(() => {
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

        }, 1000 / 40)
    }
}

