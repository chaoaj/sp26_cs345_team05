/*const backstorySlides = [
  {
    title: "A Long Time Ago…",
    text: [
      "In a galaxy not that far away,",
      "on the cheese-rich planet of Parmesean,",
      "lived a very normal cat family.",
      "(Well, as normal as space cats go.)"
    ],
    emoji: "🐱🧀🚀"
  },
  {
    title: "Mom & Dad",
    text: [
      "Mama Whiskers made the best asteroid stew.",
      "Papa Paws could fix any broken rocket",
      "with nothing but duct tape and confidence.",
      "Life was purrfect."
    ],
    emoji: "👩‍🚀👨‍🚀🍲"
  },
  {
    title: "The Incident",
    text: [
      "Then one Tuesday — always a Tuesday —",
      "the Rat King showed up uninvited.",
      "He kidnapped Mom and Dad,",
      "and didn't even leave a note. Rude."
    ],
    emoji: "🐀👑😤"
  },
  {
    title: "Enter: YOU",
    text: [
      "You are their kid.",
      "You eat danger for breakfast.",
      "(And also tuna.)",
      "It's time to suiting up and blast off."
    ],
    emoji: "😼⚔️🌌"
  },
  {
    title: "The Mission",
    text: [
      "Navigate 4 treacherous planets.",
      "Defeat the rat hordes standing in your way.",
      "Find the Rat King.",
      "Bring Mom and Dad home for dinner."
    ],
    emoji: "🗺️💥🐀"
  },
  {
    title: "Good Luck, Space Cat.",
    text: [
      "The universe is counting on you.",
      "Or at least your parents are.",
      "No pressure.",
      "…Okay, a little pressure."
    ],
    emoji: "🌠🐾✨"
  }
]; */


var page = 5;
var scale = 1;

let pageWidth = 600;
let pageHeight = 400;

let homepageX = 0;
let homepageY = 0;

// sprite sheet settings
let currentFrame = 0;
let framePerRow = 3;
let frameCurrRow = 0;
let frameWidth = 687;
let frameHeight = 717;

let playerX;
let playerY;

let playerSpeed = 15;

let frontR = true;

// slideshow settings
let currentSlide = 0;
let slideAlpha = 0;          // 0–255 fade value
let fadeState = "in";        // "in" | "hold" | "out"
let fadeTimer = 0;

const FADE_SPEED   = 4;      // alpha change per frame
const HOLD_FRAMES  = 60;    // frames to hold each slide (3s at 60fps)
let backstoryActive = false;

let size = 0;
var inventory2 = [];


function preload() {
  homepage_background = loadImage("assets/homepage_background.png");
  cat = loadImage("assets/cat_homepage.png");
  title1 = loadImage("assets/title1.png");
  title2 = loadImage("assets/title2.png");

  start_game1 = loadImage("assets/start_game1.png");
  start_game2 = loadImage("assets/start_game2.png");

  skins1 = loadImage("assets/skins1.png");
  skins2 = loadImage("assets/skins2.png");

  story1 = loadImage("assets/story1.gif");
  story2 = loadImage("assets/story2.gif");
  story3 = loadImage("assets/story3.gif");
  story4 = loadImage("assets/story4.gif");

  return1 = loadImage("assets/return1.png");
  return2 = loadImage("assets/return2.png");

  game_over1 = loadImage("assets/game_over1.png");
  game_over2 = loadImage("assets/game_over2.png");

  victory1 = loadImage("assets/victory1.png");
  victory2 = loadImage("assets/victory2.png");

  skip1 = loadImage("assets/skip1.png");
  skip2 = loadImage("assets/skip2.png");

  cat1 = loadImage("assets/sprite_sheet1.png");
  playerX = pageWidth / 2;
  playerY = pageHeight / 5;

  icu = loadImage("assets/interface.png");
  heart = loadImage("assets/heart.png");
  inventory1 = loadImage("assets/inventory.png");
  level_nacho = loadImage("assets/level_nacho.png");
  level_cheeseCake = loadImage("assets/level_cheeseCake.png");
  level_blueCheese = loadImage("assets/level_blueCheese.png");
  level_parmesan = loadImage("assets/level_parmesan.png");

  // homepage_sound = loadSound("assets/homepage_sound.mp3");
  sword_nacho = loadImage("assets/sword_nacho.png");
  sword_blueCheese = loadImage("assets/sword_blueCheese.png");
  sword_parmesan = loadImage("assets/sword_parmesan.png");
  sword_cheeseCake = loadImage("assets/sword_cheeseCake.png");
  potion = loadImage("assets/potion.png");
}

function setup() {
  createCanvas(pageWidth, pageHeight);
  
  
  // homepage_sound.play();
}


