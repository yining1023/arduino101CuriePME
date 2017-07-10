const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1216"; // lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb'
const name = 'CuriePME';

var bluetoothDevice;
var characteristiPattern;

var value;
var letter = 'Waiting...';
var index;

var backgroundColors = ['#1DFFAD', '#0FE8E2', '#2272FF'];
var letterColors = ['#FF5797', '#EF5565', '#FB5524'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(180);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  fill(0);
  background(255);
  if (letter !== 'Waiting...') changeColors();
  text(letter, width / 2, height / 2);
}

function changeColors() {
  if (letter === 'A') {
    index = 0;
  } else if (letter === 'B') {
    index = 1;
  } else if (letter === 'C') {
    index = 2;
  }
  background(backgroundColors[index]);
  fill(letterColors[index]);
}
