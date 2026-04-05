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


var page = 0;
var scale = 1;


let pageWidth = 600;
let pageHeight = 400;

let homepageX = 0;
let homepageY = 0;

// sprite sheet settings
let currentFrame = 0;
let frameCurrRow = 0;
let frameWidth = 687;
let frameHeight = 717;

let playerX;
let playerY;

let playerSpeed = 10;

let frontR = true;
let walkToggle = false;

// frame change millisecond logic
let lastSwitch = 0;
let idleInterval = 500; // milliseconds
let walkInterval = 120;


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

let mapData, floorTileset, wallTileset;
let cam = { x: 0, y: 0 };
let currentMap;
let currentMapFloor;
let currentMapWall;
let currentPlanet = 1;
let completedPlanets = [];


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
  restart = loadImage("assets/restart.png");
  icu = loadImage("assets/interface.png");
  heart = loadImage("assets/heart.png");
  inventory1 = loadImage("assets/inventory.png");
  level_nacho = loadImage("assets/level_nacho.png");
  level_cheeseCake = loadImage("assets/level_cheeseCake.png");
  level_blueCheese = loadImage("assets/level_blueCheese.png");
  level_parmesan = loadImage("assets/level_parmesan.png");

  // restart = loadImage("assets/restart.png");
  // homepage_sound = loadSound("assets/homepage_sound.mp3");
  sword_nacho = loadImage("assets/sword_nacho.png");
  sword_blueCheese = loadImage("assets/sword_blueCheese.png");
  sword_parmesan = loadImage("assets/sword_parmesan.png");
  sword_cheeseCake = loadImage("assets/sword_cheeseCake.png");
  potion = loadImage("assets/potion.png");

  // map data
  //mapData_parmesan  = loadJSON("assets/map2.json");  // add when ready
  //mapData_blueCheese = loadJSON("assets/map3.json"); // add when ready
  //mapData_cheeseCake = loadJSON("assets/map4.json"); // add when ready
  floorTileset = loadImage("assets/atlas_floor-16x16.png");
  wallTileset = loadImage("assets/atlas_walls_high-16x32.png");
}

