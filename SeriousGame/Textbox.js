function Textbox(txt, x, y, w, h, sz) {
  this.txt = txt;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.sz = sz;
  this.colors = {'brown': color(229,168,93), 'pink': color(255,191,185)};

  this.getTextHeight = function() {
    let paragraphs = split(this.txt, '\n');
    let w_ = 0;
    let h_ = 1;
    for (var p = 0; p < paragraphs.length; p++) {
      let splt = split(paragraphs[p], ' ');
      w_ = 0;
      if (paragraphs.length > 1) h_++;
      for (var i = 0; i < splt.length; i++) {
        w_ += textWidth(splt[i]) + textWidth(' ');
        if (w_ > this.w) {
          w_ = textWidth(splt[i]) + textWidth(' ');
          h_++;
        }
      }
    }
    return h_ * textLeading();
  };

  this.display = function() {
    textAlign(LEFT, TOP);
    textSize(this.sz);
    let h_ = this.getTextHeight();
    randomSeed(SEED++);
    let a = random(0, 1.0), b = random(0, 1.0);

    fill(255);
    strokeWeight(30);
    strokeJoin(ROUND);

    stroke(this.colors.brown);
    let stretch = 15, multi = 50;
    quad(this.x - a * multi - stretch, this.y - b * multi - stretch, this.x + this.w + stretch, this.y - stretch, this.x + this.w + stretch, this.y + h_ + stretch, this.x - stretch, this.y + h_ + stretch);

    stroke(this.colors.pink);
    stretch = 5, multi = 35;
    quad(this.x - a * multi - stretch, this.y - b * multi - stretch, this.x + this.w + stretch, this.y - stretch, this.x + this.w + stretch, this.y + h_ + stretch, this.x - stretch, this.y + h_ + stretch);

    stroke(255);
    multi = 20;
    quad(this.x - a * multi,this.y - b * multi, this.x + this.w, this.y, this.x + this.w, this.y + h_, this.x, this.y + h_);

    fill(0);
    noStroke();
    text(this.txt, this.x, this.y, this.w, this.h);
  };
}
