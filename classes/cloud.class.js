class Cloud extends Entity {
    width = 300;
    height = 250;
   

    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = 720 - 200;
        this.y = 30;
        this.speed = 0.2;
        this.animate();

    }

    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);
        
    }

}

