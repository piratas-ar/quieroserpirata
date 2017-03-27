
// Alias de los _modulos_ de _matter-js_ q vamos a usar.
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

// Variables de configuración
var config = {
    ancho: 800,
    alto: 600
  }

var materiales = {
  piso: { density: 0.8, restitution: 1.0, isStatic: true }
}

// Objetos globales
var engine;
var world;
var pirata;

function crear_pirata() {
  // Bodies.rectangle( posicion_x, posicion_y, ancho, alto [, opciones])
  // http://brm.io/matter-js/docs/classes/Bodies.html#method_rectangle
   pirata = Bodies.rectangle(config['ancho']/2, config['alto']/2, 20, 45);

   // Agregar pirata al mundo world
   World.add(world, pirata);
}

function crear_suelo() {
  suelo = Bodies.rectangle(config['ancho']/2, config['alto'], config['ancho']*2, 30, materiales['piso']);
  World.add(world, suelo);
}

function setup() {
  // Creamos el motor y lo guardamos en la variable engine
  // El motor se encarga de la fisica
  engine = Engine.create();
  engine.enableSleeping = true;

  // Copiamos el mundo a la variable world
  // El mundo lleva el registro de todos los objetos que interactuan
  world = engine.world;

  // Correr el motor
  Engine.run(engine);

  crear_suelo();
  crear_pirata();

  // Crear a renderer
  // El renderer se encarga de dibujar las cosas
  var render = Render.create({
      element: document.getElementById('pantalla'),
      engine: engine,
      options: {
        width: config['ancho'],
        height: config['alto'],
        hasBounds: true
      }
  });

  // Correr renderer
  Render.run(render);
}
