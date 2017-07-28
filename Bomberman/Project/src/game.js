const FIELD_COLOR = 'green';
const playerSprites = [];
const playerDownDirection = [];
const playerUpDirection = [];
const playerRightDirection = [];
const playerLeftDirection = [];

const balloonSprites = [];
const balloonDownDirection = [];
const balloonUpDirection = [];
const balloonRightDirection = [];
const balloonLeftDirection = [];

let endOfGame = false;
let canvas = null;
let ctx = null;
let spriteBlock = null;
let loadedResourcesCount = 0;
let player = null;
let monster = null;

window.onload = () => {
	canvas = document.getElementById("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext('2d');

	player = new Player();

	const moveDown1 = createImage(onItemLoaded);
	moveDown1.src = 'img/sprites/player/player_down/1.png';
	const moveDown2 = createImage(onItemLoaded);
	moveDown2.src = 'img/sprites/player/player_down/2.png';
	const moveDown3 = createImage(onItemLoaded);
	moveDown3.src = 'img/sprites/player/player_down/3.png';
	playerDownDirection.push(moveDown1, moveDown2, moveDown3/*, four, five*/);

	const moveUp1 = createImage(onItemLoaded);
	moveUp1.src = 'img/sprites/player/player_up/1.png';
	const moveUp2 = createImage(onItemLoaded);
	moveUp2.src = 'img/sprites/player/player_up/2.png';
	const moveUp3 = createImage(onItemLoaded);
	moveUp3.src = 'img/sprites/player/player_up/3.png';
	playerUpDirection.push(moveUp1, moveUp2, moveUp3);

	const moveRight1 = createImage(onItemLoaded);
	moveRight1.src = 'img/sprites/player/player_right/1.png';
	const moveRight2 = createImage(onItemLoaded);
	moveRight2.src = 'img/sprites/player/player_right/2.png';
	const moveRight3 = createImage(onItemLoaded);
	moveRight3.src = 'img/sprites/player/player_right/3.png';
	playerRightDirection.push(moveRight1, moveRight2, moveRight3);

	const moveLeft1 = createImage(onItemLoaded);
	moveLeft1.src = 'img/sprites/player/player_left/1.png';
	const moveLeft2 = createImage(onItemLoaded);
	moveLeft2.src = 'img/sprites/player/player_left/2.png';
	const moveLeft3 = createImage(onItemLoaded);
	moveLeft3.src = 'img/sprites/player/player_left/3.png';
	playerLeftDirection.push(moveLeft1, moveLeft2, moveLeft3);

	playerSprites.push(playerDownDirection, playerUpDirection, playerRightDirection, playerLeftDirection);

	monster = new Monster();

	const balloonDown1 = createImage(onItemLoaded);
	balloonDown1.src = 'img/sprites/monster_balloon/monster_down/1.png';
	const balloonDown2 = createImage(onItemLoaded);
	balloonDown2.src = 'img/sprites/monster_balloon/monster_down//2.png';
	const balloonDown3 = createImage(onItemLoaded);
	balloonDown3.src = 'img/sprites/monster_balloon/monster_down//3.png';
	balloonDownDirection.push(balloonDown1, balloonDown2, balloonDown3/*, four, five*/);

	const balloonUp1 = createImage(onItemLoaded);
	balloonUp1.src = 'img/sprites/monster_balloon/monster_up/1.png';
	const balloonUp2 = createImage(onItemLoaded);
	balloonUp2.src = 'img/sprites/monster_balloon/monster_up//2.png';
	const balloonUp3 = createImage(onItemLoaded);
	balloonUp3.src = 'img/sprites/monster_balloon/monster_up//3.png';
	balloonUpDirection.push(balloonUp1, balloonUp2, balloonUp3);


	const balloonRight1 = createImage(onItemLoaded);
	balloonRight1.src = 'img/sprites/monster_balloon/monster_right/1.png';
	const balloonRight2 = createImage(onItemLoaded);
	balloonRight2.src = 'img/sprites/monster_balloon/monster_right/2.png';
	const balloonRight3 = createImage(onItemLoaded);
	balloonRight3.src = 'img/sprites/monster_balloon/monster_right/3.png';
	balloonRightDirection.push(balloonRight1, balloonRight2, balloonRight3);

	const balloonLeft1 = createImage(onItemLoaded);
	balloonLeft1.src = 'img/sprites/monster_balloon/monster_left/1.png';
	const balloonLeft2 = createImage(onItemLoaded);
	balloonLeft2.src = 'img/sprites/monster_balloon/monster_left/2.png';
	const balloonLeft3 = createImage(onItemLoaded);
	balloonLeft3.src = 'img/sprites/monster_balloon/monster_left/3.png';
	balloonLeftDirection.push(balloonLeft1, balloonLeft2, balloonLeft3);

	balloonSprites.push(balloonDownDirection, balloonUpDirection, balloonRightDirection, balloonLeftDirection);


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
	monster = new Monster();
    liveForm.innerHTML = '0' + player.live;
    bombForm.innerHTML = '0' + player.bombCount;

	cancelAnimationFrame(requestAnimationFrameId);
	useTimer();
	animate(player);
	animate(monster);
}

function animate(creature) {
	// сохраняется при начале анимации
	creature.startTimeAnimation = new Date().getTime(); // начальное время анимации

	step();

	function step() {
		monsterMove(monster);
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		drawField();
		drawCreature(creature, creature.getCurrSprite() );
		requestAnimationFrameId = requestAnimationFrame(step); // вызов шага
	}
}

function drawCreature(creature, sprite) {
	ctx.drawImage(sprite, 0, 0, creature.spriteSize, creature.spriteSize, creature.posX, creature.posY, creature.spriteSize, creature.spriteSize);
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