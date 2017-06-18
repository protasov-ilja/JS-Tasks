var COUNT_OF_CELLS = 4;
var DEFAULT_CELL = 2;

var scoreForm = document.getElementById('scoreNumber');
var bestScoreForm = document.getElementById('bestScoreNumber');
var newGameButton = document.getElementById('newGameButton');
var score;
var bestScore = 0;
var endOfGame = false;
var theField = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var WIDTH = 445;
var HEIGHT = 445;
var CELL_SIZE = 100;

newGameButton.onclick = function (event) {
    event.preventDefault();
    endOfGame = false;
    score = 0;
    scoreForm.innerHTML = score;
    canvas.style.opacity = '1';
    canvas.style.transitionDuration = '0.5s';
    initGame();
};

function endGame() {
    canvas.style.opacity = '0.3';
    canvas.style.transitionDuration = '0.5s';
}

function initGame() {
    fieldInit(theField);
    drawField();

    for (var AmountCell = 1; AmountCell <= DEFAULT_CELL; ++AmountCell) {
        addNewCell();
    }
}

function fieldInit(theField) {
    for (var posY = 0; posY < COUNT_OF_CELLS; ++posY) {
        theField[posY] = [];
        for (var posX = 0; posX < COUNT_OF_CELLS; ++posX) {
            theField[posY][posX] = new Cell(posY, posX);
        }
    }
} // создание и заполнение поля ячейками если number = 0 то их посути нет

function Cell(yCord, xCord) {
    var cellSize = 100;
    var lineSize = 15;

    this.value = 0;
    this.x = xCord * cellSize + lineSize * xCord;
    this.y = yCord * cellSize + lineSize * yCord;
}

document.onkeydown = function (event) {
    event.preventDefault();
    if (!endOfGame) {
        switch (event.keyCode) {
            case 38:
            case 87:
                moveUp();
                break;
            case 39:
            case 68:
                moveRight();
                break;
            case 40:
            case 83:
                moveDown();
                break;
            case 37:
            case 65:
                moveLeft();
        }

        scoreForm.innerHTML = score;

        if (bestScore < score) {
            bestScore = score;
            bestScoreForm.innerHTML = bestScore;
        }
    }
};

function moveRight() {//частично готово
    var CELLS_AMOUNT = COUNT_OF_CELLS - 1;

    for (var yPos = 0; yPos < COUNT_OF_CELLS; ++yPos) {
        for (var xPos = CELLS_AMOUNT; xPos >= 0; --xPos) {
            if (theField[yPos][xPos].value != 0) {
                var duplicate = false;
                var currX = xPos;
                while ( (currX + 1 < COUNT_OF_CELLS) && !duplicate) {
                    if (!theField[yPos][currX + 1].value) {
                        theField[yPos][currX + 1].value = theField[yPos][currX].value;
                        theField[yPos][currX].value = 0;
                        //анимация движения
                        currX++;
                    } else if (theField[yPos][currX].value == theField[yPos][currX + 1].value) {
                        theField[yPos][currX + 1].value *= 2;
                        score += theField[yPos][currX + 1].value;
                        theField[yPos][currX].value = 0;
                        //анимация движения + анимация слияния
                        duplicate = true;
                    } else {
                        duplicate = true;
                    }
                }
            }
        }
    }
    addNewCell();
}

function moveLeft() {//частично готово
    for (var yPos = 0; yPos < COUNT_OF_CELLS; ++yPos) {
        for (var xPos = 1; xPos < COUNT_OF_CELLS; ++xPos) {
            if (theField[yPos][xPos].value != 0) {
                var duplicate = false;
                var currX = xPos;
                while ( (currX > 0) && !duplicate) {
                    if (!theField[yPos][currX - 1].value) {
                        theField[yPos][currX - 1].value = theField[yPos][currX].value;
                        theField[yPos][currX].value = 0;
                        //анимация движения
                        currX--;
                    } else if (theField[yPos][currX].value == theField[yPos][currX - 1].value) {
                        theField[yPos][currX - 1].value *= 2;
                        score += theField[yPos][currX - 1].value;
                        theField[yPos][currX].value = 0;
                        //анимация движения + анимация слияния
                        duplicate = true;
                    } else {
                        duplicate = true;
                    }
                }
            }
        }
    }
    addNewCell();
}

function moveUp() {//частично готово
    for (var xPos = 0; xPos < COUNT_OF_CELLS; ++xPos) {
        for (var yPos = 1; yPos < COUNT_OF_CELLS; ++yPos) {
            if (theField[yPos][xPos].value != 0) {
                var duplicate = false;
                var currY = yPos;
                while ( (currY > 0) && !duplicate) {
                    if (!theField[currY - 1][xPos].value) {
                        theField[currY - 1][xPos].value = theField[currY][xPos].value;
                        theField[currY][xPos].value = 0;
                        //анимация движения
                        currY--;
                    } else if (theField[currY][xPos].value == theField[currY - 1][xPos].value) {
                        theField[currY - 1][xPos].value *= 2;
                        score += theField[currY - 1][xPos].value;
                        theField[currY][xPos].value = 0;
                        //анимация движения + анимация слияния
                        duplicate = true;
                    } else {
                        duplicate = true;
                    }
                }
            }
        }
    }
    addNewCell();
}

