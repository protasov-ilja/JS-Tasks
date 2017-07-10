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
let spriteBlock = new Image(); // "Создаём" изображение
let spriteHero = new Image();

class Player {
    constructor() {
        this.posX = 30;
        this.posY = 30;
    }
}

let user = new Player();

canvas.width = WIDTH;
canvas.height = HEIGHT;
// Источник изображения
spriteHero.src = 'img/sprites/sprite_hero.png';
spriteBlock.src = 'img/sprites/sprite_block.png';

initGame();


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
    for (let currPosY = 1; currPosY < (COUNT_OF_CELLS_HEIGHT - 1); ++currPosY) {
        for (let currPosX = 1; currPosX < COUNT_OF_CELLS_WIDTH; ++currPosX) {
            ctx.fillStyle = 'green';
            ctx.fillRect( (currPosX * CELL_SIZE), (currPosY * CELL_SIZE), CELL_SIZE, CELL_SIZE)
        }
    }

    spriteBlock.onload = function () { // Событие onLoad, ждём момента пока загрузится изображение
        drawIronBlock();

        // drawCementBlock()
    }
}

function drawIronBlock() {
    for (let currPos = 0; currPos < COUNT_OF_CELLS_WIDTH; ++currPos) {
        let xPos = currPos * CELL_SIZE;

        ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, xPos, 0, CELL_SIZE, CELL_SIZE); // Рисуем изображение от точки с координатами 0, 0
    }

    for (let currPos = 0; currPos < COUNT_OF_CELLS_WIDTH; ++currPos) {
        let yPos = (COUNT_OF_CELLS_HEIGHT - 1) * CELL_SIZE;
        let xPos = currPos * CELL_SIZE;

        ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, xPos, yPos, CELL_SIZE, CELL_SIZE);
    }

    for (let currPos = 1; currPos < COUNT_OF_CELLS_HEIGHT - 1; ++currPos) {
        let yPos = currPos * CELL_SIZE;
        let xPos = 0;

        ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, xPos, yPos, CELL_SIZE, CELL_SIZE);
    }

    let nextBlock = 2;

    for (let currPosY = nextBlock; currPosY < (COUNT_OF_CELLS_HEIGHT - 1); currPosY = currPosY + nextBlock) {
        let yPos = currPosY * CELL_SIZE;

        for (let currPosX = nextBlock; currPosX < COUNT_OF_CELLS_WIDTH; currPosX = currPosX + nextBlock) {
            let xPos = currPosX * CELL_SIZE;

            ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, xPos, yPos, CELL_SIZE, CELL_SIZE);
        }
    }
}