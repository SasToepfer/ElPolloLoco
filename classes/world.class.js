class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    backgroundLayers = [
        { img: 'img/background/bg-cropped.png', speed: 0.2 }, // Weite Objekte
        // { img: 'img/layer2.png', speed: 0.5 }, // Gebäude
        //{ img: 'img/layer3.png', speed: 1.0 }, // Bodennahe Details
    ];
    backgroundImages = [];
    camera_x = 0;
    statusBar = new Statusbar();
    flame = new Manaflame(this.character);
    lastFireballTime = 0;
    spells = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadBackground()
        this.draw();
        this.setWorld();
        this.run();
    }

    loadBackground() {
        this.backgroundLayers.forEach(layer => {
            const img = new Image();
            img.src = layer.img;
            this.backgroundImages.push({ img, speed: layer.speed });
        });
    }

    setWorld() {
        this.character.world = this;
    }

    /** Game Checks */
    run() {
        setInterval(() => {
            this.checkSpells();
            this.checkCollisions();

        }, 50);
    }
    /** Character Cast Spells */
    checkSpells() {
        const currentTime = new Date().getTime();
        const cooldown = 2000;

        if ((currentTime - this.lastFireballTime >= cooldown) && this.flame.percentage > 0) {
            return true;
        } else {
            return false;
        }
    }

    castFireball() {
        let fireball = "";
        this.lastFireballTime = new Date().getTime();
        this.flame.percentage -= 20;
        if (this.character.otherDirection) {
            fireball = new Spell(this.character.x, this.character.y, this.character.otherDirection);
        } else {
            fireball = new Spell(this.character.x + this.character.width / 1.5, this.character.y + this.character.height / 4, this.character.otherDirection);
        }
        this.spells.push(fireball);
    }


    /** CollisionCheck */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.getHit(enemy.damage)
                this.statusBar.setPercentage(this.character.health)
            }
        });
        this.level.runes.forEach((rune, i) => {
            if (this.character.isColliding(rune) && (this.keyboard.D || this.keyboard.DOWN)) {
                this.flame.percentage = 0;
                this.character.playAnimationWithEndExecute(this.character.IMAGES_GETMANA, this.character.fillMana());
                this.level.runes.splice(i, 1);
            }
        });
        for (let i = this.spells.length - 1; i >= 0; i--) {
            let spell = this.spells[i];
            this.level.enemies.forEach((enemy, j) => {
                if (spell.isColliding(enemy)) {
                    enemy.getHit(spell.damage);
                    this.checkEnemyDead(enemy, j)
                    this.spells.splice(i, 1);
                }
            });
        }
    }

    fillCharMana() {
        this.flame.percentage = 100;
    }

    checkEnemyDead(enemy, j) {
        if (enemy.isDead()) {
            this.level.enemies.splice(j, 1);
        }
    }

    drawBackground() {
        this.backgroundImages.forEach(layer => {
            const offsetX = +this.camera_x * layer.speed; // Parallax-Bewegung
            this.ctx.drawImage(layer.img, offsetX, 0, 2803, this.canvas.height);

            // Wiederholung für nahtlosen Scroll
            if (offsetX < 0) {
                this.ctx.drawImage(layer.img, offsetX + 2803, 0, 2803, this.canvas.height);
            }
        });
    }

    /** World Draw */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBackground();

        this.ctx.translate(this.camera_x, 0);

        /** Moving independent to camera */
        // this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.runes);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.spells);
        this.addToMap(this.character);
        this.addToMap(this.flame);


        this.ctx.translate(-this.camera_x, 0);

        /** Moving fixed to camera */
        this.addToMap(this.statusBar);

        let self = this;
        requestAnimationFrame(() => self.draw())
    }

    /** Add single Object to map for drawing */
    addObjectsToMap(objects) {
        objects.forEach(e => { this.addToMap(e) });
    }

    /** Add multiple Objects to map for drawing */
    addToMap(ent) {
        if (ent.otherDirection) { this.flipImage(ent); }
        ent.draw(this.ctx);
        // ent.drawRect(this.ctx);
        if (ent.otherDirection) { this.flipImageBack(ent); }
    }

    flipImage(ent) {
        this.ctx.save();
        this.ctx.translate(ent.width, 0);
        this.ctx.scale(-1, 1);
        ent.x = ent.x * -1;
    }

    flipImageBack(ent) {
        ent.x = ent.x * -1;
        this.ctx.restore();
    }

    gameOver() {
        console.log("game over");
        
    }
}