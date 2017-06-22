var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var WIDTH = 445;
var HEIGHT = 445;
var CELL_SIZE = 100;
canvas.width = WIDTH;
canvas.height = HEIGHT;
var cellX = 0;
var cellY = 0;



moveCellTwo();
ctx.fillRect(215, 0, 15, 450);



function moveCellOne() {
    var move = setInterval(step, 40);
    var pos = 0.1;
    var DELTA = 1;
    var startPos = cellX;

    function step() {
        if (cellX >= startPos + DELTA) {
            clearInterval(move);
        } else {
            ctx.clearRect(cellX, cellY, 200, CELL_SIZE);
            drawCell(cellX, cellY);
            cellX += pos;
        }
    }
}

function moveCellTwo() {
    //сохраняется при начале анимации
    var ANIMATION_DURATION = 1000; //полная длительность анимации
    var DELTA = 1; // весь путь анимации

    var startTime = Date.now(); // начальное время анимации
    var startPoint = cellX; // начальная точка анимации

    step();

    function step() {
        var currTime = Date.now(); // время шага

        ctx.clearRect(cellX, cellY, 190, CELL_SIZE); // избавление от дублей
        cellX += ( (currTime - startTime) / ANIMATION_DURATION * DELTA); // увеличение кординаты
        drawCell(cellX, cellY); // отрисовка ячейки

        if ( (cellX < startPoint + DELTA) && ( (currTime - startTime) <= ANIMATION_DURATION) ) {
            requestAnimationFrame(step); // вызов шага
        }
    }
}

function drawCell(cellX, cellY) {
    cellX = cellX * 100 + cellX * 15;
    cellY = cellY * 100 + cellY * 15;
    ctx.fillStyle = 'green';
    ctx.strokeStyle = '#BAAEA0';
    ctx.fillRect(cellX, cellY, CELL_SIZE, CELL_SIZE);
    ctx.strokeRect(cellX, cellY, CELL_SIZE, CELL_SIZE);
}