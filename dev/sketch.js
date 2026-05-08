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

let playerSpeed = 12;

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

const FADE_SPEED = 3;      // alpha change per frame
const HOLD_FRAMES = 360;    // frames to hold each slide (3s at 60fps)
let backstoryActive = false;
let slideSounds = [];

// map transition stuff:
let mapTransitionActive = false;
let mapTransitionStart = 0;
const MAP_TRANSITION_DURATION = 2000; // 2 seconds

let rocketX = -200;
let rocketY = pageHeight / 2;
let rocketSpeed = 6;


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
let planetClearing = false;
let mapClearedActive = false;
let mapClearedTimer = 0;
let mapCleared_img; // the asset
let mapClearedAlpha = 0;
let mapClearedParticles = [];



let enemies = [];

const PLAYERHEALTHMAX = 200;
let playerHealth = PLAYERHEALTHMAX;
let attackCooldown = 0; // frames until enemy can damage player again


const ATTACK_FRAME_W = 32;
const ATTACK_FRAME_H = 32;
const ATTACK_FRAME_COUNT = 3;
const ATTACK_INTERVAL = 80; // milliseconds between attack frames
let isAttacking = false;
let attackLastSwitch = 0;
let attackFrame = 0;
let lastAttackFrameTime = 0;
let attackJustSwung = false;


const ENEMY_ATTACK = 8;
const PLAYER_ATTACK = 30;

let currentFrameRat = 0;
const RAT_FRAME_W = 32;
const RAT_FRAME_H = [43, 21, 43, 21];
const RAT_ROW_Y = [0, 43, 64, 107];

const BOSS_FRAME_W = 400;
const BOSS_FRAME_H = 400;
const BOSS_ROW_Y = [0, 400, 800, 1200];

var startTime = 0;
var timeTaken = 0;
var first = 0;
var totalEnemies = 0;
var star = 0;
var attackPopups = [];

let playerAttackRange = 50;

let arrows = [];
let bowCoolDown = 300;
let lastBowShot = 0;
let hitEnemy = false;

let digitImages = [];

let strengthPotionActive = false;
let strengthPotionTimer = 0;
let strengthPotionDuration = 50000; //1 minute
let playerAttackBoost = 0;


function preload() {
  homepage_background = loadImage("assets/homepage_background.png");
  homepage_cat = loadImage("assets/cat_homepage.png");
  title1 = loadImage("assets/title1.png");
  title2 = loadImage("assets/title2.png");

  start_game1 = loadImage("assets/start_game1.png");
  start_game2 = loadImage("assets/start_game2.png");

  skins1 = loadImage("assets/skins1.png");
  skins2 = loadImage("assets/skins2.png");

  story1 = loadImage("assets/story1.png");
  story2 = loadImage("assets/story2.png");
  story3 = loadImage("assets/story3.png");
  story4 = loadImage("assets/story4.png");
  story5 = loadImage("assets/story5.png");
  story6 = loadImage("assets/story6.png");

  slideSound1 = loadSound("assets/VoiceRecord1.mp3");
  slideSound2 = loadSound("assets/VoiceRecord2.mp3");
  slideSound3 = loadSound("assets/VoiceRecord3.mp3");
  slideSound4 = loadSound("assets/VoiceRecord4.mp3");
  slideSound5 = loadSound("assets/VoiceRecord5.mp3");
  slideSound6 = loadSound("assets/VoiceRecord6.mp3");

  message_noti = loadSound("assets/message_noti.mp3");

  slideSounds = [
    slideSound1,
    slideSound2,
    slideSound3,
    slideSound4,
    slideSound5,
    slideSound6
  ];

  transition_background = loadImage("assets/transition_background.png");
  transition_sound = loadSound("assets/transition_sound.mp3");

  return1 = loadImage("assets/return1.png");
  return2 = loadImage("assets/return2.png");

  game_over1 = loadImage("assets/game_over1.png");
  game_over2 = loadImage("assets/game_over2.png");

  victory1 = loadImage("assets/victory1.png");
  victory2 = loadImage("assets/victory2.png");
  mapCleared_img = loadImage("assets/map_cleared.png");

  skip1 = loadImage("assets/skip1.png");
  skip2 = loadImage("assets/skip2.png");

  cat_orange = loadImage("assets/sprite_sheet_orange_dad.png");
  cat_white = loadImage("assets/sprite_sheet_white.png");
  cat_tan = loadImage("assets/sprite_sheet_orange.png");
  cat_charzard = loadImage("assets/sprite_sheet_orange_mom.png");

  skinChoice = cat_tan;
  skin_selection = loadImage("assets/skin_select_button.png");

  rat1 = loadImage("assets/rat.png");
  rat_blue = loadImage("assets/rat_blue.png");
  rat_parmesan = loadImage("assets/rat_parmesan.png");
  rat_cake = loadImage("assets/rat_cake.png");

  rat_boss = loadImage("assets/rat_boss.png");
  rat_boss_blue = loadImage("assets/rat_boss_blue.png");
  rat_boss_parmesan = loadImage("assets/rat_boss_parmesan.png");
  rat_boss_cake = loadImage("assets/rat_boss_cake.png");


  icu = loadImage("assets/interface.png");
  heart = loadImage("assets/heart.png");
  inventory1 = loadImage("assets/inventory.png");
  level_nacho = loadImage("assets/level_nacho.png");
  level_cheeseCake = loadImage("assets/level_cheesecake.png");
  level_blueCheese = loadImage("assets/level_blueCheese.png");
  level_parmesan = loadImage("assets/level_parmesan.png");

  homepage_sound = loadSound("assets/homepage_sound.mp3");

  map1_theme = loadSound("assets/map1_theme.mp3");
  map2_theme = loadSound("assets/map2_theme.mp3");
  map3_theme = loadSound("assets/map3_theme.mp3");
  map4_theme = loadSound("assets/map4_theme.mp3");

  loose_heart = loadSound("assets/loose_heart.mp3");

  rocket = loadImage("assets/rocket.png");

  overmusic = loadSound("assets/GameOver.mp3");
  slides_track = loadSound("assets/Slides1.0.mp3");
  victory_music = loadSound("assets/Victory.mp3");
  openchestSound = loadSound("assets/tp_chest_open.mp3");
  potion_drink = loadSound("assets/potion_drink.mp3");
  potion_collect = loadSound("assets/potion_collect.mp3");
  sword_collect = loadSound("assets/sword_collect.mp3");
  sword_hit = loadSound("assets/sword_hit.mp3");
  punch_sound = loadSound("assets/punch.mp3");

  button_beep = loadSound("assets/button_beep.mp3");
  meow = loadSound("assets/meow.mp3");

  gate_up = loadSound("assets/gate_up.mp3");
  gate_down = loadSound("assets/gate_down.mp3");

  rat_squeak1 = loadSound("assets/rat_squeak1.mp3");
  rat_squeak2 = loadSound("assets/rat_squeak2.mp3");

  roar1 = loadSound("assets/roar1.mp3");
  roar2 = loadSound("assets/roar2.mp3");


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
  bow = loadImage("assets/bow.png");
  bow_selected = loadImage("assets/bow_selected.png");

  floorTileset = loadImage("assets/atlas_floor-16x16.png");
  wallTileset = loadImage("assets/atlas_walls_high-16x32.png");
  chestTileset = loadImage("assets/Chest.png");
  sewerTileset = loadImage("assets/sewer_1.png");
  royalTileset = loadImage("assets/royal.png");
  royalTileset2 = loadImage("assets/royal_2.png");

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
  controls1 = loadImage("assets/controls1.png");
  controls2 = loadImage("assets/controls2.png");

  wasd = loadImage("assets/wasd.png");
  wasd_s = loadImage("assets/wasd_s.png");
  wasd_a = loadImage("assets/wasd_a.png");
  wasd_d = loadImage("assets/wasd_d.png");
  wasd_w = loadImage("assets/wasd_w.png");
  spacebar = loadImage("assets/spacebar.png");
  spacebar_selected = loadImage("assets/spacebar_selected.png");
  snowTileset = loadImage("assets/FE8 - Snowy Bern.png");

  for (let i = 0; i <= 9; i++) {
    digitImages[i] = loadImage("assets/" + i + ".png");
  }

  //Attack Animations
  attack_down = loadImage("assets/AttackAnimation/slash_down.png");
  attack_up = loadImage("assets/AttackAnimation/slash_up.png");
  attack_left = loadImage("assets/AttackAnimation/slash_left.png");
  attack_right = loadImage("assets/AttackAnimation/slash_right.png");

  arrow_weapon = loadImage("assets/arrow_weapon.png");
  potion_strength = loadImage("assets/potion_boost.png");
  potion_strength_selected = loadImage("assets/potion_boost_selected.png");
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

  shootArrow();
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


  bowItem = new Item([bow, bow_selected], false, { type: "bow", damage: 15, health: 0 });
  potion_strength_item = new Item([potion_strength, potion_strength_selected], false, { type: "strengthPotion", damage: 20, health: 0 });

  chestInventory_nacho[0] = [new Item([sword_nacho, sword_nacho_selected], false, { damage: 10, health: 0 }), new Item([potion, potion_selected], false, { damage: 0, health: 50 })];
  chestInventory_nacho[1] = [new Item([potion, potion_selected], false, { damage: 0, health: 50 }), potion_strength_item];
  chestInventory_blueCheese[0] = [new Item([sword_blueCheese, sword_blueCheese_selected], false, { damage: 15, health: 0 }), new Item([potion, potion_selected], false, { damage: 0, health: 50 })];
  chestInventory_blueCheese[1] = [potion_strength_item, bowItem];
  chestInventory_parmesan[0] = [new Item([sword_parmesan, sword_parmesan_selected], false, { damage: 20, health: 0 }), new Item([potion, potion_selected], false, { damage: 0, health: 50 })];
  chestInventory_parmesan[1] = [new Item([potion, potion_selected], false, { damage: 0, health: 50 }), bowItem];
  chestInventory_cheeseCake[0] = [new Item([sword_cheeseCake, sword_cheeseCake_selected], false, { damage: 25, health: 0 }), new Item([potion, potion_selected], false, { damage: 0, health: 50 })];
  chestInventory_cheeseCake[1] = [new Item([potion, potion_selected], false, { damage: 0, health: 50 }), potion_strength_item];
}


