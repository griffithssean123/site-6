var xSlider;
var ySlider;
var zoomSlider;
var max_iterations;
var max_num;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  xSlider = createSlider(-2.5, 2.5, 0, 0.01);
  ySlider = createSlider(-2.5, 2.5, 0, 0.01);
  zoomSlider = createSlider(0.001, 1, 1, 0.01);
  max_iterations = createSlider(1, 4, 2, 1);
  max_num = createSlider(1, 6, 1, 1);

  let x_val = getItem("x_value");
  let y_val = getItem("y_value");
  let zoom_val = getItem("zoom_value");
  let iterations_val = getItem("iterations_value");
  let max_num_val = getItem("max_num_value");
  if (x_val !== null) xSlider.value(x_val);
  if (y_val !== null) ySlider.value(y_val);
  if (zoom_val !== null) zoomSlider.value(zoom_val);
  if (iterations_val !== null) max_iterations.value(iterations_val);
  if (max_num_val !== null) max_num.value(max_num_val);

  xSlider.changed(storeData);
  ySlider.changed(storeData);
  zoomSlider.changed(storeData);
  max_iterations.changed(storeData);
  max_num.changed(storeData);

  zoom = min(height, width);
      console.log(zoom);
      console.log(height);
      console.log(width);
}

function storeData() {
  storeItem("x_value", xSlider.value());
  storeItem("y_value", ySlider.value());
  storeItem("zoom_value", zoomSlider.value());
  storeItem("iterations_value", max_iterations.value());
  storeItem("max_num_value", max_num.value());
  draw();
}


function draw() {
  loadPixels();
  for (var x=0; x<width; x++) {
    for (var y=0; y<height; y++) {

      var a = map(x, 0, width, xSlider.value() - (zoomSlider.value()*1000/height), xSlider.value() + (zoomSlider.value()*1000/height));
      var b = map(y, 0, height, ySlider.value() - (zoomSlider.value()*1000/width), ySlider.value() + (zoomSlider.value()*1000/width));

      var ca = a;
      var cb = b;

      var n = 0;
      var z = 0;

      while (n < 10**max_iterations.value()) {
        var aa = a*a - b*b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (abs(a+b) > 10**max_num.value()) {
          break;
        }
        n++;
      }

      var bright = map(n, 0, 10**max_iterations.value(), 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);
      if (bright == 255) bright = 0;

      var pix = (x + y * width) *4;
      pixels[pix + 0] = 0;
      pixels[pix + 1] = bright/2;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  noLoop();
}
