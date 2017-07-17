let endOfGame = false;
let canvas = null;
let ctx = null;
let spriteBlock = null;
let spriteHero = null;
let loadedResourcesCount = 0;
let user = null;

window.onload = () => {
	canvas = document.getElementById("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	ctx = canvas.getContext('2d');

	user = new Player();

	spriteHero = createImage(onItemLoaded);
	spriteHero.src = 'img/sprites/sprite_player.png';

	spriteBlock = createImage(onItemLoaded);
	spriteBlock.src = 'img/sprites/sprite_block.png';
};

function onItemLoaded() {
    ++loadedResourcesCount;
    if (loadedResourcesCount === resourcesToLoadCount)
    {
		initGame();
    }
}

document.onkeydown = function (event) {
    if (!endOfGame) {
        switch (event.keyCode) {
            case ARROW_UP:
            case KEY_W:
                event.preventDefault();
                moveUp();
                break;
            case ARROW_RIGHT:
            case KEY_D:
                event.preventDefault();
                moveRight();
                break;
            case ARROW_DOWN:
            case KEY_S:
                event.preventDefault();
                moveDown();
                break;
            case ARROW_LEFT:
            case KEY_A:
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

		drawGame(user.posX, user.posY);
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = user.posY - blockSize;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posY = user.posY - step;

			drawGame(user.posX, user.posY);
		}
	}
}

function moveDown() {
	let currPosX = Math.round(user.posX / CELL_SIZE);
	let currPosY = Math.round(user.posY / CELL_SIZE);
	let nextPos = currPosY + 1;

	if (field[nextPos][currPosX] === GRASS) {
		user.posY = user.posY + PLAYER_SPEED;

		drawGame(user.posX, user.posY);
	} else {
		let playerBlock = user.posY + PLAYER_SIZE;
		let delta = (nextPos * CELL_SIZE) - playerBlock;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posY = user.posY + step;

			drawGame(user.posX, user.posY);
		}
	}
}

function moveRight() {
	let currPosX = Math.round(user.posX / CELL_SIZE);
	let currPosY = Math.round(user.posY / CELL_SIZE);
	let nextPos = currPosX + 1;

	if (field[currPosY][nextPos] === GRASS) {
		user.posX = user.posX + PLAYER_SPEED;

		drawGame(user.posX, user.posY);
	} else {
		let playerBlock = user.posX + PLAYER_SIZE;
		let delta = (nextPos * CELL_SIZE) - playerBlock;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posX = user.posX + step;

			drawGame(user.posX, user.posY);
		}
	}
}

function moveLeft() {
	let currPosX = Math.round(user.posX / CELL_SIZE);
	let currPosY = Math.round(user.posY / CELL_SIZE);
	let nextPos = currPosX - 1;

	if (field[currPosY][nextPos] === GRASS) {
		user.posX = user.posX - PLAYER_SPEED;

		drawGame(user.posX, user.posY);
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = user.posX - blockSize;

		if (delta > 0) {
			let step = delta < PLAYER_SPEED ? delta : PLAYER_SPEED;

			user.posX = user.posX - step;

			drawGame(user.posX, user.posY);
		}
	}
}

function initGame() {
    const START_POS = 30;
    const START_LIVE = 3;

    user.bombCount = 1;
    user.live = START_LIVE;
    user.posX = START_POS;
    user.posY = START_POS;
    liveForm.innerHTML = '0' + user.live;
    bombForm.innerHTML = '0' + user.bombCount;

	useTimer();
    drawGame(user.posX, user.posY);
}

function animatePlayer(currX, currY) {
	//сохраняется при начале анимации
	const START_FIRST_STEP = 0;
	const END_FIRST_STEP = 100;
	const START_SECOND_STEP = 101;
	const END_SECOND_STEP = 200;
	const START_THIRD_STEP = 201;
	const END_THIRD_STEP = 300;
	const ANIMATION_DURATION = 300; // полная длительность анимации

	let stepAnimation = null;
	let startTime = new Date().getTime(); // начальное время анимации

	step();

	function step() {
		let currTime = ( new Date().getTime() ) - startTime; // время шага
		let progressAnimation = currTime % ANIMATION_DURATION; // прогресс анимации
		let needNextStep = progressAnimation <= ANIMATION_DURATION;

		progressAnimation = Math.min(ANIMATION_DURATION, progressAnimation);
		if ( (progressAnimation >=  START_FIRST_STEP) && (progressAnimation <=  END_FIRST_STEP) ) {
			stepAnimation = 'firstStep';
		} else if ( (progressAnimation >=  START_SECOND_STEP) && (progressAnimation <=  END_SECOND_STEP) ) {
			stepAnimation = 'secondStep';
		} else if ( (progressAnimation >=  START_THIRD_STEP) && (progressAnimation <=  END_THIRD_STEP) ) {
			stepAnimation = 'thirdStep';
		}

		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		drawField();
		drawPlayer(currX, currY, stepAnimation);

		if (needNextStep) {
			requestAnimationFrame(step); // вызов шага
		}
	}
}

function drawGame(currX, currY) {
	animatePlayer(currX, currY);
}

function drawPlayer(currX, currY, currStep) {
	if (currStep === 'firstStep') {
		ctx.drawImage(spriteHero, 0, 0, PLAYER_SIZE, PLAYER_SIZE, currX, currY, PLAYER_SIZE, PLAYER_SIZE);
	} else if (currStep === 'secondStep') {
		ctx.drawImage(spriteHero, 0, 21, PLAYER_SIZE, PLAYER_SIZE, currX, currY, PLAYER_SIZE, PLAYER_SIZE);
	} else {
		ctx.drawImage(spriteHero, 0, 41, PLAYER_SIZE, PLAYER_SIZE, currX, currY, PLAYER_SIZE, PLAYER_SIZE);
	}
}

function drawField() {
    for (let currPosY = 0; currPosY < COUNT_OF_CELLS_HEIGHT; ++currPosY) {
        for (let currPosX = 0; currPosX < COUNT_OF_CELLS_WIDTH; ++currPosX) {
            if (field[currPosY][currPosX] === GRASS) {
                drawGrass(currPosY, currPosX);
            } else if (field[currPosY][currPosX] === CEMENT) {
                drawCementBlock(currPosY, currPosX);
            } else if (field[currPosY][currPosX] === IRON) {
                drawIronBlock(currPosY, currPosX);
            }
        }
    }
}

function drawGrass(yPos, xPos) {
    ctx.fillStyle = 'green';
    ctx.fillRect( (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}

function drawIronBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
}

function drawCementBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock, 30, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}