let mic
let fft
let micLevel

function setup() {
  let cnv= createCanvas(600, 600);
   cnv.mousePressed(userStartAudio);
  angleMode(DEGREES)
  rectMode(CORNER)
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8,64)
   fft.setInput(mic)
}

function draw() {
  background(0)
  
  translate(width / 2 , height / 2)
  
// --- VOLUME PERCENTAGE DISPLAY ---
  push();
  fill(0, 255, 255);
  noStroke();
  textAlign(CENTER, CENTER);

  let volPercent = map(micLevel, 0, 255, 0, 100);
  
  volPercent = constrain(volPercent, 0, 100);
  
  textSize(20);
  textFont('Courier New');
  text("Volume", 0, -15);
  
  textSize(28);

  text(floor(volPercent) + "%", 0, 10); 
  pop();
  
  spectrum = fft.analyze()
  micLevel = fft.getEnergy(20, 200)

  stroke(0, 255, 255);
  noFill(); 
  strokeWeight(2);

  
  let blockHeight = 4; 
  let blockGap = 2;   
  let blockWidth = 12; 

  let visualBins = floor(spectrum.length * 0.66);
  for (let i = 0; i < visualBins; i++) {
    let angle = map(i, 0, visualBins, 0, 360);
    let r_target = map(spectrum[i], 0, 256, 0, 180);
    

    push();
    rotate(angle);
    
    
    for (let currentHeight = 0; currentHeight < r_target; currentHeight += (blockHeight + blockGap)) {
      
      
      let yStart = 100 + currentHeight;

      
      rect(-blockWidth / 2, yStart, blockWidth, blockHeight);
    }
    
    pop();
  }

}
//mic input varient that ditches the waveform and used rectangles instead of lines
// codebase from :https://editor.p5js.org/ariel.koh/sketches/u7EC2WqFo & https://editor.p5js.org/DaveWebbBSU/sketches/R86bHDmis
//heavy inspiration drawn from the radios in cyberpunk