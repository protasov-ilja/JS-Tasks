const FIELD_COLOR = 'green';
const playerDownDirection = [];
const playerUpDirection = [];
const playerRightDirection = [];
const playerLeftDirection = [];

let endOfGame = false;
let canvas = null;
let ctx = null;
let spriteBlock = null;
let loadedResourcesCount = 0;
let player = null;

window.onload = () => {
	canvas = document.getElementById("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext('2d');

	player = new Player();

	const moveDown1 = createImage(onItemLoaded);
	moveDown1.src = 'img/sprites/player_down/1.png';
	const moveDown2 = createImage(onItemLoaded);
	moveDown2.src = 'img/sprites/player_down/2.png';
	const moveDown3 = createImage(onItemLoaded);
	moveDown3.src = 'img/sprites/player_down/3.png';
	playerDownDirection.push(moveDown1, moveDown2, moveDown3/*, four, five*/);

	const moveUp1 = createImage(onItemLoaded);
	moveUp1.src = 'img/sprites/player_up/1.png';
	const moveUp2 = createImage(onItemLoaded);
	moveUp2.src = 'img/sprites/player_up/2.png';
	const moveUp3 = createImage(onItemLoaded);
	moveUp3.src = 'img/sprites/player_up/3.png';
	playerUpDirection.push(moveUp1, moveUp2, moveUp3);

	const moveRight1 = createImage(onItemLoaded);
	moveRight1.src = 'img/sprites/player_right/1.png';
	const moveRight2 = createImage(onItemLoaded);
	moveRight2.src = 'img/sprites/player_right/2.png';
	const moveRight3 = createImage(onItemLoaded);
	moveRight3.src = 'img/sprites/player_right/3.png';
	playerRightDirection.push(moveRight1, moveRight2, moveRight3);

	const moveLeft1 = createImage(onItemLoaded);
	moveLeft1.src = 'img/sprites/player_left/1.png';
	const moveLeft2 = createImage(onItemLoaded);
	moveLeft2.src = 'img/sprites/player_left/2.png';
	const moveLeft3 = createImage(onItemLoaded);
	moveLeft3.src = 'img/sprites/player_left/3.png';
	playerLeftDirection.push(moveLeft1, moveLeft2, moveLeft3);

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

let requestAnimationFrameId;

function initGame() {
	player = new Player();
    liveForm.innerHTML = '0' + player.live;
    bombForm.innerHTML = '0' + player.bombCount;

	cancelAnimationFrame(requestAnimationFrameId);
	useTimer();
	animate();
}

function animate() {
	//сохраняется при начале анимации
	const STEP_DURATION = 100;
	const AMOUNT_OF_STEPS = playerDownDirection.length;
	const ANIMATION_DURATION = STEP_DURATION * AMOUNT_OF_STEPS; // полная длительность анимации

	let stepAnimation = null;
	let currAnimation = null;
	let startTime = new Date().getTime(); // начальное время анимации

	step();

	function step() {
		let currTime = ( new Date().getTime() ) - startTime; // время шага
		let progressAnimation = currTime % ANIMATION_DURATION; // прогресс анимации

		switch (player.direction) {
			case DOWN:
				stepAnimation = playerDownDirection;
				break;
			case UP:
				stepAnimation = playerUpDirection;
				break;
			case LEFT:
				stepAnimation = playerLeftDirection;
				break;
			case RIGHT:
				stepAnimation = playerRightDirection;
				break;
		}

		progressAnimation = Math.floor(progressAnimation / (ANIMATION_DURATION / AMOUNT_OF_STEPS) );
		currAnimation = stepAnimation[progressAnimation];
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		drawField();
		drawPlayer(currAnimation);
		requestAnimationFrameId = requestAnimationFrame(step); // вызов шага
	}
}

function drawPlayer(sprite) {
	ctx.drawImage(sprite, 0, 0, PLAYER_SIZE, PLAYER_SIZE, player.posX, player.posY, PLAYER_SIZE, PLAYER_SIZE);
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
    ctx.fillStyle = FIELD_COLOR;
    ctx.fillRect( (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}

function drawIronBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
}

function drawCementBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock, 30, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}