function button(image1, x, y, w, h) {
  // button(start_game2, 310, 150, start_game2.width / 7 * scale, start_game2.height / 6 * scale);

  // // controls button
  // button(controls2, 430, 330, controls2.width / 11 * scale, controls2.height / 9 * scale);

  // // skins button
  // button(skins2, 445, 240, skins2.width / 7 * scale, skins2.height / 6 * scale);

  image(image1, x, y, w, h);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    if (image1 === start_game2) {
      image(start_game1, 310, 150, start_game1.width / 7 * scale, start_game1.height / 6 * scale);
    } else if (image1 === skins2) {
      image(skins1, 445, 240, skins1.width / 7 * scale, skins1.height / 6 * scale);
    } else if (image1 === controls2) {
      button(controls1, 430, 330, controls1.width / 11 * scale, controls1.height / 9 * scale);
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
      image(skip1, 475, 354, skip1.width / 14, skip1.height / 12);
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
    } else if (image1 === controls2) {
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
  if (mapClearedActive) {
    gameStart();
    mapClearedPage();
    return;
  }
  if (mapTransitionActive) {
    mapTransitionPage();
    return; // stop drawing the game until transition ends
  }

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
    controlsPage();
  }
}

function controlsPage() {
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

  if (Math.floor(random(0, 15)) === 0) {
    scale -= 0.005;
  }

  button(return2, 20, 20, return2.width / 7 * scale, return2.height / 6 * scale);
  image(controls1, 395, 20, controls1.width / 7 * scale, controls1.height / 6 * scale);

  textSize(11);
  textFont('Courier New');

  fill(0);
  text("Move using WASD", 321, 226);
  text("or Arrow Keys", 321, 246);
  fill(255);
  text("Move using WASD", 319, 225);
  text("or Arrow Keys", 319, 245);
  text("Move using WASD", 320, 225);
  text("or Arrow Keys", 320, 245);

  if (keyCode === UP_ARROW || key === "w") {
    image(wasd_w, 320, 120, wasd_w.width / 6 * scale, wasd_w.height / 6 * scale);
    image(arrow_up, 460, 148, arrow_up.width / 9 * scale, arrow_up.height / 9 * scale);
  } else if (keyCode === DOWN_ARROW || key === "s") {
    image(wasd_s, 320, 120, wasd_s.width / 6 * scale, wasd_s.height / 6 * scale);
    image(arrow_down, 460, 148, arrow_down.width / 9 * scale, arrow_down.height / 9 * scale);
  } else if (keyCode === LEFT_ARROW || key === "a") {
    image(wasd_a, 320, 120, wasd_a.width / 6 * scale, wasd_a.height / 6 * scale);
    image(arrow_left, 460, 148, arrow_left.width / 9 * scale, arrow_left.height / 9 * scale);
  } else if (keyCode === RIGHT_ARROW || key === "d") {
    image(wasd_d, 320, 120, wasd_d.width / 6 * scale, wasd_d.height / 6 * scale);
    image(arrow_right, 460, 148, arrow_right.width / 9 * scale, arrow_right.height / 9 * scale);
  } else {
    image(wasd, 320, 120, wasd.width / 6 * scale, wasd.height / 6 * scale);
    image(arrow, 460, 148, arrow.width / 9 * scale, arrow.height / 9 * scale);
  }

  fill(0);
  text("press enter to pick up", 141, 291);
  text("or swap selected item", 141, 311);
  fill(255);
  text("press enter to pick up", 139, 290);
  text("or swap selected item", 139, 310);
  text("press enter to pick up", 140, 290);
  text("or swap selected item", 140, 310);
  if (keyCode === ENTER) {
    image(enter_selected, 20, 270, enter_selected.width / 9 * scale, enter_selected.height / 9 * scale);
  } else {
    image(enter, 20, 270, enter.width / 9 * scale, enter.height / 9 * scale);
  }

  fill(0);
  text("press backspace to", 141, 231);
  text("drop selected item", 141, 251);
  fill(255);
  text("press backspace to", 139, 230);
  text("drop selected item", 139, 250);
  text("press backspace to", 140, 230);
  text("drop selected item", 140, 250);
  if (keyCode === BACKSPACE) {
    image(backspace_selected, 20, 202, backspace_selected.width / 9 * scale, backspace_selected.height / 9 * scale);
  } else {
    image(backspace, 20, 202, backspace.width / 9 * scale, backspace.height / 9 * scale);
  }

  fill(0);
  text("press shift to", 141, 356);
  text("use potion", 141, 376);
  fill(255);
  text("press shift to", 139, 355);
  text("use potion", 139, 375);
  text("press shift to", 140, 355);
  text("use potion", 140, 375);
  if (keyCode === SHIFT) {
    image(shift_selected, 20, 335, shift_selected.width / 9 * scale, shift_selected.height / 9 * scale);
  } else {
    image(shift, 20, 335, shift.width / 9 * scale, shift.height / 9 * scale);
  }

  fill(0);
  text("use number keys 1-3 to", 141, 161);
  text("select item in inventory", 141, 181);
  fill(255);
  text("use number keys 1-3 to", 139, 160);
  text("select item in inventory", 139, 180);
  text("use number keys 1-3 to", 140, 160);
  text("select item in inventory", 140, 180);
  if (key === "1") {
    image(number_1, 20, 140, number.width / 11 * scale, number.height / 10 * scale);
  } else if (key === "2") {
    image(number_2, 20, 140, number.width / 11 * scale, number.height / 10 * scale);
  } else if (key === "3") {
    image(number_3, 20, 140, number.width / 11 * scale, number.height / 10 * scale);
  } else {
    image(number, 20, 140, number.width / 11 * scale, number.height / 10 * scale);
  }

  fill(0);
  text("attack using spacebar", 441, 321);
  fill(255);
  text("attack using spacebar", 440, 320);
  text("attack using spacebar", 439, 320);
  if (key === " ") {
    image(spacebar_selected, 425, 330, spacebar_selected.width / 9 * scale, spacebar_selected.height / 9 * scale);
  } else {
    image(spacebar, 425, 330, spacebar.width / 9 * scale, spacebar.height / 9 * scale);
  }
}

