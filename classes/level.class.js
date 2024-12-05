class Level {
    enemies;
    clouds;
    runes;
    level_end_x = 4096 * 2;

    constructor(enemies, clouds, runes) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.runes = runes;
    }
}