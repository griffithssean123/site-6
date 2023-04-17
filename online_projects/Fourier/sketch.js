
let x = [];
let y = [];
let fourierX;
let fourierY;
let slider;

let time = 0;
let path = [];
let points;

function preload() {
  font = loadFont('/Avenir Next LT Pro Demi.otf')
}

function resetPath() {
  path = [];
  console.log(slider.value());
  time = 0;
}

function setup() {
  createCanvas(600, 400);
  frameRate(30);
  points = font.textToPoints('Sean', 0, 0, 100, {sampleFactor: 0.15});
  console.log(points)
  slider = createSlider(points.length % 10, points.length, points.length, 10);
  slider.changed(resetPath);

  for (var i=0; i<points.length; i++) {
    x[i] = points[i].x;
    y[i] = points[i].y;
  }

  fourierX = dft(x);
  fourierY = dft(y);
  console.log(fourierX)
}

function epiCycles(x, y, rotation, fourier) {
  for (let i=0; i<slider.value(); i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq*time + phase + rotation);
    y += radius * sin(freq*time + phase + rotation);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);
  
  let vx = epiCycles(200, 100, 0, fourierX);
  let vy = epiCycles(100, 300, HALF_PI, fourierY);
  let v = createVector(vx.x, vy.y);
  path.unshift(v);

  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  noFill();
  for(let i=0; i<path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierY.length;
  time += dt;

  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}
