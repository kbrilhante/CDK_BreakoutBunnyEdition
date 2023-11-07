let ball, paddle, blocks;
let lives, level, score, hiScore;
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
    lives = 1;
    level = 1;
    score = 0;
    hiScore = 0;
    
    blocks = [];
    
    const paddleX = width / 2;
    const paddleW = 100;
    const paddleH = 15;
    const paddleY = height - paddleH / 2 - 10;
    // const paddleY = height - paddleH;
    paddle = new Paddle(paddleX, paddleY, paddleW, paddleH);
    
    const ballR = 12;
    const ballY = paddleY - paddleH / 2 - ballR;
    ball = new Ball(paddleX, ballY, ballR);

    buildBlocks();
}

function draw() {
    background(0);
    paddle.move();
    paddle.display();
    ball.move();
    ball.display();
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        block.display();
    }
}

function keyPressed() {
    if (keyCode === 32 && !gameStart && !gameOver) {
        startGame();
    }
    if (!gameOver) {
        if (keyCode === LEFT_ARROW || keyCode === 65) {
            paddle.changeDirection(-1);
        } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
            paddle.changeDirection(1);
        }
    }
}

function keyReleased() {
    if (!gameOver) {
        paddle.changeDirection(0);
    }
}

function startGame() {
    gameStart = true;
    ball.launch();
}

function buildBlocks() {
    const columns = level + 1;
    const rows = level + 2;
    let w = 60;
    let h = w / 2;
    let gap = 40 / level;
    let blocksWidth = columns * w;
    if (blocksWidth > width - gap * columns) {
       gap = 0;
       w = width / (columns + 1);
       h = w / 2;
       blocksWidth = columns * w;
    }
    const rowWidth = blocksWidth + (columns - 1) * gap;
    const offsetX = (w + width - rowWidth) / 2;
    const offsetY = 100;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const x = (w + gap) * j + offsetX;
            const y = (h + gap) * i + offsetY;
            const block = new Block(x, y, w, h, colors[i % colors.length]);
            blocks.push(block);
        }
    }
}