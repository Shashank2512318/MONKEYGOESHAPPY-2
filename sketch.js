var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score= 0;
var Edges;
var play= 1;
var danger= 3;
var over= 2;
var gameState= play;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  restartImage = loadImage("restart-removebg-preview.png");
  background1Image = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background1 = createSprite(500, 230, 10, 10);
  background1.addImage(background1Image);
  background1.scale= 3;
  
  
  
  monkey = createSprite(100, height-100, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale= 0.2
  
  obstacleGroup= new Group();
  
  FoodGroup= new Group();
  
  restart = createSprite(width/2, height/2, 10, 10);
  restart.scale= 0.5
  restart.visible= false;
  restart.addImage(restartImage);
  
  Edges= createEdgeSprites();
  
}



function draw() {
background("orange");
  
  

  
  monkey.collide(Edges[3]);
  
  restart.visible= false;
  
  if(gameState === play) {
    spawnObstacles();
    
    spawnbananas();
    
    if(background1.x < 0) {
       background1.x= background1.width/2;
    }
    
    background1.velocityX= -(5+1* score/ 2);

      if(touches.length > 0 || keyDown("space") && monkey.y>= height-80) {
      monkey.velocityY= -25;
     
     }
   
    monkey.velocityY= monkey.velocityY+1;
    
    obstacleGroup.setVelocityXEach(background1.velocityX);
    
    FoodGroup.setVelocityXEach(background1.velocityX);
    
      if(monkey.isTouching(FoodGroup)) {
        score= score+1;
        FoodGroup.destroyEach();
      }
    
    if(monkey.isTouching(obstacleGroup)) {
      obstacleGroup.destroyEach();
      gameState= danger;
    }
    
  }else if(gameState === danger) {
    monkey.scale= 0.1 ;
    if(background1.x < 0) {
    background1.x= background1.width/2;
    }
      
   

    spawnObstacles();
    
    spawnbananas();
      
    if(keyDown("space") && monkey.y>= height-80) {
    monkey.velocityY= -25;
     
    }
    
    if(monkey.isTouching(FoodGroup)) {
    score= score+1;
    FoodGroup.destroyEach();
      }
    
    monkey.velocityY= monkey.velocityY+1;
    
    obstacleGroup.setVelocityXEach(background1.velocityX);
    
    FoodGroup.setVelocityXEach(background1.velocityX);
    
    background1.velocityX= -(5+1* score/ 2);
  }
  
  if (monkey.isTouching(obstacleGroup) && (monkey.scale= 0.1)){
      gameState= over;
      
      }
  
  if(gameState === over) {
    restart.visible= true;
    background1.velocityX= 0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  drawSprites();
  
  text("Survival Time : "+score, width-120, 50);
  
}

function reset() {
  score= 0;
  gameState= play;
  monkey.x= 100;
  monkey.y= height-100;
  monkey.scale= 0.2;
  
}

function spawnObstacles() {
  if(frameCount % 150 === 0){
  stones = createSprite(550, height-50, 10, 10);
  stones.velocityX= -5;
  stones.scale= 0.1;  
  stones.addImage(obstacleImage);
  stones.lifetime= 310;
  obstacleGroup.add(stones);  
  }
}

function spawnbananas() {
  if(frameCount % 60 === 0) {
  banana = createSprite(550,Math.round(random(300, 400), 10, 10));
  banana.velocityX= -5;
  banana.addImage(bananaImage);
  banana.scale= 0.1;
  banana.lifetime= 310;
  FoodGroup.add(banana);
  }
}
