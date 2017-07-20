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
	let currPosX = Math.round(user.posX / CELL_SIZE);
	let currPosY = Math.round(user.posY / CELL_SIZE);
	let nextPos = currPosY - 1;

	if (field[nextPos][currPosX] === GRASS) {
		user.posY = user.posY - PLAYER_SPEED;
		moveDirection = 'moveUp';

		drawGame(user.posX, user.posY, moveDirection);
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = user.posY - blockSize;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posY = user.posY - step;
			moveDirection = 'moveUp';

			drawGame(user.posX, user.posY, moveDirection);
		}
	}
}

function moveDown() {
	let currPosX = Math.round(user.posX / CELL_SIZE);
	let currPosY = Math.round(user.posY / CELL_SIZE);
	let nextPos = currPosY + 1;

	if (field[nextPos][currPosX] === GRASS) {
		user.posY = user.posY + PLAYER_SPEED;
		moveDirection = 'moveDown';

		drawGame(user.posX, user.posY, moveDirection);
	} else {
		let playerBlock = user.posY + PLAYER_SIZE;
		let delta = (nextPos * CELL_SIZE) - playerBlock;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posY = user.posY + step;
			moveDirection = 'moveDown';

			drawGame(user.posX, user.posY, moveDirection);
		}
	}
}

function moveRight() {
	let currPosX = Math.round(user.posX / CELL_SIZE);
	let currPosY = Math.round(user.posY / CELL_SIZE);
	let nextPos = currPosX + 1;

	if (field[currPosY][nextPos] === GRASS) {
		user.posX = user.posX + PLAYER_SPEED;
		moveDirection = 'moveRight';

		drawGame(user.posX, user.posY, moveDirection);
	} else {
		let playerBlock = user.posX + PLAYER_SIZE;
		let delta = (nextPos * CELL_SIZE) - playerBlock;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posX = user.posX + step;
			moveDirection = 'moveRight';

			drawGame(user.posX, user.posY, moveDirection);
		}
	}
}

function moveLeft() {
	let currPosX = Math.round(user.posX / CELL_SIZE);
	let currPosY = Math.round(user.posY / CELL_SIZE);
	let nextPos = currPosX - 1;

	if (field[currPosY][nextPos] === GRASS) {
		user.posX = user.posX - PLAYER_SPEED;
		moveDirection = 'moveLeft';

		drawGame(user.posX, user.posY, moveDirection);
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = user.posX - blockSize;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posX = user.posX - step;
			moveDirection = 'moveLeft';

			drawGame(user.posX, user.posY, moveDirection);
		}
	}
}