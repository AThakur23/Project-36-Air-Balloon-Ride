var Ball, database;
var position;
var ballPosition;
var hotAirBalloonImg;
var backgroundImg;

function preload() {
  hotAirBalloonImg = loadAnimation("Images/HotAirBallon01.png", "Images/HotAirBallon02.png", "Images/HotAirBallon03.png");
  backgroundImg = loadImage("Images/cityImage.png");
}


function setup(){

  database = firebase.database();
  console.log(database);

  createCanvas(windowWidth, windowHeight);

  Ball = createSprite(25,25,10,10);
  Ball.shapeColor = "red";
  Ball.addAnimation("balloon", hotAirBalloonImg);

  ballPosition = database.ref("ball/position");
  ballPosition.on("value", readPosition);

  Ball.scale = 0.8;

  

}

function draw(){
  background("white");
  image(backgroundImg,0,0);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
 
  database.ref("ball/position").set({x:position.x + x, 
    y:position.y + y});
  

}

function readPosition(data){

  position = data.val();
  console.log(position.x);

  Ball.x = position.x;
  Ball.y = position.y;
  
}

function showError(){
}
