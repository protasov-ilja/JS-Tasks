const FIELD_COLOR1 = 'green';
const FIELD_COLOR2 = '#ececb7';

let endOfGame = false;
let player = null;
let balloon1 = null;
let balloon2 = null;
let requestAnimationFrameId;
let bombs = [];
let bombCount = 0;

function initGame() {
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

function addMonster(monster, currX, currY, sprites) {
	monster = new Monster(currX, currY, sprites, Date.now() );
	monsters.push(monster);
}

function animate() {
	step();

	function step() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);

		drawField();

		for (let i = 0; i < bombs.length; ++i) {
			if (bombs[i].getCurrTime() - bombs[i].getCreateTime() < BOMB_TIMER) {
				drawCreature(bombs[i], bombs[i].getCurrSprite() );
			} else {
				if (!bombs[i].isExploded()) {
					bombs[i].explode( bombs[i].getCurrTime() );
					console.log('bum');
				}
			}
		}

		for (let i = 0; i < bombs.length; ++i) {
			if ( bombs[i].isExploded() ) {
				// Рисуем взрыв
				logicOfExplode(bombs[i]);

				if ( bombs[i].isExplodeCompleted(bombs[i].getCurrTime() ) ) {
					console.log('delete bomb', i, bombs.length);

					bombs.splice(i, 1); // удаляем бомбу i
					// уменьшаем индекс i на 1
					--bombCount;
				}
			}
		}
			// аналогично со стеной, для получения спрайта используем getCurrentSprite

		if (player.mooving) {
			moveCreature(player);
		}

		for (let i = 0; i < monsters.length; ++i) {
			moveCreature(monsters[i]);
			drawCreature(monsters[i], monsters[i].getCurrSprite() );
			killPlayer(monsters[i]);
		}

		if (endOfGame) {
			endTheGame();
		} else if (monsters.length == 0) {
			winTheGame();
		} else {
			drawCreature(player, player.getCurrSprite() );
		}


		requestAnimationFrameId = requestAnimationFrame(step); // вызов шага
	}
}

function drawCreature(creature, sprite) {
	ctx.drawImage(sprite, 0, 0, creature.spriteSize, creature.spriteSize, creature.posX, creature.posY, creature.spriteSize, creature.spriteSize);
}

function drawField() {
    for (let currPosY = 0; currPosY < COUNT_OF_CELLS_HEIGHT; ++currPosY) {
        for (let currPosX = 0; currPosX < COUNT_OF_CELLS_WIDTH; ++currPosX) {
            if (field[currPosY][currPosX].type() === GRASS) {
                drawGrass(currPosY, currPosX);
            } else if (field[currPosY][currPosX].type() === CEMENT) {
                drawCementBlock(currPosY, currPosX);
            } else if (field[currPosY][currPosX].type() === IRON) {
                drawIronBlock(currPosY, currPosX);
            }
        }
    }
}

function drawGrass(yPos, xPos) {
    ctx.fillStyle = FIELD_COLOR1;
    ctx.fillRect( (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}

function drawIronBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock1, 0, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
}

function drawCementBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock1, 30, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}