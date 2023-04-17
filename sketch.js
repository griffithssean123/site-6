var canvas;
var font;
var vehicles = [];
var words = ['Sean Griffiths', 'An Online Resume'];
var wordnum = 0;
var height;
var scale;
var size;
var max_points = 610;
var radius;

function preload() {
  font = loadFont('Avenir Next LT Pro Demi.otf')
}

function windowResized() {
  canvas = createCanvas(windowWidth, 800);
  if (windowWidth >= 991) {
    height = 300;
    scale = 0.15;
    size = 100;
    radius = 5;
  } else {
    height = 200;
    scale = 0.3;
    size = 48;
    radius = 3;
  }
  textSize(size);
  points = font.textToPoints(words[wordnum], (windowWidth-textWidth(words[wordnum]))/2, height, size, {sampleFactor: scale});
  for (var i=0; i<points.length; i++) {
    vehicles[i].newTarget(points[i].x, points[i].y);
  }
  for (i; i<max_points; i++){
    vehicles[i].newTarget(points[i-points.length].x, points[i-points.length].y);
  }
}

function setup() {
  canvas = createCanvas(windowWidth, 800);
  canvas.position(0,100);
  textFont(font);
  if (windowWidth >= 991) {
    height = 300;
    scale = 0.15;
    size = 100;
    radius = 5;
  } else {
    height = 200;
    scale = 0.3;
    size = 48;
    radius = 3;
  }
  textSize(size);
  var points = font.textToPoints(words[wordnum], (windowWidth-textWidth(words[wordnum]))/2, height, size, {sampleFactor: scale});
  console.log(points);

  for (var i=0; i<points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(
      createVector(random(width), random(height)),
      createVector(pt.x, pt.y),
      p5.Vector.random2D());
    vehicles.push(vehicle);
  }
  for (var i; i<max_points; i++) {
    var pt = points[i-points.length];
    var vehicle = new Vehicle(
      createVector(random(width), random(height)),
      createVector(pt.x, pt.y),
      p5.Vector.random2D());
    vehicles.push(vehicle);
  }
}

function draw() {
  clear();
  if (frameCount % 400 == 0) {
    wordnum += 1;
    if (wordnum == words.length) {wordnum = 0;}
    textSize(size);
    var points = font.textToPoints(words[wordnum], (windowWidth-textWidth(words[wordnum]))/2, height, size, {sampleFactor: scale});
    console.log(points);


    var list = [];
    for (var i = 0; i < points.length; i++) {
        list.push(i);
    }
    for (var i=0; i<points.length; i++) {
      index = list.splice(Math.floor(Math.random()*list.length), 1);
      pt = points[i];
      vehicles[index].newTarget(pt.x, pt.y);
    }
    for (i; i<max_points; i++){
      index = Math.floor(Math.random()*points.length);
      pt = points[index];
      vehicles[i].newTarget(pt.x, pt.y);
    }
  }
  for(var i=0; i<vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show(radius);
  }
  
}
