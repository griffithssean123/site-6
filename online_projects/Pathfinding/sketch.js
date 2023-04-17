function removeFromArray(arr, elt) {
  var index = arr.indexOf(elt);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

function heuristic(a, b) {
  //var d = dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

var cols;
var rows;
var grid;

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];

let startButton;

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbours = [];
  this.previous = undefined;
  this.wall = false;


  if (random(1) < 0.3) {
    this.wall = true;
  }

  this.show = function(col) {
    fill(col);
    if (this.wall) fill (0);
    if (this === end) fill (255, 255, 0);
    if (this === start) fill (255, 255, 0);
    noStroke();
    rect(this.i * w, this.j * h, w-1, h-1);
  }

  this.addNeighbours = function(grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols -1) this.neighbours.push(grid[i+1][j]);
    if (i > 0) this.neighbours.push(grid[i-1][j]);
    if (j < rows -1) this.neighbours.push(grid[i][j+1]);
    if (j > 0) this.neighbours.push(grid[i][j-1]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(width/20);
  rows = floor(height/20);

  w = width/cols;
  h = height/rows;

  startButton = createButton('click me');
  startButton.position(0,0);

  // Making a 2D array
  grid = new Array(cols);
  for (var i=0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }

  console.log(grid);
  start = grid [5][floor(rows/2)];
  end = grid[cols-6][floor(rows/2)];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
  console.log(grid);
}

function draw() {
  console.log(openSet);
  if (openSet.length > 0) {

    var lowestIndex = 0;
    for (var i=0; i<openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    var current = openSet[lowestIndex];

    if (current === end) {

      noLoop();

      console.log("DONE!");
    } else {

      removeFromArray(openSet, current);
      console.log(openSet);
      closedSet.push(current);

      var neighbours = current.neighbours;
      for (var i=0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];
        if (!closedSet.includes(neighbour) && !neighbour.wall) {
          var tempG = current.g + 1;
          if (openSet.includes(neighbour)) {
            if (tempG < neighbour.g) {
              neighbour.g = tempG;
              neighbour.h = heuristic(neighbour, end);
              neighbour.f = neighbour.g + neighbour.h;
              neighbour.previous = current;
            }
          } else {
            neighbour.g = tempG;
            openSet.push(neighbour);
            neighbour.h = heuristic(neighbour, end);
            neighbour.f = neighbour.g + neighbour.h;
            neighbour.previous = current;
          }
        }
      }
    }

  } else {
    //no solution
    console.log('no solution');
    noLoop();
    return;
  }

  background(51);

  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (var i=0; i<closedSet.length; i++) {
    closedSet[i].show(color(255,0,0));
  }

  for (var i=0; i<openSet.length; i++) {
    openSet[i].show(color(0,255,0));
  }

  //Find the path;
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  
  for (var i=0; i<path.length; i++) {
    path[i].show(color(0,0,255));
  }
}
