const Pathfinder = require('./pathfinder');

class Grid {
    constructor(w, h){
        this.pathfinder = new Pathfinder();
        this.width = w;
        this.height = h;
    }
}

module.exports = Grid;