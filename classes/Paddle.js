class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.color = colors[0];
        this.speed = 4;
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
        this.x += this.dx;
    }
}