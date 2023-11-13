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
    game.paddle.move();
    game.paddle.display();
    game.ball.move();
    game.ball.display();
    for (let i = 0; i < game.blocks.length; i++) {
        const block = game.blocks[i];
        block.display();
    }
    game.checkGameStatus();
    if (!gameOver) {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            game.paddle.changeDirection(-1);
        } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            game.paddle.changeDirection(1);
        }
    }
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