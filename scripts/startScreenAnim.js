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
    // Mitte des Bildschirms berechnen
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // Entfernung der Maus zur Mitte des Bildschirms berechnen
    let distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);

    // Maximale Entfernung für die Animation
    let maxDistance = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);

    // Fortschritt der Animation (zwischen 0 und 1)
    let progress = Math.max(0, Math.min(1, 1 - distance / maxDistance));

    // Bestimme das aktuelle Frame der Animation
    let currentFrame = Math.floor(progress * (startFrames.length - 1));

    // Aktuelles Frame rendern
    let startImage = startFrames[currentFrame];
    if (startImage && startImage.complete) {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    }
}

function renderFullscreenAnimation() {
    // Berechne die Mitte des Fullscreen-Buttons
    let buttonCenterX = fullscreenButton.x + fullscreenButton.width / 2;
    let buttonCenterY = fullscreenButton.y + fullscreenButton.height / 2;

    // Entfernung der Maus zur Mitte des Fullscreen-Buttons berechnen
    let distance = Math.sqrt(
        (mouseX - buttonCenterX) ** 2 + (mouseY - buttonCenterY) ** 2
    );

    // Maximale Entfernung, die eine Animation triggert
    let maxFullscreenDistance = Math.max(fullscreenButton.width, fullscreenButton.height) * 3;

    // Fortschritt der Animation (zwischen 0 und 1, basierend auf Entfernung)
    let progress = Math.max(0, Math.min(1, 1 - distance / maxFullscreenDistance));

    // Bestimme das aktuelle Frame der Animation
    let currentFrame = Math.floor(progress * (startFrames.length - 1));

    // Render das aktuelle Frame der Animation
    let fullscreenImage = startFrames[currentFrame];
    if (fullscreenImage && fullscreenImage.complete) {
        ctx.drawImage(
            fullscreenImage,
            fullscreenButton.x, // Gleiche Position wie der Fullscreen-Button
            fullscreenButton.y,
            fullscreenButton.width,
            fullscreenButton.height
        );
    }
}

