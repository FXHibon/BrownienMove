var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var width = 800,
    height = 800;

var location;

function reset(can) {
    can.fillStyle = "#FFFFFF";
    can.fillRect(0, 0, width, height);

}

/**
 * draw the main grid
 * @param canvas
 */
function drawGrid(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";

    for (var i = 0; i < width; i += width / 10) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke()
        for (var j = 0; j < height; j += height / 10) {
            ctx.moveTo(0, j);
            ctx.lineTo(width, j);
            ctx.stroke()
        }
    }
}

/**
 * draw a single "drunked case"
 * @param canvas
 */
function drawDrunked(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";

    location = {x: Math.floor((Math.random() * 10)), y : Math.floor((Math.random() * 10))};

    ctx.fillRect(location.x * (width / 10), location.y * (height / 10), width / 10, height / 10);
}

drawGrid(canvas);
drawDrunked(canvas);

/*
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/

