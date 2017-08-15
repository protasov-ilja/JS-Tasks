class CementWall extends FieldCell {
	constructor(posY, posX) {
		super();
		this._posX = posX * CELL_SIZE;
		this._posY = posY * CELL_SIZE;
	}

	type() {
		return CEMENT;
	}
}