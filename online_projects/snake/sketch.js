var s;
var scl = 20;
var food;

function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let cols = width/scl;
  let rows = height/scl;
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(51);
  s.update();

  if (s.eat(food)) {
    pickLocation();
  } else {
    s.tail.splice(0,1);
  }

  s.show();
  fill(255, 0, 255);
  rect(food.x, food.y, scl, scl);
  console.log(s.tail);
}

function keyPressed() {
  if (keyCode === UP_ARROW) s.dir(0, -1);
  else if (keyCode === DOWN_ARROW) s.dir(0, 1);
  else if (keyCode === RIGHT_ARROW) s.dir(1, 0);
  else if (keyCode === LEFT_ARROW) s.dir(-1, 0);
}