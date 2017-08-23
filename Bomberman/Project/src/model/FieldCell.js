class FieldCell {
	constructor(typeCell, posY, posX) {
		this._type = typeCell;
		this._posX = posX * Config.CELL_SIZE;
		this._posY = posY * Config.CELL_SIZE;
	}

	type() {
		return this._type;
	}

	getCreateTime(time) {
		this._createTime = time;
	}
}