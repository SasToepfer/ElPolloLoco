class Mage extends Entity {
    width = 50;
    height = 100;
    y = 350;
    damage = 1;
    health = 20;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 500;
        this.speed = 5.2 + Math.random() * 0.4;
        this.speed = 0.2 + Math.random() * 0.4;
        //this.animate();
    }

    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 1000 / 6);
    }


    cast() {
        
    }
}