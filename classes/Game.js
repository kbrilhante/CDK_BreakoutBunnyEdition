class Game {
    constructor(gameMode) {
        this.gameMode = gameMode
        this.lives = 0;
        this.level = 0;
        this.score = 0;
        this.hiScore = this.getHiScore();
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
        this.blocks = this.buildBlocks();

        this.resetPaddleAndBall();
    }
    resetPaddleAndBall() {
        gameStart = false;

        const paddleX = width / 2;
        const paddleW = 100;
        const paddleH = 15;
        const paddleY = height - (paddleH * 2.5);
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
        const offsetY = 120;
        let dx = 0;
        for (let i = 0; i < rows; i++) {
            const gameModeIndex = gameModes.indexOf(this.gameMode);
            if (gameModeIndex === 1) {
                dx = 1 + floor(this.level / 2);
                if (i % 2 === 0) {
                    dx *= -1;
                }
            }
            for (let j = 0; j < columns; j++) {
                const x = (w + gap) * j + offsetX;
                const y = (h + gap) * i + offsetY;
                const block = new Block(x, y, w, h, colors[i % colors.length], dx);
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
            this.resetPaddleAndBall();
        }
    }
    checkGameOver() {
        if (this.lives <= 0) {
            gameOver = true;
            const i = gameModes.indexOf(this.gameMode);
            hiScores[i] = this.hiScore;
            localStorage.setItem("hiScores", hiScores);
            game = "";
            startScreen = new StartScreen();
        }
        return gameOver;
    }
    drawStatus() {
        let status = "";
        status = "Hi-Score: " + this.hiScore;
        this.writeStatus(status, width / 2, 30);
        const col = 3;
        for (let i = 0; i <= col; i++) {
            switch (i) {
                case 1:
                    status = "Score: " + this.score;
                    break;
                case 2:
                    status = "Level: " + this.level;
                    break;
                case 3:
                    status = "Lives: " + this.lives
                    break;
            }
            this.writeStatus(status, (width / col * i) - (width / col / 2), 70);
        }
    }
    writeStatus(status, posX, posY) {
        push();
        fill("#fff");
        textAlign(CENTER, CENTER);
        textSize(20);
        textFont("Impact");
        text(status, posX, posY);
        pop();
    }
    getHiScore() {
        const i = gameModes.indexOf(this.gameMode);
        const hs = hiScores[i];
        return hs;
    }
}