function button(image1, x, y, w, h) {
  image(image1, x, y, w, h);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image1 == start_game2) {
      image(start_game1, 275, 150, start_game1.width/7 * scale, start_game1.height/6 * scale);
    } else if (image1 == skins2) {
      image(skins1, 410, 250, skins1.width/7 * scale, skins1.height/6 * scale);
    } else if (image1 == return2) {
      // return button from skins screen
      if (page == 1) {
      image(return1, 20, 20, return1.width/7 * scale, return1.height/6 * scale);
      } 

      // return button from game over / victory screen
      if (page == 3 || page == 4) {
        image(return1, 205, 260, return1.width/4 * scale, return1.height/4 * scale);
      }
    } else if (image1 === skip2) {
      image(skip1, 475, 345, skip1.width/14, skip1.height/12);
    }
  }
  if (mouseIsPressed && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image1 == start_game2) {
      page = 2;
    } else if (image1 == skins2) {
      page = 1;
    } else if (image1 == return2) {
      page = 0;
    } else if (image1 == skip2) {
      onBackstoryComplete();
    }

    print(page);
    
  }
}

//page variable tells you what page you are on
// 0 = home page
// 1 = skin screen
// 2 = story slides
// 3 = game over screen
// 4 = victory screen
// 5 = game screen
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
  } else if (page == 5) {
    gameStart();
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

  // randomized if statement for flicker effect
  if (Math.floor(random(0, 15)) == 0) {
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

  // start game button
  button(start_game2, 275, 150, start_game2.width/7 * scale, start_game2.height/6 * scale);

  // skins button
  button(skins2, 410, 250, skins2.width/7 * scale, skins2.height/6 * scale);

}

function skinScreen() {
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

  // randomized if statement for flicker effect
  if (Math.floor(random(0, 6)) == 0) {
    image(
      title1, 
      200, 0, 
      title1.width/4, title1.height/4
    );    
  } else {
    image(
      title2, 
      200, 0, 
      title2.width/4, title1.height/4
    );
    
    scale -= 0.005;
  }

  // return button
  button(return2, 20, 20, return2.width/7 * scale, return2.height/6 * scale);
}

function storySlides() {
  if (!backstoryActive) {
    startBackstory();
  }

  // Draw current gif fullscreen
  const storyGifs = [story1, story2, story3, story4];
  if (currentSlide < storyGifs.length) {
    image(storyGifs[currentSlide], 0, 0, pageWidth, pageHeight);
  }

  // Black overlay for fade transition
  fill(0, 0, 0, 255 - slideAlpha);
  noStroke();
  rect(0, 0, pageWidth, pageHeight);

  // Reuse same fade + timer logic
  if (fadeState === "in") {
    slideAlpha = min(slideAlpha + FADE_SPEED, 255);
    if (slideAlpha >= 255) { fadeState = "hold"; fadeTimer = 0; }
  } else if (fadeState === "hold") {
    fadeTimer++;
    if (fadeTimer >= HOLD_FRAMES) { fadeState = "out"; }
  } else if (fadeState === "out") {
    slideAlpha = max(slideAlpha - FADE_SPEED, 0);
    if (slideAlpha <= 0) {
      currentSlide++;
      if (currentSlide >= storyGifs.length) { onBackstoryComplete(); return; }
      fadeState = "in";
    }
  }

  // skip button
  button(skip2, 475, 345, skip2.width/14, skip2.height/12);


  // temporary "show controls area"
  push();
  fill(255);
  rect(150, 350, 250, 30);
  fill(0);
  textSize(13);
  textAlign(CENTER);
  text('temporary "show controls area"', 275, 367.5);
  pop();
}

function startBackstory() {
  currentSlide  = 0;
  slideAlpha    = 0;
  fadeState     = "in";
  fadeTimer     = 0;
  backstoryActive = true;
}

function onBackstoryComplete() {
  backstoryActive = false;
  page = 5; // Move to game screen (or next appropriate page)
}

function drawCat(player) {
  let sx, sy;
  
  sx = currentFrame * frameWidth;
  sy = frameHeight * frameCurrRow;

  image(
  player, 
  playerX, playerY, 
  frameWidth / 7, frameHeight / 7,
  sx, sy, 
  frameWidth, frameHeight
  );
  
  
  if (frameCount % 4 === 0) {

    if (keyIsDown(DOWN_ARROW)) {
      frameCurrRow = 0;
      playerY += playerSpeed;
    
      if (currentFrame === 0) {
        if (frontR === true) {
          currentFrame = 1;
          frontR = false;
        } else {
          currentFrame = 2;
          frontR = true;
        }
      } else if (currentFrame === 1 || currentFrame === 2) {
        currentFrame = 0;
      }
    } else if (frameCurrRow == 0) {
      currentFrame = 0;
    }

    if (keyIsDown(UP_ARROW)) {
      frameCurrRow = 1;
      playerY -= playerSpeed;
    
      if (currentFrame === 0) {
        if (frontR === true) {
          currentFrame = 1;
          frontR = false;
        } else {
          currentFrame = 2;
          frontR = true;
        }
      } else if (currentFrame === 1 || currentFrame === 2) {
        currentFrame = 0;
      } 
    } else if (frameCurrRow == 1) {
      currentFrame = 0;
    }

    if (keyIsDown(LEFT_ARROW)) {
      frameCurrRow = 2;
      playerX -= playerSpeed;
    
      if (currentFrame === 0) {
        if (frontR === true) {
          currentFrame = 1;
          frontR = false;
        } else {
          currentFrame = 2;
          frontR = true;
        }
      } else if (currentFrame === 1 || currentFrame === 2) {
        currentFrame = 0;
      } 
    } else if (frameCurrRow == 2) {
      currentFrame = 0;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      frameCurrRow = 3;
      playerX += playerSpeed;
    
      if (currentFrame === 0) {
        if (frontR === true) {
          currentFrame = 1;
          frontR = false;
        } else {
          currentFrame = 2;
          frontR = true;
        }
      } else if (currentFrame === 1 || currentFrame === 2) {
        currentFrame = 0;
      } 
    } else if (frameCurrRow == 3) {
      currentFrame = 0;
    }
    
  }
  // print(currentFrame);
}

function gameStart() {
  var iu = IU(3, 100, 1, inventory1, inventory2);
  //addItem(heart);

  drawCat(cat1);
}


function gameover() {
  scale = 1;

  image(
    homepage_background,
    0, 0,
    pageWidth, pageHeight
  );
  
    // randomized if statement for flicker effect
  if (Math.floor(random(0, 15)) == 0) {
    image(
      game_over1,
      70, 40,
      game_over1.width/4, game_over1.height/4
    );
    
  } else {
    image(
      game_over2,
      70, 40,
      game_over2.width/4, game_over2.height/4
    );
    
    scale -= 0.005;
  }
  

  // return button
  button(return2, 205, 260, return2.width/4 * scale, return2.height/4 * scale);
}

function victoryPage() {
  scale = 1;

  image(
    homepage_background,
    0, 0,
    pageWidth, pageHeight
  );
  
    // randomized if statement for flicker effect
  if (Math.floor(random(0, 15)) == 0) {
    image(
      victory1,
      90, 40,
      victory1.width/4, victory1.height/4
    );
    
  } else {
    image(
      victory2,
      90, 40,
      victory2.width/4, victory2.height/4
    );
    
    scale -= 0.005;
  }
  

  // return button
  button(return2, 205, 260, return2.width/4 * scale, return2.height/4 * scale);
}

//adds image item to inventory
function addItem(item) {
      if (size < 3) {
        inventory2[size] = item;
        size++;
    }
  }
//removes image item from inventory
function removeItem(item) {
    for (let i = 0; i < size; i++) {
      if (inventory2[i] === item) {
        for (let j = i; j < size - 1; j++) {
          inventory2[j] = inventory2[j + 1];
        }
        size--;
        break;
      }
    }
  }

class Item {
  // image: array of image not selected and image selected
  // selected: whether the item is currently selected in the inventory
  // data: any additional data about the item (e.g. health boost, damage, etc.)
  constructor(image, selected, data) {
    this.image = image;
    this.selected = selected;
    this.data = data;
  }

  image_display() {
    if (this.selected) {
      return image[1];
    } else {
      return image[0];
    }
  }
}
//displays health, lives, inventory, and current planet level
function IU(life, health, planet, inventory1, inventory2) {
  var level = [level_nacho, level_cheeseCake, level_blueCheese, level_parmesan];
  image(
    icu,
    0, 0,
    pageWidth, pageHeight
  );
  image(inventory1, 20, 330, inventory1.width/3, inventory1.height/3);
  image(level[planet - 1], 480, 10, level[planet - 1].width/5, level[planet - 1].height/5);


  lives();
  healthBar();
  inventory();

  function inventory() {
    for (let i = 0; i < size; i++) {
      image(inventory2[i], 30 + i * 50, 340, inventory2[i].width/8, inventory2[i].height/8);
    }
  }
  function lives() {
    for (let i = 0; i < life; i++) {
      image(heart, 30 + i * 50, 290, heart.width/8, heart.height/8);
    }
  }
  
  function healthBar(maxHealth = 100) {
    fill(39, 28, 158);
    rect(30, 5, maxHealth * 2 +10, 20);
    fill(255, 0, 0);
    rect(35, 8, health * 2, 15);
    fill(183, 178, 237);
    square(3, 3, 25);
    fill(0);
    text(health, 5, 20);
  }
}



function draw() {
  background(220);
  screen(page);
}
