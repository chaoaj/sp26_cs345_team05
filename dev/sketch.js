var page = 0;

let pageWidth = 600;
let pageHeight = 400;

function preload() {
  homepage_background = loadImage("assets/homepage_background.png");
  cat = loadImage("assets/cat_homepage.png");
  title = loadImage("assets/title.png");

  game_over = loadImage("assets/game_over.png");
  skins = loadImage("assets/skins.png");
  start_game = loadImage("assets/start_game.png");

}

function setup() {
  createCanvas(pageWidth, pageHeight);
}

function button(image1, x, y, w, h) {
  image(image1, x, y, w, h);
  if (mouseClicked() && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image1 == start_game) {
      page = 2;
    } else if (image1 == skins) {
      page = 1;
    } else if (image1 == restart) {
      page = 0;
    }
  }
}

//page variable tells you what page you are on
// 0 = home page
// 1 = skin screen
// 2 = story slides
// 3 = game over screen
// 4 = victory screen
function screen() {
  if (page == 0) {
    homePage();
  } else if (page == 1) {
    skinScreen();
  } else if (page == 2) {
    storySlides();
  } else if (page == 3) {
    gameover();
  } else if (page == 4) {
    victoryPage();
  }
}

function homePage() {
  image(
    homepage_background, 
    0, 0, 
    pageWidth, pageHeight
  );

  image(
    cat, 
    0, 90, 
    513/2, 632/2
  );
  button(start_game, 200, 150, 200, 100);
}

function skinScreen() {
  
}

function storySlides() {
  
}

function gameover() {

}

function victoryPage() {
  
}

function draw() {
  background(220);
  screen(page);
}
