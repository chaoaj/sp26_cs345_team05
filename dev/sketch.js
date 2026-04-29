const backstorySlides = [
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
];

var planet = 1;
var g = 0;
var page = 0;
var scale = 1;
var lives = 3;

const pageWidth = 600;
const pageHeight = 400;

let homepageX = 0;
let homepageY = 0;

// used to prevent spamming buttons
let mouseJustPressed = false;
let potionJustUsed = false;

// prevent audio spam
let audioUnlocked = false;

// sprite sheet settings
let currentFrame = 0;
let frameCurrRow = 0;
let frameWidth = 687;
let frameHeight = 717;
const mapScale = 2;

// skins page stuff:
let skinChoice;
let skinAnimTimer = 0;
let skinFrame = false; // between frame 0 and 3

let playerX;
let playerY;
const SPRITE_W = 16 * mapScale;
const SPRITE_H = 16 * mapScale;

let playerSpeed = 8;

let frontR = true;
let walkToggle = false;

// frame change millisecond logic
let lastSwitch = 0;
let idleInterval = 300; // milliseconds
let walkInterval = 100;

// slideshow settings
let currentSlide = 0;
let slideAlpha = 0;          // 0–255 fade value
let fadeState = "in";        // "in" | "hold" | "out"
let fadeTimer = 0;

const FADE_SPEED = 4;      // alpha change per frame
const HOLD_FRAMES = 60;    // frames to hold each slide (3s at 60fps)
let backstoryActive = false;

let size = 0;
var inventory2 = [];
var droppedInventory = [];
var droppedSize = 0;
var click = true;
var chestInventory_blueCheese = [];
var chestInventory_parmesan = [];
var chestInventory_cheeseCake = [];
var chestInventory_nacho = [];
var chestInventory = [chestInventory_nacho, chestInventory_blueCheese, chestInventory_parmesan, chestInventory_cheeseCake];

let floorTileset, wallTileset;
let cam = { x: 0, y: 0 };
let currentMap;
let currentMapFloor;
let currentMapWall;
let currentPlanet = 1;
let completedPlanets = [];
let fightRooms = [];
let chests = [];
let spikeWalls = [];
let chestTileset;

let enemies = [];
let playerHealth = 100;
let attackCooldown = 0; // frames until enemy can damage player again





const ENEMY_ATTACK = 8;
const PLAYER_ATTACK = 10;

let currentFrameRat = 0;
const RAT_FRAME_W = 32;
const RAT_FRAME_H = [43, 21, 43, 21];
const RAT_ROW_Y = [0, 43, 64, 107];

// for the boss:
// const RAT_FRAME_W = 400;
// const RAT_FRAME_H = [538, 263, 538, 263]; 
// const RAT_ROW_Y   = [0, 538, 800, 1338];



function preload() {
  homepage_background = loadImage("assets/homepage_background.png");
  homepage_cat = loadImage("assets/cat_homepage.png");
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

  cat_orange = loadImage("assets/sprite_sheet_orange.png");
  cat_white = loadImage("assets/sprite_sheet_white.png");
  cat_tan = loadImage("assets/sprite_sheet_tan.png");
  cat_charzard = loadImage("assets/sprite_sheet_charzard.png");

  skinChoice = cat_tan;
  skin_selection = loadImage("assets/skin_select_button.png");

  rat1 = loadImage("assets/rat.png");
  rat_boss = loadImage("assets/rat_boss.png");

  icu = loadImage("assets/interface.png");
  heart = loadImage("assets/heart.png");
  inventory1 = loadImage("assets/inventory.png");
  level_nacho = loadImage("assets/level_nacho.png");
  level_cheeseCake = loadImage("assets/level_cheesecake.png");
  level_blueCheese = loadImage("assets/level_blueCheese.png");
  level_parmesan = loadImage("assets/level_parmesan.png");

  homepage_sound = loadSound("assets/homepage_sound.mp3");
  level_theme = loadSound("assets/Game_SoundTrackUpdated.mp3");
  overmusic = loadSound("assets/GameOver.mp3");
  slides_track = loadSound("assets/slides1.0.mp3");
  victory_music = loadSound("assets/Victory.mp3");
  openchestSound = loadSound("assets/tp_chest_open.mp3");
  potion_drink = loadSound("assets/potion_drink.mp3");
  potion_collect = loadSound("assets/potion_collect.mp3");
  sword_collect = loadSound("assets/sword_collect.mp3");
  sword_hit = loadSound("assets/sword_hit.mp3");
  punch_sound = loadSound("assets/punch.mp3");

  button_beep = loadSound("assets/button_beep.mp3");
  meow = loadSound("assets/meow.mp3");

  sword_nacho = loadImage("assets/sword_nacho.png");
  sword_blueCheese = loadImage("assets/sword_blueCheese.png");
  sword_parmesan = loadImage("assets/sword_parmesan.png");
  sword_cheeseCake = loadImage("assets/sword_cheeseCake.png");
  potion = loadImage("assets/Potion.png");
  sword_nacho_selected = loadImage("assets/sword_nacho_selected.png");
  sword_blueCheese_selected = loadImage("assets/sword_blueCheese_selected.png");
  sword_parmesan_selected = loadImage("assets/sword_parmesan_selected.png");
  sword_cheeseCake_selected = loadImage("assets/sword_cheeseCake_selected.png");
  potion_selected = loadImage("assets/Potion_selected.png");

  floorTileset = loadImage("assets/atlas_floor-16x16.png");
  wallTileset = loadImage("assets/atlas_walls_high-16x32.png");
  chestTileset = loadImage("assets/Chest.png");

  arrow_up = loadImage("assets/arrow_up.png");
  arrow = loadImage("assets/arrow.png");
  arrow_down = loadImage("assets/arrow_down.png");
  arrow_left = loadImage("assets/arrow_left.png");
  arrow_right = loadImage("assets/arrow_right.png");
  number = loadImage("assets/number.png");
  number_1 = loadImage("assets/number_1.png");
  number_2 = loadImage("assets/number_2.png");
  number_3 = loadImage("assets/number_3.png");
  enter = loadImage("assets/enter.png");
  enter_selected = loadImage("assets/enter_selected.png");
  backspace = loadImage("assets/backspace.png");
  backspace_selected = loadImage("assets/backspace_selected.png");
  shift = loadImage("assets/shift.png");
  shift_selected = loadImage("assets/shift_selected.png");
  controls_1 = loadImage("assets/controls.png");
  wasd = loadImage("assets/wasd.png");
  wasd_s = loadImage("assets/wasd_s.png");
  wasd_a = loadImage("assets/wasd_a.png");
  wasd_d = loadImage("assets/wasd_d.png");
  wasd_w = loadImage("assets/wasd_w.png");
  spacebar = loadImage("assets/spacebar.png");
  spacebar_selected = loadImage("assets/spacebar_selected.png");
  snowTileset = loadImage("assets/FE8 - Snowy Bern.png");
}

