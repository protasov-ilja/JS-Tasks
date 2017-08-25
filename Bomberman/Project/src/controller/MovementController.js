class MovementController {
	constructor(resources, gameController) {
		this._resources = resources;
		this._gameController = gameController;

		document.onkeydown = function (event) {
			if (!this._gameController.endOfGame && !this._gameController.player.kill)
			{
				switch (event.keyCode)
				{
					case KeyCode.SPACE:
						this.stayBomb();
						break;
					case KeyCode.ARROW_UP:
					case KeyCode.W:
						event.preventDefault();
						this._gameController.player.direction = Direction.UP;
						this._gameController.player.mooving = true;

						break;
					case KeyCode.ARROW_RIGHT:
					case KeyCode.D:
						event.preventDefault();
						this._gameController.player.direction = Direction.RIGHT;
						this._gameController.player.mooving = true;

						break;
					case KeyCode.ARROW_DOWN:
					case KeyCode.S:
						event.preventDefault();
						this._gameController.player.direction = Direction.DOWN;
						this._gameController.player.mooving = true;

						break;
					case KeyCode.ARROW_LEFT:
					case KeyCode.A:
						event.preventDefault();
						this._gameController.player.direction = Direction.LEFT;
						this._gameController.player.mooving = true;
				}
			}
		};

		document.onkeyup = () => {
			if (!this._gameController.endOfGame)
			{
				switch (event.keyCode)
				{
					case KeyCode.ARROW_UP:
					case KeyCode.W:
						if (this._gameController.player.direction == Direction.UP)
						{
							this._gameController.player.mooving = false;
						}

						break;
					case KeyCode.ARROW_RIGHT:
					case KeyCode.D:
						if (this._gameController.player.direction == Direction.RIGHT)
						{
							this._gameController.player.mooving = false;
						}

						break;
					case KeyCode.ARROW_DOWN:
					case KeyCode.S:
						if (this._gameController.player.direction == Direction.DOWN)
						{
							this._gameController.player.mooving = false;
						}

						break;
					case KeyCode.ARROW_LEFT:
					case KeyCode.A:
						if (gameController.player.direction == Direction.LEFT)
						{
							this._gameController.player.mooving = false;
						}
				}
			}
		};
	}

	killPlayer(monster) {
		const playerRect = {
			left: this._gameController.player.posX,
			top: this._gameController.player.posY - this._gameController.player.moveSpeed,
			width: Config.PLAYER_SIZE,
			height: Config.PLAYER_SIZE
		};
		const monsterRect = {
			left: monster.posX,
			top: monster.posY - monster.moveSpeed,
			width: Config.MONSTER_SIZE,
			height: Config.MONSTER_SIZE
		};

		if ( MathUtils.intersectsRects(playerRect, monsterRect) ) {
			this.burstPlayer();
		}

		if (this._gameController.player.live < 0 && !this._gameController.player.kill)
		{
			this._gameController.endOfGame = true;
		}
		else if (this._gameController.player.killAnimationComplete)
		{
			this._gameController.player.killAnimationComplete = false;
			this._gameController.player.killAnimationPlaying = false;
			this._gameController.player.kill = false;

			if (this._gameController.player.live >= 0)
			{
				liveForm.innerHTML = '0' + this._gameController.player.live;
				this._gameController.player.startTimeAnimation = Date.now();
				this._gameController.player.posX = Config.START_POS_PLAYER;
				this._gameController.player.posY = Config.START_POS_PLAYER;
			}
		}
	}

	IntersectCreatures(object) {
		for (let i = 0; i < this._gameController.monsters.length; ++i)
		{
			if ( this.intersect(object, this._gameController.monsters[i]) ) {
				if (!this._gameController.monsters[i].killAnimationPlaying)
				{
					this._gameController.monsters[i].setKillTime( Date.now() );
					this._gameController.monsters[i].killAnimationPlaying = true;
					this._gameController.monsters[i].kill = true;
				}
			}
		}

		if ( this.intersect(object, player) )
		{
			this.burstPlayer();
		}
	}

	killMonster(monster) {
		if (monster.killAnimationComplete)
		{
			monster.killAnimationComplete = false;
			monster.killAnimationPlaying = false;
			monster.kill = false;
			return true;
		}
	}

	burstPlayer() {
		if (!this._gameController.player.killAnimationPlaying)
		{
			this._gameController.player.setKillTime( Date.now() );
			this._gameController.player.killAnimationPlaying = true;
			this._gameController.player.kill = true;
			this._gameController.player.live--;
		}
	}

	intersect(object, creature) {
		let creatureRect = {
			left: creature.posX,
			top: creature.posY,
			width: creature.spriteSize,
			height: creature.spriteSize
		};

		let objectRect = {
			left: object._posX,
			top: object._posY,
			width: Config.CELL_SIZE,
			height: Config.CELL_SIZE
		};

		return MathUtils.intersectsRects(objectRect, creatureRect);
	}

	moveCreature(creature) {
		if (!this._gameController.endOfGame && !creature.kill)
		{
			switch (creature.direction)
			{
				case Direction.UP:
					this.moveUp(creature);
					break;
				case Direction.RIGHT:
					this.moveRight(creature);
					break;
				case Direction.DOWN:
					this.moveDown(creature);
					break;
				case Direction.LEFT:
					this.moveLeft(creature);
			}
		}
	}

	stayBomb() {
		if (this._gameController.bombCount < START_BOMB_COUNT)
		{
			let x = Math.round(this._gameController.player.posX / Config.CELL_SIZE) * Config.CELL_SIZE;
			let y = Math.round(this._gameController.player.posY / Config.CELL_SIZE) * Config.CELL_SIZE;

			this._gameController.bombCount++;
			this._gameController.bombs.push( new Bomb(this._resources, Date.now(), x, y) );
		}
	}

	logicOfExplode(bomb) {
		let currPosX = Math.round(bomb.posX / Config.CELL_SIZE);
		let currPosY = Math.round(bomb.posY / Config.CELL_SIZE);

		bomb.addFireBlock(Direction.CENTER, Direction.CENTER);
		this.IntersectCreatures(this._gameController.field[currPosY][currPosX]);
		rightExplode(currPosY ,currPosX);
		leftExplode(currPosY ,currPosX);
		topExplode(currPosY ,currPosX);
		bottomExplode(currPosY ,currPosX);

		function rightExplode(PosY, PosX) {
			for (let j = PosX + 1; j < PosX + bomb.explodeLenght; ++j)
			{
				if (j < Config.WIDTH)
				{
					if (this._gameController.field[PosY][j].type() === FieldType.GRASS)
					{
						bomb.addFireBlock(Direction.RIGHT, Direction.RIGHT);

						this.IntersectCreatures(this._gameController.field[PosY][j]);
					}
					else if (this._gameController.field[PosY][j].type() === FieldType.CEMENT)
					{
						this._gameController.field[PosY][j] = new FieldCell(FieldType.GRASS, PosY, j);
						bomb.addFireBlock(Direction.RIGHT, Direction.WALL);
						break;
					}
					else
					{
						break;
					}
				}
			}
		}

		function leftExplode(PosY, PosX) {
			for (let j = PosX - 1; j > PosX - bomb.explodeLenght; --j)
			{
				if (j > 0) {
					if (j < Config.WIDTH)
					{
						if (this._gameController.field[PosY][j].type() === FieldType.GRASS)
						{
							bomb.addFireBlock(Direction.LEFT, Direction.LEFT);

							this.IntersectCreatures(this._gameController.field[PosY][j]);
						}
						else if (this._gameController.field[PosY][j].type() === FieldType.CEMENT)
						{
							this._gameController.field[PosY][j] = new FieldCell(FieldType.GRASS, PosY, j);
							bomb.addFireBlock(Direction.LEFT, Direction.WALL);
							break;
						}
						else
						{
							break;
						}
					}
				}
			}
		}

		function bottomExplode(PosY, PosX) {
			for (let i = PosY + 1; i < PosY + bomb.explodeLenght; ++i)
			{
				if (i < Config.HEIGHT) {
					if (this._gameController.field[i][PosX].type() === FieldType.GRASS)
					{
						bomb.addFireBlock(Direction.DOWN, Direction.DOWN);

						this.IntersectCreatures(this._gameController.field[i][PosX]);
					}
					else if (this._gameController.field[i][PosX].type() === FieldType.CEMENT)
					{
						this._gameController.field[i][PosX] = new FieldCell(FieldType.GRASS, i, PosX);
						bomb.addFireBlock(Direction.DOWN, Direction.WALL);
						break;
					}
					else
					{
						break;
					}
				}
			}
		}

		function topExplode(PosY, PosX) {
			for (let i = PosY - 1; i > PosY - bomb.explodeLenght; --i)
			{
				if (i > 0) {
					if (this._gameController.field[i][PosX].type() === FieldType.GRASS)
					{
						bomb.addFireBlock(Direction.UP, Direction.UP);

						this.IntersectCreatures(this._gameController.field[i][PosX]);
					}
					else if (this._gameController.field[i][PosX].type() === FieldType.CEMENT)
					{
						this._gameController.field[i][PosX] = new FieldCell(FieldType.GRASS, i, PosX);
						bomb.addFireBlock(Direction.UP, Direction.WALL);
						break;
					}
					else
					{
						break;
					}
				}
			}
		}
	}

	changeDirection(monster) {
		monster.direction = Math.floor(Math.random() * 4);
	}

	moveUp(creature) {
		let j = Math.floor(creature.posX / Config.CELL_SIZE);
		let i = Math.floor(creature.posY /Config. CELL_SIZE);

		const upRowIndex = i - 1;
		const upRow = this._gameController.field[upRowIndex];

		let wallFound = false;
		let stayOnBomb = false;
		let dy = creature.moveSpeed;

		if (upRowIndex >= 0)
		{
			for (let currColumn = Math.max(0, j - 1); (currColumn < upRow.length) && (currColumn <= j + 1) ; ++currColumn)
			{
				if (upRow[currColumn].type() != FieldType.GRASS)
				{
					const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
					const wallRect = {left: currColumn * Config.CELL_SIZE, top: upRowIndex * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};

					if ( MathUtils.intersectsVertical(creatureRect, wallRect) )
					{
						wallFound = true;

						const delta = Math.max(0, creatureRect.top - (wallRect.top + wallRect.height) );
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

						break;
					}
				}
			}
		}

		if (!wallFound)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: Config.CELL_SIZE,
					height: Config.CELL_SIZE
				};

				if ( MathUtils.intersectsRects(objectRect, creatureRect) )
				{
					stayOnBomb = true;
					break;
				}
			}
		}

		if (!wallFound && !stayOnBomb)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: BOMB_SIZE,
					height: BOMB_SIZE
				};

				if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
				{
					const delta = creatureRect.top - (objectRect.top + objectRect.height);

					if (delta >= 0 && delta < Config.CELL_SIZE)
					{
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
						break;
					}
				}
			}
		}

		if ( (dy == 0) && (creature instanceof Monster) )
		{
			this.changeDirection(creature)
		}
		else
		{
			creature.posY = creature.posY - dy;
			creature.direction = Direction.UP;
		}
	}

	moveDown(creature) {
		let j = Math.floor(creature.posX / Config.CELL_SIZE);
		let i = Math.floor(creature.posY / Config.CELL_SIZE);

		const downRowIndex = i + 1;
		const downRow = this._gameController.field[downRowIndex];

		let wallFound = false;
		let stayOnBomb = false;
		let dy = creature.moveSpeed;

		if ( (downRowIndex < Config.COUNT_OF_CELLS_HEIGHT) && (downRowIndex >= 0) )
		{
			for (let currColumn = Math.max(0, j - 1); (currColumn < downRow.length) && (currColumn <= j + 1) ; ++currColumn)
			{
				if (downRow[currColumn].type() != FieldType.GRASS)
				{
					const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
					const wallRect = {left: currColumn * Config.CELL_SIZE, top: downRowIndex * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};

					if (MathUtils.intersectsVertical(creatureRect, wallRect))
					{
						wallFound = true;

						const delta = Math.max(0, wallRect.top - (creatureRect.top + creatureRect.height) );
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

						break;
					}
				}
			}
		}

		if (!wallFound)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: BOMB_SIZE,
					height: BOMB_SIZE
				};

				if ( MathUtils.intersectsRects(objectRect, creatureRect) )
				{
					stayOnBomb = true;
					break;
				}
			}
		}

		if (!wallFound && !stayOnBomb)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: Config.CELL_SIZE,
					height: Config.CELL_SIZE
				};

				if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
				{
					const delta = objectRect.top - (creatureRect.top + creatureRect.height); // player.y - (bomb.y + bomb.height)

					if (delta >= 0 && delta < Config.CELL_SIZE)
					{
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
						break;
					}
				}
			}
		}

		if ( (dy == 0) && (creature instanceof Monster) )
		{
			this.changeDirection(creature)
		}
		else
		{
			creature.posY = creature.posY + dy;
			creature.direction = Direction.DOWN;
		}
	}

	moveRight(creature) {
		let j = Math.floor(creature.posX / Config.CELL_SIZE);
		let i = Math.floor(creature.posY / Config.CELL_SIZE);

		const rightRowIndex = j + 1;
		const rightRow = this._gameController.field;

		let wallFound = false;
		let stayOnBomb = false;
		let dy = creature.moveSpeed;

		if ( (rightRowIndex <  Config.COUNT_OF_CELLS_WIDTH) && (rightRowIndex >= 0) )
		{
			for (let currColumn = Math.max(0, i - 1); (currColumn < rightRow.length) && (currColumn <= i + 1) ; ++currColumn)
			{
				if (rightRow[currColumn][rightRowIndex].type() != FieldType.GRASS)
				{
					const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
					const wallRect = {left: rightRowIndex *  Config.CELL_SIZE, top: currColumn *  Config.CELL_SIZE, width:  Config.CELL_SIZE, height:  Config.CELL_SIZE};

					if ( MathUtils.intersectsHorisontal(creatureRect, wallRect) )
					{
						wallFound = true;

						const delta = Math.max(0, wallRect.left - (creatureRect.left + creatureRect.width) ); //player.y - wall.y + wall.height
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

						break;
					}
				}
			}
		}

		if (!wallFound)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: BOMB_SIZE,
					height: BOMB_SIZE
				};

				if ( MathUtils.intersectsRects(objectRect, creatureRect) )
				{
					stayOnBomb = true;
					break;
				}
			}
		}

		if (!wallFound && !stayOnBomb)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: BOMB_SIZE,
					height: BOMB_SIZE
				};

				if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
				{
					const delta = objectRect.left - (creatureRect.left + creatureRect.width);

					if (delta >= 0 && delta <  Config.CELL_SIZE)
					{
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
						break;
					}
				}
			}
		}

		if ( (dy == 0) && (creature instanceof Monster) )
		{
			this.changeDirection(creature)
		}
		else
		{
			creature.posX = creature.posX + dy;
			creature.direction = Direction.RIGHT;
		}
	}

	moveLeft(creature) {
		let j = Math.floor(creature.posX / Config.CELL_SIZE);
		let i = Math.floor(creature.posY / Config.CELL_SIZE);

		const leftRowIndex = j - 1;
		const leftRow = this._gameController.field;

		let wallFound = false;
		let stayOnBomb = false;
		let dy = creature.moveSpeed;

		if (leftRowIndex >= 0)
		{
			for (let currColumn = Math.max(0, i - 1); (currColumn < leftRow.length) && (currColumn <= i + 1) ; ++currColumn)
			{
				if (leftRow[currColumn][leftRowIndex].type() != FieldType.GRASS)
				{
					const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
					const wallRect = {left: leftRowIndex * Config.CELL_SIZE, top: currColumn * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};

					if ( MathUtils.intersectsHorisontal(creatureRect, wallRect) )
					{
						wallFound = true;

						const delta = Math.max(0, creatureRect.left - (wallRect.left + wallRect.width) );
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;

						break;
					}
				}
			}
		}

		if (!wallFound)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: BOMB_SIZE,
					height: BOMB_SIZE
				};

				if ( MathUtils.intersectsRects(objectRect, creatureRect) )
				{
					stayOnBomb = true;
					break;
				}
			}
		}

		if (!wallFound && !stayOnBomb)
		{
			const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};

			for (const bomb of bombs)
			{
				let objectRect = {
					left: bomb.posX,
					top: bomb.posY,
					width: BOMB_SIZE,
					height: BOMB_SIZE
				};

				if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
				{
					const delta = creatureRect.left - (objectRect.left + objectRect.height);

					if (delta >= 0 && delta < Config.CELL_SIZE)
					{
						dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
						break;
					}
				}
			}
		}

		if ( (dy == 0) && (creature instanceof Monster) )
		{
			this.changeDirection(creature)
		}
		else
		{
			creature.posX = creature.posX - dy;
			creature.direction = Direction.LEFT;
		}
	}
}

