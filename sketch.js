const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var chao
var ball, ballImg
var engine, world;

//paredes laterais
var leftWall, rightWall, tetoWall;

//botões para mover a bola
var buttonLeft, buttonRight;

function preload(){
  ballImg = loadImage("./assets/basquetebol.png")
}

function setup() {
  var canvas = createCanvas(400, 600);
  canvas.center()

  engine = Engine.create();
  world = engine.world;

 
  var chao_options = {
    isStatic: true
  }

  var ball_options = {

    restitution: 0.75
  }

  ball = Bodies.circle(100, 100, 40, ball_options)
  World.add(world, ball)


  chao = Bodies.rectangle(200,580,400,20, chao_options);
  World.add(world, chao);

  leftWall = new Wall(-100, 300, 5, 800);
  rightWall = new Wall(450,300, 10, 800);
  //teto
  tetoWall = new Wall(200,0, 400, 10);

  //criando os botões 
  // buttonLeft = createImg('./assets/pointLeft.png');
  // buttonLeft.position(width +480,height/2 +10);
  // buttonLeft.size(50, 50);
  // buttonLeft.mouseClicked(leftForce)

  // buttonRight = createImg('./assets/pointRight.png');
  // buttonRight.position(width/2 +380,height/2 +10);
  // buttonRight.size(50, 50);
  // buttonRight.mouseClicked(rigthForce)
  
  //adicionar o modo do desenho da forma
  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  
}


function draw() {
  background("#1C1C1C");
  Engine.update(engine);
  
  noStroke()
  fill("#363636")
  rect(chao.position.x, chao.position.y, 550, 40);
  
  
  leftWall.display()
  
  //ellipse(ball.position.x,ball.position.y,20);
  image(ballImg, ball.position.x, ball.position.y,60,60);
  imageMode(CENTER);
 
}

//criando funções de aplicar força:
function rigthForce(){
  //if(keyCode === RIGHT_ARROW){ 
  Matter.Body.applyForce(ball, {x:0, y:0}, {x:0.07, y:-0.07} )
  //}
}

const leftForce =()=>{
  Matter.Body.applyForce(ball,{x:0, y:0}, {x:-0.07, y:-0.07});
}
