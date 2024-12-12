class UserInterface extends Actor {
    baseWidth;
    baseHeight;
    baseY;
    canvas;
    ctx;
    keyboardVisible = false;

    constructor(world, listener, imagePath, x, y, width, height) {
        super();
        this.world = world;
        this.canvas = world.canvas;
        this.ctx = world.ctx;
        this.imagePath = imagePath;
        this.loadImage(this.imagePath);
        this.x = x;
        this.baseY = y;
        this.baseWidth = width;
        this.baseHeight = height;
        this.listener = listener;
        this.updateDimensions();
        this.addListener()
        
    }

    addListener() {
        canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            if (
                mouseX >= this.x &&
                mouseX <= this.x + this.width &&
                mouseY >= this.y &&
                mouseY <= this.y + this.height
            ) {
                this.getFunctionToListen();
            }
        });
    }

    getFunctionToListen() {
        switch (this.listener) {
            case "keyboardDisplay": return this.toggleKeyboardDisplay();
            case "toggleSound": return this.toggleSound();
        
            default:
                break;
        }
    }

    toggleSound() {
        this.world.muteAllSounds(!this.world.audioManager.isSoundMute);
        this.imagePath = this.world.audioManager.isSoundMute ? "img/ui/sound_off.png" : "img/ui/sound_on.png";
        this.loadImage(this.imagePath);
    }

    toggleMobileButtons() {

    }

    toggleKeyboardDisplay() {
        this.keyboardVisible = !this.keyboardVisible; // Status umschalten
    }

    showKeyboardDisplay(ctx) {
        if (this.keyboardVisible) {
            const instructions = [
                "a / d = Move",
                "space = Jump",
                "e = Fireball",
                "q = Reflect",
                "s = Collect Mana"
            ];
            const startX = 20; // X-Position
            const startY = 100 * scaleY; // Start Y-Position
            const lineHeight = 20 * scaleY; // Abstand zwischen den Zeilen
            const font = `${Math.round(16 * scaleY)}px Arial`; // Schriftgröße und -art
            const color = "white"; // Textfarbe
            this.drawTextLines(ctx, instructions, startX, startY, lineHeight, font, color);
        }
    }

    drawTextLines(ctx, textLines, x, y, lineHeight, font, color) {
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = "left";
        textLines.forEach((line, index) => {
            ctx.fillText(line, x, y + index * lineHeight);
        });
    }
    
}

