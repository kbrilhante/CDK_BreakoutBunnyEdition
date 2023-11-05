class Block {
    constructor(x, y, width, height, clr) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.color = clr;
    }
    display() {
        push();
        rectMode(CENTER);
        fill(this.color);
        strokeWeight(3);
        rect(this.x, this.y, this.w, this.h);
        pop();
    }
}