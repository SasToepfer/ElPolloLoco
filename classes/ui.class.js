class UserInterface extends Actor {
    baseWidth;
    baseHeight;
    baseY;
    canvas;
    ctx;
    keyboardVisible = false;

    /**
     * Creates an instance of the UserInterface.
     * @param {World} world - The world instance that the user interface belongs to.
     * @param {string} listener - The type of listener to add (e.g., "keyboardDisplay" or "toggleSound").
     * @param {string} imagePath - The path to the image to be displayed.
     * @param {number} x - The X coordinate of the user interface element.
     * @param {number} y - The Y coordinate of the user interface element.
     * @param {number} width - The width of the user interface element.
     * @param {number} height - The height of the user interface element.
     */
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

    /**
     * Adds a click listener to the canvas to detect user interactions.
     */
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

    /**
     * Determines which function to call based on the listener type.
     */
    getFunctionToListen() {
        switch (this.listener) {
            case "keyboardDisplay": return this.toggleKeyboardDisplay();
            case "toggleSound": return this.toggleSound();
        
            default:
                break;
        }
    }

    /**
     * Toggles the sound on or off and updates the associated image.
     */
    toggleSound() {
        this.world.muteAllSounds(!this.world.audioManager.isSoundMute);
        this.imagePath = this.world.audioManager.isSoundMute ? "img/ui/sound_off.png" : "img/ui/sound_on.png";
        this.loadImage(this.imagePath);
    }

    toggleMobileButtons() {

    }

    /**
     * Toggles the display of the keyboard instructions.
     */
    toggleKeyboardDisplay() {
        this.keyboardVisible = !this.keyboardVisible; // Status umschalten
    }

    /**
     * Displays the keyboard instructions on the canvas if visible.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
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

    /**
     * Draws multiple lines of text on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     * @param {Array<string>} textLines - The lines of text to draw.
     * @param {number} x - The X position to start drawing.
     * @param {number} y - The Y position to start drawing.
     * @param {number} lineHeight - The height of each line.
     * @param {string} font - The font style and size.
     * @param {string} color - The color of the text.
     */
    drawTextLines(ctx, textLines, x, y, lineHeight, font, color) {
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = "left";
        textLines.forEach((line, index) => {
            ctx.fillText(line, x, y + index * lineHeight);
        });
    }
    
}

