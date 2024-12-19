class UserInterface extends Actor {
    baseWidth;
    baseHeight;
    baseY;
    canvas;
    ctx;
    keyboardVisible = false;
    tooltipAreas = [];
    currentTooltip = "";

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
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const mouseX = (event.clientX - rect.left) * scaleX;
            const mouseY = (event.clientY - rect.top) * scaleY;
            if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
                this.getFunctionToListen();
            }
        });
        this.addTooltipListener();
    }

    /**
     * Adds a mouse movement listener to the canvas to show Tootips.
     */
    addTooltipListener() {
        canvas.addEventListener("mousemove", (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            this.currentTooltip = "";
            if (this.tooltipAreas) {
                this.tooltipAreas.forEach(area => {
                    if (mouseX >= area.x && mouseX <= area.x + area.width &&  mouseY >= area.y && mouseY <= area.y + area.height) {
                        this.currentTooltip = area.tooltip;
                    }
                });
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

    /**
     * Toggles the display of the keyboard instructions.
     */
    toggleKeyboardDisplay() {
        this.keyboardVisible = !this.keyboardVisible;
    }

    /**
     * Displays the keyboard instructions on the canvas if visible.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    showKeyboardDisplay(ctx) {
        if (this.keyboardVisible) {
            const instructions = [
                { text: "a / d = Move", tooltip: "Move left and right" },
                { text: "space = Jump", tooltip: "Jump to avoid obstacles and enemies" },
                { text: "e = Fireball", tooltip: "Shoot a fireball at enemies" },
                { text: "q = Reflect", tooltip: "Deflect enemy spells with the right timing" },
                { text: "s = Collect Mana", tooltip: "Fill the Flame in your Hand with blue glyphs on the ground" },
            ];
            ctx.font = `${Math.round(16 * scaleY)}px Sour Gummy`;
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            this.tooltipAreas = [];
            this.drawAndSafeTooltips(instructions);
        }
    }

    /**
     * Text and Tooltips to render
     * @param {Object} instructions Text and Tooltip array
     */
    drawAndSafeTooltips(instructions) {
        const startX = 20;
        const startY = 100 * scaleY;
        const lineHeight = 20 * scaleY;
        instructions.forEach((instruction, index) => {
            const textWidth = ctx.measureText(instruction.text).width;
            const posY = startY + index * lineHeight;
            ctx.fillText(instruction.text, startX, posY);
            this.tooltipAreas.push({
                x: startX,
                y: posY - lineHeight / 2,
                width: textWidth,
                height: lineHeight,
                tooltip: instruction.tooltip
            });
        });
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

    renderTooltip(ctx) {
        if (this.currentTooltip && this.keyboardVisible) {
            const tooltipX = mouseX + 15;
            const tooltipY = mouseY - 30;
            const padding = 5;
            const fontSize = Math.round(14 * scaleY);
            ctx.font = `${fontSize}px Arial`;
            const textWidth = ctx.measureText(this.currentTooltip).width;
            const boxWidth = textWidth + 2 * padding;
            const boxHeight = fontSize + 2 * padding;
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(tooltipX, tooltipY, boxWidth, boxHeight);
            ctx.fillStyle = "white";
            ctx.fillText(this.currentTooltip, tooltipX + padding, tooltipY + boxHeight / 2 + fontSize / 4);
        }
    }

}
