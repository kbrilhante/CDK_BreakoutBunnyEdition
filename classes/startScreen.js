class StartScreen {
    constructor() {
        this.parentDiv = createDiv();
        this.modeDiv = createDiv();
        this.modeDiv.parent(this.parentDiv);
        this.lblMode = createP("Game Mode: ");
        this.lblMode.addClass('text');
        this.lblMode.parent(this.modeDiv);
        this.selMode = createSelect();
        this.selMode.parent(this.modeDiv);
        this.setOptions();
        this.selMode.addClass('dropdown');
        this.btnStart = createButton("Start Game");
        this.btnStart.parent(this.parentDiv);
        this.btnStart.addClass('btn')
        this.btnStart.mouseClicked(() => {
            this.handleStartGame();
        });
        this.parentDiv.center();
    }
    setOptions() {
        for (let i = 0; i < gameModes.length; i++) {
            const mode = gameModes[i];
            this.selMode.option(mode);
        }
    }
    handleStartGame() {
        game = new Game(this.selMode.value());
        game.initialize();
        gameOver = false;
        this.parentDiv.remove();
    }
}

class SoundControls {
    constructor() {
        this.parentDiv = createDiv();
        this.parentDiv.addClass('soundControls')
        this.divVol = createDiv();
        this.divVol.parent(this.parentDiv);
        this.volMin = createP('<i class="fa-solid fa-volume-low"></i>');
        this.volMin.parent(this.divVol);
        this.volMin.addClass('volControl');
        this.volControl = createSlider(0, 100, volume);
        this.volControl.parent(this.divVol);
        this.volMax = createP('<i class="fa-solid fa-volume-high"></i>');
        this.volMax.parent(this.divVol);
        this.volMax.addClass('volControl');
        this.divButtons = createDiv();
        this.divButtons.parent(this.parentDiv);
        this.btnCtrlMute = this.setBtn(muted, 'Mute', 'btnMute');
        this.btnCtrlMute.mouseClicked(() => {
            this.toggleMute();
        });
        this.btnCtrlMusic = this.setBtn(musicOff, 'Music', 'btnMusic')
        this.btnCtrlMusic.mouseClicked(() => {
            this.toggleMusic();
        });
        this.btnCtrlSound = this.setBtn(soundEffectsOff, 'Sound Effects', 'btnSound')
        this.btnCtrlSound.mouseClicked(() => {
            this.toggleSound();
        });
    }
    setBtn(verifier, btnName, btnClass) {
        const btn = createButton(btnName);
        this.changeText(btn, verifier);
        btn.parent(this.divButtons);
        btn.addClass("soundBtn");
        btn.addClass(btnClass);
        return btn;
    }
    changeText(btn, verifier) {
        let txt;
        if (verifier) {
            txt = "On";
        } else {
            txt = "Off";
        }
        let currentTxt = btn.html();
        currentTxt = currentTxt.replace(" On", "");
        currentTxt = currentTxt.replace(" Off", "");
        btn.html(currentTxt + " " + txt);
    }
    setVolume() {
        volume = this.volControl.value();
        if (!musicOff) {
            changeMusic(volume / 100, 0);
        }
        if (!soundEffectsOff) {
            changeSounds(volume / 100, 0);
        }
    }
    toggleMute() {
        if (muted) {
            changeMusic(volume / 100, 0.4);
            changeSounds(volume / 100, 0.4);
            muted = false;
            musicOff = false;
            soundEffectsOff = false;
            this.changeText(this.btnCtrlMute, muted);
            this.changeText(this.btnCtrlMusic, musicOff);
            this.changeText(this.btnCtrlSound, soundEffectsOff);
        } else {
            changeMusic(0, 0.4);
            changeSounds(0, 0.4)
            muted = true;
            musicOff = true;
            soundEffectsOff = true;
            this.changeText(this.btnCtrlMute, muted);
            this.changeText(this.btnCtrlMusic, musicOff);
            this.changeText(this.btnCtrlSound, soundEffectsOff);
        }
    }
    toggleMusic() {
        if (musicOff) {
            changeMusic(volume / 100, 0.4);
            musicOff = false;
            this.changeText(this.btnCtrlMusic, musicOff);
        } else {
            changeMusic(0, 0.4);
            musicOff = true;
            this.changeText(this.btnCtrlMusic, musicOff);
        }
    }
    toggleSound() {
        if (soundEffectsOff) {
            changeSounds(volume / 100, 0.4);
            soundEffectsOff = false;
            this.changeText(this.btnCtrlSound, soundEffectsOff);
        } else {
            changeSounds(0, 0.4);
            soundEffectsOff = true;
            this.changeText(this.btnCtrlSound, soundEffectsOff);
        }
    }
}

