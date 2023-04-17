var canvas;
var dots = [];
var numdots = 50;
var max_dist;

function windowResized() {
  canvas = createCanvas(windowWidth, windowHeight-70);
  max_dist = (windowWidth+windowHeight)/18;
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight-70);
  canvas.position(0,75);
  canvas.style('z-index', '-1');
  max_dist = (windowHeight+windowWidth)/18;
  background(51);
  for (var i=0; i<numdots; i++){
    var vehicle = new Vehicle(0);
    dots.push(vehicle);
  }
 
}

function draw() {
  if (frameCount % 60 == 0) {
    replace();
  }
  clear();
  background(51);
  for (var i=0; i<dots.length; i++) {
    dots[i].update();
    dots[i].show();
  }
  console.log(dots[0].pos.x)
  for (var i=0; i<dots.length-1; i++){
    for (var j=i+1; j<dots.length; j++){
      var dist = p5.Vector.sub(dots[i].pos, dots[j].pos);
      if (dist.mag() < max_dist) {
        strokeWeight(1);
        var alpha = (max_dist-dist.mag())*2;
        stroke(255, 255, 255, alpha);
        line(dots[i].pos.x, dots[i].pos.y, dots[j].pos.x, dots[j].pos.y);
      }
    }
  }
}

function replace() {
  index = Math.floor(Math.random()*dots.length);
  var vehicle = new Vehicle(1);
  dots[index] = vehicle;
}