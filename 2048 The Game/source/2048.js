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