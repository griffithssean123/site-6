var r1 = 200;
var r2 = 200;
var m1 = 40;
var m2 = 40;
var a1 = Math.PI/2;
var a2 = Math.PI/2;
var a1_v = 0;
var a2_v = 0;
var a1_a = 0;
var a2_a = 0;
var del_t = 0.3;
var g = 9.8;

var canvas;
var points = [];
energies = [];
var num_points = 200;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
}

function draw() {
  background(51);
  stroke(255);
  strokeWeight(2);

  // translate(windowWidth/2, 200);
  var x1 = windowWidth/2 + r1 * sin(a1);
  var y1 = 200 + r1 * cos(a1);

  var x2 = x1 + r2 * sin(a2);
  var y2 = y1 + r2 * cos(a2);

  stroke(255);
  line(windowWidth/2, 200, x1, y1);
  fill(255);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(255);
  ellipse(x2, y2, m2, m2);

  a1_a = (-g*(2*m1+m2)*sin(a1) - m2*g*sin(a1-2*a2) - 2*sin(a1-a2)*m2*(a2_v**2*r2+a1_v**2*r1*cos(a1-a1))) / (r1*((2*m1)+m2-m2*cos(2*a1-2*a2)));
  a2_a = 2*sin(a1-a2)*(a1_v**2*r1*(m1+m2)+g*(m1+m2)*cos(a1)+a2_v**2*r2*m2*cos(a1-a1)) / (r2*((2*m1)+m2-m2*cos(2*a1-2*a2)));

  a1_v += a1_a * del_t/2;
  a2_v += a2_a * del_t/2;
  a1 += a1_v * del_t;
  a2 += a2_v * del_t;
  a1_v += a1_a * del_t/2;
  a2_v += a2_a * del_t/2;

  if (points.length < num_points){
    points.push([x2,y2]);
  } else {
    points.shift()
    points.push([x2,y2])
  }

  if (frameCount % 5 == 0) {
    energies.push([PE()/1000, (KE() + PE())/1000]);
    console.log(energies);
  }

  

  for (var i=0; i<points.length-1; i++) {
    stroke(255, 255, 255, ((num_points - points.length +i)*255)/num_points);
    strokeWeight(1);
    line(points[i][0], points[i][1], points[i+1][0], points[i+1][1]);
  }


  if (energies.length < 30) {
    var spread = windowWidth/30;
  } else {
    spread = windowWidth/energies.length;
  }
  for (var i=0; i<energies.length-1; i++) {
    stroke(255,255,255,100);
    strokeWeight(1);
    line(i*spread, -energies[i][1]+700, (i+1)*spread, -energies[i+1][1]+700);
    stroke(255,255,255,50);
    line(i*spread, -energies[i][0]+700, (i+1)*spread, -energies[i+1][0]+700);
  }

}

function KE() {
  var x1 = a1_v*r1*cos(a1);
  var y1 = a1_v*r1*sin(a1);
  var x2 = x1 + a2_v*r2*cos(a2);
  var y2 = y1 + a2_v*r2*sin(a2);
  return((m1*(x1*x1+y1*y1) + m2*(x2*x2+y2*y2))/2)
}

function PE() {
  var y1 = r1*(1-cos(a1));
  var y2 = y1 + r2*(1-cos(a2));

  return(g*m1*y1 + g*m2*y2);
}
