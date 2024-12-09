class Actor {
    x = 120;
    y = 350;
    height = 100;
    width = 50;
    img;
    currentImage = 0;
    imageCache = {};
    collisionBox = { xOffset: 10, yOffset: 10, width: 10, height: 10 }

    updateDimensions() {
        this.width = this.baseWidth * scaleX;
        this.height = this.baseHeight * scaleY;
        this.y = this.baseY * scaleY;

        this.collisionBox = {
            xOffset: (this.baseCollisionBox?.xOffset || 0) * scaleX,
            yOffset: (this.baseCollisionBox?.yOffset || 0) * scaleY,
            width: (this.baseCollisionBox?.width || this.baseWidth) * scaleX,
            height: (this.baseCollisionBox?.height || this.baseHeight) * scaleY,
        };
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.drawRect(ctx);
    }

    getCollisionBox() {
        return {
            x: this.x + (this.collisionBox?.xOffset || 0),
            y: this.y + (this.collisionBox?.yOffset || 0),
            width: this.collisionBox?.width || this.width,
            height: this.collisionBox?.height || this.height
        }
    }

    getRelectionBox() {
        return {
            x: this.x + (this.deflectBox.xOffset || 0),
            y: this.y + (this.deflectBox.yOffset || 0),
            width: this.deflectBox.width || this.width,
            height: this.deflectBox.height || this.height
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
        if (this instanceof Character) {
            color = "yellow";
            let defBox = this.getRelectionBox()
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = color;
            ctx.rect(defBox.x, defBox.y, defBox.width, defBox.height);
            ctx.stroke();

        }
        color = "yellow";
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    
}