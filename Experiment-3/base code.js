/*below is the unedited code given to me by the LLM model gemini, 
 when I asked it to create a 'planet' with radial gravity in P5.js using matter.js. 
 I originally planned to use this as my code base, and quickly realising it didn't work, 
 i found a better solution on stack overflow which utilised the matter attractors plugin
 for matter.js, and I decided to use this as my codebase instead. The original code for this will also be listed below
*/

//----Gemini code-----
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

//-----stack overflow matter attractors code---------

// Source - https://stackoverflow.com/a/74816915
// Posted by ggorlen, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-30, License - CC BY-SA 4.0

Matter.use(
  'matter-attractors' // PLUGIN_NAME
);

var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create();

// create renderer
var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: Math.min(document.documentElement.clientWidth, 1024),
    height: Math.min(document.documentElement.clientHeight, 1024),
    wireframes: false
  }
});

// create runner
var runner = Runner.create();

Runner.run(runner, engine);
Render.run(render);

// create demo scene
var world = engine.world;
world.gravity.scale = 0;

// create a body with an attractor
var attractiveBody = Bodies.circle(
  render.options.width / 2,
  render.options.height / 2,
  50, 
  {
  isStatic: true,

  // example of an attractor function that 
  // returns a force vector that applies to bodyB
  plugin: {
    attractors: [
      function(bodyA, bodyB) {
        return {
          x: (bodyA.position.x - bodyB.position.x) * 1e-6,
          y: (bodyA.position.y - bodyB.position.y) * 1e-6,
        };
      }
    ]
  }
});

World.add(world, attractiveBody);

// add some bodies that to be attracted
for (var i = 0; i < 150; i += 1) {
  var body = Bodies.polygon(
    Common.random(0, render.options.width), 
    Common.random(0, render.options.height),
    Common.random(1, 5),
    Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10)
  );

  World.add(world, body);
}

// add mouse control
var mouse = Mouse.create(render.canvas);

Events.on(engine, 'afterUpdate', function() {
    if (!mouse.position.x) {
      return;
    }

    // smoothly move the attractor body towards the mouse
    Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.25,
        y: (mouse.position.y - attractiveBody.position.y) * 0.25
    });
});