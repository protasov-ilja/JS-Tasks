field = getField(LEVEL_1);

document.onkeydown = function (event) {
	if (!endOfGame && !player.kill)
	{
		switch (event.keyCode)
		{
			case SPACE:
				stayBomb();
				break;
			case ARROW_UP:
			case W:
				event.preventDefault();
				player.direction = UP;
				player.mooving = true;

				break;
			case ARROW_RIGHT:
			case D:
				event.preventDefault();
				player.direction = RIGHT;
				player.mooving = true;

				break;
			case ARROW_DOWN:
			case S:
				event.preventDefault();
				player.direction = DOWN;
				player.mooving = true;

				break;
			case ARROW_LEFT:
			case A:
				event.preventDefault();
				player.direction = LEFT;
				player.mooving = true;
		}
	}
};

document.onkeyup = () => {
	if (!endOfGame)
	{
		switch (event.keyCode)
		{
			case ARROW_UP:
			case W:
				if (player.direction == UP)
				{
					player.mooving = false;
				}

				break;
			case ARROW_RIGHT:
			case D:
				if (player.direction == RIGHT)
				{
					player.mooving = false;
				}

				break;
			case ARROW_DOWN:
			case S:
				if (player.direction == DOWN)
				{
					player.mooving = false;
				}

				break;
			case ARROW_LEFT:
			case A:
				if (player.direction == LEFT)
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
		width: PLAYER_SIZE,
		height: PLAYER_SIZE
	};
	const monsterRect = {
		left: monster.posX,
		top: monster.posY - monster.moveSpeed,
		width: MONSTER_SIZE,
		height: MONSTER_SIZE
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
			player.posX = START_POS_PLAYER;
			player.posY = START_POS_PLAYER;
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
			top: creature.posY - creature.moveSpeed,
			width: creature.spriteSize,
			height: creature.spriteSize
		};

		let objectRect = {
			left: object._posX,
			top: object._posY,
			width: CELL_SIZE,
			height: CELL_SIZE
		};

	return MathUtils.intersectsRects(objectRect, creatureRect);
}

function moveCreature(creature) {
	if (!endOfGame && !creature.kill)
	{
		switch (creature.direction)
		{
			case UP:
				moveUp(creature);
				break;
			case RIGHT:
				moveRight(creature);
				break;
			case DOWN:
				moveDown(creature);
				break;
			case LEFT:
				moveLeft(creature);
		}
	}
}

function stayBomb() {
	if (bombCount < START_BOMB_COUNT)
	{
		let x = Math.round(player.posX / CELL_SIZE) * CELL_SIZE;
		let y = Math.round(player.posY / CELL_SIZE) * CELL_SIZE;

		bombCount++;
		bombs.push( new Bomb(Date.now(), x, y) );
	}
}

function logicOfExplode(bomb) {
	let currPosX = Math.round(bomb.posX / CELL_SIZE);
	let currPosY = Math.round(bomb.posY / CELL_SIZE);

	bomb.addFireBlock(CENTER, CENTER);
	IntersectCreatures(field[currPosY][currPosX]);
	rightExplode(currPosY ,currPosX);
	leftExplode(currPosY ,currPosX);
	topExplode(currPosY ,currPosX);
	bottomExplode(currPosY ,currPosX);

	function rightExplode(PosY, PosX) {
		for (let j = PosX + 1; j < PosX + bomb.explodeLenght; ++j)
		{
			if (j < WIDTH)
			{
				if (field[PosY][j].type() === GRASS)
				{
					bomb.addFireBlock(RIGHT, RIGHT);

					IntersectCreatures(field[PosY][j]);
				}
				else if (field[PosY][j].type() === CEMENT)
				{
					field[PosY][j] = new FieldCell(GRASS, PosY, j);
					bomb.addFireBlock(RIGHT, WALL);
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
				if (j < WIDTH)
				{
					if (field[PosY][j].type() === GRASS)
					{
						bomb.addFireBlock(LEFT, LEFT);

						IntersectCreatures(field[PosY][j]);
					}
					else if (field[PosY][j].type() === CEMENT)
					{
						field[PosY][j] = new FieldCell(GRASS, PosY, j);
						bomb.addFireBlock(LEFT, WALL);
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
			if (i < HEIGHT) {
				if (field[i][PosX].type() === GRASS)
				{
					bomb.addFireBlock(DOWN, DOWN);

					IntersectCreatures(field[i][PosX]);
				}
				else if (field[i][PosX].type() === CEMENT)
				{
					field[i][PosX] = new FieldCell(GRASS, i, PosX);
					bomb.addFireBlock(DOWN, WALL);
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
				if (field[i][PosX].type() === GRASS)
				{
					bomb.addFireBlock(UP, UP);

					IntersectCreatures(field[i][PosX]);
				}
				else if (field[i][PosX].type() === CEMENT)
				{
					field[i][PosX] = new FieldCell(GRASS, i, PosX);
					bomb.addFireBlock(UP, WALL);
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
	let j = Math.floor(creature.posX / CELL_SIZE);
	let i = Math.floor(creature.posY / CELL_SIZE);

	const upRowIndex = i - 1;
	const upRow = field[upRowIndex];

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature.moveSpeed;

	if (upRowIndex >= 0)
	{
		for (let currColumn = Math.max(0, j - 1); (currColumn < upRow.length) && (currColumn <= j + 1) ; ++currColumn)
		{
			if (upRow[currColumn].type() != GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: currColumn * CELL_SIZE, top: upRowIndex * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE};

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
				width: CELL_SIZE,
				height: CELL_SIZE
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
				width: BOMB_SIZE,
				height: BOMB_SIZE
			};

			if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
			{
				const delta = creatureRect.top - (objectRect.top + objectRect.height);

				if (delta >= 0 && delta < CELL_SIZE)
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
		creature.direction = UP;
	}
}

function moveDown(creature) {
	let j = Math.floor(creature.posX / CELL_SIZE);
	let i = Math.floor(creature.posY / CELL_SIZE);

	const downRowIndex = i + 1;
	const downRow = field[downRowIndex];

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature.moveSpeed;

	if ( (downRowIndex < HEIGHT / CELL_SIZE) && (downRowIndex >= 0) )
	{
		for (let currColumn = Math.max(0, j - 1); (currColumn < downRow.length) && (currColumn <= j + 1) ; ++currColumn)
		{
			if (downRow[currColumn].type() != GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: currColumn * CELL_SIZE, top: downRowIndex * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE};

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
				width: BOMB_SIZE,
				height: BOMB_SIZE
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
				width: CELL_SIZE,
				height: CELL_SIZE
			};

			if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
			{
				const delta = objectRect.top - (creatureRect.top + creatureRect.height); // player.y - (bomb.y + bomb.height)

				if (delta >= 0 && delta < CELL_SIZE)
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
		creature.direction = DOWN;
	}
}

function moveRight(creature) {
	let j = Math.floor(creature.posX / CELL_SIZE);
	let i = Math.floor(creature.posY / CELL_SIZE);

	const rightRowIndex = j + 1;
	const rightRow = field;

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature.moveSpeed;

	if ( (rightRowIndex < WIDTH / CELL_SIZE) && (rightRowIndex >= 0) )
	{
		for (let currColumn = Math.max(0, i - 1); (currColumn < rightRow.length) && (currColumn <= i + 1) ; ++currColumn)
		{
			if (rightRow[currColumn][rightRowIndex].type() != GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: rightRowIndex * CELL_SIZE, top: currColumn * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE};

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
				width: BOMB_SIZE,
				height: BOMB_SIZE
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
				width: BOMB_SIZE,
				height: BOMB_SIZE
			};

			if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
			{
				const delta = objectRect.left - (creatureRect.left + creatureRect.width);

				if (delta >= 0 && delta < CELL_SIZE)
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
		creature.direction = RIGHT;
	}
}

function moveLeft(creature) {
	let j = Math.floor(creature.posX / CELL_SIZE);
	let i = Math.floor(creature.posY / CELL_SIZE);

	const leftRowIndex = j - 1;
	const leftRow = field;

	let wallFound = false;
	let stayOnBomb = false;
	let dy = creature.moveSpeed;

	if (leftRowIndex >= 0)
	{
		for (let currColumn = Math.max(0, i - 1); (currColumn < leftRow.length) && (currColumn <= i + 1) ; ++currColumn)
		{
			if (leftRow[currColumn][leftRowIndex].type() != GRASS)
			{
				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
				const wallRect = {left: leftRowIndex * CELL_SIZE, top: currColumn * CELL_SIZE, width: CELL_SIZE, height: CELL_SIZE};

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
				width: BOMB_SIZE,
				height: BOMB_SIZE
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
				width: BOMB_SIZE,
				height: BOMB_SIZE
			};

			if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
			{
				const delta = creatureRect.left - (objectRect.left + objectRect.height);

				if (delta >= 0 && delta < CELL_SIZE)
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
		creature.direction = LEFT;
	}
}