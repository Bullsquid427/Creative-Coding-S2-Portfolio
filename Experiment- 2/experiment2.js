let fileName = 'hl1_song10.mp3';
let mySound
let fft
let songName;
let audioLevel

function preload() {
  mySound = loadSound(fileName);
}


function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES)
  rectMode(CORNER)
  
  fft = new p5.FFT(0.3)

  
  noLoop()
}

function draw() {
  background(0)
  
  translate(width / 2 , height / 2)
  
// --- VOLUME PERCENTAGE DISPLAY ---
  push();
  fill(0, 190, 255);
  noStroke();
  textAlign(CENTER, CENTER);

  let volPercent = map(audioLevel, 0, 255, 0, 100);
  
  volPercent = constrain(volPercent, 0, 100);
  
  textSize(20);
  textFont('Courier New');
  text("Volume", 0, -15);
  
  textSize(28);

  text(floor(volPercent) + "%", 0, 10); 
  pop();
  
  spectrum = fft.analyze()
  audioLevel = fft.getEnergy(20, 200)
  
  let visualBins = floor(spectrum.length* 0.66);

  stroke(0, 190, 255,)
  strokeWeight(15)
  
  for (let i = 0; i < visualBins; i++) {
    let angle = map(i, 0, visualBins, 0, 360)
    let amp = spectrum[i]
    let r = map(amp, 0, 256, 0, 150) // The height of the bar
    
    push()
    rotate(angle)
    // Draw the bar starting from the waveform's inner radius (~150)
    rect(0, 100, 0,  r) 
    pop()
  }
  
  push()
  if (audioLevel > 230) {
  rotate(random(-0.5, 0.5))
  }
  

  
  stroke(0,190,255)
  strokeWeight(3)
  noFill()
  
  let wave = fft.waveform()
  
  for (let t = -1; t <= 1; t += 2) {
    beginShape()
    for (let i = 0; i <= 180; i += 0.5) {
    let index = floor(map(i, 0, 180, 0, wave.length -1))
  
    let r = map(wave[index], -1, 1, 150, 350)
    
    let x = r * sin(i) * t
    let y = r * cos(i)
    vertex(x, y)
    }
    endShape()
  }

}

function mouseClicked() {
  if (mySound.isPlaying()) {
    mySound.pause()
    noLoop()
  } else {
    mySound.play()
    loop()
  }
}