class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colors[3];
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
        this.angle = random(-135, -45);
        this.speed = 4;
        this.angleChange();
    }
    angleChange() {
        const a = radians(this.angle);
        const v = p5.Vector.fromAngle(a);
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
        }
    }
    checkWallCollision() {
        const topWall = this.radius;
        const leftWall = this.radius;
        const rightWall = width - this.radius;
        if (this.x <= leftWall || this.x >= rightWall) {
            this.dx *= -1;
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

        
    }
}