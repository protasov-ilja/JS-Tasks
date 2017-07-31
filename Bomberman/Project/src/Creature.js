class Creature {
	constructor() {
		this.posX = START_POS_PLAYER;
		this.posY = START_POS_PLAYER;
		this.live = START_LIVE;
		this.direction = DOWN;
		this.moveSpeed = PLAYER_SPEED;
		this.spriteSize = PLAYER_SIZE;
		this.numberOfFrames = playerDownDirection.length;
		this.sprites = null;
		this.startTimeAnimation = null;
		this.stepDuration = 100;
	}

	getCurrStep() {
		let currTime = ( new Date().getTime() ) - this.startTimeAnimation;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames));

		return progressAnimation;
	}

	getCurrSprite() {
	let stepAnimation = null;
	let animation = this.sprites;

	switch (this.direction) {
		case DOWN:
			stepAnimation = animation[DOWN];
			break;
		case UP:
			stepAnimation = animation[UP];
			break;
		case LEFT:
			stepAnimation = animation[LEFT];
			break;
		case RIGHT:
			stepAnimation = animation[RIGHT];
			break;
	}
	let currAnimation = stepAnimation[this.getCurrStep()];

	return currAnimation;
	}
}