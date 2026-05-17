/* base code source - https://stackoverflow.com/a/74816915
Posted by ggorlen, modified by community. See post 'Timeline' for change history
 Retrieved 2026-04-30, License - CC BY-SA 4.0 
 also see 'base code.js' for more information*/

let collisionSound;
//preload for sound effect
function preload() {
  collisionSound = loadSound('metal_solid_impact_hard5.wav');
}

//function to run the rest of the script now that the preload is done
function setup() {
  
  noCanvas();

Matter.use(
  'matter-attractors' // plugin name
);

var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
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
  
// --- COLLISION SOUND LOGIC ---
  Events.on(engine, 'collisionStart', function(event) {
    
    if (collisionSound && collisionSound.isLoaded()) {
      collisionSound.play();
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
  120, 
  {
  isStatic: true,
    
  render: {
      fillStyle: '#2e4bcc',         
    },

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

//  bodies to be attracted
for (var i = 0; i < 15; i += 1) {
  var body = Bodies.polygon(
    Common.random(0, render.options.width), 
    Common.random(0, render.options.height),
    Common.random(1, 5),
    Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10)
  );

  World.add(world, body);
}

// mouse control
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2, 
    render: {
      visible: false 
    }
  }
});

World.add(world, mouseConstraint);

// Keep the mouse in sync with rendering
render.mouse = mouse;
 
    
    Body.translate(attractiveBody, {
        x: 0,
        y: 0
    });
 // Run everything
  Runner.run(Runner.create(), engine);
  Render.run(render);
}