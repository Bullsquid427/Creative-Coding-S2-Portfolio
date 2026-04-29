let pic

//code base sourced from workshop experiment from week 5 text and images

function preload(){
  pic=loadImage('P5art.jpg')
}

function setup() {
  createCanvas(400, 400);
  background(220);
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
      fill(30,100,160)
      rect(i,j,step*s/255,step)
    }
    
  }
}
