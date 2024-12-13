/**
 * Represents an entity in the game, extending the Actor class.
 * Entities have movement, health, and can perform actions such as jumping and playing animations.
 */
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

    /**
     * Creates an array of image paths for animations based on the specified parameters.
     * @param {Array} arr - The array to fill with image paths.
     * @param {string} path - The base path for the images.
     * @param {number} length - The total number of images to create paths for.
     * @param {number} [offset=0] - The starting index for creating image paths.
     */
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

    /**
     * Plays an animation from the specified array of images.
     * @param {Array} arr - The array of image paths for the animation.
     */
    playAnimation(arr) {
        let i = this.currentImage % arr.length;
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the entity to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed * scaleX;
    }

    /**
     * Moves the entity to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed * scaleX;
    }

    /**
     * Applies gravity to the entity, moving it downward over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration * scaleY;
            }

        }, 1000 / 25);
    }

    /**
    * Checks if the entity is above the ground.
    * @returns {boolean} True if the entity is above the ground, otherwise false.
    */
    isAboveGround() {
        return this.y < 260 * scaleY;
    }

    /**
     * Makes the entity jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 22 * scaleY;
    }

    /**
     * Checks if the entity is jumping on an enemy.
     * @param {Entity} enemy - The enemy entity to check against.
     * @returns {boolean} True if the entity is jumping on the enemy, otherwise false.
     */
    isJumpingOn(enemy) {
        const charBox = this.getCollisionBox();
        const enemyBox = enemy.getCollisionBox();

        // Prüfen, ob der Charakter über dem Gegner ist
        const isAbove = charBox.y + charBox.height <= enemyBox.y + enemyBox.height / 2;
        const isFalling = this.speedY < 0; // Geschwindigkeit nach unten

        return isAbove && isFalling;
    }

    /**
     * Plays an animation with specified parameters and callbacks.
     * @param {Array} arr - The array of image paths for the animation.
     * @param {number} animationSpeed - The speed of the animation.
     * @param {boolean} isMovementBlocked - Whether to block movement during the animation.
     * @param {function} endFunction - The function to call when the animation ends.
     * @param {function} [frameCallback=null] - An optional callback function to call at a specific frame.
     * @param {number} [frameCallbackFrame=-1] - The specific frame to trigger the frame callback.
     * @param {...any} args - Additional arguments to pass to the endFunction.
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

    /**
     * Checks if this entity is colliding with another entity.
     * @param {Entity} ent - The other entity to check collision with.
     * @param {boolean} [isDeflect=false] - Whether to use the reflection box for collision.
     * @returns {boolean} True if there is a collision, otherwise false.
     */
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

    /**
     * Applies damage to the entity.
     * @param {number} damage - The amount of damage to apply.
     */
    getHit(damage) {
        this.takeDamage(damage);
    }

    /**
     * Checks if the entity is dead based on its health.
     * @returns {boolean} True if the entity is dead, otherwise false.
     */
    isDead() {
        return this.health == 0;
    }

}