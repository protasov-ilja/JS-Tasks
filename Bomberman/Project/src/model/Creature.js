class Creature {
	constructor(startTimeAnimation, sprites) {
		this.posX = START_POS_PLAYER;
		this.posY = START_POS_PLAYER;
		this.live = START_LIVE;
		this.direction = DOWN;
		this.moveSpeed = PLAYER_SPEED;
		this.spriteSize = PLAYER_SIZE;
		this.numberOfFrames = playerDownDirection.length;
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

	getCurrStep() {
		let time = (!this.kill) ? this.startTimeAnimation : this.killTime;
		let currTime = ( Date.now() ) - time;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации

		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames));

		if ( (this.kill) && (progressAnimation >= this.numberOfFrames - 1) )
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

			switch (this.direction)
			{
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
		}
		else
		{
			stepAnimation = this.spritesKill;
		}

		this.numberOfFrames = stepAnimation.length;

		let currAnimation = stepAnimation[this.getCurrStep()];

		return currAnimation;
	}
}