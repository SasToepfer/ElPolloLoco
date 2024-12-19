class SpawnManager {
    world;
    isEndbossSpawned = false;

    constructor(world) {
        this.world = world;
    }

    /** Init spawns and spawn Loops */
    startSpawning() {
        this.spawnManarune();
        this.spawnClouds();
        this.spawnBlobEnemy();
        this.spawnMageEnemy();
    }

    /** Spawn mana regain Runes on floor */
    spawnManarune() {
        this.world.level.runes.push(new Manarune(200));
        this.world.level.runes.push(new Manarune(5500));
        this.world.level.runes.push(new Manarune(2700));
    }

    /** Spawns Endboss */
    spawnEndboss() {
        if (!this.isEndbossSpawned) {
            this.isEndbossSpawned = true;
            this.world.level.enemies.push(new Endboss(this.world));
            this.world.initEndboss();
        }
    }

    /** Spawn Clouds until GameOver is triggered */
    spawnClouds() {
        setTimeout(() => {
            if (!this.world.isGameOver) {
                this.world.level.clouds.push(new Cloud(this.world.character.x + this.world.canvas.width));
                this.spawnClouds();
            }
        }, 5000 + Math.random() * 4000);
    }

    /** Spawn Pink Blobs until GameOver is triggered or Endboss is Spawned*/
    spawnBlobEnemy() {
        setTimeout(() => {
            if (!this.world.isGameOver && !this.isEndbossSpawned) {
                this.world.level.enemies.push(new Blob(this.world));
                this.spawnBlobEnemy();
            }
        }, 3000 + Math.random() * 4000);
    }

    /** Spawn Zombie Mage until GameOver is triggered or Endboss is Spawned*/
    spawnMageEnemy() {
        setTimeout(() => {
            if (!this.world.isGameOver && !this.isEndbossSpawned) {
                this.world.level.enemies.push(new Mage(this.world));
                this.spawnMageEnemy();
            }
        }, 6000 + Math.random() * 10000);
    }

    /** Checks if any Enemy has 0 Hp and removes them from Array enemies in world */
    checkEnemyDead() {
        for (let index = 0; index < this.world.level.enemies.length; index++) {
            const element = this.world.level.enemies[index];
            if (element.isDead()) {
                this.world.level.enemies.splice(index, 1);
            }
        }
    }

    /** Checks if any Actor is far out from Canvas and removes this Actor */
    removeOffscreen() {
        this.world.level.clouds.forEach((cloud, index) => { if (this.world.character.x - 500 >= cloud.x) { this.world.level.clouds.splice(index, 1); } });
        this.world.level.enemies.forEach((enemy, index) => { if (this.world.character.x - 500 >= enemy.x) { this.world.level.enemies.splice(index, 1); } });
        this.world.spells.forEach((spell, index) => {
            if (this.world.character.x - 500 >= spell.x || this.world.character.x + this.world.canvas.width + 200 <= spell.x) {
                this.world.spells.splice(index, 1);
            }
        });
        this.removeOffscreenEnemySpells();
    }

    /** Checks if any Enemy Spell is far out from Canvas and removes this Actor */
    removeOffscreenEnemySpells() {
        this.world.enemySpells.forEach((spell, index) => {
            if (this.world.character.x - 500 >= spell.x || this.world.character.x + this.world.canvas.width + 200 <= spell.x) {
                this.world.enemySpells.splice(index, 1);
            }
            if (spell.y > 400 * scaleY) {
                this.world.enemySpells.splice(index, 1);
            }
        });
    }
}