function resetGame() {
  // player stats
  lives = 3;
  playerHealth = PLAYERHEALTHMAX;
  attackCooldown = 0;

  // map state
  planet = 1;
  completedPlanets = [];
  g = 0;
  fightRooms = [];
  chests = [];
  spikeWalls = [];
  enemies = [];
  planetClearing = false;

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

  first = 0;
  totalEnemies = 0;
  star = 0;
}

function homePage() {
  scale = 1;
  backgroundMoveSpeed = 0.5;
  overmusic.stop();
  victory_music.stop();

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
  button(start_game2, 310, 150, start_game2.width / 7 * scale, start_game2.height / 6 * scale);

  // controls button
  button(controls2, 430, 330, controls2.width / 11 * scale, controls2.height / 9 * scale);

  // skins button
  button(skins2, 445, 240, skins2.width / 7 * scale, skins2.height / 6 * scale);
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
  for (let t of [map1_theme, map2_theme, map3_theme, map4_theme]) {
    if (t && t.isPlaying()) t.stop();
  }

  homepage_sound.stop();
}

function playSlideSound(index) {
  // stop all slide sounds first
  for (let s of slideSounds) {
    if (s.isPlaying()) s.stop();
  }

  // play the correct one if it exists
  if (slideSounds[index]) {
    slideSounds[index].setVolume(0.9);
    slideSounds[index].play();
  }
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
  const storyGifs = [story1, story2, story3, story4, story5, story6];
  if (currentSlide < storyGifs.length) {
    image(storyGifs[currentSlide], 0, 0, pageWidth, pageHeight);
  }

  // --- FADE OVERLAY ---
  fill(0, 0, 0, 255 - slideAlpha);
  noStroke();
  rect(0, 0, pageWidth, pageHeight);


  // --- FADE LOGIC ---
  if (fadeState === "in") {
    if (message_noti && !message_noti.isPlaying()) {
      message_noti.setVolume(0.9);
      message_noti.play();
    }

    slideAlpha = min(slideAlpha + FADE_SPEED, 255);
    if (slideAlpha >= 255) {
      fadeState = "hold";
      fadeTimer = 0;

      playSlideSound(currentSlide);
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
        currentSlide >= storyGifs.length
      ) {
        onBackstoryComplete();
        return;
      }

      fadeState = "in";
    }
  }

  // --- SKIP BUTTON ---
  button(skip2, 475, 354, skip2.width / 14, skip2.height / 12);
}

