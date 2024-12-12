class SoundManager {
    isSoundMute = false;

    backgroundMusic = new Audio("audio/GameCity.mp3");
    charWalk = new Audio("audio/Player_Walk_Wood_3.wav");
    charJump = new Audio("audio/cartoonjump.mp3");
    charFireball = new Audio("audio/fireballwhoosh.mp3");
    charHurt = new Audio("audio/femalehurt.mp3");
    charDeflect = new Audio("audio/quickswhooshing.mp3");
    slimeWalk = new Audio("audio/slimejump.mp3");
    slimeDead = new Audio("audio/cartoonsplat.mp3");
    mageCast = new Audio("audio/mageCast.mp3");
    mageDead = new Audio("audio/mageHurt.mp3");

    constructor() {
        this.mixSound(this.backgroundMusic, 0.1, 1, true);
        this.mixSound(this.charHurt, 0.7, 2);
        this.mixSound(this.charJump, 0.7, 2);
        this.mixSound(this.charFireball, 0.7, 2);
        this.mixSound(this.charDeflect, 0.7, 2);
        this.mixSound(this.charWalk, 0.5, 1.5);
        this.mixSound(this.slimeWalk, 0.3, 2);
        this.mixSound(this.slimeDead, 0.3, 2);
        this.mixSound(this.mageCast, 0.3, 2);
        this.mixSound(this.mageDead, 0.3, 2);
    }

    mixSound(sound, volume, rate, isloop = false){
        sound.volume = volume;
        sound.playbackRate = rate,
        sound.loop = isloop;
    }

    muteSound(bool) {
        this.isSoundMute = bool;
        this.updateSounds();
    }

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

    playAudio(sound) {
        let audio = this.getAudioToPlay(sound);
        audio.play();
    }

    pauseAudio(sound) {
        let audio = this.getAudioToPlay(sound);
        audio.pause();
    }

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

