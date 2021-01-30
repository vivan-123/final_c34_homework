//Create variables here
var dog, happydog, database, food, foodstock;
var doggo;

function preload() {
  //load images here
  dog = loadImage("images/dog.png");
  happydog = loadImage("images/dogh.png");
}

function setup() {
  createCanvas(500, 500);
  doggo = createSprite(250, 300);
  doggo.addImage("doggoanimation", dog);
  doggo.addImage("happydoganimation",happydog);

  doggo.scale = 0.2;

  database = firebase.database();

  var foodref = database.ref("food");
  foodref.on("value", readpos, errorpos);

  var foodstockref = database.ref("foodstock");
  foodstockref.on("value", readpos2, errorpos);

  database.ref("/").set({ foodstock : 50,
  food : 0 }) 
}

function readpos(data) {
  food = data.val();
  console.log("food = "+food)
}


function readpos2(data) {
  foodstock = data.val();  
}

function errorpos() {
  console.log("crashedddd!!!!")
}


function draw() {
  //background
  background("cyan");

  //text
  fill ("yellow");
  textSize (28);
  text ("Note : Click on the up arrow",10,50);
  text ("key to feed the dog!",10,75);
  text ("Note : Click on the down arrow",10,125);
  text ("key to buy more food and",10,150);
  text ("refill the food stock!",10,175);

  //display food and food stock
  text("Food stock: "+foodstock,20,450);
  text("Food given to the dog: "+food,20,400);
  drawSprites();
  
  //change food and food stock
  if(keyDown(UP_ARROW))
  { 
  doggo.changeImage("happydoganimation",happydog) 
  database.ref("/").update({ food : food + 1,
  foodstock : foodstock -1 }) }

  if(keyDown(DOWN_ARROW))
  { 
      database.ref("/").update({ foodstock : foodstock + 1,
      food : food })
      doggo.changeImage("doggoanimation", dog)
  } 

}
