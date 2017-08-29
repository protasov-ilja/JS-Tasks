function getField(level) {
	let field = [];

	let fieldJson = level.slice(0);

	for (let i = 0; i < fieldJson.length; ++i)
	{
		let currLine = [];

		for (let j = 0; j < fieldJson[i].length; ++j)
		{
			let currCell;

			switch(fieldJson[i][j]) {
				case 0:
					currCell = new FieldCell(FieldType.GRASS);
					break;
				case 1:
					currCell = new FieldCell(FieldType.CEMENT);
					break;
				case 2:
					currCell = new FieldCell(FieldType.IRON);
					break;
			}

			currCell.posX = j * Config.CELL_SIZE;
			currCell.posY = i * Config.CELL_SIZE;
			currLine.push(currCell);
		}

		field.push(currLine);
	}

	return field;
}