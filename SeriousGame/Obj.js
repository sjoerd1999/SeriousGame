function Obj(x, y, w, h, img, hoverable, pulsating, appearing, txt, click_callback) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.img = img;
  this.hoverable = hoverable;
  this.click_callback = click_callback;
  this.pulsating = pulsating;
  this.appearing = appearing;
  this.txt = txt;
  this.toggle = false;

  this.mouseIsOver = function() {
    return (mX > this.x && mX < this.x + this.w && mY > this.y && mY < this.y + this.h);
  };

  this.run_and_display = function() {
    this.run();
    this.display();
  }

  this.run = function() {
    if (this.click_callback != null && this.mouseIsOver() && mouseClick) {
      this.click_callback();
    }
  };

  this.display = function() {
    if (this.hoverable && this.mouseIsOver()) {
      let glow_scl = 1.2;
      image(assets.images['green_glow'], this.x - (this.w * (glow_scl - 1))/2, this.y - (this.h * (glow_scl - 1))/2, this.w * glow_scl, this.h * glow_scl);
    }
    push();
    let x = this.x, y = this.y, w = this.w, h = this.h;
    if (this.pulsating) {
      let sz = map(sin(millis() / 500), -1, 1, 0.9, 1.1);
      w *= sz;
      h *= sz;
      x -= (w * (sz - 1)) / 2;
      y -= (h * (sz - 1)) / 2;
    }
    if (this.txt != null) {
      if (this.mouseIsOver()) {
        strokeWeight(5);
      } else {
        strokeWeight(2);
      }
      fill(255);
      stroke(0);
      rect(x, y, w, h, 5);
      fill(0);
      noStroke();
      if (this.txt.length < 6) textSize(20);
      else textSize(16);

      textAlign(CENTER, CENTER);
      if (this.txt != 'x' || this.toggle) {
        text(this.txt, x + w/2, y + h/2);
      }
    } else if (!this.appearing || (this.appearing && this.mouseIsOver())) {
      image(assets.images[this.img], x, y, w, h);
    }
    pop();
  };
}
