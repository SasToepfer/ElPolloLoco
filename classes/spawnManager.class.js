class SpawnManager {
    world;

    constructor(world) {
        this.world = world;
    }

    startSpawning() {
        this.spawnManarune();
        this.spawnClouds();
        this.spawnBlobEnemy();
        this.spawnMageEnemy();
        this.spawnEndboss();
    }

    spawnManarune() {
        this.world.level.runes.push(new Manarune());
    }

    spawnEndboss() {
        this.world.level.enemies.push(new Endboss());
    }

    spawnClouds() {
        setTimeout(() => {
            if (!this.world.isGameOver) {
                this.world.level.clouds.push(new Cloud(this.world.character.x + this.world.canvas.width));
                this.spawnClouds();
            }
        }, 5000 + Math.random() * 4000);
    }

    spawnBlobEnemy() {
        setTimeout(() => {
            if (!this.world.isGameOver) {
                this.world.level.enemies.push(new Blob(this.world));
                this.spawnBlobEnemy();
            }
        }, 5000 + Math.random() * 4000);
    }
    spawnMageEnemy() {
        setTimeout(() => {
            if (!this.world.isGameOver) {
                this.world.level.enemies.push(new Mage(this.world));
                this.spawnMageEnemy();
            }
        }, 15000 + Math.random() * 10000);
    }

    checkEnemyDead() {
        for (let index = 0; index < this.world.level.enemies.length; index++) {
            const element = this.world.level.enemies[index];
            if (element.isDead()) {
                this.world.level.enemies.splice(index, 1);
            }
        }
    }

    removeOffscreen() {
        this.world.level.clouds.forEach((cloud, index) => {
            if (this.world.character.x - 500 >= cloud.x) {
                this.world.level.clouds.splice(index, 1);
            }
        });
        this.world.level.enemies.forEach((enemy, index) => {
            if (this.world.character.x - 500 >= enemy.x) {
                this.world.level.enemies.splice(index, 1);
            }
        });
    }
}