function getField(level) {
	let field = [];

	let fieldJson = level.slice(0);

	for (let i = 0; i < fieldJson.length; ++i)
	{
		let currLine = [];

		for (let j = 0; j < fieldJson[i].length; ++j)
		{
			switch(fieldJson[i][j]) {
				case FieldType.GRASS:
					currLine.push( new FieldCell(FieldType.GRASS, i, j) );
					break;
				case FieldType.IRON:
					currLine.push( new FieldCell(FieldType.IRON, i, j) );
					break;
				case FieldType.CEMENT:
					currLine.push( new FieldCell(FieldType.CEMENT, i, j) );
					break;
			}
		}

		field.push(currLine);
	}

	return field;
}