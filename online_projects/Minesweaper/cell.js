function Cell(i, j, w) {
    this.i = i;
    this.j = j
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    if (random(1) < 0.1) this.bomb = true;
    else this.bomb = false;
    this.revealed = false;
    this.neighbourCount = 0;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill(0);
    rect(this.x, this.y, this.w-1, this.w-1);
    if (this.revealed) {
        if (this.bomb) {
            stroke(0);
            fill(127);
            ellipse(this.x + w/2, this.y + w/2, this.w * 0.5);
        } else {
            fill(200);
            noStroke();
            rect(this.x, this.y, this.w-1, this.w-1);
            if (this.neighbourCount > 0) {
                textAlign(CENTER);
                fill(0);
                text(this.neighbourCount, this.x + this.w/2, this.y + this.w/2 + 4);
            }
        }
    } 

}

Cell.prototype.countBombs = function() {
    if (this.bomb) return -1;
    var total = 0

    if (this.i > 0 && this.j > 0) total += grid[this.i-1][this.j-1].bomb==true;
    if (this.i > 0) total += grid[this.i-1][this.j].bomb==true;
    if (this.i > 0 && this.j < cols-1) total += grid[this.i-1][this.j+1].bomb==true;

    if (this.j > 0) total += grid[this.i][this.j-1].bomb==true;
    if (this.j < cols-1) total += grid[this.i][this.j+1].bomb==true;

    if (this.i < rows-1 && this.j > 0) total += grid[this.i+1][this.j-1].bomb==true;
    if (this.i < rows-1) total += grid[this.i+1][this.j].bomb==true;
    if (this.i < rows-1 && this.j < cols-1) total += grid[this.i+1][this.j+1].bomb==true;

    this.neighbourCount = total;
}

Cell.prototype.contains = function(x,y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.neighbourCount == 0 && this.bomb == false) {
        if (this.i > 0 && this.j > 0           && grid[this.i-1][this.j-1].revealed == false) grid[this.i-1][this.j-1].reveal();
        if (this.i > 0                         && grid[this.i-1][this.j].revealed == false) grid[this.i-1][this.j].reveal();
        if (this.i > 0 && this.j < cols-1      && grid[this.i-1][this.j+1].revealed == false) grid[this.i-1][this.j+1].reveal();

        if (this.j > 0                         && grid[this.i][this.j-1].revealed == false) grid[this.i][this.j-1].reveal();
        if (this.j < cols-1                    && grid[this.i][this.j+1].revealed == false) grid[this.i][this.j+1].reveal();

        if (this.i < rows-1 && this.j > 0      && grid[this.i+1][this.j-1].revealed == false) grid[this.i+1][this.j-1].reveal();
        if (this.i < rows-1                    && grid[this.i+1][this.j].revealed == false) grid[this.i+1][this.j].reveal();
        if (this.i < rows-1 && this.j < cols-1 && grid[this.i+1][this.j+1].revealed == false) grid[this.i+1][this.j+1].reveal();
    }
}