
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY=1;
var END=0;
var gameState=PLAY;
var restart, restartImage;
var gameOver, gameOverImage;

function preload(){
  monkey_collided=loadAnimation("monkey_0.png");
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
   
  restartImage=loadImage("reset.png");
  gameOverImage=loadImage("gameOver.png");
}



function setup() {
  // createCanvas(600, 600);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("collided",monkey_collided);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  restart=createSprite(200,250);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  gameOver=createSprite(200,100);
  gameOver.addImage(gameOverImage);
  
}


function draw() {
  
  background(255);
  
  
  
   
 
  drawSprites();
  
  
  if(gameState===PLAY){
      
    gameOver.visible=false;
    restart.visible=false;
    
 
    
        stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 150,40);        
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
    
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState=END;
    
    }
    
    if(FoodGroup.isTouching(monkey)){
       score=score+1;
      FoodGroup.destroyEach();
       }
    if(score>5){
      ground.velocityX=-7;
      banana.velocityX=-9;
      obstacle.velocityX=-9;
    }

  }
  
  if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    
    stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 150,40);  
    
    FoodGroup.destroyEach(); 
    
    ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("collided",monkey_collided);
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
}

function reset(){
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  gameState=PLAY;
  score=0;
  monkey.changeAnimation("moving", monkey_running);
 
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 100 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    obstacle = createSprite(800,320,6,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
