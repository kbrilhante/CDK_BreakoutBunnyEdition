class ForceField {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.str = 5;
        this.color = colors[this.str];
    }
    display() {
        if (this.str >= 0) {
            push();
            rectMode(CENTER);
            fill(this.color);
            noStroke();
            rect(this.x, this.y, this.w, this.h);
            pop();
        }
    }
    gotHit() {
        this.str--;
        this.color = colors[this.str];
    }
}