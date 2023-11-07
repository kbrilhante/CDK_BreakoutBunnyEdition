class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "orange";
        this.dx = 0;
        this.dy = 0;
        this.speed = 0;
        this.angle = 0;
    }
    display() {
        push();
        ellipseMode(RADIUS);
        fill(this.color);
        noStroke();
        circle(this.x, this.y, this.radius);
        pop();
    }
    launch() {
        // this.dx = random([-1, 1]) * random(1, 4);
        // this.dy = -1;
        this.angle = radians(random(-135, -45));
        this.speed = 4;
        this.angleChanged();
    }
    angleChanged() {
        const v = p5.Vector.fromAngle(this.angle);
        v.mult(this.speed);
        this.dx = v.x;
        this.dy = v.y;
    }
    move() {
        if (!gameStart) {
            this.x = paddle.x;
        } else {
            this.x += this.dx;
            this.y += this.dy;
            this.checkWallCollision();
            this.checkPaddleCollision();
            this.checkAllBlocksCollision();
        }
    }
    checkWallCollision() {
        const topWall = this.radius;
        const leftWall = this.radius;
        const rightWall = width - this.radius;
        if (this.x <= leftWall) {
            this.dx *= -1;
            this.x = this.radius;
        }
        if (this.x >= rightWall) {
            this.dx *= -1;
            this.x = width - this.radius;
        }
        if (this.y <= topWall) {
            this.dy *= -1;
        }
        // TEMPORARY: just until we make it die
        if (this.y >= height - this.radius) {
            this.dy *= -1;
        }
    }
    checkPaddleCollision() {
        const paddleT = paddle.y - paddle.h / 2;
        const paddleB = paddle.y + paddle.h / 2;
        const paddleL = paddle.x - paddle.w / 2;
        const paddleR = paddle.x + paddle.w / 2;

        if (
            this.x + this.radius >= paddleL &&
            this.x - this.radius <= paddleR &&
            this.y + this.radius >= paddleT &&
            this.y - this.radius <= paddleB
        ) {
            const y = this.y - paddle.y;
            const x = this.x - paddle.x;
            this.angle = atan2(y, x);
            if (this.angle === 0) {
                this.angle = radians(-1);
            } else if (this.angle === PI) {
                this.angle = radians(181);
            }
            this.angleChanged();
        }
    }
    checkAllBlocksCollision() {
        let collidedH = false;
        let collidedV = false;
        for (let i = blocks.length - 1; i >= 0; i--) {
            let b = blocks[i];
            const col = this.checkBlockCollision(b);
            if (col) {
                blocks.splice(i, 1);
                if (
                    (col >= PI * 0.25 && col <= PI * 0.75) ||
                    (col >= PI * 1.25 && col <= PI * 1.75)
                ) {
                    collidedV = true;
                } else {
                    collidedH = true;
                }
            }
        }
        if (collidedV) {
            this.dy *= -1;
        } else if (collidedH) {
            this.dx *= -1;
        }
    }
    checkBlockCollision(block) {
        const blockT = block.y - block.h / 2;
        const blockB = block.y + block.h / 2;
        const blockL = block.x - block.w / 2;
        const blockR = block.x + block.w / 2;

        if (
            this.x + this.radius >= blockL &&
            this.x - this.radius <= blockR &&
            this.y + this.radius >= blockT &&
            this.y - this.radius <= blockB
        ) {
            // if (this.x >= blockL && this.x <= blockR) {
            //     return "v";
            // }
            // return "h";
            const x = abs(this.x - block.x);
            const y = abs(this.y - block.y);
            const a = atan2(y, x);
            return a;
        }
        return false;
    }
}