class Creature {
	constructor(startTimeAnimation, sprites, spritesKill) {
		this.posX = Config.START_POS_PLAYER;
		this.posY = Config.START_POS_PLAYER;
		this.live = Config.START_LIVE;
		this.direction = Direction.DOWN;
		this.moveSpeed = Config.PLAYER_SPEED;
		this.spriteSize = Config.PLAYER_SIZE;
		this.sprites = null;
		this.spritesKill = playerDeath;
		this.killTime = null;
		this.startTimeAnimation = null;
		this.stepDuration = 150;
		this.kill = false;
		this.killAnimationPlaying = false;
		this.killAnimationComplete = false;
	}

	setKillTime(time) {
		this.killTime = time;
	}

	getCurrStep(numberOfFrames) {
		let time = (!this.kill) ? this.startTimeAnimation : this.killTime;
		let currTime = ( Date.now() ) - time;
		let progressAnimation = currTime % (this.stepDuration * numberOfFrames); // прогресс анимации

		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * numberOfFrames) / numberOfFrames) );

		if ( (this.kill) && (progressAnimation >= numberOfFrames - 1) )
		{
			this.killAnimationComplete = true;
		}

		return progressAnimation;
	}

	getCurrSprite() {
		let stepAnimation = null;

		if (!this.kill)
		{
			let animation = this.sprites;

			stepAnimation = animation[this.direction];
		}
		else
		{
			stepAnimation = this.spritesKill;
		}

		this.numberOfFrames = stepAnimation.length;

		let currAnimation = stepAnimation[this.getCurrStep(stepAnimation.length)];

		return currAnimation;
	}
}