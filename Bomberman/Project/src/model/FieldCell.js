class FieldCell {
	constructor(typeCell) {
		this.posX = 0;
		this.posY = 0;

		this._type = typeCell;
	}

	type() {
		return this._type;
	}
}