class CollisionManager {
    character;
    flame;
    keyboard;
    level;
    hpBar;

    constructor(character, flame, keyboard, level, hpBar) {
        this.character = character;
        this.flame = flame;
        this.keyboard = keyboard;
        this.level = level;
        this.hpBar = hpBar;
    }

    checkEnemyCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isInvincible) { return; }
                if (enemy instanceof Blob && this.character.isJumpingOn(enemy)) {
                    enemy.getHit(this.character.damage);
                    this.character.isInvincible = true; // Charakter wird vorübergehend unverwundbar
                    setTimeout(() => {
                        this.character.isInvincible = false; // Nach kurzer Zeit wieder verwundbar
                    }, 400);
                } else {
                    this.character.getHit(enemy.damage);
                    this.hpBar.setPercentage(this.character.health);
                }
            }
        });
    }

    checkRuneCollision(level) {
        this.level.runes.forEach((rune, i) => {
            if (this.character.isColliding(rune) && (this.keyboard.D || this.keyboard.DOWN)) {
                this.flame.percentage = 0;
                this.character.playAnimationWithArgs(this.character.IMAGES_GETMANA, 20, true, () => { this.character.fixedMovement = false, this.character.blockAnimation = false, this.character.fillMana() });
                this.level.runes.splice(i, 1);
            }
        });
    }

    checkCharacterSpellCollision(spells) {
        for (let i = spells.length - 1; i >= 0; i--) {
            let spell = spells[i];
            this.level.enemies.forEach((enemy) => {
                if (spell.isColliding(enemy)) {
                    enemy.getHit(spell.damage);
                    spells.splice(i, 1);
                }
            });
        }
    }

    checkEnemySpellCollision(enemySpells) {
        enemySpells.forEach((spell) => {
            if (this.character.isColliding(spell)) {
                this.character.getHit(spell.damage)
                this.hpBar.setPercentage(this.character.health)
            }
        });
    }
    
}