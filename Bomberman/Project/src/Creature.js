class Creature {
	constructor() {
		this.posX = START_POS_PLAYER;
		this.posY = START_POS_PLAYER;
		this.live = START_LIVE;
		this.direction = DOWN;
		this.moveSpeed = PLAYER_SPEED;
		this.spriteSize = PLAYER_SIZE;
		this.numberOfFrames = playerDownDirection.length;
		this.numberOfKillFrames = playerDeath.length;
		this.sprites = null;
		this.spritesKill = playerDeath;
		this.killTime = null;
		this.startTimeAnimation = null;
		this.stepDuration = 150;
		this.kill = false;
	}

	setKillTime(time) {
		this.killTime = time;
	}

	getCurrStep() {
		let currTime = ( new Date().getTime() ) - this.startTimeAnimation;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames) );

		return progressAnimation;
	}

	getKillStep() {
		let currTime = ( new Date().getTime() ) - this.killTime;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfKillFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfKillFrames) / this.numberOfKillFrames) );

		if (progressAnimation >= 1) {
			this.kill = false;
		}

		return progressAnimation;
	}

	getCurrSprite() {
	let stepAnimation = null;
	let currAnimation = null;

	if (!this.kill) {
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

		currAnimation = stepAnimation[this.getCurrStep()];
	} else {
		stepAnimation = this.spritesKill;
		currAnimation = stepAnimation[this.getKillStep()];
	}

	return currAnimation;
	}
}