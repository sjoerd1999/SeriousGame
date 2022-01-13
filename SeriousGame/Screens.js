function Startscreen() {
  this.state = 'TITLE_SCREEN';
  this.textbox2 = new Textbox('Interact with objects in your surroundings as you would do in real life to survive through the crisis, skip the actions you would not take.\nThe objective is to understand your actions during the power loss situation.', 150, 150, 600, 200, 28);
  this.ani_timer = 0;
  var self_sc = this;

  this.button = new Obj(900, 25, 77, 88, 'arrow_right', true, true, false, null, function() { 
    self_sc.state = (self_sc.state == 'TITLE_SCREEN') ? 'DESCRIPTION_SCREEN' : 'DONE';
  }
  );

  this.run = function() {
    this.ani_timer ++;
    if (this.state == 'DONE') {
      screen = new Level1();
    };
  };

  this.display = function() {
    noStroke();
    image(assets.images.startscreen_background, 0, 0, W, H);
    this.button.run();
    this.button.display();
    push();
    if (this.state == 'TITLE_SCREEN') {
      translate(min(-1000 + this.ani_timer * 10, 0), 0);
      image(assets.images.startscreen_textbox, 250, 200, 600, 200);
      fill(0);
      textSize(64);
      text('Survive the Crisis', 300, 350);
    } else {
      this.textbox2.display();
    }
    pop();
  };
}


function Level1() {
  this.state = 0;
  this.timer = millis();

  this.textbox1 = new Textbox('You are a university student staying at a student housing on campus.', 180, 150, 400, 200, 28);
  this.textbox2 = new Textbox('The scene you see behind is your dorm room.', 400, 300, 400, 200, 28);
  this.textbox3 = new Textbox('Suddenly you hear a loud sound.', 300, 270, 400, 200, 28);
  this.textbox4 = new Textbox('It seems like the power went down, everything turned dark.', 300, 270, 400, 200, 28);
  this.textbox5 = new Textbox('It\'s a rough winter with a long-lasting snowstorm; going outside is possible, but not adviced.', 150, 300, 500, 200, 28);
  this.textbox6 = new Textbox('Interact with the objects you have in your dorm room and survive.', 150, 200, 450, 200, 28);
  this.textbox7 = new Textbox('Start', 500, 350, 200, 200, 72);

  var self = this;
  this.button = new Obj(900, 25, 77, 88, 'arrow_right', true, true, false, null, function() { 
    self.state ++;
    self.timer = millis();
    if (self.state == 2) {
      assets.sounds.explosion.play();
    }
  }
  );

  this.run = function() {
    if (millis() - this.timer > 2000 && this.state == 0) this.state = 1;
    if (this.state == 2 && millis() - this.timer > 1500) this.state = 3;
    if (this.state == 4 && millis() - this.timer > 1500) this.state = 5;
    if (this.state == 6 && millis() - this.timer > 1500) this.state = 7;
    if (this.state == 8 && millis() - this.timer > 1500) this.state = 9;
    if (this.state == 10){
      screen = new Level1_main();
      screen.init();
    };
  };

  this.display = function() {
    if (this.state < 4) image(assets.images.level1_background, 0, 0, W, H);
    else image(assets.images.level1_background_night, 0, 0, W, H);

    switch(this.state) {
    case 1:
      this.textbox1.display();
      this.textbox2.display();
      break;
    case 3:
      this.textbox3.display();
      break;
    case 5:
      this.textbox4.display();
      break;
    case 7:
      image(assets.images['snowstorm'], 380, 50);
      this.textbox5.display();
      break;
    case 9:
      this.textbox6.display();
      this.textbox7.display();
      break;
    }

    if ((this.state == 1 || this.state == 3 || this.state == 5 || this.state == 7 || this.state == 9) && (millis() - this.timer > 3000)) {
      this.button.run();
      this.button.display();
    }
  };
}

