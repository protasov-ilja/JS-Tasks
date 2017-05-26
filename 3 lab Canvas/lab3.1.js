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
/*
        ctx.fillStyle = 'rgb(0, 191, 255)';
        ctx.fillRect(0, 0, 400, 400);
//трава
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.bezierCurveTo(0, 240, 200, 150, 400, 230);
        ctx.fill();
//трава
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.moveTo(0, 240);
        ctx.lineTo(400, 230);
        ctx.moveTo(400, 230);
        ctx.fill();

        ctx.fillStyle = 'rgb(0, 168, 107)';
        ctx.fillRect(0, 280, 400, 120);

        ctx.fillStyle = 'rgb(250, 235, 280)';
        ctx.fillRect(100, 150, 180, 150);

        ctx.fillStyle = 'rgb(230, 230, 250)';
        ctx.fillRect(180, 180, 50, 50);

        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.moveTo(100, 150);
        ctx.lineTo(280, 150);
        ctx.stroke();
*/
        ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
        ctx.fillRect(30, 30, 50, 50);
    } else {
        alert('Canvas не работает(');
    }
}