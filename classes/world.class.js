class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    backgroundLayers = [
        { img: 'img/background/Ground_00011_.jpg', speed: 0.2, yPosition: 0, width: 4096 / 1, height: 480 }, // Weite Objekte
        // { img: 'img/layer2.png', speed: 0.5 }, // Gebäude
        { img: 'img/background/sdpixel_floor_00002_.jpg', speed: 1.0, yPosition: 390, width: 4096 / 1, height: 200 }, // Bodennahe Details
    ];
    backgroundImages = [];
    camera_x = 0;
    hpFrame = new Statusbar(true, 20, 0, 300, 60);
    hpBar = new Statusbar(false, 80, 20, 180, 20);
    flame = new Manaflame(this.character);
    lastFireballTime = 0;
    lastDeflectTime = 0;
    spells = [];
    enemySpells = [];
    isGameOver = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadBackground()
        this.draw();
        this.setWorld();
        this.run();
        this.level.enemies.push(new Mage(this));
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
        this.spawnClouds();
        this.spawnBlobEnemy();
        this.spawnMageEnemy();
        setInterval(() => {
            this.removeOffscreen();
        }, 2000);
    }

    spawnClouds() {
        setTimeout(() => {
            if (!this.isGameOver) {
                this.level.clouds.push(new Cloud(this.character.x + this.canvas.width));
                this.spawnClouds();
            }
        }, 5000 + Math.random() * 4000);
    }

    spawnBlobEnemy() {
        setTimeout(() => {
            if (!this.isGameOver) {
                this.level.enemies.push(new Blob(this));
                this.spawnBlobEnemy();
            }
        }, 5000 + Math.random() * 4000);
    }
    spawnMageEnemy() {
        setTimeout(() => {
            if (!this.isGameOver) {
                this.level.enemies.push(new Mage(this));
                this.spawnMageEnemy();
            }
        }, 15000 + Math.random() * 10000);
    }

    removeOffscreen() {
        this.level.clouds.forEach((cloud, index) => {
            if (this.character.x - 500 >= cloud.x) {
                this.level.clouds.splice(index, 1);
            }
        });
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.x - 500 >= enemy.x) {
                this.level.enemies.splice(index, 1);
            }
        });
    }

    /** Game Checks */
    run() {
        setInterval(() => {
            this.checkSpells();
            this.checkCollisions();
        }, 50);
    }
    /** Character Cast Spells */
    checkSpells(spell) {
        const currentTime = new Date().getTime();
        const cooldown = 2000;
        switch (spell) {
            case "fireball": return (currentTime - this.lastFireballTime >= cooldown) && this.flame.percentage > 0 ? true : false;
            case "deflect": return currentTime - this.lastDeflectTime >= cooldown ? true : false;
            default: break;
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

    castEnemyFireball(ent) {
        let fireball = "";
        if (ent.otherDirection) {
            fireball = new Spell(ent.x, ent.y, false);
        } else {
            fireball = new Spell(ent.x, ent.y + ent.height / 4, true);
        }
        if (ent.health != 0) {
            this.enemySpells.push(fireball);
        }
        
    }

    deflectFireball(ref) {
        let fireball = "";
        fireball = new Spell(ref.x, ref.y, false);
        this.spells.push(fireball);
    }


    /** CollisionCheck */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.getHit(enemy.damage)
                this.hpBar.setPercentage(this.character.health)
            }
        });
        this.enemySpells.forEach((spell) => {
            if (this.character.isColliding(spell)) {
                this.character.getHit(spell.damage)
                this.hpBar.setPercentage(this.character.health)
            }
        });
        this.level.runes.forEach((rune, i) => {
            if (this.character.isColliding(rune) && (this.keyboard.D || this.keyboard.DOWN)) {
                this.flame.percentage = 0;
                this.character.playAnimationWithArgs(this.character.IMAGES_GETMANA, 20, true, () => { this.character.fixedMovement = false, this.character.blockAnimation = false, this.character.fillMana() });
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

    checkDeflect() {
        this.enemySpells.forEach((spell, i) => {
            if (this.character.isColliding(spell, true)) {
                this.deflectFireball(spell);
                this.enemySpells.splice(i, 1);
            }
        });
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
        this.backgroundImages.forEach((layer, index) => {
            const offsetX = +this.camera_x * layer.speed; // Parallax-Bewegung
            const layerConfig = this.backgroundLayers[index];

            this.ctx.drawImage(layer.img, offsetX, layerConfig.yPosition, layerConfig.width, layerConfig.height);

            // Wiederholung für nahtlosen Scroll
            if (offsetX < 0) {
                this.ctx.drawImage(layer.img, offsetX + layerConfig.width, layerConfig.yPosition, layerConfig.width, layerConfig.height);
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
        this.addObjectsToMap(this.enemySpells);
        this.addToMap(this.character);
        this.addToMap(this.flame);


        this.ctx.translate(-this.camera_x, 0);

        /** Moving fixed to camera */
        this.addToMap(this.hpBar);
        this.addToMap(this.hpFrame);

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
        this.isGameOver = true;
        this.flame.percentage = 0;
        setTimeout(() => {
            this.level.enemies = [];
            this.character.x = 120;
            gameState = "startscreen";
            requestAnimationFrame(render);
        }, 3000);
    }
}