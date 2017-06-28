const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1216"; // lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb'
const name = 'Yining-CuriePME';

var characteristiPattern;

var value = '64';
var letter = 'waiting...';

// The midi notes of a scale
var notes = [ 60, 62, 64, 65, 67, 69, 71];
          //  C    D   E   F   G   A   B
          //  0    1   2   3   4   5   6

// For automatically playing the song
var index = 0;
var song = [];
var song1 = [
  { note: 0, duration: 400, display: "C" },
  { note: 0, duration: 400, display: "C" },
  { note: 4, duration: 400, display: "G" },
  { note: 4, duration: 400, display: "G" },
  { note: 5, duration: 400, display: "A" },
  { note: 5, duration: 400, display: "A" },
  { note: 4, duration: 400, display: "G" },

  // { note: 3, duration: 400, display: "F" },
  // { note: 3, duration: 400, display: "F" },
  // { note: 2, duration: 400, display: "E" },
  // { note: 2, duration: 400, display: "E" },
  // { note: 1, duration: 400, display: "D" },
  // { note: 1, duration: 400, display: "D" },
  // { note: 0, duration: 400, display: "C" },

  // { note: 4, duration: 400, display: "G" },
  // { note: 4, duration: 400, display: "G" },
  // { note: 3, duration: 400, display: "F" },
  // { note: 3, duration: 400, display: "F" },
  // { note: 2, duration: 400, display: "E" },
  // { note: 2, duration: 400, display: "E" },
  // { note: 1, duration: 400, display: "D" },
];

var song2 = [
  { note: 0, duration: 400, display: "C" },
];

var song0 = [
  { note: 0, duration: 400, display: "C" },
  { note: 1, duration: 400, display: "D" },
  { note: 2, duration: 400, display: "E" },
];

var trigger = 0;
var autoplay = false;
var osc;

function connect() {
  let options = {
    filters: [{
      services: [serviceUuid],
      name: name
    }]}

  console.log('Requesting Bluetooth Device...');

  navigator.bluetooth.requestDevice(options)
  .then(device => {
    console.log('Got device', device.name);
    return device.gatt.connect();
  })
  .then(server => {
      console.log('Getting Service...');
      return server.getPrimaryService(serviceUuid);
    })
    .then(service => {
      console.log('Getting Characteristics...');
      // Get all characteristics.
      return service.getCharacteristics();
    })
    .then(characteristics => {
      console.log('Got Characteristics');
      characteristicPattern = characteristics[0];

      characteristicPattern.addEventListener('characteristicvaluechanged', handleData);

    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }

function startNotify() {
  characteristicPattern.startNotifications();
}

function handleData(event) {
  value = event.target.value.getUint8(0);
  console.log('> Got Pattern data: ' + value);
  letter = String.fromCharCode(value);
  console.log('> Converted data to letter: : ' + letter);

  if (value - 65 === 0) {
    song = song0;
  } else if (value - 65 === 1) {
    song = song1;
  } else if (value - 65 === 2) {
    song = song2;
  }


  if (!autoplay) {
    index = 0;
    autoplay = true;
  }
}

function setup() {
  createCanvas(920, 600);
  textSize(180);
  textAlign(CENTER);
  colorMode(HSB, 100);

  var div = createDiv("Click Connect and Start Notification, push the button on Arduino101 to input gestures: ")
  div.id("instructions");
  // var button = createA("#","play song automatically.");
  // button.parent("instructions");
  // Trigger automatically playing
  // button.mousePressed(function() {
  //   if (!autoplay) {
  //     index = 0;
  //     autoplay = true;
  //   }
  // });

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}


// 1 2 3
// V W ∞
// var newLetters = ['waiting...', 'V', 'M', '∞'];
function draw() {
  if (letter === 'waiting...') {
    background(225);
  } else {
    var hue = map(parseInt(value), 65, 67, 0, 70);
    background(hue, 100, 100);
  }

  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }

  text(letter, width / 2, height / 2);
  // text('∞', width / 2, 100);
}
