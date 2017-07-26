const DOWN = 0;
const UP = 1;
const RIGHT = 2;
const LEFT = 3;

document.onkeydown = function (event) {
	if (!endOfGame) {
		switch (event.keyCode) {
			case ARROW_UP:
			case W:
				event.preventDefault();
				moveUp(player);
				break;
			case ARROW_RIGHT:
			case D:
				event.preventDefault();
				moveRight(player);
				break;
			case ARROW_DOWN:
			case S:
				event.preventDefault();
				moveDown(player);
				break;
			case ARROW_LEFT:
			case A:
				event.preventDefault();
				moveLeft(player);
		}
	}
};

function monsterMove(monster) {
	if (!endOfGame) {
		switch (monster.direction) {
			case UP:
				moveUp(monster);
				break;
			case RIGHT:
				moveRight(monster);
				break;
			case DOWN:
				moveDown(monster);
				break;
			case LEFT:
				moveLeft(monster);
		}
	}
}

function changeDirection(monster) {
	monster.direction = Math.floor(Math.random() * 4);
	console.log(monster.direction);
}

function moveUp(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosY - 1;

	if (field[nextPos][currPosX] === GRASS) {
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
			if (creature === monster) {
				changeDirection(monster);
			}
		}
	}
}

function moveDown(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosY + 1;

	if (field[nextPos][currPosX] === GRASS) {
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
			if (creature === monster) {
				changeDirection(monster);
			}
		}
	}
}

function moveRight(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosX + 1;

	if (field[currPosY][nextPos] === GRASS) {
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
			if (creature === monster) {
				changeDirection(monster);
			}
		}
	}
}

function moveLeft(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosX - 1;

	if (field[currPosY][nextPos] === GRASS) {
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
			if (creature === monster) {
				changeDirection(monster);
			}
		}
	}
}
