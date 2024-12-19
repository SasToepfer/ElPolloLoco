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
 * Check if the device is a touch device.
 * @returns {boolean} true if the device supports touch input.
 */
function isTouchDevice() {
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);
}

/**
 * Shows the mobile buttons if the device is a touch device.
 */
function showMobileButtons() {
    if (isTouchDevice()) {
        document.querySelector('.mobile-buttons').style.display = 'flex';
        document.querySelector('.screen-warning').style.display = 'none';
    } else {
        document.querySelector('.screen-warning').style.display = 'block';
    }
}

/**
 * Initializes the game and loads images.
 */
function init() {
    showMobileButtons();
    createImageArray(idleFrames, "img/startscreen/StartIdle/StartIdle", 80);
    createImageArray(pushFrames, "img/startscreen/StartPush/Pushbutton", 21);
    createImageArray(startFrames, "img/startscreen/Startaction/StartAction", 101);
    createImageArray(winFrames, "img/startscreen/Won/gameWon", 40);
    createImageArray(lostFrames, "img/startscreen/Lost/gameLost", 40);
    requestAnimationFrame(render);
}

/** 
 * Main render loop that updates the screen.
 */
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let mobileButtons = document.querySelector('.mobile-buttons').style
    if (gameState == "won") {
        showGameWonScreen();
    } else if (gameState == "lose") {
        showgameLoseScreen();
    } else {
        showTitleScreen();
    }
    mobileButtons.display = ( gameState === "game" && isTouchDevice()) ? "flex" : "none";
    if (gameState !== "game") {requestAnimationFrame(render)}
}

/** Renders Title screen */
function showTitleScreen() {
    const rect = canvas.getBoundingClientRect();
    ctx.drawImage(startBackground, 0, 0, canvas.width, canvas.height);
    if (gameState === "startscreen") {
        !mouseInsideCanvas ? renderLoopAnimation("idle") : renderStartAnimation();
    } else if (gameState === "push") {
        renderPushAnimation();
    }
    renderStartButton(startButton.text);
    if (rect.height >= 480) { 
        renderFullscreenButton();
    }
}

/** Render Game Won Screen */
function showGameWonScreen() {
    ctx.drawImage(winBackground, 0, 0, canvas.width, canvas.height);
    FrameDelay = 30;
    renderLoopAnimation("won");
    createScreenText("Game Won!")
}

/** Render Game Lost Screen */
function showgameLoseScreen() {
    ctx.drawImage(winBackground, 0, 0, canvas.width, canvas.height);
    FrameDelay = 30;
    renderLoopAnimation("lost");
    createScreenText("Game Lost!", canvas.width / 2, canvas.height / 4)
    renderStartButton("Play Again");
}

/**
 * Displays Text to screen
 * @param {*} text The text to display
 * @param {*} x x-axis; default middle of canvas
 * @param {*} y y-axis; default middle of canvas
 */
function createScreenText(text, x = canvas.width / 2, y = canvas.height / 2) {
    ctx.fillStyle = "white";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const centerX = x;
    const centerY = y;
    ctx.fillText(text, centerX, centerY);
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
    addWorldButtonHoverListener();
    canvas.style.cursor = "default";
}

/** 
 * Deletes the world when the game is over. 
 */
function deleteWorld() {
    world = null;
}

/** create a and renders a Start Game Button */
function renderStartButton(text) {
    createStartButton(text);
    positionStartButton();
}

/**
 * Render button on canvas
 * @param {string} text Text on button
 */
