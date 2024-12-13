class Endboss extends Entity {
    baseWidth = 220;
    baseHeight = 320;
    baseY = 170;
    damage = 20;
    health = 200;
    baseCollisionBox = { xOffset: 90, yOffset: 80, width: 40, height: 200 }
    animState = "idle";
    IMAGES_IDLE = [];
    IMAGES_WALKING = [];
    IMAGES_CAST = [];
    IMAGES_CAST2 = [];
    IMAGES_DEAD = [];
    world;
    otherDirection = false;

    constructor(world) {
        super().loadImage("img/Enemy/Ina/Idle/Ina_Idle0001.png");
        this.createImageArray(this.IMAGES_IDLE, "img/Enemy/Ina/Idle/Ina_Idle", 49, 1);
        this.loadImages(this.IMAGES_IDLE);
        this.createImageArray(this.IMAGES_WALKING, "img/Enemy/Ina/Walk/Ina_Walk", 41, 3);
        this.loadImages(this.IMAGES_WALKING);
        this.createImageArray(this.IMAGES_DEAD, "img/Enemy/Ina/Dead/Ina_Dead", 29, 1);
        this.loadImages(this.IMAGES_DEAD);
        this.createImageArray(this.IMAGES_CAST, "img/Enemy/Ina/Attack1/Ina_Attack1", 90, 1);
        this.loadImages(this.IMAGES_CAST);
        this.createImageArray(this.IMAGES_CAST2, "img/Enemy/Ina/Attack2/Ina_Attack2", 259, 1);
        this.loadImages(this.IMAGES_CAST2);

        this.speed = 0.4;
        this.world = world;
        this.x = world.character.x + world.canvas.width;
        this.updateDimensions();
        this.animate();
        this.nextAction(true, 70);
    }

    /** Animation render based on animstate */
    animate() {
        this.movement();
        setInterval(() => {
            if (this.isDead()) {
                clearInterval();
                return;
            }
            if (this.blockAnimation) {
                return
            } else if (this.animState == "cast") {
                this.playAnimationWithArgs(this.IMAGES_CAST, 60, false, () => { this.fixedMovement = false, this.blockAnimation = false, this.nextAction(true) }, () => this.attack1(), 40);
            } else if (this.animState == "cast2") {
                this.playAnimationWithArgs(this.IMAGES_CAST2, 30, false, () => { this.fixedMovement = false, this.blockAnimation = false, this.nextAction(true) }, () => this.attack2(), 1);
            } else if (this.animState == "walk") {
                this.playAnimationWithArgs(this.IMAGES_WALKING, 30, false, () => { this.fixedMovement = false, this.blockAnimation = false, this.nextAction() });
            } else {
                this.playAnimationWithArgs(this.IMAGES_IDLE, 30, false, () => { this.fixedMovement = false, this.blockAnimation = false, this.nextAction(true, 50) });
            }
        }, 1000 / 30);
    }

    /** enemy takes damage */
    takeDamage(damage) {
        if (this.health - damage > 0) {
            this.health -= damage;
        } else {
            this.health = 0;
            this.playAnimationWithArgs(this.IMAGES_DEAD, 50, true, () => this.world.checkEnemyDead());
        }
        this.audioManager.playAudio("mageDead");
    }

    /**
     * Behaviour Pattern based on a random number between 1 - 100
     * @param {boolean} fixed true if the next action is fixed based on a given number
     * @param {int} number next action number : default 100 -> idle
     */
    nextAction(fixed = false, number = 100) {
        if (this.isDead() || this.world.isGameOver) { return; }
        let randomAction = fixed ? number : Math.random() * 100;
        if (randomAction <= 30) {
            this.animState = "walk"
        } else if (randomAction <= 60) {
            this.animState = "cast"
        } else if (randomAction <= 80) {
            this.animState = "cast2"
        } else {
            this.animState = "idle"
        }
    }

    /** Movement Logic */
    movement() {
        setInterval(() => {
            if (this.animState != "walk" || this.fixedMovement) {
                return;
            } else {
                this.moveLeft();
            }
        }, 1000 / 100);
    }

    /** cast two Firballs in quick succession */
    attack1() {
        let fireball = "";
        let fireball2 = "";
        fireball = this.otherDirection ? new Spell(this.x, this.y - 10, false, false, 60, 80) : new Spell(this.x, this.y - 10 + this.height / 2, true, false, 60, 80);
        this.audioManager.playAudio("charFireball");
        this.world.enemySpells.push(fireball);
        if (this.health != 0) {
            setTimeout(() => {
                fireball2 = this.otherDirection ? new Spell(this.x, this.y - 50, false, false, 60, 80, true) : new Spell(this.x + this.width / 2, this.y - 40 + this.height / 4, true, false, 60, 80, true);
                this.audioManager.playAudio("charFireball");
                this.world.enemySpells.push(fireball2);
            }, 450);
        }
    }

    /** Casts Meteors from above the Canvas in quick succession */
    attack2() {
        const fireRainInterwal = setInterval(() => {
            let fireball = "";
            let x = this.world.character.x + Math.random() * 500 - Math.random() * 500;
            fireball = new Spell(x,0 - this.width, false, false, 20, 80, true, false);
            this.audioManager.playAudio("charFireball");
            this.world.enemySpells.push(fireball);
        }, 1000 / 2);
        setTimeout(() => {
            clearInterval(fireRainInterwal);

        }, 30 * this.IMAGES_CAST2.length);
    }
}