// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero_front.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Rock image
var rockReady = false;
var rockImage = new Image();
rockImage.onload = function () {
	rockReady = true;
};
rockImage.src = "images/rock.png";

// Plant image
var plantReady = false;
var plantImage = new Image();
plantImage.onload = function () {
	plantReady = true;
};
plantImage.src = "images/tree.png";


// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};

var rock = {};

var plant = {};

var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 96));  //it was - 64
	monster.y = 32 + (Math.random() * (canvas.height - 96)); //it was - 64

	// Throw the rock somewhere on the screen randomly
	rock.x = 32 + (Math.random() * (canvas.width - 96));
	rock.y = 32 + (Math.random() * (canvas.height - 96));

        // Throw the plant somewhere on the screen randomly
	plant.x = 32 + (Math.random() * (canvas.width - 96));
	plant.y = 32 + (Math.random() * (canvas.height - 96));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		heroImage.src = "images/hero_back.png";
		hero.y = (hero.y > 32) ? (hero.y - hero.speed * modifier) : hero.y;
	}

	if (40 in keysDown) { // Player holding down
		heroImage.src = "images/hero_front.png";
		hero.y = (hero.y < canvas.height - 64) ? (hero.y + hero.speed * modifier) % canvas.height : hero.y;
	}

	if (37 in keysDown) { // Player holding left
		heroImage.src = "images/hero_left.png";
		hero.x = (hero.x > 32) ? (hero.x - hero.speed * modifier) : hero.x;
	}

	if (39 in keysDown) { // Player holding right
		heroImage.src = "images/hero_right.png";
		hero.x = (hero.x < canvas.width - 64) ? (hero.x + hero.speed * modifier) % canvas.width : hero.x;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if (rockReady) {
		ctx.drawImage(rockImage, rock.x, rock.y);
	}

        if (plantReady) {
		ctx.drawImage(plantImage, plant.x, plant.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
