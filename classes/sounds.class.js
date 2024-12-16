/**
 * Manages all audio playback and settings for the game.
 */
class SoundManager {
    isSoundMute = false;

    backgroundMusic = new Audio("audio/GameCity.mp3");
    charWalk = new Audio("audio/footstep.mp3");
    charJump = new Audio("audio/cartoonjump.mp3");
    charFireball = new Audio("audio/fireballwhoosh.mp3");
    charHurt = new Audio("audio/femalehurt.mp3");
    charDeflect = new Audio("audio/quickswhooshing.mp3");
    slimeWalk = new Audio("audio/slimejump.mp3");
    slimeDead = new Audio("audio/cartoonsplat.mp3");
    mageCast = new Audio("audio/mageCast.mp3");
    mageDead = new Audio("audio/mageHurt.mp3");

    /**
     * Initializes the SoundManager and configures audio properties.
     */
    constructor() {
        this.mixSound(this.backgroundMusic, 0.1, 1, true);
        this.mixSound(this.charHurt, 0.7, 2);
        this.mixSound(this.charJump, 0.7, 2);
        this.mixSound(this.charFireball, 0.7, 2);
        this.mixSound(this.charDeflect, 0.7, 2);
        this.mixSound(this.charWalk, 0.2, 1.2);
        this.mixSound(this.slimeWalk, 0.3, 2);
        this.mixSound(this.slimeDead, 0.3, 2);
        this.mixSound(this.mageCast, 0.3, 2);
        this.mixSound(this.mageDead, 0.3, 2);
    }

    /**
     * Configures the volume, playback rate, and loop property of a sound.
     * @param {Audio} sound The audio file to configure.
     * @param {number} volume The volume level (0 = mute, 1 = full volume).
     * @param {number} rate The playback rate (1 = normal speed, 2 = double speed).
     * @param {boolean} [isloop=false] Whether the audio should loop.
     */
    mixSound(sound, volume, rate, isloop = false){
        sound.volume = volume;
        sound.playbackRate = rate,
        sound.loop = isloop;
    }

    /**
     * Toggles the mute state for all sounds.
     * @param {boolean} bool Whether the sound should be muted.
     */
    muteSound(bool) {
        this.isSoundMute = bool;
        this.updateSounds();
    }

    /**
     * Updates the mute state of all audio files managed by the SoundManager.
     */
    updateSounds() {
        this.backgroundMusic.muted = this.isSoundMute;
        this.charWalk.muted = this.isSoundMute;
        this.charJump.muted = this.isSoundMute;
        this.charFireball.muted = this.isSoundMute;
        this.charHurt.muted = this.isSoundMute;
        this.charDeflect.muted = this.isSoundMute;
        this.slimeWalk.muted = this.isSoundMute;
        this.slimeDead.muted = this.isSoundMute;
        this.mageCast.muted = this.isSoundMute;
        this.mageDead.muted = this.isSoundMute;
    }

    /**
     * Plays a specific sound.
     * @param {string} sound The name of the sound to play (e.g., "backgroundMusic").
     */
    playAudio(sound) {
        let audio = this.getAudioToPlay(sound);
        audio.play();
    }

    /**
     * Pauses a specific sound.
     * @param {string} sound The name of the sound to pause (e.g., "backgroundMusic").
     */
    pauseAudio(sound) {
        let audio = this.getAudioToPlay(sound);
        audio.pause();
    }

    /**
     * Retrieves the Audio object corresponding to a sound name.
     * @param {string} sound The name of the sound (e.g., "backgroundMusic").
     * @returns {Audio} The Audio object associated with the sound.
     */
    getAudioToPlay(sound) {
        switch (sound) {
            case "backgroundMusic": return this.backgroundMusic;
            case "charWalk": return this.charWalk;
            case "charJump": return this.charJump;
            case "charFireball": return this.charFireball;
            case "charHurt": return this.charHurt;
            case "charDeflect": return this.charDeflect;
            case "slimeWalk": return this.slimeWalk;
            case "slimeDead": return this.slimeDead;
            case "mageCast": return this.mageCast;
            case "mageDead": return this.mageDead;

            default:
                break;
        }
    }
}

