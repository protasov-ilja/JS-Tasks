class FieldCell {
	constructor(typeCell, posY, posX) {
		this._type = typeCell;
		this._posX = posX * CELL_SIZE;
		this._posY = posY * CELL_SIZE;
		this.spriteSize = CELL_SIZE;
		this.sprites = burst;
		this.stepDuration = 200;
		this.numberOfFrames = burstCenter.length;
		this._createTime = null;
	}

	type() {
		return this._type;
	}

	getCreateTime(time) {
		this._createTime = time;
	}
}