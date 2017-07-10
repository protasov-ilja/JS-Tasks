const COUNT_OF_CELLS_WIDTH = 16;
const COUNT_OF_CELLS_HEIGHT = 13;
const WIDTH = 480;
const HEIGHT = 390;
const CELL_SIZE = 30;
const PLAYER_SPEED = 10;
let score = 0;
let endOfGame = false;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let spriteBlock = createImage(); // "Создаём" изображение
let spriteHero = createImage();

let field = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [2, 0, 2, 1, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0],
    [2, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
    [2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 2, 0, 2, 1, 2, 0],
    [2, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
    [2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 1, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 2, 0, 2, 0],
    [2, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [2, 0, 2, 0, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0],
    [2, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

class Player {
    constructor() {
        this.posX = 30;
        this.posY = 30;
    }
}

const resourcesToLoadCount = 2;
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
    if (loadedResourcesCount == resourcesToLoadCount)
    {
        initGame();
    }
}

document.onkeydown = function (event) {
    if (!endOfGame) {
        switch (event.keyCode) {
            case 38:
            case 87:
                event.preventDefault();
                moveUp();
                break;
            case 39:
            case 68:
                event.preventDefault();
                moveRight();
                break;
            case 40:
            case 83:
                event.preventDefault();
                moveDown();
                break;
            case 37:
            case 65:
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
    let nextPos = user.posY + PLAYER_SPEED;
    const MAX_HEIGHT = HEIGHT - (CELL_SIZE * 2);

    if (nextPos <= MAX_HEIGHT) {
        user.posY = nextPos;

        drawGame(user.posX, user.posY);
    }
}

function moveRight() {
    let nextPos = user.posX + PLAYER_SPEED;
    const MAX_WIDTH = WIDTH - CELL_SIZE;

    if (nextPos <= MAX_WIDTH) {
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
    let startPos = 30;

    user.posX = startPos;
    user.posY = startPos;
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
    for (let currPosY = 0; currPosY < COUNT_OF_CELLS_HEIGHT; ++currPosY){
        for (let currPosX = 0; currPosX < COUNT_OF_CELLS_WIDTH; ++currPosX) {
            if (field[currPosY][currPosX] === 0) {
                drawGrass(currPosY, currPosX);
            } else if (field[currPosY][currPosX] === 1) {
                drawCementBlock(currPosY, currPosX);
            } else if (field[currPosY][currPosX] === 2) {
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