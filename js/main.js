var canvas = document.getElementById("mainCanvas");

var width = 800,
    height = 800;

var rows = 100,
    cols = 100;

var locations = {};

var drunkeds = [];

drunkeds["one"] = {
    color: "#FF0000",
    location: {}
};

drunkeds["two"] = {
    color: "#00FF00",
    location: {}
};

drunkeds["three"] = {
    color: "#0000FF",
    location: {}
};

drunkeds["four"] = {
    color: "#F0000F",
    location: {}
};

drunkeds["five"] = {
    color: "#0F00F0",
    location: {}
};

drunkeds["six"] = {
    color: "#FFFFFF",
    location: {}
};

drunkeds["seven"] = {
    color: "#040AF0",
    location: {}
};

var auto = false;

function reset(can) {
    can.fillStyle = "#FFFFFF";
    can.fillRect(0, 0, width, height);
}

/**
 * draw the grid
 * @param canvas
 */
function drawGrid(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";

    for (var i = 0; i < width; i += width / cols) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke()
        for (var j = 0; j < height; j += height / rows) {
            ctx.moveTo(0, j);
            ctx.lineTo(width, j);
            ctx.stroke()
        }
    }
}

/**
 * Remove from the grid the current drunked
 * @param canvas
 */
function clearDrunked(canvas, drunkedLocation) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(drunkedLocation.x * (width / cols) + 1, drunkedLocation.y * (height / rows) + 1, width / cols - 2, height / rows - 2);
}

/**
 * draw a single "drunked case"
 * @param canvas
 */
function drawDrunked(canvas) {
    var ctx = canvas.getContext("2d");


    for (var i in drunkeds) {
        if (Math.random() > 0.5) {
            if (Math.random() >= 0.5) {
                drunkeds[i].location.x += 1;
            } else {
                drunkeds[i].location.x -= 1
            }
        } else {
            if (Math.random() >= 0.5) {
                drunkeds[i].location.y += 1;
            } else {
                drunkeds[i].location.y -= 1
            }
        }

        drunkeds[i].location.x = Math.abs(drunkeds[i].location.x % cols);
        drunkeds[i].location.y = Math.abs(drunkeds[i].location.y % rows);
        locations[i].push({x: drunkeds[i].location.x, y: drunkeds[i].location.y});

        ctx.fillStyle = drunkeds[i].color;
        ctx.fillRect(drunkeds[i].location.x * (width / cols) + 1, drunkeds[i].location.y * (height / rows) + 1, width / cols - 2, height / rows - 2);
        console.log(locations[i]);

        if (locations[i].length > 50) {
            clearDrunked(canvas, locations[i].shift());
        }
    }


    if (auto) {
        setTimeout("drawDrunked(canvas)", 10);
    }

}

/**
 * Step over
 */
function stepAuto() {
    var buton = document.getElementById("butAuto");
    if (auto) {
        auto = false;
        buton.innerHTML = "auto"
    } else {
        auto = true;
        buton.innerHTML = "stop"
        drawDrunked(canvas);
    }

}

/**
 * Init data
 */
(function init() {
    for (var i in drunkeds) {
        drunkeds[i].location = {x: Math.floor((Math.random() * cols)), y: Math.floor((Math.random() * rows))};
        locations[i] = [];
        locations[i].push(drunkeds[i].location);
    }

    drawDrunked(canvas);
})();


(function addKeyboardListener() {
    document.onkeypress = function () {
        step();
    };
})();
