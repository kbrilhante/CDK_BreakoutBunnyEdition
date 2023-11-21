let startScreen, game, soundControls;
let gameStart, gameOver, hiScores;
let sndTheme, sndWall, sndPaddle, sndBlock, sndLvlUp, sndBallLost, sndGameOver
let muted, musicOff, soundEffectsOff, volume;

const colors = [
    "#FF0000",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#FF00FF"
];

const gameModes = [
    "Classic",
    "Moving Blocks",
    "Force Field"
];

function preload() {
    sndTheme = loadSound("./assets/retro.wav");
    sndWall = loadSound("./assets/Hit 2.wav");
    sndPaddle = loadSound("./assets/Hit 4.wav");
    sndFf = loadSound("./assets/Select 4.wav");
    sndBlock = loadSound("./assets/Coin 2.wav");
    sndLvlUp = loadSound("./assets/Powerup 1.wav");
    sndBallLost = loadSound("./assets/Fly 3.wav");
    sndGameOver = loadSound("./assets/GameOver.wav");
}

function setup() {
    createCanvas(420, 560);
    gameStart = false;
    gameOver = false;
    muted = false;
    musicOff = false;
    soundEffectsOff = false;
    volume = 50;
    startScreen = new StartScreen();
    inicializeHiScore();
    soundControls = new SoundControls();
}

function draw() {
    background(0);
    if (game) {
        game.drawStatus();
        game.handleMovement();
    }
    soundControls.setVolume();
}

function keyPressed() {
    if (keyCode === 32 && !gameStart && !gameOver && game) {
        game.startGame();
    }
    if (keyCode === 77) {
        soundControls.toggleMute();
    }
    if (keyCode === 78) {
        soundControls.toggleMusic();
    }
    if (keyCode === 66) {
        soundControls.toggleSound();
    }
}

function keyReleased() {
    if (!gameOver && game) {
        game.paddle.changeDirection(0);
    }
}

function inicializeHiScore() {
    hiScores = [];
    let hs = localStorage.getItem("hiScores");
    if (hs) {
        hs = hs.split(',');
        for (let i = 0; i < hs.length; i++) {
            hiScores.push(Number(hs[i]));
        }
    } else {
        hiScores = [0,0,0];
    }
}

function changeMusic(vol, fade) {
    sndTheme.setVolume(vol, fade);
    sndGameOver.setVolume(vol, fade);
}

function changeSounds(vol, fade) {
    sndWall.setVolume(vol, fade);
    sndPaddle.setVolume(vol, fade);
    sndBallLost.setVolume(vol, fade);
    sndBlock.setVolume(vol, fade);
    sndLvlUp.setVolume(vol, fade);
    sndFf.setVolume(vol, fade);
}