function setup() {
  currentMap = mapData_nacho;
  currentMapFloor = floorTileset;
  currentMapWall = wallTileset;
  createCanvas(pageWidth, pageHeight);
  playerX = pageWidth / 2;
  playerY = pageHeight / 5;
  
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
    } else if (image1 == restart) {
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

function drawSkipButton() {
  push();
  const bx = width - 90, by = height - 40;
  const bw = 80, bh = 28;
 
  fill(60, 60, 100, 200);
  stroke(150, 150, 220);
  strokeWeight(1);
  rectMode(CENTER);
  rect(bx, by, bw, bh, 8);
 
  fill(200, 200, 255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(NORMAL);
  text("SKIP ▶▶", bx, by);
  pop();

  if (mouseIsPressed && mouseX > bx - bw/2 && mouseX < bx + bw/2 && 
    mouseY > by - bh/2 && mouseY < by + bh/2) {
    onBackstoryComplete();
  }

}

function onBackstoryComplete() {
  backstoryActive = false;
  spawnPlayer(currentMap);
  page = 5; 
}

function drawCat(player) {
  let sx = currentFrame * frameWidth;
  let sy = frameHeight * frameCurrRow;

  image(player, playerX, playerY, frameWidth / 10, frameHeight / 10, sx, sy, frameWidth, frameHeight);

let up    = keyIsDown(UP_ARROW)    || keyIsDown(87);
let down  = keyIsDown(DOWN_ARROW)  || keyIsDown(83);
let left  = keyIsDown(LEFT_ARROW)  || keyIsDown(65);
let right = keyIsDown(RIGHT_ARROW) || keyIsDown(68);
  let moving = up || down || left || right;

  if (millis() - lastSwitch > (moving ? walkInterval : idleInterval)) {
    lastSwitch = millis();

    let speed = (moving && (up || down) && (left || right)) ? playerSpeed * 0.707 : playerSpeed;

    if (up)    playerY -= speed;
    if (down)  playerY += speed;
    if (left)  playerX -= speed;
    if (right) playerX += speed;

    // diagonal will prioritize horizontal over vertical
    if (up)     frameCurrRow = 1;
    else if (down) frameCurrRow = 0;
    else if (right)   frameCurrRow = 3;
    else if (left) frameCurrRow = 2;

    // boundary
    playerX = constrain(playerX, 0, currentMap.width * 16 - frameWidth / 8);
    playerY = constrain(playerY, 0, currentMap.height * 16 - frameHeight / 8);


    if (moving) {
      if (currentFrame === 0) {
        currentFrame = walkToggle ? 1 : 2;
        walkToggle = !walkToggle;
      } else {
        currentFrame = 0;
      }
    } else {
      currentFrame = frontR ? 3 : 0;
      frontR = !frontR;
    }
  }
  // print(frameCurrRow);
}

function gameStart() {
  //drawCat(cat_white);
  console.log("currentMap:", currentMap);
  console.log("currentMapFloor:", currentMapFloor);
  console.log("currentMapWall:", currentMapWall);
  console.log("playerX:", playerX, "playerY:", playerY);
  console.log("cam:", cam);
  
  cam.x = constrain(playerX - pageWidth / 2, 0, currentMap.width * 16 - pageWidth);
  cam.y = constrain(playerY - pageHeight / 2, 0, currentMap.height * 16 - pageHeight);
  
  push();
  translate(-cam.x, -cam.y);
  drawMap(currentMap, currentMapFloor, currentMapWall);
  drawCat(cat_white);
  pop();

  IU(3, 100, currentPlanet, inventory1, inventory2);
  //addItem(heart);
}

function drawMap(map, floorTS, wallTS) {
  const tileW = 16;
  const mapCols = map.width;
  
  for (let layer of map.layers) {
    if (layer.type !== "tilelayer") continue;

    for (let i = 0; i < layer.data.length; i++) {
      const tileId = layer.data[i];
      if (tileId === 0) continue; // empty tile

      const col = i % mapCols;
      const row = Math.floor(i / mapCols);
      const x = col * tileW;
      const y = row * tileW;

      if (tileId >= 77) {
        const localID = tileId - 77;
        const srcX = (localID % 24) * tileW;
        const srcY = floor(localID / 24) * 32;
        image(wallTS, x, y - 16, tileW, 32, srcX, srcY, tileW, 32);
      } else {
        const localID = tileId - 1;
        const srcX = (localID % 7) * tileW;
        const srcY = floor(localID / 7) * tileW;
        image(floorTS, x, y, tileW, tileW, srcX, srcY, tileW, tileW);
      }
    }
  }
}

function loadRandomPlanet() {
  // logic to determine next planet
  const bossPlanet = 4;
  const normalPlanets = [1, 2, 3];
  const remaining = normalPlanets.filter(p => !completedPlanets.includes(p) && p !== currentPlanet);

  completedPlanets.push(currentPlanet);

  let next;

  if (remaining.length === 0) {
    next = bossPlanet;
  } else {
    next = remaining[floor(random(remaining.length))];
  }

  currentPlanet = next;

  if (next === 1) {
    currentMap = mapData_nacho;
  } else if (next === 2) {
    currentMap = mapData_parmesan;
  } else if (next === 3) {
    currentMap = mapData_blueCheese;
  } else if (next === 4) {
    currentMap = mapData_cheeseCake;
  } else if (next === 4 && completedPlanets.includes(4)) {
    page = 4;
  }

  currentMapFloor = floorTileset;
  currentMapWall = wallTileset;

  spawnPlayer(currentMap);
}

function spawnPlayer(map) {
  const objects = map.layers.find(l => l.type === "objectgroup").objects;
  const spawn = objects.find(o => o.name === "spawn");
  if (spawn) {
    playerX = spawn.x;
    playerY = spawn.y;
    console.log("Spawned at:", playerX, playerY);
  }
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
  image(inventory1, 15, 360, inventory1.width/14, inventory1.height/14);
  image(level[planet - 1], 480, 10, level[planet - 1].width/5, level[planet - 1].height/5);


  lives();
  healthBar();
  inventory();

  function inventory() {
    for (let i = 0; i < size; i++) {
      image(inventory2[i], 30 + i * 50, 360, inventory2[i].width/8, inventory2[i].height/8);
    }
  }
  function lives() {
    for (let i = 0; i < life; i++) {
      image(heart, 20 + i * 30, 330, heart.width/19, heart.height/19);
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
