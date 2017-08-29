class Creature {
	constructor(startTimeAnimation, sprites, spritesDeath, x, y, liveCount, speed, size, stepTime) {
		this.posX = x;
		this.posY = y;
		this.live = liveCount;
		this.direction = Direction.DOWN;
		this.spriteSize = size;
		this.dying = false;
		this.dyingAnimationPlaying = false;
		this.dyingAnimationComplete = false;

		this._moveSpeed = speed;
		this._sprites = sprites;
		this._spritesDeath = spritesDeath;
		this._dyingTime = null;
		this._startTimeAnimation = startTimeAnimation;
		this._stepDuration = stepTime;
	}

	getRect() {
		return {
			left: this.posX,
			top: this.posY,
			width: this.spriteSize,
			height: this.spriteSize
		}
	}

	setDyingTime(time) {
		this._dyingTime = time;
	}

	getCurrStep(numberOfFrames) {
		let time = this.dying ? this._dyingTime : this._startTimeAnimation;
		let currTime = (Date.now()) - time;
		let progressAnimation = currTime % (this._stepDuration * numberOfFrames); // прогресс анимации

		progressAnimation = Math.floor(progressAnimation / ((this._stepDuration * numberOfFrames) / numberOfFrames));

		if ((this.dying) && (progressAnimation >= numberOfFrames - 1))
		{
			this.dyingAnimationComplete = true;
		}

		return progressAnimation;
	}

	getCurrSprite() {
		let stepAnimation = null;

		if (this.dying)
		{
			stepAnimation = this._spritesDeath;
		}
		else
		{
			stepAnimation = this._sprites[this.direction];
		}

		return stepAnimation[this.getCurrStep(stepAnimation.length)];
	}
}