function moveCreature(creature) {
	if (!endOfGame && !creature.kill)
	{
		switch (creature.direction)
		{
			case Direction.UP:
				moveUp(creature);
				break;
			case Direction.RIGHT:
				moveRight(creature);
				break;
			case Direction.DOWN:
				moveDown(creature);
				break;
			case Direction.LEFT:
				moveLeft(creature);
		}
	}
}

function changeDirection(monster) {
	monster.direction = Math.floor(Math.random() * 4);
}

function moveUp(creature) {
	let j = Math.floor(creature.posX / Config.CELL_SIZE);
	let i = Math.floor(creature.posY / Config.CELL_SIZE);

	const upRowIndex = i - 1;
	const upRow = field[upRowIndex];

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature._moveSpeed;

	if (upRowIndex >= 0)
	{
		for (let currColumn = Math.max(0, j - 1); (currColumn < upRow.length) && (currColumn <= j + 1) ; ++currColumn)
		{
			if (upRow[currColumn].type() != FieldType.GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: currColumn * Config.CELL_SIZE, top: upRowIndex * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};

				if ( MathUtils.intersectsVertical(creatureRect, wallRect) )
				{
					wallFound = true;

					const delta = Math.max(0, creatureRect.top - (wallRect.top + wallRect.height) );
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;

					break;
				}
			}
		}
	}

	if (!wallFound)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
			{
				stayOnBomb = true;
				break;
			}
		}
	}

	if (!wallFound && !stayOnBomb)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
			{
				const delta = creatureRect.top - (objectRect.top + objectRect.height);

				if (delta >= 0 && delta < Config.CELL_SIZE)
				{
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;
					break;
				}
			}
		}
	}

	if ( (dy == 0) && (creature instanceof Monster) )
	{
		changeDirection(creature)
	}
	else
	{
		creature.posY = creature.posY - dy;
		creature.direction = Direction.UP;
	}
}

function moveDown(creature) {
	let j = Math.floor(creature.posX / Config.CELL_SIZE);
	let i = Math.floor(creature.posY / Config.CELL_SIZE);

	const downRowIndex = i + 1;
	const downRow = field[downRowIndex];

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature._moveSpeed;

	if ( (downRowIndex < Config.COUNT_OF_CELLS_HEIGHT) && (downRowIndex >= 0) )
	{
		for (let currColumn = Math.max(0, j - 1); (currColumn < downRow.length) && (currColumn <= j + 1) ; ++currColumn)
		{
			if (downRow[currColumn].type() != FieldType.GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: currColumn * Config.CELL_SIZE, top: downRowIndex * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};

				if (MathUtils.intersectsVertical(creatureRect, wallRect))
				{
					wallFound = true;

					const delta = Math.max(0, wallRect.top - (creatureRect.top + creatureRect.height) );
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;

					break;
				}
			}
		}
	}

	if (!wallFound)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
			{
				stayOnBomb = true;
				break;
			}
		}
	}

	if (!wallFound && !stayOnBomb)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
			{
				const delta = objectRect.top - (creatureRect.top + creatureRect.height); // player.y - (bomb.y + bomb.height)

				if (delta >= 0 && delta < Config.CELL_SIZE)
				{
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;
					break;
				}
			}
		}
	}

	if ( (dy == 0) && (creature instanceof Monster) )
	{
		changeDirection(creature)
	}
	else
	{
		creature.posY = creature.posY + dy;
		creature.direction = Direction.DOWN;
	}
}

function moveRight(creature) {
	let j = Math.floor(creature.posX / Config.CELL_SIZE);
	let i = Math.floor(creature.posY / Config.CELL_SIZE);

	const rightRowIndex = j + 1;
	const rightRow = field;

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature._moveSpeed;

	if ( (rightRowIndex < Config.WIDTH / Config.CELL_SIZE) && (rightRowIndex >= 0) )
	{
		for (let currColumn = Math.max(0, i - 1); (currColumn < rightRow.length) && (currColumn <= i + 1) ; ++currColumn)
		{
			if (rightRow[currColumn][rightRowIndex].type() != FieldType.GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: rightRowIndex * Config.CELL_SIZE, top: currColumn * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};

				if ( MathUtils.intersectsHorisontal(creatureRect, wallRect) )
				{
					wallFound = true;

					const delta = Math.max(0, wallRect.left - (creatureRect.left + creatureRect.width) ); //player.y - wall.y + wall.height
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;

					break;
				}
			}
		}
	}

	if (!wallFound)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
			{
				stayOnBomb = true;
				break;
			}
		}
	}

	if (!wallFound && !stayOnBomb)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
			{
				const delta = objectRect.left - (creatureRect.left + creatureRect.width);

				if (delta >= 0 && delta < Config.CELL_SIZE)
				{
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;
					break;
				}
			}
		}
	}

	if ( (dy == 0) && (creature instanceof Monster) )
	{
		changeDirection(creature)
	}
	else
	{
		creature.posX = creature.posX + dy;
		creature.direction = Direction.RIGHT;
	}
}

function moveLeft(creature) {
	let j = Math.floor(creature.posX / Config.CELL_SIZE);
	let i = Math.floor(creature.posY / Config.CELL_SIZE);

	const leftRowIndex = j - 1;
	const leftRow = field;

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature._moveSpeed;

	if (leftRowIndex >= 0)
	{
		for (let currColumn = Math.max(0, i - 1); (currColumn < leftRow.length) && (currColumn <= i + 1) ; ++currColumn)
		{
			if (leftRow[currColumn][leftRowIndex].type() != FieldType.GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: leftRowIndex * Config.CELL_SIZE, top: currColumn * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};

				if ( MathUtils.intersectsHorisontal(creatureRect, wallRect) )
				{
					wallFound = true;

					const delta = Math.max(0, creatureRect.left - (wallRect.left + wallRect.width) );
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;

					break;
				}
			}
		}
	}

	if (!wallFound)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
			{
				stayOnBomb = true;
				break;
			}
		}
	}

	if (!wallFound && !stayOnBomb)
	{
		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

		for (const bomb of bombs)
		{
			let objectRect = {
				left: bomb.posX,
				top: bomb.posY,
				width: Config.BOMB_SIZE,
				height: Config.BOMB_SIZE
			};

			if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
			{
				const delta = creatureRect.left - (objectRect.left + objectRect.height);

				if (delta >= 0 && delta < Config.CELL_SIZE)
				{
					dy = delta < creature._moveSpeed ? delta : creature._moveSpeed;
					break;
				}
			}
		}
	}

	if ( (dy == 0) && (creature instanceof Monster) )
	{
		changeDirection(creature)
	}
	else
	{
		creature.posX = creature.posX - dy;
		creature.direction = Direction.LEFT;
	}
}