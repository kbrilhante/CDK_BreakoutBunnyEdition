class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colors[3];
    }
    display() {
        push();
        ellipseMode(RADIUS);
        fill(this.color);
        noStroke();
        circle(this.x, this.y, this.radius);
        pop();
    }
    launch() {}
    move() {}
}