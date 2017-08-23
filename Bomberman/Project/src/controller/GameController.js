const FIELD_COLOR1 = 'green';
const FIELD_COLOR2 = '#ececb7';

class NewGameController {
	constructor() {
		canvas = document.getElementById("canvas");
		canvas.width = Config.WIDTH;
		canvas.height = Config.HEIGHT;
		ctx = canvas.getContext('2d');
		gameMusic.play();

		this.field = getField(LEVEL_1);
		this._endOfGame = false;
		this._player = null;
		this._balloon1 = null;
		this._balloon2 = null;
		this._requestAnimationFrameId;
		this._bombs = [];
		this._bombCount = 0;

		const resourcesLoader = new ResourcesLoader();
		resourcesLoader.loadResources(() => { this.initGame(); });
	}


	initGame() {
		winMusic.pause();
		winMusic.CurrentTime = 0;
		gameMusic.play();

		endOfGame = false;
		player = new Player( Date.now() );

		liveForm.innerHTML = '0' + player.live;
		bombForm.innerHTML = '0' + player.bombCount;

		monsters = [];

		addMonster(balloon1, 90, 120, balloonSprites);
		addMonster(balloon2, 180, 30, balloonSprites);
		cancelAnimationFrame(requestAnimationFrameId);
		useTimer();
		animate();
	}

	addMonster(monster, currX, currY, sprites) {
		monster = new Monster(currX, currY, sprites, Date.now() );
		monsters.push(monster);
	}

	animate() {
		step();

		function step() {
			ctx.clearRect(0, 0, WIDTH, HEIGHT);

			drawField();

			for (let i = 0; i < bombs.length; ++i)
			{
				if (bombs[i].getCurrTime() - bombs[i].getCreateTime() < BOMB_TIMER)
				{
					drawCreature(bombs[i], bombs[i].getCurrSprite() );
				}
				else
				{
					if (!bombs[i].isExploded())
					{
						explodeMusic.pause();
						explodeMusic.currentTime = 0;
						explodeMusic.play();
						bombs[i].explode( bombs[i].getCurrTime() );
						logicOfExplode(bombs[i]);
						console.log('bum');
					}
				}
			}

			for (let i = 0; i < bombs.length; ++i)
			{
				if ( bombs[i].isExploded() )
				{
					// Рисуем взрыв
					const fireBlocks = bombs[i].fireBlocks();
					for (const block of fireBlocks)
					{
						console.log(block);
						const sprites = burst[block.type];
						drawExplode(sprites[bombs[i].getCurrStep(sprites.length)], block.x, block.y);
					}

					if ( bombs[i].isExplodeCompleted(bombs[i].getCurrTime() ) )
					{
						console.log('delete bomb', i, bombs.length);

						bombs.splice(i, 1); // удаляем бомбу i
						// уменьшаем индекс i на 1
						--bombCount;
					}
				}
			}
			// аналогично со стеной, для получения спрайта используем getCurrentSprite

			if (player.mooving)
			{
				moveCreature(player);
			}

			for (let i = 0; i < monsters.length; ++i)
			{
				moveCreature(monsters[i]);
				drawCreature(monsters[i], monsters[i].getCurrSprite() );
				killPlayer(monsters[i]);
				if ( killMonster(monsters[i]) ) {
					score = score + 100;
					scoreForm.innerHTML = score;
					monsters.splice(i, 1);
				}
			}

			if (endOfGame)
			{
				endTheGame();
			}
			else if (monsters.length == 0)
			{
				winTheGame();
			}
			else
			{
				drawCreature(player, player.getCurrSprite() );
			}

			requestAnimationFrameId = requestAnimationFrame(step); // вызов шага
		}
	}
//сетка
	grid() {
		for (let j = 0; j <= Config.COUNT_OF_CELLS_HEIGHT; j++) {
			let k = j * 30;
			ctx.strokeRect(0, k, Config.WIDTH, 1);
		}

		for (let i = 0; i <= Config.COUNT_OF_CELLS_WIDTH; i++) {
			let k = i * 30;
			ctx.strokeRect(k, 0, 1, Config.HEIGHT);
		}
	}

	drawCreature(creature, sprite) {
		ctx.drawImage(sprite, 0, 0, creature.spriteSize, creature.spriteSize, creature.posX, creature.posY, creature.spriteSize, creature.spriteSize);
	}

	drawExplode(sprite, posX, posY) {
		ctx.drawImage(sprite, 0, 0, Config.CELL_SIZE, Config.CELL_SIZE, posX, posY, Config.CELL_SIZE, Config.CELL_SIZE);
	}

	drawField() {
		for (let currPosY = 0; currPosY < COUNT_OF_CELLS_HEIGHT; ++currPosY)
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

	drawGrass(yPos, xPos) {
		ctx.fillStyle = FIELD_COLOR1;
		ctx.fillRect( (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE);
	}

	drawIronBlock(yPos, xPos) {
		ctx.drawImage(spriteBlock1, 0, 0, Config.CELL_SIZE, Config.CELL_SIZE, (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
	}

	drawCementBlock(yPos, xPos) {
		ctx.drawImage(spriteBlock1, 30, 0, Config.CELL_SIZE, Config.CELL_SIZE, (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE);
	}
}

window.onload = () => {

};
