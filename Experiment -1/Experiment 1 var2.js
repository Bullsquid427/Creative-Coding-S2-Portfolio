let pic
let sfx

//code base sourced from workshop experiment from week 5 text and images

function preload(){
  pic=loadImage('P5duke.jpg');
  sfx=loadSound('xbox-2001-startup.mp3');
}

function setup() {
  createCanvas(600,600);
  background(220);
}

function mousePressed() {
  // 3. Simple trigger: play sound when the user clicks the canvas
  if (sfx.isPlaying()) {
    sfx.pause();
  } else {
    sfx.play();
  }
}

function draw() {
  background(0);
  noStroke()
  let iw=pic.width
  let ih=pic.height
  let step=floor(map(mouseX,0,width,5,10))
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
      fill(16,103,1)
      rect(i,j,step*s/255,step)
    }
    
  }
}
