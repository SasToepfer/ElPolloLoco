class Actor {
    x = 120;
    y = 350;
    height = 100;
    width = 50;
    otherDirection = false;
    img;
    currentImage = 0;
    imageCache = {};
    collisionBox = { xOffset: 10, yOffset: 10, width: 10, height: 10 }

    /**
     * Updates dimensions for scaling based on fullscreen settings.
     * Scales the width, height, and position of the actor according to the current scale factors.
     */
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

    /**
     * Loads a single image from the specified path to render.
     * @param {string} path - The path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the actor onto the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // this.drawRect(ctx);
    }

    /**
     * Gets the corner points of the collision box.
     * @returns {{x: number, y: number, width: number, height: number}} - The position and dimensions of the collision box.
     */
    getCollisionBox() {
        return {
            x: this.x + (this.collisionBox?.xOffset || 0),
            y: this.y + (this.collisionBox?.yOffset || 0),
            width: this.collisionBox?.width || this.width,
            height: this.collisionBox?.height || this.height
        }
    }

    /**
     * Gets the corner points of the deflection box.
     * @returns {{x: number, y: number, width: number, height: number}} - The position and dimensions of the deflection box.
     */
    getRelectionBox() {
        return {
            x: this.x + (this.deflectBox.xOffset || 0),
            y: this.y + (this.deflectBox.yOffset || 0),
            width: this.deflectBox.width || this.width,
            height: this.deflectBox.height || this.height
        }
    }

    /**
     * Draws the collision rectangle for debugging purposes.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
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

    /**
     * Loads images from an array of image paths into the image cache.
     * @param {Array<string>} arr - An array containing paths of images to load.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}