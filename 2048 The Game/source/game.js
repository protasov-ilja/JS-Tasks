var COUNT_OF_CELLS = 4;
var DEFAULT_CELL = 2;

var scoreForm = document.getElementById('scoreNumber');
var bestScoreForm = document.getElementById('bestScoreNumber');
var newGameButton = document.getElementById('newGameButton');
var score = 0;
var bestScore = 0;
var endOfGame = false;

newGameButton.onclick = function (event) {
    event.preventDefault();
    initGame();
};

function mainGame() {
    initGame();

    while(!endOfGame) {
       startGame(theField);
    }

    endGame();
}

function endGame() {
    canvas.style.opacity = '0.3';
    canvas.style.transitionDuration = '0.5s';
}

function initGame() {
    var theField = [];

    fieldInit(theField);
    drawField(theField);

    for (var k = 1; k <= DEFAULT_CELL; ++k) {
        addNewCell(theField);
    }

    function fieldInit(theField) {
        for (var i = 0; i < COUNT_OF_CELLS; ++i) {
            theField[i] = [];
            for (var j = 0; j < COUNT_OF_CELLS; ++j) {
                theField[i][j] = new Cell(i, j);
            }
        }

        function Cell(xCord, yCord) {
            this.value = 0;
            this.x = xCord * 100 + 15 * xCord;
            this.y = yCord * 100 + 15 * yCord;
        }
    } // создание и заполнение поля ячейками если number = 0 то их посути нет
}

document.onkeydown = function (event) {
    if (!endOfGame) {
        switch (event.keyCode) {
            case 38:
            case 87:
                moveUp(theField);
                break;
            case 39:
            case 68:
                moveRight(theField);
                break;
            case 40:
            case 83:
                moveDown(theField);
                break;
            case 37:
            case 65:
                moveLeft(theField);
        }

        scoreForm.innerHTML = score;

        if (bestScore < score) {
            bestScore = score;
            bestScoreForm.innerHTML = bestScore;
        }
    }

    function moveRight(theField) {
        for (var j = 0; j < COUNT_OF_CELLS; ++j) {
            for (var i = COUNT_OF_CELLS; i == 0; --i) {
                if (theField[i][j].value) {
                    var duplicate = false;
                    var currX = i;
                    while (currX < COUNT_OF_CELLS - i && !duplicate) {
                        if (!theField[currX + 1][j].value) {
                            theField[currX + 1][j].value = theField[currX][j].value;
                            theField[currX][j].value = 0;
                            currX++;
                        } else if (theField[i][j].value == theField[currX + 1][j].value) {
                            theField[currX + 1][j].value *= 2;
                            score += theField[currX + 1][j].value;
                            theField[currX][j].value = 0;
                            duplicate = true;
                        } else {
                            duplicate = true;
                        }
                    }
                }
            }
        }
        addNewCell(theField);
    }

    function moveLeft(theField) {
        for (var j = 0; j < COUNT_OF_CELLS; ++j) {
            for (var i = 0; i < COUNT_OF_CELLS; ++i) {
                if (theField[i][j].value) {
                    var duplicate = false;
                    var currX = i;
                    while (currX < 0 && !duplicate) {
                        if (!theField[currX - 1][j].value) {
                            theField[currX - 1][j].value = theField[currX][j].value;
                            theField[currX][j].value = 0;
                            currX--;
                        } else if (theField[i][j].value == theField[currX - 1][j].value) {
                            theField[currX - 1][j].value *= 2;
                            score += theField[currX - 1][j].value;
                            theField[currX][j].value = 0;
                            duplicate = true;
                        } else {
                            duplicate = true;
                        }
                    }
                }
            }
        }
        addNewCell(theField);
    }

    function moveUp(theField) {
        for (var i = 0; i < COUNT_OF_CELLS; ++i) {
            for (var j = 0; j < COUNT_OF_CELLS; ++j) {
                if (theField[i][j].value) {
                    var duplicate = false;
                    var currY = j;
                    while (currY < 0 && !duplicate) {
                        if (!theField[currY - 1][j].value) {
                            theField[currY - 1][j].value = theField[currY][j].value;
                            theField[currY][j].value = 0;
                            currY--;
                        } else if (theField[i][j].value == theField[currY + 1][j].value) {
                            theField[currY - 1][j].value *= 2;
                            score += theField[currY - 1][j].value;
                            theField[currY][j].value = 0;
                            duplicate = true;
                        } else {
                            duplicate = true;
                        }
                    }
                }
            }
        }
        addNewCell(theField);
    }

    function moveDown(theField) {
        for (var i = 0; i < COUNT_OF_CELLS; ++i) {
            for (var j = COUNT_OF_CELLS; j == 0; --j) {
                if (theField[i][j].value) {
                    var duplicate = false;
                    var currY = j;
                    while (currY < COUNT_OF_CELLS - j && !duplicate) {
                        if (!theField[currY + 1][j].value) {
                            theField[currY + 1][j].value = theField[currY][j].value;
                            theField[currY][j].value = 0;
                            currY++;
                        } else if (theField[i][j].value == theField[currY + 1][j].value) {
                            theField[currY + 1][j].value *= 2;
                            score += theField[currY + 1][j].value;
                            theField[currY][j].value = 0;
                            duplicate = true;
                        } else {
                            duplicate = true;
                        }
                    }
                }
            }
        }
        addNewCell(theField);
    }
};


//отрисовка текущего состояния поля
function drawField(theField) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var WIDTH = 445;
    var HEIGHT = 445;
    var CELL_SIZE = 100;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    drawBackground();

    for (var i = 0; i < COUNT_OF_CELLS; ++i) {
        for (var j = 0; j < COUNT_OF_CELLS; ++j) {
            drawCell(theField[i][j]);
        }
    }
//рисуем ячейки
    function drawCell(Cell) {
        var colorF;
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
            ctx.font = "60px Mogra";
            ctx.fillText(Cell.value, Cell.x + 50, Cell.y + 70);
            ctx.fill();
            ctx.closePath();
        }
    }
//отрисовываем задний план(линии)
    function drawBackground() {
        var xBackH = 100;
        var yBackH = 0;
        var k = 0;

        for (var i = 1; i <= 3; ++i) {
            ctx.fillStyle = '#BAAEA0';
            ctx.fillRect(xBackH + k, yBackH, 15, HEIGHT);
            k += 15;
            xBackH += 100;
        }

        var xBackW = 0;
        var yBackW = 100;
        var g = 0;

        for (var j = 1; j <= 3; ++j) {
            ctx.fillStyle = '#BAAEA0';
            ctx.fillRect(xBackW, yBackW + g, WIDTH, 15);
            g += 15;
            yBackW += 100;
        }
    }
}

function addNewCell(theField) {
    var freeCell = false;
    var emptyCell = false;

    for (var i = 0; i < COUNT_OF_CELLS; ++i) {
        for (var j = 0; j < COUNT_OF_CELLS; ++j) {
            if(!theField[i][j].value) {
                freeCell = true;
            }
        }
    }

    if (!freeCell) {
        endOfGame = true;
    } else {
        while(!emptyCell) {
            var xCord = Math.floor(Math.random() * COUNT_OF_CELLS);
            var yCord = Math.floor(Math.random() * COUNT_OF_CELLS);
            if (!theField[xCord][yCord].value) {
                theField[xCord][yCord].value = 2 * Math.ceil(Math.random() * 2);
                drawField(theField);
                emptyCell = true;
            }
        }
    }
}