class CementWall extends FieldCell {
	constructor() {
		super();

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