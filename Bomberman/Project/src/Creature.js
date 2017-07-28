class Creature {
	constructor() {
		this.posX = START_POS_PLAYER;
		this.posY = START_POS_PLAYER;
		this.live = START_LIVE;
		this.direction = DOWN;
		this.moveSpeed = PLAYER_SPEED;
		this.spriteSize = PLAYER_SIZE;
		this.numberOfFrames = playerDownDirection.length;
		this.startTimeAnimation = null;
		this.stepDuration = 100;
	}

	getCurrStep() {
		let currTime = ( new Date().getTime() ) - this.startTimeAnimation;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames));

		return progressAnimation;
	}
}