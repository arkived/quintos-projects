// canvas width is 256, height is 192

// create the sprite variables outside the setup function so you
// can use them in other functions
let ball, paddleR, paddleL;

let scoreL = 0;
let scoreR = 0;

// code in the setup function gets run once at the start of the game
function setup() {
	noStroke(); // disable black outlines around shapes
	allSprites.pixelPerfect = true;

	let imgBall = spriteArt(`
..wwww..
.ww..ww.
ww....ww
w......w
w......w
ww....ww
.ww..ww.
..wwww..`);

	let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'ww....ww\n'.repeat(42) + 'wwwwwwww\n.wwwwww.');

	// creates a ball sprite and places it in center of the screen
	ball = new Sprite();
	ball.image = imgBall;
	ball.x = canvas.w / 2;
	ball.y = canvas.h / 2;
	ball.diameter = 8;
	ball.bounciness = 1; // full bounciness
	ball.friction = 0; // no friction
	ball.direction = 45;

	// TODO: create paddle sprites
	paddleL = new Sprite();
	paddleL.image = imgPaddle;
	paddleL.x = 10;
	paddleL.y = 90;
	paddleL.collider = 'k';
	// Left paddle
	paddleR = new Sprite();
	paddleR.image = imgPaddle;
	paddleR.x = 240;
	paddleR.y = 90;
	paddleR.collider = 'k';

	//wall
	let imgwall = spriteArt(
		'w'.repeat(256) +
			'\n' +
			'w w '.repeat(64) +
			'\n' +
			' w  '.repeat(64) +
			'\n' +
			'w w '.repeat(64) +
			'\n' +
			'w'.repeat(256)
	);

	wallone = new Sprite();
	wallone.x = 128;
	wallone.y = 10;
	wallone.image = imgwall;
	wallone.collider = 's';
	wallone.colour = 'w';

	walltwo = new Sprite();
	walltwo.x = 128;
	walltwo.y = 180;
	walltwo.image = imgwall;
	walltwo.collider = 's';
	walltwo.colour = 'w';
}

// code in the draw function gets run 60 times per second
function draw() {
	background('b');
	// TODO: move the paddles
	paddleL.speed = 3;
	paddleR.speed = 3;
	if (kb.pressing('w') && paddleL.y > 35) {
		paddleL.direction = -90;
	} else if (kb.pressing('s') && paddleL.y < 158) {
		paddleL.direction = 90;
	} else {
		paddleL.speed = 0;
	}
	if (kb.pressing('i') && paddleR.y > 35) {
		paddleR.direction = -90;
	} else if (kb.pressing('k') && paddleR.y < 158) {
		paddleR.direction = 90;
	} else {
		paddleR.speed = 0;
	}

	// if the ball goes off the screen
	if (ball.x < -30 || ball.x > 280) {
		// if ball went to the left
		if (ball.x < -30) {
			scoreR += 1;
			txt(scoreR, 20, 30);
			if (random() > 0.5) {
				ball.direction = 45;
			} else {
				ball.direction = -45;
			}
		}
		// if ball went to the right
		if (ball.x > 280) {
			scoreL += 1;
			txt(scoreL, 20, 1);
			if (random() > 0.5) {
				ball.direction = 225;
			} else {
				ball.direction = -225;
			}
		}
		ball.x = 128;
		ball.y = 96;
		ball.speed = 0;
	}
	if (kb.pressing('space')) {
		ball.speed = 2;
	}

	if (ball.collided(paddleR) || ball.collided(paddleL)) {
		ball.speed = 2;
	}
	if (ball.collided(paddleL)) {
		if (paddleL.y + paddleL.hh > ball.y && paddleL.y - paddleL.hh < ball.y && paddleL.x < ball.x) {
			ball.direction = random(-45, 45);
		}
	}
	if (ball.collided(paddleR)) {
		if (paddleR.y + paddleR.hh > ball.y && paddleR.y - paddleR.hh < ball.y && paddleR.x > ball.x) {
			ball.direction = random(135, 225);
		}
	}
}
