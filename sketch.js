let game;
let gameStart, gameOver;
const colors = [
    "#FF0000",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#0000FF",
    "#FF00FF"
];

function setup() {
    createCanvas(420, 560);
    gameStart = false;
    gameOver = false;
    game = new Game();
    game.initialize();
}

function draw() {
    background(0);
    game.handleMovement();
}

function keyPressed() {
    if (keyCode === 32 && !gameStart && !gameOver) {
        game.startGame();
    }
}

function keyReleased() {
    if (!gameOver) {
        game.paddle.changeDirection(0);
    }
}