const DOWN = 'moveDown';
const UP = 'moveUp';
const RIGHT = 'moveRight';
const LEFT = 'moveLeft';
let moveDirection = DOWN;

document.onkeydown = function (event) {
	if (!endOfGame) {
		switch (event.keyCode) {
			case ARROW_UP:
			case W:
				event.preventDefault();
				moveUp();
				break;
			case ARROW_RIGHT:
			case D:
				event.preventDefault();
				moveRight();
				break;
			case ARROW_DOWN:
			case S:
				event.preventDefault();
				moveDown();
				break;
			case ARROW_LEFT:
			case A:
				event.preventDefault();
				moveLeft();
		}
	}
};

function moveUp() {
	let currPosX = Math.round(player.posX / CELL_SIZE);
	let currPosY = Math.round(player.posY / CELL_SIZE);
	let nextPos = currPosY - 1;

	if (field[nextPos][currPosX] === GRASS) {
		player.posY = player.posY - PLAYER_SPEED;
		moveDirection = UP;
		player.direction = moveDirection;
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = player.posY - blockSize;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			player.posY = player.posY - step;
			moveDirection = UP;
			player.direction = moveDirection;
		}
	}
}

function moveDown() {
	let currPosX = Math.round(player.posX / CELL_SIZE);
	let currPosY = Math.round(player.posY / CELL_SIZE);
	let nextPos = currPosY + 1;

	if (field[nextPos][currPosX] === GRASS) {
		player.posY = player.posY + PLAYER_SPEED;
		moveDirection = DOWN;
		player.direction = moveDirection;
	} else {
		let playerBlock = player.posY + PLAYER_SIZE;
		let delta = (nextPos * CELL_SIZE) - playerBlock;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			player.posY = player.posY + step;
			moveDirection = DOWN;
			player.direction = moveDirection;
		}
	}
}

function moveRight() {
	let currPosX = Math.round(player.posX / CELL_SIZE);
	let currPosY = Math.round(player.posY / CELL_SIZE);
	let nextPos = currPosX + 1;

	if (field[currPosY][nextPos] === GRASS) {
		player.posX = player.posX + PLAYER_SPEED;
		moveDirection = RIGHT;
		player.direction = moveDirection;
	} else {
		let playerBlock = player.posX + PLAYER_SIZE;
		let delta = (nextPos * CELL_SIZE) - playerBlock;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			player.posX = player.posX + step;
			moveDirection = RIGHT;
			player.direction = moveDirection;
		}
	}
}

function moveLeft() {
	let currPosX = Math.round(player.posX / CELL_SIZE);
	let currPosY = Math.round(player.posY / CELL_SIZE);
	let nextPos = currPosX - 1;

	if (field[currPosY][nextPos] === GRASS) {
		player.posX = player.posX - PLAYER_SPEED;
		moveDirection = LEFT;
		player.direction = moveDirection;
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = player.posX - blockSize;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			player.posX = player.posX - step;
			moveDirection = LEFT;
			player.direction = moveDirection;
		}
	}
}