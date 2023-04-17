function Vehicle(new_dots) {
    if (new_dots == 1) {
        this.pos = createVector(random(windowWidth/2)+windowWidth/4, random(windowHeight/2)+windowHeight/4);
    } else {
        this.pos = createVector(random(windowWidth), random(windowHeight));
    }
    this.vel = p5.Vector.random2D();
    this.vel.mult(0.15);
}

Vehicle.prototype.behaviors = function() {
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    if (this.pos.x < 0) {this.pos.x += windowWidth}
    if (this.pos.x > windowWidth) {this.pos.x -= windowWidth}
    if (this.pos.y < 0) {this.pos.y += windowHeight}
    if (this.pos.y > windowHeight) {this.pos.y -= windowHeight}
}

Vehicle.prototype.show = function() {
    stroke(255);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);

}
