function Assets() {
  this.image_files = [
  'arrow_right.png', 'arrow_left.png', 'green_glow.png', 'star.png',
  'startscreen_background.png', 'startscreen_textbox.png', 'level1_background.png', 'level1_background_night.png', 'snowstorm.gif',
  'level1_laptop.png', 'level1_door.png', 'level1_fridge.png', 'level1_powerbank.png', 'level1_closet.png', 'level1_phone.png',
  'powerbank_q1.png', 'powerbank_q2.png', 'powerbank_q3.png',
  'laptop_background_1.png', 'laptop_background_2.png', 'laptop_battery.png', 'laptop_chrome.png', 'laptop_q1.png', 'laptop_searchbox.png', 'laptop_options_2.png',
  'door_q1.png',
  'phone_email_button.png','phone_email.png', 'phone_email_q1.png'];
  this.sound_files = ['explosion.wav'];
  this.images = {};
  this.sounds = {};
  this.loaded = 0;
  var self = this;

  this.exists = function(name) {
    return name in this.images;
  };

  this.done_loading = function() {
    return this.loaded == (this.image_files.length + this.sound_files.length);
  };

  this.on_load_image = function(name, data) {
    console.log('Successfully loaded image: ' + name);
    self.images[name.split('.')[0]] = data;
    self.loaded ++;
  };

  this.on_load_sound = function(name, data) {
    console.log('Successfully loaded sound: ' + name);
    self.sounds[name.split('.')[0]] = data;
    self.loaded ++;
  };

  this.on_fail = function(val) {
    console.log('Failed to load image');
    console.log(val);
  };

  this.load = function() {
    for (var i = 0; i < this.image_files.length; i++) {
      let img = loadImage('data/' + this.image_files[i], this.on_load_image.bind(arguments[0], this.image_files[i]), this.on_fail);
    }
    for (var i = 0; i < this.sound_files.length; i++) {
      let sound = loadSound('data/' + this.sound_files[i], this.on_load_sound.bind(arguments[0], this.sound_files[i]), this.on_fail);
    }
  };
}
