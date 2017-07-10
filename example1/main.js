const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1216"; // lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb'
const name = 'CuriePME';

var bluetoothDevice;
var characteristiPattern;

var value = '64';
var letter = 'Waiting...';
var index = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(180);
  textAlign(CENTER);
  colorMode(HSB, 100);
  noStroke();
  fill(255);
}

function draw() {
  background(10);
  drawDotsBackground();
  text(letter, width / 2, height / 2);
  drawLetters(letter);
}