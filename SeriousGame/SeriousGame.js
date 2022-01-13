var W = 1000, H = 500, SCL = 1, OFF_Y = 1, OFF_X = 1;
var mX = 0, mY = 0, mousePress = false, mouseClick = false, prevMousePress = false;
var DEBUG = true;
var assets;
var object;
var screen;
var SEED = 0;
var OBJECT_SCL = 0.77;
var NUM_STARS = 0;

function setSCL() {
  SCL = min(width / W, height / H);
  OFF_Y = height / 2 - H / 2 * SCL;
  OFF_X = width / 2 - W / 2 * SCL;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setSCL();
  assets = new Assets();
  assets.load();
  screen = new Startscreen();
}

function drawCursor() {
  noStroke();
  fill(255, 100);
  circle(mX, mY, 10);
}

function draw() {
  background(100);
  SEED = 0;

  mX = (mouseX - OFF_X) / SCL;
  mY = (mouseY - OFF_Y) / SCL;
  console.log(mX, mY);
  mousePress = mouseIsPressed;
  mouseClick = !prevMousePress && mousePress;
  prevMousePress = mousePress;

  if (assets.done_loading()) {
    //if (screen.state == 'TITLE_SCREEN') {
    //  screen = new Level1_main();
    //  screen.init();
    //}
    push();
    translate(OFF_X, OFF_Y);
    scale(SCL);
    screen.run();
    screen.display();
    drawCursor();
    pop();
  }

  if (DEBUG) {
    fill(255);
    text('FPS: ' + round(frameRate()), width - 100, 50);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setSCL();
}

function keyPressed(){
  if (key == 's') {
      screen = new Level1_main();
      screen.init();
  }
}
