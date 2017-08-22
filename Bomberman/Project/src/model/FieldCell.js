class FieldCell {
	constructor(typeCell, posY, posX) {
		this._type = typeCell;
		this._posX = posX * CELL_SIZE;
		this._posY = posY * CELL_SIZE;
	}

	type() {
		return this._type;
	}

	getCreateTime(time) {
		this._createTime = time;
	}
}