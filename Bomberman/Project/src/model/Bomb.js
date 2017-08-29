class Bomb {
	constructor(createTime, x, y) {
		this.posX = x;
		this.posY = y;
		this.spriteSize = Config.BOMB_SIZE;
		this.explodeLenght = 2;

		this._createTime = createTime;
		this._exploded = false;
		this._startExplodeTime = null;
		this._explodeDuration = Config.EXPLODING_TIME;
		this._sprites = bombMove;
		this._normalStepDuration = 200;
		this._explodeStepDuration = 50;
		this._fireBlocks = [];
	}

	getRect() {
		return {
			left: this.posX,
			top: this.posY,
			width: Config.BOMB_SIZE,
			height: Config.BOMB_SIZE
		}
	}

	getCreateTime() {
		return this._createTime;
	}

	explode(time) {
		this._exploded = true;
		this._startExplodeTime = time;
	}

	isExploded() {
		return this._exploded;
	}

	isExplodeCompleted(currTime) {
		return currTime - this._startExplodeTime > this._explodeDuration; //текущее время - время взрыва > продолжительность взрыва
	}

	getCurrStep(numberOfFrames) {
		const duration = (this._exploded ? this._explodeStepDuration : this._normalStepDuration);

		let currTime = ( Date.now() ) - (this._exploded ? this._startExplodeTime : this._createTime);
		let progressAnimation = currTime % ( duration * numberOfFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( ( duration * numberOfFrames) / numberOfFrames) );

		return progressAnimation;
	}

	getCurrTime() {
		return Date.now();
	}

	getCurrSprite() {
		let stepAnimation = this._sprites;
		let currAnimation = stepAnimation[this.getCurrStep(stepAnimation.length)];

		return currAnimation;
	}

	addFireBlock(direction, type) {
		const delta = this._getFireBlocksDelta(direction);
		this._fireBlocks.push( {
			type: type,
			x: this.posX + delta.x,
			y: this.posY + delta.y
		} );
	}

	fireBlocks() {
		return this._fireBlocks;
	}

	_getFireBlocksDelta(direction) {
		switch (direction)
		{
			case Direction.CENTER:
				return {x: 0, y: 0};
			case Direction.DOWN:
				return {x: 0, y: Config.BOMB_SIZE};
			case Direction.UP:
				return {x: 0, y: -Config.BOMB_SIZE};
			case Direction.RIGHT:
				return {x: Config.BOMB_SIZE, y: 0};
			case Direction.LEFT:
				return {x: -Config.BOMB_SIZE, y: 0};
		}
	}
}