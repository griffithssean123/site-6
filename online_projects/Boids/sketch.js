const flock = [];
var canvas;
let num_boids = 100;
let alignSlider, cohesionSlider, separationSlider;

function windowResized() {
  canvas = createCanvas(windowWidth, windowHeight-70);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-70);
  canvas.position(0,70);
  canvas.style('z-index', '-1');
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  separationSlider = createSlider(0, 5, 1, 0.1);
  
  for (let i=0; i < num_boids; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(51);

  for (let boid of flock) { 
    boid.update(flock);
    boid.show();
  }
}