function getSpawnPoint(map) {
  for (let layer of map.layers) {
    if (layer.type !== "objectgroup") continue;
    for (let obj of layer.objects) {
      if (obj.name === "playerSpawn") {
        return { x: obj.x * mapScale, y: obj.y * mapScale };
      }
    }
  }
  // fallback if no spawn point found
  return { x: pageWidth / 2, y: pageHeight / 2 };
}

function mousePressed() {
  mouseJustPressed = true;

  if (!audioUnlocked) {
    userStartAudio();
    audioUnlocked = true;
  }
}

function setup() {
  console.log("mapData_nacho:", mapData_nacho);
  createCanvas(pageWidth, pageHeight);

  currentMap = mapData_nacho;
  currentMapFloor = floorTileset;
  currentMapWall = wallTileset;

  const spawn = getSpawnPoint(currentMap);
  playerX = spawn.x;
  playerY = spawn.y;

  cam.x = constrain(playerX - pageWidth / 2, 0, currentMap.width * 16 * mapScale - pageWidth);
  cam.y = constrain(playerY - pageHeight / 2, 0, currentMap.height * 16 * mapScale - pageHeight);

  // enemyX = spawn.x + random(-150, 150); // spawn enemy a bit away from player
  // enemyY = spawn.y + random(-100, 100);

  swordNacho = new Item([sword_nacho, sword_nacho_selected], false, { damage: 10, health: 0 });
  swordBlueCheese = new Item([sword_blueCheese, sword_blueCheese_selected], false, { damage: 15, health: 0 });
  swordParmesan = new Item([sword_parmesan, sword_parmesan_selected], false, { damage: 20, health: 0 });
  swordCheeseCake = new Item([sword_cheeseCake, sword_cheeseCake_selected], false, { damage: 25, health: 0 });
  potionItem_nacho = new Item([potion, potion_selected], false, { damage: 0, health: 50 });
  potionItem_blueCheese = new Item([potion, potion_selected], false, { damage: 0, health: 50 });
  potionItem_parmesan = new Item([potion, potion_selected], false, { damage: 0, health: 50 });
  potionItem_cheeseCake = new Item([potion, potion_selected], false, { damage: 0, health: 50 });
  chestInventory_nacho[0] = (swordNacho);
  chestInventory_nacho[1] = (potionItem_nacho);
  chestInventory_blueCheese[0] = (swordBlueCheese);
  chestInventory_blueCheese[1] = (potionItem_blueCheese);
  chestInventory_parmesan[0] = (swordParmesan);
  chestInventory_parmesan[1] = (potionItem_parmesan);
  chestInventory_cheeseCake[0] = (swordCheeseCake);
  chestInventory_cheeseCake[1] = (potionItem_cheeseCake);
}


