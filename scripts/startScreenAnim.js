let mouseInsideCanvas = false; 
let mouseX = 0, mouseY = 0; 
let buttonCenter = { x: 360, y: 240 }; 
let maxDistance = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2; 
let idleFrames = [];
let winFrames = [];
let startFrames = [];
let pushFrames = [];
let loopAnimFrameIndex = 0;
let pushIndex = 0;
let lastFrameTime = 0;
let FrameDelay = 60;
let pushFrameCounter = 0; 

/**
 * Creates an array of images for animations.
 * @param {Array} arr - The array to push the image frames into.
 * @param {String} path - Path to the images, which should include a format for numbered images (e.g., 0000.png to 9999.png).
 * @param {number} length - The number of images to load into the array.
 */
function createImageArray(arr, path, length) {
    for (let index = 0; index < length; index++) {
        let frame = new Image();
        if (index < 10) {
            frame.src = `${path}000${index}.png`;
        } else if (index < 100) {
            frame.src = `${path}00${index}.png`;
        } else {
            frame.src = `${path}0${index}.png`;
        }
        arr.push(frame);
    }
}

/**
 * Renders the idle animation when the mouse is not in the canvas.
 */
function renderLoopAnimation(animName) {
    const now = Date.now();
    arrayFrames = getAnimToPlay(animName);
    if (now - lastFrameTime >= FrameDelay) {
        loopAnimFrameIndex = (loopAnimFrameIndex + 1) % arrayFrames.length;
        lastFrameTime = now;
    }
    
    let frameImage = arrayFrames[loopAnimFrameIndex];
    if (frameImage && frameImage.complete) {
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
    }
}

function getAnimToPlay(name) {
    switch (name) {
        case "idle": return idleFrames;
        case "won": return winFrames;
    }
}

/**
 * Renders the push animation that starts when the game start button is pressed.
 * The main character presses the button on behalf of the player.
 */
function renderPushAnimation() {
    let pushImage = pushFrames[pushIndex];
    if (pushImage) { // Nur wenn das Bild vollständig geladen ist
        ctx.drawImage(pushImage, 0, 0, canvas.width, canvas.height); 
    }
    pushFrameCounter++
    if (pushFrameCounter >= 20) {
        pushIndex < pushFrames.length ? pushIndex++ : (gameState = "game", startGame())
    }
}

/**
 * Renders an animation based on the mouse position in the canvas.
 * The animation consists of 100 frames, where 0 represents the edge of the canvas,
 * and 100 represents the center of the canvas.
 */
function renderStartAnimation() {
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    let distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
    let maxDistance = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);
    let progress = Math.max(0, Math.min(1, 1 - distance / maxDistance));
    let currentFrame = Math.floor(progress * (startFrames.length - 1));
    let startImage = startFrames[currentFrame];
    if (startImage && startImage.complete) {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    }
}