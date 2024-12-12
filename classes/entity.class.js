class Entity extends Actor {
    speed = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    health = 100;
    lastHit = 0;
    fixedMovement = false;
    blockAnimation = false;
    world;
    audioManager = new SoundManager();

    createImageArray(arr, path, length, offset = 0) {
        for (let index = offset; index < length; index++) {
            switch (true) {
                case index < 10: arr.push(path + "000" + index + ".png"); break;
                case index < 100: arr.push(path + "00" + index + ".png"); break;
                case index < 1000: arr.push(path + "0" + index + ".png"); break;
                default: break;
            }
        }
    }

    playAnimation(arr) {
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed * scaleX;
    }

    moveRight() {
        this.x += this.speed * scaleX;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration * scaleY;
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 260 * scaleY;
    }

    jump() {
        this.speedY = 22 * scaleY;
    }

    isJumpingOn(enemy) {
        const charBox = this.getCollisionBox();
        const enemyBox = enemy.getCollisionBox();
    
        // Prüfen, ob der Charakter über dem Gegner ist
        const isAbove = charBox.y + charBox.height <= enemyBox.y + enemyBox.height / 2;
        const isFalling = this.speedY < 0; // Geschwindigkeit nach unten
    
        return isAbove && isFalling;
    }

    /**
     * Play animation with function call at the end and function call at specific frame
     * @param {Array} arr 
     * @param {float} animationSpeed 
     * @param {boolean} isMovementBlocked 
     * @param {args} endFunction 
     * @param {args} frameCallback 
     * @param {integer} frameCallbackFrame 
     * @param  {...any} args 
     * @returns 
     */
    playAnimationWithArgs(arr, animationSpeed, isMovementBlocked, endFunction, frameCallback = null, frameCallbackFrame = -1, ...args) {
        if (this.blockAnimation) { return }
        this.blockAnimation = true;
        this.fixedMovement = isMovementBlocked;
        let currentFrame = 0;
        const animationFrames = arr;
        const frameInterval = 1000 / animationSpeed;
        const animationInterval = setInterval(() => {
            this.img = this.imageCache[animationFrames[currentFrame]];
            if (frameCallback && currentFrame == frameCallbackFrame) {
                frameCallback();
            }
            currentFrame++;
            if (currentFrame >= animationFrames.length) {
                clearInterval(animationInterval);
                if (typeof endFunction === 'function') {
                    endFunction(...args);
                }
            }
        }, frameInterval);
    }

    isColliding(ent, isDeflect = false) {
        let thisBox;
        thisBox = isDeflect ? this.getRelectionBox() : this.getCollisionBox();
        let entBox = ent.getCollisionBox();

        return (
            thisBox.x < entBox.x + entBox.width &&
            thisBox.x + thisBox.width > entBox.x &&
            thisBox.y < entBox.y + entBox.height &&
            thisBox.y + thisBox.height > entBox.y
        );
    }

    getHit(damage) {
        this.takeDamage(damage);
    }

    isDead() {
        return this.health == 0;
    }

}