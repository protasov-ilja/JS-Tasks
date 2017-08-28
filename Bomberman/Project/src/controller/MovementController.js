document.onkeydown = function (event) {
	if (!endOfGame && !player.kill)
	{
		switch (event.keyCode)
		{
			case KeyCode.SPACE:
				stayBomb();
				break;
			case KeyCode.ARROW_UP:
			case KeyCode.W:
				event.preventDefault();
				player.direction = Direction.UP;
				player.mooving = true;

				break;
			case KeyCode.ARROW_RIGHT:
			case KeyCode.D:
				event.preventDefault();
				player.direction = Direction.RIGHT;
				player.mooving = true;

				break;
			case KeyCode.ARROW_DOWN:
			case KeyCode.S:
				event.preventDefault();
				player.direction = Direction.DOWN;
				player.mooving = true;

				break;
			case KeyCode.ARROW_LEFT:
			case KeyCode.A:
				event.preventDefault();
				player.direction = Direction.LEFT;
				player.mooving = true;
		}
	}
};

document.onkeyup = () => {
	if (!endOfGame)
	{
		switch (event.keyCode)
		{
			case KeyCode.ARROW_UP:
			case KeyCode.W:
				if (player.direction == Direction.UP)
				{
					player.mooving = false;
				}

				break;
			case KeyCode.ARROW_RIGHT:
			case KeyCode.D:
				if (player.direction == Direction.RIGHT)
				{
					player.mooving = false;
				}

				break;
			case KeyCode.ARROW_DOWN:
			case KeyCode.S:
				if (player.direction == Direction.DOWN)
				{
					player.mooving = false;
				}

				break;
			case KeyCode.ARROW_LEFT:
			case KeyCode.A:
				if (player.direction == Direction.LEFT)
				{
					player.mooving = false;
				}
		}
	}
};

function killPlayer(monster) {
	const playerRect = {
		left: player.posX,
		top: player.posY - player.moveSpeed,
		width: Config.PLAYER_SIZE,
		height: Config.PLAYER_SIZE
	};
	const monsterRect = {
		left: monster.posX,
		top: monster.posY - monster.moveSpeed,
		width: Config.MONSTER_SIZE,
		height: Config.MONSTER_SIZE
	};

	if ( MathUtils.intersectsRects(playerRect, monsterRect) ) {
		burstPlayer();
	}

	if (player.live < 0 && !player.kill)
	{
		endOfGame = true;
	}
	else if (player.killAnimationComplete)
	{
		player.killAnimationComplete = false;
		player.killAnimationPlaying = false;
		player.kill = false;

		if (player.live >= 0)
		{
			liveForm.innerHTML = '0' + player.live;
			player.startTimeAnimation = Date.now();
			player.posX = Config.START_POS_PLAYER;
			player.posY = Config.START_POS_PLAYER;
		}
	}
}

function IntersectCreatures(object) {
	for (let i = 0; i < monsters.length; ++i)
	{
		if ( intersect(object, monsters[i]) ) {
			if (!monsters[i].killAnimationPlaying)
			{
				monsters[i].setKillTime( Date.now() );
				monsters[i].killAnimationPlaying = true;
				monsters[i].kill = true;
			}
		}
	}

	if ( intersect(object, player) )
	{
		burstPlayer();
	}
}

function killMonster(monster) {
	if (monster.killAnimationComplete)
	{
		monster.killAnimationComplete = false;
		monster.killAnimationPlaying = false;
		monster.kill = false;
		return true;
	}
}

function burstPlayer() {
	if (!player.killAnimationPlaying)
	{
		player.setKillTime( Date.now() );
		player.killAnimationPlaying = true;
		player.kill = true;
		player.live--;
	}
}

function intersect(object, creature) {
		let creatureRect = {
			left: creature.posX,
			top: creature.posY,
			width: creature.spriteSize,
			height: creature.spriteSize
		};

		let objectRect = {
			left: object._posX,
			top: object._posY,
			width: Config.CELL_SIZE,
			height: Config.CELL_SIZE
		};

	return MathUtils.intersectsRects(objectRect, creatureRect);
}

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

function stayBomb() {
	if (bombCount < Config.START_BOMB_COUNT)
	{
		let x = Math.round(player.posX / Config.CELL_SIZE) * Config.CELL_SIZE;
		let y = Math.round(player.posY / Config.CELL_SIZE) * Config.CELL_SIZE;

		bombCount++;
		bombs.push( new Bomb(Date.now(), x, y) );
	}
}

function logicOfExplode(bomb) {
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
	let dy = creature.moveSpeed;

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
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

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
				width: Config.CELL_SIZE,
				height: Config.CELL_SIZE
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
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
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
	let dy = creature.moveSpeed;

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
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

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
				width: Config.CELL_SIZE,
				height: Config.CELL_SIZE
			};

			if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
			{
				const delta = objectRect.top - (creatureRect.top + creatureRect.height); // player.y - (bomb.y + bomb.height)

				if (delta >= 0 && delta < Config.CELL_SIZE)
				{
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
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
	let dy = creature.moveSpeed;

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
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

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
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
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
	let dy = creature.moveSpeed;

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
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

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
					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
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