function button(image1, x, y, w, h) {
  image(image1, x, y, w, h);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image1 === start_game2) {
      image(start_game1, 275, 150, start_game1.width / 7 * scale, start_game1.height / 6 * scale);
    } else if (image1 === skins2) {
      image(skins1, x, y, skins1.width / 7 * scale, skins1.height / 6 * scale);
    } else if (image1 === return2) {
      // return button from skins screen
      if (page === 1 || page === 6) {
        image(return1, x, y, return1.width / 7 * scale, return1.height / 6 * scale);
      }

      // return button from game over / victory screen
      if (page === 3 || page === 4) {
        image(return1, x, y, return1.width / 4 * scale, return1.height / 4 * scale);
      }
    } else if (image1 === skip2) {
      image(skip1, 475, 345, skip1.width / 14, skip1.height / 12);
    }
  }
  if (mouseJustPressed && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    button_beep.play();

    if (image1 === start_game2) {
      resetGame();
      page = 2;
    } else if (image1 === skins2) {
      page = 1;
    } else if (image1 === return2) {
      page = 0;
    } else if (image1 === skip2) {
      onBackstoryComplete();
    } else if (image1 === controls_1) {
      page = 6;
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
  if (page === 0) {
    homePage();
  } else if (page === 1) {
    skinScreen();
  } else if (page === 2) {
    storySlides();
  } else if (page === 3) {
    gameover();
  } else if (page === 4) {
    victoryPage();
  } else if (page === 5) {
    gameStart();
  } else if (page === 6) {
    controls();
  }
}

function controls() {
  button(return2, 20, 20, return2.width / 7 * scale, return2.height / 6 * scale);
  image(controls_1, 250, 50, controls_1.width / 7 * scale, controls_1.height / 6 * scale);

  textSize(16);
  text("Move using WASD", 450, 220);
  text("or Arrow Keys", 450, 240);

  if (keyCode === UP_ARROW || key === "w") {
    image(wasd_w, 350, 180, wasd_w.width / 7 * scale, wasd_w.height / 6 * scale);
    image(arrow_up, 330, 250, arrow_up.width / 7 * scale, arrow_up.height / 6 * scale);
  } else if (keyCode === DOWN_ARROW || key === "s") {
    image(wasd_s, 350, 180, wasd_s.width / 7 * scale, wasd_s.height / 6 * scale);
    image(arrow_down, 330, 250, arrow_down.width / 7 * scale, arrow_down.height / 6 * scale);
  } else if (keyCode === LEFT_ARROW || key === "a") {
    image(wasd_a, 350, 180, wasd_a.width / 7 * scale, wasd_a.height / 6 * scale);
    image(arrow_left, 330, 250, arrow_left.width / 7 * scale, arrow_left.height / 6 * scale);
  } else if (keyCode === RIGHT_ARROW || key === "d") {
    image(wasd_d, 350, 180, wasd_d.width / 7 * scale, wasd_d.height / 6 * scale);
    image(arrow_right, 330, 250, arrow_right.width / 7 * scale, arrow_right.height / 6 * scale);
  } else {
    image(wasd, 350, 180, wasd.width / 7 * scale, wasd.height / 6 * scale);
    image(arrow, 330, 250, arrow.width / 7 * scale, arrow.height / 6 * scale);
  }

  text("press enter to pick up", 100, 300);
  text("or swap selected item", 100, 320);
  if (keyCode === ENTER) {
    image(enter_selected, 30, 280, enter_selected.width / 7 * scale, enter_selected.height / 6 * scale);
  } else {
    image(enter, 30, 280, enter.width / 7 * scale, enter.height / 6 * scale);
  }

  text("press backspace to", 100, 250);
  text("drop selected item", 100, 270);
  if (keyCode === BACKSPACE) {
    image(backspace_selected, 30, 230, backspace_selected.width / 7 * scale, backspace_selected.height / 6 * scale);
  } else {
    image(backspace, 30, 230, backspace.width / 7 * scale, backspace.height / 6 * scale);
  }

  text("press shift to", 100, 350);
  text("use selected potion", 100, 370);
  if (keyCode === SHIFT) {
    image(shift_selected, 30, 330, shift_selected.width / 7 * scale, shift_selected.height / 6 * scale);
  } else {
    image(shift, 30, 330, shift.width / 7 * scale, shift.height / 6 * scale);
  }

  text("use number keys 1-3 to", 150, 170);
  text("select item in inventory", 150, 190);
  if (key === "1") {
    image(number_1, 50, 150, number_1.width / 7 * scale, number_1.height / 6 * scale);
  } else if (key === "2") {
    image(number_2, 50, 150, number_2.width / 7 * scale, number_2.height / 6 * scale);
  } else if (key === "3") {
    image(number_3, 50, 150, number_3.width / 7 * scale, number_3.height / 6 * scale);
  } else {
    image(number, 50, 150, number.width / 7 * scale, number.height / 6 * scale);
  }

  text("attack using spacebar", 380, 360);
  if (key === " ") {
    image(spacebar_selected, 260, 330, spacebar_selected.width / 7 * scale, spacebar_selected.height / 6 * scale);
  } else {
    image(spacebar, 260, 330, spacebar.width / 7 * scale, spacebar.height / 6 * scale);
  }
}

function resetGame() {
  // player stats
  lives = 3;
  playerHealth = 100;
  attackCooldown = 0;

  // map state
  planet = 1;
  completedPlanets = [];
  g = 0;
  fightRooms = [];
  chests = [];
  spikeWalls = [];
  enemies = [];

  // inventory
  size = 0;
  inventory2 = [];
  droppedInventory = [];
  droppedSize = 0;

  // camera and player position
  currentMap = mapData_nacho;
  currentMapFloor = floorTileset;
  currentMapWall = wallTileset;
  const spawn = getSpawnPoint(currentMap);
  playerX = spawn.x;
  playerY = spawn.y;
  cam.x = constrain(playerX - pageWidth / 2, 0, currentMap.width * 16 * mapScale - pageWidth);
  cam.y = constrain(playerY - pageHeight / 2, 0, currentMap.height * 16 * mapScale - pageHeight);

  // animation state
  currentFrame = 0;
  frameCurrRow = 0;
  frontR = true;
  walkToggle = false;
}

function homePage() {
  scale = 1;
  backgroundMoveSpeed = 0.5;
  overmusic.stop();

  if (audioUnlocked && !homepage_sound.isPlaying()) {
    homepage_sound.loop();
  }

  if (mouseX > pageWidth / 2 && homepageX < 0) {
    homepageX += backgroundMoveSpeed;
  } else if (mouseX < pageWidth / 2 && mouseX != 0 && homepageX > -pageWidth / 50) {
    homepageX -= backgroundMoveSpeed;
  }

  if (mouseY > pageHeight / 2 && homepageY < 0) {
    homepageY += backgroundMoveSpeed;
  } else if (mouseY < pageHeight / 2 && mouseY != 0 && homepageY > -pageHeight / 50) {
    homepageY -= backgroundMoveSpeed;
  }

  image(
    homepage_background,
    homepageX, homepageY,
    pageWidth + pageWidth / 50, pageHeight + pageHeight / 50
  );

  // randomized if statement for flicker effect
  if (Math.floor(random(0, 15)) === 0) {
    image(
      title1,
      50, -10,
      1429 / 3, 500 / 3
    );

  } else {
    image(
      title2,
      50, -10,
      1429 / 3, 500 / 3
    );

    scale -= 0.005;
  }

  // CAT
  image(
    homepage_cat,
    0, 90,
    homepage_cat.width * scale / 2, homepage_cat.height * scale / 2
  );

  // start game button
  button(start_game2, 275, 150, start_game2.width / 7 * scale, start_game2.height / 6 * scale);

  // skins button
  button(skins2, 410, 300, skins2.width / 7 * scale, skins2.height / 6 * scale);

  button(controls_1, 410, 250, controls_1.width / 7 * scale, controls_1.height / 6 * scale);
}

function skinScreen() {
  scale = 1;
  backgroundMoveSpeed = 0.5;

  if (mouseX > pageWidth / 2 && homepageX < 0) {
    homepageX += backgroundMoveSpeed;
  } else if (mouseX < pageWidth / 2 && mouseX != 0 && homepageX > -pageWidth / 50) {
    homepageX -= backgroundMoveSpeed;
  }
  if (mouseY > pageHeight / 2 && homepageY < 0) {
    homepageY += backgroundMoveSpeed;
  } else if (mouseY < pageHeight / 2 && mouseY != 0 && homepageY > -pageHeight / 50) {
    homepageY -= backgroundMoveSpeed;
  }

  image(
    homepage_background,
    homepageX, homepageY,
    pageWidth + pageWidth / 50, pageHeight + pageHeight / 50
  );

  // randomized if statement for flicker effect
  if (Math.floor(random(0, 6)) === 0) {
    image(
      title1,
      200, 0,
      title1.width / 4, title1.height / 4
    );
  } else {
    image(
      title2,
      200, 0,
      title2.width / 4, title1.height / 4
    );

    scale -= 0.005;
  }

  // return button
  button(return2, 20, 20, return2.width / 7 * scale, return2.height / 6 * scale);

  if (millis() - skinAnimTimer > 400) {
    skinAnimTimer = millis();
    skinFrame = !skinFrame;
  }

  // list of cat skins
  let cats = [cat_white, cat_tan, cat_orange, cat_charzard];

  for (let i = 0; i < 4; i++) {
    let x = 20 + i * (frameWidth / 5 + 10);

    // draw cat
    image(
      cats[i],
      x, 180,
      frameWidth / 5, frameHeight / 5,
      skinFrame ? 3 * frameWidth : 0, 0,
      frameWidth, frameHeight
    );

    // draw selection button
    button(skin_selection, x, 170, skin_selection.width / 5 * scale, skin_selection.height / 5 * scale);

    // highlights skin
    if (skinChoice === cats[i]) {
      noFill();
      stroke(191, 141, 247);
      strokeWeight(5);
      rect(x, 170, skin_selection.width / 5, skin_selection.height / 5);
      noStroke();
    }
  }

  if (mouseJustPressed) {
    for (let i = 0; i < 4; i++) {
      let x = 20 + i * (frameWidth / 5 + 10);
      let w = skin_selection.width / 5;
      let h = skin_selection.height / 5;
      if (mouseX > x && mouseX < x + w && mouseY > 170 && mouseY < 170 + h) {
        skinChoice = cats[i];
      }
    }
  }

}
function stopAllSounds() {
  level_theme.stop();
  homepage_sound.stop();
}

function storySlides() {
  if (!backstoryActive) {
    startBackstory();
  }

  // music handling
  if (audioUnlocked && !slides_track.isPlaying()) {
    slides_track.setVolume(0.4);
    slides_track.loop();
  }

  if (homepage_sound.isPlaying()) homepage_sound.stop();
  if (overmusic.isPlaying()) overmusic.stop();

  // --- BACKGROUND GIF ---
  const storyGifs = [story1, story2, story3, story4];
  if (currentSlide < storyGifs.length) {
    image(storyGifs[currentSlide], 0, 0, pageWidth, pageHeight);
  }

  // --- FADE OVERLAY ---
  fill(0, 0, 0, 255 - slideAlpha);
  noStroke();
  rect(0, 0, pageWidth, pageHeight);

  // --- TEXT CONTENT ---
  let slide = backstorySlides[currentSlide];

  if (slide) {
    push();

    textAlign(CENTER);

    // Title shadow
    fill(0);
    textSize(26);
    text(slide.title, pageWidth / 2 + 2, 62);

    // Title
    fill(255);
    text(slide.title, pageWidth / 2, 60);

    // Body text
    textSize(14);
    for (let i = 0; i < slide.text.length; i++) {
      // shadow
      fill(0);
      text(slide.text[i], pageWidth / 2 + 1, 122 + i * 20);

      // main text
      fill(255);
      text(slide.text[i], pageWidth / 2, 120 + i * 20);
    }

    // Emoji
    textSize(30);
    fill(255);
    text(slide.emoji, pageWidth / 2, 310);

    pop();
  }

  // --- FADE LOGIC ---
  if (fadeState === "in") {
    slideAlpha = min(slideAlpha + FADE_SPEED, 255);
    if (slideAlpha >= 255) {
      fadeState = "hold";
      fadeTimer = 0;
    }
  } else if (fadeState === "hold") {
    fadeTimer++;
    if (fadeTimer >= HOLD_FRAMES) {
      fadeState = "out";
    }
  } else if (fadeState === "out") {
    slideAlpha = max(slideAlpha - FADE_SPEED, 0);
    if (slideAlpha <= 0) {
      currentSlide++;

      // stop when either gifs OR text runs out
      if (
        currentSlide >= storyGifs.length ||
        currentSlide >= backstorySlides.length
      ) {
        onBackstoryComplete();
        return;
      }

      fadeState = "in";
    }
  }

  // --- SKIP BUTTON ---
  button(skip2, 475, 345, skip2.width / 14, skip2.height / 12);
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
  currentSlide = 0;
  slideAlpha = 0;
  fadeState = "in";
  fadeTimer = 0;
  backstoryActive = true;
}

function onBackstoryComplete() {
  backstoryActive = false;
  currentMap = mapData_nacho;
  currentMapFloor = floorTileset;
  currentMapWall = wallTileset;

  const spawn = getSpawnPoint(currentMap);
  playerX = spawn.x;
  playerY = spawn.y;

  // Initialize camera directly at player position — no lerp delay
  cam.x = constrain(playerX - pageWidth / 2, 0, currentMap.width * 16 * mapScale - pageWidth);
  cam.y = constrain(playerY - pageHeight / 2, 0, currentMap.height * 16 * mapScale - pageHeight);

  page = 5;
}

function initMapObjects(map) {
  fightRooms = [];
  chests = [];
  spikeWalls = [];

  for (let layer of map.layers) {
    if (layer.type !== "objectgroup") continue;

    if (layer.name === "fightRooms") {
      for (let obj of layer.objects) {
        if (obj.name === "fightRoom1" || obj.name === "fightRoom") {
          fightRooms.push({
            x: obj.x * mapScale,
            y: obj.y * mapScale,
            w: obj.width * mapScale,
            h: obj.height * mapScale,
            cleared: false,
            active: false,
            activateTimer: -1
          });
        }
      }
    }

    if (layer.name === "Enemy/Boss/Chest") {
      for (let obj of layer.objects) {
        if (obj.name === "chestSpawn") {
          chests.push({
            x: obj.x * mapScale,
            y: obj.y * mapScale,
            opened: false,
            tileCol: Math.floor(obj.x / 16),
            tileRow: Math.floor(obj.y / 16)
          });
        }
        if (obj.name === "enemySpawn") {
          enemies.push(new Enemy(obj.x * mapScale, obj.y * mapScale, "rat"));
        }
        if (obj.name === "BossSpawn") {
          enemies.push(new Enemy(obj.x * mapScale, obj.y * mapScale, "boss"));
        }
      }
    }
  }

  const chestsLayer = map.layers.find(l => l.name === "chests");
  if (chestsLayer) {
    for (let i = 0; i < chestsLayer.data.length; i++) {
      if (chestsLayer.data[i] === 25) { // static spike tile
        const col = i % map.width;
        const row = Math.floor(i / map.width);
        spikeWalls.push({
          x: col * 16 * mapScale,
          y: row * 16 * mapScale,
          raised: false,
          roomIndex: -1,
          animFrame: 0,
          animTimer: 0
        });
      }
    }
  }

  // Assign each spike wall to its nearest fight room
  for (let spike of spikeWalls) {
    let closest = -1;
    let closestDist = Infinity;
    for (let i = 0; i < fightRooms.length; i++) {
      let r = fightRooms[i];
      let cx = r.x + r.w / 2;
      let cy = r.y + r.h / 2;
      let d = dist(spike.x, spike.y, cx, cy);
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    }
    spike.roomIndex = closest;
  }
}

function loadRandomPlanet() {
  console.log("loading planet, current:", planet, "completed:", completedPlanets);
  const bossPlanet = 4;
  const normalPlanets = [1, 2, 3];
  const remaining = normalPlanets.filter(p => !completedPlanets.includes(p) && p !== planet);

  completedPlanets.push(planet);

  let next;
  if (remaining.length === 0) {
    next = bossPlanet;
  } else {
    next = remaining[floor(random(remaining.length))];
  }

  planet = next;

  if (next === 1 && typeof mapData_nacho !== 'undefined') {
    currentMap = mapData_nacho;
  } else if (next === 2 && typeof mapData_parmesan !== 'undefined') {
    currentMap = mapData_parmesan;
  } else if (next === 3 && typeof mapData_blueCheese !== 'undefined') {
    currentMap = mapData_blueCheese;
  } else if (next === 4 && typeof mapData_cheeseCake !== 'undefined') {
    currentMap = mapData_cheeseCake;
  } else {
    // fallback to nacho if map not ready yet
    currentMap = mapData_nacho;
    planet = 1;
  }

  currentMapFloor = floorTileset;
  currentMapWall = wallTileset;

  // Reset map objects for new planet
  g = 0;
  fightRooms = [];
  chests = [];
  spikeWalls = [];
  enemies = [];

  // Respawn player at new map spawn point
  const spawn = getSpawnPoint(currentMap);
  playerX = spawn.x;
  playerY = spawn.y;
  cam.x = constrain(playerX - pageWidth / 2, 0, currentMap.width * 16 * mapScale - pageWidth);
  cam.y = constrain(playerY - pageHeight / 2, 0, currentMap.height * 16 * mapScale - pageHeight);

  if (next === bossPlanet && completedPlanets.includes(bossPlanet)) {
    page = 4; // victory
  }
}

function updateFightRooms() {
  for (let i = 0; i < fightRooms.length; i++) {
    let r = fightRooms[i];
    if (r.cleared) continue;

    let inRoom = playerX > r.x && playerX < r.x + r.w &&
      playerY > r.y && playerY < r.y + r.h;

    if (inRoom && !r.active && r.activateTimer === -1) {
      r.activateTimer = millis(); // start the timer when player enters
    }

    // raise spikes after 1500ms delay
    if (r.activateTimer > 0 && millis() - r.activateTimer > 1000 && !r.active) {
      r.active = true;
      for (let spike of spikeWalls) {
        if (spike.roomIndex === i) {
          spike.raised = true;
          spike.animFrame = 0;
          spike.animTimer = millis();
        }
      }
    }

    if (r.active) {
      let allEnemiesDefeated = enemies.length > 0 && enemies.every(e => !e.alive);
      if (allEnemiesDefeated) {
        r.cleared = true;
        r.active = false;
        r.activateTimer = -1;
        enemies = enemies.filter(e => e.roomIndex !== i);
        for (let spike of spikeWalls) {
          if (spike.roomIndex === i) {
            spike.raised = false;
            spike.animFrame = 0;
            spike.animTimer = millis();
          }
        }
      }
    }
  }
}

function drawChests() {
  const OPEN_TILE = 199;

  for (let chest of chests) {
    if (chest.opened) {
      chestItem(chest.x, chest.y);
      continue;
    }
    let d = dist(playerX, playerY, chest.x, chest.y);
    if (d < 30 * mapScale) {
      push();
      fill(255);
      noStroke();
      textSize(8);
      textAlign(CENTER);
      text("E to open", chest.x + 8 * mapScale, chest.y - 5);
      pop();

      if (keyIsDown(69)) {
        chest.opened = true;

        if (openchestSound) {
          openchestSound.setVolume(0.2);
          openchestSound.play();
        }
        const chestLayer = currentMap.layers.find(l => l.name === "chests");
        if (chestLayer) {
          const idx = chest.tileRow * currentMap.width + chest.tileCol;
          chestLayer.data[idx] = OPEN_TILE;
        }
      }
    }
  }
}

const SPIKE_FRAMES_RAISE = [[21, 100], [22, 100], [23, 100], [24, 2000]];
const SPIKE_FRAMES_RETRACT = [[24, 100], [23, 100], [22, 100], [21, 2000]];

function drawSpikeWalls() {
  if (!spikeWalls || spikeWalls.length === 0) return;

  const tileW = 16;
  const now = millis();

  for (let spike of spikeWalls) {
    let frames = spike.raised ? SPIKE_FRAMES_RAISE : SPIKE_FRAMES_RETRACT;

    if (now - spike.animTimer > frames[spike.animFrame][1]) {
      spike.animTimer = now;
      if (spike.animFrame < frames.length - 1) {
        spike.animFrame++;
      }
    }

    let tileId = frames[spike.animFrame][0];
    const localID = tileId - 1;
    const srcX = (localID % 7) * tileW;
    const srcY = Math.floor(localID / 7) * tileW;

    image(
      floorTileset,
      spike.x, spike.y,
      tileW * mapScale, tileW * mapScale,
      srcX, srcY, tileW, tileW
    );
  }
}

//function createEnemy(x, y, enemyType, damage, health) {
//enemies.push({ 
//x: x, 
//y: y, 
//health: health,
//state: "wander",
//dirX: random([-1, 1]),
//dirY: random([-1, 1])
//});
//}

function drawEnemy() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    if (!e.alive) continue;

    let dx = playerX - e.x;
    let dy = playerY - e.y;
    let d = dist(playerX, playerY, e.x, e.y);

    if (d <= e.attackRange) e.state = "attack";
    else if (d <= e.detectionRange) e.state = "chase";
    else e.state = "wander";

    let dirRow;
    if (Math.abs(dx) > Math.abs(dy)) dirRow = dx > 0 ? 1 : 3;
    else dirRow = dy > 0 ? 2 : 0;

    let moveX = 0, moveY = 0;

    if (e.state === "chase" && d > 0) {
      moveX = (dx / d) * e.speed;
      moveY = (dy / d) * e.speed;
    } else if (e.state === "wander") {
      e.moveTimer--;
      if (e.moveTimer <= 0) {
        let angle = random(TWO_PI);
        e.dirX = cos(angle);
        e.dirY = sin(angle);
        e.moveTimer = floor(random(30, 90));
      }
      moveX = e.dirX * e.speed * 0.5;
      moveY = e.dirY * e.speed * 0.5;
    } else if (e.state === "attack" && e.attackCooldown <= 0) {
      playerHealth = max(0, playerHealth - ENEMY_ATTACK);
      e.attackCooldown = 60;
    }

    if (e.attackCooldown > 0) e.attackCooldown--;

    // move enemy
    let nextX = e.x + moveX;
    let nextY = e.y + moveY;
    let w = RAT_FRAME_W, h = RAT_FRAME_H[dirRow];
    if (!isWallTile(nextX + RAT_HITBOX_LEFT, e.y + RAT_HITBOX_TOP) &&
      !isWallTile(nextX + w - RAT_HITBOX_RIGHT - 1, e.y + RAT_HITBOX_TOP) &&
      !isWallTile(nextX + RAT_HITBOX_LEFT, e.y + h - RAT_HITBOX_BOTTOM - 1) &&
      !isWallTile(nextX + w - RAT_HITBOX_RIGHT - 1, e.y + h - RAT_HITBOX_BOTTOM - 1)) {
      e.x = nextX;
    }
    if (!isWallTile(e.x + RAT_HITBOX_LEFT, nextY + RAT_HITBOX_TOP) &&
      !isWallTile(e.x + w - RAT_HITBOX_RIGHT - 1, nextY + RAT_HITBOX_TOP) &&
      !isWallTile(e.x + RAT_HITBOX_LEFT, nextY + h - RAT_HITBOX_BOTTOM - 1) &&
      !isWallTile(e.x + w - RAT_HITBOX_RIGHT - 1, nextY + h - RAT_HITBOX_BOTTOM - 1)) {
      e.y = nextY;
    }

    // draw
    let img = e.type === "boss" ? rat_boss : rat1;
    let sx = (frameCount % 15 < 5 ? 0 : frameCount % 15 < 10 ? 1 : 2) * RAT_FRAME_W;
    let sy = RAT_ROW_Y[dirRow];
    image(img, e.x, e.y, RAT_FRAME_W, RAT_FRAME_H[dirRow], sx, sy, RAT_FRAME_W, RAT_FRAME_H[dirRow]);

    healthBarEnemy(e.x, e.y - 5, e.health, e.maxHealth);

    if (e.health <= 0) e.alive = false;
  }
}


