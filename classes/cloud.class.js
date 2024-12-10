class Cloud extends Entity {
    width = 300;
    height = 250;

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
        this.y = 0 + (Math.random() - 0.5) * 30;
        this.speed = 0.2 + Math.random() * 0.7;
        this.width = 150 + (Math.random() - 0.5) * 40;
        this.height = 100 + (Math.random() - 0.5) * 20;
        this.animate();
    }

    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
    }

    getRandomImage() {
        return this.IMAGES[Math.floor(Math.random() *5)]
    }

}

