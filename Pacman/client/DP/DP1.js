function createImage() {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var CANVAS_WIDTH = 1000;
        var CANVAS_HEIGHT = 600;

        var ctx = canvas.getContext('2d');

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        var cordX = 400;
        var cordY = 400;
        var radius = 100;
        var smileAngle = degToRad(radius);

        ctx.translate(cordX, cordY);
        ctx.rotate(-smileAngle / 2);
        drawPacmanFigure(ctx, 0, 0, 100, "#CCCC11", smileAngle);
        ctx.rotate(smileAngle / 2);
        ctx.translate(-cordX, -cordY);



        function drawPacmanFigure(ctx, x, y, radius, color, endAngle)
        {
            var startPoint = {
                x: x + Math.cos(0) * radius,
                y: y + Math.sin(0) * radius
            };
            var endPoint = {
                x: x + Math.cos(endAngle) * radius,
                y: y + Math.sin(endAngle) * radius
            };

            ctx.fillStyle = color;
            ctx.beginPath();
            //рисуем вырез рта
            ctx.moveTo(x, y);
            ctx.lineTo(startPoint.x, startPoint.y);
            ctx.moveTo(x, y);
            ctx.lineTo(endPoint.x, endPoint.y);
            //рисуем тело
            ctx.arc(x, y, radius, endAngle, 0, false);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.fill();
            ctx.closePath();
        }


        function degToRad(deg) {
            toDeg = (Math.PI / 180) * deg;

            return toDeg;
        }
    }
}
createImage();