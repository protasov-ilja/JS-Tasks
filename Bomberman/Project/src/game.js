let score = 0;
let endOfGame = false;
let canvas = null;
let ctx = null;
let spriteBlock = null;
let spriteHero = null;
let loadedResourcesCount = 0;
let user = null;
let music = false;

window.onload = () => {
	canvas = document.getElementById("canvas");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	ctx = canvas.getContext('2d');

	user = new Player();

	spriteHero = createImage(onItemLoaded);
	spriteHero.src = 'img/sprites/sprite_hero.png';

	spriteBlock = createImage(onItemLoaded);
	spriteBlock.src = 'img/sprites/sprite_block1.png';
};

function onItemLoaded() {
    ++loadedResourcesCount;
    if (loadedResourcesCount === resourcesToLoadCount)
    {
		initGame();
    }
}

document.onkeydown = function (event) {
    if (!endOfGame) {
        switch (event.keyCode) {
            case ARROW_UP:
            case KEY_W:
                event.preventDefault();
                moveUp();
                break;
            case ARROW_RIGHT:
            case KEY_D:
                event.preventDefault();
                moveRight();
                break;
            case ARROW_DOWN:
            case KEY_S:
                event.preventDefault();
                moveDown();
                break;
            case ARROW_LEFT:
            case KEY_A:
                event.preventDefault();
                moveLeft();
        }
    }
};

function moveUp() {
    let nextPos = user.posY - PLAYER_SPEED;

    if (nextPos >= CELL_SIZE) {
        user.posY = nextPos;

        drawGame(user.posX, user.posY);
    }
}

function moveDown() {
    const maxHeight = HEIGHT - (CELL_SIZE * 2);

    let nextPos = user.posY + PLAYER_SPEED;

    if (nextPos <= maxHeight) {
        user.posY = nextPos;

        drawGame(user.posX, user.posY);
    }
}

function moveRight() {
    const maxWidth = WIDTH - CELL_SIZE;

    let nextPos = user.posX + PLAYER_SPEED;

    if (nextPos <= maxWidth) {
        user.posX = nextPos;

        drawGame(user.posX, user.posY);
    }
}

function moveLeft() {
    let nextPos = user.posX - PLAYER_SPEED;

    if (nextPos >= CELL_SIZE) {
        user.posX = nextPos;

        drawGame(user.posX, user.posY);
    }
}

function initGame() {
    const START_POS = 30;
    const START_LIVE = 3;

    user.bombCount = 1;
    user.live = START_LIVE;
    user.posX = START_POS;
    user.posY = START_POS;
    liveForm.innerHTML = user.live;
    bombForm.innerHTML = user.bombCount;

	useTimer();
    drawGame(user.posX, user.posY);
}

function drawGame(currX, currY) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawField();
    drawPlayer(currX, currY);
}

function drawPlayer(currX, currY) {
    ctx.fillStyle = 'red';
    ctx.fillRect(currX, currY, CELL_SIZE, CELL_SIZE);
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
    ctx.fillStyle = 'green';
    ctx.fillRect( (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}

function drawIronBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
}

function drawCementBlock(yPos, xPos) {
    ctx.drawImage(spriteBlock, 30, 0, CELL_SIZE, CELL_SIZE, (xPos * CELL_SIZE), (yPos * CELL_SIZE), CELL_SIZE, CELL_SIZE);
}