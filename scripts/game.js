let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    switch (e.keyCode) {        
        case 37: case 65: keyboard.LEFT = true; break;
        case 39: case 68: keyboard.RIGHT = true; break;
        case 40: case 83: keyboard.DOWN = true; break;
        case 38: keyboard.UP = true; break;
        case 32: keyboard.SPACE = true; break;
        case 69: keyboard.E = true; break;

        default: break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 65: case 37: keyboard.LEFT = false; break;
        case 68: case 39: keyboard.RIGHT = false; break;
        case 40: case 83: keyboard.DOWN = false; break;
        case 38: keyboard.UP = false; break;
        case 32: keyboard.SPACE = false; break;
        case 69: keyboard.E = false; break;
        default: break;
    }
})