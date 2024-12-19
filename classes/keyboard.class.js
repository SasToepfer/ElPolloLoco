/**
 * Manages keyboard input for the game, tracking the state of various keys.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    A = false;
    D = false;
    E = false;
    Q = false;

    constructor() {
        this.bindKeyPressEvents();
        this.initButtonPressEvents();
    }

    /**
     * Binds key press events for the keyboard.
     */
    bindKeyPressEvents() {
        window.addEventListener("keydown", (e) => this.handleKeyChange(e, true));
        window.addEventListener("keyup", (e) => this.handleKeyChange(e, false));
    }

    /**
     * Handles key changes for keydown and keyup events.
     * @param {KeyboardEvent} e - The keyboard event.
     * @param {boolean} isPressed - Whether the key is pressed or released.
     */
    handleKeyChange(e, isPressed) {
        switch (e.keyCode) {
            case 37: case 65: this.LEFT = isPressed; break;
            case 39: case 68: this.RIGHT = isPressed; break;
            case 38: this.UP = isPressed; break;
            case 40: case 83: this.DOWN = isPressed; break;
            case 32: this.SPACE = isPressed; break;
            case 69: this.E = isPressed; break;
            case 81: this.Q = isPressed; break;
            default: break;
        }
    }

    /**
     * Initializes button press events for touch interfaces.
     */
    initButtonPressEvents() {
        const buttonMappings = {
            btnLeft: "LEFT",
            btnDown: "DOWN",
            btnRight: "RIGHT",
            btnJump: "SPACE",
            btnFireball: "E",
            btnDeflect: "Q",
        };

        for (const [buttonId, property] of Object.entries(buttonMappings)) {
            this.bindBtnPressEvents(buttonId, property);
        }
    }

    /**
     * Binds touch events for a specified button to trigger an action.
     * @param {string} buttonId - The ID of the button element.
     * @param {string} property - The name of the property to modify.
     */
    bindBtnPressEvents(buttonId, property) {
        const buttonElement = document.getElementById(buttonId);
        if (!buttonElement) {
            console.warn(`Button with ID '${buttonId}' not found.`);
            return;
        }

        buttonElement.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this[property] = true;
        });

        buttonElement.addEventListener("touchend", (e) => {
            e.preventDefault();
            this[property] = false;
        });
    }

}