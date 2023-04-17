function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i=0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var game_is_over = false;

function setup() {
  createCanvas(400, 400);
  cols = floor(width/w);
  rows = floor (height/w);

  grid = make2DArray(cols, rows);
  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j].countBombs();
    }
  }
}

function gameOver() {
  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  game_is_over = true;
}

function mousePressed() {
  console.log('press');
  if (game_is_over == true) {
    game_is_over = false;
    setup();
  } else {
    console.log('yes')
    for (var i=0; i<cols; i++) {
      for (var j=0; j<rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();

          if (grid[i][j].bomb) {
            gameOver();
          }
        }
      }
    }
  }
}

function draw() {
  background(255);

  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j].show();
    }
  }
}
