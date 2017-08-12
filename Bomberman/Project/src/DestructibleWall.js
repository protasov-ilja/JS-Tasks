class CementWall extends FieldCell {
	constructor(posY, posX) {
		super();
		this._posX = posX * CELL_SIZE;
		this._posY = posY * CELL_SIZE;
		this._exploded = false;
		this._startExplodeTime = null;
	}

	type() {
		return CEMENT;
	}

	explode(time) {
		this._exploded = true;
		this._startExplodeTime = time;
	}

	isExploded() {
		return this._exploded;
	}

	isExplodeCompleted(currTime) {
		return currTime - this._startExplodeTime > this._startExplodeTime
	}

	getCurrentSprite(currTime) {
		//
	}
}