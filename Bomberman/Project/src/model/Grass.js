class Grass extends FieldCell {
	constructor(posY, posX) {
		super();
		this._posX = posX * CELL_SIZE;
		this._posY = posY * CELL_SIZE;
		this.sprites = burst;
		this.wallAnimation = false;
	}

	type() {
		return GRASS;
	}

	getCreateTime(time) {
		this._createTime = time;
	}

	getCurrStep() {
		let currTime = ( Date.now() ) - this._createTime;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации

		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames) );

		if ( (this.wallAnimation) && (progressAnimation >= this.numberOfFrames - 1) ) {
			this.wallAnimation = false;
		}

		return progressAnimation;
	}

	getSprite(type) {
		let animation = this.sprites;
		let stepAnimation = animation[type];

		this.numberOfFrames = stepAnimation.length;

		let currAnimation = stepAnimation[this.getCurrStep()];

		return currAnimation;
	}
}