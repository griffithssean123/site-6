class Boid {
    constructor() {
        this.position = createVector(random(windowWidth), random(windowHeight));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5, 2.5));
        this.acceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    align(boids) {
        let perception = 50;
        let avg = createVector();
        let total = 0;
        for (let other of boids) {
            if (this.position.dist(other.position) < perception && other != this) {
                avg.add(other.velocity);
                total += 1;
            }
        }
        if (total > 0) {
            avg.div(total);
            avg.setMag(this.maxSpeed);
            let steering = avg.sub(this.velocity);
            return steering;
        }
        return createVector();
    }

    cohesion(boids) {
        let perception = 50;
        let avg = createVector();
        let total = 0;
        for (let other of boids) {
            if (this.position.dist(other.position) < perception && other != this) {
                avg.add(other.position);
                total += 1;
            }
        }
        if (total > 0) {
            avg.div(total);
            let steering = avg.sub(this.position);
            steering.setMag(this.maxSpeed);
            return steering;
        }
        return createVector();
    }

    separation(boids) {
        let perception = 50;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            if (this.position.dist(other.position) < perception && other != this) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.setMag(1);
                diff.div(this.position.dist(other.position));
                steering.add(diff);
                total += 1;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            return steering;
        }
        return createVector();
    }

    update(boids) {
        // Calculate the acceleration
        this.acceleration.mult(0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        this.acceleration.limit(this.maxForce);

        // Time step position and velocity
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.setMag(this.maxSpeed);

        // Edges
        if (this.position.x > width) {this.position.x -= width}
        if (this.position.x < 0) {this.position.x += width}
        if (this.position.y > height) {this.position.y -= height}
        if (this.position.y < 0) {this.position.y += height}
        
    }

    show() {
        strokeWeight(2);
        stroke(255);
        let direction = this.velocity.copy().setMag(-20);
        direction.rotate(PI/8);
        line(this.position.x, this.position.y, this.position.x+direction.x, this.position.y+direction.y);
        direction.rotate(-PI/4);
        line(this.position.x, this.position.y, this.position.x+direction.x, this.position.y+direction.y);
        //point(this.position.x, this.position.y);
    }
}
