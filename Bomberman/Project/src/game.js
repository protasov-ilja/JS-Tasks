let endOfGame = false;
let canvas = null;
let ctx = null;
let spriteBlock = null;
let spriteHero = null;
let loadedResourcesCount = 0;
let user = null;
let moveDirection = 'moveDown';

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
    drawGame(user.posX, user.posY, moveDirection);
}

function animatePlayer(currX, currY, currDirection) {
	//сохраняется при начале анимации
	const AMOUNT_OF_STEPS = 3;
	const FIRST_STEP = 0;
	const SECOND_STEP = 1;
	const THIRD_STEP = 2;
	const ANIMATION_DURATION = 300; // полная длительность анимации

	let stepAnimation = null;
	let startTime = new Date().getTime(); // начальное время анимации

	step();

	function step() {
		let currTime = ( new Date().getTime() ) - startTime; // время шага
		let progressAnimation = currTime % ANIMATION_DURATION; // прогресс анимации

		progressAnimation = Math.floor(progressAnimation / (ANIMATION_DURATION / AMOUNT_OF_STEPS) );

		if (progressAnimation === FIRST_STEP) {
			stepAnimation = 'firstStep';
		} else if (progressAnimation === SECOND_STEP) {
			stepAnimation = 'secondStep';
		} else if (progressAnimation === THIRD_STEP) {
			stepAnimation = 'thirdStep';
		}

		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		drawField();
		drawPlayer(currX, currY, stepAnimation, currDirection);
		requestAnimationFrame(step); // вызов шага
	}
}

function drawGame(currX, currY, currDirection) {
	animatePlayer(currX, currY, currDirection);
}

function drawPlayer(currX, currY, currStep, currDirection) {
	const FIRST_SPRITE = 0;
	const SECOND_SPRITE = 21;
	const THIRD_SPRITE = 42;
	const MOVE_DOWN = 0;
	const MOVE_UP = 42;
	const MOVE_RIGHT = 63;
	const MOVE_LEFT = 21;

	let moveDirection;
	let spriteNumber;

	if (currDirection === 'moveDown') {
		moveDirection = MOVE_DOWN;
	} else if (currDirection === 'moveRight') {
		moveDirection = MOVE_RIGHT;
	} else if (currDirection === 'moveUp') {
		moveDirection = MOVE_UP;
	} else {
		moveDirection = MOVE_LEFT;
	}

	if (currStep === 'firstStep') {
		spriteNumber = FIRST_SPRITE;
	} else if (currStep === 'secondStep') {
		spriteNumber = SECOND_SPRITE;
	} else {
		spriteNumber = THIRD_SPRITE;
	}

	ctx.drawImage(spriteHero, moveDirection, spriteNumber, PLAYER_SIZE, PLAYER_SIZE, currX, currY, PLAYER_SIZE, PLAYER_SIZE);
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