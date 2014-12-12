/**
 * Created by Fx on 12/12/2014.
 */

var Particle = function (color, location) {
    console.log("building particle(" + color + ", " + location + ")");
    this.color = color;
    this.location = location;
    this.locations = [];
}