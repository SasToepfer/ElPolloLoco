class Mage extends Entity {
    baseWidth = 150;
    baseHeight = 250;
    baseY = 220;
    damage = 50;
    health = 20;
    baseCollisionBox = { xOffset: 60, yOffset: 50, width: 20, height: 180 }
    animState = "idle";
    IMAGES_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_CAST = [];
    IMAGES_HURT = [];
    world;
    otherDirection = false;

    constructor(world) {
        super().loadImage("img/Enemy/Mage/Mage_Idle/Mage_Idle0000.png");
        this.createImageArray(this.IMAGES_IDLE, "img/Enemy/Mage/Mage_Idle/Mage_Idle", 120);
        this.loadImages(this.IMAGES_IDLE);
        this.createImageArray(this.IMAGES_WALKING, "img/Enemy/Mage/Mage_Walk/Mage_Walk", 46);
        this.loadImages(this.IMAGES_WALKING);
        this.createImageArray(this.IMAGES_HURT, "img/Enemy/Mage/Mage_Hurt/", 30, 10);
        this.loadImages(this.IMAGES_HURT);
        this.createImageArray(this.IMAGES_CAST, "img/Enemy/Mage/Mage_Attack/Mage_Attack", 80);
        this.loadImages(this.IMAGES_CAST);
        this.x = world.character.x + world.canvas.width;
        this.speed = 0.4;
        this.world = world;
        this.updateDimensions();
        this.animate();
        this.nextAction();
    }

    animate() {
        this.movement();
        setInterval(() => {
            if (this.isDead()) 
                {
                    clearInterval();
                    return;
                }
            if (this.blockAnimation) {
                return
            } else if (this.animState == "cast") {
                this.playAnimationWithArgs(this.IMAGES_CAST, 30, false, () => {this.fixedMovement = false, this.blockAnimation = false, this.nextAction()}, () => this.world.castEnemyFireball(this),35);
            } else if (this.animState == "walk") {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 1000 / 30);
    }

    takeDamage(damage) {
        if (this.health - damage > 0) {
            this.health -= damage;
        } else {
            this.health = 0;
        }
        this.playAnimationWithArgs(this.IMAGES_HURT, 100, true, () => this.world.checkEnemyDead());
    }

    nextAction() {
        // let randomAction = 60;
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

    movement() {
        setInterval(() => {
            if (this.animState != "walk" || this.fixedMovement) {
                return;
            }else {
                this.moveLeft();
            }
         }, 1000 / 100);
    }
}