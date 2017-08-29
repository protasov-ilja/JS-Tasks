class FieldCell {
	constructor(typeCell) {
		this.posX = null;
		this.posY = null;

		this._type = typeCell;
	}

	type() {
		return this._type;
	}
}