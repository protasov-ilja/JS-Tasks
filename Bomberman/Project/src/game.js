window.onload = () => {
let score = 0;
let endOfGame = false;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let spriteBlock = createImage(); // "Создаём" изображение
let spriteHero = createImage();
let loadedResourcesCount = 0;
let user = new Player();

canvas.width = WIDTH;
canvas.height = HEIGHT;
// Источник изображения
spriteHero.src = 'img/sprites/sprite_hero.png';
spriteBlock.src = 'img/sprites/sprite_block.png';

function createImage() {
    const image = new Image();
    image.onload = onItemLoaded;

    return image;
}

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
            case KEY_UP_FIRST:
            case KEY_UP_SECOND:
                event.preventDefault();
                moveUp();
                break;
            case KEY_RIGHT_FIRST:
            case KEY_RIGHT_SECOND:
                event.preventDefault();
                moveRight();
                break;
            case KEY_DOWN_FIRST:
            case KEY_DOWN_SECOND:
                event.preventDefault();
                moveDown();
                break;
            case KEY_LEFT_FIRST:
            case KEY_LEFT_SECOND:
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

    user.posX = START_POS;
    user.posY = START_POS;
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
    const GRASS = 0;
    const CEMENT = 1;
    const IRON = 2;

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

};