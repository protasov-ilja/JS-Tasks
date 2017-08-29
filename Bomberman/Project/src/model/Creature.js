class Creature {
	constructor(startTimeAnimation, sprites, spritesKill, x, y, liveCount, speed, size, stepTime) {
		this.posX = x;
		this.posY = y;
		this.live = liveCount;
		this.direction = Direction.DOWN;
		this._moveSpeed = speed;
		this.spriteSize = size;
		this._sprites = sprites;
		this._spritesKill = spritesKill;
		this._killTime = null;
		this._startTimeAnimation = startTimeAnimation;
		this._stepDuration = stepTime;
		this.kill = false;
		this.killAnimationPlaying = false;
		this.killAnimationComplete = false;
	}

	setKillTime(time) {
		this._killTime = time;
	}

	getCurrStep(numberOfFrames) {
		let time = (!this.kill) ? this._startTimeAnimation : this._killTime;
		let currTime = ( Date.now() ) - time;
		let progressAnimation = currTime % (this._stepDuration * numberOfFrames); // прогресс анимации

		progressAnimation = Math.floor(progressAnimation / ( (this._stepDuration * numberOfFrames) / numberOfFrames) );

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
			let animation = this._sprites;

			stepAnimation = animation[this.direction];
		}
		else
		{
			stepAnimation = this._spritesKill;
		}

		let currAnimation = stepAnimation[this.getCurrStep(stepAnimation.length)];

		return currAnimation;
	}
}