// function killPlayer(monster) {
// 	const playerRect = {
// 		left: player.posX,
// 		top: player.posY - player.moveSpeed,
// 		width: Config.PLAYER_SIZE,
// 		height: Config.PLAYER_SIZE
// 	};
// 	const monsterRect = {
// 		left: monster.posX,
// 		top: monster.posY - monster.moveSpeed,
// 		width: Config.MONSTER_SIZE,
// 		height: Config.MONSTER_SIZE
// 	};
//
// 	if ( MathUtils.intersectsRects(playerRect, monsterRect) ) {
// 		burstPlayer();
// 	}
//
// 	if (player.live < 0 && !player.kill)
// 	{
// 		endOfGame = true;
// 	}
// 	else if (player.killAnimationComplete)
// 	{
// 		player.killAnimationComplete = false;
// 		player.killAnimationPlaying = false;
// 		player.kill = false;
//
// 		if (player.live >= 0)
// 		{
// 			liveForm.innerHTML = '0' + player.live;
// 			player.startTimeAnimation = Date.now();
// 			player.posX = Config.START_POS_PLAYER;
// 			player.posY = Config.START_POS_PLAYER;
// 		}
// 	}
// }
//
// function IntersectCreatures(object) {
// 	for (let i = 0; i < monsters.length; ++i)
// 	{
// 		if ( intersect(object, monsters[i]) ) {
// 			if (!monsters[i].killAnimationPlaying)
// 			{
// 				monsters[i].setKillTime( Date.now() );
// 				monsters[i].killAnimationPlaying = true;
// 				monsters[i].kill = true;
// 			}
// 		}
// 	}
//
// 	if ( intersect(object, player) )
// 	{
// 		burstPlayer();
// 	}
// }
//
// function killMonster(monster) {
// 	if (monster.killAnimationComplete)
// 	{
// 		monster.killAnimationComplete = false;
// 		monster.killAnimationPlaying = false;
// 		monster.kill = false;
// 		return true;
// 	}
// }
//
// function burstPlayer() {
// 	if (!player.killAnimationPlaying)
// 	{
// 		player.setKillTime( Date.now() );
// 		player.killAnimationPlaying = true;
// 		player.kill = true;
// 		player.live--;
// 	}
// }
//
// function intersect(object, creature) {
// 		let creatureRect = {
// 			left: creature.posX,
// 			top: creature.posY,
// 			width: creature.spriteSize,
// 			height: creature.spriteSize
// 		};
//
// 		let objectRect = {
// 			left: object._posX,
// 			top: object._posY,
// 			width: Config.CELL_SIZE,
// 			height: Config.CELL_SIZE
// 		};
//
// 	return MathUtils.intersectsRects(objectRect, creatureRect);
// }
//
// function moveCreature(creature) {
// 	if (!endOfGame && !creature.kill)
// 	{
// 		switch (creature.direction)
// 		{
// 			case Direction.UP:
// 				moveUp(creature);
// 				break;
// 			case Direction.RIGHT:
// 				moveRight(creature);
// 				break;
// 			case Direction.DOWN:
// 				moveDown(creature);
// 				break;
// 			case Direction.LEFT:
// 				moveLeft(creature);
// 		}
// 	}
// }
//
// function stayBomb() {
// 	if (bombCount < START_BOMB_COUNT)
// 	{
// 		let x = Math.round(player.posX / Config.CELL_SIZE) * Config.CELL_SIZE;
// 		let y = Math.round(player.posY / Config.CELL_SIZE) * Config.CELL_SIZE;
//
// 		bombCount++;
// 		bombs.push( new Bomb(Date.now(), x, y) );
// 	}
// }
//
// function logicOfExplode(bomb) {
// 	let currPosX = Math.round(bomb.posX / Config.CELL_SIZE);
// 	let currPosY = Math.round(bomb.posY / Config.CELL_SIZE);
//
// 	bomb.addFireBlock(Direction.CENTER, Direction.CENTER);
// 	IntersectCreatures(field[currPosY][currPosX]);
// 	rightExplode(currPosY ,currPosX);
// 	leftExplode(currPosY ,currPosX);
// 	topExplode(currPosY ,currPosX);
// 	bottomExplode(currPosY ,currPosX);
//
// 	function rightExplode(PosY, PosX) {
// 		for (let j = PosX + 1; j < PosX + bomb.explodeLenght; ++j)
// 		{
// 			if (j < Config.WIDTH)
// 			{
// 				if (field[PosY][j].type() === FieldType.GRASS)
// 				{
// 					bomb.addFireBlock(Direction.RIGHT, Direction.RIGHT);
//
// 					IntersectCreatures(field[PosY][j]);
// 				}
// 				else if (field[PosY][j].type() === FieldType.CEMENT)
// 				{
// 					field[PosY][j] = new FieldCell(FieldType.GRASS, PosY, j);
// 					bomb.addFireBlock(Direction.RIGHT, Direction.WALL);
// 					break;
// 				}
// 				else
// 				{
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	function leftExplode(PosY, PosX) {
// 		for (let j = PosX - 1; j > PosX - bomb.explodeLenght; --j)
// 		{
// 			if (j > 0) {
// 				if (j < Config.WIDTH)
// 				{
// 					if (field[PosY][j].type() === FieldType.GRASS)
// 					{
// 						bomb.addFireBlock(Direction.LEFT, Direction.LEFT);
//
// 						IntersectCreatures(field[PosY][j]);
// 					}
// 					else if (field[PosY][j].type() === FieldType.CEMENT)
// 					{
// 						field[PosY][j] = new FieldCell(FieldType.GRASS, PosY, j);
// 						bomb.addFireBlock(Direction.LEFT, Direction.WALL);
// 						break;
// 					}
// 					else
// 					{
// 						break;
// 					}
// 				}
// 			}
// 		}
// 	}
//
// 	function bottomExplode(PosY, PosX) {
// 		for (let i = PosY + 1; i < PosY + bomb.explodeLenght; ++i)
// 		{
// 			if (i < Config.HEIGHT) {
// 				if (field[i][PosX].type() === FieldType.GRASS)
// 				{
// 					bomb.addFireBlock(Direction.DOWN, Direction.DOWN);
//
// 					IntersectCreatures(field[i][PosX]);
// 				}
// 				else if (field[i][PosX].type() === FieldType.CEMENT)
// 				{
// 					field[i][PosX] = new FieldCell(FieldType.GRASS, i, PosX);
// 					bomb.addFireBlock(Direction.DOWN, Direction.WALL);
// 					break;
// 				}
// 				else
// 				{
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	function topExplode(PosY, PosX) {
// 		for (let i = PosY - 1; i > PosY - bomb.explodeLenght; --i)
// 		{
// 			if (i > 0) {
// 				if (field[i][PosX].type() === FieldType.GRASS)
// 				{
// 					bomb.addFireBlock(Direction.UP, Direction.UP);
//
// 					IntersectCreatures(field[i][PosX]);
// 				}
// 				else if (field[i][PosX].type() === FieldType.CEMENT)
// 				{
// 					field[i][PosX] = new FieldCell(FieldType.GRASS, i, PosX);
// 					bomb.addFireBlock(Direction.UP, Direction.WALL);
// 					break;
// 				}
// 				else
// 				{
// 					break;
// 				}
// 			}
// 		}
// 	}
// }
//
// function changeDirection(monster) {
// 	monster.direction = Math.floor(Math.random() * 4);
// }
//
// function moveUp(creature) {
// 	let j = Math.floor(creature.posX / Config.CELL_SIZE);
// 	let i = Math.floor(creature.posY /Config. CELL_SIZE);
//
// 	const upRowIndex = i - 1;
// 	const upRow = field[upRowIndex];
//
// 	let wallFound = false;
// 	let stayOnBomb = false;
// 	let dy = creature.moveSpeed;
//
// 	if (upRowIndex >= 0)
// 	{
// 		for (let currColumn = Math.max(0, j - 1); (currColumn < upRow.length) && (currColumn <= j + 1) ; ++currColumn)
// 		{
// 			if (upRow[currColumn].type() != FieldType.GRASS)
// 			{
// 				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
// 				const wallRect = {left: currColumn * Config.CELL_SIZE, top: upRowIndex * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};
//
// 				if ( MathUtils.intersectsVertical(creatureRect, wallRect) )
// 				{
// 					wallFound = true;
//
// 					const delta = Math.max(0, creatureRect.top - (wallRect.top + wallRect.height) );
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
//
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if (!wallFound)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: Config.CELL_SIZE,
// 				height: Config.CELL_SIZE
// 			};
//
// 			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
// 			{
// 				stayOnBomb = true;
// 				break;
// 			}
// 		}
// 	}
//
// 	if (!wallFound && !stayOnBomb)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
//
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: BOMB_SIZE,
// 				height: BOMB_SIZE
// 			};
//
// 			if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
// 			{
// 				const delta = creatureRect.top - (objectRect.top + objectRect.height);
//
// 				if (delta >= 0 && delta < Config.CELL_SIZE)
// 				{
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if ( (dy == 0) && (creature instanceof Monster) )
// 	{
// 		changeDirection(creature)
// 	}
// 	else
// 	{
// 		creature.posY = creature.posY - dy;
// 		creature.direction = Direction.UP;
// 	}
// }
//
// function moveDown(creature) {
// 	let j = Math.floor(creature.posX / Config.CELL_SIZE);
// 	let i = Math.floor(creature.posY / Config.CELL_SIZE);
//
// 	const downRowIndex = i + 1;
// 	const downRow = field[downRowIndex];
//
// 	let wallFound = false;
// 	let stayOnBomb = false;
// 	let dy = creature.moveSpeed;
//
// 	if ( (downRowIndex < Config.COUNT_OF_CELLS_HEIGHT) && (downRowIndex >= 0) )
// 	{
// 		for (let currColumn = Math.max(0, j - 1); (currColumn < downRow.length) && (currColumn <= j + 1) ; ++currColumn)
// 		{
// 			if (downRow[currColumn].type() != FieldType.GRASS)
// 			{
// 				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
// 				const wallRect = {left: currColumn * Config.CELL_SIZE, top: downRowIndex * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};
//
// 				if (MathUtils.intersectsVertical(creatureRect, wallRect))
// 				{
// 					wallFound = true;
//
// 					const delta = Math.max(0, wallRect.top - (creatureRect.top + creatureRect.height) );
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
//
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if (!wallFound)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: BOMB_SIZE,
// 				height: BOMB_SIZE
// 			};
//
// 			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
// 			{
// 				stayOnBomb = true;
// 				break;
// 			}
// 		}
// 	}
//
// 	if (!wallFound && !stayOnBomb)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
//
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: Config.CELL_SIZE,
// 				height: Config.CELL_SIZE
// 			};
//
// 			if ( MathUtils.intersectsVertical(objectRect, creatureRect) )
// 			{
// 				const delta = objectRect.top - (creatureRect.top + creatureRect.height); // player.y - (bomb.y + bomb.height)
//
// 				if (delta >= 0 && delta < Config.CELL_SIZE)
// 				{
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if ( (dy == 0) && (creature instanceof Monster) )
// 	{
// 		changeDirection(creature)
// 	}
// 	else
// 	{
// 		creature.posY = creature.posY + dy;
// 		creature.direction = Direction.DOWN;
// 	}
// }
//
// function moveRight(creature) {
// 	let j = Math.floor(creature.posX / Config.CELL_SIZE);
// 	let i = Math.floor(creature.posY / Config.CELL_SIZE);
//
// 	const rightRowIndex = j + 1;
// 	const rightRow = field;
//
// 	let wallFound = false;
// 	let stayOnBomb = false;
// 	let dy = creature.moveSpeed;
//
// 	if ( (rightRowIndex <  Config.COUNT_OF_CELLS_WIDTH) && (rightRowIndex >= 0) )
// 	{
// 		for (let currColumn = Math.max(0, i - 1); (currColumn < rightRow.length) && (currColumn <= i + 1) ; ++currColumn)
// 		{
// 			if (rightRow[currColumn][rightRowIndex].type() != FieldType.GRASS)
// 			{
// 				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
// 				const wallRect = {left: rightRowIndex *  Config.CELL_SIZE, top: currColumn *  Config.CELL_SIZE, width:  Config.CELL_SIZE, height:  Config.CELL_SIZE};
//
// 				if ( MathUtils.intersectsHorisontal(creatureRect, wallRect) )
// 				{
// 					wallFound = true;
//
// 					const delta = Math.max(0, wallRect.left - (creatureRect.left + creatureRect.width) ); //player.y - wall.y + wall.height
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
//
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if (!wallFound)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
//
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: BOMB_SIZE,
// 				height: BOMB_SIZE
// 			};
//
// 			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
// 			{
// 				stayOnBomb = true;
// 				break;
// 			}
// 		}
// 	}
//
// 	if (!wallFound && !stayOnBomb)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
//
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: BOMB_SIZE,
// 				height: BOMB_SIZE
// 			};
//
// 			if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
// 			{
// 				const delta = objectRect.left - (creatureRect.left + creatureRect.width);
//
// 				if (delta >= 0 && delta <  Config.CELL_SIZE)
// 				{
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if ( (dy == 0) && (creature instanceof Monster) )
// 	{
// 		changeDirection(creature)
// 	}
// 	else
// 	{
// 		creature.posX = creature.posX + dy;
// 		creature.direction = Direction.RIGHT;
// 	}
// }
//
// function moveLeft(creature) {
// 	let j = Math.floor(creature.posX / Config.CELL_SIZE);
// 	let i = Math.floor(creature.posY / Config.CELL_SIZE);
//
// 	const leftRowIndex = j - 1;
// 	const leftRow = field;
//
// 	let wallFound = false;
// 	let stayOnBomb = false;
// 	let dy = creature.moveSpeed;
//
// 	if (leftRowIndex >= 0)
// 	{
// 		for (let currColumn = Math.max(0, i - 1); (currColumn < leftRow.length) && (currColumn <= i + 1) ; ++currColumn)
// 		{
// 			if (leftRow[currColumn][leftRowIndex].type() != FieldType.GRASS)
// 			{
// 				const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
// 				const wallRect = {left: leftRowIndex * Config.CELL_SIZE, top: currColumn * Config.CELL_SIZE, width: Config.CELL_SIZE, height: Config.CELL_SIZE};
//
// 				if ( MathUtils.intersectsHorisontal(creatureRect, wallRect) )
// 				{
// 					wallFound = true;
//
// 					const delta = Math.max(0, creatureRect.left - (wallRect.left + wallRect.width) );
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
//
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if (!wallFound)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
//
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: BOMB_SIZE,
// 				height: BOMB_SIZE
// 			};
//
// 			if ( MathUtils.intersectsRects(objectRect, creatureRect) )
// 			{
// 				stayOnBomb = true;
// 				break;
// 			}
// 		}
// 	}
//
// 	if (!wallFound && !stayOnBomb)
// 	{
// 		const creatureRect = {left: creature.posX, top: creature.posY, width: creature.spriteSize, height: creature.spriteSize};
//
// 		for (const bomb of bombs)
// 		{
// 			let objectRect = {
// 				left: bomb.posX,
// 				top: bomb.posY,
// 				width: BOMB_SIZE,
// 				height: BOMB_SIZE
// 			};
//
// 			if ( MathUtils.intersectsHorisontal(objectRect, creatureRect) )
// 			{
// 				const delta = creatureRect.left - (objectRect.left + objectRect.height);
//
// 				if (delta >= 0 && delta < Config.CELL_SIZE)
// 				{
// 					dy = delta < creature.moveSpeed ? delta : creature.moveSpeed;
// 					break;
// 				}
// 			}
// 		}
// 	}
//
// 	if ( (dy == 0) && (creature instanceof Monster) )
// 	{
// 		changeDirection(creature)
// 	}
// 	else
// 	{
// 		creature.posX = creature.posX - dy;
// 		creature.direction = Direction.LEFT;
// 	}
// }