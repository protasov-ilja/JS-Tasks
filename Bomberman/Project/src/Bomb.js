const BOMB_TIMER = 4000;
const EXPLODING_TIME = 200 * 4;
const BOMB_SIZE = 20;

class Bomb {
	constructor(createTime, x, y) {
		this.posX = x;
		this.posY = y;
		this.spriteSize = BOMB_SIZE;
		this._createTime = createTime;
		this._exploded = false;
		this._startExplodeTime = null;
		this._explodeDuration = EXPLODING_TIME;
		this.sprites = bombMove;
		this.stepDuration = 200;
		this.numberOfFrames = bombMove.length;
		this.explodeLenght = 2;
	}

	getCreateTime() {
		return this._createTime;
	}

	getExplodedTime() {
		return this._startExplodeTime;
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

	getCurrStep() {
		let currTime = ( Date.now() ) - this._createTime;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames));

		return progressAnimation;
	}

	getCurrTime() {
		return Date.now();
	}

	getCurrSprite() {
		let stepAnimation = this.sprites;
		this.numberOfFrames = stepAnimation.length;
		let currAnimation = stepAnimation[this.getCurrStep()];

		return currAnimation;
	}

	getFireBlocks() {
		return [
			{
				type: DOWN,
				rect: {x: 0, y: 30, width: 30, height: 30},
			},
			{
				type: UP,
				rect: {x: 0, y: -30, width: 30, height: 30},
			},
			{
				type: RIGHT,
				rect: {x: 30, y: 0, width: 30, height: 30},
			},
			{
				type: LEFT,
				rect: {x: -30, y: 0, width: 30, height: 30},
			},
			{
				type: CENTER,
				rect: {x: 0, y: 0, width: 30, height: 30},
			},
			{
				type: LONG_LEFT,
				rect: {x: 60, y: 0, width: 30, height: 30},
			},
			{
				type: LONG_UP,
				rect: {x: 0, y: 60, width: 30, height: 30},
			},
		]
	}
}