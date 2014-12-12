var canvas = document.getElementById("mainCanvas");
var button = document.getElementById("butAuto");
var ctx = canvas.getContext("2d");

var width = 1200,
    height = 1200;

var rows = 1200;

var particles = [];

var auto = false;

/**
 * Remove from the canvas the given particle
 * @param particle The particle to be removed
 */
function clearParticle(particle) {
    var locationToRemove = particle.locations.shift();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(locationToRemove.x * (width / rows), locationToRemove.y * (height / rows), width / rows, height / rows);
}

/**
 * Draw a single particle
 * @param particle The particule to be drawn
 */
function drawParticle(particle) {
    var currentLocation = {x: particle.location.x, y: particle.location.y};
    do {
        particle.location = currentLocation;

        var axe = (Math.random() - 0.5) > 0 ? "x" : "y";
        var plusOrMinus = (Math.random() - 0.5) > 0 ? 1 : -1;

        particle.location[axe] += plusOrMinus;
        particle.location[axe] = Math.abs(particle.location[axe] % rows);
    } while (!isFree(particle.location));

    particle.locations.push({x: particle.location.x, y: particle.location.y});

    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.location.x * (width / rows) + 1, particle.location.y * (height / rows) + 1, width / rows - 2, height / rows - 2);

    if (particle.locations.length > 50) {
        clearParticle(particle);
    }
}

/**
 * draw all particles
 * @param canvas
 */
function drawParticles() {
    particles.forEach(function (particle) {
        drawParticle(particle);
    });

    if (auto) {
        setTimeout("drawParticles()", 10);
    }
}

/**
 * To know if a location is free or not
 * @param aLocation
 */
function isFree(aLocation) {
    //for (var liste in locations) {
    //    for (var i in liste) {
    //        if (i.x == aLocation.x && i.y == aLocation.y) {
    //            return false;
    //        }
    //    }
    //}
    return true;
}

/**
 * Toggle automatic stepping
 */
function stepAuto() {


    auto = !auto;
    button.innerHTML = auto ? "Stop" : "Auto";
    if (auto) {
        drawParticles(canvas);
    }

}

/**
 * Generate a random location
 * @returns {{x: number, y: number}}
 */
function randomLocation() {
    return {
        x: Math.floor((Math.random() * rows)),
        y: Math.floor((Math.random() * rows))
    };
}

function addParticle() {
    var color = document.getElementById("colorPicker").value;
    particles.push(new Particle(color, randomLocation()));
}

/**
 * Init data
 */
(function bootstrap() {
    particles.push(new Particle("#FF0000", randomLocation()));
    drawParticles(canvas);
})();