function Level1_main() {
  this.state = 'main';
  this.new_state = 'main';
  this.subscreen = null;
  var self_l1 = this;
  this.buttons = [null, null, null, null, null, null];
  this.objects = ['laptop', 'door', 'fridge', 'powerbank', 'phone', 'closet'];
  this.subscreens = [Laptop, Door, Laptop, Powerbank, Phone, Laptop];
  this.locs = [[110, 185], [-42, 73], [660, 150], [558, 327], [260, 327], [830, 150]];
  
  this.init = function(){
    for (var i = 0; i < this.objects.length; i++){
      let asset_name = 'level1_' + this.objects[i];
      let object_name = this.objects[i];
      this.buttons[i] = new Obj(this.locs[i][0], this.locs[i][1], assets.images[asset_name].width * OBJECT_SCL, assets.images[asset_name].height * OBJECT_SCL, asset_name, false, false, true, null, function() { self_l1.new_state = object_name;});
    }
  };
  
  this.run = function() {
    if (this.state == 'main' && this.new_state != this.state){
      let sub_idx = this.objects.indexOf(this.new_state);
      this.subscreen = new this.subscreens[sub_idx]();
      this.state = this.new_state;
    }
  };

  this.display = function() {
    if(this.subscreen == null){
      image(assets.images['level1_background_night'], 0, 0, W, H);
      for (var i = 0; i < this.buttons.length; i++){
        this.buttons[i].run_and_display();
      }
    } else {
      this.subscreen.run();
      this.subscreen.display();
      console.log(this.subscreen.state, this.subscreen.new_state);
      if (this.subscreen.state == 'done') {
        this.state = 'main';
        this.new_state = 'main';
        this.subscreen = null;
        NUM_STARS += 1;
      }
    }
    for (var i = 0 ; i < NUM_STARS; i++){
      image(assets.images['star'], 920 - i * 60, 20, 40, 40);
    }
  };
}

