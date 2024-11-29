class Entity extends Actor {
    speed = 0;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    health = 100;
    lastHit = 0;

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


        return this.y < 310;
    }

    jump() {
        this.speedY = 22;
    }

    isColliding(ent) {
        let additionalwidth;
        if (ent instanceof Manarune) {
            additionalwidth = ent.width /2;
        } else {
            additionalwidth = 0;
        }
        return (this.x + this.width / 2.5) + this.width / 4 > ent.x &&
        (this.y+this.height /10) + this.height / 1.25 > ent.y &&
        this.x < ent.x + additionalwidth &&
        this.y < ent.y + ent.height;
    }

    getHit(damage) {
        if (this.health - damage > 0) {
            this.health -= damage;
            this.lastHit = new Date().getTime();
        } else {
            this.health = 0;
        }
    }

    isDead() {
        return this.health == 0;            
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }
}