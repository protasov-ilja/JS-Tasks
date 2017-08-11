class Grass extends FieldCell {
	constructor() {
		super();
		this.sprites = burst;
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