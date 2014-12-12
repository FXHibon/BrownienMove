var canvas = document.getElementById("mainCanvas");

var width = 1300,
    height = 1300;

var rows = 300,
    cols = 300;

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
 * Remove from the grid the current drunked
 * @param canvas
 */
function clearDrunked(canvas, drunkedLocation) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(drunkedLocation.x * (width / cols), drunkedLocation.y * (height / rows), width / cols, height / rows);
}

/**
 * draw a single "drunked case"
 * @param canvas
 */
function drawDrunked(canvas) {
    var ctx = canvas.getContext("2d");


    for (var i in drunkeds) {

        var axe = (Math.random() - 0.5) > 0 ? "x" : "y",
            plusOrMinus = (Math.random() - 0.5) > 0 ? 1 : -1;

        drunkeds[i].location[axe] += plusOrMinus;

        do {
            drunkeds[i].location.x = Math.abs(drunkeds[i].location.x % cols);
            drunkeds[i].location.y = Math.abs(drunkeds[i].location.y % rows);
        } while (!isFree(drunkeds[i].location));

        locations[i].push({x: drunkeds[i].location.x, y: drunkeds[i].location.y});

        ctx.fillStyle = drunkeds[i].color;
        ctx.fillRect(drunkeds[i].location.x * (width / cols) + 1, drunkeds[i].location.y * (height / rows) + 1, width / cols - 2, height / rows - 2);

        if (locations[i].length > 50) {
            clearDrunked(canvas, locations[i].shift());
        }
    }

    if (auto) {
        setTimeout("drawDrunked(canvas)", 6);
    }
}

/**
 * To know if a location is free or not
 * @param aLocation
 */
function isFree(aLocation) {
    for (var liste in locations) {
        for (var i in liste) {
            if (i.x == aLocation.x && i.y == aLocation.y) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Toggle automatic stepping
 */
function stepAuto() {
    var buton = document.getElementById("butAuto");

    buton.innerHTML = auto ? "stop" : "auto";
    auto = !auto;

    if (auto) {
        drawDrunked(canvas);
    }

}

/**
 * Init data
 */
(function init() {
    for (var i in drunkeds) {
        drunkeds[i].location = {
            x: Math.floor((Math.random() * cols)),
            y: Math.floor((Math.random() * rows))
        };
        locations[i] = [];
        locations[i].push(drunkeds[i].location);
    }

    drawDrunked(canvas);
})();