let detector;
let video;
let canvas;
let detections = [];
let cameraWidth;
let cameraHeight;

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.log(error)
    detector.detect(video, gotDetections);

  } else {
    detections = results;
    detector.decect(video, gotDetections);
  }
}

function startDecection() {
  detector.detect(video, gotDetections)
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,70);
  video = createCapture(VIDEO);
  cameraWidth = video.width;
  cameraHeight = video.height;
  //video.size(windowWidth, windowHeight);
  video.hide();
  detector.detect(video, gotDetections);
}

function draw() {
  //video.show();
  console.log(cameraWidth);
  console.log(cameraHeight);
  console.log(width);
  image(video, 0, 0);

  for (let i=0; i<detections.length; i++) {
    let object = detections[i];
    stroke(0,255,0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke()
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}