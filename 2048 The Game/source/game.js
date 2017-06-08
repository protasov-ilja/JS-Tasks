var scoreForm = document.getElementById('score_number');
var bestScoreForm = document.getElementById('best_score_number');
var newGameButton = document.getElementById('new_game_button');
var score = 0;
var bestScore = 0;
var endOfGame = false;

function restartGame() {
    newGameButton.onclick = function () {
        cleanCanvas();
        mainGame();
    };
}

function mainGame() {
    initGame();

    while(!endOfGame) {
       startGame();
    }

    endGame();
}

function endGame() {
    canvas.style.opacity = '0.3';
}

function initGame() {
    var COUNT_OF_CELLS = 4;
    var theField = [];

    fieldInit();
    
    function fieldInit() {
        for (var i = 0; i < COUNT_OF_CELLS; ++i) {
            theField[i] = [];
            for (var j = 0; j < COUNT_OF_CELLS; ++j) {
                theField[i][j] = new Cell(i, j);
            }
        }

        function Cell(xPos, yPos) {
            this.number = 0;
            this.x = xPos;
            this.y = yPos;
        }
    } // создание и заполнение поля ячейками если number = 0 то их посути нет
}

function cleanCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

document.onkeydown = function(event) {
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

function drawField() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    var WIDTH = 445;
    var HEIGHT = 445;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    drawCell(0, 0, 100, 2);
    drawCell(115, 0, 100, 64);
    drawBackground();

    function drawCell(cellX, cellY, cellSize, cellNum) {
        var colorF;
        if (cellNum != 0) {
            switch (cellNum){
                case 0 : colorF = "#CDC1B3"; break;
                case 2 : colorF = "#EEE4DA"; break;
                case 4 : colorF = "#EEF4DE"; break;
                case 8 : colorF = "#EEE4DA"; break;
                case 16 : colorF = "#EEE4DC"; break;
                case 32 : colorF = "#EEE4DC"; break;
                case 64 : colorF = "#EEE4DC"; break;
                case 128 : colorF = "#EEE4DC"; break;
                case 256 : colorF = "#EEE4DC"; break;
                case 512 : colorF = "#EEE4DC"; break;
                case 1024 : colorF = "#EEE4DC"; break;
                case 2048 : colorF = "#EEE4DC"; break;
                case 4096 : colorF = "#EEE4DC"; break;
            }

            ctx.fillStyle = colorF;
            ctx.strokeStyle = '#BAAEA0';
            ctx.fillRect(cellX, cellY, cellSize, cellSize);
            ctx.strokeRect(cellX, cellY, cellSize, cellSize);
            ctx.beginPath();
            ctx.fillStyle = '#776e65';
            ctx.textAlign = 'center';
            ctx.font = "60px Mogra";
            ctx.fillText(cellNum, cellX + 50, cellY + 70);
            ctx.fill();
            ctx.closePath();
        }
    }

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

        xBackW = 0;
        yBackW = 100;
        var g = 0;

        for (var j = 1; j <= 3; ++j) {
            ctx.fillStyle = '#BAAEA0';
            ctx.fillRect(xBackW, yBackW + g, WIDTH, 15);
            g += 15;
            yBackW += 100;
        }
    }
}
drawField();