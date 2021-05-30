var bg_img;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
//var w = ground.width;

var score;

var PLAY = 1,END = 0,gameState = PLAY;

var restart,restartImage,gameOver,gameOverImage;


function preload(){
  bg_img = loadImage('trexBg.jpeg');
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

 restartImage=loadImage("restart.png");
 gameOverImage = loadImage("gameOver.png");
 

}





function setup() {
  createCanvas(600, 200);
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  trex.velocityX = 1;
  trex.setCollider("circle",0,0,35);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -8;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  invisibleGround.velocityX = 1;
  
 
  obstaclesGroup = new Group();
  
  score = 0;
  
  restart = createSprite(200,120,20,20);
  restart.addImage("restartImage",restartImage);
  restart.scale = 0.5
  
  gameOver = createSprite(200,90,20,20);
  gameOver.addImage("gameover",gameOverImage);
  gameOver.scale = 0.5
 
  
//trex.debug = true;

  
}

function draw() {
  background(bg_img);
  trex.velocityY = trex.velocityY + 0.8;
   camera.position.x = trex.x;
   camera.position.y = trex.y;

  
  
  if(gameState === PLAY){
    
   score = score + Math.round(getFrameRate()/60);
  
  
  if(keyDown("space")) {
    trex.velocityY = -10;
 
  
  
  }
   
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  
  trex.collide(invisibleGround);
  
  spawnObstacles();
    
    
    if(trex.isTouching(obstaclesGroup)){
      gameState = END;
      
      
    }
    
    gameOver.visible = false;
    restart.visible = false;
  }
  
  
  
  
  else if (gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    trex.velocityY = 0;
    trex.velocityX = 0;
    invisibleGround.velocityX = 0;
   
  
    obstaclesGroup.setLifetimeEach(-1)
  

    trex.changeAnimation("collided",trex_collided);
 
    gameOver.visible = true;
    restart.visible = true;
  
 if(mousePressedOver(restart)){
    
  reset();  
  }
   
  
  
  
  
  }
  fill('red');
   text("Score: "+ score, 50,100);
  
  
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  score = 0;
 
  trex.changeAnimation("running", trex_running);
  ground.velocityX = -8
  
}







  

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -8;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //obstacle.debug = true;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}