class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.color = colors[game.lives - 1];
        this.speed = 6;
        this.dx = 0;
    }
    display() {
        push();
        rectMode(CENTER);
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
    changeDirection(direction) {
        this.dx = this.speed * direction;
    }
    move() {
        const leftWall = this.w / 2;
        const rightWall = width - this.w / 2;
        if (keyIsDown(SHIFT)) {
            this.x += this.dx * 2;
        } else {
            this.x += this.dx;
        }
        this.x = constrain(this.x, leftWall, rightWall);
    }
}