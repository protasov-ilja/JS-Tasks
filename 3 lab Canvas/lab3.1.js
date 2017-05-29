function createImage() {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var WIDTH = 400;
        var HEIGHT = 380;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;

//разметка холста
        function canvasLines() {
            for (var x = 0.5; x < WIDTH; x += 10) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, HEIGHT);
            }
            for (var y = 0.5; y < HEIGHT; y += 10) {
                ctx.moveTo(0, y);
                ctx.lineTo(WIDTH, y);
            }
            ctx.strokeStyle = "#eee";
            ctx.stroke();
        }
//Main Picture
//sky
        ctx.fillStyle = 'rgb(0, 191, 255)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
//floor
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.moveTo(0, 280);
        ctx.bezierCurveTo(0, 280, 200, 150, WIDTH, 290);
        ctx.fill();
//floor
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.moveTo(0, 240);
        ctx.lineTo(WIDTH, 230);
        ctx.moveTo(WIDTH, 230);
        ctx.fill();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.fillRect(0, 280, WIDTH, 120);


        function house(xHouse, yHouse, widthHouse, heightHouse) {
            ctx.fillStyle = '#CD5700';
            ctx.fillRect(xHouse, yHouse, widthHouse, heightHouse);
            ctx.beginPath();
            ctx.fillStyle = '#CD5700';
            ctx.moveTo(xHouse + widthHouse, yHouse);
            ctx.lineTo(xHouse + widthHouse + 60, yHouse - 30);
            ctx.lineTo(xHouse + widthHouse + 60, yHouse + heightHouse - 45);
            ctx.lineTo(xHouse + widthHouse, yHouse + heightHouse);
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = '#FFF5EE';
            for (var i = 0; i < heightHouse; i = i + 10 ) {
                ctx.moveTo(xHouse, (yHouse + i) );
                ctx.lineTo( (xHouse + widthHouse), (yHouse + i) );
                for (var a = 0; a < widthHouse; a = a + 20) {
                    if ( (i % 2) == 0) {
                        a = a + 10;
                    } else {
                        a = a - 5;
                    }
                    ctx.lineWidth = 5;
                    ctx.moveTo( (xHouse + a), yHouse);
                    ctx.lineTo( (xHouse + a), (yHouse + i) );
                }
            }
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = '#C0C0C0';
            for (var g = 0; g < heightHouse; g = g + 10) {
                ctx.moveTo(xHouse, (yHouse + g) );
                ctx.lineTo( (xHouse + widthHouse), (yHouse + g) );
                for (var k = 0; k < widthHouse; k = k + 20) {
                    if ( (g % 2) == 0) {
                        k = k + 10;
                    } else {
                        k = k - 5;
                    }
                    ctx.lineWidth = 1;
                    ctx.moveTo( (xHouse + k), yHouse);
                    ctx.lineTo( (xHouse + k), (yHouse + g) );
                }
            }
            ctx.stroke();
        }
        function window (xWindow, yWindow, wWidth, wHeight) {
            //glass
            ctx.fillStyle = 'rgb(230, 230, 250)';
            ctx.fillRect(xWindow, yWindow, wWidth, wHeight);
            //carcass
            ctx.strokeStyle = '#E5AA70';
            ctx.strokeRect(xWindow, yWindow, wWidth, wHeight);
            //sashes
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.moveTo(xWindow, (yWindow + (wHeight / 2) ) );
            ctx.lineTo( (xWindow + wWidth), (yWindow + (wHeight / 2) ) );
            ctx.moveTo( (xWindow + (wWidth / 2) ), yWindow);
            ctx.lineTo( (xWindow + (wWidth / 2) ), (yWindow + wHeight) );
            ctx.stroke();
        }
        function chimney(xChimney, yChimney, wChimney, hChimney) {
            ctx.fillRect(xChimney, yChimney, wChimney, hChimney);
            ctx.fillStyle = 'F20D0D';
            ctx.beginPath();
            ctx.fillStyle = 'F20D0D';
            ctx.moveTo(xChimney, (yChimney + hChimney) );
            ctx.lineTo( (xChimney + wChimney), (yChimney + hChimney + 30) );
            ctx.lineTo( ( (xChimney + wChimney) + 10), (yChimney + hChimney + 30) );
            ctx.fill();
        }
        function roof(xRoof, yRoof, wRoof, hRoof) {
            ctx.beginPath();
            ctx.fillStyle = '#654321';
            ctx.strokeStyle = '#DCA581';
            ctx.moveTo(xRoof, yRoof);
            ctx.lineTo(xRoof + wRoof, yRoof);
            ctx.lineTo(xRoof + (wRoof / 2), (yRoof - hRoof) );
            ctx.lineTo( (xRoof + (wRoof / 2) ), (yRoof - hRoof) );
            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = '#654321';
            ctx.strokeStyle = '#DCA581';
            ctx.lineTo( (xRoof + wRoof), yRoof);
            ctx.lineTo( (xRoof + wRoof + 60), (yRoof - 30) );
            ctx.lineTo( ( (xRoof + wRoof + 60) - (wRoof / 2) ), (hRoof + 5) );
            ctx.lineTo( (xRoof + (wRoof / 2) ), (yRoof - hRoof) );
            ctx.stroke();
            ctx.fill();
        }
        function sun(xSun, ySun, rSun) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.arc(xSun, ySun, rSun, (Math.PI / 180) * 360, 0, true);
            ctx.fill();
        }
        function cloud(xCloud, yCloud)
        {
            ctx.beginPath();
            ctx.fillStyle = '#FAF0E6';
            ctx.moveTo(xCloud, yCloud);
            ctx.quadraticCurveTo(xCloud + 10 + 20, yCloud - 10, xCloud + 20 + 20, yCloud);
            ctx.quadraticCurveTo(xCloud + 30 + 20, yCloud - 10, xCloud + 40 + 20, yCloud);
            ctx.quadraticCurveTo(xCloud + 60 + 20, yCloud + 10, xCloud + 40 + 20, yCloud + 20);
            ctx.quadraticCurveTo(xCloud + 20 + 20, yCloud + 40, xCloud, yCloud + 20);
            ctx.quadraticCurveTo(xCloud - 20, yCloud + 10, xCloud, yCloud);
            ctx.closePath();
            ctx.fill();
        }
        function zabor(xZabor, yZabor, wZabor, hZabor) {
            ctx.fillRect(xZabor, yZabor, wZabor, hZabor);
            ctx.beginPath();

            ctx.moveTo(xZabor, yZabor);
            ctx.lineTo( (xZabor + wZabor / 2), (yZabor - 10) );
            ctx.lineTo( (xZabor + wZabor), yZabor);
            ctx.fill();
        }
        sun(40, 40, 30);
        cloud(70, 40);
        cloud(80, 50);
        cloud(90, 30);
        cloud(280, 40);
        cloud(200, 50);
        cloud(305, 50);
        house(100, 150, 160, 145);
        window(155, 170, 60, 60);
        roof(100, 148, 160, 60);
        chimney(220, 50, 25, 50);

        var y = 230;
        var w = 5;
        var h = 100;

        for (var x = 0; x < 110; x = x + w) {
            zabor(x, y, w, h);
            w = w + 1;
            h = h + 2;
            y = y - 2;
        }
        y = 230;
        w = 5;
        h = 100;
        for (x = WIDTH; x > WIDTH - 150; x = x - w - 1) {
            zabor(x, y, w, h);
            w = w + 1;
            h = h + 2;
            y = y - 2;
        }
    } else {
        alert('Canvas не работает(');
    }
}
createImage();