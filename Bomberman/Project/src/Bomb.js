const BOMB_TIMER = 5000;
const EXPLODING_TIME = 2000;
const BOMB_SIZE = 20;

class Bomb {
	constructor(createTime, _posX, _posY) {
		this.posX = _posX;
		this.posY = _posY;
		this.spriteSize = BOMB_SIZE;
		this._createTime = createTime;
		this._exploded = false;
		this._startExplodeTime = null;
		this._explodeDuration = EXPLODING_TIME;
		this.sprites = bombMove;
		this.stepDuration = 200;
		this.numberOfFrames = bombMove.length;
		this.explodeLenght = 3;
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

	getCurrStep() {
		let currTime = ( new Date().getTime() ) - this._createTime;
		let progressAnimation = currTime % (this.stepDuration * this.numberOfFrames); // прогресс анимации
		progressAnimation = Math.floor(progressAnimation / ( (this.stepDuration * this.numberOfFrames) / this.numberOfFrames));

		return progressAnimation;
	}

	getCurrTime() {
		return new Date().getTime();
	}

	getCurrSprite() {
		let stepAnimation = this.sprites;
		let currAnimation = stepAnimation[ this.getCurrStep() ];

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