function moveDown() {
    var CELLS_AMOUNT = COUNT_OF_CELLS - 1;

    for (var xPos = 0; xPos < COUNT_OF_CELLS; ++xPos) {
        for (var yPos = CELLS_AMOUNT; yPos >= 0; --yPos) {
            if (theField[yPos][xPos].value != 0) {
                var duplicate = false;
                var currY = yPos;
                while ( (currY + 1 < COUNT_OF_CELLS) && !duplicate) {
                    if (!theField[currY + 1][xPos].value) {
                        theField[currY + 1][xPos].value = theField[currY][xPos].value;
                        theField[currY][xPos].value = 0;
                        //анимация движения
                        currY++;
                    } else if (theField[yPos][xPos].value == theField[currY + 1][xPos].value) {
                        theField[currY + 1][xPos].value *= 2;
                        score += theField[currY + 1][xPos].value;
                        theField[currY][xPos].value = 0;
                        //анимация движения + анимация слияния
                        duplicate = true;
                    } else {
                        duplicate = true;
                    }
                }
            }
        }
    }
    addNewCell();
}

//отрисовка текущего состояния поля
function drawField() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    drawBackground();

    for (var yPos = 0; yPos < COUNT_OF_CELLS; ++yPos) {
        for (var xPos = 0; xPos < COUNT_OF_CELLS; ++xPos) {
            drawCell(theField[yPos][xPos]);
        }
    }
}

//рисуем ячейки
function drawCell(Cell) {
    var colorF;
    var posValueX = 50;
    var posValueY = 70;
    var fontFamily = "60px Mogra";

    if (Cell.value != 0) {
        switch (Cell.value) {
            case 2 : colorF = "#EEE4DA"; break;
            case 4 : colorF = "#ECE0C8"; break;
            case 8 : colorF = "#F5AF7C"; break;
            case 16 : colorF = "#F59563"; break;
            case 32 : colorF = "#F27C3F"; break;
            case 64 : colorF = "#F3651C"; break;
            case 128 : colorF = "#E9A512"; break;
            case 256 : colorF = "#F8BC3C"; break;
            case 512 : colorF = "#EDC850"; break;
            case 1024 : colorF = "#E91A1A"; break;
            case 2048 : colorF = "#EDC63D"; break;
        }

        ctx.fillStyle = colorF;
        ctx.strokeStyle = '#BAAEA0';
        ctx.fillRect(Cell.x, Cell.y, CELL_SIZE, CELL_SIZE);
        ctx.strokeRect(Cell.x, Cell.y, CELL_SIZE, CELL_SIZE);
        ctx.beginPath();
        ctx.fillStyle = '#776e65';
        ctx.textAlign = 'center';
        ctx.font = fontFamily;
        ctx.fillText(Cell.value, Cell.x + posValueX, Cell.y + posValueY);
        ctx.fill();
        ctx.closePath();
    }
}
//отрисовываем задний план(линии)
function drawBackground() {
    var xBackH = 100;
    var yBackH = 0;
    var lWidth = 0;
    var lineWidth = 15;

    for (var yPos = 1; yPos <= 3; ++yPos) {
        ctx.fillStyle = '#BAAEA0';
        ctx.fillRect(xBackH + lWidth, yBackH, lineWidth, HEIGHT);
        lWidth += 15;
        xBackH += 100;
    }

    var xBackW = 0;
    var yBackW = 100;
    var lHeight = 0;

    for (var xPos = 1; xPos <= 3; ++xPos) {
        ctx.fillStyle = '#BAAEA0';
        ctx.fillRect(xBackW, yBackW + lHeight, WIDTH, lineWidth);
        lHeight += 15;
        yBackW += 100;
    }
}

function addNewCell() {
    var freeCell = false;
    var emptyCell = false;

    for (var yPos = 0; yPos < COUNT_OF_CELLS; ++yPos) {
        for (var xPos = 0; xPos < COUNT_OF_CELLS; ++xPos) {
            if(!theField[yPos][xPos].value) {
                freeCell = true;
            }
        }
    }

    if (!freeCell) {
        endOfGame = true;
        endGame();
    } else {
        while(!emptyCell) {
            var xCord = Math.floor(Math.random() * COUNT_OF_CELLS);
            var yCord = Math.floor(Math.random() * COUNT_OF_CELLS);

            if (!theField[yCord][xCord].value) {
                theField[yCord][xCord].value = 2 * Math.ceil(Math.random() * 2);
                drawField();
                emptyCell = true;
            }
        }
    }
}