const RAT_HITBOX_LEFT = 14;
const RAT_HITBOX_RIGHT = 14;
const RAT_HITBOX_TOP = 6;
const RAT_HITBOX_BOTTOM = 10;


function getEquippedItem() {
  for (let i = 0; i < size; i++) {
    if (inventory2[i] != null && inventory2[i].selected) {
      return inventory2[i];
    }
  }
  return null;
}

function drawCat(player) {
  let sx = currentFrame * frameWidth;
  let sy = frameHeight * frameCurrRow;

  let equipped = getEquippedItem();


  if (equipped != null) {
    let img = equipped.image_display();

    let centerX = SPRITE_W / 2;
    let centerY = SPRITE_H / 2;

    let offsetX = 0;
    let offsetY = 0;

    if (frameCurrRow === 3) { // right
      offsetX = centerX + 4;
      offsetY = centerY - 4;
    } else if (frameCurrRow === 2) { // left
      offsetX = centerX - 12;
      offsetY = centerY - 4;
    } else if (frameCurrRow === 0) { // down
      offsetX = centerX - 4;
      offsetY = centerY + 2;
    } else if (frameCurrRow === 1) { // up
      offsetX = centerX + 2;
      offsetY = centerY - 12;
    }

    if (frameCurrRow === 1) {
      image(img, playerX + offsetX, playerY + offsetY, 12, 12);
    }

    // draw cat
    image(player, playerX, playerY, SPRITE_W, SPRITE_H, sx, sy, frameWidth, frameHeight);

    if (frameCurrRow !== 1) {
      image(img, playerX + offsetX, playerY + offsetY, 12, 12);
    }

  } else {
    // there is no item
    image(player, playerX, playerY, SPRITE_W, SPRITE_H, sx, sy, frameWidth, frameHeight);
  }

  let up = keyIsDown(UP_ARROW) || keyIsDown(87);
  let down = keyIsDown(DOWN_ARROW) || keyIsDown(83);
  let left = keyIsDown(LEFT_ARROW) || keyIsDown(65);
  let right = keyIsDown(RIGHT_ARROW) || keyIsDown(68);
  let moving = up || down || left || right;

  if (millis() - lastSwitch > (moving ? walkInterval : idleInterval)) {
    lastSwitch = millis();

    let speed = (moving && (up || down) && (left || right)) ? playerSpeed * 0.707 : playerSpeed;

    let prevX = playerX;
    let prevY = playerY;

    if (left) playerX -= speed;
    if (right) playerX += speed;
    if (collidesWithWall(playerX, playerY)) playerX = prevX;

    if (up) playerY -= speed;
    if (down) playerY += speed;
    if (collidesWithWall(playerX, playerY)) playerY = prevY;

    if (up) frameCurrRow = 1;
    else if (down) frameCurrRow = 0;
    else if (right) frameCurrRow = 3;
    else if (left) frameCurrRow = 2;

    playerX = constrain(playerX, 0, currentMap.width * 16 * mapScale - SPRITE_W);
    playerY = constrain(playerY, 0, currentMap.height * 16 * mapScale - SPRITE_H);

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

  if (attackCooldown > 0) {
    attackCooldown--;
  }

  if (playerHealth <= 0) {
    playerHealth = 0;
    lives--;
    if (lives > 0) {
      const spawn = getSpawnPoint(currentMap);
      playerX = spawn.x;
      playerY = spawn.y;
      playerHealth = 100;
    } else {
      page = 3; // Game over
    }
  }

  if (keyIsDown(32)) {
    for (let e of enemies) {
      if (!e.alive) continue;
      let d = dist(playerX, playerY, e.x, e.y);
      if (e.state !== "wander" && d <= e.attackRange && attackCooldown === 0) {
        let equipped = getEquippedItem();
        let damage = PLAYER_ATTACK + (equipped ? equipped.data.damage : 0);
        e.health -= damage;
        attackCooldown = 25;

        if (equipped && equipped.data.damage > 0) {
          sword_hit.setVolume(0.3);
          sword_hit.play();
        } else {
          punch_sound.setVolume(0.3);
          punch_sound.play();
        }

        break;
      }
    }
  }
}

function drawSwap() {

  for (let i = 0; i < droppedSize; i++) {
    if (droppedInventory[i] != null) {
      if (dist(playerX, playerY, droppedInventory[i].x, droppedInventory[i].y) < 20) {
        droppedInventory[i].selected = true;
      } else {
        droppedInventory[i].selected = false;
      }
      text(droppedInventory[i].x, 200, 220 + i * 20);
      text(droppedInventory[i].y, 250, 220 + i * 20);
      image(droppedInventory[i].image_display(), droppedInventory[i].x, droppedInventory[i].y, 20, 20);
    }
  }
}

function gameStart() {
  if (audioUnlocked && !level_theme.isPlaying()) {
    level_theme.setVolume(0.2);
    level_theme.loop();
  }

  if (homepage_sound.isPlaying()) {
    homepage_sound.stop();
  }
  if (slides_track.isPlaying()) {
    slides_track.stop();
  }
  if (!currentMap) {
    currentMap = mapData_nacho;
    currentMapFloor = floorTileset;
    currentMapWall = wallTileset;
    const spawn = getSpawnPoint(currentMap);
    playerX = spawn.x;
    playerY = spawn.y;
  }

  let targetCamX = playerX - pageWidth / 2;
  let targetCamY = playerY - pageHeight / 2;

  cam.x = lerp(cam.x, constrain(targetCamX, 0, currentMap.width * 16 * mapScale - pageWidth), 0.15);
  cam.y = lerp(cam.y, constrain(targetCamY, 0, currentMap.height * 16 * mapScale - pageHeight), 0.15);

  push();
  translate(-cam.x, -cam.y);
  drawMap(currentMap, currentMapFloor, currentMapWall);
  drawChests();
  drawSpikeWalls();
  updateFightRooms();
  drawSwap();
  drawCat(skinChoice);
  pop();

  push();
  translate(-cam.x, -cam.y);
  drawEnemy();
  pop();


  IU(lives, playerHealth, inventory1, inventory2);
  if (playerHealth <= 0 && lives <= 0) {
    page = 3; // game over
  } else if (playerHealth <= 0) {
    lives--;
    playerHealth = 100;

  }
  if (g == 0) {
    initMapObjects(currentMap);
    console.log("spikeWalls:", spikeWalls.length);
    console.log("fightRooms:", fightRooms.length);
    g++;
  }
}
function keyPressed() {
  if (key === 'p' || key === 'P') {
    loadRandomPlanet();
  }

  if (key === "n" || key === "N") {
    meow.stop();
    meow.play();
  }
}

function drawMap(map, floorTS, wallTS) {
  const tileW = 16;
  const mapCols = map.width;
  const isSnowMap = (map === mapData_parmesan);

  for (let layer of map.layers) {
    if (layer.type !== "tilelayer") continue;
    for (let i = 0; i < layer.data.length; i++) {
      const tileId = layer.data[i];
      if (tileId === 0) continue;
      if (layer.name === "chests" && tileId === 25) continue;
      const col = i % mapCols;
      const row = Math.floor(i / mapCols);
      const x = col * tileW * mapScale;
      const y = row * tileW * mapScale;
      if (isSnowMap) {
        // Snow tileset: firstgid 1, 32 columns, 16x16 tiles
        const localID = tileId - 1;
        const srcX = (localID % 32) * tileW;
        const srcY = Math.floor(localID / 32) * tileW;
        image(snowTileset, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
      } else {
        if (tileId >= 194) {
          const localID = tileId - 194;
          const srcX = (localID % 3) * tileW;
          const srcY = Math.floor(localID / 3) * tileW;
          image(chestTileset, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
        } else if (tileId >= 146) {
          if (tileId === 179) {
            fill(0); noStroke();
            rect(x, y, tileW * mapScale, tileW * mapScale);
          } else {
            const localID = tileId - 146;
            const srcX = (localID % 12) * tileW;
            const srcY = Math.floor(localID / 12) * tileW;
            image(wallTS, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
          }
        } else if (tileId >= 50) {
          const localID = tileId - 50;
          const srcX = (localID % 24) * tileW;
          const srcY = Math.floor(localID / 24) * 32;
          image(wallTS, x, y - 16 * mapScale, tileW * mapScale, 32 * mapScale, srcX, srcY, tileW, 32);
        } else {
          const localID = tileId - 1;
          const srcX = (localID % 7) * tileW;
          const srcY = Math.floor(localID / 7) * tileW;
          image(floorTS, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
        }
      }
    }
  }
}

function isWallTile(worldX, worldY) {
  const tileW = 16 * mapScale;
  const col = Math.floor(worldX / tileW);
  const row = Math.floor(worldY / tileW);
  if (col < 0 || row < 0 || col >= currentMap.width || row >= currentMap.height) return true;
  const isSnowMap = (currentMap === mapData_parmesan);

  let hasFloor = false;
  for (let layer of currentMap.layers) {
    if (layer.type !== "tilelayer") continue;
    if (isSnowMap) {
      if (layer.name !== "Floors" && layer.name !== "Walls") continue;
      const tileId = layer.data[row * currentMap.width + col];
      if (layer.name === "Walls" && tileId !== 0) return true;
      if (layer.name === "Floors" && tileId !== 0) hasFloor = true;
    } else {
      if (layer.name !== "floors" && layer.name !== "walls") continue;
      const tileId = layer.data[row * currentMap.width + col];
      if (tileId >= 50 && tileId <= 193) return true; // high walls + low walls
      if (tileId === 179) return true;                 // void blocks movement
      if (tileId >= 1 && tileId <= 49) hasFloor = true;
    }
  }

  return !hasFloor;
}

const HITBOX_LEFT = 14;
const HITBOX_RIGHT = 14;
const HITBOX_TOP = 10;  // more space above (head)
const HITBOX_BOTTOM = -5;   // less below (feet touch walls properly)

function collidesWithWall(X, Y) {
  let left = X + HITBOX_LEFT;
  let right = X + SPRITE_W - HITBOX_RIGHT - 1;
  let top = Y + HITBOX_TOP;
  let bottom = Y + SPRITE_H - HITBOX_BOTTOM - 1;

  // Check map walls
  if (isWallTile(left, top) ||
    isWallTile(right, top) ||
    isWallTile(left, bottom) ||
    isWallTile(right, bottom)) return true;

  // Check raised spike walls
  for (let spike of spikeWalls) {
    if (!spike.raised) continue;
    let sw = 16 * mapScale;
    let sh = 16 * mapScale;
    if (right > spike.x && left < spike.x + sw &&
      bottom > spike.y && top < spike.y + sh) {
      return true;
    }
  }

  return false;
}

function gameover() {
  scale = 1;
  lives = 3;
  playerHealth = 100;
  if (audioUnlocked && !overmusic.isPlaying()) {
    overmusic.setVolume(0.4);
    overmusic.loop();
  }
  if (level_theme.isPlaying()) {
    level_theme.stop();
  }
  image(
    homepage_background,
    0, 0,
    pageWidth, pageHeight
  );

  // randomized if statement for flicker effect
  if (Math.floor(random(0, 15)) === 0) {
    image(
      game_over1,
      70, 40,
      game_over1.width / 4, game_over1.height / 4
    );

  } else {
    image(
      game_over2,
      70, 40,
      game_over2.width / 4, game_over2.height / 4
    );

    scale -= 0.005;
  }


  // return button
  button(return2, 205, 260, return2.width / 4 * scale, return2.height / 4 * scale);
}

function victoryPage() {
  scale = 1;
  if (audioUnlocked && !victory_music.isPlaying()) {
    victory_music.loop();
  }

  if (level_theme.isPlaying()) {
    level_theme.stop();
  }
  image(
    homepage_background,
    0, 0,
    pageWidth, pageHeight
  );

  // randomized if statement for flicker effect
  if (Math.floor(random(0, 15)) === 0) {
    image(
      victory1,
      90, 40,
      victory1.width / 4, victory1.height / 4
    );

  } else {
    image(
      victory2,
      90, 40,
      victory2.width / 4, victory2.height / 4
    );

    scale -= 0.005;
  }


  // return button
  button(return2, 205, 260, return2.width / 4 * scale, return2.height / 4 * scale);
}


function healthBarEnemy(x, y, health, maxHealth) {
  fill(209, 197, 197);
  rect(x + 10, y, maxHealth * 0.3 + 2, 8);
  fill(163, 77, 77);
  rect(x + 10.5, y + 1.5, health * 0.3, 5);
  fill(209, 197, 197);
  square(x, y, 8);
  fill(0);
  textSize(4);
  text(health, x + 0.5, y + 5);
}

//returns player attack damage based on selected item in inventory, defaults to base attack if no item selected
function playerAttack() {
  var attack = 0;
  for (let i = 0; i < size; i++) {
    if (inventory2[i].data.health > 0) {
      attack = inventory2[i].data.damage;

    }
  }
  return PLAYER_ATTACK + attack;
}

//adds image item to inventory
function addItem(item) {
  if (size < 3) {
    inventory2[size] = item;
    size++;
  }
}



class Item {
  // image: array of image not selected and image selected
  // selected: whether the item is currently selected in the inventory
  // data: any additional data about the item (e.g. health boost, damage, etc.)
  constructor(image, selected, data, x, y) {
    this.image = image;
    this.selected = selected;
    this.data = data;
    this.x = x;
    this.y = y;
  }

  image_display() {
    if (this.selected) {
      return this.image[1];
    } else {
      return this.image[0];
    }
  }
}

class Enemy {
  constructor(x, y, type = "rat") {
    this.x = x;
    this.y = y;
    this.type = type;
    this.health = type === "boss" ? 300 : 100;
    this.maxHealth = this.health;
    this.state = "wander";
    this.speed = type === "boss" ? 1.2 : random(0.5, 0.9);
    this.detectionRange = type === "boss" ? 250 : 150;
    this.attackRange = type === "boss" ? 35 : 25;
    this.alive = true;
    this.dirX = 1;
    this.dirY = 0;
    this.moveTimer = floor(random(0, 60));;
    this.animFrame = 0;
    this.attackCooldown = 0;
    this.roomIndex = -1;
  }
}

function chestItem(x, y) {
  chestSelect();
  displayItem();


  function displayItem() {
    for (let i = 0; i < 2; i++) {
      if (chestInventory[planet - 1][i] != null) {
        image(chestInventory[planet - 1][i].image_display(), x - 20 + i * 20, y - 30, 20, 20);
        textSize(8);
        fill(255);
        text("use 9 & 0 to select", x - 30, y - 40);
        text("Enter to pick up", x - 30, y - 30);
      }
    }


  }

  function chestSelect() {
    if (keyCode === 57) {
      if (chestInventory[planet - 1][0] != null) {
        chestInventory[planet - 1][0].selected = true;
      }
      if (chestInventory[planet - 1][1] != null) {
        chestInventory[planet - 1][1].selected = false;
      }
    } else if (keyCode === 48) {
      if (chestInventory[planet - 1][0] != null) {
        chestInventory[planet - 1][0].selected = false;
      }
      if (chestInventory[planet - 1][1] != null) {
        chestInventory[planet - 1][1].selected = true;
      }
    }
  }
}

//displays health, lives, inventory, and current planet level
function IU(life, health, inventory1, inventory2) {
  var level = [level_nacho, level_blueCheese, level_parmesan, level_cheeseCake];
  image(
    icu,
    0, 0,
    pageWidth, pageHeight
  );
  image(inventory1, 15, 350, inventory1.width / 14, inventory1.height / 14);
  image(level[planet - 1], 480, 10, level[planet - 1].width / 10, level[planet - 1].height / 10);



  drawLives();
  healthBar();
  selectedItem();
  dropItem();
  swapItem();
  usePotion();
  if (keyCode === ENTER) {
    click = false;
  } else {
    click = true;
  }
  inventory();

  function usePotion() {
    for (let i = 0; i < size; i++) {
      
      if (inventory2[i] != null && inventory2[i].selected && inventory2[i].image_display() === potion_selected && keyCode === SHIFT && !potionJustUsed) {
        potionJustUsed = true;
        playerHealth = min(playerHealth + inventory2[i].data.health, 100);
        potion_drink.setVolume(0.3);
        potion_drink.play();
        for (let j = i; j < size - 1; j++) {
          inventory2[j] = inventory2[j + 1];
        }
        inventory2[size - 1] = null;
        size--;
        break;
      }
      if (keyCode != SHIFT) potionJustUsed = false;
    }
  }


  function swapItem() {
    var swapped = false;

    for (let i = 0; i < chestInventory[planet - 1].length; i++) {
      if (chestInventory[planet - 1][i] != null && chestInventory[planet - 1][i].selected && keyCode === ENTER && click) {
        for (let j = 0; j < size; j++) {
          if (inventory2[j].selected) {
            inventory2[j].selected = false;
            var temp = inventory2[j];
            inventory2[j] = chestInventory[planet - 1][i];
            chestInventory[planet - 1][i] = temp;
            chestInventory[planet - 1][i].x = playerX;
            chestInventory[planet - 1][i].y = playerY;
            swapped = true;
            click = false;
            break;
          }

        }

      }
    }
    if (!swapped && keyCode === ENTER && click) {
      for (let i = 0; i < chestInventory[planet - 1].length; i++) {
        if (chestInventory[planet - 1][i] != null && chestInventory[planet - 1][i].selected) {
          if (chestInventory[planet - 1][i].data.damage > 0) {
            sword_collect.setVolume(0.3);
            sword_collect.play();
          } else {
            potion_collect.setVolume(0.3);
            potion_collect.play();
          }

          addItem(chestInventory[planet - 1][i]);
          chestInventory[planet - 1][i].selected = false;
          chestInventory[planet - 1][i] = null;
        }
      }
    }

    for (let i = 0; i < droppedSize; i++) {

      if (droppedInventory[i] != null && droppedInventory[i].selected && keyCode === ENTER && click) {
        for (let j = 0; j < size; j++) {
          if (inventory2[j].selected) {
            inventory2[j].selected = false;
            var temp = inventory2[j];
            inventory2[j] = droppedInventory[i];
            droppedInventory[i] = temp;
            droppedInventory[i].x = playerX;
            droppedInventory[i].y = playerY;
            swapped = true;
            click = false;
            break;
          }

        }

      }

    }
    if (!swapped && keyCode === ENTER && click) {
      for (let i = 0; i < droppedSize; i++) {
        if (droppedInventory[i] != null && droppedInventory[i].selected) {
          addItem(droppedInventory[i]);
          droppedInventory[i].selected = false;
          droppedInventory[i] = null;
        }
      }
    }
  }

  //removes selected item from inventory when backspace is pressed and shifts remaining items over
  function dropItem() {
    if (keyCode === BACKSPACE) {

      for (let i = 0; i < size; i++) {
        if (inventory2[i].selected) {
          //text("drop item", 200, 200);
          inventory2[i].selected = false;
          droppedInventory[droppedSize] = inventory2[i];
          droppedInventory[droppedSize].x = playerX;
          droppedInventory[droppedSize].y = playerY;
          text(droppedInventory[droppedSize].x, 200, 200);
          droppedSize++;
          for (let j = i; j < size - 1; j++) {
            inventory2[j] = inventory2[j + 1];
          }
          inventory2[size - 1] = null;
          size--;
          break;
        }
      }
    }
  }

  function selectedItem() {
    if (keyCode === 49) {
      if (inventory2[0] != null && size >= 1) {
        inventory2[0].selected = true;
      }
      if (inventory2[1] != null && size >= 2) {
        inventory2[1].selected = false;
      }
      if (inventory2[2] != null && size >= 3) {
        inventory2[2].selected = false;
      }
    } else if (keyCode === 50) {
      if (inventory2[0] != null && size >= 1) {
        inventory2[0].selected = false;
      }
      if (inventory2[1] != null && size >= 2) {
        inventory2[1].selected = true;
      }
      if (inventory2[2] != null && size >= 3) {
        inventory2[2].selected = false;
      }

    } else if (keyCode === 51) {
      if (inventory2[0] != null && size >= 1) {
        inventory2[0].selected = false;
      }
      if (inventory2[1] != null && size >= 2) {
        inventory2[1].selected = false;
      }
      if (inventory2[2] != null && size >= 3) {
        inventory2[2].selected = true;
      }
    }
  }
  function inventory() {
    for (let i = 0; i < size; i++) {
      var img = inventory2[i].image_display();
      image(img, 25 + i * 32, 357, img.width / 1.5, img.height / 1.5);
    }
  }
  function drawLives() {
    for (let i = 0; i < life; i++) {
      image(heart, 25 + i * 30, 325, heart.width / 24, heart.height / 24);
    }
  }

  function healthBar(maxHealth = 100) {
    fill(209, 197, 197);
    rect(30, 5, maxHealth * 2 + 10, 20);
    fill(163, 77, 77);
    rect(35, 8, health * 2, 15);
    fill(209, 197, 197);
    square(3, 3, 25);
    fill(0);
    text(health, 5, 20);
  }
}


function draw() {
  if (planet === 2) background(100, 150, 200); // blue tint for snow map
  else background(220);
  screen(page);
  mouseJustPressed = false;
}