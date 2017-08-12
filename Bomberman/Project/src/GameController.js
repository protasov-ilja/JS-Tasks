const DOWN = 0;
const UP = 1;
const RIGHT = 2;
const LEFT = 3;
const CENTER = 4;
const LONG_LEFT = 5;
const LONG_UP = 6;
const WALL = 7;

document.onkeydown = function (event) {
	if (!endOfGame && !player.kill) {
		//console.log(player.posX, player.posY);
		switch (event.keyCode) {
			case SPACE:
				stayBomb();

				break;
			case ARROW_UP:
			case W:
				event.preventDefault();
				player.direction = UP;
				player.mooving = true;

				break;
			case ARROW_RIGHT:
			case D:
				event.preventDefault();
				player.direction = RIGHT;
				player.mooving = true;

				break;
			case ARROW_DOWN:
			case S:
				event.preventDefault();
				player.direction = DOWN;
				player.mooving = true;

				break;
			case ARROW_LEFT:
			case A:
				event.preventDefault();
				player.direction = LEFT;
				player.mooving = true;
		}
	}
};

document.onkeyup = () => {
	if (!endOfGame) {
		switch (event.keyCode) {
			case ARROW_UP:
			case W:
				if (player.direction == UP)
				{
					player.mooving = false;
				}

				break;
			case ARROW_RIGHT:
			case D:
				if (player.direction == RIGHT)
				{
					player.mooving = false;
				}

				break;
			case ARROW_DOWN:
			case S:
				if (player.direction == DOWN)
				{
					player.mooving = false;
				}

				break;
			case ARROW_LEFT:
			case A:
				if (player.direction == LEFT)
				{
					player.mooving = false;
				}
		}
	}
};

function killPlayer(monster) {
	const playerRect = {
		left: player.posX,
		top: player.posY - player.moveSpeed,
		width: PLAYER_SIZE,
		height: PLAYER_SIZE
	};
	const monsterRect = {
		left: monster.posX,
		top: monster.posY - monster.moveSpeed,
		width: MONSTER_SIZE,
		height: MONSTER_SIZE
	};

	if ( MathUtils.intersectsRects(playerRect, monsterRect) ) {
		if (!player.killAnimationPlaying)
		{
			player.setKillTime( Date.now() );
			player.killAnimationPlaying = true;
			player.kill = true;
			player.live--;
		}
	}

	if (player.live < 0 && !player.kill) {
		endOfGame = true;
	}
	else if (player.killAnimationComplete)
	{
		player.killAnimationComplete = false;
		player.killAnimationPlaying = false;
		player.kill = false;

		if (player.live >= 0) {
			liveForm.innerHTML = '0' + player.live;
			player.startTimeAnimation = Date.now();
			player.posX = START_POS_PLAYER;
			player.posY = START_POS_PLAYER;
		}
	}
}

function intersectCreatureAndBomb(creature) {
	let colapse = false;

	for (let i = 0; i < bombs.length; ++i) {
		let bomb = bombs[i];

		let creatureRect = {
			left: creature.posX,
			top: creature.posY - creature.moveSpeed,
			width: creature.spriteSize,
			height: creature.spriteSize
		};

		let bombRectVertical = {
			left: bomb.posX,
			top: bomb.posY + (bomb.explodeLenght * CELL_SIZE),
			width: CELL_SIZE,
			height: (1 + (bomb.explodeLenght * 2) ) * CELL_SIZE
		};

		let bombRectGorisontal = {
			left: bomb.posX - bomb.explodeLenght,
			top: bomb.posY,
			width: ( (bomb.explodeLenght * 2) + 1) * CELL_SIZE,
			height: CELL_SIZE
		};

		if ( MathUtils.intersectsRects(creatureRect, bombRectVertical) && MathUtils.intersectsRects(creatureRect, bombRectGorisontal) ) {
			colapse = true;
		}
	}

	return colapse;
}

function moveCreature(creature) {
	if (!endOfGame && !creature.kill) {
		switch (creature.direction) {
			case UP:
				moveUp(creature);
				break;
			case RIGHT:
				moveRight(creature);
				break;
			case DOWN:
				moveDown(creature);
				break;
			case LEFT:
				moveLeft(creature);
		}
	}
}

function stayBomb() {
	if (bombCount < START_BOMB_COUNT) {
		bombCount++;
		bombs.push( new Bomb( Date.now(), player.posX, player.posY ) );
	}
}

