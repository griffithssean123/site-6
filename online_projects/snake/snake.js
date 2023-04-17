function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 1;
    this.tail = [];
    this.tail.push([0,0]);

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y)
        if (d < 1) {
            this.total ++;
            return true;
        }
        else return false;
    }
  
    this.dir = function(x,y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function() {
        this.tail.push([this.x, this.y])
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width-scl);
        this.y = constrain(this.y, 0, height-scl);
    }
  
    this.show = function() {
        for (var i=0; i<this.total; i++) {
            fill(255);
            rect(this.tail[i][0], this.tail[i][1], scl, scl);
            console.log(this.tail[i][0]);
        }
    }
  }