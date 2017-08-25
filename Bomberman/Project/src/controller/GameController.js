const FIELD_COLOR1 = 'green';
const FIELD_COLOR2 = '#ececb7';

class GameController {
	constructor() {
		canvas = document.getElementById("canvas");
		canvas.width = Config.WIDTH;
		canvas.height = Config.HEIGHT;
		ctx = canvas.getContext('2d');

		this.field = getField(LEVEL_1);
		this.endOfGame = false;
		this.player = null;
		this.monsters = null;
		this._requestAnimationFrameId;
		this._balloon1 = null;
		this._balloon2 = null;
		this.bombs = [];
		this.bombCount = 0;

		const resourcesLoader = new ResourcesLoader();
		const movementController = new MovementController();
		const interfaceController = new InterfaceController();

		interfaceController.gameMusic.play();
		resourcesLoader.loadResources(() => { this.initGame(); });
	}


	initGame() {
		interfaceController.winMusic.pause();
		interfaceController.winMusic.CurrentTime = 0;
		interfaceController.gameMusic.play();

		this.endOfGame = false;
		this.player = new Player( Date.now() );

		interfaceController.liveForm.innerHTML = '0' + this.player.live;
		interfaceController.bombForm.innerHTML = '0' + this.player.bombCount;

		this.monsters = [];

		this.addMonster(this._balloon1, 90, 120, balloonSprites);
		this.addMonster(this._balloon2, 180, 30, balloonSprites);
		cancelAnimationFrame(this._requestAnimationFrameId);
		interfaceController.useTimer();
		this.animate();
	}

	addMonster(monster, currX, currY, sprites) {
		monster = new Monster(currX, currY, sprites, Date.now() );
		this.monsters.push(monster);
	}

	animate() {
		step();

		function step() {
			ctx.clearRect(0, 0, WIDTH, HEIGHT);

			this.drawField();

			for (let i = 0; i < this.bombs.length; ++i)
			{
				if (this.bombs[i].getCurrTime() - this.bombs[i].getCreateTime() < BOMB_TIMER)
				{
					this.drawCreature(this.bombs[i], this.bombs[i].getCurrSprite() );
				}
				else
				{
					if (!this.bombs[i].isExploded())
					{
						interfaceController.explodeMusic.pause();
						interfaceController.explodeMusic.currentTime = 0;
						interfaceController.explodeMusic.play();
						this.bombs[i].explode( this.bombs[i].getCurrTime() );
						logicOfExplode(this.bombs[i]);
					}
				}
			}

			for (let i = 0; i < this.bombs.length; ++i)
			{
				if ( this.bombs[i].isExploded() )
				{
					// Рисуем взрыв
					const fireBlocks = this.bombs[i].fireBlocks();
					for (const block of fireBlocks)
					{
						const sprites = burst[block.type];
						this.drawExplode(sprites[this.bombs[i].getCurrStep(sprites.length)], block.x, block.y);
					}

					if ( this.bombs[i].isExplodeCompleted(this.bombs[i].getCurrTime() ) )
					{
						this.bombs.splice(i, 1); // удаляем бомбу i
						--this.bombCount;// уменьшаем bombCount на 1
					}
				}
			}

			if (this.player.mooving)
			{
				moveCreature(this.player);
			}

			for (let i = 0; i < this.monsters.length; ++i)
			{
				moveCreature(this.monsters[i]);
				this.drawCreature(this.monsters[i], this.monsters[i].getCurrSprite() );
				killPlayer(this.monsters[i]);
				if ( killMonster(this.monsters[i]) ) {
					interfaceController.score = score + 100;
					interfaceController.scoreForm.innerHTML = score;
					this.monsters.splice(i, 1);
				}
			}

			if (this.endOfGame)
			{
				interfaceController.endTheGame();
			}
			else if (this.monsters.length == 0)
			{
				interfaceController.winTheGame();
			}
			else
			{
				this.drawCreature(this.player, this.player.getCurrSprite() );
			}

			this._requestAnimationFrameId = requestAnimationFrame(step); // вызов шага
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
		for (let currPosY = 0; currPosY < Config.COUNT_OF_CELLS_HEIGHT; ++currPosY)
		{
			for (let currPosX = 0; currPosX < Config.COUNT_OF_CELLS_WIDTH; ++currPosX)
			{
				if (this.field[currPosY][currPosX].type() === FieldType.GRASS)
				{
					this.drawGrass(currPosY, currPosX);
				}
				else if (this.field[currPosY][currPosX].type() === FieldType.CEMENT)
				{
					this.drawCementBlock(currPosY, currPosX);
				}
				else if (this.field[currPosY][currPosX].type() === FieldType.IRON)
				{
					this.drawIronBlock(currPosY, currPosX);
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
