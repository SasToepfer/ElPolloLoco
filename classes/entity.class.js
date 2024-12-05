class Entity extends Actor {
    speed = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    health = 100;
    lastHit = 0;

    createImageArray(arr, path, length) {
        for (let index = 0; index < length; index++) {
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
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 260;
    }

    jump() {
        this.speedY = 22;
    }

    isColliding(ent) {
        let additionalwidth;
        if (ent instanceof Manarune) {
            additionalwidth = ent.width / 2;
        } else {
            additionalwidth = 0;
        }
        return (this.x + this.width / 2.5) + this.width / 4 > ent.x &&
            (this.y + this.height / 10) + this.height / 1.25 > ent.y &&
            this.x < ent.x + additionalwidth &&
            this.y < ent.y + ent.height;
    }

    getHit(damage) {
        if (this instanceof Character) {
            this.takeDamage(damage);
        } else {
            if (this.health - damage > 0){
                this.health -= damage;
            } else {
                this.health = 0;
            }
        }
    }

    isDead() {
        return this.health == 0;
    }

}