function mapTransitionPage() {
  stopAllSounds();
  let elapsed = millis() - mapTransitionStart;

  // --- BACKGROUND ---
  image(transition_background, 0, 0, pageWidth, pageHeight);

  // --- ROCKET ANIMATION ---
  push();
  imageMode(CENTER);

  rocketX += 6;   // move right
  rocketY -= 4;   // move up

  image(rocket, rocketX, rocketY, 120, 120);

  pop();

  // --- FADE IN ---
  if (elapsed < 500) {
    let alpha = map(elapsed, 0, 500, 255, 0);
    fill(0, alpha);
    rect(0, 0, pageWidth, pageHeight);
  }

  // --- FADE OUT ---
  if (elapsed > MAP_TRANSITION_DURATION - 500) {
    let alpha = map(elapsed, MAP_TRANSITION_DURATION - 500, MAP_TRANSITION_DURATION, 0, 255);
    fill(0, alpha);
    rect(0, 0, pageWidth, pageHeight);
  }

  // --- END TRANSITION ---
  if (elapsed >= MAP_TRANSITION_DURATION) {
    mapTransitionActive = false;
  }
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

  mapTransitionActive = true;
  mapTransitionStart = millis();

  rocketX = -150;
  rocketY = pageHeight + 150;

  if (transition_sound && !transition_sound.isPlaying()) {
    transition_sound.setVolume(0.8);
    transition_sound.play();
  }
}

