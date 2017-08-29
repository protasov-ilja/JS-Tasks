const FIELD_COLOR = 'green';

let canvas = null;
let ctx = null;

function drawCreature(creature, sprite) {
	ctx.drawImage(sprite, 0, 0, creature.spriteSize, creature.spriteSize, creature.posX, creature.posY, creature.spriteSize, creature.spriteSize);
}

function drawExplode(sprite, posX, posY) {
	ctx.drawImage(sprite, 0, 0, Config.CELL_SIZE, Config.CELL_SIZE, posX, posY, Config.CELL_SIZE, Config.CELL_SIZE);
}

function drawField() {
	for (let currPosY = 0; currPosY < Config.COUNT_OF_CELLS_HEIGHT; ++currPosY)
	{
		for (let currPosX = 0; currPosX < Config.COUNT_OF_CELLS_WIDTH; ++currPosX)
		{
			if (field[currPosY][currPosX].type() === FieldType.GRASS)
			{
				drawGrass(currPosY, currPosX);
			}
			else if (field[currPosY][currPosX].type() === FieldType.CEMENT)
			{
				drawCementBlock(currPosY, currPosX);
			}
			else if (field[currPosY][currPosX].type() === FieldType.IRON)
			{
				drawIronBlock(currPosY, currPosX);
			}
		}
	}
}

function drawGrass(yPos, xPos) {
	ctx.fillStyle = FIELD_COLOR;
	ctx.fillRect( (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE);
}

function drawIronBlock(yPos, xPos) {
	ctx.drawImage(spriteBlock, 0, 0, Config.CELL_SIZE, Config.CELL_SIZE, (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
}

function drawCementBlock(yPos, xPos) {
	ctx.drawImage(spriteBlock, 30, 0, Config.CELL_SIZE, Config.CELL_SIZE, (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE);
}

//сетка
function grid() {
	for (let j = 0; j <= Config.COUNT_OF_CELLS_HEIGHT; j++) {
		let k = j * 30;
		ctx.strokeRect(0, k, Config.WIDTH, 1);
	}

	for (let i = 0; i <= Config.COUNT_OF_CELLS_WIDTH; i++) {
		let k = i * 30;
		ctx.strokeRect(k, 0, 1, Config.HEIGHT);
	}
}

function endTheGame() {
	ctx.beginPath();
	ctx.font = "bold 50pt Arial";
	ctx.fillStyle = '#ffbe26';
	ctx.textAlign = 'center';
	ctx.fillText('Game Over', Config.WIDTH / 2, Config.HEIGHT / 2);
	ctx.fill();
	ctx.closePath();
}

function winTheGame() {
	soundPlay(winMusic, gameMusic);

	ctx.beginPath();
	ctx.font = "bold 50pt Arial";
	ctx.fillStyle = '#ff0021';
	ctx.textAlign = 'center';
	ctx.fillText('You WIN', Config.WIDTH / 2, Config.HEIGHT / 2);
	ctx.fill();
	ctx.closePath();
}