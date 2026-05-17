let pic
let sounds= [];

//code base sourced from workshop experiment from week 5 text and images

function preload(){
  pic=loadImage('P5bass.jpg')
  sounds[0] = loadSound('Estringbass.mp3');
  sounds[1] = loadSound('Astringbass.mp3'); 
  sounds[2] = loadSound('Dstringbass.mp3');
  sounds[3] = loadSound('Gstringbass.mp3');
}

function setup() {
  createCanvas(400, 400);
  background(220);
}

function mousePressed() {
  let randomSound = random(sounds);
  randomSound.play();
}

function draw() {
  background(0);
  noStroke()
  let iw=pic.width
  let ih=pic.height
  let step=floor(map(mouseX,0,width,5,40))
  let offset
  let r,g,b,s
  pic.loadPixels()
  for(let j=0; j<ih; j+=step){
    for(let i=0; i<iw; i+=step){
      offset=(i+j*iw)*4
      r=pic.pixels[offset]
      g=pic.pixels[offset+1]
      b=pic.pixels[offset+2]
      s=(r+g+b)/3
      fill(r,120,250)
      push()
      translate(i,j)
      rect(0,0,step,step*s/255,)
      pop()
    }
    
  }
}