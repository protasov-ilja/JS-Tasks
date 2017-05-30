window.onload = function() {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var CANVAS_WIDTH = 1000;
        var CANVAS_HEIGHT = 600;

        var ctx = canvas.getContext('2d');

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        initTick(ctx);

        function degToRad(deg) {
            toDeg = (Math.PI / 180) * deg;

            return toDeg;
        }

        function Pacman(x, y, radius, color) {
            this.COLOR = color;
            this.RADIUS = radius;

            this._x = x;
            this._y = y;
            this._smileAngle = 1;
            this._smileAngleStep = 10; //change speed

            this.getX = function () {
                return this._x;
            };
            this.getY = function () {
                return this._y;
            };
            this.getSmileAngle = function () {
                return this._smileAngle;
            };
            this.calcSmileAngle = function () {
                this._smileAngle += this._smileAngleStep;
                if ((this._smileAngle >= 90) || (this._smileAngle <= 1)) {
                    this._smileAngleStep = -this._smileAngleStep;
                }
            };
        }


        function drawPacman(ctx, Pacman) {
            var cordX = Pacman.getX() + Pacman.RADIUS;
            var cordY = Pacman.getY() + Pacman.RADIUS;
            var smileAngle = degToRad( Pacman.getSmileAngle() );

            ctx.translate(cordX, cordY);
            ctx.rotate(-smileAngle / 2);
            drawPacmanFigure(ctx, 0, 0, Pacman.RADIUS, Pacman.COLOR, smileAngle);
            ctx.rotate(smileAngle / 2);
            ctx.translate(-cordX, -cordY);
            Pacman.isOpened = !Pacman.isOpened;
        }

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

        function initTick(ctx) {
            var pacman = new Pacman(100, 100, 100, "#EFEF11");

            animationTick();

            function animationTick() {
                pacman.calcSmileAngle();
                ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                drawPacman(ctx, pacman);
                window.requestAnimationFrame(animationTick);
            }
        }
    }
};
