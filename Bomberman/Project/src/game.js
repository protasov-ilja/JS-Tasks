const FIELD_COLOR = 'green';

let endOfGame = false;
let player = null;
let balloon1 = null;
let balloon2 = null;
let requestAnimationFrameId;

function initGame() {
	player = new Player();

    liveForm.innerHTML = '0' + player.live;
    bombForm.innerHTML = '0' + player.bombCount;
	monsters = [];

	addMonster(balloon1, 90, 120);
	addMonster(balloon2, 180, 30);
	cancelAnimationFrame(requestAnimationFrameId);
	useTimer();
	animate(player);
	// animate(balloon1);
	// animate(balloon2);
}

function addMonster(monster, currX, currY) {
	monster = new Monster();
	monster.posX = currX;
	monster.posY = currY;
	monsters.push(monster);
}

function animate(creature) {
	// сохраняется при начале анимации
	creature.startTimeAnimation = new Date().getTime(); // начальное время анимации

	step();

	function step() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);

		drawField();

		for (let i = 0; i < monsters.length; ++i) {
			monsterMove(monsters[i]);
			drawCreature(monsters[i], monsters[i].getCurrSprite() );
		}

		drawCreature(player, player.getCurrSprite() );

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