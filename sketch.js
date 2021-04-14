var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed,lastFed;
var feedButton;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedButton=createButton("Feed The Dog");
  feedButton.position(690,95);
  feedButton.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
   database.ref("feedTime").on("value",function(data){
   lastFed = data.val();
   })

   fill(255,255,254);
   textSize(15);
   if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM", 350,30);
    }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30);
    }else{
      text("Last Feed : "+ lastFed + " AM", 350,30);
    }
  
  textSize(17);
  fill("white");
  //text("Last Feed:",300,30);

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodS = foodS-1;
  database.ref('/').update({
    Food:foodS,
    feedTime:hour()
  })
  //write code here to update food stock and last fed time
  foodObj.updateFoodStock(foods);


}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
