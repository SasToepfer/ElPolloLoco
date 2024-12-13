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
        this.bindKeyDownEvents();
        this.bindKeyUpEvents();
    }

    /**
     * Binds key down events to the window for tracking key presses.
     */
    bindKeyDownEvents() {
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37: case 65: keyboard.LEFT = true; break;
                case 39: case 68: keyboard.RIGHT = true; break;
                case 40: case 83: keyboard.DOWN = true; break;
                case 38: keyboard.UP = true; break;
                case 32: keyboard.SPACE = true; break;
                case 69: keyboard.E = true; break;
                case 81: keyboard.Q = true; break;
                default: break;
            }
        })
    }

    /**
     * Binds key up events to the window for tracking key releases.
     */
    bindKeyUpEvents() {
        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 65: case 37: keyboard.LEFT = false; break;
                case 68: case 39: keyboard.RIGHT = false; break;
                case 40: case 83: keyboard.DOWN = false; break;
                case 38: keyboard.UP = false; break;
                case 32: keyboard.SPACE = false; break;
                case 69: keyboard.E = false; break;
                case 81: keyboard.Q = false; break;
                default: break;
            }
        })
    }

    /**
     * Initializes button press events for touch interfaces.
     */
    initButtonPressEvents() {
        this.bindBtnPressEvents("btnLeft", this.LEFT);
        this.bindBtnPressEvents("btnDown", this.DOWN);
        this.bindBtnPressEvents("btnRight", this.RIGHT);
        this.bindBtnPressEvents("btnJump", this.SPACE);
        this.bindBtnPressEvents("btnFireball", this.E);
        this.bindBtnPressEvents("btnDeflect", this.Q);
    }

    /**
     * Binds touch events for a specified button to trigger an action.
     * @param {string} button - The ID of the button element.
     * @param {boolean} action - The action to perform on touch events.
     */
    bindBtnPressEvents(button, action) {
        this.bindBtnTouchStart(button, action);
        this.bindBtnTouchEnd(button, action);
    }

    /**
     * Binds touch start event to a button to set the action to true.
     * @param {string} button - The ID of the button element.
     * @param {boolean} action - The action to perform on touch start.
     */
    bindBtnTouchStart(button, action) {
        document.getElementById(button).addEventListener("touchstart", e => {
            e.preventDefault();
            action = true;
            console.log('press');
            
        });
    }

    /**
     * Binds touch end event to a button to set the action to false.
     * @param {string} button - The ID of the button element.
     * @param {boolean} action - The action to perform on touch end.
     */
    bindBtnTouchEnd(button, action) {
        document.getElementById(button).addEventListener("touchend", (e) => {
            e.preventDefault();
            action = false;
        });
    }

}