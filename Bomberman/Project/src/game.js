var COUNT_OF_CELLS_WIDTH = 16;
var COUNT_OF_CELLS_HEIGHT = 13;
var WIDTH = 480;
var HEIGHT = 390;
var CELL_SIZE = 30;
var score = 0;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

drawField();

function drawField() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    var spriteBlock = new Image(); // "Создаём" изображение
    spriteBlock.src = 'img/sprites/sprite1.png'; // Источник изображения



    for (var currPosY = 1; currPosY < COUNT_OF_CELLS_HEIGHT; ++currPosY) {
        for (var currPosX = 1; currPosX < COUNT_OF_CELLS_WIDTH; ++currPosX) {
            ctx.fillStyle = 'green';
            ctx.fillRect( (currPosX * CELL_SIZE), (currPosY * CELL_SIZE), CELL_SIZE, CELL_SIZE)
        }
    }

    var yPos = 0;

    for (var currPos = 0; currPos < COUNT_OF_CELLS_WIDTH; ++currPos) {
        var xPos = currPos * CELL_SIZE;

        spriteBlock.onload = function () { // Событие onLoad, ждём момента пока загрузится изображение
            ctx.drawImage(spriteBlock, 0, 0, CELL_SIZE, CELL_SIZE, xPos, yPos, CELL_SIZE, CELL_SIZE);// Рисуем изображение от точки с координатами 0, 0
        };

    }
}
