var vals = [0, 1, 2];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  
  
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
