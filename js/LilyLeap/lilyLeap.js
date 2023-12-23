/**
 * @type {Sprite}
 */
let frog;

/**
 * @type {Group}
 */
let lilypads;

function preload() {
	frog = new Sprite();
	frog.addAni('hop', 'frog_jump.png', { frameSize: [32, 16], frames: 7 });
	lilypads = new Group();
	lilypads.addAni('lily', 'lilypads.png', { frameSize: [16, 16], frames: 12 });
}

function setup() {
	world.gravity.y = 10;
	noStroke();
	allSprites.pixelPerfect = true;

	frog.x = 0;
	frog.y = 80;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;
	frog.ani.stop();
	frog.layer = 2;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';
	lilypads.layer = 1;

	makeLilyPads();
}

function makeLilyPads() {
	// TODO: use a loop to make more lily pads
	// let i = 0;
	// while (i < 50) {
	// 	let lily = new lilypads.Sprite();
	// 	lily.x = i * 16;
	// 	i++;
	// }
	for (let i = 0; i < 50; i++) {
		let lily = new lilypads.Sprite();
		lily.x = i * 16;
		lily.ani.frame = round(random(0, 11));
		lily.ani.frameDelay = round(random(60, 200));
		let n;
		n = random(1, 100);
		if (n <= 30) {
			i++;
		}
	}
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, canvas.w, 90);
	if (frog.y >= 83 && frog.vel.y <= 0.1) {
		frog.x = round(frog.x / 16) * 16;
		frog.ani.stop();
		frog.ani.frame = 0;

		if (kb.presses('up')) {
			// little jump
			frog.ani.play();
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.95;
		} else if (kb.presses('right')) {
			// BIG jump!
			frog.ani.play();
			frog.velocity.y = -2;
			frog.velocity.x = 1.4;
		}
	}
	if (frog.y > 450) {
		frog.x = 0;
		frog.y = 80;
		frog.speed = 0;
	}

	camera.x = frog.x + 64;
}
