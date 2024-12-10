let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let startScreen;
let keyboard = new Keyboard();
let gameState = "startscreen"; // "startscreen", "game"

let startBackground = new Image();
startBackground.src = "img/startscreen/StartBG.png";
let startButton = { x: canvas.width / 2 - canvas.width / 4.5 / 2, y: canvas.height / 2 - canvas.height / 12 / 2, width: canvas.width / 4.5, height: canvas.height /8, text: "Start Game" };

let fullscreenIcon = new Image();
fullscreenIcon.src = "img/Fullscreen.png";
let fullscreenButton = {x: canvas.width - 50, y: canvas.height - 50, width: 40, height: 40};

function init() {
    createImageArray(idleFrames, "img/startscreen/StartIdle/StartIdle", 80);
    createImageArray(pushFrames, "img/startscreen/StartPush/Pushbutton", 21);
    createImageArray(startFrames, "img/startscreen/Startaction/StartAction", 101);

    canvas.addEventListener("mousemove", (event) => {
        mouseInsideCanvas = true;
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", () => {
        mouseInsideCanvas = false;
    });
    requestAnimationFrame(render);
}

// Animation rendern
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderStartscreen();

    if (gameState == "push") {
        renderPushAnimation();
    } else if (mouseInsideCanvas) {
        renderStartAnimation();
    } else {
        renderIdleAnimation();
    }

    renderStartButton(); // Zeichne den Start-Button
    renderFullscreenButton(); // Zeichne den Fullscreen-Button

    if (gameState !== "game") requestAnimationFrame(render);
}

function renderFullscreenButton() {
    let iconSize = canvas.width / 18; // Dynamische Größe (z. B. 1/18 der Canvas-Breite)
    let iconX = canvas.width - iconSize - 10; // 10px Abstand vom Rand
    let iconY = canvas.height - iconSize - 10; // 10px Abstand vom Rand

    ctx.drawImage(fullscreenIcon, iconX, iconY, iconSize, iconSize);

    // Update für Klick-Events
    fullscreenButton.x = iconX;
    fullscreenButton.y = iconY;
    fullscreenButton.width = iconSize;
    fullscreenButton.height = iconSize;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function renderStartscreen() {
    if (gameState !== "startscreen" && gameState !== "push") return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startBackground, 0, 0, canvas.width, canvas.height);
}

function startGame() {
    world = new World(canvas, keyboard); 
    requestAnimationFrame(() => world.draw()); 
}

function renderStartButton() {
    let buttonWidth = canvas.width / 4.5;
    let buttonHeight = canvas.height / 8;
    let buttonX = canvas.width / 2 - buttonWidth / 2;
    let buttonY = canvas.height / 2 - buttonHeight / 2;

     ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "white";
    ctx.font = `${Math.min(buttonHeight / 2.5, 20)}px Arial`; // Dynamische Schriftgröße
    ctx.textAlign = "center";
    ctx.fillText(
        startButton.text,
        buttonX + buttonWidth / 2,
        buttonY + buttonHeight / 2 + buttonHeight / 8
    );

    startButton.x = buttonX;
    startButton.y = buttonY;
    startButton.width = buttonWidth;
    startButton.height = buttonHeight;
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (
        mouseX >= startButton.x &&
        mouseX <= startButton.x + startButton.width &&
        mouseY >= startButton.y &&
        mouseY <= startButton.y + startButton.height
    ) {
        gameState = "push";
    }

    if (
        mouseX >= fullscreenButton.x &&
        mouseX <= fullscreenButton.x + fullscreenButton.width &&
        mouseY >= fullscreenButton.y &&
        mouseY <= fullscreenButton.y + fullscreenButton.height
    ) {
        toggleFullscreen();
    }
});

window.addEventListener('keydown', (e) => {
    // console.log(e.keyCode);
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

document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = 720; // Ursprüngliche Breite
        canvas.height = 480; // Ursprüngliche Höhe
    }
});