function Laptop(){
  this.state = 'main';
  this.new_state = 'main';
  var self_laptop = this;
  this.back_button = new Obj(50, 25, 77, 88, 'arrow_left', true, true, false, null, function() { if(self_laptop.state=='search') self_laptop.new_state = 'main'; else self_laptop.new_state = 'done';});
  this.chrome = new Obj(296, 158, assets.images['laptop_chrome'].width * OBJECT_SCL, assets.images['laptop_chrome'].height * OBJECT_SCL, 'laptop_chrome', false, false, true, null, function() { self_laptop.new_state = 'chrome';});
  this.battery = new Obj(587, 42, assets.images['laptop_battery'].width * OBJECT_SCL, assets.images['laptop_battery'].height * OBJECT_SCL, 'laptop_battery', false, false, true, null, function() { self_laptop.new_state = 'battery';});
  this.searchbox = new Obj(213, 155, assets.images['laptop_searchbox'].width * OBJECT_SCL, assets.images['laptop_searchbox'].height * OBJECT_SCL, 'laptop_searchbox', false, false, true, null, function() { self_laptop.new_state = 'search';});
  this.options = new Obj(245, 175, assets.images['laptop_options_2'].width * OBJECT_SCL, assets.images['laptop_options_2'].height * OBJECT_SCL, 'laptop_options_2', false, false, false, null, function() { self_laptop.new_state = 'search';});

  this.button_1_1 = new Obj(450, 150, 80, 30, null, false, false, false, 'Yes', function() { self_laptop.new_state = 'main';});
  this.button_1_2 = new Obj(550, 150, 80, 30, null, false, false, false, 'No', function() { self_laptop.new_state = 'main';});
  this.button_1_3 = new Obj(620, 150, 80, 30, null, false, false, false, 'Yes', function() { self_laptop.new_state = 'main';});
  
  this.checkbox_1 = new Obj(342, 242, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_2 = new Obj(342, 285, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_3 = new Obj(342, 325, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_4 = new Obj(342, 360, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_5 = new Obj(342, 397, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});

  this.run = function(){
  };
  
  this.display = function() {
    if (this.state == 'main' || this.state == 'battery'){
      image(assets.images['laptop_background_1'], 0, 0, W, H);
      this.chrome.run_and_display();
      this.battery.run_and_display();
    }
    if (this.state == 'battery'){
      image(assets.images['laptop_q1'], 410, 100, assets.images['laptop_q1'].width * OBJECT_SCL, assets.images['laptop_q1'].height * OBJECT_SCL);
      this.button_1_1.run_and_display();
      this.button_1_2.run_and_display();
    }
    if (this.state == 'chrome'){
      image(assets.images['laptop_background_2'], 0, 0, W, H);
      this.searchbox.run_and_display();
    }
    if (this.state == 'search'){
      image(assets.images['laptop_background_2'], 0, 0, W, H);
      this.options.run_and_display();
      this.checkbox_1.run_and_display();
      this.checkbox_2.run_and_display();
      this.checkbox_3.run_and_display();
      this.checkbox_4.run_and_display();
      this.checkbox_5.run_and_display();
    }
    this.back_button.run_and_display();
    this.state = this.new_state;
  };
}

function Powerbank(){
  this.state = 0;
  this.new_state = 0;
  var self_power = this;
  
  this.button_1_1 = new Obj(450, 270, 80, 40, null, false, false, false, 'Yes', function() { self_power.new_state = 1;});
  this.button_1_2 = new Obj(550, 270, 80, 40, null, false, false, false, 'No', function() { self_power.new_state = 2;});
  this.button_2_1 = new Obj(350, 270, 100, 40, null, false, false, false, 'No, I forget', function() { self_power.new_state = 'done';});
  this.button_2_2 = new Obj(450, 270, 100, 40, null, false, false, false, 'Sometimes', function() { self_power.new_state = 'done';});
  this.button_2_3 = new Obj(550, 270, 100, 40, null, false, false, false, 'Always', function() { self_power.new_state = 'done';});
  this.button_3_1 = new Obj(350, 270, 100, 40, null, false, false, false, 'No', function() { self_power.new_state = 'done';});
  this.button_3_2 = new Obj(450, 270, 100, 40, null, false, false, false, 'Maybe', function() { self_power.new_state = 'done';});
  this.button_3_3 = new Obj(550, 270, 100, 40, null, false, false, false, 'Yes', function() { self_power.new_state = 'done';});

  this.run = function() {
  };

  this.display = function() {
    image(assets.images['level1_background_night'], 0, 0, W, H);
    if (this.state == 0){
      image(assets.images['powerbank_q1'], 230, 180, assets.images['powerbank_q1'].width * OBJECT_SCL, assets.images['powerbank_q1'].height * OBJECT_SCL);
      this.button_1_1.run_and_display();
      this.button_1_2.run_and_display();
    }
    if (this.state == 1){
      image(assets.images['powerbank_q2'], 230, 180, assets.images['powerbank_q2'].width * OBJECT_SCL, assets.images['powerbank_q2'].height * OBJECT_SCL);
      this.button_2_1.run_and_display();
      this.button_2_2.run_and_display();
      this.button_2_3.run_and_display();
    }
    if (this.state == 2){
      image(assets.images['powerbank_q3'], 230, 180, assets.images['powerbank_q3'].width * OBJECT_SCL, assets.images['powerbank_q3'].height * OBJECT_SCL);
      this.button_3_1.run_and_display();
      this.button_3_2.run_and_display();
      this.button_3_3.run_and_display();
    }
    this.state = this.new_state;
  };
}

function Door(){
  this.state = 0;
  this.new_state = 0;
  var self_door = this;
  
  this.checkbox_1 = new Obj(60, 225, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_2 = new Obj(60, 255, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});

  this.run = function() {
  };

  this.display = function() {
    image(assets.images.level1_background_night, 0, 0, W, H);
    if (this.state == 0){
      image(assets.images['door_q1'], 50, 180, assets.images['door_q1'].width * OBJECT_SCL, assets.images['door_q1'].height * OBJECT_SCL);
      this.checkbox_1.run_and_display();
      this.checkbox_2.run_and_display();
    }
    this.state = this.new_state;
  };
}

function Phone(){
  this.state = 1;
  this.new_state = 1;
  var self_phone = this;
  
  this.back_button = new Obj(50, 25, 77, 88, 'arrow_left', true, true, false, null, function() { if(self_phone.state > 0) self_phone.new_state -= 1; else self_phone.new_state = 'done';});
  this.compose = new Obj(485, 410, assets.images.phone_email_button.width * OBJECT_SCL, assets.images.phone_email_button.height * OBJECT_SCL, 'phone_email_button', false, false, true, null, function() { self_phone.new_state = 2;});

  this.checkbox_1 = new Obj(340, 123, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_2 = new Obj(340, 165, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_3 = new Obj(340, 208, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});
  this.checkbox_4 = new Obj(340, 250, 20, 20, null, false, false, false, 'x', function() { this.toggle = !this.toggle;});

  this.run = function() {
  };

  this.display = function() {
    image(assets.images.level1_background_night, 0, 0, W, H);
    if (this.state == 1 || this.state == 2){
      image(assets.images.phone_email, 0, 0, W, H);
      this.compose.run_and_display();
      if (this.state == 2){
        image(assets.images.phone_email_q1, 320, 50, assets.images.phone_email_q1.width * OBJECT_SCL, assets.images.phone_email_q1.height * OBJECT_SCL);
        this.checkbox_1.run_and_display();
        this.checkbox_2.run_and_display();
        this.checkbox_3.run_and_display();
        this.checkbox_4.run_and_display();
      }
    }
    this.back_button.run_and_display();
    this.state = this.new_state;
  };
}
