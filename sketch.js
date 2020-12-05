var monkey , monkey_running,monkeyJump
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var bg,bgImage;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  monkeyJump= loadImage("sprite_3.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg")
   
}


function setup() {
createCanvas(600,400)
  
bg = createSprite(600,100)
  
bg.velocityX= -(6+score/30)
bg.addImage("bg",bgImage)
bg.scale=1.2

  
monkey = createSprite(50,350);
monkey.addAnimation("run",monkey_running);
monkey.addImage("monkeyJump",monkeyJump);
monkey.scale=0.1;
monkey.setCollider("rectangle",-100,0,350,600)

ground = createSprite(300,360,600,10);
ground.shapeColor = ("brown")

  
FoodGroup = new Group();
obstacleGroup = new Group();
}


function draw() {
  
  
   switch(score)
  {
    case 10:
      monkey.scale=0.12;
      break;
    case 20:
      monkey.scale=0.14;
      break;
      // max size is 0.16
    case 30:
      monkey.scale= 0.16;
      break;
    case 40:
      monkey.scale= 0.160;
      break;
    case 50:
      monkey.scale= 0.1600;
      break;
    case 60:
      monkey.scale= 0.16000;
      break;
      //once score is above 60 monkey wont grow again  
      
  }

ground.visible= false  
//monkey.debug=true
 
 if(keyDown('space')&& monkey.y>305) 
 {
   monkey.velocityY=-10
   monkey.changeImage("monkeyJump",monkeyJump);
 }
 if(monkey.isTouching(ground))
 {
   monkey.changeAnimation("run",monkey_running); 
 }

monkey.velocityY = monkey.velocityY+0.5;
monkey.collide(ground);
 
  //console.log (monkey.y) 
  
ofobstacles();
  if(obstacleGroup.isTouching(monkey) && monkey.scale>0.1 )
  {
    obstacleGroup.destroyEach();  
    monkey.scale=0.1
  }
  
if((obstacleGroup.isTouching(monkey)&&monkey.scale==0.1)||score===200)
  {
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    monkey.changeImage("monkeyJump",monkeyJump);
    monkey.velocityY= 0

    bg.velocityX=0
   }
bananaX()
   
  if (FoodGroup.isTouching(monkey))
    {
      FoodGroup.destroyEach();
      score= score+2
    }
  
  if(bg.x <= 5){
    bg.x=600
  }
  
//console.log (bg.x)
  
 
  drawSprites(); 
  fill("black")
  textSize(20)
  text("Score:"+score,500,30)
  
  if(obstacleGroup.isTouching(monkey))
    {
    text("game over",150,200, textSize(50),fill("red"));
    }
  if(score===200){
    text("YOU WIN!!",150,200, textSize(50),fill("red"));
  }
  
  if(score===10||score===20||score===30||score===40||score===50||score===60)
     {
     text("SHEILD ENABLED",10,10,textSize(10),fill("cyan"))
         //if monkey is at 10,20,30,40,50 or 60 then it can break the obstacles although the goal is to reach 200 score(100 bananas)
       
     }
}

function ofobstacles(){
  if(frameCount%100===0)
  {
    obstacle = createSprite(620,330)
    obstacle.addImage("o",obstacleImage)
    obstacle.scale=0.15
    obstacle.velocityX= -(6+score/30)
    obstacleGroup.add(obstacle)

    obstacle.setCollider("circle",0,0,150)
    obstacle.lifetime=110
   // obstacle.debug=true
  }
 
}

function bananaX(){
  if(frameCount%120===0)
  {
    banana = createSprite(650,Math.round(random(220,270)))
   
    banana.addImage("b",bananaImage)
    banana.velocityX= -(6+score/70);
    banana.scale=0.1;
    banana.lifetime=110
    
    banana.setCollider("rectangle",0,0,500,300)
    
    FoodGroup.add(banana)
   
  }
}

