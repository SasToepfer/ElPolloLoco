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

    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }

    getRandomImage() {
        return this.IMAGES[Math.floor(Math.random() *5)]
    }

}

