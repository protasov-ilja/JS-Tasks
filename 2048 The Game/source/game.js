var COUNT_OF_CELLS = 4;
var DEFAULT_CELL = 2;
var WIDTH = 445;
var HEIGHT = 445;
var CELL_SIZE = 100;

var scoreForm = document.getElementById('scoreNumber');
var bestScoreForm = document.getElementById('bestScoreNumber');
var newGameButton = document.getElementById('newGameButton');
var score = 0;
var bestScore = 0;
var endOfGame = false;
var theField = [];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');


newGameButton.onclick = function (event) {
    event.preventDefault();
    score = 0;
    endOfGame = false;
    canvas.classList.remove('end_game');
    scoreForm.innerHTML = score;
    initGame();
};

function endGame() {
    canvas.classList.add('end_game');
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

        scoreForm.innerHTML = score;

        if (bestScore < score) {
            bestScore = score;
            bestScoreForm.innerHTML = bestScore;
        }
    }
};

function moveRight() {
    var CELLS_AMOUNT = COUNT_OF_CELLS - 1;

    for (var yPos = 0; yPos < COUNT_OF_CELLS; ++yPos) {
        for (var xPos = CELLS_AMOUNT; xPos >= 0; --xPos) {
            if (theField[yPos][xPos].value != 0) {
                var duplicate = false;
                var currX = xPos;
                while ( (currX + 1 < COUNT_OF_CELLS) && !duplicate) {
                    if (!theField[yPos][currX + 1].value) {
                        // moveCellTwo(currX, yPos); //анимация движения
                        theField[yPos][currX + 1].value = theField[yPos][currX].value;
                        theField[yPos][currX].value = 0;
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

function moveLeft() {
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

function moveUp() {
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
                        //
                        theField[currY + 1][xPos].value = theField[currY][xPos].value;
                        theField[currY][xPos].value = 0;
                        currY++;
                    } else if (theField[currY][xPos].value == theField[currY + 1][xPos].value) {
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

// function moveCellTwo(changesCord, otherCord) {
//     //сохраняется при начале анимации
//     var ANIMATION_DURATION = 1000; //полная длительность анимации
//     var DELTA = 1; // весь путь анимации
//
//     var startPoint = changesCord; // начальная точка анимации
//     var startTime = Date.now(); // начальное время анимации
//
//     step();
//
//     function step() {
//         var currTime = Date.now() - startTime; // время шага
//
//         ctx.clearRect(changesCord, otherCord, 190, CELL_SIZE); // избавление от дублей
//         changesCord += (currTime / ANIMATION_DURATION * DELTA); // увеличение кординаты
//         drawCell(theField[otherCord][changesCord]); // отрисовка ячейки
//
//         if ( (changesCord < startPoint + DELTA) && (currTime <= ANIMATION_DURATION) ) {
//              requestAnimationFrame(step); // вызов шага
//         }
//     }
// }

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
function drawCell(currCellCord) {
    var colorF;
    var posValueX = 50;
    var posValueY = 70;
    var fontSize = 60;
    var fontFamily;
    var emptyCell = 0;

    if (currCellCord.value != emptyCell) {
        switch (currCellCord.value) {
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
        if (currCellCord.value > 1000) {
            fontSize = 50;
        }
        fontFamily = fontSize + "px Mogra";
        ctx.fillStyle = colorF;
        ctx.strokeStyle = '#BAAEA0';
        ctx.fillRect(currCellCord.x, currCellCord.y, CELL_SIZE, CELL_SIZE);
        ctx.strokeRect(currCellCord.x, currCellCord.y, CELL_SIZE, CELL_SIZE);
        ctx.beginPath();
        ctx.fillStyle = '#776e65';
        ctx.textAlign = 'center';
        ctx.font = fontFamily;
        ctx.fillText(currCellCord.value, currCellCord.x + posValueX, currCellCord.y + posValueY);
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

    for (var yPos = 1; yPos < COUNT_OF_CELLS; ++yPos) {
        ctx.fillStyle = '#BAAEA0';
        ctx.fillRect(xBackH + lWidth, yBackH, lineWidth, HEIGHT);
        lWidth += 15;
        xBackH += 100;
    }

    var xBackW = 0;
    var yBackW = 100;
    var lHeight = 0;

    for (var xPos = 1; xPos < COUNT_OF_CELLS; ++xPos) {
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