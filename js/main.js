var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var width = 800,
    height = 800;

var position = {x: 0, y: 0};
var started = false;

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

function clearDrunked(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";

    ctx.fillRect(position.x * (width / 10) + 1, position.y * (height / 10) + 1, width / 10 - 2, height / 10 - 2);
}

/**
 * draw a single "drunked case"
 * @param canvas
 */
function drawDrunked(canvas) {
    clearDrunked(canvas);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";

    if (!started) {
        position = {x: Math.floor((Math.random() * 10)), y: Math.floor((Math.random() * 10))};
        started = true;
    } else {
        if (Math.random() > 0.5) {
            if (Math.random() >= 0.5) {
                position.x += 1;
            } else {
                position.x -= 1
            }
        } else {
            if (Math.random() >= 0.5) {
                position.y += 1;
            } else {
                position.y -= 1
            }
        }
        position.x = Math.abs(position.x % 10);
        position.y = Math.abs(position.y % 10);
    }
    console.log("moving to : ");
    console.log(position);
    ctx.fillRect(position.x * (width / 10) + 1, position.y * (height / 10) + 1, width / 10 - 2, height / 10 - 2);
}
function step() {
    console.log("Step in!");
    drawDrunked(canvas);
}

drawGrid(canvas);
drawDrunked(canvas);

/*
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,150,75);
*/