function createStartButton(text) {
    const rect = canvas.getBoundingClientRect();
    const buttonWidth = rect.width / 4.5;
    const buttonHeight = rect.height / 8;
    const buttonX = rect.width / 2 - buttonWidth / 2;
    const buttonY = rect.height / 2 - buttonHeight / 2;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(buttonX / rect.width * canvas.width, buttonY / rect.height * canvas.height, buttonWidth / rect.width * canvas.width, buttonHeight / rect.height * canvas.height);
    ctx.fillStyle = "white";
    ctx.font = `${Math.min(buttonHeight / 2.5, 20)}px Sour Gummy`;
    ctx.textAlign = "center";
    ctx.fillText(text, (buttonX + buttonWidth / 2) / rect.width * canvas.width, (buttonY + buttonHeight / 2) / rect.height * canvas.height + buttonHeight / 8);
}

/** Position button on center of screen */
function positionStartButton() {
    const rect = canvas.getBoundingClientRect();
    const buttonWidth = rect.width / 4.5;
    const buttonHeight = rect.height / 8;
    const buttonX = rect.width / 2 - buttonWidth / 2;
    const buttonY = rect.height / 2 - buttonHeight / 2;
    startButton.x = buttonX / rect.width * canvas.width;
    startButton.y = buttonY / rect.height * canvas.height;
    startButton.width = buttonWidth / rect.width * canvas.width;
    startButton.height = buttonHeight / rect.height * canvas.height;
}

/** 
 * Monitors mouse movement inside the starting screen canvas. 
 */
canvas.addEventListener("mousemove", (event) => {
    mouseInsideCanvas = true;
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    const overStartButton = isMouseHoveringOver(startButton);
    const overFullscreenButton = isMouseHoveringOver(fullscreenButton);
    if (gameState == "startscreen") {
        canvas.style.cursor = (overStartButton || overFullscreenButton) ? "pointer" : "default";
    }
    if (gameState == "lose") {
        canvas.style.cursor = overStartButton ? "pointer" : "default";
    }
});

/** 
 * Monitors mouse movement inside the World canvas. 
 */
function addWorldButtonHoverListener() {
    canvas.addEventListener("mousemove", () => {
        const overDisplayButton = isMouseHoveringOver(world.userInterface);
        const overMuteButton = isMouseHoveringOver(world.muteButton);
        if (gameState == "game") {
            canvas.style.cursor = (overDisplayButton || overMuteButton) ? "pointer" : "default";
        }
    });
}

/**
 * 
 * @param {rect} actor displayed rect to check 
 * @returns boolean true when hovering
 */
function isMouseHoveringOver(actor) {
    const rect = canvas.getBoundingClientRect();
    const scaledMouseX = (mouseX / rect.width) * canvas.width;
    const scaledMouseY = (mouseY / rect.height) * canvas.height;
    return (
        scaledMouseX >= actor.x &&
        scaledMouseX <= actor.x + actor.width &&
        scaledMouseY >= actor.y &&
        scaledMouseY <= actor.y + actor.height
    );
}

/** 
 * Monitors when the mouse leaves the canvas. 
 */
canvas.addEventListener("mouseleave", () => {
    mouseInsideCanvas = false;
    canvas.style.cursor = "default";
});

/** 
 * Monitors click events within the canvas. 
 */
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    addStartButtonListener(); 
    addFullscreenButtonListener(event);
});

/** Starts Push animation if Started playing, else Starts Game immediately */
function addStartButtonListener() {
    if (isMouseHoveringOver(startButton) && gameState != "game") {
        if (gameState == "lose") {
            gameState = "game";
            startGame();
        } else {
            pushIndex = 0;
            gameState = "push";
        }
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
        canvas.width = BASE_WIDTH;
        canvas.height = BASE_HEIGHT;
    }
    scaleX = canvas.width / BASE_WIDTH;
    scaleY = canvas.height / BASE_HEIGHT;
    if (gameState == "game") {
        world.updateAllEntities();
    }
});

/** monitors if the website gehts resized */
window.addEventListener("resize", () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    scaleX = canvas.width / BASE_WIDTH;
    scaleY = canvas.height / BASE_HEIGHT;
    if (gameState === "startscreen") {
        renderStartButton(startButton.text);
    }
});