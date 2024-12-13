class CollisionManager {
    character;
    flame;
    keyboard;
    level;
    hpBar;

    /**
     * Creates an instance of the CollisionManager.
     * @param {Character} character - The character instance to manage collisions for.
     * @param {Manaflame} flame - The mana flame effect associated with the character.
     * @param {Object} keyboard - The keyboard input object to track key presses.
     * @param {Level} level - The current level containing enemies and runes.
     * @param {Statusbar} hpBar - The health status bar for the character.
     */
    constructor(character, flame, keyboard, level, hpBar) {
        this.character = character;
        this.flame = flame;
        this.keyboard = keyboard;
        this.level = level;
        this.hpBar = hpBar;
    }

    /**
     * Checks for collisions between the character and enemies.
     * If the character collides with a Blob enemy while jumping, the enemy takes damage.
     * If the character is not invincible, it takes damage from the enemy.
     */
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

    /**
     * Checks for collisions between the character and runes.
     * If the character collides with a rune and presses the corresponding key,
     * the rune is removed, and the character's mana is filled.
     * @param {Level} level - The current level containing runes.
     */
    checkRuneCollision(level) {
        this.level.runes.forEach((rune, i) => {
            if (this.character.isColliding(rune) && (this.keyboard.D || this.keyboard.DOWN)) {
                this.flame.percentage = 0;
                this.character.playAnimationWithArgs(this.character.IMAGES_GETMANA, 20, true, () => { this.character.fixedMovement = false, this.character.blockAnimation = false, this.character.fillMana() });
                this.level.runes.splice(i, 1);
            }
        });
    }

    /**
     * Checks for collisions between character spells and enemies.
     * If a spell collides with an enemy, the enemy takes damage and the spell is removed.
     * @param {Array} spells - An array of spells currently in play.
     */
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

    /**
     * Checks for collisions between enemy spells and the character.
     * If an enemy spell collides with the character, the character takes damage.
     * @param {Array} enemySpells - An array of spells cast by enemies.
     */
    checkEnemySpellCollision(enemySpells) {
        enemySpells.forEach((spell) => {
            if (this.character.isColliding(spell)) {
                this.character.getHit(spell.damage)
                this.hpBar.setPercentage(this.character.health)
            }
        });
    }
}