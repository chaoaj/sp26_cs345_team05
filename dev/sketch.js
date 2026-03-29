let imgs = []; // array to hold the images
let currentImg = 0;
let num_imgs; // variable to hold the number of images

var page = 0;

function setup() {
  createCanvas(400, 400);
  setInterval(nextImage, 3000); // change image every 3 seconds
}
function preload(){
  game_over = loadImage("assets/game_over.png");
  skins = loadImage("assets/skins.png");
  start_game = loadImage("assets/start_game.png");
  title = loadImage("assets/title.png");
}

//page variable tells you what page you are on
// 0 = home page
// 1 = skin screen
// 2 = story slides
// 3 = gameover screen

function button() {

}
function screen() {
  if (page == 0) {
    homePage();
  } else if (page == 1) {
    skinScreen();
  } else if (page == 2) {
    storySlides();
  } else if (page == 3) {
    gameover();
  }
}
function homePage() {
  

}

function skinScreen() {
  
}



function gameover() {

}
  

function draw() {
  background(255);
  screen(page);
}
