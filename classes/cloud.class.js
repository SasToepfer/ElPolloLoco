class Cloud extends Entity {
    baseWidth = 300;
    baseHeight = 250;
    baseY = 0;

    IMAGES = [
        "img/clouds/cloud1.png",
        "img/clouds/cloud2.png",
        "img/clouds/cloud3.png",
        "img/clouds/cloud4.png",
        "img/clouds/cloud5.png"
    ]

    /**
     * Creates an instance of the Cloud.
     * The cloud is positioned at a specified x-coordinate and has random dimensions and speed.
     * @param {number} x - The x-coordinate where the cloud will be placed.
     */
    constructor(x) {
        super().loadImage(this.getRandomImage());
        this.x = x;
        this.baseY = 0 + (Math.random() - 0.5) * 30;
        this.speed = 0.2 + Math.random() * 0.7;
        this.baseWidth = 150 + (Math.random() - 0.5) * 40;
        this.baseHeight = 100 + (Math.random() - 0.5) * 20;
        this.updateDimensions();
        this.animate();
    }

    /**
     * Initiates the movement of the cloud to the left.
     * The cloud moves at the specified speed, with updates occurring every frame.
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }

    /**
     * Returns a random image from the list of cloud images.
     * @returns {string} - The path of a randomly selected cloud image.
     */
    getRandomImage() {
        return this.IMAGES[Math.floor(Math.random() *5)]
    }

}

