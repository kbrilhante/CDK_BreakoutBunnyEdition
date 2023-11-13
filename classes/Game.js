class Game {
    constructor() {
        this.lives = 0;
        this.level = 0;
        this.score = 0;
        this.hiScore = 0;
        this.blocks = [];
        this.paddle = "";
        this.ball = "";
    }
    initialize() {
        this.lives = 6;
        this.level = 1;
        this.score = 0;
        this.reset();
    }
    reset() {
        gameStart = false;

        this.blocks = this.buildBlocks();

        const paddleX = width / 2;
        const paddleW = 100;
        const paddleH = 15;
        const paddleY = height - paddleH / 2 - 10;
        this.paddle = new Paddle(paddleX, paddleY, paddleW, paddleH);

        const ballR = 12;
        const ballY = paddleY - paddleH / 2 - ballR;
        this.ball = new Ball(paddleX, ballY, ballR);
    }
    buildBlocks() {
        const b = [];
        const columns = this.level + 1;
        const rows = this.level + 2;
        let w = 60;
        let h = w / 2;
        let gap = 40 / this.level;
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
                b.push(block);
            }
        }
        return b;
    }
    startGame() {
        gameStart = true;
        this.ball.launch();
    }
    handleMovement() {
        this.paddle.move();
        this.paddle.display();
        this.ball.move();
        this.ball.display();
        for (let i = 0; i < this.blocks.length; i++) {
            const block = this.blocks[i];
            block.display();
        }
        this.checkGameStatus();
        if (!gameOver) {
            if ((keyIsDown(RIGHT_ARROW) && keyIsDown(LEFT_ARROW)) || (keyIsDown(68) && keyIsDown(65))) {
                this.paddle.changeDirection(0);
            } else {
                if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                    this.paddle.changeDirection(1);
                }
                if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                    this.paddle.changeDirection(-1);
                }
            }
        }
    }
    checkGameStatus() {
        if (gameStart && !gameOver) {
            this.checkNewLevel();
            if (this.ball.checkLost()) {
                this.lostLife();
            }
        }
    }
    checkNewLevel() {
        if (!this.blocks.length) {
            this.level++;
            this.reset();
        }
    }
    lostLife() {
        this.lives--;
        if (!this.checkGameOver()) {
            this.reset();
        }
    }
    checkGameOver() {
        if (this.lives <= 0) {
            gameOver = true;
        }
        return gameOver;
    }
    drawStatus() {

    }
}