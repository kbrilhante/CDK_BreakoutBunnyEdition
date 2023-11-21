let startScreen, game;
let gameStart, gameOver, hiScores;
let sndTheme, sndWall, sndPaddle, sndBlock, sndLvlUp, sndBallLost, sndGameOver
let muted, songOff, fxOff;

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
    startScreen = new StartScreen();
    inicializeHiScore();
}

function draw() {
    background(0);
    if (game) {
        game.drawStatus();
        game.handleMovement();
    }
}

function keyPressed() {
    if (keyCode === 32 && !gameStart && !gameOver && game) {
        game.startGame();
    }
    if (keyCode === 77) {
        if (muted) {
            changeMusic(1);
            changeSounds(1)
            muted = false;
            songOff = false;
            fxOff = false;
        } else {
            changeMusic(0);
            changeSounds(0)
            muted = true;
            songOff = true;
            fxOff = true;
        }
    }
    if (keyCode === 78) {
        if (songOff) {
            changeMusic(1);
            songOff = false;
        } else {
            changeMusic(0);
            songOff = true;
        }
    }
    if (keyCode === 66) {
        if (fxOff) {
            changeSounds(1);
            fxOff = false;
        } else {
            changeSounds(0);
            fxOff = true;
        }
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

function changeMusic(vol) {
    sndTheme.setVolume(vol, 0.4);
    sndGameOver.setVolume(vol, 0.4);
}

function changeSounds(vol) {
    sndWall.setVolume(vol, 0.4);
    sndPaddle.setVolume(vol, 0.4);
    sndBallLost.setVolume(vol, 0.4);
    sndBlock.setVolume(vol, 0.4);
    sndLvlUp.setVolume(vol, 0.4);
    sndFf.setVolume(vol, 0.4);
}