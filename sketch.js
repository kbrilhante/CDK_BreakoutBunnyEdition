let startScreen, game;
let gameStart, gameOver, hiScores;
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
]

function setup() {
    createCanvas(420, 560);
    gameStart = false;
    gameOver = false;
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