function initMapObjects(map) {
  fightRooms = [];
  chests = [];
  spikeWalls = [];
  enemies = [];

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
            activateTimer: -1,
            isBossRoom: false
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
  const isSnowMap = (map === mapData_parmesan);
  if (chestsLayer) {
    for (let i = 0; i < chestsLayer.data.length; i++) {
      const tileId = chestsLayer.data[i];
      if (tileId === 0) continue;
      const tsFirstgid = getTilesetFirstgid(map, tileId);
      const localID = tileId - tsFirstgid;
      console.log("chest tileId:", tileId, "tsFirstgid:", tsFirstgid, "localID:", localID);

      if (localID === 24) {
        const col = i % map.width;
        const row = Math.floor(i / map.width);
        spikeWalls.push({
          x: col * 16 * mapScale,
          y: row * 16 * mapScale,
          raised: false,
          wasRaised: false,
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
  for (let enemy of enemies) {
    if (enemy.type === "boss") {
      for (let i = 0; i < fightRooms.length; i++) {
        let r = fightRooms[i];
        if (enemy.x >= r.x && enemy.x <= r.x + r.w &&
          enemy.y >= r.y && enemy.y <= r.y + r.h) {
          enemy.roomIndex = i;
          if (enemy.type === "boss") fightRooms[i].isBossRoom = true;
          break;
        }
      }
    }
  }

  for (let enemy of enemies) {
    if (enemy.roomIndex != -1) continue;
    let closest = -1;
    let closestDist = Infinity;
    for (let i = 0; i < fightRooms.length; i++) {
      let r = fightRooms[i];
      let cx = r.x + r.w / 2;
      let cy = r.y + r.h / 2;
      let d = dist(enemy.x, enemy.y, cx, cy);
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    }
    enemy.roomIndex = closest;
  }

  for (let spike of spikeWalls) {
    let r = fightRooms[spike.roomIndex];
    if (r && r.isBossRoom) {
      spike.raised = true;
      spike.wasRaised = true;
      spike.animFrame = 3;
      spike.animTimer = millis();
    }
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
  } else if (next === 2 && typeof mapData_blueCheese !== 'undefined') {
    currentMap = mapData_blueCheese;
  } else if (next === 3 && typeof mapData_parmesan !== 'undefined') {
    currentMap = mapData_parmesan;
  } else if (next === 4 && typeof mapData_cheeseCake !== 'undefined') {
    currentMap = mapData_cheeseCake;
  } else {
    // fallback to nacho if map not ready yet
    currentMap = mapData_nacho;
    planet = 1;
  }
  planetClearing = false;

  mapTransitionActive = true;
  mapTransitionStart = millis();

  if (transition_sound && !transition_sound.isPlaying()) {
    transition_sound.setVolume(0.8);
    transition_sound.play();
  }

  rocketX = -150;
  rocketY = pageHeight + 150;



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
      if (r.isBossRoom) {
        let nonBossRoomsCleared = fightRooms.every((room, idx) => idx === i || room.cleared || room.isBossRoom);
        if (nonBossRoomsCleared) {
          r.activateTimer = millis();
        }
      } else {
        r.activateTimer = millis();
      }
    }

    // raise spikes after 1500ms delay
    if (r.activateTimer > 0 && millis() - r.activateTimer > 1000 && !r.active) {
      let stillInRoom = playerX > r.x && playerX < r.x + r.w &&
        playerY > r.y && playerY < r.y + r.h;
      if (stillInRoom) {
        r.active = true;
        for (let spike of spikeWalls) {
          if (spike.roomIndex === i && !spike.raised) {
            spike.raised = true;
            spike.animFrame = 0;
            spike.animTimer = millis();
          }
        }
      }
    }

    if (r.active) {
      let roomEnemies = enemies.filter(e => e.roomIndex === i);
      let alive = roomEnemies.filter(e => e.alive);
      console.log("room", i, "roomEnemies:", roomEnemies.length, "alive:", roomEnemies.filter(e => e.alive).length);
      for (let e of alive) {
        console.log("  enemy at", Math.floor(e.x), Math.floor(e.y), "state:", e.state);
      }
      let allDefeated = roomEnemies.length > 0 && roomEnemies.every(e => !e.alive);
      if (allDefeated) {
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
        if (!r.isBossRoom) {
          let nonBossRoomsCleared = fightRooms.every((room, idx) => room.cleared || room.isBossRoom);
          if (nonBossRoomsCleared) {
            for (let spike of spikeWalls) {
              let bossRoom = fightRooms[spike.roomIndex];
              if (bossRoom && bossRoom.isBossRoom) {
                spike.raised = false;
                spike.animFrame = 0;
                spike.animTimer = millis();
              }
            }
          }
        }
        let allRoomsCleared = fightRooms.length > 0 && fightRooms.every(r => r.cleared);
        if (allRoomsCleared && !planetClearing) {
          planetClearing = true;
          mapClearedActive = true;
          mapClearedTimer = millis();
          mapClearedAlpha = 0;
          mapClearedParticles = [];
        }
      }
    }
  }
}

function drawChests() {
  const OPEN_TILE = 199;
  var index = 0;
  for (let chest of chests) {
    if (chest.opened) {
      chestItem(index, chest.x, chest.y);
      index++;
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
    index++;
  }
}

const SPIKE_FRAMES_RAISE = [[21, 100], [22, 100], [23, 100], [24, 2000]];
const SPIKE_FRAMES_RETRACT = [[24, 100], [23, 100], [22, 100], [21, 2000]];

function drawSpikeWalls() {
  if (!spikeWalls || spikeWalls.length === 0) return;

  const tileW = 16;
  const now = millis();

  for (let spike of spikeWalls) {
    // detect state change and play sound
    if (spike.raised && !spike.wasRaised) {
      gate_up.setVolume(0.4);
      gate_up.play();
      spike.wasRaised = true;
    } else if (!spike.raised && spike.wasRaised) {
      gate_down.setVolume(0.4);
      gate_down.play();
      spike.wasRaised = false;
    }

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

function playRandomRatSqueak() {
  if (random() < 0.5) rat_squeak1.play();
  else rat_squeak2.play();
}

function playRandomBossRoar() {
  if (random() < 0.5) roar1.play();
  else roar2.play();
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
function collidesWithPlayer() {
  for (let e of enemies) {
    if (!e.alive) continue;
    d = dist(playerX, playerY, e.x, e.y);
    return d < 20; // collision threshold, adjust as needed
  }
}

function drawArrows() {
  for (let i = arrows.length - 1; i >= 0; i--) {
    hitEnemy = false;
    let a = arrows[i];
    a.x += a.dx * 8;
    a.y += a.dy * 8;

    // white projectiles
    fill(255);
    rect(a.x, a.y, 16, 4);

    //when arrow hits enemy
    for (let e of enemies) {
      if (!e.alive) continue;
      let d = dist(a.x, a.y, e.x, e.y);
      if (d < 20) {
        e.health -= 10;
        e.knockbackX = a.dx * 5;
        e.knockbackY = a.dy * 5;
        if (e.health <= 0) {
          e.alive = false;
          if (e.type === "boss") {
            playRandomBossRoar();
          } else {
            playRandomRatSqueak();
          }
        }
        arrows.splice(i, 1);
        hitEnemy = true;
        break;
      } 
    }
    if (hitEnemy) continue;
  }
}


function shootArrow() {
  let equipped = getEquippedItem();

  if (equipped && equipped.data.type === "bow") {
    if (millis() - lastBowShot < bowCoolDown) return; // 500ms cooldown
    lastBowShot = millis();

    let worldMouseX = cam.x + mouseX;
    let worldMouseY = cam.y + mouseY;

    let dx = worldMouseX - playerX;
    let dy = worldMouseY - playerY;

    let d = dist(playerX, playerY, worldMouseX, worldMouseY);

    if (d > 0) {
      dx /= d;
      dy /= d;
    }

    arrows.push({
      x: playerX,
      y: playerY,
      dx: dx,
      dy: dy,
      angle: atan2(dy, dx)
    });

  }
}

function bowAttack() {
  let equipped = getEquippedItem();
  if (!equipped && equipped.data.type !== "bow") {
    return
  } else {

    shootArrow();
  }
}


function drawEnemy() {

  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    if (!e.alive) continue;

    let dx = playerX - e.x;
    let dy = playerY - e.y;
    let d = dist(playerX, playerY, e.x, e.y);

    if (collidesWithPlayer()) {
      if (d > 0) {
        e.x -= (dx / d) * 2;
        e.y -= (dy / d) * 2;
      }
    }

    // only activate if player is in the same room
    let r = fightRooms[e.roomIndex];
    let playerInRoom = r && playerX > r.x && playerX < r.x + r.w &&
      playerY > r.y && playerY < r.y + r.h;

    if (!playerInRoom) {
      e.state = "wander";
    } else {
      if (d <= e.attackRange) e.state = "attack";
      else if (d <= e.detectionRange) e.state = "chase";
      else e.state = "wander";
    }

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
      let roll = random(100);
      let dmg;
      let popupColor;

      if (roll < 20) {
        dmg = 0;
        popupColor = color(200, 200, 200);
      } else if (roll < 50) {
        dmg = 4;
        popupColor = color(255, 150, 0);
      } else if (roll < 85) {
        dmg = 8;
        popupColor = color(255, 50, 50);
      } else {
        dmg = 16;
        popupColor = color(255, 0, 250);
      }

      playerHealth = max(0, playerHealth - dmg);

      if (e.type === "boss") {
        playRandomBossRoar();
      } else {
        playRandomRatSqueak();
      }

      e.attackCooldown = 90;
      attackPopups.push({ x: e.x, y: e.y, damage: dmg, miss: dmg === 0, crit: dmg === 16, col: popupColor, timer: millis() });

      e.jumpVelocity = -6;

      attackPopups.push({ x: e.x, y: e.y, damage: dmg, miss: dmg === 0, crit: dmg === 16, col: popupColor, timer: millis() });
    }

    if (e.attackCooldown > 0) e.attackCooldown--;

    // move enemy
    let nextX = e.x + moveX;
    let nextY = e.y + moveY;
    let w = e.type === "boss" ? BOSS_FRAME_W * 0.15 : RAT_FRAME_W;
    let h = e.type === "boss" ? BOSS_FRAME_H * 0.15 : RAT_FRAME_H[dirRow];

    if (e.knockbackX !== 0 || e.knockbackY !== 0) {
      nextX += e.knockbackX;
      nextY += e.knockbackY;
      e.knockbackX *= 0.8;
      e.knockbackY *= 0.8;
      if (abs(e.knockbackX) < 0.1) e.knockbackX = 0;
      if (abs(e.knockbackY) < 0.1) e.knockbackY = 0;
    }

    if (r) {
      nextX = constrain(nextX, r.x, r.x + r.w - w);
      nextY = constrain(nextY, r.y, r.y + r.h - h);
    }
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
    let img, fw, fh, ry;
    if (e.type === "boss") {
      if (planet === 1) img = rat_boss;
      else if (planet === 2) img = rat_boss_blue;
      else if (planet === 3) img = rat_boss_parmesan;
      else if (planet === 4) img = rat_boss_cake;

      fw = BOSS_FRAME_W;
      fh = BOSS_FRAME_H;
      ry = BOSS_ROW_Y[dirRow];
    } else {
      if (planet === 1) img = rat1;
      else if (planet === 2) img = rat_blue;
      else if (planet === 3) img = rat_parmesan;
      else if (planet === 4) img = rat_cake;

      fw = RAT_FRAME_W;
      fh = RAT_FRAME_H[dirRow];
      ry = RAT_ROW_Y[dirRow];
    }

    let sx = (frameCount % 15 < 5 ? 0 : frameCount % 15 < 10 ? 1 : 2) * fw;
    let drawW = e.type === "boss" ? fw * 0.15 : fw;
    let drawH = e.type === "boss" ? fh * 0.15 : fh;

    if (e.jumpVelocity !== 0 || e.jumpOffset !== 0) {
      e.jumpOffset += e.jumpVelocity;
      e.jumpVelocity += 1.2; // gravity pulls back down
      if (e.jumpOffset >= 0) {
        e.jumpOffset = 0;
        e.jumpVelocity = 0;
      }
    }

    image(img, e.x, e.y + e.jumpOffset, drawW, drawH, sx, ry, fw, fh);

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

function AttackAnimation() {
  if (!isAttacking) return;

  let attackImg;
  if (frameCurrRow == 1) {
    attackImg = attack_up;
  } else if (frameCurrRow == 3) {
    attackImg = attack_right;
  } else if (frameCurrRow == 0) {
    attackImg = attack_down;
  } else if (frameCurrRow == 2) {
    attackImg = attack_left;
  }

  let sx = attackFrame * ATTACK_FRAME_W;
  image(attackImg, playerX, playerY, ATTACK_FRAME_W, ATTACK_FRAME_H, sx, 0, ATTACK_FRAME_W, ATTACK_FRAME_H);


  if (millis() - lastAttackFrameTime > ATTACK_INTERVAL) {
    attackLastSwitch = millis();
    attackFrame++;

    if (attackFrame >= ATTACK_FRAME_COUNT) {
      isAttacking = false;
      attackFrame = 0;
    }
  }
}

function drawCat(player) {
  let itemSize = 16;
  let sx = currentFrame * frameWidth;
  let sy = frameHeight * frameCurrRow;

  let equipped = getEquippedItem();

  let centerX = SPRITE_W / 2;
  let centerY = SPRITE_H / 2;
  let offsetX = 0;
  let offsetY = 0;

  if (equipped != null) {
    if (equipped.data.type === "bow") {
      //make bow bigger on hand
      itemSize = 20;
    }
    if (frameCurrRow === 3) {
      offsetX = centerX + 4;
      offsetY = centerY - 4;
    } else if (frameCurrRow === 2) {
      offsetX = centerX - 12;
      offsetY = centerY - 4;
    } else if (frameCurrRow === 0) {
      offsetX = centerX - 4;
      offsetY = centerY + 2;
    } else if (frameCurrRow === 1) {
      offsetX = centerX + 2;
      offsetY = centerY - 12;
    }
  }

  // draw attack animation BEHIND cat if facing up
  if (frameCurrRow === 1 && isAttacking) {
    AttackAnimation();
  }

  // draw equipped item BEHIND cat if facing up
  if (equipped != null && frameCurrRow === 1) {
    image(equipped.image_display(), playerX + offsetX, playerY + offsetY, itemSize, itemSize);
  }

  // draw cat
  image(player, playerX, playerY, SPRITE_W, SPRITE_H, sx, sy, frameWidth, frameHeight);

  // draw attack animation IN FRONT of cat for all other directions
  if (frameCurrRow !== 1 && isAttacking) {
    AttackAnimation();
  }

  // draw equipped item IN FRONT of cat for all other directions
  if (equipped != null && frameCurrRow !== 1) {
    image(equipped.image_display(), playerX + offsetX, playerY + offsetY, itemSize, itemSize);
  }

  // movement
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

  if (attackCooldown > 0) attackCooldown--;

  if (playerHealth <= 0) {
    playerHealth = 0;
    lives--;
    if (lives > 0) {
      const spawn = getSpawnPoint(currentMap);
      playerX = spawn.x;
      playerY = spawn.y;
      playerHealth = PLAYERHEALTHMAX;
    } else {
      page = 3;
    }
  }

  // attack
  if (keyIsDown(32)) { // space
    if (attackCooldown == 0) {
      isAttacking = true;
      attackFrame = 0;
      attackLastSwitch = millis();
      lastAttackFrameTime = millis();
    }
    playerAttackRange = 30 + (equipped ? equipped.data.damage : 0);
    for (let e of enemies) {
      if (!e.alive) continue;
      let d = dist(playerX, playerY, e.x, e.y);
      if (e.state !== "wander" && d <= playerAttackRange && attackCooldown === 0) {

        let damage = PLAYER_ATTACK + playerAttackBoost + (equipped ? equipped.data.damage : 0);

        e.range = playerAttackRange / 2;
        e.health -= damage;
        attackCooldown = 40;

        let knockbackDist = 8;
        if (equipped && equipped.data.damage > 0) knockbackDist = 18;

        if (d > 0) {
          let dx = e.x - playerX;
          let dy = e.y - playerY;
          let len = sqrt(dx * dx + dy * dy);
          e.knockbackX = (dx / len) * knockbackDist;
          e.knockbackY = (dy / len) * knockbackDist;
        }

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

  if (strengthPotionActive) {
    fill(255, 0, 255, 100);
    ellipse(playerX + 16, playerY + 16, 40, 40);
    text("STRENGTH BOOST!", playerX + 16, playerY - 10);
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
  slideSound1.stop();
  slideSound2.stop();
  slideSound3.stop();
  slideSound4.stop();
  slideSound5.stop();
  slideSound6.stop();

  const mapThemes = [map1_theme, map2_theme, map3_theme, map4_theme];
  const currentTheme = mapThemes[planet - 1];

  // stop all map themes that shouldn't be playing
  for (let i = 0; i < mapThemes.length; i++) {
    if (mapThemes[i] && mapThemes[i] !== currentTheme && mapThemes[i].isPlaying()) {
      mapThemes[i].stop();
    }
  }

  // play the correct one
  if (audioUnlocked && currentTheme && !currentTheme.isPlaying()) {
    currentTheme.setVolume(0.2);
    currentTheme.loop();
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
  drawArrows();
  pop();

  attackPopups = attackPopups.filter(p => millis() - p.timer < 1000);
  for (let p of attackPopups) {
    let sx = p.x - cam.x;
    let sy = p.y - cam.y;
    let digitW = p.crit ? 14 : 10;
    let digitH = p.crit ? 14 : 10;

    if (p.miss) {
      textSize(10);
      textFont('Courier New');
      fill(200, 200, 200);
      textAlign(CENTER);
      text("MISS", sx, sy);
      textAlign(LEFT); // reset
    } else {
      drawSpriteNumber(str(p.damage), sx, sy, digitW, digitH);
    }

    p.y -= 0.5;
  }

  IU(lives, playerHealth, inventory1, inventory2);
  if (playerHealth <= 0 && lives <= 1) {
    page = 3; // game over
  } else if (playerHealth <= 0) {
    lives--;

    if (loose_heart) loose_heart.play();

    playerHealth = PLAYERHEALTHMAX;

  }
  if (g == 0) {
    initMapObjects(currentMap);
    console.log("spikeWalls:", spikeWalls.length);
    console.log("fightRooms:", fightRooms.length);
    g++;
  }

  if (strengthPotionActive && millis() - strengthPotionTimer > 15000) { // 15 second duration
    strengthPotionActive = false;
    playerAttackBoost = 0;
  }


  if (first == 0) {
    startTime = millis();
    first++;
  }
  if (enemies.filter(e => e.alive).length === enemies.length) {
    totalEnemies = enemies.length;
    droppedInventory = [];
    droppedSize = 0;

  }
  textSize(12);
  textFont('Courier New');
  fill(0);
  text("Enemies: " + (totalEnemies - enemies.filter(e => e.alive).length) + "/" + totalEnemies, 482, 81);
  fill(255);
  text("Enemies: " + (totalEnemies - enemies.filter(e => e.alive).length) + "/" + totalEnemies, 480, 80);
  text("Enemies: " + (totalEnemies - enemies.filter(e => e.alive).length) + "/" + totalEnemies, 481, 80);
}

function drawSpriteNumber(numStr, x, y, digitW, digitH) {
  let spacing = digitW + 2;
  let totalWidth = numStr.length * spacing;
  let startX = x - totalWidth / 2;

  for (let i = 0; i < numStr.length; i++) {
    let ch = numStr[i];
    if (ch >= '0' && ch <= '9') {
      image(digitImages[int(ch)], startX + i * spacing, y, digitW, digitH);
    }
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
  const isSewerMap = (map === mapData_blueCheese);
  const isRoyalMap = (map === mapData_cheeseCake);


  for (let layer of map.layers) {
    if (layer.type !== "tilelayer") continue;
    for (let i = 0; i < layer.data.length; i++) {
      const tileId = layer.data[i];
      if (tileId === 0) continue;

      const col = i % mapCols;
      const row = Math.floor(i / mapCols);
      const x = col * tileW * mapScale;
      const y = row * tileW * mapScale;

      if (layer.name === "chests") {
        let tsFirstgid = getTilesetFirstgid(map, tileId);
        let localID = tileId - tsFirstgid;
        if (localID === 24) continue; // spike tile, skip
        const srcX = (localID % 3) * tileW;
        const srcY = Math.floor(localID / 3) * tileW;
        image(chestTileset, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
        continue;
      }

      if (isSnowMap) {
        const localID = tileId - 1;
        const srcX = (localID % 32) * tileW;
        const srcY = Math.floor(localID / 32) * tileW;
        image(snowTileset, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
      } else if (isSewerMap) {
        const localID = tileId - 1;
        const srcX = (localID % 16) * tileW;
        const srcY = Math.floor(localID / 16) * tileW;
        image(sewerTileset, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
      } else if (isRoyalMap) {
        if (tileId >= 2049) {
          // test3 chest tileset
          const localID = tileId - 2049;
          const srcX = (localID % 3) * tileW;
          const srcY = Math.floor(localID / 3) * tileW;
          image(chestTileset, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
        } else if (tileId >= 1025) {
          const localID = tileId - 1025;
          const srcX = (localID % 32) * tileW;
          const srcY = Math.floor(localID / 32) * tileW;
          image(royalTileset2, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
        } else {
          const localID = tileId - 1;
          const srcX = (localID % 32) * tileW;
          const srcY = Math.floor(localID / 32) * tileW;
          image(royalTileset, x, y, tileW * mapScale, tileW * mapScale, srcX, srcY, tileW, tileW);
        }
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

function getTilesetFirstgid(map, tileId) {
  let firstgid = 1;
  for (let ts of map.tilesets) {
    if (ts.firstgid <= tileId) firstgid = ts.firstgid;
    else break;
  }
  return firstgid;
}

function getChestFirstgid(map) {
  for (let ts of map.tilesets) {
    let name = ts.source || ts.name || "";
    if (name.includes("Chest") || name.includes("chest") || name.includes("test3")) {
      return ts.firstgid;
    }
  }
  return 194;
}

function isWallTile(worldX, worldY) {
  const tileW = 16 * mapScale;
  const col = Math.floor(worldX / tileW);
  const row = Math.floor(worldY / tileW);
  if (col < 0 || row < 0 || col >= currentMap.width || row >= currentMap.height) return true;
  const isSnowMap = (currentMap === mapData_parmesan);
  const isSewerMap = (currentMap === mapData_blueCheese);
  const isRoyalMap = (currentMap === mapData_cheeseCake);

  let hasFloor = false;
  for (let layer of currentMap.layers) {
    if (layer.type !== "tilelayer") continue;
    if (isSnowMap) {
      if (layer.name !== "Floors" && layer.name !== "Walls") continue;
      const tileId = layer.data[row * currentMap.width + col];
      if (layer.name === "Walls" && tileId !== 0) return true;
      if (layer.name === "Floors" && tileId !== 0) hasFloor = true;
    } else if (isSewerMap) {
      if (layer.name !== "floors" && layer.name !== "walls") continue;
      const tileId = layer.data[row * currentMap.width + col];
      if (layer.name === "walls" && tileId !== 0) return true;
      if (layer.name === "floors" && tileId !== 0) hasFloor = true;

    } else if (isRoyalMap) {
      if (layer.name !== "floors" && layer.name !== "walls") continue;
      const tileId = layer.data[row * currentMap.width + col];
      if (layer.name === "walls" && tileId !== 0) return true;
      if (layer.name === "floors" && tileId !== 0) hasFloor = true;
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
  playerHealth = PLAYERHEALTHMAX;
  if (audioUnlocked && !overmusic.isPlaying()) {
    overmusic.setVolume(0.4);
    overmusic.loop();
  }


  for (let t of [map1_theme, map2_theme, map3_theme, map4_theme]) {
    if (t && t.isPlaying()) t.stop();
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
    textSize(20);
    fill(255);
    textFont('Courier New');
    if (first === 1) {
      timeTaken = floor((millis() - startTime) / 1000);
      first++;
    }
    var minutes = floor(timeTaken / 60);
    var seconds = timeTaken % 60;
    var timeString = nf(minutes, 2) + ":" + nf(seconds, 2);
    fill(0);
    text("Time Taken: " + timeString, 202, 201);
    fill(255);
    text("Time Taken: " + timeString, 200, 200);
    text("Time Taken: " + timeString, 201, 200);
  }


  // return button
  button(return2, 205, 260, return2.width / 4 * scale, return2.height / 4 * scale);
}

function victoryPage() {
  scale = 1;
  if (audioUnlocked && !victory_music.isPlaying()) {
    victory_music.loop();
  }

  for (let t of [map1_theme, map2_theme, map3_theme, map4_theme]) {
    if (t && t.isPlaying()) t.stop();
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
    textSize(20);
    fill(255);
    textFont('Courier New');

    if (first === 1) {
      timeTaken = floor((millis() - startTime) / 1000);
      first++;
    }
    var minutes = floor(timeTaken / 60);
    var seconds = timeTaken % 60;
    var timeString = nf(minutes, 2) + ":" + nf(seconds, 2);
    fill(0);
    text("Time Taken: " + timeString, 202, 201);
    fill(255);
    text("Time Taken: " + timeString, 200, 200);
    text("Time Taken: " + timeString, 201, 200);

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

function mapClearedPage() {
  // darken background
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, 0, pageWidth, pageHeight);

  // fade in the image
  mapClearedAlpha = min(mapClearedAlpha + 5, 255);

  // freeze cat facing forward
  frameCurrRow = 0;
  currentFrame = 3;

  // particles
  if (frameCount % 3 === 0) {
    mapClearedParticles.push({
      x: random(pageWidth),
      y: random(pageHeight),
      size: random(3, 8),
      alpha: 255,
      col: random([color(255, 220, 80), color(255, 255, 255), color(200, 100, 100)])
    });
  }
  for (let i = mapClearedParticles.length - 1; i >= 0; i--) {
    let p = mapClearedParticles[i];
    p.alpha -= 6;
    p.y -= 0.5;
    if (p.alpha <= 0) {
      mapClearedParticles.splice(i, 1);
      continue;
    }
    noStroke();
    fill(red(p.col), green(p.col), blue(p.col), p.alpha);
    rect(p.x, p.y, p.size, p.size);
  }

  // draw map cleared image centered
  tint(255, mapClearedAlpha);
  image(
    mapCleared_img,
    pageWidth / 2 - (mapCleared_img.width / 4) / 2,
    pageHeight / 2 - (mapCleared_img.height / 4) / 2,
    mapCleared_img.width / 4,
    mapCleared_img.height / 4
  );
  noTint();

  // after 2.5 seconds, trigger transition
  if (millis() - mapClearedTimer > 2500) {
    mapClearedActive = false;
    mapClearedAlpha = 0;
    mapClearedParticles = [];
    planetClearing = true;
    loadRandomPlanet();
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
    this.knockbackX = 0;
    this.knockbackY = 0;
    this.jumpOffset = 0;
    this.jumpVelocity = 0;
  }
}

function chestItem(index, x, y) {
  chestSelect();
  displayItem();
  swapChest();


  function displayItem() {
    for (let i = 0; i < 2; i++) {
      if (chestInventory[planet - 1][index][i] != null) {
        image(chestInventory[planet - 1][index][i].image_display(), x - 20 + i * 20, y - 30, 20, 20);
        textSize(8);
        fill(255);
        text("use 9 & 0 to select", x - 30, y - 40);
        text("Enter to pick up", x - 30, y - 30);
      }
    }


  }

  function chestSelect() {
    if (keyCode === 57) {
      if (chestInventory[planet - 1][index][0] != null) {
        chestInventory[planet - 1][index][0].selected = true;
      }
      if (chestInventory[planet - 1][index][1] != null) {
        chestInventory[planet - 1][index][1].selected = false;
      }
    } else if (keyCode === 48) {
      if (chestInventory[planet - 1][index][0] != null) {
        chestInventory[planet - 1][index][0].selected = false;
      }
      if (chestInventory[planet - 1][index][1] != null) {
        chestInventory[planet - 1][index][1].selected = true;
      }
    }
  }

  function swapChest() {
    var swapped = false;
    if (!swapped && keyCode === ENTER && click && size < 3) {
      for (let i = 0; i < chestInventory[planet - 1][index].length; i++) {
        if (chestInventory[planet - 1][index][i] != null && chestInventory[planet - 1][index][i].selected) {
          if (chestInventory[planet - 1][index][i].data.damage > 0) {
            sword_collect.setVolume(0.3);
            sword_collect.play();
          } else {
            potion_collect.setVolume(0.3);
            potion_collect.play();
          }

          addItem(chestInventory[planet - 1][index][i]);
          chestInventory[planet - 1][index][i].selected = false;
          chestInventory[planet - 1][index][i] = null;
        }
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

      if (inventory2[i] != null && (inventory2[i].image_display() === potion_selected || inventory2[i].image_display() === potion) && keyCode === SHIFT && !potionJustUsed) {
        potionJustUsed = true;
        playerHealth = min(playerHealth + inventory2[i].data.health, PLAYERHEALTHMAX);
        potion_drink.setVolume(0.3);
        potion_drink.play();
        for (let j = i; j < size - 1; j++) {
          inventory2[j] = inventory2[j + 1];
        }
        inventory2[size - 1] = null;
        size--;
        break;
      }
      if (inventory2[i] != null && (inventory2[i].image_display() === potion_strength_selected || inventory2[i].image_display() === potion_strength) && keyCode === SHIFT && !potionJustUsed) {
        potionJustUsed = true;
        playerAttackBoost = 5 + inventory2[i].data.damage;
        strengthPotionTimer = millis();
        strengthPotionActive = true;
        setTimeout(() => {
          playerAttackBoost = 0;
        }, 15000);
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

  function healthBar(maxHealth = PLAYERHEALTHMAX) {
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
