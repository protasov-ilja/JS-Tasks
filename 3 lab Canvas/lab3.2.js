function createImage() {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;
        var width = canvas.width;
        var height = canvas.height;


        function honeycomb1(xComb, yComb, wComb) {
            ctx.beginPath();
            ctx.moveTo(xComb, yComb);
            ctx.lineTo(xComb + wComb, yComb);
            ctx.lineTo( (xComb + wComb + wComb / 2), (yComb + wComb) );
            ctx.lineTo( (xComb + wComb), (yComb + wComb + wComb) );
            ctx.lineTo(xComb, (yComb + wComb + wComb) );
            ctx.lineTo( (xComb - wComb / 2), (yComb + wComb) );
            ctx.stroke();
        }
        function honeycomb(xComb, yComb, wComb) {
            ctx.beginPath();
            ctx.moveTo(xComb, yComb);
            ctx.lineTo( (xComb + wComb), (yComb + wComb / 2) );
            ctx.lineTo( (xComb + wComb), (yComb + wComb + wComb / 2) );
            ctx.lineTo(xComb, (yComb + wComb + wComb) );
            ctx.lineTo( (xComb - wComb), (yComb + wComb + wComb / 2) );
            ctx.lineTo( (xComb - wComb), (yComb + wComb / 2) );
            ctx.lineTo(xComb, yComb);
            ctx.stroke();
        }
        function printHoneycomb(xComb, yComb, wComb, amountCombCol, amountCombLine, space) {
            k = xComb;
            for (var i = 1; (i < amountCombCol) && (yComb < height); ++i) {
                if (i % 2 === 0) {
                    xComb = xComb + wComb + space / 2;
                }
                for (var a = 1; (a < amountCombLine) && (xComb < width); ++a) {
                    honeycomb(xComb, yComb, wComb);
                    xComb = xComb + wComb * 2 + space;
                }
                yComb = yComb + wComb + wComb / 2 + space;
                xComb = k;
            }
        }
        printHoneycomb(20, 20, 20, 11, 9, 3);

    } else {
        alert('Canvas не работает(');
    }
}
createImage();