class Block {
    constructor(x, y, width, height, clr, dx) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.color = clr;
        this.dx = dx
    }
    display() {
        this.move();
        push();
        rectMode(CENTER);
        fill(this.color);
        strokeWeight(3);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
    move() {
        this.x += this.dx;
        if (this.x > width + this.w / 2) {
            this.x = -this.w / 2;
        }
        if (this.x < -this.w / 2) {
            this.x = width + this.w / 2;
        }
    }
}