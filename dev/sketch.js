var page = 0;
var scale = 1;

let pageWidth = 600;
let pageHeight = 400;

let homepageX = 0;
let homepageY = 0;

function preload() {
  homepage_background = loadImage("assets/homepage_background.png");
  cat = loadImage("assets/cat_homepage.png");
  title1 = loadImage("assets/title1.png");
  title2 = loadImage("assets/title2.png");

  start_game1 = loadImage("assets/start_game1.png");
  start_game2 = loadImage("assets/start_game2.png");

  game_over = loadImage("assets/game_over.png");
  skins = loadImage("assets/skins.png");
  

}

function setup() {
  createCanvas(pageWidth, pageHeight);
}

function button(image1, x, y, w, h) {
  image(image1, x, y, w, h);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image1 == start_game2) {
      image(start_game1, 275, 150, start_game1.width/7 * scale, start_game1.height/6 * scale);
    }
  }
  if (mouseIsPressed && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image1 == start_game2) {
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
  scale = 1;
  backgroundMoveSpeed = 0.5;

  if (mouseX > pageWidth/2 && homepageX < 0) {
    homepageX += backgroundMoveSpeed;
  } else  if (mouseX < pageWidth/2 && mouseX != 0 && homepageX > -pageWidth / 50) {
    homepageX -= backgroundMoveSpeed;
  }

  if (mouseY > pageHeight/2 && homepageY < 0) {
    homepageY += backgroundMoveSpeed;
  } else  if (mouseY < pageHeight/2 && mouseY != 0 && homepageY > -pageHeight / 50) {
    homepageY -= backgroundMoveSpeed;
  }

  image(
    homepage_background, 
    homepageX, homepageY, 
    pageWidth + pageWidth / 50, pageHeight + pageHeight / 50
  );

  if (Math.floor(random(0, 6)) == 0) {
    image(
      title1, 
      50, -10, 
      1429/3, 500/3
    );    
  } else {
    image(
      title2, 
      50, -10, 
      1429/3, 500/3
    );
    
    scale -= 0.005;
  }

  // CAT
  image(
    cat, 
    0, 90, 
    cat.width * scale/2, cat.height * scale/2   
  );


  button(start_game2, 275, 150, start_game1.width/7 * scale, start_game1.height/6 * scale);
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
