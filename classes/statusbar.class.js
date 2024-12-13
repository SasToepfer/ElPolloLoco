class Statusbar extends Actor {
    percentage = 100;
    maxWidth;
    baseWidth;
    baseHeight;
    baseY;

    /**
     * Creates an instance of the Statusbar.
     * @param {boolean} isFrame - Indicates if the status bar is a frame or a background.
     * @param {number} x - The x-coordinate of the status bar.
     * @param {number} y - The y-coordinate of the status bar.
     * @param {number} width - The base width of the status bar.
     * @param {number} height - The base height of the status bar.
     */
    constructor(isFrame, x, y, width, height) {
        super();
        this.x = x;
        this.baseY = y;
        this.baseWidth = width;
        this.baseHeight = height;
        this.maxWidth = this.baseWidth;

        isFrame 
            ? this.loadImage("img/stats/HP_Bar_Frame.png") 
            : this.loadImage("img/stats/HP_Bar_Background.png");
        this.setPercentage(100);
        this.updateDimensions();
    }

    /**
     * Sets the percentage of the status bar.
     * @param {number} percentage - The percentage to set (0 to 100).
     */
    setPercentage(percentage) {
        this.width = this.baseWidth * (percentage / 100); 
    }

    /**
     * Updates the dimensions of the status bar based on the scale.
     */
    updateDimensions() {
        this.height = this.baseHeight * scaleY; 
        this.y = this.baseY * scaleY;
    }
}
