class FieldCell {
	constructor(typeCell, indexY, indexX) {
		this._type = typeCell;
		this._posX = indexX * Config.CELL_SIZE;
		this._posY = indexY * Config.CELL_SIZE;
	}

	type() {
		return this._type;
	}
}