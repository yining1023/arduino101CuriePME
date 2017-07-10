const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1216"; // lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb'
const name = 'CuriePME';

var bluetoothDevice;
var characteristiPattern;

var value = '64';
var letter = 'Waiting...';
var index = 0;

function connect() {
  let options = {
    filters: [{
      services: [serviceUuid],
      name: name
    }]}

  console.log('Requesting Bluetooth Device...');

  navigator.bluetooth.requestDevice(options)
  .then(device => {
    bluetoothDevice = device; // save a copy
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
}

function setup() {
  createCanvas(920, 600);
  textSize(180);
  textAlign(CENTER);
  colorMode(HSB, 100);
}

function draw() {
  if (letter === 'Waiting...') {
    background(225);
  } else {
    var hue = map(parseInt(value), 65, 67, 0, 70);
    background(hue, 100, 100);
  }

  text(letter, width / 2, height / 2);
}

function disconnect() {
  if (bluetoothDevice && bluetoothDevice.gatt) {
    bluetoothDevice.gatt.disconnect();
    console.log('Discoonected');
  }
}
