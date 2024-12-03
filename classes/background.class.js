class Background extends Entity {
    
    height = 480;
    width = 2803;
    

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x -100;
        this.y = 420 - this.height;
        
    }
}