function make2DArray(cols, rows){
  let arr = new Array(cols);
  for (let i=0; i<arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 1;
let x;
let y;
let direction;
let itterations;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);

  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      grid[i][j] = 0;
    }
  }
  console.log(grid);

  x = floor(cols/2);
  y = floor(rows/2);
  direction = [-1, 0];
  console.log(direction);

  itterations = createSlider(1,10000, 10, 10);
}

function update() {
  new_direction = [];
  if (grid[x][y] == 0) {
    new_direction[0] = -direction[1];
    new_direction[1] = direction[0];
  } else {
    new_direction[0] = direction[1];
    new_direction[1] = -direction[0];
  }
  direction = new_direction;
  grid[x][y] = (grid[x][y]+1) % 2;
  x += direction[0];
  y += direction[1];

  if (x == cols) x -= cols;
  if (y == rows) y -= rows;
  if (x < 0) x += cols;
  if (y < 0) y += rows;
}

function draw() {
  background(255);

  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      n = i * resolution;
      m = j * resolution;
      if (grid[i][j] == 1) {
        fill(0);
        strokeWeight(1);
        point(n, m);
      }
    }
  }

  for (var i=0; i<itterations.value(); i++) {
    update();
  }

}
