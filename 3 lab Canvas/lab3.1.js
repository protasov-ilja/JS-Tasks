function createImage() {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

//разметка холста
        for (var x = 0.5; x < 500; x += 10) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 380);
        }
        for (var y = 0.5; y < 380; y += 10) {
            ctx.moveTo(0, y);
            ctx.lineTo(500, y);
        }
        ctx.strokeStyle = "#eee";
        ctx.stroke();

//Main Picture
//sky
        ctx.fillStyle = 'rgb(0, 191, 255)';
        ctx.fillRect(0, 0, 400, 400);
//floor
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.bezierCurveTo(0, 280, 200, 150, 400, 290);
        ctx.fill();
//floor
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.moveTo(0, 240);
        ctx.lineTo(400, 230);
        ctx.moveTo(400, 230);
        ctx.fill();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.fillRect(0, 280, 400, 120);
//house
        ctx.fillStyle = 'rgb(250, 235, 280)';
        ctx.fillRect(100, 150, 180, 150);
//glass
        ctx.fillStyle = 'rgb(230, 230, 250)';
        ctx.fillRect(180, 180, 50, 50);
//window
        ctx.strokeStyle = '#E5AA70';
        ctx.strokeRect(180, 180, 50, 50);

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(180, 200);
        ctx.lineTo(230, 200);
        ctx.moveTo(205, 180);
        ctx.lineTo(205, 230);
        ctx.stroke();
//roof
        ctx.beginPath();
        ctx.fillStyle = '#654321';
        ctx.moveTo(100, 150);
        ctx.lineTo(280, 150);
        ctx.lineTo(190, 100);
        ctx.fill();
//sun
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
        ctx.arc(40, 40, 30, (Math.PI / 180) * 360, 0, true);
        ctx.fill();
//cloud
        function cloud(a, b)
        {
            ctx.beginPath();
            ctx.fillStyle = '#FAF0E6';
            ctx.moveTo(a, b);
            ctx.quadraticCurveTo(a + 10, b - 20, a + 20, b);
            ctx.quadraticCurveTo(a + 30, b - 20, a + 40, b);
            ctx.quadraticCurveTo(a + 60, b + 10, a + 40, b + 20);
            ctx.quadraticCurveTo(a + 20, b + 40, a, b + 20);
            ctx.quadraticCurveTo(a - 20, b + 10, a, b);
            ctx.closePath();
            ctx.fill();
        }
        cloud(70, 40);
        cloud(280, 40);
        cloud(200, 50);
        cloud(350, 100);
    } else {
        alert('Canvas не работает(');
    }
}