function logicOfExplode(bomb) {
	let currPosX = Math.round(bomb.posX / CELL_SIZE);
	let currPosY = Math.round(bomb.posY / CELL_SIZE);

	field[currPosY][currPosX].getCreateTime( bomb.getExplodedTime() );

	drawExplode(field[currPosY][currPosX].getSprite(CENTER), field[currPosY][currPosX]);
	rightExplode(currPosY ,currPosX);
	leftExplode(currPosY ,currPosX);
	topExplode(currPosY ,currPosX);
	bottomExplode(currPosY ,currPosX);

	function rightExplode(PosY, PosX) {
		for (let i = PosX + 1; i < PosX + bomb.explodeLenght; ++i) {
			if (i < WIDTH) {
				if (field[PosY][i].type() === GRASS) {
					field[PosY][i].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[PosY][i].getSprite(RIGHT), field[PosY][i]);
				} else if (field[PosY][i].type() === CEMENT){
					field[PosY][i] = new Grass(PosY, i);
					field[PosY][i].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[PosY][i].getSprite(WALL), field[PosY][i]);
					break;
				} else {break;}
			}
		}
	}

	function leftExplode(PosY, PosX) {
		for (let i = PosX - 1; i > PosX - bomb.explodeLenght; --i) {
			if (i > 0) {
				if (field[PosY][i].type() === GRASS) {
					field[PosY][i].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[PosY][i].getSprite(LEFT), field[PosY][i]);
				} else if (field[PosY][i].type() === CEMENT){
					field[PosY][i] = new Grass(PosY, i);
					field[PosY][i].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[PosY][i].getSprite(WALL), field[PosY][i]);
					break;
				} else {break;}
			}
		}
	}

	function topExplode(PosY, PosX) {
		for (let i = PosY - 1; i > PosY - bomb.explodeLenght; --i) {
			if (i > 0) {
				if (field[i][PosX].type() === GRASS) {
					field[i][PosX].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[i][PosX].getSprite(UP), field[i][PosX]);
				} else if (field[i][PosX].type() === CEMENT){
					field[i][PosX] = new Grass(i, PosX);
					field[i][PosX].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[i][PosX].getSprite(WALL), field[i][PosX]);
					break;
				} else {break;}
			}
		}
	}

	function bottomExplode(PosY, PosX) {
		for (let i = PosY + 1; i < PosY + bomb.explodeLenght; ++i) {
			if (i < HEIGHT) {
				if (field[i][PosX].type() === GRASS) {
					field[i][PosX].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[i][PosX].getSprite(DOWN), field[i][PosX]);
				} else if (field[i][PosX].type() === CEMENT){
					field[i][PosX] = new Grass(i, PosX);
					field[i][PosX].getCreateTime( bomb.getExplodedTime() );
					drawExplode(field[i][PosX].getSprite(WALL), field[i][PosX]);
					break;
				} else {break;}
			}
		}
	}

	function drawExplode(sprite, object) {
		ctx.drawImage(sprite, 0, 0, CELL_SIZE, CELL_SIZE, object._posX, object._posY, CELL_SIZE, CELL_SIZE);
	}
}

function changeDirection(monster) {
	monster.direction = Math.floor(Math.random() * 4);
}

function moveUp(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosY - 1;

	if (field[nextPos][currPosX].type() === GRASS) {
		creature.posY = creature.posY - creature.moveSpeed;
		creature.direction = UP;
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = creature.posY - blockSize;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posY = creature.posY - step;
			creature.direction = UP;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}

function moveDown(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosY + 1;

	if (field[nextPos][currPosX].type() === GRASS) {
		creature.posY = creature.posY + creature.moveSpeed;
		creature.direction = DOWN;
	} else {
		let creatureBlock = creature.posY + creature.spriteSize;
		let delta = (nextPos * CELL_SIZE) - creatureBlock;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posY = creature.posY + step;
			creature.direction = DOWN;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}

function moveRight(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosX + 1;

	if (field[currPosY][nextPos].type() === GRASS) {
		creature.posX = creature.posX + creature.moveSpeed;
		creature.direction = RIGHT;
	} else {
		let creatureBlock = creature.posX + creature.spriteSize;
		let delta = (nextPos * CELL_SIZE) - creatureBlock;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posX = creature.posX + step;
			creature.direction = RIGHT;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}

function moveLeft(creature) {
	let currPosX = Math.round(creature.posX / CELL_SIZE);
	let currPosY = Math.round(creature.posY / CELL_SIZE);
	let nextPos = currPosX - 1;

	if (field[currPosY][nextPos].type() === GRASS) {
		creature.posX = creature.posX - creature.moveSpeed;
		creature.direction = LEFT;
	} else {
		let blockSize = nextPos * CELL_SIZE + CELL_SIZE;
		let delta = creature.posX - blockSize;

		if (delta > 0) {
			let step = delta < creature.moveSpeed ? delta : creature.moveSpeed;

			creature.posX = creature.posX - step;
			creature.direction = LEFT;
		} else {
			if (creature instanceof Monster) {
				changeDirection(creature);
			}
		}
	}
}
