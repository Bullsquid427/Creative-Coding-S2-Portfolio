let engine;
let world;
let planetCenter;
let attractors = [];

function setup() {
  createCanvas(800, 800);
  engine = Matter.Engine.create();
  world = engine.world;

  // 1. Turn off standard gravity
  world.gravity.y = 0;

  planetCenter = createVector(width / 2, height / 2);

  // Create a few random bodies
  for (let i = 0; i < 10; i++) {
    let b = Matter.Bodies.circle(random(width), random(height), 20);
    Matter.World.add(world, b);
    attractors.push(b);
  }

  Matter.Runner.run(engine);
}

function draw() {
  background(20);

  // Draw the "Planet"
  fill(0, 150, 255);
  circle(planetCenter.x, planetCenter.y, 100);

  attractors.forEach(body => {
    applyRadialGravity(body);
    
    // Draw the bodies
    fill(255);
    beginShape();
    for (let vert of body.vertices) {
      vertex(vert.x, vert.y);
    }
    endShape(CLOSE);
  });
}

function applyRadialGravity(body) {
  let forceDirection = p5.Vector.sub(planetCenter, createVector(body.position.x, body.position.y));
  
  let distanceSq = forceDirection.magSq();
  let G = 0.001; // Gravitational constant - adjust to taste
  
  // Prevent division by zero or extreme forces when very close
  distanceSq = constrain(distanceSq, 500, 10000); 
  
  let strength = G * (body.mass) / distanceSq;
  
  forceDirection.setMag(strength);

  // 3. Apply the force to the body
  Matter.Body.applyForce(body, body.position, {
    x: forceDirection.x,
    y: forceDirection.y
  });
}