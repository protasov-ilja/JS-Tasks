function stayBomb() {
	if (bombCount < Config.START_BOMB_COUNT)
	{
		let x = Math.round(player.posX / Config.CELL_SIZE) * Config.CELL_SIZE;
		let y = Math.round(player.posY / Config.CELL_SIZE) * Config.CELL_SIZE;

		bombCount++;
		bombs.push( new Bomb(Date.now(), x, y) );
	}
}

function getExplode(bomb) {
	let currPosX = Math.round(bomb.posX / Config.CELL_SIZE);
	let currPosY = Math.round(bomb.posY / Config.CELL_SIZE);

	bomb.addFireBlock(Direction.CENTER, Direction.CENTER);
	IntersectCreatures(field[currPosY][currPosX]);
	rightExplode(currPosY ,currPosX);
	leftExplode(currPosY ,currPosX);
	topExplode(currPosY ,currPosX);
	bottomExplode(currPosY ,currPosX);

	function rightExplode(PosY, PosX) {
		for (let j = PosX + 1; j < PosX + bomb.explodeLenght; ++j)
		{
			if (j < Config.WIDTH)
			{
				if (field[PosY][j].type() === FieldType.GRASS)
				{
					bomb.addFireBlock(Direction.RIGHT, Direction.RIGHT);

					IntersectCreatures(field[PosY][j]);
				}
				else if (field[PosY][j].type() === FieldType.CEMENT)
				{
					field[PosY][j] = new FieldCell(FieldType.GRASS, PosY, j);
					bomb.addFireBlock(Direction.RIGHT, Direction.WALL);
					break;
				}
				else
				{
					break;
				}
			}
		}
	}

	function leftExplode(PosY, PosX) {
		for (let j = PosX - 1; j > PosX - bomb.explodeLenght; --j)
		{
			if (j > 0) {
				if (j < Config.WIDTH)
				{
					if (field[PosY][j].type() === FieldType.GRASS)
					{
						bomb.addFireBlock(Direction.LEFT, Direction.LEFT);

						IntersectCreatures(field[PosY][j]);
					}
					else if (field[PosY][j].type() === FieldType.CEMENT)
					{
						field[PosY][j] = new FieldCell(FieldType.GRASS, PosY, j);
						bomb.addFireBlock(Direction.LEFT, Direction.WALL);
						break;
					}
					else
					{
						break;
					}
				}
			}
		}
	}

	function bottomExplode(PosY, PosX) {
		for (let i = PosY + 1; i < PosY + bomb.explodeLenght; ++i)
		{
			if (i < Config.HEIGHT) {
				if (field[i][PosX].type() === FieldType.GRASS)
				{
					bomb.addFireBlock(Direction.DOWN, Direction.DOWN);

					IntersectCreatures(field[i][PosX]);
				}
				else if (field[i][PosX].type() === FieldType.CEMENT)
				{
					field[i][PosX] = new FieldCell(FieldType.GRASS, i, PosX);
					bomb.addFireBlock(Direction.DOWN, Direction.WALL);
					break;
				}
				else
				{
					break;
				}
			}
		}
	}

	function topExplode(PosY, PosX) {
		for (let i = PosY - 1; i > PosY - bomb.explodeLenght; --i)
		{
			if (i > 0) {
				if (field[i][PosX].type() === FieldType.GRASS)
				{
					bomb.addFireBlock(Direction.UP, Direction.UP);

					IntersectCreatures(field[i][PosX]);
				}
				else if (field[i][PosX].type() === FieldType.CEMENT)
				{
					field[i][PosX] = new FieldCell(FieldType.GRASS, i, PosX);
					bomb.addFireBlock(Direction.UP, Direction.WALL);
					break;
				}
				else
				{
					break;
				}
			}
		}
	}
}