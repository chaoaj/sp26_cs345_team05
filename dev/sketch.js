var page = 0;

let pageWidth = 600;
let pageHeight = 400;

function preload() {
  homepage_background = loadImage("assets/homepage_background.png");
  cat = loadImage("assets/cat.png");

  // game_over = loadImage("assets/game_over.png");
  // skins = loadImage("assets/skins.png");
  // start_game = loadImage("assets/start_game.png");

  // title = loadImage("assets/title.png");
}

function setup() {
  createCanvas(pageWidth, pageHeight);
}

function button(image, x, y, w, h) {
  image(image, x, y, w, h);
  if (mouseClicked() && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image == start_game) {
      page = 2;
    } else if (image == skins) {
      page = 1;
    } else if (image == restart) {
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
    pageWidth, pageHeight, 
    0, 0, 
    949, 633
  );

  image(
    cat, 
    0, 90, 
    513/2, 632/2, 
    0, 0, 
    513, 632
  );

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
