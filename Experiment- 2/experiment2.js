let mySound
let fft

function preload() {
  mySound = loadSound('hl1_song10.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  rectMode(CENTER)
  fft = new p5.FFT(0.3)
  
  noLoop()
}

function draw() {
  background(0)
  
  translate(width / 2 , height / 2)
  
  fft.analyze()
  amp = fft.getEnergy(20, 200)
  
  push()
  if (amp > 230) {
  rotate(random(-0.5, 0.5))
  }
  
  
  pop()
  
  let alpha = map(amp, 0, 255, 120, 120)
  fill(0, alpha)
  noStroke()
  rect(0, 0, width, height)
  
  stroke(255)
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