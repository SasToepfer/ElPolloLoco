let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let startScreen;
let keyboard = new Keyboard();
let gameState = "startscreen"; 
const BASE_WIDTH = 720; 
const BASE_HEIGHT = 480; 
let scaleX = canvas.width / BASE_WIDTH;
let scaleY = canvas.height / BASE_HEIGHT;

let startBackground = new Image();
startBackground.src = "img/startscreen/StartBG.jpg";
let startButton = { x: canvas.width / 2 - canvas.width / 4.5 / 2, y: canvas.height / 2 - canvas.height / 12 / 2, width: canvas.width / 4.5, height: canvas.height / 8, text: "Start Game" };

let winBackground = new Image();
winBackground.src = "img/background/winBackground.jpg";

let fullscreenIcon = new Image();
fullscreenIcon.src = "img/ui/Fullscreen.png";
let fullscreenButton = { x: canvas.width - 50, y: canvas.height - 50, width: 40, height: 40 };

/**
 * Initializes the game and loads images.
 */
function init() {
    createImageArray(idleFrames, "img/startscreen/StartIdle/StartIdle", 80);
    createImageArray(pushFrames, "img/startscreen/StartPush/Pushbutton", 21);
    createImageArray(startFrames, "img/startscreen/Startaction/StartAction", 101);
    createImageArray(winFrames, "img/startscreen/Won/gameWon", 40);
    requestAnimationFrame(render);
}

/** 
 * Main render loop that updates the screen.
 */
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState == "won" ? showGameWonScreen() : showTitleScreen();
    if (gameState !== "game") {
        requestAnimationFrame(render);
    }
}

/** Renders Title screen */
function showTitleScreen() {
    const rect = canvas.getBoundingClientRect();
    ctx.drawImage(startBackground, 0, 0, canvas.width, canvas.height);
    if (gameState === "startscreen") {
        if (!mouseInsideCanvas) {
            renderLoopAnimation("idle");
        } else {
            renderStartAnimation();
        }
    } else if (gameState === "push") {
        renderPushAnimation();
    }
    renderStartButton();
    rect.height >= 480 ? renderFullscreenButton() : renderMobileButtons();
}

/** Render Game Won Screen */
function showGameWonScreen() {
    ctx.drawImage(winBackground, 0, 0, canvas.width, canvas.height);
    FrameDelay = 30;
    renderLoopAnimation("won");
    ctx.fillStyle = "white"; 
    ctx.font = "bold 48px Arial"; 
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle"; 
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.fillText("Game Won", centerX, centerY);
}

/**
 * Renders mobile buttons (currently not implemented).
 */
function renderMobileButtons(params) {

}

/** 
 * Renders the fullscreen button in the lower right corner. 
 */
function renderFullscreenButton() {
    let iconSize = canvas.width / 18;
    let iconX = canvas.width - iconSize - 10;
    let iconY = canvas.height - iconSize - 10;
    ctx.drawImage(fullscreenIcon, iconX, iconY, iconSize, iconSize);
    fullscreenButton.x = iconX;
    fullscreenButton.y = iconY;
    fullscreenButton.width = iconSize;
    fullscreenButton.height = iconSize;
}

/** 
 * Toggles fullscreen mode when the button is pressed. 
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

/** 
 * Renders the background of the start screen (not active when the game is running). 
 */
function renderStartscreen() {
    if (gameState !== "startscreen" && gameState !== "push") return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(startBackground, 0, 0, canvas.width, canvas.height);
}

/** 
 * Starts the game and switches to the game state. 
 */
function startGame() {
    gameState = "game";
    world = new World(canvas, keyboard);
}

/** 
 * Deletes the world when the game is over. 
 */
function deleteWorld() {
    world = null;
}

/** 
 * Renders the start button on the start screen. 
 */
function renderStartButton() {
    let buttonWidth = canvas.width / 4.5;
    let buttonHeight = canvas.height / 8;
    let buttonX = canvas.width / 2 - buttonWidth / 2;
    let buttonY = canvas.height / 2 - buttonHeight / 2;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "white";
    ctx.font = `${Math.min(buttonHeight / 2.5, 20)}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(startButton.text, buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + buttonHeight / 8);
    startButton.x = buttonX;
    startButton.y = buttonY;
    startButton.width = buttonWidth;
    startButton.height = buttonHeight;
}

/** 
 * Monitors mouse movement inside the canvas. 
 */
canvas.addEventListener("mousemove", (event) => {
    mouseInsideCanvas = true;
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

/** 
 * Monitors when the mouse leaves the canvas. 
 */
canvas.addEventListener("mouseleave", () => {
    mouseInsideCanvas = false;
});

/** 
 * Monitors click events within the canvas. 
 */
canvas.addEventListener("click", (event) => {
    addStartButtonListener(event);
    addFullscreenButtonListener(event);
});

/** 
 * Listener for the start button to start the game. 
 */
function addStartButtonListener(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (
        mouseX >= startButton.x &&
        mouseX <= startButton.x + startButton.width &&
        mouseY >= startButton.y &&
        mouseY <= startButton.y + startButton.height &&
        gameState != "game"
    ) {
        pushIndex = 0;
        gameState = "push";
    }
}

/** 
 * Listener for the fullscreen button. 
 */
function addFullscreenButtonListener(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    if (
        mouseX >= fullscreenButton.x &&
        mouseX <= fullscreenButton.x + fullscreenButton.width &&
        mouseY >= fullscreenButton.y &&
        mouseY <= fullscreenButton.y + fullscreenButton.height &&
        gameState != "game" &&
        rect.height >= 480
    ) {
        toggleFullscreen();
    }
}

/** Fullscreen Listener -> Changes scaleX and scaleY dependent on Canvas Size */
document.addEventListener("fullscreenchange", () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.height < 480) return;
    if (document.fullscreenElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = BASE_WIDTH; // Ursprüngliche Breite
        canvas.height = BASE_HEIGHT; // Ursprüngliche Höhe
    }
    scaleX = canvas.width / BASE_WIDTH;
    scaleY = canvas.height / BASE_HEIGHT;
    if (gameState == "game") {
        world.updateAllEntities();
    }
});