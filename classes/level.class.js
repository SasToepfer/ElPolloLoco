class Level {
    enemies;
    clouds;
    backgrounds;
    runes;
    level_end_x = 720 * 3;

    constructor(enemies, clouds, runes, backgrounds) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.runes = runes;
        this.backgrounds = backgrounds;
    }
}