class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    backgroundLayers = [
        { img: 'img/background/Ground_00011_.jpg', speed: 0.2, yPosition: 0, width: 4096 / 1, height: 480 },
        // { img: 'img/layer2.png', speed: 0.5 }, // Gebäude
        { img: 'img/background/sdpixel_floor_00002_.jpg', speed: 1.0, yPosition: 390, width: 4096 / 1, height: 200 }
    ];
    backgroundImages = [];
    camera_x = 0;
    hpFrame = new Statusbar(true, 20, 0, 300, 60);
    hpBar = new Statusbar(false, 80, 20, 180, 20);
    userInterface = new UserInterface(this, "keyboardDisplay", "img/ui/keyboard.png", 20, 50, 50, 40)
    muteButton = new UserInterface(this, "toggleSound", "img/ui/sound_on.png", 30 + this.hpFrame.width, 15, 30, 30)
    flame = new Manaflame(this.character);
    lastFireballTime = 0;
    lastDeflectTime = 0;
    spells = [];
    enemySpells = [];
    isGameOver = false;
    collisionManager = new CollisionManager(this.character, this.flame, keyboard, this.level, this.hpBar);
    spawnManager = new SpawnManager(this);
    audioManager = new SoundManager();

    /**
     * Represents the game world, including character, level, background layers, and game state.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game will be rendered.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.audioManager.playAudio("backgroundMusic");
        this.muteAllSounds(false);
        this.loadBackground();
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.updateAllEntities();
    }

    /** Mute or unmute all sounds in the game. */
    muteAllSounds(bool) {
        this.audioManager.muteSound(bool);
        this.character.audioManager.muteSound(bool);
        this.level.enemies.forEach(e => { e.audioManager.muteSound(bool) });
    }

    /** Update all entities' sizes for fullscreen mode. */
    updateAllEntities() {
        this.character.updateFullscreen();
        this.backgroundLayers.forEach(layer => {
            layer.width *= scaleX;
            layer.height *= scaleY;
            layer.yPosition *= scaleY;
        });
        this.level.enemies.forEach(enemy => enemy.updateDimensions());
        this.level.clouds.forEach(cloud => cloud.updateDimensions());
        this.level.runes.forEach(rune => rune.updateDimensions());
        this.hpFrame.updateDimensions();
        this.hpBar.updateDimensions();
        this.flame.updateDimensions();
    }

    /** Load background images for parallax scrolling. */
    loadBackground() {
        this.backgroundLayers.forEach(layer => {
            const img = new Image();
            img.src = layer.img;
            this.backgroundImages.push({ img, speed: layer.speed });
        });
    }

    /** Initialize world settings, such as character and spawning. */
    setWorld() {
        this.character.world = this;
        this.spawnManager.startSpawning();
        setInterval(() => {
            this.spawnManager.removeOffscreen();
        }, 200);
    }

    /** Delegate checks for dead enemies to the spawn manager. */
    checkEnemyDead() {
        this.spawnManager.checkEnemyDead();
    }

    /** Start a periodic collision check. */
    checkCollisions() {
        setInterval(() => {
            this.collisionManager.checkEnemyCollision();
            this.collisionManager.checkCharacterSpellCollision(this.spells);
            this.collisionManager.checkEnemySpellCollision(this.enemySpells);
            this.collisionManager.checkRuneCollision();
        }, 30);
    }

    /** Check if character can cast a spell based on cooldown. */
    checkSpells(spell) {
        const currentTime = new Date().getTime();
        const cooldown = 2000;
        switch (spell) {
            case "fireball": return (currentTime - this.lastFireballTime >= cooldown) && this.flame.percentage > 0 ? true : false;
            case "deflect": return currentTime - this.lastDeflectTime >= cooldown ? true : false;
            default: break;
        }
    }

    /** Create and cast a fireball spell. */
    castFireball() {
        let fireball = "";
        this.lastFireballTime = new Date().getTime();
        this.flame.percentage -= 20;
        if (this.character.otherDirection) {
            fireball = new Spell(this.character.x, this.character.y + this.character.height / 6, this.character.otherDirection);
        } else {
            fireball = new Spell(this.character.x + this.character.width / 1.5, this.character.y + this.character.height / 6, this.character.otherDirection);
        }
        this.spells.push(fireball);
    }

    /**
     * Create and cast a fireball spell from an enemy.
     * @param {Entity} ent - The entity (enemy) that casts the spell.
     */ 
    castEnemyFireball(ent) {
        let fireball = "";
        if (ent.otherDirection) {
            fireball = new Spell(ent.x, ent.y, false, false);
        } else {
            fireball = new Spell(ent.x, ent.y + ent.height / 4, true, false);
        }
        if (ent.health != 0) {
            this.enemySpells.push(fireball);
        }
    }

    /** Check if the character's deflect box collides with any enemy spells. */
    checkDeflect() {
        this.enemySpells.forEach((spell, i) => {
            if (this.character.isColliding(spell, true)) {
                this.deflectFireball(spell);
                this.enemySpells.splice(i, 1);
            }
        });
    }

    /**
     * Converts an enemy spell into a character spell.
     * @param {Spell} ref - The spell that is being deflected.
     */
    deflectFireball(ref) {
        let fireball = "";
        fireball = new Spell(ref.x, ref.y, false, false);
        this.spells.push(fireball);
    }

    /** Restore character's mana to 100%. */
    fillCharMana() {
        this.flame.percentage = 100;
    }

    /** Draw the main background with parallax effect. */
    drawBackground() {
        this.backgroundImages.forEach((layer, index) => {
            const offsetX = +this.camera_x * layer.speed; // Parallax
            const layerConfig = this.backgroundLayers[index];
            this.ctx.drawImage(layer.img, offsetX - 200, layerConfig.yPosition, layerConfig.width, layerConfig.height);
            if (offsetX < 0) {
                this.ctx.drawImage(layer.img, offsetX + layerConfig.width - 200, layerConfig.yPosition, layerConfig.width, layerConfig.height);
            }
        });
    }

    /** Main draw loop for the game. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.ctx.translate(this.camera_x, 0);
        this.addCameraIndependet();
        this.ctx.translate(-this.camera_x, 0);
        this.addCameraFixed();
        let self = this;
        requestAnimationFrame(() => self.draw())
    }

    /** Draw objects that move independently of the camera. */
    addCameraIndependet() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.runes);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.spells);
        this.addObjectsToMap(this.enemySpells);
        this.addToMap(this.character);
        this.addToMap(this.flame);
    }

    /** Draw objects that move along with the camera. */
    addCameraFixed() {
        this.addToMap(this.hpBar);
        this.addToMap(this.hpFrame);
        this.addToMap(this.userInterface);
        this.addToMap(this.muteButton);
        this.userInterface.showKeyboardDisplay(this.ctx);
    }

    /** Add a single object to the map for drawing. */
    addObjectsToMap(objects) {
        objects.forEach(e => { this.addToMap(e) });
    }

    /** Add a single entity to the map for drawing. */
    addToMap(ent) {
        if (ent.otherDirection) { this.flipImage(ent); }
        ent.draw(this.ctx);
        if (ent.otherDirection) { this.flipImageBack(ent); }
    }

    /** Flip the image for rendering. */
    flipImage(ent) {
        this.ctx.save();
        this.ctx.translate(ent.width, 0);
        this.ctx.scale(-1, 1);
        ent.x = ent.x * -1;
    }

    /** Restore the image to its original orientation. */
    flipImageBack(ent) {
        ent.x = ent.x * -1;
        this.ctx.restore();
    }

    /** Handle game over state when character's health reaches zero. */
    gameOver() {
        this.isGameOver = true;
        this.muteAllSounds(true);
        this.flame.percentage = 0;
        this.level.enemies = [];
        this.spells = [];
        this.enemySpells = [];
        setTimeout(() => {
            this.character.x = 120;
            gameState = "startscreen";
            requestAnimationFrame(render);
            idleIndex = 0;
            deleteWorld();
        }, 3000);
    }
}