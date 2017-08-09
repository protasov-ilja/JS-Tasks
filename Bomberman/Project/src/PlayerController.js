const DOWN = 0;
const UP = 1;
const RIGHT = 2;
const LEFT = 3;
const CENTER = 4;
const LONG_LEFT = 5;
const LONG_UP = 6;

document.onkeydown = function (event) {
	if (!endOfGame) {
		console.log(player.posX, player.posY);
		switch (event.keyCode) {
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
	if (!endOfGame) {
		switch (event.keyCode) {
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

function intersectCreatureAndBomb(creature) {
	let colapse = false;

	for (let i = 0; i < bombs.length; ++i) {
		let bomb = bombs[i];

		let creatureRect = {
			left: creature.posX,
			top: creature.posY - creature.moveSpeed,
			width: creature.spriteSize,
			height: creature.spriteSize
		};

		let bombRect = {
			left: bomb.posX,
			top: bomb.posY,
			width: bomb.spriteSize,
			height: bomb.spriteSize
		};

		if ( MathUtils.intersectsRects(creatureRect, bombRect) ) {
			colapse = true;
		}
	}

	return colapse;
}

function moveCreature(creature) {
	if (!endOfGame) {
		switch (creature.direction) {
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
	if (bombCount < START_BOMB_COUNT) {

		bombCount++;
		bombs.push( new Bomb( Date.now(), player.posX, player.posY ) );
	}
}

function changeDirection(monster) {
	monster.direction = Math.floor(Math.random() * 4);
}

function moveUp(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosY - 1;

	if (field[nextPos][currPosX].type() === GRASS) {
		creature.posY = creature.posY - creature.moveSpeed;
		creature.direction = UP;
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = creature.posY - blockSize;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posY = creature.posY - step;
			creature.direction = UP;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}

function moveDown(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosY + 1;

	if (field[nextPos][currPosX].type() === GRASS) {
		creature.posY = creature.posY + creature.moveSpeed;
		creature.direction = DOWN;
	} else {
		let creatureBlock = creature.posY + creature.spriteSize;
		let delta = (nextPos * CELL_SIZE) - creatureBlock;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posY = creature.posY + step;
			creature.direction = DOWN;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}

function moveRight(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosX + 1;

	if (field[currPosY][nextPos].type() === GRASS) {
		creature.posX = creature.posX + creature.moveSpeed;
		creature.direction = RIGHT;
	} else {
		let creatureBlock = creature.posX + creature.spriteSize;
		let delta = (nextPos * CELL_SIZE) - creatureBlock;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posX = creature.posX + step;
			creature.direction = RIGHT;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}

function moveLeft(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosX - 1;

	if (field[currPosY][nextPos].type() === GRASS) {
		creature.posX = creature.posX - creature.moveSpeed;
		creature.direction = LEFT;
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = creature.posX - blockSize;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posX = creature.posX - step;
			creature.direction = LEFT;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}
