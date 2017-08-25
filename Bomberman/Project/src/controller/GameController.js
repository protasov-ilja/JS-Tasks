const FIELD_COLOR1 = 'green';
const FIELD_COLOR2 = '#ececb7';

class GameController {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.canvas.width = Config.WIDTH;
		this.canvas.height = Config.HEIGHT;
		this.ctx = this.canvas.getContext('2d');

		this.endOfGame = false;
		this.player = null;
		this.monsters = null;
		this._requestAnimationFrameId = null;
		this._balloon1 = null;
		this._balloon2 = null;
		this.bombs = [];
		this.bombCount = 0;

		this.resourcesLoader = new ResourcesLoader();
		this.movementController = new MovementController(this.resourcesLoader, this);
		this.interfaceController = new InterfaceController(this);

		this.field = FieldLoader.getField(LEVEL_1);

		this.interfaceController.gameMusic.play();
		this.resourcesLoader.loadResources(() => { this.initGame(); });
	}


	initGame() {
		this.interfaceController.winMusic.pause();
		this.interfaceController.winMusic.CurrentTime = 0;
		this.interfaceController.gameMusic.play();

		this.endOfGame = false;
		this.player = new Player(this.resourcesLoader, Date.now() );

		this.interfaceController.liveForm.innerHTML = '0' + this.player.live;
		this.interfaceController.bombForm.innerHTML = '0' + this.player.bombCount;

		this.monsters = [];

		this.addMonster(this._balloon1, 90, 120, this.resourcesLoader.getSpritesByType(ResourceType.BALLOON_SPRITES) );
		this.addMonster(this._balloon2, 180, 30, this.resourcesLoader.getSpritesByType(ResourceType.BALLOON_SPRITES) );
		cancelAnimationFrame(this._requestAnimationFrameId);
		this.interfaceController.useTimer();
		this.animate();
	}

	addMonster(monster, currX, currY, sprites) {
		monster = new Monster(this.resourcesLoader, currX, currY, sprites, Date.now() );
		this.monsters.push(monster);
	}

	animate() {
		step();

		function step() {
			ctx.clearRect(0, 0, Config.WIDTH, Config.HEIGHT);

			this.drawField();

			for (let i = 0; i < this.bombs.length; ++i)
			{
				if (this.bombs[i].getCurrTime() - this.bombs[i].getCreateTime() < Config.BOMB_TIMER)
				{
					this.drawCreature(this.bombs[i], this.bombs[i].getCurrSprite() );
				}
				else
				{
					if (!this.bombs[i].isExploded())
					{
						this.interfaceController.explodeMusic.pause();
						this.interfaceController.explodeMusic.currentTime = 0;
						this.interfaceController.explodeMusic.play();
						this.bombs[i].explode( this.bombs[i].getCurrTime() );
						this.movementController.logicOfExplode(this.bombs[i]);
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
				this.movementController.moveCreature(this.player);
			}

			for (let i = 0; i < this.monsters.length; ++i)
			{
				this.movementController.moveCreature(this.monsters[i]);
				this.drawCreature(this.monsters[i], this.monsters[i].getCurrSprite() );
				this.movementController.killPlayer(this.monsters[i]);
				if ( this.movementController.killMonster(this.monsters[i]) ) {
					this.interfaceController.score = this.interfaceController.score + 100;
					this.interfaceController.scoreForm.innerHTML = this.interfaceController.score;
					this.monsters.splice(i, 1);
				}
			}

			if (this.endOfGame)
			{
				this.interfaceController.endTheGame();
			}
			else if (this.monsters.length == 0)
			{
				this.interfaceController.winTheGame();
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
			this.ctx.strokeRect(0, k, Config.WIDTH, 1);
		}

		for (let i = 0; i <= Config.COUNT_OF_CELLS_WIDTH; i++) {
			let k = i * 30;
			this.ctx.strokeRect(k, 0, 1, Config.HEIGHT);
		}
	}

	drawCreature(creature, sprite) {
		this.ctx.drawImage(sprite, 0, 0, creature.spriteSize, creature.spriteSize, creature.posX, creature.posY, creature.spriteSize, creature.spriteSize);
	}

	drawExplode(sprite, posX, posY) {
		this.ctx.drawImage(sprite, 0, 0, Config.CELL_SIZE, Config.CELL_SIZE, posX, posY, Config.CELL_SIZE, Config.CELL_SIZE);
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
		this.ctx.fillStyle = FIELD_COLOR1;
		this.ctx.fillRect( (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE);
	}

	drawIronBlock(yPos, xPos) {
		this.ctx.drawImage(this.resourcesLoader.getSpritesByType(ResourceType.BLOCK_SPRITES1), 0, 0, Config.CELL_SIZE, Config.CELL_SIZE, (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
	}

	drawCementBlock(yPos, xPos) {
		this.ctx.drawImage(this.resourcesLoader.getSpritesByType(ResourceType.BLOCK_SPRITES1), 30, 0, Config.CELL_SIZE, Config.CELL_SIZE, (xPos * Config.CELL_SIZE), (yPos * Config.CELL_SIZE), Config.CELL_SIZE, Config.CELL_SIZE);
	}
}
