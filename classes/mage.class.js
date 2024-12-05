class Mage extends Entity {
    width = 150;
    height = 250;
    y = 220;
    damage = 50;
    health = 20;
    IMAGES_IDLE = [];
    IMAGES_WALKING = [];

    constructor() {
        super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        this.createImageArray(this.IMAGES_IDLE, "img/Enemy/Mage/Mage_Idle/Mage_Idle", 120);
        this.loadImages(this.IMAGES_IDLE);
        this.createImageArray(this.IMAGES_WALKING, "img/Enemy/Mage/Mage_Walk/Mage_Walk", 46);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 500;
        this.speed = 5.2 + Math.random() * 0.4;
        this.speed = 0.2 + Math.random() * 0.4;
        

        this.animate();
    }

    

    animate() {
        // setInterval(() => this.moveLeft(), 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE)
        }, 1000 / 60);
    }


    cast() {
        
    }
}