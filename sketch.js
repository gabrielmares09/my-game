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

//adicionadno som
var bgSound, hoopImg,  hoopImg2, hoop, hoop2


var blococesta1, blococesta2; 

let score = 0;
const startScreen= document.querySelector('.startScreen');
document.addEventListener('DOMContentLoaded',(e)=>{
  setTimeout(()=>{
    startScreen.classList.add('display-none');
  }, 2000);
} )


function preload(){
  ballImg = loadImage("./assets/basquetebol.png");
  bgSound = loadSound("./assets/sound_bg.wav");
  hoopImg = loadImage("./assets/cestaBasqueteLeft.png");
  hoopImg2 = loadImage("./assets/cestaBasqueteRIght.png")
}

function setup() {
  var canvas = createCanvas(400, 600);
  bgSound.play()
  canvas.center()

  engine = Engine.create();
  world = engine.world;

 
  var chao_options = {
    isStatic: true
  }

  
  var ball_options = {

    restitution: 0.75
  }

  ball = Bodies.circle(100,500, 40, ball_options)
  World.add(world, ball)


  chao = Bodies.rectangle(200,580,400,20, chao_options);
  World.add(world, chao);

  leftWall = new Wall(-100, 300, 5, 800);
  rightWall = new Wall(450,300, 10, 800);
  //teto
  tetoWall = new Wall(200,0, 400, 10);

  var hoop_options = {
    isStatic: true,
    restitution:0.5
  }

  //cesta
  hoop = Bodies.rectangle(50, 350, 50, 70, hoop_options);
  World.add(world, hoop);


  // var hoop2_options = {
  //   isStatic: true,
  //   restitution:0.5
  // }

  // //cesta
  // hoop2 = Bodies.rectangle(550, 200, 50, 70, hoop2_options);
  // World.add(world, hoop2);

  // criando os botões 
  buttonLeft = createImg('./assets/pointLeft.png');
  buttonLeft.position(width +580,height/2 +10);
  buttonLeft.size(50, 50);
  buttonLeft.mouseClicked(leftForce)

  buttonRight = createImg('./assets/pointRight.png');
  buttonRight.position(width/2 +470,height/2 +10);
  buttonRight.size(50, 50);
  buttonRight.mouseClicked(rigthForce);


  blococesta1 = createSprite(80, 300, 70, 30);
  blococesta1.visible = false;
  blococesta1.setCollider("rectangle", 0,0,50,30)
  //blococesta1.debug=true;
  
  //adicionar o modo do desenho da forma
  rectMode(CENTER);
  ellipseMode(RADIUS);
  

  
}


function draw() {
  background("#1C1C1C");
  Engine.update(engine);

  // fill('white')
  // textSize(20);
  // text("🏀 score: "+ score + " 🏀", 140, 60 )
  fill('white');
  textSize(20);
  text("🏀 score: " + score + " 🏀", 140, 60);
  
  
  
  leftWall.display()
  
  //ellipse(ball.position.x,ball.position.y,20);
  image(ballImg, ball.position.x, ball.position.y,60,60);

  push()
  imageMode(CENTER);
  //condição para não dar erro na imagem
  if(hoop!=null){ 
  //imagem retangulo
  image(hoopImg, hoop.position.x, hoop.position.y, 220,300)
  }
  pop()
 
  if (collide(ball, blococesta1) == true) {
    Matter.World.remove(world, hoop);
    hoop = null;
    score += 1;
  
    // Crie a segunda cesta (hoop2) e posicione-a corretamente
    var hoop2_options = {
      isStatic: true,
      restitution: 0.5
    };
    hoop2 = Bodies.rectangle(hoop.position.x + 50, hoop.position.y - 50, 50, 70, hoop2_options);
    World.add(world, hoop2);
  }
  

  if(collide(ball, blococesta1)==true){
    setTimeout(() => {
      Matter.World.remove(world, hoop);
      hoop = null;
      score+=1;
    }, 1);
   
      //cesta2
      var hoop2_options = {
        isStatic: true,
        restitution:0.5
      }
    
      //cesta
      hoop2 = Bodies.rectangle(550, 200, 50, 70, hoop2_options);
      World.add(world, hoop2);

      push()
  imageMode(CENTER);
  //condição para não dar erro na imagem
  if(hoop2!=null){ 
  //imagem retangulo
  image(hoopImg2, hoop2.position.x, hoop2.position.y, 220,300)
  }
  pop()
 
  }


  drawSprites()
 
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

//função para detecção de colisão
//a função recebe 3 argumentos, os corpos que irão colidir e o valor do limite de distância
function collide(body,sprite, x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
         //irá detectar a colisão quando a distância enre os objetos for menor que 80
          if(d<=80)
            {
              return true
          
            }
            else{
              return false;
            }
         }
}
