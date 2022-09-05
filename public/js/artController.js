let backgroundImage;
let backPackOriginal;
let backPack;
let defaultFont;
let backPackItems;

let prevBackPackPageClicker;
let nextBackPackPageClicker;

// items
let itemNameToImage;
let woolyHat;
let rock;
let compass;
let cookie;
let diamondDust;
let matches;
let milk;
let saucepan;
let spade;
let stick;
let waterBottle;
let toadStool;

let backPackPageNumber = false;

function snapToGrid(vec) {
  return createVector(
    parseInt(vec.x / 32) * 32 - 16,
    parseInt(vec.y / 32) * 32 - 16
  );
}

function preload() {
  for (let i = 0; i < CollectibleObject.objectImagesURI.length; i++) {
    const element = CollectibleObject.objectImagesURI[i];
    CollectibleObject.objectImages.push(loadImage(element));
  }
  for (let i = 0; i < Character.objectImagesURI.length; i++) {
    const element = Character.objectImagesURI[i];
    Character.objectImages.push(loadImage(element));
  }

  backgroundImage = loadImage(backgroundImagePath);
  signImage = loadImage("/static/sign.png");
  backPackOriginal = loadImage("/static/backpack.png");

  defaultFont = loadFont("/static/VT323-Regular.ttf");

	// items
	woolyHat = loadImage("/static/images/sprites/hat-done.png");
	rock = loadImage("/static/images/sprites/rock.png");
	compass = loadImage("/static/images/sprites/compass.png");
  cookie = loadImage("/static/images/sprites/cookie.png");
  diamondDust = loadImage("/static/images/sprites/diamond.png");
  matches = loadImage("/static/images/sprites/matches.png");
  milk = loadImage("/static/images/sprites/milk.png");
  saucepan = loadImage("/static/images/sprites/saucepan.png");
  spade = loadImage("/static/images/sprites/spade.png");
  stick = loadImage("/static/images/sprites/stick.png");
  waterBottle = loadImage("/static/images/sprites/water-bottle.png");
  toadStool = loadImage("/static/areaImages/path/toadstool.png");

	itemNameToImage = {
    WOOLY_HAT: woolyHat,
		ROCK: rock,
		COMPASS: compass,
		COOKIE: cookie,
		DIAMOND_DUST: diamondDust,
		MATCHES: matches,
		MILK: milk,
		SAUCEPAN: saucepan,
		SPADE: spade,
		STICK: stick,
		WATER_BOTTLE: waterBottle,
		TOADSTOOL: toadStool
  };
}

async function setup() {
  createCanvas(parseInt(windowWidth * 0.75), parseInt(windowHeight * 0.99));
  noSmooth();

  // calculate scaling factor
  BaseObject.scaleFactor = 1 + (windowHeight - 512) / 512;
  backPack = copyBackPack();

  backgroundImage.resize(
    512 * BaseObject.scaleFactor,
    512 * BaseObject.scaleFactor
  );
  signImage.resize(32 * BaseObject.scaleFactor, 32 * BaseObject.scaleFactor);
  backPack.resize(0, parseInt(windowHeight * 0.99));

  for (const obj of CollectibleObject.objects) {
    obj.updateImage();
  }
  for (const obj of Character.objects) {
    obj.updateImage();
  }

	backPackItems = [];
  backPackItems = await getItems();

	// i am sorry for this
	document.addEventListener('mousedown', function(mouseEvent) {
		const pos = getCanvasPosition();
		const mx = mouseEvent.clientX;
		const my = mouseEvent.clientY;
		const bpw = backPack.width * BaseObject.scaleFactor;
    const bph = backPack.height * BaseObject.scaleFactor;

		if (
      mx > pos[0]           &&
      my > pos[1] + bph / 2 &&
      mx < pos[0] + bpw / 2 &&
      my < pos[1] + bph
    ) {
			backPackPageNumber = !backPackPageNumber;
    }
	});

}

function draw() {
  background(48, 96, 130);
	cursor(ARROW);

	console.log(backPackPageNumber);

	// dynamic scaling
	backPack = copyBackPack();
  backPack.resize(0, parseInt(windowHeight * 0.99));

  const xoffset = windowWidth * 0.5 - 524;

  // ui code
  image(backPack, xoffset - backPack.width, 0);
  alignDiv((xoffset - backPack.width) + 15, 30);

  // game code
  translate(xoffset, 0);
  BaseObject.translateAll(xoffset, 0);
  image(backgroundImage, 0, 0);

  for (const obj of CollectibleObject.objects.concat(Character.objects)) {
    obj.update();
    obj.display();
  }

  for (const sign of Sign.signs) {
    sign.display();
  }

	placeItems(backPackItems, backPackPageNumber * 6);
}

function copyBackPack() {
	backPack = createImage(backPackOriginal.width, backPackOriginal.height);
	backPack.copy(
    backPackOriginal,
    0,
    0,
    backPack.width,
    backPack.height,
    0,
    0,
    backPackOriginal.width,
    backPackOriginal.height
  );
	return backPack;
}

function windowResized() {
  resizeCanvas(parseInt(windowWidth * 0.75), parseInt(windowHeight * 0.99));
}
