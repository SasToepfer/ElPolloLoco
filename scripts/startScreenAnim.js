let mouseInsideCanvas = false; 
let mouseX = 0, mouseY = 0; 
let buttonCenter = { x: 360, y: 240 }; 
let maxDistance = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2; 
let idleFrames = [];
let startFrames = [];
let pushFrames = [];
let idleIndex = 0;
let pushIndex = 0;
let idleInterval;
let idleFrameDelay = 4; 
let idleFrameCounter = 0; 
let pushFrameCounter = 0; 

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

// Idle-Animation rendern
function renderIdleAnimation() {
    let idleImage = idleFrames[idleIndex];
    if (idleImage.complete) { // Nur wenn das Bild vollständig geladen ist
        ctx.drawImage(idleImage, 0, 0, canvas.width, canvas.height); 
    }
    idleFrameCounter++;
    if (idleFrameCounter >= idleFrameDelay) {
        idleIndex = (idleIndex + 1) % idleFrames.length;
        idleFrameCounter = 0; 
    }
}

// Push-Animation rendern
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

// Start-Animation rendern (abhängig von Mausposition)
function renderStartAnimation() {
    let distance = Math.sqrt(
        (mouseX - buttonCenter.x) ** 2 + (mouseY - buttonCenter.y) ** 2
    );
    let progress = Math.max(0, Math.min(1, 1 - distance / maxDistance));
    currentStartFrame = Math.floor(progress * (startFrames.length - 1));
    let startImage = startFrames[currentStartFrame];
    if (startImage.complete) { 
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height); 
    }
}

