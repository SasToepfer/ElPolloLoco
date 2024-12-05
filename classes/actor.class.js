class Actor {
    img;
    currentImage = 0;
    imageCache = {};

    x = 120;
    y = 350;
    height = 100;
    width = 50;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // this.drawRect(ctx);
    }

    getCollisionBox() {
        return {
            x: this.x + (this.collisionBox?.xOffset || 0),
            y: this.y + (this.collisionBox?.yOffset || 0),
            width: this.collisionBox?.width || this.width,
            height: this.collisionBox?.height || this.height
        }
    }

    drawRect(ctx) {
        let box = this.getCollisionBox();
        let color = "blue";

        if (this instanceof Mage) color = "blue";
        if (this instanceof Character) color = "green";
        if (this instanceof Manarune) color = "red";

        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = color;
        ctx.rect(box.x, box.y, box.width, box.height);
        ctx.stroke();
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}